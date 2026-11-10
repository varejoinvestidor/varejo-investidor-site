import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const file =
  process.argv[2] ?? `C:\\Users\\PC\\Dropbox\\viniiip's shared workspace\\Sinais 2024.xlsx`;
const sheetName = process.argv[3] ?? "JANEIRO2024";

const wb = XLSX.read(readFileSync(file), { type: "buffer", cellDates: true });
const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1, defval: null });

for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  if (!r) continue;
  const joined = r.map((c) => String(c ?? "")).join("|").toLowerCase();
  if (joined.includes("ponto de entrada") || (joined.includes("pares") && joined.includes("stop"))) {
    console.log("HEADER", i, r);
    for (let j = 1; j <= 3; j++) console.log("ROW", rows[i + j]?.slice(0, 22));
    break;
  }
}
