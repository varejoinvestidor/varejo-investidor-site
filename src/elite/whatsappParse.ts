import { isValidEliteAsset, normalizeEliteAsset } from "./assets";

export type ParsedWhatsAppSignal = {
  signalNumber: number | null;
  asset: string;
  direction: "Compra" | "Venda";
  entry: number;
  take: number;
  stop: number;
};

function parsePrice(raw: string): number | null {
  const n = Number(raw.trim().replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** Ex.: 4.419 → 4419 (formato comum nos sinais do canal). */
export function parseSignalNumber(raw: string): number | null {
  const t = raw.trim();
  if (/^\d{1,3}\.\d{3}$/.test(t)) return Number(t.replace(".", ""));
  const n = Number(t.replace(",", "."));
  if (!Number.isFinite(n)) return null;
  return Math.round(n);
}

function sanitizeLine(line: string): string {
  return line
    .replace(/[^\x20-\x7E\u00C0-\u024F\u0600-\u06FF]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDirection(token: string): "Compra" | "Venda" {
  const d = token.toUpperCase();
  return d === "VENDA" || d === "SELL" ? "Venda" : "Compra";
}

/** Linha de entrada: forex, índices (USPX500), cripto, ações e ETFs. */
function parseTradeLine(clean: string): { asset: string; direction: "Compra" | "Venda"; entry: number } | null {
  const tradeMatch = clean.match(
    /([A-Z0-9][A-Z0-9./_-]{1,22})\s+(COMPRA|VENDA|BUY|SELL)\s+([\d.,]+)/i,
  );
  if (!tradeMatch) return null;
  const asset = normalizeEliteAsset(tradeMatch[1]);
  if (!isValidEliteAsset(asset)) return null;
  const entry = parsePrice(tradeMatch[3]);
  if (entry === null) return null;
  return { asset, direction: parseDirection(tradeMatch[2]), entry };
}

export function parseWhatsAppSignal(text: string): ParsedWhatsAppSignal | { error: string } {
  const lines = text
    .split(/\n/)
    .map((l) => sanitizeLine(l))
    .filter(Boolean);
  if (!lines.length) return { error: "Cole a mensagem do WhatsApp." };

  let signalNumber: number | null = null;
  let asset = "";
  let direction: "Compra" | "Venda" = "Compra";
  let entry: number | null = null;
  let take: number | null = null;
  let stop: number | null = null;

  for (const line of lines) {
    const signalMatch = line.match(/sinal:\s*([\d.,]+)/i);
    if (signalMatch) {
      signalNumber = parseSignalNumber(signalMatch[1]);
      continue;
    }

    const trade = parseTradeLine(line);
    if (trade) {
      asset = trade.asset;
      direction = trade.direction;
      entry = trade.entry;
      continue;
    }

    const takeMatch = line.match(/take\s*(?:profit)?[:\s]+([\d.,]+)/i);
    if (takeMatch) {
      take = parsePrice(takeMatch[1]);
      continue;
    }

    const stopMatch = line.match(/stop\s*(?:loss)?[:\s]+([\d.,]+)/i);
    if (stopMatch) {
      stop = parsePrice(stopMatch[1]);
      continue;
    }
  }

  if (!asset || entry === null || take === null || stop === null) {
    return {
      error:
        "Não foi possível ler ativo, entrada, take ou stop. Use AUD/JPY, USPX500, BTC/USD, SPY, AAPL etc.",
    };
  }

  return { signalNumber, asset, direction, entry, take, stop };
}
