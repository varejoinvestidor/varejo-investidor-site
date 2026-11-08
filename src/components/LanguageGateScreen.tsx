"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { detectLocale } from "./SiteSections";
import { LocaleFlagIcon } from "./LocaleFlagIcon";
import { LANGUAGE_CATALOG, persistLanguageChoice } from "../i18n/languageCatalog";
import { isRtlLocale, localeToHtmlLang, type SupportedLocale } from "../i18n/locales";
import { localizedPath } from "../i18n/routing";
import { getLanguageGateBadge } from "../data/languageCountCopy";

const tierHint: Record<string, string> = {
  primary: "",
  global: "Global",
  expanding: "Expanding",
};

export function LanguageGateScreen() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const suggested = useMemo(() => detectLocale(), []);
  const [hovered, setHovered] = useState<SupportedLocale | null>(null);

  function chooseLocale(locale: SupportedLocale) {
    persistLanguageChoice(locale);
    document.documentElement.lang = localeToHtmlLang(locale);
    document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";

    const returnTo = searchParams?.get("returnTo");
    const destination =
      returnTo && returnTo.startsWith("/") && !returnTo.startsWith("/idioma")
        ? returnTo
        : localizedPath("/", locale);

    window.location.assign(destination);
  }

  return (
    <main className="language-gate relative flex min-h-screen flex-col overflow-hidden bg-[#030303] text-[#f4f0e8]">
      <div className="language-gate-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="language-gate-glow pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
      <div className="language-gate-glow pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-rise/[0.06] blur-3xl" aria-hidden="true" />

      <header className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-gold/30 bg-ink text-xs font-bold text-gold">VI</span>
          <div>
            <p className="font-serif text-xl tracking-[-0.03em]">Varejo Investidor</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f4f0e8]/45">Global financial platform</p>
          </div>
        </div>
        <p className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-gold/80 md:block">
          {getLanguageGateBadge(suggested)}
        </p>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 gap-10 px-6 pb-16 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">Varejo Investidor 2.0</p>
          <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl">
            Choose your language
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-[#f4f0e8]/68">
            Select how you want to experience Varejo Investidor. Your choice defines navigation, content and regional
            formatting for every visit.
          </p>
          <p className="mt-6 text-sm text-[#f4f0e8]/52">
            Suggested for you:{" "}
            <span className="font-semibold text-gold">
              {LANGUAGE_CATALOG.find((item) => item.locale === suggested)?.nativeName ?? "English"}
            </span>
            <span className="text-[#f4f0e8]/40">. Not selected until you confirm below.</span>
          </p>
          <div className="mt-10 hidden gap-4 md:flex">
            <Image
              src="/characters/varejo-investidor-personagens.png"
              alt="Formiga, Lobo e Harpia, personagens oficiais Varejo Investidor"
              width={640}
              height={360}
              className="h-auto w-full max-w-md opacity-90"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <div className="language-gate-mobile-mascots mb-5 flex justify-center md:hidden">
            <div className="relative w-full max-w-[17.5rem] sm:max-w-[19.5rem]">
              <div
                className="pointer-events-none absolute inset-x-4 bottom-0 h-10 bg-gold/[0.08] blur-2xl"
                aria-hidden="true"
              />
              <Image
                src="/characters/varejo-investidor-personagens.png"
                alt="Formiga, Lobo e Harpia, personagens oficiais Varejo Investidor"
                width={640}
                height={360}
                sizes="(max-width: 640px) 280px, 312px"
                className="language-gate-mobile-mascots-image relative mx-auto h-auto w-full object-contain opacity-[0.94]"
                priority
              />
            </div>
          </div>
          <div
            className="language-gate-panel border border-gold/[0.22] bg-[#050505]/90 p-4 shadow-premium backdrop-blur-md md:p-6"
            role="list"
            aria-label="Language selection"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {LANGUAGE_CATALOG.map((item, index) => {
                const isSuggested = item.locale === suggested;
                const isRtl = isRtlLocale(item.locale);
                const tier = tierHint[item.tier];
                const isHover = hovered === item.locale;

                return (
                  <motion.button
                    key={item.locale}
                    type="button"
                    role="listitem"
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.02 }}
                    onClick={() => chooseLocale(item.locale)}
                    onMouseEnter={() => setHovered(item.locale)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(item.locale)}
                    onBlur={() => setHovered(null)}
                    className={`language-gate-option group flex w-full items-center gap-3 border px-4 py-3 text-left transition ${
                      isSuggested
                        ? "border-gold/55 bg-gold/[0.07]"
                        : "border-[#f4f0e8]/10 bg-[#f4f0e8]/[0.02] hover:border-gold/40 hover:bg-gold/[0.06]"
                    } ${isHover ? "border-gold/50" : ""}`}
                    dir={isRtl ? "rtl" : "ltr"}
                    lang={localeToHtmlLang(item.locale)}
                  >
                    <LocaleFlagIcon locale={item.locale} className="h-4 w-6 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="block truncate font-serif text-lg tracking-[-0.02em]">{item.nativeName}</span>
                        {isSuggested ? (
                          <span className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-gold">
                            Suggested
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 flex items-center gap-2 text-[11px] text-[#f4f0e8]/48">
                        <span>{item.englishName}</span>
                        {tier ? (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="uppercase tracking-[0.12em]">{tier}</span>
                          </>
                        ) : null}
                      </span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/70 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                      Enter
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] leading-6 text-[#f4f0e8]/42 md:text-left">
            Content in languages marked &quot;Expanding&quot; may still reference the English structure while localized
            copy is finalized.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
