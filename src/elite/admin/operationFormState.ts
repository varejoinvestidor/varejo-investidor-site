import type { EliteOperationRow } from "../types";
import { tradeResultFromRow, type TradeResultKey } from "./tradeResult";

export type OperationDraft = {
  signalNumber: string;
  asset: string;
  direction: "Compra" | "Venda";
  tradeResult: TradeResultKey;
  manualPips: string;
  entry: string;
  take: string;
  stop: string;
  reportMonth: string;
  tradedOn: string;
  updatedLabel: string;
  sortOrder: string;
  showPublic: boolean;
};

export const emptyOperationDraft = (): OperationDraft => ({
  signalNumber: "",
  asset: "",
  direction: "Compra",
  tradeResult: "take",
  manualPips: "",
  entry: "",
  take: "",
  stop: "",
  reportMonth: "",
  tradedOn: "",
  updatedLabel: "Atualizado hoje",
  sortOrder: "0",
  showPublic: true,
});

export function draftFromRow(row: EliteOperationRow): OperationDraft {
  return {
    signalNumber: row.signal_number != null ? String(row.signal_number) : "",
    asset: row.asset,
    direction: row.direction,
    tradeResult: tradeResultFromRow(row),
    manualPips: row.close_outcome === "manual" ? String(row.result_pips) : "",
    entry: row.entry_price != null ? String(row.entry_price) : "",
    take: row.take_price != null ? String(row.take_price) : "",
    stop: row.stop_price != null ? String(row.stop_price) : "",
    reportMonth: row.report_month,
    tradedOn: row.traded_on ?? "",
    updatedLabel: row.updated_label,
    sortOrder: String(row.sort_order),
    showPublic: row.show_public,
  };
}
