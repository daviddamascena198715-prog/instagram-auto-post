// render_authority_carousel.js — Renderiza um carrossel de feed (capa +
// interiores + CTA) a partir da dica de autoridade (tráfego pago ou
// comercial) mais relevante do dia, usando o mesmo template visual dos
// Stories 6h (dourado/preto, Fraunces/Outfit). Sem Nano Banana, sem
// plataforma externa — só HTML/CSS via Playwright.
//
// Uso: node render_authority_carousel.js <slides.json> <outDir> [--story]
//   --story → 1080x1920 (Stories); sem a flag → 1080x1350 (feed 4:5)
//
// slides.json: array de slides, na ordem em que aparecem no carrossel:
//   [
//     { "type": "capa", "tag": "TRÁFEGO PAGO", "headline": "...", "body": "...", "icon": "target" },
//     { "type": "interior", "headline": "...", "body": "..." },
//     { "type": "interior", "headline": "...", "body": "..." },
//     { "type": "cta", "headline": "...", "body": "...", "ctaLabel": "..." }
//   ]
//   icon (só na capa): "target" (tráfego pago) | "briefcase" (comercial)
//
// Saída: outDir/slide_1.png, slide_2.png, ... (1080x1350, 4:5)
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const TEMPLATE_PATH = path.join(__dirname, "..", "content-bank", "templates", "authority-carousel-template.html");

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

async function renderCarousel(slides, outDir, { story = false } = {}) {
  const VIEW_W = 420;
  // viewport precisa ser inteiro; o slide em si mede 746.667px (= 1920px no PNG final)
  const VIEW_H = story ? 747 : 525; // 1080x1920 (Stories) ou 1080x1350 (feed 4:5)
  const SCALE = 1080 / VIEW_W;

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  let html = templateHtml.replace("__SLIDES_DATA__", JSON.stringify(slides));
  if (story) html = html.replace("<body>", "<body class=\"fmt-story\">");

  const tmpFile = path.join(os.tmpdir(), `authority_carousel_${Date.now()}_${Math.random().toString(36).slice(2)}.html`);
  fs.writeFileSync(tmpFile, html, "utf-8");

  const executablePath = findPreinstalledChromium();
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage({ viewport: { width: VIEW_W, height: VIEW_H }, deviceScaleFactor: SCALE });
  await page.goto("file:///" + tmpFile.replace(/\\/g, "/"));
  await page.waitForTimeout(2200);

  fs.mkdirSync(outDir, { recursive: true });
  const slideEls = await page.$$(".slide");
  const outPaths = [];
  for (let i = 0; i < slideEls.length; i++) {
    const outPath = path.join(outDir, `slide_${i + 1}.png`);
    await slideEls[i].screenshot({ path: outPath });
    if (story) {
      // o screenshot do elemento arredonda pra 1921px; corta pra 1080x1920 exatos
      const tmp = outPath.replace(/.png$/, ".crop.png");
      try {
        require("child_process").execFileSync("ffmpeg", ["-y", "-v", "error", "-i", outPath, "-vf", "crop=1080:1920:0:0", tmp]);
        fs.renameSync(tmp, outPath);
      } catch (e) {
        console.log("  (aviso: ffmpeg indisponível, Story ficou com 1px a mais)");
      }
    }
    outPaths.push(outPath);
    console.log(`  Slide ${i + 1}/${slideEls.length} -> ${outPath}`);
  }

  await browser.close();
  fs.unlinkSync(tmpFile);
  return outPaths;
}

module.exports = { renderCarousel };

if (require.main === module) {
  const [, , slidesPath, outDir, flag] = process.argv;
  if (!slidesPath || !outDir) {
    console.log("Uso: node render_authority_carousel.js <slides.json> <outDir>");
    process.exit(1);
  }
  const slides = JSON.parse(fs.readFileSync(slidesPath, "utf-8"));
  renderCarousel(slides, outDir, { story: flag === "--story" }).then(() => console.log("Concluído."));
}
