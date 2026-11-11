import { parseYouTubeVideoId, youtubeEmbedSrc, youtubePosterUrl } from "../editor/youtubeEmbed";
export type { ArticleVideoSlot } from "../editor/youtubePaths";
export { articleVideoCanonicalUrl, articleVideoDisplayValue, articleVideoEmbedUrl } from "../editor/youtubePaths";

export type ArticleVideoPrimary = "horizontal" | "vertical";

export type ArticleVideos = {
  horizontal: string | null;
  vertical: string | null;
  primary: ArticleVideoPrimary;
  /** Exibir player no topo do artigo (editor: aba Inserir). */
  top_enabled?: boolean;
};

export const emptyArticleVideos = (): ArticleVideos => ({
  horizontal: null,
  vertical: null,
  primary: "horizontal",
  top_enabled: false,
});

export function normalizeVideoId(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  return parseYouTubeVideoId(raw);
}

export function resolveArticleVideos(row: {
  youtube_horizontal?: string | null;
  youtube_vertical?: string | null;
  video_primary?: string | null;
  content?: Record<string, unknown> | null;
}): ArticleVideos {
  const fromRow: ArticleVideos = {
    horizontal: normalizeVideoId(row.youtube_horizontal),
    vertical: normalizeVideoId(row.youtube_vertical),
    primary: row.video_primary === "vertical" ? "vertical" : "horizontal",
    top_enabled: undefined,
  };

  if (fromRow.horizontal || fromRow.vertical) {
    return { ...fromRow, top_enabled: true };
  }

  const content = row.content;
  const nested = content?.publisher_videos as Partial<ArticleVideos> | undefined;
  if (!nested || typeof nested !== "object") return emptyArticleVideos();

  const parsed: ArticleVideos = {
    horizontal: normalizeVideoId(nested.horizontal as string | undefined),
    vertical: normalizeVideoId(nested.vertical as string | undefined),
    primary: nested.primary === "vertical" ? "vertical" : "horizontal",
    top_enabled:
      nested.top_enabled === true
        ? true
        : nested.top_enabled === false
          ? false
          : Boolean(normalizeVideoId(nested.horizontal as string | undefined) || normalizeVideoId(nested.vertical as string | undefined)),
  };
  return parsed;
}

export function mergeVideosIntoContent(
  content: Record<string, unknown>,
  videos: ArticleVideos,
): Record<string, unknown> {
  const h = normalizeVideoId(videos.horizontal);
  const v = normalizeVideoId(videos.vertical);
  const primary = videos.primary === "vertical" && v ? "vertical" : "horizontal";
  const out = { ...content };
  if (h || v || videos.top_enabled) {
    out.publisher_videos = {
      horizontal: h,
      vertical: v,
      primary: h || v ? primary : "horizontal",
      top_enabled: videos.top_enabled !== false,
    };
  } else {
    delete out.publisher_videos;
  }
  return out;
}

export function videosForDatabasePatch(videos: ArticleVideos) {
  return {
    youtube_horizontal: normalizeVideoId(videos.horizontal),
    youtube_vertical: normalizeVideoId(videos.vertical),
    video_primary: videos.primary === "vertical" ? "vertical" : "horizontal",
  };
}

export function hasArticleVideo(videos: ArticleVideos): boolean {
  if (videos.top_enabled === false) return false;
  return Boolean(videos.horizontal || videos.vertical);
}

export function articleUsesVerticalLayout(videos: ArticleVideos): boolean {
  if (!videos.vertical) return false;
  if (!videos.horizontal) return true;
  return videos.primary === "vertical";
}

export function primaryVideoId(videos: ArticleVideos): string | null {
  if (videos.primary === "vertical" && videos.vertical) return videos.vertical;
  if (videos.horizontal) return videos.horizontal;
  return videos.vertical;
}

export { youtubeEmbedSrc, youtubePosterUrl };
