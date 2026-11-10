"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  changeArticleStatus,
  deleteArticle,
  listArticleRevisions,
  restoreRevision,
  saveArticle,
  type ArticleRecord,
  type SaveArticleInput,
} from "../articles/actions";
import { STATUS_BADGE, STATUS_LABELS } from "../articles/labels";
import { slugifyTitle } from "../articles/slug";
import type { CategoryRow, TagRow } from "../taxonomy/actions";
import type { PublisherProfile } from "../types";
import { AdminPasswordDialog } from "../admin/AdminPasswordDialog";
import { canPublish } from "../permissions";
import {
  applyAutoTranslateToArticle,
  createTranslationDraft,
  listLinkedTranslations,
} from "../translation/actions";
import type { ArticleBanner } from "../types/banner";
import { PublisherRichTextEditor } from "./PublisherRichTextEditor";

type PendingAction =
  | { type: "status"; status: ArticleRecord["status"] }
  | { type: "delete" };

type Props = {
  initial: ArticleRecord;
  categories: CategoryRow[];
  tags: TagRow[];
  profile: PublisherProfile;
};

type SaveState = "idle" | "saving" | "saved" | "error";

export function ArticleEditorWorkspace({ initial, categories, tags, profile }: Props) {
  const [article, setArticle] = useState(initial);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [scheduledLocal, setScheduledLocal] = useState("");
  const [revisions, setRevisions] = useState<{ id: string; revision_number: number; created_at: string }[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);
  const slugRef = useRef(initial.slug);
  const payloadRef = useRef<SaveArticleInput | null>(null);
  const isDirtyRef = useRef(false);
  const [isDirty, setIsDirty] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [publishFlow, setPublishFlow] = useState<{ percent: number; label: string } | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [translateSource, setTranslateSource] = useState(initial.language === "en" ? "pt" : "en");
  const [translating, setTranslating] = useState(false);
  const [linkedVersions, setLinkedVersions] = useState<{ id: string; language: string; slug: string }[]>([]);

  const payload: SaveArticleInput = useMemo(
    () => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      subtitle: article.subtitle,
      excerpt: article.excerpt,
      content: article.content,
      cover_image: article.cover_image,
      category_id: article.category_id,
      language: article.language,
      seo_title: article.seo_title,
      seo_description: article.seo_description,
      references_text: article.references_text,
      sources: article.sources,
      tag_ids: article.tag_ids,
      banners: article.banners,
    }),
    [article],
  );

  const sourcesText = article.sources.map((s) => `${s.label} | ${s.url}`).join("\n");

  function onSourcesChange(raw: string) {
    const sources = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split("|");
        const url = rest.join("|").trim();
        return { label: label.trim(), url };
      })
      .filter((s) => s.label && s.url);
    patchArticle({ sources });
  }

  const persist = useCallback(async (input: SaveArticleInput, snapshot = false, revalidate = true) => {
    if (savingRef.current) return false;
    savingRef.current = true;
    setSaveState("saving");
    setSaveError(null);
    const result = await saveArticle(input, { snapshot, revalidate });
    savingRef.current = false;
    if (!result.ok) {
      setSaveState("error");
      setSaveError(result.error);
      return false;
    }
    setIsDirty(false);
    isDirtyRef.current = false;
    setSaveState("saved");
    const nextSlug = result.data!.slug;
    slugRef.current = nextSlug;
    setArticle((prev) => ({
      ...prev,
      updated_at: result.data!.updated_at,
      slug: nextSlug,
    }));
    return true;
  }, []);

  const flushSave = useCallback(async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    while (savingRef.current) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (!isDirtyRef.current || !payloadRef.current) return true;
    return persist(payloadRef.current, false, true);
  }, [persist]);

  useEffect(() => {
    payloadRef.current = payload;
  }, [payload]);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void persist(payload, false, false);
    }, 700);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [payload, persist, isDirty]);

  useEffect(() => {
    void listArticleRevisions(article.id).then((res) => {
      if (res.ok) {
        setRevisions(
          res.data.map((row) => ({
            id: row.id as string,
            revision_number: row.revision_number as number,
            created_at: row.created_at as string,
          })),
        );
      }
    });
  }, [article.id, article.updated_at]);

  useEffect(() => {
    void listLinkedTranslations(article.id).then((res) => {
      if (res.ok) {
        setLinkedVersions(res.data.map((r) => ({ id: r.id, language: r.language, slug: r.slug })));
      }
    });
  }, [article.id, article.updated_at]);

  function patchArticle(update: Partial<ArticleRecord> | ((prev: ArticleRecord) => ArticleRecord)) {
    setIsDirty(true);
    isDirtyRef.current = true;
    setSaveState("idle");
    setArticle((prev) => (typeof update === "function" ? update(prev) : { ...prev, ...update }));
  }

  function requestSensitiveAction(action: PendingAction) {
    if (action.type === "delete" && profile.role === "admin") {
      setPendingAction(action);
      setPasswordOpen(true);
      return;
    }
    if (action.type === "status") void runStatus(action.status);
  }

  function setPublishStep(percent: number, label: string) {
    setPublishFlow({ percent, label });
  }

  async function runStatus(status: ArticleRecord["status"] | null) {
    if (!status) return;

    const isPublish = status === "published";
    if (isPublish) {
      setPublishing(true);
      setPublishSuccess(null);
      setPublishStep(12, "Preparando publicação…");
    }

    if (isPublish) setPublishStep(35, "Salvando alterações…");
    const saved = await flushSave();
    if (!saved) {
      if (isPublish) {
        setPublishFlow(null);
        setPublishing(false);
      }
      return;
    }

    if (isPublish) setPublishStep(58, "Validando conteúdo…");
    const scheduledAt =
      status === "scheduled" && scheduledLocal ? new Date(scheduledLocal).toISOString() : undefined;
    if (isPublish) setPublishStep(75, "Publicando…");
    const result = await changeArticleStatus(article.id, status, scheduledAt ?? null);
    if (!result.ok) {
      setSaveError(result.error);
      if (isPublish) {
        setPublishFlow(null);
        setPublishing(false);
      }
      return;
    }

    if (isPublish) setPublishStep(92, "Atualizando /artigos…");

    setArticle((prev) => ({
      ...prev,
      status,
      scheduled_at: scheduledAt ?? prev.scheduled_at,
      published_at: status === "published" ? new Date().toISOString() : prev.published_at,
    }));

    if (status === "published") {
      const path = article.language === "en" ? `/en/artigos/${slugRef.current}` : `/artigos/${slugRef.current}`;
      setPublishStep(100, "Publicação concluída");
      setPublishSuccess(`Artigo publicado com sucesso! Disponível em ${path}`);
      setPublishing(false);
      window.setTimeout(() => setPublishFlow(null), 1200);
    }
  }

  async function runDelete(adminPassword?: string) {
    const result = await deleteArticle(article.id, adminPassword);
    if (!result.ok) {
      setSaveError(result.error);
      return;
    }
    window.location.href = "/admin/artigos";
  }

  async function onPasswordConfirm(password: string) {
    if (!pendingAction) return;
    setActionBusy(true);
    if (pendingAction.type === "delete") {
      await runDelete(password);
    } else if (pendingAction.type === "status") {
      await runStatus(pendingAction.status);
    }
    setActionBusy(false);
    setPasswordOpen(false);
    setPendingAction(null);
  }

  function newBannerId() {
    return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `banner-${Date.now()}`;
  }

  function addBanner() {
    const banner: ArticleBanner = {
      id: newBannerId(),
      image_url: "",
      alt: "Banner",
      href: "",
      placement: "inline",
    };
    patchArticle((prev) => ({ ...prev, banners: [...prev.banners, banner] }));
  }

  function updateBanner(id: string, patch: Partial<ArticleBanner>) {
    patchArticle((prev) => ({
      ...prev,
      banners: prev.banners.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }

  function removeBanner(id: string) {
    patchArticle((prev) => ({ ...prev, banners: prev.banners.filter((b) => b.id !== id) }));
  }

  async function onAutoTranslate() {
    const target = article.language;
  const source = translateSource;
    if (source === target) {
      setSaveError("Escolha um idioma de origem diferente do idioma do artigo.");
      return;
    }
    setTranslating(true);
    setSaveError(null);
    const result = await applyAutoTranslateToArticle(article.id, source, target);
    setTranslating(false);
    if (!result.ok) {
      setSaveError(result.error);
      return;
    }
    window.location.reload();
  }

  async function openTranslation(targetLang: string) {
    const result = await createTranslationDraft(article.id, targetLang);
    if (!result.ok) {
      setSaveError(result.error);
      return;
    }
    window.location.href = `/admin/artigos/${result.data!.id}`;
  }

  function toggleTag(tagId: string) {
    patchArticle((prev) => ({
      ...prev,
      tag_ids: prev.tag_ids.includes(tagId) ? prev.tag_ids.filter((id) => id !== tagId) : [...prev.tag_ids, tagId],
    }));
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/artigos" className="text-xs text-paper/50 hover:text-paper">
            ← Artigos
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className={`rounded border px-2 py-0.5 text-xs uppercase tracking-wider ${STATUS_BADGE[article.status]}`}>
              {STATUS_LABELS[article.status]}
            </span>
            <span className="text-xs text-paper/45">
              {saveState === "saving" && "Salvando…"}
              {saveState === "saved" && "Salvo"}
              {saveState === "error" && "Erro ao salvar"}
              {saveState === "idle" && isDirty && "Alterações pendentes…"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void persist(payload, true, true)}
            className="rounded border border-line/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper/80"
          >
            Salvar agora
          </button>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            className="rounded border border-line/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper/80"
          >
            {preview ? "Editar" : "Pré-visualizar"}
          </button>
          {article.status === "draft" || article.status === "review" ? (
            <button
              type="button"
              onClick={() => void runStatus("review")}
              className="rounded border border-gold/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold"
            >
              Enviar revisão
            </button>
          ) : null}
          {canPublish(profile.role) ? (
            <>
              <button
                type="button"
                disabled={publishing}
                onClick={() => requestSensitiveAction({ type: "status", status: "published" })}
                className="rounded bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-50"
              >
                {publishing ? "Publicando…" : "Publicar"}
              </button>
              <button
                type="button"
                onClick={() => requestSensitiveAction({ type: "status", status: "scheduled" })}
                className="rounded border border-line/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                Agendar
              </button>
              <button
                type="button"
                onClick={() => requestSensitiveAction({ type: "status", status: "archived" })}
                className="text-xs text-paper/50 hover:text-paper"
              >
                Arquivar
              </button>
            </>
          ) : null}
          {profile.role === "admin" ? (
            <button
              type="button"
              onClick={() => requestSensitiveAction({ type: "delete" })}
              className="text-xs text-fall hover:underline"
            >
              Excluir
            </button>
          ) : null}
        </div>
      </div>

      {publishFlow ? (
        <div className="rounded-lg border border-gold/35 bg-gold/5 px-4 py-3" role="status" aria-live="polite">
          <div className="flex items-center justify-between gap-4 text-xs text-paper/80">
            <span>{publishFlow.label}</span>
            <span className="font-mono tabular-nums text-gold">{publishFlow.percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-line/15">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
              style={{ width: `${publishFlow.percent}%` }}
            />
          </div>
        </div>
      ) : null}

      {publishSuccess ? (
        <p className="rounded border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-paper" role="status">
          {publishSuccess}
        </p>
      ) : null}

      {saveError ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-2 text-sm" role="alert">
          {saveError}
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <input
            value={article.title}
            onChange={(e) => patchArticle({ title: e.target.value })}
            placeholder="Título"
            disabled={preview}
            className="w-full border-b border-line/15 bg-transparent py-2 font-serif text-4xl tracking-tight text-paper outline-none"
          />
          <input
            value={article.subtitle}
            onChange={(e) => patchArticle({ subtitle: e.target.value })}
            placeholder="Subtítulo"
            disabled={preview}
            className="w-full border-b border-line/10 bg-transparent py-2 text-lg text-paper/70 outline-none"
          />
          <PublisherRichTextEditor
            content={article.content}
            editable={!preview}
            onChange={(json) => patchArticle({ content: json })}
          />
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">URL e resumo</h3>
            <label className="mt-3 block text-xs text-paper/45">Slug</label>
            <div className="mt-1 flex gap-2">
              <input
                value={article.slug}
                disabled={preview}
                onChange={(e) => patchArticle({ slug: e.target.value })}
                className="w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
              />
              <button
                type="button"
                disabled={preview}
                onClick={() => patchArticle((p) => ({ ...p, slug: slugifyTitle(p.title) || p.slug }))}
                className="shrink-0 text-xs text-gold"
              >
                Gerar
              </button>
            </div>
            <label className="mt-3 block text-xs text-paper/45">Resumo</label>
            <textarea
              rows={4}
              disabled={preview}
              value={article.excerpt}
              onChange={(e) => patchArticle({ excerpt: e.target.value })}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            />
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Metadados</h3>
            <p className="mt-2 text-xs tabular-nums text-paper/45">
              Visualizações: {initial.view_count.toLocaleString("pt-BR")}
            </p>
            <label className="mt-3 block text-xs text-paper/45">Idioma</label>
            <select
              value={article.language}
              disabled={preview}
              onChange={(e) => patchArticle({ language: e.target.value })}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
            <label className="mt-3 block text-xs text-paper/45">Categoria</label>
            <select
              value={article.category_id ?? ""}
              disabled={preview}
              onChange={(e) => patchArticle({ category_id: e.target.value || null })}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            >
              <option value="">—</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_pt}
                </option>
              ))}
            </select>
            <label className="mt-3 block text-xs text-paper/45">Capa (URL)</label>
            <input
              value={article.cover_image ?? ""}
              disabled={preview}
              onChange={(e) => patchArticle({ cover_image: e.target.value || null })}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            />
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Tradução</h3>
            <p className="mt-1 text-xs text-paper/40">
              Defina o idioma do artigo acima. Traduz automaticamente ou crie uma versão vinculada.
            </p>
            <label className="mt-3 block text-xs text-paper/45">Traduzir a partir de</label>
            <select
              value={translateSource}
              disabled={preview || translating}
              onChange={(e) => setTranslateSource(e.target.value)}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
            <button
              type="button"
              disabled={preview || translating}
              onClick={() => void onAutoTranslate()}
              className="mt-3 w-full rounded border border-gold/35 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gold disabled:opacity-50"
            >
              {translating ? "Traduzindo…" : `Traduzir para ${article.language.toUpperCase()}`}
            </button>
            <div className="mt-3 flex flex-wrap gap-2">
              {linkedVersions
                .filter((v) => v.id !== article.id)
                .map((v) => (
                  <Link
                    key={v.id}
                    href={`/admin/artigos/${v.id}`}
                    className="text-xs text-paper/60 hover:text-gold"
                  >
                    Versão {v.language.toUpperCase()}
                  </Link>
                ))}
              {article.language === "pt" ? (
                <button
                  type="button"
                  onClick={() => void openTranslation("en")}
                  className="text-xs text-gold hover:underline"
                >
                  + Versão EN
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void openTranslation("pt")}
                  className="text-xs text-gold hover:underline"
                >
                  + Versão PT
                </button>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Banners</h3>
              <button type="button" onClick={addBanner} disabled={preview} className="text-xs text-gold">
                + Banner
              </button>
            </div>
            <p className="mt-1 text-xs text-paper/40">Inclua antes de publicar (topo, meio ou rodapé).</p>
            <ul className="mt-3 space-y-3">
              {article.banners.map((banner) => (
                <li key={banner.id} className="rounded border border-line/12 p-2">
                  <input
                    placeholder="URL da imagem"
                    value={banner.image_url}
                    disabled={preview}
                    onChange={(e) => updateBanner(banner.id, { image_url: e.target.value })}
                    className="mb-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1 text-xs"
                  />
                  <input
                    placeholder="Texto alternativo"
                    value={banner.alt}
                    disabled={preview}
                    onChange={(e) => updateBanner(banner.id, { alt: e.target.value })}
                    className="mb-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1 text-xs"
                  />
                  <input
                    placeholder="Link (opcional)"
                    value={banner.href ?? ""}
                    disabled={preview}
                    onChange={(e) => updateBanner(banner.id, { href: e.target.value || undefined })}
                    className="mb-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1 text-xs"
                  />
                  <select
                    value={banner.placement}
                    disabled={preview}
                    onChange={(e) =>
                      updateBanner(banner.id, { placement: e.target.value as ArticleBanner["placement"] })
                    }
                    className="w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1 text-xs"
                  >
                    <option value="top">Topo</option>
                    <option value="inline">Antes do texto</option>
                    <option value="bottom">Rodapé</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeBanner(banner.id)}
                    disabled={preview}
                    className="mt-2 text-xs text-fall hover:underline"
                  >
                    Remover
                  </button>
                </li>
              ))}
              {!article.banners.length ? <li className="text-xs text-paper/40">Nenhum banner.</li> : null}
            </ul>
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Fontes</h3>
            <p className="mt-1 text-xs text-paper/40">Um por linha: Rótulo | https://…</p>
            <textarea
              rows={4}
              disabled={preview}
              value={sourcesText}
              onChange={(e) => onSourcesChange(e.target.value)}
              className="mt-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm font-mono"
            />
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">SEO</h3>
            <input
              placeholder="SEO title"
              disabled={preview}
              value={article.seo_title ?? ""}
              onChange={(e) => patchArticle({ seo_title: e.target.value || null })}
              className="mt-3 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            />
            <textarea
              placeholder="Meta description"
              rows={3}
              disabled={preview}
              value={article.seo_description ?? ""}
              onChange={(e) => patchArticle({ seo_description: e.target.value || null })}
              className="mt-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            />
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => {
                const on = article.tag_ids.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    disabled={preview}
                    onClick={() => toggleTag(tag.id)}
                    className={`rounded-full border px-2 py-0.5 text-xs ${on ? "border-gold/50 text-gold" : "border-line/20 text-paper/50"}`}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </section>

          {canPublish(profile.role) ? (
            <section className="rounded-lg border border-line/12 p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Agendamento</h3>
              <input
                type="datetime-local"
                value={scheduledLocal}
                onChange={(e) => setScheduledLocal(e.target.value)}
                className="mt-2 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
              />
              <p className="mt-1 text-xs text-paper/40">Horário local; salvo em UTC no banco.</p>
            </section>
          ) : null}

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Histórico</h3>
            <ul className="mt-2 max-h-48 space-y-2 overflow-y-auto text-xs text-paper/60">
              {revisions.map((rev) => (
                <li key={rev.id} className="flex items-center justify-between gap-2">
                  <span>
                    v{rev.revision_number} · {new Date(rev.created_at).toLocaleString("pt-BR")}
                  </span>
                  <button
                    type="button"
                    className="text-gold hover:underline"
                    onClick={() => {
                      void restoreRevision(article.id, rev.id).then((res) => {
                        if (res.ok) window.location.reload();
                        else setSaveError(res.error);
                      });
                    }}
                  >
                    Restaurar
                  </button>
                </li>
              ))}
              {!revisions.length ? <li>Nenhuma revisão ainda.</li> : null}
            </ul>
          </section>
        </aside>
      </div>

      <AdminPasswordDialog
        open={passwordOpen}
        busy={actionBusy}
        title={pendingAction?.type === "delete" ? "Excluir artigo" : "Confirmar alteração"}
        description="Digite sua senha de administrador para excluir este artigo."
        confirmLabel="Excluir"
        onClose={() => {
          setPasswordOpen(false);
          setPendingAction(null);
        }}
        onConfirm={onPasswordConfirm}
      />
    </div>
  );
}
