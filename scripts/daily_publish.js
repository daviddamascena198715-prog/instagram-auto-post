// daily_publish.js — Gera slide(s) com o template de marca (padrão) e publica no Instagram
// Uso: node daily_publish.js --type morning|post|carousel [--use-gpt]
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function renderSlides(...args) {
  return require("./export-tools/render_slides.js").renderSlides(...args);
}

process.loadEnvFile(path.join(__dirname, "..", ".env"));

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const THEMES = JSON.parse(fs.readFileSync(path.join(__dirname, "content-bank", "themes.json"), "utf-8"));
const OUT_DIR = path.join(__dirname, "daily-output");
fs.mkdirSync(OUT_DIR, { recursive: true });

function todayTheme() {
  const dayIndex = Math.floor(Date.now() / 86400000) % THEMES.length;
  return THEMES[dayIndex];
}

async function generateImageGPT(prompt, outPath, size) {
  const resp = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: "Bearer " + OPENAI_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-image-1", prompt, size, n: 1 }),
  });
  const d = await resp.json();
  if (!d.data) throw new Error("Erro ao gerar imagem via GPT: " + JSON.stringify(d));
  fs.writeFileSync(outPath, Buffer.from(d.data[0].b64_json, "base64"));
  console.log("  Imagem (GPT) gerada:", outPath);
}

function publish(args) {
  const scriptPath = path.join(__dirname, "publish_instagram.js");
  console.log(execFileSync("node", [scriptPath, ...args], { encoding: "utf-8" }));
}

async function main() {
  const type = process.argv.includes("--type")
    ? process.argv[process.argv.indexOf("--type") + 1]
    : null;
  const dryRun = process.argv.includes("--dry-run");
  const useGpt = process.argv.includes("--use-gpt");
  if (!["morning", "post", "carousel"].includes(type)) {
    console.log("ERRO: use --type morning|post|carousel");
    process.exit(1);
  }

  const theme = todayTheme();
  console.log(`Tema do dia: ${theme.id} (${type}) — modo: ${useGpt ? "GPT" : "template de marca"}`);

  if (dryRun) {
    console.log("[DRY RUN] Tema selecionado, nada gerado, nada publicado.");
    console.log(JSON.stringify(theme, null, 2));
    return;
  }

  if (type === "morning") {
    const imgPath = path.join(OUT_DIR, `morning_${theme.id}.png`);
    if (useGpt) {
      await generateImageGPT(theme.morning.gptPrompt || theme.morning.headline, imgPath, "1024x1536");
    } else {
      await renderSlides([theme.morning], "feed", [imgPath]);
    }
    publish(["--images", imgPath, "--caption", theme.morningCaption]);
  } else if (type === "post") {
    const imgPath = path.join(OUT_DIR, `post_${theme.id}.png`);
    if (useGpt) {
      await generateImageGPT(theme.post.gptPrompt || theme.post.headline, imgPath, "1024x1536");
    } else {
      await renderSlides([theme.post], "feed", [imgPath]);
    }
    publish(["--images", imgPath, "--caption", theme.postCaption]);
  } else if (type === "carousel") {
    const outPaths = theme.carousel.map((_, i) => path.join(OUT_DIR, `carousel_${theme.id}_${i + 1}.png`));
    if (useGpt) {
      for (let i = 0; i < theme.carousel.length; i++) {
        await generateImageGPT(theme.carousel[i].gptPrompt || theme.carousel[i].headline, outPaths[i], "1024x1536");
      }
    } else {
      await renderSlides(theme.carousel, "feed", outPaths);
    }
    publish(["--images", ...outPaths, "--caption", theme.carouselCaption]);
  }
}

main().catch((err) => {
  console.error("ERRO:", err.message);
  process.exit(1);
});
