"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

export default function EducationPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const soonCopy =
    locale === "hi"
      ? {
          title: "जल्द आ रहा है",
          text: "चींटी, भेड़िया और गरुड़ की पूरी शैक्षिक यात्रा जल्द ही Varejo Investidor इकोसिस्टम में उपलब्ध होगी।",
        }
      : {
          title: "EM BREVE",
          text: "A trilha educacional completa Formiga, Lobo e Harpia será liberada em breve dentro do ecossistema Varejo Investidor.",
        };

  return (
    <main lang={locale === "hi" ?"hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.education.eyebrow} title={t.education.title} text={t.education.text} />
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="education-levels-visual relative mx-auto mb-12 flex max-w-[900px] justify-center md:mb-16"
        >
          <div className="education-levels-glow" />
          <div className="education-levels-floor" />
          <Image
            src="/characters/services-hero-team.png"
            alt="Personagens Formiga, Lobo e Harpia do Varejo Investidor"
            width={1080}
            height={1350}
            sizes="(min-width: 1024px) 980px, 94vw"
            className="education-levels-image education-levels-image-portrait relative z-10"
          />
        </motion.div>

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
          <div
            aria-disabled="true"
            className="cursor-not-allowed border border-gold/[0.45] bg-ink/[0.88] px-6 py-8 text-center shadow-premium md:px-10 md:py-10"
          >
            <div className="mx-auto grid h-11 w-11 place-items-center border border-gold/[0.55] font-mono text-lg font-bold text-gold">
              X
            </div>
            <h2 className="mt-5 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">{soonCopy.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
              {soonCopy.text}
            </p>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
