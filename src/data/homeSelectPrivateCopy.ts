import type { SupportedLocale } from "../i18n/locales";

export type HomeSelectCardCopy = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  cards: Array<{ label: string; value?: string }>;
};

export type HomePrivateCardCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  text: string;
  cta: string;
  cards: Array<{ label: string; value?: string }>;
};

function mkSelect(
  text: string,
  cta: string,
  labels: { min: string; intl: string; forex: string; stocks: string; crypto: string },
  title = "Varejo Investidor Select",
): HomeSelectCardCopy {
  return {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title,
    text,
    cta,
    cards: [
      { label: labels.min, value: "R$ 250.000" },
      { label: labels.intl, value: "US$ 50.000" },
      { label: labels.forex },
      { label: labels.stocks },
      { label: labels.crypto },
    ],
  };
}

function mkPrivate(
  subtitle: string,
  text: string,
  cta: string,
  cards: HomePrivateCardCopy["cards"],
  title = "Varejo Investidor Private",
): HomePrivateCardCopy {
  return {
    eyebrow: "VAREJO INVESTIDOR PRIVATE",
    title,
    subtitle,
    text,
    cta,
    cards,
  };
}

export const homeSelectCopyByLocale: Record<SupportedLocale, HomeSelectCardCopy> = {
  pt: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "Patrimônio em construção exige estratégia.",
    text: "O Select foi desenvolvido para investidores que já possuem patrimônio relevante e desejam uma estrutura organizada para exposição global, proteção cambial e crescimento de longo prazo.",
    cta: "CONHECER SELECT",
    cards: [
      { label: "Patrimônio mínimo", value: "US$ 50.000" },
      { label: "Mercado global" },
      { label: "Alocação em dólar" },
      { label: "Relatórios periódicos" },
      { label: "Controle do cliente" },
    ],
  },
  en: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "Wealth in progress requires strategy.",
    text: "Select was built for investors who already hold relevant capital and want an organized structure for global exposure, currency protection, and long-term growth.",
    cta: "EXPLORE SELECT",
    cards: [
      { label: "Minimum wealth", value: "US$50,000" },
      { label: "Global markets" },
      { label: "Dollar allocation" },
      { label: "Periodic reports" },
      { label: "Client control" },
    ],
  },
  es: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "El patrimonio en construcción exige estrategia.",
    text: "Select fue desarrollado para inversores que ya poseen patrimonio relevante y desean una estructura organizada para exposición global, protección cambiaria y crecimiento de largo plazo.",
    cta: "CONOCER SELECT",
    cards: [
      { label: "Patrimonio mínimo", value: "US$ 50.000" },
      { label: "Mercado global" },
      { label: "Asignación en dólar" },
      { label: "Reportes periódicos" },
      { label: "Control del cliente" },
    ],
  },
  fr: mkSelect(
    "Structure opérationnelle pour investisseurs disposant déjà d’un patrimoine significatif et souhaitant une exposition aux marchés mondiaux sans suivre chaque opération au quotidien.",
    "DÉCOUVRIR SELECT",
    { min: "Investissement minimum", intl: "Investisseur international", forex: "Forex", stocks: "Actions internationales", crypto: "Cryptoactifs" },
  ),
  de: mkSelect(
    "Operative Struktur für Anleger mit relevantem Vermögen, die globale Marktexponierung wünschen, ohne tägliche Trades manuell zu verfolgen.",
    "SELECT ENTDECKEN",
    { min: "Mindestanlage", intl: "Internationaler Anleger", forex: "Forex", stocks: "Internationale Aktien", crypto: "Krypto" },
  ),
  it: mkSelect(
    "Struttura operativa per investitori con patrimonio rilevante che desiderano esposizione ai mercati globali senza seguire le operazioni ogni giorno.",
    "SCOPRI SELECT",
    { min: "Investimento minimo", intl: "Investitore internazionale", forex: "Forex", stocks: "Azioni", crypto: "Criptoattivi" },
  ),
  ar: mkSelect(
    "هيكل تشغيلي للمستثمرين الذين يمتلكون ثروة مهمة ويرغبون في التعرض للأسواق العالمية دون متابعة العمليات يومياً.",
    "تعرّف على Select",
    { min: "الحد الأدنى", intl: "مستثمر دولي", forex: "الفوركس", stocks: "الأسهم", crypto: "الأصول الرقمية" },
  ),
  fa: mkSelect(
    "ساختار عملیاتی برای سرمایه‌گذارانی که دارایی قابل توجه دارند و می‌خواهند بدون پیگیری روزانه معاملات، در بازارهای جهانی قرار بگیرند.",
    "آشنایی با Select",
    { min: "حداقل سرمایه", intl: "سرمایه‌گذار بین‌المللی", forex: "فارکس", stocks: "سهام", crypto: "رمزارزها" },
  ),
  hi: mkSelect(
    "उन निवेशकों के लिए परिचालन संरचना जिनके पास महत्वपूर्ण पूंजी है और जो रोज़ाना ऑपरेशन देखे बिना वैश्विक बाजारों में एक्सपोज़र चाहते हैं।",
    "SELECT देखें",
    { min: "न्यूनतम निवेश", intl: "अंतरराष्ट्रीय निवेशक", forex: "फॉरेक्स", stocks: "शेयर", crypto: "क्रिप्टो" },
  ),
  ur: mkSelect(
    "ایسی آپریشنل ساخت جو ان سرمایہ کاروں کے لیے ہے جن کے پاس قابلِ ذکر سرمایہ ہے اور وہ روزانہ ٹریڈز دیکھے بغیر عالمی منڈیوں تک رسائی چاہتے ہیں۔",
    "SELECT دیکھیں",
    { min: "کم از کم سرمایہ", intl: "بین الاقوامی سرمایہ کار", forex: "فاریکس", stocks: "اسٹاکس", crypto: "کرپٹو" },
  ),
  bn: mkSelect(
    "যাদের ইতিমধ্যে উল্লেখযোগ্য পুঁজি আছে এবং প্রতিদিন অপারেশন না দেখে বৈশ্বিক বাজারে এক্সপোজার চান, তাদের জন্য অপারেশনাল কাঠামো।",
    "SELECT দেখুন",
    { min: "ন্যূনতম বিনিয়োগ", intl: "আন্তর্জাতিক বিনিয়োগকারী", forex: "ফরেক্স", stocks: "শেয়ার", crypto: "ক্রিপ্টো" },
  ),
  tr: mkSelect(
    "Halihazırda anlamlı bir varlığa sahip olan ve işlemleri her gün takip etmeden küresel piyasalara maruz kalmak isteyen yatırımcılar için operasyonel yapı.",
    "SELECT'İ TANIMA",
    { min: "Minimum yatırım", intl: "Uluslararası yatırımcı", forex: "Forex", stocks: "Hisseler", crypto: "Kripto" },
  ),
  ru: mkSelect(
    "Операционная структура для инвесторов с существенным капиталом, которым нужна экспозиция на глобальные рынки без ежедневного отслеживания сделок.",
    "УЗНАТЬ SELECT",
    { min: "Минимальный капитал", intl: "Международный инвестор", forex: "Форекс", stocks: "Акции", crypto: "Криптоактивы" },
  ),
  id: mkSelect(
    "Struktur operasional untuk investor yang sudah memiliki kekayaan signifikan dan ingin eksposur ke pasar global tanpa memantau transaksi setiap hari.",
    "LIHAT SELECT",
    { min: "Alokasi minimum", intl: "Investor internasional", forex: "Forex", stocks: "Saham", crypto: "Kripto" },
  ),
  vi: mkSelect(
    "Cấu trúc vận hành dành cho nhà đầu tư đã có tài sản đáng kể và muốn tiếp cận thị trường toàn cầu mà không cần theo dõi giao dịch hằng ngày.",
    "TÌM HIỂU SELECT",
    { min: "Mức tối thiểu", intl: "Nhà đầu tư quốc tế", forex: "Forex", stocks: "Cổ phiếu", crypto: "Tài sản số" },
  ),
  th: mkSelect(
    "โครงสร้างการดำเนินงานสำหรับนักลงทุนที่มีสินทรัพย์สำคัญแล้ว และต้องการเข้าถึงตลาดโลกโดยไม่ต้องติดตามการเทรดทุกวัน",
    "ดู SELECT",
    { min: "เงินลงทุนขั้นต่ำ", intl: "นักลงทุนต่างประเทศ", forex: "ฟอเร็กซ์", stocks: "หุ้น", crypto: "คริปโต" },
  ),
  tl: mkSelect(
    "Istrukturang operasyonal para sa mga investor na may malaking kapital at gustong magkaroon ng exposure sa global markets nang hindi sinusubaybayan ang trades araw-araw.",
    "TINGNAN ANG SELECT",
    { min: "Minimum na alokasyon", intl: "Internasyonal na investor", forex: "Forex", stocks: "Mga stock", crypto: "Kripto" },
  ),
  zh: mkSelect(
    "面向已有较高资产、希望参与全球市场但不想每天跟踪交易的投资者的运营结构。",
    "了解 SELECT",
    { min: "最低配置", intl: "国际投资者", forex: "外汇", stocks: "股票", crypto: "加密资产" },
  ),
  ja: mkSelect(
    "すでに一定の資産を持ち、日々の取引を追わずに世界市場へのエクスポージャーを得たい投資家向けの運用構造です。",
    "SELECTを見る",
    { min: "最低運用額", intl: "海外投資家", forex: "外国為替", stocks: "株式", crypto: "暗号資産" },
  ),
  ko: mkSelect(
    "이미 의미 있는 자산을 보유하고 있으며 매일 거래를 따라가지 않고 글로벌 시장 노출을 원하는 투자자를 위한 운영 구조입니다.",
    "SELECT 보기",
    { min: "최소 운용금액", intl: "국제 투자자", forex: "외환", stocks: "주식", crypto: "암호화폐" },
  ),
  pl: mkSelect(
    "Struktura operacyjna dla inwestorów z istotnym kapitałem, którzy chcą ekspozycji na rynki globalne bez codziennego śledzenia transakcji.",
    "POZNAJ SELECT",
    { min: "Minimalna alokacja", intl: "Inwestor międzynarodowy", forex: "Forex", stocks: "Akcje", crypto: "Krypto" },
  ),
  he: mkSelect(
    "מבנה תפעולי למשקיעים עם הון משמעותי שרוצים חשיפה לשווקים גלובליים בלי לעקוב אחרי עסקאות מדי יום.",
    "הכירו את Select",
    { min: "הקצאה מינימלית", intl: "משקיע בינלאומי", forex: "מט״ח", stocks: "מניות", crypto: "קריפטו" },
  ),
};

export const homePrivateCopyByLocale: Record<SupportedLocale, HomePrivateCardCopy> = {
  pt: {
    eyebrow: "VAREJO INVESTIDOR PRIVATE",
    title: "Estrutura patrimonial global.",
    subtitle: "Private para investidores acima de US$ 1.000.000.",
    text: "Para investidores, empresários e famílias que buscam proteção, organização, continuidade e posicionamento internacional de patrimônio.",
    cta: "CONHECER PRIVATE",
    cards: [
      { label: "Entrada", value: "US$ 1 milhão+" },
      { label: "Alocação global" },
      { label: "Proteção patrimonial" },
      { label: "Visão internacional" },
      { label: "Relatórios estratégicos" },
      { label: "Controle do cliente" },
    ],
  },
  en: {
    eyebrow: "VAREJO INVESTIDOR PRIVATE",
    title: "Global wealth structure.",
    subtitle: "Private for investors above US$1,000,000.",
    text: "For investors, entrepreneurs, and families seeking protection, organization, continuity, and international wealth positioning.",
    cta: "EXPLORE PRIVATE",
    cards: [
      { label: "Entry", value: "US$1 million+" },
      { label: "Global allocation" },
      { label: "Wealth protection" },
      { label: "International view" },
      { label: "Strategic reports" },
      { label: "Client control" },
    ],
  },
  es: {
    eyebrow: "VAREJO INVESTIDOR PRIVATE",
    title: "Estructura patrimonial global.",
    subtitle: "Private para inversores por encima de US$ 1.000.000.",
    text: "Para inversores, empresarios y familias que buscan protección, organización, continuidad y posicionamiento patrimonial internacional.",
    cta: "CONOCER PRIVATE",
    cards: [
      { label: "Entrada", value: "US$ 1 millón+" },
      { label: "Asignación global" },
      { label: "Protección patrimonial" },
      { label: "Visión internacional" },
      { label: "Reportes estratégicos" },
      { label: "Control del cliente" },
    ],
  },
  fr: mkPrivate(
    "Structure patrimoniale institutionnelle pour investisseurs au-dessus de US$ 1 000 000.",
    "Organisation, protection et expansion mondiale du patrimoine pour investisseurs, familles et entrepreneurs disposant d’un capital international.",
    "DÉCOUVRIR PRIVATE",
    [
      { label: "Seuil d’entrée", value: "US$ 1 000 000+" },
      { label: "Profil", value: "Patrimoine à grande échelle" },
      { label: "Priorité", value: "Protection internationale" },
      { label: "Structure", value: "Institutionnelle" },
    ],
  ),
  de: mkPrivate(
    "Institutionelle Vermögensstruktur für Anleger ab US$ 1.000.000.",
    "Globale Organisation, Schutz und Ausbau von Vermögen für Anleger, Familien und Unternehmer mit internationalem Kapital.",
    "PRIVATE ENTDECKEN",
    [
      { label: "Einstieg", value: "US$ 1.000.000+" },
      { label: "Profil", value: "Großes Vermögen" },
      { label: "Schwerpunkt", value: "Globaler Schutz" },
      { label: "Struktur", value: "Institutionell" },
    ],
  ),
  it: mkPrivate(
    "Struttura patrimoniale istituzionale per investitori sopra US$ 1.000.000.",
    "Organizzazione, protezione ed espansione globale del patrimonio per investitori, famiglie e imprenditori con capitale internazionale.",
    "SCOPRI PRIVATE",
    [
      { label: "Ingresso", value: "US$ 1.000.000+" },
      { label: "Profilo", value: "Patrimonio elevato" },
      { label: "Focus", value: "Protezione globale" },
      { label: "Struttura", value: "Istituzionale" },
    ],
  ),
  ar: mkPrivate(
    "هيكل ثروة مؤسسي للمستثمرين فوق US$1,000,000.",
    "تنظيم وحماية وتوسيع الثروة عالمياً للمستثمرين والعائلات ورواد الأعمال ذوي رأس المال الدولي.",
    "تعرّف على Private",
    [
      { label: "الدخول", value: "US$1,000,000+" },
      { label: "الملف", value: "ثروة كبيرة" },
      { label: "الأولوية", value: "حماية عالمية" },
      { label: "الهيكل", value: "مؤسسي" },
    ],
  ),
  fa: mkPrivate(
    "ساختار ثروت نهادی برای سرمایه‌گذاران بالای US$1,000,000.",
    "سازمان‌دهی، حفاظت و گسترش جهانی دارایی برای سرمایه‌گذاران، خانواده‌ها و کارآفرینان دارای سرمایه بین‌المللی.",
    "آشنایی با Private",
    [
      { label: "ورود", value: "US$1,000,000+" },
      { label: "پروفایل", value: "ثروت در مقیاس بالا" },
      { label: "تمرکز", value: "حفاظت جهانی" },
      { label: "ساختار", value: "نهادی" },
    ],
  ),
  hi: mkPrivate(
    "US$1,000,000 से अधिक पूंजी वाले निवेशकों के लिए संस्थागत संपत्ति संरचना।",
    "अंतरराष्ट्रीय पूंजी वाले निवेशकों, परिवारों और उद्यमियों के लिए वैश्विक संपत्ति संगठन, सुरक्षा और विस्तार।",
    "PRIVATE देखें",
    [
      { label: "प्रवेश", value: "US$1,000,000+" },
      { label: "प्रोफ़ाइल", value: "बड़ी संपत्ति" },
      { label: "फ़ोकस", value: "वैश्विक सुरक्षा" },
      { label: "संरचना", value: "संस्थागत" },
    ],
  ),
  ur: mkPrivate(
    "US$1,000,000 سے زائد سرمایہ رکھنے والے سرمایہ کاروں کے لیے ادارہ جاتی دولت کی ساخت۔",
    "بین الاقوامی سرمایہ رکھنے والے سرمایہ کاروں، خاندانوں اور کاروباری افراد کے لیے عالمی دولت کی تنظیم، تحفظ اور توسیع۔",
    "PRIVATE دیکھیں",
    [
      { label: "داخلہ", value: "US$1,000,000+" },
      { label: "پروفائل", value: "بڑے پیمانے پر سرمایہ" },
      { label: "توجہ", value: "عالمی تحفظ" },
      { label: "ساخت", value: "ادارہ جاتی" },
    ],
  ),
  bn: mkPrivate(
    "US$1,000,000-এর বেশি মূলধনের বিনিয়োগকারীদের জন্য প্রাতিষ্ঠানিক সম্পদ কাঠামো।",
    "আন্তর্জাতিক মূলধন থাকা বিনিয়োগকারী, পরিবার ও উদ্যোক্তাদের জন্য বৈশ্বিক সম্পদ সংগঠন, সুরক্ষা ও সম্প্রসারণ।",
    "PRIVATE দেখুন",
    [
      { label: "প্রবেশ", value: "US$1,000,000+" },
      { label: "প্রোফাইল", value: "বড় সম্পদ" },
      { label: "ফোকাস", value: "বৈশ্বিক সুরক্ষা" },
      { label: "কাঠামো", value: "প্রাতিষ্ঠানিক" },
    ],
  ),
  tr: mkPrivate(
    "US$1.000.000 üzeri sermayeye sahip yatırımcılar için kurumsal varlık yapısı.",
    "Uluslararası sermayeye sahip yatırımcılar, aileler ve girişimciler için küresel varlık organizasyonu, koruma ve büyüme.",
    "PRIVATE'I TANIMA",
    [
      { label: "Giriş", value: "US$1.000.000+" },
      { label: "Profil", value: "Yüksek ölçekli varlık" },
      { label: "Odak", value: "Küresel koruma" },
      { label: "Yapı", value: "Kurumsal" },
    ],
  ),
  ru: mkPrivate(
    "Институциональная структура капитала для инвесторов свыше US$1,000,000.",
    "Глобальная организация, защита и расширение капитала для инвесторов, семей и предпринимателей с международным капиталом.",
    "УЗНАТЬ PRIVATE",
    [
      { label: "Вход", value: "US$1,000,000+" },
      { label: "Профиль", value: "Крупный капитал" },
      { label: "Фокус", value: "Глобальная защита" },
      { label: "Структура", value: "Институциональная" },
    ],
  ),
  id: mkPrivate(
    "Struktur kekayaan institusional untuk investor di atas US$1.000.000.",
    "Organisasi, perlindungan, dan ekspansi kekayaan global untuk investor, keluarga, dan pengusaha dengan modal internasional.",
    "LIHAT PRIVATE",
    [
      { label: "Masuk", value: "US$1.000.000+" },
      { label: "Profil", value: "Kekayaan skala besar" },
      { label: "Fokus", value: "Proteksi global" },
      { label: "Struktur", value: "Institusional" },
    ],
  ),
  vi: mkPrivate(
    "Cấu trúc tài sản cấp tổ chức cho nhà đầu tư trên US$1,000,000.",
    "Tổ chức, bảo vệ và mở rộng tài sản toàn cầu cho nhà đầu tư, gia đình và doanh nhân có vốn quốc tế.",
    "TÌM HIỂU PRIVATE",
    [
      { label: "Vào cửa", value: "US$1,000,000+" },
      { label: "Hồ sơ", value: "Tài sản quy mô lớn" },
      { label: "Trọng tâm", value: "Bảo vệ toàn cầu" },
      { label: "Cấu trúc", value: "Cấp tổ chức" },
    ],
  ),
  th: mkPrivate(
    "โครงสร้างสินทรัพย์ระดับสถาบันสำหรับนักลงทุนมากกว่า US$1,000,000",
    "การจัดระเบียบ การปกป้อง และการขยายสินทรัพย์ระดับโลกสำหรับนักลงทุน ครอบครัว และผู้ประกอบการที่มีเงินทุนระหว่างประเทศ",
    "ดู PRIVATE",
    [
      { label: "ทางเข้า", value: "US$1,000,000+" },
      { label: "โปรไฟล์", value: "สินทรัพย์ขนาดใหญ่" },
      { label: "โฟกัส", value: "การปกป้องระดับโลก" },
      { label: "โครงสร้าง", value: "ระดับสถาบัน" },
    ],
  ),
  tl: mkPrivate(
    "Istrukturang institusyonal ng yaman para sa mga investor na higit US$1,000,000.",
    "Pandaigdigang organisasyon, proteksyon, at pagpapalawak ng yaman para sa mga investor, pamilya, at negosyanteng may internasyonal na kapital.",
    "TINGNAN ANG PRIVATE",
    [
      { label: "Pasok", value: "US$1,000,000+" },
      { label: "Profile", value: "Malaking yaman" },
      { label: "Pokus", value: "Pandaigdigang proteksyon" },
      { label: "Istruktura", value: "Institusyonal" },
    ],
  ),
  zh: mkPrivate(
    "面向 US$1,000,000 以上投资者的机构级财富结构。",
    "为拥有国际资本的投资者、家族和企业家提供全球财富组织、保护与扩张。",
    "了解 PRIVATE",
    [
      { label: "门槛", value: "US$1,000,000+" },
      { label: "画像", value: "高规模资产" },
      { label: "重点", value: "全球保护" },
      { label: "结构", value: "机构级" },
    ],
  ),
  ja: mkPrivate(
    "US$1,000,000超の投資家向けの機関投資家レベルの資産構造。",
    "国際資本を持つ投資家、ファミリー、起業家のためのグローバルな資産整理、保護、拡大。",
    "PRIVATEを見る",
    [
      { label: "参入", value: "US$1,000,000+" },
      { label: "プロフィール", value: "大規模資産" },
      { label: "焦点", value: "グローバル保護" },
      { label: "構造", value: "機関投資家向け" },
    ],
  ),
  ko: mkPrivate(
    "US$1,000,000 이상의 투자자를 위한 기관 수준 자산 구조.",
    "국제 자본을 보유한 투자자, 가족, 기업가를 위한 글로벌 자산 조직, 보호, 확장.",
    "PRIVATE 보기",
    [
      { label: "진입", value: "US$1,000,000+" },
      { label: "프로필", value: "대규모 자산" },
      { label: "초점", value: "글로벌 보호" },
      { label: "구조", value: "기관 수준" },
    ],
  ),
  pl: mkPrivate(
    "Instytucjonalna struktura majątkowa dla inwestorów powyżej US$1,000,000.",
    "Globalna organizacja, ochrona i rozwój majątku dla inwestorów, rodzin i przedsiębiorców z kapitałem międzynarodowym.",
    "POZNAJ PRIVATE",
    [
      { label: "Wejście", value: "US$1,000,000+" },
      { label: "Profil", value: "Duży majątek" },
      { label: "Priorytet", value: "Ochrona globalna" },
      { label: "Struktura", value: "Instytucjonalna" },
    ],
  ),
  he: mkPrivate(
    "מבנה הון מוסדי למשקיעים מעל US$1,000,000.",
    "ארגון, הגנה והתרחבות גלובלית של הון למשקיעים, משפחות ויזמים עם הון בינלאומי.",
    "הכירו את Private",
    [
      { label: "כניסה", value: "US$1,000,000+" },
      { label: "פרופיל", value: "הון בקנה מידה גבוה" },
      { label: "מיקוד", value: "הגנה גלובלית" },
      { label: "מבנה", value: "מוסדי" },
    ],
  ),
};
