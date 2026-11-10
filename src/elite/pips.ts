import { canonicalEliteAsset, isCryptoAsset, isIndexCfdAsset } from "./pipAsset";

export type EliteDirection = "Compra" | "Venda";
export type CloseOutcome = "take" | "stop" | "manual";

/** Tamanho de 1 pip em unidades de preço do par. */
export function pipSizeForAsset(asset: string): number {
  const a = canonicalEliteAsset(asset);
  if (a.includes("JPY")) return 0.01;
  if (a.includes("XAU") || a.includes("GOLD") || a.includes("XAG")) return 0.1;
  if (a.includes("USOIL") || a.includes("WTI") || a.includes("BRENT") || a.includes("OIL")) return 0.01;
  if (isIndexCfdAsset(a)) return 1;
  if (isCryptoAsset(a)) return 1;
  if (a.includes("/")) return 0.0001;
  return 0.01;
}

/** Arredonda pips: índices/cripto com 0,1; forex costuma inteiro. */
export function quantizePips(rawPips: number, asset: string): number {
  const a = canonicalEliteAsset(asset);
  const allowFraction = isIndexCfdAsset(a) || isCryptoAsset(a);
  if (allowFraction) return Math.round(rawPips * 10) / 10;
  return Math.round(rawPips);
}

export function pipsBetween(asset: string, direction: EliteDirection, from: number, to: number): number {
  if (!Number.isFinite(from) || !Number.isFinite(to)) return 0;
  const size = pipSizeForAsset(asset);
  const delta = direction === "Compra" ? to - from : from - to;
  return quantizePips(delta / size, asset);
}

export function formatPipsLabel(pips: number): string {
  return `${formatPipsDisplay(pips)} pips`;
}

/** Exibição numérica sem sufixo (cards e gráficos). */
export function formatPipsDisplay(pips: number): string {
  const sign = pips >= 0 ? "+" : "-";
  const abs = Math.abs(pips);
  const body = Number.isInteger(abs) ? String(abs) : abs.toFixed(1).replace(".", ",");
  return `${sign}${body}`;
}

export function computeSignalPips(input: {
  asset: string;
  direction: EliteDirection;
  status: "active" | "closed";
  entry: number | null;
  take: number | null;
  stop: number | null;
  closeOutcome?: CloseOutcome | null;
  manualPips?: number;
}): { resultPips: number; takePips: number; stopPips: number; resultLabel: string } {
  const entry = input.entry ?? NaN;
  const take = input.take ?? NaN;
  const stop = input.stop ?? NaN;

  const takePips = Number.isFinite(entry) && Number.isFinite(take) ? pipsBetween(input.asset, input.direction, entry, take) : 0;
  const stopPips =
    Number.isFinite(entry) && Number.isFinite(stop) ? -Math.abs(pipsBetween(input.asset, input.direction, entry, stop)) : 0;

  let resultPips = 0;
  let resultLabel = "Em andamento";

  if (input.status === "closed") {
    if (input.closeOutcome === "stop") resultPips = stopPips;
    else if (input.closeOutcome === "manual" && input.manualPips !== undefined) {
      resultPips = quantizePips(input.manualPips, input.asset);
    } else if (input.closeOutcome === "take" || (Number.isFinite(take) && takePips !== 0)) resultPips = takePips;
    else if (Number.isFinite(stop)) resultPips = stopPips;
    resultLabel = formatPipsLabel(resultPips);
  }

  return { resultPips, takePips, stopPips, resultLabel };
}
