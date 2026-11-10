export type ArticleBannerPreset = "formiga" | "lobo" | "fxpro" | "binance";

export type ArticleBanner = {
  id: string;
  image_url: string;
  alt: string;
  href?: string;
  placement: "top" | "inline" | "bottom";
  preset?: ArticleBannerPreset;
};

export function parseArticleBanners(raw: unknown): ArticleBanner[] {
  if (!Array.isArray(raw)) return [];

  const result: ArticleBanner[] = [];
  for (const item of raw) {
    const row = item as Record<string, unknown>;
    const presetRaw = String(row.preset ?? "").trim();
    const preset = ["formiga", "lobo", "fxpro", "binance"].includes(presetRaw)
      ? (presetRaw as ArticleBannerPreset)
      : undefined;
    const image_url = String(row.image_url ?? "").trim();
    if (!image_url && !preset) continue;
    const id = String(row.id ?? "").trim() || `banner-${image_url.slice(-8)}`;
    result.push({
      id,
      image_url,
      preset,
      alt: String(row.alt ?? "").trim() || "Banner",
      href: row.href ? String(row.href) : undefined,
      placement: (["top", "inline", "bottom"].includes(String(row.placement))
        ? row.placement
        : "inline") as ArticleBanner["placement"],
    });
  }
  return result;
}
