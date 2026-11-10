import EliteReportHubEntry from "../../src/components/EliteReportHubEntry";
import { aggregateStats, mapMonthly, mapOperations } from "../../src/elite/mapToHub";
import { mergeSeptember2022IntoHub } from "../../src/elite/mergeSeptember2022";
import { fetchPublicEliteData } from "../../src/elite/queries";
import { reconcileMonthlyFromOperations } from "../../src/elite/reconcileMonthly";
import { computeTraderPerformance } from "../../src/elite/traderPerformance";

export const metadata = {
  title: "Relatórios Elite desde 2018 | Varejo Investidor",
  description:
    "Acompanhe o histórico do Canal Elite do Varejo Investidor desde agosto de 2018, com mais de 4.500 sinais ao vivo no WhatsApp, relatórios mensais e resultados consolidados.",
};

export const revalidate = 120;

export default async function RelatorioElitePage() {
  const remote = await fetchPublicEliteData();
  const hubData = remote
    ? (() => {
        const { active, closed } = mapOperations(remote.operations);
        const monthly = mapMonthly(reconcileMonthlyFromOperations(remote.monthly, remote.operations));
        const merged = mergeSeptember2022IntoHub({ monthly, completedOperations: closed });
        return {
          monthly: merged.monthly,
          activeOperations: active,
          completedOperations: merged.completedOperations,
          stats: aggregateStats(merged.completedOperations, merged.monthly),
          traderPerformance: computeTraderPerformance(remote.operations),
        };
      })()
    : undefined;

  return <EliteReportHubEntry initialLocale="pt" hubData={hubData} />;
}
