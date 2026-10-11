// refresh_instagram_token.js — renova o token de longa duração do Instagram
// (Instagram API with Instagram Login) por mais ~60 dias.
//
// Uso: node scripts/refresh_instagram_token.js [--print-token]
//
// Só funciona com token AINDA VÁLIDO (e com mais de 24h de vida). Se já venceu,
// é preciso gerar um novo no painel da Meta (App > Instagram > API setup with
// Instagram login > Generate token).
//
// Saída (nunca imprime o token, a não ser com --print-token):
//   exit 0  — renovado, mesma string de token (nada a atualizar)
//   exit 10 — renovado, mas a Meta devolveu um token DIFERENTE: o .env local foi
//             atualizado; quem guarda o token em outro lugar (prompt da rotina)
//             precisa atualizar também
//   exit 1  — falha (token vencido/inválido, rede, etc.)
const fs = require("fs");
const path = require("path");

const ENV_PATH = path.join(__dirname, "..", ".env");
const printToken = process.argv.includes("--print-token");

function readEnv() {
  const out = {};
  if (!fs.existsSync(ENV_PATH)) return out;
  for (const line of fs.readFileSync(ENV_PATH, "utf-8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !line.trim().startsWith("#")) out[m[1]] = m[2];
  }
  return out;
}

function mask(t) {
  return t.length > 12 ? `${t.slice(0, 6)}…${t.slice(-6)}` : "***";
}

async function main() {
  const env = readEnv();
  const token = process.env.INSTAGRAM_ACCESS_TOKEN || env.INSTAGRAM_ACCESS_TOKEN;
  const host = process.env.META_GRAPH_HOST || env.META_GRAPH_HOST || "graph.instagram.com";
  if (!token) {
    console.error("ERRO: INSTAGRAM_ACCESS_TOKEN não encontrado (.env ou variável de ambiente).");
    process.exitCode = 1; return;
  }

  const url = `https://${host}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`;
  let data;
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (e) {
    console.error("ERRO de rede ao renovar o token:", e.message);
    process.exitCode = 1; return;
  }

  if (data.error || !data.access_token) {
    const msg = data.error ? data.error.message : JSON.stringify(data);
    console.error(`ERRO ao renovar o token: ${msg}`);
    console.error("Se o token já venceu, gere um novo no painel da Meta (API setup with Instagram login > Generate token).");
    process.exitCode = 1; return;
  }

  const days = data.expires_in ? Math.floor(data.expires_in / 86400) : "?";
  const changed = data.access_token !== token;
  console.log(`Token renovado. Validade: ~${days} dias. Token mudou: ${changed ? "SIM" : "não"} (${mask(data.access_token)}).`);

  if (changed) {
    if (fs.existsSync(ENV_PATH)) {
      const updated = fs.readFileSync(ENV_PATH, "utf-8").replace(/^(\s*INSTAGRAM_ACCESS_TOKEN\s*=).*$/m, `$1${data.access_token}`);
      fs.writeFileSync(ENV_PATH, updated);
      console.log(".env local atualizado com o novo token.");
    }
    if (printToken) console.log(`NEW_TOKEN=${data.access_token}`);
    console.log("ATENÇÃO: o token mudou — atualize também onde ele está guardado fora do .env (prompt da rotina).");
    process.exitCode = 10; return;
  }
  process.exitCode = 0; return;
}

main();
