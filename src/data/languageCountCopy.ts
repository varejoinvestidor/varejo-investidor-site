import { isSupportedLocale, SUPPORTED_LOCALES, type SupportedLocale } from "../i18n/locales";

export const SUPPORTED_LANGUAGE_COUNT = SUPPORTED_LOCALES.length;

type LanguageCountStrings = {
  heroLabel: string;
  introStat: string;
  authorityTitle: string;
  authorityText: string;
  gateBadge: string;
};

const languageCountCopy: Record<SupportedLocale, LanguageCountStrings> = {
  pt: {
    heroLabel: "idiomas",
    introStat: "22 idiomas",
    authorityTitle: "22 idiomas ativos",
    authorityText: "Estrutura internacional preparada para investidores globais.",
    gateBadge: "22 idiomas",
  },
  en: {
    heroLabel: "languages",
    introStat: "22 languages",
    authorityTitle: "22 active languages",
    authorityText: "International structure prepared for global investors.",
    gateBadge: "22 languages",
  },
  es: {
    heroLabel: "idiomas",
    introStat: "22 idiomas",
    authorityTitle: "22 idiomas activos",
    authorityText: "Estructura internacional preparada para inversores globales.",
    gateBadge: "22 idiomas",
  },
  fr: {
    heroLabel: "langues",
    introStat: "22 langues",
    authorityTitle: "22 langues actives",
    authorityText: "Structure internationale conçue pour les investisseurs du monde entier.",
    gateBadge: "22 langues",
  },
  de: {
    heroLabel: "Sprachen",
    introStat: "22 Sprachen",
    authorityTitle: "22 aktive Sprachen",
    authorityText: "Internationale Struktur für Investoren weltweit.",
    gateBadge: "22 Sprachen",
  },
  it: {
    heroLabel: "lingue",
    introStat: "22 lingue",
    authorityTitle: "22 lingue attive",
    authorityText: "Struttura internazionale pensata per investitori globali.",
    gateBadge: "22 lingue",
  },
  ar: {
    heroLabel: "لغات",
    introStat: "22 لغة",
    authorityTitle: "22 لغة نشطة",
    authorityText: "هيكل دولي مهيأ للمستثمرين حول العالم.",
    gateBadge: "22 لغة",
  },
  fa: {
    heroLabel: "زبان",
    introStat: "22 زبان",
    authorityTitle: "22 زبان فعال",
    authorityText: "ساختار بین‌المللی آماده برای سرمایه‌گذاران جهانی.",
    gateBadge: "22 زبان",
  },
  hi: {
    heroLabel: "भाषाएँ",
    introStat: "22 भाषाएँ",
    authorityTitle: "22 सक्रिय भाषाएँ",
    authorityText: "वैश्विक निवेशकों के लिए तैयार अंतर्राष्ट्रीय संरचना।",
    gateBadge: "22 भाषाएँ",
  },
  ur: {
    heroLabel: "زبانیں",
    introStat: "22 زبانیں",
    authorityTitle: "22 فعال زبانیں",
    authorityText: "عالمی سرمایہ کاروں کے لیے بین الاقوامی ڈھانچہ۔",
    gateBadge: "22 زبانیں",
  },
  bn: {
    heroLabel: "ভাষা",
    introStat: "22টি ভাষা",
    authorityTitle: "22টি সক্রিয় ভাষা",
    authorityText: "বিশ্বব্যাপী বিনিয়োগকারীদের জন্য আন্তর্জাতিক কাঠামো।",
    gateBadge: "22টি ভাষা",
  },
  tr: {
    heroLabel: "dil",
    introStat: "22 dil",
    authorityTitle: "22 aktif dil",
    authorityText: "Küresel yatırımcılar için uluslararası yapı.",
    gateBadge: "22 dil",
  },
  ru: {
    heroLabel: "языка",
    introStat: "22 языка",
    authorityTitle: "22 активных языка",
    authorityText: "Международная структура для инвесторов по всему миру.",
    gateBadge: "22 языка",
  },
  id: {
    heroLabel: "bahasa",
    introStat: "22 bahasa",
    authorityTitle: "22 bahasa aktif",
    authorityText: "Struktur internasional untuk investor global.",
    gateBadge: "22 bahasa",
  },
  vi: {
    heroLabel: "ngôn ngữ",
    introStat: "22 ngôn ngữ",
    authorityTitle: "22 ngôn ngữ hoạt động",
    authorityText: "Cơ cấu quốc tế phục vụ nhà đầu tư toàn cầu.",
    gateBadge: "22 ngôn ngữ",
  },
  th: {
    heroLabel: "ภาษา",
    introStat: "22 ภาษา",
    authorityTitle: "22 ภาษาที่ใช้งาน",
    authorityText: "โครงสร้างระดับนานาชาติสำหรับนักลงทุนทั่วโลก",
    gateBadge: "22 ภาษา",
  },
  tl: {
    heroLabel: "wikang",
    introStat: "22 wika",
    authorityTitle: "22 aktibong wika",
    authorityText: "Internasyonal na estruktura para sa mga global na mamumuhunan.",
    gateBadge: "22 wika",
  },
  zh: {
    heroLabel: "种语言",
    introStat: "22 种语言",
    authorityTitle: "22 种活跃语言",
    authorityText: "为全球投资者打造的多语言国际结构。",
    gateBadge: "22 种语言",
  },
  ja: {
    heroLabel: "言語",
    introStat: "22言語",
    authorityTitle: "22のアクティブ言語",
    authorityText: "世界中の投資家向けに設計された国際的な体制。",
    gateBadge: "22言語",
  },
  ko: {
    heroLabel: "개 언어",
    introStat: "22개 언어",
    authorityTitle: "22개 활성 언어",
    authorityText: "글로벌 투자자를 위한 국제 구조.",
    gateBadge: "22개 언어",
  },
  pl: {
    heroLabel: "języki",
    introStat: "22 języki",
    authorityTitle: "22 aktywne języki",
    authorityText: "Międzynarodowa struktura dla inwestorów na całym świecie.",
    gateBadge: "22 języki",
  },
  he: {
    heroLabel: "שפות",
    introStat: "22 שפות",
    authorityTitle: "22 שפות פעילות",
    authorityText: "מבנה בינלאומי המותאם למשקיעים ברחבי העולם.",
    gateBadge: "22 שפות",
  },
};

function resolveLocale(locale: string): SupportedLocale {
  return isSupportedLocale(locale) ? locale : "en";
}

export function getHomeHeroLanguageStat(locale: string): { value: string; label: string } {
  const loc = resolveLocale(locale);
  return { value: String(SUPPORTED_LANGUAGE_COUNT), label: languageCountCopy[loc].heroLabel };
}

export function getIntroLanguageStat(locale: string): string {
  return languageCountCopy[resolveLocale(locale)].introStat;
}

export function getAuthorityLanguageCard(locale: string): { title: string; text: string } {
  const loc = resolveLocale(locale);
  const { authorityTitle, authorityText } = languageCountCopy[loc];
  return { title: authorityTitle, text: authorityText };
}

export function getLanguageGateBadge(locale: string): string {
  return languageCountCopy[resolveLocale(locale)].gateBadge;
}

export function getIdiomaPageMetaDescription(): string {
  return `Escolha como deseja acessar a plataforma global Varejo Investidor em um dos ${SUPPORTED_LANGUAGE_COUNT} idiomas disponíveis.`;
}
