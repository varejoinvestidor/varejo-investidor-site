export type ArticleBannerPreset =
  | "formiga"
  | "lobo"
  | "elite"
  | "educacao"
  | "select"
  | "private"
  | "fxpro"
  | "binance";

const ARTICLE_BANNER_PRESET_IDS: ArticleBannerPreset[] = [
  "formiga",
  "lobo",
  "elite",
  "educacao",
  "select",
  "private",
  "fxpro",
  "binance",
];

export type ArticleBanner = {
  id: string;
  image_url: string;
  alt: string;
  href?: string;
  placement: "top" | "inline" | "bottom";
  /** 0–100: onde inserir no corpo quando `placement` = inline (padrão 50). */
  inline_position?: number;
  preset?: ArticleBannerPreset;
  /** Largura total do bloco no artigo (55–100). */
  display_scale?: number;
  /** Enquadramento horizontal da arte (0–100). */
  image_focus_x?: number;
  /** Enquadramento vertical da arte (0–100). */
  image_focus_y?: number;
  /** Zoom da imagem no banner de canal (70–120, padrão 103). */
  image_scale?: number;
  /** Altura do painel visual do banner. */
  panel_height?: "full" | "medium" | "compact";
};

export const PUBLISHER_BANNERS_CONTENT_KEY = "publisher_banners";

export function parseArticleBanners(raw: unknown): ArticleBanner[] {
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw) as unknown;
    } catch {
      return [];
    }
  }
  if (!Array.isArray(raw)) return [];

  const result: ArticleBanner[] = [];
  for (const item of raw) {
    const row = item as Record<string, unknown>;
    const presetRaw = String(row.preset ?? "").trim();
    const preset = ARTICLE_BANNER_PRESET_IDS.includes(presetRaw as ArticleBannerPreset)
      ? (presetRaw as ArticleBannerPreset)
      : undefined;
    const image_url = String(row.image_url ?? "").trim();
    if (!image_url && !preset) continue;
    const id = String(row.id ?? "").trim() || `banner-${image_url.slice(-8)}`;
    const posRaw = Number(row.inline_position);
    const inline_position =
      Number.isFinite(posRaw) && posRaw >= 0 && posRaw <= 100 ? Math.round(posRaw) : undefined;
    const display_scale = clampOptionalInt(row.display_scale, 55, 100);
    const image_focus_x = clampOptionalInt(row.image_focus_x, 0, 100);
    const image_focus_y = clampOptionalInt(row.image_focus_y, 0, 100);
    const image_scale = clampOptionalInt(row.image_scale, 70, 120);
    const panelRaw = String(row.panel_height ?? "").trim();
    const panel_height = (["full", "medium", "compact"] as const).includes(panelRaw as "full")
      ? (panelRaw as ArticleBanner["panel_height"])
      : undefined;
    result.push({
      id,
      image_url,
      preset,
      alt: String(row.alt ?? "").trim() || "Banner",
      href: row.href ? String(row.href) : undefined,
      placement: (["top", "inline", "bottom"].includes(String(row.placement))
        ? row.placement
        : "inline") as ArticleBanner["placement"],
      ...(inline_position !== undefined ? { inline_position } : {}),
      ...(display_scale !== undefined ? { display_scale } : {}),
      ...(image_focus_x !== undefined ? { image_focus_x } : {}),
      ...(image_focus_y !== undefined ? { image_focus_y } : {}),
      ...(image_scale !== undefined ? { image_scale } : {}),
      ...(panel_height ? { panel_height } : {}),
    });
  }
  return result;
}

/** JSON gravável em `articles.banners` (jsonb). */
export function serializeArticleBannersForSave(banners: ArticleBanner[]): Record<string, unknown>[] {
  return banners.map((b) => ({
    id: b.id,
    image_url: b.image_url.trim(),
    alt: b.alt.trim() || "Banner",
    placement: b.placement,
    ...(b.href?.trim() ? { href: b.href.trim() } : {}),
    ...(b.preset ? { preset: b.preset } : {}),
    ...(b.placement === "inline" && b.inline_position !== undefined ? { inline_position: b.inline_position } : {}),
    ...(b.display_scale !== undefined ? { display_scale: b.display_scale } : {}),
    ...(b.image_focus_x !== undefined ? { image_focus_x: b.image_focus_x } : {}),
    ...(b.image_focus_y !== undefined ? { image_focus_y: b.image_focus_y } : {}),
    ...(b.image_scale !== undefined ? { image_scale: b.image_scale } : {}),
    ...(b.panel_height ? { panel_height: b.panel_height } : {}),
  }));
}

function clampOptionalInt(raw: unknown, min: number, max: number): number | undefined {
  const n = Number(raw);
  if (!Number.isFinite(n)) return undefined;
  const v = Math.round(n);
  if (v < min || v > max) return undefined;
  return v;
}

export function embedBannersInContent(content: Record<string, unknown>, banners: ArticleBanner[]): Record<string, unknown> {
  const next = { ...content };
  const serialized = serializeArticleBannersForSave(banners);
  if (serialized.length) next[PUBLISHER_BANNERS_CONTENT_KEY] = serialized;
  else delete next[PUBLISHER_BANNERS_CONTENT_KEY];
  return next;
}

export function bannersFromArticleContent(content: unknown): ArticleBanner[] {
  if (!content || typeof content !== "object") return [];
  return parseArticleBanners((content as Record<string, unknown>)[PUBLISHER_BANNERS_CONTENT_KEY]);
}

/** Coluna `articles.banners` ou cópia em `content.publisher_banners` (fallback). */
export function resolveArticleBannersList(columnRaw: unknown, content: unknown): ArticleBanner[] {
  const fromColumn = parseArticleBanners(columnRaw);
  if (fromColumn.length) return fromColumn;
  return bannersFromArticleContent(content);
}

/** Banners antigos (SVG/faixa) salvos sem `preset`. */
const CHANNEL_BANNER_PRESETS: ArticleBannerPreset[] = [
  "formiga",
  "lobo",
  "elite",
  "educacao",
  "select",
  "private",
  "binance",
];

export function isChannelBannerPreset(preset: ArticleBannerPreset | undefined): preset is Extract<
  ArticleBannerPreset,
  "formiga" | "lobo" | "elite" | "educacao" | "select" | "private" | "binance"
> {
  return !!preset && CHANNEL_BANNER_PRESETS.includes(preset);
}

export function inferChannelBannerPreset(banner: ArticleBanner): ArticleBannerPreset | undefined {
  if (isChannelBannerPreset(banner.preset)) return banner.preset;
  const hay = `${banner.image_url} ${banner.alt}`.toLowerCase();
  if (
    hay.includes("canal-lobo") ||
    hay.includes("canal lobo") ||
    hay.includes("wolf channel") ||
    (hay.includes("lobo") && (hay.includes("canal") || hay.includes("sinais")))
  ) {
    return "lobo";
  }
  if (
    hay.includes("canal-formiga") ||
    hay.includes("canal formiga") ||
    hay.includes("education-formation-premium") ||
    hay.includes("ant channel")
  ) {
    return "formiga";
  }
  if (
    hay.includes("canal-elite") ||
    hay.includes("canal elite") ||
    hay.includes("elite harpia") ||
    hay.includes("services-hero-institutional")
  ) {
    return "elite";
  }
  if (
    hay.includes("base-educacional") ||
    hay.includes("base educacional") ||
    hay.includes("educational base") ||
    (hay.includes("educacao") && hay.includes("formiga"))
  ) {
    return "educacao";
  }
  if (hay.includes("faixa-select") || (hay.includes("select") && hay.includes("patrimonial"))) {
    return "select";
  }
  if (hay.includes("faixa-private") || (hay.includes("private") && hay.includes("patrimonial"))) {
    return "private";
  }
  if (hay.includes("binance")) {
    return "binance";
  }
  return undefined;
}
