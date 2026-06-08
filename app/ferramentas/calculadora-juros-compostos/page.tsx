"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../../src/components/SiteSections";
import { fxproButtonLabels, fxproLinks } from "../../../src/data/fxproLinks";
import type { Locale } from "../../../src/i18n";

type Currency = "BRL" | "USD" | "EUR" | "GBP" | "INR" | "TRY" | "IDR" | "VND" | "THB" | "RUB" | "PKR" | "BDT" | "JPY" | "KRW";
type WealthLevel = "formiga" | "lobo" | "harpia";
type ChartMode = "line" | "bar";
type RetirementStrategy = "income" | "drawdown";

type CompoundCopy = {
  lang: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  form: {
    initial: string;
    monthly: string;
    annualReturn: string;
    years: string;
    currency: string;
    dollarRate: string;
    dollarHelp: string;
    button: string;
  };
  results: {
    title: string;
    totalContributed: string;
    simpleFinal: string;
    compoundFinal: string;
    difference: string;
    usdFinal: string;
    totalYears: string;
    annualReturn: string;
    level: string;
  };
  how: {
    title: string;
    text: string;
    simpleTitle: string;
    simpleText: string;
    compoundTitle: string;
    compoundText: string;
    cards: [string, string][];
  };
  levelsTitle: string;
  levels: Record<WealthLevel, { name: string; text: string; pillars: string[] }>;
  chartTitle: string;
  tableTitle: string;
  tableHeaders: string[];
  globalAccountTitle: string;
  globalAccountText: string;
  fxpro: string;
  binance: string;
  ctaTitle: string;
  ctaText: string;
  formigaButton: string;
  educationButton: string;
  disclaimer: string;
};

const symbols: Record<Currency, string> = {
  BRL: "R$",
  USD: "US$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  TRY: "₺",
  IDR: "Rp",
  VND: "₫",
  THB: "฿",
  RUB: "₽",
  PKR: "Rs",
  BDT: "৳",
  JPY: "¥",
  KRW: "₩",
};

const currencyOptions: Currency[] = ["BRL", "USD", "EUR", "GBP", "INR", "TRY", "IDR", "VND", "THB", "RUB", "PKR", "BDT", "JPY", "KRW"];

const defaultCurrencyByLocale: Record<Locale, Currency> = {
  pt: "BRL",
  en: "USD",
  es: "USD",
  fr: "EUR",
  hi: "INR",
  ar: "USD",
  tr: "TRY",
  id: "IDR",
  vi: "VND",
  th: "THB",
  ru: "RUB",
  ur: "PKR",
  bn: "BDT",
  ja: "JPY",
  ko: "KRW",
};

const usdRateByCurrency: Record<Currency, number> = {
  BRL: 5.17,
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83,
  TRY: 32,
  IDR: 16000,
  VND: 25000,
  THB: 36,
  RUB: 90,
  PKR: 278,
  BDT: 117,
  JPY: 155,
  KRW: 1370,
};

const binanceLink = "https://accounts.binance.com/register?ref=453580362";

const baseCopy: CompoundCopy = {
  lang: "pt-BR",
  eyebrow: "Ferramenta educacional",
  title: "Calculadora de Juros e Construção de Patrimônio",
  subtitle: "Compare juros simples e compostos, simule aportes mensais e veja sua evolução patrimonial em moeda local e em dólar.",
  form: {
    initial: "Aporte inicial",
    monthly: "Aporte mensal",
    annualReturn: "Rentabilidade anual",
    years: "Quantidade de anos",
    currency: "Moeda base",
    dollarRate: "Cotação atual do dólar",
    dollarHelp: "A cotação pode ser preenchida manualmente caso a atualização automática não esteja disponível.",
    button: "Calcular patrimônio",
  },
  results: {
    title: "Resultado da simulação",
    totalContributed: "Total aportado",
    simpleFinal: "Valor final em juros simples",
    compoundFinal: "Valor final em juros compostos",
    difference: "Diferença entre simples e composto",
    usdFinal: "Valor final em dólar",
    totalYears: "Tempo total",
    annualReturn: "Rentabilidade anual usada",
    level: "Nível patrimonial alcançado",
  },
  how: {
    title: "Como usar esta calculadora",
    text: "Esta ferramenta mostra como o dinheiro pode crescer ao longo do tempo. Informe quanto já possui, quanto pretende investir por mês, qual rentabilidade anual espera alcançar e por quantos anos pretende manter esse plano.",
    simpleTitle: "Juros simples",
    simpleText: "O rendimento é calculado apenas sobre o valor inicial. É uma simulação mais linear e limitada.",
    compoundTitle: "Juros compostos",
    compoundText: "O rendimento cresce sobre o valor inicial, sobre os aportes e também sobre os rendimentos acumulados. Por isso acelera o patrimônio no longo prazo.",
    cards: [
      ["Aporte inicial", "Valor que você já possui para começar: dinheiro parado, capital investido ou saldo inicial da carteira."],
      ["Aporte mensal", "Valor que você consegue investir todos os meses. A constância dos aportes é essencial na construção patrimonial."],
      ["Rentabilidade anual", "Percentual esperado de crescimento ao ano. Pode variar conforme ativo, mercado e risco assumido."],
      ["Tempo", "Quanto maior o prazo, maior o efeito dos juros compostos. O tempo transforma disciplina em patrimônio."],
      ["Dólar do dia", "A conversão para dólar ajuda a comparar seu patrimônio em nível global, independentemente da moeda local."],
    ],
  },
  levelsTitle: "Como os níveis enxergam a construção de patrimônio",
  levels: {
    formiga: {
      name: "Formiga",
      text: "A Formiga está construindo a base. O foco é organizar renda, evitar dívidas ruins, criar reserva, aprender sobre investimentos e manter aportes constantes.",
      pillars: ["Organização financeira", "Reserva de emergência", "Aporte mensal", "Educação financeira", "Primeiros investimentos"],
    },
    lobo: {
      name: "Lobo",
      text: "O Lobo já constrói com método. Entende que patrimônio exige estratégia, diversificação, gestão de risco e exposição aos mercados globais.",
      pillars: ["Diversificação", "Gestão de risco", "Ativos internacionais", "Renda passiva", "Planejamento de longo prazo"],
    },
    harpia: {
      name: "Harpia",
      text: "A Harpia pensa em décadas. O foco é proteção patrimonial, estruturas globais, sucessão, eficiência fiscal e preservação de capital.",
      pillars: ["Proteção de patrimônio", "Estrutura global", "Sucessão", "Moedas fortes", "Legado"],
    },
  },
  chartTitle: "Evolução patrimonial ao longo dos anos",
  tableTitle: "Tabela anual",
  tableHeaders: ["Ano", "Total aportado", "Juros simples", "Juros compostos", "Valor em dólar", "Nível"],
  globalAccountTitle: "Abra sua conta e acesse os mercados globais.",
  globalAccountText: "Para construir patrimônio além da moeda local, você pode acompanhar Forex, ouro, petróleo, índices, ações, ETFs e criptomoedas através das plataformas parceiras do Varejo Investidor.",
  fxpro: "Abrir conta FXPro",
  binance: "Abrir conta Binance",
  ctaTitle: "Construa patrimônio com visão global.",
  ctaText: "Use a calculadora para visualizar o caminho. Depois, entre no Canal Formiga para receber análises econômicas, conteúdos educacionais e atualizações sobre os mercados globais.",
  formigaButton: "Entrar no Canal Formiga",
  educationButton: "Conhecer Educação",
  disclaimer: "Esta ferramenta possui finalidade educacional e apresenta apenas simulações matemáticas. Rentabilidades, inflação e câmbio futuros não são garantidos. Os resultados podem variar conforme impostos, taxas, inflação, moeda, ativos escolhidos, comportamento do investidor e condições de mercado. Cada usuário é responsável por suas próprias decisões financeiras.",
};

const copyByLocale: Record<Locale, CompoundCopy> = {
  pt: baseCopy,
  en: {
    ...baseCopy,
    lang: "en",
    eyebrow: "Educational tool",
    title: "Compound Interest and Wealth Building Calculator",
    subtitle: "Compare simple and compound interest, simulate monthly contributions and view your wealth path in local currency and dollars.",
    form: { initial: "Initial contribution", monthly: "Monthly contribution", annualReturn: "Annual return", years: "Number of years", currency: "Base currency", dollarRate: "Current dollar rate", dollarHelp: "Use the manual field if automatic quotation is unavailable.", button: "Calculate wealth" },
    results: { title: "Simulation results", totalContributed: "Total contributed", simpleFinal: "Final value with simple interest", compoundFinal: "Final value with compound interest", difference: "Difference between simple and compound", usdFinal: "Final value in dollars", totalYears: "Total time", annualReturn: "Annual return used", level: "Wealth level reached" },
    how: { ...baseCopy.how, title: "How to use this calculator", text: "This tool shows how money can grow over time. Enter what you already have, how much you plan to invest monthly, the expected annual return and the time horizon.", simpleTitle: "Simple interest", simpleText: "Return is calculated only on the initial amount.", compoundTitle: "Compound interest", compoundText: "Return grows on the initial amount, contributions and accumulated returns.", cards: [["Initial contribution", "The money you already have available to start."], ["Monthly contribution", "The amount you can invest every month."], ["Annual return", "Expected annual growth percentage."], ["Time", "The longer the period, the stronger the compound effect."], ["Dollar rate", "The dollar conversion helps compare wealth globally."]] },
    levelsTitle: "How the levels understand wealth building",
    chartTitle: "Wealth evolution over the years",
    tableTitle: "Annual table",
    tableHeaders: ["Year", "Total contributed", "Simple interest", "Compound interest", "Dollar value", "Level"],
    globalAccountTitle: "Open your account and access global markets.",
    globalAccountText: "Follow Forex, gold, oil, indices, stocks, ETFs and crypto through Varejo Investidor partner platforms.",
    fxpro: "Open FXPro account",
    binance: "Open Binance account",
    ctaTitle: "Start building wealth on a global level.",
    ctaText: "Use the calculator to visualize the path. Then join the Formiga Channel for economic analysis, education and global market updates.",
    formigaButton: "Join Formiga Channel",
    educationButton: "Explore Education",
    disclaimer: "This tool is educational and provides only mathematical simulations. Future returns, inflation and exchange rates are not guaranteed. Results may vary due to taxes, fees, inflation, currency, selected assets, investor behavior and market conditions. Each user is responsible for their own financial decisions.",
  },
  es: {
    ...baseCopy,
    lang: "es",
    eyebrow: "Herramienta educativa",
    title: "Calculadora de Interés Compuesto y Construcción Patrimonial",
    subtitle: "Compara interés simple y compuesto, simula aportes mensuales y visualiza tu evolución patrimonial en moneda local y dólares.",
    form: { initial: "Aporte inicial", monthly: "Aporte mensual", annualReturn: "Rentabilidad anual", years: "Cantidad de años", currency: "Moneda base", dollarRate: "Cotización actual del dólar", dollarHelp: "Puedes completar la cotización manualmente si no está disponible automáticamente.", button: "Calcular patrimonio" },
    results: { title: "Resultado de la simulación", totalContributed: "Total aportado", simpleFinal: "Valor final con interés simple", compoundFinal: "Valor final con interés compuesto", difference: "Diferencia entre simple y compuesto", usdFinal: "Valor final en dólares", totalYears: "Tiempo total", annualReturn: "Rentabilidad anual usada", level: "Nivel patrimonial alcanzado" },
    how: { ...baseCopy.how, title: "Cómo usar esta calculadora", text: "Esta herramienta muestra cómo el dinero puede crecer con el tiempo. Informa cuánto tienes, cuánto invertirás por mes, la rentabilidad anual esperada y el plazo.", simpleTitle: "Interés simple", simpleText: "El rendimiento se calcula solo sobre el valor inicial.", compoundTitle: "Interés compuesto", compoundText: "El rendimiento crece sobre el valor inicial, los aportes y los rendimientos acumulados.", cards: [["Aporte inicial", "Valor disponible para comenzar."], ["Aporte mensual", "Valor que puedes invertir cada mes."], ["Rentabilidad anual", "Porcentaje esperado de crecimiento anual."], ["Tiempo", "Cuanto mayor el plazo, mayor el efecto compuesto."], ["Dólar del día", "Ayuda a comparar el patrimonio a nivel global."]] },
    levelsTitle: "Cómo los niveles ven la construcción patrimonial",
    chartTitle: "Evolución patrimonial a lo largo de los años",
    tableTitle: "Tabla anual",
    tableHeaders: ["Año", "Total aportado", "Interés simple", "Interés compuesto", "Valor en dólar", "Nivel"],
    globalAccountTitle: "Abre tu cuenta y accede a los mercados globales.",
    globalAccountText: "Acompaña Forex, oro, petróleo, índices, acciones, ETFs y criptomonedas a través de las plataformas asociadas.",
    fxpro: "Abrir cuenta FXPro",
    binance: "Abrir cuenta Binance",
    ctaTitle: "Comienza tu construcción patrimonial global.",
    ctaText: "Usa la calculadora para visualizar el camino. Después entra al Canal Formiga para recibir análisis económicos y educación financiera.",
    formigaButton: "Entrar al Canal Formiga",
    educationButton: "Conocer Educación",
    disclaimer: "Esta calculadora tiene finalidad educativa y presenta solo una simulación matemática. Las rentabilidades futuras no están garantizadas.",
  },
  fr: {
    ...baseCopy,
    lang: "fr",
    eyebrow: "Outil éducatif",
    title: "Calculateur d'intérêts composés et de construction patrimoniale",
    subtitle: "Comparez intérêts simples et composés, simulez vos apports mensuels et visualisez votre patrimoine en monnaie locale et en dollars.",
    form: { initial: "Apport initial", monthly: "Apport mensuel", annualReturn: "Rendement annuel", years: "Nombre d'années", currency: "Devise de base", dollarRate: "Cours actuel du dollar", dollarHelp: "Saisissez manuellement le cours si la mise à jour automatique n'est pas disponible.", button: "Calculer le patrimoine" },
    results: { title: "Résultat de la simulation", totalContributed: "Total investi", simpleFinal: "Valeur finale en intérêts simples", compoundFinal: "Valeur finale en intérêts composés", difference: "Différence", usdFinal: "Valeur finale en dollars", totalYears: "Durée totale", annualReturn: "Rendement annuel utilisé", level: "Niveau patrimonial atteint" },
    how: { ...baseCopy.how, title: "Comment utiliser ce calculateur" },
    tableHeaders: ["Année", "Total investi", "Intérêts simples", "Intérêts composés", "Valeur en dollar", "Niveau"],
    fxpro: "Ouvrir un compte FXPro",
    binance: "Ouvrir un compte Binance",
    formigaButton: "Rejoindre le Canal Formiga",
    educationButton: "Découvrir l'Éducation",
    disclaimer: "Ce calculateur est éducatif et présente uniquement une simulation mathématique. Les rendements futurs ne sont pas garantis.",
  },
  hi: {
    ...baseCopy,
    lang: "hi",
    eyebrow: "शैक्षिक टूल",
    title: "कंपाउंड इंटरेस्ट और वेल्थ बिल्डिंग कैलकुलेटर",
    subtitle: "सिंपल और कंपाउंड इंटरेस्ट की तुलना करें, मासिक निवेश सिमुलेट करें और डॉलर में अपनी संपत्ति की प्रगति देखें।",
    form: { initial: "शुरुआती निवेश", monthly: "मासिक निवेश", annualReturn: "वार्षिक रिटर्न", years: "वर्षों की संख्या", currency: "बेस करेंसी", dollarRate: "आज का डॉलर रेट", dollarHelp: "ऑटो अपडेट उपलब्ध न हो तो रेट मैनुअली भरें।", button: "संपत्ति की गणना करें" },
    results: { title: "सिमुलेशन परिणाम", totalContributed: "कुल निवेश", simpleFinal: "सिंपल इंटरेस्ट अंतिम मूल्य", compoundFinal: "कंपाउंड इंटरेस्ट अंतिम मूल्य", difference: "अंतर", usdFinal: "डॉलर में अंतिम मूल्य", totalYears: "कुल समय", annualReturn: "उपयोग किया गया वार्षिक रिटर्न", level: "प्राप्त वेल्थ स्तर" },
    tableHeaders: ["वर्ष", "कुल निवेश", "सिंपल", "कंपाउंड", "डॉलर मूल्य", "स्तर"],
    fxpro: "FXPro Account खोलें",
    binance: "Binance Account खोलें",
    formigaButton: "Formiga चैनल में शामिल हों",
    educationButton: "शिक्षा देखें",
    disclaimer: "यह कैलकुलेटर केवल शैक्षिक उद्देश्य के लिए गणितीय सिमुलेशन प्रस्तुत करता है। भविष्य के रिटर्न की गारंटी नहीं है।",
  },
  ar: {
    ...baseCopy,
    lang: "ar",
    eyebrow: "أداة تعليمية",
    title: "حاسبة الفائدة المركبة وبناء الثروة",
    subtitle: "قارن بين الفائدة البسيطة والمركبة، وحاكِ المساهمات الشهرية وشاهد تطور الثروة بالدولار.",
    form: { initial: "المبلغ الأولي", monthly: "المساهمة الشهرية", annualReturn: "العائد السنوي", years: "عدد السنوات", currency: "العملة الأساسية", dollarRate: "سعر الدولار الحالي", dollarHelp: "يمكن إدخال السعر يدويا إذا لم يتوفر التحديث التلقائي.", button: "احسب الثروة" },
    results: { title: "نتيجة المحاكاة", totalContributed: "إجمالي المساهمات", simpleFinal: "القيمة بالفائدة البسيطة", compoundFinal: "القيمة بالفائدة المركبة", difference: "الفرق", usdFinal: "القيمة بالدولار", totalYears: "المدة", annualReturn: "العائد المستخدم", level: "المستوى المحقق" },
    tableHeaders: ["السنة", "المساهمات", "بسيطة", "مركبة", "بالدولار", "المستوى"],
    fxpro: "فتح حساب FXPro",
    binance: "فتح حساب Binance",
    formigaButton: "الدخول إلى قناة Formiga",
    educationButton: "معرفة التعليم",
    disclaimer: "هذه الحاسبة تعليمية وتعرض محاكاة رياضية فقط. العوائد المستقبلية غير مضمونة.",
  },
  tr: {
    ...baseCopy,
    lang: "tr",
    eyebrow: "Eğitim aracı",
    title: "Bileşik Faiz ve Servet Oluşturma Hesaplayıcısı",
    subtitle: "Basit ve bileşik faizi karşılaştırın, aylık katkıları simüle edin ve servet yolculuğunuzu dolar bazında görün.",
    form: { initial: "İlk katkı", monthly: "Aylık katkı", annualReturn: "Yıllık getiri", years: "Yıl sayısı", currency: "Temel para birimi", dollarRate: "Güncel dolar kuru", dollarHelp: "Otomatik güncelleme yoksa kuru manuel girebilirsiniz.", button: "Serveti hesapla" },
    results: { title: "Simülasyon sonucu", totalContributed: "Toplam katkı", simpleFinal: "Basit faiz son değer", compoundFinal: "Bileşik faiz son değer", difference: "Fark", usdFinal: "Dolar karşılığı", totalYears: "Toplam süre", annualReturn: "Kullanılan yıllık getiri", level: "Ulaşılan seviye" },
    tableHeaders: ["Yıl", "Toplam katkı", "Basit faiz", "Bileşik faiz", "Dolar değeri", "Seviye"],
    fxpro: "FXPro Hesabı Aç",
    binance: "Binance Hesabı Aç",
    formigaButton: "Formiga Kanalına Gir",
    educationButton: "Eğitimi İncele",
    disclaimer: "Bu hesaplayıcı eğitim amaçlıdır ve yalnızca matematiksel simülasyon sunar. Gelecekteki getiriler garanti değildir.",
  },
  id: {
    ...baseCopy,
    lang: "id",
    eyebrow: "Alat edukasi",
    title: "Kalkulator Bunga Majemuk dan Pembangunan Kekayaan",
    subtitle: "Bandingkan bunga sederhana dan majemuk, simulasikan investasi bulanan, dan lihat perkembangan kekayaan dalam dolar.",
    form: { initial: "Modal awal", monthly: "Setoran bulanan", annualReturn: "Imbal hasil tahunan", years: "Jumlah tahun", currency: "Mata uang dasar", dollarRate: "Kurs dolar saat ini", dollarHelp: "Isi manual jika kurs otomatis tidak tersedia.", button: "Hitung kekayaan" },
    results: { title: "Hasil simulasi", totalContributed: "Total disetor", simpleFinal: "Nilai akhir bunga sederhana", compoundFinal: "Nilai akhir bunga majemuk", difference: "Selisih", usdFinal: "Nilai akhir dolar", totalYears: "Total waktu", annualReturn: "Imbal hasil digunakan", level: "Level kekayaan" },
    tableHeaders: ["Tahun", "Total setoran", "Sederhana", "Majemuk", "Nilai dolar", "Level"],
    fxpro: "Buka Akun FXPro",
    binance: "Buka Akun Binance",
    formigaButton: "Masuk Kanal Formiga",
    educationButton: "Lihat Edukasi",
    disclaimer: "Kalkulator ini bersifat edukatif dan hanya menampilkan simulasi matematis. Imbal hasil masa depan tidak dijamin.",
  },
  vi: {
    ...baseCopy,
    lang: "vi",
    eyebrow: "Công cụ giáo dục",
    title: "Máy tính Lãi kép và Xây dựng Tài sản",
    subtitle: "So sánh lãi đơn và lãi kép, mô phỏng khoản góp hằng tháng và xem tài sản theo đồng USD.",
    form: { initial: "Vốn ban đầu", monthly: "Góp hằng tháng", annualReturn: "Lợi suất năm", years: "Số năm", currency: "Tiền tệ cơ sở", dollarRate: "Tỷ giá USD hiện tại", dollarHelp: "Nhập thủ công nếu không có cập nhật tự động.", button: "Tính tài sản" },
    results: { title: "Kết quả mô phỏng", totalContributed: "Tổng đã góp", simpleFinal: "Giá trị lãi đơn", compoundFinal: "Giá trị lãi kép", difference: "Chênh lệch", usdFinal: "Giá trị USD", totalYears: "Tổng thời gian", annualReturn: "Lợi suất sử dụng", level: "Cấp độ tài sản" },
    tableHeaders: ["Năm", "Tổng góp", "Lãi đơn", "Lãi kép", "Giá trị USD", "Cấp độ"],
    fxpro: "Mở Tài Khoản FXPro",
    binance: "Mở Tài Khoản Binance",
    formigaButton: "Vào Kênh Formiga",
    educationButton: "Xem Giáo dục",
    disclaimer: "Công cụ này chỉ phục vụ giáo dục và là mô phỏng toán học. Lợi suất tương lai không được đảm bảo.",
  },
  th: {
    ...baseCopy,
    lang: "th",
    eyebrow: "เครื่องมือการศึกษา",
    title: "เครื่องคำนวณดอกเบี้ยทบต้นและการสร้างความมั่งคั่ง",
    subtitle: "เปรียบเทียบดอกเบี้ยธรรมดาและดอกเบี้ยทบต้น พร้อมจำลองเงินลงทุนรายเดือนและมูลค่าเป็นดอลลาร์",
    form: { initial: "เงินตั้งต้น", monthly: "เงินลงทุนรายเดือน", annualReturn: "ผลตอบแทนต่อปี", years: "จำนวนปี", currency: "สกุลเงินหลัก", dollarRate: "อัตราแลกเปลี่ยนดอลลาร์", dollarHelp: "กรอกเองได้หากไม่มีการอัปเดตอัตโนมัติ", button: "คำนวณความมั่งคั่ง" },
    results: { title: "ผลการจำลอง", totalContributed: "เงินลงทุนรวม", simpleFinal: "มูลค่าดอกเบี้ยธรรมดา", compoundFinal: "มูลค่าดอกเบี้ยทบต้น", difference: "ส่วนต่าง", usdFinal: "มูลค่าเป็นดอลลาร์", totalYears: "ระยะเวลา", annualReturn: "ผลตอบแทนที่ใช้", level: "ระดับความมั่งคั่ง" },
    tableHeaders: ["ปี", "เงินลงทุนรวม", "ดอกเบี้ยธรรมดา", "ดอกเบี้ยทบต้น", "ดอลลาร์", "ระดับ"],
    fxpro: "เปิดบัญชี FXPro",
    binance: "เปิดบัญชี Binance",
    formigaButton: "เข้าช่อง Formiga",
    educationButton: "ดูการศึกษา",
    disclaimer: "เครื่องมือนี้มีวัตถุประสงค์เพื่อการศึกษาและเป็นเพียงการจำลองทางคณิตศาสตร์ ผลตอบแทนในอนาคตไม่รับประกัน",
  },
  ru: {
    ...baseCopy,
    lang: "ru",
    eyebrow: "Образовательный инструмент",
    title: "Калькулятор сложных процентов и создания капитала",
    subtitle: "Сравните простые и сложные проценты, смоделируйте ежемесячные взносы и оцените капитал в долларах.",
    form: { initial: "Начальный взнос", monthly: "Ежемесячный взнос", annualReturn: "Годовая доходность", years: "Количество лет", currency: "Базовая валюта", dollarRate: "Текущий курс доллара", dollarHelp: "Введите курс вручную, если автообновление недоступно.", button: "Рассчитать капитал" },
    results: { title: "Результат симуляции", totalContributed: "Всего внесено", simpleFinal: "Итог с простыми процентами", compoundFinal: "Итог со сложными процентами", difference: "Разница", usdFinal: "Итог в долларах", totalYears: "Срок", annualReturn: "Использованная доходность", level: "Достигнутый уровень" },
    tableHeaders: ["Год", "Взносы", "Простые", "Сложные", "В долларах", "Уровень"],
    fxpro: "Открыть счет FXPro",
    binance: "Открыть счет Binance",
    formigaButton: "Войти в канал Formiga",
    educationButton: "Посмотреть обучение",
    disclaimer: "Калькулятор предназначен для обучения и показывает только математическую симуляцию. Будущая доходность не гарантируется.",
  },
  ur: {
    ...baseCopy,
    lang: "ur",
    eyebrow: "تعلیمی ٹول",
    title: "کمپاؤنڈ انٹرسٹ اور دولت سازی کیلکولیٹر",
    subtitle: "سادہ اور مرکب سود کا موازنہ کریں، ماہانہ سرمایہ کاری کی simulation دیکھیں اور دولت کو ڈالر میں سمجھیں۔",
    form: { initial: "ابتدائی سرمایہ", monthly: "ماہانہ سرمایہ کاری", annualReturn: "سالانہ ریٹرن", years: "سالوں کی تعداد", currency: "بنیادی کرنسی", dollarRate: "موجودہ ڈالر ریٹ", dollarHelp: "خودکار ریٹ نہ ملے تو دستی طور پر درج کریں۔", button: "دولت کا حساب لگائیں" },
    results: { title: "simulation کا نتیجہ", totalContributed: "کل سرمایہ کاری", simpleFinal: "سادہ سود کی آخری قدر", compoundFinal: "مرکب سود کی آخری قدر", difference: "فرق", usdFinal: "ڈالر میں آخری قدر", totalYears: "کل وقت", annualReturn: "استعمال شدہ سالانہ ریٹرن", level: "حاصل شدہ سطح" },
    tableHeaders: ["سال", "کل سرمایہ", "سادہ سود", "مرکب سود", "ڈالر قدر", "سطح"],
    fxpro: "FXPro اکاؤنٹ کھولیں",
    binance: "Binance اکاؤنٹ کھولیں",
    formigaButton: "Formiga چینل میں شامل ہوں",
    educationButton: "تعلیم دیکھیں",
    disclaimer: "یہ کیلکولیٹر تعلیمی مقصد کے لیے ہے اور صرف ریاضیاتی simulation دکھاتا ہے۔ مستقبل کے ریٹرن کی ضمانت نہیں۔",
  },
  bn: {
    ...baseCopy,
    lang: "bn",
    eyebrow: "শিক্ষামূলক টুল",
    title: "চক্রবৃদ্ধি সুদ ও সম্পদ গঠন ক্যালকুলেটর",
    subtitle: "সরল ও চক্রবৃদ্ধি সুদ তুলনা করুন, মাসিক বিনিয়োগ সিমুলেট করুন এবং ডলারে সম্পদের অগ্রগতি দেখুন।",
    form: { initial: "প্রাথমিক বিনিয়োগ", monthly: "মাসিক বিনিয়োগ", annualReturn: "বার্ষিক রিটার্ন", years: "বছরের সংখ্যা", currency: "ভিত্তি মুদ্রা", dollarRate: "বর্তমান ডলার রেট", dollarHelp: "স্বয়ংক্রিয় রেট না থাকলে ম্যানুয়ালি লিখুন।", button: "সম্পদ হিসাব করুন" },
    results: { title: "সিমুলেশন ফলাফল", totalContributed: "মোট বিনিয়োগ", simpleFinal: "সরল সুদের চূড়ান্ত মূল্য", compoundFinal: "চক্রবৃদ্ধি সুদের চূড়ান্ত মূল্য", difference: "পার্থক্য", usdFinal: "ডলারে চূড়ান্ত মূল্য", totalYears: "মোট সময়", annualReturn: "ব্যবহৃত বার্ষিক রিটার্ন", level: "অর্জিত স্তর" },
    tableHeaders: ["বছর", "মোট বিনিয়োগ", "সরল", "চক্রবৃদ্ধি", "ডলার মূল্য", "স্তর"],
    fxpro: "FXPro অ্যাকাউন্ট খুলুন",
    binance: "Binance অ্যাকাউন্ট খুলুন",
    formigaButton: "Formiga চ্যানেলে যোগ দিন",
    educationButton: "শিক্ষা দেখুন",
    disclaimer: "এই ক্যালকুলেটর শিক্ষামূলক এবং শুধুমাত্র গাণিতিক সিমুলেশন দেখায়। ভবিষ্যৎ রিটার্ন নিশ্চিত নয়।",
  },
  ja: {
    ...baseCopy,
    lang: "ja",
    eyebrow: "教育ツール",
    title: "複利と資産形成の計算機",
    subtitle: "単利と複利を比較し、毎月の積立をシミュレーションして、ドル換算の資産推移を確認できます。",
    form: { initial: "初期投資額", monthly: "毎月の積立額", annualReturn: "年間利回り", years: "年数", currency: "基準通貨", dollarRate: "現在のドルレート", dollarHelp: "自動取得できない場合は手入力できます。", button: "資産を計算" },
    results: { title: "シミュレーション結果", totalContributed: "総積立額", simpleFinal: "単利の最終価値", compoundFinal: "複利の最終価値", difference: "差額", usdFinal: "ドル換算の最終価値", totalYears: "期間", annualReturn: "使用した年間利回り", level: "到達した資産レベル" },
    tableHeaders: ["年", "総積立", "単利", "複利", "ドル価値", "レベル"],
    fxpro: "FXPro口座を開設",
    binance: "Binance口座を開設",
    formigaButton: "Formigaチャンネルに参加",
    educationButton: "教育を見る",
    disclaimer: "この計算機は教育目的であり、数学的なシミュレーションのみを示します。将来の利回りは保証されません。",
  },
  ko: {
    ...baseCopy,
    lang: "ko",
    eyebrow: "교육 도구",
    title: "복리와 자산 형성 계산기",
    subtitle: "단리와 복리를 비교하고 월 적립을 시뮬레이션하여 달러 기준 자산 성장을 확인하세요.",
    form: { initial: "초기 투자금", monthly: "월 적립금", annualReturn: "연 수익률", years: "기간(년)", currency: "기준 통화", dollarRate: "현재 달러 환율", dollarHelp: "자동 환율을 사용할 수 없으면 직접 입력하세요.", button: "자산 계산하기" },
    results: { title: "시뮬레이션 결과", totalContributed: "총 납입액", simpleFinal: "단리 최종 가치", compoundFinal: "복리 최종 가치", difference: "차이", usdFinal: "달러 최종 가치", totalYears: "총 기간", annualReturn: "사용한 연 수익률", level: "도달한 자산 단계" },
    tableHeaders: ["연도", "총 납입", "단리", "복리", "달러 가치", "단계"],
    fxpro: "FXPro 계좌 열기",
    binance: "Binance 계좌 열기",
    formigaButton: "Formiga 채널 참여",
    educationButton: "교육 보기",
    disclaimer: "이 계산기는 교육 목적이며 수학적 시뮬레이션만 제공합니다. 미래 수익률은 보장되지 않습니다.",
  },
};

function getLevel(usdValue: number): WealthLevel {
  if (usdValue > 10_000_000) return "harpia";
  if (usdValue > 600_000) return "lobo";
  return "formiga";
}

function formatMoney(value: number, currency: Currency, locale: Locale) {
  const localeMap: Record<string, string> = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    hi: "hi-IN",
    ar: "ar-SA",
    tr: "tr-TR",
    id: "id-ID",
    vi: "vi-VN",
    th: "th-TH",
    ru: "ru-RU",
    ur: "ur-PK",
    bn: "bn-BD",
    ja: "ja-JP",
    ko: "ko-KR",
  };
  return `${symbols[currency]} ${value.toLocaleString(localeMap[locale] ?? "en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
}

function parseMoneyInput(value: string, locale: Locale) {
  const cleaned = value.replace(/[^\d,.-]/g, "").trim();
  if (!cleaned) return 0;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const decimalSeparator = lastComma > lastDot ? "," : lastDot > lastComma ? "." : null;
  let normalized = cleaned;

  if (decimalSeparator) {
    const thousandSeparator = decimalSeparator === "," ? "." : ",";
    const parts = cleaned.split(decimalSeparator);
    const decimals = parts.pop() ?? "";
    const integer = parts.join(decimalSeparator).replaceAll(thousandSeparator, "").replace(/[,.]/g, "");
    normalized = `${integer}.${decimals}`;
  } else {
    normalized = cleaned.replace(/[,.]/g, "");
  }

  if (locale === "pt" && /^\d+\.\d{3}$/.test(cleaned)) {
    normalized = cleaned.replaceAll(".", "");
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseRateInput(value: string) {
  const cleaned = value.replace(/[^\d,.-]/g, "").trim();
  if (!cleaned) return 0;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const decimalSeparator = lastComma > lastDot ? "," : lastDot > lastComma ? "." : null;
  if (!decimalSeparator) return Number(cleaned.replace(/[,.]/g, "")) || 0;
  const thousandSeparator = decimalSeparator === "," ? "." : ",";
  const parts = cleaned.split(decimalSeparator);
  const decimals = parts.pop() ?? "";
  const integer = parts.join(decimalSeparator).replaceAll(thousandSeparator, "").replace(/[,.]/g, "");
  const parsed = Number(`${integer}.${decimals}`);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseBirthYear(value: string, currentYear: number) {
  if (!/^\d{4}$/.test(value.trim())) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1900 || parsed > currentYear) return null;
  return parsed;
}

function ageLabel(age: number, labels: ReturnType<typeof getEnhancedLabels>) {
  return `${age} ${labels.yearsSuffix}`;
}

function ageInYearLabel(age: number, year: number, locale: Locale, labels: ReturnType<typeof getEnhancedLabels>) {
  const connector = locale === "pt" ? "em" : "in";
  return `${ageLabel(age, labels)} ${connector} ${year}`;
}

function MoneyField({
  label,
  value,
  currency,
  locale,
  onChange,
}: {
  label: string;
  value: number;
  currency: Currency;
  locale: Locale;
  onChange: (value: number) => void;
}) {
  const [display, setDisplay] = useState(() => formatMoney(value, currency, locale));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDisplay(formatMoney(value, currency, locale));
  }, [value, currency, locale, focused]);

  return (
    <label className="block">
      <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{label}</span>
      <input
        inputMode="decimal"
        value={display}
        onFocus={() => {
          setFocused(true);
          setDisplay(value ? String(value) : "");
        }}
        onChange={(event) => {
          setDisplay(event.target.value);
          onChange(parseMoneyInput(event.target.value, locale));
        }}
        onBlur={() => {
          const parsed = parseMoneyInput(display, locale);
          onChange(parsed);
          setFocused(false);
          setDisplay(formatMoney(parsed, currency, locale));
        }}
        className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition focus:border-gold"
      />
    </label>
  );
}

function getEnhancedLabels(locale: Locale) {
  const labels = {
    pt: {
      inflation: "Inflação projetada ao ano",
      inflationHelp: "Use uma estimativa de inflação anual para calcular a rentabilidade real do seu patrimônio.",
      nominalReturn: "Rentabilidade nominal",
      projectedInflation: "Inflação projetada",
      realReturn: "Rentabilidade real",
      nominalFinal: "Valor final nominal",
      realFinal: "Valor final real",
      purchasingLoss: "Perda de poder de compra",
      simple: "SIMPLES",
      compound: "COMPOSTO",
      realCompound: "COMPOSTO REAL",
      nextPathTitle: "Caminho para o próximo nível",
      currentLevel: "Nível atual",
      nextLevel: "Próximo nível",
      milestone: "Marco",
      missingUsd: "Quanto falta em dólar",
      missingLocal: "Quanto falta na moeda base",
      monthlyNeeded: "Aporte mensal necessário",
      initialNeeded: "Aporte inicial necessário",
      alreadyOnTrackInitial: "Com o aporte inicial informado, você já estaria no caminho para atingir esse nível dentro do prazo.",
      alreadyOnTrackMonthly: "Com o aporte mensal informado, não seria necessário aumentar o aporte inicial para atingir esse nível dentro do prazo.",
      noNextLevel: "Você já está no nível Harpia. O próximo passo é preservação, sucessão e estrutura global.",
      notReached: "Você ainda não alcança o próximo nível dentro do prazo informado.",
      inflationTitle: "Por que a inflação muda o resultado?",
      inflationText: "A rentabilidade nominal mostra quanto seu dinheiro cresce no papel. Mas a inflação reduz o poder de compra ao longo do tempo. Por isso, a rentabilidade real mostra quanto o patrimônio cresce de verdade, já descontando a perda de valor da moeda.",
      inflationExample: "Se seu investimento rende 11% ao ano e a inflação é 4% ao ano, o ganho real não é 11%. O ganho real aproximado é 6,73% ao ano.",
      pillarsTitle: "O que cada nível precisa construir",
      crossing: "Cruzamento de nível",
      noCrossing: "Não cruza de nível no prazo informado.",
      lineChart: "Gráfico de linhas",
      barChart: "Gráfico de barras",
      showMilestones: "Mostrar marcos de nível",
      yearsSuffix: "anos",
      retirementTitle: "Calculadora de Aposentadoria",
      retirementIntro: "Descubra quanto precisa acumular para viver de renda ou por quanto tempo seu patrimônio pode sustentar retiradas mensais.",
      desiredWealth: "Patrimônio desejado para aposentadoria",
      desiredIncome: "Renda mensal desejada",
      retirementReturn: "Rentabilidade anual esperada após aposentadoria",
      retirementInflation: "Inflação projetada ao ano",
      retirementStrategy: "Estratégia de aposentadoria",
      liveIncome: "Viver de renda",
      spendWealth: "Gastar o patrimônio ao longo do tempo",
      withdrawalYears: "Quantidade de anos de retirada",
      neededWealth: "Patrimônio necessário",
      chosenStrategy: "Estratégia escolhida",
      estimatedDuration: "Duração estimada",
      retirementExplanationTitle: "Como funciona a aposentadoria por patrimônio?",
      retirementExplanationText: "Existem duas formas principais de pensar a aposentadoria financeira. A primeira é viver de renda, buscando patrimônio suficiente para que os rendimentos paguem seu custo de vida sem consumir o capital principal. A segunda é gastar o patrimônio ao longo do tempo, usando parte do capital todos os meses. O risco é o patrimônio acabar antes do esperado, principalmente se a inflação for alta ou a rentabilidade for menor que o planejado.",
      retirementAlert: "Com essa retirada mensal, o patrimônio pode acabar antes do prazo informado.",
      retirementOk: "Com os dados informados, o patrimônio pode sustentar essa renda pelo prazo informado.",
      retirementCtaTitle: "Planeje sua liberdade financeira com visão global.",
      retirementCtaText: "A aposentadoria financeira começa com clareza. Calcule quanto precisa acumular, entenda seu nível patrimonial e evolua sua estratégia com educação, análise econômica e visão de longo prazo.",
      projectedResult: "Resultado projetado",
      simulationPeriod: "Período",
      finalYear: "Ano final",
      levelMilestones: "Marcos de nível",
      harpiaMilestone: "Marco Harpia: acima de US$ 10.000.000",
      loboMilestone: "Marco Lobo: acima de US$ 600.000",
      retirementProjection: "Projeção da aposentadoria",
      generatedIncome: "Renda gerada pelo patrimônio",
      incomeGap: "Diferença mensal",
      remainingWealth: "Patrimônio restante",
      capitalEnds: "Capital acaba no ano",
      capitalDoesNotEnd: "Não acaba no prazo informado",
      birthYear: "Ano de nascimento",
      birthYearPlaceholder: "Exemplo: 1990",
      birthYearHelp: "Informe seu ano de nascimento para visualizar sua idade em cada etapa da projeção. Assim você consegue entender em que fase da vida poderá atingir determinado patrimônio ou viver de renda.",
      currentAge: "Idade atual",
      finalProjectionAge: "Idade no final da projeção",
      age: "Idade",
      ageAtCapitalEnd: "Idade estimada",
      capitalDoesNotEndUntil: "Capital não acaba até",
      tableHeaders: ["Ano", "Total aportado", "Juros simples", "Juros compostos nominal", "Juros compostos real", "Valor em dólar", "Nível patrimonial"],
    },
    en: {
      inflation: "Projected inflation per year",
      inflationHelp: "Use an annual inflation estimate to calculate the real return of your wealth.",
      nominalReturn: "Nominal return",
      projectedInflation: "Projected inflation",
      realReturn: "Real return",
      nominalFinal: "Final nominal value",
      realFinal: "Final real value",
      purchasingLoss: "Purchasing power loss",
      simple: "SIMPLE",
      compound: "COMPOUND",
      realCompound: "REAL COMPOUND",
      nextPathTitle: "Path to the next level",
      currentLevel: "Current level",
      nextLevel: "Next level",
      milestone: "Milestone",
      missingUsd: "Missing in dollars",
      missingLocal: "Missing in base currency",
      monthlyNeeded: "Monthly contribution needed",
      initialNeeded: "Initial contribution needed",
      alreadyOnTrackInitial: "With the initial contribution entered, you would already be on track to reach this level within the selected period.",
      alreadyOnTrackMonthly: "With the monthly contribution entered, increasing the initial contribution would not be necessary to reach this level within the selected period.",
      noNextLevel: "You are already at Harpy level. The next step is preservation, succession and global structure.",
      notReached: "You do not reach the next level within the selected period yet.",
      inflationTitle: "Why does inflation change the result?",
      inflationText: "Nominal return shows how much your money grows on paper. Inflation reduces purchasing power over time. Real return shows how much wealth actually grows after discounting currency erosion.",
      inflationExample: "If an investment earns 11% per year and inflation is 4% per year, the real gain is not 11%. The approximate real gain is 6.73% per year.",
      pillarsTitle: "What each level needs to build",
      crossing: "Level crossing",
      noCrossing: "No level crossing within the selected period.",
      lineChart: "Line chart",
      barChart: "Bar chart",
      showMilestones: "Show level milestones",
      yearsSuffix: "years",
      retirementTitle: "Retirement Calculator",
      retirementIntro: "Find out how much you need to accumulate to live from income or how long your wealth can support monthly withdrawals.",
      desiredWealth: "Desired retirement wealth",
      desiredIncome: "Desired monthly income",
      retirementReturn: "Expected annual return after retirement",
      retirementInflation: "Projected inflation per year",
      retirementStrategy: "Retirement strategy",
      liveIncome: "Live from income",
      spendWealth: "Spend wealth over time",
      withdrawalYears: "Withdrawal years",
      neededWealth: "Required wealth",
      chosenStrategy: "Chosen strategy",
      estimatedDuration: "Estimated duration",
      retirementExplanationTitle: "How does wealth-based retirement work?",
      retirementExplanationText: "There are two main ways to think about financial retirement. The first is living from income, building enough wealth for returns to cover your cost of living without consuming principal. The second is spending wealth over time, withdrawing part of the capital each month. The risk is running out earlier than expected, especially if inflation is high or returns are lower than planned.",
      retirementAlert: "With this monthly withdrawal, wealth may run out before the selected period.",
      retirementOk: "With the data provided, wealth can support this income for the selected period.",
      retirementCtaTitle: "Plan your financial freedom with a global vision.",
      retirementCtaText: "Financial retirement starts with clarity. Calculate how much you need, understand your wealth level and evolve your strategy with education, economic analysis and long-term vision.",
      projectedResult: "Projected result",
      simulationPeriod: "Period",
      finalYear: "Final year",
      levelMilestones: "Level milestones",
      harpiaMilestone: "Harpy milestone: above US$ 10,000,000",
      loboMilestone: "Wolf milestone: above US$ 600,000",
      retirementProjection: "Retirement projection",
      generatedIncome: "Income generated by wealth",
      incomeGap: "Monthly gap",
      remainingWealth: "Remaining wealth",
      capitalEnds: "Capital ends in year",
      capitalDoesNotEnd: "Does not end within selected period",
      birthYear: "Year of birth",
      birthYearPlaceholder: "Example: 1990",
      birthYearHelp: "Enter your year of birth to view your age at each stage of the projection. This helps you understand when you may reach a certain wealth level or live from income.",
      currentAge: "Current age",
      finalProjectionAge: "Age at the end of projection",
      age: "Age",
      ageAtCapitalEnd: "Estimated age",
      capitalDoesNotEndUntil: "Capital does not end until",
      tableHeaders: ["Year", "Total contributed", "Simple interest", "Nominal compound", "Real compound", "Dollar value", "Wealth level"],
    },
  };
  return labels[locale === "pt" ? "pt" : "en"];
}

function calculateYear(initial: number, monthly: number, annualReturn: number, inflation: number, year: number) {
  const months = year * 12;
  const totalContributed = initial + monthly * months;
  const simpleReturn = initial * annualReturn * year;
  const simpleFinal = initial + monthly * months + simpleReturn;
  const monthlyRate = Math.pow(1 + annualReturn, 1 / 12) - 1;
  const futureInitial = initial * Math.pow(1 + monthlyRate, months);
  const futureMonthly = monthlyRate === 0 ? monthly * months : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const compoundFinal = futureInitial + futureMonthly;
  const realFinal = compoundFinal / Math.pow(1 + inflation, year);
  return { year, totalContributed, simpleFinal, compoundFinal, realFinal };
}

function EvolutionChart({
  rows,
  currency,
  locale,
  copy,
  dollarRate,
  labels,
  startYear,
  birthYear,
}: {
  rows: ReturnType<typeof calculateYear>[];
  currency: Currency;
  locale: Locale;
  copy: CompoundCopy;
  dollarRate: number;
  labels: ReturnType<typeof getEnhancedLabels>;
  startYear: number;
  birthYear: number | null;
}) {
  const [chartMode, setChartMode] = useState<ChartMode>("line");
  const [visibleSeries, setVisibleSeries] = useState({ simple: false, compound: true, real: true });
  const [showMilestones, setShowMilestones] = useState(true);
  const width = 760;
  const height = 280;
  const padding = 42;
  const levelToLocal = (usd: number) => currency === "USD" ? usd : usd * Math.max(dollarRate, 0.01);
  const milestones = [
    { label: "Lobo", value: levelToLocal(600_000) },
    { label: "Harpia", value: levelToLocal(10_000_000) },
  ];
  const maxCalculated = Math.max(...rows.flatMap((row) => [row.simpleFinal, row.compoundFinal, row.realFinal, row.totalContributed]), 1);
  const maxValue = maxCalculated * 1.16;
  const visibleMilestones = milestones.filter((milestone) => milestone.value <= maxValue && milestone.value >= maxValue * 0.04);
  const hiddenMilestones = milestones.filter((milestone) => !visibleMilestones.includes(milestone));
  const interval = rows.length <= 10 ? 1 : rows.length <= 30 ? 2 : 5;
  const displayRows = rows.filter((row) => row.year === 1 || row.year === rows.length || row.year % interval === 0);
  const x = (index: number) => padding + (index / Math.max(rows.length - 1, 1)) * (width - padding * 2);
  const xForYear = (year: number) => padding + ((year - 1) / Math.max(rows.length - 1, 1)) * (width - padding * 2);
  const y = (value: number) => height - padding - (value / maxValue) * (height - padding * 2);
  const simplePath = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(row.simpleFinal)}`).join(" ");
  const compoundPath = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(row.compoundFinal)}`).join(" ");
  const realPath = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(row.realFinal)}`).join(" ");
  const toggleSeries = (key: keyof typeof visibleSeries) => {
    setVisibleSeries((current) => ({ ...current, [key]: !current[key] }));
  };
  const barWidth = Math.max(8, Math.min(26, (width - padding * 2) / Math.max(displayRows.length, 1) / 4));
  const tickStep = rows.length <= 10 ? 1 : rows.length <= 25 ? 5 : rows.length <= 50 ? 10 : 15;
  const xTicks = rows.filter((row) => row.year !== 1 && (row.year === rows.length || row.year % tickStep === 0));
  const final = rows[rows.length - 1];
  const tooltipForRow = (row: ReturnType<typeof calculateYear>) => {
    const projectedYear = startYear + row.year;
    const projectedAge = birthYear ? projectedYear - birthYear : null;
    const rowUsd = currency === "USD" ? row.compoundFinal : row.compoundFinal / Math.max(dollarRate, 0.01);
    return [
      `${copy.tableHeaders[0]}: ${projectedYear}`,
      projectedAge !== null ? `${labels.age}: ${ageLabel(projectedAge, labels)}` : null,
      `${copy.results.totalContributed}: ${formatMoney(row.totalContributed, currency, locale)}`,
      `${copy.results.simpleFinal}: ${formatMoney(row.simpleFinal, currency, locale)}`,
      `${labels.nominalFinal}: ${formatMoney(row.compoundFinal, currency, locale)}`,
      `${labels.realFinal}: ${formatMoney(row.realFinal, currency, locale)}`,
      `${copy.results.usdFinal}: ${formatMoney(rowUsd, "USD", locale)}`,
      `${copy.results.level}: ${copy.levels[getLevel(rowUsd)].name}`,
    ].filter(Boolean).join("\n");
  };
  const renderYearTick = (year: number, tickX: number) => {
    const projectedAge = birthYear ? year - birthYear : null;
    return (
      <text key={`${year}-${projectedAge ?? "year"}`} x={tickX} y={height - 16} fill="rgba(255,255,255,0.42)" fontSize="11" textAnchor="middle">
        <tspan x={tickX}>{year}</tspan>
        {projectedAge !== null ? <tspan x={tickX} dy="13">{ageLabel(projectedAge, labels)}</tspan> : null}
      </text>
    );
  };

  return (
    <div className="overflow-hidden border border-gold/[0.18] bg-paper/[0.04] p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-2xl text-paper md:text-3xl">{copy.chartTitle}</h2>
        <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.14em]">
          {[
            [labels.lineChart, "line"],
            [labels.barChart, "bar"],
          ].map(([label, mode]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setChartMode(mode as ChartMode)}
              className={`border px-3 py-2 transition ${chartMode === mode ? "border-gold bg-gold text-ink" : "border-paper/[0.14] text-paper/[0.62] hover:border-gold hover:text-gold"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.14em]">
        {[
          [labels.simple, "simple", "text-paper/[0.64]"],
          [labels.compound, "compound", "text-gold"],
          [labels.realCompound, "real", "text-rise"],
        ].map(([label, key, tone]) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleSeries(key as keyof typeof visibleSeries)}
            className={`border px-3 py-2 transition ${visibleSeries[key as keyof typeof visibleSeries] ? `border-gold bg-paper/[0.08] ${tone}` : "border-paper/[0.1] text-paper/[0.35]"}`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowMilestones((value) => !value)}
          className={`border px-3 py-2 transition ${showMilestones ? "border-gold/[0.55] text-gold" : "border-paper/[0.1] text-paper/[0.35]"}`}
        >
          {labels.showMilestones}
        </button>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={copy.chartTitle}>
        <defs>
          <linearGradient id="compoundGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#c99b3e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#28d084" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line key={line} x1={padding} x2={width - padding} y1={padding + line * 58} y2={padding + line * 58} stroke="rgba(255,255,255,0.06)" />
        ))}
        {renderYearTick(startYear, padding)}
        {xTicks.map((row) => renderYearTick(startYear + row.year, xForYear(row.year)))}
        {showMilestones && visibleMilestones.map((milestone) => {
          const markerY = y(milestone.value);
          if (markerY < padding || markerY > height - padding) return null;
          return (
            <g key={milestone.label}>
              <line x1={padding} x2={width - padding - 72} y1={markerY} y2={markerY} stroke="rgba(201,155,62,0.18)" strokeDasharray="8 8" />
              <text x={width - padding} y={markerY + 4} fill="#c99b3e" fontSize="11" textAnchor="end">{milestone.label}</text>
            </g>
          );
        })}
        {chartMode === "line" ? (
          <>
            {visibleSeries.simple ? <path d={simplePath} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" /> : null}
            {visibleSeries.compound ? <path d={compoundPath} fill="none" stroke="url(#compoundGradient)" strokeWidth="4" /> : null}
            {visibleSeries.real ? <path d={realPath} fill="none" stroke="#28d084" strokeWidth="3" strokeDasharray="7 7" /> : null}
            {visibleSeries.compound && rows.map((row, index) => (
              <circle key={row.year} cx={x(index)} cy={y(row.compoundFinal)} r="3.5" fill="#c99b3e">
                <title>{tooltipForRow(row)}</title>
              </circle>
            ))}
          </>
        ) : (
          displayRows.map((row) => {
            const center = xForYear(row.year);
            return (
              <g key={row.year}>
                {visibleSeries.simple ? <rect x={center - barWidth * 1.8} y={y(row.simpleFinal)} width={barWidth} height={height - padding - y(row.simpleFinal)} fill="rgba(255,255,255,0.35)"><title>{tooltipForRow(row)}</title></rect> : null}
                <rect x={center - barWidth * 0.6} y={y(row.totalContributed)} width={barWidth} height={height - padding - y(row.totalContributed)} fill="rgba(255,255,255,0.18)"><title>{tooltipForRow(row)}</title></rect>
                {visibleSeries.compound ? <rect x={center + barWidth * 0.6} y={y(row.compoundFinal)} width={barWidth} height={height - padding - y(row.compoundFinal)} fill="#c99b3e"><title>{tooltipForRow(row)}</title></rect> : null}
                {visibleSeries.real ? <rect x={center + barWidth * 1.8} y={y(row.realFinal)} width={barWidth} height={height - padding - y(row.realFinal)} fill="#28d084"><title>{tooltipForRow(row)}</title></rect> : null}
              </g>
            );
          })
        )}
        <text x={width - padding} y={30} fill="rgba(255,255,255,0.86)" fontSize="13" textAnchor="end">
          {final ? formatMoney(final.compoundFinal, currency, locale) : ""}
        </text>
      </svg>
      <div className="mt-5 border-t border-paper/[0.08] pt-3 text-xs font-bold uppercase tracking-[0.16em] text-paper/[0.52]">
        {rows.length ? `${labels.simulationPeriod}: ${startYear} → ${startYear + rows.length}` : ""}
      </div>
      {showMilestones && hiddenMilestones.length ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {hiddenMilestones.map((milestone) => (
            <div key={milestone.label} className="border border-gold/[0.12] bg-ink/[0.32] px-3 py-2 text-xs font-semibold text-paper/[0.58]">
              {milestone.label === "Harpia" ? labels.harpiaMilestone : labels.loboMilestone}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RetirementChart({
  strategy,
  currency,
  locale,
  labels,
  startYear,
  birthYear,
  desiredIncome,
  generatedIncome,
  incomeGap,
  rows,
  capitalEndsYear,
}: {
  strategy: RetirementStrategy;
  currency: Currency;
  locale: Locale;
  labels: ReturnType<typeof getEnhancedLabels>;
  startYear: number;
  birthYear: number | null;
  desiredIncome: number;
  generatedIncome: number;
  incomeGap: number;
  rows: { year: number; wealth: number }[];
  capitalEndsYear: number | null;
}) {
  const width = 760;
  const height = 260;
  const padding = 42;
  const periodLabel = `${labels.simulationPeriod}: ${startYear} → ${startYear + Math.max(rows.length - 1, 0)}${birthYear ? ` • ${labels.age}: ${ageLabel(startYear - birthYear, labels)} → ${ageLabel(startYear + Math.max(rows.length - 1, 0) - birthYear, labels)}` : ""}`;

  if (strategy === "income") {
    const bars = [
      { label: labels.desiredIncome, value: desiredIncome, color: "#c99b3e" },
      { label: labels.generatedIncome, value: generatedIncome, color: generatedIncome >= desiredIncome ? "#28d084" : "#ef4444" },
      { label: labels.incomeGap, value: Math.max(0, Math.abs(incomeGap)), color: incomeGap >= 0 ? "#28d084" : "#ef4444" },
    ];
    const maxValue = Math.max(...bars.map((bar) => bar.value), 1) * 1.18;
    const barWidth = 120;

    return (
      <div className="mt-6 border border-gold/[0.18] bg-paper/[0.035] p-4 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-serif text-2xl text-paper">{labels.retirementProjection}</h3>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-paper/[0.52]">
            {periodLabel}
          </p>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-auto w-full" role="img" aria-label={labels.retirementProjection}>
          {[0, 1, 2, 3].map((line) => (
            <line key={line} x1={padding} x2={width - padding} y1={padding + line * 50} y2={padding + line * 50} stroke="rgba(255,255,255,0.06)" />
          ))}
          {bars.map((bar, index) => {
            const x = padding + 70 + index * 210;
            const barHeight = (bar.value / maxValue) * (height - padding * 2);
            const y = height - padding - barHeight;
            return (
              <g key={bar.label}>
                <rect x={x} y={y} width={barWidth} height={barHeight} fill={bar.color} opacity="0.88">
                  <title>{`${periodLabel}\n${bar.label}: ${formatMoney(bar.value, currency, locale)}`}</title>
                </rect>
                <text x={x + barWidth / 2} y={height - 12} fill="rgba(255,255,255,0.62)" fontSize="11" textAnchor="middle">{bar.label}</text>
                <text x={x + barWidth / 2} y={Math.max(18, y - 8)} fill="#fff" fontSize="12" fontWeight="700" textAnchor="middle">{formatMoney(bar.value, currency, locale)}</text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  const maxValue = Math.max(...rows.map((row) => row.wealth), 1) * 1.12;
  const x = (index: number) => padding + (index / Math.max(rows.length - 1, 1)) * (width - padding * 2);
  const y = (value: number) => height - padding - (value / maxValue) * (height - padding * 2);
  const path = rows.map((row, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(row.wealth)}`).join(" ");
  const tickStep = rows.length <= 10 ? 1 : rows.length <= 25 ? 5 : rows.length <= 50 ? 10 : 15;
  const xTicks = rows.filter((row) => row.year === 0 || row.year === rows.length - 1 || row.year % tickStep === 0);
  const renderRetirementTick = (row: { year: number; wealth: number }) => {
    const projectedYear = startYear + row.year;
    const projectedAge = birthYear ? projectedYear - birthYear : null;
    return (
      <text key={row.year} x={x(row.year)} y={height - 18} fill="rgba(255,255,255,0.42)" fontSize="11" textAnchor="middle">
        <tspan x={x(row.year)}>{projectedYear}</tspan>
        {projectedAge !== null ? <tspan x={x(row.year)} dy="13">{ageLabel(projectedAge, labels)}</tspan> : null}
      </text>
    );
  };

  return (
    <div className="mt-6 border border-gold/[0.18] bg-paper/[0.035] p-4 md:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-serif text-2xl text-paper">{labels.retirementProjection}</h3>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-paper/[0.52]">
          {periodLabel}
        </p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-auto w-full" role="img" aria-label={labels.retirementProjection}>
        {[0, 1, 2, 3].map((line) => (
          <line key={line} x1={padding} x2={width - padding} y1={padding + line * 50} y2={padding + line * 50} stroke="rgba(255,255,255,0.06)" />
        ))}
        <line x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} stroke="rgba(255,255,255,0.16)" />
        <path d={path} fill="none" stroke={capitalEndsYear ? "#ef4444" : "#28d084"} strokeWidth="4" />
        {rows.map((row, index) => (
          <circle key={row.year} cx={x(index)} cy={y(row.wealth)} r="3" fill={capitalEndsYear ? "#ef4444" : "#28d084"}>
            <title>{`${copyByLocale[locale]?.tableHeaders?.[0] ?? "Year"}: ${startYear + row.year}${birthYear ? `\n${labels.age}: ${ageLabel(startYear + row.year - birthYear, labels)}` : ""}\n${labels.remainingWealth}: ${formatMoney(row.wealth, currency, locale)}`}</title>
          </circle>
        ))}
        {xTicks.map((row) => renderRetirementTick(row))}
        {capitalEndsYear ? (
          <text x={width - padding} y={28} fill="#fca5a5" fontSize="12" textAnchor="end">
            {labels.capitalEnds}: {startYear + capitalEndsYear}{birthYear ? ` • ${labels.age}: ${ageLabel(startYear + capitalEndsYear - birthYear, labels)}` : ""}
          </text>
        ) : (
          <text x={width - padding} y={28} fill="#28d084" fontSize="12" textAnchor="end">
            {labels.capitalDoesNotEnd}
          </text>
        )}
        <text x={padding} y={height - 8} fill="rgba(255,255,255,0.52)" fontSize="12">
          {labels.remainingWealth}
        </text>
      </svg>
    </div>
  );
}

export default function CompoundInterestCalculatorPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const enhanced = getEnhancedLabels(locale);
  const currentYear = new Date().getFullYear();
  const maxYears = Math.max(1, 2100 - currentYear);
  const defaultCurrency = defaultCurrencyByLocale[locale] ?? "USD";
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [inflation, setInflation] = useState(4);
  const [years, setYears] = useState(20);
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [dollarRate, setDollarRate] = useState(usdRateByCurrency[defaultCurrency]);
  const [dollarRateDisplay, setDollarRateDisplay] = useState(String(usdRateByCurrency[defaultCurrency]));
  const [birthYearInput, setBirthYearInput] = useState("");
  const [retirementBirthYearInput, setRetirementBirthYearInput] = useState("");
  const [retirementWealth, setRetirementWealth] = useState(1_000_000);
  const [retirementIncome, setRetirementIncome] = useState(10_000);
  const [retirementReturn, setRetirementReturn] = useState(8);
  const [retirementInflation, setRetirementInflation] = useState(4);
  const [retirementStrategy, setRetirementStrategy] = useState<RetirementStrategy>("income");
  const [withdrawalYears, setWithdrawalYears] = useState(30);

  useEffect(() => {
    setCurrency(defaultCurrency);
    setDollarRate(usdRateByCurrency[defaultCurrency]);
    setDollarRateDisplay(String(usdRateByCurrency[defaultCurrency]));
  }, [defaultCurrency]);

  useEffect(() => {
    setDollarRate(usdRateByCurrency[currency]);
    setDollarRateDisplay(String(usdRateByCurrency[currency]));
  }, [currency]);

  useEffect(() => {
    if (currency === "USD") {
      setDollarRate(1);
      setDollarRateDisplay("1");
      return;
    }
    let active = true;
    fetch(`https://economia.awesomeapi.com.br/json/last/USD-${currency}`)
      .then((response) => response.json())
      .then((data) => {
        const bid = Number(data?.[`USD${currency}`]?.bid);
        if (active && Number.isFinite(bid) && bid > 0) {
          setDollarRate(bid);
          setDollarRateDisplay(String(bid));
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [currency]);

  const rows = useMemo(() => {
    const safeYears = Math.max(1, Math.min(maxYears, Math.round(years || 1)));
    return Array.from({ length: safeYears }, (_, index) => calculateYear(initial, monthly, annualReturn / 100, inflation / 100, index + 1));
  }, [initial, monthly, annualReturn, inflation, years, maxYears]);
  const safeSimulationYears = rows.length;
  const safeWithdrawalYears = Math.max(1, Math.min(maxYears, Math.round(withdrawalYears || 1)));
  const birthYear = parseBirthYear(birthYearInput, currentYear);
  const retirementBirthYear = parseBirthYear(retirementBirthYearInput, currentYear);
  const currentAge = birthYear ? currentYear - birthYear : null;
  const finalProjectionYear = currentYear + safeSimulationYears;
  const finalProjectionAge = birthYear ? finalProjectionYear - birthYear : null;
  const retirementCurrentAge = retirementBirthYear ? currentYear - retirementBirthYear : null;
  const retirementFinalProjectionYear = currentYear + safeWithdrawalYears;
  const retirementFinalProjectionAge = retirementBirthYear ? retirementFinalProjectionYear - retirementBirthYear : null;

  const result = rows[rows.length - 1];
  const usdFinal = currency === "USD" ? result.compoundFinal : result.compoundFinal / Math.max(dollarRate, 0.01);
  const realUsdFinal = currency === "USD" ? result.realFinal : result.realFinal / Math.max(dollarRate, 0.01);
  const levelKey = getLevel(usdFinal);
  const level = copy.levels[levelKey];
  const realAnnualReturn = ((1 + annualReturn / 100) / (1 + inflation / 100) - 1) * 100;
  const purchasingLoss = Math.max(0, result.compoundFinal - result.realFinal);
  const nextTargetUsd = levelKey === "formiga" ? 600_000 : levelKey === "lobo" ? 10_000_000 : null;
  const nextLevelKey: WealthLevel | null = levelKey === "formiga" ? "lobo" : levelKey === "lobo" ? "harpia" : null;
  const nextTargetLocal = nextTargetUsd === null ? null : currency === "USD" ? nextTargetUsd : nextTargetUsd * Math.max(dollarRate, 0.01);
  const months = Math.max(1, safeSimulationYears * 12);
  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  const growthFactor = Math.pow(1 + monthlyRate, months);
  const annuityFactor = monthlyRate === 0 ? months : (growthFactor - 1) / monthlyRate;
  const targetGapLocal = nextTargetLocal === null ? 0 : Math.max(0, nextTargetLocal - result.compoundFinal);
  const requiredMonthly = nextTargetLocal === null ? null : (nextTargetLocal - initial * growthFactor) / annuityFactor;
  const monthlyFuture = monthly * annuityFactor;
  const requiredInitial = nextTargetLocal === null ? null : (nextTargetLocal - monthlyFuture) / growthFactor;
  const loboCrossYear = rows.find((row) => (currency === "USD" ? row.compoundFinal : row.compoundFinal / Math.max(dollarRate, 0.01)) > 600_000)?.year;
  const harpiaCrossYear = rows.find((row) => (currency === "USD" ? row.compoundFinal : row.compoundFinal / Math.max(dollarRate, 0.01)) > 10_000_000)?.year;
  const retirementRealReturn = ((1 + retirementReturn / 100) / (1 + retirementInflation / 100) - 1);
  const safeRetirementReturn = Math.max(retirementRealReturn, 0.0001);
  const neededRetirementWealth = retirementIncome * 12 / safeRetirementReturn;
  const retirementMonthlyRate = Math.pow(1 + safeRetirementReturn, 1 / 12) - 1;
  const withdrawalMonths = Math.max(1, safeWithdrawalYears * 12);
  const generatedMonthlyIncome = retirementWealth * safeRetirementReturn / 12;
  const monthlyIncomeGap = generatedMonthlyIncome - retirementIncome;
  const monthlyCapacityForPeriod = retirementMonthlyRate === 0
    ? retirementWealth / withdrawalMonths
    : retirementWealth * retirementMonthlyRate / (1 - Math.pow(1 + retirementMonthlyRate, -withdrawalMonths));
  const durationMonths = retirementIncome <= retirementWealth * retirementMonthlyRate
    ? Infinity
    : Math.log(retirementIncome / (retirementIncome - retirementWealth * retirementMonthlyRate)) / Math.log(1 + retirementMonthlyRate);
  const retirementLevelUsd = currency === "USD" ? retirementWealth : retirementWealth / Math.max(dollarRate, 0.01);
  const retirementLevelKey = getLevel(retirementLevelUsd);
  const retirementLevel = copy.levels[retirementLevelKey];
  const retirementSustains = retirementStrategy === "income"
    ? retirementWealth >= neededRetirementWealth
    : monthlyCapacityForPeriod >= retirementIncome;
  const durationLabel = retirementStrategy === "income"
    ? (retirementWealth >= neededRetirementWealth ? "∞" : enhanced.notReached)
    : `${Math.floor(durationMonths / 12).toLocaleString(copy.lang)} ${enhanced.yearsSuffix}`;
  const retirementProjectionRows = useMemo(() => {
    const yearlyRows: { year: number; wealth: number }[] = [];
    let wealth = retirementWealth;
    const maxProjectionYears = safeWithdrawalYears;
    for (let year = 0; year <= maxProjectionYears; year += 1) {
      yearlyRows.push({ year, wealth: Math.max(0, wealth) });
      for (let month = 0; month < 12; month += 1) {
        wealth = wealth * (1 + retirementMonthlyRate) - retirementIncome;
      }
    }
    return yearlyRows;
  }, [retirementWealth, safeWithdrawalYears, retirementMonthlyRate, retirementIncome]);
  const capitalEndsYear = retirementProjectionRows.find((row) => row.year > 0 && row.wealth <= 0)?.year ?? null;

  const resultCards = [
    ...(birthYear ? [
      [enhanced.currentAge, ageLabel(currentAge ?? 0, enhanced)],
      [enhanced.finalProjectionAge, ageInYearLabel(finalProjectionAge ?? 0, finalProjectionYear, locale, enhanced)],
      [enhanced.finalYear, `${finalProjectionYear}`],
    ] : [[enhanced.finalYear, `${finalProjectionYear}`]]),
    [enhanced.nominalReturn, `${annualReturn.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
    [enhanced.projectedInflation, `${inflation.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
    [enhanced.realReturn, `${realAnnualReturn.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
    [copy.results.totalContributed, formatMoney(result.totalContributed, currency, locale)],
    [enhanced.nominalFinal, formatMoney(result.compoundFinal, currency, locale)],
    [enhanced.realFinal, formatMoney(result.realFinal, currency, locale)],
    [enhanced.purchasingLoss, formatMoney(purchasingLoss, currency, locale)],
    [copy.results.simpleFinal, formatMoney(result.simpleFinal, currency, locale)],
    [copy.results.difference, formatMoney(result.compoundFinal - result.simpleFinal, currency, locale)],
    [copy.results.usdFinal, formatMoney(usdFinal, "USD", locale)],
    [copy.results.level, level.name],
  ];

  return (
    <main className="min-h-screen bg-ink text-paper">
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />

      <section className="relative overflow-hidden px-5 pb-14 pt-44 md:px-8 md:pb-20 md:pt-52">
        <div className="absolute inset-0 terminal-grid opacity-18" />
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.05em] md:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/[0.72] md:text-xl">
              {copy.subtitle}
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="border border-gold/[0.18] bg-paper/[0.05] p-5 shadow-premium md:p-7"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <MoneyField label={copy.form.initial} value={initial} currency={currency} locale={locale} onChange={setInitial} />
              <MoneyField label={copy.form.monthly} value={monthly} currency={currency} locale={locale} onChange={setMonthly} />
              <label className="block sm:col-span-2">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{enhanced.birthYear}</span>
                <input
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={enhanced.birthYearPlaceholder}
                  value={birthYearInput}
                  onChange={(event) => setBirthYearInput(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition placeholder:text-paper/[0.32] focus:border-gold"
                />
                <span className="mt-2 block text-xs leading-5 text-paper/[0.58]">{enhanced.birthYearHelp}</span>
              </label>
              {[
                [copy.form.annualReturn, annualReturn, setAnnualReturn, "number", "%"],
                [enhanced.inflation, inflation, setInflation, "number", "%"],
                [copy.form.years, years, setYears, "number", ""],
              ].map(([label, value, setter, type, suffix]) => (
                <label key={label as string} className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{label as string}</span>
                  <div className="mt-2 flex items-center border border-gold/[0.18] bg-ink transition focus-within:border-gold">
                    {suffix ? <span className="pl-4 text-sm font-black text-gold">{suffix as string}</span> : null}
                    <input
                      type={type as string}
                      value={value as number}
                      onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
                      className="w-full bg-transparent px-4 py-3 text-lg font-bold text-paper outline-none"
                    />
                  </div>
                  {label === enhanced.inflation ? <span className="mt-2 block text-xs leading-5 text-paper/[0.58]">{enhanced.inflationHelp}</span> : null}
                </label>
              ))}
              <label className="block">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{copy.form.currency}</span>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value as Currency)}
                  className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition focus:border-gold"
                >
                  {currencyOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{copy.form.dollarRate}</span>
                <input
                  inputMode="decimal"
                  value={dollarRateDisplay}
                  onChange={(event) => {
                    setDollarRateDisplay(event.target.value);
                    setDollarRate(parseRateInput(event.target.value));
                  }}
                  onBlur={() => {
                    const parsed = parseRateInput(dollarRateDisplay) || usdRateByCurrency[currency];
                    setDollarRate(parsed);
                    setDollarRateDisplay(parsed.toLocaleString(copy.lang, { maximumFractionDigits: 4, minimumFractionDigits: 2 }));
                  }}
                  className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition focus:border-gold"
                />
              </label>
            </div>
            <p className="mt-4 text-sm leading-6 text-paper/[0.58]">{copy.form.dollarHelp}</p>
            <div className="mt-5 border border-gold/[0.14] bg-ink/[0.52] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-gold">
                    {copy.results.totalYears}: {Math.min(Math.max(1, Math.round(years || 1)), maxYears)} {enhanced.yearsSuffix}
                  </p>
                  <p className="mt-1 text-xs text-paper/[0.58]">{enhanced.finalYear}: {currentYear + Math.min(Math.max(1, Math.round(years || 1)), maxYears)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setYears((value) => Math.max(1, Math.round(value || 1) - 1))}
                    className="border border-gold/[0.28] px-4 py-2 text-sm font-black text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setYears((value) => Math.min(maxYears, Math.round(value || 1) + 1))}
                    className="border border-gold/[0.28] px-4 py-2 text-sm font-black text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    +
                  </button>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={maxYears}
                value={Math.min(Math.max(1, Math.round(years || 1)), maxYears)}
                onChange={(event) => setYears(Number(event.target.value))}
                className="mt-4 w-full accent-gold"
              />
            </div>
            <button className="mt-6 w-full bg-gold px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-paper">
              {copy.form.button}
            </button>
          </motion.form>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-5xl">{copy.results.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resultCards.map(([label, value]) => (
              <div key={label} className="border border-gold/[0.16] bg-paper/[0.04] p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold">{label}</p>
                <p className="mt-3 font-serif text-3xl tracking-[-0.04em] text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border border-gold/[0.28] bg-gold/[0.06] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{level.name}</p>
            <p className="mt-3 max-w-4xl text-base leading-7 text-paper/[0.72]">{level.text}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 border border-gold/[0.24] bg-gold/[0.06] p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{enhanced.projectedResult}</p>
                <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-white md:text-5xl">{formatMoney(result.compoundFinal, currency, locale)}</h2>
                <p className="mt-2 text-sm font-semibold text-paper/[0.64]">
                  {enhanced.simulationPeriod}: {currentYear} → {currentYear + rows.length} • {enhanced.finalYear}: {currentYear + rows.length}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[560px] lg:grid-cols-3">
                {[
                  [enhanced.realFinal, formatMoney(result.realFinal, currency, locale)],
                  [copy.results.totalContributed, formatMoney(result.totalContributed, currency, locale)],
                  [copy.results.difference, formatMoney(result.compoundFinal - result.simpleFinal, currency, locale)],
                  [copy.results.level, level.name],
                  ...(birthYear ? [
                    [enhanced.currentAge, ageLabel(currentAge ?? 0, enhanced)],
                    [enhanced.finalProjectionAge, ageInYearLabel(finalProjectionAge ?? 0, finalProjectionYear, locale, enhanced)],
                  ] : [[enhanced.finalYear, `${finalProjectionYear}`]]),
                  [enhanced.nominalReturn, `${annualReturn.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
                  [enhanced.realReturn, `${realAnnualReturn.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
                ].map(([label, value]) => (
                  <div key={label} className="border border-paper/[0.1] bg-ink/[0.42] p-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-gold">{label}</p>
                    <p className="mt-1 text-sm font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <label className="mt-6 block">
              <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">
                {copy.results.totalYears}: {years} {enhanced.yearsSuffix}
              </span>
              <input
                type="range"
                min={1}
                max={maxYears}
                value={Math.min(years, maxYears)}
                onChange={(event) => setYears(Number(event.target.value))}
                className="mt-3 w-full accent-gold"
              />
              <span className="mt-2 block text-xs text-paper/[0.55]">{enhanced.finalYear}: {currentYear + Math.min(years, maxYears)}</span>
            </label>
          </div>
          <EvolutionChart rows={rows} currency={currency} locale={locale} copy={copy} dollarRate={dollarRate} labels={enhanced} startYear={currentYear} birthYear={birthYear} />
          <div className="mt-4 border border-gold/[0.16] bg-paper/[0.035] p-4 text-sm leading-6 text-paper/[0.68]">
            <span className="font-bold text-gold">{enhanced.crossing}: </span>
            {loboCrossYear ? `Formiga → Lobo: ${currentYear + loboCrossYear}. ` : `Formiga → Lobo: ${enhanced.noCrossing} `}
            {harpiaCrossYear ? `Lobo → Harpia: ${currentYear + harpiaCrossYear}.` : `Lobo → Harpia: ${enhanced.noCrossing}`}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="border border-gold/[0.18] bg-paper/[0.04] p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{enhanced.inflationTitle}</p>
            <p className="mt-4 text-base leading-7 text-paper/[0.72]">{enhanced.inflationText}</p>
            <p className="mt-4 border-l border-rise/[0.45] pl-4 text-sm leading-6 text-paper/[0.66]">{enhanced.inflationExample}</p>
          </article>

          <article className="border border-gold/[0.24] bg-gold/[0.055] p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{enhanced.nextPathTitle}</p>
            {nextLevelKey && nextTargetUsd && nextTargetLocal ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  [enhanced.currentLevel, level.name],
                  [enhanced.nextLevel, copy.levels[nextLevelKey].name],
                  [enhanced.milestone, formatMoney(nextTargetUsd, "USD", locale)],
                  [enhanced.missingUsd, formatMoney(Math.max(0, nextTargetUsd - usdFinal), "USD", locale)],
                  [enhanced.missingLocal, formatMoney(targetGapLocal, currency, locale)],
                  [enhanced.monthlyNeeded, requiredMonthly !== null && requiredMonthly > 0 ? formatMoney(requiredMonthly, currency, locale) : enhanced.alreadyOnTrackInitial],
                  [enhanced.initialNeeded, requiredInitial !== null && requiredInitial > 0 ? formatMoney(requiredInitial, currency, locale) : enhanced.alreadyOnTrackMonthly],
                ].map(([label, value]) => (
                  <div key={label} className="border border-paper/[0.08] bg-ink/[0.42] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">{label}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-white">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-base leading-7 text-paper/[0.74]">{enhanced.noNextLevel}</p>
            )}
            {nextLevelKey && !rows.some((row) => getLevel(currency === "USD" ? row.compoundFinal : row.compoundFinal / Math.max(dollarRate, 0.01)) === nextLevelKey) ? (
              <p className="mt-4 text-sm font-semibold text-paper/[0.62]">{enhanced.notReached}</p>
            ) : null}
          </article>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-5xl">{copy.how.title}</h2>
            <p className="mt-5 text-lg leading-8 text-paper/[0.72]">{copy.how.text}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-paper/[0.1] bg-paper/[0.04] p-5">
                <h3 className="text-lg font-black text-gold">{copy.how.simpleTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/[0.66]">{copy.how.simpleText}</p>
              </div>
              <div className="border border-gold/[0.22] bg-gold/[0.06] p-5">
                <h3 className="text-lg font-black text-gold">{copy.how.compoundTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/[0.66]">{copy.how.compoundText}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.how.cards.map(([title, text]) => (
              <article key={title} className="border border-gold/[0.14] bg-paper/[0.035] p-5">
                <h3 className="font-black uppercase tracking-[0.12em] text-gold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/[0.68]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-5xl">{enhanced.pillarsTitle}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {(["formiga", "lobo", "harpia"] as WealthLevel[]).map((key) => {
              const item = copy.levels[key];
              const tone = key === "formiga" ? "border-rise/[0.28]" : key === "lobo" ? "border-gold/[0.32]" : "border-gold/[0.55]";
              return (
                <article key={key} className={`border ${tone} bg-paper/[0.04] p-6`}>
                  <h3 className="font-serif text-3xl text-gold">{item.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-paper/[0.7]">{item.text}</p>
                  <div className="mt-5 space-y-2">
                    {item.pillars.map((pillar) => (
                      <p key={pillar} className="border-l border-gold/[0.32] pl-3 text-xs font-bold uppercase tracking-[0.12em] text-paper/[0.62]">
                        {pillar}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-5xl">{copy.tableTitle}</h2>
          <div className="mt-7 overflow-x-auto border border-gold/[0.16]">
            <table className="min-w-[860px] w-full border-collapse bg-paper/[0.035] text-left text-sm">
              <thead className="bg-gold/[0.08] text-[11px] uppercase tracking-[0.14em] text-gold">
                <tr>
                  {(birthYear ? [enhanced.tableHeaders[0], enhanced.age, ...enhanced.tableHeaders.slice(1)] : enhanced.tableHeaders).map((header) => <th key={header} className="px-4 py-4">{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const projectedYear = currentYear + row.year;
                  const rowUsd = currency === "USD" ? row.compoundFinal : row.compoundFinal / Math.max(dollarRate, 0.01);
                  const rowLevel = copy.levels[getLevel(rowUsd)].name;
                  const isCrossing = row.year === loboCrossYear || row.year === harpiaCrossYear;
                  return (
                    <tr key={row.year} className={`border-t text-paper/[0.72] ${isCrossing ? "border-gold/[0.45] bg-gold/[0.08]" : "border-paper/[0.08]"}`}>
                      <td className="px-4 py-4 font-bold text-paper">{projectedYear}</td>
                      {birthYear ? <td className="px-4 py-4 font-bold text-gold">{ageLabel(projectedYear - birthYear, enhanced)}</td> : null}
                      <td className="px-4 py-4">{formatMoney(row.totalContributed, currency, locale)}</td>
                      <td className="px-4 py-4">{formatMoney(row.simpleFinal, currency, locale)}</td>
                      <td className="px-4 py-4 text-gold">{formatMoney(row.compoundFinal, currency, locale)}</td>
                      <td className="px-4 py-4 text-rise">{formatMoney(row.realFinal, currency, locale)}</td>
                      <td className="px-4 py-4">{formatMoney(rowUsd, "USD", locale)}</td>
                      <td className="px-4 py-4 font-bold text-gold">{rowLevel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Aposentadoria</p>
              <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] md:text-5xl">{enhanced.retirementTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-paper/[0.72]">{enhanced.retirementIntro}</p>
              <div className="mt-6 border border-gold/[0.16] bg-paper/[0.035] p-5">
                <h3 className="font-serif text-2xl text-gold">{enhanced.retirementExplanationTitle}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.68]">{enhanced.retirementExplanationText}</p>
              </div>
            </div>

            <div className="border border-gold/[0.18] bg-paper/[0.05] p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <MoneyField label={enhanced.desiredWealth} value={retirementWealth} currency={currency} locale={locale} onChange={setRetirementWealth} />
                <MoneyField label={enhanced.desiredIncome} value={retirementIncome} currency={currency} locale={locale} onChange={setRetirementIncome} />
                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{enhanced.birthYear}</span>
                  <input
                    inputMode="numeric"
                    maxLength={4}
                    placeholder={enhanced.birthYearPlaceholder}
                    value={retirementBirthYearInput}
                    onChange={(event) => setRetirementBirthYearInput(event.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition placeholder:text-paper/[0.32] focus:border-gold"
                  />
                  <span className="mt-2 block text-xs leading-5 text-paper/[0.58]">{enhanced.birthYearHelp}</span>
                </label>
                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{enhanced.retirementReturn}</span>
                  <div className="mt-2 flex items-center border border-gold/[0.18] bg-ink">
                    <span className="pl-4 text-sm font-black text-gold">%</span>
                    <input type="number" value={retirementReturn} onChange={(event) => setRetirementReturn(Number(event.target.value))} className="w-full bg-transparent px-4 py-3 text-lg font-bold text-paper outline-none" />
                  </div>
                </label>
                <label className="block">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{enhanced.retirementInflation}</span>
                  <div className="mt-2 flex items-center border border-gold/[0.18] bg-ink">
                    <span className="pl-4 text-sm font-black text-gold">%</span>
                    <input type="number" value={retirementInflation} onChange={(event) => setRetirementInflation(Number(event.target.value))} className="w-full bg-transparent px-4 py-3 text-lg font-bold text-paper outline-none" />
                  </div>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-black uppercase tracking-[0.16em] text-paper">{enhanced.retirementStrategy}</span>
                  <select value={retirementStrategy} onChange={(event) => setRetirementStrategy(event.target.value as RetirementStrategy)} className="mt-2 w-full border border-gold/[0.18] bg-ink px-4 py-3 text-lg font-bold text-paper outline-none transition focus:border-gold">
                    <option value="income">{enhanced.liveIncome}</option>
                    <option value="drawdown">{enhanced.spendWealth}</option>
                  </select>
                </label>
                <div className="border border-gold/[0.14] bg-ink/[0.52] p-4 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-gold">
                        {enhanced.withdrawalYears}: {safeWithdrawalYears} {enhanced.yearsSuffix}
                      </p>
                      <p className="mt-1 text-xs text-paper/[0.58]">
                        {enhanced.simulationPeriod}: {currentYear} → {currentYear + safeWithdrawalYears}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setWithdrawalYears((value) => Math.max(1, Math.round(value || 1) - 1))}
                        className="border border-gold/[0.28] px-4 py-2 text-sm font-black text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setWithdrawalYears((value) => Math.min(maxYears, Math.round(value || 1) + 1))}
                        className="border border-gold/[0.28] px-4 py-2 text-sm font-black text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={maxYears}
                    value={safeWithdrawalYears}
                    onChange={(event) => setWithdrawalYears(Number(event.target.value))}
                    className="mt-4 w-full accent-gold"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  [enhanced.desiredWealth, formatMoney(retirementWealth, currency, locale)],
                  [enhanced.neededWealth, formatMoney(neededRetirementWealth, currency, locale)],
                  [enhanced.desiredIncome, formatMoney(retirementIncome, currency, locale)],
                  [enhanced.generatedIncome, formatMoney(generatedMonthlyIncome, currency, locale)],
                  [enhanced.realReturn, `${(retirementRealReturn * 100).toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
                  [enhanced.projectedInflation, `${retirementInflation.toLocaleString(copy.lang, { maximumFractionDigits: 2 })}%`],
                  [enhanced.chosenStrategy, retirementStrategy === "income" ? enhanced.liveIncome : enhanced.spendWealth],
                  [enhanced.estimatedDuration, durationLabel],
                  [enhanced.capitalEnds, capitalEndsYear ? `${currentYear + capitalEndsYear}` : enhanced.capitalDoesNotEnd],
                  ...(retirementBirthYear ? [
                    [enhanced.currentAge, ageLabel(retirementCurrentAge ?? 0, enhanced)],
                    [enhanced.finalProjectionAge, ageInYearLabel(retirementFinalProjectionAge ?? 0, retirementFinalProjectionYear, locale, enhanced)],
                    [capitalEndsYear ? enhanced.ageAtCapitalEnd : enhanced.capitalDoesNotEndUntil, capitalEndsYear ? ageInYearLabel(currentYear + capitalEndsYear - retirementBirthYear, currentYear + capitalEndsYear, locale, enhanced) : `${retirementFinalProjectionYear} • ${ageLabel(retirementFinalProjectionAge ?? 0, enhanced)}`],
                  ] : [[enhanced.finalYear, `${retirementFinalProjectionYear}`]]),
                  [copy.results.level, retirementLevel.name],
                ].map(([label, value]) => (
                  <div key={label} className="border border-gold/[0.14] bg-ink/[0.46] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">{label}</p>
                    <p className="mt-2 text-lg font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
              <RetirementChart
                strategy={retirementStrategy}
                currency={currency}
                locale={locale}
                labels={enhanced}
                startYear={currentYear}
                birthYear={retirementBirthYear}
                desiredIncome={retirementIncome}
                generatedIncome={generatedMonthlyIncome}
                incomeGap={monthlyIncomeGap}
                rows={retirementProjectionRows}
                capitalEndsYear={capitalEndsYear}
              />
              <p className={`mt-5 border-l pl-4 text-sm font-semibold leading-6 ${retirementSustains ? "border-rise text-rise" : "border-red-500 text-red-300"}`}>
                {retirementSustains ? enhanced.retirementOk : enhanced.retirementAlert}
              </p>
              <p className="mt-4 text-sm leading-7 text-paper/[0.68]">{retirementLevel.text}</p>
            </div>
          </div>

          <div className="mt-8 border border-rise/[0.28] bg-rise/[0.07] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-rise">Formiga</p>
              <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] md:text-5xl">{enhanced.retirementCtaTitle}</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-paper/[0.72]">{enhanced.retirementCtaText}</p>
            </div>
            <div className="mt-6 flex shrink-0 flex-col gap-3 md:mt-0">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="bg-rise px-5 py-4 text-center text-xs font-black uppercase tracking-[0.14em] text-ink transition hover:bg-paper">
                {copy.formigaButton}
              </a>
              <a href="/educacao" className="border border-gold/[0.35] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink">
                {copy.educationButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8">
        <div className="mx-auto max-w-7xl border border-gold/[0.2] bg-paper/[0.04] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Conta global</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] md:text-5xl">{copy.globalAccountTitle}</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-paper/[0.72]">{copy.globalAccountText}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={fxproLinks[locale] ?? fxproLinks.en} target="_blank" rel="noopener noreferrer" className="bg-gold px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:bg-paper">
              {fxproButtonLabels[locale] ?? copy.fxpro}
            </a>
            <a href={binanceLink} target="_blank" rel="noopener noreferrer" className="border border-gold/[0.35] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink">
              {copy.binance}
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl border border-rise/[0.28] bg-rise/[0.07] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-rise">Formiga</p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] md:text-5xl">{copy.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-paper/[0.72]">{copy.ctaText}</p>
          </div>
          <div className="mt-6 flex shrink-0 flex-col gap-3 md:mt-0">
            <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" className="bg-rise px-5 py-4 text-center text-xs font-black uppercase tracking-[0.14em] text-ink transition hover:bg-paper">
              {copy.formigaButton}
            </a>
            <a href="/educacao" className="border border-gold/[0.35] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink">
              {copy.educationButton}
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-8">
        <div className="mx-auto max-w-7xl border-t border-paper/[0.1] pt-6">
          <p className="text-sm leading-7 text-paper/[0.54]">{copy.disclaimer}</p>
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
