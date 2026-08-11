const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const INPUT_HTML = "C:/Users/Arauj/AppData/Local/Temp/claude/C--Users-Arauj-OneDrive--rea-de-Trabalho-credenciais-do-instagram/43fec203-cfa7-4416-af42-8a8f199b394e/scratchpad/instagram_carousel.html";
const OUTPUT_DIR = "C:/Users/Arauj/claude-instagram/scripts/slides";
const TOTAL_SLIDES = 5;

const VIEW_W = 420;
const VIEW_H = 525;
const SCALE = 1080 / 420;

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: VIEW_W, height: VIEW_H },
    deviceScaleFactor: SCALE,
  });

  await page.goto("file:///" + INPUT_HTML.replace(/\\/g, "/"));
  await page.waitForTimeout(2500); // fonts

  await page.evaluate(() => {
    document.querySelectorAll(".ig-header,.ig-actions,.ig-caption,.dots")
      .forEach((el) => (el.style.display = "none"));
    const frame = document.querySelector(".ig-frame");
    frame.style.cssText = "width:420px;height:525px;max-width:none;border-radius:0;box-shadow:none;border:none;margin:0;";
    const viewport = document.querySelector(".carousel-viewport");
    viewport.style.cssText = "width:420px;height:525px;overflow:hidden;cursor:default;";
    document.body.style.cssText = "padding:0;margin:0;display:block;overflow:hidden;";
  });
  await page.waitForTimeout(300);

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    await page.evaluate((idx) => {
      const track = document.querySelector(".carousel-track");
      track.style.transition = "none";
      track.style.transform = `translateX(${-idx * 420}px)`;
    }, i);
    await page.waitForTimeout(200);

    const outPath = path.join(OUTPUT_DIR, `slide_${i + 1}.png`);
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: VIEW_W, height: VIEW_H },
    });
    console.log(`Exported slide ${i + 1}/${TOTAL_SLIDES} -> ${outPath}`);
  }

  await browser.close();
})();
