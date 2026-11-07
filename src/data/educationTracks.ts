import type { Locale } from "../i18n";
import type { FormationTrackId } from "./formationPricing";

export type EducationTrackLevel = readonly [string, string, string, number];

export type EducationTrack = {
  id: FormationTrackId;
  name: string;
  subtitle: string;
  levels: EducationTrackLevel[];
};

const tracksPt: EducationTrack[] = [
  {
    id: "formiga",
    name: "FORMIGA",
    subtitle: "Base financeira",
    levels: [
      ["F1", "Realidade financeira", "Organização, renda, contas, dívida e primeiro capital.", 1],
      ["F2", "Planejamento e disciplina", "Controle emocional, rotina financeira e construção de caixa.", 2],
      ["F3", "Primeiros mercados", "Introdução a Forex, cripto, ações, renda fixa e fundos imobiliários.", 3],
      ["F4", "Risco e proteção", "Gestão de risco, proteção de capital e leitura básica de mercado.", 4],
      ["F5", "Saída da base", "Preparação para operar com mais clareza e evoluir para o nível Lobo.", 5],
    ],
  },
  {
    id: "lobo",
    name: "LOBO",
    subtitle: "Estratégia e expansão",
    levels: [
      ["L1", "Decisão operacional", "Leitura de fluxo, cenário e tomada de decisão.", 3],
      ["L2", "Mercado internacional", "Forex, cripto, ouro, petróleo, índices e moedas globais.", 4],
      ["L3", "Ciclos e correlações", "Relação entre ativos, liquidez, macroeconomia e cenário global.", 5],
      ["L4", "Gestão de carteira", "Risco avançado, proteção, alocação e posicionamento.", 5],
      ["L5", "Visão patrimonial", "Preparação para patrimônio, estrutura e nível Harpia.", 5],
    ],
  },
  {
    id: "harpia",
    name: "HARPIA",
    subtitle: "Patrimônio global",
    levels: [
      ["H1", "Visão macro global", "Leitura institucional, geopolítica, juros, moedas e fluxo internacional.", 5],
      ["H2", "Proteção patrimonial", "Preservação de capital, diversificação e alocação estratégica.", 5],
      ["H3", "Estrutura familiar", "Sucessão, patrimônio geracional e construção de longo prazo.", 5],
      ["H4", "Expansão internacional", "Moedas fortes, ativos globais, contas internacionais e proteção.", 5],
      ["H5", "Estrutura de elite", "Preservação, decisão patrimonial e visão acima do mercado.", 5],
    ],
  },
];

const tracksEn: EducationTrack[] = [
  {
    id: "formiga",
    name: "FORMIGA",
    subtitle: "Financial foundation",
    levels: [
      ["F1", "Financial reality", "Organization, income, bills, debt, and first capital.", 1],
      ["F2", "Planning and discipline", "Emotional control, financial routine, and cash-building.", 2],
      ["F3", "First markets", "Introduction to Forex, crypto, stocks, fixed income, and real estate funds.", 3],
      ["F4", "Risk and protection", "Risk management, capital protection, and basic market reading.", 4],
      ["F5", "Leaving the base", "Preparation to operate with more clarity and evolve into the Wolf level.", 5],
    ],
  },
  {
    id: "lobo",
    name: "WOLF",
    subtitle: "Strategy and expansion",
    levels: [
      ["L1", "Operational decision", "Flow reading, scenario analysis, and decision-making.", 3],
      ["L2", "International market", "Forex, crypto, gold, oil, indices, and global currencies.", 4],
      ["L3", "Cycles and correlations", "Relationships between assets, liquidity, macroeconomics, and global scenarios.", 5],
      ["L4", "Portfolio management", "Advanced risk, protection, allocation, and positioning.", 5],
      ["L5", "Wealth vision", "Preparation for wealth, structure, and the Harpy level.", 5],
    ],
  },
  {
    id: "harpia",
    name: "HARPY",
    subtitle: "Global wealth",
    levels: [
      ["H1", "Global macro vision", "Institutional reading, geopolitics, rates, currencies, and international flow.", 5],
      ["H2", "Wealth protection", "Capital preservation, diversification, and strategic allocation.", 5],
      ["H3", "Family structure", "Succession, generational wealth, and long-term building.", 5],
      ["H4", "International expansion", "Strong currencies, global assets, international accounts, and protection.", 5],
      ["H5", "Elite structure", "Preservation, wealth decision-making, and vision above the market.", 5],
    ],
  },
];

const tracksEs: EducationTrack[] = [
  {
    id: "formiga",
    name: "HORMIGA",
    subtitle: "Base financiera",
    levels: [
      ["F1", "Realidad financiera", "Organización, ingresos, cuentas, deuda y primer capital.", 1],
      ["F2", "Planificación y disciplina", "Control emocional, rutina financiera y construcción de caja.", 2],
      ["F3", "Primeros mercados", "Introducción a Forex, cripto, acciones, renta fija y fondos inmobiliarios.", 3],
      ["F4", "Riesgo y protección", "Gestión de riesgo, protección de capital y lectura básica de mercado.", 4],
      ["F5", "Salida de la base", "Preparación para operar con más claridad y evolucionar al nivel Lobo.", 5],
    ],
  },
  {
    id: "lobo",
    name: "LOBO",
    subtitle: "Estrategia y expansión",
    levels: [
      ["L1", "Decisión operativa", "Lectura de flujo, escenario y toma de decisión.", 3],
      ["L2", "Mercado internacional", "Forex, cripto, oro, petróleo, índices y divisas globales.", 4],
      ["L3", "Ciclos y correlaciones", "Relación entre activos, liquidez, macroeconomía y escenario global.", 5],
      ["L4", "Gestión de cartera", "Riesgo avanzado, protección, asignación y posicionamiento.", 5],
      ["L5", "Visión patrimonial", "Preparación para patrimonio, estructura y nivel Harpía.", 5],
    ],
  },
  {
    id: "harpia",
    name: "HARPÍA",
    subtitle: "Patrimonio global",
    levels: [
      ["H1", "Visión macro global", "Lectura institucional, geopolítica, tasas, divisas y flujo internacional.", 5],
      ["H2", "Protección patrimonial", "Preservación de capital, diversificación y asignación estratégica.", 5],
      ["H3", "Estructura familiar", "Sucesión, patrimonio generacional y construcción de largo plazo.", 5],
      ["H4", "Expansión internacional", "Monedas fuertes, activos globales, cuentas internacionales y protección.", 5],
      ["H5", "Estructura de elite", "Preservación, decisión patrimonial y visión por encima del mercado.", 5],
    ],
  },
];

export const tracksHe: EducationTrack[] = [
  {
    id: "formiga",
    name: "FORMIGA",
    subtitle: "בסיס פיננסי",
    levels: [
      ["F1", "מציאות פיננסית", "ארגון, הכנסה, חשבונות, חוב והון ראשון.", 1],
      ["F2", "תכנון ומשמעת", "שליטה רגשית, שגרה פיננסית ובניית מזומן.", 2],
      ["F3", "שווקים ראשונים", "מבוא ל-Forex, קריפטו, מניות, אג\"ח וקרנות.", 3],
      ["F4", "סיכון והגנה", "ניהול סיכון, הגנת הון וקריאת שוק בסיסית.", 4],
      ["F5", "יציאה מהבסיס", "הכנה לפעולה ברורה יותר ומעבר לרמת Lobo.", 5],
    ],
  },
  {
    id: "lobo",
    name: "LOBO",
    subtitle: "אסטרטגיה והתרחבות",
    levels: [
      ["L1", "החלטה תפעולית", "קריאת זרימה, תרחיש וקבלת החלטות.", 3],
      ["L2", "שוק בינלאומי", "Forex, קריפטו, זהב, נפט, מדדים ומטבעות.", 4],
      ["L3", "מחזורים וקורלציות", "קשר בין נכסים, נזילות, מאקרו ותרחיש גלובלי.", 5],
      ["L4", "ניהול תיק", "סיכון מתקדם, הגנה, הקצאה ומיקום.", 5],
      ["L5", "חזון הוני", "הכנה להון, מבנה ורמת Harpia.", 5],
    ],
  },
  {
    id: "harpia",
    name: "HARPIA",
    subtitle: "הון גלובלי",
    levels: [
      ["H1", "מאקרו גלובלי", "קריאה מוסדית, גיאופוליטיקה, ריבית, מטבעות ותזרים.", 5],
      ["H2", "הגנת הון", "שימור הון, גיוון והקצאה אסטרטגית.", 5],
      ["H3", "מבנה משפחתי", "ירושה, הון דורי ובנייה ארוכת טווח.", 5],
      ["H4", "התרחבות בינלאומית", "מטבעות חזקים, נכסים גלובליים וחשבונות בינלאומיים.", 5],
      ["H5", "מבנה אליטה", "שימור, החלטות הוניות וראייה מעל השוק.", 5],
    ],
  },
];

const byLocale: Partial<Record<string, EducationTrack[]>> = {
  pt: tracksPt,
  en: tracksEn,
  es: tracksEs,
  he: tracksHe,
};

export function getEducationTrack(locale: Locale, trackId: FormationTrackId): EducationTrack {
  const list = byLocale[locale] ?? byLocale.en ?? tracksEn;
  const track = list.find((item) => item.id === trackId);
  return track ?? list[0];
}
