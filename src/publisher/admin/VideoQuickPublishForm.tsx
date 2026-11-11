"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createQuickVideoArticle } from "../articles/actions";
import { normalizeVideoId, youtubeEmbedSrc } from "../types/video";

type Orientation = "horizontal" | "vertical";

export function VideoQuickPublishForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("vertical");
  const [youtube, setYoutube] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: string; slug: string; published: boolean } | null>(null);

  const previewId = normalizeVideoId(youtube);

  async function onSubmit(event: FormEvent, publish: boolean) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);

    const result = await createQuickVideoArticle({
      title,
      subtitle,
      orientation,
      youtube,
      publish,
    });

    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess({ id: result.data!.id, slug: result.data!.slug, published: publish });
    setTitle("");
    setSubtitle("");
    setYoutube("");
  }

  return (
    <form className="max-w-xl space-y-6 rounded-xl border border-line/12 bg-paper/[0.02] p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gold">Novo vídeo editorial</p>
        <p className="mt-1 text-sm text-paper/55">
          Cria um artigo com título, subtítulo e um vídeo YouTube (horizontal 16:9 ou vertical Shorts). Edição completa em{" "}
          <span className="text-paper/70">Artigos</span>.
        </p>
      </div>

      <label className="block text-sm">
        <span className="text-xs uppercase tracking-wider text-paper/45">Título</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2.5 text-paper"
          placeholder="Título do conteúdo"
        />
      </label>

      <label className="block text-sm">
        <span className="text-xs uppercase tracking-wider text-paper/45">Subtítulo</span>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2.5 text-paper"
          placeholder="Linha de apoio (opcional)"
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-wider text-paper/45">Formato</legend>
        <LabelRadio
          name="orientation"
          checked={orientation === "vertical"}
          onSelect={() => setOrientation("vertical")}
          label="Vertical (Shorts 9:16)"
        />
        <LabelRadio
          name="orientation"
          checked={orientation === "horizontal"}
          onSelect={() => setOrientation("horizontal")}
          label="Horizontal (16:9)"
        />
      </fieldset>

      <label className="block text-sm">
        <span className="text-xs uppercase tracking-wider text-paper/45">YouTube</span>
        <input
          required
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2.5 font-mono text-sm text-paper"
          placeholder={
            orientation === "vertical" ? "https://www.youtube.com/shorts/…" : "https://www.youtube.com/watch?v=…"
          }
        />
      </label>

      {previewId ? (
        <div
          className={`overflow-hidden border border-line/15 bg-black ${
            orientation === "vertical" ? "mx-auto aspect-[9/16] w-full max-w-[220px]" : "aspect-video w-full"
          }`}
        >
          <iframe
            title="Prévia"
            src={youtubeEmbedSrc(previewId)}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      ) : null}

      {error ? <p className="text-sm text-fall">{error}</p> : null}

      {success ? (
        <div className="rounded border border-rise/30 bg-rise/10 px-4 py-3 text-sm text-paper/85">
          {success.published ? "Publicado" : "Rascunho salvo"} — slug{" "}
          <code className="text-gold">{success.slug}</code>
          <div className="mt-2 flex flex-wrap gap-3 text-xs">
            <Link href={`/admin/artigos/${success.id}`} className="font-bold uppercase tracking-wider text-gold hover:underline">
              Abrir no editor
            </Link>
            {success.published ? (
              <Link href={`/artigos/${success.slug}`} target="_blank" className="text-paper/60 hover:text-paper">
                Ver no site
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={(e) => void onSubmit(e as unknown as FormEvent, false)}
          className="rounded border border-line/25 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-paper/80 transition hover:border-gold/40 disabled:opacity-50"
        >
          {busy ? "Salvando…" : "Salvar rascunho"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={(e) => void onSubmit(e as unknown as FormEvent, true)}
          className="rounded bg-gold px-4 py-2.5 text-xs font-bold uppercase text-ink transition hover:bg-gold/90 disabled:opacity-50"
        >
          {busy ? "Publicando…" : "Publicar"}
        </button>
      </div>
    </form>
  );
}

function LabelRadio({
  name,
  checked,
  onSelect,
  label,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-paper/75">
      <input type="radio" name={name} checked={checked} onChange={onSelect} />
      {label}
    </label>
  );
}
