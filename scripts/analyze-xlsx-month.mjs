import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const file = process.argv[2];
const sheet = process.argv[3];
const wb = XLSX.read(readFileSync(file), { type: "buffer", cellDates: true });
const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, defval: null });
const headerIdx = rows.findIndex((r) =>
  String(r?.[0] ?? "")
    .toLowerCase()
    .includes("data") && String(r?.[1] ?? "").toLowerCase().includes("pares"),
);
const h = rows[headerIdx] ?? [];
console.log("sheet", sheet, "header", headerIdx);
const idxPips = h.findIndex((c) => String(c ?? "").toLowerCase().includes("pips ganho"));
const idxForma = h.findIndex((c) => String(c ?? "").toLowerCase() === "forma");
let all = 0;
let sinais = 0;
let byForma = new Map();
for (const row of rows.slice(headerIdx + 1)) {
  if (!row?.[1]) continue;
  const pips = row[idxPips];
  if (pips == null || pips === "") continue;
  const n = Number(pips);
  if (!Number.isFinite(n) || Math.abs(n) > 1500) continue;
  all++;
  const forma = String(row[idxForma] ?? "").trim();
  byForma.set(forma, (byForma.get(forma) ?? 0) + 1);
  if (forma.toLowerCase() === "sinais") sinais++;
}
console.log({ all, sinais, byForma: Object.fromEntries(byForma) });
