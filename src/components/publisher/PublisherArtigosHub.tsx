"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../SiteSections";
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

  const featured = articles.find((a) => a.featured) ?? articles[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (a.slug === featured?.slug) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.slug.includes(q);
    });
  }, [articles, featured?.slug, query]);

  const visiblePosts = filtered.slice(0, visible);
  const dateLocale = dateLocaleForArticles(language);

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <main lang={pageLocale} className="insights-portal min-h-screen bg-ink text-paper">
        <section className="border-b border-gold/[0.14] px-5 pb-14 pt-28 md:px-8 md:pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Varejo Investidor</p>
            <h1 className="mt-4 font-serif text-5xl tracking-[-0.05em] md:text-6xl">{copy.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/[0.68]">{copy.subtitle}</p>
          </motion.div>
        </section>

        {featured ? (
          <section className="px-5 py-12 md:px-8">
            <div className="mx-auto max-w-5xl">
              <Link
                href={getPublisherArticlePath(language, featured.slug)}
                className="group block overflow-hidden border border-gold/[0.18] bg-paper/[0.02]"
              >
                {hasArticleVideo(featured.videos) ? (
                  <ArticleVideoThumb
                    videos={featured.videos}
                    title={featured.title}
                    variant="featured"
                    className="transition duration-500 group-hover:scale-[1.01]"
                  />
                ) : featured.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.cover_image} alt="" className="aspect-[21/9] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                ) : (
                  <div className="aspect-[21/9] w-full bg-paper/[0.04]" />
                )}
                <div className="p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold">{copy.featured}</p>
                  <h2 className="mt-3 font-serif text-3xl tracking-tight group-hover:text-gold">{featured.title}</h2>
                  <p className="mt-3 text-paper/65">{featured.excerpt}</p>
                </div>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="px-5 pb-20 md:px-8">
          <div className="mx-auto max-w-5xl space-y-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="insight-search-input w-full max-w-md rounded border border-gold/[0.2] px-4 py-3 text-sm outline-none focus:border-gold/50"
            />

            {!articles.length ? <p className="text-paper/55">{copy.empty}</p> : null}

            <div className="grid gap-6 md:grid-cols-2">
              {visiblePosts.map((post) => (
                <Link
                  key={post.id}
                  href={getPublisherArticlePath(language, post.slug)}
                  className="insight-editorial-card group flex flex-col overflow-hidden border border-gold/[0.14] bg-paper/[0.02] transition hover:border-gold/35"
                >
                  {hasArticleVideo(post.videos) ? (
                    <ArticleVideoThumb videos={post.videos} title={post.title} />
                  ) : post.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.cover_image} alt="" className="aspect-[16/10] w-full object-cover" />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                      {post.category_name ?? "Editorial"} · {new Date(post.published_at).toLocaleDateString(dateLocale)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl tracking-tight group-hover:text-gold">{post.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/60">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
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

        <FreeChannelCTA t={t} variant="dark" />
        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
