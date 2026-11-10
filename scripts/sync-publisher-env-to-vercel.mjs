/**
 * Lê .env.local (Publisher) e envia para Vercel (Production).
 * Uso: preencha .env.local → node scripts/sync-publisher-env-to-vercel.mjs
 * Requer: vercel link no projeto varejo-investidor-site-m9uy + CLI autenticada.
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "CRON_SECRET",
  "PUBLISHER_SITE_TIMEZONE",
];

function parseEnv(content) {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const key = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim();
    map.set(key, val);
  }
  return map;
}

if (!existsSync(envPath)) {
  console.error("Arquivo .env.local não encontrado.");
  process.exit(1);
}

const env = parseEnv(readFileSync(envPath, "utf8"));
const missing = KEYS.filter((k) => !env.get(k) || !env.get(k)?.length);
if (missing.length) {
  console.error("Preencha no .env.local:", missing.join(", "));
  process.exit(1);
}

for (const key of KEYS) {
  const value = env.get(key);
  console.log(`→ Vercel env add ${key} (production)`);
  const r = spawnSync("npx", ["vercel", "env", "add", key, "production"], {
    input: value,
    cwd: root,
    shell: true,
    encoding: "utf8",
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (r.status !== 0) {
    console.error(`Falha ao definir ${key}. Se já existir, remova com: npx vercel env rm ${key} production`);
    process.exit(r.status ?? 1);
  }
}

console.log("\n✓ Variáveis enviadas. Rode: npx vercel deploy --prod (NEXT_PUBLIC_* entram no build).");
