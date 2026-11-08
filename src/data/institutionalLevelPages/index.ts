import type { Locale } from "../../i18n";
import type { SupportedLocale } from "../../i18n/locales";
import {
  evolutionCompareEn,
  levelPackEn,
  levelPageUiEn,
} from "./en";
import {
  evolutionCompareEs,
  levelPackEs,
  levelPageUiEs,
} from "./es";
import {
  evolutionComparePt,
  levelPackPt,
  levelPageUiPt,
} from "./pt";
import { evolutionCompareHe, levelPackHe, levelPageUiHe } from "./he";
import { evolutionCompareJa, levelPackJa, levelPageUiJa } from "./ja";
import { evolutionCompareHi, levelPackHi, levelPageUiHi } from "./hi";
import type { EvolutionCompareStep, LevelCharacterCopy, LevelId, LevelPageUi } from "./types";

export type { LevelId } from "./types";
export { LEVEL_HERO_MEDIA } from "./types";

const levelPacks: Partial<Record<SupportedLocale, typeof levelPackEn>> = {
  pt: levelPackPt,
  en: levelPackEn,
  es: levelPackEs,
  he: levelPackHe,
  ja: levelPackJa,
  hi: levelPackHi,
};

const levelUi: Partial<Record<SupportedLocale, LevelPageUi>> = {
  pt: levelPageUiPt,
  en: levelPageUiEn,
  es: levelPageUiEs,
  fr: { ...levelPageUiEn, competenciesTitle: "Ce que ce niveau développe", philosophyTitle: "Philosophie", coreMessageLabel: "Message central", evolutionTitle: "Évolution attendue", formationTitle: "Structure éducative", compareTitle: "L'évolution des trois personnages", compareProgression: "Fondamentaux → Stratégie → Vision globale", pricingEyebrow: "Investissement dans la formation", viewEducation: "Voir le cursus complet", otherLevels: "Explorer les autres niveaux", levelFormiga: "Niveau Formiga", levelLobo: "Niveau Loup", levelHarpia: "Niveau Harpie" },
  de: { ...levelPageUiEn, competenciesTitle: "Was diese Stufe entwickelt", philosophyTitle: "Philosophie", coreMessageLabel: "Kernbotschaft", evolutionTitle: "Erwartete Entwicklung", formationTitle: "Bildungsstruktur", compareTitle: "Die Entwicklung der drei Charaktere", compareProgression: "Grundlagen → Strategie → Globale Vision", pricingEyebrow: "Investition in die Ausbildung", viewEducation: "Gesamten Lehrplan ansehen", otherLevels: "Weitere Stufen entdecken", levelFormiga: "Formiga-Stufe", levelLobo: "Wolf-Stufe", levelHarpia: "Harpy-Stufe" },
  it: { ...levelPageUiEn, competenciesTitle: "Cosa sviluppa questo livello", philosophyTitle: "Filosofia", coreMessageLabel: "Messaggio centrale", evolutionTitle: "Evoluzione attesa", formationTitle: "Struttura educativa", compareTitle: "L'evoluzione dei tre personaggi", compareProgression: "Fondamenti → Strategia → Visione globale", levelLobo: "Livello Lupo", levelHarpia: "Livello Harpia" },
  ar: { ...levelPageUiEn, competenciesTitle: "ما الذي يطوره هذا المستوى", philosophyTitle: "الفلسفة", coreMessageLabel: "الرسالة المركزية", evolutionTitle: "التطور المتوقع", formationTitle: "الهيكل التعليمي", compareTitle: "تطور الشخصيات الثلاث", compareProgression: "الأساسيات ← الاستراتيجية ← الرؤية العالمية", pricingEyebrow: "الاستثمار في التكوين", viewEducation: "عرض المنهج الكامل", levelFormiga: "مستوى Formiga", levelLobo: "مستوى Lobo", levelHarpia: "مستوى Harpia" },
  fa: { ...levelPageUiEn, competenciesTitle: "آنچه این سطح پرورش می‌دهد", philosophyTitle: "فلسفه", coreMessageLabel: "پیام اصلی", evolutionTitle: "تحول مورد انتظار", formationTitle: "ساختار آموزشی", compareProgression: "مبانی ← استراتژی ← چشم‌انداز جهانی" },
  tr: { ...levelPageUiEn, competenciesTitle: "Bu seviyenin geliştirdikleri", philosophyTitle: "Felsefe", coreMessageLabel: "Ana mesaj", evolutionTitle: "Beklenen gelişim", formationTitle: "Eğitim yapısı", compareTitle: "Üç karakterin evrimi", compareProgression: "Temeller → Strateji → Küresel vizyon", pricingEyebrow: "Eğitime yatırım", viewEducation: "Tam müfredatı gör", levelLobo: "Kurt Seviyesi", levelHarpia: "Harpia Seviyesi" },
  ru: { ...levelPageUiEn, competenciesTitle: "Что развивает этот уровень", philosophyTitle: "Философия", coreMessageLabel: "Ключевое сообщение", evolutionTitle: "Ожидаемая эволюция", formationTitle: "Образовательная структура", compareTitle: "Эволюция трёх персонажей", compareProgression: "Основы → Стратегия → Глобальное видение" },
  hi: levelPageUiHi,
  ur: { ...levelPageUiEn, competenciesTitle: "یہ سطح کیا پروان چڑھاتی ہے", philosophyTitle: "فلسفہ", coreMessageLabel: "مرکزی پیغام", evolutionTitle: "متوقع ارتقا", formationTitle: "تعلیمی ڈھانچہ", compareProgression: "بنیادیں → حکمت عملی → عالمی نظر" },
  bn: { ...levelPageUiEn, competenciesTitle: "এই স্তর কী গড়ে তোলে", philosophyTitle: "দর্শন", coreMessageLabel: "মূল বার্তা", evolutionTitle: "প্রত্যাশিত বিবর্তন", formationTitle: "শিক্ষাগত কাঠামো", compareProgression: "ভিত্তি → কৌশল → বৈশ্বিক দৃষ্টি" },
  id: { ...levelPageUiEn, competenciesTitle: "Apa yang dikembangkan level ini", philosophyTitle: "Filosofi", coreMessageLabel: "Pesan inti", evolutionTitle: "Evolusi yang diharapkan", formationTitle: "Struktur pendidikan", compareProgression: "Dasar → Strategi → Visi global" },
  vi: { ...levelPageUiEn, competenciesTitle: "Cấp độ này phát triển điều gì", philosophyTitle: "Triết lý", coreMessageLabel: "Thông điệp cốt lõi", evolutionTitle: "Tiến hóa kỳ vọng", formationTitle: "Cấu trúc giáo dục", compareProgression: "Nền tảng → Chiến lược → Tầm nhìn toàn cầu" },
  th: { ...levelPageUiEn, competenciesTitle: "ระดับนี้พัฒนาอะไร", philosophyTitle: "ปรัชญา", coreMessageLabel: "ข้อความหลัก", evolutionTitle: "วิวัฒนาการที่คาดหวัง", formationTitle: "โครงสร้างการศึกษา", compareProgression: "รากฐาน → กลยุทธ์ → วิสัยทัศน์โลก" },
  tl: { ...levelPageUiEn, competenciesTitle: "Ano ang binubuo ng level na ito", philosophyTitle: "Pilosopiya", coreMessageLabel: "Pangunahing mensahe", evolutionTitle: "Inaasahang ebolusyon", formationTitle: "Istraktura ng edukasyon", compareProgression: "Pundasyon → Estratehiya → Global na pananaw" },
  zh: { ...levelPageUiEn, competenciesTitle: "本级别培养什么", philosophyTitle: "理念", coreMessageLabel: "核心信息", evolutionTitle: "预期成长", formationTitle: "教育结构", compareTitle: "三个角色的演进", compareProgression: "基础 → 策略 → 全球视野" },
  ja: levelPageUiJa,
  ko: { ...levelPageUiEn, competenciesTitle: "이 레벨이 키우는 것", philosophyTitle: "철학", coreMessageLabel: "핵심 메시지", evolutionTitle: "기대되는 성장", formationTitle: "교육 구조", compareTitle: "세 캐릭터의 진화", compareProgression: "기초 → 전략 → 글로벌 시야" },
  pl: { ...levelPageUiEn, competenciesTitle: "Co rozwija ten poziom", philosophyTitle: "Filozofia", coreMessageLabel: "Przesłanie główne", evolutionTitle: "Oczekiwana ewolucja", formationTitle: "Struktura edukacyjna", compareTitle: "Ewolucja trzech postaci", compareProgression: "Fundamenty → Strategia → Wizja globalna" },
  he: levelPageUiHe,
};

const evolutionByLocale: Partial<Record<SupportedLocale, EvolutionCompareStep[]>> = {
  pt: evolutionComparePt,
  en: evolutionCompareEn,
  es: evolutionCompareEs,
  he: evolutionCompareHe,
  ja: evolutionCompareJa,
  hi: evolutionCompareHi,
};

function resolveLocale(locale: Locale): SupportedLocale {
  const key = locale as SupportedLocale;
  return key;
}

export function getLevelPageUi(locale: Locale): LevelPageUi {
  const key = resolveLocale(locale);
  return levelUi[key] ?? levelUi.en ?? levelPageUiEn;
}

export function getLevelCharacterCopy(level: LevelId, locale: Locale): LevelCharacterCopy {
  const key = resolveLocale(locale);
  const pack = levelPacks[key] ?? levelPacks.en ?? levelPackEn;
  return pack[level];
}

export function getEvolutionCompare(locale: Locale): EvolutionCompareStep[] {
  const key = resolveLocale(locale);
  return evolutionByLocale[key] ?? evolutionByLocale.en ?? evolutionCompareEn;
}

export function getOtherLevelLinks(locale: Locale, current: LevelId) {
  const ui = getLevelPageUi(locale);
  const paths: Record<LevelId, string> = {
    formiga: "/nivel-formiga",
    lobo: "/nivel-lobo",
    harpia: "/nivel-harpia",
  };
  const labels: Record<LevelId, string> = {
    formiga: ui.levelFormiga,
    lobo: ui.levelLobo,
    harpia: ui.levelHarpia,
  };
  return (["formiga", "lobo", "harpia"] as LevelId[])
    .filter((id) => id !== current)
    .map((id) => ({ id, href: paths[id], label: labels[id] }));
}
