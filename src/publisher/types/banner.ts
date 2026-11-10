export type ArticleBanner = {
  id: string;
  image_url: string;
  alt: string;
  href?: string;
  placement: "top" | "inline" | "bottom";
};

export function parseArticleBanners(raw: unknown): ArticleBanner[] {
  if (!Array.isArray(raw)) return [];

  const result: ArticleBanner[] = [];
  for (const item of raw) {
    const row = item as Record<string, unknown>;
    const image_url = String(row.image_url ?? "").trim();
    if (!image_url) continue;
    const id = String(row.id ?? "").trim() || `banner-${image_url.slice(-8)}`;
    result.push({
      id,
      image_url,
      alt: String(row.alt ?? "").trim() || "Banner",
      href: row.href ? String(row.href) : undefined,
      placement: (["top", "inline", "bottom"].includes(String(row.placement))
        ? row.placement
        : "inline") as ArticleBanner["placement"],
    });
  }
  return result;
}
