"use client";

import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  eliteLinkProps,
  fadeUp,
  useSiteLocale,
  useSiteTheme,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

export default function EducationPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const { theme, changeTheme } = useSiteTheme();
  const eliteCta = eliteLinkProps(locale, "/planos");

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} theme={theme} onThemeChange={changeTheme} />

      <section className="premium-stage px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.education.eyebrow} title={t.education.title} text={t.education.text} />
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          {t.education.levels.map((level, index) => (
            <motion.article
              key={level.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className="relative overflow-hidden border border-ink/[0.1] bg-paper p-6 shadow-fine md:p-7"
            >
              <div className="absolute inset-0 luxury-grid opacity-35" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{level.range}</p>
                <h2 className="mt-4 font-serif text-5xl tracking-[-0.05em]">{level.name}</h2>
                <p className="mt-5 leading-8 text-ink/[0.66]">{level.text}</p>
                <div className="mt-6 grid gap-3">
                  {level.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson} className="grid grid-cols-[46px_1fr] border border-ink/[0.08] bg-white">
                      <span className="grid place-items-center border-r border-ink/[0.08] bg-ink font-mono text-sm text-paper">
                        {lessonIndex + 1}
                      </span>
                      <p className="p-3 text-sm leading-7 text-ink/[0.72]">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <a
            {...eliteCta}
            className="inline-block border border-ink bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper shadow-fine transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
          >
            {t.education.cta}
          </a>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} />
    </main>
  );
}
