import { ELITE_PUBLIC_OPS_PAGE_SIZE } from "../../elite/constants";

/** Histórico de resultados: 9 cards por página (todas as larguras). */
export function useOperationsPageSize() {
  return ELITE_PUBLIC_OPS_PAGE_SIZE;
}
