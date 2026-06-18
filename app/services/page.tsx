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
      subtitle: "Gest?o operacional para investidores que desejam exposi??o aos mercados globais.",
      description: "Estrutura para investidores com aplica??o m?nima de R$ 250.000 ou US$ 50.000, com exposi??o a Forex, a??es, criptomoedas e mercados internacionais.",
      cta: "Conhecer Select",
      href: "/select",
      highlights: ["R$ 250.000 m?nimo", "US$ 50.000 internacional", "Forex", "A??es", "Criptomoedas", "C?pia autom?tica"],
    },
    {
      eyebrow: "Estrutura patrimonial",
      title: "Varejo Investidor Private",
      subtitle: "Estrutura patrimonial global para investidores acima de US$ 1.000.000.",
      description: "Organiza??o, prote??o e expans?o internacional de patrim?nio para investidores, empres?rios e fam?lias com capital global.",
      cta: "Conhecer Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Prote??o global", "Multi jurisdi??o", "Capital internacional", "Longo prazo", "Continuidade patrimonial"],
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
      highlights: ["US$ 50,000 minimum allocation", "Forex", "Stocks", "Crypto", "Automated copy"],
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
      subtitle: "Gesti?n operativa para inversores que desean exposici?n a los mercados globales.",
      description: "Estructura para inversores con asignaci?n m?nima de US$ 50.000, con exposici?n a Forex, acciones, criptoactivos y mercados internacionales.",
      cta: "Conocer Select",
      href: "/select",
      highlights: ["US$ 50.000 m?nimo", "Forex", "Acciones", "Criptoactivos", "Copia autom?tica"],
    },
    {
      eyebrow: "Estructura patrimonial",
      title: "Varejo Investidor Private",
      subtitle: "Estructura patrimonial global para inversores por encima de US$ 1.000.000.",
      description: "Organizaci?n, protecci?n y expansi?n internacional de patrimonio para inversores, empresarios y familias con capital global.",
      cta: "Conocer Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Protecci?n global", "Multijurisdicci?n", "Capital internacional", "Largo plazo", "Continuidad patrimonial"],
    },
  ],
  fr: [
    {
      eyebrow: "Structure op?rationnelle",
      title: "Varejo Investidor Select",
      subtitle: "Gestion op?rationnelle pour les investisseurs qui souhaitent une exposition aux march?s mondiaux.",
      description: "Structure destin?e aux investisseurs avec une allocation minimale de US$ 50 000, expos?e au Forex, aux actions, aux cryptoactifs et aux march?s internationaux.",
      cta: "D?couvrir Select",
      href: "/select",
      highlights: ["Allocation minimale US$ 50 000", "Forex", "Actions", "Cryptoactifs", "Copie automatis?e"],
    },
    {
      eyebrow: "Structure patrimoniale",
      title: "Varejo Investidor Private",
      subtitle: "Structure patrimoniale mondiale pour les investisseurs au-dessus de US$ 1 000 000.",
      description: "Organisation, protection et expansion internationale du patrimoine pour investisseurs, entrepreneurs et familles avec capital global.",
      cta: "D?couvrir Private",
      href: "/private",
      highlights: ["US$ 1 000 000+", "Protection globale", "Multi-juridiction", "Capital international", "Long terme", "Continuit? patrimoniale"],
    },
  ],
  hi: [
    {
      eyebrow: "??????? ??????",
      title: "Varejo Investidor Select",
      subtitle: "??????? ??????? ??? ????????? ????? ???? ???????? ?? ??? ??????? ????????",
      description: "US$ 50,000 ??????? ????? ???? ???????? ?? ??? Forex, ????, ???????? ?? ????????????? ??????? ?? ???????",
      cta: "Select ?????",
      href: "/select",
      highlights: ["US$ 50,000 ???????", "Forex", "????", "????????", "???????? ????"],
    },
    {
      eyebrow: "??????? ??????",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000 ?? ??? ?? ???????? ?? ??? ??????? ??????? ???????",
      description: "??????? ????? ???? ????????, ????????? ?? ???????? ?? ??? ????????????? ??????? ?????, ??????? ?? ????????",
      cta: "Private ?????",
      href: "/private",
      highlights: ["US$ 1,000,000+", "??????? ???????", "?????-????????????", "????????????? ?????", "????????", "??????? ????????"],
    },
  ],
  ar: [
    {
      eyebrow: "???? ??????",
      title: "Varejo Investidor Select",
      subtitle: "????? ??????? ?????????? ???????? ?? ?????? ??????? ????????.",
      description: "???? ?????????? ??? ???? US$ 50,000 ?? ???? ??????? ??????? ???????? ??????? ???????? ???????.",
      cta: "????? ??? Select",
      href: "/select",
      highlights: ["?? ???? US$ 50,000", "???????", "??????", "?????? ???????", "??? ??????"],
    },
    {
      eyebrow: "???? ????",
      title: "Varejo Investidor Private",
      subtitle: "???? ???? ????? ?????????? ??? US$ 1,000,000.",
      description: "????? ?????? ?????? ?????? ?????? ?????????? ????? ??????? ????????? ??? ??? ????? ???????.",
      cta: "????? ??? Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "????? ??????", "???? ??????????", "??? ??? ????", "???? ?????", "????????? ??????"],
    },
  ],
  tr: [
    {
      eyebrow: "Operasyonel yap?",
      title: "Varejo Investidor Select",
      subtitle: "K?resel piyasalara maruz kalmak isteyen yat?r?mc?lar i?in operasyonel y?netim.",
      description: "US$ 50.000 minimum sermayeye sahip yat?r?mc?lar i?in Forex, hisseler, kripto varl?klar ve uluslararas? piyasa yap?s?.",
      cta: "Select'i tan?",
      href: "/select",
      highlights: ["US$ 50.000 minimum", "Forex", "Hisseler", "Kripto", "Otomatik kopyalama"],
    },
    {
      eyebrow: "Varl?k yap?s?",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1.000.000 ?zeri yat?r?mc?lar i?in k?resel varl?k yap?s?.",
      description: "K?resel sermayeye sahip yat?r?mc?lar, giri?imciler ve aileler i?in uluslararas? varl?k organizasyonu, koruma ve b?y?me.",
      cta: "Private'? tan?",
      href: "/private",
      highlights: ["US$ 1.000.000+", "K?resel koruma", "?oklu yarg? alan?", "Uluslararas? sermaye", "Uzun vade", "Varl?k s?reklili?i"],
    },
  ],
  id: [
    {
      eyebrow: "Struktur operasional",
      title: "Varejo Investidor Select",
      subtitle: "Manajemen operasional untuk investor yang ingin eksposur ke pasar global.",
      description: "Struktur untuk investor dengan alokasi minimum US$ 50.000, dengan eksposur ke Forex, saham, kripto, dan pasar internasional.",
      cta: "Lihat Select",
      href: "/select",
      highlights: ["Alokasi minimum US$ 50.000", "Forex", "Saham", "Kripto", "Copy otomatis"],
    },
    {
      eyebrow: "Struktur kekayaan",
      title: "Varejo Investidor Private",
      subtitle: "Struktur kekayaan global untuk investor di atas US$ 1.000.000.",
      description: "Organisasi, perlindungan, dan ekspansi kekayaan internasional untuk investor, pengusaha, dan keluarga dengan modal global.",
      cta: "Lihat Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "Perlindungan global", "Multi-yurisdiksi", "Modal internasional", "Jangka panjang", "Kontinuitas kekayaan"],
    },
  ],
  vi: [
    {
      eyebrow: "C?u tr?c v?n h?nh",
      title: "Varejo Investidor Select",
      subtitle: "Qu?n l? v?n h?nh cho nh? ??u t? mu?n ti?p c?n th? tr??ng to?n c?u.",
      description: "C?u tr?c d?nh cho nh? ??u t? c? m?c ph?n b? t?i thi?u US$ 50.000, v?i Forex, c? phi?u, ti?n ?i?n t? v? th? tr??ng qu?c t?.",
      cta: "T?m hi?u Select",
      href: "/select",
      highlights: ["T?i thi?u US$ 50.000", "Forex", "C? phi?u", "Ti?n ?i?n t?", "Sao ch?p t? ??ng"],
    },
    {
      eyebrow: "C?u tr?c t?i s?n",
      title: "Varejo Investidor Private",
      subtitle: "C?u tr?c t?i s?n to?n c?u cho nh? ??u t? tr?n US$ 1.000.000.",
      description: "T? ch?c, b?o v? v? m? r?ng t?i s?n qu?c t? cho nh? ??u t?, doanh nh?n v? gia ??nh c? v?n to?n c?u.",
      cta: "T?m hi?u Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "B?o v? to?n c?u", "?a khu v?c ph?p l?", "V?n qu?c t?", "D?i h?n", "Ti?p n?i t?i s?n"],
    },
  ],
  ru: [
    {
      eyebrow: "???????????? ?????????",
      title: "Varejo Investidor Select",
      subtitle: "???????????? ?????????? ??? ??????????, ??????? ????? ?????????? ?? ?????????? ?????.",
      description: "????????? ??? ?????????? ? ??????????? ????????? US$ 50.000 ? ???????? ? Forex, ??????, ????????????? ? ????????????? ??????.",
      cta: "?????? Select",
      href: "/select",
      highlights: ["??????? US$ 50.000", "Forex", "?????", "????????????", "???????????????"],
    },
    {
      eyebrow: "????????? ????????",
      title: "Varejo Investidor Private",
      subtitle: "?????????? ????????? ???????? ??? ?????????? ????? US$ 1.000.000.",
      description: "????????????? ???????????, ?????? ? ?????????? ???????? ??? ??????????, ???????????????? ? ????? ? ?????????? ?????????.",
      cta: "?????? Private",
      href: "/private",
      highlights: ["US$ 1.000.000+", "?????????? ??????", "????????????????", "????????????? ???????", "?????? ????", "??????????????? ????????"],
    },
  ],
  th: [
    {
      eyebrow: "?????????????????????",
      title: "Varejo Investidor Select",
      subtitle: "?????????????????????????????????????????????????????????????",
      description: "???????????????????????????????????????????? US$ 50,000 ??????????????? Forex ???? ?????? ?????????????????",
      cta: "?? Select",
      href: "/select",
      highlights: ["??????? US$ 50,000", "Forex", "????", "??????", "???????????????"],
    },
    {
      eyebrow: "??????????????????",
      title: "Varejo Investidor Private",
      subtitle: "??????????????????????????????????????????????? US$ 1,000,000",
      description: "????????????? ?????? ??????????????????????????????????????????? ???????????? ???????????????????????????",
      cta: "?? Private",
      href: "/private",
      highlights: ["US$ 1,000,000+", "?????????????????", "????????????", "????????????????", "???????", "?????????????????????????"],
    },
  ],
  bn: [
    {
      eyebrow: "????????? ??????",
      title: "Varejo Investidor Select",
      subtitle: "??????? ???????? ????????? ??? ??? ??????????????? ???? ????????? ?????????????",
      description: "US$ 50,000 ??????? ???????? ??????????????? ???? Forex, ????, ???????? ??? ??????????? ??????? ???????",
      cta: "Select ?????",
      href: "/select",
      highlights: ["US$ 50,000 ???????", "Forex", "????", "????????", "???????????? ???"],
    },
    {
      eyebrow: "????? ??????",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000-?? ???? ??????????????? ???? ??????? ????? ???????",
      description: "??????? ????? ???? ????????????, ????????? ??? ???????? ???? ??????????? ????? ?????, ??????? ? ???????????",
      cta: "Private ?????",
      href: "/private",
      highlights: ["US$ 1,000,000+", "??????? ???????", "??????-??????????", "??????????? ?????", "???????????", "????? ???????????"],
    },
  ],
  ja: [
    {
      eyebrow: "????",
      title: "Varejo Investidor Select",
      subtitle: "?????????????????????????????",
      description: "US$ 50,000??????????Forex?????????????????????????????????",
      cta: "Select???",
      href: "/select",
      highlights: ["??US$ 50,000", "Forex", "??", "????", "?????"],
    },
    {
      eyebrow: "????",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000?????????????????",
      description: "???????????????????????????????????????",
      cta: "Private???",
      href: "/private",
      highlights: ["US$ 1,000,000+", "???????", "????", "????", "??", "????"],
    },
  ],
  ko: [
    {
      eyebrow: "?? ??",
      title: "Varejo Investidor Select",
      subtitle: "??? ?? ??? ??? ???? ?? ?? ??.",
      description: "?? US$ 50,000 ???? ?? Forex, ??, ????, ?? ?? ?? ?????.",
      cta: "Select ??",
      href: "/select",
      highlights: ["?? US$ 50,000", "Forex", "??", "????", "?? ??"],
    },
    {
      eyebrow: "?? ??",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000 ??? ???? ?? ??? ?? ??.",
      description: "??? ??? ??? ???, ???, ??? ?? ?? ?? ??, ??, ??.",
      cta: "Private ??",
      href: "/private",
      highlights: ["US$ 1,000,000+", "??? ??", "?? ???", "?? ??", "??", "?? ???"],
    },
  ],
  ur: [
    {
      eyebrow: "??????? ????",
      title: "Varejo Investidor Select",
      subtitle: "????? ?????? ?? ????? ????? ???? ?????? ????? ?? ??? ??????? ????????",
      description: "US$ 50,000 ?? ?? ?? ?????? ????? ????? ?? ??? Forex? ??????? ????? ??? ??? ???????? ?????? ?? ?????",
      cta: "Select ??????",
      href: "/select",
      highlights: ["?? ?? ?? US$ 50,000", "Forex", "??????", "?????", "?????? ????"],
    },
    {
      eyebrow: "???? ?? ????",
      title: "Varejo Investidor Private",
      subtitle: "US$ 1,000,000 ?? ???? ?????? ????? ?? ??? ????? ???? ?? ?????",
      description: "????? ?????? ????? ???? ?????? ?????? ???????? ????? ??? ???????? ?? ??? ??? ???????? ???? ?? ?????? ???? ??? ??????",
      cta: "Private ??????",
      href: "/private",
      highlights: ["US$ 1,000,000+", "????? ????", "???? ????? ??????", "??? ???????? ??????", "???? ???", "???? ?? ?????"],
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
  es: [
    {
      title: "Canal Elite",
      description: "Producto principal con señales en vivo, análisis de mercado, clases grabadas y lectura global de mercado.",
      bullets: ["100% de las señales", "Análisis completos", "Educación por niveles", "Mercado global"],
      cta: "Conocer el Canal Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Canal Formiga",
      subtitle: "Entrada inicial al ecosistema Varejo Investidor",
      description: "Reciba señales gratuitas, análisis de mercado, lectura global y contenidos financieros diarios directamente en WhatsApp.",
      details: [
        "Comience sus primeros pasos en el mercado internacional entendiendo Forex, oro, petróleo, índices, monedas globales y estructura financiera.",
        "El Canal Formiga fue creado para ayudar a inversores comunes a salir de la base financiera, desarrollar disciplina, lectura de mercado y evolucionar hacia el nivel Lobo y Harpia.",
      ],
      bullets: ["Acceso gratuito", "Contenido diario", "Base Formiga", "WhatsApp"],
      highlights: ["Señales gratuitas", "Contenido diario", "Mercado internacional", "Evolución financiera", "Estructura a largo plazo"],
      cta: "ENTRAR AL CANAL FORMIGA",
      href: "free",
      kind: "free",
    },
  ],
  hi: [
    {
      title: "\u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932",
      description: "\u0932\u093E\u0907\u0935 \u0938\u093F\u0917\u094D\u0928\u0932, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923, \u0930\u093F\u0915\u0949\u0930\u094D\u0921\u0947\u0921 \u0915\u094D\u0932\u093E\u0938 \u0914\u0930 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0930\u0940\u0921\u093F\u0902\u0917 \u0935\u093E\u0932\u093E \u092E\u0941\u0916\u094D\u092F \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F\u0964",
      bullets: ["100% \u0938\u093F\u0917\u094D\u0928\u0932", "\u092A\u0942\u0930\u094D\u0923 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923", "\u0938\u094D\u0924\u0930-\u0906\u0927\u093E\u0930\u093F\u0924 \u0936\u093F\u0915\u094D\u0937\u093E", "\u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F"],
      cta: "\u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932 \u0926\u0947\u0916\u0947\u0902",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "\u092B\u0949\u0930\u094D\u092E\u093F\u0917\u093E \u092B\u094D\u0930\u0940 \u091A\u0948\u0928\u0932",
      subtitle: "Varejo Investidor \u0907\u0915\u094B\u0938\u093F\u0938\u094D\u091F\u092E \u0915\u093E \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u092A\u094D\u0930\u0935\u0947\u0936",
      description: "WhatsApp \u092A\u0930 \u0938\u0940\u0927\u0947 \u092E\u0941\u092B\u094D\u0924 \u0938\u093F\u0917\u094D\u0928\u0932, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923, \u0917\u094D\u0932\u094B\u092C\u0932 \u0930\u0940\u0921\u093F\u0902\u0917 \u0914\u0930 \u0926\u0948\u0928\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0915\u0902\u091F\u0947\u0902\u091F \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964",
      details: [
        "Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932, \u0907\u0902\u0921\u093F\u0938\u0947\u0938, \u0917\u094D\u0932\u094B\u092C\u0932 \u0915\u0930\u0947\u0902\u0938\u0940 \u0914\u0930 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u0915\u094B \u0938\u092E\u091D\u0924\u0947 \u0939\u0941\u090F \u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930 \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 \u092A\u0939\u0932\u0947 \u0915\u0926\u092E \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
        "Formiga Channel \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0928\u093F\u0935\u0947\u0936\u0915\u094B\u0902 \u0915\u094B \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0906\u0927\u093E\u0930 \u0938\u094D\u0924\u0930 \u0938\u0947 \u092C\u093E\u0939\u0930 \u0928\u093F\u0915\u0932\u0928\u0947, \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0935\u093F\u0915\u0938\u093F\u0924 \u0915\u0930\u0928\u0947, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0938\u092E\u091D \u092C\u0922\u093C\u093E\u0928\u0947 \u0914\u0930 Lobo \u0924\u0925\u093E Harpia \u0938\u094D\u0924\u0930 \u0924\u0915 \u0935\u093F\u0915\u0938\u093F\u0924 \u0939\u094B\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092C\u0928\u093E\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964",
      ],
      bullets: ["\u092E\u0941\u092B\u094D\u0924 \u092A\u094D\u0930\u0935\u0947\u0936", "\u0926\u0948\u0928\u093F\u0915 \u0915\u0902\u091F\u0947\u0902\u091F", "Formiga \u0906\u0927\u093E\u0930", "WhatsApp"],
      highlights: ["\u092E\u0941\u092B\u094D\u0924 \u0938\u093F\u0917\u094D\u0928\u0932", "\u0926\u0948\u0928\u093F\u0915 \u0915\u0902\u091F\u0947\u0902\u091F", "\u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930", "\u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0935\u093F\u0915\u093E\u0938", "\u0926\u0940\u0930\u094D\u0918\u0915\u093E\u0932\u093F\u0915 \u0938\u0902\u0930\u091A\u0928\u093E"],
      cta: "\u092B\u094D\u0930\u0940 \u091A\u0948\u0928\u0932 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936 \u0915\u0930\u0947\u0902",
      href: "free",
      kind: "free",
    },
  ],
  ar: [
    {
      title: "قناة النخبة",
      description: "المنتج الرئيسي مع إشارات مباشرة وتحليلات ودروس مسجلة وقراءة عالمية للسوق.",
      bullets: ["100% من الإشارات", "تحليلات كاملة", "تعليم بالمستويات", "أسواق عالمية"],
      cta: "تعرف إلى قناة النخبة",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "قناة فورميغا المجانية",
      subtitle: "نقطة الدخول إلى نظام Varejo Investidor",
      description: "استقبل إشارات مجانية وتحليلات للسوق وقراءة عالمية ومحتوى مالي يومي مباشرة عبر واتساب.",
      details: [
        "ابدأ خطواتك الأولى في السوق الدولية بفهم الفوركس والذهب والنفط والمؤشرات والعملات العالمية والهيكل المالي.",
        "تم إنشاء قناة فورميغا لمساعدة المستثمرين الأفراد على الخروج من المستوى الأساسي وتطوير الانضباط وقراءة السوق والتقدم نحو مستويات الذئب والهاربي.",
      ],
      bullets: ["دخول مجاني", "محتوى يومي", "أساس فورميغا", "واتساب"],
      highlights: ["إشارات مجانية", "محتوى يومي", "أسواق دولية", "تطور مالي", "هيكل طويل المدى"],
      cta: "ادخل القناة المجانية",
      href: "free",
      kind: "free",
    },
  ],
  tr: [
    {
      title: "Elite Kanalı",
      description: "Canlı sinyaller, piyasa analizi, kayıtlı dersler ve küresel piyasa okuma sunan ana ürün.",
      bullets: ["Sinyallerin %100'ü", "Tam analiz", "Seviyeli eğitim", "Küresel piyasalar"],
      cta: "Elite Kanalını keşfet",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Ücretsiz Formiga Kanalı",
      subtitle: "Varejo Investidor ekosistemine giriş noktası",
      description: "Ücretsiz sinyaller, piyasa analizleri, küresel okuma ve günlük finans içeriklerini doğrudan WhatsApp üzerinden alın.",
      details: [
        "Forex, altın, petrol, endeksler, küresel para birimleri ve finansal yapıyı anlayarak uluslararası piyasadaki ilk adımlarınızı atın.",
        "Formiga Kanalı, sıradan yatırımcıların finansal temel seviyeden çıkmasına, disiplin ve piyasa okuma geliştirmesine, Kurt ve Harpia seviyelerine ilerlemesine yardımcı olmak için oluşturuldu.",
      ],
      bullets: ["Ücretsiz giriş", "Günlük içerik", "Formiga temeli", "WhatsApp"],
      highlights: ["Ücretsiz sinyaller", "Günlük içerik", "Uluslararası piyasalar", "Finansal gelişim", "Uzun vadeli yapı"],
      cta: "ÜCRETSİZ KANALA GİR",
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
  vi: [
    {
      title: "Kênh Elite",
      description: "Sản phẩm chính với tín hiệu trực tiếp, phân tích thị trường, lớp học ghi sẵn và đọc thị trường toàn cầu.",
      bullets: ["100% tín hiệu", "Phân tích đầy đủ", "Giáo dục theo cấp độ", "Thị trường toàn cầu"],
      cta: "Tìm hiểu Kênh Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Kênh Kiến miễn phí",
      subtitle: "Điểm vào đầu tiên của hệ sinh thái Varejo Investidor",
      description: "Nhận tín hiệu miễn phí, phân tích thị trường, góc nhìn toàn cầu và nội dung tài chính hằng ngày trực tiếp trên WhatsApp.",
      details: [
        "Bắt đầu những bước đầu trong thị trường quốc tế bằng cách hiểu Forex, vàng, dầu, chỉ số, tiền tệ toàn cầu và cấu trúc tài chính.",
        "Kênh Kiến được tạo ra để giúp nhà đầu tư phổ thông rời khỏi nền tảng cơ bản, phát triển kỷ luật, kỹ năng đọc thị trường và tiến tới cấp độ Sói và Đại Bàng Harpy.",
      ],
      bullets: ["Truy cập miễn phí", "Nội dung hằng ngày", "Nền tảng Kiến", "WhatsApp"],
      highlights: ["Tín hiệu miễn phí", "Nội dung hằng ngày", "Thị trường quốc tế", "Phát triển tài chính", "Cấu trúc dài hạn"],
      cta: "VÀO KÊNH MIỄN PHÍ",
      href: "free",
      kind: "free",
    },
  ],
};

const compactServicesFallbackByLocale = {
  th: [
    {
      title: "ช่อง Elite",
      description: "ผลิตภัณฑ์หลักพร้อมสัญญาณสด บทวิเคราะห์ คลาสย้อนหลัง และการอ่านตลาดโลก",
      bullets: ["สัญญาณ 100%", "บทวิเคราะห์ครบ", "การศึกษาตามระดับ", "ตลาดโลก"],
      cta: "ดูช่อง Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "ช่อง Formiga ฟรี",
      subtitle: "จุดเริ่มต้นของระบบ Varejo Investidor",
      description: "รับบทวิเคราะห์เศรษฐกิจ เนื้อหาการศึกษา และอัปเดตตลาดโลกฟรีผ่าน WhatsApp",
      details: ["เริ่มต้นเข้าใจ Forex ทองคำ น้ำมัน ดัชนี สกุลเงินโลก และโครงสร้างการเงิน", "ช่อง Formiga ช่วยให้ผู้ลงทุนทั่วไปสร้างวินัย อ่านตลาด และพัฒนาไปสู่ระดับ Wolf และ Harpy"],
      bullets: ["เข้าฟรี", "เนื้อหารายวัน", "ฐาน Formiga", "WhatsApp"],
      highlights: ["สัญญาณฟรี", "เนื้อหารายวัน", "ตลาดต่างประเทศ", "พัฒนาการเงิน", "โครงสร้างระยะยาว"],
      cta: "เข้าร่วมช่อง FORMIGA",
      href: "free",
      kind: "free",
    },
  ],
  ru: [
    {
      title: "Канал Elite",
      description: "Основной продукт с живыми сигналами, аналитикой, записями занятий и чтением глобальных рынков.",
      bullets: ["100% сигналов", "Полная аналитика", "Обучение по уровням", "Глобальные рынки"],
      cta: "Посмотреть канал Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Бесплатный канал Formiga",
      subtitle: "Точка входа в экосистему Varejo Investidor",
      description: "Получайте экономический анализ, образовательные материалы и обновления по глобальным рынкам прямо в WhatsApp.",
      details: ["Начните с понимания Forex, золота, нефти, индексов, мировых валют и финансовой структуры.", "Канал Formiga помогает частным инвесторам выйти за пределы базового уровня и развить дисциплину, чтение рынка и движение к уровням Wolf и Harpy."],
      bullets: ["Бесплатный доступ", "Ежедневный контент", "База Formiga", "WhatsApp"],
      highlights: ["Бесплатные сигналы", "Ежедневный контент", "Международные рынки", "Финансовое развитие", "Долгосрочная структура"],
      cta: "ВОЙТИ В КАНАЛ FORMIGA",
      href: "free",
      kind: "free",
    },
  ],
  bn: [
    {
      title: "Elite চ্যানেল",
      description: "লাইভ সিগন্যাল, মার্কেট বিশ্লেষণ, রেকর্ডেড ক্লাস এবং গ্লোবাল মার্কেট রিডিংসহ প্রধান পণ্য।",
      bullets: ["১০০% সিগন্যাল", "সম্পূর্ণ বিশ্লেষণ", "স্তরভিত্তিক শিক্ষা", "গ্লোবাল মার্কেট"],
      cta: "Elite চ্যানেল দেখুন",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "ফ্রি Formiga চ্যানেল",
      subtitle: "Varejo Investidor ইকোসিস্টেমের প্রথম প্রবেশদ্বার",
      description: "WhatsApp-এ সরাসরি অর্থনৈতিক বিশ্লেষণ, শিক্ষামূলক কনটেন্ট এবং গ্লোবাল মার্কেট আপডেট পান।",
      details: ["Forex, সোনা, তেল, সূচক, বৈশ্বিক মুদ্রা ও আর্থিক কাঠামো বোঝার মাধ্যমে শুরু করুন।", "Formiga চ্যানেল সাধারণ বিনিয়োগকারীদের শৃঙ্খলা, মার্কেট রিডিং এবং Wolf ও Harpy স্তরের দিকে অগ্রসর হতে সাহায্য করে।"],
      bullets: ["ফ্রি অ্যাক্সেস", "দৈনিক কনটেন্ট", "Formiga ভিত্তি", "WhatsApp"],
      highlights: ["ফ্রি সিগন্যাল", "দৈনিক কনটেন্ট", "আন্তর্জাতিক বাজার", "আর্থিক উন্নয়ন", "দীর্ঘমেয়াদি কাঠামো"],
      cta: "FORMIGA চ্যানেলে যোগ দিন",
      href: "free",
      kind: "free",
    },
  ],
  ja: [
    {
      title: "Eliteチャンネル",
      description: "ライブシグナル、市場分析、録画講座、グローバル市場理解を提供する中核サービス。",
      bullets: ["100%のシグナル", "完全な分析", "レベル別教育", "グローバル市場"],
      cta: "Eliteチャンネルを見る",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "無料アリチャンネル",
      subtitle: "Varejo Investidorエコシステムへの入口",
      description: "経済分析、教育コンテンツ、世界市場の最新情報をWhatsAppで無料で受け取れます。",
      details: ["Forex、金、原油、指数、主要通貨、金融構造の理解から始めます。", "アリチャンネルは基礎を固め、規律と市場理解を育て、WolfとHarpyレベルへ進むための入口です。"],
      bullets: ["無料アクセス", "日々のコンテンツ", "アリ基礎", "WhatsApp"],
      highlights: ["無料シグナル", "日々のコンテンツ", "国際市場", "金融成長", "長期構造"],
      cta: "アリチャンネルに参加",
      href: "free",
      kind: "free",
    },
  ],
  ko: [
    {
      title: "Elite 채널",
      description: "라이브 신호, 시장 분석, 녹화 강의, 글로벌 시장 읽기를 제공하는 핵심 상품입니다.",
      bullets: ["100% 신호", "완전한 분석", "단계별 교육", "글로벌 시장"],
      cta: "Elite 채널 보기",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "무료 개미 채널",
      subtitle: "Varejo Investidor 생태계의 첫 진입점",
      description: "경제 분석, 교육 콘텐츠, 글로벌 시장 업데이트를 WhatsApp에서 무료로 받아보세요.",
      details: ["Forex, 금, 원유, 지수, 글로벌 통화와 금융 구조를 이해하며 시작합니다.", "개미 채널은 일반 투자자가 기초 단계에서 벗어나 규율과 시장 읽기를 발전시키고 Wolf 및 Harpy 단계로 이동하도록 돕습니다."],
      bullets: ["무료 접근", "일일 콘텐츠", "개미 기초", "WhatsApp"],
      highlights: ["무료 신호", "일일 콘텐츠", "국제 시장", "금융 성장", "장기 구조"],
      cta: "개미 채널 참여",
      href: "free",
      kind: "free",
    },
  ],
} as const;

const elitePackagesFallbackByLocale = {
  th: { title: "แพ็กเกจที่มี", cta: "สมัครตอนนี้", items: [["รายเดือน", "US$ 30", ""], ["3 เดือน", "US$ 80", ""], ["6 เดือน", "US$ 145", ""], ["รายปี", "US$ 240", "คุ้มค่าที่สุด"]] },
  ru: { title: "Доступные пакеты", cta: "Подписаться", items: [["Ежемесячно", "US$ 30", ""], ["3 месяца", "US$ 80", ""], ["6 месяцев", "US$ 145", ""], ["Годовой", "US$ 240", "ЛУЧШАЯ ЦЕНА"]] },
  bn: { title: "উপলব্ধ প্যাকেজ", cta: "এখন সাবস্ক্রাইব করুন", items: [["মাসিক", "US$ 30", ""], ["৩ মাস", "US$ 80", ""], ["৬ মাস", "US$ 145", ""], ["বার্ষিক", "US$ 240", "সেরা মূল্য"]] },
  ja: { title: "利用可能なプラン", cta: "今すぐ購読", items: [["月額", "US$ 30", ""], ["3か月", "US$ 80", ""], ["6か月", "US$ 145", ""], ["年額", "US$ 240", "最もお得"]] },
  ko: { title: "이용 가능한 플랜", cta: "지금 구독하기", items: [["월간", "US$ 30", ""], ["3개월", "US$ 80", ""], ["6개월", "US$ 145", ""], ["연간", "US$ 240", "최고 가치"]] },
} as const;

const highTicketServices = [
  {
    title: "Mentoria Individual 4 horas",
    description: "Sessão individual para leitura de perfil, estrutura operacional, risco e posicionamento no mercado.",
    workload: "4 horas",
    price: "R$ 3.200,00",
    hourly: "R$ 800,00/hora",
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
  es: "Conoce los canales de Varejo Investidor para señales, educación y lectura de mercado global.",
  hi: "Varejo Investidor की सेवाएँ देखें: सिग्नल, शिक्षा और वैश्विक बाजार-पठन।",
  ar: "تعرّف إلى قنوات Varejo Investidor للإشارات والتعليم وقراءة السوق العالمية.",
  tr: "Sinyaller, eğitim ve küresel piyasa okuma için Varejo Investidor kanallarını keşfedin.",
  id: "Jelajahi kanal Varejo Investidor untuk sinyal, edukasi, dan pembacaan pasar global.",
  vi: "Khám phá các kênh của Varejo Investidor dành cho tín hiệu, giáo dục và đọc thị trường toàn cầu.",
  th: "สำรวจช่องทางของ Varejo Investidor สำหรับสัญญาณ การศึกษา และการอ่านตลาดโลก",
  ru: "Изучите каналы Varejo Investidor для сигналов, обучения и чтения глобальных рынков.",
  bn: "সিগন্যাল, শিক্ষা এবং গ্লোবাল মার্কেট রিডিংয়ের জন্য Varejo Investidor-এর চ্যানেলগুলো দেখুন।",
  ja: "シグナル、教育、グローバル市場理解のためのVarejo Investidorのチャンネルをご覧ください。",
  ko: "신호, 교육, 글로벌 시장 읽기를 위한 Varejo Investidor 채널을 살펴보세요.",
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
