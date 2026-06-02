"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
} from "./SiteSections";
import { translations, type Locale } from "../i18n";
import { normalizedEliteReports } from "../data/eliteReports";
import { ForexBrokerBannerWide } from "./ForexBrokerBannerWide";
import { fxproButtonLabels, fxproLinks } from "../data/fxproLinks";

export const eliteReportPaths: Record<Locale, string> = {
  pt: "/relatorio-elite",
  en: "/elite-report",
  es: "/reporte-elite",
  hi: "/elite-report-hi",
  ar: "/ar/elite-report",
  tr: "/tr/elite-report",
  id: "/id/elite-report",
  vi: "/vi/elite-report",
};

const reportCopy: Record<
  Locale,
  {
    hero: string;
    subtitle: string;
    summaryEyebrow: string;
    summaryTitle: string;
    activeTitle: string;
    activeText: string;
    resultTitle: string;
    resultText: string;
    reportsTitle: string;
    reportsText: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    stats: string[];
    activeLabels: {
      asset: string;
      direction: string;
      status: string;
      pips: string;
      date: string;
      update: string;
      live: string;
      recent: string;
      today: string;
    };
    table: {
      date: string;
      asset: string;
      direction: string;
      result: string;
      status: string;
      report: string;
      reportDate: string;
      reportName: string;
      signals: string;
      view: string;
    };
    buy: string;
    sell: string;
    finished: string;
    available: string;
  }
> = {
  pt: {
    hero: "Relatórios e Resultados Elite",
    subtitle: "Histórico operacional do Canal Elite desde agosto de 2018, com operações ativas, sinais enviados e resultados consolidados.",
    summaryEyebrow: "Histórico Elite",
    summaryTitle: "Central de prova histórica do Canal Elite",
    activeTitle: "Operações ativas",
    activeText: "Uma visão resumida das atividades acompanhadas, sem expor entrada, alvo ou stop completos.",
    resultTitle: "Histórico de resultados",
    resultText: "Resultados em pips organizados para leitura rápida do histórico recente.",
    reportsTitle: "Tabela de relatórios",
    reportsText: "Relatórios consolidados do Canal Elite desde agosto de 2018.",
    ctaTitle: "Acesse os sinais completos no Canal Elite",
    ctaText: "Os relatórios mostram o histórico. O Canal Elite entrega os sinais completos, análises, aulas gravadas e acompanhamento ao vivo para quem deseja seguir a estrutura em tempo real.",
    ctaButton: "ENTRAR NO CANAL ELITE",
    stats: ["Desde agosto de 2018", "+4.200 sinais ao vivo no WhatsApp", "Forex, ouro, petróleo, cripto, índices e moedas globais", "Relatórios operacionais do Canal Elite"],
    activeLabels: { asset: "Ativo", direction: "Direção", status: "Status", pips: "Resultado em pips", date: "Data", update: "Atualização", live: "Ao vivo", recent: "Recente", today: "Atualizado hoje" },
    table: { date: "Data", asset: "Ativo", direction: "Direção", result: "Resultado em pips", status: "Status", report: "Relatório", reportDate: "Data", reportName: "Relatório Elite", signals: "Sinais", view: "Ver" },
    buy: "Compra",
    sell: "Venda",
    finished: "Finalizado",
    available: "Disponível",
  },
  en: {
    hero: "Elite Reports and Results",
    subtitle: "Operational history of the Elite Channel since August 2018, with active trades, sent signals, and consolidated results.",
    summaryEyebrow: "Elite history",
    summaryTitle: "Historical proof center for the Elite Channel",
    activeTitle: "Active operations",
    activeText: "A summarized view of monitored activity without exposing full entry, target, or stop details.",
    resultTitle: "Results history",
    resultText: "Pip results organized for quick reading of recent history.",
    reportsTitle: "Reports table",
    reportsText: "Consolidated Elite Channel reports since August 2018.",
    ctaTitle: "Access the complete signals inside the Elite Channel",
    ctaText: "Reports show the history. The Elite Channel delivers complete signals, analysis, recorded classes, and live monitoring for those who want to follow the structure in real time.",
    ctaButton: "JOIN ELITE CHANNEL",
    stats: ["Since August 2018", "+4,200 live WhatsApp signals", "Forex, gold, oil, crypto, indices, and global currencies", "Operational reports from the Elite Channel"],
    activeLabels: { asset: "Asset", direction: "Direction", status: "Status", pips: "Result in pips", date: "Date", update: "Update", live: "Live", recent: "Recent", today: "Updated today" },
    table: { date: "Date", asset: "Asset", direction: "Direction", result: "Result in pips", status: "Status", report: "Report", reportDate: "Date", reportName: "Elite Report", signals: "Signals", view: "View" },
    buy: "Buy",
    sell: "Sell",
    finished: "Finished",
    available: "Available",
  },
  es: {
    hero: "Reportes y Resultados Elite",
    subtitle: "Histórico operativo del Canal Elite desde agosto de 2018, con operaciones activas, señales enviadas y resultados consolidados.",
    summaryEyebrow: "Histórico Elite",
    summaryTitle: "Central de prueba histórica del Canal Elite",
    activeTitle: "Operaciones activas",
    activeText: "Una visión resumida de las actividades acompañadas, sin exponer entrada, objetivo o stop completos.",
    resultTitle: "Histórico de resultados",
    resultText: "Resultados en pips organizados para una lectura rápida del histórico reciente.",
    reportsTitle: "Tabla de reportes",
    reportsText: "Reportes consolidados del Canal Elite desde agosto de 2018.",
    ctaTitle: "Accede a las señales completas en el Canal Elite",
    ctaText: "Los reportes muestran el histórico. El Canal Elite entrega señales completas, análisis, clases grabadas y seguimiento en vivo para quien desea acompañar la estructura en tiempo real.",
    ctaButton: "ENTRAR AL CANAL ELITE",
    stats: ["Desde agosto de 2018", "+4.200 señales en vivo por WhatsApp", "Forex, oro, petróleo, cripto, índices y monedas globales", "Reportes operativos del Canal Elite"],
    activeLabels: { asset: "Activo", direction: "Dirección", status: "Estado", pips: "Resultado en pips", date: "Fecha", update: "Actualización", live: "En vivo", recent: "Reciente", today: "Actualizado hoy" },
    table: { date: "Fecha", asset: "Activo", direction: "Dirección", result: "Resultado en pips", status: "Estado", report: "Reporte", reportDate: "Fecha", reportName: "Reporte Elite", signals: "Señales", view: "Ver" },
    buy: "Compra",
    sell: "Venta",
    finished: "Finalizado",
    available: "Disponible",
  },
  hi: {
    hero: "Elite रिपोर्ट और परिणाम",
    subtitle: "अगस्त 2018 से Elite चैनल का इतिहास, सक्रिय ऑपरेशन, भेजे गए सिग्नल और संकलित परिणाम।",
    summaryEyebrow: "Elite इतिहास",
    summaryTitle: "Elite चैनल का ऐतिहासिक परिणाम केंद्र",
    activeTitle: "सक्रिय ऑपरेशन",
    activeText: "Entry, target या stop को पूरा उजागर किए बिना गतिविधियों का संक्षिप्त दृश्य।",
    resultTitle: "परिणाम इतिहास",
    resultText: "हाल के इतिहास को जल्दी पढ़ने के लिए pips परिणाम व्यवस्थित।",
    reportsTitle: "रिपोर्ट तालिका",
    reportsText: "अगस्त 2018 से Elite चैनल की संकलित रिपोर्ट।",
    ctaTitle: "Elite चैनल में पूर्ण सिग्नल प्राप्त करें",
    ctaText: "रिपोर्ट इतिहास दिखाती हैं। Elite चैनल पूर्ण सिग्नल, विश्लेषण, रिकॉर्डेड क्लास और लाइव acompanhamento देता है।",
    ctaButton: "ELITE चैनल में शामिल हों",
    stats: ["अगस्त 2018 से", "WhatsApp पर +4,200 लाइव सिग्नल", "Forex, gold, oil, crypto, indices और global currencies", "Elite चैनल की operational reports"],
    activeLabels: { asset: "Asset", direction: "Direction", status: "Status", pips: "Pips result", date: "Date", update: "Update", live: "Live", recent: "Recent", today: "आज अपडेट" },
    table: { date: "Date", asset: "Asset", direction: "Direction", result: "Pips result", status: "Status", report: "Report", reportDate: "Date", reportName: "Elite Report", signals: "Signals", view: "View" },
    buy: "Buy",
    sell: "Sell",
    finished: "Closed",
    available: "Available",
  },
  ar: {
    hero: "تقارير ونتائج Elite",
    subtitle: "السجل التشغيلي لقناة Elite منذ أغسطس 2018، مع العمليات النشطة والإشارات المرسلة والنتائج المجمعة.",
    summaryEyebrow: "سجل Elite",
    summaryTitle: "مركز الإثبات التاريخي لقناة Elite",
    activeTitle: "العمليات النشطة",
    activeText: "عرض مختصر للنشاط المتابع دون كشف الدخول أو الهدف أو الوقف بالكامل.",
    resultTitle: "سجل النتائج",
    resultText: "نتائج بالنقاط منظمة لقراءة سريعة للتاريخ الحديث.",
    reportsTitle: "جدول التقارير",
    reportsText: "تقارير قناة Elite المجمعة منذ أغسطس 2018.",
    ctaTitle: "احصل على الإشارات الكاملة داخل قناة Elite",
    ctaText: "التقارير تعرض التاريخ. قناة Elite تقدم الإشارات الكاملة والتحليلات والدروس المسجلة والمتابعة المباشرة.",
    ctaButton: "انضم إلى قناة Elite",
    stats: ["منذ أغسطس 2018", "+4,200 إشارة مباشرة عبر WhatsApp", "Forex والذهب والنفط والكريبتو والمؤشرات والعملات العالمية", "تقارير تشغيلية لقناة Elite"],
    activeLabels: { asset: "الأصل", direction: "الاتجاه", status: "الحالة", pips: "النتيجة بالنقاط", date: "التاريخ", update: "التحديث", live: "مباشر", recent: "حديث", today: "محدث اليوم" },
    table: { date: "التاريخ", asset: "الأصل", direction: "الاتجاه", result: "النتيجة بالنقاط", status: "الحالة", report: "التقرير", reportDate: "التاريخ", reportName: "تقرير Elite", signals: "الإشارات", view: "عرض" },
    buy: "شراء",
    sell: "بيع",
    finished: "منتهية",
    available: "متاح",
  },
  tr: {
    hero: "Elite Raporları ve Sonuçları",
    subtitle: "Ağustos 2018'den beri Elite Kanalı'nın operasyonel geçmişi, aktif işlemler, gönderilen sinyaller ve konsolide sonuçlar.",
    summaryEyebrow: "Elite geçmişi",
    summaryTitle: "Elite Kanalı için tarihsel sonuç merkezi",
    activeTitle: "Aktif işlemler",
    activeText: "Giriş, hedef veya stop detaylarını tamamen göstermeden izlenen aktivitelerin kısa görünümü.",
    resultTitle: "Sonuç geçmişi",
    resultText: "Yakın geçmişin hızlı okunması için pips sonuçları.",
    reportsTitle: "Rapor tablosu",
    reportsText: "Ağustos 2018'den beri Elite Kanalı konsolide raporları.",
    ctaTitle: "Elite Kanalı içinde tam sinyallere erişin",
    ctaText: "Raporlar geçmişi gösterir. Elite Kanalı, tam sinyaller, analizler, kayıtlı dersler ve canlı takip sunar.",
    ctaButton: "ELITE KANALINA KATIL",
    stats: ["Ağustos 2018'den beri", "WhatsApp'ta +4.200 canlı sinyal", "Forex, altın, petrol, kripto, endeksler ve küresel para birimleri", "Elite Kanalı operasyonel raporları"],
    activeLabels: { asset: "Varlık", direction: "Yön", status: "Durum", pips: "Pips sonucu", date: "Tarih", update: "Güncelleme", live: "Canlı", recent: "Yakın", today: "Bugün güncellendi" },
    table: { date: "Tarih", asset: "Varlık", direction: "Yön", result: "Pips sonucu", status: "Durum", report: "Rapor", reportDate: "Tarih", reportName: "Elite Raporu", signals: "Sinyaller", view: "Gör" },
    buy: "Alış",
    sell: "Satış",
    finished: "Tamamlandı",
    available: "Mevcut",
  },
  id: {
    hero: "Laporan dan Hasil Elite",
    subtitle: "Riwayat operasional Canal Elite sejak Agustus 2018, dengan operasi aktif, sinyal terkirim, dan hasil terkonsolidasi.",
    summaryEyebrow: "Riwayat Elite",
    summaryTitle: "Pusat bukti historis Canal Elite",
    activeTitle: "Operasi aktif",
    activeText: "Ringkasan aktivitas yang dipantau tanpa menampilkan entry, target, atau stop secara lengkap.",
    resultTitle: "Riwayat hasil",
    resultText: "Hasil dalam pips disusun untuk membaca riwayat terbaru dengan cepat.",
    reportsTitle: "Tabel laporan",
    reportsText: "Laporan terkonsolidasi Canal Elite sejak Agustus 2018.",
    ctaTitle: "Akses sinyal lengkap di Canal Elite",
    ctaText: "Laporan menunjukkan riwayat. Canal Elite memberikan sinyal lengkap, analisis, kelas rekaman, dan pemantauan live.",
    ctaButton: "MASUK CANAL ELITE",
    stats: ["Sejak Agustus 2018", "+4.200 sinyal live di WhatsApp", "Forex, emas, minyak, kripto, indeks, dan mata uang global", "Laporan operasional Canal Elite"],
    activeLabels: { asset: "Aset", direction: "Arah", status: "Status", pips: "Hasil pips", date: "Tanggal", update: "Update", live: "Live", recent: "Terbaru", today: "Diperbarui hari ini" },
    table: { date: "Tanggal", asset: "Aset", direction: "Arah", result: "Hasil pips", status: "Status", report: "Laporan", reportDate: "Tanggal", reportName: "Laporan Elite", signals: "Sinyal", view: "Lihat" },
    buy: "Buy",
    sell: "Sell",
    finished: "Selesai",
    available: "Tersedia",
  },
  vi: {
    hero: "Báo Cáo và Kết Quả Elite",
    subtitle: "Lịch sử vận hành của Canal Elite từ tháng 8/2018, với giao dịch đang hoạt động, tín hiệu đã gửi và kết quả tổng hợp.",
    summaryEyebrow: "Lịch sử Elite",
    summaryTitle: "Trung tâm bằng chứng lịch sử của Canal Elite",
    activeTitle: "Giao dịch đang hoạt động",
    activeText: "Tổng quan ngắn về hoạt động được theo dõi mà không hiển thị đầy đủ entry, target hoặc stop.",
    resultTitle: "Lịch sử kết quả",
    resultText: "Kết quả theo pips được sắp xếp để đọc nhanh lịch sử gần đây.",
    reportsTitle: "Bảng báo cáo",
    reportsText: "Báo cáo tổng hợp của Canal Elite từ tháng 8/2018.",
    ctaTitle: "Truy cập tín hiệu đầy đủ trong Canal Elite",
    ctaText: "Báo cáo thể hiện lịch sử. Canal Elite cung cấp tín hiệu đầy đủ, phân tích, lớp học ghi sẵn và theo dõi trực tiếp.",
    ctaButton: "THAM GIA CANAL ELITE",
    stats: ["Từ tháng 8/2018", "+4.200 tín hiệu live trên WhatsApp", "Forex, vàng, dầu, crypto, chỉ số và tiền tệ toàn cầu", "Báo cáo vận hành của Canal Elite"],
    activeLabels: { asset: "Tài sản", direction: "Hướng", status: "Trạng thái", pips: "Kết quả pips", date: "Ngày", update: "Cập nhật", live: "Live", recent: "Gần đây", today: "Cập nhật hôm nay" },
    table: { date: "Ngày", asset: "Tài sản", direction: "Hướng", result: "Kết quả pips", status: "Trạng thái", report: "Báo cáo", reportDate: "Ngày", reportName: "Báo cáo Elite", signals: "Tín hiệu", view: "Xem" },
    buy: "Buy",
    sell: "Sell",
    finished: "Hoàn tất",
    available: "Có sẵn",
  },
};

type PublicOperation = {
  asset: string;
  direction: "Compra" | "Venda";
  status: "active" | "closed";
  result: string;
  date: string;
  updatedAt: string;
  reportMonth: string;
};

const publicOperationsSnapshot: PublicOperation[] = [
  {
    asset: "XAU/USD",
    direction: "Compra",
    status: "active",
    result: "+187 pips",
    date: "Junho/2026",
    updatedAt: "public-snapshot",
    reportMonth: "Junho/2026",
  },
  {
    asset: "EUR/USD",
    direction: "Venda",
    status: "active",
    result: "+42 pips",
    date: "Junho/2026",
    updatedAt: "public-snapshot",
    reportMonth: "Junho/2026",
  },
  {
    asset: "USOIL",
    direction: "Compra",
    status: "closed",
    result: "+713 pips",
    date: "Maio/2026",
    updatedAt: "Finalizado",
    reportMonth: "Maio/2026",
  },
  {
    asset: "GBP/JPY",
    direction: "Venda",
    status: "closed",
    result: "+92 pips",
    date: "Maio/2026",
    updatedAt: "Finalizado",
    reportMonth: "Maio/2026",
  },
  {
    asset: "XAU/USD",
    direction: "Compra",
    status: "closed",
    result: "+187 pips",
    date: "Fevereiro/2026",
    updatedAt: "Finalizado",
    reportMonth: "Fevereiro/2026",
  },
];

function getPublicOperationsSnapshot() {
  // Source reference for future server-side refresh:
  // https://www.mql5.com/en/signals/2359292?source=Site+Signals+My
  // The public UI intentionally exposes only summarized, non-sensitive fields.
  return publicOperationsSnapshot;
}

const reportPageCopy: Record<
  Locale,
  {
    activeTitle: string;
    activeText: string;
    protectedFieldsTitle: string;
    entry: string;
    target: string;
    stop: string;
    partialResult: string;
    monthlyTitle: string;
    monthlyText: string;
    month: string;
    signalCount: string;
    totalPips: string;
    mainAssets: string;
    brokerTitle: string;
    brokerText: string;
    brokerButton: string;
    brokerBannerText: string;
    ctaTitle: string;
    ctaText: string;
    disclaimer: string;
  }
> = {
  pt: {
    activeTitle: "Operacoes ativas",
    activeText: "Acompanhe uma visao resumida das operacoes em andamento. Os detalhes completos de entrada, alvo e stop sao liberados apenas dentro do Canal Elite.",
    protectedFieldsTitle: "Campos protegidos",
    entry: "Entrada",
    target: "Alvo",
    stop: "Stop",
    partialResult: "Resultado parcial",
    monthlyTitle: "Relatorio mensal do Canal Elite",
    monthlyText: "Resultados organizados por mes, com operacoes finalizadas e desempenho consolidado.",
    month: "Mes/Ano",
    signalCount: "Quantidade de sinais",
    totalPips: "Resultado total em pips",
    mainAssets: "Principais ativos operados",
    brokerTitle: "Abra sua conta e acompanhe os mercados globais",
    brokerText: "Para acompanhar os sinais do Canal Elite, voce precisa operar em sua propria conta. Abra sua conta na corretora parceira e acesse Forex, ouro, petroleo, indices e moedas globais.",
    brokerButton: "ABRIR CONTA FXPRO",
    brokerBannerText: "Clique no banner para acessar a corretora no idioma correto.",
    ctaTitle: "Acesse os sinais completos no Canal Elite",
    ctaText: "A pagina publica mostra o historico e uma visao resumida das operacoes. Os sinais completos, com entrada, alvo, stop, analise e acompanhamento, sao enviados diretamente no WhatsApp para membros do Canal Elite.",
    disclaimer: "Conteudo educacional e informativo. Historico, sinais e dados publicos nao constituem promessa de rentabilidade, recomendacao individual ou garantia de resultado. Operacoes em Forex, criptoativos, commodities, indices e outros mercados envolvem risco e podem resultar em perdas.",
  },
  en: {
    activeTitle: "Active operations",
    activeText: "Follow a summarized view of ongoing operations. Full entry, target, and stop details are released only inside the Elite Channel.",
    protectedFieldsTitle: "Protected fields",
    entry: "Entry",
    target: "Target",
    stop: "Stop",
    partialResult: "Partial result",
    monthlyTitle: "Elite Channel monthly report",
    monthlyText: "Results organized by month, with completed operations and consolidated performance.",
    month: "Month/Year",
    signalCount: "Signal count",
    totalPips: "Total result in pips",
    mainAssets: "Main traded assets",
    brokerTitle: "Open your account and follow global markets",
    brokerText: "To follow Elite Channel signals, you trade in your own account. Open an account with the partner broker and access Forex, gold, oil, indices, and global currencies.",
    brokerButton: "OPEN FXPRO ACCOUNT",
    brokerBannerText: "Click the banner to access the broker in the correct language.",
    ctaTitle: "Access the complete signals inside the Elite Channel",
    ctaText: "The public page shows history and a summarized view of operations. Complete signals, with entry, target, stop, analysis, and monitoring, are sent directly on WhatsApp to Elite Channel members.",
    disclaimer: "Educational and informational content only. Historical data, signals, and public metrics do not represent a promise of profitability, individual recommendation, or guarantee of results. Forex, crypto, commodities, indices, and other markets involve risk and may result in losses.",
  },
  es: {
    activeTitle: "Operaciones activas",
    activeText: "Acompana una vision resumida de las operaciones en curso. Los detalles completos de entrada, objetivo y stop se liberan solo dentro del Canal Elite.",
    protectedFieldsTitle: "Campos protegidos",
    entry: "Entrada",
    target: "Objetivo",
    stop: "Stop",
    partialResult: "Resultado parcial",
    monthlyTitle: "Reporte mensual del Canal Elite",
    monthlyText: "Resultados organizados por mes, con operaciones finalizadas y desempeno consolidado.",
    month: "Mes/Ano",
    signalCount: "Cantidad de senales",
    totalPips: "Resultado total en pips",
    mainAssets: "Principales activos operados",
    brokerTitle: "Abre tu cuenta y acompana los mercados globales",
    brokerText: "Para acompanar las senales del Canal Elite, operas en tu propia cuenta. Abre tu cuenta con el broker asociado y accede a Forex, oro, petroleo, indices y monedas globales.",
    brokerButton: "ABRIR CUENTA FXPRO",
    brokerBannerText: "Haz clic en el banner para acceder al broker en el idioma correcto.",
    ctaTitle: "Accede a las senales completas en el Canal Elite",
    ctaText: "La pagina publica muestra el historico y una vision resumida de las operaciones. Las senales completas, con entrada, objetivo, stop, analisis y seguimiento, se envian directamente por WhatsApp a miembros del Canal Elite.",
    disclaimer: "Contenido educativo e informativo. El historico, las senales y los datos publicos no constituyen promesa de rentabilidad, recomendacion individual ni garantia de resultado. Forex, criptoactivos, commodities, indices y otros mercados implican riesgo y pueden generar perdidas.",
  },
  hi: {
    activeTitle: "सक्रिय ऑपरेशन",
    activeText: "चल रहे ऑपरेशन का संक्षिप्त दृश्य देखें। पूरी एंट्री, लक्ष्य और स्टॉप की जानकारी केवल Elite Channel के अंदर जारी की जाती है।",
    protectedFieldsTitle: "सुरक्षित फील्ड",
    entry: "एंट्री",
    target: "लक्ष्य",
    stop: "स्टॉप",
    partialResult: "आंशिक परिणाम",
    monthlyTitle: "Elite Channel मासिक रिपोर्ट",
    monthlyText: "महीने के अनुसार परिणाम, पूर्ण ऑपरेशन और समेकित प्रदर्शन के साथ।",
    month: "माह/वर्ष",
    signalCount: "सिग्नल संख्या",
    totalPips: "कुल पिप्स परिणाम",
    mainAssets: "मुख्य ट्रेडेड एसेट्स",
    brokerTitle: "अपना खाता खोलें और ग्लोबल मार्केट्स को फॉलो करें",
    brokerText: "Elite Channel सिग्नल फॉलो करने के लिए आप अपने ही खाते में ऑपरेट करते हैं। पार्टनर ब्रोकर में खाता खोलें और Forex, गोल्ड, ऑयल, इंडेक्स और ग्लोबल करेंसी तक पहुंचें।",
    brokerButton: "FXPRO ACCOUNT खोलें",
    brokerBannerText: "सही भाषा में ब्रोकर तक पहुंचने के लिए बैनर पर क्लिक करें।",
    ctaTitle: "Elite Channel में पूर्ण सिग्नल प्राप्त करें",
    ctaText: "यह सार्वजनिक पेज इतिहास और ऑपरेशन का संक्षिप्त दृश्य दिखाता है। एंट्री, लक्ष्य, स्टॉप, विश्लेषण और acompanhamento सहित पूर्ण सिग्नल Elite Channel सदस्यों को WhatsApp पर भेजे जाते हैं।",
    disclaimer: "यह सामग्री केवल शिक्षा और सूचना के लिए है। इतिहास, सिग्नल और सार्वजनिक डेटा लाभ की गारंटी, व्यक्तिगत सलाह या परिणाम की गारंटी नहीं हैं। Forex, क्रिप्टो, commodities, indices और अन्य बाजार जोखिम वाले हैं और नुकसान हो सकता है।",
  },
  ar: {
    activeTitle: "العمليات النشطة",
    activeText: "تابع عرضا مختصرا للعمليات الجارية. تفاصيل الدخول والهدف ووقف الخسارة الكاملة متاحة فقط داخل قناة Elite.",
    protectedFieldsTitle: "حقول محمية",
    entry: "الدخول",
    target: "الهدف",
    stop: "وقف الخسارة",
    partialResult: "النتيجة الجزئية",
    monthlyTitle: "التقرير الشهري لقناة Elite",
    monthlyText: "نتائج منظمة حسب الشهر مع العمليات المكتملة والأداء المجمع.",
    month: "الشهر/السنة",
    signalCount: "عدد الإشارات",
    totalPips: "إجمالي النتيجة بالنقاط",
    mainAssets: "أهم الأصول المتداولة",
    brokerTitle: "افتح حسابك وتابع الأسواق العالمية",
    brokerText: "لمتابعة إشارات قناة Elite، تحتاج إلى التداول في حسابك الخاص. افتح حسابا لدى الوسيط الشريك وادخل إلى الفوركس والذهب والنفط والمؤشرات والعملات العالمية.",
    brokerButton: "فتح حساب FXPro",
    brokerBannerText: "اضغط على البانر للوصول إلى الوسيط باللغة المناسبة.",
    ctaTitle: "احصل على الإشارات الكاملة داخل قناة Elite",
    ctaText: "تعرض الصفحة العامة التاريخ ورؤية مختصرة للعمليات. الإشارات الكاملة مع الدخول والهدف ووقف الخسارة والتحليل والمتابعة ترسل مباشرة عبر WhatsApp لأعضاء قناة Elite.",
    disclaimer: "المحتوى تعليمي وإعلامي فقط. البيانات التاريخية والإشارات والمعلومات العامة لا تمثل وعدا بالربحية أو توصية فردية أو ضمانا للنتائج. الفوركس والعملات الرقمية والسلع والمؤشرات والأسواق الأخرى تنطوي على مخاطر وقد تؤدي إلى خسائر.",
  },
  tr: {
    activeTitle: "Aktif islemler",
    activeText: "Devam eden islemlerin ozet gorunumunu izleyin. Tam giris, hedef ve stop detaylari yalnizca Elite Channel icinde yayinlanir.",
    protectedFieldsTitle: "Korumali alanlar",
    entry: "Giris",
    target: "Hedef",
    stop: "Stop",
    partialResult: "Kismi sonuc",
    monthlyTitle: "Elite Channel aylik raporu",
    monthlyText: "Tamamlanan islemler ve konsolide performansla aya gore organize edilen sonuclar.",
    month: "Ay/Yil",
    signalCount: "Sinyal sayisi",
    totalPips: "Toplam pips sonucu",
    mainAssets: "Baslica islem varliklari",
    brokerTitle: "Hesabinizi acin ve kuresel piyasalari takip edin",
    brokerText: "Elite Channel sinyallerini takip etmek icin kendi hesabinizda islem yaparsiniz. Partner araci kurumda hesap acin ve Forex, altin, petrol, endeksler ve kuresel para birimlerine erisin.",
    brokerButton: "FXPRO HESABI AC",
    brokerBannerText: "Araci kuruma dogru dilde erismek icin bannera tiklayin.",
    ctaTitle: "Elite Channel icinde tam sinyallere erisin",
    ctaText: "Genel sayfa gecmisi ve islemlerin ozet gorunumunu gosterir. Giris, hedef, stop, analiz ve takip iceren tam sinyaller Elite Channel uyelerine WhatsApp uzerinden gonderilir.",
    disclaimer: "Bu icerik yalnizca egitim ve bilgi amaclidir. Gecmis veriler, sinyaller ve kamu metrikleri kar vaadi, bireysel tavsiye veya sonuc garantisi degildir. Forex, kripto, emtia, endeksler ve diger piyasalar risk icerir ve kayiplara yol acabilir.",
  },
  id: {
    activeTitle: "Operasi aktif",
    activeText: "Ikuti ringkasan operasi yang sedang berjalan. Detail entry, target, dan stop lengkap hanya dirilis di dalam Canal Elite.",
    protectedFieldsTitle: "Field terlindungi",
    entry: "Entry",
    target: "Target",
    stop: "Stop",
    partialResult: "Hasil sementara",
    monthlyTitle: "Laporan bulanan Canal Elite",
    monthlyText: "Hasil disusun per bulan, dengan operasi selesai dan performa terkonsolidasi.",
    month: "Bulan/Tahun",
    signalCount: "Jumlah sinyal",
    totalPips: "Total hasil pips",
    mainAssets: "Aset utama yang diperdagangkan",
    brokerTitle: "Buka akun Anda dan ikuti pasar global",
    brokerText: "Untuk mengikuti sinyal Canal Elite, Anda bertransaksi di akun Anda sendiri. Buka akun di broker partner dan akses Forex, emas, minyak, indeks, dan mata uang global.",
    brokerButton: "BUKA AKUN FXPRO",
    brokerBannerText: "Klik banner untuk mengakses broker dalam bahasa yang tepat.",
    ctaTitle: "Akses sinyal lengkap di Canal Elite",
    ctaText: "Halaman publik menampilkan riwayat dan ringkasan operasi. Sinyal lengkap dengan entry, target, stop, analisis, dan pemantauan dikirim langsung melalui WhatsApp untuk anggota Canal Elite.",
    disclaimer: "Konten ini bersifat edukasi dan informasi. Data historis, sinyal, dan metrik publik bukan janji profit, rekomendasi individual, atau jaminan hasil. Forex, kripto, komoditas, indeks, dan pasar lain memiliki risiko dan dapat menyebabkan kerugian.",
  },
  vi: {
    activeTitle: "Giao dich dang hoat dong",
    activeText: "Theo doi tong quan ngan gon ve cac giao dich dang dien ra. Chi tiet day du ve diem vao lenh, muc tieu va dung lo chi duoc phat hanh trong Canal Elite.",
    protectedFieldsTitle: "Truong duoc bao ve",
    entry: "Diem vao",
    target: "Muc tieu",
    stop: "Dung lo",
    partialResult: "Ket qua tam thoi",
    monthlyTitle: "Bao cao hang thang Canal Elite",
    monthlyText: "Ket qua duoc sap xep theo thang, voi cac giao dich da hoan tat va hieu suat tong hop.",
    month: "Thang/Nam",
    signalCount: "So luong tin hieu",
    totalPips: "Tong ket qua pips",
    mainAssets: "Tai san giao dich chinh",
    brokerTitle: "Mo tai khoan va theo doi thi truong toan cau",
    brokerText: "De theo doi tin hieu Canal Elite, ban giao dich trong tai khoan cua chinh minh. Mo tai khoan voi broker doi tac va truy cap Forex, vang, dau, chi so va tien te toan cau.",
    brokerButton: "MO TAI KHOAN FXPRO",
    brokerBannerText: "Nhan vao banner de truy cap broker dung ngon ngu.",
    ctaTitle: "Truy cap tin hieu day du trong Canal Elite",
    ctaText: "Trang cong khai hien thi lich su va tong quan ngan gon ve giao dich. Tin hieu day du voi diem vao, muc tieu, dung lo, phan tich va theo doi duoc gui truc tiep tren WhatsApp cho thanh vien Canal Elite.",
    disclaimer: "Noi dung chi mang tinh giao duc va thong tin. Du lieu lich su, tin hieu va so lieu cong khai khong phai loi hua loi nhuan, khuyen nghi ca nhan hay dam bao ket qua. Forex, crypto, hang hoa, chi so va cac thi truong khac co rui ro va co the gay thua lo.",
  },
};

function localizeDirection(direction: string, copy: (typeof reportCopy)["pt"]) {
  return direction === "Compra" ? copy.buy : copy.sell;
}

function parsePips(result: string) {
  return Number(result.replace(/[^\d.-]/g, "")) || 0;
}

function getMonthlyReports(operations: PublicOperation[]) {
  const closed = operations.filter((operation) => operation.status === "closed");
  const map = new Map<string, { month: string; count: number; totalPips: number; assets: Set<string> }>();

  for (const operation of closed) {
    const current = map.get(operation.reportMonth) ?? {
      month: operation.reportMonth,
      count: 0,
      totalPips: 0,
      assets: new Set<string>(),
    };
    current.count += 1;
    current.totalPips += parsePips(operation.result);
    current.assets.add(operation.asset);
    map.set(operation.reportMonth, current);
  }

  return Array.from(map.values()).map((report) => ({
    ...report,
    assetsLabel: Array.from(report.assets).join(", "),
    totalPipsLabel: `${report.totalPips >= 0 ? "+" : ""}${report.totalPips} pips`,
  }));
}

function EliteBadge() {
  return (
    <span className="inline-flex min-w-[84px] items-center justify-center border border-gold/[0.45] bg-gold/[0.12] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gold shadow-[0_0_24px_rgba(201,155,62,0.12)]">
      ELITE
    </span>
  );
}

function reportHref(year: string) {
  return `/historico/${year}`;
}

export default function EliteReportHub({ initialLocale }: { initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = translations[locale];
  const copy = reportCopy[locale] ?? reportCopy.en;
  const publicCopy = reportPageCopy[locale] ?? reportPageCopy.en;
  const ctaHref = locale === "pt" ? ELITE_LASTLINK_URL : ELITE_STRIPE_LINKS[3];
  const publicOperations = getPublicOperationsSnapshot();
  const liveOperations = publicOperations.filter((operation) => operation.status === "active");
  const completedOperations = publicOperations.filter((operation) => operation.status === "closed");
  const monthlyReports = getMonthlyReports(publicOperations);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("varejo_language", nextLocale);
    window.localStorage.setItem("language", nextLocale);
    window.location.href = eliteReportPaths[nextLocale];
  }

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.1] blur-3xl" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeader eyebrow="Elite" title={copy.hero} text={copy.subtitle} />
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.stats.map((stat) => (
                <motion.article
                  key={stat}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="terminal-module border border-gold/[0.16] bg-white p-5 shadow-fine"
                >
                  <p className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-ink/[0.72]">{stat}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={copy.summaryEyebrow} title={copy.summaryTitle} text={copy.reportsText} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["2018", copy.stats[0], "text-gold"],
              ["4.200+", copy.stats[1], "text-rise"],
              ["6+", copy.stats[2], "text-gold"],
              ["Elite", copy.stats[3], "text-rise"],
            ].map(([value, label, tone]) => (
              <article key={label} className="terminal-module border border-ink/[0.12] bg-paper p-6">
                <p className={`font-mono text-3xl font-black ${tone}`}>{value}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-ink/[0.58]">{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Elite" title={publicCopy.activeTitle} text={publicCopy.activeText} />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {liveOperations.map((operation, index) => (
              <motion.article
                key={`${operation.asset}-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                variants={fadeUp}
                className="terminal-module relative overflow-hidden border border-rise/[0.18] bg-white p-6 shadow-fine"
              >
                <div className="absolute inset-0 terminal-grid opacity-25" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">{copy.activeLabels.asset}</p>
                    <h3 className="mt-3 font-mono text-3xl font-black">{operation.asset}</h3>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-rise shadow-[0_0_16px_rgba(15,143,86,0.55)]" />
                </div>
                <div className="relative mt-8 grid gap-3">
                  {[
                    [copy.activeLabels.direction, localizeDirection(operation.direction, copy)],
                    [copy.activeLabels.status, copy.activeLabels.live],
                    [publicCopy.partialResult, operation.result],
                    [copy.activeLabels.date, operation.date],
                    [copy.activeLabels.update, operation.updatedAt === "public-snapshot" ? copy.activeLabels.today : operation.updatedAt],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 border-t border-ink/[0.08] pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/[0.48]">{label}</span>
                      <span className={`text-sm font-bold ${String(value).startsWith("+") ? "text-rise" : "text-ink"}`}>{value}</span>
                    </div>
                  ))}
                  <div className="mt-2 border-t border-gold/[0.16] pt-4">
                    <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-gold">{publicCopy.protectedFieldsTitle}</p>
                    {[
                      publicCopy.entry,
                      publicCopy.target,
                      publicCopy.stop,
                    ].map((label) => (
                      <div key={label} className="flex items-center justify-between gap-4 border-t border-ink/[0.08] py-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/[0.48]">{label}</span>
                        <EliteBadge />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <SectionHeader eyebrow="FXPro" title={publicCopy.brokerTitle} text={publicCopy.brokerText} />
            <div className="terminal-module border border-gold/[0.2] bg-paper p-6 shadow-fine">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">Forex</p>
              <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-ink md:text-4xl">{fxproButtonLabels[locale]}</h3>
              <p className="mt-4 leading-7 text-ink/[0.66]">{publicCopy.brokerBannerText}</p>
              <a
                href={fxproLinks[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button-gold mt-6 inline-flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 md:w-auto"
              >
                {publicCopy.brokerButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Pips" title={copy.resultTitle} text={copy.resultText} />
          <div className="mt-8 hidden overflow-x-auto border border-ink/[0.12] bg-paper shadow-fine md:block">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  {[copy.table.date, copy.table.asset, copy.table.direction, copy.table.result, copy.table.status, copy.table.report].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-bold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {completedOperations.map((row) => (
                  <tr key={`${row.date}-${row.asset}`} className="border-b border-ink/[0.08] transition hover:bg-rise/[0.05]">
                    <td className="px-5 py-5 text-sm text-ink/[0.68]">{row.date}</td>
                    <td className="px-5 py-5 font-mono text-sm font-bold">{row.asset}</td>
                    <td className={`px-5 py-5 text-sm font-bold ${row.direction === "Compra" ? "text-rise" : "text-fall"}`}>{localizeDirection(row.direction, copy)}</td>
                    <td className="px-5 py-5 font-mono text-sm font-bold text-rise">{row.result}</td>
                    <td className="px-5 py-5 text-sm uppercase tracking-[0.14em] text-ink/[0.58]">{copy.finished}</td>
                    <td className="px-5 py-5">
                      <a href="/historico/2024" className="inline-block border border-ink/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold">
                        {copy.table.view}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {completedOperations.map((row) => (
              <article key={`${row.date}-${row.asset}-mobile`} className="terminal-module border border-ink/[0.12] bg-paper p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-2xl font-black">{row.asset}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink/[0.5]">{row.date}</p>
                  </div>
                  <span className="font-mono text-lg font-bold text-rise">{row.result}</span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink/[0.08] pt-4 text-sm">
                  <span className={row.direction === "Compra" ? "text-rise" : "text-fall"}>{localizeDirection(row.direction, copy)}</span>
                  <span className="uppercase tracking-[0.14em] text-ink/[0.54]">{copy.finished}</span>
                </div>
                <a href="/historico/2024" className="mt-5 block border border-gold/[0.28] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:text-gold">
                  {copy.table.view}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Elite" title={publicCopy.monthlyTitle} text={publicCopy.monthlyText} />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {monthlyReports.map((report) => (
              <article key={report.month} className="terminal-module border border-gold/[0.18] bg-white p-6 shadow-fine">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{publicCopy.month}</p>
                <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em]">{report.month}</h3>
                <div className="mt-6 grid gap-3">
                  {[
                    [publicCopy.signalCount, String(report.count)],
                    [publicCopy.totalPips, report.totalPipsLabel],
                    [publicCopy.mainAssets, report.assetsLabel],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-ink/[0.08] pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/[0.46]">{label}</p>
                      <p className={`mt-1 font-mono text-sm font-bold ${String(value).startsWith("+") ? "text-rise" : "text-ink"}`}>{value}</p>
                    </div>
                  ))}
                </div>
                <a href="/historico/2024" className="mt-6 block border border-gold/[0.28] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:bg-gold hover:text-ink">
                  {copy.table.view}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={copy.summaryEyebrow} title={copy.reportsTitle} text={copy.reportsText} />
          <div className="mt-8 hidden overflow-x-auto border border-ink/[0.12] bg-white shadow-fine md:block">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.22em] text-gold">
                <tr>
                  {[copy.table.reportDate, copy.table.reportName, copy.table.signals, copy.table.result, copy.table.status, copy.table.view].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-bold">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {normalizedEliteReports.map((report) => (
                  <tr key={report.year} className="border-b border-ink/[0.08] transition hover:bg-rise/[0.05]">
                    <td className="px-5 py-5 text-sm text-ink/[0.72]">{report.period}</td>
                    <td className="px-5 py-5 text-sm font-bold text-ink">{copy.table.reportName}</td>
                    <td className="px-5 py-5 text-sm text-ink/[0.72]">{report.totalSignals} {copy.table.signals.toLowerCase()}</td>
                    <td className="px-5 py-5 font-mono text-sm font-bold text-rise">{report.year === "2018" ? "+18,4%" : report.year === "2021" ? "+11,2%" : "+22,7%"}</td>
                    <td className="px-5 py-5 text-sm uppercase tracking-[0.14em] text-ink/[0.58]">{copy.available}</td>
                    <td className="px-5 py-5">
                      <a href={reportHref(report.year)} className="inline-block border border-ink/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold">
                        {copy.table.view}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {normalizedEliteReports.map((report) => (
              <article key={`${report.year}-card`} className="terminal-module border border-ink/[0.12] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{report.period}</p>
                <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em]">{copy.table.reportName}</h3>
                <div className="mt-5 grid gap-3 text-sm text-ink/[0.68]">
                  <p>{report.totalSignals} {copy.table.signals.toLowerCase()}</p>
                  <p className="font-mono font-bold text-rise">{report.year === "2018" ? "+18,4%" : report.year === "2021" ? "+11,2%" : "+22,7%"}</p>
                  <p className="uppercase tracking-[0.14em]">{copy.available}</p>
                </div>
                <a href={reportHref(report.year)} className="mt-5 block border border-gold/[0.28] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:text-gold">
                  {copy.table.view}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative mx-auto max-w-7xl overflow-hidden border border-gold/[0.26] bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-10 md:py-18"
        >
          <div className="absolute inset-0 terminal-grid opacity-25" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.12] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Elite</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">{publicCopy.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-8 text-paper/[0.72]">{publicCopy.ctaText}</p>
            <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-8 inline-block w-full max-w-md border border-gold bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
              {copy.ctaButton}
            </a>
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-12 md:px-8 md:pb-16">
        <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white p-5 text-sm leading-7 text-ink/[0.64] shadow-fine">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Disclaimer</p>
          <p className="mt-3">{publicCopy.disclaimer}</p>
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
