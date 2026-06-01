import type { Locale } from "../i18n";

export type MarketSlug =
  | "forex"
  | "acoes"
  | "cripto"
  | "etfs"
  | "ouro"
  | "petroleo"
  | "commodities"
  | "fundos-imobiliarios";

export type MarketContent = {
  slug: MarketSlug;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  explanationTitle: string;
  explanation: string;
  howItWorksTitle: string;
  howItWorks: string;
  formiga: string[];
  lobo: string[];
  harpia: string[];
  characteristics: string[];
  faqs: { question: string; answer: string }[];
  related: MarketSlug[];
};

type MarketLocaleMap = Partial<Record<Locale, MarketContent>>;

const baseRelated: Record<MarketSlug, MarketSlug[]> = {
  forex: ["ouro", "petroleo", "cripto"],
  acoes: ["etfs", "commodities", "forex"],
  cripto: ["forex", "ouro", "etfs"],
  etfs: ["acoes", "forex", "ouro"],
  ouro: ["forex", "commodities", "petroleo"],
  petroleo: ["commodities", "forex", "ouro"],
  commodities: ["ouro", "petroleo", "acoes"],
  "fundos-imobiliarios": ["acoes", "etfs", "commodities"],
};

function makeMarket(
  slug: MarketSlug,
  locale: Locale,
  title: string,
  subtitle: string,
  explanation: string,
  howItWorks: string,
  formiga: string[],
  lobo: string[],
  harpia: string[],
  characteristics: string[],
  faqs: { question: string; answer: string }[],
): MarketContent {
  const seoTitle =
    locale === "pt"
      ? `${title} | Varejo Investidor`
      : locale === "es"
        ? `${title} | Varejo Investidor`
        : locale === "hi"
          ? `${title} | Varejo Investidor`
          : locale === "ar"
            ? `${title} | Varejo Investidor`
            : locale === "tr"
              ? `${title} | Varejo Investidor`
              : `${title} | Varejo Investidor`;

  return {
    slug,
    title,
    subtitle,
    metaTitle: seoTitle,
    metaDescription: subtitle,
    explanationTitle:
      locale === "pt"
        ? "O que é este mercado"
        : locale === "es"
          ? "Qué es este mercado"
          : locale === "hi"
            ? "यह बाजार क्या है"
            : locale === "ar"
              ? "ما هو هذا السوق"
              : locale === "tr"
                ? "Bu piyasa nedir"
                : "What this market is",
    explanation,
    howItWorksTitle:
      locale === "pt"
        ? "Como funciona"
        : locale === "es"
          ? "Cómo funciona"
          : locale === "hi"
            ? "यह कैसे काम करता है"
            : locale === "ar"
              ? "كيف يعمل"
              : locale === "tr"
                ? "Nasıl çalışır"
                : "How it works",
    howItWorks,
    formiga,
    lobo,
    harpia,
    characteristics,
    faqs,
    related: baseRelated[slug],
  };
}

export const marketContent: Record<MarketSlug, MarketLocaleMap> = {
  forex: {
    pt: makeMarket(
      "forex",
      "pt",
      "Forex: o maior mercado financeiro do mundo",
      "Moedas, juros, liquidez global e movimentação de capital entre países.",
      "Forex é o mercado global de moedas. Ele conecta bancos, empresas, fundos, governos e investidores em torno da negociação entre moedas como dólar, euro, libra, iene e franco suíço. É um mercado usado para comércio internacional, proteção cambial, especulação e leitura macroeconômica.",
      "O mercado cambial funciona por pares. Quando alguém negocia EUR/USD, por exemplo, está comparando euro contra dólar. Bancos centrais, juros, inflação, fluxo de capital, risco político e liquidez global influenciam diretamente esses movimentos.",
      ["Moedas", "Dólar", "Risco", "Alavancagem", "Conta internacional"],
      ["Operações estruturadas", "Ichimoku", "Gestão de risco", "Correlações", "Liquidez"],
      ["Proteção cambial", "Estrutura internacional", "Diversificação global", "Moedas fortes"],
      ["Mercado 24 horas", "Alta liquidez", "Pares principais", "Influência de bancos centrais", "Risco de alavancagem"],
      [
        { question: "O que é Forex?", answer: "Forex é o mercado internacional de moedas, onde pares cambiais são negociados continuamente por instituições e participantes globais." },
        { question: "Forex é seguro?", answer: "Forex envolve risco, principalmente por volatilidade e alavancagem. Segurança depende de corretora, gestão de risco e clareza operacional." },
        { question: "Por que o dólar importa?", answer: "O dólar é a principal moeda de reserva global e influencia commodities, comércio internacional, dívida e fluxos de capital." },
      ],
    ),
    en: makeMarket(
      "forex",
      "en",
      "Forex: the largest financial market in the world",
      "Currencies, interest rates, global liquidity and capital movement between countries.",
      "Forex is the global currency market. It connects banks, companies, funds, governments and investors around currency pairs such as the dollar, euro, pound, yen and Swiss franc.",
      "The foreign exchange market works through pairs. EUR/USD compares the euro against the dollar. Central banks, interest rates, inflation, capital flow and global risk shape price movement.",
      ["Currencies", "Dollar", "Risk", "Leverage", "International account"],
      ["Structured trades", "Ichimoku", "Risk management", "Correlations", "Liquidity"],
      ["Currency protection", "International structure", "Global diversification", "Strong currencies"],
      ["24-hour market", "Deep liquidity", "Major pairs", "Central bank impact", "Leverage risk"],
      [
        { question: "What is Forex?", answer: "Forex is the international currency market where global participants trade currency pairs continuously." },
        { question: "Is Forex safe?", answer: "Forex carries risk because of volatility and leverage. Protection comes from structure, broker quality and risk management." },
        { question: "Why does the dollar matter?", answer: "The dollar is the main global reserve currency and affects commodities, trade, debt and capital flows." },
      ],
    ),
    es: makeMarket(
      "forex",
      "es",
      "Forex: el mercado financiero más grande del mundo",
      "Monedas, tasas de interés, liquidez global y movimiento de capital entre países.",
      "Forex es el mercado global de divisas. Conecta bancos, empresas, fondos, gobiernos e inversores alrededor de pares como dólar, euro, libra, yen y franco suizo.",
      "El mercado cambiario funciona mediante pares. EUR/USD compara el euro contra el dólar. Bancos centrales, tasas, inflación, flujo de capital y riesgo global influyen en el precio.",
      ["Monedas", "Dólar", "Riesgo", "Apalancamiento", "Cuenta internacional"],
      ["Operaciones estructuradas", "Ichimoku", "Gestión de riesgo", "Correlaciones", "Liquidez"],
      ["Protección cambiaria", "Estructura internacional", "Diversificación global", "Monedas fuertes"],
      ["Mercado 24 horas", "Alta liquidez", "Pares principales", "Impacto de bancos centrales", "Riesgo de apalancamiento"],
      [
        { question: "¿Qué es Forex?", answer: "Forex es el mercado internacional de divisas, donde participantes globales negocian pares de monedas continuamente." },
        { question: "¿Forex es seguro?", answer: "Forex implica riesgo por volatilidad y apalancamiento. La seguridad depende de estructura, corredor y gestión de riesgo." },
        { question: "¿Por qué importa el dólar?", answer: "El dólar es la principal moneda de reserva global e influye en commodities, comercio, deuda y flujos de capital." },
      ],
    ),
    hi: makeMarket(
      "forex",
      "hi",
      "Forex: दुनिया का सबसे बड़ा वित्तीय बाजार",
      "मुद्राएँ, ब्याज दरें, वैश्विक तरलता और देशों के बीच पूंजी प्रवाह।",
      "Forex वैश्विक मुद्रा बाजार है। यह बैंक, कंपनियाँ, फंड, सरकारें और निवेशकों को डॉलर, यूरो, पाउंड, येन और फ्रैंक जैसे मुद्रा जोड़ों के माध्यम से जोड़ता है।",
      "Forex जोड़ों में काम करता है। EUR/USD यूरो की तुलना डॉलर से करता है। केंद्रीय बैंक, ब्याज दरें, मुद्रास्फीति, पूंजी प्रवाह और वैश्विक जोखिम कीमतों को प्रभावित करते हैं।",
      ["मुद्राएँ", "डॉलर", "जोखिम", "लीवरेज", "अंतरराष्ट्रीय खाता"],
      ["संरचित ट्रेड", "Ichimoku", "जोखिम प्रबंधन", "सहसंबंध", "तरलता"],
      ["मुद्रा सुरक्षा", "अंतरराष्ट्रीय संरचना", "वैश्विक विविधीकरण", "मजबूत मुद्राएँ"],
      ["24 घंटे का बाजार", "गहरी तरलता", "मुख्य जोड़े", "केंद्रीय बैंक प्रभाव", "लीवरेज जोखिम"],
      [
        { question: "Forex क्या है?", answer: "Forex अंतरराष्ट्रीय मुद्रा बाजार है, जहाँ वैश्विक प्रतिभागी मुद्रा जोड़ों का निरंतर लेन-देन करते हैं।" },
        { question: "क्या Forex सुरक्षित है?", answer: "Forex में अस्थिरता और लीवरेज के कारण जोखिम होता है। सुरक्षा संरचना, ब्रोकर और जोखिम प्रबंधन पर निर्भर करती है।" },
        { question: "डॉलर क्यों महत्वपूर्ण है?", answer: "डॉलर मुख्य वैश्विक रिजर्व मुद्रा है और commodities, व्यापार, ऋण तथा पूंजी प्रवाह को प्रभावित करता है।" },
      ],
    ),
    ar: makeMarket(
      "forex",
      "ar",
      "الفوركس: أكبر سوق مالي في العالم",
      "العملات، أسعار الفائدة، السيولة العالمية وحركة رأس المال بين الدول.",
      "الفوركس هو سوق العملات العالمي. يربط البنوك والشركات والصناديق والحكومات والمستثمرين عبر أزواج العملات مثل الدولار واليورو والجنيه والين.",
      "يعمل السوق من خلال أزواج العملات. زوج EUR/USD يقارن اليورو بالدولار. البنوك المركزية والفائدة والتضخم وتدفقات رأس المال تؤثر في الحركة.",
      ["العملات", "الدولار", "المخاطر", "الرافعة المالية", "حساب دولي"],
      ["عمليات منظمة", "Ichimoku", "إدارة المخاطر", "الارتباطات", "السيولة"],
      ["حماية العملة", "هيكل دولي", "تنويع عالمي", "عملات قوية"],
      ["سوق يعمل 24 ساعة", "سيولة عالية", "الأزواج الرئيسية", "تأثير البنوك المركزية", "مخاطر الرافعة"],
      [
        { question: "ما هو الفوركس؟", answer: "الفوركس هو سوق العملات الدولي حيث يتم تداول أزواج العملات بين المشاركين العالميين." },
        { question: "هل الفوركس آمن؟", answer: "الفوركس يحمل مخاطر بسبب التقلب والرافعة المالية. الحماية تعتمد على الهيكل وإدارة المخاطر." },
        { question: "لماذا الدولار مهم؟", answer: "الدولار هو عملة الاحتياطي العالمية الأساسية ويؤثر في السلع والتجارة والديون وتدفقات رأس المال." },
      ],
    ),
    tr: makeMarket(
      "forex",
      "tr",
      "Forex: dünyanın en büyük finans piyasası",
      "Para birimleri, faizler, küresel likidite ve ülkeler arası sermaye hareketi.",
      "Forex küresel döviz piyasasıdır. Bankaları, şirketleri, fonları, hükümetleri ve yatırımcıları dolar, euro, sterlin, yen ve frank gibi para birimleri etrafında birleştirir.",
      "Döviz piyasası paritelerle çalışır. EUR/USD euroyu dolara karşı ölçer. Merkez bankaları, faizler, enflasyon, sermaye akışı ve küresel risk fiyatları etkiler.",
      ["Para birimleri", "Dolar", "Risk", "Kaldıraç", "Uluslararası hesap"],
      ["Yapılandırılmış işlemler", "Ichimoku", "Risk yönetimi", "Korelasyonlar", "Likidite"],
      ["Kur koruması", "Uluslararası yapı", "Küresel çeşitlendirme", "Güçlü paralar"],
      ["24 saat piyasa", "Derin likidite", "Majör pariteler", "Merkez bankası etkisi", "Kaldıraç riski"],
      [
        { question: "Forex nedir?", answer: "Forex, küresel katılımcıların döviz paritelerini sürekli olarak işlem yaptığı uluslararası piyasadır." },
        { question: "Forex güvenli mi?", answer: "Forex volatilite ve kaldıraç nedeniyle risk taşır. Güvenlik yapı, aracı kurum ve risk yönetimine bağlıdır." },
        { question: "Dolar neden önemlidir?", answer: "Dolar temel küresel rezerv para birimidir ve emtiaları, ticareti, borcu ve sermaye akışlarını etkiler." },
      ],
    ),
  },
  acoes: {
    pt: makeMarket("acoes", "pt", "Ações: participação em empresas globais", "Empresas, bolsa, dividendos, setores e construção patrimonial por participação societária.", "Ações representam participação em empresas. Ao comprar uma ação, o investidor se expõe ao resultado, crescimento, risco e geração de caixa de um negócio.", "O preço de uma ação reflete expectativas sobre lucro, juros, crescimento, governança, setor e fluxo de mercado.", ["Entender empresas", "Bolsa", "Dividendos"], ["Setores", "Crescimento", "Resultados", "Fluxo"], ["Patrimônio global", "Dividendos internacionais", "Estrutura geracional"], ["Participação societária", "Dividendos", "Volatilidade", "Setores econômicos", "Ciclos de lucro"], [{ question: "Como investir em ações?", answer: "O primeiro passo é entender empresas, risco, diversificação e prazo. A decisão deve considerar perfil e objetivos." }, { question: "Ações pagam renda?", answer: "Algumas empresas distribuem dividendos, mas isso não é garantido e depende de lucro, caixa e política da companhia." }]),
    en: makeMarket("acoes", "en", "Stocks: ownership in global companies", "Companies, exchanges, dividends, sectors and wealth building through business ownership.", "Stocks represent ownership in companies. Buying a share exposes the investor to business results, growth, risk and cash generation.", "Stock prices reflect expectations about earnings, rates, growth, governance, sector conditions and market flows.", ["Understand companies", "Stock exchanges", "Dividends"], ["Sectors", "Growth", "Earnings", "Flow"], ["Global wealth", "International dividends", "Generational structure"], ["Business ownership", "Dividends", "Volatility", "Economic sectors", "Profit cycles"], [{ question: "How do you invest in stocks?", answer: "Start by understanding companies, risk, diversification and time horizon. Every decision should match profile and goals." }, { question: "Do stocks generate income?", answer: "Some companies pay dividends, but income is not guaranteed and depends on profit, cash flow and company policy." }]),
    es: makeMarket("acoes", "es", "Acciones: participación en empresas globales", "Empresas, bolsa, dividendos, sectores y construcción patrimonial mediante participación societaria.", "Las acciones representan participación en empresas. Al comprar una acción, el inversor se expone a resultados, crecimiento, riesgo y caja del negocio.", "El precio refleja expectativas sobre ganancias, tasas, crecimiento, gobierno corporativo, sector y flujo de mercado.", ["Entender empresas", "Bolsa", "Dividendos"], ["Sectores", "Crecimiento", "Resultados", "Flujo"], ["Patrimonio global", "Dividendos internacionales", "Estructura generacional"], ["Participación societaria", "Dividendos", "Volatilidad", "Sectores económicos", "Ciclos de ganancias"], [{ question: "¿Cómo invertir en acciones?", answer: "Primero hay que entender empresas, riesgo, diversificación y horizonte. La decisión debe respetar perfil y objetivos." }, { question: "¿Las acciones generan renta?", answer: "Algunas empresas pagan dividendos, pero no es garantizado y depende de beneficios, caja y política corporativa." }]),
    hi: makeMarket("acoes", "hi", "शेयर: वैश्विक कंपनियों में भागीदारी", "कंपनियाँ, एक्सचेंज, डिविडेंड, सेक्टर और स्वामित्व के माध्यम से संपत्ति निर्माण।", "शेयर कंपनियों में स्वामित्व का हिस्सा हैं। शेयर खरीदने से निवेशक कंपनी के परिणाम, विकास, जोखिम और नकदी प्रवाह से जुड़ता है।", "शेयर कीमतें आय, ब्याज दर, विकास, गवर्नेंस, सेक्टर और बाजार प्रवाह की अपेक्षाओं को दर्शाती हैं।", ["कंपनियों को समझना", "स्टॉक एक्सचेंज", "डिविडेंड"], ["सेक्टर", "विकास", "परिणाम", "प्रवाह"], ["वैश्विक संपत्ति", "अंतरराष्ट्रीय डिविडेंड", "पीढ़ीगत संरचना"], ["स्वामित्व", "डिविडेंड", "अस्थिरता", "आर्थिक सेक्टर", "लाभ चक्र"], [{ question: "शेयर में निवेश कैसे करें?", answer: "कंपनी, जोखिम, विविधीकरण और समय अवधि समझकर शुरुआत करें। निर्णय प्रोफाइल और लक्ष्य से जुड़ा होना चाहिए।" }, { question: "क्या शेयर आय देते हैं?", answer: "कुछ कंपनियाँ डिविडेंड देती हैं, लेकिन यह गारंटी नहीं है और कंपनी के लाभ तथा नीति पर निर्भर करता है।" }]),
    ar: makeMarket("acoes", "ar", "الأسهم: ملكية في شركات عالمية", "الشركات، البورصات، التوزيعات، القطاعات وبناء الثروة عبر الملكية.", "الأسهم تمثل حصة ملكية في الشركات. شراء سهم يربط المستثمر بنتائج الشركة ونموها ومخاطرها وتدفقها النقدي.", "سعر السهم يعكس توقعات الأرباح والفائدة والنمو والحوكمة والقطاع وتدفقات السوق.", ["فهم الشركات", "البورصة", "التوزيعات"], ["القطاعات", "النمو", "النتائج", "التدفق"], ["ثروة عالمية", "توزيعات دولية", "هيكل أجيال"], ["ملكية", "توزيعات", "تقلب", "قطاعات اقتصادية", "دورات الربح"], [{ question: "كيف أستثمر في الأسهم؟", answer: "ابدأ بفهم الشركات والمخاطر والتنويع والمدة الزمنية. القرار يجب أن يناسب الأهداف والملف الشخصي." }, { question: "هل الأسهم تولد دخلا؟", answer: "بعض الشركات توزع أرباحا، لكن ذلك غير مضمون ويعتمد على الأرباح والسيولة والسياسة." }]),
    tr: makeMarket("acoes", "tr", "Hisseler: küresel şirketlerde ortaklık", "Şirketler, borsalar, temettüler, sektörler ve işletme ortaklığıyla servet inşası.", "Hisseler şirketlerde ortaklık payını temsil eder. Hisse almak, yatırımcıyı şirket sonuçlarına, büyümeye, riske ve nakit üretimine bağlar.", "Hisse fiyatı kâr, faiz, büyüme, yönetim, sektör ve piyasa akışı beklentilerini yansıtır.", ["Şirketleri anlamak", "Borsa", "Temettüler"], ["Sektörler", "Büyüme", "Sonuçlar", "Akış"], ["Küresel servet", "Uluslararası temettüler", "Nesiller arası yapı"], ["Ortaklık", "Temettü", "Volatilite", "Ekonomik sektörler", "Kâr döngüleri"], [{ question: "Hisseye nasıl yatırım yapılır?", answer: "Şirketleri, riski, çeşitlendirmeyi ve vadeyi anlayarak başlanır. Karar profil ve hedeflerle uyumlu olmalıdır." }, { question: "Hisseler gelir sağlar mı?", answer: "Bazı şirketler temettü öder, ancak bu garanti değildir ve kâra, nakde ve politikaya bağlıdır." }]),
  },
  cripto: {
    pt: makeMarket("cripto", "pt", "Criptomoedas e ativos digitais", "Bitcoin, blockchain, ciclos de liquidez, custódia e reserva alternativa.", "Criptomoedas são ativos digitais baseados em redes descentralizadas. O mercado combina tecnologia, liquidez global, narrativa, segurança e ciclos de risco.", "Os criptoativos negociam continuamente e reagem a liquidez, adoção, regulação, ciclos de Bitcoin, stablecoins e apetite por risco.", ["Bitcoin", "Blockchain", "Segurança"], ["Ciclos", "Liquidez", "Operações"], ["Custódia", "Reserva alternativa", "Proteção sistêmica"], ["Mercado 24/7", "Alta volatilidade", "Custódia digital", "Narrativas de ciclo", "Risco regulatório"], [{ question: "O Bitcoin é reserva de valor?", answer: "Para parte do mercado, Bitcoin funciona como reserva alternativa escassa. Ainda assim, tem alta volatilidade e exige gestão de risco." }, { question: "Cripto é para iniciantes?", answer: "Pode ser estudado por iniciantes, mas exposição financeira exige segurança, controle emocional e entendimento de volatilidade." }]),
    en: makeMarket("cripto", "en", "Cryptocurrencies and digital assets", "Bitcoin, blockchain, liquidity cycles, custody and alternative reserves.", "Cryptocurrencies are digital assets built on decentralized networks. The market combines technology, global liquidity, narrative, security and risk cycles.", "Digital assets trade continuously and react to liquidity, adoption, regulation, Bitcoin cycles, stablecoins and risk appetite.", ["Bitcoin", "Blockchain", "Security"], ["Cycles", "Liquidity", "Trades"], ["Custody", "Alternative reserve", "Systemic protection"], ["24/7 market", "High volatility", "Digital custody", "Cycle narratives", "Regulatory risk"], [{ question: "Is Bitcoin a store of value?", answer: "For part of the market, Bitcoin works as a scarce alternative reserve. It still carries high volatility and needs risk management." }, { question: "Is crypto for beginners?", answer: "Beginners can study crypto, but financial exposure requires security, emotional control and volatility awareness." }]),
    es: makeMarket("cripto", "es", "Criptomonedas y activos digitales", "Bitcoin, blockchain, ciclos de liquidez, custodia y reserva alternativa.", "Las criptomonedas son activos digitales basados en redes descentralizadas. El mercado combina tecnología, liquidez global, narrativa, seguridad y ciclos de riesgo.", "Los criptoactivos negocian continuamente y reaccionan a liquidez, adopción, regulación, ciclos de Bitcoin, stablecoins y apetito por riesgo.", ["Bitcoin", "Blockchain", "Seguridad"], ["Ciclos", "Liquidez", "Operaciones"], ["Custodia", "Reserva alternativa", "Protección sistémica"], ["Mercado 24/7", "Alta volatilidad", "Custodia digital", "Narrativas de ciclo", "Riesgo regulatorio"], [{ question: "¿Bitcoin es reserva de valor?", answer: "Para parte del mercado, Bitcoin funciona como reserva alternativa escasa. Aun así, tiene alta volatilidad y exige gestión de riesgo." }, { question: "¿Cripto es para principiantes?", answer: "Puede estudiarse desde el inicio, pero la exposición financiera exige seguridad, control emocional y comprensión de volatilidad." }]),
    hi: makeMarket("cripto", "hi", "क्रिप्टोकरेंसी और डिजिटल एसेट", "Bitcoin, blockchain, liquidity cycles, custody और वैकल्पिक रिजर्व।", "क्रिप्टोकरेंसी विकेंद्रीकृत नेटवर्क पर आधारित डिजिटल एसेट हैं। यह बाजार तकनीक, वैश्विक तरलता, कथा, सुरक्षा और जोखिम चक्रों को जोड़ता है।", "डिजिटल एसेट लगातार ट्रेड होते हैं और तरलता, adoption, regulation, Bitcoin cycles, stablecoins और risk appetite से प्रभावित होते हैं।", ["Bitcoin", "Blockchain", "सुरक्षा"], ["चक्र", "तरलता", "ट्रेड"], ["कस्टडी", "वैकल्पिक रिजर्व", "सिस्टम सुरक्षा"], ["24/7 बाजार", "उच्च अस्थिरता", "डिजिटल कस्टडी", "साइकिल नैरेटिव", "नियामकीय जोखिम"], [{ question: "क्या Bitcoin वैल्यू स्टोर है?", answer: "बाजार का एक हिस्सा Bitcoin को scarce alternative reserve मानता है। फिर भी इसमें उच्च अस्थिरता है और जोखिम प्रबंधन जरूरी है।" }, { question: "क्या क्रिप्टो शुरुआती लोगों के लिए है?", answer: "शुरुआती इसे पढ़ सकते हैं, लेकिन निवेश के लिए सुरक्षा, भावनात्मक नियंत्रण और volatility समझना जरूरी है।" }]),
    ar: makeMarket("cripto", "ar", "العملات المشفرة والأصول الرقمية", "Bitcoin، blockchain، دورات السيولة، الحفظ والاحتياطي البديل.", "العملات المشفرة أصول رقمية مبنية على شبكات لا مركزية. يجمع هذا السوق بين التقنية والسيولة العالمية والسرديات والأمان ودورات المخاطر.", "تتداول الأصول الرقمية باستمرار وتتأثر بالسيولة والتبني والتنظيم ودورات Bitcoin والعملات المستقرة وشهية المخاطر.", ["Bitcoin", "Blockchain", "الأمان"], ["الدورات", "السيولة", "العمليات"], ["الحفظ", "احتياطي بديل", "حماية نظامية"], ["سوق 24/7", "تقلب عال", "حفظ رقمي", "سرديات الدورة", "مخاطر تنظيمية"], [{ question: "هل Bitcoin مخزن قيمة؟", answer: "يراه جزء من السوق احتياطيا بديلا نادرا، لكنه يبقى عالي التقلب ويحتاج إدارة مخاطر." }, { question: "هل الكريبتو مناسب للمبتدئين؟", answer: "يمكن دراسته من البداية، لكن التعرض المالي يتطلب أمانا وانضباطا وفهما للتقلب." }]),
    tr: makeMarket("cripto", "tr", "Kripto paralar ve dijital varlıklar", "Bitcoin, blockchain, likidite döngüleri, saklama ve alternatif rezerv.", "Kripto paralar merkeziyetsiz ağlar üzerine kurulu dijital varlıklardır. Piyasa teknoloji, küresel likidite, anlatı, güvenlik ve risk döngülerini birleştirir.", "Dijital varlıklar sürekli işlem görür ve likidite, benimsenme, düzenleme, Bitcoin döngüleri, stablecoinler ve risk iştahından etkilenir.", ["Bitcoin", "Blockchain", "Güvenlik"], ["Döngüler", "Likidite", "İşlemler"], ["Saklama", "Alternatif rezerv", "Sistem koruması"], ["24/7 piyasa", "Yüksek volatilite", "Dijital saklama", "Döngü anlatıları", "Regülasyon riski"], [{ question: "Bitcoin değer saklama aracı mı?", answer: "Piyasanın bir kısmı Bitcoin'i kıt alternatif rezerv olarak görür. Yine de yüksek volatilite taşır ve risk yönetimi ister." }, { question: "Kripto yeni başlayanlar için mi?", answer: "Yeni başlayanlar öğrenebilir, ancak finansal maruziyet güvenlik, duygusal kontrol ve volatilite bilinci gerektirir." }]),
  },
  etfs: {
    pt: makeMarket("etfs", "pt", "ETFs: acesso global através de um único ativo", "Diversificação, índices, setores e carteiras globais com estrutura simples.", "ETFs são fundos negociados em bolsa que replicam índices, setores, países ou cestas de ativos. Eles ajudam o investidor a acessar muitos ativos por meio de um único instrumento.", "Um ETF compra ou replica uma cesta definida. Seu preço acompanha o conjunto de ativos, permitindo diversificação com liquidez e transparência.", ["Diversificação", "Índices", "Baixo custo"], ["Alocação estratégica", "Setores", "Rebalanceamento"], ["Estrutura internacional", "Carteiras globais", "Moedas fortes"], ["Diversificação", "Liquidez", "Exposição setorial", "Acesso internacional", "Transparência"], [{ question: "O que é ETF?", answer: "ETF é um fundo negociado em bolsa que busca acompanhar um índice, setor ou cesta de ativos." }, { question: "ETFs substituem ações?", answer: "Não necessariamente. Eles podem complementar ações individuais com diversificação e simplicidade." }]),
    en: makeMarket("etfs", "en", "ETFs: global access through a single asset", "Diversification, indices, sectors and global portfolios with simple structure.", "ETFs are exchange-traded funds that track indices, sectors, countries or baskets of assets. They help investors access many assets through one instrument.", "An ETF buys or replicates a defined basket. Its price follows that set of assets, allowing diversification with liquidity and transparency.", ["Diversification", "Indices", "Lower cost"], ["Strategic allocation", "Sectors", "Rebalancing"], ["International structure", "Global portfolios", "Strong currencies"], ["Diversification", "Liquidity", "Sector exposure", "International access", "Transparency"], [{ question: "What is an ETF?", answer: "An ETF is an exchange-traded fund designed to track an index, sector or basket of assets." }, { question: "Do ETFs replace stocks?", answer: "Not necessarily. They can complement individual stocks with diversification and simplicity." }]),
    es: makeMarket("etfs", "es", "ETFs: acceso global a través de un solo activo", "Diversificación, índices, sectores y carteras globales con estructura simple.", "Los ETFs son fondos cotizados que replican índices, sectores, países o cestas de activos. Permiten acceder a muchos activos con un solo instrumento.", "Un ETF compra o replica una cesta definida. Su precio sigue ese conjunto de activos y permite diversificación con liquidez y transparencia.", ["Diversificación", "Índices", "Menor costo"], ["Asignación estratégica", "Sectores", "Rebalanceo"], ["Estructura internacional", "Carteras globales", "Monedas fuertes"], ["Diversificación", "Liquidez", "Exposición sectorial", "Acceso internacional", "Transparencia"], [{ question: "¿Qué es un ETF?", answer: "Un ETF es un fondo cotizado que busca seguir un índice, sector o cesta de activos." }, { question: "¿Los ETFs reemplazan acciones?", answer: "No necesariamente. Pueden complementar acciones individuales con diversificación y simplicidad." }]),
    hi: makeMarket("etfs", "hi", "ETFs: एक एसेट से वैश्विक पहुंच", "Diversification, indices, sectors और सरल संरचना वाली global portfolios.", "ETFs exchange-traded funds हैं जो indices, sectors, countries या asset baskets को track करते हैं। वे एक ही instrument से कई assets तक पहुंच देते हैं।", "ETF एक defined basket खरीदता या replicate करता है। उसका मूल्य assets के समूह को follow करता है, जिससे liquidity और transparency के साथ diversification मिलता है।", ["Diversification", "Indices", "कम लागत"], ["Strategic allocation", "Sectors", "Rebalancing"], ["International structure", "Global portfolios", "Strong currencies"], ["Diversification", "Liquidity", "Sector exposure", "International access", "Transparency"], [{ question: "ETF क्या है?", answer: "ETF exchange पर trade होने वाला fund है जो index, sector या asset basket को track करता है।" }, { question: "क्या ETF stocks की जगह लेता है?", answer: "जरूरी नहीं। ETF individual stocks को diversification और simplicity के साथ complement कर सकता है।" }]),
    ar: makeMarket("etfs", "ar", "صناديق ETF: وصول عالمي من خلال أصل واحد", "تنويع، مؤشرات، قطاعات ومحافظ عالمية بهيكل بسيط.", "صناديق ETF هي صناديق متداولة في البورصة تتبع مؤشرات أو قطاعات أو دولا أو سلات أصول. تمنح المستثمر وصولا واسعا عبر أداة واحدة.", "يشتري ETF أو يكرر سلة محددة. سعره يتبع مجموعة الأصول، ما يسمح بالتنويع مع السيولة والشفافية.", ["تنويع", "مؤشرات", "تكلفة أقل"], ["توزيع استراتيجي", "قطاعات", "إعادة توازن"], ["هيكل دولي", "محافظ عالمية", "عملات قوية"], ["تنويع", "سيولة", "تعرض قطاعي", "وصول دولي", "شفافية"], [{ question: "ما هو ETF؟", answer: "ETF صندوق متداول في البورصة يهدف إلى تتبع مؤشر أو قطاع أو سلة أصول." }, { question: "هل ETF يستبدل الأسهم؟", answer: "ليس بالضرورة. يمكن أن يكمل الأسهم الفردية بالتنويع والبساطة." }]),
    tr: makeMarket("etfs", "tr", "ETF'ler: tek varlıkla küresel erişim", "Çeşitlendirme, endeksler, sektörler ve sade yapıyla küresel portföyler.", "ETF'ler borsada işlem gören ve endeksleri, sektörleri, ülkeleri ya da varlık sepetlerini izleyen fonlardır. Tek araçla geniş erişim sağlar.", "ETF belirli bir sepeti satın alır veya izler. Fiyatı bu varlık grubunu takip eder; likidite ve şeffaflıkla çeşitlendirme sağlar.", ["Çeşitlendirme", "Endeksler", "Düşük maliyet"], ["Stratejik dağılım", "Sektörler", "Yeniden dengeleme"], ["Uluslararası yapı", "Küresel portföyler", "Güçlü paralar"], ["Çeşitlendirme", "Likidite", "Sektör maruziyeti", "Uluslararası erişim", "Şeffaflık"], [{ question: "ETF nedir?", answer: "ETF, bir endeksi, sektörü veya varlık sepetini izleyen borsada işlem gören fondur." }, { question: "ETF hisselerin yerini alır mı?", answer: "Her zaman değil. Bireysel hisseleri çeşitlendirme ve sadelikle tamamlayabilir." }]),
  },
  ouro: {
    pt: makeMarket("ouro", "pt", "Ouro: proteção em tempos de incerteza", "Reserva histórica, proteção, ciclos de dólar, juros reais e risco global.", "O ouro é um ativo monetário e físico usado historicamente como proteção em momentos de incerteza, inflação, crise bancária e perda de confiança em moedas.", "O ouro reage a juros reais, dólar, geopolítica, bancos centrais, inflação e busca por segurança.", ["Entender o ativo", "Proteção", "Inflação"], ["Operar ciclos", "Dólar", "Ichimoku"], ["Preservação patrimonial", "Reserva global", "Proteção"], ["Ativo físico", "Reserva histórica", "Sensível a juros reais", "Ligado ao dólar", "Proteção em crise"], [{ question: "Qual a diferença entre ouro e dólar?", answer: "O dólar é moeda de reserva e meio de troca global. O ouro é reserva física e histórica, sem risco de emissor." }, { question: "Ouro protege patrimônio?", answer: "Pode ajudar na proteção em determinados ciclos, mas também oscila e precisa estar dentro de uma estratégia." }]),
    en: makeMarket("ouro", "en", "Gold: protection in uncertain times", "Historical reserve, protection, dollar cycles, real rates and global risk.", "Gold is a monetary and physical asset historically used as protection during uncertainty, inflation, banking stress and currency distrust.", "Gold reacts to real rates, the dollar, geopolitics, central banks, inflation and the search for safety.", ["Understand the asset", "Protection", "Inflation"], ["Trade cycles", "Dollar", "Ichimoku"], ["Wealth preservation", "Global reserve", "Protection"], ["Physical asset", "Historical reserve", "Sensitive to real rates", "Linked to the dollar", "Crisis protection"], [{ question: "What is the difference between gold and the dollar?", answer: "The dollar is a reserve currency and global medium of exchange. Gold is a physical historical reserve with no issuer risk." }, { question: "Does gold protect wealth?", answer: "It can help in certain cycles, but it also fluctuates and should fit within a strategy." }]),
    es: makeMarket("ouro", "es", "Oro: protección en tiempos de incertidumbre", "Reserva histórica, protección, ciclos del dólar, tasas reales y riesgo global.", "El oro es un activo monetario y físico usado históricamente como protección en incertidumbre, inflación, estrés bancario y desconfianza monetaria.", "El oro reacciona a tasas reales, dólar, geopolítica, bancos centrales, inflación y búsqueda de seguridad.", ["Entender el activo", "Protección", "Inflación"], ["Operar ciclos", "Dólar", "Ichimoku"], ["Preservación patrimonial", "Reserva global", "Protección"], ["Activo físico", "Reserva histórica", "Sensible a tasas reales", "Ligado al dólar", "Protección en crisis"], [{ question: "¿Cuál es la diferencia entre oro y dólar?", answer: "El dólar es moneda de reserva y medio global de intercambio. El oro es reserva física histórica sin riesgo de emisor." }, { question: "¿El oro protege patrimonio?", answer: "Puede ayudar en ciertos ciclos, pero también fluctúa y debe formar parte de una estrategia." }]),
    hi: makeMarket("ouro", "hi", "सोना: अनिश्चित समय में सुरक्षा", "Historical reserve, protection, dollar cycles, real rates और global risk.", "सोना एक monetary और physical asset है, जिसे अनिश्चितता, inflation, banking stress और currency distrust के समय protection के रूप में देखा जाता है।", "सोना real rates, dollar, geopolitics, central banks, inflation और safety demand से प्रभावित होता है।", ["Asset समझना", "Protection", "Inflation"], ["Cycles trade करना", "Dollar", "Ichimoku"], ["Wealth preservation", "Global reserve", "Protection"], ["Physical asset", "Historical reserve", "Real rates sensitive", "Dollar linked", "Crisis protection"], [{ question: "सोना और डॉलर में क्या अंतर है?", answer: "Dollar global reserve currency है। Gold physical historical reserve है जिसमें issuer risk नहीं होता।" }, { question: "क्या Gold wealth protect करता है?", answer: "कुछ cycles में protection दे सकता है, लेकिन इसमें भी fluctuation है और strategy जरूरी है।" }]),
    ar: makeMarket("ouro", "ar", "الذهب: حماية في أوقات عدم اليقين", "احتياطي تاريخي، حماية، دورات الدولار، الفائدة الحقيقية والمخاطر العالمية.", "الذهب أصل نقدي ومادي استخدم تاريخيا كحماية أثناء عدم اليقين والتضخم وضغط البنوك وفقدان الثقة بالعملات.", "يتأثر الذهب بالفائدة الحقيقية والدولار والجغرافيا السياسية والبنوك المركزية والتضخم والبحث عن الأمان.", ["فهم الأصل", "حماية", "تضخم"], ["تداول الدورات", "الدولار", "Ichimoku"], ["حفظ الثروة", "احتياطي عالمي", "حماية"], ["أصل مادي", "احتياطي تاريخي", "حساس للفائدة الحقيقية", "مرتبط بالدولار", "حماية في الأزمات"], [{ question: "ما الفرق بين الذهب والدولار؟", answer: "الدولار عملة احتياط ووسيط عالمي. الذهب احتياطي مادي تاريخي دون مخاطر مصدر." }, { question: "هل الذهب يحمي الثروة؟", answer: "قد يساعد في دورات معينة، لكنه يتقلب ويجب أن يكون ضمن استراتيجية." }]),
    tr: makeMarket("ouro", "tr", "Altın: belirsizlik dönemlerinde koruma", "Tarihsel rezerv, koruma, dolar döngüleri, reel faizler ve küresel risk.", "Altın tarihsel olarak belirsizlik, enflasyon, bankacılık stresi ve para birimlerine güvensizlik dönemlerinde koruma olarak kullanılan parasal ve fiziksel varlıktır.", "Altın reel faizlere, dolara, jeopolitiğe, merkez bankalarına, enflasyona ve güvenli liman talebine tepki verir.", ["Varlığı anlamak", "Koruma", "Enflasyon"], ["Döngüleri işlem yapmak", "Dolar", "Ichimoku"], ["Servet koruma", "Küresel rezerv", "Koruma"], ["Fiziksel varlık", "Tarihsel rezerv", "Reel faize duyarlı", "Dolar bağlantılı", "Kriz koruması"], [{ question: "Altın ile dolar arasındaki fark nedir?", answer: "Dolar küresel rezerv para ve değişim aracıdır. Altın ihraççı riski olmayan tarihsel fiziksel rezervdir." }, { question: "Altın serveti korur mu?", answer: "Bazı döngülerde yardımcı olabilir, ancak dalgalanır ve strateji içinde yer almalıdır." }]),
  },
  petroleo: {
    pt: makeMarket("petroleo", "pt", "Petróleo: energia, geopolítica e economia global", "Oferta, demanda, inflação, transporte, produção e risco geopolítico.", "O petróleo é uma das principais commodities do mundo. Ele afeta energia, transporte, inflação, moedas de países produtores e decisões macroeconômicas.", "Seu preço reage a produção, estoques, OPEP, demanda global, guerras, dólar e crescimento econômico.", ["Conhecer o mercado", "Energia", "Inflação"], ["Operar oferta e demanda", "Estoques", "Ciclos"], ["Analisar impactos macroeconômicos", "Geopolítica", "Inflação global"], ["Commodity energética", "Sensível à geopolítica", "Influência na inflação", "Estoques semanais", "Relação com dólar"], [{ question: "Por que petróleo influencia a economia?", answer: "Porque energia e transporte entram no custo de quase todas as cadeias produtivas." }, { question: "Petróleo é commodity?", answer: "Sim. É uma commodity energética negociada globalmente e influenciada por oferta, demanda e política." }]),
    en: makeMarket("petroleo", "en", "Oil: energy, geopolitics and the global economy", "Supply, demand, inflation, transport, production and geopolitical risk.", "Oil is one of the world's main commodities. It affects energy, transport, inflation, producer currencies and macroeconomic decisions.", "Its price reacts to production, inventories, OPEC, global demand, wars, the dollar and economic growth.", ["Know the market", "Energy", "Inflation"], ["Trade supply and demand", "Inventories", "Cycles"], ["Analyze macro impact", "Geopolitics", "Global inflation"], ["Energy commodity", "Geopolitical sensitivity", "Inflation impact", "Weekly inventories", "Dollar relationship"], [{ question: "Why does oil influence the economy?", answer: "Because energy and transport are part of the cost structure of nearly every production chain." }, { question: "Is oil a commodity?", answer: "Yes. It is a global energy commodity influenced by supply, demand and politics." }]),
    es: makeMarket("petroleo", "es", "Petróleo: energía, geopolítica y economía global", "Oferta, demanda, inflación, transporte, producción y riesgo geopolítico.", "El petróleo es una de las principales commodities del mundo. Afecta energía, transporte, inflación, monedas de países productores y decisiones macroeconómicas.", "Su precio reacciona a producción, inventarios, OPEP, demanda global, guerras, dólar y crecimiento económico.", ["Conocer el mercado", "Energía", "Inflación"], ["Operar oferta y demanda", "Inventarios", "Ciclos"], ["Analizar impactos macroeconómicos", "Geopolítica", "Inflación global"], ["Commodity energética", "Sensibilidad geopolítica", "Impacto en inflación", "Inventarios semanales", "Relación con dólar"], [{ question: "¿Por qué el petróleo influye en la economía?", answer: "Porque energía y transporte forman parte del costo de casi todas las cadenas productivas." }, { question: "¿El petróleo es una commodity?", answer: "Sí. Es una commodity energética global influida por oferta, demanda y política." }]),
    hi: makeMarket("petroleo", "hi", "तेल: ऊर्जा, geopolitics और global economy", "Supply, demand, inflation, transport, production और geopolitical risk.", "Oil दुनिया की मुख्य commodities में से एक है। यह energy, transport, inflation, producer currencies और macroeconomic decisions को प्रभावित करता है।", "इसकी कीमत production, inventories, OPEC, global demand, wars, dollar और economic growth से प्रभावित होती है।", ["Market समझना", "Energy", "Inflation"], ["Supply-demand trade", "Inventories", "Cycles"], ["Macro impact analyze करना", "Geopolitics", "Global inflation"], ["Energy commodity", "Geopolitical sensitivity", "Inflation impact", "Weekly inventories", "Dollar relationship"], [{ question: "Oil economy को क्यों प्रभावित करता है?", answer: "क्योंकि energy और transport लगभग हर production chain की cost structure में शामिल हैं।" }, { question: "क्या Oil commodity है?", answer: "हाँ। यह global energy commodity है जो supply, demand और politics से प्रभावित होती है।" }]),
    ar: makeMarket("petroleo", "ar", "النفط: الطاقة والجغرافيا السياسية والاقتصاد العالمي", "العرض والطلب والتضخم والنقل والإنتاج والمخاطر الجيوسياسية.", "النفط من أهم السلع في العالم. يؤثر في الطاقة والنقل والتضخم وعملات الدول المنتجة والقرارات الاقتصادية.", "يتأثر سعره بالإنتاج والمخزونات وأوبك والطلب العالمي والحروب والدولار والنمو الاقتصادي.", ["فهم السوق", "الطاقة", "التضخم"], ["تداول العرض والطلب", "المخزونات", "الدورات"], ["تحليل الأثر الكلي", "الجغرافيا السياسية", "التضخم العالمي"], ["سلعة طاقة", "حساسية جيوسياسية", "أثر على التضخم", "مخزونات أسبوعية", "علاقة بالدولار"], [{ question: "لماذا يؤثر النفط في الاقتصاد؟", answer: "لأن الطاقة والنقل يدخلان في تكلفة معظم سلاسل الإنتاج." }, { question: "هل النفط سلعة؟", answer: "نعم. هو سلعة طاقة عالمية تتأثر بالعرض والطلب والسياسة." }]),
    tr: makeMarket("petroleo", "tr", "Petrol: enerji, jeopolitik ve küresel ekonomi", "Arz, talep, enflasyon, taşıma, üretim ve jeopolitik risk.", "Petrol dünyanın ana emtialarından biridir. Enerjiyi, taşımayı, enflasyonu, üretici ülke para birimlerini ve makro kararları etkiler.", "Fiyatı üretim, stoklar, OPEC, küresel talep, savaşlar, dolar ve ekonomik büyümeye tepki verir.", ["Piyasayı tanımak", "Enerji", "Enflasyon"], ["Arz-talep işlemleri", "Stoklar", "Döngüler"], ["Makro etki analizi", "Jeopolitik", "Küresel enflasyon"], ["Enerji emtiası", "Jeopolitik duyarlılık", "Enflasyon etkisi", "Haftalık stoklar", "Dolar ilişkisi"], [{ question: "Petrol ekonomiyi neden etkiler?", answer: "Çünkü enerji ve taşıma neredeyse tüm üretim zincirlerinin maliyet yapısına girer." }, { question: "Petrol emtia mı?", answer: "Evet. Arz, talep ve politikadan etkilenen küresel enerji emtiasıdır." }]),
  },
  commodities: {
    pt: makeMarket("commodities", "pt", "Commodities: a base da economia real", "Agrícola, energia, metais, inflação, indústria e ciclos globais.", "Commodities são matérias-primas negociadas globalmente. Elas sustentam energia, alimentos, construção, tecnologia e comércio internacional.", "Seu preço depende de oferta, demanda, clima, logística, dólar, estoques e crescimento econômico.", ["Aprender", "Inflação", "Economia real"], ["Operar", "Ciclos", "Correlação"], ["Estruturar patrimônio", "Proteção", "Exposição real"], ["Agrícolas", "Energia", "Metais", "Inflação", "Cadeias produtivas"], [{ question: "O que são commodities?", answer: "São matérias-primas como petróleo, ouro, milho, soja, cobre e gás natural negociadas globalmente." }, { question: "Por que commodities importam?", answer: "Elas influenciam inflação, produção, comércio internacional e moedas de países exportadores." }]),
    en: makeMarket("commodities", "en", "Commodities: the base of the real economy", "Agriculture, energy, metals, inflation, industry and global cycles.", "Commodities are raw materials traded globally. They support energy, food, construction, technology and international trade.", "Prices depend on supply, demand, weather, logistics, the dollar, inventories and economic growth.", ["Learn", "Inflation", "Real economy"], ["Trade", "Cycles", "Correlation"], ["Structure wealth", "Protection", "Real-asset exposure"], ["Agriculture", "Energy", "Metals", "Inflation", "Supply chains"], [{ question: "What are commodities?", answer: "They are raw materials such as oil, gold, corn, soybeans, copper and natural gas traded globally." }, { question: "Why do commodities matter?", answer: "They influence inflation, production, international trade and exporter currencies." }]),
    es: makeMarket("commodities", "es", "Commodities: la base de la economía real", "Agrícolas, energía, metales, inflación, industria y ciclos globales.", "Las commodities son materias primas negociadas globalmente. Sostienen energía, alimentos, construcción, tecnología y comercio internacional.", "Sus precios dependen de oferta, demanda, clima, logística, dólar, inventarios y crecimiento económico.", ["Aprender", "Inflación", "Economía real"], ["Operar", "Ciclos", "Correlación"], ["Estructurar patrimonio", "Protección", "Exposición real"], ["Agrícolas", "Energía", "Metales", "Inflación", "Cadenas productivas"], [{ question: "¿Qué son commodities?", answer: "Son materias primas como petróleo, oro, maíz, soja, cobre y gas natural negociadas globalmente." }, { question: "¿Por qué importan?", answer: "Influyen en inflación, producción, comercio internacional y monedas de países exportadores." }]),
    hi: makeMarket("commodities", "hi", "Commodities: वास्तविक अर्थव्यवस्था की आधारशिला", "Agriculture, energy, metals, inflation, industry और global cycles.", "Commodities globally traded raw materials हैं। ये energy, food, construction, technology और international trade को support करती हैं।", "Prices supply, demand, weather, logistics, dollar, inventories और economic growth पर निर्भर करते हैं।", ["सीखना", "Inflation", "Real economy"], ["Trade", "Cycles", "Correlation"], ["Wealth structure", "Protection", "Real exposure"], ["Agriculture", "Energy", "Metals", "Inflation", "Supply chains"], [{ question: "Commodities क्या हैं?", answer: "Oil, gold, corn, soybeans, copper और natural gas जैसी raw materials जो globally trade होती हैं।" }, { question: "Commodities क्यों महत्वपूर्ण हैं?", answer: "ये inflation, production, international trade और exporter currencies को प्रभावित करती हैं।" }]),
    ar: makeMarket("commodities", "ar", "السلع: قاعدة الاقتصاد الحقيقي", "الزراعة والطاقة والمعادن والتضخم والصناعة والدورات العالمية.", "السلع هي مواد خام يتم تداولها عالميا. تدعم الطاقة والغذاء والبناء والتكنولوجيا والتجارة الدولية.", "تعتمد أسعارها على العرض والطلب والطقس واللوجستيات والدولار والمخزونات والنمو الاقتصادي.", ["تعلم", "تضخم", "اقتصاد حقيقي"], ["تداول", "دورات", "ارتباط"], ["هيكلة الثروة", "حماية", "تعرض حقيقي"], ["زراعة", "طاقة", "معادن", "تضخم", "سلاسل إنتاج"], [{ question: "ما هي السلع؟", answer: "هي مواد خام مثل النفط والذهب والذرة وفول الصويا والنحاس والغاز الطبيعي يتم تداولها عالميا." }, { question: "لماذا السلع مهمة؟", answer: "لأنها تؤثر في التضخم والإنتاج والتجارة الدولية وعملات الدول المصدرة." }]),
    tr: makeMarket("commodities", "tr", "Emtialar: reel ekonominin temeli", "Tarım, enerji, metaller, enflasyon, sanayi ve küresel döngüler.", "Emtialar küresel olarak işlem gören hammaddelerdir. Enerji, gıda, inşaat, teknoloji ve uluslararası ticareti destekler.", "Fiyatlar arz, talep, hava, lojistik, dolar, stoklar ve ekonomik büyümeye bağlıdır.", ["Öğrenme", "Enflasyon", "Reel ekonomi"], ["İşlem", "Döngüler", "Korelasyon"], ["Servet yapılandırma", "Koruma", "Reel varlık maruziyeti"], ["Tarım", "Enerji", "Metaller", "Enflasyon", "Üretim zincirleri"], [{ question: "Emtia nedir?", answer: "Petrol, altın, mısır, soya, bakır ve doğal gaz gibi küresel işlem gören hammaddelerdir." }, { question: "Emtialar neden önemlidir?", answer: "Enflasyonu, üretimi, uluslararası ticareti ve ihracatçı ülke para birimlerini etkiler." }]),
  },
  "fundos-imobiliarios": {
    pt: makeMarket("fundos-imobiliarios", "pt", "Fundos Imobiliários: renda recorrente e patrimônio", "Imóveis, renda mensal, fluxo de caixa, diversificação e proteção patrimonial no mercado brasileiro.", "Fundos Imobiliários são veículos negociados em bolsa que investem em imóveis, recebíveis imobiliários ou estratégias ligadas ao setor. Eles permitem acesso a renda imobiliária com liquidez maior do que imóveis físicos.", "O investidor compra cotas e participa dos resultados do fundo. A renda pode vir de aluguéis, juros de recebíveis, ganhos de capital e gestão dos ativos.", ["Primeiros rendimentos", "Renda mensal", "Noção de patrimônio"], ["Construção de fluxo de caixa", "Setores imobiliários", "Risco de vacância"], ["Proteção patrimonial", "Diversificação local", "Renda recorrente"], ["Renda mensal", "Liquidez em bolsa", "Exposição imobiliária", "Vacância", "Gestão profissional"], [{ question: "O que são Fundos Imobiliários?", answer: "São fundos negociados em bolsa que investem em imóveis, recebíveis ou ativos ligados ao setor imobiliário." }, { question: "FIIs pagam renda garantida?", answer: "Não. A renda pode variar conforme resultado, vacância, juros, inadimplência e decisões de gestão." }]),
  },
};

export const marketSlugs = Object.keys(marketContent) as MarketSlug[];

export const publicMarketSlugs = marketSlugs.filter((slug) => slug !== "fundos-imobiliarios");

export function getMarketContent(slug: MarketSlug, locale: Locale): MarketContent {
  const content = marketContent[slug];
  if (slug === "fundos-imobiliarios") return content.pt!;
  return content[locale] ?? content.en ?? content.pt!;
}

export function getMarketLabel(slug: MarketSlug, locale: Locale): string {
  const labels: Record<Locale, Record<MarketSlug, string>> = {
    pt: {
      forex: "Forex",
      acoes: "Ações",
      cripto: "Criptomoedas",
      etfs: "ETFs",
      ouro: "Ouro",
      petroleo: "Petróleo",
      commodities: "Commodities",
      "fundos-imobiliarios": "Fundos Imobiliários",
    },
    en: {
      forex: "Forex",
      acoes: "Stocks",
      cripto: "Crypto",
      etfs: "ETFs",
      ouro: "Gold",
      petroleo: "Oil",
      commodities: "Commodities",
      "fundos-imobiliarios": "Real Estate Funds",
    },
    es: {
      forex: "Forex",
      acoes: "Acciones",
      cripto: "Criptomonedas",
      etfs: "ETFs",
      ouro: "Oro",
      petroleo: "Petróleo",
      commodities: "Commodities",
      "fundos-imobiliarios": "Fondos Inmobiliarios",
    },
    hi: {
      forex: "Forex",
      acoes: "शेयर",
      cripto: "क्रिप्टो",
      etfs: "ETFs",
      ouro: "सोना",
      petroleo: "तेल",
      commodities: "Commodities",
      "fundos-imobiliarios": "Real Estate Funds",
    },
    ar: {
      forex: "الفوركس",
      acoes: "الأسهم",
      cripto: "الكريبتو",
      etfs: "ETF",
      ouro: "الذهب",
      petroleo: "النفط",
      commodities: "السلع",
      "fundos-imobiliarios": "صناديق عقارية",
    },
    tr: {
      forex: "Forex",
      acoes: "Hisseler",
      cripto: "Kripto",
      etfs: "ETF'ler",
      ouro: "Altın",
      petroleo: "Petrol",
      commodities: "Emtialar",
      "fundos-imobiliarios": "Gayrimenkul Fonları",
    },
    id: {
      forex: "Forex",
      acoes: "Saham",
      cripto: "Kripto",
      etfs: "ETF",
      ouro: "Emas",
      petroleo: "Minyak",
      commodities: "Komoditas",
      "fundos-imobiliarios": "Dana Properti",
    },
    vi: {
      forex: "Forex",
      acoes: "C? Phi?u",
      cripto: "Ti?n ?i?n T?",
      etfs: "ETF",
      ouro: "V?ng",
      petroleo: "D?u M?",
      commodities: "H?ng H?a",
      "fundos-imobiliarios": "Qu? B?t ??ng S?n",
    },
  };

  return labels[locale]?.[slug] ?? labels.en[slug];
}
