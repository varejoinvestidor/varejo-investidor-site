"use client";

import { motion } from "framer-motion";
import type { Locale } from "../i18n";
import { fadeUp } from "./SiteSections";

const cryptoLink = "https://accounts.binance.com/register?ref=453580362";

const forexLinks: Record<Locale, string> = {
  pt: "https://direct.fxpro.group/pt/partner/77014650",
  en: "https://direct.fxpro.group/en/partner/77014650",
  es: "https://direct.fxpro.group/es/partner/77014650",
  hi: "https://direct.fxpro.group/en/partner/77014650",
  ar: "https://direct.fxpro.group/ar/partner/77014650",
  tr: "https://direct.fxpro.group/tr/partner/77014650",
};

const fxproBanners: Record<Locale, { src: string; alt: string }> = {
  pt: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png",
    alt: "Banner FxPro em português",
  },
  en: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
    alt: "FxPro banner in English",
  },
  es: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png",
    alt: "Banner FxPro en español",
  },
  hi: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-hi-fscm-1324x150.png",
    alt: "हिंदी में FxPro बैनर",
  },
  ar: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-ar-fscm-1324x150.png",
    alt: "لافتة FxPro باللغة العربية",
  },
  tr: {
    src: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-tr-fscm-1324x150.png",
    alt: "Türkçe FxPro bannerı",
  },
};

const copy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    text: string;
    forexLabel: string;
    forexTitle: string;
    forexText: string;
    forexButton: string;
    cryptoLabel: string;
    cryptoTitle: string;
    cryptoText: string;
    cryptoButton: string;
    bannerCta: string;
    bannerHelp: string;
  }
> = {
  pt: {
    eyebrow: "Estrutura operacional",
    title: "Corretoras utilizadas pelo Varejo Investidor",
    text: "Acesse as plataformas usadas em nossa estrutura operacional para Forex e criptoativos.",
    forexLabel: "Corretora Forex",
    forexTitle: "Forex com estrutura global",
    forexText: "Acesse a plataforma de Forex utilizada pelo Varejo Investidor para acompanhar moedas, ouro, petróleo, índices e mercado global.",
    forexButton: "Abrir conta Forex",
    cryptoLabel: "Corretora Cripto",
    cryptoTitle: "Criptoativos com acesso internacional",
    cryptoText: "Acesse a plataforma utilizada para negociar criptoativos dentro de uma estrutura operacional global.",
    cryptoButton: "Abrir conta Cripto",
    bannerCta: "Abra sua conta Forex",
    bannerHelp: "Clique no banner para acessar a corretora no idioma correto.",
  },
  en: {
    eyebrow: "Operational structure",
    title: "Brokers used by Varejo Investidor",
    text: "Access the platforms used in our operational structure for Forex and crypto assets.",
    forexLabel: "Forex broker",
    forexTitle: "Forex with global structure",
    forexText: "Access the Forex platform used by Varejo Investidor to follow currencies, gold, oil, indices, and global markets.",
    forexButton: "Open Forex account",
    cryptoLabel: "Crypto broker",
    cryptoTitle: "Crypto assets with international access",
    cryptoText: "Access the platform used to trade crypto assets inside a global operational structure.",
    cryptoButton: "Open Crypto account",
    bannerCta: "Open your Forex account",
    bannerHelp: "Click the banner to access the broker in the correct language.",
  },
  es: {
    eyebrow: "Estructura operativa",
    title: "Brokers utilizados por Varejo Investidor",
    text: "Accede a las plataformas utilizadas en nuestra estructura operativa para Forex y criptoactivos.",
    forexLabel: "Broker Forex",
    forexTitle: "Forex con estructura global",
    forexText: "Accede a la plataforma Forex utilizada por Varejo Investidor para seguir divisas, oro, petróleo, índices y mercados globales.",
    forexButton: "Abrir cuenta Forex",
    cryptoLabel: "Broker Cripto",
    cryptoTitle: "Criptoactivos con acceso internacional",
    cryptoText: "Accede a la plataforma utilizada para operar criptoactivos dentro de una estructura operativa global.",
    cryptoButton: "Abrir cuenta Cripto",
    bannerCta: "Abre tu cuenta Forex",
    bannerHelp: "Haz clic en el banner para acceder al broker en el idioma correcto.",
  },
  hi: {
    eyebrow: "ऑपरेशनल संरचना",
    title: "Varejo Investidor द्वारा उपयोग किए जाने वाले ब्रोकर्स",
    text: "Forex और क्रिप्टो एसेट्स के लिए हमारी ऑपरेशनल संरचना में उपयोग किए जाने वाले प्लेटफॉर्म तक पहुँचें।",
    forexLabel: "Forex ब्रोकर",
    forexTitle: "ग्लोबल संरचना के साथ Forex",
    forexText: "करेंसी, गोल्ड, ऑयल, इंडेक्स और ग्लोबल मार्केट को देखने के लिए Varejo Investidor द्वारा उपयोग किए जाने वाले Forex प्लेटफॉर्म तक पहुँचें।",
    forexButton: "Forex खाता खोलें",
    cryptoLabel: "क्रिप्टो ब्रोकर",
    cryptoTitle: "अंतरराष्ट्रीय पहुँच के साथ क्रिप्टो एसेट्स",
    cryptoText: "ग्लोबल ऑपरेशनल संरचना के भीतर क्रिप्टो एसेट्स ट्रेड करने के लिए उपयोग किए जाने वाले प्लेटफॉर्म तक पहुँचें।",
    cryptoButton: "क्रिप्टो खाता खोलें",
    bannerCta: "अपना Forex खाता खोलें",
    bannerHelp: "सही भाषा में ब्रोकर तक पहुँचने के लिए बैनर पर क्लिक करें।",
  },
  ar: {
    eyebrow: "الهيكل التشغيلي",
    title: "الوسطاء الذين يستخدمهم Varejo Investidor",
    text: "يمكنك الوصول إلى المنصات المستخدمة في هيكلنا التشغيلي للفوركس والأصول الرقمية.",
    forexLabel: "وسيط الفوركس",
    forexTitle: "فوركس ضمن هيكل عالمي",
    forexText: "ادخل إلى منصة الفوركس التي يستخدمها Varejo Investidor لمتابعة العملات والذهب والنفط والمؤشرات والأسواق العالمية.",
    forexButton: "افتح حساب فوركس",
    cryptoLabel: "وسيط الكريبتو",
    cryptoTitle: "أصول رقمية بوصول دولي",
    cryptoText: "ادخل إلى المنصة المستخدمة لتداول الأصول الرقمية ضمن هيكل تشغيلي عالمي.",
    cryptoButton: "افتح حساب كريبتو",
    bannerCta: "افتح حساب الفوركس",
    bannerHelp: "اضغط على البانر للوصول إلى الوسيط باللغة المناسبة.",
  },
  tr: {
    eyebrow: "Operasyonel yapı",
    title: "Varejo Investidor tarafından kullanılan aracı kurumlar",
    text: "Forex ve kripto varlıklar için operasyonel yapımızda kullanılan platformlara erişin.",
    forexLabel: "Forex aracı kurumu",
    forexTitle: "Küresel yapı ile Forex",
    forexText: "Döviz, altın, petrol, endeksler ve küresel piyasaları takip etmek için Varejo Investidor tarafından kullanılan Forex platformuna erişin.",
    forexButton: "Forex hesabı aç",
    cryptoLabel: "Kripto aracı kurumu",
    cryptoTitle: "Uluslararası erişimle kripto varlıklar",
    cryptoText: "Küresel operasyonel yapı içinde kripto varlık işlemleri için kullanılan platforma erişin.",
    cryptoButton: "Kripto hesabı aç",
    bannerCta: "Forex hesabınızı açın",
    bannerHelp: "Doğru dilde aracı kuruma erişmek için bannera tıklayın.",
  },
};

export function BrokerAccessBlock({ locale }: { locale: Locale }) {
  const data = copy[locale];
  const banner = fxproBanners[locale];
  const forexLink = forexLinks[locale];
  const isRtl = locale === "ar";
  const cards = [
    {
      label: data.forexLabel,
      title: data.forexTitle,
      text: data.forexText,
      button: data.forexButton,
      link: forexLink,
      symbol: "$",
      tone: "forex",
    },
    {
      label: data.cryptoLabel,
      title: data.cryptoTitle,
      text: data.cryptoText,
      button: data.cryptoButton,
      link: cryptoLink,
      symbol: "₿",
      tone: "crypto",
    },
  ];

  return (
    <section className="px-5 py-12 md:px-8 md:py-16" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{data.eyebrow}</p>
          <div className="mt-4 grid gap-5 lg:grid-cols-[0.75fr_1fr] lg:items-end">
            <h2 className="font-serif text-4xl leading-[1.03] tracking-[-0.04em] text-paper md:text-5xl">{data.title}</h2>
            <p className="max-w-3xl text-base leading-8 text-paper/[0.66] lg:justify-self-end">{data.text}</p>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {cards.map((card) => (
            <motion.article
              key={card.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`broker-card broker-card-${card.tone} terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-6 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.48] hover:shadow-premium md:p-8`}
            >
              <div className={card.tone === "forex" ? "absolute inset-0 luxury-grid opacity-40" : "absolute inset-0 signal-grid opacity-45"} />
              <div className="relative flex h-full flex-col">
                <div
                  className={`mb-6 grid h-14 w-14 place-items-center border font-mono text-2xl font-bold ${
                    card.tone === "forex" ? "border-rise/[0.35] text-rise" : "border-gold/[0.45] text-gold"
                  }`}
                  aria-hidden="true"
                >
                  {card.symbol}
                </div>
                <p className={`text-xs font-bold uppercase tracking-[0.26em] ${card.tone === "forex" ? "text-rise" : "text-gold"}`}>
                  {card.label}
                </p>
                <h3 className="mt-5 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-paper md:text-4xl">{card.title}</h3>
                <p className="mt-5 flex-1 leading-8 text-paper/[0.66]">{card.text}</p>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`broker-action broker-action-${card.tone} mt-8 inline-flex min-h-12 w-full items-center justify-center px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] transition sm:w-auto`}
                >
                  {card.button}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-7">
          <div className="mb-4 text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-paper">
              <span className="text-gold">{data.bannerCta}</span>
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.48]">{data.bannerHelp}</p>
          </div>
          <a
            href={forexLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full max-w-[1324px] overflow-hidden rounded-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-premium"
            aria-label={data.forexButton}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              width="1324"
              height="150"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
