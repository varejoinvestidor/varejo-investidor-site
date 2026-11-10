import { eliteSeptember2018HubOperations, eliteSeptember2018Monthly } from "../data/eliteSeptember2018";
import type { HubMonthlyReport, HubOperation } from "./mapToHub";

const REPORT_MONTH = "Setembro/2018";

export function mergeSeptember2018IntoHub<T extends { monthly: HubMonthlyReport[]; completedOperations: HubOperation[] }>(
  data: T,
): T {
  const hasMonth = data.monthly.some((m) => m.year === 2018 && m.monthIndex === 8);
  const monthly = hasMonth
    ? data.monthly.map((m) =>
        m.year === 2018 && m.monthIndex === 8
          ? {
              ...m,
              signals: eliteSeptember2018Monthly.signals,
              pips: eliteSeptember2018Monthly.pips,
              result: eliteSeptember2018Monthly.result,
              status: eliteSeptember2018Monthly.status,
              assets: eliteSeptember2018Monthly.assets,
            }
          : m,
      )
    : [...data.monthly, eliteSeptember2018Monthly].sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);

  const completedOperations = [
    ...data.completedOperations.filter((op) => op.reportMonth !== REPORT_MONTH),
    ...eliteSeptember2018HubOperations,
  ];

  return { ...data, monthly, completedOperations };
}
