"use client";

import { useEffect, useState } from "react";
import type { ArticleVideos } from "../types/video";
import {
  articleVideoDisplayValue,
  normalizeVideoId,
} from "../types/video";

type Props = {
  videos: ArticleVideos;
  disabled?: boolean;
  onChange: (videos: ArticleVideos) => void;
  variant?: "editor" | "sidebar";
};

type VideoTab = "horizontal" | "vertical";

/** Painel compacto: interruptor inserir ou não + abas 16:9 / 9:16. */
export function ArticleVideoFields({ videos, disabled, onChange, variant = "sidebar" }: Props) {
  const initialOpen = videos.top_enabled === true || Boolean(videos.horizontal || videos.vertical);
  const [open, setOpen] = useState(initialOpen);
  const [tab, setTab] = useState<VideoTab>("horizontal");

  useEffect(() => {
    setOpen(videos.top_enabled === true || Boolean(videos.horizontal || videos.vertical));
  }, [videos.top_enabled, videos.horizontal, videos.vertical]);
  const hId = normalizeVideoId(videos.horizontal);
  const vId = normalizeVideoId(videos.vertical);

  function setEnabled(next: boolean) {
    setOpen(next);
    onChange({ ...videos, top_enabled: next });
    if (!next) return;
  }

  const shell =
    variant === "sidebar"
      ? "rounded-lg border border-line/12 bg-paper/[0.02] p-4"
      : "overflow-hidden rounded-xl border border-line/12 bg-paper/[0.02] p-4";

  return (
    <section className={shell}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Vídeos no topo</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-paper/45">Opcional · YouTube 16:9 ou Shorts 9:16</p>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-[11px] font-semibold text-paper/70">
          <input
            type="checkbox"
            checked={open}
            disabled={disabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="accent-gold"
          />
          Inserir
        </label>
      </div>

      {!open ? (
        <p className="mt-3 text-xs text-paper/40">Sem vídeo no topo do artigo.</p>
      ) : (
        <div className="mt-4 space-y-3 border-t border-line/12 pt-3">
          <div className="flex gap-1">
            <TabButton active={tab === "horizontal"} onClick={() => setTab("horizontal")} label="16:9" hasValue={Boolean(hId)} />
            <TabButton active={tab === "vertical"} onClick={() => setTab("vertical")} label="9:16" hasValue={Boolean(vId)} />
          </div>

          {tab === "horizontal" ? (
            <VideoInput
              label="Horizontal"
              placeholder="https://youtube.com/watch?v=…"
              value={videos.horizontal}
              disabled={disabled}
              onChange={(horizontal) => onChange({ ...videos, top_enabled: true, horizontal })}
            />
          ) : (
            <VideoInput
              label="Vertical (Shorts)"
              placeholder="https://youtube.com/shorts/…"
              value={videos.vertical}
              disabled={disabled}
              onChange={(vertical) => onChange({ ...videos, top_enabled: true, vertical })}
            />
          )}

          {hId && vId ? (
            <fieldset className="text-[11px] text-paper/55">
              <legend className="sr-only">Ordem</legend>
              <span className="text-paper/40">Mostrar primeiro: </span>
              <label className="ml-2">
                <input
                  type="radio"
                  name="video_primary_compact"
                  checked={videos.primary === "horizontal"}
                  disabled={disabled}
                  onChange={() => onChange({ ...videos, primary: "horizontal" })}
                />{" "}
                16:9
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  name="video_primary_compact"
                  checked={videos.primary === "vertical"}
                  disabled={disabled}
                  onChange={() => onChange({ ...videos, primary: "vertical" })}
                />{" "}
                9:16
              </label>
            </fieldset>
          ) : null}
        </div>
      )}
    </section>
  );
}

function TabButton({
  active,
  onClick,
  label,
  hasValue,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hasValue: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
        active ? "bg-gold/25 text-gold" : "border border-line/15 text-paper/50 hover:border-gold/30"
      }`}
    >
      {label}
      {hasValue ? <span className="ml-1 text-rise">●</span> : null}
    </button>
  );
}

function VideoInput({
  label,
  placeholder,
  value,
  disabled,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string | null;
  disabled?: boolean;
  onChange: (next: string | null) => void;
}) {
  const display = articleVideoDisplayValue(value, label.includes("Vertical") ? "vertical" : "horizontal");

  function onBlurInput(raw: string) {
    const normalized = normalizeVideoId(raw);
    if (normalized) onChange(normalized);
    else if (!raw.trim()) onChange(null);
  }

  return (
    <label className="block text-[11px] text-paper/45">
      {label}
      <input
        value={display}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.trim() ? e.target.value : null)}
        onBlur={(e) => onBlurInput(e.target.value)}
        className="mt-1 w-full rounded border border-line/15 bg-ink px-2 py-2 font-mono text-xs text-paper"
      />
    </label>
  );
}
