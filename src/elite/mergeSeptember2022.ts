import { eliteSeptember2022HubOperations, eliteSeptember2022Monthly } from "../data/eliteSeptember2022";
import type { HubMonthlyReport, HubOperation } from "./mapToHub";

function operationKey(op: HubOperation) {
  return `${op.reportMonth}|${op.asset}|${op.direction}|${op.pips}|${op.date}`;
}

/** Garante setembro/2022 no hub (fallback + merge com Supabase). */
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

  const keys = new Set(data.completedOperations.map(operationKey));
  const extra = eliteSeptember2022HubOperations.filter((op) => !keys.has(operationKey(op)));

  return {
    ...data,
    monthly,
    completedOperations: [...data.completedOperations, ...extra],
  };
}
