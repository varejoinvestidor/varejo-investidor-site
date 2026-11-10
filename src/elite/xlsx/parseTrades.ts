import { formatPairAsset, normalizeSheetPrice } from "./normalizePrices";

export type ParsedXlsxTrade = {
  signal: number;
  tradedOn: string;
  asset: string;
  direction: "Compra" | "Venda";
  entry: number | null;
  stop: number | null;
  take: number | null;
  pips: number;
  statusLabel: string;
  outcomeLabel: string;
};

type ColumnMap = {
  signal: number | null;
  date: number;
  asset: number;
  direction: number;
  entry: number;
  stop: number;
  take: number;
  pips: number;
  pipsEst: number | null;
  pipsProfit: number | null;
  pipsLoss: number | null;
  situation: number;
  outcome: number;
};

function colIndex(header: string[], matchers: string[]): number | null {
  const idx = header.findIndex((cell) => matchers.some((m) => cell === m || cell.includes(m)));
  return idx >= 0 ? idx : null;
}

function detectColumns(header: unknown[]): ColumnMap | null {
  const h = header.map((c) => String(c ?? "").trim().toLowerCase());

  const idxEntry = colIndex(h, ["ponto de entrada"]);
  const idxStop = colIndex(h, ["stop loss"]);
  const idxTake = colIndex(h, ["take profit"]);
  const idxPips = colIndex(h, ["pips ganho/perca", "pips ganho/p", "pips ganho"]);
  const idxPipsEst = colIndex(h, ["est.pips", "est pips"]);
  const idxPipsProfit = colIndex(h, ["pips profit"]);
  const idxPipsLoss = colIndex(h, ["pips loss"]);
  const idxSituation = colIndex(h, ["situação", "situacao"]);
  const idxOutcome = colIndex(h, ["status"]);

  if (idxEntry != null && idxStop != null && idxTake != null && idxPips != null) {
    const hasSinal = h[0] === "sinal" || h[0] === "sinais";
    return {
      signal: hasSinal ? 0 : null,
      date: hasSinal ? 1 : 0,
      asset: hasSinal ? 2 : 1,
      direction: hasSinal ? 3 : 2,
      entry: idxEntry,
      stop: idxStop,
      take: idxTake,
      pips: idxPips,
      pipsEst: idxPipsEst,
      pipsProfit: idxPipsProfit,
      pipsLoss: idxPipsLoss,
      situation: idxSituation ?? (hasSinal ? 16 : 14),
      outcome: idxOutcome ?? (hasSinal ? 17 : 15),
    };
  }

  return null;
}

function parseDirection(raw: unknown): "Compra" | "Venda" | null {
  const t = String(raw ?? "").toUpperCase();
  if (t.includes("COMPRA") || t === "BUY") return "Compra";
  if (t.includes("VENDA") || t === "SELL") return "Venda";
  return null;
}

function parsePips(raw: unknown): number | null {
  if (raw == null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** Coluna oficial; se vier 0/vazio, tenta Est.Pips e Profit/Loss (layout antigo). */
function resolvePipsFromRow(row: unknown[], col: ColumnMap): number | null {
  const primary = parsePips(row[col.pips]);
  if (primary != null && primary !== 0) return primary;

  const est = col.pipsEst != null ? parsePips(row[col.pipsEst]) : null;
  if (est != null && est !== 0) return est;

  const profit = col.pipsProfit != null ? parsePips(row[col.pipsProfit]) : null;
  const loss = col.pipsLoss != null ? parsePips(row[col.pipsLoss]) : null;
  if (profit != null && profit > 0) return profit;
  if (loss != null && loss > 0) return -Math.abs(loss);
  if (profit != null && profit < 0) return profit;
  if (loss != null && loss < 0) return loss;

  if (primary === 0) return 0;
  return primary ?? est;
}

function formatTradedOn(raw: unknown): string | null {
  if (raw instanceof Date && !Number.isNaN(raw.getTime())) {
    const y = raw.getFullYear();
    const m = String(raw.getMonth() + 1).padStart(2, "0");
    const d = String(raw.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const s = String(raw ?? "").trim();
  if (!s) return null;
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return null;
}

export function findTradeHeaderRow(rows: unknown[][]): number {
  return rows.findIndex((r) => detectColumns(r ?? []) != null);
}

export function parseTradeRows(rows: unknown[][]): ParsedXlsxTrade[] {
  const headerIdx = findTradeHeaderRow(rows);
  if (headerIdx < 0) return [];

  const COL = detectColumns(rows[headerIdx] ?? []);
  if (!COL) return [];

  const trades: ParsedXlsxTrade[] = [];
  let sortFallback = 0;
  for (const row of rows.slice(headerIdx + 1)) {
    if (!row?.[COL.asset]) continue;

    const asset = formatPairAsset(String(row[COL.asset]));
    const direction = parseDirection(row[COL.direction]);
    const pips = resolvePipsFromRow(row, COL);
    if (!asset || !direction || pips == null) continue;
    if (Math.abs(pips) > 1500) continue;

    const tradedOn = formatTradedOn(row[COL.date]);
    if (!tradedOn) continue;

    let signal = sortFallback + 1;
    if (COL.signal != null) {
      const rawSignal = row[COL.signal];
      if (rawSignal == null || rawSignal === "") continue;
      const n = Number(rawSignal);
      if (!Number.isFinite(n)) continue;
      signal = n;
    }
    sortFallback += 1;

    trades.push({
      signal,
      tradedOn,
      asset,
      direction,
      entry: normalizeSheetPrice(asset, row[COL.entry]),
      stop: normalizeSheetPrice(asset, row[COL.stop]),
      take: normalizeSheetPrice(asset, row[COL.take]),
      pips,
      statusLabel: String(row[COL.situation] ?? "Finalizado"),
      outcomeLabel: String(row[COL.outcome] ?? "").trim(),
    });
  }

  return trades;
}

export function closeOutcomeFromPips(pips: number): "take" | "stop" | "manual" {
  if (pips > 0) return "take";
  if (pips < 0) return "stop";
  return "manual";
}

export function formatPipsLabel(pips: number): string {
  const sign = pips >= 0 ? "+" : "";
  const abs = Math.abs(pips);
  const body = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace(/\.0$/, "");
  return `${sign}${body} pips`;
}
