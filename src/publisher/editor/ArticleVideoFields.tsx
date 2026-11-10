"use client";

import type { ArticleVideos } from "../types/video";
import { normalizeVideoId, youtubeEmbedSrc } from "../types/video";

type Props = {
  videos: ArticleVideos;
  disabled?: boolean;
  onChange: (videos: ArticleVideos) => void;
};

export function ArticleVideoFields({ videos, disabled, onChange }: Props) {
  const hId = normalizeVideoId(videos.horizontal);
  const vId = normalizeVideoId(videos.vertical);

  return (
    <section className="rounded-lg border border-gold/20 bg-gold/[0.04] p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Vídeo YouTube (destaque)</h3>
      <p className="mt-1 text-xs leading-relaxed text-paper/50">
        Formato horizontal (16:9) e vertical (Shorts 9:16), no estilo TV + mobile. O leitor assiste na página, sem sair
        do site. Também pode inserir vídeos no corpo do texto pelo botão &quot;Vídeo&quot; do editor.
      </p>

      <label className="mt-4 block text-xs text-paper/45">
        YouTube — horizontal (16:9)
        <input
          value={videos.horizontal ?? ""}
          disabled={disabled}
          placeholder="https://youtube.com/watch?v=… ou ID"
          onChange={(e) => onChange({ ...videos, horizontal: e.target.value || null })}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-2 font-mono text-sm"
        />
      </label>
      {hId ? <MotionPreview embed={youtubeEmbedSrc(hId)} aspect="video" /> : null}

      <label className="mt-4 block text-xs text-paper/45">
        YouTube — vertical / Shorts (9:16)
        <input
          value={videos.vertical ?? ""}
          disabled={disabled}
          placeholder="https://youtube.com/shorts/…"
          onChange={(e) => onChange({ ...videos, vertical: e.target.value || null })}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-2 font-mono text-sm"
        />
      </label>
      {vId ? <MotionPreview embed={youtubeEmbedSrc(vId)} aspect="short" /> : null}

      <fieldset className="mt-4">
        <legend className="text-xs text-paper/45">Abrir primeiro no site</legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-paper/70">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="video_primary"
              disabled={disabled || !hId}
              checked={videos.primary === "horizontal"}
              onChange={() => onChange({ ...videos, primary: "horizontal" })}
            />
            Horizontal
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="video_primary"
              disabled={disabled || !vId}
              checked={videos.primary === "vertical"}
              onChange={() => onChange({ ...videos, primary: "vertical" })}
            />
            Vertical
          </label>
        </div>
      </fieldset>
    </section>
  );
}

function MotionPreview({ embed, aspect }: { embed: string; aspect: "video" | "short" }) {
  return (
    <div
      className={`mt-3 overflow-hidden border border-line/15 bg-black ${
        aspect === "short" ? "mx-auto aspect-[9/16] w-full max-w-[200px]" : "aspect-video w-full"
      }`}
    >
      <iframe
        title="Pré-visualização"
        src={embed}
        className="h-full w-full"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
