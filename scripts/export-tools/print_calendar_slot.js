// print_calendar_slot.js — Imprime os dados de um slot do calendário editorial (dia + pilar)
// Uso: node print_calendar_slot.js <pilarId> [--day N]
// Dia 1 do calendário = 2026-08-13 (data de início definida pelo usuário). Sem --day, calcula
// o dia de hoje automaticamente e cicla de 30 em 30 dias.
const fs = require("fs");
const path = require("path");

const START_DATE = Date.UTC(2026, 7, 13); // 2026-08-13, dia 1 do calendário

const PILLARS = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "content-bank", "calendar-pillars.json"), "utf-8"));
const CALENDAR = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "content-bank", "calendar.json"), "utf-8"));

const pillarId = process.argv[2];
if (!pillarId || !PILLARS[pillarId]) {
  console.log(`ERRO: informe um pilar válido: ${Object.keys(PILLARS).join(", ")}`);
  process.exit(1);
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
  console.log(`ERRO: dia ${dayNumber} não encontrado no calendário (1-${CALENDAR.length}).`);
  process.exit(1);
}

const pillar = PILLARS[pillarId];
const tema = dayEntry[pillarId];
const capaPrompt = pillar.capaPromptTemplate.replace("{tema}", tema);

console.log(JSON.stringify({
  day: dayNumber,
  weekday: dayEntry.weekday,
  pillar: pillar.id,
  pillarLabel: pillar.label,
  format: pillar.format,
  slideCount: pillar.slideCount || null,
  tema,
  layoutNotes: pillar.layoutNotes,
  capaPrompt,
  cta: pillar.cta,
}, null, 2));
