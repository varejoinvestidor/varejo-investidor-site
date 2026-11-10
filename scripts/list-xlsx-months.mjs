import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const file = process.argv[2];
const wb = XLSX.read(readFileSync(file), { type: "buffer", cellDates: true });

const MONTH_PT = {
  JANEIRO: 0,
  FEVEREIRO: 1,
  MARCO: 2,
  MARÇO: 2,
  ABRIL: 3,
  MAIO: 4,
  JUNHO: 5,
  JULHO: 6,
  AGOSTO: 7,
  SETEMBRO: 8,
  OUTUBRO: 9,
  NOVEMBRO: 10,
  DEZEMBRO: 11,
};

function parseSheetName(name) {
  const upper = name.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
  const yearMatch = upper.match(/(20\d{2})/);
  if (!yearMatch) return null;
  const year = Number(yearMatch[1]);
  for (const [m, idx] of Object.entries(MONTH_PT)) {
    if (upper.includes(m)) return { year, monthIndex: idx, label: m.charAt(0) + m.slice(1).toLowerCase() };
  }
  return null;
}

for (const name of wb.SheetNames) {
  const meta = parseSheetName(name);
  if (!meta) continue;
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: null });
  const headerIdx = rows.findIndex((r) => r?.[0] === "Sinal" || r?.[0] === "SINAIS");
  const trades = headerIdx >= 0 ? rows.slice(headerIdx + 1).filter((r) => r?.[2] && r?.[0]) : [];
  console.log(name, meta.year, meta.monthIndex, "trades:", trades.length);
}
