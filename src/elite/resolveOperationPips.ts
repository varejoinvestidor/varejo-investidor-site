import { computeSignalPips, formatPipsLabel } from "./pips";
import type { EliteOperationRow } from "./types";

export type ResolvedOperationPips = {
  pips: number;
  label: string;
};

/** Pips exibidos e consolidados: manual no admin; demais casos recalculados por ativo/níveis. */
export function resolveOperationPips(row: EliteOperationRow): ResolvedOperationPips {
  if (row.status === "active") {
    return { pips: 0, label: row.result_label?.trim() || "Em andamento" };
  }

  const manual =
    row.close_outcome === "manual" &&
    row.result_pips !== null &&
    row.result_pips !== undefined &&
    !Number.isNaN(row.result_pips);

  if (manual) {
    const label = row.result_label?.trim() || formatPipsLabel(row.result_pips);
    return { pips: row.result_pips, label };
  }

  const calc = computeSignalPips({
    asset: row.asset,
    direction: row.direction,
    status: row.status,
    entry: row.entry_price,
    take: row.take_price,
    stop: row.stop_price,
    closeOutcome: row.close_outcome ?? "take",
  });

  return {
    pips: calc.resultPips,
    label: calc.resultLabel || row.result_label,
  };
}
