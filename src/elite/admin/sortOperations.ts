import type { EliteOperationRow } from "../types";

/** Em andamento no topo; depois mais recentes (data / nº sinal). */
export function sortAdminOperations(rows: EliteOperationRow[]): EliteOperationRow[] {
  return [...rows].sort((a, b) => {
    const aLive = a.status === "active";
    const bLive = b.status === "active";
    if (aLive && !bLive) return -1;
    if (bLive && !aLive) return 1;

    const da = a.traded_on ?? a.updated_label ?? "";
    const db = b.traded_on ?? b.updated_label ?? "";
    if (da !== db) return db.localeCompare(da);

    return (b.signal_number ?? 0) - (a.signal_number ?? 0);
  });
}
