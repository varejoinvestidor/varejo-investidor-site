import { parseYouTubeVideoId, youtubeEmbedSrc, youtubePosterUrl } from "../editor/youtubeEmbed";
export type { ArticleVideoSlot } from "../editor/youtubePaths";
export { articleVideoCanonicalUrl, articleVideoDisplayValue, articleVideoEmbedUrl } from "../editor/youtubePaths";

export type ArticleVideoPrimary = "horizontal" | "vertical";

export type ArticleVideos = {
  horizontal: string | null;
  vertical: string | null;
  primary: ArticleVideoPrimary;
};

export const emptyArticleVideos = (): ArticleVideos => ({
  horizontal: null,
  vertical: null,
  primary: "horizontal",
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
  };

  if (fromRow.horizontal || fromRow.vertical) return fromRow;

  const content = row.content;
  const nested = content?.publisher_videos as Partial<ArticleVideos> | undefined;
  if (!nested || typeof nested !== "object") return emptyArticleVideos();

  return {
    horizontal: normalizeVideoId(nested.horizontal as string | undefined),
    vertical: normalizeVideoId(nested.vertical as string | undefined),
    primary: nested.primary === "vertical" ? "vertical" : "horizontal",
  };
}

export function mergeVideosIntoContent(
  content: Record<string, unknown>,
  videos: ArticleVideos,
): Record<string, unknown> {
  const h = normalizeVideoId(videos.horizontal);
  const v = normalizeVideoId(videos.vertical);
  const primary = videos.primary === "vertical" && v ? "vertical" : "horizontal";
  const out = { ...content };
  if (h || v) {
    out.publisher_videos = {
      horizontal: h,
      vertical: v,
      primary: h || v ? primary : "horizontal",
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
  return Boolean(videos.horizontal || videos.vertical);
}

export function primaryVideoId(videos: ArticleVideos): string | null {
  if (videos.primary === "vertical" && videos.vertical) return videos.vertical;
  if (videos.horizontal) return videos.horizontal;
  return videos.vertical;
}

export { youtubeEmbedSrc, youtubePosterUrl };
