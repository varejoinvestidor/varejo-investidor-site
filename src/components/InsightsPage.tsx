"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "./SiteSections";
import { BrokerAccessBlock } from "./BrokerAccessBlock";
import type { Locale } from "../i18n";
import { isRtlLocale, localeToHtmlLang } from "../i18n/locales";
import { absoluteSiteUrl } from "../config/site";
import { insightCategoryKeys } from "../data/insights/categories";
import {
  filterInsightPosts,
  getFeaturedPost,
  getInsightMarketLinks,
  getInsightsPath,
  getPostsByLocale,
  insightLabels,
  insightsFaq,
  insightsHero,
  type InsightCategoryKey,
} from "../data/insightsContent";
import { getCategoryLabel } from "../data/insights/categories";

type CategoryFilter = "all" | InsightCategoryKey;

const PAGE_SIZE = 6;

function SchemaScripts({ locale }: { locale: Locale }) {
  const hero = insightsHero[locale] ?? insightsHero.en;
  const posts = getPostsByLocale(locale);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: hero.title,
    description: hero.metaDescription,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    url: absoluteSiteUrl(getInsightsPath(locale)),
    publisher: { "@type": "Organization", name: "Varejo Investidor", url: absoluteSiteUrl("/") },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteSiteUrl(getInsightsPath(locale, post.slug)),
      datePublished: post.date,
      dateModified: post.dateModified,
      author: { "@type": "Organization", name: post.author },
      image: absoluteSiteUrl(post.image),
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Varejo Investidor", item: absoluteSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: hero.title, item: absoluteSiteUrl(getInsightsPath(locale)) },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (insightsFaq[locale] ?? insightsFaq.en).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export function InsightsPage({ pageLocale }: { pageLocale: Locale }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const labels = insightLabels[pageLocale] ?? insightLabels.en;
  const hero = insightsHero[pageLocale] ?? insightsHero.en;
  const posts = getPostsByLocale(pageLocale);
  const featured = getFeaturedPost(pageLocale);
  const marketLinks = getInsightMarketLinks(pageLocale);

  const filteredPosts = useMemo(
    () => filterInsightPosts(posts, { query, category: activeCategory }).filter((post) => post.slug !== featured?.slug),
    [activeCategory, featured?.slug, posts, query],
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const categories = insightCategoryKeys.map((key) => [key, getCategoryLabel(pageLocale, key)] as const);

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts locale={pageLocale} />
      <main
        lang={localeToHtmlLang(pageLocale)}
        dir={isRtlLocale(pageLocale) ? "rtl" : "ltr"}
        className="insights-portal min-h-screen bg-ink text-paper"
      >
        <section className="relative overflow-hidden border-b border-gold/[0.14] px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
          <div className="absolute inset-0 terminal-grid opacity-45" />
          <div className="absolute right-0 top-16 h-[28rem] w-[28rem] bg-gold/[0.09] blur-3xl" />
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }} className="relative mx-auto max-w-7xl">
            <p className="insight-hero-kicker text-xs font-black uppercase text-gold">{labels.editorialDesk ?? labels.content}</p>
            <h1 className="insight-hero-title mt-5 max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] md:text-7xl">{hero.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/[0.68] md:text-xl">{hero.subtitle}</p>
            <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="insight-search">
                {labels.search ?? "Search"}
              </label>
              <input
                id="insight-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder={labels.searchPlaceholder ?? "Search articles…"}
                className="insight-search-input w-full border border-gold/[0.24] px-4 py-4 text-sm text-paper outline-none ring-0 placeholder:text-paper/[0.38] focus:border-gold"
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/[0.45] sm:shrink-0">
                {posts.length} {labels.nav}
              </p>
            </div>
          </motion.div>
        </section>

        {featured ? (
          <section className="px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-7xl">
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="insight-featured insight-editorial-card grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div className="relative min-h-[260px] border-b border-gold/[0.18] bg-ink lg:min-h-[420px] lg:border-b-0 lg:border-r">
                  <Image src={featured.image} alt={featured.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                </div>
                <div className="relative p-7 md:p-10">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{labels.latest}</p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-paper/[0.48]">
                    {getCategoryLabel(pageLocale, featured.category)} · {featured.date} · {featured.readingTime}
                  </p>
                  <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">{featured.title}</h2>
                  <p className="mt-4 font-serif text-xl leading-snug text-gold/90">{featured.subtitle}</p>
                  <p className="mt-5 max-w-xl text-base leading-8 text-paper/[0.68]">{featured.description}</p>
                  <a
                    href={getInsightsPath(pageLocale, featured.slug)}
                    className="premium-button-gold mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                  >
                    {labels.read}
                  </a>
                </div>
              </motion.article>
            </div>
          </section>
        ) : null}

        <section className="border-y border-gold/[0.12] px-5 py-10 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.categories}</p>
            <div className="insight-category-rail mt-5 flex snap-x gap-2 overflow-x-auto pb-2">
              {[["all", labels.all], ...categories].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(key as CategoryFilter);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={`shrink-0 border px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition ${
                    activeCategory === key
                      ? "border-gold bg-gold text-ink"
                      : "border-gold/[0.2] bg-paper/[0.04] text-paper/[0.68] hover:border-gold hover:text-gold"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-5xl">{labels.recent}</h2>
              <p className="text-sm text-paper/[0.52]">
                {filteredPosts.length} {labels.nav.toLowerCase()}
              </p>
            </div>

            {visiblePosts.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <motion.a
                    key={post.slug}
                    href={getInsightsPath(pageLocale, post.slug)}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="insight-editorial-card group relative overflow-hidden border border-gold/[0.18] bg-paper/[0.03]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-gold/[0.14] bg-ink">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="relative p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        {getCategoryLabel(pageLocale, post.category)}
                      </p>
                      <h3 className="mt-4 font-serif text-2xl leading-[1.08] tracking-[-0.035em]">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-paper/[0.64]">{post.description}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-gold/[0.12] pt-4 text-[10px] uppercase tracking-[0.14em] text-paper/[0.45]">
                        <span>{post.readingTime}</span>
                        <span className="text-gold">{labels.read}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="mt-10 text-base text-paper/[0.58]">{labels.noResults ?? "No results."}</p>
            )}

            {visibleCount < filteredPosts.length ? (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="border border-gold/[0.32] bg-paper/[0.04] px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:border-gold hover:bg-gold/[0.08]"
                >
                  {labels.loadMore ?? "Load more"}
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="border-y border-gold/[0.12] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.marketsNav ?? labels.markets}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {marketLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="border border-gold/[0.14] bg-paper/[0.035] px-4 py-4 text-sm font-bold text-paper/[0.78] transition hover:border-gold hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <BrokerAccessBlock locale={pageLocale} />

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <FreeChannelCTA t={t} variant="dark" />
            <div className="border border-gold/[0.18] bg-white p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.faq}</p>
              <div className="mt-6 grid gap-4">
                {(insightsFaq[pageLocale] ?? insightsFaq.en).map((faq) => (
                  <div key={faq.question} className="border border-gold/[0.12] bg-ink p-5">
                    <h3 className="font-serif text-xl tracking-[-0.03em] text-paper">{faq.question}</h3>
                    <p className="mt-3 leading-7 text-paper/[0.64]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
