/**
 * Aplica migrations de um ano (manifest em src/data/eliteXlsx/<year>/).
 * Uso: node --env-file=.env.vercel.production scripts/install-elite-year.mjs 2022
 *
 * Meses curados (não sobrescrever): Setembro/2022 → SQL manual.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";

const year = Number(process.argv[2]);
if (!Number.isFinite(year)) {
  console.error("Uso: install-elite-year.mjs <year>");
  process.exit(1);
}

const CURATED_SQL_BY_MONTH = {
  "Setembro/2022": "20260320170000_elite_september_2022.sql",
};

const manifestPath = join(process.cwd(), "src", "data", "eliteXlsx", String(year), "_manifest.json");
if (!existsSync(manifestPath)) {
  console.error("Manifest ausente:", manifestPath);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

function resolveConn() {
  for (const c of [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
  ]) {
    const v = c?.trim();
    if (v && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  return null;
}

const conn = resolveConn();
if (!conn) {
  console.error("Defina POSTGRES_*.");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  for (const row of manifest.summary) {
    const curated = CURATED_SQL_BY_MONTH[row.month];
    const baseName = curated ?? row.sql.split(/[\\/]/).pop();
    const file = join(process.cwd(), "supabase", "migrations", baseName);
    if (!existsSync(file)) {
      console.error("SQL ausente:", file);
      process.exit(1);
    }
    const sql = readFileSync(file, "utf8");
    const tag = curated ? `${row.month} (curado)` : row.month;
    console.log("Applying", tag, "…", row.trades, "sinais");
    await client.query(sql);
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  const { rows } = await client.query(
    `select count(*)::int n, sum(pips)::int p from public.elite_monthly_reports where year = $1`,
    [year],
  );
  console.log("OK", year, rows[0]);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
