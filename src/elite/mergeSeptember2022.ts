import { eliteSeptember2022HubOperations, eliteSeptember2022Monthly } from "../data/eliteSeptember2022";
import type { HubMonthlyReport, HubOperation } from "./mapToHub";

const REPORT_MONTH = "Setembro/2022";

/** Garante setembro/2022 no hub (níveis + pips da planilha; substitui linhas antigas do Supabase). */
export function mergeSeptember2022IntoHub<T extends { monthly: HubMonthlyReport[]; completedOperations: HubOperation[] }>(
  data: T,
): T {
  const hasMonth = data.monthly.some((m) => m.year === 2022 && m.monthIndex === 8);
  const monthly = hasMonth
    ? data.monthly.map((m) =>
        m.year === 2022 && m.monthIndex === 8
          ? {
              ...m,
              signals: eliteSeptember2022Monthly.signals,
              pips: eliteSeptember2022Monthly.pips,
              result: eliteSeptember2022Monthly.result,
              status: eliteSeptember2022Monthly.status,
              assets: eliteSeptember2022Monthly.assets,
            }
          : m,
      )
    : [...data.monthly, eliteSeptember2022Monthly].sort((a, b) => a.year - b.year || a.monthIndex - b.monthIndex);

  const completedOperations = [
    ...data.completedOperations.filter((op) => op.reportMonth !== REPORT_MONTH),
    ...eliteSeptember2022HubOperations,
  ];

  return {
    ...data,
    monthly,
    completedOperations,
  };
}
