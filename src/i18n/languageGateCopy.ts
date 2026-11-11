import { SUPPORTED_LOCALES, type SupportedLocale } from "./locales";
import { getLanguageGateBadge } from "../data/languageCountCopy";

export type LanguageGateUiCopy = {
  platformTagline: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  suggestedLead: string;
  suggestedPending: string;
  suggestedBadge: string;
  enter: string;
  geoHint: (countryName: string, languageName: string) => string;
  browserHint: (languageName: string) => string;
  defaultHint: string;
  continueIn: (languageName: string) => string;
  expandingNote: string;
  listAria: string;
  tierGlobal: string;
  tierExpanding: string;
};

const en: LanguageGateUiCopy = {
  platformTagline: "Global financial platform",
  eyebrow: "Varejo Investidor 2.0",
  title: "Choose your language",
  subtitle:
    "Select how you want to experience Varejo Investidor. Your choice defines navigation, content and regional formatting for every visit.",
  suggestedLead: "Suggested for you:",
  suggestedPending: "Not selected until you confirm below.",
  suggestedBadge: "Suggested",
  enter: "Enter",
  geoHint: (country, language) => `Based on your location (${country}), we recommend ${language}.`,
  browserHint: (language) => `Based on your browser settings, we recommend ${language}.`,
  defaultHint: "We could not detect your region. English is suggested below; pick any of our languages.",
  continueIn: (language) => `Continue in ${language}`,
  expandingNote:
    'Content in languages marked "Expanding" may still reference the English structure while localized copy is finalized.',
  listAria: "Language selection",
  tierGlobal: "Global",
  tierExpanding: "Expanding",
};

const copyByLocale: Partial<Record<SupportedLocale, LanguageGateUiCopy>> = {
  en,
  pt: {
    ...en,
    platformTagline: "Plataforma financeira global",
    title: "Escolha seu idioma",
    subtitle:
      "Selecione como deseja acessar a Varejo Investidor. Sua escolha define navegação, conteúdo e formatação regional em todas as visitas.",
    suggestedLead: "Sugestão para você:",
    suggestedPending: "Só entra em vigor quando você confirmar abaixo.",
    suggestedBadge: "Sugerido",
    enter: "Entrar",
    geoHint: (country, language) => `Pela sua localização (${country}), recomendamos ${language}.`,
    browserHint: (language) => `Pelas configurações do navegador, recomendamos ${language}.`,
    defaultHint: "Não identificamos sua região. Sugerimos inglês abaixo; escolha qualquer um dos idiomas.",
    continueIn: (language) => `Continuar em ${language}`,
    expandingNote:
      'Conteúdos marcados como "Expanding" podem ainda seguir a estrutura em inglês enquanto a tradução é finalizada.',
    listAria: "Seleção de idioma",
    tierGlobal: "Global",
    tierExpanding: "Em expansão",
  },
  es: {
    ...en,
    platformTagline: "Plataforma financiera global",
    title: "Elige tu idioma",
    subtitle:
      "Selecciona cómo quieres experimentar Varejo Investidor. Tu elección define la navegación, el contenido y el formato regional.",
    suggestedLead: "Sugerencia para ti:",
    suggestedPending: "No se aplica hasta que confirmes abajo.",
    suggestedBadge: "Sugerido",
    enter: "Entrar",
    geoHint: (country, language) => `Según tu ubicación (${country}), recomendamos ${language}.`,
    browserHint: (language) => `Según tu navegador, recomendamos ${language}.`,
    defaultHint: "No detectamos tu región. Sugerimos inglés; elige cualquier idioma de la lista.",
    continueIn: (language) => `Continuar en ${language}`,
    listAria: "Selección de idioma",
    tierExpanding: "En expansión",
  },
  fr: {
    ...en,
    title: "Choisissez votre langue",
    subtitle: "Choisissez comment accéder à Varejo Investidor : navigation, contenu et formats régionaux.",
    suggestedLead: "Pour vous :",
    suggestedBadge: "Suggéré",
    enter: "Ouvrir",
    geoHint: (country, language) => `Selon votre position (${country}), nous recommandons ${language}.`,
    continueIn: (language) => `Continuer en ${language}`,
  },
  de: {
    ...en,
    title: "Sprache wählen",
    subtitle: "Wählen Sie, wie Sie Varejo Investidor nutzen möchten: Navigation, Inhalte und regionale Formate.",
    suggestedLead: "Empfehlung:",
    suggestedBadge: "Empfohlen",
    enter: "Öffnen",
    continueIn: (language) => `Weiter auf ${language}`,
  },
  it: {
    ...en,
    title: "Scegli la tua lingua",
    subtitle: "Scegli come vivere Varejo Investidor: navigazione, contenuti e formati regionali.",
    suggestedBadge: "Suggerito",
    enter: "Entra",
    continueIn: (language) => `Continua in ${language}`,
  },
  ar: {
    ...en,
    title: "اختر لغتك",
    suggestedLead: "مقترح لك:",
    suggestedBadge: "مقترح",
    enter: "دخول",
    continueIn: (language) => `المتابعة بـ ${language}`,
  },
  ja: {
    ...en,
    title: "言語を選択",
    suggestedLead: "おすすめ:",
    suggestedBadge: "おすすめ",
    enter: "入る",
    continueIn: (language) => `${language}で続ける`,
  },
  ko: {
    ...en,
    title: "언어 선택",
    suggestedLead: "추천:",
    suggestedBadge: "추천",
    enter: "입장",
    continueIn: (language) => `${language}로 계속`,
  },
  zh: {
    ...en,
    title: "选择语言",
    suggestedLead: "为您推荐：",
    suggestedBadge: "推荐",
    enter: "进入",
    continueIn: (language) => `继续使用${language}`,
  },
};

for (const loc of SUPPORTED_LOCALES) {
  if (!copyByLocale[loc]) copyByLocale[loc] = { ...en };
}

export function getLanguageGateCopy(locale: SupportedLocale): LanguageGateUiCopy {
  return copyByLocale[locale] ?? en;
}

export function getLanguageGateBadgeForUi(locale: SupportedLocale): string {
  return getLanguageGateBadge(locale);
}

export function getIdiomaPageTitle(locale: SupportedLocale): string {
  return `${getLanguageGateCopy(locale).title} | Varejo Investidor`;
}
