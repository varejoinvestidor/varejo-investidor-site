import { formatPipsLabel } from "./pips";
import { parseReportMonth } from "./reportMonth";
import { resolveOperationPips } from "./resolveOperationPips";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

function opsForMonthRow(row: EliteMonthlyReportRow, publicOps: EliteOperationRow[]): EliteOperationRow[] {
  return publicOps.filter((op) => {
    const parsed = parseReportMonth(op.report_month);
    if (!parsed) return false;
    return parsed.year === row.year && parsed.month_index === row.month_index;
  });
}

/** Recalcula pips/mês a partir dos sinais públicos (corrige valores antigos no banco). */
export function reconcileMonthlyFromOperations(
  monthly: EliteMonthlyReportRow[],
  operations: EliteOperationRow[],
): EliteMonthlyReportRow[] {
  const publicOps = operations.filter((o) => o.show_public);

  return monthly.map((row) => {
    const ops = opsForMonthRow(row, publicOps);
    if (!ops.length) return row;

    const closed = ops.filter((o) => o.status === "closed");
    const pips = closed.reduce((sum, o) => sum + resolveOperationPips(o).pips, 0);
    const hasActive = ops.some((o) => o.status === "active");
    const status_label =
      closed.length === ops.length && ops.length > 0 ? "Finalizado" : hasActive ? "Em andamento" : row.status_label;

    const closedCount = closed.length;
    const signals =
      closedCount > 0 && closedCount >= row.signals ? closedCount : Math.max(row.signals, closedCount, ops.length);

    return {
      ...row,
      signals,
      pips,
      result_label: formatPipsLabel(pips),
      status_label,
      assets: Array.from(new Set(ops.map((o) => o.asset).filter(Boolean))),
    };
  });
}
