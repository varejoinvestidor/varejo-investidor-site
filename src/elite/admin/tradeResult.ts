import type { EliteOperationRow } from "../types";

export type TradeResultKey = "in_progress" | "take" | "stop" | "manual";

export const TRADE_RESULT_OPTIONS: { value: TradeResultKey; label: string }[] = [
  { value: "in_progress", label: "Em andamento" },
  { value: "take", label: "Fechou no take" },
  { value: "stop", label: "Fechou no stop" },
  { value: "manual", label: "Resultado manual (pips)" },
];

export function tradeResultFromRow(row: Pick<EliteOperationRow, "status" | "close_outcome">): TradeResultKey {
  if (row.status === "active") return "in_progress";
  if (row.close_outcome === "stop") return "stop";
  if (row.close_outcome === "manual") return "manual";
  return "take";
}

export function rowFromTradeResult(
  tradeResult: TradeResultKey,
): { status: "active" | "closed"; closeOutcome: "take" | "stop" | "manual" | null } {
  if (tradeResult === "in_progress") return { status: "active", closeOutcome: null };
  if (tradeResult === "stop") return { status: "closed", closeOutcome: "stop" };
  if (tradeResult === "manual") return { status: "closed", closeOutcome: "manual" };
  return { status: "closed", closeOutcome: "take" };
}

export function tradeResultLabel(key: TradeResultKey): string {
  return TRADE_RESULT_OPTIONS.find((o) => o.value === key)?.label ?? key;
}
