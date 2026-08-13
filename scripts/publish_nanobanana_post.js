// publish_nanobanana_post.js — Publica uma imagem já aprovada (gerada via Nano Banana)
// usando a legenda do tema do dia. A escolha do tema usa a mesma rotação de daily_publish.js.
// Uso: node publish_nanobanana_post.js <caminho-da-imagem> [themeId opcional, força um tema específico em vez do tema do dia]
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

process.loadEnvFile(path.join(__dirname, "..", ".env"));

const imgPath = process.argv[2];
const themeIdOverride = process.argv[3];
if (!imgPath || !fs.existsSync(imgPath)) {
  console.log("ERRO: informe o caminho de uma imagem existente. Uso: node publish_nanobanana_post.js <caminho> [themeId]");
  process.exit(1);
}

const THEMES = JSON.parse(fs.readFileSync(path.join(__dirname, "content-bank", "themes.json"), "utf-8"));
let theme;
if (themeIdOverride) {
  theme = THEMES.find((t) => t.id === themeIdOverride);
  if (!theme) {
    console.log(`ERRO: tema "${themeIdOverride}" não encontrado. Temas disponíveis: ${THEMES.map((t) => t.id).join(", ")}`);
    process.exit(1);
  }
} else {
  const dayIndex = Math.floor(Date.now() / 86400000) % THEMES.length;
  theme = THEMES[dayIndex];
}

console.log(`Tema: ${theme.id} (post) — modo: Nano Banana${themeIdOverride ? " [forçado]" : ""}`);
const scriptPath = path.join(__dirname, "publish_instagram.js");
console.log(execFileSync("node", [scriptPath, "--images", imgPath, "--caption", theme.postCaption], { encoding: "utf-8" }));
