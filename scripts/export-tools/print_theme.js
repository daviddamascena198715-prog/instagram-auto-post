// print_theme.js — Imprime o tema do dia (mesma rotação usada em daily_publish.js)
// Uso: node print_theme.js
const fs = require("fs");
const path = require("path");

const THEMES = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "content-bank", "themes.json"), "utf-8"));
const dayIndex = Math.floor(Date.now() / 86400000) % THEMES.length;
console.log(JSON.stringify(THEMES[dayIndex], null, 2));
