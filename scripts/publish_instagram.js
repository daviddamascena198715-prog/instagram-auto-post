// publish_instagram.js — Publicacao automatica no Instagram via Instagram Graph API (Instagram Login)
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

try { process.loadEnvFile(path.join(__dirname, "..", ".env")); } catch { /* sem .env: usa variáveis do ambiente */ }

const IG_ID = process.env.INSTAGRAM_BUSINESS_ID;
// Token pelo cabeçalho Authorization. Sem token no ambiente (nuvem), a requisição sai sem
// credencial e o proxy da nuvem injeta o segredo de rede "Instagram Graph API".
const TOKEN = (process.env.INSTAGRAM_ACCESS_TOKEN || "").trim();
const AUTH = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
const API_VER = process.env.META_API_VERSION || "v21.0";
const GRAPH_HOST = process.env.META_GRAPH_HOST || "graph.instagram.com";
const BASE_URL = `https://${GRAPH_HOST}/${API_VER}`;

function parseArgs() {
  const args = process.argv.slice(2);
  const images = [];
  let caption = "";
  let dryRun = false;
  let story = false;
  let video = null;
  let thumbOffsetMs = null;
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
    } else if (args[i] === "--video") {
      video = args[++i];
    } else if (args[i] === "--thumb-offset-ms") {
      thumbOffsetMs = Number(args[++i]);
    }
  }
  return { images, caption, dryRun, story, video, thumbOffsetMs };
}

const IMAGE_HOSTS = [
  {
    name: "uguu.se",
    upload: (imagePath, maxTime = 25) => {
      const raw = execFileSync("curl", [
        "-s", "--max-time", String(maxTime),
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
    upload: (imagePath, maxTime = 25) => {
      const url = execFileSync("curl", [
        "-s", "--max-time", String(maxTime),
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

async function hostImage(imagePath, maxTime = 25) {
  // Node's fetch (undici) fails TLS renegotiation on some hosts; curl handles it fine.
  let lastError;
  for (const host of IMAGE_HOSTS) {
    try {
      const url = host.upload(imagePath, maxTime);
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
  const body = new URLSearchParams({ image_url: imageUrl });
  if (isCarouselItem) body.set("is_carousel_item", "true");
  if (caption !== null) body.set("caption", caption);
  if (story) body.set("media_type", "STORIES");
  const resp = await fetch(`${BASE_URL}/${IG_ID}/media`, { method: "POST", body, headers: AUTH });
  const result = await resp.json();
  if (!result.id) throw new Error(`Erro container: ${JSON.stringify(result)}`);
  console.log(`  Container: ${result.id}`);
  return result.id;
}

async function createCarousel(mediaIds, caption) {
  const body = new URLSearchParams({
    media_type: "CAROUSEL",
    children: mediaIds.join(","),
    caption,
  });
  const resp = await fetch(`${BASE_URL}/${IG_ID}/media`, { method: "POST", body, headers: AUTH });
  const result = await resp.json();
  if (!result.id) throw new Error(`Erro carrossel: ${JSON.stringify(result)}`);
  console.log(`  Carrossel: ${result.id}`);
  return result.id;
}

async function waitReady(containerId, maxTries = 12) {
  for (let i = 0; i < maxTries; i++) {
    const resp = await fetch(`${BASE_URL}/${containerId}?fields=status_code`, { headers: AUTH });
    const result = await resp.json();
    if (result.status_code === "FINISHED") return true;
    if (result.status_code === "ERROR") throw new Error(`Container com erro: ${JSON.stringify(result)}`);
    console.log(`  Processando... ${i * 5}s`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  return false;
}

async function createReelContainer(videoPath, caption, thumbOffsetMs) {
  const videoUrl = await hostImage(videoPath, 180);
  const body = new URLSearchParams({ media_type: "REELS", video_url: videoUrl, caption, share_to_feed: "true" });
  if (Number.isFinite(thumbOffsetMs)) body.set("thumb_offset", String(Math.round(thumbOffsetMs)));
  const resp = await fetch(`${BASE_URL}/${IG_ID}/media`, { method: "POST", body, headers: AUTH });
  const result = await resp.json();
  if (!result.id) throw new Error(`Erro container Reel: ${JSON.stringify(result)}`);
  console.log(`  Container Reel: ${result.id}`);
  return result.id;
}

async function publish(containerId) {
  const body = new URLSearchParams({ creation_id: containerId });
  for (let attempt = 1; attempt <= 5; attempt++) {
    const resp = await fetch(`${BASE_URL}/${IG_ID}/media_publish`, { method: "POST", body, headers: AUTH });
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
  const { images, caption, dryRun, story, video, thumbOffsetMs } = parseArgs();
  if (!IG_ID) {
    console.log("ERRO: Credenciais nao encontradas. Rode /setup-instagram primeiro.");
    process.exit(1);
  }
  if (video) {
    if (!fs.existsSync(video)) { console.log(`ERRO: vídeo não encontrado: ${video}`); process.exit(1); }
    console.log(`\nPublicando Reel no Instagram: ${video}`);
    if (dryRun) { console.log("[DRY RUN] Tudo OK. Remova --dry-run para publicar."); return; }
    console.log("\nPasso 1/2 - Enviando vídeo e criando container...");
    const containerId = await createReelContainer(video, caption, thumbOffsetMs);
    console.log("\nPasso 2/2 - Aguardando processamento do vídeo e publicando...");
    if (!(await waitReady(containerId, 60))) { console.log("ERRO: Timeout no processamento do vídeo."); process.exit(1); }
    const reelId = await publish(containerId);
    console.log(`\nPublicado com sucesso!`);
    console.log(`Post ID: ${reelId}`);
    return;
  }
  if (images.length === 0) {
    console.log("ERRO: Informe --images <arquivo1> [arquivo2 ...] ou --video <arquivo.mp4>");
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
