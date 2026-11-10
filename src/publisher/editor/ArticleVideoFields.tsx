"use client";

import type { ArticleVideos, ArticleVideoSlot } from "../types/video";
import {
  articleVideoCanonicalUrl,
  articleVideoDisplayValue,
  articleVideoEmbedUrl,
  normalizeVideoId,
  youtubeEmbedSrc,
} from "../types/video";

type Props = {
  videos: ArticleVideos;
  disabled?: boolean;
  onChange: (videos: ArticleVideos) => void;
  /** Coluna principal do editor (camadas empilhadas); false = painel compacto na lateral. */
  variant?: "editor" | "sidebar";
};

export function ArticleVideoFields({ videos, disabled, onChange, variant = "editor" }: Props) {
  const hId = normalizeVideoId(videos.horizontal);
  const vId = normalizeVideoId(videos.vertical);

  const hLayer = videos.primary === "horizontal" && hId ? 1 : vId ? 2 : 1;
  const vLayer = videos.primary === "vertical" && vId ? 1 : hId ? 2 : 1;

  return (
    <section
      className={
        variant === "editor"
          ? "space-y-4 rounded-xl border border-line/12 bg-paper/[0.02] p-5"
          : "rounded-lg border border-gold/20 bg-gold/[0.04] p-4"
      }
    >
      <header>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Vídeos do artigo</h3>
        <p className="mt-1 text-xs leading-relaxed text-paper/50">
          Camada horizontal (16:9) e camada vertical (Shorts 9:16), exibidas no topo da página pública — acima do
          texto. Vídeos no corpo do artigo continuam pelo botão &quot;Vídeo&quot; do editor (formato 16:9).
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <VideoLayerCard
          slot="horizontal"
          layerIndex={hLayer}
          value={videos.horizontal}
          disabled={disabled}
          isPrimary={videos.primary === "horizontal" && Boolean(hId)}
          onChange={(horizontal) => onChange({ ...videos, horizontal })}
        />
        <VideoLayerCard
          slot="vertical"
          layerIndex={vLayer}
          value={videos.vertical}
          disabled={disabled}
          isPrimary={videos.primary === "vertical" && Boolean(vId)}
          onChange={(vertical) => onChange({ ...videos, vertical })}
        />
      </div>

      <fieldset className="rounded-lg border border-line/15 bg-[#0a0a0a]/80 px-4 py-3">
        <legend className="px-1 text-xs font-bold uppercase tracking-wider text-paper/45">
          Ordem no site (camada em destaque)
        </legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-paper/70">
          <PrimaryChoice
            label="Horizontal primeiro"
            name="video_primary"
            checked={videos.primary === "horizontal"}
            disabled={disabled || !hId}
            onSelect={() => onChange({ ...videos, primary: "horizontal" })}
          />
          <PrimaryChoice
            label="Vertical primeiro"
            name="video_primary"
            checked={videos.primary === "vertical"}
            disabled={disabled || !vId}
            onSelect={() => onChange({ ...videos, primary: "vertical" })}
          />
        </div>
      </fieldset>

      {(hId || vId) && variant === "editor" ? (
        <p className="text-[11px] text-paper/40">
          IDs armazenados:{" "}
          {hId ? <code className="text-gold/80">H={hId}</code> : null}
          {hId && vId ? " · " : null}
          {vId ? <code className="text-gold/80">V={vId}</code> : null}
        </p>
      ) : null}
    </section>
  );
}

function PrimaryChoice({
  label,
  name,
  checked,
  disabled,
  onSelect,
}: {
  label: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input type="radio" name={name} disabled={disabled} checked={checked} onChange={onSelect} />
      {label}
    </label>
  );
}

function VideoLayerCard({
  slot,
  layerIndex,
  value,
  disabled,
  isPrimary,
  onChange,
}: {
  slot: ArticleVideoSlot;
  layerIndex: number;
  value: string | null;
  disabled?: boolean;
  isPrimary: boolean;
  onChange: (next: string | null) => void;
}) {
  const id = normalizeVideoId(value);
  const isHorizontal = slot === "horizontal";
  const title = isHorizontal ? "Camada horizontal · 16:9" : "Camada vertical · Shorts 9:16";
  const placeholder = isHorizontal
    ? "https://www.youtube.com/watch?v=…"
    : "https://www.youtube.com/shorts/…";

  function commitRaw(next: string) {
    onChange(next.trim() ? next.trim() : null);
  }

  function onBlurInput(raw: string) {
    const normalized = normalizeVideoId(raw);
    if (normalized) onChange(normalized);
    else if (!raw.trim()) onChange(null);
  }

  const display = articleVideoDisplayValue(value, slot);
  const canonical = id ? articleVideoCanonicalUrl(id, slot) : null;
  const embed = id ? articleVideoEmbedUrl(id) : null;

  return (
    <article
      className={`relative flex flex-col gap-3 rounded-lg border p-4 ${
        isPrimary ? "border-gold/45 bg-gold/[0.06]" : "border-line/15 bg-[#0a0a0a]/60"
      }`}
      style={{ zIndex: isPrimary ? 2 : 1 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">Camada {layerIndex}</p>
          <h4 className="text-xs font-bold uppercase tracking-wider text-paper/75">{title}</h4>
        </div>
        {isPrimary && id ? (
          <span className="rounded border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
            Destaque
          </span>
        ) : null}
      </div>

      <label className="block text-xs text-paper/45">
        Link ou ID YouTube
        <input
          value={display}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => commitRaw(e.target.value)}
          onBlur={(e) => onBlurInput(e.target.value)}
          className="mt-1 w-full rounded border border-line/15 bg-ink px-2 py-2 font-mono text-sm text-paper"
        />
      </label>

      {canonical ? (
        <div className="space-y-1 text-[11px]">
          <p className="text-paper/40">
            Caminho público:{" "}
            <a href={canonical} target="_blank" rel="noreferrer" className="break-all text-gold hover:underline">
              {canonical}
            </a>
          </p>
          {embed ? (
            <p className="break-all font-mono text-paper/35">
              Embed interno: <span className="text-paper/50">{embed}</span>
            </p>
          ) : null}
        </div>
      ) : null}

      {id ? (
        <MotionPreview embed={youtubeEmbedSrc(id)} aspect={isHorizontal ? "video" : "short"} />
      ) : (
        <div
          className={`flex items-center justify-center border border-dashed border-line/20 text-xs text-paper/35 ${
            isHorizontal ? "aspect-video w-full" : "mx-auto aspect-[9/16] w-full max-w-[160px]"
          }`}
        >
          Prévia
        </div>
      )}
    </article>
  );
}

function MotionPreview({ embed, aspect }: { embed: string; aspect: "video" | "short" }) {
  return (
    <div
      className={`overflow-hidden border border-line/15 bg-black ${
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
