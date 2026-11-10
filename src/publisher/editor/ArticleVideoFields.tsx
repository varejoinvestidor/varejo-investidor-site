"use client";

import type { ArticleVideos } from "../types/video";
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
  variant?: "editor" | "sidebar";
};

/** Editor: blocos de vídeo horizontal e vertical separados (sem sobreposição de camadas). */
export function ArticleVideoFields({ videos, disabled, onChange, variant = "editor" }: Props) {
  const hId = normalizeVideoId(videos.horizontal);
  const vId = normalizeVideoId(videos.vertical);

  return (
    <section
      className={
        variant === "editor"
          ? "space-y-0 overflow-hidden rounded-xl border border-line/12 bg-paper/[0.02]"
          : "overflow-hidden rounded-lg border border-gold/20 bg-gold/[0.04]"
      }
    >
      <header className="border-b border-line/12 px-5 py-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Vídeos do artigo</h3>
        <p className="mt-1 text-xs leading-relaxed text-paper/50">
          Dois blocos independentes: horizontal (16:9) e vertical (Shorts 9:16). No site público aparecem
          empilhados, na ordem escolhida abaixo — não misturam com o vídeo do corpo (botão Vídeo do editor).
        </p>
      </header>

      <div className="divide-y divide-line/15">
        <HorizontalVideoField
          value={videos.horizontal}
          disabled={disabled}
          isPrimary={videos.primary === "horizontal" && Boolean(hId)}
          onChange={(horizontal) => onChange({ ...videos, horizontal })}
        />
        <VerticalVideoField
          value={videos.vertical}
          disabled={disabled}
          isPrimary={videos.primary === "vertical" && Boolean(vId)}
          onChange={(vertical) => onChange({ ...videos, vertical })}
        />
      </div>

      <fieldset className="border-t border-line/15 bg-[#0a0a0a]/80 px-5 py-4">
        <legend className="px-1 text-xs font-bold uppercase tracking-wider text-paper/45">
          Ordem no site (qual vídeo vem primeiro)
        </legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-paper/70">
          <PrimaryChoice
            label="Horizontal primeiro"
            name="video_primary_order"
            checked={videos.primary === "horizontal"}
            disabled={disabled || !hId}
            onSelect={() => onChange({ ...videos, primary: "horizontal" })}
          />
          <PrimaryChoice
            label="Vertical primeiro"
            name="video_primary_order"
            checked={videos.primary === "vertical"}
            disabled={disabled || !vId}
            onSelect={() => onChange({ ...videos, primary: "vertical" })}
          />
        </div>
      </fieldset>

      {(hId || vId) && variant === "editor" ? (
        <p className="border-t border-line/12 px-5 py-3 text-[11px] text-paper/40">
          IDs: {hId ? <code className="text-gold/80">horizontal={hId}</code> : null}
          {hId && vId ? " · " : null}
          {vId ? <code className="text-gold/80">vertical={vId}</code> : null}
        </p>
      ) : null}
    </section>
  );
}

function HorizontalVideoField({
  value,
  disabled,
  isPrimary,
  onChange,
}: {
  value: string | null;
  disabled?: boolean;
  isPrimary: boolean;
  onChange: (next: string | null) => void;
}) {
  return (
    <VideoFieldBlock
      kind="horizontal"
      title="Vídeo horizontal"
      subtitle="YouTube 16:9 · topo do artigo"
      value={value}
      disabled={disabled}
      isPrimary={isPrimary}
      onChange={onChange}
    />
  );
}

function VerticalVideoField({
  value,
  disabled,
  isPrimary,
  onChange,
}: {
  value: string | null;
  disabled?: boolean;
  isPrimary: boolean;
  onChange: (next: string | null) => void;
}) {
  return (
    <VideoFieldBlock
      kind="vertical"
      title="Vídeo vertical"
      subtitle="YouTube Shorts 9:16 · topo do artigo"
      value={value}
      disabled={disabled}
      isPrimary={isPrimary}
      onChange={onChange}
    />
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

function VideoFieldBlock({
  kind,
  title,
  subtitle,
  value,
  disabled,
  isPrimary,
  onChange,
}: {
  kind: "horizontal" | "vertical";
  title: string;
  subtitle: string;
  value: string | null;
  disabled?: boolean;
  isPrimary: boolean;
  onChange: (next: string | null) => void;
}) {
  const id = normalizeVideoId(value);
  const isHorizontal = kind === "horizontal";
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

  const display = articleVideoDisplayValue(value, kind);
  const canonical = id ? articleVideoCanonicalUrl(id, kind) : null;
  const embed = id ? articleVideoEmbedUrl(id) : null;

  return (
    <article
      className={`flex flex-col gap-3 px-5 py-5 ${isPrimary ? "bg-gold/[0.05]" : "bg-transparent"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-paper/85">{title}</h4>
          <p className="mt-0.5 text-[11px] text-paper/45">{subtitle}</p>
        </div>
        {isPrimary && id ? (
          <span className="rounded border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
            1º no site
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

      <div className={`flex flex-col gap-3 ${isHorizontal ? "" : "items-center"}`}>
        {id ? (
          <VideoPreview embed={youtubeEmbedSrc(id)} kind={kind} />
        ) : (
          <div
            className={`flex items-center justify-center border border-dashed border-line/20 text-xs text-paper/35 ${
              isHorizontal ? "aspect-video w-full max-w-2xl" : "aspect-[9/16] w-full max-w-[200px]"
            }`}
          >
            Prévia {isHorizontal ? "16:9" : "9:16"}
          </div>
        )}

        {canonical ? (
          <div className="w-full space-y-1 text-[11px]">
            <p className="text-paper/40">
              URL canônica:{" "}
              <a href={canonical} target="_blank" rel="noreferrer" className="break-all text-gold hover:underline">
                {canonical}
              </a>
            </p>
            {embed ? (
              <p className="break-all font-mono text-paper/35">
                Embed: <span className="text-paper/50">{embed}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function VideoPreview({ embed, kind }: { embed: string; kind: "horizontal" | "vertical" }) {
  const isHorizontal = kind === "horizontal";
  return (
    <div
      className={`overflow-hidden border border-line/15 bg-black ${
        isHorizontal ? "aspect-video w-full max-w-2xl" : "aspect-[9/16] w-full max-w-[220px]"
      }`}
    >
      <iframe
        title={isHorizontal ? "Prévia horizontal" : "Prévia vertical"}
        src={embed}
        className="h-full w-full"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
