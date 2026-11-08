"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ELITE_LASTLINK_PLANS_PT } from "../../src/data/eliteLastlinkPricingPt";
import { ElitePaymentCards } from "../../src/components/ElitePaymentCards";
import { InstitutionalServiceCard } from "../../src/components/InstitutionalServiceCard";
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
import { isRtlLocale, localeToHtmlLang, type Locale } from "../../src/i18n/locales";

const ICHIMOKU_PRODUCT_URL = "https://lastlink.com/p/C1EE3F8C4/checkout-payment";
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
      eyebrow: "परिचालन संरचना",
      title: "Varejo Investidor Select",
      subtitle: "वैश्विक बाजार एक्सपोज़र चाहने वाले निवेशकों के लिए परिचालन प्रबंधन।",
      description:
        "न्यूनतम US$50,000 से Forex, शेयर, क्रिप्टो और अंतर्राष्ट्रीय बाजारों तक पहुँच।",
      cta: "Select देखें",
      href: "/select",
      highlights: ["न्यूनतम US$50,000", "Forex", "शेयर", "क्रिप्टो एसेट", "स्वचालित कॉपी"],
    },
    {
      eyebrow: "संपत्ति संरचना",
      title: "Varejo Investidor Private",
      subtitle: "US$1,000,000 से अधिक निवेशकों के लिए वैश्विक संपत्ति संरचना।",
      description:
        "अंतर्राष्ट्रीय पूंजी वाले निवेशकों, उद्यमियों और परिवारों के लिए संगठन, सुरक्षा और विस्तार।",
      cta: "Private देखें",
      href: "/private",
      highlights: ["US$1,000,000+", "वैश्विक सुरक्षा", "कई अधिकार-क्षेत्र", "अंतर्राष्ट्रीय पूंजी", "दीर्घकाल", "संपत्ति निरंतरता"],
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
  he: [
    {
      eyebrow: "מבנה תפעולי",
      title: "Varejo Investidor Select",
      subtitle: "ניהול תפעולי למשקיעים שרוצים חשיפה לשווקים גלובליים.",
      description: "מבנה למשקיעים עם הקצאה מינימלית של US$50,000, חשיפה ל-Forex, מניות, קריפטו ושווקים בינלאומיים.",
      cta: "הכירו את Select",
      href: "/select",
      highlights: ["הקצאה מינימלית US$50,000", "Forex", "מניות", "קריפטו", "העתקה אוטומטית"],
    },
    {
      eyebrow: "מבנה הון",
      title: "Varejo Investidor Private",
      subtitle: "מבנה הון גלובלי למשקיעים מעל US$1,000,000.",
      description: "ארגון, הגנה והתרחבות בינלאומית של הון למשקיעים, עסקים ומשפחות עם הון גלובלי.",
      cta: "הכירו את Private",
      href: "/private",
      highlights: ["US$1,000,000+", "הגנה גלובלית", "ריבוי תחומי שיפוט", "הון בינלאומי", "טווח ארוך", "המשכיות הון"],
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
      eyebrow: "運用構造",
      title: "Varejo Investidor Select",
      subtitle: "世界市場へのエクスポージャーを求める投資家向けの運用管理。",
      description:
        "最低US$50,000から、Forex、株式、暗号資産、国際市場へ配分できる構造です。",
      cta: "Selectを見る",
      href: "/select",
      highlights: ["最低配分 US$50,000", "Forex", "株式", "暗号資産", "自動コピー"],
    },
    {
      eyebrow: "資産構造",
      title: "Varejo Investidor Private",
      subtitle: "US$1,000,000超の投資家向けグローバル資産構造。",
      description:
        "国際資本をお持ちの投資家、事業家、ファミリーのための、資産の整理・保護・拡大。",
      cta: "Privateを見る",
      href: "/private",
      highlights: ["US$1,000,000+", "グローバル保護", "複数法域", "国際資本", "長期", "資産の継続性"],
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

const elitePackagesByLocale = {
  pt: { title: "Pacotes disponíveis", cta: "Assinar agora", items: ELITE_LASTLINK_PLANS_PT },
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
  he: {
    title: "חבילות זמינות",
    cta: "הירשמו עכשיו",
    items: [["חודשי", "US$ 30", ""], ["3 חודשים", "US$ 80", ""], ["6 חודשים", "US$ 145", ""], ["שנתי", "US$ 240", "התמורה הטובה ביותר"]],
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
  hi: "",
  ar: "تعرّف إلى قنوات Varejo Investidor للإشارات والتعليم وقراءة السوق العالمية.",
  he: "גלו את ערוצי Varejo Investidor לסיגנלים, הכשרה וקריאת שוק גלובלית.",
  tr: "Sinyaller, eğitim ve küresel piyasa okuma için Varejo Investidor kanallarını keşfedin.",
  id: "Jelajahi kanal Varejo Investidor untuk sinyal, edukasi, dan pembacaan pasar global.",
  vi: "Khám phá các kênh của Varejo Investidor dành cho tín hiệu, giáo dục và đọc thị trường toàn cầu.",
  th: "สำรวจช่องทางของ Varejo Investidor สำหรับสัญญาณ การศึกษา และการอ่านตลาดโลก",
  ru: "??????? ?????? Varejo Investidor: ??????? ? WhatsApp, ?????????? ????????, ?????? ?????????? ?????? ? ????????? ??? ?????????? ? ????????????? ?????????.",
  pl: "Poznaj us?ugi Varejo Investidor: sygna?y w WhatsApp, edukacj? finansow?, analiz? rynk?w globalnych oraz struktury dla inwestor?w z kapita?em mi?dzynarodowym.",
  tl: "Tuklasin ang mga serbisyo ng Varejo Investidor: WhatsApp signals, financial education, global market analysis, at structures para sa investors na may international capital.",
};

function institutionalCardTone(kind: string): "platinum" | "mentorship" | "elite" | "select" {
  if (kind === "platinum") return "platinum";
  if (kind === "gold") return "elite";
  return "mentorship";
}

const servicesIntlSections: Partial<
  Record<
    Locale,
    {
      eliteBadge: string;
      eliteTitle: string;
      eliteText: string;
      wealthTitle: string;
      wealthText: string;
      heroAlt: string;
    }
  >
> = {
  hi: {
    eliteBadge: "एलीट चैनल",
    eliteTitle: "WhatsApp पर एलीट सिग्नल",
    eliteText:
      "एलीट सदस्यता का भुगतान तरीका चुनें। अंतर्राष्ट्रीय ग्राहक Stripe के माध्यम से अमेरिकी डॉलर में सदस्यता लेते हैं।",
    wealthTitle: "Varejo Investidor संपत्ति संरचनाएँ",
    wealthText:
      "वैश्विक एक्सपोज़र, परिचालन स्वचालन या संस्थागत संपत्ति संरचना चाहने वाले निवेशकों के लिए दो स्तर।",
    heroAlt: "संस्थागत मेज़ पर चींटी, भेड़िया और गरुड़ के पात्र",
  },
  ja: {
    eliteBadge: "エリートチャンネル",
    eliteTitle: "WhatsAppでのエリートシグナル",
    eliteText: "エリートのお支払い方法を選択してください。海外のお客様はStripeで米ドル決済です。",
    wealthTitle: "Varejo Investidorの資産構造",
    wealthText: "グローバルエクスポージャー、運用自動化、または機関的資産構造を求める投資家向けの2層。",
    heroAlt: "機関デスクの蚁・狼・鷹キャラクター",
  },
};

export default function ServicesPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const isPt = locale === "pt";
  const intlSections = servicesIntlSections[locale];
  const servicesIntro =
    isPt || locale === "he" || locale === "hi"
      ? t.servicesPage.text
      : internationalServicesIntro[locale as keyof typeof internationalServicesIntro] ?? internationalServicesIntro.en;
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
    <main lang={localeToHtmlLang(locale)} dir={isRtlLocale(locale) ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
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
              alt={intlSections?.heroAlt ?? "Personagens Formiga, Lobo e Harpia em mesa institucional"}
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
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{intlSections?.eliteBadge ?? "Canal Elite"}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.045em] text-ink md:text-6xl">
              {isPt
                ? "Research Elite no WhatsApp"
                : intlSections?.eliteTitle ?? "Elite Research on WhatsApp"}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink/[0.66] md:text-lg">
              {isPt
                ? "Escolha a forma de pagamento do Canal Elite. Clientes no Brasil pagam em reais via Lastlink. Clientes internacionais assinam em dólar via Stripe."
                : intlSections?.eliteText ??
                  "Choose how to subscribe to Elite Research. International clients pay in dollars through Stripe."}
            </p>
          </div>

          <div className="mt-10">
            <ElitePaymentCards isPt={isPt} />
          </div>
        </div>
      </section>

      <section id="patrimonial-structures" className="relative overflow-hidden border-y border-gold/[0.16] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="absolute right-12 top-12 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">Select | Private</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {isPt
                ? "Estruturas patrimoniais do Varejo Investidor"
                : intlSections?.wealthTitle ?? "Varejo Investidor wealth structures"}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">
              {isPt
                ? "Duas camadas para investidores que desejam exposição global, automação operacional ou estrutura patrimonial institucional."
                : intlSections?.wealthText ??
                  "Two layers for investors seeking global exposure, operational automation, or institutional wealth structure."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {(wealthServicesByLocale[locale] ?? wealthServicesByLocale.en).map((service, index) => (
              <InstitutionalServiceCard
                key={service.href}
                tone={service.href === "/private" ? "platinum" : "select"}
                delay={index * 0.05}
              >
                <p className="inline-block w-fit border border-gold/[0.42] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gold">
                  {service.eyebrow}
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-5xl">{service.title}</h2>
                <p className="mt-4 font-serif text-2xl leading-[1.14] tracking-[-0.04em] text-gold">{service.subtitle}</p>
                <p className="mt-4 text-base leading-8 text-paper/[0.68]">{service.description}</p>

                <div className="mt-6 grid flex-1 gap-2 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <p key={item} className="border border-gold/[0.22] bg-paper/[0.04] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper/[0.72]">
                      {item}
                    </p>
                  ))}
                </div>

                <a
                  href={service.href}
                  className="premium-button-gold mt-6 inline-flex w-full items-center justify-center border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d8ad52]"
                >
                  {service.cta}
                </a>
              </InstitutionalServiceCard>
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
              className="terminal-module relative mt-9 grid gap-6 overflow-hidden border border-gold/[0.32] bg-ink p-5 text-paper shadow-premium md:grid-cols-[180px_1fr_auto] md:items-center md:p-7"
            >
              <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
              <div className="relative mx-auto w-full max-w-[180px] border border-gold/[0.24] bg-paper/[0.06] p-2">
                <Image
                  src="/products/ebook-ichimoku.png"
                  alt="Capa do ebook Domine o Ichimoku"
                  width={512}
                  height={768}
                  className="h-auto max-h-[260px] w-full object-contain"
                  sizes="180px"
                />
              </div>

              <div className="relative">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Ebook + aula gravada</p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-paper md:text-5xl">
                  Domine o Ichimoku
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-paper/[0.7]">
                  Aprenda os fundamentos do Ichimoku, seus principais componentes e como interpretar tendência, suporte, resistência, momentum e contexto de mercado com mais clareza.
                </p>
              </div>

              <div className="relative min-w-[230px] border border-gold/[0.24] bg-paper/[0.04] p-5 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Preço</p>
                <p className="mt-3 font-mono text-3xl font-bold tracking-[-0.04em] text-paper">R$ 79,90</p>
                <a
                  href={ICHIMOKU_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-gold mt-5 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-1 hover:bg-[#d8ad52]"
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
                <InstitutionalServiceCard key={service.title} tone={institutionalCardTone(service.kind)} delay={index * 0.05}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-ink">
                      {service.tag}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/[0.52]">{service.workload}</span>
                  </div>

                  <h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-5xl">{service.title}</h2>
                  <p className="mt-4 text-base leading-8 text-paper/[0.68]">{service.description}</p>
                  {"capacityNote" in service ? (
                    <p className="mt-4 border-l border-gold/[0.55] pl-4 text-sm font-semibold leading-7 text-paper/[0.78]">
                      {service.capacityNote}
                    </p>
                  ) : null}

                  <div className="mt-6 border border-gold/[0.22] bg-paper/[0.04] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Investimento</p>
                    <p className="mt-3 font-mono text-3xl font-bold tracking-[-0.04em] text-paper md:text-4xl">{service.price}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-paper/[0.55]">{service.hourly}</p>
                  </div>

                  <div className="mt-6 grid flex-1 gap-2 sm:grid-cols-2">
                    {service.deliveries.map((delivery) => (
                      <p key={delivery} className="border border-gold/[0.16] bg-paper/[0.04] px-4 py-3 text-sm leading-7 text-paper/[0.76]">
                        {delivery}
                      </p>
                    ))}
                  </div>

                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button-gold mt-6 block w-full border border-gold bg-gold px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                  >
                    {service.cta}
                  </a>
                </InstitutionalServiceCard>
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
