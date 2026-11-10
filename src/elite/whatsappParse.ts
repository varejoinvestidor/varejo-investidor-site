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

export function parseWhatsAppSignal(text: string): ParsedWhatsAppSignal | { error: string } {
  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return { error: "Cole a mensagem do WhatsApp." };

  let signalNumber: number | null = null;
  let asset = "";
  let direction: "Compra" | "Venda" = "Compra";
  let entry: number | null = null;
  let take: number | null = null;
  let stop: number | null = null;

  for (const line of lines) {
    const clean = line.replace(/[^\x20-\x7E\u00C0-\u024F\u0600-\u06FF]/g, " ").replace(/\s+/g, " ").trim();

    const signalMatch = clean.match(/sinal:\s*([\d.,]+)/i);
    if (signalMatch) {
      signalNumber = parseSignalNumber(signalMatch[1]);
      continue;
    }

    const tradeMatch = clean.match(/([A-Z0-9]{2,10}\/[A-Z0-9]{2,10})\s+(COMPRA|VENDA|BUY|SELL)\s+([\d.,]+)/i);
    if (tradeMatch) {
      asset = tradeMatch[1].toUpperCase();
      const dir = tradeMatch[2].toUpperCase();
      direction = dir === "VENDA" || dir === "SELL" ? "Venda" : "Compra";
      entry = parsePrice(tradeMatch[3]);
      continue;
    }

    const takeMatch = clean.match(/take\s*(?:profit)?[:\s]+([\d.,]+)/i);
    if (takeMatch) {
      take = parsePrice(takeMatch[1]);
      continue;
    }

    const stopMatch = clean.match(/stop\s*(?:loss)?[:\s]+([\d.,]+)/i);
    if (stopMatch) {
      stop = parsePrice(stopMatch[1]);
      continue;
    }
  }

  if (!asset || entry === null || take === null || stop === null) {
    return {
      error: "Não foi possível ler ativo, entrada, take ou stop. Confira o formato da mensagem.",
    };
  }

  return { signalNumber, asset, direction, entry, take, stop };
}
