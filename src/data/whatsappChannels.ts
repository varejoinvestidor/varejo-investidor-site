export type WhatsAppLandingLocale =
  | "pt"
  | "pt-pt"
  | "en"
  | "es"
  | "hi"
  | "fa"
  | "ar"
  | "tr"
  | "ja"
  | "fr"
  | "de"
  | "it"
  | "ru"
  | "id"
  | "pl"
  | "tl"
  | "ko"
  | "vi"
  | "th"
  | "bn"
  | "zh"
  | "ur";

export type WhatsAppChannelLevel = "formiga" | "lobo";

export const whatsappLandingLocales: Array<{
  locale: WhatsAppLandingLocale;
  label: string;
  short: string;
  rtl?: boolean;
}> = [
  { locale: "pt", label: "Português", short: "PT" },
  { locale: "pt-pt", label: "Português de Portugal", short: "PT-PT" },
  { locale: "en", label: "English", short: "EN" },
  { locale: "es", label: "Español", short: "ES" },
  { locale: "hi", label: "हिन्दी", short: "HI" },
  { locale: "fa", label: "فارسی", short: "FA", rtl: true },
  { locale: "ar", label: "العربية", short: "AR", rtl: true },
  { locale: "tr", label: "Türkçe", short: "TR" },
  { locale: "ja", label: "日本語", short: "JA" },
  { locale: "fr", label: "Français", short: "FR" },
  { locale: "de", label: "Deutsch", short: "DE" },
  { locale: "it", label: "Italiano", short: "IT" },
  { locale: "ru", label: "Русский", short: "RU" },
  { locale: "id", label: "Bahasa Indonesia", short: "ID" },
  { locale: "pl", label: "Polski", short: "PL" },
  { locale: "tl", label: "Filipino", short: "FIL" },
  { locale: "ko", label: "한국어", short: "KO" },
  { locale: "vi", label: "Tiếng Việt", short: "VI" },
  { locale: "th", label: "ไทย", short: "TH" },
  { locale: "bn", label: "বাংলা", short: "BN" },
  { locale: "zh", label: "中文", short: "ZH" },
  { locale: "ur", label: "اردو", short: "UR", rtl: true },
];

export const whatsappChannels: Partial<Record<WhatsAppLandingLocale, Record<WhatsAppChannelLevel, string>>> = {
  pt: {
    formiga: "https://whatsapp.com/channel/0029Va9J7SAAO7R8cN76Ib13",
    lobo: "https://whatsapp.com/channel/0029VasGTTE6RGJD46g47c1h",
  },
  en: {
    formiga: "https://whatsapp.com/channel/0029VbBtwwfCXC3HTPFmzo0q",
    lobo: "https://whatsapp.com/channel/0029Vb8JDbELo4hcxcQaOG2Z",
  },
  es: {
    formiga: "https://whatsapp.com/channel/0029Vb7ZJmPDeONG2GlkRb2Z",
    lobo: "https://whatsapp.com/channel/0029Vb8ABgV2f3ENyWZSrS13",
  },
  hi: {
    formiga: "https://whatsapp.com/channel/0029VbC65sEBKfi7t9fvy91L",
    lobo: "https://whatsapp.com/channel/0029VbD2fh85Ejy28n79Fe3f",
  },
  fa: {
    formiga: "https://whatsapp.com/channel/0029Vb8TMuBKGGG9v5mtfg1H",
    lobo: "https://whatsapp.com/channel/0029VbCwhq4LY6cyIiRGJF3S",
  },
  ar: {
    formiga: "https://whatsapp.com/channel/0029VbCvKci7IUYSbfKjGz0b",
    lobo: "https://whatsapp.com/channel/0029VbCvKci7IUYSbfKjGz0b",
  },
  tr: {
    formiga: "https://whatsapp.com/channel/0029VbDQWKCFsn0WOGEqUz2T",
    lobo: "https://whatsapp.com/channel/0029Vb8E6JsHLHQhWfsDAQ1b",
  },
  ja: {
    formiga: "https://whatsapp.com/channel/0029VbDXe3WB4hdOjfEDp531",
    lobo: "https://whatsapp.com/channel/0029VbDAArmGZNCkTLZbMk0q",
  },
};

export const whatsappLandingCopy: Record<
  WhatsAppLandingLocale,
  {
    title: string;
    subtitle: string;
    languageLabel: string;
    preparedTitle: string;
    preparedText: string;
    formiga: {
      title: string;
      description: string;
      button: string;
      unavailable: string;
    };
    lobo: {
      title: string;
      description: string;
      button: string;
      unavailable: string;
    };
  }
> = {
  pt: {
    title: "Entre para o nosso canal oficial no WhatsApp",
    subtitle: "Escolha o seu nível e faça parte da comunidade Varejo Investidor.",
    languageLabel: "Idioma",
    preparedTitle: "Canais em preparação",
    preparedText: "Os canais oficiais neste idioma estão sendo preparados. Assim que estiverem disponíveis, os links serão adicionados aqui.",
    formiga: {
      title: "Formiga",
      description: "A porta de entrada para construir base, disciplina financeira e compreensão dos mercados com clareza.",
      button: "ENTRAR NO CANAL FORMIGA",
      unavailable: "Canal Formiga em preparação",
    },
    lobo: {
      title: "Lobo",
      description: "Um nível para evoluir visão de mercado, estratégia, análise e tomada de decisão como investidor.",
      button: "ENTRAR NO CANAL LOBO",
      unavailable: "Canal Lobo em preparação",
    },
  },
  "pt-pt": {
    title: "Entre no nosso canal oficial no WhatsApp",
    subtitle: "Escolha o seu nível e faça parte da comunidade Varejo Investidor.",
    languageLabel: "Idioma",
    preparedTitle: "Canais em preparação",
    preparedText: "Os canais oficiais para este idioma estão a ser preparados. Quando estiverem disponíveis, os links serão adicionados aqui.",
    formiga: {
      title: "Formiga",
      description: "A porta de entrada para construir base, disciplina financeira e compreensão dos mercados com clareza.",
      button: "ENTRAR NO CANAL FORMIGA",
      unavailable: "Canal Formiga em preparação",
    },
    lobo: {
      title: "Lobo",
      description: "Um nível para desenvolver leitura de mercado, estratégia, análise e evolução como investidor.",
      button: "ENTRAR NO CANAL LOBO",
      unavailable: "Canal Lobo em preparação",
    },
  },
  en: {
    title: "Join our official WhatsApp channel",
    subtitle: "Choose your level and become part of the Varejo Investidor community.",
    languageLabel: "Language",
    preparedTitle: "Channels in preparation",
    preparedText: "Official channels in this language are being prepared. Once available, their links will appear here.",
    formiga: {
      title: "Ant",
      description: "The starting point for building financial discipline, investor foundations, and market understanding.",
      button: "JOIN THE ANT CHANNEL",
      unavailable: "Ant channel in preparation",
    },
    lobo: {
      title: "Wolf",
      description: "A level for developing market vision, strategy, analysis, and a more structured investor journey.",
      button: "JOIN THE WOLF CHANNEL",
      unavailable: "Wolf channel in preparation",
    },
  },
  es: {
    title: "Únete a nuestro canal oficial de WhatsApp",
    subtitle: "Elige tu nivel y forma parte de la comunidad Varejo Investidor.",
    languageLabel: "Idioma",
    preparedTitle: "Canales en preparación",
    preparedText: "Los canales oficiales en este idioma están siendo preparados. Cuando estén disponibles, los enlaces aparecerán aquí.",
    formiga: {
      title: "Hormiga",
      description: "La puerta de entrada para construir base financiera, disciplina y comprensión clara de los mercados.",
      button: "ENTRAR AL CANAL HORMIGA",
      unavailable: "Canal Hormiga en preparación",
    },
    lobo: {
      title: "Lobo",
      description: "Un nivel para desarrollar visión de mercado, estrategia, análisis y evolución como inversor.",
      button: "ENTRAR AL CANAL LOBO",
      unavailable: "Canal Lobo en preparación",
    },
  },
  hi: {
    title: "हमारे आधिकारिक WhatsApp चैनल से जुड़ें",
    subtitle: "अपना स्तर चुनें और Varejo Investidor समुदाय का हिस्सा बनें।",
    languageLabel: "भाषा",
    preparedTitle: "चैनल तैयार किए जा रहे हैं",
    preparedText: "इस भाषा के आधिकारिक चैनल तैयार किए जा रहे हैं। उपलब्ध होते ही लिंक यहाँ जोड़े जाएंगे।",
    formiga: {
      title: "चींटी",
      description: "वित्तीय आधार, अनुशासन और बाजारों की स्पष्ट समझ बनाने की शुरुआती जगह।",
      button: "चींटी चैनल में शामिल हों",
      unavailable: "चींटी चैनल तैयार हो रहा है",
    },
    lobo: {
      title: "भेड़िया",
      description: "बाजार दृष्टि, रणनीति, विश्लेषण और निवेशक के रूप में विकास के लिए अगला स्तर।",
      button: "भेड़िया चैनल में शामिल हों",
      unavailable: "भेड़िया चैनल तैयार हो रहा है",
    },
  },
  fa: {
    title: "به کانال رسمی واتساپ ما بپیوندید",
    subtitle: "سطح خود را انتخاب کنید و وارد جامعه Varejo Investidor شوید.",
    languageLabel: "زبان",
    preparedTitle: "کانال‌ها در حال آماده‌سازی هستند",
    preparedText: "کانال‌های رسمی این زبان در حال آماده‌سازی هستند. پس از آماده شدن، لینک‌ها در همین صفحه قرار می‌گیرند.",
    formiga: {
      title: "مورچه",
      description: "نقطه شروع برای ساخت پایه مالی، انضباط و درک روشن از بازارها.",
      button: "ورود به کانال مورچه",
      unavailable: "کانال مورچه در حال آماده‌سازی است",
    },
    lobo: {
      title: "گرگ",
      description: "سطحی برای رشد دید بازار، استراتژی، تحلیل و تکامل مسیر سرمایه‌گذاری.",
      button: "ورود به کانال گرگ",
      unavailable: "کانال گرگ در حال آماده‌سازی است",
    },
  },
  ar: {
    title: "انضم إلى قناتنا الرسمية على واتساب",
    subtitle: "اختر مستواك وكن جزءًا من مجتمع Varejo Investidor.",
    languageLabel: "اللغة",
    preparedTitle: "القنوات قيد الإعداد",
    preparedText: "القنوات الرسمية بهذه اللغة قيد الإعداد. عند توفرها ستتم إضافة الروابط هنا.",
    formiga: {
      title: "النملة",
      description: "بوابة البداية لبناء الأساس المالي والانضباط وفهم الأسواق بوضوح.",
      button: "الدخول إلى قناة النملة",
      unavailable: "قناة النملة قيد الإعداد",
    },
    lobo: {
      title: "الذئب",
      description: "مستوى لتطوير قراءة السوق والاستراتيجية والتحليل والتقدم في رحلة المستثمر.",
      button: "الدخول إلى قناة الذئب",
      unavailable: "قناة الذئب قيد الإعداد",
    },
  },
  tr: {
    title: "Resmi WhatsApp kanalımıza katılın",
    subtitle: "Seviyenizi seçin ve Varejo Investidor topluluğuna dahil olun.",
    languageLabel: "Dil",
    preparedTitle: "Kanallar hazırlanıyor",
    preparedText: "Bu dildeki resmi kanallar hazırlanıyor. Hazır olduğunda bağlantılar burada yer alacak.",
    formiga: {
      title: "Karınca",
      description: "Finansal temel, disiplin ve piyasaları net biçimde anlamak için başlangıç noktası.",
      button: "KARINCA KANALINA KATIL",
      unavailable: "Karınca kanalı hazırlanıyor",
    },
    lobo: {
      title: "Kurt",
      description: "Piyasa vizyonu, strateji, analiz ve yatırımcı yolculuğunda gelişim için seviye.",
      button: "KURT KANALINA KATIL",
      unavailable: "Kurt kanalı hazırlanıyor",
    },
  },
  ja: {
    title: "公式WhatsAppチャンネルに参加する",
    subtitle: "あなたのレベルを選び、Varejo Investidorコミュニティに参加しましょう。",
    languageLabel: "言語",
    preparedTitle: "チャンネル準備中",
    preparedText: "この言語の公式チャンネルは準備中です。利用可能になり次第、リンクを追加します。",
    formiga: {
      title: "アリ",
      description: "金融の基礎、規律、市場理解を育てるための入り口です。",
      button: "アリチャンネルに参加",
      unavailable: "アリチャンネル準備中",
    },
    lobo: {
      title: "オオカミ",
      description: "市場を見る力、戦略、分析力を高め、投資家として成長するためのレベルです。",
      button: "オオカミチャンネルに参加",
      unavailable: "オオカミチャンネル準備中",
    },
  },
  fr: {
    title: "Rejoignez notre canal WhatsApp officiel",
    subtitle: "Choisissez votre niveau et rejoignez la communauté Varejo Investidor.",
    languageLabel: "Langue",
    preparedTitle: "Canaux en préparation",
    preparedText: "Les canaux officiels dans cette langue sont en préparation. Les liens seront ajoutés ici dès qu’ils seront disponibles.",
    formiga: { title: "Fourmi", description: "Le point d’entrée pour bâtir des bases financières solides, de la discipline et une meilleure lecture des marchés.", button: "REJOINDRE LE CANAL FOURMI", unavailable: "Canal Fourmi en préparation" },
    lobo: { title: "Loup", description: "Un niveau pour développer vision de marché, stratégie, analyse et progression d’investisseur.", button: "REJOINDRE LE CANAL LOUP", unavailable: "Canal Loup en préparation" },
  },
  de: {
    title: "Treten Sie unserem offiziellen WhatsApp-Kanal bei",
    subtitle: "Wählen Sie Ihr Niveau und werden Sie Teil der Varejo Investidor Community.",
    languageLabel: "Sprache",
    preparedTitle: "Kanäle in Vorbereitung",
    preparedText: "Die offiziellen Kanäle in dieser Sprache werden vorbereitet. Sobald sie verfügbar sind, erscheinen die Links hier.",
    formiga: { title: "Ameise", description: "Der Einstieg, um finanzielle Grundlagen, Disziplin und ein klares Marktverständnis aufzubauen.", button: "AMEISEN-KANAL BEITRETEN", unavailable: "Ameisen-Kanal in Vorbereitung" },
    lobo: { title: "Wolf", description: "Eine Stufe für Marktverständnis, Strategie, Analyse und die weitere Entwicklung als Investor.", button: "WOLF-KANAL BEITRETEN", unavailable: "Wolf-Kanal in Vorbereitung" },
  },
  it: {
    title: "Entra nel nostro canale WhatsApp ufficiale",
    subtitle: "Scegli il tuo livello ed entra nella community Varejo Investidor.",
    languageLabel: "Lingua",
    preparedTitle: "Canali in preparazione",
    preparedText: "I canali ufficiali in questa lingua sono in preparazione. I link saranno aggiunti qui appena disponibili.",
    formiga: { title: "Formica", description: "Il punto di ingresso per costruire basi finanziarie, disciplina e comprensione dei mercati.", button: "ENTRA NEL CANALE FORMICA", unavailable: "Canale Formica in preparazione" },
    lobo: { title: "Lupo", description: "Un livello per sviluppare visione di mercato, strategia, analisi ed evoluzione come investitore.", button: "ENTRA NEL CANALE LUPO", unavailable: "Canale Lupo in preparazione" },
  },
  ru: {
    title: "Присоединяйтесь к нашему официальному каналу WhatsApp",
    subtitle: "Выберите свой уровень и станьте частью сообщества Varejo Investidor.",
    languageLabel: "Язык",
    preparedTitle: "Каналы готовятся",
    preparedText: "Официальные каналы на этом языке находятся в подготовке. Ссылки появятся здесь после запуска.",
    formiga: { title: "Муравей", description: "Стартовый уровень для финансовой базы, дисциплины и ясного понимания рынков.", button: "ВОЙТИ В КАНАЛ МУРАВЕЙ", unavailable: "Канал Муравей в подготовке" },
    lobo: { title: "Волк", description: "Уровень для развития рыночного взгляда, стратегии, анализа и роста инвестора.", button: "ВОЙТИ В КАНАЛ ВОЛК", unavailable: "Канал Волк в подготовке" },
  },
  id: {
    title: "Masuk ke kanal WhatsApp resmi kami",
    subtitle: "Pilih level Anda dan bergabung dengan komunitas Varejo Investidor.",
    languageLabel: "Bahasa",
    preparedTitle: "Kanal sedang disiapkan",
    preparedText: "Kanal resmi dalam bahasa ini sedang disiapkan. Tautan akan ditambahkan di sini saat tersedia.",
    formiga: { title: "Semut", description: "Pintu masuk untuk membangun fondasi finansial, disiplin, dan pemahaman pasar yang jelas.", button: "MASUK KANAL SEMUT", unavailable: "Kanal Semut sedang disiapkan" },
    lobo: { title: "Serigala", description: "Level untuk mengembangkan pandangan pasar, strategi, analisis, dan perjalanan investor.", button: "MASUK KANAL SERIGALA", unavailable: "Kanal Serigala sedang disiapkan" },
  },
  pl: {
    title: "Dołącz do naszego oficjalnego kanału WhatsApp",
    subtitle: "Wybierz swój poziom i stań się częścią społeczności Varejo Investidor.",
    languageLabel: "Język",
    preparedTitle: "Kanały w przygotowaniu",
    preparedText: "Oficjalne kanały w tym języku są przygotowywane. Linki pojawią się tutaj, gdy będą dostępne.",
    formiga: { title: "Mrówka", description: "Punkt startowy do budowania podstaw finansowych, dyscypliny i zrozumienia rynków.", button: "DOŁĄCZ DO KANAŁU MRÓWKA", unavailable: "Kanał Mrówka w przygotowaniu" },
    lobo: { title: "Wilk", description: "Poziom dla rozwoju spojrzenia na rynek, strategii, analizy i dalszej drogi inwestora.", button: "DOŁĄCZ DO KANAŁU WILK", unavailable: "Kanał Wilk w przygotowaniu" },
  },
  tl: {
    title: "Sumali sa aming opisyal na WhatsApp channel",
    subtitle: "Piliin ang iyong level at maging bahagi ng komunidad ng Varejo Investidor.",
    languageLabel: "Wika",
    preparedTitle: "Inihahanda ang mga channel",
    preparedText: "Inihahanda pa ang opisyal na channel sa wikang ito. Idaragdag dito ang mga link kapag handa na.",
    formiga: { title: "Langgam", description: "Panimulang antas para buuin ang pundasyon sa pera, disiplina, at pag-unawa sa merkado.", button: "SUMALI SA LANGGAM CHANNEL", unavailable: "Inihahanda ang Langgam channel" },
    lobo: { title: "Lobo", description: "Antas para palawakin ang pananaw sa merkado, estratehiya, pagsusuri, at paglago bilang mamumuhunan.", button: "SUMALI SA LOBO CHANNEL", unavailable: "Inihahanda ang Lobo channel" },
  },
  ko: {
    title: "공식 WhatsApp 채널에 참여하세요",
    subtitle: "당신의 레벨을 선택하고 Varejo Investidor 커뮤니티에 함께하세요.",
    languageLabel: "언어",
    preparedTitle: "채널 준비 중",
    preparedText: "이 언어의 공식 채널은 준비 중입니다. 준비되면 링크가 여기에 추가됩니다.",
    formiga: { title: "개미", description: "금융 기초, 규율, 시장 이해를 쌓기 위한 시작 단계입니다.", button: "개미 채널 참여", unavailable: "개미 채널 준비 중" },
    lobo: { title: "늑대", description: "시장 시야, 전략, 분석과 투자자로서의 성장을 위한 단계입니다.", button: "늑대 채널 참여", unavailable: "늑대 채널 준비 중" },
  },
  vi: {
    title: "Tham gia kênh WhatsApp chính thức của chúng tôi",
    subtitle: "Chọn cấp độ của bạn và trở thành một phần của cộng đồng Varejo Investidor.",
    languageLabel: "Ngôn ngữ",
    preparedTitle: "Kênh đang được chuẩn bị",
    preparedText: "Các kênh chính thức bằng ngôn ngữ này đang được chuẩn bị. Liên kết sẽ được thêm tại đây khi sẵn sàng.",
    formiga: { title: "Kiến", description: "Điểm khởi đầu để xây dựng nền tảng tài chính, kỷ luật và hiểu biết rõ hơn về thị trường.", button: "VÀO KÊNH KIẾN", unavailable: "Kênh Kiến đang được chuẩn bị" },
    lobo: { title: "Sói", description: "Cấp độ để phát triển góc nhìn thị trường, chiến lược, phân tích và hành trình nhà đầu tư.", button: "VÀO KÊNH SÓI", unavailable: "Kênh Sói đang được chuẩn bị" },
  },
  th: {
    title: "เข้าร่วมช่อง WhatsApp อย่างเป็นทางการของเรา",
    subtitle: "เลือกระดับของคุณและเป็นส่วนหนึ่งของชุมชน Varejo Investidor",
    languageLabel: "ภาษา",
    preparedTitle: "ช่องกำลังอยู่ระหว่างเตรียมการ",
    preparedText: "ช่องทางการในภาษานี้กำลังเตรียมอยู่ เมื่อลิงก์พร้อมแล้วจะถูกเพิ่มไว้ที่นี่",
    formiga: { title: "มด", description: "จุดเริ่มต้นสำหรับสร้างพื้นฐานทางการเงิน วินัย และความเข้าใจตลาดอย่างชัดเจน", button: "เข้าช่องมด", unavailable: "ช่องมดกำลังเตรียมการ" },
    lobo: { title: "หมาป่า", description: "ระดับสำหรับพัฒนามุมมองตลาด กลยุทธ์ การวิเคราะห์ และการเติบโตของนักลงทุน", button: "เข้าช่องหมาป่า", unavailable: "ช่องหมาป่ากำลังเตรียมการ" },
  },
  bn: {
    title: "আমাদের অফিসিয়াল WhatsApp চ্যানেলে যোগ দিন",
    subtitle: "আপনার স্তর বেছে নিন এবং Varejo Investidor কমিউনিটির অংশ হোন।",
    languageLabel: "ভাষা",
    preparedTitle: "চ্যানেল প্রস্তুত হচ্ছে",
    preparedText: "এই ভাষার অফিসিয়াল চ্যানেল প্রস্তুত হচ্ছে। চালু হলে লিংক এখানে যোগ করা হবে।",
    formiga: { title: "পিঁপড়া", description: "আর্থিক ভিত্তি, শৃঙ্খলা এবং বাজার বোঝার জন্য শুরু করার স্তর।", button: "পিঁপড়া চ্যানেলে যোগ দিন", unavailable: "পিঁপড়া চ্যানেল প্রস্তুত হচ্ছে" },
    lobo: { title: "নেকড়ে", description: "বাজার দৃষ্টিভঙ্গি, কৌশল, বিশ্লেষণ এবং বিনিয়োগকারী হিসেবে উন্নতির স্তর।", button: "নেকড়ে চ্যানেলে যোগ দিন", unavailable: "নেকড়ে চ্যানেল প্রস্তুত হচ্ছে" },
  },
  zh: {
    title: "加入我们的官方 WhatsApp 频道",
    subtitle: "选择你的等级，加入 Varejo Investidor 社区。",
    languageLabel: "语言",
    preparedTitle: "频道正在准备中",
    preparedText: "该语言的官方频道正在准备中。可用后，链接会显示在这里。",
    formiga: { title: "蚂蚁", description: "建立金融基础、纪律和市场理解的入门阶段。", button: "加入蚂蚁频道", unavailable: "蚂蚁频道准备中" },
    lobo: { title: "狼", description: "提升市场视野、策略、分析能力和投资者成长的阶段。", button: "加入狼频道", unavailable: "狼频道准备中" },
  },
  ur: {
    title: "ہمارے سرکاری WhatsApp چینل میں شامل ہوں",
    subtitle: "اپنا لیول منتخب کریں اور Varejo Investidor کمیونٹی کا حصہ بنیں۔",
    languageLabel: "زبان",
    preparedTitle: "چینلز تیار کیے جا رہے ہیں",
    preparedText: "اس زبان کے سرکاری چینلز تیار کیے جا رہے ہیں۔ دستیاب ہوتے ہی لنکس یہاں شامل کیے جائیں گے۔",
    formiga: { title: "چیونٹی", description: "مالی بنیاد، نظم و ضبط اور مارکیٹ کی واضح سمجھ بنانے کا ابتدائی مرحلہ۔", button: "چیونٹی چینل میں شامل ہوں", unavailable: "چیونٹی چینل تیار ہو رہا ہے" },
    lobo: { title: "بھیڑیا", description: "مارکیٹ ویژن، حکمت عملی، تجزیہ اور سرمایہ کار کے سفر میں ترقی کا مرحلہ۔", button: "بھیڑیا چینل میں شامل ہوں", unavailable: "بھیڑیا چینل تیار ہو رہا ہے" },
  },
};

export function hasWhatsAppChannels(locale: WhatsAppLandingLocale) {
  return Boolean(whatsappChannels[locale]?.formiga && whatsappChannels[locale]?.lobo);
}
