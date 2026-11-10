export type EliteSignalTier = "free" | "elite";

export function parseEliteSignalTier(raw: unknown): EliteSignalTier {
  const v = String(raw ?? "").trim().toLowerCase();
  return v === "free" ? "free" : "elite";
}

/** No relatório público: Free exibe entrada, alvo e stop; Elite oculta alvo e stop. */
export function publicPriceVisible(tier: EliteSignalTier, field: "entry" | "take" | "stop"): boolean {
  if (tier === "free") return true;
  return field === "entry";
}
