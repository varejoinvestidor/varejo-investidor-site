"use client";

import { useMemo, useState } from "react";
import type { ArticleVideoPrimary, ArticleVideos } from "../../publisher/types/video";
import { hasArticleVideo, primaryVideoId, youtubePosterUrl } from "../../publisher/types/video";
import { YouTubeEmbedPlayer } from "./YouTubeEmbedPlayer";

export function ArticleHeroVideo({
  videos,
  labels,
}: {
  videos: ArticleVideos;
  labels: { horizontal: string; vertical: string; watch: string; unmute: string };
}) {
  const hasH = Boolean(videos.horizontal);
  const hasV = Boolean(videos.vertical);
  const [active, setActive] = useState<ArticleVideoPrimary>(
    videos.primary === "vertical" && hasV ? "vertical" : hasH ? "horizontal" : "vertical",
  );

  const activeId = useMemo(() => {
    if (active === "vertical" && videos.vertical) return videos.vertical;
    if (videos.horizontal) return videos.horizontal;
    return videos.vertical;
  }, [active, videos.horizontal, videos.vertical]);

  if (!hasArticleVideo(videos) || !activeId) return null;

  const poster = youtubePosterUrl(activeId);

  return (
    <section className="vi-article-video px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl">
        {hasH && hasV ? (
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label={labels.watch}>
            <button
              type="button"
              role="tab"
              aria-selected={active === "horizontal"}
              onClick={() => setActive("horizontal")}
              className={`min-h-[44px] rounded border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                active === "horizontal"
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/25 text-paper/55 hover:border-gold/45"
              }`}
            >
              {labels.horizontal}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={active === "vertical"}
              onClick={() => setActive("vertical")}
              className={`min-h-[44px] rounded border px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                active === "vertical"
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-gold/25 text-paper/55 hover:border-gold/45"
              }`}
            >
              {labels.vertical}
            </button>
          </div>
        ) : null}

        <div
          className={`vi-article-video-stage overflow-hidden border border-gold/[0.22] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${
            active === "vertical" && hasV ? "vi-article-video-stage--vertical" : "vi-article-video-stage--horizontal"
          }`}
        >
          <div className="vi-article-video-frame">
            <YouTubeEmbedPlayer videoId={activeId} unmuteLabel={labels.unmute} />
          </div>
          {!hasH || !hasV ? (
            <p className="border-t border-white/10 bg-black/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/80">
              {active === "vertical" ? labels.vertical : labels.horizontal}
            </p>
          ) : null}
        </div>

        {hasH && hasV ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {videos.horizontal ? (
              <button
                type="button"
                onClick={() => setActive("horizontal")}
                className={`group overflow-hidden border text-left transition ${
                  active === "horizontal" ? "border-gold" : "border-white/10 hover:border-gold/40"
                }`}
              >
                <div className="relative aspect-video bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={youtubePosterUrl(videos.horizontal)} alt="" className="h-full w-full object-cover opacity-90" />
                  <span className="absolute inset-0 grid place-items-center bg-black/35 text-xs font-bold uppercase tracking-wider text-paper group-hover:bg-black/20">
                    {labels.horizontal}
                  </span>
                </div>
              </button>
            ) : null}
            {videos.vertical ? (
              <button
                type="button"
                onClick={() => setActive("vertical")}
                className={`group overflow-hidden border text-left transition ${
                  active === "vertical" ? "border-gold" : "border-white/10 hover:border-gold/40"
                }`}
              >
                <div className="relative mx-auto aspect-[9/16] max-h-[280px] max-w-[180px] bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={youtubePosterUrl(videos.vertical)} alt="" className="h-full w-full object-cover opacity-90" />
                  <span className="absolute inset-0 grid place-items-center bg-black/35 text-[10px] font-bold uppercase tracking-wider text-paper">
                    {labels.vertical}
                  </span>
                </div>
              </button>
            ) : null}
          </div>
        ) : (
          poster ? (
            <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-paper/40">{labels.watch}</p>
          ) : null
        )}
      </div>
    </section>
  );
}

export function ArticleVideoThumb({
  videos,
  title,
  className = "",
  variant = "card",
}: {
  videos: ArticleVideos;
  title: string;
  className?: string;
  variant?: "card" | "featured";
}) {
  const id = variant === "featured" ? videos.horizontal ?? videos.vertical : primaryVideoId(videos);
  if (!id) return null;
  const vertical = variant === "card" && videos.primary === "vertical" && videos.vertical;
  return (
    <div
      className={`relative overflow-hidden bg-black ${vertical ? "aspect-[9/16] max-h-[320px]" : "aspect-video w-full"} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={youtubePosterUrl(id)} alt="" className="h-full w-full object-cover" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gold">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-black/60">▶</span>
        {vertical ? "Shorts" : "Vídeo"}
      </span>
      <span className="sr-only">{title}</span>
    </div>
  );
}
