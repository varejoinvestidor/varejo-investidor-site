/**
 * Inspeciona planilha de sinais (abas, colunas, amostra).
 * Uso: node scripts/inspect-elite-xlsx.mjs "C:\path\Sinais 2024.xlsx"
 */
import { readFileSync, existsSync } from "node:fs";
import * as XLSX from "xlsx";

const file = process.argv[2];
if (!file || !existsSync(file)) {
  console.error("Arquivo não encontrado:", file);
  process.exit(1);
}

const wb = XLSX.read(readFileSync(file), { type: "buffer", cellDates: true });

console.log("Arquivo:", file);
console.log("Abas:", wb.SheetNames.length, "—", wb.SheetNames.slice(0, 20).join(" | "), wb.SheetNames.length > 20 ? "…" : "");

for (const name of wb.SheetNames.slice(0, 12)) {
  const sheet = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: false });
  const nonEmpty = rows.filter((r) => r?.some((c) => c != null && String(c).trim() !== ""));
  console.log("\n---", name, "---");
  console.log("Linhas com conteúdo:", nonEmpty.length);
  const headerIdx = nonEmpty.findIndex((r) =>
    r?.some((c) => typeof c === "string" && /sinal|pont(o)?\s*de\s*entrada|stop|take|pips|pares/i.test(String(c))),
  );
  const headerRow = headerIdx >= 0 ? nonEmpty[headerIdx] : nonEmpty[0];
  console.log("Cabeçalho (linha", headerIdx, "):", headerRow?.slice(0, 22));
  const sample = nonEmpty.slice(headerIdx >= 0 ? headerIdx + 1 : 1, headerIdx + 4);
  for (const row of sample) console.log("  ", row?.slice(0, 14));
}

// Resumo global se houver aba única de sinais
const main = wb.SheetNames.find((n) => /sinal/i.test(n)) ?? wb.SheetNames[0];
const allRows = XLSX.utils.sheet_to_json(wb.Sheets[main], { header: 1, defval: null });
console.log("\nAba principal sugerida:", main, "| linhas totais:", allRows.length);
