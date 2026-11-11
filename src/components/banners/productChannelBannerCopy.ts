import { isSupportedLocale, type SupportedLocale } from "../../i18n/locales";
import { homePrivateCopyByLocale, homeSelectCopyByLocale } from "../../data/homeSelectPrivateCopy";
import { withoutEmDash } from "./channelBannerText";
import type { ChannelBannerCopy } from "./channelBannerCopy";

const EDUCATION_BASE: Partial<Record<SupportedLocale, ChannelBannerCopy>> = {
  pt: {
    eyebrow: "Base educacional",
    title: "A metodologia começa na educação.",
    subtitle:
      "Formiga, Lobo e Harpia organizam a base educacional do Varejo Investidor para entender risco, ler mercados globais e construir visão patrimonial.",
    cta: "Conhecer Formação",
  },
  en: {
    eyebrow: "Educational base",
    title: "The methodology starts with education.",
    subtitle:
      "Formiga, Lobo, and Harpia organize Varejo Investidor's educational base to understand risk, read global markets, and build a wealth mindset.",
    cta: "View Formation",
  },
  es: {
    eyebrow: "Base educativa",
    title: "La metodología comienza con educación.",
    subtitle:
      "Formiga, Lobo y Harpia organizan la base educativa para entender riesgo, mercados globales y visión patrimonial.",
    cta: "Ver Formación",
  },
  fr: {
    eyebrow: "Base éducative",
    title: "La méthodologie commence par l'éducation.",
    subtitle: "Formiga, Lobo et Harpia structurent la formation pour comprendre le risque et les marchés mondiaux.",
    cta: "Voir la formation",
  },
  de: {
    eyebrow: "Bildungsbasis",
    title: "Die Methodik beginnt mit Bildung.",
    subtitle: "Formiga, Lobo und Harpia strukturieren die Ausbildung für Risiko und globale Märkte.",
    cta: "Formation ansehen",
  },
  hi: {
    eyebrow: "शैक्षिक आधार",
    title: "पद्धति शिक्षा से शुरू होती है।",
    subtitle: "चींटी, भेड़िया और गरुड़ जोखिम और वैश्विक बाजार समझने में मदद करते हैं।",
    cta: "प्रशिक्षण कार्यक्रम देखें",
  },
  ar: {
    eyebrow: "الأساس التعليمي",
    title: "تبدأ المنهجية بالتعليم.",
    subtitle: "Formiga وLobo وHarpia تنظم الأساس التعليمي لفهم المخاطر والأسواق العالمية.",
    cta: "عرض التكوين",
  },
  he: {
    eyebrow: "בסיס חינוכי",
    title: "המתודולוגיה מתחילה בחינוך.",
    subtitle: "Formiga, Lobo ו-Harpia בונים בסיס הכשרה להבנת סיכון ושווקים גלובליים.",
    cta: "צפו בהכשרה",
  },
  tr: {
    eyebrow: "Eğitim temeli",
    title: "Metodoloji eğitimle başlar.",
    subtitle: "Formiga, Lobo ve Harpia; risk ve küresel piyasalar için eğitim temelini düzenler.",
    cta: "Eğitimi gör",
  },
  id: {
    eyebrow: "Dasar edukasi",
    title: "Metodologi dimulai dari edukasi.",
    subtitle: "Formiga, Lobo, dan Harpia menyusun dasar edukasi untuk memahami risiko dan pasar global.",
    cta: "Lihat formasi",
  },
  vi: {
    eyebrow: "Nền tảng giáo dục",
    title: "Phương pháp bắt đầu từ giáo dục.",
    subtitle: "Formiga, Lobo và Harpia tổ chức nền giáo dục để hiểu rủi ro và thị trường toàn cầu.",
    cta: "Xem đào tạo",
  },
  ru: {
    eyebrow: "Образовательная база",
    title: "Методология начинается с образования.",
    subtitle: "Formiga, Lobo и Harpia выстраивают базу обучения риску и глобальным рынкам.",
    cta: "Смотреть обучение",
  },
  ur: {
    eyebrow: "تعلیمی بنیاد",
    title: "طریقہ کار تعلیم سے شروع ہوتا ہے۔",
    subtitle: "Formiga، Lobo اور Harpia خطرے اور عالمی منڈیوں کی سمجھ کے لیے تعلیمی بنیاد بناتے ہیں۔",
    cta: "تعلیم دیکھیں",
  },
  bn: {
    eyebrow: "শিক্ষাগত ভিত্তি",
    title: "পদ্ধতি শিক্ষা দিয়ে শুরু হয়।",
    subtitle: "Formiga, Lobo ও Harpia ঝুঁকি ও বিশ্ববাজার বোঝার ভিত্তি গড়ে তোলে।",
    cta: "প্রশিক্ষণ দেখুন",
  },
  th: {
    eyebrow: "ฐานการศึกษา",
    title: "ระเบียบวิธีเริ่มจากการศึกษา",
    subtitle: "Formiga, Lobo และ Harpia จัดโครงสร้างการเรียนรู้ความเสี่ยงและตลาดโลก",
    cta: "ดูหลักสูตร",
  },
  ja: {
    eyebrow: "教育の基盤",
    title: "方法論は教育から始まります。",
    subtitle: "アリ、オオカミ、ハーピーがリスクと世界市場の理解を支える教育基盤を組み立てます。",
    cta: "教育プログラムを見る",
  },
  ko: {
    eyebrow: "교육 기반",
    title: "방법론은 교육에서 시작됩니다.",
    subtitle: "Formiga, Lobo, Harpia가 리스크와 글로벌 시장 이해를 위한 교육 기반을 구성합니다.",
    cta: "교육 과정 보기",
  },
};

function localeKey(language: string): SupportedLocale {
  const norm = language.trim().toLowerCase();
  if (norm === "pt-pt") return "pt";
  const base = norm.split("-")[0] ?? "pt";
  return isSupportedLocale(base) ? base : "en";
}

const EDUCATION_FALLBACK = EDUCATION_BASE.en!;

export function educacaoChannelBannerCopy(language: string): ChannelBannerCopy {
  const locale = localeKey(language);
  const row = EDUCATION_BASE[locale] ?? EDUCATION_FALLBACK;
  return {
    eyebrow: row.eyebrow,
    title: row.title,
    subtitle: withoutEmDash(row.subtitle),
    cta: row.cta,
  };
}

export function selectChannelBannerCopy(language: string): ChannelBannerCopy {
  const locale = localeKey(language);
  const row = homeSelectCopyByLocale[locale] ?? homeSelectCopyByLocale.en;
  return {
    eyebrow: row.eyebrow.replace(/\s*\|\s*/g, " · "),
    title: "Select",
    subtitle: withoutEmDash(row.text),
    cta: row.cta,
  };
}

export function privateChannelBannerCopy(language: string): ChannelBannerCopy {
  const locale = localeKey(language);
  const row = homePrivateCopyByLocale[locale] ?? homePrivateCopyByLocale.en;
  return {
    eyebrow: row.eyebrow.replace(/\s*\|\s*/g, " · "),
    title: "Private",
    subtitle: withoutEmDash(row.subtitle || row.text),
    cta: row.cta,
  };
}
