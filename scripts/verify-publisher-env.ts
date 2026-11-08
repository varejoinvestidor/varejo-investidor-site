/**
 * Valida variáveis do VI Publisher antes de deploy.
 * Uso: npm run verify:publisher
 */
import { config } from "dotenv";
import { existsSync } from "fs";

config({ path: ".env.local" });

type Check = { name: string; ok: boolean; detail: string };

const checks: Check[] = [];

function required(name: string, secret = false) {
  const value = process.env[name];
  const ok = Boolean(value?.trim());
  checks.push({
    name,
    ok,
    detail: ok ? (secret ? "definida (oculta)" : value!.slice(0, 24) + (value!.length > 24 ? "…" : "")) : "ausente",
  });
}

required("NEXT_PUBLIC_SUPABASE_URL");
required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
required("SUPABASE_SERVICE_ROLE_KEY", true);
required("CRON_SECRET", true);

const tz = process.env.PUBLISHER_SITE_TIMEZONE ?? "America/Sao_Paulo";
checks.push({ name: "PUBLISHER_SITE_TIMEZONE", ok: true, detail: tz });

try {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (url) new URL(url);
  checks.push({ name: "SUPABASE_URL parse", ok: Boolean(url), detail: url ? "URL válida" : "n/a" });
} catch {
  checks.push({ name: "SUPABASE_URL parse", ok: false, detail: "URL inválida" });
}

const hasLocalEnv = existsSync(".env.local");
checks.push({
  name: ".env.local",
  ok: hasLocalEnv,
  detail: hasLocalEnv ? "arquivo encontrado" : "use .env.example como base",
});

const failed = checks.filter((c) => !c.ok);

console.log("\nVI Publisher — verificação de ambiente\n");
for (const c of checks) {
  console.log(`${c.ok ? "✓" : "✗"} ${c.name.padEnd(32)} ${c.detail}`);
}

if (failed.length) {
  console.log("\nCorrija as variáveis acima (local: .env.local | produção: Vercel).\n");
  process.exit(1);
}

console.log("\nAmbiente mínimo OK para cron, admin e portal público.\n");
