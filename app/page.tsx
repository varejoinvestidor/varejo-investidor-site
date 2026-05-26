"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
      text: [
        "O Varejo Investidor é um ecossistema de educação, sinais e leitura de mercado global criado para quem deseja sair do básico e construir uma estrutura financeira em camadas.",
        "Desde 2018, entregamos mais de 4.200 sinais ao vivo, acompanhando Forex, ouro, petróleo, cripto, índices e moedas globais.",
        "A jornada é dividida em níveis: Formiga, Lobo e Harpia.",
        "O nível Formiga constrói a base. O nível Lobo desenvolve estratégia e leitura de mercado. O nível Harpia amplia a visão para patrimônio, proteção e estrutura global.",
      ],
      stats: ["Desde 2018", "+4.200 sinais", "Formiga / Lobo / Harpia"],
    },
    cards: [
      {
        title: "Educação por níveis",
        text: "Uma jornada clara para sair da base, aprender risco e desenvolver visão de mercado.",
        href: "/educacao",
      },
      {
        title: "Sinais ao vivo",
        text: "Operações estruturadas com ativo, direção, entrada, alvo, stop e contexto.",
        href: "/sinais",
      },
      {
        title: "Consultorias estratégicas",
        text: "Acompanhamento individual para risco, posicionamento, patrimônio e estrutura global.",
        href: "/servicos",
      },
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
      text: [
        "Varejo Investidor is an ecosystem of education, signals, and global market reading created for people who want to move beyond the basics and build a layered financial structure.",
        "Since 2018, we have delivered more than 4,200 live signals while following Forex, gold, oil, crypto, indices, and global currencies.",
        "The journey is divided into levels: Ant, Wolf, and Harpy.",
        "The Ant level builds the foundation. The Wolf level develops strategy and market reading. The Harpy level expands vision toward wealth, protection, and global structure.",
      ],
      stats: ["Since 2018", "+4,200 signals", "Ant / Wolf / Harpy"],
    },
    cards: [
      {
        title: "Level-based education",
        text: "A clear path to build foundation, understand risk, and develop market vision.",
        href: "/educacao",
      },
      {
        title: "Live signals",
        text: "Structured operations with asset, direction, entry, target, stop, and context.",
        href: "/sinais",
      },
      {
        title: "Strategic consulting",
        text: "Individual guidance for risk, positioning, wealth, and global structure.",
        href: "/servicos",
      },
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
      text: [
        "Varejo Investidor es un ecosistema de educación, señales y lectura de mercado global creado para quien desea salir de lo básico y construir una estructura financiera por capas.",
        "Desde 2018, entregamos más de 4.200 señales en vivo, acompañando Forex, oro, petróleo, cripto, índices y monedas globales.",
        "La jornada se divide en niveles: Hormiga, Lobo y Harpía.",
        "El nivel Hormiga construye la base. El nivel Lobo desarrolla estrategia y lectura de mercado. El nivel Harpía amplía la visión hacia patrimonio, protección y estructura global.",
      ],
      stats: ["Desde 2018", "+4.200 señales", "Hormiga / Lobo / Harpía"],
    },
    cards: [
      {
        title: "Educación por niveles",
        text: "Una ruta clara para construir base, entender riesgo y desarrollar visión de mercado.",
        href: "/educacao",
      },
      {
        title: "Señales en vivo",
        text: "Operaciones estructuradas con activo, dirección, entrada, objetivo, stop y contexto.",
        href: "/sinais",
      },
      {
        title: "Consultorías estratégicas",
        text: "Acompañamiento individual para riesgo, posicionamiento, patrimonio y estructura global.",
        href: "/servicos",
      },
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
      title: "वैश्विक स्तर पर वित्तीय खेल खेलने के लिए आपकी पूरी संरचना.",
      text: "शिक्षा, लाइव सिग्नल, बाजार-पठन और रणनीतिक संरचना, ताकि आप अपनी वित्तीय जिंदगी को परतों में बना सकें.",
      free: "नि:शुल्क शुरुआत करें",
      services: "सेवाएं देखें",
    },
    intro: {
      eyebrow: "परिचय",
      title: "Varejo Investidor क्या है",
      text: [
        "Varejo Investidor शिक्षा, सिग्नल और वैश्विक बाजार-पठन का इकोसिस्टम है, जो बुनियादी स्तर से आगे बढ़कर परतों में वित्तीय संरचना बनाना चाहने वालों के लिए बनाया गया है.",
        "2018 से हमने Forex, सोना, तेल, क्रिप्टो, इंडेक्स और वैश्विक मुद्राओं को ट्रैक करते हुए 4,200 से अधिक लाइव सिग्नल दिए हैं.",
        "यह यात्रा तीन स्तरों में विभाजित है: फॉर्मिगा, लोबो और हार्पिया.",
        "फॉर्मिगा स्तर आधार बनाता है. लोबो स्तर रणनीति और बाजार-पठन विकसित करता है. हार्पिया स्तर संपत्ति, सुरक्षा और वैश्विक संरचना की दृष्टि को विस्तृत करता है.",
      ],
      stats: ["2018 से", "+4,200 सिग्नल", "फॉर्मिगा / लोबो / हार्पिया"],
    },
    cards: [
      {
        title: "स्तर-आधारित शिक्षा",
        text: "आधार बनाने, जोखिम समझने और बाजार दृष्टि विकसित करने की स्पष्ट यात्रा.",
        href: "/educacao",
      },
      {
        title: "लाइव सिग्नल",
        text: "एसेट, दिशा, एंट्री, लक्ष्य, स्टॉप और संदर्भ के साथ संरचित अवसर.",
        href: "/sinais",
      },
      {
        title: "रणनीतिक परामर्श",
        text: "जोखिम, पोजिशनिंग, संपत्ति और वैश्विक संरचना के लिए व्यक्तिगत दिशा.",
        href: "/servicos",
      },
    ],
    cardCta: "और जानें",
    final: {
      title: "नि:शुल्क शुरुआत करें और अपना अगला स्तर चुनें.",
      free: "नि:शुल्क चैनल में प्रवेश करें",
      elite: "Elite Channel देखें",
    },
  },
} satisfies Record<
  Locale,
  {
    hero: { eyebrow: string; title: string; text: string; free: string; services: string };
    intro: { eyebrow: string; title: string; text: string[]; stats: string[] };
    cards: { title: string; text: string; href: string }[];
    cardCta: string;
    final: { title: string; free: string; elite: string };
  }
>;

export default function Home() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = homeLiteCopy[locale];

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="home" className="premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
            <div className="hero-mascot-stage relative mx-auto flex min-h-[20rem] items-center justify-center sm:min-h-[25rem] lg:min-h-[39rem] xl:min-h-[43rem]">
              <Image
                src="/characters/hero-main.png"
                alt="Personagens oficiais Formiga, Lobo e Harpia do Varejo Investidor"
                width={1066}
                height={822}
                priority
                sizes="(min-width: 1536px) 54vw, (min-width: 1280px) 50vw, (min-width: 1024px) 47vw, 94vw"
                className="hero-mascot-image relative z-10 h-auto w-full max-w-[46rem] object-contain object-center lg:max-w-[54rem] xl:max-w-[60rem]"
              />
            </div>
          </motion.div>

          <motion.div className="order-2 lg:order-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p
              variants={fadeUp}
              className="inline-flex border border-ink bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-paper"
            >
              {copy.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-5xl text-balance font-serif text-4xl leading-[0.96] tracking-[-0.05em] text-ink md:text-6xl xl:text-[5.7rem]"
            >
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-9 text-ink/[0.68] md:text-xl">
              {copy.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink bg-ink px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-paper shadow-premium transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
              >
                {copy.hero.free}
              </a>
              <a
                href="/servicos"
                className="border border-ink bg-paper px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.services}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white/90 px-5 py-14 md:px-8 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-start"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-ink/[0.45]">{copy.intro.eyebrow}</p>
            <h2 className="mt-4 text-balance font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
              {copy.intro.title}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {copy.intro.stats.map((stat) => (
                <div key={stat} className="border-l-2 border-ink bg-paper px-4 py-3 shadow-fine">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">{stat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 text-base leading-8 text-ink/[0.68] md:text-lg md:leading-9">
            {copy.intro.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="section-team-stage relative mx-auto flex w-full max-w-[34rem] justify-center lg:max-w-none"
          >
            <div className="section-team-depth absolute inset-0" />
            <Image
              src="/characters/section-team.png"
              alt="Personagens Formiga, Lobo e Harpia ao lado dos serviços do Varejo Investidor"
              width={894}
              height={1044}
              sizes="(min-width: 1024px) 43vw, 92vw"
              className="section-team-image relative z-10 h-auto w-full max-w-[38rem] object-contain object-center"
            />
          </motion.div>

          <div className="grid gap-4">
            {copy.cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                variants={fadeUp}
                className="group relative overflow-hidden border border-ink/[0.1] bg-white p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-7"
              >
                <div className="absolute inset-0 luxury-grid opacity-35" />
                <div className="relative grid gap-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
                  <span className="grid h-11 w-11 place-items-center border border-ink bg-ink font-mono text-xs text-paper">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl leading-[1.02] tracking-[-0.04em] md:text-4xl">{card.title}</h3>
                    <p className="mt-3 leading-7 text-ink/[0.64]">{card.text}</p>
                  </div>
                  <a
                    href={card.href}
                    className="block border border-ink bg-ink px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
                  >
                    {copy.cardCta}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden border border-ink bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-12 md:py-20"
        >
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Varejo Investidor</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-4xl leading-[1] tracking-[-0.05em] md:text-7xl">
              {copy.final.title}
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-paper hover:border-paper"
              >
                {copy.final.free}
              </a>
              <a
                href="/sinais"
                className="border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition hover:border-paper hover:bg-paper hover:text-ink"
              >
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
