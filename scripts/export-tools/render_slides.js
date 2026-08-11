// render_slides.js — Renderiza slides (story/post/carousel) a partir do template de marca, sem IA de imagem
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const TEMPLATE_PATH = path.join(__dirname, "..", "content-bank", "templates", "slide-template.html");

// Some sandboxed environments (e.g. cloud CI) ship a pre-installed Chromium
// under PLAYWRIGHT_BROWSERS_PATH that doesn't match this project's Playwright
// version, so `chromium.launch()` can't find it via the default lookup.
// Point at it explicitly when present instead of downloading a fresh copy.
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
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (candidates.some((c) => full.replace(/\\/g, "/").endsWith(c))) {
        return full;
      }
    }
  }
  return undefined;
}

/**
 * slides: array de { tag, headline, body, bg, cta?, justify?, size? }
 * mode: "story" | "feed"  (story = 1080x1920 vertical, feed = 1080x1350)
 * outPaths: array de caminhos de saída (mesmo tamanho de slides)
 */
async function renderSlides(slides, mode, outPaths) {
  const isStory = mode === "story";
  const VIEW_W = 420;
  const VIEW_H = isStory ? 747 : 525;
  const OUT_W = isStory ? 1080 : 1080;
  const OUT_H = isStory ? 1920 : 1350;
  const SCALE = OUT_W / VIEW_W;

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const dataJson = JSON.stringify({ slides, mode: isStory ? "story" : "feed" });
  const html = templateHtml.replace("__SLIDE_DATA__", dataJson);

  const tmpFile = path.join(os.tmpdir(), `render_${Date.now()}.html`);
  fs.writeFileSync(tmpFile, html, "utf-8");

  const executablePath = findPreinstalledChromium();
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: VIEW_H },
    deviceScaleFactor: SCALE,
  });

  await page.goto("file:///" + tmpFile.replace(/\\/g, "/"));
  await page.waitForTimeout(2200); // fonts

  const slideEls = await page.$$(".slide");
  for (let i = 0; i < slideEls.length; i++) {
    await slideEls[i].screenshot({ path: outPaths[i] });
    console.log(`  Slide ${i + 1}/${slideEls.length} -> ${outPaths[i]}`);
  }

  await browser.close();
  fs.unlinkSync(tmpFile);
}

module.exports = { renderSlides };

// CLI: node render_slides.js <slides.json> <mode> <outDir>
if (require.main === module) {
  const [, , slidesJsonPath, mode, outDir] = process.argv;
  if (!slidesJsonPath || !mode || !outDir) {
    console.log("Uso: node render_slides.js <slides.json> <story|feed> <outDir>");
    process.exit(1);
  }
  const slides = JSON.parse(fs.readFileSync(slidesJsonPath, "utf-8"));
  fs.mkdirSync(outDir, { recursive: true });
  const outPaths = slides.map((_, i) => path.join(outDir, `slide_${i + 1}.png`));
  renderSlides(slides, mode, outPaths).then(() => console.log("Concluído."));
}
