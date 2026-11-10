"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ArticleVideoPrimary, ArticleVideos } from "../../publisher/types/video";
import { articleUsesVerticalLayout, hasArticleVideo, youtubePosterUrl } from "../../publisher/types/video";
import { YouTubeEmbedPlayer } from "./YouTubeEmbedPlayer";

type VideoLayer = {
  key: ArticleVideoPrimary;
  videoId: string;
  zIndex: number;
};

export function ArticleHeroVideo({
  videos,
  labels,
}: {
  videos: ArticleVideos;
  labels: { horizontal: string; vertical: string; watch: string; unmute: string };
}) {
  const layers = useMemo((): VideoLayer[] => {
    const items: VideoLayer[] = [];
    if (videos.horizontal) items.push({ key: "horizontal", videoId: videos.horizontal, zIndex: 0 });
    if (videos.vertical) items.push({ key: "vertical", videoId: videos.vertical, zIndex: 0 });
    if (items.length < 2) return items.map((item, i) => ({ ...item, zIndex: 2 }));

    const primaryFirst = [...items].sort((a, b) => {
      if (a.key === videos.primary) return -1;
      if (b.key === videos.primary) return 1;
      return a.key === "horizontal" ? -1 : 1;
    });
    return primaryFirst.map((item, index) => ({
      ...item,
      zIndex: primaryFirst.length - index,
    }));
  }, [videos.horizontal, videos.vertical, videos.primary]);

  if (!hasArticleVideo(videos) || !layers.length) return null;

  return (
    <section className="vi-article-videos px-5 py-8 md:px-8 md:py-10" aria-label={labels.watch}>
      <div
        className={`mx-auto flex max-w-7xl flex-col gap-12 ${
          layers.length === 1 && layers[0]?.key === "vertical" ? "items-center max-w-lg" : ""
        }`}
      >
        {layers.map((layer) => (
          <ArticleVideoLayer key={layer.key} layer={layer} videos={videos} labels={labels} />
        ))}
      </div>
    </section>
  );
}

function ArticleVideoLayer({
  layer,
  videos,
  labels,
}: {
  layer: VideoLayer;
  videos: ArticleVideos;
  labels: { horizontal: string; vertical: string; watch: string; unmute: string };
}) {
  const isVertical = layer.key === "vertical";
  const isPrimary = videos.primary === layer.key;
  const title = isVertical ? labels.vertical : labels.horizontal;

  return (
    <article
      className={`vi-article-video-layer vi-article-video-layer--${layer.key} relative`}
      style={{ zIndex: layer.zIndex }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold/85">{title}</p>
        {isPrimary && videos.horizontal && videos.vertical ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-paper/45">{labels.watch}</span>
        ) : null}
      </div>

      <div
        className={`vi-article-video-stage overflow-hidden border border-gold/[0.22] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] ${
          isVertical ? "vi-article-video-stage--vertical" : "vi-article-video-stage--horizontal"
        }`}
      >
        <div className="vi-article-video-frame">
          <YouTubeEmbedPlayer videoId={layer.videoId} unmuteLabel={labels.unmute} />
        </div>
      </div>

      {/* Poster secundário apenas quando há um único formato */}
      {!(videos.horizontal && videos.vertical) ? (
        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-paper/40">{labels.watch}</p>
      ) : null}
    </article>
  );
}

export function ArticleVideoThumb({
  videos,
  title,
  className = "",
  variant = "card",
  boostPlay = false,
}: {
  videos: ArticleVideos;
  title: string;
  className?: string;
  variant?: "card" | "featured";
  /** Pai (ex.: card em destaque) pediu reprodução — ex. hover na área do link. */
  boostPlay?: boolean;
}) {
  const id =
    variant === "featured"
      ? videos.primary === "vertical" && videos.vertical
        ? videos.vertical
        : videos.horizontal ?? videos.vertical
      : videos.primary === "vertical" && videos.vertical
        ? videos.vertical
        : videos.horizontal ?? videos.vertical;
  const vertical =
    variant === "featured"
      ? articleUsesVerticalLayout(videos)
      : variant === "card" && videos.primary === "vertical" && Boolean(videos.vertical);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!id) return;
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: [0.08, 0.22], rootMargin: "10% 0px 6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  if (!id) return null;

  const shouldPlay = inView || hover || boostPlay;

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-black ${
        vertical
          ? variant === "featured"
            ? "vi-thumb-vertical--featured aspect-[9/16] w-full max-w-[400px] min-h-[min(72vh,680px)] lg:min-h-[520px]"
            : "vi-thumb-vertical--card aspect-[9/16] max-h-[min(420px,55vh)] w-full max-w-[280px] mx-auto"
          : "aspect-video w-full"
      } ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {shouldPlay ? (
        <YouTubeEmbedPlayer videoId={id} autoplayInView={false} play className="h-full w-full" />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={youtubePosterUrl(id)} alt="" className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gold">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-black/60">▶</span>
            {vertical ? "Shorts" : "Vídeo"}
          </span>
        </>
      )}
      <span className="sr-only">{title}</span>
    </div>
  );
}
