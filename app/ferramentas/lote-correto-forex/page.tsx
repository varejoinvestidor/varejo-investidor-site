"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../../src/components/ForexBrokerBannerWide";
import { fxproButtonLabels, fxproLinks } from "../../../src/data/fxproLinks";
import type { Locale } from "../../../src/i18n";

type Currency = "USD" | "BRL" | "EUR" | "GBP";
type Tone = "rise" | "gold" | "fall" | "purple";
type LotProfileKey =
  | "harpiaConservative"
  | "harpia"
  | "loboConservative"
  | "lobo"
  | "loboAggressive"
  | "formiga"
  | "formigaAggressive"
  | "megaAggressive"
  | "ultraAggressive";

type LotCopy = {
  lang: string;
  eyebrow: string;
  h1: string;
  h2: string;
  form: {
    capital: string;
    capitalHelp: string;
    lot: string;
    lotHelp: string;
    pips: string;
    pipsHelp: string;
    currency: string;
    currencyHelp: string;
    button: string;
  };
  introEyebrow: string;
  introTitle: string;
  introParagraphs: string[];
  beginnerCards: [string, string][];
  resultEyebrow: string;
  labels: {
    pipValue: string;
    result100: string;
    impact: string;
    pipsToDouble: string;
    pipsToZero: string;
    classification: string;
    table: string[];
  };
  profiles: Record<LotProfileKey, [string, string]>;
  referenceEyebrow: string;
  referenceTitle: string;
  referenceText: string;
  comparisonEyebrow: string;
  comparisonTitle: string;
  comparisonText: string;
  comparisonCards: [string, string][];
  levelsEyebrow: string;
  levelsTitle: string;
  levels: [string, string, string][];
  brokerEyebrow: string;
  brokerTitle: string;
  brokerText: string;
  brokerCardTitle: string;
  brokerCardText: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  freeButton: string;
  signalsButton: string;
  disclaimer: string;
  pips: string;
};

const currencySymbols: Record<Currency, string> = {
  USD: "US$",
  BRL: "R$",
  EUR: "€",
  GBP: "£",
};

const basePips = 100;
const referenceRows = [
  { capital: 500, lot: 0.01 },
  { capital: 500, lot: 0.02 },
  { capital: 500, lot: 0.05 },
  { capital: 500, lot: 0.1 },
  { capital: 1000, lot: 0.01 },
  { capital: 1000, lot: 0.02 },
  { capital: 1000, lot: 0.05 },
  { capital: 1000, lot: 0.1 },
];

const signalsPath: Record<Locale, string> = {
  pt: "/sinais",
  en: "/en/signals",
  es: "/es/signals",
  hi: "/hi/signals",
  ar: "/ar",
  tr: "/tr",
  id: "/id/signals",
  vi: "/vi/signals",
};

const copy: Record<Locale, LotCopy> = {
  pt: {
    lang: "pt-BR",
    eyebrow: "Ferramenta Forex",
    h1: "Escolha o lote correto para sua conta Forex.",
    h2: "Entenda quanto cada movimento de 100 pips representa no seu capital e descubra qual lote combina melhor com o tamanho da sua conta.",
    form: {
      capital: "Capital depositado na corretora",
      capitalHelp: "Exemplo: 500, 1000, 2000 ou 5000.",
      lot: "Lote desejado",
      lotHelp: "Exemplo: 0.01, 0.02, 0.05 ou 0.10.",
      pips: "Base de cálculo em pips",
      pipsHelp: "Padrão fixo para comparar o impacto do lote.",
      currency: "Moeda da conta",
      currencyHelp: "Escolha a moeda usada para exibir os resultados.",
      button: "Calcular lote",
    },
    introEyebrow: "Antes de operar",
    introTitle: "Antes de abrir uma operação, entenda o lote.",
    introParagraphs: [
      "No Forex, o lote define o tamanho da sua operação. Quanto maior o lote, maior será o ganho ou a perda a cada movimento do mercado.",
      "Se você depositou US$ 500 e opera 0.01 lote, cada 100 pips representa aproximadamente US$ 10. Se opera 0.02 lote, cada 100 pips representa aproximadamente US$ 20.",
      "Quanto maior o lote, menos espaço sua conta tem para suportar erros.",
    ],
    beginnerCards: [
      ["Capital depositado", "É o valor que você possui na corretora e serve como base para medir o impacto do lote."],
      ["Tamanho do lote", "É o volume da operação. Quanto maior o lote, maior será o ganho ou a perda."],
      ["Movimento de 100 pips", "A ferramenta mostra quanto sua conta ganha ou perde a cada 100 pips."],
      ["Classificação do risco", "O resultado mostra se o lote está conservador, moderado, agressivo ou crítico."],
    ],
    resultEyebrow: "Resultado da ferramenta",
    labels: {
      pipValue: "Valor por pip",
      result100: "Resultado em 100 pips",
      impact: "Impacto na conta",
      pipsToDouble: "Pips para dobrar",
      pipsToZero: "Pips para zerar",
      classification: "Classificação",
      table: ["Capital", "Lote", "Valor por pip", "Resultado em 100 pips", "Impacto", "Pips para dobrar ou zerar", "Classificação"],
    },
    profiles: {
      harpiaConservative: ["Harpia Conservador", "Esse lote preserva bastante o capital e oferece maior margem de sobrevivência."],
      harpia: ["Harpia", "Risco controlado. O lote permite acompanhar o mercado com mais tranquilidade."],
      loboConservative: ["Lobo Conservador", "Lote equilibrado para quem busca crescimento com controle."],
      lobo: ["Lobo", "Risco moderado. O lote pode acelerar ganhos, mas também aumenta o impacto dos erros."],
      loboAggressive: ["Lobo Agressivo", "Atenção. O lote começa a pressionar a conta e exige disciplina."],
      formiga: ["Formiga", "Risco alto. Poucas operações erradas podem gerar grande perda."],
      formigaAggressive: ["Formiga Agressivo", "Risco muito alto. A conta fica vulnerável."],
      megaAggressive: ["Mega Agressivo", "Exposição extremamente alta. Pode dobrar ou quebrar a conta rapidamente."],
      ultraAggressive: ["Ultra Agressivo", "Zona crítica. O lote é incompatível com preservação de capital."],
    },
    referenceEyebrow: "Referência",
    referenceTitle: "Tabela de impacto por lote",
    referenceText: "A tabela usa o cálculo simplificado a cada 100 pips para comparar como o mesmo lote muda de impacto conforme o capital.",
    comparisonEyebrow: "Comparação",
    comparisonTitle: "O mesmo lote muda conforme o tamanho da conta",
    comparisonText: "O lote não é conservador ou agressivo sozinho. Ele depende do tamanho da conta.",
    comparisonCards: [
      ["Conta pequena", "Com pouco capital, o lote precisa ser menor para não comprometer a conta."],
      ["Conta média", "Permite mais flexibilidade, mas ainda exige controle."],
      ["Conta maior", "Permite operar com lote maior sem comprometer tanto o percentual do capital."],
    ],
    levelsEyebrow: "Formiga • Lobo • Harpia",
    levelsTitle: "Como cada nível entende o lote",
    levels: [
      ["Formiga", "A Formiga costuma olhar apenas o possível lucro e ignora o impacto do movimento contra a posição.", "border-fall/[0.38] text-fall"],
      ["Lobo", "O Lobo calcula antes de operar e entende que o lote precisa respeitar conta, stop e risco total.", "border-gold/[0.42] text-gold"],
      ["Harpia", "A Harpia prioriza sobrevivência, preservação de capital e longevidade no mercado.", "border-rise/[0.34] text-rise"],
    ],
    brokerEyebrow: "Conta Forex",
    brokerTitle: "Abra sua conta e acesse o mercado Forex.",
    brokerText: "Para aplicar a gestão de lote na prática, você precisa operar em sua própria conta na corretora.",
    brokerCardTitle: "Corretora Forex",
    brokerCardText: "Clique no botão ou no banner abaixo para acessar a corretora no idioma correto.",
    ctaEyebrow: "Lote e risco",
    ctaTitle: "Aprenda a operar com lote e risco controlados.",
    ctaText: "No Varejo Investidor, você aprende a proteger capital, calcular lote, entender pips e evoluir pelos níveis Formiga, Lobo e Harpia.",
    freeButton: "Entrar no Canal Formiga",
    signalsButton: "Receber sinais no WhatsApp",
    disclaimer: "Esta ferramenta possui finalidade educacional e utiliza uma regra simplificada de valor por pip. O valor real pode variar conforme ativo, corretora, tipo de conta, moeda da conta e condições de mercado. Operar Forex, criptomoedas, índices e outros ativos envolve risco e pode resultar em perdas.",
    pips: "pips",
  },
  en: {
    lang: "en",
    eyebrow: "Forex Tool",
    h1: "Choose the right lot size for your Forex account.",
    h2: "Understand what each 100-pip move represents in your capital and discover which lot size best fits your account.",
    form: {
      capital: "Capital deposited with the broker",
      capitalHelp: "Example: 500, 1000, 2000 or 5000.",
      lot: "Desired lot size",
      lotHelp: "Example: 0.01, 0.02, 0.05 or 0.10.",
      pips: "Calculation base in pips",
      pipsHelp: "Fixed standard to compare lot impact.",
      currency: "Account currency",
      currencyHelp: "Choose the currency used to display results.",
      button: "Calculate lot",
    },
    introEyebrow: "Before trading",
    introTitle: "Before opening a trade, understand the lot.",
    introParagraphs: [
      "In Forex, the lot defines the size of your trade. The larger the lot, the larger the gain or loss on each market move.",
      "If you deposited US$ 500 and trade 0.01 lot, each 100 pips represents about US$ 10. If you trade 0.02 lot, each 100 pips represents about US$ 20.",
      "The larger the lot, the less room your account has to withstand mistakes.",
    ],
    beginnerCards: [
      ["Deposited capital", "The amount you have with the broker and the base used to measure lot impact."],
      ["Lot size", "The volume of the trade. The larger the lot, the larger the gain or loss."],
      ["100-pip move", "The tool shows how much your account gains or loses every 100 pips."],
      ["Risk classification", "The result shows whether the lot is conservative, moderate, aggressive or critical."],
    ],
    resultEyebrow: "Tool result",
    labels: {
      pipValue: "Value per pip",
      result100: "Result in 100 pips",
      impact: "Account impact",
      pipsToDouble: "Pips to double",
      pipsToZero: "Pips to zero",
      classification: "Classification",
      table: ["Capital", "Lot", "Value per pip", "Result in 100 pips", "Impact", "Pips to double or zero", "Classification"],
    },
    profiles: {
      harpiaConservative: ["Eagle Conservative", "This lot preserves capital strongly and gives more survival margin."],
      harpia: ["Eagle", "Controlled risk. The lot allows you to follow the market with more calm."],
      loboConservative: ["Wolf Conservative", "A balanced lot for those seeking growth with control."],
      lobo: ["Wolf", "Moderate risk. The lot may accelerate gains, but also increases the impact of mistakes."],
      loboAggressive: ["Wolf Aggressive", "Attention. The lot is already putting pressure on the account."],
      formiga: ["Ant", "High risk. A few wrong trades can cause a large loss."],
      formigaAggressive: ["Ant Aggressive", "Very high risk. The account becomes vulnerable."],
      megaAggressive: ["Mega Aggressive", "Extremely high exposure. It can double or break the account quickly."],
      ultraAggressive: ["Ultra Aggressive", "Critical zone. The lot is incompatible with capital preservation."],
    },
    referenceEyebrow: "Reference",
    referenceTitle: "Lot impact table",
    referenceText: "The table uses the simplified 100-pip calculation to compare how the same lot changes impact according to capital.",
    comparisonEyebrow: "Comparison",
    comparisonTitle: "The same lot changes according to account size",
    comparisonText: "A lot is not conservative or aggressive by itself. It depends on account size.",
    comparisonCards: [
      ["Small account", "With little capital, the lot must be smaller to avoid compromising the account."],
      ["Medium account", "Allows more flexibility, but still requires control."],
      ["Larger account", "Allows larger lots without compromising as much of the capital percentage."],
    ],
    levelsEyebrow: "Ant • Wolf • Eagle",
    levelsTitle: "How each level understands lot size",
    levels: [
      ["Ant", "The Ant often looks only at possible profit and ignores the impact of an adverse move.", "border-fall/[0.38] text-fall"],
      ["Wolf", "The Wolf calculates before trading and understands that lot size must respect account, stop and total risk.", "border-gold/[0.42] text-gold"],
      ["Eagle", "The Eagle prioritizes survival, capital preservation and longevity in the market.", "border-rise/[0.34] text-rise"],
    ],
    brokerEyebrow: "Forex Account",
    brokerTitle: "Open your account and access the Forex market.",
    brokerText: "To apply lot management in practice, you need to trade in your own broker account.",
    brokerCardTitle: "Forex Broker",
    brokerCardText: "Click the button or banner below to access the broker in the correct language.",
    ctaEyebrow: "Lot and risk",
    ctaTitle: "Learn to trade with controlled lot size and risk.",
    ctaText: "At Varejo Investidor, you learn to protect capital, calculate lot size, understand pips and evolve through Ant, Wolf and Eagle.",
    freeButton: "Enter Formiga Channel",
    signalsButton: "Receive signals on WhatsApp",
    disclaimer: "This tool is educational and uses a simplified pip-value rule. The real value may vary according to asset, broker, account type, account currency and market conditions. Trading Forex, crypto, indices and other assets involves risk and may result in losses.",
    pips: "pips",
  },
  es: {} as LotCopy,
  hi: {} as LotCopy,
  ar: {} as LotCopy,
  tr: {} as LotCopy,
  id: {} as LotCopy,
  vi: {} as LotCopy,
};

copy.es = {
  ...copy.en,
  lang: "es",
  eyebrow: "Herramienta Forex",
  h1: "Elija el lote correcto para su cuenta Forex.",
  h2: "Comprenda cuánto representa cada movimiento de 100 pips en su capital y descubra qué lote se adapta mejor a su cuenta.",
  form: { capital: "Capital depositado en el broker", capitalHelp: "Ejemplo: 500, 1000, 2000 o 5000.", lot: "Lote deseado", lotHelp: "Ejemplo: 0.01, 0.02, 0.05 o 0.10.", pips: "Base de cálculo en pips", pipsHelp: "Estándar fijo para comparar el impacto del lote.", currency: "Moneda de la cuenta", currencyHelp: "Elija la moneda usada para mostrar resultados.", button: "Calcular lote" },
  introEyebrow: "Antes de operar",
  introTitle: "Antes de abrir una operación, entienda el lote.",
  introParagraphs: ["En Forex, el lote define el tamaño de su operación.", "Cuanto mayor sea el lote, mayor será la ganancia o la pérdida en cada movimiento del mercado.", "El lote debe respetar el tamaño de la cuenta y el riesgo total."],
  beginnerCards: [["Capital depositado", "El valor que posee en el broker."], ["Tamaño del lote", "El volumen de la operación."], ["Movimiento de 100 pips", "Muestra el impacto de cada 100 pips."], ["Clasificación del riesgo", "Indica si el lote es conservador, moderado, agresivo o crítico."]],
  resultEyebrow: "Resultado de la herramienta",
  labels: { ...copy.en.labels, pipValue: "Valor por pip", result100: "Resultado en 100 pips", impact: "Impacto en la cuenta", pipsToDouble: "Pips para duplicar", pipsToZero: "Pips para llegar a cero", classification: "Clasificación", table: ["Capital", "Lote", "Valor por pip", "Resultado en 100 pips", "Impacto", "Pips para duplicar o llegar a cero", "Clasificación"] },
  profiles: {
    harpiaConservative: ["Águila Conservador", "Este lote preserva fuertemente el capital."],
    harpia: ["Águila", "Riesgo controlado con más calma operativa."],
    loboConservative: ["Lobo Conservador", "Lote equilibrado para crecer con control."],
    lobo: ["Lobo", "Riesgo moderado con impacto mayor en errores."],
    loboAggressive: ["Lobo Agresivo", "El lote ya presiona la cuenta."],
    formiga: ["Hormiga", "Riesgo alto. Pocas operaciones erradas pueden generar gran pérdida."],
    formigaAggressive: ["Hormiga Agresivo", "Riesgo muy alto. La cuenta queda vulnerable."],
    megaAggressive: ["Mega Agresivo", "Exposición extremadamente alta."],
    ultraAggressive: ["Ultra Agresivo", "Zona crítica e incompatible con preservación."],
  },
  levelsEyebrow: "Hormiga • Lobo • Águila",
  levelsTitle: "Cómo cada nivel entiende el lote",
  levels: [["Hormiga", "Mira el posible lucro e ignora el impacto del movimiento contrario.", "border-fall/[0.38] text-fall"], ["Lobo", "Calcula antes de operar y respeta cuenta, stop y riesgo.", "border-gold/[0.42] text-gold"], ["Águila", "Prioriza supervivencia y preservación de capital.", "border-rise/[0.34] text-rise"]],
  freeButton: "Entrar al Canal Formiga",
  signalsButton: "Recibir señales por WhatsApp",
  disclaimer: "Esta herramienta es educativa y usa una regla simplificada de valor por pip. Operar Forex, cripto, índices y otros activos implica riesgo.",
};

copy.hi = {
  ...copy.en,
  lang: "hi",
  eyebrow: "Forex टूल",
  h1: "अपने Forex खाते के लिए सही lot size चुनें।",
  h2: "समझें कि हर 100 pips की चाल आपके capital पर कितना प्रभाव डालती है और कौन सा lot size आपके खाते के लिए उपयुक्त है।",
  form: { capital: "ब्रोकर में जमा पूंजी", capitalHelp: "उदाहरण: 500, 1000, 2000 या 5000.", lot: "वांछित lot size", lotHelp: "उदाहरण: 0.01, 0.02, 0.05 या 0.10.", pips: "pips में गणना आधार", pipsHelp: "लॉट के प्रभाव की तुलना के लिए निश्चित आधार।", currency: "खाता मुद्रा", currencyHelp: "परिणाम दिखाने के लिए मुद्रा चुनें।", button: "Lot की गणना करें" },
  introEyebrow: "ट्रेड से पहले",
  introTitle: "ट्रेड खोलने से पहले lot को समझें।",
  introParagraphs: ["Forex में lot आपके trade का आकार तय करता है।", "Lot जितना बड़ा होगा, हर बाजार चाल पर gain या loss उतना बड़ा होगा।", "बड़ा lot खाते को गलतियों के लिए कम जगह देता है।"],
  beginnerCards: [["जमा पूंजी", "ब्रोकर में मौजूद राशि।"], ["Lot size", "ऑपरेशन का वॉल्यूम।"], ["100 pips की चाल", "हर 100 pips का प्रभाव दिखाता है।"], ["जोखिम वर्गीकरण", "बताता है कि lot conservative, moderate, aggressive या critical है।"]],
  resultEyebrow: "टूल परिणाम",
  labels: { ...copy.en.labels, pipValue: "प्रति पिप मूल्य", result100: "100 pips में परिणाम", impact: "खाते पर प्रभाव", pipsToDouble: "दोगुना करने के pips", pipsToZero: "शून्य तक pips", classification: "वर्गीकरण", table: ["Capital", "Lot", "प्रति pip मूल्य", "100 pips परिणाम", "प्रभाव", "दोगुना या शून्य pips", "वर्गीकरण"] },
  profiles: {
    harpiaConservative: ["गरुड़ Conservador", "यह lot capital को मजबूत रूप से सुरक्षित रखता है।"],
    harpia: ["गरुड़", "नियंत्रित जोखिम और अधिक शांति।"],
    loboConservative: ["भेड़िया Conservador", "नियंत्रण के साथ विकास के लिए संतुलित lot."],
    lobo: ["भेड़िया", "मध्यम जोखिम। गलती का प्रभाव भी बढ़ता है।"],
    loboAggressive: ["भेड़िया Aggressive", "Lot खाते पर दबाव डालना शुरू करता है।"],
    formiga: ["चींटी", "उच्च जोखिम। कुछ गलत trades बड़ा नुकसान दे सकते हैं।"],
    formigaAggressive: ["चींटी Aggressive", "बहुत उच्च जोखिम। खाता vulnerable होता है।"],
    megaAggressive: ["Mega Aggressive", "बेहद उच्च exposure."],
    ultraAggressive: ["Ultra Aggressive", "Critical zone. Capital preservation के विपरीत।"],
  },
  levelsEyebrow: "चींटी • भेड़िया • गरुड़",
  levelsTitle: "हर स्तर lot size को कैसे समझता है",
  levels: [["चींटी", "सिर्फ संभावित profit देखती है।", "border-fall/[0.38] text-fall"], ["भेड़िया", "ट्रेड से पहले calculate करता है।", "border-gold/[0.42] text-gold"], ["गरुड़", "survival और capital preservation को प्राथमिकता देता है।", "border-rise/[0.34] text-rise"]],
  freeButton: "Formiga चैनल में प्रवेश करें",
  signalsButton: "WhatsApp पर सिग्नल प्राप्त करें",
  disclaimer: "यह टूल शैक्षिक है और pip value का सरल नियम उपयोग करता है। Forex, crypto, indices और अन्य assets में जोखिम होता है।",
};

copy.ar = {
  ...copy.en,
  lang: "ar",
  eyebrow: "أداة الفوركس",
  h1: "اختر حجم العقد الصحيح لحساب الفوركس الخاص بك.",
  h2: "افهم ما تمثله كل حركة قدرها 100 نقطة في رأس مالك واعرف حجم العقد الأنسب لحسابك.",
  form: { capital: "رأس المال المودع لدى الوسيط", capitalHelp: "مثال: 500 أو 1000 أو 2000 أو 5000.", lot: "حجم العقد المطلوب", lotHelp: "مثال: 0.01 أو 0.02 أو 0.05 أو 0.10.", pips: "أساس الحساب بالنقاط", pipsHelp: "معيار ثابت لمقارنة تأثير العقد.", currency: "عملة الحساب", currencyHelp: "اختر العملة المستخدمة لعرض النتائج.", button: "احسب العقد" },
  introEyebrow: "قبل التداول",
  introTitle: "قبل فتح صفقة، افهم حجم العقد.",
  introParagraphs: ["في الفوركس، يحدد العقد حجم الصفقة.", "كلما كان العقد أكبر، زاد الربح أو الخسارة مع كل حركة.", "يجب أن يحترم العقد حجم الحساب والمخاطرة."],
  resultEyebrow: "نتيجة الأداة",
  labels: { ...copy.en.labels, pipValue: "قيمة النقطة", result100: "النتيجة في 100 نقطة", impact: "تأثير الحساب", pipsToDouble: "نقاط لمضاعفة الحساب", pipsToZero: "نقاط للوصول إلى الصفر", classification: "التصنيف" },
  freeButton: "ادخل قناة Formiga",
  signalsButton: "استقبل الإشارات على WhatsApp",
  disclaimer: "هذه الأداة تعليمية وتستخدم قاعدة مبسطة لقيمة النقطة. التداول ينطوي على مخاطر.",
};

copy.tr = {
  ...copy.en,
  lang: "tr",
  eyebrow: "Forex Aracı",
  h1: "Forex hesabınız için doğru lot büyüklüğünü seçin.",
  h2: "Her 100 pip hareketinin sermayenizde ne ifade ettiğini anlayın ve hesabınıza en uygun lotu bulun.",
  form: { capital: "Aracı kuruma yatırılan sermaye", capitalHelp: "Örnek: 500, 1000, 2000 veya 5000.", lot: "İstenen lot", lotHelp: "Örnek: 0.01, 0.02, 0.05 veya 0.10.", pips: "Pip bazlı hesaplama", pipsHelp: "Lot etkisini karşılaştırmak için sabit standart.", currency: "Hesap para birimi", currencyHelp: "Sonuçları göstermek için para birimini seçin.", button: "Lotu hesapla" },
  introEyebrow: "İşlemden önce",
  introTitle: "İşlem açmadan önce lotu anlayın.",
  resultEyebrow: "Araç sonucu",
  labels: { ...copy.en.labels, pipValue: "Pip değeri", result100: "100 pip sonucu", impact: "Hesap etkisi", pipsToDouble: "İkiye katlamak için pip", pipsToZero: "Sıfıra inmek için pip", classification: "Sınıflandırma" },
  freeButton: "Formiga Kanalına Gir",
  signalsButton: "WhatsApp sinyalleri al",
  disclaimer: "Bu araç eğitim amaçlıdır ve basitleştirilmiş pip değeri kuralı kullanır. Trading risk içerir.",
};

copy.id = {
  ...copy.en,
  lang: "id",
  eyebrow: "Alat Forex",
  h1: "Pilih ukuran lot yang tepat untuk akun Forex Anda.",
  h2: "Pahami dampak setiap pergerakan 100 pip terhadap modal Anda dan temukan ukuran lot yang paling sesuai.",
  form: { capital: "Modal yang disetor di broker", capitalHelp: "Contoh: 500, 1000, 2000 atau 5000.", lot: "Ukuran lot yang diinginkan", lotHelp: "Contoh: 0.01, 0.02, 0.05 atau 0.10.", pips: "Dasar perhitungan pip", pipsHelp: "Standar tetap untuk membandingkan dampak lot.", currency: "Mata uang akun", currencyHelp: "Pilih mata uang untuk menampilkan hasil.", button: "Hitung lot" },
  introEyebrow: "Sebelum trading",
  introTitle: "Sebelum membuka posisi, pahami lot.",
  resultEyebrow: "Hasil alat",
  labels: { ...copy.en.labels, pipValue: "Nilai per pip", result100: "Hasil dalam 100 pip", impact: "Dampak pada akun", pipsToDouble: "Pip untuk menggandakan", pipsToZero: "Pip menuju nol", classification: "Klasifikasi" },
  freeButton: "Masuk ke Channel Formiga",
  signalsButton: "Terima sinyal di WhatsApp",
  disclaimer: "Alat ini bersifat edukatif dan menggunakan aturan nilai pip yang disederhanakan. Trading memiliki risiko kerugian.",
};

copy.vi = {
  ...copy.en,
  lang: "vi",
  eyebrow: "Công Cụ Forex",
  h1: "Chọn khối lượng lot phù hợp cho tài khoản Forex của bạn.",
  h2: "Hiểu mỗi biến động 100 pip ảnh hưởng thế nào đến vốn và chọn khối lượng phù hợp với tài khoản.",
  form: { capital: "Vốn đã nạp vào broker", capitalHelp: "Ví dụ: 500, 1000, 2000 hoặc 5000.", lot: "Khối lượng lot mong muốn", lotHelp: "Ví dụ: 0.01, 0.02, 0.05 hoặc 0.10.", pips: "Cơ sở tính bằng pip", pipsHelp: "Chuẩn cố định để so sánh tác động của lot.", currency: "Tiền tệ tài khoản", currencyHelp: "Chọn tiền tệ để hiển thị kết quả.", button: "Tính lot" },
  introEyebrow: "Trước khi giao dịch",
  introTitle: "Trước khi mở lệnh, hãy hiểu về lot.",
  resultEyebrow: "Kết quả công cụ",
  labels: { ...copy.en.labels, pipValue: "Giá trị mỗi pip", result100: "Kết quả trong 100 pip", impact: "Ảnh hưởng đến tài khoản", pipsToDouble: "Pip để nhân đôi", pipsToZero: "Pip về 0", classification: "Phân loại" },
  freeButton: "Vào Kênh Formiga",
  signalsButton: "Nhận tín hiệu trên WhatsApp",
  disclaimer: "Công cụ này phục vụ mục đích giáo dục và sử dụng quy tắc giá trị pip đơn giản. Giao dịch có rủi ro thua lỗ.",
};

function formatMoney(value: number, currency: Currency, locale: Locale) {
  const intlLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : locale === "tr" ? "tr-TR" : locale === "id" ? "id-ID" : locale === "vi" ? "vi-VN" : "en-US";
  return `${currencySymbols[currency]} ${value.toLocaleString(intlLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(value: number, locale: Locale, digits = 2) {
  const intlLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : locale === "tr" ? "tr-TR" : locale === "id" ? "id-ID" : locale === "vi" ? "vi-VN" : "en-US";
  return value.toLocaleString(intlLocale, { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function formatPips(value: number, c: LotCopy, locale: Locale) {
  const intlLocale = locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : locale === "tr" ? "tr-TR" : locale === "id" ? "id-ID" : locale === "vi" ? "vi-VN" : "en-US";
  return `${Math.round(value).toLocaleString(intlLocale)} ${c.pips}`;
}

function getLotProfile(percent: number): { key: LotProfileKey; tone: Tone } {
  if (percent <= 0.3) return { key: "harpiaConservative", tone: "rise" };
  if (percent <= 0.7) return { key: "harpia", tone: "rise" };
  if (percent <= 1) return { key: "loboConservative", tone: "gold" };
  if (percent <= 2) return { key: "lobo", tone: "gold" };
  if (percent <= 3) return { key: "loboAggressive", tone: "fall" };
  if (percent <= 5) return { key: "formiga", tone: "fall" };
  if (percent <= 10) return { key: "formigaAggressive", tone: "fall" };
  if (percent <= 20) return { key: "megaAggressive", tone: "purple" };
  return { key: "ultraAggressive", tone: "purple" };
}

function calculateLot(capital: number, lot: number) {
  const safeCapital = Math.max(Number(capital) || 0, 0);
  const safeLot = Math.max(Number(lot) || 0, 0);
  const pipValue = safeLot * 10;
  const result100Pips = pipValue * basePips;
  const percent = safeCapital > 0 ? (result100Pips / safeCapital) * 100 : 0;
  const pipsToDouble = pipValue > 0 ? safeCapital / pipValue : 0;
  const pipsToZero = pipValue > 0 ? safeCapital / pipValue : 0;
  const profile = getLotProfile(percent);
  return { safeCapital, safeLot, pipValue, result100Pips, percent, pipsToDouble, pipsToZero, profile };
}

function profileClasses(tone: Tone) {
  if (tone === "rise") return "border-rise/[0.38] text-rise shadow-[0_0_34px_rgba(15,143,86,0.12)]";
  if (tone === "gold") return "border-gold/[0.42] text-gold shadow-[0_0_34px_rgba(184,137,45,0.14)]";
  if (tone === "fall") return "border-fall/[0.42] text-fall shadow-[0_0_34px_rgba(199,47,47,0.12)]";
  return "border-purple-500/40 text-purple-300 shadow-[0_0_34px_rgba(126,87,194,0.16)]";
}

function profileBorderColor(tone: Tone) {
  if (tone === "rise") return "#00C26E";
  if (tone === "gold") return "#D4A63A";
  if (tone === "fall") return "#FF4D4D";
  return "#8B0000";
}

export default function CorrectForexLotPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const c = copy[locale] ?? copy.en;
  const [capital, setCapital] = useState(500);
  const [lot, setLot] = useState(0.01);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [submitted, setSubmitted] = useState(true);
  const result = useMemo(() => calculateLot(capital, lot), [capital, lot]);
  const referenceData = referenceRows.map((row) => ({ ...row, ...calculateLot(row.capital, row.lot) }));
  const profileText = c.profiles[result.profile.key];
  const resultCards = [
    { label: c.labels.pipValue, value: `${formatMoney(result.pipValue, currency, locale)} ${c.pips}` },
    { label: c.labels.result100, value: formatMoney(result.result100Pips, currency, locale) },
    { label: c.labels.impact, value: `${formatNumber(result.percent, locale)}%` },
    { label: c.labels.pipsToDouble, value: formatPips(result.pipsToDouble, c, locale) },
    { label: c.labels.pipsToZero, value: formatPips(result.pipsToZero, c, locale) },
    { label: c.labels.classification, value: profileText[0], featured: true },
  ];

  return (
    <main lang={c.lang} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />
      <section className="premium-stage relative px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.06em] md:text-7xl">{c.h1}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.72] md:text-xl md:leading-9">{c.h2}</p>
          </motion.div>
          <motion.form initial="hidden" animate="visible" variants={fadeUp} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="terminal-module border border-gold/[0.22] bg-white p-5 shadow-fine md:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [c.form.capital, c.form.capitalHelp, capital, (value: number) => setCapital(value), "0.01"],
                [c.form.lot, c.form.lotHelp, lot, (value: number) => setLot(value), "0.01"],
              ].map(([label, help, value, setter, step]) => (
                <label key={String(label)} className="block">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">{String(label)}</span>
                  <span className="mt-2 block text-sm leading-6 text-paper/[0.78]">{String(help)}</span>
                  <input type="number" min="0" step={String(step)} value={Number(value)} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold" />
                </label>
              ))}
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">{c.form.pips}</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.78]">{c.form.pipsHelp}</span>
                <input type="text" value={`${basePips} ${c.pips}`} readOnly className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none" />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">{c.form.currency}</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.78]">{c.form.currencyHelp}</span>
                <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold">
                  <option value="USD">USD</option>
                  <option value="BRL">BRL</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>
            </div>
            <button type="submit" className="premium-button-gold mt-6 w-full border border-gold bg-gold px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">{c.form.button}</button>
          </motion.form>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.introEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.introTitle}</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-ink/[0.7]">{c.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {c.beginnerCards.map(([title, text], index) => (
              <motion.article key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="terminal-module border border-gold/[0.18] bg-paper p-5 shadow-fine">
                <span className="font-mono text-xs font-black text-gold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-2xl tracking-[-0.04em] text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/[0.66]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="px-5 py-14 md:px-8 md:py-18">
          <div className="mx-auto max-w-7xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`terminal-module border bg-white p-6 shadow-fine md:p-8 ${profileClasses(result.profile.tone)}`}>
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.resultEyebrow}</p>
                  <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] text-ink md:text-6xl">{profileText[0]}</h2>
                  <p className="mt-5 leading-8 text-ink/[0.66]">{profileText[1]}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resultCards.map((card) => (
                    <div key={card.label} className="border p-4" style={{ background: "rgba(255,255,255,0.02)", borderColor: card.featured ? profileBorderColor(result.profile.tone) : "rgba(212,166,58,0.15)" }}>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "#D4A63A" }}>{card.label}</p>
                      <p className="mt-3 font-mono text-xl" style={{ color: "#FFFFFF", fontWeight: 700, textShadow: "0 0 8px rgba(255,255,255,0.15)" }}>{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.referenceEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.referenceTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/[0.68]">{c.referenceText}</p>
          <div className="mt-8 overflow-x-auto border border-ink/[0.08]">
            <table className="min-w-[920px] w-full border-collapse bg-paper text-left text-sm">
              <thead><tr className="border-b border-ink/[0.08] bg-white">{c.labels.table.map((header) => <th key={header} className="px-4 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{header}</th>)}</tr></thead>
              <tbody>
                {referenceData.map((row) => {
                  const refProfile = c.profiles[row.profile.key];
                  return (
                    <tr key={`${row.capital}-${row.lot}`} className="border-b border-ink/[0.06] transition hover:bg-white">
                      <td className="px-4 py-4 font-mono font-bold text-ink">{formatMoney(row.capital, "USD", locale)}</td>
                      <td className="px-4 py-4 font-mono font-bold text-ink">{row.lot.toFixed(2)}</td>
                      <td className="px-4 py-4 font-mono text-ink/[0.72]">{formatMoney(row.pipValue, "USD", locale)}</td>
                      <td className="px-4 py-4 font-mono text-ink/[0.72]">{formatMoney(row.result100Pips, "USD", locale)}</td>
                      <td className="px-4 py-4 font-mono font-bold text-ink">{formatNumber(row.percent, locale)}%</td>
                      <td className="px-4 py-4 font-mono text-ink/[0.72]">{formatPips(row.pipsToDouble, c, locale)}</td>
                      <td className={`px-4 py-4 font-bold ${profileClasses(row.profile.tone).split(" ")[1]}`}>{refProfile[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.comparisonEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.comparisonTitle}</h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-ink/[0.68]">{c.comparisonText}</p>
          </div>
          {c.comparisonCards.map(([title, text]) => (
            <article key={title} className="terminal-module border border-gold/[0.18] bg-white p-6 shadow-fine">
              <h3 className="font-serif text-3xl tracking-[-0.04em] text-ink">{title}</h3>
              <p className="mt-4 leading-7 text-ink/[0.66]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.levelsEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.levelsTitle}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {c.levels.map(([title, text, tone]) => (
              <article key={title} className={`terminal-module border bg-paper p-6 shadow-fine ${tone}`}>
                <h3 className="font-serif text-3xl tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 leading-7 text-ink/[0.66]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.brokerEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.brokerTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/[0.68]">{c.brokerText}</p>
          </div>
          <div className="terminal-module border border-gold/[0.22] bg-white p-6 shadow-fine">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">FXPro</p>
            <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-ink">{c.brokerCardTitle}</h3>
            <p className="mt-4 leading-7 text-ink/[0.66]">{c.brokerCardText}</p>
            <a href={fxproLinks[locale]} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-6 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 md:w-auto">{fxproButtonLabels[locale]}</a>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <section className="px-5 py-14 md:px-8 md:py-18">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative mx-auto max-w-7xl overflow-hidden border border-gold/[0.24] bg-white p-6 shadow-fine md:p-10">
          <div className="absolute inset-0 terminal-grid opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.ctaEyebrow}</p>
              <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">{c.ctaTitle}</h2>
              <p className="mt-5 max-w-3xl leading-8 text-ink/[0.66]">{c.ctaText}</p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-[320px]">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">{c.freeButton}</a>
              <a href={signalsPath[locale]} className="border border-ink/[0.18] bg-paper px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">{c.signalsButton}</a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-10 md:px-8 md:pb-12">
        <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white p-5 shadow-fine">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gold">Disclaimer</p>
          <p className="mt-3 text-sm leading-7 text-ink/[0.62]">{c.disclaimer}</p>
        </div>
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
