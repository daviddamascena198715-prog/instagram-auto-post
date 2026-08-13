// publish_calendar_post.js — Publica um post do calendário editorial (imagem única ou carrossel)
// já gerado e aprovado. A escolha do dia usa a mesma lógica de print_calendar_slot.js.
//
// Uso (post único, pilares "conversao" e "quebra_objecoes"):
//   node publish_calendar_post.js <pilarId> --image <caminho.png> [--day N]
//
// Uso (carrossel, pilares "educacao", "entretenimento", "tendencia_ia"):
//   node publish_calendar_post.js <pilarId> --images <capa.png> <slide2.png> ... [--day N]
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");

process.loadEnvFile(path.join(__dirname, "..", ".env"));

const START_DATE = Date.UTC(2026, 7, 13);
const PILLARS = JSON.parse(fs.readFileSync(path.join(__dirname, "content-bank", "calendar-pillars.json"), "utf-8"));
const CALENDAR = JSON.parse(fs.readFileSync(path.join(__dirname, "content-bank", "calendar.json"), "utf-8"));

const pillarId = process.argv[2];
if (!pillarId || !PILLARS[pillarId]) {
  console.log(`ERRO: informe um pilar válido: ${Object.keys(PILLARS).join(", ")}`);
  process.exit(1);
}

function getImages() {
  const singleFlag = process.argv.indexOf("--image");
  const multiFlag = process.argv.indexOf("--images");
  if (singleFlag !== -1) return [process.argv[singleFlag + 1]];
  if (multiFlag !== -1) {
    const imgs = [];
    for (let i = multiFlag + 1; i < process.argv.length; i++) {
      if (process.argv[i].startsWith("--")) break;
      imgs.push(process.argv[i]);
    }
    return imgs;
  }
  return [];
}

const images = getImages();
if (images.length === 0) {
  console.log("ERRO: informe --image <arquivo> (post único) ou --images <arquivo1> <arquivo2> ... (carrossel)");
  process.exit(1);
}
for (const img of images) {
  if (!fs.existsSync(img)) {
    console.log(`ERRO: arquivo não encontrado: ${img}`);
    process.exit(1);
  }
}

let dayNumber;
const dayFlagIndex = process.argv.indexOf("--day");
if (dayFlagIndex !== -1 && process.argv[dayFlagIndex + 1]) {
  dayNumber = parseInt(process.argv[dayFlagIndex + 1], 10);
} else {
  const todayUTC = Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  const diffDays = Math.floor((todayUTC - START_DATE) / 86400000);
  dayNumber = (diffDays % CALENDAR.length) + 1;
  if (dayNumber < 1) dayNumber += CALENDAR.length;
}

const dayEntry = CALENDAR.find((d) => d.day === dayNumber);
if (!dayEntry) {
  console.log(`ERRO: dia ${dayNumber} não encontrado no calendário.`);
  process.exit(1);
}

const pillar = PILLARS[pillarId];
const tema = dayEntry[pillarId];
const caption = `${tema}\n\n${pillar.cta}`;

console.log(`Calendário — Dia ${dayNumber} (${dayEntry.weekday}) — Pilar: ${pillar.label} — modo: ${images.length > 1 ? "carrossel" : "único"}`);

const scriptPath = path.join(__dirname, "publish_instagram.js");
console.log(execFileSync("node", [scriptPath, "--images", ...images, "--caption", caption], { encoding: "utf-8" }));
