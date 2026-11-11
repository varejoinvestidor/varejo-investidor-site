"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "./SiteSections";
import { FormationPricingSection } from "./FormationPricingSection";
import { getEducationTrack } from "../data/educationTracks";
import { FORMATION_LEVEL_PRODUCTS, formatFormationBRL, type FormationTrackId } from "../data/formationPricing";
import {
  getEvolutionCompare,
  getLevelCharacterCopy,
  getLevelPageUi,
  getOtherLevelLinks,
  LEVEL_HERO_MEDIA,
  type LevelId,
} from "../data/institutionalLevelPages";
import { localizedPath } from "../i18n/routing";
import type { Locale } from "../i18n";
import { isRtlLocale } from "../i18n";
import { LevelJourneyExperience } from "./levels/LevelJourneyExperience";

function levelPagePath(levelId: LevelId, locale: Locale) {
  const canonical =
    levelId === "formiga" ? "/nivel-formiga" : levelId === "lobo" ? "/nivel-lobo" : "/nivel-harpia";
  return locale === "pt" ? canonical : localizedPath(canonical, locale);
}

function ProgressMarks({ value }: { value: number }) {
  return (
    <div className="education-progress-bars flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-5 border border-gold/[0.22] ${index < value ? "is-filled bg-gold" : "bg-ink/[0.55]"}`}
        />
      ))}
    </div>
  );
}

export function InstitutionalLevelPage({ level }: { level: LevelId }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const ui = getLevelPageUi(locale);
  const copy = getLevelCharacterCopy(level, locale);
  const media = LEVEL_HERO_MEDIA[level];
  const compare = getEvolutionCompare(locale);
  const track = getEducationTrack(locale, level);
  const educationHref = locale === "pt" ? "/educacao" : localizedPath("/educacao", locale);
  const secondaryHref = educationHref;

  const primaryHref =
    copy.primaryHref === "free"
      ? t.freeChannel.link
      : copy.primaryHref === "/sinais"
        ? locale === "pt"
          ? "/sinais"
          : localizedPath("/sinais", locale)
        : locale === "pt"
          ? "/servicos"
          : localizedPath("/servicos", locale);
  const primaryExternal = copy.primaryHref === "free";

  const trackProducts = FORMATION_LEVEL_PRODUCTS.filter((p) => p.track === level);

  return (
    <main
      lang={locale === "pt" ? "pt-BR" : locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-paper text-ink"
    >
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="level-institutional-hero premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="cinematic-noise" aria-hidden="true" />
        <div className="absolute left-1/2 top-24 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 font-serif text-4xl leading-[0.98] tracking-[-0.05em] md:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.68] md:text-xl">{copy.heroSubtitle}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryHref}
                target={primaryExternal ? "_blank" : undefined}
                rel={primaryExternal ? "noopener noreferrer" : undefined}
                className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
              >
                {copy.primaryCta}
              </a>
              <a
                href={secondaryHref}
                className="premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
              >
                {copy.secondaryCta}
              </a>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="relative min-h-[260px] overflow-hidden border border-gold/[0.22] bg-ink shadow-premium md:min-h-[380px]"
          >
            <Image
              src={media.hero}
              alt={media.heroAlt}
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="h-full max-h-[420px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      <LevelJourneyExperience level={level} locale={locale} />

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-module relative overflow-hidden border border-gold/[0.22] bg-white p-7 shadow-premium md:p-9"
          >
            <div className="absolute inset-0 luxury-grid opacity-20" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-serif text-3xl tracking-[-0.04em] md:text-4xl">{copy.conceptTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-ink/[0.72]">{copy.conceptIntro}</p>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-gold">{ui.competenciesTitle}</p>
              <ul className="mt-5 grid gap-2.5 text-sm leading-7 text-ink/[0.68] md:grid-cols-2">
                {copy.competencies.map((item) => (
                  <li key={item} className="flex gap-2 border-l-2 border-gold/[0.35] pl-3">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative min-h-[280px] overflow-hidden border border-rise/[0.18] bg-ink shadow-fine md:min-h-[360px]"
          >
            <Image
              src={media.philosophy}
              alt={media.philosophyAlt}
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="h-full min-h-[280px] w-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{ui.philosophyTitle}</p>
              {copy.philosophyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-7 text-paper/[0.78] md:text-base md:leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-l-4 border-gold pl-6 md:pl-10"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{ui.coreMessageLabel}</p>
            <p className="mt-5 max-w-4xl font-serif text-3xl leading-[1.12] tracking-[-0.04em] text-ink md:text-5xl">{copy.coreMessage}</p>
          </motion.blockquote>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 max-w-3xl text-lg leading-8 text-ink/[0.66]"
          >
            <span className="text-xs font-black uppercase tracking-[0.22em] text-gold">{ui.evolutionTitle}: </span>
            {copy.evolutionText}
          </motion.p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{ui.formationTitle}</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/[0.66]">{ui.formationText}</p>
            <p className="mt-3 font-serif text-2xl tracking-[-0.03em] text-ink">
              {track.name} · {track.subtitle}
            </p>
          </motion.div>
          <div className="mt-8 grid gap-4">
            {track.levels.map(([code, phase, objective, progress], index) => {
              const product = trackProducts.find((p) => p.level === index + 1);
              return (
                <motion.article
                  key={code}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="level-ladder-step grid gap-4 border border-gold/[0.18] bg-white p-5 shadow-fine md:grid-cols-[auto_1fr_auto] md:items-center md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center border border-gold/[0.45] font-mono text-sm font-bold text-gold">{code}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                        {ui.formationStepLabel} {index + 1}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl tracking-[-0.03em]">{phase}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-ink/[0.66] md:text-base">{objective}</p>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <ProgressMarks value={progress} />
                    {product ? (
                      <p className="font-serif text-2xl tracking-[-0.04em] text-gold">{formatFormationBRL(product.priceCents)}</p>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/[0.08] bg-ink px-5 py-14 text-paper md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{ui.compareTitle}</p>
            <p className="mt-4 text-lg leading-8 text-paper/[0.7]">{ui.compareSubtitle}</p>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-gold">{ui.compareProgression}</p>
          </motion.div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {compare.map((step, index) => {
              const isActive = step.id === level;
              const href = levelPagePath(step.id, locale);
              return (
                <motion.article
                  key={step.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`relative flex h-full flex-col border p-6 transition duration-300 md:p-7 ${
                    isActive
                      ? "border-gold bg-gold/[0.12] shadow-[0_0_40px_rgba(201,155,62,0.15)]"
                      : "border-gold/[0.22] bg-paper/[0.04] hover:border-gold/[0.45]"
                  }`}
                >
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.26em] text-gold">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 font-serif text-3xl tracking-[-0.04em]">{step.name}</h3>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold/[0.9]">{step.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-paper/[0.68]">{step.summary}</p>
                  {!isActive ? (
                    <Link href={href} className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-gold hover:underline">
                      {ui.otherLevels} →
                    </Link>
                  ) : (
                    <span className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-gold">●</span>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-gold">{ui.pricingEyebrow}</p>
          <FormationPricingSection locale={locale} trackFilter={level as FormationTrackId} showCompleteOffer={false} />
        </div>
      </section>

      <section className="px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {getOtherLevelLinks(locale, level).map((link) => (
            <Link
              key={link.id}
              href={levelPagePath(link.id, locale)}
              className="border border-ink/[0.14] bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:border-gold"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={educationHref}
            className="border border-gold/[0.4] bg-gold/[0.08] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:bg-gold/[0.14]"
          >
            {ui.viewEducation}
          </Link>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
