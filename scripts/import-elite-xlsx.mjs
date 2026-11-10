/**
 * Importa sinais da planilha Viniiip para JSON + SQL (por ano ou mês).
 *
 * Uso:
 *   node scripts/import-elite-xlsx.mjs --file "C:\...\Sinais 2024.xlsx" --year 2024
 *   node scripts/import-elite-xlsx.mjs --file "..." --year 2024 --install
 *
 * Saída: src/data/eliteXlsx/<year>/<monthIndex>.json + migrations geradas
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import * as XLSX from "xlsx";
import pg from "pg";

const {
  parseEliteSheetTabName,
} = await import("../src/elite/xlsx/sheetMeta.ts");
const { parseTradeRows } = await import("../src/elite/xlsx/parseTrades.ts");

function parseArgs(argv) {
  const out = { file: null, year: null, install: false, dry: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--install") out.install = true;
    else if (a === "--dry-run") out.dry = true;
    else if (a === "--file") out.file = argv[++i];
    else if (a === "--year") out.year = Number(argv[++i]);
  }
  return out;
}

function resolveConn() {
  const ordered = [process.env.POSTGRES_URL_NON_POOLING, process.env.POSTGRES_URL, process.env.SUPABASE_DB_URL];
  for (const c of ordered) {
    const v = c?.trim();
    if (v && !/[@/]base([.:/]|$)/i.test(v)) return v;
  }
  return null;
}

function monthlySql(meta, trades) {
  const totalPips = Math.round(trades.reduce((s, t) => s + t.pips, 0));
  const assets = [...new Set(trades.map((t) => t.asset))].slice(0, 8);
  const sign = totalPips >= 0 ? "+" : "";
  const resultLabel = `${sign}${totalPips.toLocaleString("pt-BR")} pips`;

  const valueRows = trades.map((t, i) => {
    const outcome = t.pips > 0 ? "take" : t.pips < 0 ? "stop" : "manual";
    const storagePips = Math.round(t.pips);
    const label = `${t.pips >= 0 ? "+" : ""}${t.pips} pips`.replace(/'/g, "''");
    const entry = t.entry ?? "null";
    const stop = t.stop ?? "null";
    const take = t.take ?? "null";
    return `  ('${t.asset}', '${t.direction}', 'closed', ${storagePips}, '${label}', '${meta.reportMonth}', '${t.tradedOn}', 'Finalizado', ${i + 1}, true, '${outcome}', 'elite', ${t.signal}, ${entry}, ${take}, ${stop})`;
  });

  return `-- Elite: ${meta.reportMonth} (${trades.length} sinais, ${resultLabel})
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (${meta.year}, ${meta.monthIndex}, '${meta.monthLabel}', ${trades.length}, ${totalPips}, '${resultLabel}', 'Finalizado', array[${assets.map((a) => `'${a}'`).join(", ")}]::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = '${meta.reportMonth}';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
${valueRows.join(",\n")};
`;
}

const args = parseArgs(process.argv);
if (!args.file || !existsSync(args.file)) {
  console.error("Use: node scripts/import-elite-xlsx.mjs --file <xlsx> --year 2024");
  process.exit(1);
}

const wb = XLSX.read(readFileSync(args.file), { type: "buffer", cellDates: true });
const batches = [];

for (const sheetName of wb.SheetNames) {
  const meta = parseEliteSheetTabName(sheetName);
  if (!meta) continue;
  if (args.year != null && meta.year !== args.year) continue;

  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, defval: null });
  const trades = parseTradeRows(rows);
  if (!trades.length) continue;

  batches.push({ meta, trades });
}

batches.sort((a, b) => a.meta.year - b.meta.year || a.meta.monthIndex - b.meta.monthIndex);

const outRoot = join(process.cwd(), "src", "data", "eliteXlsx", String(args.year ?? "all"));
mkdirSync(outRoot, { recursive: true });

const migDir = join(process.cwd(), "supabase", "migrations");
let totalTrades = 0;
const summary = [];

for (const { meta, trades } of batches) {
  const jsonPath = join(outRoot, `${meta.monthIndex}-${meta.monthLabel.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")}.json`);
  writeFileSync(jsonPath, JSON.stringify({ meta, trades }, null, 2), "utf8");

  const slug = `${meta.year}${String(meta.monthIndex + 1).padStart(2, "0")}`;
  const sqlPath = join(migDir, `20260401${slug}_elite_${meta.year}_${meta.monthLabel.toLowerCase()}.sql`);
  if (!args.dry) writeFileSync(sqlPath, monthlySql(meta, trades), "utf8");

  const monthPips = Math.round(trades.reduce((s, t) => s + t.pips, 0));
  totalTrades += trades.length;
  summary.push({ month: meta.reportMonth, trades: trades.length, pips: monthPips, sql: sqlPath });
  console.log(meta.reportMonth, "→", trades.length, "sinais,", monthPips, "pips");
}

writeFileSync(join(outRoot, "_manifest.json"), JSON.stringify({ file: args.file, summary, totalTrades }, null, 2));
console.log("\nTotal etapa:", totalTrades, "sinais em", batches.length, "meses");

if (args.install && !args.dry) {
  const conn = resolveConn();
  if (!conn) {
    console.error("POSTGRES_* necessário (vercel env pull)");
    process.exit(1);
  }
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  await client.connect();
  for (const { month, sql } of summary.map((s) => ({ month: s.month, sql: readFileSync(s.sql, "utf8") }))) {
    console.log("Applying", month);
    await client.query(sql);
  }
  await client.query(`NOTIFY pgrst, 'reload schema';`);
  await client.end();
  console.log("Supabase atualizado.");
}
