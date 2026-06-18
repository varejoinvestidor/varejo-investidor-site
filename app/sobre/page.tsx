"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";

const aboutCopy = {
  pt: {
    heroEyebrow: "Sobre o Varejo Investidor",
    heroTitle:
      "Tudo o que o investidor comum precisa para entender, operar e construir patrimônio no mercado global.",
    heroText:
      "Do básico ao avançado. Educação, sinais ao vivo, leitura de mercado e construção financeira em camadas.",
    indicators: ["Desde 2018", "+4.200 sinais ao vivo", "Forex • Ouro • Índices • Cripto", "Conteúdo em múltiplos idiomas"],
    pillars: [
      ["Leitura de mercado", "Entender movimentos globais"],
      ["Operação", "Forex, ouro, índices e cripto"],
      ["Risco", "Proteção e gestão operacional"],
      ["Patrimônio", "Construção financeira de longo prazo"],
      ["Posicionamento", "Visão estratégica e expansão"],
      ["Construção em camadas", "Do básico ao patrimônio global"],
    ],
    whatTitle: "O que é o Varejo Investidor",
    whatParagraphs: [
      "O Varejo Investidor foi criado para ensinar investidores comuns a entender o mercado internacional, operar com mais clareza e construir estrutura financeira de longo prazo.",
      "A proposta sempre foi desenvolver uma estrutura financeira global acessível ao varejo, unindo educação, leitura de mercado, sinais ao vivo e visão patrimonial.",
      "Desde 2018, o projeto acompanha diariamente Forex, ouro, petróleo, índices globais, criptomoedas e ciclos internacionais.",
    ],
    foundTitle: "O que você encontra aqui",
    found: [
      "Sinais ao vivo",
      "Educação financeira",
      "Leitura de mercado",
      "Estrutura operacional",
      "Conteúdo multilíngue",
      "Gestão de risco",
      "Construção patrimonial",
      "Visão internacional",
    ],
    notOnlyTitle: "Não somos apenas um canal",
    notOnlyLeftTitle: "Não somos",
    notOnlyLeft: ["apenas sinais", "apenas um curso", "apenas conteúdo motivacional", "apenas operações rápidas"],
    notOnlyRightTitle: "Somos",
    notOnlyRight: [
      "educação financeira",
      "leitura institucional",
      "operação estruturada",
      "visão patrimonial",
      "estrutura financeira global",
    ],
    levelsTitle: "Formiga • Lobo • Harpia",
    levelsText: "A evolução dentro do Varejo Investidor acontece por níveis de consciência, operação e patrimônio.",
    levels: [
      ["Formiga", "Base financeira.", "Organização, primeiros investimentos e construção da disciplina."],
      ["Lobo", "Estratégia e expansão.", "Leitura de mercado, operação, risco e posicionamento."],
      ["Harpia", "Visão global.", "Patrimônio, proteção, sucessão e estrutura internacional."],
    ],
    visionTitle: "Uma visão diferente",
    visionParagraphs: [
      "O mercado financeiro tradicional vende velocidade.",
      "O Varejo Investidor foi criado para ensinar estrutura.",
      "Enquanto grande parte do mercado busca promessas rápidas, aqui o foco sempre foi leitura de mercado, construção financeira, visão internacional e crescimento em camadas.",
    ],
    futureTitle: "Visão de futuro",
    futureText:
      "O objetivo nunca foi apenas operar. A visão é construir uma estrutura financeira própria para o varejo global: uma plataforma institucional, uma estrutura educacional e um ambiente operacional acessível ao investidor comum.",
    futureIndicators: ["Plataforma própria", "Estrutura global", "Conteúdo multilíngue", "Visão institucional", "Expansão internacional"],
    finalTitle: "Da organização financeira ao patrimônio global.",
    finalText:
      "Da primeira operação à construção de uma estrutura geracional. Essa é a jornada do Varejo Investidor.",
    freeCta: "Entrar no Canal Formiga",
    eliteCta: "Conhecer o Elite",
  },
  en: {
    heroEyebrow: "About Varejo Investidor",
    heroTitle: "Everything retail investors need to understand, operate, and build wealth in global markets.",
    heroText: "From basics to advanced vision. Education, live signals, market reading, and layered financial construction.",
    indicators: ["Since 2018", "+4,200 live signals", "Forex • Gold • Indices • Crypto", "Content in multiple languages"],
    pillars: [
      ["Market reading", "Understand global movements"],
      ["Trading", "Forex, gold, indices, and crypto"],
      ["Risk", "Protection and operational management"],
      ["Wealth", "Long-term financial construction"],
      ["Positioning", "Strategic vision and expansion"],
      ["Layered construction", "From basics to global wealth"],
    ],
    whatTitle: "What is Varejo Investidor",
    whatParagraphs: [
      "Varejo Investidor was created to teach retail investors how to understand international markets, operate with more clarity, and build long-term financial structure.",
      "The proposal has always been to develop a global financial structure accessible to retail investors, combining education, market reading, live signals, and wealth vision.",
      "Since 2018, the project has followed Forex, gold, oil, global indices, cryptocurrencies, and international cycles daily.",
    ],
    foundTitle: "What you find here",
    found: ["Live signals", "Financial education", "Market reading", "Operational structure", "Multilingual content", "Risk management", "Wealth construction", "International vision"],
    notOnlyTitle: "We are not just a channel",
    notOnlyLeftTitle: "We are not",
    notOnlyLeft: ["just signals", "just a course", "motivational content only", "quick trades only"],
    notOnlyRightTitle: "We are",
    notOnlyRight: ["financial education", "institutional reading", "structured operation", "wealth vision", "global financial structure"],
    levelsTitle: "Ant • Wolf • Harpy",
    levelsText: "Evolution inside Varejo Investidor happens through levels of awareness, operation, and wealth.",
    levels: [
      ["Ant", "Financial foundation.", "Organization, first investments, and discipline building."],
      ["Wolf", "Strategy and expansion.", "Market reading, operation, risk, and positioning."],
      ["Harpy", "Global vision.", "Wealth, protection, succession, and international structure."],
    ],
    visionTitle: "A different vision",
    visionParagraphs: [
      "The traditional financial market sells speed.",
      "Varejo Investidor was created to teach structure.",
      "While much of the market seeks quick promises, the focus here has always been market reading, financial construction, international vision, and layered growth.",
    ],
    futureTitle: "Future vision",
    futureText:
      "The goal was never just to trade. The vision is to build a proprietary financial structure for global retail: an institutional platform, an educational structure, and an operational environment accessible to ordinary investors.",
    futureIndicators: ["Own platform", "Global structure", "Multilingual content", "Institutional vision", "International expansion"],
    finalTitle: "From financial organization to global wealth.",
    finalText: "From the first operation to building a generational structure. This is the Varejo Investidor journey.",
    freeCta: "Start with the Ant Channel",
    eliteCta: "Explore Elite",
  },
  es: {
    heroEyebrow: "Sobre Varejo Investidor",
    heroTitle: "Todo lo que el inversor común necesita para entender, operar y construir patrimonio en el mercado global.",
    heroText: "De lo básico a lo avanzado. Educación, señales en vivo, lectura de mercado y construcción financiera por capas.",
    indicators: ["Desde 2018", "+4.200 señales en vivo", "Forex • Oro • Índices • Cripto", "Contenido en múltiples idiomas"],
    pillars: [
      ["Lectura de mercado", "Entender movimientos globales"],
      ["Operación", "Forex, oro, índices y cripto"],
      ["Riesgo", "Protección y gestión operacional"],
      ["Patrimonio", "Construcción financiera de largo plazo"],
      ["Posicionamiento", "Visión estratégica y expansión"],
      ["Construcción por capas", "De lo básico al patrimonio global"],
    ],
    whatTitle: "Qué es Varejo Investidor",
    whatParagraphs: [
      "Varejo Investidor fue creado para enseñar a inversores comunes a entender el mercado internacional, operar con más claridad y construir estructura financiera de largo plazo.",
      "La propuesta siempre fue desarrollar una estructura financiera global accesible al inversor minorista, uniendo educación, lectura de mercado, señales en vivo y visión patrimonial.",
      "Desde 2018, el proyecto acompaña diariamente Forex, oro, petróleo, índices globales, criptomonedas y ciclos internacionales.",
    ],
    foundTitle: "Qué encuentras aquí",
    found: ["Señales en vivo", "Educación financiera", "Lectura de mercado", "Estructura operacional", "Contenido multilingüe", "Gestión de riesgo", "Construcción patrimonial", "Visión internacional"],
    notOnlyTitle: "No somos solo un canal",
    notOnlyLeftTitle: "No somos",
    notOnlyLeft: ["solo señales", "solo un curso", "solo contenido motivacional", "solo operaciones rápidas"],
    notOnlyRightTitle: "Somos",
    notOnlyRight: ["educación financiera", "lectura institucional", "operación estructurada", "visión patrimonial", "estructura financiera global"],
    levelsTitle: "Hormiga • Lobo • Harpía",
    levelsText: "La evolución dentro de Varejo Investidor ocurre por niveles de conciencia, operación y patrimonio.",
    levels: [
      ["Hormiga", "Base financiera.", "Organización, primeras inversiones y construcción de disciplina."],
      ["Lobo", "Estrategia y expansión.", "Lectura de mercado, operación, riesgo y posicionamiento."],
      ["Harpía", "Visión global.", "Patrimonio, protección, sucesión y estructura internacional."],
    ],
    visionTitle: "Una visión diferente",
    visionParagraphs: [
      "El mercado financiero tradicional vende velocidad.",
      "Varejo Investidor fue creado para enseñar estructura.",
      "Mientras gran parte del mercado busca promesas rápidas, aquí el foco siempre fue lectura de mercado, construcción financiera, visión internacional y crecimiento por capas.",
    ],
    futureTitle: "Visión de futuro",
    futureText:
      "El objetivo nunca fue solo operar. La visión es construir una estructura financiera propia para el retail global: una plataforma institucional, una estructura educativa y un ambiente operacional accesible al inversor común.",
    futureIndicators: ["Plataforma propia", "Estructura global", "Contenido multilingüe", "Visión institucional", "Expansión internacional"],
    finalTitle: "De la organización financiera al patrimonio global.",
    finalText: "De la primera operación a la construcción de una estructura generacional. Esa es la jornada de Varejo Investidor.",
    freeCta: "Empezar por el Canal Hormiga",
    eliteCta: "Conocer Elite",
  },
  hi: {
    heroEyebrow: "Varejo Investidor का परिचय",
    heroTitle: "सामान्य निवेशक को वैश्विक बाजार समझने, ऑपरेट करने और संपत्ति बनाने के लिए पूरी संरचना।",
    heroText: "बुनियादी से उन्नत तक। शिक्षा, लाइव सिग्नल, बाजार-पठन और चरणों में वित्तीय निर्माण।",
    indicators: ["2018 से", "4,200+ लाइव सिग्नल", "Forex • सोना • सूचकांक • क्रिप्टो", "कई भाषाओं में सामग्री"],
    pillars: [
      ["बाजार-पठन", "वैश्विक चालों को समझना"],
      ["ऑपरेशन", "Forex, सोना, सूचकांक और क्रिप्टो"],
      ["जोखिम", "सुरक्षा और ऑपरेशनल प्रबंधन"],
      ["संपत्ति", "दीर्घकालिक वित्तीय निर्माण"],
      ["पोजिशनिंग", "रणनीतिक दृष्टि और विस्तार"],
      ["चरणों में निर्माण", "बुनियादी स्तर से वैश्विक संपत्ति तक"],
    ],
    whatTitle: "Varejo Investidor क्या है",
    whatParagraphs: [
      "Varejo Investidor सामान्य निवेशकों को अंतरराष्ट्रीय बाजार समझना, अधिक स्पष्टता से ऑपरेट करना और दीर्घकालिक वित्तीय संरचना बनाना सिखाने के लिए बनाया गया था।",
      "प्रस्ताव हमेशा रिटेल निवेशक के लिए एक सुलभ वैश्विक वित्तीय संरचना विकसित करना रहा है, जिसमें शिक्षा, बाजार-पठन, लाइव सिग्नल और संपत्ति दृष्टि जुड़ते हैं।",
      "2018 से यह प्रोजेक्ट Forex, सोना, तेल, वैश्विक सूचकांक, क्रिप्टोकरेंसी और अंतरराष्ट्रीय चक्रों का दैनिक अनुसरण करता है।",
    ],
    foundTitle: "यहाँ आपको क्या मिलता है",
    found: ["लाइव सिग्नल", "वित्तीय शिक्षा", "बाजार-पठन", "ऑपरेशनल संरचना", "बहुभाषी सामग्री", "जोखिम प्रबंधन", "संपत्ति निर्माण", "अंतरराष्ट्रीय दृष्टि"],
    notOnlyTitle: "हम केवल एक चैनल नहीं हैं",
    notOnlyLeftTitle: "हम नहीं हैं",
    notOnlyLeft: ["केवल सिग्नल", "केवल एक कोर्स", "केवल प्रेरक सामग्री", "केवल तेज ऑपरेशन"],
    notOnlyRightTitle: "हम हैं",
    notOnlyRight: ["वित्तीय शिक्षा", "संस्थागत पठन", "संरचित ऑपरेशन", "संपत्ति दृष्टि", "वैश्विक वित्तीय संरचना"],
    levelsTitle: "चींटी • भेड़िया • गरुड़",
    levelsText: "Varejo Investidor के भीतर विकास जागरूकता, ऑपरेशन और संपत्ति के स्तरों से होता है।",
    levels: [
      ["चींटी", "वित्तीय आधार।", "संगठन, शुरुआती निवेश और अनुशासन निर्माण।"],
      ["भेड़िया", "रणनीति और विस्तार।", "बाजार-पठन, ऑपरेशन, जोखिम और पोजिशनिंग।"],
      ["गरुड़", "वैश्विक दृष्टि।", "संपत्ति, सुरक्षा, उत्तराधिकार और अंतरराष्ट्रीय संरचना।"],
    ],
    visionTitle: "एक अलग दृष्टि",
    visionParagraphs: [
      "पारंपरिक वित्तीय बाजार गति बेचता है।",
      "Varejo Investidor संरचना सिखाने के लिए बनाया गया था।",
      "जहाँ बाजार का बड़ा हिस्सा तेज वादों की तलाश करता है, यहाँ ध्यान हमेशा बाजार-पठन, वित्तीय निर्माण, अंतरराष्ट्रीय दृष्टि और चरणों में विकास पर रहा है।",
    ],
    futureTitle: "भविष्य की दृष्टि",
    futureText:
      "उद्देश्य कभी केवल ऑपरेट करना नहीं था। दृष्टि है वैश्विक रिटेल के लिए अपनी वित्तीय संरचना बनाना: एक संस्थागत प्लेटफॉर्म, एक शैक्षिक संरचना और सामान्य निवेशक के लिए सुलभ ऑपरेशनल वातावरण।",
    futureIndicators: ["अपना प्लेटफॉर्म", "वैश्विक संरचना", "बहुभाषी सामग्री", "संस्थागत दृष्टि", "अंतरराष्ट्रीय विस्तार"],
    finalTitle: "वित्तीय संगठन से वैश्विक संपत्ति तक।",
    finalText: "पहले ऑपरेशन से पीढ़ीगत संरचना के निर्माण तक। यही Varejo Investidor की यात्रा है।",
    freeCta: "चींटी चैनल से शुरू करें",
    eliteCta: "एलीट देखें",
  },
};

const localizedAboutCopy = {
  ...aboutCopy,
  id: {
    ...aboutCopy.en,
    heroEyebrow: "Tentang Varejo Investidor",
    heroTitle: "Semua yang dibutuhkan investor ritel untuk memahami, beroperasi, dan membangun kekayaan di pasar global.",
    heroText: "Dari dasar hingga visi lanjutan. Edukasi, sinyal live, pembacaan pasar, dan pembangunan finansial bertahap.",
    indicators: ["Sejak 2018", "+4.200 sinyal live", "Forex • Emas • Indeks • Kripto", "Konten multibahasa"],
    pillars: [
      ["Pembacaan pasar", "Memahami pergerakan global"],
      ["Operasi", "Forex, emas, indeks, dan kripto"],
      ["Risiko", "Perlindungan dan manajemen operasional"],
      ["Kekayaan", "Pembangunan finansial jangka panjang"],
      ["Posisi", "Visi strategis dan ekspansi"],
      ["Pembangunan bertahap", "Dari dasar menuju kekayaan global"],
    ],
    whatTitle: "Apa itu Varejo Investidor",
    whatParagraphs: [
      "Varejo Investidor dibuat untuk mengajarkan investor ritel memahami pasar internasional, beroperasi dengan lebih jelas, dan membangun struktur finansial jangka panjang.",
      "Tujuannya adalah membangun struktur finansial global yang dapat diakses investor ritel, menggabungkan edukasi, pembacaan pasar, sinyal live, dan visi kekayaan.",
      "Sejak 2018, proyek ini mengikuti Forex, emas, minyak, indeks global, kripto, dan siklus internasional setiap hari.",
    ],
    foundTitle: "Apa yang Anda temukan di sini",
    found: ["Sinyal live", "Edukasi finansial", "Pembacaan pasar", "Struktur operasional", "Konten multibahasa", "Manajemen risiko", "Pembangunan kekayaan", "Visi internasional"],
    notOnlyTitle: "Kami bukan sekadar kanal",
    notOnlyLeftTitle: "Kami bukan",
    notOnlyLeft: ["hanya sinyal", "hanya kursus", "hanya konten motivasi", "hanya transaksi cepat"],
    notOnlyRightTitle: "Kami adalah",
    notOnlyRight: ["edukasi finansial", "pembacaan institusional", "operasi terstruktur", "visi kekayaan", "struktur finansial global"],
    levelsTitle: "Semut • Serigala • Elang Harpy",
    levelsText: "Evolusi di Varejo Investidor terjadi melalui tingkat kesadaran, operasi, dan kekayaan.",
    levels: [
      ["Semut", "Fondasi finansial.", "Organisasi, investasi pertama, dan pembangunan disiplin."],
      ["Serigala", "Strategi dan ekspansi.", "Pembacaan pasar, operasi, risiko, dan posisi."],
      ["Elang Harpy", "Visi global.", "Kekayaan, perlindungan, suksesi, dan struktur internasional."],
    ],
    visionTitle: "Visi yang berbeda",
    visionParagraphs: ["Pasar finansial tradisional menjual kecepatan.", "Varejo Investidor dibuat untuk mengajarkan struktur.", "Ketika banyak pasar mengejar janji cepat, fokus kami adalah pembacaan pasar, pembangunan finansial, visi internasional, dan pertumbuhan bertahap."],
    futureTitle: "Visi masa depan",
    futureText: "Tujuannya tidak pernah hanya untuk trading. Visinya adalah membangun struktur finansial sendiri untuk ritel global: platform institusional, struktur edukasi, dan lingkungan operasional yang dapat diakses investor umum.",
    futureIndicators: ["Platform sendiri", "Struktur global", "Konten multibahasa", "Visi institusional", "Ekspansi internasional"],
    finalTitle: "Dari organisasi finansial menuju kekayaan global.",
    finalText: "Dari operasi pertama hingga pembangunan struktur generasi. Inilah perjalanan Varejo Investidor.",
    freeCta: "Mulai dari Kanal Semut",
    eliteCta: "Lihat Elite",
  },
  vi: {
    ...aboutCopy.en,
    heroEyebrow: "Về Varejo Investidor",
    heroTitle: "Tất cả những gì nhà đầu tư phổ thông cần để hiểu, vận hành và xây dựng tài sản trên thị trường toàn cầu.",
    heroText: "Từ nền tảng đến tầm nhìn nâng cao. Giáo dục, tín hiệu trực tiếp, đọc thị trường và xây dựng tài chính theo từng lớp.",
    indicators: ["Từ năm 2018", "+4.200 tín hiệu trực tiếp", "Forex • Vàng • Chỉ số • Crypto", "Nội dung đa ngôn ngữ"],
    pillars: [
      ["Đọc thị trường", "Hiểu các chuyển động toàn cầu"],
      ["Vận hành", "Forex, vàng, chỉ số và crypto"],
      ["Rủi ro", "Bảo vệ và quản trị vận hành"],
      ["Tài sản", "Xây dựng tài chính dài hạn"],
      ["Định vị", "Tầm nhìn chiến lược và mở rộng"],
      ["Xây dựng theo lớp", "Từ nền tảng đến tài sản toàn cầu"],
    ],
    whatTitle: "Varejo Investidor là gì",
    whatParagraphs: [
      "Varejo Investidor được tạo ra để dạy nhà đầu tư phổ thông hiểu thị trường quốc tế, vận hành rõ ràng hơn và xây dựng cấu trúc tài chính dài hạn.",
      "Đề xuất luôn là phát triển một cấu trúc tài chính toàn cầu dễ tiếp cận cho nhà đầu tư phổ thông, kết hợp giáo dục, đọc thị trường, tín hiệu trực tiếp và tầm nhìn tài sản.",
      "Từ năm 2018, dự án theo dõi hằng ngày Forex, vàng, dầu, chỉ số toàn cầu, tiền điện tử và các chu kỳ quốc tế.",
    ],
    foundTitle: "Bạn tìm thấy gì ở đây",
    found: ["Tín hiệu trực tiếp", "Giáo dục tài chính", "Đọc thị trường", "Cấu trúc vận hành", "Nội dung đa ngôn ngữ", "Quản trị rủi ro", "Xây dựng tài sản", "Tầm nhìn quốc tế"],
    notOnlyTitle: "Chúng tôi không chỉ là một kênh",
    notOnlyLeftTitle: "Chúng tôi không phải",
    notOnlyLeft: ["chỉ là tín hiệu", "chỉ là khóa học", "chỉ là nội dung tạo động lực", "chỉ là giao dịch nhanh"],
    notOnlyRightTitle: "Chúng tôi là",
    notOnlyRight: ["giáo dục tài chính", "đọc thị trường theo hướng tổ chức", "vận hành có cấu trúc", "tầm nhìn tài sản", "cấu trúc tài chính toàn cầu"],
    levelsTitle: "Kiến • Sói • Đại Bàng Harpy",
    levelsText: "Sự phát triển trong Varejo Investidor diễn ra qua các cấp độ nhận thức, vận hành và tài sản.",
    levels: [
      ["Kiến", "Nền tảng tài chính.", "Tổ chức, khoản đầu tư đầu tiên và xây dựng kỷ luật."],
      ["Sói", "Chiến lược và mở rộng.", "Đọc thị trường, vận hành, rủi ro và định vị."],
      ["Đại Bàng Harpy", "Tầm nhìn toàn cầu.", "Tài sản, bảo vệ, kế thừa và cấu trúc quốc tế."],
    ],
    visionTitle: "Một tầm nhìn khác",
    visionParagraphs: ["Thị trường tài chính truyền thống bán tốc độ.", "Varejo Investidor được tạo ra để dạy cấu trúc.", "Trong khi phần lớn thị trường tìm kiếm lời hứa nhanh, trọng tâm ở đây luôn là đọc thị trường, xây dựng tài chính, tầm nhìn quốc tế và tăng trưởng theo từng lớp."],
    futureTitle: "Tầm nhìn tương lai",
    futureText: "Mục tiêu chưa bao giờ chỉ là giao dịch. Tầm nhìn là xây dựng một cấu trúc tài chính riêng cho nhà đầu tư phổ thông toàn cầu: một nền tảng tổ chức, cấu trúc giáo dục và môi trường vận hành dễ tiếp cận.",
    futureIndicators: ["Nền tảng riêng", "Cấu trúc toàn cầu", "Nội dung đa ngôn ngữ", "Tầm nhìn tổ chức", "Mở rộng quốc tế"],
    finalTitle: "Từ tổ chức tài chính đến tài sản toàn cầu.",
    finalText: "Từ giao dịch đầu tiên đến xây dựng cấu trúc thế hệ. Đó là hành trình của Varejo Investidor.",
    freeCta: "Bắt đầu với Kênh Kiến",
    eliteCta: "Tìm hiểu Elite",
  },
  ar: {
    ...aboutCopy.en,
    heroEyebrow: "من نحن",
    heroTitle: "كل ما يحتاجه المستثمر الفردي لفهم الأسواق العالمية والتشغيل وبناء الثروة.",
    heroText: "من الأساسيات إلى الرؤية المتقدمة. تعليم، إشارات مباشرة، قراءة سوق وبناء مالي على طبقات.",
    indicators: ["منذ 2018", "+4,200 إشارة مباشرة", "Forex • ذهب • مؤشرات • كريبتو", "محتوى متعدد اللغات"],
    pillars: [
      ["قراءة السوق", "فهم الحركات العالمية"],
      ["التشغيل", "فوركس، ذهب، مؤشرات وكريبتو"],
      ["المخاطر", "حماية وإدارة تشغيلية"],
      ["الثروة", "بناء مالي طويل المدى"],
      ["التموضع", "رؤية استراتيجية وتوسع"],
      ["البناء على طبقات", "من الأساسيات إلى الثروة العالمية"],
    ],
    whatTitle: "ما هو Varejo Investidor",
    whatParagraphs: [
      "تم إنشاء Varejo Investidor لتعليم المستثمرين الأفراد فهم الأسواق الدولية والتشغيل بوضوح أكبر وبناء هيكل مالي طويل المدى.",
      "الهدف هو تطوير هيكل مالي عالمي متاح للمستثمر الفردي يجمع التعليم وقراءة السوق والإشارات المباشرة ورؤية الثروة.",
      "منذ 2018، يتابع المشروع يوميا الفوركس والذهب والنفط والمؤشرات العالمية والكريبتو والدورات الدولية.",
    ],
    foundTitle: "ما الذي تجده هنا",
    found: ["إشارات مباشرة", "تعليم مالي", "قراءة السوق", "هيكل تشغيلي", "محتوى متعدد اللغات", "إدارة المخاطر", "بناء الثروة", "رؤية دولية"],
    notOnlyTitle: "لسنا مجرد قناة",
    notOnlyLeftTitle: "لسنا",
    notOnlyLeft: ["مجرد إشارات", "مجرد دورة", "مجرد محتوى تحفيزي", "مجرد عمليات سريعة"],
    notOnlyRightTitle: "نحن",
    notOnlyRight: ["تعليم مالي", "قراءة مؤسسية", "تشغيل منظم", "رؤية ثروة", "هيكل مالي عالمي"],
    levelsTitle: "النملة • الذئب • الهاربي",
    levelsText: "التطور داخل Varejo Investidor يحدث عبر مستويات الوعي والتشغيل والثروة.",
    levels: [
      ["النملة", "الأساس المالي.", "تنظيم، استثمارات أولى وبناء الانضباط."],
      ["الذئب", "استراتيجية وتوسع.", "قراءة السوق، التشغيل، المخاطر والتموضع."],
      ["الهاربي", "رؤية عالمية.", "ثروة، حماية، تعاقب وهيكل دولي."],
    ],
    visionTitle: "رؤية مختلفة",
    visionParagraphs: ["السوق المالي التقليدي يبيع السرعة.", "Varejo Investidor تم إنشاؤه لتعليم الهيكل.", "بينما يبحث جزء كبير من السوق عن وعود سريعة، يركز هذا المشروع على قراءة السوق والبناء المالي والرؤية الدولية والنمو على طبقات."],
    futureTitle: "رؤية المستقبل",
    futureText: "الهدف لم يكن التشغيل فقط. الرؤية هي بناء هيكل مالي خاص للمستثمر الفردي العالمي: منصة مؤسسية، هيكل تعليمي وبيئة تشغيلية متاحة للمستثمر العادي.",
    futureIndicators: ["منصة خاصة", "هيكل عالمي", "محتوى متعدد اللغات", "رؤية مؤسسية", "توسع دولي"],
    finalTitle: "من التنظيم المالي إلى الثروة العالمية.",
    finalText: "من أول عملية إلى بناء هيكل للأجيال. هذه هي رحلة Varejo Investidor.",
    freeCta: "ابدأ بقناة النملة",
    eliteCta: "تعرف إلى النخبة",
  },
  tr: {
    ...aboutCopy.en,
    heroEyebrow: "Varejo Investidor Hakkında",
    heroTitle: "Bireysel yatırımcının küresel piyasaları anlamak, işlem yapmak ve varlık inşa etmek için ihtiyaç duyduğu her şey.",
    heroText: "Temelden ileri vizyona. Eğitim, canlı sinyaller, piyasa okuma ve katmanlı finansal inşa.",
    indicators: ["2018'den beri", "+4.200 canlı sinyal", "Forex • Altın • Endeksler • Kripto", "Çok dilli içerik"],
    pillars: [
      ["Piyasa okuma", "Küresel hareketleri anlamak"],
      ["İşlem", "Forex, altın, endeksler ve kripto"],
      ["Risk", "Koruma ve operasyonel yönetim"],
      ["Varlık", "Uzun vadeli finansal inşa"],
      ["Konumlanma", "Stratejik vizyon ve genişleme"],
      ["Katmanlı inşa", "Temelden küresel varlığa"],
    ],
    whatTitle: "Varejo Investidor nedir",
    whatParagraphs: [
      "Varejo Investidor, bireysel yatırımcılara uluslararası piyasaları anlamayı, daha net işlem yapmayı ve uzun vadeli finansal yapı kurmayı öğretmek için oluşturuldu.",
      "Amaç; eğitim, piyasa okuma, canlı sinyaller ve varlık vizyonunu birleştiren, bireysel yatırımcıya erişilebilir küresel bir finansal yapı geliştirmektir.",
      "2018'den beri proje Forex, altın, petrol, küresel endeksler, kripto paralar ve uluslararası döngüleri günlük olarak takip eder.",
    ],
    foundTitle: "Burada ne bulursun",
    found: ["Canlı sinyaller", "Finansal eğitim", "Piyasa okuma", "Operasyonel yapı", "Çok dilli içerik", "Risk yönetimi", "Varlık inşası", "Uluslararası vizyon"],
    notOnlyTitle: "Sadece bir kanal değiliz",
    notOnlyLeftTitle: "Değiliz",
    notOnlyLeft: ["sadece sinyaller", "sadece bir kurs", "sadece motivasyon içeriği", "sadece hızlı işlemler"],
    notOnlyRightTitle: "Biz",
    notOnlyRight: ["finansal eğitim", "kurumsal okuma", "yapılandırılmış operasyon", "varlık vizyonu", "küresel finansal yapı"],
    levelsTitle: "Karınca • Kurt • Harpia",
    levelsText: "Varejo Investidor içindeki gelişim farkındalık, operasyon ve varlık seviyeleriyle ilerler.",
    levels: [
      ["Karınca", "Finansal temel.", "Organizasyon, ilk yatırımlar ve disiplin inşası."],
      ["Kurt", "Strateji ve genişleme.", "Piyasa okuma, işlem, risk ve konumlanma."],
      ["Harpia", "Küresel vizyon.", "Varlık, koruma, devir ve uluslararası yapı."],
    ],
    visionTitle: "Farklı bir vizyon",
    visionParagraphs: ["Geleneksel finans piyasası hız satar.", "Varejo Investidor yapı öğretmek için oluşturuldu.", "Piyasanın büyük kısmı hızlı vaatler ararken burada odak piyasa okuma, finansal inşa, uluslararası vizyon ve katmanlı büyümedir."],
    futureTitle: "Gelecek vizyonu",
    futureText: "Amaç hiçbir zaman sadece işlem yapmak değildi. Vizyon, küresel bireysel yatırımcı için kendi finansal yapısını kurmaktır: kurumsal bir platform, eğitim yapısı ve sıradan yatırımcıya erişilebilir operasyonel ortam.",
    futureIndicators: ["Kendi platformu", "Küresel yapı", "Çok dilli içerik", "Kurumsal vizyon", "Uluslararası genişleme"],
    finalTitle: "Finansal organizasyondan küresel varlığa.",
    finalText: "İlk işlemden kuşaklar arası yapı inşasına. Varejo Investidor yolculuğu budur.",
    freeCta: "Karınca Kanalı ile başla",
    eliteCta: "Elite'i keşfet",
  },
};

function InfoCard({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.035 }}
      variants={fadeUp}
      className="terminal-module relative overflow-hidden border border-ink/[0.1] bg-white p-5 shadow-fine"
    >
      <div className="absolute inset-0 luxury-grid opacity-25" />
      <div className="relative">
        <h3 className="font-serif text-3xl leading-[1.04] tracking-[-0.04em]">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-ink/[0.66]">{text}</p>
      </div>
    </motion.article>
  );
}

export default function SobrePage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = localizedAboutCopy[locale as keyof typeof localizedAboutCopy] ?? localizedAboutCopy.en;

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="about-hero premium-stage relative px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.36em] text-gold">
              {copy.heroEyebrow}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-6 max-w-6xl text-balance font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl xl:text-7xl"
            >
              {copy.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              {copy.heroText}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {copy.indicators.map((item) => (
                <div key={item} className="border border-gold/[0.22] bg-paper/[0.035] px-4 py-4 text-sm font-bold uppercase tracking-[0.13em] text-gold">
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-visual relative mx-auto flex min-h-[24rem] w-full items-center justify-center sm:min-h-[32rem] lg:min-h-[44rem]"
          >
            <Image
              src="/characters/about-hero-official-20260527.png"
              alt="Personagens Formiga, Lobo e Harpia representando a estrutura global do Varejo Investidor"
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 94vw"
              className="hero-about-image about-hero-image relative z-10 h-auto w-full object-contain object-center"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          variants={fadeUp}
          className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_1fr]"
        >
          <div>
            <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">{copy.whatTitle}</h2>
          </div>
          <div className="grid gap-5 text-lg leading-9 text-ink/[0.68]">
            {copy.whatParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">{copy.foundTitle}</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.found.map((item, index) => (
              <InfoCard key={item} title={item} text={copy.pillars[index % copy.pillars.length][1]} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">Evolu\u00E7\u00E3o do ecossistema</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">
              Formiga, Lobo, Harpia e Select.
            </h2>
            <p className="mt-6 text-lg leading-8 text-paper/[0.72]">
              O Select representa a camada mais avançada do ecossistema Varejo Investidor, destinada a investidores que já construíram patrimônio relevante e buscam uma estrutura internacional de diversificação, proteção e crescimento de longo prazo.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {[
              ["Formiga", "Primeiros passos financeiros"],
              ["Lobo", "Estrutura operacional"],
              ["Harpia", "Vis\u00E3o global"],
              ["Select", "Estrutura patrimonial avan\u00E7ada"],
            ].map(([level, text], index) => (
              <article key={level} className="relative overflow-hidden border border-gold/[0.2] bg-paper/[0.04] p-6 shadow-fine">
                <div className="absolute inset-0 luxury-grid opacity-20" />
                <div className="relative">
                  <h3 className="font-serif text-4xl tracking-[-0.05em] text-paper">{level}</h3>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.13em] text-paper/[0.68]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="terminal-module relative overflow-hidden border border-gold/[0.22] bg-ink p-6 text-paper shadow-premium md:p-10"
          >
            <div className="absolute inset-0 terminal-grid opacity-25" />
            <div className="relative">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">{copy.notOnlyTitle}</h2>
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <div className="border border-paper/[0.12] bg-paper/[0.035] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-fall">{copy.notOnlyLeftTitle}</p>
                  <div className="mt-6 grid gap-3">
                    {copy.notOnlyLeft.map((item) => (
                      <p key={item} className="border-l border-fall pl-4 text-sm uppercase tracking-[0.12em] text-paper/[0.72]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="border border-gold/[0.34] bg-gold/[0.07] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{copy.notOnlyRightTitle}</p>
                  <div className="mt-6 grid gap-3">
                    {copy.notOnlyRight.map((item) => (
                      <p key={item} className="border-l border-gold pl-4 text-sm uppercase tracking-[0.12em] text-paper/[0.82]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-6xl">{copy.levelsTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-ink/[0.66]">{copy.levelsText}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.levels.map(([name, title, text], index) => (
              <motion.article
                key={name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                variants={fadeUp}
                className="terminal-module relative overflow-hidden border border-gold/[0.2] bg-paper p-6 shadow-fine md:p-8"
              >
                <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-gold/[0.08] blur-2xl" />
                <div className="relative">
                  <h3 className="font-serif text-5xl tracking-[-0.05em]">{name}</h3>
                  <p className="mt-5 text-lg font-bold text-gold">{title}</p>
                  <p className="mt-3 leading-8 text-ink/[0.68]">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="terminal-module relative overflow-hidden border border-ink/[0.1] bg-white p-6 md:p-9"
          >
            <div className="absolute inset-0 luxury-grid opacity-25" />
            <div className="relative">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">{copy.visionTitle}</h2>
              <div className="mt-7 grid gap-4 text-base leading-8 text-ink/[0.68] md:text-lg">
                {copy.visionParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            variants={fadeUp}
            className="terminal-module relative overflow-hidden border border-gold/[0.22] bg-white p-6 md:p-9"
          >
            <div className="absolute inset-0 terminal-grid opacity-20" />
            <div className="relative">
              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">{copy.futureTitle}</h2>
              <p className="mt-7 text-base leading-8 text-ink/[0.68] md:text-lg">{copy.futureText}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {copy.futureIndicators.map((item) => (
                  <span key={item} className="border border-gold/[0.24] bg-gold/[0.06] px-3 py-2 text-xs font-bold uppercase tracking-[0.13em] text-gold">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-7xl overflow-hidden border border-ink bg-ink px-6 py-16 text-center text-paper shadow-premium md:px-12 md:py-24"
        >
          <div className="absolute inset-0 terminal-grid opacity-25" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-4xl text-balance font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-7xl">
              {copy.finalTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-paper/[0.72]">{copy.finalText}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
              >
                {copy.freeCta}
              </a>
              <a
                href="/sinais"
                className="premium-button-ghost border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5"
              >
                {copy.eliteCta}
              </a>
            </div>
          </div>
        </motion.div>
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
