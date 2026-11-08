"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "./SiteSections";
import { BrokerAccessBlock } from "./BrokerAccessBlock";
import { InsightArticleBody } from "./insights/InsightArticleBody";
import { InsightShare } from "./insights/InsightShare";
import type { Locale } from "../i18n";
import { isRtlLocale, localeToHtmlLang } from "../i18n/locales";
import { absoluteSiteUrl } from "../config/site";
import { getCategoryLabel } from "../data/insights/categories";
import {
  getInsightsPath,
  getPost,
  getPostsByLocale,
  insightsHero,
  insightLabels,
  type InsightPost,
} from "../data/insightsContent";
import type { InsightContentBlock } from "../data/insights/types";

function tableOfContents(post: InsightPost) {
  return post.blocks.filter(
    (block): block is Extract<InsightContentBlock, { type: "heading" }> => block.type === "heading" && block.level === 2,
  );
}

function SchemaScripts({ post, hubTitle }: { post: InsightPost; hubTitle: string }) {
  const url = absoluteSiteUrl(getInsightsPath(post.locale, post.slug));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: post.locale === "pt" ? "pt-BR" : post.locale,
    datePublished: post.date,
    dateModified: post.dateModified,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Varejo Investidor",
      url: absoluteSiteUrl("/"),
    },
    image: [absoluteSiteUrl(post.image)],
    mainEntityOfPage: url,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Varejo Investidor", item: absoluteSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: hubTitle, item: absoluteSiteUrl(getInsightsPath(post.locale)) },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  const faqSchema =
    post.faq && post.faq.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
    </>
  );
}

export function InsightPostPage({ pageLocale, slug }: { pageLocale: Locale; slug: string }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const post = getPost(pageLocale, slug);
  const labels = insightLabels[pageLocale] ?? insightLabels.en;
  const hub = insightsHero[pageLocale] ?? insightsHero.en;

  if (!post) {
    return null;
  }

  const url = absoluteSiteUrl(getInsightsPath(pageLocale, post.slug));
  const toc = tableOfContents(post);
  const relatedPosts = post.relatedPosts
    .map((relatedSlug) => getPost(pageLocale, relatedSlug))
    .filter(Boolean) as InsightPost[];
  const allPosts = getPostsByLocale(pageLocale);
  const fallbackRelated = relatedPosts.length ? relatedPosts : allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const levels = [
    { title: "Formiga", text: labels.formiga },
    { title: "Lobo", text: labels.lobo },
    { title: "Harpia", text: labels.harpia },
  ];

  const legacyContent = post.introduction ? [post.introduction, ...post.content] : post.content;

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts post={post} hubTitle={hub.title} />
      <main
        lang={localeToHtmlLang(pageLocale)}
        dir={isRtlLocale(pageLocale) ? "rtl" : "ltr"}
        className="insight-article min-h-screen bg-ink text-paper"
      >
        <article>
          <section className="relative overflow-hidden border-b border-gold/[0.14] px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
            <div className="absolute inset-0 terminal-grid opacity-45" />
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }} className="relative mx-auto max-w-5xl">
              <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/[0.45]">
                <a href="/" className="transition hover:text-gold">
                  Varejo Investidor
                </a>
                <span className="mx-2 text-gold/60">/</span>
                <a href={getInsightsPath(pageLocale)} className="transition hover:text-gold">
                  {hub.title}
                </a>
              </nav>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {getCategoryLabel(pageLocale, post.category)} · {post.date}
                {post.dateModified !== post.date ? ` · ${labels.updated ?? "Updated"} ${post.dateModified}` : ""} · {post.readingTime}
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">{post.title}</h1>
              {post.subtitle ? (
                <p className="mt-5 font-serif text-2xl leading-snug tracking-[-0.03em] text-gold md:text-3xl">{post.subtitle}</p>
              ) : null}
              <p className="mt-5 text-sm text-paper/[0.52]">
                {post.author}
              </p>
            </motion.div>
          </section>

          <section className="px-5 py-10 md:px-8">
            <div className="mx-auto max-w-5xl">
              <figure className="relative overflow-hidden border border-gold/[0.18] bg-ink">
                <div className="relative aspect-[16/9] w-full">
                  <Image src={post.image} alt={post.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
                </div>
                {post.imageCaption ? (
                  <figcaption className="border-t border-gold/[0.14] bg-paper/[0.03] px-5 py-3 text-sm text-paper/[0.58]">{post.imageCaption}</figcaption>
                ) : null}
              </figure>
            </div>
          </section>

          <section className="px-5 pb-12 md:px-8 md:pb-16">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div>
                <p className="text-xl leading-[1.85] text-paper/[0.82] md:text-2xl">{post.introduction || post.description}</p>
                <div className="mt-10">
                  <InsightArticleBody blocks={post.blocks} fallback={legacyContent} />
                </div>

                {post.sources && post.sources.length ? (
                  <div className="mt-14 border-t border-gold/[0.14] pt-10">
                    <h2 className="font-serif text-3xl tracking-[-0.04em]">{labels.sources ?? "Sources"}</h2>
                    <ul className="mt-5 space-y-3">
                      {post.sources.map((source) => (
                        <li key={source.url}>
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {post.faq && post.faq.length ? (
                  <div className="mt-14 border-t border-gold/[0.14] pt-10">
                    <h2 className="font-serif text-3xl tracking-[-0.04em]">{labels.faq}</h2>
                    <div className="mt-6 space-y-4">
                      {post.faq.map((item) => (
                        <div key={item.question} className="border border-gold/[0.14] bg-paper/[0.03] p-5">
                          <h3 className="font-serif text-xl">{item.question}</h3>
                          <p className="mt-3 leading-7 text-paper/[0.68]">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                {toc.length ? (
                  <nav className="insight-toc border border-gold/[0.18] bg-paper/[0.03] p-5" aria-label={labels.toc ?? "Table of contents"}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{labels.toc ?? "In this article"}</p>
                    <ul className="mt-4 space-y-2">
                      {toc.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            className="block border-l border-gold/[0.2] py-1 pl-3 text-sm leading-6 text-paper/[0.65]"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}
                <div className="border border-gold/[0.18] bg-paper/[0.03] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Tags</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="border border-gold/[0.18] bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper/[0.64]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <InsightShare post={post} url={url} label={labels.share ?? "Share"} />
              </aside>
            </div>
          </section>

          <section className="border-y border-gold/[0.12] px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.levelBlockTitle}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {levels.map((level) => (
                  <div key={level.title} className="border border-gold/[0.18] bg-paper/[0.03] p-6">
                    <h2 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h2>
                    <p className="mt-4 leading-7 text-paper/[0.66]">{level.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <BrokerAccessBlock locale={pageLocale} />

          <section className="px-5 py-12 md:px-8">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border border-gold/[0.18] bg-white p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.postCtaTitle}</p>
                <p className="mt-4 leading-8 text-paper/[0.68]">{labels.postCtaText}</p>
                <a
                  href="/educacao"
                  className="premium-button-gold mt-6 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                >
                  {labels.education}
                </a>
              </div>
              <FreeChannelCTA t={t} variant="dark" />
            </div>
          </section>

          <section className="px-5 py-12 md:px-8 md:pb-20">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.related}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {fallbackRelated.map((related) => (
                  <a
                    key={related.slug}
                    href={getInsightsPath(pageLocale, related.slug)}
                    className="border border-gold/[0.18] bg-paper/[0.03] p-6 transition hover:-translate-y-1 hover:border-gold"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                      {getCategoryLabel(pageLocale, related.category)}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl leading-[1.08] tracking-[-0.03em]">{related.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-paper/[0.64]">{related.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </article>
        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
