/**
 * Puxa env de produção da Vercel (CLI auth) e aplica migrations Elite.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import pg from "pg";

const teamId = "team_DOn8BXJdrOYBiIyxXCORgrmo";
const auth = JSON.parse(
  readFileSync(join(homedir(), "AppData", "Roaming", "com.vercel.cli", "Data", "auth.json"), "utf8"),
);
const url = new URL("https://api.vercel.com/v9/projects/varejo-investidor-site-m9uy/env?decrypt=true");
url.searchParams.set("teamId", teamId);
const res = await fetch(url, { headers: { Authorization: `Bearer ${auth.token}` } });
const { envs } = await res.json();
const map = Object.fromEntries(envs.map((e) => [e.key, e.value ?? ""]));
const conn = map.POSTGRES_URL_NON_POOLING || map.POSTGRES_URL || map.SUPABASE_DB_URL;
if (!conn) {
  console.error("POSTGRES_URL não encontrada na Vercel.");
  process.exit(1);
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
const root = process.cwd();
const files = ["20260310130000_elite_report.sql", "20260311120000_elite_operations_levels.sql"];

try {
  await client.connect();
  for (const file of files) {
    const sql = readFileSync(join(root, "supabase", "migrations", file), "utf8");
    console.log("Applying", file);
    await client.query(sql);
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  const { rows } = await client.query(
    "select to_regclass('public.elite_operations') as ops, to_regclass('public.elite_monthly_reports') as monthly",
  );
  console.log("Elite tables:", rows[0]);
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await client.end().catch(() => undefined);
}
