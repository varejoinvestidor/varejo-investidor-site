export type EliteMonthlyReportRow = {
  id: string;
  year: number;
  month_index: number;
  month_label: string;
  signals: number;
  pips: number;
  result_label: string;
  status_label: string;
  assets: string[];
};

export type EliteSignalTier = "free" | "elite";

export type EliteOperationRow = {
  id: string;
  asset: string;
  direction: "Compra" | "Venda";
  status: "active" | "closed";
  signal_tier?: EliteSignalTier | null;
  result_pips: number;
  result_label: string;
  report_month: string;
  traded_on: string | null;
  updated_label: string;
  sort_order: number;
  show_public: boolean;
  signal_number: number | null;
  entry_price: number | null;
  take_price: number | null;
  stop_price: number | null;
  close_outcome: "take" | "stop" | "manual" | null;
};

export type EliteOperationInput = Omit<EliteOperationRow, "id"> & { id?: string };

export type EliteMonthlyInput = Omit<EliteMonthlyReportRow, "id"> & { id?: string };
