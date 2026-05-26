import { eliteSignals2018 } from "./eliteSignals2018";

export type EliteSignal = {
  sinal: number;
  data: string;
  ativo: string;
  direcao: "Compra" | "Venda";
  entrada: string;
  stop: string;
  alvo: string;
  resultado: string;
  status: string;
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
    signals: eliteSignals2018,
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
      { sinal: 4137, data: "15/01/2021", ativo: "XAU/USD", direcao: "Compra", entrada: "4638.15", stop: "4608.15", alvo: "4667.73", resultado: "+124", status: "Fechado" },
      { sinal: 4136, data: "14/01/2021", ativo: "EUR/USD", direcao: "Venda", entrada: "1.21640", stop: "1.21920", alvo: "1.21180", resultado: "-31", status: "Fechado" },
      { sinal: 4135, data: "13/01/2021", ativo: "GBP/USD", direcao: "Compra", entrada: "1.36320", stop: "1.35840", alvo: "1.37110", resultado: "+78", status: "Fechado" },
      { sinal: 4134, data: "12/01/2021", ativo: "BTC/USD", direcao: "Compra", entrada: "33580", stop: "32910", alvo: "34840", resultado: "+1260", status: "Fechado" },
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
      { sinal: 4098, data: "19/03/2024", ativo: "NAS100", direcao: "Compra", entrada: "18120.5", stop: "18042.0", alvo: "18284.0", resultado: "+163.5", status: "Fechado" },
      { sinal: 4097, data: "18/03/2024", ativo: "XAU/USD", direcao: "Compra", entrada: "2148.20", stop: "2139.40", alvo: "2162.90", resultado: "+147", status: "Fechado" },
      { sinal: 4096, data: "15/03/2024", ativo: "USD/JPY", direcao: "Venda", entrada: "149.320", stop: "149.680", alvo: "148.760", resultado: "-36", status: "Fechado" },
      { sinal: 4095, data: "14/03/2024", ativo: "USOIL", direcao: "Compra", entrada: "80.42", stop: "79.70", alvo: "82.10", resultado: "+168", status: "Fechado" },
    ],
  },
];

export function dedupeSignals(signals: EliteSignal[]) {
  const map = new Map<number, EliteSignal>();

  for (const signal of signals) {
    if (!map.has(signal.sinal)) {
      map.set(signal.sinal, signal);
    } else {
      const atual = map.get(signal.sinal)!;
      const novoMaisCompleto =
        Object.values(signal).filter(Boolean).length >
        Object.values(atual).filter(Boolean).length;

      if (novoMaisCompleto) {
        map.set(signal.sinal, signal);
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => a.sinal - b.sinal);
}

export const normalizedEliteReports = eliteReports.map((report) => ({
  ...report,
  signals: dedupeSignals(report.signals),
}));

export function getEliteReport(year: string) {
  return normalizedEliteReports.find((report) => report.year === year) ?? normalizedEliteReports[0];
}

export function getSignalResultValue(result: string) {
  return Number(result.replace(/[^\d.-]/g, ""));
}
