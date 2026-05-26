"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../src/components/SiteSections";
import type { Locale } from "../src/i18n";

const homeLiteCopy = {
  pt: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tudo o que você precisa para jogar o jogo financeiro em nível global.",
      text: "Educação, sinais ao vivo, leitura de mercado e estrutura estratégica para construir sua vida financeira em camadas.",
      free: "Começar pelo gratuito",
      services: "Ver serviços",
    },
    intro: {
      eyebrow: "O que é",
      title: "O que é o Varejo Investidor",
      manifesto:
        "O Varejo Investidor é uma estrutura financeira global para quem deseja sair do básico, entender o mercado internacional e construir sua vida financeira em camadas.",
      text: [
        "Desde 2018, entregamos mais de 4.200 sinais ao vivo, acompanhando Forex, ouro, petróleo, cripto, índices e moedas globais.",
        "A jornada é dividida em níveis: Formiga, Lobo e Harpia.",
        "O nível Formiga constrói a base. O nível Lobo desenvolve estratégia e leitura de mercado. O nível Harpia amplia a visão para patrimônio, proteção e estrutura global.",
      ],
      stats: ["Desde 2018", "sinais ao vivo", "Formiga / Lobo / Harpia"],
    },
    cards: [
      { code: "FORMIGA", title: "Base financeira", text: "Educação por níveis para sair da base, organizar risco e construir os primeiros pilares.", href: "/educacao" },
      { code: "LOBO", title: "Estratégia e expansão", text: "Sinais ao vivo, leitura de mercado e decisões estruturadas para operar com disciplina.", href: "/sinais" },
      { code: "HARPIA", title: "Patrimônio global", text: "Consultorias estratégicas para proteção, posicionamento, patrimônio e visão internacional.", href: "/servicos" },
    ],
    cardCta: "Saiba mais",
    final: {
      title: "Comece gratuitamente e escolha seu próximo nível.",
      free: "Entrar no canal gratuito",
      elite: "Conhecer Canal Elite",
    },
  },
  en: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Everything you need to play the financial game at a global level.",
      text: "Education, live signals, market reading, and strategic structure to build your financial life in layers.",
      free: "Start free",
      services: "View services",
    },
    intro: {
      eyebrow: "What it is",
      title: "What is Varejo Investidor",
      manifesto:
        "Varejo Investidor is a global financial structure for people who want to move beyond the basics, understand international markets, and build their financial life in layers.",
      text: [
        "Since 2018, we have delivered more than 4,200 live signals while following Forex, gold, oil, crypto, indices, and global currencies.",
        "The journey is divided into levels: Ant, Wolf, and Harpy.",
        "The Ant level builds the foundation. The Wolf level develops strategy and market reading. The Harpy level expands vision toward wealth, protection, and global structure.",
      ],
      stats: ["Since 2018", "live signals", "Ant / Wolf / Harpy"],
    },
    cards: [
      { code: "ANT", title: "Financial foundation", text: "Level-based education to build foundation, organize risk, and create the first pillars.", href: "/educacao" },
      { code: "WOLF", title: "Strategy and expansion", text: "Live signals, market reading, and structured decisions for disciplined execution.", href: "/sinais" },
      { code: "HARPY", title: "Global wealth", text: "Strategic consulting for protection, positioning, wealth, and international vision.", href: "/servicos" },
    ],
    cardCta: "Learn more",
    final: {
      title: "Start free and choose your next level.",
      free: "Join Free Channel",
      elite: "Explore Elite Channel",
    },
  },
  es: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Todo lo que necesitas para jugar el juego financiero a nivel global.",
      text: "Educación, señales en vivo, lectura de mercado y estructura estratégica para construir tu vida financiera por capas.",
      free: "Empezar gratis",
      services: "Ver servicios",
    },
    intro: {
      eyebrow: "Qué es",
      title: "Qué es Varejo Investidor",
      manifesto:
        "Varejo Investidor es una estructura financiera global para quien desea salir de lo básico, entender el mercado internacional y construir su vida financiera por capas.",
      text: [
        "Desde 2018, entregamos más de 4.200 señales en vivo, acompañando Forex, oro, petróleo, cripto, índices y monedas globales.",
        "La jornada se divide en niveles: Hormiga, Lobo y Harpía.",
        "El nivel Hormiga construye la base. El nivel Lobo desarrolla estrategia y lectura de mercado. El nivel Harpía amplía la visión hacia patrimonio, protección y estructura global.",
      ],
      stats: ["Desde 2018", "señales en vivo", "Hormiga / Lobo / Harpía"],
    },
    cards: [
      { code: "HORMIGA", title: "Base financiera", text: "Educación por niveles para construir base, organizar riesgo y crear los primeros pilares.", href: "/educacao" },
      { code: "LOBO", title: "Estrategia y expansión", text: "Señales en vivo, lectura de mercado y decisiones estructuradas para operar con disciplina.", href: "/sinais" },
      { code: "HARPÍA", title: "Patrimonio global", text: "Consultorías estratégicas para protección, posicionamiento, patrimonio y visión internacional.", href: "/servicos" },
    ],
    cardCta: "Saber más",
    final: {
      title: "Empieza gratis y elige tu próximo nivel.",
      free: "Entrar al canal gratuito",
      elite: "Conocer Canal Elite",
    },
  },
  hi: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "??????? ??????? ??? ?? ????? ?? ??? ????? ?? ???? ??????.",
      text: "??????, ???? ??????, ?????-??? ?? ??????? ??????, ???? ?? ???? ??????? ?????? ?? ????? ??? ??? ????.",
      free: "???????? ?????? ????",
      services: "?????? ?????",
    },
    intro: {
      eyebrow: "?????",
      title: "Varejo Investidor ???? ??",
      manifesto:
        "Varejo Investidor ?? ????? ?? ??? ?? ??????? ??????? ?????? ?? ?? ???????? ???? ?? ??? ????? ????????????? ????? ?? ????? ?? ???? ??????? ?????? ?? ????? ??? ????? ????? ???.",
      text: [
        "2018 ?? ???? Forex, ????, ???, ????????, ??????? ?? ??????? ???????? ?? ????? ???? ??? 4,200 ?? ???? ???? ?????? ???? ???.",
        "?? ?????? ??? ?????? ??? ??????? ??: ?????, ??????? ?? ?????.",
        "????? ???? ????? ??. ??????? ?????? ?? ?????-??? ?????? ???? ??. ????? ???????, ??????? ?? ??????? ?????? ?? ?????? ?? ??????? ???? ??.",
      ],
      stats: ["2018 ??", "???? ??????", "????? / ??????? / ?????"],
    },
    cards: [
      { code: "?????", title: "??????? ????", text: "???? ?????, ????? ????????? ???? ?? ??????? ??????? ????? ????? ???? ?? ??????? ??????.", href: "/educacao" },
      { code: "???????", title: "?????? ?? ???????", text: "???? ??????, ?????-??? ?? ???????? ?????? ?? ??? ?????? ??????.", href: "/sinais" },
      { code: "?????", title: "??????? ???????", text: "???????, ?????????, ??????? ?? ????????????? ?????? ?? ??? ??????? ???????.", href: "/servicos" },
    ],
    cardCta: "?? ?????",
    final: {
      title: "???????? ?????? ???? ?? ???? ???? ???? ?????.",
      free: "???????? ???? ??? ?????? ????",
      elite: "???? ???? ?????",
    },
  },
} satisfies Record<
  Locale,
  {
    hero: { eyebrow: string; title: string; text: string; free: string; services: string };
    intro: { eyebrow: string; title: string; manifesto: string; text: string[]; stats: string[] };
    cards: { code: string; title: string; text: string; href: string }[];
    cardCta: string;
    final: { title: string; free: string; elite: string };
  }
>;

function AnimatedCounter() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1400;

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * 4200));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="font-mono text-2xl text-gold md:text-3xl">
      {value.toLocaleString("pt-BR")}+
    </span>
  );
}

export default function Home() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = homeLiteCopy[locale];

  return (
    <main lang={locale === "hi" ?"hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="home" className="home-hero premium-stage relative px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48 lg:px-12 xl:px-16">
        <div className="cinematic-noise" />
        <div className="finance-particles" />
        <div className="absolute right-[7%] top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 top-44 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hero-mascot-wrap order-1 mx-auto w-full max-w-[38rem] lg:order-2 lg:max-w-none"
          >
            <div className="hero-mascot-stage relative mx-auto flex min-h-[21rem] items-center justify-center sm:min-h-[26rem] lg:min-h-[40rem] xl:min-h-[44rem]">
              <div className="hero-character-glow" />
              <div className="hero-smoke" />
              <div className="hero-mascot-floor" />
              <Image
                src="/characters/hero-main.png"
                alt="Personagens oficiais Formiga, Lobo e Harpia do Varejo Investidor"
                width={1080}
                height={1350}
                priority
                sizes="(min-width: 1536px) 54vw, (min-width: 1280px) 50vw, (min-width: 1024px) 47vw, 94vw"
                className="hero-mascot-image relative z-10 h-auto w-full max-w-[46rem] object-contain object-center lg:max-w-[54rem] xl:max-w-[60rem]"
              />
            </div>
          </motion.div>

          <motion.div className="order-2 lg:order-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p variants={fadeUp} className="inline-flex border border-gold/[0.28] bg-paper/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.34em] text-gold">
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1 variants={fadeUp} className="hero-headline mt-9 max-w-5xl text-balance font-serif text-[2.55rem] leading-[1.04] tracking-[-0.045em] text-ink md:text-[4.55rem] xl:text-[5.4rem]">
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              {copy.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink shadow-premium transition hover:-translate-y-0.5">
                {copy.hero.free}
              </a>
              <a href="/servicos" className="premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
                {copy.hero.services}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white/90 px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.58fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">{copy.intro.eyebrow}</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
              {copy.intro.title}
            </h2>
            <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {copy.intro.stats.map((stat, index) => (
                <div key={stat} className="strategic-stat border-l-2 border-gold/[0.68] bg-paper px-4 py-4 shadow-fine">
                  {index === 1 ?<AnimatedCounter /> : <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">{stat}</p>}
                  {index === 1 ?<p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-ink/[0.5]">{stat}</p> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 text-base leading-8 text-ink/[0.7] md:text-lg md:leading-9">
            <p className="manifesto-text font-serif text-2xl leading-9 tracking-[-0.03em] text-ink md:text-4xl md:leading-[1.18]">
              {copy.intro.manifesto}
            </p>
            {copy.intro.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="section-team-stage relative mx-auto flex w-full max-w-[34rem] justify-center lg:max-w-none">
            <div className="section-team-depth absolute inset-0" />
            <Image src="/characters/section-team.png" alt="Personagens Formiga, Lobo e Harpia ao lado dos serviços do Varejo Investidor" width={894} height={1044} sizes="(min-width: 1024px) 43vw, 92vw" className="section-team-image relative z-10 h-auto w-full max-w-[38rem] object-contain object-center" />
          </motion.div>

          <div className="grid gap-5">
            {copy.cards.map((card, index) => (
              <motion.article key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} variants={fadeUp} className="system-module group relative overflow-hidden border border-ink/[0.1] bg-white p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-7">
                <div className="absolute inset-0 luxury-grid opacity-45" />
                <div className="relative grid gap-5 sm:grid-cols-[72px_1fr_auto] sm:items-center">
                  <span className="grid h-14 w-14 place-items-center border border-gold/[0.5] bg-paper/[0.05] font-mono text-sm text-gold">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.36em] text-gold">{card.code}</p>
                    <h3 className="mt-2 font-serif text-3xl leading-[1.04] tracking-[-0.035em] md:text-4xl">{card.title}</h3>
                    <p className="mt-3 leading-7 text-ink/[0.64]">{card.text}</p>
                  </div>
                  <a href={card.href} className="premium-button-ghost block border border-ink/[0.18] bg-paper/[0.035] px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                    {copy.cardCta}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-14 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1280px]">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-[1280px] overflow-hidden border border-ink bg-ink px-6 py-16 text-center text-paper shadow-premium md:px-12 md:py-24">
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">Varejo Investidor</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-7xl">
              {copy.final.title}
            </h2>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition">
                {copy.final.free}
              </a>
              <a href="/sinais" className="premium-button-ghost border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition">
                {copy.final.elite}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
