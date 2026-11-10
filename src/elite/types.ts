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

export type EliteOperationRow = {
  id: string;
  asset: string;
  direction: "Compra" | "Venda";
  status: "active" | "closed";
  result_pips: number;
  result_label: string;
  report_month: string;
  traded_on: string | null;
  updated_label: string;
  sort_order: number;
  show_public: boolean;
};

export type EliteOperationInput = Omit<EliteOperationRow, "id"> & { id?: string };

export type EliteMonthlyInput = Omit<EliteMonthlyReportRow, "id"> & { id?: string };
