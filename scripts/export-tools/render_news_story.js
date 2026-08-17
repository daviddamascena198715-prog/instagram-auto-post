// render_news_story.js — Renderiza 1 story de "tema do dia" (política, economia,
// guerra, eventos naturais, tecnologia/IA) a partir do template de marca, sem IA
// de imagem (mesmo template usado no story manual de 2026-08-17).
//
// Uso: node render_news_story.js <data.json> <outPath.png>
//
// data.json: { tag, headline, body, icon, badges: [{label, tone, icon}] }
//   icon (ícone central): "dollar" | "politics" | "conflict" | "nature" | "tech"
//   badges[].tone: "blue" | "green" | "red" | "yellow"
//   badges[].icon: "check" | "trend" | "alert" | "dot"
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const TEMPLATE_PATH = path.join(__dirname, "..", "content-bank", "templates", "news-story-template.html");

function findPreinstalledChromium() {
  const browsersPath = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!browsersPath || !fs.existsSync(browsersPath)) return undefined;
  const candidates = ["chrome-linux/chrome", "chrome-linux/headless_shell", "chrome-win/chrome.exe", "chrome-mac/Chromium.app/Contents/MacOS/Chromium"];
  const stack = [browsersPath];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (candidates.some((c) => full.replace(/\\/g, "/").endsWith(c))) return full;
    }
  }
  return undefined;
}

async function renderNewsStory(data, outPath) {
  const VIEW_W = 420;
  const VIEW_H = 747;
  const SCALE = 1080 / VIEW_W;

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const html = templateHtml.replace("__SLIDE_DATA__", JSON.stringify(data));

  const tmpFile = path.join(os.tmpdir(), `news_story_${Date.now()}_${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmpFile, html, "utf-8");

  const executablePath = findPreinstalledChromium();
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage({ viewport: { width: VIEW_W, height: VIEW_H }, deviceScaleFactor: SCALE });
  await page.goto("file:///" + tmpFile.replace(/\\/g, "/"));
  await page.waitForTimeout(2200);
  const el = await page.$(".slide");
  await el.screenshot({ path: outPath });
  await browser.close();
  fs.unlinkSync(tmpFile);
}

module.exports = { renderNewsStory };

if (require.main === module) {
  const [, , dataPath, outPath] = process.argv;
  if (!dataPath || !outPath) {
    console.log("Uso: node render_news_story.js <data.json> <outPath.png>");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  renderNewsStory(data, outPath).then(() => console.log("OK -> " + outPath));
}
