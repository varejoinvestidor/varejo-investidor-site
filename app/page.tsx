"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../src/components/SiteSections";
import { getInsightsPath } from "../src/data/insightsContent";
import type { Locale } from "../src/i18n";

const homeLiteCopy = {
  pt: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tudo o que você precisa para investir e construir patrimônio em nível global.",
      text: "Entenda os mercados globais, acompanhe análises econômicas e desenvolva uma estratégia para construir patrimônio além das fronteiras do seu país.",
      free: "ENTRAR NO CANAL FORMIGA",
      services: "CONHECER NOSSOS SERVIÇOS",
    },
    intro: {
      eyebrow: "O que é",
      title: "O que é o Varejo Investidor",
      manifesto:
        "O Varejo Investidor é uma estrutura financeira global para quem deseja sair do básico, entender o mercado internacional e construir sua vida financeira em camadas.",
      text: [
        "Desde 2018, entregamos mais de 4.200 sinais ao vivo, acompanhando Forex, ouro, petróleo, cripto, índices e moedas globais.",
        "A jornada é dividida em níveis: Formiga, Lobo e Harpia.",
        "O nível Formiga constrói a base. O nível Lobo desenvolve estratégia e leitura de mercado. O nível Harpia amplia a visão para patrimônio, proteção e estrutura global.",
      ],
      stats: ["Desde 2018", "sinais ao vivo", "Formiga / Lobo / Harpia"],
    },
    cards: [
      { code: "FORMIGA", title: "Base financeira", text: "Educação por níveis para sair da base, organizar risco e construir os primeiros pilares.", href: "/nivel-formiga" },
      { code: "LOBO", title: "Estratégia e expansão", text: "Sinais ao vivo, leitura de mercado e decisões estruturadas para operar com disciplina.", href: "/nivel-lobo" },
      { code: "HARPIA", title: "Patrimônio global", text: "Consultorias estratégicas para proteção, posicionamento, patrimônio e visão internacional.", href: "/nivel-harpia" },
    ],
    cardCta: "Saiba mais",
    final: {
      title: "Sua jornada começa no Nível Formiga.",
      text: "Comece gratuitamente, acompanhe os mercados globais e desenvolva sua evolução financeira através dos níveis Formiga, Lobo e Harpia.",
      free: "ENTRAR NO CANAL FORMIGA",
      elite: "CONHECER CANAL ELITE HARPIA",
    },
  },
  en: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Everything you need to invest and build wealth on a global level.",
      text: "Understand global markets, follow economic analysis, and develop a strategy to build wealth beyond the borders of your country.",
      free: "Start free",
      services: "View services",
    },
    intro: {
      eyebrow: "What it is",
      title: "What is Varejo Investidor",
      manifesto:
        "Varejo Investidor is a global financial structure for people who want to move beyond the basics, understand international markets, and build their financial life in layers.",
      text: [
        "Since 2018, we have delivered more than 4,200 live signals while following Forex, gold, oil, crypto, indices, and global currencies.",
        "The journey is divided into levels: Ant, Wolf, and Harpy.",
        "The Ant level builds the foundation. The Wolf level develops strategy and market reading. The Harpy level expands vision toward wealth, protection, and global structure.",
      ],
      stats: ["Since 2018", "live signals", "Ant / Wolf / Harpy"],
    },
    cards: [
      { code: "ANT", title: "Financial foundation", text: "Level-based education to build foundation, organize risk, and create the first pillars.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Strategy and expansion", text: "Live signals, market reading, and structured decisions for disciplined execution.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Global wealth", text: "Strategic consulting for protection, positioning, wealth, and international vision.", href: "/nivel-harpia" },
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
      title: "Todo lo que necesitas para invertir y construir patrimonio a nivel global.",
      text: "Comprende los mercados globales, sigue análisis económicos y desarrolla una estrategia para construir patrimonio más allá de las fronteras de tu país.",
      free: "Empezar gratis",
      services: "Ver servicios",
    },
    intro: {
      eyebrow: "Qué es",
      title: "Qué es Varejo Investidor",
      manifesto:
        "Varejo Investidor es una estructura financiera global para quien desea salir de lo básico, entender el mercado internacional y construir su vida financiera por capas.",
      text: [
        "Desde 2018, entregamos más de 4.200 señales en vivo, acompañando Forex, oro, petróleo, cripto, índices y monedas globales.",
        "La jornada se divide en niveles: Hormiga, Lobo y Harpía.",
        "El nivel Hormiga construye la base. El nivel Lobo desarrolla estrategia y lectura de mercado. El nivel Harpía amplía la visión hacia patrimonio, protección y estructura global.",
      ],
      stats: ["Desde 2018", "señales en vivo", "Hormiga / Lobo / Harpía"],
    },
    cards: [
      { code: "HORMIGA", title: "Base financiera", text: "Educación por niveles para construir base, organizar riesgo y crear los primeros pilares.", href: "/nivel-formiga" },
      { code: "LOBO", title: "Estrategia y expansión", text: "Señales en vivo, lectura de mercado y decisiones estructuradas para operar con disciplina.", href: "/nivel-lobo" },
      { code: "HARPÍA", title: "Patrimonio global", text: "Consultorías estratégicas para protección, posicionamiento, patrimonio y visión internacional.", href: "/nivel-harpia" },
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
      title: "वैश्विक स्तर पर निवेश करने और संपत्ति बनाने के लिए आपको जो कुछ भी चाहिए।",
      text: "वैश्विक बाजारों को समझें, आर्थिक विश्लेषणों का अनुसरण करें और अपने देश की सीमाओं से परे संपत्ति बनाने की रणनीति विकसित करें।",
      free: "मुफ्त चैनल से शुरू करें",
      services: "सेवाएँ देखें",
    },
    intro: {
      eyebrow: "परिचय",
      title: "Varejo Investidor क्या है",
      manifesto:
        "Varejo Investidor उन लोगों के लिए एक वैश्विक वित्तीय संरचना है जो बुनियादी स्तर से आगे बढ़कर अंतरराष्ट्रीय बाजार को समझना और अपनी वित्तीय जिंदगी को चरणों में बनाना चाहते हैं।",
      text: [
        "2018 से हम Forex, सोना, तेल, क्रिप्टो, सूचकांक और वैश्विक मुद्राओं का अनुसरण करते हुए 4,200 से अधिक लाइव सिग्नल भेज चुके हैं।",
        "यह यात्रा तीन स्तरों में विभाजित है: चींटी, भेड़िया और गरुड़।",
        "चींटी स्तर आधार बनाता है। भेड़िया स्तर रणनीति और बाजार-पठन विकसित करता है। गरुड़ स्तर संपत्ति, सुरक्षा और वैश्विक संरचना की दृष्टि को विस्तृत करता है।",
      ],
      stats: ["2018 से", "लाइव सिग्नल", "चींटी / भेड़िया / गरुड़"],
    },
    cards: [
      { code: "चींटी", title: "वित्तीय आधार", text: "आधार बनाने, जोखिम व्यवस्थित करने और पहले स्तंभ तैयार करने के लिए स्तर-आधारित शिक्षा।", href: "/nivel-formiga" },
      { code: "भेड़िया", title: "रणनीति और विस्तार", text: "अनुशासित ऑपरेशन के लिए लाइव सिग्नल, बाजार-पठन और संरचित निर्णय।", href: "/nivel-lobo" },
      { code: "गरुड़", title: "वैश्विक संपत्ति", text: "सुरक्षा, पोजिशनिंग, संपत्ति और अंतरराष्ट्रीय दृष्टि के लिए रणनीतिक सेवाएँ।", href: "/nivel-harpia" },
    ],
    cardCta: "और जानें",
    final: {
      title: "मुफ्त में शुरू करें और अपना अगला स्तर चुनें।",
      free: "मुफ्त चैनल में प्रवेश करें",
      elite: "एलीट चैनल देखें",
    },
  },
  ar: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "كل ما تحتاجه للاستثمار وبناء الثروة على المستوى العالمي.",
      text: "افهم الأسواق العالمية، تابع التحليلات الاقتصادية، وطور استراتيجية لبناء الثروة خارج حدود بلدك.",
      free: "ابدأ مجانا",
      services: "شاهد الخدمات",
    },
    intro: {
      eyebrow: "ما هو",
      title: "ما هو Varejo Investidor",
      manifesto:
        "Varejo Investidor هو هيكل مالي عالمي لمن يريد تجاوز الأساسيات وفهم الأسواق الدولية وبناء حياته المالية على طبقات.",
      text: [
        "منذ 2018، أرسلنا أكثر من 4,200 إشارة مباشرة مع متابعة الفوركس والذهب والنفط والكريبتو والمؤشرات والعملات العالمية.",
        "تنقسم الرحلة إلى مستويات: النملة، الذئب، والهاربي.",
        "مستوى النملة يبني الأساس. مستوى الذئب يطور الاستراتيجية وقراءة السوق. مستوى الهاربي يوسع الرؤية نحو الثروة والحماية والهيكل العالمي.",
      ],
      stats: ["منذ 2018", "إشارات مباشرة", "النملة / الذئب / الهاربي"],
    },
    cards: [
      { code: "النملة", title: "الأساس المالي", text: "تعليم بالمستويات لبناء القاعدة وتنظيم المخاطر وإنشاء الأعمدة الأولى.", href: "/nivel-formiga" },
      { code: "الذئب", title: "الاستراتيجية والتوسع", text: "إشارات مباشرة وقراءة للسوق وقرارات منظمة للتنفيذ بانضباط.", href: "/nivel-lobo" },
      { code: "الهاربي", title: "الثروة العالمية", text: "خدمات استراتيجية للحماية والتموضع وبناء الثروة والرؤية الدولية.", href: "/nivel-harpia" },
    ],
    cardCta: "اعرف المزيد",
    final: {
      title: "ابدأ مجانا واختر مستواك التالي.",
      free: "ادخل القناة المجانية",
      elite: "تعرف إلى قناة النخبة",
    },
  },
  tr: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Küresel ölçekte yatırım yapmak ve servet oluşturmak için ihtiyacınız olan her şey.",
      text: "Küresel piyasaları anlayın, ekonomik analizleri takip edin ve ülkenizin sınırlarının ötesinde servet oluşturacak bir strateji geliştirin.",
      free: "Ücretsiz başla",
      services: "Hizmetleri gör",
    },
    intro: {
      eyebrow: "Nedir",
      title: "Varejo Investidor nedir",
      manifesto:
        "Varejo Investidor, temel seviyeyi aşmak, uluslararası piyasaları anlamak ve finansal hayatını katmanlar halinde kurmak isteyenler için küresel bir finansal yapıdır.",
      text: [
        "2018'den beri Forex, altın, petrol, kripto, endeksler ve küresel para birimlerini takip ederek 4.200'den fazla canlı sinyal gönderdik.",
        "Yolculuk üç seviyeye ayrılır: Karınca, Kurt ve Harpia.",
        "Karınca seviyesi temeli kurar. Kurt seviyesi strateji ve piyasa okuma geliştirir. Harpia seviyesi varlık, koruma ve küresel yapı vizyonunu genişletir.",
      ],
      stats: ["2018'den beri", "canlı sinyaller", "Karınca / Kurt / Harpia"],
    },
    cards: [
      { code: "KARINCA", title: "Finansal temel", text: "Temel oluşturmak, riski düzenlemek ve ilk sütunları kurmak için seviyeli eğitim.", href: "/nivel-formiga" },
      { code: "KURT", title: "Strateji ve genişleme", text: "Disiplinli işlem için canlı sinyaller, piyasa okuma ve yapılandırılmış kararlar.", href: "/nivel-lobo" },
      { code: "HARPIA", title: "Küresel varlık", text: "Koruma, konumlanma, varlık ve uluslararası vizyon için stratejik hizmetler.", href: "/nivel-harpia" },
    ],
    cardCta: "Daha fazla bilgi",
    final: {
      title: "Ücretsiz başla ve bir sonraki seviyeni seç.",
      free: "Ücretsiz kanala gir",
      elite: "Elite Kanalını keşfet",
    },
  },
  id: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Semua yang Anda butuhkan untuk berinvestasi dan membangun kekayaan di tingkat global.",
      text: "Pahami pasar global, ikuti analisis ekonomi, dan kembangkan strategi untuk membangun kekayaan melampaui batas negara Anda.",
      free: "Mulai gratis",
      services: "Lihat layanan",
    },
    intro: {
      eyebrow: "Apa itu",
      title: "Apa itu Varejo Investidor",
      manifesto:
        "Varejo Investidor adalah struktur finansial global untuk orang yang ingin keluar dari dasar, memahami pasar internasional, dan membangun kehidupan finansial secara bertahap.",
      text: [
        "Sejak 2018, kami telah mengirim lebih dari 4.200 sinyal live sambil mengikuti Forex, emas, minyak, kripto, indeks, dan mata uang global.",
        "Perjalanan ini dibagi menjadi level: Semut, Serigala, dan Elang Harpy.",
        "Level Semut membangun fondasi. Level Serigala mengembangkan strategi dan pembacaan pasar. Level Elang Harpy memperluas visi menuju kekayaan, perlindungan, dan struktur global.",
      ],
      stats: ["Sejak 2018", "sinyal live", "Semut / Serigala / Elang Harpy"],
    },
    cards: [
      { code: "SEMUT", title: "Fondasi finansial", text: "Edukasi bertahap untuk membangun dasar, mengatur risiko, dan menciptakan pilar pertama.", href: "/nivel-formiga" },
      { code: "SERIGALA", title: "Strategi dan ekspansi", text: "Sinyal live, pembacaan pasar, dan keputusan terstruktur untuk eksekusi yang disiplin.", href: "/nivel-lobo" },
      { code: "ELANG HARPY", title: "Kekayaan global", text: "Konsultasi strategis untuk perlindungan, posisi, kekayaan, dan visi internasional.", href: "/nivel-harpia" },
    ],
    cardCta: "Pelajari",
    final: {
      title: "Mulai gratis dan pilih level berikutnya.",
      free: "Masuk kanal gratis",
      elite: "Lihat Kanal Elite",
    },
  },
  vi: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Mọi thứ bạn cần để đầu tư và xây dựng tài sản ở quy mô toàn cầu.",
      text: "Hiểu các thị trường toàn cầu, theo dõi các phân tích kinh tế và xây dựng chiến lược để phát triển tài sản vượt ra ngoài biên giới quốc gia của bạn.",
      free: "Bắt đầu miễn phí",
      services: "Xem dịch vụ",
    },
    intro: {
      eyebrow: "Giới thiệu",
      title: "Varejo Investidor là gì",
      manifesto:
        "Varejo Investidor là một cấu trúc tài chính toàn cầu dành cho người muốn vượt qua nền tảng cơ bản, hiểu thị trường quốc tế và xây dựng đời sống tài chính theo từng lớp.",
      text: [
        "Từ năm 2018, chúng tôi đã gửi hơn 4.200 tín hiệu trực tiếp, theo dõi Forex, vàng, dầu, crypto, chỉ số và tiền tệ toàn cầu.",
        "Hành trình được chia thành các cấp độ: Kiến, Sói và Đại Bàng Harpy.",
        "Cấp độ Kiến xây dựng nền tảng. Cấp độ Sói phát triển chiến lược và khả năng đọc thị trường. Cấp độ Đại Bàng Harpy mở rộng tầm nhìn về tài sản, bảo vệ vốn và cấu trúc toàn cầu.",
      ],
      stats: ["Từ năm 2018", "tín hiệu trực tiếp", "Kiến / Sói / Đại Bàng Harpy"],
    },
    cards: [
      { code: "KIẾN", title: "Nền tảng tài chính", text: "Giáo dục theo cấp độ để xây nền móng, tổ chức rủi ro và tạo các trụ cột đầu tiên.", href: "/nivel-formiga" },
      { code: "SÓI", title: "Chiến lược và mở rộng", text: "Tín hiệu trực tiếp, đọc thị trường và quyết định có cấu trúc để vận hành kỷ luật.", href: "/nivel-lobo" },
      { code: "ĐẠI BÀNG HARPY", title: "Tài sản toàn cầu", text: "Tư vấn chiến lược về bảo vệ, định vị, tài sản và tầm nhìn quốc tế.", href: "/nivel-harpia" },
    ],
    cardCta: "Tìm hiểu thêm",
    final: {
      title: "Bắt đầu miễn phí và chọn cấp độ tiếp theo.",
      free: "Vào kênh miễn phí",
      elite: "Tìm hiểu Kênh Elite",
    },
  },
} satisfies Record<
  Locale,
  {
    hero: { eyebrow: string; title: string; text: string; free: string; services: string };
    intro: { eyebrow: string; title: string; manifesto: string; text: string[]; stats: string[] };
    cards: { code: string; title: string; text: string; href: string }[];
    cardCta: string;
    final: { title: string; text?: string; free: string; elite: string };
  }
>;

const signalCounterLabels: Record<Locale, string> = {
  pt: "SINAIS AO VIVO NO WHATSAPP",
  en: "LIVE SIGNALS ON WHATSAPP",
  es: "SE\u00D1ALES EN VIVO EN WHATSAPP",
  hi: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u0910\u092A \u092A\u0930 \u0932\u093E\u0907\u0935 \u0938\u093F\u0917\u094D\u0928\u0932",
  ar: "\u0625\u0634\u0627\u0631\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628",
  tr: "WHATSAPP'TA CANLI S\u0130NYALLER",
  id: "SINYAL LIVE DI WHATSAPP",
  vi: "T\u00CDN HI\u1EC6U TR\u1EF0C TI\u1EBEP TR\u00CAN WHATSAPP",
};

const homeFxproLinks: Record<Locale, string> = {
  pt: "https://direct.fxpro.group/pt/partner/77014650?platform=web",
  en: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  es: "https://direct.fxpro.group/es/partner/77014650?platform=web",
  hi: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ar: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  tr: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  id: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  vi: "https://direct.fxpro.group/en/partner/77014650?platform=web",
};

const homeFxproBanners: Record<Locale, string> = {
  pt: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png",
  en: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  es: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png",
  hi: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ar: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  tr: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  id: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  vi: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
};

const binanceLink = "https://accounts.binance.com/register?ref=453580362";

const homeAccountCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    text: string;
    fxproLabel: string;
    fxproTitle: string;
    fxproText: string;
    fxproCta: string;
    binanceLabel: string;
    binanceTitle: string;
    binanceText: string;
    binanceCta: string;
    bannerLabel: string;
    bannerText: string;
    ecosystemLabel: string;
  }
> = {
  pt: {
    eyebrow: "CONTA GLOBAL",
    title: "Abra sua conta e acesse os mercados globais.",
    text: "Acesse Forex, ouro, petr\u00F3leo, \u00EDndices, a\u00E7\u00F5es, ETFs e criptomoedas atrav\u00E9s das principais plataformas do mercado internacional.",
    fxproLabel: "CORRETORA FOREX",
    fxproTitle: "Forex com acesso aos mercados globais",
    fxproText: "Acesse a corretora utilizada pelo Varejo Investidor para acompanhar moedas, ouro, petr\u00F3leo, \u00EDndices e mercados internacionais.",
    fxproCta: "ABRIR CONTA FXPRO",
    binanceLabel: "CORRETORA CRIPTO",
    binanceTitle: "Criptoativos com acesso internacional",
    binanceText: "Compre, venda e acompanhe criptomoedas atrav\u00E9s de uma das maiores exchanges do mundo.",
    binanceCta: "ABRIR CONTA BINANCE",
    bannerLabel: "ABRA SUA CONTA FOREX",
    bannerText: "Clique no banner para acessar a corretora no idioma correto.",
    ecosystemLabel: "Explore o ecossistema",
  },
  en: {
    eyebrow: "Global account",
    title: "Open your account and access global markets",
    text: "Forex, gold, oil, indices, stocks, ETFs, and cryptocurrencies through leading international market platforms.",
    fxproLabel: "FOREX BROKER",
    fxproTitle: "Global markets with FXPro",
    fxproText: "Access Forex, gold, oil, and indices through the broker used in the Varejo Investidor operational structure.",
    fxproCta: "Open FXPro Account",
    binanceLabel: "CRYPTO BROKER",
    binanceTitle: "Global cryptocurrency market",
    binanceText: "Buy, sell, and follow cryptocurrencies through one of the world's largest exchanges.",
    binanceCta: "Open Binance Account",
    bannerLabel: "OPEN YOUR FOREX ACCOUNT",
    bannerText: "Click the banner to access the broker in the correct language.",
    ecosystemLabel: "Explore the ecosystem",
  },
  es: {
    eyebrow: "Cuenta global",
    title: "Abre tu cuenta y accede a los mercados globales",
    text: "Forex, oro, petr\u00F3leo, \u00EDndices, acciones, ETFs y criptomonedas a trav\u00E9s de las principales plataformas del mercado internacional.",
    fxproLabel: "BROKER FOREX",
    fxproTitle: "Mercados globales con FXPro",
    fxproText: "Accede a Forex, oro, petr\u00F3leo e \u00EDndices a trav\u00E9s del broker utilizado en la estructura operativa de Varejo Investidor.",
    fxproCta: "Abrir Cuenta FXPro",
    binanceLabel: "BROKER CRIPTO",
    binanceTitle: "Mercado global de criptomonedas",
    binanceText: "Compra, vende y acompa\u00F1a criptomonedas a trav\u00E9s de una de las mayores exchanges del mundo.",
    binanceCta: "Abrir Cuenta Binance",
    bannerLabel: "ABRE TU CUENTA FOREX",
    bannerText: "Haz clic en el banner para acceder al broker en el idioma correcto.",
    ecosystemLabel: "Explora el ecosistema",
  },
  hi: {
    eyebrow: "\u0917\u094D\u0932\u094B\u092C\u0932 \u0905\u0915\u093E\u0909\u0902\u091F",
    title: "\u0905\u092A\u0928\u093E \u0905\u0915\u093E\u0909\u0902\u091F \u0916\u094B\u0932\u0947\u0902 \u0914\u0930 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F\u094D\u0938 \u0924\u0915 \u092A\u0939\u0941\u0901\u091A \u092C\u0928\u093E\u090F\u0901",
    text: "Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932, \u0907\u0902\u0921\u093F\u0938\u0947\u0938, \u0936\u0947\u092F\u0930, ETFs \u0914\u0930 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u0915\u094B \u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930 \u0915\u0940 \u092A\u094D\u0930\u092E\u0941\u0916 \u092A\u094D\u0932\u0947\u091F\u092B\u0949\u0930\u094D\u092E\u094D\u0938 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u090F\u0915\u094D\u0938\u0947\u0938 \u0915\u0930\u0947\u0902\u0964",
    fxproLabel: "FOREX BROKER",
    fxproTitle: "FXPro \u0915\u0947 \u0938\u093E\u0925 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F\u094D\u0938",
    fxproText: "Varejo Investidor \u0915\u0940 \u0911\u092A\u0930\u0947\u0936\u0928\u0932 \u0938\u0902\u0930\u091A\u0928\u093E \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u093F\u090F \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092C\u094D\u0930\u094B\u0915\u0930 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932 \u0914\u0930 \u0907\u0902\u0921\u093F\u0938\u0947\u0938 \u0924\u0915 \u092A\u0939\u0941\u0901\u091A\u0947\u0902\u0964",
    fxproCta: "FXPro Account \u0916\u094B\u0932\u0947\u0902",
    binanceLabel: "CRYPTO BROKER",
    binanceTitle: "\u0917\u094D\u0932\u094B\u092C\u0932 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u092E\u093E\u0930\u094D\u0915\u0947\u091F",
    binanceText: "\u0926\u0941\u0928\u093F\u092F\u093E \u0915\u0940 \u0938\u092C\u0938\u0947 \u092C\u0921\u093C\u0940 exchanges \u092E\u0947\u0902 \u0938\u0947 \u090F\u0915 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u0916\u0930\u0940\u0926\u0947\u0902, \u092C\u0947\u091A\u0947\u0902 \u0914\u0930 \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902\u0964",
    binanceCta: "Binance Account \u0916\u094B\u0932\u0947\u0902",
    bannerLabel: "FOREX ACCOUNT \u0916\u094B\u0932\u0947\u0902",
    bannerText: "\u0938\u0939\u0940 \u092D\u093E\u0937\u093E \u092E\u0947\u0902 broker \u0924\u0915 \u092A\u0939\u0941\u0901\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F banner \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902\u0964",
    ecosystemLabel: "\u0907\u0915\u094B\u0938\u093F\u0938\u094D\u091F\u092E \u0926\u0947\u0916\u0947\u0902",
  },
  ar: {
    eyebrow: "\u062D\u0633\u0627\u0628 \u0639\u0627\u0644\u0645\u064A",
    title: "\u0627\u0641\u062A\u062D \u062D\u0633\u0627\u0628\u0643 \u0648\u0627\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    text: "\u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0635\u0646\u0627\u062F\u064A\u0642 ETF \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0639\u0628\u0631 \u0623\u0647\u0645 \u0645\u0646\u0635\u0627\u062A \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u062F\u0648\u0644\u064A.",
    fxproLabel: "\u0648\u0633\u064A\u0637 \u0641\u0648\u0631\u0643\u0633",
    fxproTitle: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0645\u0639 FXPro",
    fxproText: "\u0627\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0639\u0628\u0631 \u0627\u0644\u0648\u0633\u064A\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A \u0644\u0640 Varejo Investidor.",
    fxproCta: "\u0641\u062A\u062D \u062D\u0633\u0627\u0628 FXPro",
    binanceLabel: "\u0648\u0633\u064A\u0637 \u0643\u0631\u064A\u0628\u062A\u0648",
    binanceTitle: "\u0633\u0648\u0642 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A",
    binanceText: "\u0627\u0634\u062A\u0631\u0650 \u0648\u0628\u0650\u0639 \u0648\u062A\u0627\u0628\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0639\u0628\u0631 \u0648\u0627\u062D\u062F\u0629 \u0645\u0646 \u0623\u0643\u0628\u0631 \u0627\u0644\u0645\u0646\u0635\u0627\u062A \u0641\u064A \u0627\u0644\u0639\u0627\u0644\u0645.",
    binanceCta: "\u0641\u062A\u062D \u062D\u0633\u0627\u0628 Binance",
    bannerLabel: "\u0627\u0641\u062A\u062D \u062D\u0633\u0627\u0628 \u0641\u0648\u0631\u0643\u0633",
    bannerText: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0646\u0631 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0633\u064A\u0637 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629.",
    ecosystemLabel: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
  },
  tr: {
    eyebrow: "Global hesap",
    title: "Hesab\u0131n\u0131z\u0131 a\u00E7\u0131n ve k\u00FCresel piyasalara eri\u015Fin",
    text: "Forex, alt\u0131n, petrol, endeksler, hisseler, ETF'ler ve kripto paralar; uluslararas\u0131 piyasan\u0131n \u00F6nde gelen platformlar\u0131 \u00FCzerinden.",
    fxproLabel: "FOREX ARACI KURUMU",
    fxproTitle: "FXPro ile k\u00FCresel piyasalar",
    fxproText: "Varejo Investidor operasyonel yap\u0131s\u0131nda kullan\u0131lan broker arac\u0131l\u0131\u011F\u0131yla Forex, alt\u0131n, petrol ve endekslere eri\u015Fin.",
    fxproCta: "FXPro Hesab\u0131 A\u00E7",
    binanceLabel: "KR\u0130PTO ARACI KURUMU",
    binanceTitle: "K\u00FCresel kripto para piyasas\u0131",
    binanceText: "D\u00FCnyan\u0131n en b\u00FCy\u00FCk borsalar\u0131ndan biri \u00FCzerinden kripto para al\u0131n, sat\u0131n ve takip edin.",
    binanceCta: "Binance Hesab\u0131 A\u00E7",
    bannerLabel: "FOREX HESABINIZI A\u00C7IN",
    bannerText: "Do\u011Fru dilde araci kuruma eri\u015Fmek i\u00E7in bannera t\u0131klay\u0131n.",
    ecosystemLabel: "Ekosistemi ke\u015Ffet",
  },
  id: {
    eyebrow: "Akun global",
    title: "Buka akun Anda dan akses pasar global",
    text: "Forex, emas, minyak, indeks, saham, ETF, dan kripto melalui platform utama pasar internasional.",
    fxproLabel: "BROKER FOREX",
    fxproTitle: "Pasar global bersama FXPro",
    fxproText: "Akses Forex, emas, minyak, dan indeks melalui broker yang digunakan dalam struktur operasional Varejo Investidor.",
    fxproCta: "Buka Akun FXPro",
    binanceLabel: "BROKER KRIPTO",
    binanceTitle: "Pasar kripto global",
    binanceText: "Beli, jual, dan pantau kripto melalui salah satu exchange terbesar di dunia.",
    binanceCta: "Buka Akun Binance",
    bannerLabel: "BUKA AKUN FOREX",
    bannerText: "Klik banner untuk mengakses broker dalam bahasa yang tepat.",
    ecosystemLabel: "Jelajahi ekosistem",
  },
  vi: {
    eyebrow: "T\u00E0i kho\u1EA3n to\u00E0n c\u1EA7u",
    title: "M\u1EDF t\u00E0i kho\u1EA3n v\u00E0 ti\u1EBFp c\u1EADn c\u00E1c th\u1ECB tr\u01B0\u1EDDng to\u00E0n c\u1EA7u",
    text: "Forex, v\u00E0ng, d\u1EA7u, ch\u1EC9 s\u1ED1, c\u1ED5 phi\u1EBFu, ETF v\u00E0 ti\u1EC1n \u0111i\u1EC7n t\u1EED th\u00F4ng qua c\u00E1c n\u1EC1n t\u1EA3ng h\u00E0ng \u0111\u1EA7u c\u1EE7a th\u1ECB tr\u01B0\u1EDDng qu\u1ED1c t\u1EBF.",
    fxproLabel: "NH\u00C0 M\u00D4I GI\u1EDAI FOREX",
    fxproTitle: "Th\u1ECB tr\u01B0\u1EDDng to\u00E0n c\u1EA7u c\u00F9ng FXPro",
    fxproText: "Ti\u1EBFp c\u1EADn Forex, v\u00E0ng, d\u1EA7u v\u00E0 ch\u1EC9 s\u1ED1 th\u00F4ng qua broker \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng trong c\u1EA5u tr\u00FAc v\u1EADn h\u00E0nh c\u1EE7a Varejo Investidor.",
    fxproCta: "M\u1EDF T\u00E0i Kho\u1EA3n FXPro",
    binanceLabel: "NH\u00C0 M\u00D4I GI\u1EDAI CRYPTO",
    binanceTitle: "Th\u1ECB tr\u01B0\u1EDDng ti\u1EC1n \u0111i\u1EC7n t\u1EED to\u00E0n c\u1EA7u",
    binanceText: "Mua, b\u00E1n v\u00E0 theo d\u00F5i ti\u1EC1n \u0111i\u1EC7n t\u1EED th\u00F4ng qua m\u1ED9t trong nh\u1EEFng s\u00E0n giao d\u1ECBch l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi.",
    binanceCta: "M\u1EDF T\u00E0i Kho\u1EA3n Binance",
    bannerLabel: "M\u1EDE T\u00C0I KHO\u1EA2N FOREX",
    bannerText: "Nh\u1EA5p v\u00E0o banner \u0111\u1EC3 truy c\u1EADp broker \u0111\u00FAng ng\u00F4n ng\u1EEF.",
    ecosystemLabel: "Kh\u00E1m ph\u00E1 h\u1EC7 sinh th\u00E1i",
  },
};

const homeSeoLabels: Record<Locale, Record<"forex" | "stocks" | "crypto" | "etfs" | "formiga" | "lobo" | "harpia" | "articles", string>> = {
  pt: { forex: "Forex", stocks: "A\u00E7\u00F5es", crypto: "Criptomoedas", etfs: "ETFs", formiga: "N\u00EDvel Formiga", lobo: "N\u00EDvel Lobo", harpia: "N\u00EDvel Harpia", articles: "Artigos" },
  en: { forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", formiga: "Ant Level", lobo: "Wolf Level", harpia: "Harpy Level", articles: "Articles" },
  es: { forex: "Forex", stocks: "Acciones", crypto: "Cripto", etfs: "ETFs", formiga: "Nivel Formiga", lobo: "Nivel Lobo", harpia: "Nivel Harpia", articles: "Art\u00EDculos" },
  hi: { forex: "Forex", stocks: "\u0936\u0947\u092F\u0930", crypto: "\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B", etfs: "ETFs", formiga: "\u091A\u0940\u0902\u091F\u0940 \u0938\u094D\u0924\u0930", lobo: "\u092D\u0947\u0921\u093C\u093F\u092F\u093E \u0938\u094D\u0924\u0930", harpia: "\u0917\u0930\u0941\u0921\u093C \u0938\u094D\u0924\u0930", articles: "\u0932\u0947\u0916" },
  ar: { forex: "\u0627\u0644\u0641\u0648\u0631\u0643\u0633", stocks: "\u0627\u0644\u0623\u0633\u0647\u0645", crypto: "\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648", etfs: "ETFs", formiga: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0646\u0645\u0644\u0629", lobo: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0630\u0626\u0628", harpia: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0647\u0627\u0631\u0628\u064A", articles: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A" },
  tr: { forex: "Forex", stocks: "Hisseler", crypto: "Kripto", etfs: "ETF'ler", formiga: "Kar\u0131nca Seviyesi", lobo: "Kurt Seviyesi", harpia: "Harpia Seviyesi", articles: "Makaleler" },
  id: { forex: "Forex", stocks: "Saham", crypto: "Kripto", etfs: "ETF", formiga: "Level Semut", lobo: "Level Serigala", harpia: "Level Elang Harpy", articles: "Artikel" },
  vi: { forex: "Forex", stocks: "C\u1ED5 Phi\u1EBFu", crypto: "Ti\u1EC1n \u0110i\u1EC7n T\u1EED", etfs: "ETF", formiga: "C\u1EA5p Ki\u1EBFn", lobo: "C\u1EA5p S\u00F3i", harpia: "C\u1EA5p \u0110\u1EA1i B\u00E0ng Harpy", articles: "B\u00E0i vi\u1EBFt" },
};

function localizedMarketPath(locale: Locale, market: "forex" | "stocks" | "crypto" | "etfs") {
  const slugs: Record<Locale, Record<typeof market, string>> = {
    pt: { forex: "forex", stocks: "acoes", crypto: "cripto", etfs: "etfs" },
    en: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    es: { forex: "forex", stocks: "acciones", crypto: "cripto", etfs: "etfs" },
    hi: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ar: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    tr: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    id: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    vi: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
  };

  const slug = slugs[locale][market];
  return locale === "pt" ? `/${slug}` : `/${locale}/${slug}`;
}

function homeSeoLinks(locale: Locale) {
  const labels = homeSeoLabels[locale];
  return [
    { href: localizedMarketPath(locale, "forex"), label: labels.forex },
    { href: localizedMarketPath(locale, "stocks"), label: labels.stocks },
    { href: localizedMarketPath(locale, "crypto"), label: labels.crypto },
    { href: localizedMarketPath(locale, "etfs"), label: labels.etfs },
    { href: "/nivel-formiga", label: labels.formiga },
    { href: "/nivel-lobo", label: labels.lobo },
    { href: "/nivel-harpia", label: labels.harpia },
    { href: getInsightsPath(locale), label: labels.articles },
  ];
}

function AnimatedCounter({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1400;

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * 4200));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-3 lg:flex-col lg:items-start lg:gap-1">
      <span ref={ref} className="font-mono text-2xl text-gold md:text-3xl">
        {value.toLocaleString("pt-BR")}+
      </span>
      <span className="signal-counter-label text-[10px] font-bold uppercase tracking-[0.16em] text-ink/[0.62]">
        {label}
      </span>
    </span>
  );
}

export default function Home() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = homeLiteCopy[locale];
  const account = homeAccountCopy[locale];
  const finalText = "text" in copy.final ? copy.final.text : undefined;

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="home" className="home-hero premium-stage relative px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48 lg:px-12 xl:px-16">
        <div className="cinematic-noise" />
        <div className="finance-particles" />
        <div className="absolute right-[7%] top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 top-44 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hero-mascot-wrap order-2 mx-auto w-full max-w-[340px] sm:max-w-[520px] lg:order-2 lg:max-w-[640px] 2xl:max-w-[720px]"
          >
            <div className="hero-image-wrapper relative mx-auto flex min-h-[24rem] items-center justify-center sm:min-h-[34rem] lg:min-h-[44rem] xl:min-h-[48rem]">
              <Image
                src="/characters/home-hero-official-20260527.png"
                alt="Personagens oficiais Formiga, Lobo e Harpia do Varejo Investidor"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1536px) 720px, (min-width: 1024px) 640px, (min-width: 640px) 520px, 340px"
                className="hero-main-image hero-mascot-image relative z-10 h-auto w-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div className="order-1 lg:order-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.h1 variants={fadeUp} className="hero-headline max-w-5xl text-balance font-serif text-[2.55rem] leading-[1.04] tracking-[-0.045em] text-ink md:text-[4.55rem] xl:text-[5.4rem]">
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              {copy.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink shadow-premium transition hover:-translate-y-0.5">
                {copy.hero.free}
              </a>
              <a href="/servicos" className="premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
                {copy.hero.services}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white/90 px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.58fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">{copy.intro.eyebrow}</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
              {copy.intro.title}
            </h2>
            <div className="home-stats mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {copy.intro.stats.map((stat, index) => (
                <div key={stat} className="strategic-stat border-l-2 border-gold/[0.68] bg-paper px-4 py-4 shadow-fine">
                  {index === 1 ?<AnimatedCounter label={signalCounterLabels[locale]} /> : <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">{stat}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 text-base leading-8 text-ink/[0.7] md:text-lg md:leading-9">
            <p className="manifesto-text font-serif text-2xl leading-9 tracking-[-0.03em] text-ink md:text-4xl md:leading-[1.18]">
              {copy.intro.manifesto}
            </p>
            {copy.intro.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="home-levels-section px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="section-team-stage relative mx-auto flex w-full max-w-[34rem] justify-center lg:max-w-none">
            <div className="section-team-depth absolute inset-0" />
            <Image src="/characters/home-structure-horizontal-cutout.png" alt="Personagens Formiga, Lobo e Harpia ao lado dos serviços do Varejo Investidor" width={1536} height={1024} sizes="(min-width: 1024px) 46vw, 92vw" className="home-structure-image relative z-10 h-auto w-full object-contain" />
          </motion.div>

          <div className="grid gap-5">
            {copy.cards.map((card, index) => (
              <motion.article key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} variants={fadeUp} className="level-card system-module group relative overflow-hidden p-7 shadow-fine md:p-8">
                <div className="absolute inset-0 luxury-grid opacity-30" />
                <div className="relative grid gap-5 sm:grid-cols-[76px_1fr_auto] sm:items-center">
                  <span className="grid h-16 w-16 place-items-center border border-gold/[0.5] bg-paper/[0.05] font-mono text-sm text-gold transition group-hover:border-gold group-hover:bg-gold/[0.08]">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.36em] text-gold">{card.code}</p>
                    <h3 className="mt-2 font-serif text-3xl leading-[1.04] tracking-[-0.035em] md:text-4xl">{card.title}</h3>
                    <p className="mt-3 leading-7 text-ink/[0.64]">{card.text}</p>
                  </div>
                  <a href={card.href} className="learn-more block min-w-[150px] px-5 py-4 text-center text-xs uppercase transition">
                    {copy.cardCta}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-global-account px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">{account.eyebrow}</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
              {account.title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink/[0.68] md:text-lg md:leading-9">
              {account.text}
            </p>
          </div>

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            <article className="broker-home-card broker-home-card-forex group relative flex h-full min-h-[360px] flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-20" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{account.fxproLabel}</p>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/[0.28] bg-ink font-mono text-sm font-black text-gold shadow-fine">FX</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">{account.fxproTitle}</h3>
                  <p className="mt-5 max-w-xl flex-1 leading-8 text-ink/[0.64]">{account.fxproText}</p>
                </div>
                <a href={homeFxproLinks[locale]} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-8 w-full border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {account.fxproCta}
                </a>
              </div>
            </article>

            <article className="broker-home-card broker-home-card-crypto group relative flex h-full min-h-[360px] flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-20" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{account.binanceLabel}</p>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/[0.28] bg-ink font-mono text-sm font-black text-gold shadow-fine">BTC</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">{account.binanceTitle}</h3>
                  <p className="mt-5 max-w-xl flex-1 leading-8 text-ink/[0.64]">{account.binanceText}</p>
                </div>
                <a href={binanceLink} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-8 w-full border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {account.binanceCta}
                </a>
              </div>
            </article>
          </div>

          <div className="mt-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{account.bannerLabel}</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink/[0.62] md:text-base">
                {account.bannerText}
              </p>
            </div>
            <a href={homeFxproLinks[locale]} target="_blank" rel="noopener noreferrer" className="group mx-auto mt-6 block w-full max-w-[1324px] overflow-hidden rounded-sm transition duration-300 hover:-translate-y-0.5">
              <img
                src={homeFxproBanners[locale]}
                alt="FxPro Banner"
                width={1324}
                height={150}
                loading="lazy"
                className="block h-auto w-full transition duration-300 group-hover:scale-[1.006]"
              />
            </a>
          </div>

          <nav aria-label={account.ecosystemLabel} className="mt-8 flex flex-wrap justify-center gap-2">
            {homeSeoLinks(locale).map((link) => (
              <a key={link.href} href={link.href} className="border border-gold/[0.18] bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/[0.72] transition hover:border-gold/[0.5] hover:text-gold">
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-14 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1280px]">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-[1280px] overflow-hidden border border-ink bg-ink px-6 py-16 text-center text-paper shadow-premium md:px-12 md:py-24">
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">Varejo Investidor</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-7xl">
              {copy.final.title}
            </h2>
            {finalText ? (
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
                {finalText}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition">
                {copy.final.free}
              </a>
              <a href="/sinais" className="premium-button-ghost border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition">
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
