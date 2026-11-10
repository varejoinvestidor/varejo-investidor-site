"use client";

import { useEffect, useRef, useState } from "react";
import { parseYouTubeVideoId, youtubeEmbedSrc } from "../../publisher/editor/youtubeEmbed";

export function YouTubeEmbedPlayer({
  videoId,
  unmuteLabel = "Ativar som",
  autoplayInView = true,
  play: playControlled,
  className = "h-full w-full",
}: {
  videoId: string;
  unmuteLabel?: string;
  /** Quando definido, ignora o observer interno (cards / hover). */
  play?: boolean;
  autoplayInView?: boolean;
  className?: string;
}) {
  const id = parseYouTubeVideoId(videoId);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    setWithSound(false);
  }, [id]);

  useEffect(() => {
    if (playControlled !== undefined || !autoplayInView) return;
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: [0.12, 0.28], rootMargin: "6% 0px 4% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplayInView, playControlled, id]);

  if (!id) return null;

  const shouldPlay = playControlled !== undefined ? playControlled : inView;
  const src = shouldPlay
    ? youtubeEmbedSrc(id, { autoplay: true, mute: !withSound })
    : undefined;

  return (
    <div ref={wrapRef} className={`relative bg-black ${className}`}>
      {src ? (
        <iframe
          key={`${id}-${withSound ? "sound" : "mute"}`}
          title="Vídeo"
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="h-full min-h-[120px] w-full bg-black/90" aria-hidden />
      )}

      {shouldPlay && !withSound ? (
        <button
          type="button"
          onClick={() => setWithSound(true)}
          className="absolute bottom-3 right-3 z-10 flex min-h-[44px] items-center gap-2 rounded border border-gold/50 bg-black/85 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gold shadow-lg transition hover:bg-gold hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          {unmuteLabel}
        </button>
      ) : null}
    </div>
  );
}
