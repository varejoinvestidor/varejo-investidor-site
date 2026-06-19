"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BrokerBanners,
  ContactSection,
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

const ICHIMOKU_PRODUCT_URL = "https://lastlink.com/p/C1EE3F8C4/checkout-payment";
const ELITE_LASTLINK_URL = "https://lastlink.com/p/CE761BB8E/checkout-payment/";
const ELITE_STRIPE_LINKS = [
  "https://buy.stripe.com/28E3cuccK1dEaub26QdfG01",
  "https://buy.stripe.com/aFa5kC7Wu6xY1XF9zidfG02",
  "https://buy.stripe.com/fZubJ00u28G631J26QdfG03",
  "https://buy.stripe.com/3cI4gy2Ca1dE59Rh1KdfG04",
];
const SELECT_CONTACT_URL =
  "https://wa.me/5519983393147?text=Ol%C3%A1%2C%20quero%20conhecer%20o%20Varejo%20Investidor%20Select.";

type WealthServiceCard = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  href: string;
  highlights: string[];
};

const wealthServicesByLocale: Record<string, WealthServiceCard[]> = {
  pt: [
    {
      eyebrow: "Estrutura operacional",
      title: "Varejo Investidor Select",
      subtitle: "Gestão operacional para investidores que desejam exposição aos mercados globais.",
      description: "Estrutura para investidores com aplicação mínima de R$ 250.000 ou US$ 50.000, com exposição a Forex, ações, criptomoedas e mercados internacionais.",
      cta: "Conhecer Select",
      href: "/select",
      highlights: ["R$ 250.000 mínimo", "US$ 50.000 internacional", "Forex", "Ações", "Criptomoedas", "Cópia automática"],
    },
    {
      eyebrow: "Estrutura patrimonial",
      title: "Varejo Investidor Private",
      subtitle: "Estrutura patrimonial global para investidores acima de US$ 1.000.000.",
      description: "Organização, proteção e expansão internacional de patrimônio para investidores, empresários e famílias com capital global.",
      cta: "Conhecer Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Proteção global", "Multi jurisdição", "Capital internacional", "Longo prazo", "Continuidade patrimonial"],
    },
  ],
  en: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  es: [
    {
      eyebrow: "Estructura operativa",
      title: "Varejo Investidor Select",
      subtitle: "Gestión operativa para inversores que desean exposición a los mercados globales.",
      description: "Estructura para inversores con asignación mínima de US$ 50.000, con exposición a Forex, acciones, criptoactivos y mercados internacionales.",
      cta: "Conocer Select",
      href: "/select",
      highlights: ["US$ 50.000 mínimo", "Forex", "Acciones", "Criptoactivos", "Copia automática"],
    },
    {
      eyebrow: "Estructura patrimonial",
      title: "Varejo Investidor Private",
      subtitle: "Estructura patrimonial global para inversores por encima de US$ 1.000.000.",
      description: "Organización, protección y expansión internacional de patrimonio para inversores, empresarios y familias con capital global.",
      cta: "Conocer Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Protección global", "Multijurisdicción", "Capital internacional", "Largo plazo", "Continuidad patrimonial"],
    },
  ],
  fr: [
    {
      eyebrow: "Structure opérationnelle",
      title: "Varejo Investidor Select",
      subtitle: "Gestion opérationnelle pour les investisseurs qui souhaitent une exposition aux marchés mondiaux.",
      description: "Structure destinée aux investisseurs avec une allocation minimale de US$ 50 000, exposée au Forex, aux actions, aux cryptoactifs et aux marchés internationaux.",
      cta: "Découvrir Select",
      href: "/select",
      highlights: ["Allocation minimale US$ 50 000", "Forex", "Actions", "Cryptoactifs", "Copie automatisée"],
    },
    {
      eyebrow: "Structure patrimoniale",
      title: "Varejo Investidor Private",
      subtitle: "Structure patrimoniale mondiale pour les investisseurs au-dessus de US$ 1 000 000.",
      description: "Organisation, protection et expansion internationale du patrimoine pour investisseurs, entrepreneurs et familles avec capital global.",
      cta: "Découvrir Private",
      href: "/private",
      highlights: ["US$ 1 000 000+", "Protection globale", "Multi-juridiction", "Capital international", "Long terme", "Continuité patrimoniale"],
    },
  ],
  de: [
    {
      eyebrow: "Operative Struktur",
      title: "Varejo Investidor Select",
      subtitle: "Operatives Management für Anleger, die Zugang zu globalen Märkten suchen.",
      description: "Struktur für Anleger mit einer Mindestallokation von US$ 50.000 und Zugang zu Forex, Aktien, Kryptoassets und internationalen Märkten.",
      cta: "Select kennenlernen",
      href: "/select",
      highlights: ["Mindestallokation US$ 50.000", "Forex", "Aktien", "Kryptoassets", "Automatische Kopie"],
    },
    {
      eyebrow: "Vermögensstruktur",
      title: "Varejo Investidor Private",
      subtitle: "Globale Vermögensstruktur für Anleger ab US$ 1.000.000.",
      description: "Internationale Organisation, Schutz und Ausbau von Vermögen für Anleger, Unternehmer und Familien mit globalem Kapital.",
      cta: "Private kennenlernen",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Globaler Schutz", "Mehrere Jurisdiktionen", "Internationales Kapital", "Langfristig", "Vermögenskontinuität"],
    },
  ],
  hi: [
    {
      eyebrow: "??????? ??????",
      title: "Varejo Investidor Select",
      subtitle: "??????? ??????? ??? ????????? ????? ???? ???????? ?? ??? ??????? ????????",
      description: "US$ 50,000 ?? ??????? ????? ???? ???? ???????? ?? ??? ??????, ?????? Forex, ????, ???????? ?????? ?? ????????????? ??????? ?? ????????? ????? ???",
      cta: "Select ?????",
      href: "/select",
      highlights: ["US$ 50,000 ??????? ?????", "Forex", "????", "???????? ??????", "???????? ????", "?????? ?? ??? ?? ????"],
    },
    {
      eyebrow: "???????? ??????? ??????",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000 ?? ???? ????? ???? ???????? ?? ??? ??????? ??????? ???????",
      description: "??????? ????? ???? ????????, ????????? ?? ???????? ?? ??? ????????????? ??????? ?? ?????, ??????? ?? ????????",
      cta: "Private ?????",
      href: "/private",
      highlights: ["US$ 1,000,000+", "??????? ???????", "??????? ???????", "????????????? ?????", "?? ????????????", "?????????? ?????"],
    },
  ],
  ar: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  tr: [
    {
      eyebrow: "Operasyonel yapı",
      title: "Varejo Investidor Select",
      subtitle: "Küresel piyasalara maruz kalmak isteyen yatırımcılar için operasyonel yönetim.",
      description: "US$ 50.000 minimum sermayeye sahip yatırımcılar için Forex, hisseler, kripto varlıklar ve uluslararası piyasa yapısı.",
      cta: "Select'i tanı",
      href: "/select",
      highlights: ["US$ 50.000 minimum", "Forex", "Hisseler", "Kripto", "Otomatik kopyalama"],
    },
    {
      eyebrow: "Varlık yapısı",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1.000.000 üzeri yatırımcılar için küresel varlık yapısı.",
      description: "Küresel sermayeye sahip yatırımcılar, girişimciler ve aileler için uluslararası varlık organizasyonu, koruma ve büyüme.",
      cta: "Private'ı tanı",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Küresel koruma", "Çoklu yargı alanı", "Uluslararası sermaye", "Uzun vade", "Varlık sürekliliği"],
    },
  ],
  id: [
    {
      eyebrow: "Struktur operasional",
      title: "Varejo Investidor Select",
      subtitle: "Manajemen operasional untuk investor yang ingin memiliki eksposur ke pasar global.",
      description: "Struktur untuk investor dengan alokasi minimum US$ 50.000, dengan eksposur ke Forex, saham, aset kripto, dan pasar internasional.",
      cta: "Lihat Select",
      href: "/select",
      highlights: ["Alokasi minimum US$ 50.000", "Forex", "Saham", "Aset kripto", "Copy otomatis"],
    },
    {
      eyebrow: "Struktur kekayaan",
      title: "Varejo Investidor Private",
      subtitle: "Struktur kekayaan global untuk investor di atas US$ 1.000.000.",
      description: "Pengorganisasian, perlindungan, dan ekspansi kekayaan internasional untuk investor, pengusaha, dan keluarga dengan modal global.",
      cta: "Lihat Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Perlindungan global", "Multi-yurisdiksi", "Modal internasional", "Jangka panjang", "Kontinuitas kekayaan"],
    },
  ],
  vi: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  ru: [
    {
      eyebrow: "???????????? ?????????",
      title: "Varejo Investidor Select",
      subtitle: "???????????? ????????????? ??? ??????????, ??????? ????? ?????????? ?? ?????????? ?????.",
      description: "????????? ??? ?????????? ? ??????????? ??????????? US$ 50,000 ? ???????? ? Forex, ??????, ????????????? ? ????????????? ??????.",
      cta: "?????? Select",
      href: "/select",
      highlights: ["??????? US$ 50,000", "Forex", "?????", "????????????", "?????????????? ???????????", "???? ?? ??? ???????"],
    },
    {
      eyebrow: "????????????????? ????????? ????????",
      title: "Varejo Investidor Private",
      subtitle: "?????????? ????????? ???????? ??? ?????????? ????? US$ 1,000,000.",
      description: "???????????, ?????? ? ????????????? ???????? ???????? ??? ??????????, ???????????????? ? ????? ? ?????????? ?????????.",
      cta: "?????? Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "?????????? ???????", "?????? ????????", "????????????? ?????????", "????????? ??????????", "???????????? ????????????"],
    },
  ],
  pl: [
    {
      eyebrow: "Struktura operacyjna",
      title: "Varejo Investidor Select",
      subtitle: "Zarz?dzanie operacyjne dla inwestor?w szukaj?cych ekspozycji na rynki globalne.",
      description: "Struktura dla inwestor?w z minimaln? alokacj? US$ 50,000, obejmuj?ca ekspozycj? na Forex, akcje, kryptowaluty i rynki mi?dzynarodowe.",
      cta: "Poznaj Select",
      href: "/select",
      highlights: ["Minimalna alokacja US$ 50,000", "Forex", "Akcje", "Kryptowaluty", "Automatyczne kopiowanie", "Rachunek na nazwisko klienta"],
    },
    {
      eyebrow: "Instytucjonalna struktura maj?tkowa",
      title: "Varejo Investidor Private",
      subtitle: "Globalna struktura maj?tkowa dla inwestor?w powy?ej US$ 1,000,000.",
      description: "Organizacja, ochrona i mi?dzynarodowy rozw?j maj?tku dla inwestor?w, przedsi?biorc?w i rodzin dysponuj?cych kapita?em globalnym.",
      cta: "Poznaj Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Maj?tek globalny", "Ochrona maj?tku", "Alokacja mi?dzynarodowa", "Wiele jurysdykcji", "Planowanie d?ugoterminowe"],
    },
  ],
  th: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  bn: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  ja: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  ko: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
  tl: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management para sa investors na gusto ng exposure sa global markets.",
      description: "Isang structure para sa investors na may minimum allocation na US$ 50,000, may exposure sa Forex, stocks, crypto assets, at international markets.",
      cta: "Kilalanin ang Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy", "Account sa pangalan ng client"],
    },
    {
      eyebrow: "Institutional wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure para sa investors na higit US$ 1,000,000.",
      description: "Pag-oorganisa, proteksyon, at international expansion ng wealth para sa investors, entrepreneurs, at families na may global capital.",
      cta: "Kilalanin ang Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global wealth", "Wealth protection", "International allocation", "Multiple jurisdictions", "Long-term planning"],
    },
  ],
  ur: [
    {
      eyebrow: "Operational structure",
      title: "Varejo Investidor Select",
      subtitle: "Operational management for investors seeking exposure to global markets.",
      description: "A structure for investors with a minimum allocation of US$ 50,000, with exposure to Forex, stocks, crypto assets, and international markets.",
      cta: "Explore Select",
      href: "/select",
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto assets", "Automated copy"],
    },
    {
      eyebrow: "Wealth structure",
      title: "Varejo Investidor Private",
      subtitle: "Global wealth structure for investors above US$ 1,000,000.",
      description: "International wealth organization, protection, and expansion for investors, business owners, and families with global capital.",
      cta: "Explore Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "Global protection", "Multi-jurisdiction", "International capital", "Long term", "Wealth continuity"],
    },
  ],
};

const compactPtServices = [
  {
    title: "Canal Elite",
    description: "Produto principal com sinais ao vivo, análises, aulas gravadas e leitura global de mercado.",
    bullets: ["100% dos sinais", "Análises completas", "Educação por níveis", "Mercado global"],
    cta: "Conhecer Canal Elite Harpia",
    href: "/sinais",
    kind: "elite",
  },
  {
    title: "Canal Formiga",
    subtitle: "Entrada inicial para o ecossistema Varejo Investidor",
    description: "Receba gratuitamente análises econômicas, conteúdos educacionais e atualizações sobre os mercados globais diretamente no WhatsApp.",
    details: [
      "Comece seus primeiros passos no mercado internacional entendendo Forex, ouro, petróleo, índices, moedas globais e estrutura financeira.",
      "O Canal Formiga foi criado para ajudar investidores comuns a saírem da base financeira, desenvolver disciplina, leitura de mercado e evoluir em direção ao nível Lobo e Harpia.",
    ],
    bullets: ["Entrada gratuita", "Análises econômicas", "Educação financeira", "WhatsApp"],
    highlights: ["Análises econômicas", "Conteúdos educacionais", "Atualizações de mercado", "Mercados globais", "Primeiro passo Formiga"],
    cta: "Entrar no Canal Formiga",
    href: "free",
    kind: "free",
  },
];

const elitePtPackages = [
  ["Mensal", "R$149,90", ""],
  ["Trimestral", "R$397,90", ""],
  ["Semestral", "R$697,90", ""],
  ["Anual", "R$1.197,90", "MAIOR ECONOMIA"],
];

const elitePackagesByLocale = {
  pt: { title: "Pacotes disponíveis", cta: "Assinar agora", items: elitePtPackages },
  en: {
    title: "Available packages",
    cta: "Subscribe now",
    items: [["Monthly", "US$ 30", ""], ["3 Months", "US$ 80", ""], ["6 Months", "US$ 145", ""], ["Annual", "US$ 240", "BEST VALUE"]],
  },
  de: {
    title: "Verfuegbare Pakete",
    cta: "Jetzt abonnieren",
    items: [["Monatlich", "US$ 30", ""], ["3 Monate", "US$ 80", ""], ["6 Monate", "US$ 145", ""], ["Jaehrlich", "US$ 240", "BESTER WERT"]],
  },
  es: {
    title: "Paquetes disponibles",
    cta: "Suscribirse ahora",
    items: [["Mensual", "US$ 30", ""], ["Trimestral", "US$ 80", ""], ["Semestral", "US$ 145", ""], ["Anual", "US$ 240", "MAYOR AHORRO"]],
  },
  hi: {
    title: "\u0909\u092A\u0932\u092C\u094D\u0927 \u092A\u0948\u0915\u0947\u091C",
    cta: "\u0905\u092D\u0940 \u0938\u0926\u0938\u094D\u092F\u0924\u093E \u0932\u0947\u0902",
    items: [["\u092E\u093E\u0938\u093F\u0915", "US$ 30", ""], ["3 \u092E\u0939\u0940\u0928\u0947", "US$ 80", ""], ["6 \u092E\u0939\u0940\u0928\u0947", "US$ 145", ""], ["\u0935\u093E\u0930\u094D\u0937\u093F\u0915", "US$ 240", "\u0938\u092C\u0938\u0947 \u0905\u091A\u094D\u091B\u093E \u092E\u0942\u0932\u094D\u092F"]],
  },
  ar: {
    title: "الباقات المتاحة",
    cta: "اشترك الآن",
    items: [["شهري", "US$ 30", ""], ["3 أشهر", "US$ 80", ""], ["6 أشهر", "US$ 145", ""], ["سنوي", "US$ 240", "أفضل قيمة"]],
  },
  tr: {
    title: "Mevcut paketler",
    cta: "Şimdi abone ol",
    items: [["Aylık", "US$ 30", ""], ["3 Ay", "US$ 80", ""], ["6 Ay", "US$ 145", ""], ["Yıllık", "US$ 240", "EN İYİ DEĞER"]],
  },
  id: {
    title: "Paket tersedia",
    cta: "Berlangganan sekarang",
    items: [["Bulanan", "US$ 30", ""], ["3 Bulan", "US$ 80", ""], ["6 Bulan", "US$ 145", ""], ["Tahunan", "US$ 240", "NILAI TERBAIK"]],
  },
  vi: {
    title: "Gói hiện có",
    cta: "Đăng ký ngay",
    items: [["Hàng tháng", "US$ 30", ""], ["3 tháng", "US$ 80", ""], ["6 tháng", "US$ 145", ""], ["Hàng năm", "US$ 240", "GIÁ TRỊ TỐT NHẤT"]],
  },
};

const compactServicesByLocale = {
  pt: compactPtServices,
  en: [
    {
      title: "Elite Channel",
      description: "Main product with live signals, market analysis, recorded classes, and global market reading.",
      bullets: ["100% of signals", "Complete analysis", "Level-based education", "Global markets"],
      cta: "Explore Elite Channel",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Free Formiga Channel",
      subtitle: "Entry point into the Varejo Investidor ecosystem",
      description: "Receive free signals, market analysis, global insights and daily financial content directly on WhatsApp.",
      details: [
        "Take your first steps into the international market by understanding Forex, gold, oil, indices, global currencies and financial structure.",
        "The Formiga Channel was created to help regular investors leave the financial base level, develop discipline, market reading skills and evolve toward the Lobo and Harpia levels.",
      ],
      bullets: ["Free access", "Daily content", "Formiga base", "WhatsApp"],
      highlights: ["Free signals", "Daily content", "International markets", "Financial growth", "Long-term structure"],
      cta: "JOIN FREE CHANNEL",
      href: "free",
      kind: "free",
    },
  ],
  de: [
    {
      title: "Elite Kanal",
      description: "Das Hauptangebot mit Live-Signalen, Marktanalysen, aufgezeichneten Lektionen und globaler Markteinordnung.",
      bullets: ["100% der Signale", "Vollstaendige Analyse", "Ausbildung nach Stufen", "Globale Maerkte"],
      cta: "Elite Kanal ansehen",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Kostenloser Formiga Kanal",
      subtitle: "Der Einstieg in das Varejo Investidor Oekosystem",
      description: "Erhalten Sie kostenlose Signale, Marktanalysen, globale Einordnung und taegliche Finanzinhalte direkt ueber WhatsApp.",
      details: [
        "Starten Sie mit Forex, Gold, Oel, Indizes, globalen Waehrungen und finanzieller Struktur in die internationalen Maerkte.",
        "Der Formiga Kanal hilft Anlegern, eine finanzielle Basis aufzubauen, Disziplin zu entwickeln, Maerkte besser zu lesen und sich in Richtung Lobo und Harpia weiterzuentwickeln.",
      ],
      bullets: ["Kostenloser Zugang", "Taegliche Inhalte", "Formiga Basis", "WhatsApp"],
      highlights: ["Kostenlose Signale", "Taegliche Inhalte", "Internationale Maerkte", "Finanzielle Entwicklung", "Langfristige Struktur"],
      cta: "FORMIGA KANAL BETRETEN",
      href: "free",
      kind: "free",
    },
  ],
  id: [
    {
      title: "Kanal Elite",
      description: "Produk utama dengan sinyal live, analisis pasar, kelas rekaman, dan pembacaan pasar global.",
      bullets: ["100% sinyal", "Analisis lengkap", "Edukasi bertahap", "Pasar global"],
      cta: "Lihat Kanal Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Kanal Gratis Semut",
      subtitle: "Pintu masuk ke ekosistem Varejo Investidor",
      description: "Terima sinyal gratis, analisis pasar, wawasan global, dan konten finansial harian langsung di WhatsApp.",
      details: [
        "Mulai langkah pertama di pasar internasional dengan memahami Forex, emas, minyak, indeks, mata uang global, dan struktur finansial.",
        "Kanal Semut dibuat untuk membantu investor umum keluar dari level dasar, membangun disiplin, membaca pasar, dan berkembang menuju level Serigala dan Elang Harpy.",
      ],
      bullets: ["Akses gratis", "Konten harian", "Dasar Semut", "WhatsApp"],
      highlights: ["Sinyal gratis", "Konten harian", "Pasar internasional", "Pertumbuhan finansial", "Struktur jangka panjang"],
      cta: "MASUK KANAL GRATIS",
      href: "free",
      kind: "free",
    },
  ],
};

const compactServicesFallbackByLocale = {
} as const;

const elitePackagesFallbackByLocale = {
} as const;

const highTicketServices = [
  {
    title: "Mentoria Individual 4 horas",
    description: "Sessão individual para leitura de perfil, estrutura operacional, risco e posicionamento no mercado.",
    workload: "4 horas",
    price: "R$ 4.000,00",
    hourly: "R$ 1.000,00/hora",
    tag: "Atendimento individual",
    deliveries: ["Diagnóstico de perfil", "Leitura de mercado", "Risco operacional", "Direcionamento estratégico"],
    cta: "Solicitar Mentoria 4h",
    href: "https://lastlink.com/p/CD2963C67/checkout-payment",
    kind: "mentoria",
  },
  {
    title: "Mentoria Individual 10 horas",
    description: "Acompanhamento individual para construção de método, organização operacional e evolução estratégica.",
    workload: "10 horas",
    price: "R$ 7.000,00",
    hourly: "R$ 700,00/hora",
    tag: "Vagas limitadas",
    deliveries: ["Construção de método", "Organização operacional", "Leitura de cenário", "Posicionamento global"],
    cta: "Solicitar Mentoria 10h",
    href: "https://lastlink.com/p/C06E583A1/checkout-payment",
    kind: "mentoria",
  },
  {
    title: "Consultoria Gold",
    description: "Consultoria premium para estrutura patrimonial, visão global, estratégia, risco e expansão.",
    capacityNote: "Para garantir acompanhamento individual e qualidade estratégica, esta consultoria possui limite anual de 40 participantes.",
    workload: "6 meses | 30 horas",
    price: "R$ 18.000,00",
    hourly: "R$ 600,00/hora",
    tag: "Vagas limitadas • Máximo 40 clientes por ano",
    deliveries: ["Estruturação financeira", "Gestão de risco", "Leitura institucional", "Clareza estratégica"],
    cta: "Solicitar Consultoria Gold",
    href: "https://lastlink.com/p/C5FB7AC16/checkout-payment",
    kind: "gold",
  },
  {
    title: "Consultoria Platinum",
    description: "Consultoria anual de elite para patrimônio, sucessão, proteção de capital, visão global e expansão estratégica.",
    capacityNote: "A Consultoria Platinum possui capacidade limitada para preservar atendimento personalizado, planejamento patrimonial e acompanhamento estratégico de longo prazo.",
    workload: "Anual | 58 horas",
    price: "R$ 29.000,00",
    hourly: "aprox. R$ 500,00/hora",
    tag: "Exclusivo • Máximo 40 clientes por ano",
    deliveries: ["Visão patrimonial", "Estrutura global", "Sucessão e proteção", "Expansão estratégica"],
    cta: "Solicitar Consultoria Platinum",
    href: "https://lastlink.com/p/C8CE5F9DB/checkout-payment",
    kind: "platinum",
  },
];

const internationalServicesIntro = {
  pt: "",
  en: "Explore Varejo Investidor channels for signals, education, and global market reading.",
  de: "Entdecken Sie die Angebote von Varejo Investidor fuer Signale, Ausbildung und globale Markteinordnung.",
  es: "Conoce los canales de Varejo Investidor para señales, educación y lectura de mercado global.",
  hi: "Varejo Investidor ?? ?????? ?????: WhatsApp ?? ??????, ??????? ??????, ??????? ????? ???????? ?? ????-?????? ????? ?????????",
  ar: "تعرّف إلى قنوات Varejo Investidor للإشارات والتعليم وقراءة السوق العالمية.",
  tr: "Sinyaller, eğitim ve küresel piyasa okuma için Varejo Investidor kanallarını keşfedin.",
  id: "Jelajahi kanal Varejo Investidor untuk sinyal, edukasi, dan pembacaan pasar global.",
  vi: "Khám phá các kênh của Varejo Investidor dành cho tín hiệu, giáo dục và đọc thị trường toàn cầu.",
  th: "สำรวจช่องทางของ Varejo Investidor สำหรับสัญญาณ การศึกษา และการอ่านตลาดโลก",
  ru: "??????? ?????? Varejo Investidor: ??????? ? WhatsApp, ?????????? ????????, ?????? ?????????? ?????? ? ????????? ??? ?????????? ? ????????????? ?????????.",
  pl: "Poznaj us?ugi Varejo Investidor: sygna?y w WhatsApp, edukacj? finansow?, analiz? rynk?w globalnych oraz struktury dla inwestor?w z kapita?em mi?dzynarodowym.",
  tl: "Tuklasin ang mga serbisyo ng Varejo Investidor: WhatsApp signals, financial education, global market analysis, at structures para sa investors na may international capital.",
};

function highTicketTone(kind: string) {
  if (kind === "platinum") {
    return "border-gold bg-ink text-paper shadow-premium";
  }

  if (kind === "gold") {
    return "border-gold/[0.55] bg-gold/[0.08] text-ink";
  }

  return "border-ink/[0.12] bg-paper text-ink";
}

export default function ServicesPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const isPt = locale === "pt";
  const servicesIntro = isPt ? t.servicesPage.text : internationalServicesIntro[locale as keyof typeof internationalServicesIntro] ?? internationalServicesIntro.en;
  const productLabel =
    locale === "en"
      ? "Product"
      : locale === "de"
        ? "Produkt"
      : locale === "es"
        ? "Producto"
        : locale === "hi"
          ? "\u0938\u0947\u0935\u093E"
          : locale === "id"
            ? "Produk"
            : locale === "vi"
              ? "Sản phẩm"
              : "Produto";
  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="services-hero premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <SectionHeader eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} text={servicesIntro} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="services-hero-visual relative min-h-[360px] lg:min-h-[520px]"
          >
            <div className="services-hero-grid" />
            <div className="services-hero-glow" />
            <div className="services-hero-floor" />
            <Image
              src="/characters/services-hero-institutional.png"
              alt="Personagens Formiga, Lobo e Harpia em mesa institucional"
              width={1536}
              height={1024}
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 96vw"
              priority
              className="services-hero-image"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-14 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(201,155,62,0.08),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Canal Elite</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.045em] text-ink md:text-6xl">
              Receba sinais ao vivo pelo WhatsApp.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink/[0.66] md:text-lg">
              {isPt
                ? "Escolha a forma de pagamento do Canal Elite. Clientes no Brasil podem pagar em reais via Lastlink. Clientes internacionais podem assinar em dólar via Stripe."
                : "Subscribe to the Elite Channel in dollars through Stripe and receive access to the private signal structure."}
            </p>
          </div>

          <div className={`mt-10 grid gap-5 ${isPt ? "lg:grid-cols-2" : "mx-auto max-w-3xl"}`}>
            {isPt ? (
              <motion.article
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex min-h-[560px] flex-col overflow-hidden border border-gold/[0.28] bg-gradient-to-br from-ink via-[#07110d] to-ink p-6 text-paper shadow-premium md:p-8"
              >
                <div className="absolute right-0 top-0 h-72 w-72 bg-gold/[0.08] blur-3xl" />
                <div className="relative flex h-full flex-col">
                  <span className="w-fit bg-gold px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-ink">Pagamento Brasil</span>
                  <h3 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.045em]">Lastlink</h3>
                  <p className="mt-4 text-base leading-8 text-paper/[0.68]">
                    Pagamento nacional em reais para acesso ao Canal Elite.
                  </p>
                  <div className="mt-7 grid gap-3">
                    {elitePtPackages.map(([period, price, badge]) => (
                      <div key={period} className="grid gap-3 border border-gold/[0.16] bg-paper/[0.045] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/[0.52]">{period}</p>
                          <p className="mt-2 font-serif text-3xl tracking-[-0.04em] text-gold">{price}</p>
                        </div>
                        {badge ? <span className="w-fit border border-gold/[0.36] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-gold">{badge}</span> : null}
                      </div>
                    ))}
                  </div>
                  <a
                    href={ELITE_LASTLINK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d8ad52]"
                  >
                    Pagar em reais
                  </a>
                </div>
              </motion.article>
            ) : null}

            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative flex min-h-[560px] flex-col overflow-hidden border border-gold/[0.22] bg-gradient-to-br from-ink via-[#06111f] to-ink p-6 text-paper shadow-premium md:p-8"
            >
              <div className="absolute right-0 top-0 h-72 w-72 bg-sky-500/[0.07] blur-3xl" />
              <div className="relative flex h-full flex-col">
                <span className="w-fit border border-gold/[0.42] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-gold">{isPt ? "Pagamento Internacional" : "International Payment"}</span>
                <h3 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.045em]">Stripe</h3>
                <p className="mt-4 text-base leading-8 text-paper/[0.68]">
                  {isPt ? "Assinatura internacional em dólar para clientes fora do Brasil." : "International subscription in dollars through Stripe."}
                </p>
                <div className="mt-7 grid gap-3">
                  {[
                    ["Monthly", "US$30"],
                    ["3 Months", "US$80"],
                    ["6 Months", "US$145"],
                    ["Annual", "US$240"],
                  ].map(([period, price], index) => (
                    <div key={period} className="grid gap-3 border border-gold/[0.14] bg-paper/[0.04] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/[0.52]">{period}</p>
                        <p className="mt-2 font-serif text-3xl tracking-[-0.04em] text-gold">{price}</p>
                      </div>
                      <a
                        href={ELITE_STRIPE_LINKS[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border border-gold/[0.42] px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                      >
                        {isPt ? "Assinar" : "Subscribe"}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section id="patrimonial-structures" className="relative overflow-hidden border-y border-gold/[0.16] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="absolute right-12 top-12 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">Select | Private</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {isPt ? "Estruturas patrimoniais do Varejo Investidor" : "Varejo Investidor wealth structures"}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">
              {isPt
                ? "Duas camadas para investidores que desejam exposição global, automação operacional ou estrutura patrimonial institucional."
                : "Two layers for investors seeking global exposure, operational automation, or institutional wealth structure."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {(wealthServicesByLocale[locale] ?? wealthServicesByLocale.en).map((service) => (
              <motion.article
                key={service.href}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative flex min-h-[520px] flex-col overflow-hidden border p-6 shadow-premium transition duration-300 hover:-translate-y-1 md:p-8 ${
                  service.href === "/private"
                    ? "border-gold/[0.42] bg-gradient-to-br from-gold/[0.12] via-paper/[0.045] to-ink"
                    : "border-gold/[0.26] bg-paper/[0.04]"
                }`}
              >
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/[0.08] blur-3xl" />
                <div className="relative flex h-full flex-col">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{service.eyebrow}</p>
                  <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.045em] md:text-5xl">{service.title}</h2>
                  <p className="mt-5 font-serif text-2xl leading-[1.14] tracking-[-0.035em] text-gold">{service.subtitle}</p>
                  <p className="mt-5 text-base leading-8 text-paper/[0.7]">{service.description}</p>

                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {service.highlights.map((item) => (
                      <p key={item} className="border border-gold/[0.16] bg-paper/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper/[0.72]">
                        {item}
                      </p>
                    ))}
                  </div>

                  <a
                    href={service.href}
                    className="premium-button-gold mt-auto inline-flex w-full items-center justify-center border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d8ad52]"
                  >
                    {service.cta}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>


      {isPt ? (
        <section id="domine-ichimoku" className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-14 text-paper md:px-8 md:py-20">
          <div className="absolute inset-0 terminal-grid opacity-18" />
          <div className="absolute right-12 top-10 h-64 w-64 bg-gold/[0.055] blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Produto educacional</p>
              <h2 className="mt-4 font-serif text-4xl uppercase leading-[1.02] tracking-[-0.04em] text-paper md:text-6xl">
                Domine o Ichimoku
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.7] md:text-lg">
                Ebook completo + aula gravada para aprender a interpretar o Ichimoku em diferentes mercados financeiros.
              </p>
            </div>

            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeUp}
              className="mt-9 grid gap-6 border border-gold/[0.32] bg-paper/[0.045] p-5 shadow-premium md:grid-cols-[180px_1fr_auto] md:items-center md:p-7"
            >
              <div className="mx-auto w-full max-w-[180px] border border-gold/[0.24] bg-paper/[0.06] p-2">
                <Image
                  src="/products/ebook-ichimoku.png"
                  alt="Capa do ebook Domine o Ichimoku"
                  width={512}
                  height={768}
                  className="h-auto max-h-[260px] w-full object-contain"
                  sizes="180px"
                />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Ebook + aula gravada</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-paper md:text-5xl">
                  Domine o Ichimoku
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-paper/[0.7]">
                  Aprenda os fundamentos do Ichimoku, seus principais componentes e como interpretar tendência, suporte, resistência, momentum e contexto de mercado com mais clareza.
                </p>
              </div>

              <div className="min-w-[230px] border border-gold/[0.24] bg-ink/[0.5] p-5 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Preço</p>
                <p className="mt-3 font-serif text-5xl tracking-[-0.05em] text-paper">R$ 79,90</p>
                <a
                  href={ICHIMOKU_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-1 hover:bg-[#d8ad52] hover:shadow-[0_0_22px_rgba(201,155,62,0.22)]"
                >
                  Comprar agora
                </a>
              </div>
            </motion.article>
          </div>
        </section>
      ) : null}

      {isPt ? (
        <section id="mentorias" className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Serviços estratégicos"
              title="Mentorias e consultorias"
              text="Produtos individuais para operação, leitura de mercado, estrutura patrimonial e expansão estratégica."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {highTicketServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  variants={fadeUp}
                  className={`relative overflow-hidden border p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-8 ${highTicketTone(service.kind)}`}
                >
                  <div className={service.kind === "platinum" ? "absolute inset-0 terminal-grid opacity-25" : "absolute inset-0 luxury-grid opacity-35"} />
                  <div className="absolute right-6 top-8 h-24 w-24 rounded-full bg-gold/[0.1] blur-3xl" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${service.kind === "platinum" ? "border-gold bg-gold text-ink" : "border-gold text-gold"}`}>
                        {service.tag}
                      </span>
                      <span className={`font-mono text-xs uppercase tracking-[0.18em] ${service.kind === "platinum" ? "text-paper/[0.54]" : "text-ink/[0.48]"}`}>
                        {service.workload}
                      </span>
                    </div>

                    <h2 className="mt-7 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
                      {service.title}
                    </h2>
                    <p className={`mt-5 text-lg leading-8 ${service.kind === "platinum" ? "text-paper/[0.72]" : "text-ink/[0.66]"}`}>
                      {service.description}
                    </p>
                    {"capacityNote" in service ? (
                      <p
                        className={`mt-4 border-l border-gold/[0.55] pl-4 text-sm font-semibold leading-7 ${
                          service.kind === "platinum" ? "text-paper/[0.78]" : "text-ink/[0.72]"
                        }`}
                      >
                        {service.capacityNote}
                      </p>
                    ) : null}

                    <div className="mt-7 border-y border-gold/[0.22] py-6">
                      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${service.kind === "platinum" ? "text-gold" : "text-ink/[0.46]"}`}>
                        Investimento
                      </p>
                      <p className="mt-3 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">
                        {service.price}
                      </p>
                      <p className={`mt-3 font-mono text-xs uppercase tracking-[0.2em] ${service.kind === "platinum" ? "text-gold/[0.78]" : "text-gold"}`}>
                        {service.hourly}
                      </p>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.deliveries.map((delivery) => (
                        <p
                          key={delivery}
                          className={`border-l pl-4 text-sm leading-7 ${
                            service.kind === "platinum" ? "border-gold text-paper/[0.76]" : "border-ink/[0.24] text-ink/[0.68]"
                          }`}
                        >
                          {delivery}
                        </p>
                      ))}
                    </div>

                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 block w-full border px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
                        service.kind === "platinum"
                          ? "border-gold bg-gold text-ink hover:border-paper hover:bg-paper"
                          : "border-ink bg-ink text-paper hover:border-gold hover:bg-gold hover:text-ink"
                      }`}
                    >
                      {service.cta}
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {false && isPt ? (
        <section className="hidden">
          <div className="absolute inset-0 terminal-grid opacity-18" />
          <div className="absolute right-12 top-10 h-64 w-64 bg-gold/[0.055] blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Produto educacional</p>
              <h2 className="mt-4 font-serif text-4xl uppercase leading-[1.02] tracking-[-0.04em] text-paper md:text-6xl">
                Domine o Ichimoku
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.7] md:text-lg">
                Ebook completo + aula gravada para aprender a interpretar o Ichimoku em diferentes mercados financeiros.
              </p>
            </div>

            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={fadeUp}
              className="mt-9 grid gap-6 border border-gold/[0.32] bg-paper/[0.045] p-5 shadow-premium md:grid-cols-[180px_1fr_auto] md:items-center md:p-7"
            >
              <div className="mx-auto w-full max-w-[180px] border border-gold/[0.24] bg-paper/[0.06] p-2">
                <Image
                  src="/products/ebook-ichimoku.png"
                  alt="Capa do ebook Domine o Ichimoku"
                  width={512}
                  height={768}
                  className="h-auto max-h-[260px] w-full object-contain"
                  sizes="180px"
                />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Ebook + aula gravada</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-paper md:text-5xl">
                  Domine o Ichimoku
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-paper/[0.7]">
                  Aprenda os fundamentos do Ichimoku, seus principais componentes e como interpretar tendência, suporte,
                  resistência, momentum e contexto de mercado com mais clareza.
                </p>
              </div>

              <div className="min-w-[230px] border border-gold/[0.24] bg-ink/[0.5] p-5 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Preço</p>
                <p className="mt-3 font-serif text-5xl tracking-[-0.05em] text-paper">R$ 79,90</p>
                <a
                  href={ICHIMOKU_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-1 hover:bg-[#d8ad52] hover:shadow-[0_0_22px_rgba(201,155,62,0.22)]"
                >
                  Comprar agora
                </a>
              </div>
            </motion.article>
          </div>
        </section>
      ) : null}

      {isPt ? (
        <section className="relative overflow-hidden border-y border-gold/[0.16] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
          <div className="absolute inset-0 terminal-grid opacity-20" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                Capacidade operacional
              </p>
              <h2 className="mt-4 font-serif text-4xl uppercase leading-[1.02] tracking-[-0.04em] md:text-6xl">
                Atendimento limitado por capacidade operacional
              </h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-paper/[0.72] md:text-lg">
                <p>
                  O Varejo Investidor trabalha com número reduzido de clientes em consultorias estratégicas. O objetivo é preservar qualidade, acompanhamento individual e profundidade na construção patrimonial.
                </p>
                <p>
                  Por esse motivo, as consultorias Gold e Platinum possuem limite máximo de 40 participantes por ano.
                </p>
                <p>
                  As vagas são preenchidas conforme disponibilidade operacional.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                ["40 vagas anuais", "Consultoria Gold"],
                ["40 vagas anuais", "Consultoria Platinum"],
              ].map(([limit, name]) => (
                <article
                  key={name}
                  className="relative overflow-hidden border border-gold/[0.28] bg-paper/[0.04] p-6 transition hover:-translate-y-1 hover:border-gold hover:bg-gold/[0.07] md:p-8"
                >
                  <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-gold/[0.12] blur-2xl" />
                  <div className="relative">
                    <p className="font-serif text-5xl leading-none tracking-[-0.05em] text-gold md:text-6xl">40</p>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-paper/[0.62]">{limit.replace("40 ", "")}</p>
                    <h3 className="mt-6 text-lg font-black uppercase tracking-[0.14em] text-paper">{name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ContactSection t={t} />

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
