/**
 * Gera supabase/migrations/20260321120000_elite_august_2018.sql a partir do JSON/TS.
 * Uso: npx tsx scripts/generate-elite-august-2018-sql.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { eliteAugust2018Monthly, august2018SqlValueRows } from "../src/data/eliteAugust2018.ts";

const values = august2018SqlValueRows().join(",\n");

const sql = `-- Relatório Elite: agosto/2018 (sinais #16–#127, ${eliteAugust2018Monthly.signals} ops, ${eliteAugust2018Monthly.result})

insert into public.elite_monthly_reports (
  year,
  month_index,
  month_label,
  signals,
  pips,
  result_label,
  status_label,
  assets
)
values (
  2018,
  7,
  'Agosto',
  ${eliteAugust2018Monthly.signals},
  ${eliteAugust2018Monthly.pips},
  '${eliteAugust2018Monthly.result}',
  'Finalizado',
  array[${eliteAugust2018Monthly.assets.map((a) => `'${a}'`).join(", ")}]::text[]
)
on conflict (year, month_index) do update
set
  month_label = excluded.month_label,
  signals = excluded.signals,
  pips = excluded.pips,
  result_label = excluded.result_label,
  status_label = excluded.status_label,
  assets = excluded.assets,
  updated_at = now();

delete from public.elite_operations
where report_month = 'Agosto/2018';

insert into public.elite_operations (
  asset,
  direction,
  status,
  result_pips,
  result_label,
  report_month,
  traded_on,
  updated_label,
  sort_order,
  show_public,
  close_outcome,
  signal_tier,
  signal_number,
  entry_price,
  take_price,
  stop_price
)
values
${values};
`;

const out = join(process.cwd(), "supabase", "migrations", "20260321120000_elite_august_2018.sql");
writeFileSync(out, sql, "utf8");
console.log("Wrote", out);
