/**
 * Gera supabase/migrations/20260321130000_elite_september_2018.sql
 * Uso: npx tsx scripts/generate-elite-setembro-2018-sql.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { eliteSeptember2018Monthly, september2018SqlValueRows } from "../src/data/eliteSeptember2018.ts";

const values = september2018SqlValueRows().join(",\n");

const sql = `-- Relatório Elite: setembro/2018 (sinais #128–#227, ${eliteSeptember2018Monthly.signals} ops, ${eliteSeptember2018Monthly.result})

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
  8,
  'Setembro',
  ${eliteSeptember2018Monthly.signals},
  ${eliteSeptember2018Monthly.pips},
  '${eliteSeptember2018Monthly.result}',
  'Finalizado',
  array[${eliteSeptember2018Monthly.assets.map((a) => `'${a}'`).join(", ")}]::text[]
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
where report_month = 'Setembro/2018';

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

writeFileSync(join(process.cwd(), "supabase", "migrations", "20260321130000_elite_september_2018.sql"), sql, "utf8");
console.log("Wrote migration —", eliteSeptember2018Monthly.signals, "signals,", eliteSeptember2018Monthly.result);
