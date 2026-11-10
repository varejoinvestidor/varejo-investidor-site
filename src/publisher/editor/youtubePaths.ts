import { parseYouTubeVideoId } from "./youtubeEmbed";

/** Caminhos canônicos (admin + cópia). No banco guardamos só o ID de 11 caracteres. */
export const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";
export const YOUTUBE_SHORTS_URL = "https://www.youtube.com/shorts/";
export const YOUTUBE_NOCOOKIE_EMBED = "https://www.youtube-nocookie.com/embed/";

export type ArticleVideoSlot = "horizontal" | "vertical";

export function articleVideoCanonicalUrl(id: string, slot: ArticleVideoSlot): string {
  const parsed = parseYouTubeVideoId(id) ?? id;
  if (slot === "vertical") return `${YOUTUBE_SHORTS_URL}${parsed}`;
  return `${YOUTUBE_WATCH_URL}${parsed}`;
}

export function articleVideoEmbedUrl(id: string): string {
  const parsed = parseYouTubeVideoId(id);
  if (!parsed) return "";
  return `${YOUTUBE_NOCOOKIE_EMBED}${parsed}`;
}

/** Texto exibido no campo após normalizar (link completo no formato do slot). */
export function articleVideoDisplayValue(raw: string | null | undefined, slot: ArticleVideoSlot): string {
  if (!raw?.trim()) return "";
  const id = parseYouTubeVideoId(raw);
  if (!id) return raw.trim();
  return articleVideoCanonicalUrl(id, slot);
}
