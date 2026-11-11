"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  changeArticleStatus,
  deleteArticle,
  listArticleRevisions,
  restoreRevision,
  saveAndPublishArticle,
  saveArticle,
  type ArticleRecord,
  type SaveArticleInput,
} from "../articles/actions";
import { STATUS_BADGE, STATUS_LABELS } from "../articles/labels";
import { slugifyTitle } from "../articles/slug";
import type { CategoryRow, TagRow } from "../taxonomy/actions";
import type { PublisherProfile } from "../types";
import { AdminPasswordDialog } from "../admin/AdminPasswordDialog";
import { ArticlePublisherSchemaAlert } from "../admin/ArticlePublisherSchemaAlert";
import { canPublish } from "../permissions";
import {
  applyAutoTranslateToArticle,
  createTranslationDraft,
  listLinkedTranslations,
} from "../translation/actions";
import { ChannelBannerByPreset } from "../../components/banners/ChannelBannerByPreset";
import { ARTICLE_BANNER_PRESETS, bannerFromPreset, resolveArticleBanner } from "../data/articleBannerPresets";
import { isChannelBannerPreset } from "../types/banner";
import { PUBLISHER_LANGUAGE_OPTIONS } from "../locales";
import {
  bannersFromArticleContent,
  embedBannersInContent,
  type ArticleBanner,
  type ArticleBannerPreset,
} from "../types/banner";
import { PublisherRichTextEditor } from "./PublisherRichTextEditor";
import { ArticleBannerPreviewStrip } from "./ArticleBannerPreview";
import { suggestArticleSeo } from "./suggestArticleSeo";
import { ArticleVideoFields } from "./ArticleVideoFields";
import { emptyArticleVideos } from "../types/video";

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
  const saveFlightRef = useRef<Promise<boolean> | null>(null);
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
  const [translateSource, setTranslateSource] = useState(
    initial.language === "pt" ? "en" : "pt",
  );
  const [translating, setTranslating] = useState(false);
  const [linkedVersions, setLinkedVersions] = useState<{ id: string; language: string; slug: string }[]>([]);
  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);
  const seoAutofillDone = useRef(false);

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
      videos: article.videos ?? emptyArticleVideos(),
    }),
    [article],
  );

  const sourcesText = article.sources.map((s) => `${s.label} | ${s.url}`).join("\n");

  useEffect(() => {
    if (seoAutofillDone.current) return;
    if (article.seo_title?.trim() && article.seo_description?.trim()) {
      seoAutofillDone.current = true;
      return;
    }
    if (!article.title.trim()) return;
    seoAutofillDone.current = true;
    const next = suggestArticleSeo({
      title: article.title,
      subtitle: article.subtitle,
      excerpt: article.excerpt,
      content: article.content,
    });
    setArticle((prev) => ({
      ...prev,
      seo_title: prev.seo_title?.trim() ? prev.seo_title : next.seo_title,
      seo_description: prev.seo_description?.trim() ? prev.seo_description : next.seo_description,
    }));
    setIsDirty(true);
    isDirtyRef.current = true;
  }, [article.title, article.subtitle, article.excerpt, article.content, article.seo_title, article.seo_description]);

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
    if (saveFlightRef.current) return saveFlightRef.current;

    const task = (async () => {
      savingRef.current = true;
      setSaveState("saving");
      setSaveError(null);
      try {
        const result = await saveArticle(input, { snapshot, revalidate });
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
      } finally {
        savingRef.current = false;
        saveFlightRef.current = null;
      }
    })();

    saveFlightRef.current = task;
    return task;
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

  /** Artigos publicados antes do embed no conteúdo: sincroniza uma vez ao abrir o editor. */
  useEffect(() => {
    if (!article.banners.length) return;
    if (bannersFromArticleContent(article.content).length) return;
    setArticle((prev) => ({
      ...prev,
      content: embedBannersInContent(prev.content, prev.banners),
    }));
    setIsDirty(true);
    isDirtyRef.current = true;
  }, [article.id]);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty || publishing) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void persist(payload, false, false);
    }, 1100);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [payload, persist, isDirty, publishing]);

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

    const input = payload;
    const scheduledAt =
      status === "scheduled" && scheduledLocal ? new Date(scheduledLocal).toISOString() : undefined;

    if (isPublish) {
      setPublishStep(40, "Salvando e publicando…");
      const result = await saveAndPublishArticle(input);
      if (!result.ok) {
        setSaveError(result.error);
        setPublishFlow(null);
        setPublishing(false);
        return;
      }
      slugRef.current = result.data!.slug;
      setIsDirty(false);
      isDirtyRef.current = false;
      setSaveState("saved");
      setArticle((prev) => ({
        ...prev,
        status: "published",
        slug: result.data!.slug,
        updated_at: result.data!.updated_at,
        published_at: new Date().toISOString(),
        scheduled_at: null,
      }));
      const path = input.language === "en" ? `/en/artigos/${result.data!.slug}` : `/artigos/${result.data!.slug}`;
      setPublishStep(100, "Publicação concluída");
      setPublishSuccess(`Artigo publicado com sucesso! Disponível em ${path}`);
      setPublishing(false);
      window.setTimeout(() => setPublishFlow(null), 1200);
      return;
    }

    const saved = await flushSave();
    if (!saved) return;

    const result = await changeArticleStatus(article.id, status, scheduledAt ?? null);
    if (!result.ok) {
      setSaveError(result.error);
      return;
    }

    setArticle((prev) => ({
      ...prev,
      status,
      scheduled_at: scheduledAt ?? prev.scheduled_at,
    }));
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

  function addBannerPreset(preset: ArticleBannerPreset) {
    const banner = bannerFromPreset(preset, "inline");
    patchArticle((prev) => ({
      ...prev,
      banners: [...prev.banners, banner],
      content: embedBannersInContent(prev.content, [...prev.banners, banner]),
    }));
    window.setTimeout(() => {
      setSelectedBannerId(banner.id);
      document.getElementById(`banner-editor-${banner.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  function moveBanner(id: string, direction: -1 | 1) {
    patchArticle((prev) => {
      const idx = prev.banners.findIndex((b) => b.id === id);
      if (idx < 0) return prev;
      const target = idx + direction;
      if (target < 0 || target >= prev.banners.length) return prev;
      const banners = [...prev.banners];
      [banners[idx], banners[target]] = [banners[target], banners[idx]];
      return { ...prev, banners, content: embedBannersInContent(prev.content, banners) };
    });
  }

  function focusBanner(id: string) {
    setSelectedBannerId(id);
    document.getElementById(`banner-editor-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById(`banner-settings-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function updateBanner(id: string, patch: Partial<ArticleBanner>) {
    patchArticle((prev) => {
      const banners = prev.banners.map((b) => (b.id === id ? { ...b, ...patch } : b));
      return { ...prev, banners, content: embedBannersInContent(prev.content, banners) };
    });
  }

  function removeBanner(id: string) {
    patchArticle((prev) => {
      const banners = prev.banners.filter((b) => b.id !== id);
      return { ...prev, banners, content: embedBannersInContent(prev.content, banners) };
    });
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

      {saveError ? <ArticlePublisherSchemaAlert message={saveError} /> : null}

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

          <ArticleBannerPreviewStrip
            banners={article.banners}
            placement="top"
            language={article.language}
            activeBannerId={selectedBannerId}
            onSelectBanner={focusBanner}
          />

          <ArticleBannerPreviewStrip
            banners={article.banners}
            placement="inline"
            language={article.language}
            activeBannerId={selectedBannerId}
            onSelectBanner={focusBanner}
          />

          <PublisherRichTextEditor
            content={article.content}
            editable={!preview}
            onChange={(json) =>
              patchArticle((prev) => ({
                ...prev,
                content: embedBannersInContent(json, prev.banners),
              }))
            }
          />

          <ArticleBannerPreviewStrip
            banners={article.banners}
            placement="bottom"
            language={article.language}
            activeBannerId={selectedBannerId}
            onSelectBanner={focusBanner}
          />
        </div>

        <aside className="space-y-6">
          <ArticleVideoFields
            videos={article.videos ?? emptyArticleVideos()}
            disabled={preview}
            variant="sidebar"
            onChange={(videos) => patchArticle({ videos })}
          />

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
              {PUBLISHER_LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
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
              Idioma deste artigo = destino da tradução. Origem padrão: português. Vídeos do YouTube não são retraduzidos.
            </p>
            <label className="mt-3 block text-xs text-paper/45">Traduzir a partir de</label>
            <select
              value={translateSource}
              disabled={preview || translating}
              onChange={(e) => setTranslateSource(e.target.value)}
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1.5 text-sm"
            >
              {PUBLISHER_LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={preview || translating || translateSource === article.language}
              onClick={() => void onAutoTranslate()}
              className="mt-3 w-full rounded border border-gold/35 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gold disabled:opacity-50"
            >
              {translating
                ? "Traduzindo…"
                : `Traduzir ${translateSource.toUpperCase()} → ${article.language.toUpperCase()}`}
            </button>
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-paper/45">Versões vinculadas (21 idiomas)</p>
              <div className="mt-2 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
                {PUBLISHER_LANGUAGE_OPTIONS.map((opt) => {
                  const existing = linkedVersions.find((v) => v.language === opt.code && v.id !== article.id);
                  if (existing) {
                    return (
                      <Link
                        key={opt.code}
                        href={`/admin/artigos/${existing.id}`}
                        className="rounded border border-gold/30 bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold"
                      >
                        {opt.code.toUpperCase()} ✓
                      </Link>
                    );
                  }
                  if (opt.code === article.language) {
                    return (
                      <span
                        key={opt.code}
                        className="rounded border border-line/20 px-2 py-1 text-[10px] text-paper/50"
                      >
                        {opt.code.toUpperCase()} (atual)
                      </span>
                    );
                  }
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      disabled={preview}
                      onClick={() => void openTranslation(opt.code)}
                      className="rounded border border-line/20 px-2 py-1 text-[10px] text-paper/60 transition hover:border-gold/40 hover:text-gold"
                    >
                      + {opt.code.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-line/12 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">Banners do site</h3>
            <p className="mt-1 text-xs text-paper/40">
              Escolha Formiga, Lobo, Select, Private, FxPro ou Binance. Ajuste largura, zoom, enquadramento e altura da arte. No meio, defina a profundidade no texto.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {ARTICLE_BANNER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  disabled={preview}
                  onClick={() => addBannerPreset(preset.id)}
                  className="rounded border border-line/15 px-2 py-2 text-left text-[11px] transition hover:border-gold/40"
                >
                  <span className="font-semibold text-gold">{preset.label}</span>
                  <span className="mt-0.5 block text-paper/45">{preset.description}</span>
                </button>
              ))}
            </div>
            <ul className="mt-3 space-y-3">
              {article.banners.map((banner, index) => {
                const resolved = resolveArticleBanner(banner, article.language);
                const label = banner.preset
                  ? ARTICLE_BANNER_PRESETS.find((p) => p.id === banner.preset)?.label ?? banner.preset
                  : banner.alt || "Banner personalizado";
                return (
                  <li
                    key={banner.id}
                    id={`banner-settings-${banner.id}`}
                    className={`rounded border p-2 ${
                      selectedBannerId === banner.id ? "border-gold/50 bg-gold/5" : "border-line/12"
                    }`}
                  >
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => focusBanner(banner.id)}
                    >
                      <div className="mb-2 overflow-hidden rounded border border-line/10">
                        {isChannelBannerPreset(resolved.preset) ? (
                          <ChannelBannerByPreset
                            preset={resolved.preset}
                            language={article.language.split("-")[0] || "pt"}
                            href={resolved.href}
                            className="w-full"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={resolved.image_url}
                            alt=""
                            className="aspect-[1324/150] w-full object-cover"
                          />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-paper/70">{label}</p>
                    </button>
                    <p className="mt-1 text-[10px] text-paper/40">Posição no artigo (como no site público)</p>
                    <div className="mt-2 grid grid-cols-3 gap-1">
                      {(
                        [
                          { v: "top" as const, l: "Topo" },
                          { v: "inline" as const, l: "Meio" },
                          { v: "bottom" as const, l: "Rodapé" },
                        ] as const
                      ).map((opt) => (
                        <button
                          key={opt.v}
                          type="button"
                          disabled={preview}
                          onClick={() => {
                            updateBanner(banner.id, { placement: opt.v });
                            focusBanner(banner.id);
                          }}
                          className={`rounded px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                            banner.placement === opt.v
                              ? "bg-gold/25 text-gold"
                              : "border border-line/15 text-paper/50 hover:border-gold/30"
                          }`}
                        >
                          {opt.l}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 space-y-3 border-t border-line/10 pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-paper/45">Arte do banner</p>
                      <label className="block text-[10px] text-paper/40">
                        Largura no artigo ({banner.display_scale ?? 100}%)
                        <input
                          type="range"
                          min={55}
                          max={100}
                          step={5}
                          disabled={preview}
                          value={banner.display_scale ?? 100}
                          onChange={(e) => updateBanner(banner.id, { display_scale: Number(e.target.value) })}
                          className="mt-1 w-full accent-gold"
                        />
                      </label>
                      <label className="block text-[10px] text-paper/40">
                        Zoom da imagem ({banner.image_scale ?? 103}%)
                        <input
                          type="range"
                          min={70}
                          max={120}
                          step={1}
                          disabled={preview}
                          value={banner.image_scale ?? 103}
                          onChange={(e) => updateBanner(banner.id, { image_scale: Number(e.target.value) })}
                          className="mt-1 w-full accent-gold"
                        />
                      </label>
                      <div>
                        <p className="text-[10px] text-paper/40">Reposicionar enquadramento</p>
                        <div className="mt-2 grid w-24 grid-cols-3 gap-1">
                          {[
                            [15, 20],
                            [50, 20],
                            [85, 20],
                            [15, 50],
                            [50, 50],
                            [85, 50],
                            [15, 85],
                            [50, 85],
                            [85, 85],
                          ].map(([x, y]) => {
                            const active =
                              (banner.image_focus_x ?? 50) === x && (banner.image_focus_y ?? 82) === y;
                            return (
                              <button
                                key={`${x}-${y}`}
                                type="button"
                                disabled={preview}
                                onClick={() => updateBanner(banner.id, { image_focus_x: x, image_focus_y: y })}
                                className={`h-6 rounded-sm border ${
                                  active ? "border-gold bg-gold/30" : "border-line/20 hover:border-gold/40"
                                }`}
                                title={`${x}% · ${y}%`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(
                          [
                            { v: "full" as const, l: "Alto" },
                            { v: "medium" as const, l: "Médio" },
                            { v: "compact" as const, l: "Baixo" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.v}
                            type="button"
                            disabled={preview}
                            onClick={() => updateBanner(banner.id, { panel_height: opt.v })}
                            className={`rounded px-2 py-1 text-[10px] font-semibold ${
                              (banner.panel_height ?? "full") === opt.v
                                ? "bg-gold/25 text-gold"
                                : "border border-line/15 text-paper/50"
                            }`}
                          >
                            {opt.l}
                          </button>
                        ))}
                      </div>
                    </div>
                    {banner.placement === "inline" ? (
                      <div className="mt-3">
                        <p className="text-[10px] text-paper/40">Profundidade no texto (meio do artigo)</p>
                        <div className="mt-2 grid grid-cols-5 gap-1">
                          {[20, 35, 50, 65, 80].map((pct) => (
                            <button
                              key={pct}
                              type="button"
                              disabled={preview}
                              onClick={() => {
                                updateBanner(banner.id, { inline_position: pct });
                                focusBanner(banner.id);
                              }}
                              className={`rounded px-1 py-1.5 text-[10px] font-semibold ${
                                (banner.inline_position ?? 50) === pct
                                  ? "bg-rise/20 text-rise"
                                  : "border border-line/15 text-paper/50 hover:border-gold/30"
                              }`}
                            >
                              {pct}%
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={preview || index === 0}
                        onClick={() => moveBanner(banner.id, -1)}
                        className="text-[10px] text-paper/55 hover:text-gold disabled:opacity-30"
                        title="Subir na ordem"
                      >
                        ↑ Mover
                      </button>
                      <button
                        type="button"
                        disabled={preview || index === article.banners.length - 1}
                        onClick={() => moveBanner(banner.id, 1)}
                        className="text-[10px] text-paper/55 hover:text-gold disabled:opacity-30"
                        title="Descer na ordem"
                      >
                        ↓ Mover
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBanner(banner.id)}
                        disabled={preview}
                        className="ml-auto text-[10px] text-fall hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                );
              })}
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
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-paper/55">SEO</h3>
              <button
                type="button"
                disabled={preview}
                onClick={() => {
                  const next = suggestArticleSeo({
                    title: article.title,
                    subtitle: article.subtitle,
                    excerpt: article.excerpt,
                    content: article.content,
                  });
                  patchArticle({ seo_title: next.seo_title, seo_description: next.seo_description });
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-gold hover:underline disabled:opacity-40"
              >
                Preencher pelo artigo
              </button>
            </div>
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
