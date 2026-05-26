export type EliteSignal = {
  number: string;
  date: string;
  asset: string;
  direction: "Compra" | "Venda";
  entry: string;
  target: string;
  stop: string;
  result: string;
  status: "Fechado" | "Aberto";
};

export type EliteReport = {
  year: string;
  period: string;
  label: string;
  totalSignals: number;
  totalWins: number;
  totalLosses: number;
  winRate: string;
  totalPips: string;
  bestAsset: string;
  worstSequence: string;
  bestSequence: string;
  performanceImage: string;
  signals: EliteSignal[];
};

export const eliteReports: EliteReport[] = [
  {
    year: "2018",
    period: "AGO/2018",
    label: "Relatório Elite 2018/2019",
    totalSignals: 124,
    totalWins: 89,
    totalLosses: 35,
    winRate: "71.8%",
    totalPips: "+1.840",
    bestAsset: "XAU/USD",
    worstSequence: "3 perdas",
    bestSequence: "9 vitórias",
    performanceImage: "/signals/whatsapp-print-01.jpg",
    signals: [
      { number: "4169", date: "22/05/2026", asset: "GBP/USD", direction: "Compra", entry: "1.34497", target: "1.34766", stop: "1.34123", result: "-19", status: "Fechado" },
      { number: "4168", date: "21/05/2026", asset: "XAU/USD", direction: "Compra", entry: "4528.87", target: "4538.13", stop: "4518.57", result: "+89", status: "Fechado" },
      { number: "4167", date: "20/05/2026", asset: "EUR/USD", direction: "Venda", entry: "1.16363", target: "1.16272", stop: "1.16565", result: "+92", status: "Fechado" },
      { number: "4166", date: "20/05/2026", asset: "USOIL", direction: "Compra", entry: "94.833", target: "95.544", stop: "93.590", result: "+713", status: "Fechado" },
    ],
  },
  {
    year: "2021",
    period: "JAN/2021",
    label: "Relatório Elite 2021/2022/2023",
    totalSignals: 98,
    totalWins: 71,
    totalLosses: 27,
    winRate: "72.4%",
    totalPips: "+1.120",
    bestAsset: "BTC/USD",
    worstSequence: "2 perdas",
    bestSequence: "7 vitórias",
    performanceImage: "/signals/whatsapp-print-02.jpg",
    signals: [
      { number: "4137", date: "15/01/2021", asset: "XAU/USD", direction: "Compra", entry: "4638.15", target: "4667.73", stop: "4608.15", result: "+124", status: "Fechado" },
      { number: "4136", date: "14/01/2021", asset: "EUR/USD", direction: "Venda", entry: "1.21640", target: "1.21180", stop: "1.21920", result: "-31", status: "Fechado" },
      { number: "4135", date: "13/01/2021", asset: "GBP/USD", direction: "Compra", entry: "1.36320", target: "1.37110", stop: "1.35840", result: "+78", status: "Fechado" },
      { number: "4134", date: "12/01/2021", asset: "BTC/USD", direction: "Compra", entry: "33580", target: "34840", stop: "32910", result: "+1260", status: "Fechado" },
    ],
  },
  {
    year: "2024",
    period: "MAR/2024",
    label: "Relatório Elite 2024",
    totalSignals: 137,
    totalWins: 101,
    totalLosses: 36,
    winRate: "73.7%",
    totalPips: "+2.270",
    bestAsset: "NAS100",
    worstSequence: "3 perdas",
    bestSequence: "11 vitórias",
    performanceImage: "/signals/whatsapp-print-03.jpg",
    signals: [
      { number: "4098", date: "19/03/2024", asset: "NAS100", direction: "Compra", entry: "18120.5", target: "18284.0", stop: "18042.0", result: "+163.5", status: "Fechado" },
      { number: "4097", date: "18/03/2024", asset: "XAU/USD", direction: "Compra", entry: "2148.20", target: "2162.90", stop: "2139.40", result: "+147", status: "Fechado" },
      { number: "4096", date: "15/03/2024", asset: "USD/JPY", direction: "Venda", entry: "149.320", target: "148.760", stop: "149.680", result: "-36", status: "Fechado" },
      { number: "4095", date: "14/03/2024", asset: "USOIL", direction: "Compra", entry: "80.42", target: "82.10", stop: "79.70", result: "+168", status: "Fechado" },
    ],
  },
];

export function getEliteReport(year: string) {
  return eliteReports.find((report) => report.year === year) ?? eliteReports[0];
}

export function getSignalResultValue(result: string) {
  return Number(result.replace(/[^\d.-]/g, ""));
}
