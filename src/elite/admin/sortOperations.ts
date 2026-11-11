import { parseReportMonth } from "../reportMonth";
import type { EliteOperationRow } from "../types";

/** Timestamp usado para período (envio/atualização): traded_on → created_at → updated_at. */
export function operationActivityTimestamp(row: EliteOperationRow): number {
  const traded = tradedOnTimestamp(row.traded_on);
  if (traded > 0) return traded;
  for (const raw of [row.created_at, row.updated_at]) {
    if (!raw?.trim()) continue;
    const ms = Date.parse(raw);
    if (!Number.isFinite(ms)) continue;
    const year = new Date(ms).getFullYear();
    const maxYear = new Date().getFullYear() + 1;
    if (year >= 2018 && year <= maxYear) return ms;
  }
  return 0;
}

/** Datas absurdas no banco (ex.: 3030-03-24) não entram na ordenação cronológica. */
export function tradedOnTimestamp(tradedOn: string | null | undefined): number {
  if (!tradedOn?.trim()) return 0;
  const ms = Date.parse(tradedOn);
  if (!Number.isFinite(ms)) return 0;
  const year = new Date(ms).getFullYear();
  const maxYear = new Date().getFullYear() + 1;
  if (year < 2018 || year > maxYear) return 0;
  return ms;
}

/** Data exibida: ISO válido ou mês do relatório. */
export function formatOperationTradeDate(row: EliteOperationRow): string {
  if (tradedOnTimestamp(row.traded_on) > 0) return row.traded_on!;
  return row.report_month || "—";
}

function compareOperationsRecency(a: EliteOperationRow, b: EliteOperationRow): number {
  const na = a.signal_number ?? 0;
  const nb = b.signal_number ?? 0;
  if (nb !== na) return nb - na;

  const ta = tradedOnTimestamp(a.traded_on);
  const tb = tradedOnTimestamp(b.traded_on);
  if (tb !== ta) return tb - ta;

  return String(b.report_month ?? "").localeCompare(String(a.report_month ?? ""));
}

/** Em andamento no topo; fechados por nº do sinal (decrescente) e data válida. */
export function sortAdminOperations(rows: EliteOperationRow[]): EliteOperationRow[] {
  return [...rows].sort((a, b) => {
    const aLive = a.status === "active";
    const bLive = b.status === "active";
    if (aLive && !bLive) return -1;
    if (bLive && !aLive) return 1;
    return compareOperationsRecency(a, b);
  });
}

/** Últimos fechados públicos — prioriza sinais #4416+ (nº global) em vez de datas corrompidas. */
export function selectRecentClosedPublic(ops: EliteOperationRow[], limit = 12): EliteOperationRow[] {
  const closed = ops.filter((o) => o.status === "closed" && o.show_public);
  const recentNumbered = closed.filter((o) => (o.signal_number ?? 0) > 4415);
  const pool = recentNumbered.length > 0 ? recentNumbered : closed;
  return [...pool].sort(compareOperationsRecency).slice(0, limit);
}
