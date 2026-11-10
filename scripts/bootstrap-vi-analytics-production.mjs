/**
 * Produção: POST /api/cron/vi-analytics-maintain com CRON_SECRET.
 * Uso: node --env-file=.env.vercel.production scripts/bootstrap-vi-analytics-production.mjs
 */
const base = (process.env.PUBLISHER_SITE_URL || "https://www.varejoinvestidor.com").replace(/\/$/, "");
const secret = process.env.CRON_SECRET?.trim();

if (!secret || secret.includes("[SENSITIVE]")) {
  console.error("Defina CRON_SECRET (mesmo valor da Vercel/GitHub Actions).");
  process.exit(1);
}

const res = await fetch(`${base}/api/cron/vi-analytics-maintain`, {
  headers: { Authorization: `Bearer ${secret}` },
});

const body = await res.json().catch(() => ({}));
console.log(res.status, body);
if (!res.ok) process.exit(1);
