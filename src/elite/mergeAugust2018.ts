import { eliteAugust2018HubOperations, eliteAugust2018Monthly } from "../data/eliteAugust2018";
import type { HubMonthlyReport, HubOperation } from "./mapToHub";

const REPORT_MONTH = "Agosto/2018";

/** Garante agosto/2018 no hub (planilha com # de sinal, níveis e pips). */
export function mergeAugust2018IntoHub<T extends { monthly: HubMonthlyReport[]; completedOperations: HubOperation[] }>(
  data: T,
): T {
  const hasMonth = data.monthly.some((m) => m.year === 2018 && m.monthIndex === 7);
  const monthly = hasMonth
    ? data.monthly.map((m) =>
        m.year === 2018 && m.monthIndex === 7
          ? {
              ...m,
              signals: eliteAugust2018Monthly.signals,
              pips: eliteAugust2018Monthly.pips,
              result: eliteAugust2018Monthly.result,
              status: eliteAugust2018Monthly.status,
              assets: eliteAugust2018Monthly.assets,
            }
          : m,
      )
    : [...data.monthly, eliteAugust2018Monthly].sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);

  const completedOperations = [
    ...data.completedOperations.filter((op) => op.reportMonth !== REPORT_MONTH),
    ...eliteAugust2018HubOperations,
  ];

  return {
    ...data,
    monthly,
    completedOperations,
  };
}
