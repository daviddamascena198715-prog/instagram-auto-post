// publish_instagram.js — Publicacao automatica no Instagram via Instagram Graph API (Instagram Login)
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

process.loadEnvFile(path.join(__dirname, "..", ".env"));

const IG_ID = process.env.INSTAGRAM_BUSINESS_ID;
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const API_VER = process.env.META_API_VERSION || "v21.0";
const GRAPH_HOST = process.env.META_GRAPH_HOST || "graph.instagram.com";
const BASE_URL = `https://${GRAPH_HOST}/${API_VER}`;

function parseArgs() {
  const args = process.argv.slice(2);
  const images = [];
  let caption = "";
  let dryRun = false;
  let story = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--images") {
      i++;
      while (i < args.length && !args[i].startsWith("--")) {
        images.push(args[i]);
        i++;
      }
      i--;
    } else if (args[i] === "--caption") {
      caption = args[++i];
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    } else if (args[i] === "--story") {
      story = true;
    }
  }
  return { images, caption, dryRun, story };
}

const IMAGE_HOSTS = [
  {
    name: "uguu.se",
    upload: (imagePath) => {
      const raw = execFileSync("curl", [
        "-s", "--max-time", "25",
        "-F", `files[]=@${imagePath}`,
        "https://uguu.se/upload",
      ]).toString().trim();
      const result = JSON.parse(raw);
      if (!result.success || !result.files?.[0]?.url) throw new Error(raw);
      return result.files[0].url;
    },
  },
  {
    name: "litterbox.catbox.moe",
    upload: (imagePath) => {
      const url = execFileSync("curl", [
        "-s", "--max-time", "25",
        "-F", "reqtype=fileupload",
        "-F", "time=1h",
        "-F", `fileToUpload=@${imagePath}`,
        "https://litterbox.catbox.moe/resources/internals/api.php",
      ]).toString().trim();
      if (!url.startsWith("https://")) throw new Error(url);
      return url;
    },
  },
];

async function hostImage(imagePath) {
  // Node's fetch (undici) fails TLS renegotiation on some hosts; curl handles it fine.
  let lastError;
  for (const host of IMAGE_HOSTS) {
    try {
      const url = host.upload(imagePath);
      console.log(`  Hospedada (${host.name}): ${url}`);
      return url;
    } catch (err) {
      console.log(`  Falha em ${host.name}, tentando próximo host...`);
      lastError = err;
    }
  }
  throw new Error(`Falha no upload em todos os hosts: ${lastError.message}`);
}

async function createMediaContainer(imagePath, { isCarouselItem = false, caption = null, story = false } = {}) {
  const imageUrl = await hostImage(imagePath);
  const body = new URLSearchParams({ access_token: TOKEN, image_url: imageUrl });
  if (isCarouselItem) body.set("is_carousel_item", "true");
  if (caption !== null) body.set("caption", caption);
  if (story) body.set("media_type", "STORIES");
  const resp = await fetch(`${BASE_URL}/${IG_ID}/media`, { method: "POST", body });
  const result = await resp.json();
  if (!result.id) throw new Error(`Erro container: ${JSON.stringify(result)}`);
  console.log(`  Container: ${result.id}`);
  return result.id;
}

async function createCarousel(mediaIds, caption) {
  const body = new URLSearchParams({
    access_token: TOKEN,
    media_type: "CAROUSEL",
    children: mediaIds.join(","),
    caption,
  });
  const resp = await fetch(`${BASE_URL}/${IG_ID}/media`, { method: "POST", body });
  const result = await resp.json();
  if (!result.id) throw new Error(`Erro carrossel: ${JSON.stringify(result)}`);
  console.log(`  Carrossel: ${result.id}`);
  return result.id;
}

async function waitReady(containerId) {
  for (let i = 0; i < 12; i++) {
    const resp = await fetch(`${BASE_URL}/${containerId}?fields=status_code&access_token=${TOKEN}`);
    const result = await resp.json();
    if (result.status_code === "FINISHED") return true;
    if (result.status_code === "ERROR") throw new Error(`Container com erro: ${JSON.stringify(result)}`);
    console.log(`  Processando... ${i * 5}s`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  return false;
}

async function publish(containerId) {
  const body = new URLSearchParams({ access_token: TOKEN, creation_id: containerId });
  for (let attempt = 1; attempt <= 5; attempt++) {
    const resp = await fetch(`${BASE_URL}/${IG_ID}/media_publish`, { method: "POST", body });
    const result = await resp.json();
    if (result.id) return result.id;
    const isNotReadyYet = result.error?.code === 9007 && result.error?.error_subcode === 2207027;
    if (isNotReadyYet && attempt < 5) {
      console.log(`  Mídia ainda não pronta pro Instagram (erro transitório), tentando de novo em 5s... (${attempt}/5)`);
      await new Promise((r) => setTimeout(r, 5000));
      continue;
    }
    throw new Error(`Erro publicar: ${JSON.stringify(result)}`);
  }
}

async function run() {
  const { images, caption, dryRun, story } = parseArgs();
  if (!IG_ID || !TOKEN) {
    console.log("ERRO: Credenciais nao encontradas. Rode /setup-instagram primeiro.");
    process.exit(1);
  }
  if (images.length === 0) {
    console.log("ERRO: Informe --images <arquivo1> [arquivo2 ...]");
    process.exit(1);
  }
  if (images.length > 10) {
    console.log("ERRO: Maximo 10 imagens.");
    process.exit(1);
  }
  if (story && images.length > 1) {
    console.log("ERRO: Stories aceitam apenas 1 imagem por vez.");
    process.exit(1);
  }

  console.log(`\nPublicando ${images.length} imagem(ns) no Instagram${story ? " (Story)" : ""}...`);
  if (dryRun) {
    console.log("[DRY RUN] Tudo OK. Remova --dry-run para publicar.");
    return;
  }

  let postId;
  if (story) {
    console.log("\nPasso 1/2 - Criando container...");
    const containerId = await createMediaContainer(images[0], { story: true });
    console.log("\nPasso 2/2 - Publicando...");
    if (!(await waitReady(containerId))) {
      console.log("ERRO: Timeout no processamento.");
      process.exit(1);
    }
    postId = await publish(containerId);
  } else if (images.length === 1) {
    console.log("\nPasso 1/2 - Criando container...");
    const containerId = await createMediaContainer(images[0], { caption });
    console.log("\nPasso 2/2 - Publicando...");
    if (!(await waitReady(containerId))) {
      console.log("ERRO: Timeout no processamento.");
      process.exit(1);
    }
    postId = await publish(containerId);
  } else {
    console.log("\nPasso 1/3 - Criando containers...");
    const ids = [];
    for (const img of images) ids.push(await createMediaContainer(img, { isCarouselItem: true }));
    console.log("\nPasso 2/3 - Montando carrossel...");
    const carouselId = await createCarousel(ids, caption);
    console.log("\nPasso 3/3 - Publicando...");
    if (!(await waitReady(carouselId))) {
      console.log("ERRO: Timeout no processamento.");
      process.exit(1);
    }
    postId = await publish(carouselId);
  }

  console.log(`\nPublicado com sucesso!`);
  console.log(`Post ID: ${postId}`);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
