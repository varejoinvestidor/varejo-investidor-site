"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  BrokerBanners,
  SupportFooter,
  ThemeSwitcher,
  WhatsAppSignalExample,
  eliteLinkProps,
  useSiteTheme,
} from "../src/components/SiteSections";
import { translations, type Locale } from "../src/i18n";

const ticker = [
  ["XAU/USD", "+0.74%", "up"],
  ["EUR/USD", "-0.18%", "down"],
  ["BTC/USD", "+1.42%", "up"],
  ["USOIL", "-0.52%", "down"],
  ["NASDAQ", "+0.91%", "up"],
  ["DXY", "-0.21%", "down"],
  ["GBP/JPY", "+0.36%", "up"],
  ["S&P 500", "+0.82%", "up"],
];

const strategicPtProducts = [
  {
    title: "Mentoria Individual - 4 horas",
    description:
      "Sessão individual com foco operacional, leitura de mercado, risco e posicionamento para direcionar sua próxima etapa no mercado global.",
    workload: "4 horas",
    label: "Atendimento individual",
    cta: "Solicitar mentoria",
    href: "https://lastlink.com/p/CD2963C67/checkout-payment",
    kind: "mentorship",
  },
  {
    title: "Mentoria Individual - 10 horas",
    description:
      "Acompanhamento individual mais profundo para construir método, organizar risco, interpretar cenários e melhorar o posicionamento operacional.",
    workload: "10 horas",
    label: "Vagas limitadas",
    cta: "Solicitar mentoria",
    href: "https://lastlink.com/p/C06E583A1/checkout-payment",
    kind: "mentorship",
  },
  {
    title: "Consultoria Gold - 6 meses",
    description:
      "Consultoria para estrutura patrimonial, visão global, estratégia, risco e expansão com acompanhamento premium por seis meses.",
    workload: "30 horas",
    label: "Estrutura estratégica",
    cta: "Solicitar consultoria Gold",
    href: "https://lastlink.com/p/C5FB7AC16/checkout-payment",
    kind: "gold",
  },
  {
    title: "Consultoria Platinum anual",
    description:
      "Acompanhamento de elite para patrimônio, sucessão, proteção de capital, visão global e expansão estratégica ao longo do ano.",
    workload: "58 horas",
    label: "Vagas limitadas",
    cta: "Solicitar consultoria Platinum",
    href: "https://lastlink.com/p/C8CE5F9DB/checkout-payment",
    kind: "platinum",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const homeCopy = {
  pt: {
    hero: {
      title: "O ecossistema global para evoluir do nível Formiga ao nível Harpia.",
      text: "Sinais ao vivo, educação por níveis, leitura de mercado global e estrutura estratégica para evolução financeira e patrimonial.",
      primary: "Começar no Canal Gratuito",
      secondary: "Conhecer o Ecossistema",
      pillars: ["Educação Global", "Sinais ao Vivo", "Estrutura Estratégica"],
      levels: [
        { name: "Formiga", text: "Base, organização e primeiros passos.", bullets: ["Organização", "Base financeira", "Primeiros sinais"] },
        { name: "Lobo", text: "Operação, leitura de mercado e posicionamento.", bullets: ["Operação", "Estratégia", "Ciclos de mercado"] },
        { name: "Harpia", text: "Visão global, patrimônio e estrutura.", bullets: ["Patrimônio", "Estrutura", "Visão global"] },
      ],
    },
    ecosystem: {
      eyebrow: "Ecossistema",
      title: "Como funciona o ecossistema Varejo Investidor",
      text: "O Varejo Investidor não é apenas um canal de sinais. É um ecossistema de evolução financeira dividido por níveis de consciência, operação e patrimônio.",
      steps: ["Canal gratuito Formiga", "Educação por níveis", "Sinais estruturados", "Leitura global", "Consultoria estratégica"],
    },
    signals: {
      intro: "Mais de 4.200 sinais enviados ao vivo desde 2018.",
      includesTitle: "Você recebe",
      includes: ["ativo", "direção", "entrada", "alvo", "stop", "contexto", "leitura de mercado"],
    },
    educationCtas: ["Começar nível Formiga", "Entrar no nível Lobo", "Acessar nível Harpia"],
    finalCta: {
      eyebrow: "Comece pelo gratuito",
      title: "Comece gratuitamente e evolua dentro do ecossistema Varejo Investidor.",
      text: "Entre pelo Canal Gratuito Formiga e avance para o Canal Elite quando quiser sinais completos, educação e leitura global.",
      primary: "Entrar no Canal Gratuito",
      secondary: "Conhecer Canal Elite",
    },
    faq: {
      eyebrow: "Dúvidas frequentes",
      title: "Entenda antes de entrar",
      items: [
        ["O que é o Canal Elite?", "É o produto principal do Varejo Investidor, com sinais, análises, aulas gravadas e leitura global de mercado."],
        ["Como funcionam os sinais?", "Cada sinal chega com ativo, direção, entrada, alvo, stop e contexto para você executar na sua própria conta."],
        ["Preciso saber operar?", "Não precisa começar avançado. A educação por níveis ajuda o aluno a construir base, disciplina e leitura de risco."],
        ["Qual diferença entre Formiga, Lobo e Harpia?", "Formiga é base e organização, Lobo é operação e estratégia, Harpia é visão patrimonial e estrutura global."],
        ["O Canal gratuito é realmente gratuito?", "Sim. O canal gratuito entrega conteúdos, análises e sinais gratuitos diretamente no WhatsApp."],
        ["Como funciona a educação?", "A trilha é dividida em níveis para evoluir da organização financeira à leitura de mercado e estrutura patrimonial."],
        ["As mentorias são individuais?", "Sim. As mentorias são sessões individuais para perfil, método, risco e direcionamento estratégico."],
        ["O suporte é pelo WhatsApp?", "Sim. O suporte principal acontece pelo WhatsApp oficial do Varejo Investidor."],
      ],
    },
  },
  en: {
    hero: {
      title: "The global ecosystem to evolve from Ant level to Harpy level.",
      text: "Live signals, level-based education, global market reading, and strategic structure for financial and wealth evolution.",
      primary: "Start in the Free Channel",
      secondary: "Explore the Ecosystem",
      pillars: ["Global Education", "Live Signals", "Strategic Structure"],
      levels: [
        { name: "Ant", text: "Foundation, organization, and first steps.", bullets: ["Organization", "Financial base", "First signals"] },
        { name: "Wolf", text: "Trading, market reading, and positioning.", bullets: ["Trading", "Strategy", "Market cycles"] },
        { name: "Harpy", text: "Global vision, wealth, and structure.", bullets: ["Wealth", "Structure", "Global vision"] },
      ],
    },
    ecosystem: {
      eyebrow: "Ecosystem",
      title: "How the Varejo Investidor ecosystem works",
      text: "Varejo Investidor is not only a signal channel. It is a financial evolution ecosystem divided by levels of awareness, trading, and wealth.",
      steps: ["Ant Free Channel", "Level-based education", "Structured signals", "Global reading", "Strategic consulting"],
    },
    signals: {
      intro: "More than 4,200 live signals sent since 2018.",
      includesTitle: "You receive",
      includes: ["asset", "direction", "entry", "target", "stop", "context", "market reading"],
    },
    educationCtas: ["Start Ant level", "Enter Wolf level", "Access Harpy level"],
    finalCta: {
      eyebrow: "Start free",
      title: "Start for free and evolve inside the Varejo Investidor ecosystem.",
      text: "Enter through the Ant Free Channel and move to Elite Channel when you want full signals, education, and global reading.",
      primary: "Join Free Channel",
      secondary: "Explore Elite Channel",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Understand before you join",
      items: [
        ["What is Elite Channel?", "It is Varejo Investidor's main product, with signals, analysis, recorded classes, and global market reading."],
        ["How do the signals work?", "Each signal includes asset, direction, entry, target, stop, and context for execution in your own account."],
        ["Do I need to know how to trade?", "You do not need to start advanced. The level-based education helps build foundation, discipline, and risk reading."],
        ["What is the difference between Ant, Wolf, and Harpy?", "Ant is foundation and organization, Wolf is trading and strategy, Harpy is wealth vision and global structure."],
        ["Is the free channel really free?", "Yes. The free channel delivers content, analysis, and free signals directly on WhatsApp."],
        ["How does the education work?", "The path is divided into levels to evolve from financial organization to market reading and wealth structure."],
        ["Are mentorships individual?", "Yes. Mentorships are individual sessions for profile, method, risk, and strategic direction."],
        ["Is support through WhatsApp?", "Yes. Main support happens through Varejo Investidor's official WhatsApp."],
      ],
    },
  },
  es: {
    hero: {
      title: "El ecosistema global para evolucionar del nivel Hormiga al nivel Harpía.",
      text: "Señales en vivo, educación por niveles, lectura de mercado global y estructura estratégica para evolución financiera y patrimonial.",
      primary: "Empezar en el Canal Gratuito",
      secondary: "Conocer el Ecosistema",
      pillars: ["Educación Global", "Señales en Vivo", "Estructura Estratégica"],
      levels: [
        { name: "Hormiga", text: "Base, organización y primeros pasos.", bullets: ["Organización", "Base financiera", "Primeras señales"] },
        { name: "Lobo", text: "Operación, lectura de mercado y posicionamiento.", bullets: ["Operación", "Estrategia", "Ciclos de mercado"] },
        { name: "Harpía", text: "Visión global, patrimonio y estructura.", bullets: ["Patrimonio", "Estructura", "Visión global"] },
      ],
    },
    ecosystem: {
      eyebrow: "Ecosistema",
      title: "Cómo funciona el ecosistema Varejo Investidor",
      text: "Varejo Investidor no es solo un canal de señales. Es un ecosistema de evolución financiera dividido por niveles de conciencia, operación y patrimonio.",
      steps: ["Canal gratuito Hormiga", "Educación por niveles", "Señales estructuradas", "Lectura global", "Consultoría estratégica"],
    },
    signals: {
      intro: "Más de 4.200 señales enviadas en vivo desde 2018.",
      includesTitle: "Recibes",
      includes: ["activo", "dirección", "entrada", "objetivo", "stop", "contexto", "lectura de mercado"],
    },
    educationCtas: ["Empezar nivel Hormiga", "Entrar al nivel Lobo", "Acceder al nivel Harpía"],
    finalCta: {
      eyebrow: "Empieza gratis",
      title: "Empieza gratuitamente y evoluciona dentro del ecosistema Varejo Investidor.",
      text: "Entra por el Canal Gratuito Hormiga y avanza al Canal Elite cuando quieras señales completas, educación y lectura global.",
      primary: "Entrar al Canal Gratuito",
      secondary: "Conocer Canal Elite",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Entiende antes de entrar",
      items: [
        ["¿Qué es el Canal Elite?", "Es el producto principal de Varejo Investidor, con señales, análisis, clases grabadas y lectura global de mercado."],
        ["¿Cómo funcionan las señales?", "Cada señal llega con activo, dirección, entrada, objetivo, stop y contexto para ejecutar en tu propia cuenta."],
        ["¿Necesito saber operar?", "No necesitas empezar avanzado. La educación por niveles ayuda a construir base, disciplina y lectura de riesgo."],
        ["¿Cuál es la diferencia entre Hormiga, Lobo y Harpía?", "Hormiga es base y organización, Lobo es operación y estrategia, Harpía es visión patrimonial y estructura global."],
        ["¿El canal gratuito es realmente gratuito?", "Sí. El canal gratuito entrega contenidos, análisis y señales gratuitas directamente en WhatsApp."],
        ["¿Cómo funciona la educación?", "La ruta está dividida en niveles para evolucionar de la organización financiera a la lectura de mercado y estructura patrimonial."],
        ["¿Las mentorías son individuales?", "Sí. Las mentorías son sesiones individuales para perfil, método, riesgo y dirección estratégica."],
        ["¿El soporte es por WhatsApp?", "Sí. El soporte principal ocurre por el WhatsApp oficial de Varejo Investidor."],
      ],
    },
  },
  hi: null as never,
} satisfies Record<Locale, {
  hero: {
    title: string;
    text: string;
    primary: string;
    secondary: string;
    pillars: string[];
    levels: { name: string; text: string; bullets: string[] }[];
  };
  ecosystem: { eyebrow: string; title: string; text: string; steps: string[] };
  signals: { intro: string; includesTitle: string; includes: string[] };
  educationCtas: string[];
  finalCta: { eyebrow: string; title: string; text: string; primary: string; secondary: string };
  faq: { eyebrow: string; title: string; items: [string, string][] };
}>;

const hindiHomeCopy = {
  hero: {
    title: "फॉर्मिगा स्तर से हार्पिया स्तर तक बढ़ने के लिए वैश्विक इकोसिस्टम.",
    text: "लाइव सिग्नल, स्तर-आधारित शिक्षा, वैश्विक बाजार-पठन और वित्तीय तथा संपत्ति विकास के लिए रणनीतिक संरचना.",
    primary: "नि:शुल्क चैनल से शुरुआत करें",
    secondary: "इकोसिस्टम देखें",
    pillars: ["वैश्विक शिक्षा", "लाइव सिग्नल", "रणनीतिक संरचना"],
    levels: [
      { name: "फॉर्मिगा", text: "आधार, संगठन और शुरुआती कदम.", bullets: ["संगठन", "वित्तीय आधार", "पहले सिग्नल"] },
      { name: "लोबो", text: "संचालन, बाजार-पठन और पोजिशनिंग.", bullets: ["संचालन", "रणनीति", "बाजार चक्र"] },
      { name: "हार्पिया", text: "वैश्विक दृष्टि, संपत्ति और संरचना.", bullets: ["संपत्ति", "संरचना", "वैश्विक दृष्टि"] },
    ],
  },
  ecosystem: {
    eyebrow: "इकोसिस्टम",
    title: "Varejo Investidor इकोसिस्टम कैसे काम करता है",
    text: "Varejo Investidor केवल सिग्नल चैनल नहीं है. यह जागरूकता, संचालन और संपत्ति विकास के स्तरों में बंटा हुआ वित्तीय इकोसिस्टम है.",
    steps: ["नि:शुल्क फॉर्मिगा चैनल", "स्तर-आधारित शिक्षा", "संरचित सिग्नल", "वैश्विक बाजार-पठन", "रणनीतिक परामर्श"],
  },
  signals: {
    intro: "2018 से अब तक 4,200 से अधिक लाइव सिग्नल भेजे गए.",
    includesTitle: "आपको मिलता है",
    includes: ["एसेट", "दिशा", "एंट्री", "लक्ष्य", "स्टॉप", "संदर्भ", "बाजार-पठन"],
  },
  educationCtas: ["फॉर्मिगा स्तर शुरू करें", "लोबो स्तर में प्रवेश करें", "हार्पिया स्तर खोलें"],
  finalCta: {
    eyebrow: "नि:शुल्क शुरुआत",
    title: "नि:शुल्क शुरुआत करें और Varejo Investidor इकोसिस्टम में आगे बढ़ें.",
    text: "नि:शुल्क फॉर्मिगा चैनल से प्रवेश करें और जब पूर्ण सिग्नल, शिक्षा और वैश्विक बाजार-पठन चाहिए हो, तब एलीट चैनल देखें.",
    primary: "नि:शुल्क चैनल में प्रवेश करें",
    secondary: "एलीट चैनल देखें",
  },
  faq: {
    eyebrow: "सामान्य प्रश्न",
    title: "प्रवेश करने से पहले समझें",
    items: [
      ["एलीट चैनल क्या है?", "यह Varejo Investidor का मुख्य उत्पाद है, जिसमें सिग्नल, विश्लेषण, रिकॉर्डेड कक्षाएं और वैश्विक बाजार-पठन शामिल हैं."],
      ["सिग्नल कैसे काम करते हैं?", "हर सिग्नल में एसेट, दिशा, एंट्री, लक्ष्य, स्टॉप और संदर्भ होता है, ताकि आप अपनी खाते में निर्णय ले सकें."],
      ["क्या मुझे पहले से ट्रेडिंग आनी चाहिए?", "उन्नत स्तर से शुरुआत करना जरूरी नहीं है. स्तर-आधारित शिक्षा आधार, अनुशासन और जोखिम-पठन बनाने में मदद करती है."],
      ["फॉर्मिगा, लोबो और हार्पिया में अंतर क्या है?", "फॉर्मिगा आधार और संगठन है, लोबो संचालन और रणनीति है, हार्पिया संपत्ति दृष्टि और वैश्विक संरचना है."],
      ["क्या नि:शुल्क चैनल सच में नि:शुल्क है?", "हां. नि:शुल्क चैनल WhatsApp पर सामग्री, विश्लेषण और नि:शुल्क सिग्नल देता है."],
      ["शिक्षा कैसे काम करती है?", "यात्रा स्तरों में विभाजित है, ताकि वित्तीय संगठन से बाजार-पठन और संपत्ति संरचना तक विकास हो सके."],
      ["क्या सहायता WhatsApp पर मिलती है?", "हां. मुख्य सहायता Varejo Investidor के आधिकारिक WhatsApp पर होती है."],
    ],
  },
} satisfies (typeof homeCopy)["en"];

function detectLocale(): Locale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const detected = languages.join(" ").toLowerCase();

  if (detected.includes("pt")) return "pt";
  if (detected.includes("es")) return "es";
  if (detected.includes("hi")) return "hi";
  if (detected.includes("en")) return "en";

  return "en";
}

function Sparkline({ tone = "up" }: { tone?: string }) {
  const color = tone === "up" ? "#0f8f56" : "#c72f2f";

  return (
    <svg viewBox="0 0 220 70" className="h-16 w-full overflow-visible" aria-hidden="true">
      <path
        d="M3 58 C 24 46, 38 50, 54 35 S 82 18, 101 31 131 56, 154 23 181 29 217 8"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3 58 C 24 46, 38 50, 54 35 S 82 18, 101 31 131 56, 154 23 181 29 217 8"
        fill="none"
        stroke={color}
        strokeOpacity="0.15"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      className="max-w-4xl"
    >
      <p className="text-xs font-bold uppercase tracking-[0.32em] text-ink/[0.45]">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-serif text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-ink/[0.66] md:text-lg">{text}</p>
    </motion.div>
  );
}

function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="flex shrink-0 items-center border border-ink/[0.12] bg-white p-1 shadow-fine">
      {(["pt", "en", "es", "hi"] as Locale[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
            locale === item ? "bg-ink text-paper" : "text-ink hover:bg-ink/[0.06]"
          }`}
          aria-pressed={locale === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SignalTicket({ t }: { t: (typeof translations)[Locale] }) {
  const rows = [
    [t.signalBlock.example.asset, t.signalBlock.example.values.asset],
    [t.signalBlock.example.direction, t.signalBlock.example.values.direction],
    [t.signalBlock.example.entry, t.signalBlock.example.values.entry],
    [t.signalBlock.example.target, t.signalBlock.example.values.target],
    [t.signalBlock.example.stop, t.signalBlock.example.values.stop],
    [t.signalBlock.example.status, t.signalBlock.example.values.status],
  ];

  return (
    <div className="terminal-shell border border-ink bg-ink p-4 text-paper shadow-premium">
      <div className="flex items-center justify-between border-b border-paper/[0.12] pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">Live Signal</p>
          <h3 className="mt-1 font-serif text-3xl tracking-[-0.04em]">{t.signalBlock.example.title}</h3>
        </div>
        <span className="h-3 w-3 rounded-full bg-rise shadow-[0_0_24px_rgba(15,143,86,0.8)]" />
      </div>

      <div className="mt-5 grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[110px_1fr] border border-paper/[0.09] bg-paper/[0.035]">
            <p className="border-r border-paper/[0.09] px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-paper/[0.42]">
              {label}
            </p>
            <p
              className={`px-3 py-3 font-mono text-sm font-bold ${
                value === t.signalBlock.example.values.direction || value === t.signalBlock.example.values.status
                  ? "text-rise"
                  : "text-paper"
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 border border-rise/[0.35] bg-rise/[0.1] p-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-rise">
        Copy ready
      </div>
    </div>
  );
}

function WhatsAppIcon({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${
        dark ? "border-paper/[0.16] bg-paper text-ink" : "border-ink/[0.12] bg-ink text-paper"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M7.3 20.1 4 21l.9-3.2A8.4 8.4 0 1 1 7.3 20.1Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.7 8.4c.2-.5.4-.6.8-.6h.6c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3 0 .5.5 1 1.4 1.8 2.5 2.3.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6 0 .6-.4 1.4-.9 1.7-.6.4-1.8.4-3.4-.4-2.6-1.2-4.4-3.2-5.2-5.1-.4-.9-.2-1.6.2-2Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function FreeChannelCTA({
  t,
  variant = "light",
  compact = false,
}: {
  t: (typeof translations)[Locale];
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const dark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden border shadow-fine ${
        dark ? "border-paper/[0.14] bg-paper/[0.045] text-paper" : "border-ink/[0.1] bg-white text-ink"
      } ${compact ? "p-4" : "p-5 md:p-6"}`}
    >
      <div className={dark ? "absolute inset-0 terminal-grid opacity-35" : "absolute inset-0 luxury-grid opacity-45"} />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <WhatsAppIcon dark={dark} />
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.26em] ${dark ? "text-gold" : "text-rise"}`}>
              {t.freeChannel.eyebrow}
            </p>
            <h3 className="mt-2 font-serif text-3xl tracking-[-0.04em]">{t.freeChannel.title}</h3>
            <p className={`mt-2 max-w-2xl leading-7 ${dark ? "text-paper/[0.68]" : "text-ink/[0.64]"}`}>
              {t.freeChannel.text}
            </p>
          </div>
        </div>
        <a
          href={t.freeChannel.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`shrink-0 border px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
            dark
              ? "border-gold bg-gold text-ink hover:border-paper hover:bg-paper"
              : "border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
          }`}
        >
          {t.freeChannel.button}
        </a>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];
  const h = locale === "hi" ? hindiHomeCopy : homeCopy[locale];
  const eliteCta = eliteLinkProps(locale, "#planos");
  const eliteContactCta = eliteLinkProps(locale, "#contato");
  const { theme, changeTheme } = useSiteTheme();
  const ecosystemSteps = locale === "pt" ? h.ecosystem.steps : h.ecosystem.steps.slice(0, 4);
  const faqItems = locale === "pt" ? h.faq.items : h.faq.items.filter(([, answer]) => !answer.toLowerCase().includes("mentorship"));

  useEffect(() => {
    const saved = window.localStorage.getItem("varejo-investidor-locale") as Locale | null;
    if (saved && saved in translations) {
      setLocale(saved);
      return;
    }

    setLocale(detectLocale());
  }, []);

  const navItems = useMemo(
    () => [
      { label: t.nav.home, href: "#home" },
      { label: t.nav.signals, href: "/signals" },
      { label: t.nav.education, href: "#educacao" },
      { label: t.nav.terminal, href: "#terminal" },
      { label: t.nav.plans, href: "#planos" },
      { label: t.nav.services, href: "/services" },
      { label: t.nav.about, href: "#sobre" },
    ],
    [t],
  );

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("varejo-investidor-locale", nextLocale);
  }

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="hidden border-b border-ink/[0.08] bg-ink px-5 text-paper md:block">
          <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-hidden py-2 text-[11px] uppercase tracking-[0.2em]">
            <span className="shrink-0 text-paper/[0.5]">{t.tickerLabel}</span>
            <div className="ticker-track flex min-w-max gap-7">
              {[...ticker, ...ticker].map(([asset, move, tone], index) => (
                <span key={`${asset}-${index}`} className="flex items-center gap-2">
                  <span className="text-paper/75">{asset}</span>
                  <span className={tone === "up" ? "text-rise" : "text-fall"}>{move}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <header className="border-b border-ink/[0.08] bg-paper/[0.84] shadow-glass backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
            <a href="#home" className="group flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink bg-ink text-xs font-bold text-paper">
                VI
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-serif text-xl">Varejo Investidor</span>
                <span className="hidden text-[10px] uppercase tracking-[0.24em] text-ink/[0.45] sm:block">
                  Elite Signal Desk
                </span>
              </span>
            </a>

            <div className="hidden items-center gap-1 border border-ink/[0.08] bg-white p-1 text-sm text-ink/[0.66] shadow-fine lg:flex">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="px-4 py-2 text-ink transition hover:bg-ink hover:text-paper">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} onChange={changeLocale} />
              <ThemeSwitcher theme={theme} onChange={changeTheme} />
            </div>
          </nav>
          <div className="border-t border-ink/[0.08] px-5 pb-3 md:px-8 lg:hidden">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pt-3 text-sm">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="shrink-0 border border-ink/[0.1] bg-white px-3 py-2 text-ink">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </header>
      </div>

      <section id="home" className="premium-stage relative px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute inset-x-0 top-20 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(5,5,5,0.1),transparent_62%)]" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p
              variants={fadeUp}
              className="inline-flex border border-ink bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-paper"
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-5xl text-balance font-serif text-4xl leading-[0.96] tracking-[-0.05em] text-ink md:text-7xl xl:text-[6.8rem]"
            >
              {h.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-9 text-ink/[0.68] md:text-xl">
              {h.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 grid gap-2 sm:grid-cols-3">
              {h.hero.pillars.map((pillar) => (
                <div key={pillar} className="border border-ink/[0.12] bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] shadow-fine">
                  {pillar}
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink bg-ink px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-paper shadow-premium transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
              >
                {h.hero.primary}
              </a>
              <a
                href="#ecossistema"
                className="border border-ink bg-paper px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                {h.hero.secondary}
              </a>
            </motion.div>

            <div className="mt-5 max-w-3xl">
              <FreeChannelCTA t={t} compact />
            </div>

            <motion.div variants={fadeUp} className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {t.hero.proof.map(([value, label]) => (
                <div key={value} className="border border-ink/[0.1] bg-white p-4 shadow-fine">
                  <p className="font-serif text-3xl tracking-[-0.05em]">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink/[0.48]">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-3"
          >
            <div className="grid gap-3">
              {h.hero.levels.map((level, index) => (
                <div key={level.name} className="border border-ink/[0.1] bg-white p-5 shadow-fine">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-4xl tracking-[-0.05em] text-ink">{level.name}</p>
                      <p className="mt-2 text-sm leading-6 text-ink/[0.62]">{level.text}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink bg-ink font-mono text-xs text-paper">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {level.bullets.map((bullet) => (
                      <span key={bullet} className="border border-ink/[0.08] bg-paper px-3 py-2 text-xs font-semibold text-ink/[0.72]">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="ecossistema" className="border-y border-ink/[0.08] bg-white/90 px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={h.ecosystem.eyebrow} title={h.ecosystem.title} text={h.ecosystem.text} />
          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {ecosystemSteps.map((step, index) => (
            <motion.div
              key={step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className="relative border border-ink/[0.1] bg-paper p-5 shadow-fine"
            >
              <span className="font-mono text-xs text-rise">0{index + 1}</span>
              <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.04em]">{step}</h3>
              {index < ecosystemSteps.length - 1 ? (
                <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center border border-ink bg-white font-mono text-xs md:grid">
                  &gt;
                </span>
              ) : null}
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      <section id="educacao" className="border-y border-ink/[0.08] bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.education.eyebrow} title={t.education.title} text={t.education.text} />
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {t.education.levels.map((level, index) => (
              <motion.article
                key={level.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                variants={fadeUp}
                className="relative overflow-hidden border border-ink/[0.1] bg-paper p-5 shadow-fine transition hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="absolute inset-0 luxury-grid opacity-35" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4 border-b border-ink/[0.08] pb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{level.range}</p>
                      <h3 className="mt-3 font-serif text-5xl tracking-[-0.05em]">{level.name}</h3>
                    </div>
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-ink bg-ink font-mono text-xs text-paper">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-5 font-semibold leading-8 text-ink/[0.72]">{level.text}</p>
                  <div className="mt-6 grid gap-3">
                    {level.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson} className="grid grid-cols-[48px_1fr] border border-ink/[0.08] bg-white">
                        <span className="grid place-items-center border-r border-ink/[0.08] bg-ink font-mono text-sm text-paper">
                          {lessonIndex + 1}
                        </span>
                        <p className="p-3 text-sm leading-7 text-ink/[0.72]">{lesson}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    {...eliteContactCta}
                    className="mt-6 block w-full border border-ink bg-ink px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
                  >
                    {h.educationCtas[index]}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
          <a
            {...eliteCta}
            className="mt-8 inline-block border border-ink bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper shadow-fine transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
          >
            {t.education.cta}
          </a>
        </div>
      </section>

      <section id="sinais" className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t.signalBlock.eyebrow} title={t.signalBlock.title} text={t.signalBlock.text} />
            <p className="mt-5 border-l-2 border-rise bg-white px-5 py-4 font-semibold leading-7 text-ink shadow-fine">
              {h.signals.intro}
            </p>
            <div className="mt-5 border border-ink/[0.1] bg-white p-5 shadow-fine">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.45]">{h.signals.includesTitle}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {h.signals.includes.map((item) => (
                  <span key={item} className="border border-ink/[0.08] bg-paper px-3 py-2 text-sm font-semibold text-ink/[0.7]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.signalBlock.stats.map((item) => (
                <div key={item} className="border-l-2 border-ink bg-white p-4 shadow-fine">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              {...eliteCta}
              className="mt-8 inline-block border border-ink bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper transition hover:bg-paper hover:text-ink"
            >
              {t.signalBlock.cta}
            </a>
            <div className="mt-5">
              <FreeChannelCTA t={t} compact />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-ink bg-ink p-5 text-paper shadow-premium">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-paper/[0.5]">Signal performance desk</p>
                <p className="text-rise">Live</p>
              </div>
              <div className="mt-8">
                <Sparkline />
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {["XAU/USD", "USOIL", "BTC/USD"].map((asset, index) => (
                  <div key={asset} className="border border-paper/[0.1] bg-paper/[0.035] p-4">
                    <p className="font-mono text-sm">{asset}</p>
                    <p className={index === 1 ? "mt-3 text-fall" : "mt-3 text-rise"}>{index === 1 ? "Sell" : "Buy"}</p>
                  </div>
                ))}
              </div>
            </div>
            <SignalTicket t={t} />
          </div>
        </div>
      </section>

      <WhatsAppSignalExample t={t} />

      <section id="terminal" className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader eyebrow={t.terminal.eyebrow} title={t.terminal.title} text={t.terminal.text} />
          <div className="terminal-shell border border-ink bg-ink p-4 text-paper shadow-premium">
            <div className="grid gap-3 md:grid-cols-2">
              {ticker.slice(0, 6).map(([asset, move, tone]) => (
                <div key={asset} className="border border-paper/[0.1] bg-paper/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-bold">{asset}</p>
                    <p className={tone === "up" ? "text-rise" : "text-fall"}>{move}</p>
                  </div>
                  <div className="mt-3">
                    <Sparkline tone={tone} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {locale === "pt" ? (
        <section id="estrategia" className="border-y border-ink/[0.08] bg-white/80 px-5 py-20 backdrop-blur-xl md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="lg:sticky lg:top-36">
                <SectionHeader eyebrow={t.strategic.eyebrow} title={t.strategic.title} text={t.strategic.text} />
                <div className="mt-7 grid gap-3">
                  {["Vagas limitadas", "Atendimento individual", "Estrutura estratégica"].map((item) => (
                    <p key={item} className="border-l-2 border-gold bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-fine">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {strategicPtProducts.map((product, index) => {
                  const platinum = product.kind === "platinum";
                  const gold = product.kind === "gold";

                  return (
                    <motion.article
                      key={product.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.06 }}
                      variants={fadeUp}
                      className={`relative overflow-hidden border p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-7 ${
                        platinum
                          ? "border-gold bg-ink text-paper"
                          : gold
                            ? "border-gold/[0.45] bg-gold/[0.08] text-ink"
                            : "border-ink/[0.1] bg-paper text-ink"
                      }`}
                    >
                      <div className={platinum ? "absolute inset-0 terminal-grid opacity-20" : "absolute inset-0 luxury-grid opacity-40"} />
                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <p className={`font-mono text-xs uppercase tracking-[0.24em] ${platinum ? "text-gold" : "text-ink/[0.42]"}`}>
                            Produto 0{index + 1}
                          </p>
                          <span className={`border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${platinum ? "border-gold text-gold" : "border-ink/[0.14] text-ink/[0.58]"}`}>
                            {product.label}
                          </span>
                        </div>
                        <h3 className="mt-8 font-serif text-4xl leading-[1.02] tracking-[-0.04em]">
                          {product.title}
                        </h3>
                        <p className={`mt-5 leading-8 ${platinum ? "text-paper/[0.68]" : "text-ink/[0.64]"}`}>
                          {product.description}
                        </p>
                        <div className={`mt-6 border-l-2 pl-4 text-sm font-bold uppercase tracking-[0.16em] ${platinum ? "border-gold text-gold" : "border-ink text-ink"}`}>
                          Carga horária: {product.workload}
                        </div>
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-7 block w-full border px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
                            platinum
                              ? "border-gold bg-gold text-ink hover:border-paper hover:bg-paper"
                              : "border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
                          }`}
                        >
                          {product.cta}
                        </a>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="planos" className="border-y border-ink/[0.08] bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.pricing.eyebrow} title={t.pricing.title} text={t.pricing.text} />
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>

          {locale === "pt" ? (
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              variants={fadeUp}
              className="mt-10 overflow-hidden border border-ink bg-paper shadow-premium"
            >
              <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
                <div className="bg-ink p-7 text-paper md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Canal Elite</p>
                  <h3 className="mt-5 font-serif text-6xl tracking-[-0.05em]">Canal Elite</h3>
                  <p className="mt-5 leading-8 text-paper/[0.66]">{t.pricing.text}</p>
                  <a
                    {...eliteContactCta}
                    className="mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-paper hover:border-paper"
                  >
                    {t.pricing.cta}
                  </a>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-7">
                  {t.pricing.plans.map((plan) => (
                    <div key={plan.period} className={plan.featured ? "border border-gold bg-gold/[0.08] p-5" : "border border-ink/[0.1] bg-white p-5"}>
                      {plan.featured ? (
                        <span className="mb-4 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                          {t.pricing.badge}
                        </span>
                      ) : null}
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.48]">{plan.period}</p>
                      <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">{plan.brl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {t.pricing.plans.map((plan) => (
                <motion.article
                  key={plan.period}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  variants={fadeUp}
                  className={plan.featured ? "border border-gold bg-ink p-6 text-paper shadow-premium" : "border border-ink/[0.1] bg-paper p-6 shadow-fine"}
                >
                  {plan.featured ? (
                    <span className="mb-5 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                      {t.pricing.badge}
                    </span>
                  ) : null}
                  <p className={plan.featured ? "text-xs font-bold uppercase tracking-[0.28em] text-gold" : "text-xs font-bold uppercase tracking-[0.28em] text-ink/[0.48]"}>
                    Elite
                  </p>
                  <h3 className="mt-6 font-serif text-4xl tracking-[-0.05em]">{plan.period}</h3>
                  <p className="mt-5 font-serif text-4xl tracking-[-0.05em]">{plan.usd}</p>
                  <a
                    {...eliteCta}
                    className={plan.featured ? "mt-8 block border border-gold bg-gold px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink" : "mt-8 block border border-ink bg-ink px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper"}
                  >
                    {t.pricing.cta}
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-3 border border-ink bg-ink p-5 text-paper shadow-premium md:grid-cols-2 lg:grid-cols-4">
            {t.pricing.features.map((feature) => (
              <p key={feature} className="border-l border-gold pl-4 text-sm leading-7">
                {feature}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto mb-6 max-w-7xl">
          <FreeChannelCTA t={t} variant="dark" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden border border-ink bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-12 md:py-20"
        >
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{t.contact.eyebrow}</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-5xl leading-[1] tracking-[-0.05em] md:text-7xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-paper/[0.68]">{t.contact.text}</p>
            <a
              href="#contato"
              className="mt-8 inline-block border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-paper hover:border-paper"
            >
              {t.contact.button}
            </a>
          </div>
        </motion.div>
      </section>

      <BrokerBanners t={t} />

      <section className="border-y border-ink/[0.08] bg-white px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={h.faq.eyebrow} title={h.faq.title} text={h.ecosystem.text} />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqItems.map(([question, answer], index) => (
              <motion.article
                key={question}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.03 }}
                variants={fadeUp}
                className="border border-ink/[0.1] bg-paper p-6 shadow-fine"
              >
                <p className="font-mono text-xs text-rise">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">{question}</h3>
                <p className="mt-4 leading-8 text-ink/[0.65]">{answer}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden border border-ink bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-12 md:py-20"
        >
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{h.finalCta.eyebrow}</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-balance font-serif text-4xl leading-[1] tracking-[-0.05em] md:text-7xl">
              {h.finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-paper/[0.68]">{h.finalCta.text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:border-paper hover:bg-paper"
              >
                {h.finalCta.primary}
              </a>
              <a
                {...eliteCta}
                className="border border-paper/[0.28] bg-paper/[0.04] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-paper transition hover:border-paper hover:bg-paper hover:text-ink"
              >
                {h.finalCta.secondary}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <SupportFooter t={t} />

      <footer id="sobre" className="border-t border-ink/[0.08] bg-white px-5 py-9 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-ink/[0.58] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-3xl tracking-[-0.04em] text-ink">Varejo Investidor</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.24em]">Since 2018 | Elite Signal Desk</p>
          </div>
          <p className="max-w-2xl leading-7">{t.footer}</p>
        </div>
      </footer>
    </main>
  );
}
