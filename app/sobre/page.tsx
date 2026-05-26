"use client";

import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";

const sections = [
  {
    eyebrow: "A estrutura",
    title: "Uma estrutura financeira global para o investidor de varejo.",
    paragraphs: [
      "O Varejo Investidor nasceu para construir algo que praticamente não existe no varejo financeiro global: uma estrutura capaz de transformar investidores comuns em participantes ativos do mercado internacional.",
      "Não somos apenas um canal, uma sala de sinais, um curso ou uma comunidade.",
      "O Varejo Investidor é uma estrutura financeira global criada para ensinar leitura de mercado, operação, risco, patrimônio, posicionamento estratégico e construção financeira em camadas.",
      "Tudo isso usando uma visão real do funcionamento do mercado global.",
    ],
  },
  {
    eyebrow: "Desde 2018",
    title: "Acompanhando diariamente o mercado internacional.",
    paragraphs: [
      "Desde 2018, o projeto acompanha diariamente Forex, ouro, petróleo, índices globais, criptomoedas, ciclos econômicos e moedas internacionais.",
      "Ao longo dessa trajetória, mais de 4.200 sinais ao vivo foram enviados, milhares de análises foram produzidas, conteúdos foram distribuídos em múltiplos idiomas e uma estrutura própria começou a ser construída.",
      "A visão sempre foi global.",
    ],
  },
  {
    eyebrow: "A filosofia",
    title: "O mercado financeiro não é apenas operação.",
    paragraphs: [
      "Ele é posicionamento, leitura de cenário, proteção, estratégia e expansão de visão.",
      "A maior parte das pessoas entra no mercado buscando apenas dinheiro rápido. O Varejo Investidor foi criado para ensinar algo diferente: como construir estrutura.",
      "Porque sem estrutura, o capital desaparece, a emoção domina, o risco destrói e o crescimento não sustenta.",
    ],
  },
  {
    eyebrow: "Formiga • Lobo • Harpia",
    title: "Três níveis para enxergar o mercado e a vida financeira.",
    paragraphs: [
      "Formiga é a base: organização financeira, primeiros investimentos, disciplina, construção do primeiro capital e entendimento do sistema.",
      "Lobo é estratégia: leitura de mercado, operação, risco, posicionamento, expansão financeira e visão operacional.",
      "Harpia é visão global: patrimônio, proteção, sucessão, estrutura internacional, moedas fortes, preservação de capital e construção geracional.",
      "Esses níveis representam diferentes formas de enxergar o mercado e a própria vida financeira.",
    ],
  },
  {
    eyebrow: "O criador",
    title: "Uma visão diferente do mercado financeiro tradicional.",
    paragraphs: [
      "Vinicius criou o Varejo Investidor com uma visão diferente da maior parte do mercado financeiro tradicional.",
      "Enquanto grande parte do setor focava em promessas, marketing agressivo, ostentação e operações irreais, a proposta aqui sempre foi leitura real de mercado, desenvolvimento em longo prazo, estrutura financeira, construção patrimonial e visão internacional.",
      "O projeto começou de forma independente e evoluiu acompanhando diariamente os ciclos globais do mercado.",
      "Com o tempo, o Varejo Investidor expandiu sinais ao vivo, educação financeira, conteúdos multilíngues, estrutura institucional, desenvolvimento de plataforma própria e visão de terminal global para o varejo.",
    ],
  },
  {
    eyebrow: "Visão de futuro",
    title: "A visão é construir uma estrutura própria para o varejo global.",
    paragraphs: [
      "O objetivo nunca foi apenas operar.",
      "A visão é construir uma estrutura financeira própria, um ecossistema global, uma plataforma institucional para o varejo e uma nova forma do investidor comum acessar o mercado internacional.",
      "O varejo global ainda opera muito abaixo do potencial que possui. O Varejo Investidor existe para mudar isso.",
    ],
  },
  {
    eyebrow: "A direção",
    title: "Do básico ao avançado. Da primeira operação à estrutura geracional.",
    paragraphs: [
      "Da organização financeira ao patrimônio global. Da primeira operação até a construção de estrutura geracional.",
      "Essa é a jornada. E ela está apenas começando.",
    ],
  },
];

const highlights = [
  "Leitura de mercado",
  "Operação",
  "Risco",
  "Patrimônio",
  "Posicionamento estratégico",
  "Construção em camadas",
];

export default function SobrePage() {
  const { locale, t, changeLocale } = useSiteLocale();

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.36em] text-gold">
              Sobre o Varejo Investidor
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-5xl text-balance font-serif text-5xl leading-[1.02] tracking-[-0.05em] md:text-7xl"
            >
              Uma estrutura para o varejo participar do mercado global.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              Do básico ao avançado. Da organização financeira ao patrimônio global. Da primeira operação até a construção de estrutura geracional.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="terminal-module border border-gold/[0.22] bg-white p-6 shadow-premium"
          >
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Global retail structure</p>
            <div className="mt-6 grid gap-3">
              {highlights.map((item) => (
                <p key={item} className="border-l border-gold pl-4 text-sm uppercase tracking-[0.14em] text-ink/[0.68]">
                  {item}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5">
          {sections.map((section, index) => (
            <motion.article
              key={section.eyebrow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              variants={fadeUp}
              className="terminal-module relative overflow-hidden border border-ink/[0.1] bg-white p-6 md:p-9"
            >
              <div className="absolute inset-0 luxury-grid opacity-30" />
              <div className="relative grid gap-7 lg:grid-cols-[0.42fr_1fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{section.eyebrow}</p>
                  <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">
                    {section.title}
                  </h2>
                </div>
                <div className="grid gap-4 text-base leading-8 text-ink/[0.68] md:text-lg md:leading-9">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
