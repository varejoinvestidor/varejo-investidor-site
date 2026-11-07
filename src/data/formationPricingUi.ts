import type { Locale } from "../i18n";
import type { SupportedLocale } from "../i18n/locales";

export type FormationPricingUi = {
  eyebrow: string;
  title: string;
  intro: string;
  area1: string;
  area1Text: string;
  area2: string;
  area2Text: string;
  area3: string;
  levelsCount: string;
  buyLevel: string;
  buyPackage: string;
  buyComplete: string;
  checkoutSoon: string;
  promoLabel: string;
  referenceLabel: string;
  savings: string;
  discount: string;
  individual: string;
  completeDetail: string;
  completeBullets: string[];
};

const pt: FormationPricingUi = {
  eyebrow: "Formação Varejo Investidor",
  title: "INVESTIMENTO NA SUA JORNADA",
  intro: "Escolha um nível, o personagem completo ou a formação integral com Formiga, Lobo e Harpia.",
  area1: "Área 1 · Cursos individuais",
  area1Text: "Compre apenas o nível que você precisa agora e evolua no seu ritmo.",
  area2: "Área 2 · Pacotes completos",
  area2Text: "Adquira os cinco níveis de cada personagem com economia em relação à compra individual.",
  area3: "Área 3 · Formação completa",
  levelsCount: "5 níveis",
  buyLevel: "Comprar nível",
  buyPackage: "Adquirir pacote",
  buyComplete: "Adquirir formação completa",
  checkoutSoon: "Checkout em breve",
  promoLabel: "Preço promocional",
  referenceLabel: "Preço de referência",
  savings: "Economia de",
  discount: "Desconto aproximado",
  individual: "Individual",
  completeDetail: "15 níveis · 5 Formiga + 5 Lobo + 5 Harpia",
  completeBullets: ["✦ 5 níveis Formiga", "✦ 5 níveis Lobo", "✦ 5 níveis Harpia", "✦ 15 níveis de formação contínua"],
};

const en: FormationPricingUi = {
  eyebrow: "Varejo Investidor Formation",
  title: "INVEST IN YOUR JOURNEY",
  intro: "Choose a single level, a full character track, or the complete Formiga, Wolf, and Harpy formation.",
  area1: "Area 1 · Individual courses",
  area1Text: "Buy only the level you need now and evolve at your own pace.",
  area2: "Area 2 · Full character packages",
  area2Text: "Get all five levels of a character with savings versus buying individually.",
  area3: "Area 3 · Complete formation",
  levelsCount: "5 levels",
  buyLevel: "Buy level",
  buyPackage: "Get package",
  buyComplete: "Get complete formation",
  checkoutSoon: "Checkout coming soon",
  promoLabel: "Promotional price",
  referenceLabel: "Reference price",
  savings: "Savings of",
  discount: "Approximate discount",
  individual: "Individual",
  completeDetail: "15 levels · 5 Formiga + 5 Lobo + 5 Harpy",
  completeBullets: ["✦ 5 Formiga levels", "✦ 5 Lobo levels", "✦ 5 Harpy levels", "✦ 15 levels of continuous formation"],
};

const es: FormationPricingUi = {
  ...en,
  eyebrow: "Formación Varejo Investidor",
  title: "INVERSIÓN EN TU RECORRIDO",
  intro: "Elige un nivel, el personaje completo o la formación integral con Formiga, Lobo y Harpia.",
  area1: "Área 1 · Cursos individuales",
  area1Text: "Compra solo el nivel que necesitas ahora y evoluciona a tu ritmo.",
  area2: "Área 2 · Paquetes completos",
  area2Text: "Adquiere los cinco niveles de cada personaje con ahorro frente a la compra individual.",
  area3: "Área 3 · Formación completa",
  buyLevel: "Comprar nivel",
  buyPackage: "Adquirir paquete",
  buyComplete: "Adquirir formación completa",
  checkoutSoon: "Checkout próximamente",
  promoLabel: "Precio promocional",
  referenceLabel: "Precio de referencia",
  savings: "Ahorro de",
  discount: "Descuento aproximado",
  completeBullets: ["✦ 5 niveles Formiga", "✦ 5 niveles Lobo", "✦ 5 niveles Harpia", "✦ 15 niveles de formación continua"],
};

const packs: Partial<Record<SupportedLocale, FormationPricingUi>> = {
  pt,
  en,
  es,
  fr: { ...en, eyebrow: "Formation Varejo Investidor", title: "INVESTIR DANS VOTRE PARCOURS", intro: "Choisissez un niveau, un personnage complet ou la formation intégrale Formiga, Loup et Harpie.", area1: "Zone 1 · Cours individuels", area1Text: "Achetez uniquement le niveau dont vous avez besoin maintenant.", area2: "Zone 2 · Packs complets", area2Text: "Obtenez les cinq niveaux d'un personnage avec une économie sur l'achat unitaire.", area3: "Zone 3 · Formation complète", buyLevel: "Acheter le niveau", buyPackage: "Obtenir le pack", buyComplete: "Obtenir la formation complète", checkoutSoon: "Paiement bientôt disponible" },
  de: { ...en, eyebrow: "Varejo Investidor Ausbildung", title: "INVESTIEREN SIE IN IHRE REISE", intro: "Wählen Sie eine Stufe, einen vollständigen Charakter oder die komplette Formiga-, Wolf- und Harpy-Ausbildung.", area1: "Bereich 1 · Einzelkurse", buyLevel: "Stufe kaufen", buyPackage: "Paket erwerben", buyComplete: "Komplette Ausbildung erwerben", checkoutSoon: "Checkout in Kürze" },
  it: { ...en, eyebrow: "Formazione Varejo Investidor", title: "INVESTI NEL TUO PERCORSO", intro: "Scegli un livello, il personaggio completo o la formazione integrale Formiga, Lupo e Harpia.", area1: "Area 1 · Corsi singoli", buyLevel: "Acquista livello", buyPackage: "Acquista pacchetto", buyComplete: "Acquista formazione completa", checkoutSoon: "Checkout in arrivo" },
  ar: { ...en, eyebrow: "تكوين Varejo Investidor", title: "استثمر في رحلتك", intro: "اختر مستوى واحدًا أو الشخصية كاملة أو التكوين المتكامل Formiga وLobo وHarpia.", buyLevel: "شراء المستوى", buyPackage: "شراء الحزمة", buyComplete: "شراء التكوين الكامل", checkoutSoon: "الدفع قريبًا", levelsCount: "5 مستويات" },
  fa: { ...en, eyebrow: "آموزش Varejo Investidor", title: "در مسیر خود سرمایه‌گذاری کنید", buyLevel: "خرید سطح", buyPackage: "خرید بسته", buyComplete: "خرید آموزش کامل", checkoutSoon: "پرداخت به‌زودی" },
  tr: { ...en, eyebrow: "Varejo Investidor Eğitimi", title: "YOLCULUĞUNUZA YATIRIM YAPIN", intro: "Tek bir seviye, tam karakter paketi veya Formiga, Kurt ve Harpia tam eğitimini seçin.", buyLevel: "Seviye satın al", buyPackage: "Paketi al", buyComplete: "Tam eğitimi al", checkoutSoon: "Ödeme yakında" },
  ru: { ...en, eyebrow: "Обучение Varejo Investidor", title: "ИНВЕСТИРУЙТЕ В СВОЙ ПУТЬ", buyLevel: "Купить уровень", buyPackage: "Купить пакет", buyComplete: "Купить полное обучение", checkoutSoon: "Оплата скоро" },
  hi: { ...en, buyLevel: "स्तर खरीदें", buyPackage: "पैकेज लें", buyComplete: "पूर्ण प्रशिक्षण लें", checkoutSoon: "चेकआउट जल्द" },
  ur: { ...en, buyLevel: "لیول خریدیں", buyPackage: "پیکج حاصل کریں", buyComplete: "مکمل تربیت حاصل کریں", checkoutSoon: "چیک آؤٹ جلد" },
  bn: { ...en, buyLevel: "লেভেল কিনুন", buyPackage: "প্যাকেজ নিন", buyComplete: "সম্পূর্ণ গঠন নিন", checkoutSoon: "চেকআউট শীঘ্রই" },
  id: { ...en, buyLevel: "Beli level", buyPackage: "Beli paket", buyComplete: "Beli formasi lengkap", checkoutSoon: "Checkout segera" },
  vi: { ...en, buyLevel: "Mua cấp độ", buyPackage: "Mua gói", buyComplete: "Mua khóa đào tạo đầy đủ", checkoutSoon: "Thanh toán sắp có" },
  th: { ...en, buyLevel: "ซื้อระดับ", buyPackage: "ซื้อแพ็กเกจ", buyComplete: "ซื้อหลักสูตรครบ", checkoutSoon: "ชำระเงินเร็วๆ นี้" },
  tl: { ...en, buyLevel: "Bumili ng level", buyPackage: "Kunin ang package", buyComplete: "Kunin ang buong formation", checkoutSoon: "Checkout malapit na" },
  zh: { ...en, eyebrow: "Varejo Investidor 教育体系", title: "投资你的成长路径", buyLevel: "购买级别", buyPackage: "购买套装", buyComplete: "购买完整课程", checkoutSoon: "支付即将开放" },
  ja: { ...en, eyebrow: "Varejo Investidor 教育", title: "あなたの旅に投資する", buyLevel: "レベルを購入", buyPackage: "パッケージを購入", buyComplete: "完全コースを購入", checkoutSoon: "決済は近日公開" },
  ko: { ...en, eyebrow: "Varejo Investidor 교육", title: "당신의 여정에 투자하세요", buyLevel: "레벨 구매", buyPackage: "패키지 구매", buyComplete: "전체 과정 구매", checkoutSoon: "결제 곧 제공" },
  pl: { ...en, eyebrow: "Formacja Varejo Investidor", title: "ZAINWESTUJ W SWOJĄ ŚCIEŻKĘ", buyLevel: "Kup poziom", buyPackage: "Kup pakiet", buyComplete: "Kup pełną formację", checkoutSoon: "Płatność wkrótce" },
  he: {
    ...en,
    eyebrow: "הכשרת Varejo Investidor",
    title: "השקיעו במסע שלכם",
    intro: "בחרו רמה בודדת, דמות מלאה או הכשרה שלמה עם Formiga, Lobo ו-Harpia.",
    area1: "אזור 1 · קורסים בודדים",
    area1Text: "קנו רק את הרמה שאתם צריכים עכשיו והתקדמו בקצב שלכם.",
    area2: "אזור 2 · חבילות מלאות",
    area2Text: "רכשו חמש רמות של דמות עם חיסכון לעומת רכישה נפרדת.",
    area3: "אזור 3 · הכשרה מלאה",
    buyLevel: "רכישת רמה",
    buyPackage: "רכישת חבילה",
    buyComplete: "רכישת הכשרה מלאה",
    checkoutSoon: "תשלום בקרוב",
    promoLabel: "מחיר מבצע",
    referenceLabel: "מחיר ייחוס",
    savings: "חיסכון של",
    discount: "הנחה משוערת",
    individual: "בנפרד",
    completeBullets: ["✦ 5 רמות Formiga", "✦ 5 רמות Lobo", "✦ 5 רמות Harpia", "✦ 15 רמות הכשרה מתמשכת"],
  },
};

export function getFormationPricingUi(locale: Locale): FormationPricingUi {
  const key = locale as SupportedLocale;
  return packs[key] ?? packs.en ?? en;
}
