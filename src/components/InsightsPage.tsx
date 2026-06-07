"use client";

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
import {
  getInsightMarketLinks,
  getInsightsPath,
  getPostsByLocale,
  insightCategories,
  insightLabels,
  insightsFaq,
  insightsHero,
  type InsightCategoryKey,
} from "../data/insightsContent";

type CategoryFilter = "all" | InsightCategoryKey;

function SchemaScripts({ locale }: { locale: Locale }) {
  const hero = insightsHero[locale] ?? insightsHero.en;
  const labels = insightLabels[locale] ?? insightLabels.en;
  const posts = getPostsByLocale(locale);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: hero.title,
    description: hero.metaDescription,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    url: `https://varejo-investidor-site.vercel.app${getInsightsPath(locale)}`,
    publisher: { "@type": "Organization", name: "Varejo Investidor" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://varejo-investidor-site.vercel.app${getInsightsPath(locale, post.slug)}`,
      datePublished: post.date,
      author: { "@type": "Organization", name: post.author },
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <span className="sr-only">{labels.content}</span>
    </>
  );
}

export function InsightsPage({ pageLocale }: { pageLocale: Locale }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const labels = insightLabels[pageLocale] ?? insightLabels.en;
  const hero = insightsHero[pageLocale] ?? insightsHero.en;
  const posts = getPostsByLocale(pageLocale);
  const latest = posts[0];
  const categoryLabels = insightCategories[pageLocale] ?? insightCategories.en;
  const categories = Object.entries(categoryLabels) as Array<[InsightCategoryKey, string]>;
  const marketLinks = getInsightMarketLinks(pageLocale);
  const filteredPosts = useMemo(
    () => (activeCategory === "all" ? posts : posts.filter((post) => post.category === activeCategory)),
    [activeCategory, posts],
  );

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts locale={pageLocale} />
      <main lang={pageLocale === "pt" ? "pt-BR" : pageLocale} dir={pageLocale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-ink text-paper">
        <section className="page-hero relative overflow-hidden px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
          <div className="absolute inset-0 terminal-grid opacity-55" />
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }} className="relative mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">{labels.content}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/[0.68] md:text-xl">{hero.subtitle}</p>
          </motion.div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <motion.article variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="terminal-module relative overflow-hidden border border-gold/[0.24] bg-white p-7 shadow-premium md:p-10">
              <div className="absolute inset-0 luxury-grid opacity-35" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.latest}</p>
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-paper/[0.48]">
                  {categoryLabels[latest.category]} | {latest.date} | {latest.readingTime}
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl">{latest.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68]">{latest.description}</p>
                <a
                  href={getInsightsPath(pageLocale, latest.slug)}
                  className="premium-button-gold mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                >
                  {labels.read}
                </a>
              </div>
            </motion.article>

            <motion.form
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={(event) => {
                event.preventDefault();
                setNewsletterSent(true);
              }}
              className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-7 md:p-9"
            >
              <div className="absolute inset-0 signal-grid opacity-25" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Newsletter</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{labels.newsletterTitle}</h2>
                <p className="mt-4 leading-8 text-paper/[0.66]">{labels.newsletterText}</p>
                <label className="mt-7 block text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.48]">{labels.email}</label>
                <input
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  type="email"
                  placeholder="global@investor.com"
                  className="mt-3 w-full border border-gold/[0.22] bg-ink px-4 py-4 text-paper outline-none transition placeholder:text-paper/[0.28] focus:border-gold"
                />
                <button className="mt-4 min-h-12 w-full border border-gold bg-gold px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {labels.newsletterButton}
                </button>
                {newsletterSent ? <p className="mt-4 text-sm font-semibold text-rise">{labels.newsletterSuccess}</p> : null}
              </div>
            </motion.form>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.categories}</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] md:text-5xl">{labels.recent}</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[["all", labels.all], ...categories].map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCategory(key as CategoryFilter)}
                    className={`shrink-0 border px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] transition ${
                      activeCategory === key
                        ? "border-gold bg-gold text-ink"
                        : "border-gold/[0.2] bg-white text-paper/[0.68] hover:border-gold hover:text-gold"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <motion.a
                  key={post.slug}
                  href={getInsightsPath(pageLocale, post.slug)}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-6 transition hover:-translate-y-1 hover:border-gold/[0.55]"
                >
                  <div className="absolute inset-0 terminal-grid opacity-35" />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{categoryLabels[post.category]}</p>
                    <h3 className="mt-5 font-serif text-3xl leading-[1.05] tracking-[-0.04em]">{post.title}</h3>
                    <p className="mt-4 min-h-[96px] text-sm leading-7 text-paper/[0.64]">{post.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-gold/[0.12] pt-4 text-[10px] uppercase tracking-[0.14em] text-paper/[0.45]">
                      <span>{post.readingTime}</span>
                      <span className="text-gold">{labels.read}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <BrokerAccessBlock locale={pageLocale} />

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <FreeChannelCTA t={t} variant="dark" />
            <div className="border border-gold/[0.18] bg-white p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{labels.markets}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {marketLinks.map((link) => (
                  <a key={link.href} href={link.href} className="border border-gold/[0.14] bg-ink px-4 py-4 text-sm font-bold text-paper/[0.78] transition hover:border-gold hover:text-gold">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.faq}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(insightsFaq[pageLocale] ?? insightsFaq.en).map((faq) => (
                <div key={faq.question} className="border border-gold/[0.16] bg-white p-6">
                  <h3 className="font-serif text-2xl tracking-[-0.03em]">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-paper/[0.64]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
