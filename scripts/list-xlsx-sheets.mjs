import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const file = process.argv[2];
const year = process.argv[3];
const wb = XLSX.read(readFileSync(file), { type: "buffer" });
for (const n of wb.SheetNames) {
  if (!year || n.includes(year)) console.log(n);
}
