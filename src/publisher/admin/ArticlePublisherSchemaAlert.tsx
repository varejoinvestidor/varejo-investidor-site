"use client";

import { useState } from "react";
import {
  installArticleBannersSchemaFromAdmin,
  installArticlePublisherExtrasFromAdmin,
  installArticleVideoSchemaFromAdmin,
} from "../articles/actions";

function needsBannersSchema(message: string) {
  return (
    message.includes("articles.banners") ||
    /could not find the ['"]banners['"] column/i.test(message) ||
    (/banners/i.test(message) && /column|schema cache|PGRST/i.test(message))
  );
}

function needsVideoSchema(message: string) {
  return /youtube_|video_primary/i.test(message) && /column|schema cache|PGRST/i.test(message);
}

export function ArticlePublisherSchemaAlert({ message }: { message: string }) {
  const [text, setText] = useState(message);
  const [busy, setBusy] = useState<"idle" | "banners" | "videos" | "all">("idle");
  const showBanners = needsBannersSchema(message);
  const showVideos = needsVideoSchema(message);

  async function run(
    kind: "banners" | "videos" | "all",
    fn: () => Promise<{ ok: boolean; error?: string }>,
  ) {
    setBusy(kind);
    const result = await fn();
    setBusy("idle");
    if (result.ok) window.location.reload();
    else setText(result.error ?? "Falha ao instalar schema.");
  }

  if (!showBanners && !showVideos) {
    return (
      <div className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-fall" role="alert">
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-fall" role="alert">
      <p>{text}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {showBanners ? (
          <button
            type="button"
            disabled={busy !== "idle"}
            onClick={() => void run("banners", installArticleBannersSchemaFromAdmin)}
            className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy === "banners" ? "Instalando…" : "Instalar banners"}
          </button>
        ) : null}
        {showVideos ? (
          <button
            type="button"
            disabled={busy !== "idle"}
            onClick={() => void run("videos", installArticleVideoSchemaFromAdmin)}
            className="rounded border border-gold/50 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gold disabled:opacity-50"
          >
            {busy === "videos" ? "Instalando…" : "Instalar vídeos (16:9 + 9:16)"}
          </button>
        ) : null}
        {showBanners && showVideos ? (
          <button
            type="button"
            disabled={busy !== "idle"}
            onClick={() => void run("all", installArticlePublisherExtrasFromAdmin)}
            className="rounded border border-line/30 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-paper/70 disabled:opacity-50"
          >
            {busy === "all" ? "Instalando…" : "Instalar tudo (banners + vídeos)"}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-paper/50">
        Ou rode no Supabase:{" "}
        <code className="text-gold">20260310120000_article_banners.sql</code> e{" "}
        <code className="text-gold">20260318150000_article_youtube_videos.sql</code>
      </p>
    </div>
  );
}

/** @deprecated Use ArticlePublisherSchemaAlert */
export const ArticleBannersSchemaAlert = ArticlePublisherSchemaAlert;
