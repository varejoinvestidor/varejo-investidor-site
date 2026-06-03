import type { Locale } from "../i18n";

export type ForexLibraryContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  sections: {
    whatTitle: string;
    whatText: string[];
    whatCards: string[];
    pairsTitle: string;
    pairsText: string;
    pairs: { pair: string; text: string }[];
    structureTitle: string;
    structureText: string;
    pipsTitle: string;
    pipsText: string;
    lotTitle: string;
    lotText: string;
    lotRows: { value: string; label: string }[];
    examplesTitle: string;
    examplesText: string;
    examples: { capital: string; lot: string; move: string; result: string }[];
    leverageTitle: string;
    leverageText: string;
    leverageWarning: string;
    pairsMainTitle: string;
    mainPairs: { pair: string; text: string }[];
    sessionsTitle: string;
    sessionsText: string;
    sessions: string[];
    levelsTitle: string;
    levels: { title: string; items: string[]; tone: "rise" | "gold" | "paper" }[];
    toolsTitle: string;
    tools: { title: string; text: string; button: string; href: string }[];
    finalTitle: string;
    finalText: string;
    educationButton: string;
    freeButton: string;
  };
};

const en: ForexLibraryContent = {
  eyebrow: "Market Library",
  title: "Forex: the largest financial market in the world",
  subtitle: "Understand how currency trading works, what currency pairs, pips, lots and leverage are, and why trillions of dollars move daily through the Forex market.",
  metaTitle: "Forex: the largest financial market in the world | Varejo Investidor",
  metaDescription: "A complete Forex guide for beginners, intermediate and advanced investors: currency pairs, pips, lots, leverage, risk management and global market access.",
  sections: {
    whatTitle: "What is the Forex market?",
    whatText: [
      "Forex, or the Foreign Exchange Market, is the global currency market.",
      "Banks, companies, governments, funds and investors trade currencies every day for international commerce, investments, currency protection and capital movement.",
      "With more than US$ 7 trillion traded daily, Forex is the largest financial market on the planet.",
    ],
    whatCards: ["Global market", "More than US$ 7 trillion per day", "Works 24 hours", "High liquidity"],
    pairsTitle: "How currency pairs work",
    pairsText: "In Forex, you always trade one currency against another. When you buy one currency, you automatically sell another.",
    pairs: [
      { pair: "EUR/USD", text: "Euro against the US dollar" },
      { pair: "GBP/USD", text: "British pound against the US dollar" },
      { pair: "USD/JPY", text: "US dollar against the Japanese yen" },
      { pair: "AUD/USD", text: "Australian dollar against the US dollar" },
      { pair: "USD/CAD", text: "US dollar against the Canadian dollar" },
    ],
    structureTitle: "Understanding a currency pair structure",
    structureText: "If EUR/USD is at 1.1000, it means that 1 euro is worth 1.10 dollars. If price rises, the euro is gaining strength against the dollar.",
    pipsTitle: "The unit of measurement in Forex",
    pipsText: "A pip is the smallest common variation used to measure price movements in Forex. Pips are used to calculate gains, losses, stop loss and risk management.",
    lotTitle: "The size of your trade",
    lotText: "The lot defines the financial size of the trade. The larger the lot, the larger the financial impact of each market move.",
    lotRows: [{ value: "0.01", label: "Micro lot" }, { value: "0.10", label: "Mini lot" }, { value: "1.00", label: "Standard lot" }],
    examplesTitle: "How lot size impacts your account",
    examplesText: "The larger the lot, the greater the potential gain and also the greater the risk.",
    examples: [
      { capital: "US$ 1,000", lot: "0.01", move: "100 pips", result: "US$ 10" },
      { capital: "US$ 1,000", lot: "0.10", move: "100 pips", result: "US$ 100" },
      { capital: "US$ 1,000", lot: "1.00", move: "100 pips", result: "US$ 1,000" },
    ],
    leverageTitle: "Leverage in Forex",
    leverageText: "Leverage allows you to control positions larger than the capital available in your account. With US$ 1,000 and 1:100 leverage, the operational capacity may reach US$ 100,000.",
    leverageWarning: "Higher leverage does not mean guaranteed profit. It also increases risk significantly.",
    pairsMainTitle: "Major currency pairs",
    mainPairs: [
      { pair: "EUR/USD", text: "Highest liquidity in the world" },
      { pair: "GBP/USD", text: "High volatility" },
      { pair: "USD/JPY", text: "Influenced by the Bank of Japan" },
      { pair: "AUD/USD", text: "Linked to commodities" },
      { pair: "USD/CAD", text: "Linked to oil" },
      { pair: "USD/CHF", text: "Global protection currency" },
    ],
    sessionsTitle: "Global Forex sessions",
    sessionsText: "The market works 24 hours a day. The overlap between London and New York usually concentrates the highest liquidity and movement.",
    sessions: ["Sydney", "Tokyo", "London", "New York"],
    levelsTitle: "How Formiga, Lobo and Harpia use Forex",
    levels: [
      { title: "Formiga: what it learns", tone: "rise", items: ["Currencies", "Pips", "Lots", "Risk management", "International account"] },
      { title: "Lobo: how it trades", tone: "gold", items: ["Ichimoku", "Risk management", "Correlations", "Liquidity", "Economic reading"] },
      { title: "Harpia: how it structures wealth", tone: "paper", items: ["Currency protection", "Global diversification", "International structure", "Strong currencies", "Wealth building"] },
    ],
    toolsTitle: "Related tools",
    tools: [
      { title: "Risk Calculator", text: "Calculate how much each trade can impact your account.", button: "Open calculator", href: "/calculadora-de-risco" },
      { title: "Correct Lot Size", text: "Discover which lot size fits your account size.", button: "Choose lot", href: "/ferramentas/lote-correto-forex" },
    ],
    finalTitle: "Learn Forex from beginner to advanced",
    finalText: "Deepen your knowledge, follow economic analysis and evolve inside the Formiga, Lobo and Harpia methodology.",
    educationButton: "View Education",
    freeButton: "Test the Formiga Channel for free",
  },
};

export const forexLibraryContent: Record<Locale, ForexLibraryContent> = {
  en,
  pt: {
    ...en,
    eyebrow: "Biblioteca de Mercados",
    title: "Forex: o maior mercado financeiro do mundo",
    subtitle: "Entenda como funciona a negociação de moedas, o que são pares cambiais, pips, lotes, alavancagem e por que trilhões de dólares circulam diariamente pelo mercado Forex.",
    metaTitle: "Forex: o maior mercado financeiro do mundo | Varejo Investidor",
    metaDescription: "Guia completo de Forex para iniciantes, intermediários e avançados: pares de moedas, pips, lotes, alavancagem, gestão de risco e conta internacional.",
    sections: {
      ...en.sections,
      whatTitle: "O que é o mercado Forex?",
      whatText: [
        "Forex, ou Foreign Exchange Market, é o mercado global de moedas.",
        "Bancos, empresas, governos, fundos e investidores negociam moedas diariamente para comércio internacional, investimentos, proteção cambial e movimentação de capital.",
        "Com mais de US$ 7 trilhões negociados diariamente, o Forex é o maior mercado financeiro do planeta.",
      ],
      whatCards: ["Mercado global", "Mais de US$ 7 trilhões por dia", "Funciona 24 horas", "Alta liquidez"],
      pairsTitle: "Como funcionam os pares de moedas",
      pairsText: "No Forex você sempre negocia uma moeda contra outra. Quando compra uma moeda, automaticamente vende outra.",
      pairs: [
        { pair: "EUR/USD", text: "Euro contra Dólar" },
        { pair: "GBP/USD", text: "Libra Esterlina contra Dólar" },
        { pair: "USD/JPY", text: "Dólar contra Iene Japonês" },
        { pair: "AUD/USD", text: "Dólar Australiano contra Dólar Americano" },
        { pair: "USD/CAD", text: "Dólar contra Dólar Canadense" },
      ],
      structureTitle: "Entendendo a estrutura de um par cambial",
      structureText: "Se EUR/USD está em 1.1000, significa que 1 euro vale 1,10 dólar. Se o preço sobe, o euro está ganhando força frente ao dólar.",
      pipsTitle: "A unidade de medida do Forex",
      pipsText: "Pip é a menor variação normalmente utilizada para medir movimentos de preço no Forex. Os pips são usados para calcular ganhos, perdas, stop loss e gerenciamento de risco.",
      lotTitle: "O tamanho da sua operação",
      lotText: "O lote define o tamanho financeiro da operação. Quanto maior o lote, maior será o impacto financeiro de cada movimento do mercado.",
      lotRows: [{ value: "0.01", label: "Micro Lote" }, { value: "0.10", label: "Mini Lote" }, { value: "1.00", label: "Lote Padrão" }],
      examplesTitle: "Como o lote impacta sua conta",
      examplesText: "Quanto maior o lote, maior o potencial de ganho e também maior o risco.",
      leverageTitle: "Alavancagem no Forex",
      leverageText: "A alavancagem permite controlar posições maiores do que o capital disponível na conta. Com US$ 1.000 e alavancagem 1:100, a capacidade operacional pode chegar a US$ 100.000.",
      leverageWarning: "Maior alavancagem não significa lucro garantido. Também aumenta significativamente o risco.",
      pairsMainTitle: "Principais pares de moedas",
      sessionsTitle: "Sessões globais do Forex",
      sessionsText: "O mercado funciona 24 horas por dia. O período entre Londres e Nova York normalmente concentra a maior liquidez e movimentação.",
      levelsTitle: "Como Formiga, Lobo e Harpia utilizam o Forex",
      levels: [
        { title: "Formiga: o que aprende", tone: "rise", items: ["Moedas", "Pips", "Lotes", "Gestão de risco", "Conta internacional"] },
        { title: "Lobo: como opera", tone: "gold", items: ["Ichimoku", "Gestão de risco", "Correlações", "Liquidez", "Leitura econômica"] },
        { title: "Harpia: como estrutura patrimônio", tone: "paper", items: ["Proteção cambial", "Diversificação global", "Estrutura internacional", "Moedas fortes", "Construção patrimonial"] },
      ],
      toolsTitle: "Ferramentas relacionadas",
      tools: [
        { title: "Calculadora de Risco", text: "Calcule quanto cada operação pode impactar sua conta.", button: "Abrir calculadora", href: "/calculadora-de-risco" },
        { title: "Escolha do Lote Correto", text: "Descubra qual lote é adequado para o tamanho da sua conta.", button: "Escolher lote", href: "/ferramentas/lote-correto-forex" },
      ],
      finalTitle: "Aprenda Forex do básico ao avançado",
      finalText: "Aprofunde seu conhecimento, acompanhe análises econômicas e evolua dentro da metodologia Formiga, Lobo e Harpia.",
      educationButton: "Conhecer Educação",
      freeButton: "Testar o Canal Formiga gratuitamente",
    },
  },
  es: {
    ...en,
    eyebrow: "Biblioteca de Mercados",
    title: "Forex: el mercado financiero más grande del mundo",
    subtitle: "Comprenda cómo funciona la negociación de divisas, qué son los pares, pips, lotes y apalancamiento, y por qué billones de dólares circulan diariamente por Forex.",
    metaTitle: "Forex: el mercado financiero más grande del mundo | Varejo Investidor",
    metaDescription: "Guía completa de Forex para principiantes, intermedios y avanzados: pares de divisas, pips, lotes, apalancamiento y gestión de riesgo.",
    sections: {
      ...en.sections,
      whatTitle: "¿Qué es el mercado Forex?",
      whatText: ["Forex es el mercado global de divisas.", "Bancos, empresas, gobiernos, fondos e inversores negocian monedas todos los días.", "Con más de US$ 7 billones negociados diariamente, Forex es el mercado financiero más grande del planeta."],
      whatCards: ["Mercado global", "Más de US$ 7 billones por día", "Funciona 24 horas", "Alta liquidez"],
      pairsTitle: "Cómo funcionan los pares de divisas",
      pairsText: "En Forex siempre negocia una moneda contra otra. Cuando compra una moneda, automáticamente vende otra.",
      structureTitle: "Entendiendo la estructura de un par cambiario",
      structureText: "Si EUR/USD está en 1.1000, significa que 1 euro vale 1,10 dólar. Si el precio sube, el euro gana fuerza frente al dólar.",
      pipsTitle: "La unidad de medida de Forex",
      pipsText: "El pip es la variación mínima comúnmente usada para medir movimientos de precio en Forex.",
      lotTitle: "El tamaño de su operación",
      lotText: "El lote define el tamaño financiero de la operación.",
      lotRows: [{ value: "0.01", label: "Micro lote" }, { value: "0.10", label: "Mini lote" }, { value: "1.00", label: "Lote estándar" }],
      examplesTitle: "Cómo el lote impacta su cuenta",
      leverageTitle: "Apalancamiento en Forex",
      leverageWarning: "Mayor apalancamiento no significa ganancia garantizada. También aumenta el riesgo.",
      pairsMainTitle: "Principales pares de divisas",
      sessionsTitle: "Sesiones globales de Forex",
      levelsTitle: "Cómo Formiga, Lobo y Harpia utilizan Forex",
      toolsTitle: "Herramientas relacionadas",
      finalTitle: "Aprenda Forex desde lo básico hasta lo avanzado",
      finalText: "Profundice su conocimiento, acompañe análisis económicos y evolucione dentro de la metodología Formiga, Lobo y Harpia.",
      educationButton: "Ver Educación",
      freeButton: "Probar el Canal Formiga gratis",
    },
  },
  hi: {
    ...en,
    eyebrow: "मार्केट लाइब्रेरी",
    title: "Forex: दुनिया का सबसे बड़ा वित्तीय बाजार",
    subtitle: "समझें कि currency trading कैसे काम करती है, currency pairs, pips, lots और leverage क्या हैं, और Forex बाजार में रोज़ाना खरबों डॉलर क्यों चलते हैं।",
    metaTitle: "Forex: दुनिया का सबसे बड़ा वित्तीय बाजार | Varejo Investidor",
    metaDescription: "शुरुआती, मध्यम और उन्नत निवेशकों के लिए Forex गाइड: currency pairs, pips, lots, leverage और risk management.",
    sections: {
      ...en.sections,
      whatTitle: "Forex बाजार क्या है?",
      whatText: ["Forex global currency market है।", "Banks, companies, governments, funds और investors रोज़ currencies trade करते हैं।", "रोज़ाना US$ 7 trillion से अधिक volume के साथ Forex दुनिया का सबसे बड़ा financial market है।"],
      whatCards: ["Global market", "US$ 7 trillion+ per day", "24 घंटे चलता है", "High liquidity"],
      pairsTitle: "Currency pairs कैसे काम करते हैं",
      pairsText: "Forex में आप हमेशा एक currency को दूसरी currency के खिलाफ trade करते हैं।",
      structureTitle: "Currency pair की संरचना समझना",
      structureText: "अगर EUR/USD 1.1000 है, तो 1 euro की कीमत 1.10 dollar है। कीमत बढ़ने पर euro dollar के मुकाबले मजबूत हो रहा है।",
      pipsTitle: "Forex की measurement unit",
      pipsText: "Pip Forex price movement को मापने की common unit है।",
      lotTitle: "आपके trade का size",
      lotText: "Lot trade का financial size तय करता है।",
      levelsTitle: "चींटी, भेड़िया और गरुड़ Forex का उपयोग कैसे करते हैं",
      toolsTitle: "संबंधित टूल",
      finalTitle: "Forex को basic से advanced तक सीखें",
      finalText: "अपना knowledge गहरा करें, economic analysis follow करें और Varejo methodology में evolve करें।",
      educationButton: "शिक्षा देखें",
      freeButton: "Formiga चैनल मुफ्त में टेस्ट करें",
    },
  },
  ar: {
    ...en,
    eyebrow: "مكتبة الأسواق",
    title: "الفوركس: أكبر سوق مالي في العالم",
    subtitle: "افهم كيف يعمل تداول العملات، وما هي أزواج العملات والنقاط والعقود والرافعة المالية، ولماذا تتحرك تريليونات الدولارات يوميا في سوق الفوركس.",
    metaTitle: "الفوركس: أكبر سوق مالي في العالم | Varejo Investidor",
    metaDescription: "دليل فوركس شامل للمبتدئين والمتوسطين والمتقدمين: أزواج العملات، النقاط، العقود، الرافعة المالية وإدارة المخاطر.",
    sections: {
      ...en.sections,
      whatTitle: "ما هو سوق الفوركس؟",
      whatText: ["الفوركس هو سوق العملات العالمي.", "تتداول البنوك والشركات والحكومات والصناديق والمستثمرون العملات يوميا.", "مع أكثر من 7 تريليونات دولار يوميا، يعد الفوركس أكبر سوق مالي في العالم."],
      whatCards: ["سوق عالمي", "أكثر من 7 تريليونات دولار يوميا", "يعمل 24 ساعة", "سيولة عالية"],
      pairsTitle: "كيف تعمل أزواج العملات",
      pairsText: "في الفوركس تتداول دائما عملة مقابل عملة أخرى.",
      structureTitle: "فهم بنية زوج العملات",
      structureText: "إذا كان EUR/USD عند 1.1000 فهذا يعني أن 1 يورو يساوي 1.10 دولار.",
      pipsTitle: "وحدة القياس في الفوركس",
      pipsText: "النقطة هي وحدة شائعة لقياس حركة السعر في الفوركس.",
      lotTitle: "حجم الصفقة",
      lotText: "العقد يحدد الحجم المالي للصفقة.",
      levelsTitle: "كيف تستخدم مستويات Formiga وLobo وHarpia الفوركس",
      toolsTitle: "أدوات مرتبطة",
      finalTitle: "تعلم الفوركس من الأساسيات إلى المستوى المتقدم",
      finalText: "عمق معرفتك وتابع التحليلات الاقتصادية وتطور داخل منهجية Varejo Investidor.",
      educationButton: "عرض التعليم",
      freeButton: "جرّب قناة Formiga مجانا",
    },
  },
  tr: {
    ...en,
    eyebrow: "Piyasa Kütüphanesi",
    title: "Forex: dünyanın en büyük finans piyasası",
    subtitle: "Döviz işlemlerinin nasıl çalıştığını, pariteleri, pipleri, lotları, kaldıracı ve Forex piyasasında neden her gün trilyonlarca dolar hareket ettiğini anlayın.",
    metaTitle: "Forex: dünyanın en büyük finans piyasası | Varejo Investidor",
    metaDescription: "Yeni başlayan, orta ve ileri düzey yatırımcılar için Forex rehberi: pariteler, pip, lot, kaldıraç ve risk yönetimi.",
    sections: { ...en.sections, finalTitle: "Forex'i temelden ileri seviyeye öğrenin", educationButton: "Eğitimi Gör", freeButton: "Formiga Kanalını ücretsiz dene" },
  },
  id: {
    ...en,
    eyebrow: "Perpustakaan Pasar",
    title: "Forex: pasar keuangan terbesar di dunia",
    subtitle: "Pahami cara kerja perdagangan mata uang, pasangan mata uang, pip, lot, leverage, dan mengapa triliunan dolar bergerak setiap hari di pasar Forex.",
    metaTitle: "Forex: pasar keuangan terbesar di dunia | Varejo Investidor",
    metaDescription: "Panduan Forex lengkap untuk pemula, menengah dan lanjutan: pasangan mata uang, pip, lot, leverage dan manajemen risiko.",
    sections: { ...en.sections, finalTitle: "Pelajari Forex dari dasar hingga lanjutan", educationButton: "Lihat Edukasi", freeButton: "Coba Channel Formiga gratis" },
  },
  vi: {
    ...en,
    eyebrow: "Thư Viện Thị Trường",
    title: "Forex: thị trường tài chính lớn nhất thế giới",
    subtitle: "Hiểu cách giao dịch tiền tệ hoạt động, cặp tiền, pip, lot, đòn bẩy và vì sao hàng nghìn tỷ đô la luân chuyển mỗi ngày trong thị trường Forex.",
    metaTitle: "Forex: thị trường tài chính lớn nhất thế giới | Varejo Investidor",
    metaDescription: "Hướng dẫn Forex đầy đủ cho người mới, trung cấp và nâng cao: cặp tiền, pip, lot, đòn bẩy và quản trị rủi ro.",
    sections: { ...en.sections, finalTitle: "Học Forex từ cơ bản đến nâng cao", educationButton: "Xem Giáo Dục", freeButton: "Thử Kênh Formiga miễn phí" },
  },
};

export function getForexLibraryContent(locale: Locale) {
  return forexLibraryContent[locale] ?? forexLibraryContent.en;
}
