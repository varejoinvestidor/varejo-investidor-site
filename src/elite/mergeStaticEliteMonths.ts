import { mergeAugust2018IntoHub } from "./mergeAugust2018";
import { mergeSeptember2018IntoHub } from "./mergeSeptember2018";
import { mergeSeptember2022IntoHub } from "./mergeSeptember2022";
import type { HubMonthlyReport, HubOperation } from "./mapToHub";

/** Meses históricos com planilha local (substituem linhas do Supabase no hub público). */
export function mergeStaticEliteMonthsIntoHub<T extends { monthly: HubMonthlyReport[]; completedOperations: HubOperation[] }>(
  data: T,
): T {
  return mergeAugust2018IntoHub(mergeSeptember2018IntoHub(mergeSeptember2022IntoHub(data)));
}
