import type { Locale } from "../i18n";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "./marketContent";

export type InsightCategoryKey =
  | "macro"
  | "forex"
  | "stocks"
  | "crypto"
  | "commodities"
  | "etfs"
  | "risk"
  | "wealth";

export type InsightPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  category: InsightCategoryKey;
  author: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
  content: string[];
  relatedPosts: string[];
  seoTitle: string;
  seoDescription: string;
};

export const insightsBasePath: Record<Locale, string> = {
  pt: "/artigos-globais",
  en: "/global-articles",
  es: "/articulos-globales",
  fr: "/fr/articles",
  hi: "/global-articles-hi",
  ar: "/ar/global-articles",
  tr: "/tr/global-articles",
  id: "/id/articles",
  vi: "/vi/articles",
  th: "/th/articles",
  ru: "/ru/articles",
  ur: "/ur/articles",
  bn: "/bn/articles",
  ja: "/ja/articles",
  ko: "/ko/articles",
};

export const insightLocales: Locale[] = ["pt", "en", "es", "fr", "hi", "ar", "tr", "id", "vi", "th", "ru", "ur", "bn", "ja", "ko"];

export const insightsHero: Record<Locale, { title: string; subtitle: string; metaDescription: string }> = {
  pt: {
    title: "Artigos Globais",
    subtitle: "An\u00E1lises editoriais sobre Forex, a\u00E7\u00F5es, cripto, commodities, ETFs, ciclos econ\u00F4micos e estrutura financeira global.",
    metaDescription: "Artigos Globais do Varejo Investidor: an\u00E1lises sobre Forex, a\u00E7\u00F5es, cripto, commodities, ETFs, ciclos econ\u00F4micos e estrutura financeira global para investidores de varejo.",
  },
  en: {
    title: "Global Articles",
    subtitle: "Editorial analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure.",
    metaDescription: "Global Articles by Varejo Investidor: analysis on Forex, stocks, crypto, commodities, ETFs, economic cycles and global financial structure for retail investors.",
  },
  es: {
    title: "Art\u00EDculos Globales",
    subtitle: "An\u00E1lisis editorial sobre Forex, acciones, cripto, commodities, ETFs, ciclos econ\u00F3micos y estructura financiera global.",
    metaDescription: "Art\u00EDculos Globales de Varejo Investidor: an\u00E1lisis sobre Forex, acciones, cripto, commodities, ETFs, ciclos econ\u00F3micos y estructura financiera global.",
  },
  fr: {
    title: "Articles Globaux",
    subtitle: "Analyses editoriales sur le Forex, les actions, la crypto, les matieres premieres, les ETF, les cycles economiques et la structure financiere mondiale.",
    metaDescription: "Articles Globaux de Varejo Investidor : analyses sur le Forex, les actions, la crypto, les matieres premieres, les ETF, les cycles economiques et la structure financiere mondiale.",
  },
  hi: {
    title: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916",
    subtitle: "Forex, \u0936\u0947\u092F\u0930, \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B, \u0915\u092E\u094B\u0921\u093F\u091F\u0940, ETFs, \u0906\u0930\u094D\u0925\u093F\u0915 \u091A\u0915\u094D\u0930 \u0914\u0930 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u092A\u0930 \u0938\u0902\u0938\u094D\u0925\u093E\u0917\u0924 \u0932\u0947\u0916\u0964",
    metaDescription: "Varejo Investidor \u0915\u0947 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916: Forex, \u0936\u0947\u092F\u0930, \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B, \u0915\u092E\u094B\u0921\u093F\u091F\u0940, ETFs \u0914\u0930 \u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u092A\u0930 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923\u0964",
  },
  ar: {
    title: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    subtitle: "\u0645\u0642\u0627\u0644\u0627\u062A \u062A\u062D\u0631\u064A\u0631\u064A\u0629 \u062D\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648 \u0648\u0627\u0644\u0633\u0644\u0639 \u0648ETFs \u0648\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0648\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A.",
    metaDescription: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0645\u0646 Varejo Investidor \u062D\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648 \u0648\u0627\u0644\u0633\u0644\u0639 \u0648ETFs \u0648\u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0627\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645\u064A.",
  },
  tr: {
    title: "K\u00FCresel Makaleler",
    subtitle: "Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik d\u00F6ng\u00FCler ve k\u00FCresel finansal yap\u0131 \u00FCzerine editoryal analizler.",
    metaDescription: "Varejo Investidor K\u00FCresel Makaleler: Forex, hisseler, kripto, emtialar, ETF'ler, ekonomik d\u00F6ng\u00FCler ve k\u00FCresel finansal yap\u0131 analizleri.",
  },
  id: {
    title: "Artikel Global",
    subtitle: "Analisis editorial tentang Forex, saham, kripto, komoditas, ETF, siklus ekonomi dan struktur keuangan global.",
    metaDescription: "Artikel Global Varejo Investidor: analisis Forex, saham, kripto, komoditas, ETF, siklus ekonomi dan struktur keuangan global untuk investor ritel.",
  },
  vi: {
    title: "B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u",
    subtitle: "Ph\u00E2n t\u00EDch chuy\u00EAn s\u00E2u v\u1EC1 Forex, c\u1ED5 phi\u1EBFu, crypto, h\u00E0ng h\u00F3a, ETF, chu k\u1EF3 kinh t\u1EBF v\u00E0 c\u1EA5u tr\u00FAc t\u00E0i ch\u00EDnh to\u00E0n c\u1EA7u.",
    metaDescription: "B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u c\u1EE7a Varejo Investidor: ph\u00E2n t\u00EDch Forex, c\u1ED5 phi\u1EBFu, crypto, h\u00E0ng h\u00F3a, ETF, chu k\u1EF3 kinh t\u1EBF v\u00E0 c\u1EA5u tr\u00FAc t\u00E0i ch\u00EDnh to\u00E0n c\u1EA7u.",
  },
  th: {
    title: "บทความระดับโลก",
    subtitle: "บทวิเคราะห์เชิงบรรณาธิการเกี่ยวกับ Forex หุ้น คริปโต สินค้าโภคภัณฑ์ ETF วัฏจักรเศรษฐกิจ และโครงสร้างการเงินโลก",
    metaDescription: "บทความระดับโลกของ Varejo Investidor: การวิเคราะห์ Forex หุ้น คริปโต สินค้าโภคภัณฑ์ ETF วัฏจักรเศรษฐกิจ และโครงสร้างการเงินโลกสำหรับนักลงทุนรายย่อย",
  },
  ru: {
    title: "Глобальные статьи",
    subtitle: "Редакционная аналитика о Forex, акциях, криптоактивах, сырьевых товарах, ETF, экономических циклах и глобальной финансовой структуре.",
    metaDescription: "Глобальные статьи Varejo Investidor: аналитика о Forex, акциях, криптоактивах, сырье, ETF, экономических циклах и глобальной финансовой структуре для частных инвесторов.",
  },
  ur: {
    title: "عالمی مضامین",
    subtitle: "Forex، اسٹاکس، کرپٹو، کموڈٹیز، ETFs، معاشی چکروں اور عالمی مالیاتی ڈھانچے پر ادارتی تجزیات۔",
    metaDescription: "Varejo Investidor کے عالمی مضامین: عام سرمایہ کاروں کے لیے Forex، اسٹاکس، کرپٹو، کموڈٹیز، ETFs اور عالمی مالیاتی ڈھانچے پر تجزیات۔",
  },
  bn: {
    title: "গ্লোবাল আর্টিকেল",
    subtitle: "Forex, স্টক, ক্রিপ্টো, কমোডিটি, ETF, অর্থনৈতিক চক্র এবং বৈশ্বিক আর্থিক কাঠামো নিয়ে সম্পাদকীয় বিশ্লেষণ।",
    metaDescription: "Varejo Investidor গ্লোবাল আর্টিকেল: সাধারণ বিনিয়োগকারীদের জন্য Forex, স্টক, ক্রিপ্টো, কমোডিটি, ETF, অর্থনৈতিক চক্র ও বৈশ্বিক আর্থিক কাঠামোর বিশ্লেষণ।",
  },
  ja: {
    title: "グローバル記事",
    subtitle: "Forex、株式、暗号資産、商品、ETF、経済サイクル、グローバル金融構造に関する編集分析。",
    metaDescription: "Varejo Investidorのグローバル記事: 個人投資家のためのForex、株式、暗号資産、商品、ETF、経済サイクル、グローバル金融構造の分析。",
  },
  ko: {
    title: "글로벌 기사",
    subtitle: "Forex, 주식, 암호화폐, 원자재, ETF, 경제 사이클과 글로벌 금융 구조에 대한 편집 분석.",
    metaDescription: "Varejo Investidor 글로벌 기사: 개인 투자자를 위한 Forex, 주식, 암호화폐, 원자재, ETF, 경제 사이클과 글로벌 금융 구조 분석.",
  },
};

export const insightLabels: Record<
  Locale,
  {
    nav: string;
    content: string;
    latest: string;
    recent: string;
    categories: string;
    all: string;
    read: string;
    whatsappTitle: string;
    newsletterTitle: string;
    newsletterText: string;
    email: string;
    newsletterButton: string;
    newsletterSuccess: string;
    markets: string;
    faq: string;
    related: string;
    education: string;
    levelBlockTitle: string;
    formiga: string;
    lobo: string;
    harpia: string;
    postCtaTitle: string;
    postCtaText: string;
  }
> = {
  pt: {
    nav: "Artigos",
    content: "Conte\u00FAdo",
    latest: "\u00DAltima an\u00E1lise",
    recent: "Posts recentes",
    categories: "Categorias",
    all: "Todos",
    read: "Ler an\u00E1lise",
    whatsappTitle: "Entre no Canal Formiga",
    newsletterTitle: "Receba Artigos Globais",
    newsletterText: "An\u00E1lises, ciclos e conte\u00FAdos estrat\u00E9gicos do Varejo Investidor por e-mail ou WhatsApp.",
    email: "E-mail",
    newsletterButton: "Receber artigos",
    newsletterSuccess: "Pronto. Seu interesse foi registrado visualmente.",
    markets: "Mercados conectados",
    faq: "Perguntas frequentes",
    related: "Posts relacionados",
    education: "Ver Educa\u00E7\u00E3o",
    levelBlockTitle: "Como cada n\u00EDvel enxerga este tema",
    formiga: "Entende o impacto b\u00E1sico na renda, moeda, organiza\u00E7\u00E3o e primeiro capital.",
    lobo: "Analisa cen\u00E1rio, risco, liquidez e oportunidade operacional.",
    harpia: "Observa patrim\u00F4nio, prote\u00E7\u00E3o, moedas fortes e estrutura internacional.",
    postCtaTitle: "Aprofunde sua leitura dentro da forma\u00E7\u00E3o",
    postCtaText: "Conecte este artigo \u00E0 jornada Formiga, Lobo e Harpia para evoluir com m\u00E9todo.",
  },
  en: {
    nav: "Articles",
    content: "Content",
    latest: "Latest analysis",
    recent: "Recent posts",
    categories: "Categories",
    all: "All",
    read: "Read analysis",
    whatsappTitle: "Start with the Formiga Channel",
    newsletterTitle: "Receive Global Articles",
    newsletterText: "Analysis, cycles and strategic content from Varejo Investidor by email or WhatsApp.",
    email: "Email",
    newsletterButton: "Get articles",
    newsletterSuccess: "Done. Your request was visually registered.",
    markets: "Connected markets",
    faq: "FAQ",
    related: "Related posts",
    education: "View Education",
    levelBlockTitle: "How each level reads this topic",
    formiga: "Understands the basic impact on income, currency, organization and first capital.",
    lobo: "Analyzes scenario, risk, liquidity and operational opportunity.",
    harpia: "Sees wealth, protection, strong currencies and international structure.",
    postCtaTitle: "Deepen your reading inside the education path",
    postCtaText: "Connect this article to the Formiga, Lobo and Harpia journey to evolve with method.",
  },
  es: {
    nav: "Art\u00EDculos",
    content: "Contenido",
    latest: "Ultimo analisis",
    recent: "Posts recientes",
    categories: "Categorias",
    all: "Todos",
    read: "Leer analisis",
    whatsappTitle: "Comienza por el Canal Formiga",
    newsletterTitle: "Recibe Art\u00EDculos Globales",
    newsletterText: "Analisis, ciclos y contenidos estrategicos de Varejo Investidor por e-mail o WhatsApp.",
    email: "E-mail",
    newsletterButton: "Recibir art\u00EDculos",
    newsletterSuccess: "Listo. Tu solicitud fue registrada visualmente.",
    markets: "Mercados conectados",
    faq: "Preguntas frecuentes",
    related: "Posts relacionados",
    education: "Ver Educacion",
    levelBlockTitle: "Como cada nivel lee este tema",
    formiga: "Entiende el impacto basico en ingresos, moneda, organizacion y primer capital.",
    lobo: "Analiza escenario, riesgo, liquidez y oportunidad operativa.",
    harpia: "Observa patrimonio, proteccion, monedas fuertes y estructura internacional.",
    postCtaTitle: "Profundiza tu lectura dentro de la formacion",
    postCtaText: "Conecta este art\u00EDculo con la jornada Formiga, Lobo y Harpia para evolucionar con metodo.",
  },
  hi: {
    nav: "\u0932\u0947\u0916",
    content: "कंटेंट",
    latest: "नवीनतम विश्लेषण",
    recent: "हाल के पोस्ट",
    categories: "श्रेणियां",
    all: "सभी",
    read: "विश्लेषण पढ़ें",
    whatsappTitle: "Formiga चैनल से शुरुआत करें",
    newsletterTitle: "\u0935\u0948\u0936\u094D\u0935\u093F\u0915 \u0932\u0947\u0916 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902",
    newsletterText: "Varejo Investidor के विश्लेषण, चक्र और रणनीतिक कंटेंट ई-mail या WhatsApp पर प्राप्त करें।",
    email: "ई-mail",
    newsletterButton: "\u0932\u0947\u0916 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902",
    newsletterSuccess: "हो गया। आपका अनुरोध दर्ज हो गया।",
    markets: "जुड़े हुए बाजार",
    faq: "सामान्य प्रश्न",
    related: "संबंधित पोस्ट",
    education: "शिक्षा देखें",
    levelBlockTitle: "हर स्तर इस विषय को कैसे पढ़ता है",
    formiga: "आय, मुद्रा, संगठन और पहले पूंजी पर मूल प्रभाव समझता है।",
    lobo: "परिदृश्य, जोखिम, लिक्विडिटी और ऑपरेशनल अवसर का विश्लेषण करता है।",
    harpia: "संपत्ति, सुरक्षा, मजबूत मुद्राएं और अंतरराष्ट्रीय संरचना देखता है।",
    postCtaTitle: "शिक्षा मार्ग में अपनी समझ गहरी करें",
    postCtaText: "इस इनसाइट को Formiga, Lobo और Harpia यात्रा से जोड़कर विधि के साथ विकसित हों।",
  },
  ar: {
    nav: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A",
    content: "المحتوى",
    latest: "آخر تحليل",
    recent: "منشورات حديثة",
    categories: "الفئات",
    all: "الكل",
    read: "اقرأ التحليل",
    whatsappTitle: "ابدأ من قناة Formiga",
    newsletterTitle: "\u0627\u0633\u062A\u0642\u0628\u0644 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    newsletterText: "تحليلات ودورات ومحتوى استراتيجي من Varejo Investidor عبر البريد أو WhatsApp.",
    email: "البريد الالكتروني",
    newsletterButton: "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A",
    newsletterSuccess: "تم تسجيل طلبك بصريا.",
    markets: "اسواق مرتبطة",
    faq: "اسئلة شائعة",
    related: "منشورات مرتبطة",
    education: "عرض التعليم",
    levelBlockTitle: "كيف يقرأ كل مستوى هذا الموضوع",
    formiga: "يفهم الاثر الاساسي على الدخل والعملة والتنظيم ورأس المال الاول.",
    lobo: "يحلل السيناريو والمخاطر والسيولة والفرصة التشغيلية.",
    harpia: "يرى الثروة والحماية والعملات القوية والهيكلة الدولية.",
    postCtaTitle: "عمق قراءتك داخل مسار التعليم",
    postCtaText: "اربط هذه الرؤية برحلة Formiga وLobo وHarpia للتطور بمنهجية.",
  },
  tr: {
    nav: "Makaleler",
    content: "Icerik",
    latest: "Son analiz",
    recent: "Son yazilar",
    categories: "Kategoriler",
    all: "Tumu",
    read: "Analizi oku",
    whatsappTitle: "Formiga Kanali ile baslayin",
    newsletterTitle: "K\u00FCresel Makaleler Al",
    newsletterText: "Varejo Investidor analizleri, donguleri ve stratejik icerikleri e-posta veya WhatsApp ile alin.",
    email: "E-mail",
    newsletterButton: "Makale al",
    newsletterSuccess: "Tamam. Talebiniz gorsel olarak kaydedildi.",
    markets: "Baglantili piyasalar",
    faq: "SSS",
    related: "Ilgili yazilar",
    education: "Egitimi Gor",
    levelBlockTitle: "Her seviye bu konuyu nasil okur",
    formiga: "Gelir, para birimi, organizasyon ve ilk sermaye uzerindeki temel etkiyi anlar.",
    lobo: "Senaryo, risk, likidite ve operasyonel firsati analiz eder.",
    harpia: "Varlik, koruma, guclu para birimleri ve uluslararasi yapiyi gorur.",
    postCtaTitle: "Okumanizi egitim yolu icinde derinlestirin",
    postCtaText: "Bu icgoruyu Formiga, Lobo ve Harpia yolculuguna baglayarak metodla gelisin.",
  },
  id: {
    nav: "Artikel",
    content: "Konten",
    latest: "Analisis terbaru",
    recent: "Artikel terbaru",
    categories: "Kategori",
    all: "Semua",
    read: "Baca analisis",
    whatsappTitle: "Mulai dari Kanal Semut",
    newsletterTitle: "Terima Artikel Global",
    newsletterText: "Analisis, siklus dan konten strategis Varejo Investidor melalui email atau WhatsApp.",
    email: "Email",
    newsletterButton: "Terima artikel",
    newsletterSuccess: "Selesai. Minat Anda telah tercatat.",
    markets: "Pasar terhubung",
    faq: "FAQ",
    related: "Artikel terkait",
    education: "Lihat Edukasi",
    levelBlockTitle: "Cara setiap level membaca topik ini",
    formiga: "Memahami dampak dasar pada pendapatan, mata uang, organisasi dan modal awal.",
    lobo: "Menganalisis skenario, risiko, likuiditas dan peluang operasional.",
    harpia: "Melihat kekayaan, proteksi, mata uang kuat dan struktur internasional.",
    postCtaTitle: "Perdalam pembacaan Anda di jalur edukasi",
    postCtaText: "Hubungkan wawasan ini dengan perjalanan Semut, Serigala dan Elang Harpy untuk berkembang dengan metode.",
  },
  vi: {
    nav: "B\u00E0i vi\u1EBFt",
    content: "Nội dung",
    latest: "Phân tích mới nhất",
    recent: "Bài viết mới",
    categories: "Danh mục",
    all: "Tất cả",
    read: "Đọc phân tích",
    whatsappTitle: "Bắt đầu với Kênh Kiến",
    newsletterTitle: "Nh\u1EADn B\u00E0i vi\u1EBFt To\u00E0n c\u1EA7u",
    newsletterText: "Phân tích, chu kỳ và nội dung chiến lược của Varejo Investidor qua email hoặc WhatsApp.",
    email: "Email",
    newsletterButton: "Nh\u1EADn b\u00E0i vi\u1EBFt",
    newsletterSuccess: "Xong. Yêu cầu của bạn đã được ghi nhận.",
    markets: "Thị trường liên quan",
    faq: "FAQ",
    related: "Bài viết liên quan",
    education: "Xem Giáo dục",
    levelBlockTitle: "Mỗi cấp độ đọc chủ đề này như thế nào",
    formiga: "Hiểu tác động cơ bản đến thu nhập, tiền tệ, tổ chức và vốn đầu tiên.",
    lobo: "Phân tích bối cảnh, rủi ro, thanh khoản và cơ hội vận hành.",
    harpia: "Nhìn vào tài sản, bảo vệ, tiền tệ mạnh và cấu trúc quốc tế.",
    postCtaTitle: "Đào sâu góc nhìn trong lộ trình giáo dục",
    postCtaText: "Kết nối góc nhìn này với hành trình Kiến, Sói và Đại Bàng Harpy để phát triển có phương pháp.",
  },
};

export const insightCategories: Record<Locale, Record<InsightCategoryKey, string>> = {
  pt: { macro: "Macro Global", forex: "Forex", stocks: "Acoes", crypto: "Cripto", commodities: "Commodities", etfs: "ETFs", risk: "Risco", wealth: "Patrimonio" },
  en: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  es: { macro: "Macro Global", forex: "Forex", stocks: "Acciones", crypto: "Cripto", commodities: "Commodities", etfs: "ETFs", risk: "Riesgo", wealth: "Patrimonio" },
  hi: { macro: "ग्लोबल मैक्रो", forex: "Forex", stocks: "शेयर", crypto: "क्रिप्टो", commodities: "कमोडिटी", etfs: "ETFs", risk: "जोखिम", wealth: "संपत्ति" },
  ar: { macro: "ماكرو عالمي", forex: "الفوركس", stocks: "الاسهم", crypto: "الكريبتو", commodities: "السلع", etfs: "ETFs", risk: "المخاطر", wealth: "الثروة" },
  tr: { macro: "Kuresel Makro", forex: "Forex", stocks: "Hisseler", crypto: "Kripto", commodities: "Emtialar", etfs: "ETF'ler", risk: "Risk", wealth: "Varlik" },
  id: { macro: "Makro Global", forex: "Forex", stocks: "Saham", crypto: "Kripto", commodities: "Komoditas", etfs: "ETF", risk: "Risiko", wealth: "Kekayaan" },
  vi: { macro: "Vĩ mô toàn cầu", forex: "Forex", stocks: "Cổ Phiếu", crypto: "Tiền Điện Tử", commodities: "Hàng Hóa", etfs: "ETF", risk: "Rủi ro", wealth: "Tài sản" },
  th: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  ru: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  ur: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  bn: { macro: "Global Macro", forex: "Forex", stocks: "Stocks", crypto: "Crypto", commodities: "Commodities", etfs: "ETFs", risk: "Risk", wealth: "Wealth" },
  ja: { macro: "グローバルマクロ", forex: "Forex", stocks: "株式", crypto: "暗号資産", commodities: "商品", etfs: "ETF", risk: "リスク", wealth: "資産" },
  ko: { macro: "글로벌 매크로", forex: "Forex", stocks: "주식", crypto: "암호화폐", commodities: "원자재", etfs: "ETF", risk: "리스크", wealth: "자산" },
};

const titleSets: Record<Locale, Array<[string, string, InsightCategoryKey, string]>> = {
  pt: [
    ["dolar-juros-e-mercado-global", "O que o dolar revela sobre o mercado global", "macro", "Dolar, juros, liquidez e risco continuam sendo a linguagem central dos ciclos globais."],
    ["forex-ouro-e-petroleo", "Forex, ouro e petroleo: como os mercados se conectam", "forex", "Moedas, energia e metais contam a mesma historia por angulos diferentes."],
    ["ciclos-economicos-varejo", "Por que o varejo precisa entender ciclos economicos", "risk", "Ciclos explicam risco, oportunidade, liquidez e construcao de patrimonio."],
    ["bitcoin-liquidez-e-risco", "Bitcoin, liquidez e risco: o que observar", "crypto", "Cripto exige leitura de liquidez, seguranca, ciclo e apetite por risco."],
    ["etfs-acoes-globais-patrimonio", "ETFs e acoes globais na construcao de patrimonio", "wealth", "Carteiras globais comecam com diversificacao, moeda forte e estrutura de longo prazo."],
  ],
  en: [
    ["dollar-rates-and-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-and-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["retail-investors-economic-cycles", "Why retail investors need economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and long-term wealth building."],
    ["bitcoin-liquidity-and-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios start with diversification, strong currency and long-term structure."],
  ],
  es: [
    ["dolar-tasas-mercados-globales", "Lo que el dolar revela sobre los mercados globales", "macro", "Dolar, tasas, liquidez y riesgo siguen siendo el lenguaje central de los ciclos globales."],
    ["forex-oro-petroleo", "Forex, oro y petroleo: como se conectan los mercados", "forex", "Monedas, energia y metales cuentan la misma historia global desde angulos distintos."],
    ["ciclos-economicos-minoristas", "Por que el inversor minorista necesita ciclos economicos", "risk", "Los ciclos explican riesgo, oportunidad, liquidez y construccion patrimonial."],
    ["bitcoin-liquidez-riesgo", "Bitcoin, liquidez y riesgo: que observar", "crypto", "Cripto exige lectura de liquidez, seguridad, ciclo y apetito por riesgo."],
    ["etfs-acciones-globales-patrimonio", "ETFs y acciones globales en la construccion patrimonial", "wealth", "Las carteras globales empiezan con diversificacion, moneda fuerte y largo plazo."],
  ],
  hi: [
    ["dollar-rates-global-markets", "Dollar वैश्विक बाजार के बारे में क्या बताता है", "macro", "Dollar, rates, liquidity और risk वैश्विक चक्रों की मुख्य भाषा हैं।"],
    ["forex-gold-oil", "Forex, gold और oil: बाजार कैसे जुड़ते हैं", "forex", "Currencies, energy और metals एक ही global story को अलग angles से दिखाते हैं।"],
    ["economic-cycles-retail", "Retail investors को economic cycles क्यों समझने चाहिए", "risk", "Cycles risk, opportunity, liquidity और wealth building को समझाते हैं।"],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity और risk: क्या देखें", "crypto", "Crypto में liquidity, security, cycle और risk appetite पढ़ना जरूरी है।"],
    ["etfs-global-stocks-wealth", "ETFs और global stocks wealth building में", "wealth", "Global portfolios diversification, strong currency और long-term structure से शुरू होते हैं।"],
  ],
  ar: [
    ["dollar-rates-global-markets", "ماذا يكشف الدولار عن الاسواق العالمية", "macro", "الدولار والفائدة والسيولة والمخاطر هي لغة الدورات العالمية."],
    ["forex-gold-oil", "الفوركس والذهب والنفط: كيف تتصل الاسواق", "forex", "العملات والطاقة والمعادن تروي القصة العالمية من زوايا مختلفة."],
    ["economic-cycles-retail", "لماذا يحتاج المستثمر الفردي الى فهم الدورات الاقتصادية", "risk", "الدورات تشرح المخاطر والفرص والسيولة وبناء الثروة."],
    ["bitcoin-liquidity-risk", "Bitcoin والسيولة والمخاطر: ما الذي نراقبه", "crypto", "الكريبتو يتطلب قراءة السيولة والامان والدورة وشهية المخاطر."],
    ["etfs-global-stocks-wealth", "ETFs والاسهم العالمية في بناء الثروة", "wealth", "المحافظ العالمية تبدأ بالتنويع والعملة القوية والهيكل طويل الاجل."],
  ],
  tr: [
    ["dollar-rates-global-markets", "Dolar kuresel piyasalar hakkinda ne anlatir", "macro", "Dolar, faizler, likidite ve risk kuresel dongulerin ana dilidir."],
    ["forex-gold-oil", "Forex, altin ve petrol: piyasalar nasil baglanir", "forex", "Para birimleri, enerji ve metaller ayni kuresel hikayeyi farkli acilardan anlatir."],
    ["economic-cycles-retail", "Bireysel yatirimcilar ekonomik donguleri neden anlamali", "risk", "Donguler risk, firsat, likidite ve varlik insasini aciklar."],
    ["bitcoin-liquidity-risk", "Bitcoin, likidite ve risk: ne izlenmeli", "crypto", "Kripto likidite, guvenlik, dongu ve risk istahi okumayi gerektirir."],
    ["etfs-global-stocks-wealth", "ETF'ler ve kuresel hisselerle varlik insasi", "wealth", "Kuresel portfoyler cesitlendirme, guclu para ve uzun vadeli yapi ile baslar."],
  ],
  id: [
    ["dolar-suku-bunga-pasar-global", "Apa yang dolar ungkap tentang pasar global", "macro", "Dolar, suku bunga, likuiditas dan risiko tetap menjadi bahasa utama siklus global."],
    ["forex-emas-minyak", "Forex, emas dan minyak: bagaimana pasar saling terhubung", "forex", "Mata uang, energi dan logam menceritakan cerita global yang sama dari sudut berbeda."],
    ["siklus-ekonomi-investor-ritel", "Mengapa investor ritel perlu memahami siklus ekonomi", "risk", "Siklus menjelaskan risiko, peluang, likuiditas dan pembangunan kekayaan jangka panjang."],
    ["bitcoin-likuiditas-risiko", "Bitcoin, likuiditas dan risiko: apa yang perlu diperhatikan", "crypto", "Kripto menuntut pembacaan likuiditas, keamanan, siklus dan selera risiko."],
    ["etf-saham-global-kekayaan", "ETF dan saham global dalam pembangunan kekayaan", "wealth", "Portofolio global dimulai dari diversifikasi, mata uang kuat dan struktur jangka panjang."],
  ],
  vi: [
    ["do-la-lai-suat-thi-truong-toan-cau", "Đồng đô la tiết lộ điều gì về thị trường toàn cầu", "macro", "Đô la, lãi suất, thanh khoản và rủi ro vẫn là ngôn ngữ cốt lõi của chu kỳ toàn cầu."],
    ["forex-vang-dau", "Forex, vàng và dầu: các thị trường kết nối ra sao", "forex", "Tiền tệ, năng lượng và kim loại kể cùng một câu chuyện toàn cầu qua nhiều góc nhìn."],
    ["chu-ky-kinh-te-nha-dau-tu-ca-nhan", "Vì sao nhà đầu tư cá nhân cần hiểu chu kỳ kinh tế", "risk", "Chu kỳ giải thích rủi ro, cơ hội, thanh khoản và xây dựng tài sản dài hạn."],
    ["bitcoin-thanh-khoan-rui-ro", "Bitcoin, thanh khoản và rủi ro: cần theo dõi điều gì", "crypto", "Crypto đòi hỏi đọc thanh khoản, bảo mật, chu kỳ và khẩu vị rủi ro."],
    ["etf-co-phieu-toan-cau-tai-san", "ETF và cổ phiếu toàn cầu trong xây dựng tài sản", "wealth", "Danh mục toàn cầu bắt đầu bằng đa dạng hóa, tiền tệ mạnh và cấu trúc dài hạn."],
  ],
  th: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ru: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ur: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  bn: [
    ["dollar-rates-global-markets", "What the dollar reveals about global markets", "macro", "The dollar, rates, liquidity and risk remain the core language of global cycles."],
    ["forex-gold-oil", "Forex, gold and oil: how markets connect", "forex", "Currencies, energy and metals tell the same global story from different angles."],
    ["economic-cycles-retail", "Why retail investors need to understand economic cycles", "risk", "Cycles explain risk, opportunity, liquidity and wealth building."],
    ["bitcoin-liquidity-risk", "Bitcoin, liquidity and risk: what to watch", "crypto", "Crypto requires reading liquidity, security, cycle and risk appetite."],
    ["etfs-global-stocks-wealth", "ETFs and global stocks in wealth building", "wealth", "Global portfolios begin with diversification, strong currency and long-term structure."],
  ],
  ja: [
    ["dollar-rates-global-markets", "ドルが世界市場について示すこと", "macro", "ドル、金利、流動性、リスクは、世界のサイクルを読むための中心的な言語です。"],
    ["forex-gold-oil", "Forex、金、原油: 市場はどのようにつながるのか", "forex", "通貨、エネルギー、金属は、同じグローバルストーリーを異なる角度から映し出します。"],
    ["economic-cycles-retail", "個人投資家が経済サイクルを理解すべき理由", "risk", "サイクルはリスク、機会、流動性、長期的な資産形成を説明します。"],
    ["bitcoin-liquidity-risk", "Bitcoin、流動性、リスク: 何を見るべきか", "crypto", "暗号資産には、流動性、安全性、サイクル、リスク選好の読み取りが必要です。"],
    ["etfs-global-stocks-wealth", "ETFとグローバル株式による資産形成", "wealth", "グローバルポートフォリオは、分散、強い通貨、長期構造から始まります。"],
  ],
  ko: [
    ["dollar-rates-global-markets", "달러가 글로벌 시장에 대해 보여주는 것", "macro", "달러, 금리, 유동성, 리스크는 글로벌 사이클을 읽는 핵심 언어입니다."],
    ["forex-gold-oil", "Forex, 금, 원유: 시장은 어떻게 연결되는가", "forex", "통화, 에너지, 금속은 같은 글로벌 이야기를 서로 다른 각도에서 보여줍니다."],
    ["economic-cycles-retail", "개인 투자자가 경제 사이클을 이해해야 하는 이유", "risk", "사이클은 리스크, 기회, 유동성, 장기 자산 형성을 설명합니다."],
    ["bitcoin-liquidity-risk", "Bitcoin, 유동성, 리스크: 무엇을 봐야 하는가", "crypto", "암호화폐는 유동성, 보안, 사이클, 리스크 선호도를 읽는 능력이 필요합니다."],
    ["etfs-global-stocks-wealth", "ETF와 글로벌 주식으로 만드는 자산", "wealth", "글로벌 포트폴리오는 분산, 강한 통화, 장기 구조에서 시작됩니다."],
  ],
};

function bodyCopy(locale: Locale) {
  const first: Record<Locale, string> = {
    pt: "A leitura institucional comeca pela relacao entre liquidez, juros, moeda e apetite por risco. Quando esses vetores mudam, os mercados globais se reposicionam antes que o investidor comum perceba.",
    en: "Institutional reading begins with the relationship between liquidity, rates, currency and risk appetite. When these vectors change, global markets reposition before the ordinary investor notices.",
    es: "La lectura institucional comienza por la relacion entre liquidez, tasas, moneda y apetito por riesgo. Cuando esos vectores cambian, los mercados globales se reposicionan antes de que el inversor comun lo perciba.",
    hi: "संस्थागत पढ़ाई liquidity, rates, currency और risk appetite के संबंध से शुरू होती है। जब ये तत्व बदलते हैं, global markets पहले से reposition करते हैं।",
    ar: "تبدأ القراءة المؤسسية من العلاقة بين السيولة والفائدة والعملة وشهية المخاطر. عندما تتغير هذه العوامل، تعيد الاسواق العالمية تموضعها مبكرا.",
    tr: "Kurumsal okuma likidite, faiz, para birimi ve risk istahi iliskisiyle baslar. Bu vektorler degistiginde kuresel piyasalar erken konumlanir.",
    id: "Pembacaan institusional dimulai dari hubungan antara likuiditas, suku bunga, mata uang dan selera risiko. Saat vektor ini berubah, pasar global sering bergerak lebih dahulu sebelum investor umum menyadarinya.",
    vi: "Cách đọc theo hướng tổ chức bắt đầu từ mối quan hệ giữa thanh khoản, lãi suất, tiền tệ và khẩu vị rủi ro. Khi các yếu tố này thay đổi, thị trường toàn cầu thường tái định vị trước khi nhà đầu tư phổ thông nhận ra.",
  };
  const second: Record<Locale, string> = {
    pt: "Dentro da metodologia Formiga, Lobo e Harpia, a analise nao serve apenas para prever preco. Ela organiza comportamento financeiro, risco operacional e construcao patrimonial global.",
    en: "Inside the Formiga, Lobo and Harpia methodology, analysis is not only about predicting price. It organizes financial behavior, operational risk and global wealth building.",
    es: "Dentro de la metodologia Formiga, Lobo y Harpia, el analisis no sirve solo para prever precio. Organiza comportamiento financiero, riesgo operativo y construccion patrimonial global.",
    hi: "Formiga, Lobo और Harpia methodology में analysis केवल price predict करने के लिए नहीं है। यह financial behavior, operational risk और global wealth building को organize करता है।",
    ar: "ضمن منهجية Formiga وLobo وHarpia، لا يهدف التحليل فقط الى توقع السعر، بل ينظم السلوك المالي والمخاطر التشغيلية وبناء الثروة العالمية.",
    tr: "Formiga, Lobo ve Harpia metodolojisinde analiz sadece fiyat tahmini degildir. Finansal davranisi, operasyonel riski ve kuresel varlik insasini duzenler.",
    id: "Dalam metodologi Semut, Serigala dan Elang Harpy, analisis bukan hanya soal memprediksi harga. Analisis mengatur perilaku finansial, risiko operasional dan pembangunan kekayaan global.",
    vi: "Trong phương pháp Kiến, Sói và Đại Bàng Harpy, phân tích không chỉ để dự đoán giá. Nó tổ chức hành vi tài chính, rủi ro vận hành và quá trình xây dựng tài sản toàn cầu.",
  };
  return [first[locale] ?? first.en, second[locale] ?? second.en];
}

function makePost(locale: Locale, item: [string, string, InsightCategoryKey, string], index: number): InsightPost {
  const [slug, title, category, description] = item;
  const date = `2026-0${Math.min(index + 1, 5)}-0${index + 2}`;
  const read = locale === "pt" ? `${6 + index} min de leitura` : locale === "es" ? `${6 + index} min de lectura` : `${6 + index} min read`;

  return {
    slug,
    locale,
    title,
    description,
    category,
    author: "Varejo Investidor",
    date,
    readingTime: read,
    image: `/insights/${slug}.jpg`,
    tags: [insightCategories[locale][category], "Varejo Investidor", "Global Markets"],
    content: [description, ...bodyCopy(locale)],
    relatedPosts: titleSets[locale].filter((entry) => entry[0] !== slug).slice(0, 3).map((entry) => entry[0]),
    seoTitle: `${title} | Varejo Investidor`,
    seoDescription: description,
  };
}

export const insightPosts: InsightPost[] = Object.entries(titleSets).flatMap(([locale, posts]) =>
  posts.map((post, index) => makePost(locale as Locale, post, index)),
);

export function getInsightsPath(locale: Locale, slug?: string) {
  return `${insightsBasePath[locale] ?? insightsBasePath.en}${slug ? `/${slug}` : ""}`;
}

export function getPostsByLocale(locale: Locale) {
  const posts = insightPosts.filter((post) => post.locale === locale);
  return posts.length ? posts : insightPosts.filter((post) => post.locale === "en");
}

export function getPost(locale: Locale, slug: string) {
  return insightPosts.find((post) => post.locale === locale && post.slug === slug) ?? insightPosts.find((post) => post.locale === "en" && post.slug === slug);
}

export function localeFromInsightsPath(pathname: string | null): Locale | null {
  if (!pathname) return null;
  if (pathname.startsWith("/artigos-globais")) return "pt";
  if (pathname.startsWith("/global-articles-hi")) return "hi";
  if (pathname.startsWith("/global-articles")) return "en";
  if (pathname.startsWith("/articulos-globales")) return "es";
  if (pathname.startsWith("/ar/global-articles")) return "ar";
  if (pathname.startsWith("/tr/global-articles")) return "tr";
  if (pathname.startsWith("/id/articles")) return "id";
  if (pathname.startsWith("/vi/articles")) return "vi";
  if (pathname.startsWith("/insights-globais")) return "pt";
  if (pathname.startsWith("/global-insights-hi")) return "hi";
  if (pathname.startsWith("/global-insights")) return "en";
  if (pathname.startsWith("/insights-globales")) return "es";
  if (pathname.startsWith("/ar/global-insights")) return "ar";
  if (pathname.startsWith("/tr/global-insights")) return "tr";
  if (pathname.startsWith("/id/insights")) return "id";
  if (pathname.startsWith("/vi/insights")) return "vi";
  if (pathname.startsWith("/ru/insights")) return "ru";
  if (pathname.startsWith("/ur/insights")) return "ur";
  if (pathname.startsWith("/bn/insights")) return "bn";
  if (pathname.startsWith("/ja/articles")) return "ja";
  if (pathname.startsWith("/ja/insights")) return "ja";
  if (pathname.startsWith("/ko/articles")) return "ko";
  if (pathname.startsWith("/ko/insights")) return "ko";
  return null;
}

export function getInsightMarketLinks(locale: Locale): Array<{ href: string; label: string }> {
  const slugs: MarketSlug[] = locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios"] : publicMarketSlugs;
  return slugs.map((slug) => ({ href: `/${slug}`, label: getMarketLabel(slug, locale) }));
}

export const insightsFaq: Record<Locale, Array<{ question: string; answer: string }>> = {
  pt: [
    { question: "O que sao Artigos Globais?", answer: "Sao analises editoriais sobre mercados, ciclos, moedas, risco e patrimonio para investidores de varejo." },
    { question: "A newsletter substitui recomendacao?", answer: "Nao. O conteudo e educativo e nao substitui analise individual, planejamento ou gestao de risco." },
  ],
  en: [
    { question: "What are Global Articles?", answer: "Editorial analysis on markets, cycles, currencies, risk and wealth for retail investors." },
    { question: "Does the newsletter replace advice?", answer: "No. The content is educational and does not replace individual analysis, planning or risk management." },
  ],
  es: [
    { question: "Que son Articulos Globales?", answer: "Analisis editoriales sobre mercados, ciclos, divisas, riesgo y patrimonio para inversores minoristas." },
    { question: "La newsletter reemplaza asesoria?", answer: "No. El contenido es educativo y no reemplaza analisis individual, planificacion o gestion de riesgo." },
  ],
  hi: [
    { question: "Global Articles क्या हैं?", answer: "Retail investors के लिए markets, cycles, currencies, risk और wealth पर editorial analysis." },
    { question: "क्या newsletter advice की जगह लेती है?", answer: "नहीं। यह educational content है और individual analysis या risk management की जगह नहीं लेता।" },
  ],
  ar: [
    { question: "ما هي الرؤى العالمية؟", answer: "تحليلات تحريرية عن الاسواق والدورات والعملات والمخاطر والثروة للمستثمرين الافراد." },
    { question: "هل النشرة بديل عن الاستشارة؟", answer: "لا. المحتوى تعليمي ولا يستبدل التحليل الفردي او التخطيط او ادارة المخاطر." },
  ],
  tr: [
    { question: "Kuresel Makaleler nedir?", answer: "Bireysel yatirimcilar icin piyasalar, donguler, para birimleri, risk ve varlik uzerine editorial analizlerdir." },
    { question: "Newsletter danismanligin yerini alir mi?", answer: "Hayir. Icerik egitim amaclidir; bireysel analiz, planlama veya risk yonetiminin yerini almaz." },
  ],
  id: [
    { question: "Apa itu Artikel Global?", answer: "Analisis editorial tentang pasar, siklus, mata uang, risiko dan kekayaan untuk investor ritel." },
    { question: "Apakah newsletter menggantikan nasihat keuangan?", answer: "Tidak. Konten ini bersifat edukatif dan tidak menggantikan analisis individual, perencanaan atau manajemen risiko." },
  ],
  vi: [
    { question: "Góc Nhìn Toàn Cầu là gì?", answer: "Phân tích chuyên sâu về thị trường, chu kỳ, tiền tệ, rủi ro và tài sản dành cho nhà đầu tư cá nhân." },
    { question: "Newsletter có thay thế tư vấn không?", answer: "Không. Nội dung chỉ mang tính giáo dục và không thay thế phân tích cá nhân, lập kế hoạch hoặc quản trị rủi ro." },
  ],
};
