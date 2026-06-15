"use client";

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
import {
  getInsightsPath,
  getPost,
  getPostsByLocale,
  insightCategories,
  insightLabels,
  type InsightPost,
} from "../data/insightsContent";

function SchemaScripts({ post }: { post: InsightPost }) {
  const url = `https://varejo-investidor-site.vercel.app${getInsightsPath(post.locale, post.slug)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: post.locale === "pt" ? "pt-BR" : post.locale,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Varejo Investidor" },
    mainEntityOfPage: url,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />;
}

export function InsightPostPage({ pageLocale, slug }: { pageLocale: Locale; slug: string }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const post = getPost(pageLocale, slug);
  const labels = insightLabels[pageLocale];

  if (!post) {
    return null;
  }

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

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts post={post} />
      <main lang={pageLocale === "pt" ? "pt-BR" : pageLocale} dir={pageLocale === "ar" || pageLocale === "ur" || pageLocale === "fa" ? "rtl" : "ltr"} className="min-h-screen bg-ink text-paper">
        <article>
          <section className="page-hero relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
            <div className="absolute inset-0 terminal-grid opacity-55" />
            <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }} className="relative mx-auto max-w-5xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {insightCategories[pageLocale][post.category]} | {post.date} | {post.readingTime}
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">{post.title}</h1>
              <p className="mt-6 text-lg leading-8 text-paper/[0.68] md:text-xl">{post.description}</p>
            </motion.div>
          </section>

          <section className="px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden border border-gold/[0.18] bg-white p-6 shadow-premium md:p-9">
                <div className="absolute inset-0 luxury-grid opacity-35" />
                <div className="relative h-64 overflow-hidden border border-gold/[0.12] bg-ink md:h-80">
                  <div className="absolute inset-0 terminal-grid opacity-45" />
                  <div className="absolute inset-x-10 top-1/2 h-32 -translate-y-1/2 rounded-full bg-gold/[0.12] blur-3xl" />
                  <div className="relative flex h-full items-center justify-center text-center">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Varejo Investidor</p>
                      <p className="mt-4 font-serif text-4xl tracking-[-0.04em] text-paper md:text-5xl">Global Market Briefing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.72fr_0.28fr]">
              <div className="space-y-7">
                {post.content.map((paragraph) => (
                  <p key={paragraph} className="text-lg leading-9 text-paper/[0.72]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <aside className="border border-gold/[0.18] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Tags</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="border border-gold/[0.18] bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper/[0.64]">
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.levelBlockTitle}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {levels.map((level) => (
                  <div key={level.title} className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-6">
                    <div className="absolute inset-0 terminal-grid opacity-35" />
                    <div className="relative">
                      <h2 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h2>
                      <p className="mt-4 leading-7 text-paper/[0.66]">{level.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <BrokerAccessBlock locale={pageLocale} />

          <section className="px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border border-gold/[0.18] bg-white p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.postCtaTitle}</p>
                <p className="mt-4 leading-8 text-paper/[0.68]">{labels.postCtaText}</p>
                <a href="/educacao" className="premium-button-gold mt-6 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {labels.education}
                </a>
              </div>
              <FreeChannelCTA t={t} variant="dark" />
            </div>
          </section>

          <section className="px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.related}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {fallbackRelated.map((related) => (
                  <a key={related.slug} href={getInsightsPath(pageLocale, related.slug)} className="border border-gold/[0.18] bg-white p-6 transition hover:-translate-y-1 hover:border-gold">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{insightCategories[pageLocale][related.category]}</p>
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
