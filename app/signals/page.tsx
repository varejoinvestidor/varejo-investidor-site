"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BrokerBanners,
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
  FreeChannelCTA,
  SectionHeader,
  SignalTicket,
  SiteChrome,
  SupportFooter,
  WhatsAppSignalExample,
  eliteLinkProps,
  fadeUp,
  getElitePlanHref,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";
import { eliteReportPaths } from "../../src/components/EliteReportHub";

const howItWorks = [
  "2 a 5 sinais por dia",
  "Recebimento direto no WhatsApp",
  "Entrada, alvo e stop definidos",
  "Análises de mercado",
];

const ichimokuPoints = [
  "leitura da nuvem",
  "médias do Ichimoku",
  "direção do preço",
  "alvo e stop",
  "informações do ativo",
  "gerenciamento de risco",
];

const formigaBullets = [
  "gratuito",
  "conteúdos educacionais",
  "análises básicas",
  "visão introdutória",
  "construção da base",
  "sinais limitados",
];

const eliteBullets = [
  "sinais completos",
  "2 a 5 sinais dia",
  "entrada, alvo e stop definidos",
  "análises de mercado",
  "Forex",
  "ouro",
  "petróleo",
  "índices",
  "cripto",
  "análises de mercado",
  "comunidade fechada",
  "aulas gravadas nível Formiga",
  "aulas gravadas nível Lobo",
  "aulas gravadas nível Harpia",
  "acesso ao Elite",
];

const prices = [
  ["MENSAL", "R$ 149,90", "US$ 30"],
  ["TRIMESTRAL", "R$ 397,90", "US$ 80"],
  ["SEMESTRAL", "R$ 697,90", "US$ 145"],
  ["ANUAL", "R$ 1.197,90", "US$ 240"],
];

const eliteBenefits = [
  "100% dos sinais",
  "Grupo exclusivo",
  "Análises de mercado",
  "Aulas gravadas",
  "Conteúdo nível Harpia",
  "Mercados globais acompanhados",
];

const signalCopyByLocale = {
  pt: {
    howEyebrow: "WhatsApp",
    howTitle: "Como funcionam os sinais enviados no WhatsApp",
    howText: "Nossa equipe acompanha os mercados globais e envia análises e sinais diretamente no WhatsApp. Você recebe todas as informações da operação e executa na sua própria conta.",
    howItems: howItWorks,
    scheduleEyebrow: "Envio no WhatsApp",
    scheduleTitle: "Horários de envio",
    scheduleText: "Os sinais são enviados normalmente nos períodos de maior liquidez do mercado. Os horários podem variar conforme as oportunidades identificadas ao longo do dia.",
    scheduleNote: "Não existe promessa de lucro. O cliente recebe entrada, alvo e stop, mas executa as operações na própria conta e mantém o dinheiro na sua própria corretora.",
    scheduleCards: [["MANHÃ E TARDE", "8h às 15h"], ["NOITE", "21h às 00h"]],
    methodEyebrow: "Método de análise",
    methodTitle: "Sinais baseados no Ichimoku",
    methodText: "Todos os sinais do Varejo Investidor são enviados com base na leitura do indicador Ichimoku, observando principalmente a nuvem, as médias, o posicionamento do preço, zonas de suporte, resistência e informações do ativo.",
    ichimokuItems: ["leitura da nuvem", "médias do Ichimoku", "direção do preço", "alvo e stop", "informações do ativo", "gerenciamento de risco"],
    historyEyebrow: "Histórico",
    historyTitle: "Relatório Elite desde agosto de 2018",
    historyText: "Acompanhe o histórico do Canal Elite através dos relatórios enviados desde agosto de 2018.",
    tableHeadings: ["DATA", "RELATÓRIO ELITE", "SINAIS", "RESULTADO", "STATUS", "VER"],
    reports: [["AGO/2018", "Relatório Elite", "124 sinais", "+18.4%", "Disponível"], ["JAN/2021", "Relatório Elite", "98 sinais", "+11.2%", "Disponível"], ["MAR/2024", "Relatório Elite", "137 sinais", "+22.7%", "Disponível"]],
    view: "VER",
    docsEyebrow: "Documental",
    docsTitle: "Estrutura real de envio",
    docsText: "Sinais enviados ao vivo diretamente no WhatsApp desde 2018.",
    levelsEyebrow: "Níveis",
    levelsTitle: "Escolha seu nível",
    levelsText: "O Canal Formiga é a entrada gratuita do ecossistema. Comece por ele para acompanhar análises econômicas, educação financeira e atualizações de mercado antes de evoluir para o Elite Harpia.",
    freeTitle: "Canal Formiga",
    freePrice: "Gratuito",
    freeButton: "Entrar no Canal Formiga",
    formigaItems: formigaBullets,
    eliteTitle: "Canal Elite Harpia",
    eliteStructure: "Acesso Elite",
    eliteButton: "Entrar no Elite",
    eliteItems: eliteBullets,
    packagesEyebrow: "Pacotes",
    packagesTitle: "Acesso ao Elite",
    packagesText: "Escolha seu pacote para acessar 100% dos sinais, grupo exclusivo, análises, aulas gravadas e conteúdo nível Harpia dentro do Varejo Investidor.",
    benefitsTitle: "O que você recebe no Canal Elite",
    benefits: eliteBenefits,
    best: "Maior economia",
    now: "Assinar agora",
  },
  en: {
    howEyebrow: "WhatsApp",
    howTitle: "How signals sent on WhatsApp work",
    howText: "Our team follows global markets and sends analysis and signals directly on WhatsApp. You receive the trade information and execute it in your own account.",
    howItems: ["2 to 5 signals per day", "Direct WhatsApp delivery", "Entry, target, and stop defined", "Market analysis and context"],
    scheduleEyebrow: "Trading hours",
    scheduleTitle: "Trading Hours",
    scheduleText: "Signals are usually sent during the main liquidity windows of the market, from 8 AM to 3 PM and also from 9 PM to midnight, Brasília time.",
    scheduleNote: "Timing may vary according to volatility, liquidity, and real market opportunities.",
    scheduleCards: [["MORNING AND AFTERNOON", "8 AM to 3 PM"], ["NIGHT", "9 PM to 12 AM"]],
    methodEyebrow: "Operational method",
    methodTitle: "Signals based on Ichimoku",
    methodText: "All Varejo Investidor signals are based on Ichimoku reading, mainly observing the cloud, averages, price position, support and resistance zones, and asset context.",
    ichimokuItems: ["cloud reading", "Ichimoku averages", "price direction", "target and stop", "asset context", "risk management"],
    historyEyebrow: "History",
    historyTitle: "Elite Report since August 2018",
    historyText: "Follow the operational evolution of the Elite Channel through historical reports sent since August 2018.",
    tableHeadings: ["DATE", "ELITE REPORT", "SIGNALS", "RESULT", "STATUS", "VIEW"],
    reports: [["AUG/2018", "Elite Report", "124 signals", "+18.4%", "Available"], ["JAN/2021", "Elite Report", "98 signals", "+11.2%", "Available"], ["MAR/2024", "Elite Report", "137 signals", "+22.7%", "Available"]],
    view: "VIEW",
    docsEyebrow: "Documentary structure",
    docsTitle: "Real Sending Structure",
    docsText: "Live signals sent directly on WhatsApp since 2018.",
    levelsEyebrow: "Levels",
    levelsTitle: "Choose Your Level",
    levelsText: "Start with the free Ant Channel or enter Elite Harpy for full access to the operational structure.",
    freeTitle: "Ant Channel",
    freePrice: "Free",
    freeButton: "Enter for free",
    formigaItems: ["free", "educational content", "basic analysis", "introductory vision", "foundation building", "limited signals"],
    eliteTitle: "Elite Harpy Channel",
    eliteStructure: "Elite Structure",
    eliteButton: "Join Elite",
    eliteItems: ["complete signals", "2 to 5 signals per day", "entry, target, and stop defined", "market analysis", "Forex", "gold", "oil", "indices", "crypto", "institutional reading", "closed community", "recorded Ant-level classes", "recorded Wolf-level classes", "recorded Harpy-level classes", "Elite structure"],
    packagesEyebrow: "Packages",
    packagesTitle: "Elite Access",
    packagesText: "Choose your package to access 100% of signals, the exclusive group, market analysis, recorded classes, and Harpy-level content inside Varejo Investidor.",
    benefitsTitle: "What you receive in the Elite Channel",
    benefits: ["100% of signals", "Exclusive group", "Market analysis", "Recorded classes", "Harpy-level content", "Complete market structure"],
    best: "Best value",
    now: "Subscribe now",
  },
  es: {
    howEyebrow: "WhatsApp",
    howTitle: "Cómo funcionan las señales enviadas por WhatsApp",
    howText: "Nuestro equipo acompaña los mercados globales y envía análisis y señales directamente por WhatsApp. Recibes la información de la operación y la ejecutas en tu propia cuenta.",
    howItems: ["2 a 5 señales por día", "Envío directo por WhatsApp", "Entrada, objetivo y stop definidos", "Análisis y contexto de mercado"],
    scheduleEyebrow: "Horarios operativos",
    scheduleTitle: "Horarios operativos",
    scheduleText: "Las señales suelen enviarse durante los principales períodos de liquidez del mercado, entre las 8h y las 15h, y también entre las 21h y las 00h, horario de Brasilia.",
    scheduleNote: "Los horarios pueden variar según volatilidad, liquidez y oportunidades reales del mercado.",
    scheduleCards: [["MAÑANA Y TARDE", "8h a 15h"], ["NOCHE", "21h a 00h"]],
    methodEyebrow: "Método operativo",
    methodTitle: "Señales basadas en Ichimoku",
    methodText: "Todas las señales de Varejo Investidor se envían con base en la lectura del indicador Ichimoku, observando principalmente la nube, las medias, el posicionamiento del precio, zonas de soporte, resistencia y contexto del activo.",
    ichimokuItems: ["lectura de la nube", "medias del Ichimoku", "dirección del precio", "objetivo y stop", "contexto del activo", "gestión de riesgo"],
    historyEyebrow: "Histórico",
    historyTitle: "Reporte Elite desde agosto de 2018",
    historyText: "Acompaña la evolución operativa del Canal Elite a través de reportes históricos enviados desde agosto de 2018.",
    tableHeadings: ["FECHA", "REPORTE ELITE", "SEÑALES", "RESULTADO", "ESTADO", "VER"],
    reports: [["AGO/2018", "Reporte Elite", "124 señales", "+18.4%", "Disponible"], ["ENE/2021", "Reporte Elite", "98 señales", "+11.2%", "Disponible"], ["MAR/2024", "Reporte Elite", "137 señales", "+22.7%", "Disponible"]],
    view: "VER",
    docsEyebrow: "Estructura documental",
    docsTitle: "Estructura real de envío",
    docsText: "Señales enviadas en vivo directamente por WhatsApp desde 2018.",
    levelsEyebrow: "Niveles",
    levelsTitle: "Elige tu nivel",
    levelsText: "Comienza gratis en el Canal Hormiga o entra al Elite Harpía para acceder a la estructura operativa completa.",
    freeTitle: "Canal Hormiga",
    freePrice: "Gratis",
    freeButton: "Entrar gratis",
    formigaItems: ["gratuito", "contenidos educativos", "análisis básicos", "visión introductoria", "construcción de la base", "señales limitadas"],
    eliteTitle: "Canal Elite Harpía",
    eliteStructure: "Estructura Elite",
    eliteButton: "Entrar al Elite",
    eliteItems: ["señales completas", "2 a 5 señales por día", "entrada, objetivo y stop definidos", "análisis de mercado", "Forex", "oro", "petróleo", "índices", "cripto", "lectura institucional", "comunidad cerrada", "clases grabadas nivel Hormiga", "clases grabadas nivel Lobo", "clases grabadas nivel Harpía", "estructura Elite"],
    packagesEyebrow: "Paquetes",
    packagesTitle: "Acceso al Elite",
    packagesText: "Elige tu paquete para acceder al 100% de las señales, grupo exclusivo, análisis, clases grabadas y contenido nivel Harpía dentro de Varejo Investidor.",
    benefitsTitle: "Lo que recibes en el Canal Elite",
    benefits: ["100% de las señales", "Grupo exclusivo", "Análisis de mercado", "Clases grabadas", "Contenido nivel Harpía", "Estructura completa de mercado"],
    best: "Mayor ahorro",
    now: "Suscribirse ahora",
  },
  ar: {
    howEyebrow: "قناة النخبة",
    howTitle: "كيف تعمل قناة النخبة",
    howText: "تقدم قناة النخبة عمليات مباشرة منظمة عبر واتساب مع سياق تشغيلي وإدارة مخاطر.",
    howItems: ["2 إلى 5 إشارات يوميا", "إرسال مباشر عبر واتساب", "دخول وهدف ووقف محددة", "سياق تشغيلي وقراءة للسوق"],
    scheduleEyebrow: "أوقات التشغيل",
    scheduleTitle: "أوقات التشغيل",
    scheduleText: "ترسل الإشارات غالبا خلال فترات السيولة الرئيسية في السوق، من 8 صباحا إلى 3 مساء، وكذلك من 9 مساء إلى منتصف الليل بتوقيت برازيليا.",
    scheduleNote: "قد تختلف الأوقات حسب التقلبات والسيولة والفرص الحقيقية في السوق.",
    scheduleCards: [["الصباح وبعد الظهر", "8 صباحا إلى 3 مساء"], ["الليل", "9 مساء إلى 12 صباحا"]],
    methodEyebrow: "المنهج التشغيلي",
    methodTitle: "إشارات مبنية على Ichimoku",
    methodText: "تعتمد إشارات Varejo Investidor على قراءة مؤشر Ichimoku مع مراقبة السحابة والمتوسطات وموقع السعر ومناطق الدعم والمقاومة وسياق الأصل.",
    ichimokuItems: ["قراءة السحابة", "متوسطات Ichimoku", "اتجاه السعر", "الهدف ووقف الخسارة", "سياق الأصل", "إدارة المخاطر"],
    historyEyebrow: "السجل",
    historyTitle: "تقرير النخبة منذ أغسطس 2018",
    historyText: "تابع التطور التشغيلي لقناة النخبة عبر التقارير التاريخية منذ أغسطس 2018.",
    tableHeadings: ["التاريخ", "تقرير النخبة", "الإشارات", "النتيجة", "الحالة", "عرض"],
    reports: [["أغسطس/2018", "تقرير النخبة", "124 إشارة", "+18.4%", "متاح"], ["يناير/2021", "تقرير النخبة", "98 إشارة", "+11.2%", "متاح"], ["مارس/2024", "تقرير النخبة", "137 إشارة", "+22.7%", "متاح"]],
    view: "عرض",
    docsEyebrow: "توثيق",
    docsTitle: "هيكل الإرسال الحقيقي",
    docsText: "إشارات مباشرة ترسل عبر واتساب منذ 2018.",
    levelsEyebrow: "المستويات",
    levelsTitle: "اختر مستواك",
    levelsText: "ابدأ مجانا في قناة النملة أو ادخل Elite Harpy للوصول الكامل إلى الهيكل التشغيلي.",
    freeTitle: "قناة النملة",
    freePrice: "مجاني",
    freeButton: "ادخل مجانا",
    formigaItems: ["مجاني", "محتوى تعليمي", "تحليل أساسي", "رؤية تمهيدية", "بناء الأساس", "إشارات محدودة"],
    eliteTitle: "قناة Elite Harpy",
    eliteStructure: "هيكل النخبة",
    eliteButton: "انضم إلى النخبة",
    eliteItems: ["إشارات كاملة", "2 إلى 5 إشارات يوميا", "عمليات منظمة", "سياق تشغيلي", "Forex", "ذهب", "نفط", "مؤشرات", "كريبتو", "قراءة مؤسسية", "مجتمع مغلق", "دروس النملة المسجلة", "دروس الذئب المسجلة", "دروس الهاربي المسجلة", "هيكل النخبة"],
    packagesEyebrow: "الباقات",
    packagesTitle: "وصول النخبة",
    packagesText: "اختر باقتك للوصول إلى 100% من الإشارات، المجموعة الحصرية، التحليلات، الدروس المسجلة ومحتوى مستوى الهاربي.",
    benefitsTitle: "ما تحصل عليه في قناة النخبة",
    benefits: ["100% من الإشارات", "مجموعة حصرية", "تحليلات السوق", "دروس مسجلة", "محتوى مستوى الهاربي", "هيكل كامل للسوق"],
    best: "أفضل قيمة",
    now: "اشترك الآن",
  },
  tr: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp üzerinden gönderilen sinyaller nasıl çalışır",
    howText: "Ekibimiz küresel piyasaları takip eder ve analizleri ve sinyalleri doğrudan WhatsApp üzerinden gönderir. İşlem bilgilerini alır ve kendi hesabınızda uygularsınız.",
    howItems: ["Günde 2 ila 5 sinyal", "Doğrudan WhatsApp gönderimi", "Giriş, hedef ve stop belirlenmiş", "Piyasa analizi ve bağlamı"],
    scheduleEyebrow: "İşlem saatleri",
    scheduleTitle: "İşlem saatleri",
    scheduleText: "Sinyaller genellikle piyasanın ana likidite dönemlerinde, Brasília saatine göre 08:00-15:00 ve 21:00-00:00 arasında gönderilir.",
    scheduleNote: "Saatler volatilite, likidite ve gerçek piyasa fırsatlarına göre değişebilir.",
    scheduleCards: [["SABAH VE ÖĞLEDEN SONRA", "08:00 - 15:00"], ["GECE", "21:00 - 00:00"]],
    methodEyebrow: "Operasyonel yöntem",
    methodTitle: "Ichimoku temelli sinyaller",
    methodText: "Varejo Investidor sinyalleri; bulut, ortalamalar, fiyat konumu, destek ve direnç bölgeleri ve varlık bağlamı izlenerek Ichimoku okumasına dayanır.",
    ichimokuItems: ["bulut okuma", "Ichimoku ortalamaları", "fiyat yönü", "hedef ve stop", "varlık bağlamı", "risk yönetimi"],
    historyEyebrow: "Geçmiş",
    historyTitle: "Ağustos 2018'den beri Elite Raporu",
    historyText: "Ağustos 2018'den bu yana gönderilen geçmiş raporlarla Elite Kanalı'nın operasyonel gelişimini izleyin.",
    tableHeadings: ["TARİH", "ELITE RAPORU", "SİNYALLER", "SONUÇ", "DURUM", "GÖR"],
    reports: [["AĞU/2018", "Elite Raporu", "124 sinyal", "+18.4%", "Mevcut"], ["OCA/2021", "Elite Raporu", "98 sinyal", "+11.2%", "Mevcut"], ["MAR/2024", "Elite Raporu", "137 sinyal", "+22.7%", "Mevcut"]],
    view: "GÖR",
    docsEyebrow: "Belgesel yapı",
    docsTitle: "Gerçek gönderim yapısı",
    docsText: "2018'den beri doğrudan WhatsApp üzerinden gönderilen canlı sinyaller.",
    levelsEyebrow: "Seviyeler",
    levelsTitle: "Seviyeni seç",
    levelsText: "Ücretsiz Karınca Kanalı ile başla veya operasyonel yapıya tam erişim için Elite Harpia'ya gir.",
    freeTitle: "Karınca Kanalı",
    freePrice: "Ücretsiz",
    freeButton: "Ücretsiz gir",
    formigaItems: ["ücretsiz", "eğitim içeriği", "temel analiz", "giriş vizyonu", "temel inşası", "sınırlı sinyaller"],
    eliteTitle: "Elite Harpia Kanalı",
    eliteStructure: "Elite Yapı",
    eliteButton: "Elite'e katıl",
    eliteItems: ["tam sinyaller", "günde 2 ila 5 sinyal", "giriş, hedef ve stop belirlenmiş", "piyasa analizi", "Forex", "altın", "petrol", "endeksler", "kripto", "kurumsal okuma", "kapalı topluluk", "Karınca seviyesi kayıtlı dersler", "Kurt seviyesi kayıtlı dersler", "Harpia seviyesi kayıtlı dersler", "Elite yapı"],
    packagesEyebrow: "Paketler",
    packagesTitle: "Elite Erişim",
    packagesText: "Sinyallerin %100'üne, özel gruba, piyasa analizlerine, kayıtlı derslere ve Harpia seviyesi içeriğe erişmek için paketini seç.",
    benefitsTitle: "Elite Kanalında aldıkların",
    benefits: ["Sinyallerin %100'ü", "Özel grup", "Piyasa analizleri", "Kayıtlı dersler", "Harpia seviyesi içerik", "Tam piyasa yapısı"],
    best: "En iyi değer",
    now: "Şimdi abone ol",
  },
} as const;

const whatsappPrints = [
  { label: "WhatsApp print 01", src: "/signals/whatsapp-print-01.jpg" },
  { label: "WhatsApp print 02", src: "/signals/whatsapp-print-02.jpg" },
  { label: "WhatsApp print 03", src: "/signals/whatsapp-print-03.jpg" },
];

const PT_FREE_SIGNAL_TEST_URL = "https://whatsapp.com/channel/0029VasGTTE6RGJD46g47c1h";

const localizedSignalFallbacks = {
  th: {
    ...signalCopyByLocale.en,
    howTitle: "สัญญาณที่ส่งผ่าน WhatsApp ทำงานอย่างไร",
    howText: "ทีมของเราติดตามตลาดโลกและส่งบทวิเคราะห์พร้อมสัญญาณไปยัง WhatsApp โดยตรง คุณได้รับข้อมูลของการเทรดและดำเนินการในบัญชีของคุณเอง",
    howItems: ["2 ถึง 5 สัญญาณต่อวัน", "ส่งตรงผ่าน WhatsApp", "มีจุดเข้า เป้าหมาย และจุดตัดขาดทุน", "บทวิเคราะห์และบริบทตลาด"],
    scheduleTitle: "ช่วงเวลาส่งสัญญาณ",
    scheduleText: "สัญญาณมักถูกส่งในช่วงที่ตลาดมีสภาพคล่องสูง และอาจเปลี่ยนตามโอกาสจริงของตลาด",
    scheduleCards: [["เช้าและบ่าย", "8:00 ถึง 15:00"], ["กลางคืน", "21:00 ถึง 00:00"]],
    freeTitle: "ช่อง Formiga",
    freePrice: "ฟรี",
    freeButton: "เข้าร่วมช่อง Formiga",
    eliteButton: "เข้าร่วม Elite",
    packagesTitle: "การเข้าถึง Elite",
    packagesText: "เลือกแพ็กเกจเพื่อรับสัญญาณทั้งหมด กลุ่มพิเศษ บทวิเคราะห์ คลาสย้อนหลัง และคอนเทนต์ระดับ Harpy",
    now: "สมัครตอนนี้",
  },
  ru: {
    ...signalCopyByLocale.en,
    howTitle: "Как работают сигналы в WhatsApp",
    howText: "Наша команда следит за мировыми рынками и отправляет аналитику и сигналы прямо в WhatsApp. Вы получаете данные сделки и исполняете ее на своем счете.",
    howItems: ["2-5 сигналов в день", "Доставка прямо в WhatsApp", "Вход, цель и стоп определены", "Аналитика и рыночный контекст"],
    scheduleTitle: "Время отправки",
    scheduleText: "Сигналы обычно отправляются в периоды высокой ликвидности. Время может меняться в зависимости от реальных рыночных возможностей.",
    scheduleCards: [["УТРО И ДЕНЬ", "8:00-15:00"], ["ВЕЧЕР", "21:00-00:00"]],
    freeTitle: "Канал Formiga",
    freePrice: "Бесплатно",
    freeButton: "Войти в канал Formiga",
    eliteButton: "Войти в Elite",
    packagesTitle: "Доступ Elite",
    packagesText: "Выберите пакет для доступа ко всем сигналам, закрытой группе, аналитике, записям занятий и контенту уровня Harpy.",
    now: "Подписаться",
  },
  bn: {
    ...signalCopyByLocale.en,
    howTitle: "WhatsApp-এ পাঠানো সিগন্যাল কীভাবে কাজ করে",
    howText: "আমাদের দল গ্লোবাল মার্কেট অনুসরণ করে এবং বিশ্লেষণ ও সিগন্যাল সরাসরি WhatsApp-এ পাঠায়। আপনি ট্রেডের তথ্য পান এবং নিজের অ্যাকাউন্টে তা বাস্তবায়ন করেন।",
    howItems: ["প্রতিদিন ২ থেকে ৫টি সিগন্যাল", "সরাসরি WhatsApp ডেলিভারি", "এন্ট্রি, টার্গেট ও স্টপ নির্ধারিত", "মার্কেট বিশ্লেষণ ও প্রেক্ষাপট"],
    scheduleTitle: "সিগন্যাল পাঠানোর সময়",
    scheduleText: "সিগন্যাল সাধারণত বাজারের বেশি লিকুইডিটির সময়ে পাঠানো হয়। বাস্তব সুযোগ অনুযায়ী সময় পরিবর্তিত হতে পারে।",
    scheduleCards: [["সকাল ও বিকেল", "৮টা থেকে ১৫টা"], ["রাত", "২১টা থেকে ০০টা"]],
    freeTitle: "Formiga চ্যানেল",
    freePrice: "ফ্রি",
    freeButton: "Formiga চ্যানেলে যোগ দিন",
    eliteButton: "Elite-এ যোগ দিন",
    packagesTitle: "Elite অ্যাক্সেস",
    packagesText: "সব সিগন্যাল, এক্সক্লুসিভ গ্রুপ, বিশ্লেষণ, রেকর্ডেড ক্লাস এবং Harpy স্তরের কনটেন্ট পেতে প্যাকেজ বেছে নিন।",
    now: "এখন সাবস্ক্রাইব করুন",
  },
  ja: {
    ...signalCopyByLocale.en,
    howTitle: "WhatsAppで届くシグナルの仕組み",
    howText: "私たちのチームが世界市場を追跡し、分析とシグナルをWhatsAppで直接送信します。取引情報を受け取り、ご自身の口座で実行できます。",
    howItems: ["1日2-5件のシグナル", "WhatsAppへ直接配信", "エントリー、目標、ストップを明示", "市場分析と背景"],
    scheduleTitle: "配信時間",
    scheduleText: "シグナルは通常、市場の流動性が高い時間帯に送信されます。実際の機会に応じて時間は変わる場合があります。",
    scheduleCards: [["午前・午後", "8:00-15:00"], ["夜", "21:00-00:00"]],
    freeTitle: "アリチャンネル",
    freePrice: "無料",
    freeButton: "アリチャンネルに参加",
    eliteButton: "Eliteに参加",
    packagesTitle: "Eliteアクセス",
    packagesText: "すべてのシグナル、限定グループ、分析、録画講座、Harpyレベルのコンテンツへアクセスできます。",
    now: "今すぐ購読",
  },
  ko: {
    ...signalCopyByLocale.en,
    howTitle: "WhatsApp으로 전달되는 신호의 작동 방식",
    howText: "저희 팀은 글로벌 시장을 추적하고 분석과 신호를 WhatsApp으로 직접 보냅니다. 사용자는 거래 정보를 받고 본인 계좌에서 직접 실행합니다.",
    howItems: ["하루 2-5개 신호", "WhatsApp 직접 전달", "진입, 목표, 손절 제시", "시장 분석과 배경"],
    scheduleTitle: "신호 발송 시간",
    scheduleText: "신호는 보통 시장 유동성이 높은 시간대에 발송됩니다. 실제 기회에 따라 시간은 달라질 수 있습니다.",
    scheduleCards: [["오전 및 오후", "8:00-15:00"], ["밤", "21:00-00:00"]],
    freeTitle: "개미 채널",
    freePrice: "무료",
    freeButton: "개미 채널 참여",
    eliteButton: "Elite 참여",
    packagesTitle: "Elite 접근",
    packagesText: "모든 신호, 전용 그룹, 분석, 녹화 강의, Harpy 레벨 콘텐츠에 접근할 수 있습니다.",
    now: "지금 구독하기",
  },
} as const;

const reportCtaLabels = {
  pt: "VER RELATÓRIOS E RESULTADOS",
  en: "VIEW REPORTS AND RESULTS",
  es: "VER REPORTES Y RESULTADOS",
  hi: "REPORTS और RESULTS देखें",
  ar: "عرض التقارير والنتائج",
  tr: "RAPORLARI VE SONUÇLARI GÖR",
  id: "LIHAT LAPORAN DAN HASIL",
  vi: "XEM BÁO CÁO VÀ KẾT QUẢ",
  th: "ดูรายงานและผลลัพธ์",
  ru: "СМОТРЕТЬ ОТЧЕТЫ И РЕЗУЛЬТАТЫ",
  bn: "রিপোর্ট ও ফলাফল দেখুন",
  ja: "レポートと結果を見る",
  ko: "리포트와 결과 보기",
} as const;

export default function SignalsPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const eliteCta = eliteLinkProps(locale, "/sinais");
  const shouldScrollToPackages = locale !== "pt";
  const scrollToPackages = () => {
    const section = document.getElementById("elite-packages");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const isHi = locale === "hi";
  const signalPageCopy: any = isHi
    ? {
        howEyebrow: "एलीट चैनल",
        howTitle: "एलीट चैनल कैसे काम करता है",
        howText: "एलीट चैनल जोखिम प्रबंधन और ऑपरेशनल संदर्भ के साथ लाइव संरचित ऑपरेशन सीधे WhatsApp पर भेजता है।",
        howItems: ["दिन में 2 से 5 सिग्नल", "सीधे WhatsApp पर भेजना", "एंट्री, लक्ष्य और स्टॉप निर्धारित", "ऑपरेशनल संदर्भ और बाजार-पठन"],
        scheduleEyebrow: "ऑपरेशनल समय",
        scheduleTitle: "ऑपरेशनल समय",
        scheduleText: "सिग्नल आम तौर पर बाजार की मुख्य लिक्विडिटी अवधि में भेजे जाते हैं: ब्राज़ीलिया समयानुसार 8h से 15h और 21h से 00h के बीच।",
        scheduleNote: "समय बाजार की वोलैटिलिटी, लिक्विडिटी और वास्तविक अवसरों के अनुसार बदल सकता है।",
        scheduleCards: [["सुबह और दोपहर", "8h से 15h"], ["रात", "21h से 00h"]],
        methodEyebrow: "ऑपरेशनल पद्धति",
        methodTitle: "Ichimoku पर आधारित सिग्नल",
        methodText: "Varejo Investidor के सभी सिग्नल Ichimoku इंडिकेटर की पढ़ाई पर आधारित होते हैं, विशेष रूप से क्लाउड, औसत रेखाएँ, कीमत की स्थिति, सपोर्ट, रेजिस्टेंस और एसेट संदर्भ पर ध्यान देकर।",
        ichimokuItems: ["क्लाउड रीडिंग", "Ichimoku औसत रेखाएँ", "कीमत की दिशा", "लक्ष्य और स्टॉप", "एसेट संदर्भ", "जोखिम प्रबंधन"],
        historyEyebrow: "इतिहास",
        historyTitle: "अगस्त 2018 से एलीट रिपोर्ट",
        historyText: "अगस्त 2018 से भेजी गई ऐतिहासिक रिपोर्टों के माध्यम से एलीट चैनल की ऑपरेशनल यात्रा देखें।",
        tableHeadings: ["तारीख", "एलीट रिपोर्ट", "सिग्नल", "परिणाम", "स्थिति", "देखें"],
        reports: [["अग/2018", "एलीट रिपोर्ट", "124 सिग्नल", "+18.4%", "उपलब्ध"], ["जन/2021", "एलीट रिपोर्ट", "98 सिग्नल", "+11.2%", "उपलब्ध"], ["मार्च/2024", "एलीट रिपोर्ट", "137 सिग्नल", "+22.7%", "उपलब्ध"]],
        view: "देखें",
        docsEyebrow: "दस्तावेजी संरचना",
        docsTitle: "भेजने की वास्तविक संरचना",
        docsText: "2018 से WhatsApp पर सीधे लाइव भेजे गए सिग्नल।",
        levelsEyebrow: "स्तर",
        levelsTitle: "अपना स्तर चुनें",
        levelsText: "मुफ्त चींटी चैनल से शुरू करें या पूर्ण ऑपरेशनल संरचना के लिए एलीट गरुड़ में प्रवेश करें।",
        freeTitle: "चींटी चैनल",
        freePrice: "मुफ्त",
        freeButton: "मुफ्त में प्रवेश करें",
        formigaItems: ["मुफ्त", "शैक्षिक सामग्री", "बुनियादी विश्लेषण", "प्रारंभिक दृष्टि", "आधार निर्माण", "सीमित सिग्नल"],
        eliteTitle: "एलीट गरुड़ चैनल",
        eliteStructure: "एलीट संरचना",
        eliteButton: "एलीट में प्रवेश करें",
        eliteItems: ["पूर्ण सिग्नल", "दिन में 2 से 5 सिग्नल", "संरचित ऑपरेशन", "ऑपरेशनल संदर्भ", "Forex", "सोना", "तेल", "सूचकांक", "क्रिप्टो", "संस्थागत पठन", "बंद समुदाय", "चींटी स्तर की रिकॉर्डेड कक्षाएँ", "भेड़िया स्तर की रिकॉर्डेड कक्षाएँ", "गरुड़ स्तर की रिकॉर्डेड कक्षाएँ", "एलीट संरचना"],
        packagesEyebrow: "पैकेज",
        packagesTitle: "एलीट एक्सेस",
        packagesText: "लाइव सिग्नल, विश्लेषण, रिकॉर्डेड कक्षाएँ और पूर्ण बाजार संरचना प्राप्त करने के लिए एलीट गरुड़ चैनल का पैकेज चुनें।",
        best: "सबसे अधिक बचत",
        now: "\u0905\u092D\u0940 \u0938\u0926\u0938\u094D\u092F\u0924\u093E \u0932\u0947\u0902",
      }
    : signalCopyByLocale[locale as keyof typeof signalCopyByLocale] ??
      localizedSignalFallbacks[locale as keyof typeof localizedSignalFallbacks] ??
      signalCopyByLocale.en;
  const howItems: string[] = signalPageCopy?.howItems ?? howItWorks;
  const ichimokuItems: string[] = signalPageCopy?.ichimokuItems ?? ichimokuPoints;
  const freeItems: string[] = signalPageCopy?.formigaItems ?? formigaBullets;
  const eliteItems: string[] = signalPageCopy?.eliteItems ?? eliteBullets;
  const benefitsList: string[] = signalPageCopy?.benefits ?? eliteBenefits;
  const scheduleCards: string[][] = signalPageCopy?.scheduleCards ?? [
    ["MANHÃ E TARDE", "8h às 15h"],
    ["NOITE", "21h às 00h"],
  ];
  const isPt = locale === "pt";
  const ptHeroSubtitle =
    "Nossa equipe acompanha os mercados globais diariamente para identificar oportunidades em Forex, ouro, petróleo, índices, criptomoedas e moedas globais. Você recebe as análises e sinais diretamente no WhatsApp com todas as informações necessárias para execução na sua própria conta.";
  const brazilElitePrices = [
    ["Mensal", "R$ 149,90"],
    ["Trimestral", "R$ 397,90"],
    ["Semestral", "R$ 697,90"],
    ["Anual", "R$ 1.197,90"],
  ];
  const internationalElitePrices = [
    ["Monthly", "US$ 30"],
    ["3 Months", "US$ 80"],
    ["6 Months", "US$ 145"],
    ["Annual", "US$ 240"],
  ];
  const displayPrices: string[][] = locale === "en"
    ? [
        ["MONTHLY", "US$ 30", ""],
        ["3 MONTHS", "US$ 80", ""],
        ["6 MONTHS", "US$ 145", ""],
        ["ANNUAL", "US$ 240", ""],
      ]
    : locale === "es"
      ? [
          ["MENSUAL", "US$ 30", ""],
          ["TRIMESTRAL", "US$ 80", ""],
          ["SEMESTRAL", "US$ 145", ""],
          ["ANUAL", "US$ 240", ""],
        ]
      : isHi
    ? [
        ["मासिक", "US$ 30", ""],
        ["3 महीने", "US$ 80", ""],
        ["6 महीने", "US$ 145", ""],
        ["वार्षिक", "US$ 240", ""],
      ]
    : locale === "ar"
      ? [
          ["شهري", "US$ 30", ""],
          ["3 أشهر", "US$ 80", ""],
          ["6 أشهر", "US$ 145", ""],
          ["سنوي", "US$ 240", ""],
        ]
    : locale === "tr"
      ? [
          ["AYLIK", "US$ 30", ""],
          ["3 AY", "US$ 80", ""],
          ["6 AY", "US$ 145", ""],
          ["YILLIK", "US$ 240", ""],
        ]
    : prices;
  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="signals-hero premium-stage relative px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.12] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t.signalBlock.eyebrow} title={t.signalBlock.title} text={t.signalBlock.text} />
            {isPt ? (
              <p className="mt-5 max-w-2xl border-l border-gold/[0.45] bg-paper/[0.06] px-5 py-4 text-base font-semibold leading-8 text-paper/[0.88] shadow-fine md:text-lg">
                {ptHeroSubtitle}
              </p>
            ) : null}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {(t.signalBlock.stats as string[]).map((item) => (
                <div key={item} className="operational-chip border-l-2 border-rise bg-white p-4 shadow-fine">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            {shouldScrollToPackages ? (
              <button
                type="button"
                onClick={scrollToPackages}
                className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
              >
                {t.signalBlock.cta}
              </button>
            ) : (
              <a
                href={PT_FREE_SIGNAL_TEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
              >
                {t.signalBlock.cta}
              </a>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel signal-terminal-wrap p-3"
          >
            <SignalTicket t={t} />
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.howEyebrow ?? "Canal Elite"}
            title={signalPageCopy?.howTitle ?? "Como funcionam os sinais enviados no WhatsApp"}
            text={signalPageCopy?.howText ?? "Nossa equipe acompanha os mercados globais e envia análises e sinais diretamente no WhatsApp. Você recebe todas as informações da operação e executa na sua própria conta."}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItems.map((item, index) => (
              <motion.article
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                variants={fadeUp}
                className="terminal-module relative overflow-hidden border border-rise/[0.18] bg-white p-6 shadow-fine"
              >
                <div className="absolute inset-0 terminal-grid opacity-25" />
                <p className="relative font-mono text-xs text-rise">0{index + 1}</p>
                <h3 className="relative mt-8 font-serif text-3xl leading-[1.03] tracking-[-0.04em]">{item}</h3>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 border border-rise/[0.18] bg-white p-6 shadow-fine md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{signalPageCopy?.scheduleEyebrow ?? "Envio no WhatsApp"}</p>
                <h3 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{signalPageCopy?.scheduleTitle ?? "Horários de envio"}</h3>
                <p className="mt-4 max-w-2xl leading-8 text-ink/[0.66]">
                  {signalPageCopy?.scheduleText ?? "Os sinais são enviados geralmente nos principais períodos de liquidez do mercado, entre 8h e 15h, e também entre 21h e 00h, no horário de Brasília."}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink/[0.48]">
                  {signalPageCopy?.scheduleNote ?? "Os horários podem variar conforme volatilidade, liquidez e oportunidades reais do mercado."}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {scheduleCards.map(([label, time]) => (
                  <div key={label} className="terminal-module border border-ink/[0.1] bg-paper p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">{label}</p>
                    <p className="mt-4 font-mono text-3xl text-ink">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.methodEyebrow ?? "Método de análise"}
            title={signalPageCopy?.methodTitle ?? "Sinais baseados no Ichimoku"}
            text={signalPageCopy?.methodText ?? "Todos os sinais do Varejo Investidor são enviados com base na leitura do indicador Ichimoku, observando principalmente a nuvem, as médias, o posicionamento do preço, zonas de suporte, resistência e informações do ativo."}
          />
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.58fr_1.42fr] xl:items-center">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {ichimokuItems.map((item) => (
                <div key={item} className="terminal-module border border-rise/[0.14] bg-paper p-5 xl:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/[0.72] xl:text-base">{item}</p>
                </div>
              ))}
            </div>
            <div className="terminal-module ichimoku-board relative overflow-hidden border border-rise/[0.22] bg-ink p-3 shadow-premium md:p-4">
              <div className="absolute inset-0 terminal-grid opacity-30" />
              <div className="relative overflow-hidden rounded-[6px] border border-rise/[0.16] bg-paper/[0.035]">
                <Image
                  src="/signals/ichimoku-operacional.jpeg"
                  alt="Print operacional do indicador Ichimoku"
                  width={1599}
                  height={748}
                  sizes="(max-width: 768px) 100vw, 72vw"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppSignalExample
        t={t}
        locale={locale}
        onEliteClick={shouldScrollToPackages ? scrollToPackages : undefined}
      />

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="terminal-module relative overflow-hidden border border-gold/[0.22] bg-white p-6 shadow-fine md:p-8">
            <div className="absolute inset-0 terminal-grid opacity-25" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <SectionHeader
                eyebrow={signalPageCopy?.historyEyebrow ?? "Histórico"}
                title={signalPageCopy?.historyTitle ?? "Relatório Elite desde agosto de 2018"}
                text={
                  isPt
                    ? "Acompanhe o histórico do Canal Elite, operações ativas, relatórios enviados e resultados consolidados desde agosto de 2018."
                    : signalPageCopy?.historyText ?? "Follow the Elite Channel history, active operations, sent reports, and consolidated results since August 2018."
                }
              />
              <a
                href={eliteReportPaths[locale] ?? eliteReportPaths.en}
                className="premium-button-gold inline-block border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 lg:min-w-[260px]"
              >
                {reportCtaLabels[locale as keyof typeof reportCtaLabels] ?? reportCtaLabels.en}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.docsEyebrow ?? "Documental"}
            title={signalPageCopy?.docsTitle ?? "Estrutura real de envio"}
            text={signalPageCopy?.docsText ?? "Sinais enviados ao vivo diretamente no WhatsApp desde 2018."}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {whatsappPrints.map((print, index) => (
              <motion.article
                key={print.src}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                variants={fadeUp}
                className="terminal-module whatsapp-print-card group relative min-h-[560px] overflow-hidden border border-rise/[0.16] bg-paper p-4"
              >
                <div className="absolute inset-0 terminal-grid opacity-30" />
                <div className="relative flex items-center justify-between border-b border-ink/[0.08] pb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-rise">{print.label}</p>
                  <span className="h-2 w-2 rounded-full bg-rise" />
                </div>
                <div className="whatsapp-print-frame relative mt-5 h-[500px] overflow-hidden rounded-[6px] border border-rise/[0.18] bg-ink md:h-[570px]">
                  <Image
                    src={print.src}
                    alt={`${print.label} do Canal Elite Varejo Investidor`}
                    fill
                    sizes="(min-width: 768px) 31vw, 92vw"
                    className="whatsapp-print-image object-contain object-top transition duration-500 group-hover:scale-[1.025]"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.levelsEyebrow ?? "Níveis"}
            title={signalPageCopy?.levelsTitle ?? "Escolha seu nível"}
            text={signalPageCopy?.levelsText ?? "O Canal Formiga é a entrada gratuita do ecossistema. Comece por ele para acompanhar análises econômicas, educação financeira e atualizações de mercado antes de evoluir para o Elite Harpia."}
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="terminal-module border border-rise/[0.22] bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-rise">{signalPageCopy?.freeTitle ?? "Canal Formiga"}</p>
              <h3 className="mt-5 font-serif text-5xl tracking-[-0.05em]">{signalPageCopy?.freePrice ?? "Gratuito"}</h3>
              <div className="mt-6 grid gap-3">
                {freeItems.map((item) => (
                  <p key={item} className="border-l border-rise pl-4 text-sm uppercase tracking-[0.12em] text-ink/[0.66]">
                    {item}
                  </p>
                ))}
              </div>
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block border border-rise bg-rise px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-paper"
              >
                {signalPageCopy?.freeButton ?? "Entrar no Canal Formiga"}
              </a>
            </article>

            <article className="terminal-module relative overflow-hidden border border-gold bg-ink p-6 text-paper shadow-premium md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-25" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{signalPageCopy?.eliteTitle ?? "Canal Elite Harpia"}</p>
                <h3 className="mt-5 font-serif text-5xl tracking-[-0.05em]">{signalPageCopy?.eliteStructure ?? "Estrutura Elite"}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {eliteItems.map((item) => (
                    <p key={item} className="border-l border-gold pl-4 text-sm uppercase tracking-[0.12em] text-paper/[0.72]">
                      {item}
                    </p>
                  ))}
                </div>
                {shouldScrollToPackages ? (
                  <button
                    type="button"
                    onClick={scrollToPackages}
                    className="premium-button-gold mt-8 block w-full border border-gold bg-gold px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink"
                  >
                    {signalPageCopy?.eliteButton ?? "Entrar no Elite"}
                  </button>
                ) : (
                  <a
                    {...eliteCta}
                    className="premium-button-gold mt-8 block border border-gold bg-gold px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink"
                  >
                    {signalPageCopy?.eliteButton ?? "Entrar no Elite"}
                  </a>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="elite-packages" className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.packagesEyebrow ?? "Pacotes"}
            title={isPt ? "Escolha sua forma de pagamento" : (signalPageCopy?.packagesTitle ?? "Acesso ao Elite")}
            text={
              isPt
                ? "Clientes no Brasil podem pagar em reais via Lastlink. Clientes internacionais podem assinar em dólar via Stripe."
                : signalPageCopy?.packagesText ??
              "Escolha seu pacote para acessar 100% dos sinais, grupo exclusivo, análises, aulas gravadas e conteúdo nível Harpia dentro do Varejo Investidor."
            }
          />
          {!isHi ? (
            <div className="mt-8 border border-gold/[0.22] bg-ink p-5 shadow-premium md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{signalPageCopy?.eliteTitle ?? "Canal Elite Harpia"}</p>
                  <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">
                    {signalPageCopy?.benefitsTitle ?? "O que você recebe no Canal Elite"}
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {benefitsList.map((benefit, index) => (
                    <div key={benefit} className="border border-rise/[0.16] bg-paper px-4 py-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rise">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-ink/[0.72]">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          {isPt ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="terminal-module relative overflow-hidden border border-gold bg-ink p-6 text-paper shadow-premium md:p-8">
                <div className="absolute inset-0 terminal-grid opacity-20" />
                <div className="relative">
                  <span className="inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-ink">
                    Brasil
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-gold">Lastlink</p>
                  <h3 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-paper">Pagamento Brasil</h3>
                  <p className="mt-4 leading-8 text-paper/[0.68]">
                    Assine o Canal Elite em reais, com checkout nacional seguro pela Lastlink.
                  </p>
                  <p className="mt-6 font-serif text-3xl tracking-[-0.04em] text-gold">A partir de R$149,90/mês</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {brazilElitePrices.map(([period, price], index) => (
                      <div key={period} className="border border-gold/[0.22] bg-paper/[0.04] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.62]">{period}</p>
                          {index === 3 ? (
                            <span className="shrink-0 border border-gold/[0.42] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-gold">
                              Maior economia
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 font-mono text-xl font-bold text-paper">{price}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={ELITE_LASTLINK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button-gold mt-8 flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
                  >
                    Pagar em reais
                  </a>
                </div>
              </article>

              <article className="terminal-module relative overflow-hidden border border-[#31547a] bg-ink p-6 text-paper shadow-premium md:p-8">
                <div className="absolute inset-0 terminal-grid opacity-20" />
                <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-gold/[0.08] blur-3xl" />
                <div className="relative">
                  <span className="inline-block border border-[#31547a] bg-[#132437] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gold">
                    Internacional
                  </span>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-gold">Stripe</p>
                  <h3 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-paper">Pagamento Internacional</h3>
                  <p className="mt-4 leading-8 text-paper/[0.68]">
                    Assine o Canal Elite em dólar via Stripe, ideal para clientes fora do Brasil.
                  </p>
                  <div className="mt-6 grid gap-3">
                    {internationalElitePrices.map(([period, price], index) => (
                      <div key={period} className="grid gap-3 border border-[#31547a]/70 bg-paper/[0.035] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.62]">{period}</p>
                          {index === 3 ? (
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">Maior economia</p>
                          ) : null}
                        </div>
                        <p className="font-mono text-xl font-bold text-paper">{price}</p>
                        <a
                          href={ELITE_STRIPE_LINKS[index]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gold bg-gold px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-paper"
                        >
                          Assinar
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {displayPrices.map(([period, price, usd], index) => (
                <article
                  key={period}
                  className={`terminal-module border p-6 ${index === 3 ?"border-gold bg-ink text-paper shadow-premium" : "border-ink/[0.1] bg-paper"}`}
                >
                  {index === 3 ?(
                    <span className="mb-5 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                      {signalPageCopy?.best ?? "Maior economia"}
                    </span>
                  ) : null}
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{period}</p>
                  <p className="mt-5 font-serif text-4xl tracking-[-0.05em]">{price}</p>
                  {usd ? <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-ink/[0.48]">{usd}</p> : null}
                  <a
                    href={getElitePlanHref(locale, index)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 block border px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] ${index === 3 ?"border-gold bg-gold text-ink" : "border-ink bg-ink text-paper"}`}
                  >
                    {signalPageCopy?.now ?? "Entrar agora"}
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {isPt ? (
        <section className="px-5 py-16 md:px-8 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={fadeUp}
            className="relative mx-auto max-w-7xl overflow-hidden border border-gold/[0.24] bg-ink px-6 py-14 text-center text-paper shadow-premium md:px-10 md:py-18"
          >
            <div className="absolute inset-0 terminal-grid opacity-25" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
            <div className="relative mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">WhatsApp</p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
                Deixe a análise conosco e receba os sinais diretamente no WhatsApp.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
                Receba análises e sinais de Forex, ouro, petróleo, índices, criptomoedas e moedas globais. Você recebe todas as informações diretamente no WhatsApp e executa na sua própria conta.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={PT_FREE_SIGNAL_TEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                >
                  TESTE OS SINAIS GRATUITAMENTE
                </a>
                <a
                  href={t.freeChannel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-ghost border border-paper/[0.22] bg-paper/[0.04] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:border-rise hover:text-rise"
                >
                  CONHECER CANAL FORMIGA
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      ) : null}

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
