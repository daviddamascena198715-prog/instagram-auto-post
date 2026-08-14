// publish_calendar_post.js — Publica um post do calendário editorial (imagem única ou carrossel)
// já gerado e aprovado. A escolha do dia usa a mesma lógica de print_calendar_slot.js.
//
// Uso (post único, pilares "conversao" e "quebra_objecoes"):
//   node publish_calendar_post.js <pilarId> --image <caminho.png> [--day N] [--body-file <arquivo.txt>]
//
// Uso (carrossel, pilares "educacao", "entretenimento", "tendencia_ia"):
//   node publish_calendar_post.js <pilarId> --images <capa.png> <slide2.png> ... [--day N] [--body-file <arquivo.txt>]
//
// --body-file: arquivo de texto com o corpo da legenda que ENTREGA o que o
// gancho promete (ex: se o tema diz "3 motivos", o corpo lista os 3 motivos).
// A legenda final fica: tema (gancho) + corpo + cta fixo do pilar. Sem
// --body-file, a legenda cai pro formato antigo (só tema + cta) — evitar
// isso sempre que o tema fizer uma promessa de conteúdo (números, listas).
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

function getBody() {
  const idx = process.argv.indexOf("--body-file");
  if (idx !== -1 && process.argv[idx + 1]) {
    const bodyPath = process.argv[idx + 1];
    if (!fs.existsSync(bodyPath)) {
      console.log(`ERRO: --body-file não encontrado: ${bodyPath}`);
      process.exit(1);
    }
    return fs.readFileSync(bodyPath, "utf-8").trim();
  }
  return null;
}

const pillar = PILLARS[pillarId];
const tema = dayEntry[pillarId];
const body = getBody();
const caption = body ? `${tema}\n\n${body}\n\n${pillar.cta}` : `${tema}\n\n${pillar.cta}`;

// Checagem anti-duplicidade: evita publicar 2x o mesmo tema/pilar no mesmo
// dia (ex: quando o disparo automático atrasado roda depois de uma
// publicação manual já ter saído). Compara os primeiros 40 caracteres do
// tema contra legendas de posts das últimas 20h.
async function checkAlreadyPublishedToday() {
  const GRAPH_HOST = process.env.META_GRAPH_HOST || "graph.instagram.com";
  const API_VER = process.env.META_API_VERSION || "v21.0";
  const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const resp = await fetch(`https://${GRAPH_HOST}/${API_VER}/me/media?fields=id,caption,timestamp&access_token=${TOKEN}&limit=10`);
  const data = await resp.json();
  const cutoff = Date.now() - 20 * 60 * 60 * 1000;
  const temaStart = tema.slice(0, 40);
  return (data.data || []).find((m) => {
    const t = new Date(m.timestamp).getTime();
    return t > cutoff && m.caption && m.caption.startsWith(temaStart);
  });
}

async function run() {
  if (!process.argv.includes("--force")) {
    const dup = await checkAlreadyPublishedToday();
    if (dup) {
      console.log(`AVISO: já existe um post recente com o mesmo tema do dia (Post ID ${dup.id}, publicado em ${dup.timestamp}).`);
      console.log("Abortando pra evitar duplicidade. Se quiser publicar mesmo assim, rode de novo com --force.");
      process.exit(1);
    }
  }

  console.log(`Calendário — Dia ${dayNumber} (${dayEntry.weekday}) — Pilar: ${pillar.label} — modo: ${images.length > 1 ? "carrossel" : "único"}`);

  const scriptPath = path.join(__dirname, "publish_instagram.js");
  console.log(execFileSync("node", [scriptPath, "--images", ...images, "--caption", caption], { encoding: "utf-8" }));
}

run();
