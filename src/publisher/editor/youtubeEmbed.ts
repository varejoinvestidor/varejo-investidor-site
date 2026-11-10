const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export function parseYouTubeVideoId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (YOUTUBE_ID_RE.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      return YOUTUBE_ID_RE.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const v = url.searchParams.get("v");
      if (v && YOUTUBE_ID_RE.test(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1] && YOUTUBE_ID_RE.test(parts[embedIdx + 1])) {
        return parts[embedIdx + 1];
      }
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1] && YOUTUBE_ID_RE.test(parts[shortsIdx + 1])) {
        return parts[shortsIdx + 1];
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function youtubeEmbedSrc(videoId: string): string {
  const id = parseYouTubeVideoId(videoId);
  if (!id) return "";
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

type TipTapNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
};

/** Reduz attrs de vídeo e evita URLs inválidas que quebram save/publicação. */
export function sanitizeTipTapForSave(doc: Record<string, unknown>): Record<string, unknown> {
  const publisherBanners = doc.publisher_banners;
  const clone = JSON.parse(JSON.stringify(doc)) as TipTapNode;

  function walk(node: TipTapNode) {
    if (node.type === "youtube" && node.attrs) {
      const raw = String(node.attrs.src ?? "");
      const id = parseYouTubeVideoId(raw);
      if (id) {
        node.attrs = { src: youtubeEmbedSrc(id) };
      } else {
        node.type = "paragraph";
        node.attrs = undefined;
        node.content = [{ type: "text", text: raw ? `Vídeo: ${raw}` : "Vídeo (URL inválida)" }];
      }
    }
    for (const child of node.content ?? []) walk(child);
  }

  walk(clone);
  const out = clone as Record<string, unknown>;
  if (publisherBanners !== undefined) out.publisher_banners = publisherBanners;
  return out;
}
