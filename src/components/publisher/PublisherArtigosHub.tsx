"use client";

import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../SiteSections";
import { FormigaChannelBanner } from "../banners/FormigaChannelBanner";
import type { Locale } from "../../i18n";
import type { PublisherHubCopy } from "../../publisher/public/hubCopy";
import { dateLocaleForArticles } from "../../publisher/public/hubCopy";
import type { PublicArticleSummary } from "../../publisher/public/types";
import { getPublisherArticlePath } from "../../publisher/public/paths";
import { ArticleVideoThumb } from "./ArticleHeroVideo";
import { hasArticleVideo } from "../../publisher/types/video";

const PAGE_SIZE = 9;

export function PublisherArtigosHub({
  articles,
  language,
  pageLocale,
  copy,
}: {
  articles: PublicArticleSummary[];
  language: string;
  pageLocale: Locale;
  copy: PublisherHubCopy;
}) {
  const { locale, t, changeLocale } = useSiteLocale();
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [category, setCategory] = useState<string | null>(null);
  const [featuredHover, setFeaturedHover] = useState(false);
  const onFeaturedEnter = useCallback(() => setFeaturedHover(true), []);
  const onFeaturedLeave = useCallback(() => setFeaturedHover(false), []);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const featuredVertical = Boolean(featured?.videos?.vertical);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const a of articles) {
      if (a.category_name?.trim()) set.add(a.category_name.trim());
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (a.slug === featured?.slug) return false;
      if (category && a.category_name !== category) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.slug.includes(q);
    });
  }, [articles, category, featured?.slug, query]);

  const visiblePosts = filtered.slice(0, visible);
  const dateLocale = dateLocaleForArticles(language);

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <main lang={pageLocale} className="insights-portal insights-portal--editorial min-h-screen bg-ink text-paper">
        <section className="border-b border-gold/[0.14] px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="editorial-hub-header mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Varejo Investidor</p>
                <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em] md:text-6xl">{copy.title}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/[0.68]">{copy.subtitle}</p>
              </div>
              <nav aria-label="Categorias" className="editorial-category-rail flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className={`shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
                    category === null ? "border-gold bg-gold/15 text-gold" : "border-gold/20 text-paper/55 hover:border-gold/40"
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition ${
                      category === cat ? "border-gold bg-gold/15 text-gold" : "border-gold/20 text-paper/55 hover:border-gold/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        </section>

        {featured ? (
          <section className="px-5 py-10 md:px-8 md:py-12">
            <div className="mx-auto max-w-7xl">
              <Link
                href={getPublisherArticlePath(language, featured.slug)}
                className={`editorial-featured group overflow-hidden border border-gold/[0.2] bg-paper/[0.02] ${
                  featuredVertical
                    ? "editorial-featured--vertical md:grid md:grid-cols-[minmax(240px,360px)_1fr] lg:grid-cols-[minmax(280px,400px)_1fr]"
                    : ""
                }`}
                onMouseEnter={onFeaturedEnter}
                onMouseLeave={onFeaturedLeave}
                onFocus={onFeaturedEnter}
                onBlur={onFeaturedLeave}
              >
                <div
                  className={`${featuredVertical ? "flex items-stretch justify-center border-b border-gold/[0.14] bg-black p-4 md:border-b-0 md:border-r md:p-5 lg:p-6" : ""}`}
                >
                  {hasArticleVideo(featured.videos) ? (
                    <ArticleVideoThumb
                      videos={featured.videos}
                      title={featured.title}
                      variant="featured"
                      boostPlay={featuredHover}
                      className="transition duration-500 group-hover:scale-[1.01]"
                    />
                  ) : featured.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.cover_image}
                      alt=""
                      className="aspect-[21/9] w-full object-cover transition duration-500 group-hover:scale-[1.02] lg:aspect-auto lg:h-full lg:min-h-[320px]"
                    />
                  ) : (
                    <div className="aspect-[21/9] w-full bg-paper/[0.04] lg:min-h-[320px]" />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">{copy.featured}</p>
                  <h2 className="mt-3 font-serif text-3xl tracking-tight text-paper group-hover:text-gold md:text-4xl lg:text-[2.35rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/65 md:text-lg">{featured.excerpt}</p>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-paper/40">
                    {featured.category_name ?? "Editorial"} ·{" "}
                    {new Date(featured.published_at).toLocaleDateString(dateLocale)}
                  </p>
                </div>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="border-t border-gold/[0.1] px-5 pb-24 pt-10 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-serif text-2xl tracking-tight text-paper md:text-3xl">Mais artigos</h2>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="insight-search-input w-full max-w-md rounded border border-gold/[0.2] px-4 py-3 text-sm outline-none focus:border-gold/50 sm:w-80"
              />
            </div>

            {!articles.length ? <p className="text-paper/55">{copy.empty}</p> : null}

            <div className="editorial-magazine-grid">
              {visiblePosts.map((post, index) => {
                const verticalCard = Boolean(post.videos?.vertical);
                return (
                  <Link
                    key={post.id}
                    href={getPublisherArticlePath(language, post.slug)}
                    className={`insight-editorial-card group overflow-hidden border border-gold/[0.14] bg-paper/[0.02] transition hover:border-gold/35 ${
                      index % 7 === 0 ? "editorial-card--span-2" : ""
                    } ${verticalCard ? "editorial-card--vertical-split flex flex-col md:grid md:grid-cols-[minmax(150px,200px)_1fr] md:items-stretch" : "flex flex-col"}`}
                  >
                    {hasArticleVideo(post.videos) ? (
                      <div
                        className={
                          verticalCard
                            ? "flex items-center justify-center border-b border-gold/[0.12] bg-black/80 p-3 md:border-b-0 md:border-r"
                            : ""
                        }
                      >
                        <ArticleVideoThumb
                          videos={
                            verticalCard && post.videos.vertical
                              ? { ...post.videos, primary: "vertical" }
                              : post.videos
                          }
                          title={post.title}
                        />
                      </div>
                    ) : post.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_image} alt="" className="aspect-[16/10] w-full object-cover" />
                    ) : null}
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                        {post.category_name ?? "Editorial"} · {new Date(post.published_at).toLocaleDateString(dateLocale)}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl tracking-tight group-hover:text-gold">{post.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/60 line-clamp-4">{post.excerpt}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {visible < filtered.length ? (
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded border border-gold/30 px-6 py-2 text-xs font-bold uppercase tracking-wider text-gold"
              >
                {copy.loadMore}
              </button>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-7xl border-t border-gold/[0.14] px-5 py-12 md:px-8 md:py-14">
          <FormigaChannelBanner language={locale.split("-")[0] || "pt"} className="w-full" />
        </section>
        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
