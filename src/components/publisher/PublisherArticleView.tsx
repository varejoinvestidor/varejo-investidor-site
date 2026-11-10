"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../SiteSections";
import { TipTapArticleBody } from "../../publisher/public/TipTapArticleBody";
import { estimateReadingTimeMinutes } from "../../publisher/public/tiptapPlainText";
import type { PublicArticleDetail, PublicArticleSummary } from "../../publisher/public/types";
import { getPublisherArticlePath, getPublisherHubPath } from "../../publisher/public/paths";
import { publisherArticleUrl } from "../../publisher/public/queries";
import { PublisherArticleBanners } from "./PublisherArticleBanners";

export function PublisherArticleView({
  article,
  related,
}: {
  article: PublicArticleDetail;
  related: PublicArticleSummary[];
}) {
  const { locale, t, changeLocale } = useSiteLocale();
  const reading = estimateReadingTimeMinutes(article.content);
  const language = article.language === "en" ? "en" : "pt";
  const url = publisherArticleUrl(article.slug, language);
  const hubPath = getPublisherHubPath(language);
  const articlePath = (slug: string) => getPublisherArticlePath(language, slug);
  const hubLabel = language === "en" ? "Articles" : "Artigos";

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <main className="insight-article min-h-screen bg-ink text-paper">
        <article>
          <section className="relative overflow-hidden border-b border-gold/[0.14] px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
            <div className="absolute inset-0 terminal-grid opacity-45" />
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="relative mx-auto max-w-5xl">
              <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/[0.45]">
                <Link href="/">Varejo Investidor</Link>
                <span className="mx-2 text-gold/60">/</span>
                <Link href={hubPath}>{hubLabel}</Link>
              </nav>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-gold">
                {article.category_name ?? "Editorial"} ·{" "}
                {new Date(article.published_at).toLocaleDateString(language === "en" ? "en-US" : "pt-BR")} · {reading} min
              </p>
              <h1 className="mt-5 font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">{article.title}</h1>
              {article.subtitle ? (
                <p className="mt-5 font-serif text-2xl leading-snug tracking-[-0.03em] text-gold md:text-3xl">{article.subtitle}</p>
              ) : null}
              <p className="mt-5 text-sm text-paper/[0.52]">{article.author_name}</p>
            </motion.div>
          </section>

          {article.cover_image ? (
            <section className="px-5 py-10 md:px-8">
              <figure className="mx-auto max-w-5xl overflow-hidden border border-gold/[0.18]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.cover_image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
              </figure>
            </section>
          ) : null}

          <PublisherArticleBanners banners={article.banners} placement="top" language={article.language} />

          <section className="px-5 pb-12 md:px-8 md:pb-16">
            <div className="mx-auto max-w-3xl">
              {article.excerpt ? <p className="text-xl leading-[1.85] text-paper/[0.82]">{article.excerpt}</p> : null}
              <PublisherArticleBanners banners={article.banners} placement="inline" language={article.language} />
              <div className="mt-10">
                <TipTapArticleBody document={article.content} />
              </div>

              {article.sources.length ? (
                <div className="mt-14 border-t border-gold/[0.14] pt-10">
                  <h2 className="font-serif text-3xl tracking-[-0.04em]">{language === "en" ? "Sources" : "Fontes"}</h2>
                  <ul className="mt-5 space-y-3">
                    {article.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {article.references_text ? (
                <div className="mt-10 border-t border-gold/[0.14] pt-8 text-sm leading-relaxed text-paper/60 whitespace-pre-wrap">
                  {article.references_text}
                </div>
              ) : null}

              <PublisherArticleBanners banners={article.banners} placement="bottom" language={article.language} />

              <div className="insight-share mt-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  {language === "en" ? "Share" : "Compartilhar"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    {
                      name: "LinkedIn",
                      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    },
                    {
                      name: "X",
                      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
                    },
                    {
                      name: "WhatsApp",
                      href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${url}`)}`,
                    },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gold/[0.22] bg-paper/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-paper/[0.72] transition hover:border-gold hover:text-gold"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {related.length ? (
            <section className="border-t border-gold/[0.14] px-5 py-14 md:px-8">
              <div className="mx-auto max-w-5xl">
                <h2 className="font-serif text-3xl tracking-tight">
                  {language === "en" ? "Related articles" : "Artigos relacionados"}
                </h2>
                <ul className="mt-8 grid gap-4 md:grid-cols-3">
                  {related.map((item) => (
                    <li key={item.id}>
                      <Link href={articlePath(item.slug)} className="block border border-gold/[0.14] p-5 hover:border-gold/40">
                        <p className="font-serif text-xl text-paper hover:text-gold">{item.title}</p>
                        <p className="mt-2 text-sm text-paper/55">{item.excerpt.slice(0, 120)}…</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}
        </article>

        <FreeChannelCTA t={t} variant="dark" />
        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
