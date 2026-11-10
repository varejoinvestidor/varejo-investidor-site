import type { EliteOperationCardModel } from "./EliteOperationCard";

export function sortOperationsByRecency(operations: EliteOperationCardModel[]): EliteOperationCardModel[] {
  return [...operations].sort((a, b) => {
    const na = a.signalNumber ?? 0;
    const nb = b.signalNumber ?? 0;
    if (nb !== na) return nb - na;
    return b.date.localeCompare(a.date);
  });
}
