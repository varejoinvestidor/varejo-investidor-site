"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BrokerBanners,
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
import { eliteReportPaths } from "../../src/data/eliteReportPaths";
import { isRtlLocale, localeToHtmlLang } from "../../src/i18n/locales";
import { ElitePaymentCards } from "../../src/components/ElitePaymentCards";
import { getLoboChannelUrlWithFallback } from "../../src/data/whatsappChannels";
import { getSignalSelectCopy } from "../../src/data/signalsResearchCopy";
import { localizedPath } from "../../src/i18n/routing";
import "../signals-whatsapp-3d.css";

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
  fr: {
    howEyebrow: "WhatsApp",
    howTitle: "Comment fonctionnent les signaux envoyés sur WhatsApp",
    howText:
      "Notre équipe suit les marchés mondiaux et envoie analyses et signaux directement sur WhatsApp. Vous recevez les informations de l'opération et l'exécutez sur votre propre compte.",
    howItems: ["2 à 5 signaux par jour", "Envoi direct sur WhatsApp", "Entrée, objectif et stop définis", "Analyse de marché et contexte"],
    scheduleEyebrow: "Horaires d'envoi",
    scheduleTitle: "Horaires d'envoi",
    scheduleText:
      "Les signaux sont généralement envoyés pendant les principales fenêtres de liquidité, de 8h à 15h et de 21h à minuit, heure de Brasilia.",
    scheduleNote: "Les horaires peuvent varier selon la volatilité, la liquidité et les opportunités réelles du marché.",
    scheduleCards: [["MATIN ET APRÈS-MIDI", "8h à 15h"], ["NUIT", "21h à 00h"]],
    methodEyebrow: "Méthode opérationnelle",
    methodTitle: "Signaux basés sur l'Ichimoku",
    methodText:
      "Tous les signaux Varejo Investidor reposent sur la lecture Ichimoku : nuage, moyennes, position du prix, supports, résistances et contexte de l'actif.",
    ichimokuItems: ["lecture du nuage", "moyennes Ichimoku", "direction du prix", "objectif et stop", "contexte de l'actif", "gestion du risque"],
    historyEyebrow: "Historique",
    historyTitle: "Rapport Elite depuis août 2018",
    historyText: "Suivez l'évolution opérationnelle du Canal Elite via les rapports historiques envoyés depuis août 2018.",
    tableHeadings: ["DATE", "RAPPORT ELITE", "SIGNAUX", "RÉSULTAT", "STATUT", "VOIR"],
    reports: [["AOÛ/2018", "Rapport Elite", "124 signaux", "+18.4%", "Disponible"], ["JAN/2021", "Rapport Elite", "98 signaux", "+11.2%", "Disponible"], ["MAR/2024", "Rapport Elite", "137 signaux", "+22.7%", "Disponible"]],
    view: "VOIR",
    docsEyebrow: "Structure documentaire",
    docsTitle: "Structure réelle d'envoi",
    docsText: "Signaux en direct envoyés sur WhatsApp depuis 2018.",
    levelsEyebrow: "Niveaux",
    levelsTitle: "Choisissez votre niveau",
    levelsText: "Commencez par le Canal Fourmi gratuit ou rejoignez Elite Harpie pour l'accès complet à la structure opérationnelle.",
    freeTitle: "Canal Fourmi",
    freePrice: "Gratuit",
    freeButton: "Rejoindre le Canal Fourmi",
    formigaItems: ["gratuit", "contenus pédagogiques", "analyses de base", "vision d'introduction", "construction des bases", "signaux limités"],
    eliteTitle: "Canal Elite Harpie",
    eliteStructure: "Structure Elite",
    eliteButton: "Rejoindre Elite",
    eliteItems: [
      "signaux complets",
      "2 à 5 signaux par jour",
      "entrée, objectif et stop définis",
      "analyses de marché",
      "Forex",
      "or",
      "pétrole",
      "indices",
      "crypto",
      "lecture institutionnelle",
      "communauté fermée",
      "cours enregistrés niveau Fourmi",
      "cours enregistrés niveau Loup",
      "cours enregistrés niveau Harpie",
      "structure Elite",
    ],
    packagesEyebrow: "Forfaits",
    packagesTitle: "Accès Elite",
    packagesText:
      "Choisissez votre forfait pour accéder à 100 % des signaux, au groupe exclusif, aux analyses, aux cours enregistrés et au contenu niveau Harpie.",
    benefitsTitle: "Ce que vous recevez dans le Canal Elite",
    benefits: ["100 % des signaux", "Groupe exclusif", "Analyses de marché", "Cours enregistrés", "Contenu niveau Harpie", "Structure complète du marché"],
    best: "Meilleur rapport",
    now: "S'abonner maintenant",
  },
  de: {
    howEyebrow: "WhatsApp",
    howTitle: "So funktionieren Signale auf WhatsApp",
    howText:
      "Unser Team verfolgt die globalen Märkte und sendet Analysen und Signale direkt per WhatsApp. Sie erhalten die Trade-Infos und führen sie auf Ihrem eigenen Konto aus.",
    howItems: ["2 bis 5 Signale pro Tag", "Direkt per WhatsApp", "Einstieg, Ziel und Stop definiert", "Marktanalyse und Kontext"],
    scheduleEyebrow: "Sendezeiten",
    scheduleTitle: "Sendezeiten",
    scheduleText:
      "Signale werden meist in den Hauptliquiditätsfenstern gesendet, 8–15 Uhr und 21–24 Uhr Brasília-Zeit.",
    scheduleNote: "Zeiten können je nach Volatilität, Liquidität und realen Marktchancen variieren.",
    scheduleCards: [["VORMITTAG UND NACHMITTAG", "8–15 Uhr"], ["NACHT", "21–24 Uhr"]],
    methodEyebrow: "Operative Methode",
    methodTitle: "Signale auf Ichimoku-Basis",
    methodText:
      "Alle Varejo-Investidor-Signale basieren auf Ichimoku: Wolke, MAs, Preisposition, Unterstützung, Widerstand und Asset-Kontext.",
    ichimokuItems: ["Wolkenlesung", "Ichimoku-MAs", "Preisrichtung", "Ziel und Stop", "Asset-Kontext", "Risikomanagement"],
    historyEyebrow: "Historie",
    historyTitle: "Elite-Bericht seit August 2018",
    historyText: "Verfolgen Sie den Elite-Kanal anhand historischer Berichte seit August 2018.",
    tableHeadings: ["DATUM", "ELITE-BERICHT", "SIGNALE", "ERGEBNIS", "STATUS", "ANSEHEN"],
    reports: [["AUG/2018", "Elite-Bericht", "124 Signale", "+18.4%", "Verfügbar"], ["JAN/2021", "Elite-Bericht", "98 Signale", "+11.2%", "Verfügbar"], ["MRZ/2024", "Elite-Bericht", "137 Signale", "+22.7%", "Verfügbar"]],
    view: "ANSEHEN",
    docsEyebrow: "Dokumentation",
    docsTitle: "Reale Sendestruktur",
    docsText: "Live-Signale direkt per WhatsApp seit 2018.",
    levelsEyebrow: "Level",
    levelsTitle: "Wählen Sie Ihr Level",
    levelsText: "Starten Sie mit dem kostenlosen Ameisen-Kanal oder treten Sie Elite Harpy für die volle operative Struktur bei.",
    freeTitle: "Ameisen-Kanal",
    freePrice: "Kostenlos",
    freeButton: "Ameisen-Kanal beitreten",
    formigaItems: ["kostenlos", "Lerninhalte", "Basisanalyse", "Einstiegsvision", "Basisaufbau", "begrenzte Signale"],
    eliteTitle: "Elite-Harpy-Kanal",
    eliteStructure: "Elite-Struktur",
    eliteButton: "Elite beitreten",
    eliteItems: [
      "vollständige Signale",
      "2 bis 5 Signale pro Tag",
      "Einstieg, Ziel und Stop",
      "Marktanalyse",
      "Forex",
      "Gold",
      "Öl",
      "Indizes",
      "Krypto",
      "institutionelle Lesart",
      "geschlossene Community",
      "Aufzeichnungen Level Ameise",
      "Aufzeichnungen Level Wolf",
      "Aufzeichnungen Level Harpy",
      "Elite-Struktur",
    ],
    packagesEyebrow: "Pakete",
    packagesTitle: "Elite-Zugang",
    packagesText: "Wählen Sie Ihr Paket für 100 % Signale, Exklusivgruppe, Analysen, Aufzeichnungen und Harpy-Inhalte.",
    benefitsTitle: "Was Sie im Elite-Kanal erhalten",
    benefits: ["100 % der Signale", "Exklusivgruppe", "Marktanalyse", "Aufzeichnungen", "Harpy-Inhalte", "Vollständige Marktstruktur"],
    best: "Bestes Preis-Leistungs-Verhältnis",
    now: "Jetzt abonnieren",
  },
  it: {
    howEyebrow: "WhatsApp",
    howTitle: "Come funzionano i segnali inviati su WhatsApp",
    howText:
      "Il nostro team segue i mercati globali e invia analisi e segnali direttamente su WhatsApp. Ricevi le informazioni dell'operazione e le esegui sul tuo conto.",
    howItems: ["2-5 segnali al giorno", "Invio diretto su WhatsApp", "Ingresso, obiettivo e stop definiti", "Analisi e contesto di mercato"],
    scheduleEyebrow: "Orari di invio",
    scheduleTitle: "Orari di invio",
    scheduleText:
      "I segnali vengono di solito inviati nelle finestre di liquidità principali, dalle 8 alle 15 e dalle 21 alle 24, ora di Brasilia.",
    scheduleNote: "Gli orari possono variare in base a volatilità, liquidità e opportunità reali.",
    scheduleCards: [["MATTINA E POMERIGGIO", "8-15"], ["NOTTE", "21-00"]],
    methodEyebrow: "Metodo operativo",
    methodTitle: "Segnali basati su Ichimoku",
    methodText:
      "Tutti i segnali Varejo Investidor si basano sulla lettura Ichimoku: nuvola, medie, posizione del prezzo, supporti, resistenze e contesto dell'attivo.",
    ichimokuItems: ["lettura della nuvola", "medie Ichimoku", "direzione del prezzo", "obiettivo e stop", "contesto dell'attivo", "gestione del rischio"],
    historyEyebrow: "Storico",
    historyTitle: "Report Elite da agosto 2018",
    historyText: "Segui l'evoluzione del Canale Elite tramite i report storici inviati da agosto 2018.",
    tableHeadings: ["DATA", "REPORT ELITE", "SEGNALI", "RISULTATO", "STATO", "VEDI"],
    reports: [["AGO/2018", "Report Elite", "124 segnali", "+18.4%", "Disponibile"], ["GEN/2021", "Report Elite", "98 segnali", "+11.2%", "Disponibile"], ["MAR/2024", "Report Elite", "137 segnali", "+22.7%", "Disponibile"]],
    view: "VEDI",
    docsEyebrow: "Struttura documentale",
    docsTitle: "Struttura reale di invio",
    docsText: "Segnali live inviati su WhatsApp dal 2018.",
    levelsEyebrow: "Livelli",
    levelsTitle: "Scegli il tuo livello",
    levelsText: "Inizia dal Canale Formiga gratuito o entra in Elite Arpia per la struttura operativa completa.",
    freeTitle: "Canale Formiga",
    freePrice: "Gratuito",
    freeButton: "Entra nel Canale Formiga",
    formigaItems: ["gratuito", "contenuti formativi", "analisi di base", "visione introduttiva", "costruzione delle basi", "segnali limitati"],
    eliteTitle: "Canale Elite Arpia",
    eliteStructure: "Struttura Elite",
    eliteButton: "Entra in Elite",
    eliteItems: [
      "segnali completi",
      "2-5 segnali al giorno",
      "ingresso, obiettivo e stop",
      "analisi di mercato",
      "Forex",
      "oro",
      "petrolio",
      "indici",
      "crypto",
      "lettura istituzionale",
      "community chiusa",
      "lezioni registrate livello Formiga",
      "lezioni registrate livello Lupo",
      "lezioni registrate livello Arpia",
      "struttura Elite",
    ],
    packagesEyebrow: "Pacchetti",
    packagesTitle: "Accesso Elite",
    packagesText: "Scegli il pacchetto per il 100 % dei segnali, gruppo esclusivo, analisi, lezioni registrate e contenuti livello Arpia.",
    benefitsTitle: "Cosa ricevi nel Canale Elite",
    benefits: ["100 % dei segnali", "Gruppo esclusivo", "Analisi di mercato", "Lezioni registrate", "Contenuti Arpia", "Struttura completa del mercato"],
    best: "Miglior valore",
    now: "Abbonati ora",
  },
  id: {
    howEyebrow: "WhatsApp",
    howTitle: "Cara kerja sinyal yang dikirim lewat WhatsApp",
    howText:
      "Tim kami memantau pasar global dan mengirim analisis serta sinyal langsung ke WhatsApp. Anda menerima informasi trading dan mengeksekusinya di akun sendiri.",
    howItems: ["2–5 sinyal per hari", "Pengiriman langsung WhatsApp", "Entry, target, dan stop ditetapkan", "Analisis pasar dan konteks"],
    scheduleEyebrow: "Jam pengiriman",
    scheduleTitle: "Jam pengiriman sinyal",
    scheduleText:
      "Sinyal biasanya dikirim pada jam likuiditas utama, pukul 08.00–15.00 dan 21.00–00.00 waktu Brasília.",
    scheduleNote: "Waktu dapat berubah sesuai volatilitas, likuiditas, dan peluang pasar nyata.",
    scheduleCards: [["PAGI DAN SIANG", "08.00–15.00"], ["MALAM", "21.00–00.00"]],
    methodEyebrow: "Metode operasional",
    methodTitle: "Sinyal berbasis Ichimoku",
    methodText:
      "Semua sinyal Varejo Investidor berdasarkan pembacaan Ichimoku: awan, rata-rata, posisi harga, support, resistance, dan konteks aset.",
    ichimokuItems: ["bacaan awan", "rata-rata Ichimoku", "arah harga", "target dan stop", "konteks aset", "manajemen risiko"],
    historyEyebrow: "Riwayat",
    historyTitle: "Laporan Elite sejak Agustus 2018",
    historyText: "Ikuti perkembangan Kanal Elite melalui laporan historis sejak Agustus 2018.",
    tableHeadings: ["TANGGAL", "LAPORAN ELITE", "SINYAL", "HASIL", "STATUS", "LIHAT"],
    reports: [["AGU/2018", "Laporan Elite", "124 sinyal", "+18.4%", "Tersedia"], ["JAN/2021", "Laporan Elite", "98 sinyal", "+11.2%", "Tersedia"], ["MAR/2024", "Laporan Elite", "137 sinyal", "+22.7%", "Tersedia"]],
    view: "LIHAT",
    docsEyebrow: "Struktur dokumentasi",
    docsTitle: "Struktur pengiriman nyata",
    docsText: "Sinyal live langsung di WhatsApp sejak 2018.",
    levelsEyebrow: "Level",
    levelsTitle: "Pilih level Anda",
    levelsText: "Mulai dari Kanal Semut gratis atau masuk Elite Harpy untuk akses penuh struktur operasional.",
    freeTitle: "Kanal Semut",
    freePrice: "Gratis",
    freeButton: "Masuk Kanal Semut",
    formigaItems: ["gratis", "konten edukasi", "analisis dasar", "visi pengantar", "membangun fondasi", "sinyal terbatas"],
    eliteTitle: "Kanal Elite Harpy",
    eliteStructure: "Struktur Elite",
    eliteButton: "Gabung Elite",
    eliteItems: [
      "sinyal lengkap",
      "2–5 sinyal per hari",
      "entry, target, stop",
      "analisis pasar",
      "Forex",
      "emas",
      "minyak",
      "indeks",
      "kripto",
      "bacaan institusional",
      "komunitas tertutup",
      "kelas rekaman level Semut",
      "kelas rekaman level Serigala",
      "kelas rekaman level Elang Harpy",
      "struktur Elite",
    ],
    packagesEyebrow: "Paket",
    packagesTitle: "Akses Elite",
    packagesText: "Pilih paket untuk 100 % sinyal, grup eksklusif, analisis, kelas rekaman, dan konten level Harpy.",
    benefitsTitle: "Yang Anda dapat di Kanal Elite",
    benefits: ["100 % sinyal", "Grup eksklusif", "Analisis pasar", "Kelas rekaman", "Konten Harpy", "Struktur pasar lengkap"],
    best: "Nilai terbaik",
    now: "Berlangganan sekarang",
  },
  vi: {
    howEyebrow: "WhatsApp",
    howTitle: "Cách hoạt động của tín hiệu gửi qua WhatsApp",
    howText:
      "Đội ngũ theo dõi thị trường toàn cầu và gửi phân tích cùng tín hiệu trực tiếp trên WhatsApp. Bạn nhận thông tin giao dịch và thực hiện trên tài khoản của mình.",
    howItems: ["2–5 tín hiệu mỗi ngày", "Gửi trực tiếp qua WhatsApp", "Điểm vào, mục tiêu và stop đã xác định", "Phân tích thị trường và bối cảnh"],
    scheduleEyebrow: "Giờ gửi",
    scheduleTitle: "Giờ gửi tín hiệu",
    scheduleText:
      "Tín hiệu thường được gửi trong các khung thanh khoản chính, từ 8h đến 15h và từ 21h đến 24h giờ Brasília.",
    scheduleNote: "Giờ có thể thay đổi theo biến động, thanh khoản và cơ hội thực tế trên thị trường.",
    scheduleCards: [["SÁNG VÀ CHIỀU", "8h–15h"], ["ĐÊM", "21h–24h"]],
    methodEyebrow: "Phương pháp vận hành",
    methodTitle: "Tín hiệu dựa trên Ichimoku",
    methodText:
      "Mọi tín hiệu Varejo Investidor dựa trên đọc Ichimoku: đám mây, đường trung bình, vị trí giá, hỗ trợ, kháng cự và bối cảnh tài sản.",
    ichimokuItems: ["đọc đám mây", "trung bình Ichimoku", "hướng giá", "mục tiêu và stop", "bối cảnh tài sản", "quản lý rủi ro"],
    historyEyebrow: "Lịch sử",
    historyTitle: "Báo cáo Elite từ tháng 8/2018",
    historyText: "Theo dõi sự phát triển Kênh Elite qua các báo cáo lịch sử từ tháng 8/2018.",
    tableHeadings: ["NGÀY", "BÁO CÁO ELITE", "TÍN HIỆU", "KẾT QUẢ", "TRẠNG THÁI", "XEM"],
    reports: [["T8/2018", "Báo cáo Elite", "124 tín hiệu", "+18.4%", "Có sẵn"], ["T1/2021", "Báo cáo Elite", "98 tín hiệu", "+11.2%", "Có sẵn"], ["T3/2024", "Báo cáo Elite", "137 tín hiệu", "+22.7%", "Có sẵn"]],
    view: "XEM",
    docsEyebrow: "Cấu trúc tài liệu",
    docsTitle: "Cấu trúc gửi thực tế",
    docsText: "Tín hiệu live gửi trực tiếp qua WhatsApp từ 2018.",
    levelsEyebrow: "Cấp độ",
    levelsTitle: "Chọn cấp độ của bạn",
    levelsText: "Bắt đầu với Kênh Kiến miễn phí hoặc vào Elite Harpy để truy cập đầy đủ cấu trúc vận hành.",
    freeTitle: "Kênh Kiến",
    freePrice: "Miễn phí",
    freeButton: "Vào kênh miễn phí",
    formigaItems: ["miễn phí", "nội dung đào tạo", "phân tích cơ bản", "tầm nhìn giới thiệu", "xây nền tảng", "tín hiệu giới hạn"],
    eliteTitle: "Kênh Elite Harpy",
    eliteStructure: "Cấu trúc Elite",
    eliteButton: "Tham gia Elite",
    eliteItems: [
      "tín hiệu đầy đủ",
      "2–5 tín hiệu mỗi ngày",
      "điểm vào, mục tiêu, stop",
      "phân tích thị trường",
      "Forex",
      "vàng",
      "dầu",
      "chỉ số",
      "crypto",
      "đọc thị trường chuyên sâu",
      "cộng đồng kín",
      "khóa ghi hình cấp Kiến",
      "khóa ghi hình cấp Sói",
      "khóa ghi hình cấp Harpy",
      "cấu trúc Elite",
    ],
    packagesEyebrow: "Gói",
    packagesTitle: "Truy cập Elite",
    packagesText: "Chọn gói để nhận 100% tín hiệu, nhóm riêng, phân tích, khóa ghi hình và nội dung cấp Harpy.",
    benefitsTitle: "Bạn nhận được gì trong Kênh Elite",
    benefits: ["100% tín hiệu", "Nhóm riêng", "Phân tích thị trường", "Khóa ghi hình", "Nội dung Harpy", "Cấu trúc thị trường đầy đủ"],
    best: "Tiết kiệm nhất",
    now: "Đăng ký ngay",
  },
  pl: {
    howEyebrow: "WhatsApp",
    howTitle: "Jak działają sygnały wysyłane na WhatsApp",
    howText:
      "Nasz zespół śledzi rynki globalne i wysyła analizy oraz sygnały bezpośrednio na WhatsApp. Otrzymujesz informacje o transakcji i realizujesz ją na własnym koncie.",
    howItems: ["2–5 sygnałów dziennie", "Wysyłka bezpośrednio na WhatsApp", "Wejście, cel i stop określone", "Analiza rynku i kontekst"],
    scheduleEyebrow: "Godziny wysyłki",
    scheduleTitle: "Godziny wysyłki sygnałów",
    scheduleText:
      "Sygnały są zwykle wysyłane w głównych oknach płynności, 8:00–15:00 i 21:00–24:00 czasu brasiliańskiego.",
    scheduleNote: "Godziny mogą się zmieniać w zależności od zmienności, płynności i realnych okazji rynkowych.",
    scheduleCards: [["RANO I POPOŁUDNIE", "8:00–15:00"], ["NOC", "21:00–24:00"]],
    methodEyebrow: "Metoda operacyjna",
    methodTitle: "Sygnały oparte na Ichimoku",
    methodText:
      "Wszystkie sygnały Varejo Investidor opierają się na odczycie Ichimoku: chmura, średnie, pozycja ceny, wsparcie, opór i kontekst aktywa.",
    ichimokuItems: ["odczyt chmury", "średnie Ichimoku", "kierunek ceny", "cel i stop", "kontekst aktywa", "zarządzanie ryzykiem"],
    historyEyebrow: "Historia",
    historyTitle: "Raport Elite od sierpnia 2018",
    historyText: "Śledź rozwój Kanału Elite przez raporty historyczne od sierpnia 2018.",
    tableHeadings: ["DATA", "RAPORT ELITE", "SYGNAŁY", "WYNIK", "STATUS", "ZOBACZ"],
    reports: [["SIE/2018", "Raport Elite", "124 sygnały", "+18.4%", "Dostępny"], ["STY/2021", "Raport Elite", "98 sygnałów", "+11.2%", "Dostępny"], ["MAR/2024", "Raport Elite", "137 sygnałów", "+22.7%", "Dostępny"]],
    view: "ZOBACZ",
    docsEyebrow: "Struktura dokumentacji",
    docsTitle: "Rzeczywista struktura wysyłki",
    docsText: "Sygnały na żywo na WhatsApp od 2018 roku.",
    levelsEyebrow: "Poziomy",
    levelsTitle: "Wybierz swój poziom",
    levelsText: "Zacznij od bezpłatnego Kanału Mrówka lub dołącz do Elite Harpia, aby uzyskać pełny dostęp operacyjny.",
    freeTitle: "Kanał Mrówka",
    freePrice: "Bezpłatnie",
    freeButton: "Dołącz do kanału Mrówka",
    formigaItems: ["bezpłatnie", "treści edukacyjne", "analiza podstawowa", "wstępna wizja", "budowa fundamentów", "ograniczone sygnały"],
    eliteTitle: "Kanał Elite Harpia",
    eliteStructure: "Struktura Elite",
    eliteButton: "Dołącz do Elite",
    eliteItems: [
      "pełne sygnały",
      "2–5 sygnałów dziennie",
      "wejście, cel i stop",
      "analiza rynku",
      "Forex",
      "złoto",
      "ropa",
      "indeksy",
      "krypto",
      "odczyt instytucjonalny",
      "zamknięta społeczność",
      "nagrania poziom Mrówka",
      "nagrania poziom Wilk",
      "nagrania poziom Harpia",
      "struktura Elite",
    ],
    packagesEyebrow: "Pakiety",
    packagesTitle: "Dostęp Elite",
    packagesText: "Wybierz pakiet na 100% sygnałów, grupę ekskluzywną, analizy, nagrania i treści poziomu Harpia.",
    benefitsTitle: "Co otrzymujesz w Kanale Elite",
    benefits: ["100% sygnałów", "Grupa ekskluzywna", "Analiza rynku", "Nagrania", "Treści Harpia", "Pełna struktura rynku"],
    best: "Najlepsza wartość",
    now: "Subskrybuj teraz",
  },
  fa: {
    howEyebrow: "واتساپ",
    howTitle: "سیگنال‌های ارسالی در واتساپ چگونه کار می‌کنند",
    howText:
      "تیم ما بازارهای جهانی را دنبال می‌کند و تحلیل و سیگنال را مستقیماً در واتساپ ارسال می‌کند. اطلاعات معامله را دریافت می‌کنید و در حساب خود اجرا می‌کنید.",
    howItems: ["۲ تا ۵ سیگنال در روز", "ارسال مستقیم در واتساپ", "ورود، هدف و حد ضرر مشخص", "تحلیل بازار و زمینه"],
    scheduleEyebrow: "زمان ارسال",
    scheduleTitle: "زمان ارسال سیگنال",
    scheduleText:
      "سیگنال‌ها معمولاً در پنجره‌های اصلی نقدینگی، از ۸ تا ۱۵ و از ۲۱ تا ۲۴ به وقت برازیلیا ارسال می‌شوند.",
    scheduleNote: "زمان‌ها بسته به نوسان، نقدینگی و فرصت‌های واقعی بازار ممکن است تغییر کند.",
    scheduleCards: [["صبح و بعدازظهر", "۸ تا ۱۵"], ["شب", "۲۱ تا ۲۴"]],
    methodEyebrow: "روش عملیاتی",
    methodTitle: "سیگنال‌های مبتنی بر ایچیموکو",
    methodText:
      "همه سیگنال‌های Varejo Investidor بر پایه خواندن ایچیموکو است: ابر، میانگین‌ها، موقعیت قیمت، حمایت، مقاومت و زمینه دارایی.",
    ichimokuItems: ["خواندن ابر", "میانگین‌های ایچیموکو", "جهت قیمت", "هدف و حد ضرر", "زمینه دارایی", "مدیریت ریسک"],
    historyEyebrow: "سابقه",
    historyTitle: "گزارش Elite از اوت ۲۰۱۸",
    historyText: "مسیر کانال Elite را از گزارش‌های تاریخی از اوت ۲۰۱۸ دنبال کنید.",
    tableHeadings: ["تاریخ", "گزارش Elite", "سیگنال‌ها", "نتیجه", "وضعیت", "مشاهده"],
    reports: [["اوت/۲۰۱۸", "گزارش Elite", "۱۲۴ سیگنال", "+۱۸.۴٪", "موجود"], ["ژان/۲۰۲۱", "گزارش Elite", "۹۸ سیگنال", "+۱۱.۲٪", "موجود"], ["مار/۲۰۲۴", "گزارش Elite", "۱۳۷ سیگنال", "+۲۲.۷٪", "موجود"]],
    view: "مشاهده",
    docsEyebrow: "ساختار مستندات",
    docsTitle: "ساختار واقعی ارسال",
    docsText: "سیگنال‌های زنده در واتساپ از ۲۰۱۸.",
    levelsEyebrow: "سطوح",
    levelsTitle: "سطح خود را انتخاب کنید",
    levelsText: "با کانال رایگان مورچه شروع کنید یا برای دسترسی کامل عملیاتی به Elite Harpy بپیوندید.",
    freeTitle: "کانال مورچه",
    freePrice: "رایگان",
    freeButton: "ورود به کانال مورچه",
    formigaItems: ["رایگان", "محتوای آموزشی", "تحلیل پایه", "دید مقدماتی", "ساخت پایه", "سیگنال محدود"],
    eliteTitle: "کانال Elite Harpy",
    eliteStructure: "ساختار Elite",
    eliteButton: "عضویت در Elite",
    eliteItems: [
      "سیگنال کامل",
      "۲ تا ۵ سیگنال در روز",
      "ورود، هدف و حد ضرر",
      "تحلیل بازار",
      "فوركس",
      "طلا",
      "نفت",
      "شاخص‌ها",
      "کریپتو",
      "خوانش نهادی",
      "انجمن بسته",
      "کلاس ضبط‌شده سطح مورچه",
      "کلاس ضبط‌شده سطح گرگ",
      "کلاس ضبط‌شده سطح Harpy",
      "ساختار Elite",
    ],
    packagesEyebrow: "بسته‌ها",
    packagesTitle: "دسترسی Elite",
    packagesText: "بسته‌ای برای ۱۰۰٪ سیگنال‌ها، گروه اختصاصی، تحلیل، کلاس‌های ضبط‌شده و محتوای سطح Harpy انتخاب کنید.",
    benefitsTitle: "آنچه در کانال Elite دریافت می‌کنید",
    benefits: ["۱۰۰٪ سیگنال‌ها", "گروه اختصاصی", "تحلیل بازار", "کلاس‌های ضبط‌شده", "محتوای Harpy", "ساختار کامل بازار"],
    best: "بهترین ارزش",
    now: "همین حالا مشترک شوید",
  },
  ur: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp پر بھیجے گئے سگنلز کیسے کام کرتے ہیں",
    howText:
      "ہماری ٹیم عالمی مارکیٹس کی نگرانی کرتی ہے اور تجزیہ و سگنلز براہ راست WhatsApp پر بھیجتی ہے۔ آپ کو ٹریڈ کی معلومات ملتی ہے اور آپ اپنے اکاؤنٹ میں عمل درآمد کرتے ہیں۔",
    howItems: ["روزانہ 2 سے 5 سگنلز", "براہ راست WhatsApp ڈیلیوری", "انٹری، ہدف اور اسٹاپ طے", "مارکیٹ تجزیہ اور سیاق"],
    scheduleEyebrow: "بھیجنے کا وقت",
    scheduleTitle: "سگنل بھیجنے کا وقت",
    scheduleText:
      "سگنلز عام طور پر برازیلیا وقت کے مطابق 8:00–15:00 اور 21:00–24:00 کی اہم لیکویڈیٹی ونڈوز میں بھیجے جاتے ہیں۔",
    scheduleNote: "وقت اتار چڑھاؤ، لیکویڈیٹی اور حقیقی مارکیٹ مواقع کے مطابق بدل سکتا ہے۔",
    scheduleCards: [["صبح و شام", "8:00–15:00"], ["رات", "21:00–24:00"]],
    methodEyebrow: "آپریشنل طریقہ",
    methodTitle: "Ichimoku پر مبنی سگنلز",
    methodText:
      "تمام Varejo Investidor سگنلز Ichimoku پڑھنے پر مبنی ہیں: بادل، اوسط، قیمت کی پوزیشن، سپورٹ، مزاحمت اور اثاثے کا سیاق۔",
    ichimokuItems: ["بادل کی پڑھائی", "Ichimoku اوسط", "قیمت کی سمت", "ہدف اور اسٹاپ", "اثاثے کا سیاق", "خطرے کا انتظام"],
    historyEyebrow: "تاریخ",
    historyTitle: "اگست 2018 سے Elite رپورٹ",
    historyText: "اگست 2018 سے بھیجی گئی تاریخی رپورٹس سے Elite چینل کی سفر دیکھیں۔",
    tableHeadings: ["تاریخ", "ELITE رپورٹ", "سگنلز", "نتیجہ", "حالت", "دیکھیں"],
    reports: [["اگست/2018", "Elite رپورٹ", "124 سگنلز", "+18.4%", "دستیاب"], ["جنوری/2021", "Elite رپورٹ", "98 سگنلز", "+11.2%", "دستیاب"], ["مارچ/2024", "Elite رپورٹ", "137 سگنلز", "+22.7%", "دستیاب"]],
    view: "دیکھیں",
    docsEyebrow: "دستاویزی ساخت",
    docsTitle: "اصل بھیجنے کی ساخت",
    docsText: "2018 سے WhatsApp پر براہ راست لائیو سگنلز۔",
    levelsEyebrow: "سطحیں",
    levelsTitle: "اپنی سطح چنیں",
    levelsText: "مفت چیونٹی چینل سے شروع کریں یا مکمل آپریشنل ساخت کے لیے Elite Harpy میں شامل ہوں۔",
    freeTitle: "چیونٹی چینل",
    freePrice: "مفت",
    freeButton: "چیونٹی چینل میں شامل ہوں",
    formigaItems: ["مفت", "تعلیمی مواد", "بنیادی تجزیہ", "تعارفی نظریہ", "بنیاد کی تعمیر", "محدود سگنلز"],
    eliteTitle: "Elite Harpy چینل",
    eliteStructure: "Elite ساخت",
    eliteButton: "Elite میں شامل ہوں",
    eliteItems: [
      "مکمل سگنلز",
      "روزانہ 2–5 سگنلز",
      "انٹری، ہدف، اسٹاپ",
      "مارکیٹ تجزیہ",
      "Forex",
      "سونا",
      "تیل",
      "انڈیکسز",
      "کرپٹو",
      "ادارہ جاتی پڑھائی",
      "بند کمیونٹی",
      "چیونٹی سطح ریکارڈ کلاسز",
      "بھیڑیا سطح ریکارڈ کلاسز",
      "Harpy سطح ریکارڈ کلاسز",
      "Elite ساخت",
    ],
    packagesEyebrow: "پیکج",
    packagesTitle: "Elite رسائی",
    packagesText: "100% سگنلز، خصوصی گروپ، تجزیہ، ریکارڈ کلاسز اور Harpy سطح مواد کے لیے پیکج چنیں۔",
    benefitsTitle: "Elite چینل میں آپ کو کیا ملتا ہے",
    benefits: ["100% سگنلز", "خصوصی گروپ", "مارکیٹ تجزیہ", "ریکارڈ کلاسز", "Harpy مواد", "مکمل مارکیٹ ساخت"],
    best: "بہترین قیمت",
    now: "ابھی سبسکرائب کریں",
  },
  zh: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp 交易信号如何运作",
    howText: "团队跟踪全球市场，通过 WhatsApp 直接发送分析与信号。您收到交易信息后在自己的账户执行。",
    howItems: ["每天 2–5 条信号", "WhatsApp 直送", "明确入场、目标与止损", "市场分析与背景"],
    scheduleEyebrow: "发送时段",
    scheduleTitle: "信号发送时间",
    scheduleText: "信号通常在巴西利亚时间 8:00–15:00 与 21:00–24:00 的主要流动性窗口发送。",
    scheduleNote: "时间可能随波动、流动性及真实市场机会而变化。",
    scheduleCards: [["上午与下午", "8:00–15:00"], ["夜间", "21:00–24:00"]],
    methodEyebrow: "分析方法",
    methodTitle: "基于一目均衡表的信号",
    methodText: "Varejo Investidor 所有信号基于一目均衡表：云区、均线、价格位置、支撑阻力及资产背景。",
    ichimokuItems: ["云区解读", "一目均线", "价格方向", "目标与止损", "资产背景", "风险管理"],
    historyEyebrow: "历史",
    historyTitle: "2018 年 8 月以来的 Elite 报告",
    historyText: "通过 2018 年 8 月以来的历史报告，了解 Elite 频道的运营历程。",
    tableHeadings: ["日期", "ELITE 报告", "信号", "结果", "状态", "查看"],
    reports: [["2018/8", "Elite 报告", "124 条信号", "+18.4%", "可查看"], ["2021/1", "Elite 报告", "98 条信号", "+11.2%", "可查看"], ["2024/3", "Elite 报告", "137 条信号", "+22.7%", "可查看"]],
    view: "查看",
    docsEyebrow: "文档结构",
    docsTitle: "真实发送结构",
    docsText: "自 2018 年起通过 WhatsApp 直送实时信号。",
    levelsEyebrow: "层级",
    levelsTitle: "选择您的层级",
    levelsText: "从免费蚂蚁频道开始，或加入 Elite 鹰层级，获取完整运营结构。",
    freeTitle: "蚂蚁频道",
    freePrice: "免费",
    freeButton: "加入蚂蚁频道",
    formigaItems: ["免费", "教育内容", "基础分析", "入门视角", "打基础", "限量信号"],
    eliteTitle: "Elite 鹰频道",
    eliteStructure: "Elite 结构",
    eliteButton: "加入 Elite",
    eliteItems: [
      "完整信号",
      "每天 2–5 条",
      "入场、目标、止损",
      "市场分析",
      "Forex",
      "黄金",
      "原油",
      "指数",
      "加密资产",
      "机构视角解读",
      "封闭社群",
      "蚂蚁级录播课",
      "狼级录播课",
      "鹰级录播课",
      "Elite 结构",
    ],
    packagesEyebrow: "套餐",
    packagesTitle: "Elite 权限",
    packagesText: "选择套餐以获取 100% 信号、专属群组、分析、录播课及鹰层级内容。",
    benefitsTitle: "Elite 频道包含",
    benefits: ["100% 信号", "专属群组", "市场分析", "录播课程", "鹰层级内容", "完整市场结构"],
    best: "最划算",
    now: "立即订阅",
  },
  tl: {
    howEyebrow: "WhatsApp",
    howTitle: "Paano gumagana ang mga signal sa WhatsApp",
    howText:
      "Sinusubaybayan ng team ang global markets at nagpapadala ng analysis at signals direkta sa WhatsApp. Matatanggap mo ang trade info at i-e-execute mo sa sariling account.",
    howItems: ["2 hanggang 5 signal bawat araw", "Direktang delivery sa WhatsApp", "Entry, target, at stop na naka-define", "Market analysis at konteksto"],
    scheduleEyebrow: "Oras ng pagpapadala",
    scheduleTitle: "Iskedyul ng signals",
    scheduleText:
      "Karaniwang ipinapadala ang signals sa main liquidity windows, 8 AM–3 PM at 9 PM–12 AM Brasília time.",
    scheduleNote: "Maaaring magbago ang oras depende sa volatility, liquidity, at tunay na market opportunities.",
    scheduleCards: [["UMaga at hapon", "8 AM–3 PM"], ["Gabi", "9 PM–12 AM"]],
    methodEyebrow: "Operational method",
    methodTitle: "Signals base sa Ichimoku",
    methodText:
      "Lahat ng Varejo Investidor signals ay base sa Ichimoku reading: cloud, averages, price position, support, resistance, at asset context.",
    ichimokuItems: ["cloud reading", "Ichimoku averages", "price direction", "target at stop", "asset context", "risk management"],
    historyEyebrow: "Kasaysayan",
    historyTitle: "Elite Report mula Agosto 2018",
    historyText: "Sundan ang Elite Channel sa pamamagitan ng historical reports mula Agosto 2018.",
    tableHeadings: ["PETSA", "ELITE REPORT", "SIGNALS", "RESULTA", "STATUS", "TINGNAN"],
    reports: [["AGO/2018", "Elite Report", "124 signals", "+18.4%", "Available"], ["ENE/2021", "Elite Report", "98 signals", "+11.2%", "Available"], ["MAR/2024", "Elite Report", "137 signals", "+22.7%", "Available"]],
    view: "TINGNAN",
    docsEyebrow: "Documentary structure",
    docsTitle: "Tunay na istruktura ng pagpapadala",
    docsText: "Live signals direkta sa WhatsApp mula 2018.",
    levelsEyebrow: "Mga antas",
    levelsTitle: "Piliin ang iyong antas",
    levelsText: "Magsimula sa libreng Formiga Channel o pumasok sa Elite Harpy para sa buong operational structure.",
    freeTitle: "Formiga Channel",
    freePrice: "Libre",
    freeButton: "Pumasok sa Formiga Channel",
    formigaItems: ["libre", "educational content", "basic analysis", "intro na pananaw", "pagtatayo ng base", "limitadong signals"],
    eliteTitle: "Elite Harpy Channel",
    eliteStructure: "Elite Structure",
    eliteButton: "Sumali sa Elite",
    eliteItems: [
      "kumpletong signals",
      "2–5 signals bawat araw",
      "entry, target, stop",
      "market analysis",
      "Forex",
      "gold",
      "oil",
      "indices",
      "crypto",
      "institutional reading",
      "closed community",
      "recorded Formiga classes",
      "recorded Lobo classes",
      "recorded Harpy classes",
      "Elite structure",
    ],
    packagesEyebrow: "Mga package",
    packagesTitle: "Elite Access",
    packagesText: "Pumili ng package para sa 100% signals, exclusive group, analysis, recorded classes, at Harpy-level content.",
    benefitsTitle: "Ano ang makukuha mo sa Elite Channel",
    benefits: ["100% ng signals", "Exclusive group", "Market analysis", "Recorded classes", "Harpy-level content", "Kumpletong market structure"],
    best: "Pinakasulit",
    now: "Mag-subscribe ngayon",
  },
  ru: {
    howEyebrow: "WhatsApp",
    howTitle: "Как работают сигналы в WhatsApp",
    howText:
      "Команда отслеживает мировые рынки и отправляет аналитику и сигналы прямо в WhatsApp. Вы получаете данные сделки и исполняете её на своём счёте.",
    howItems: ["2–5 сигналов в день", "Прямая доставка в WhatsApp", "Вход, цель и стоп заданы", "Аналитика и контекст рынка"],
    scheduleEyebrow: "Время отправки",
    scheduleTitle: "Расписание сигналов",
    scheduleText:
      "Сигналы обычно отправляются в основные окна ликвидности: 8:00–15:00 и 21:00–24:00 по времени Бразилиа.",
    scheduleNote: "Время может меняться в зависимости от волатильности, ликвидности и реальных возможностей рынка.",
    scheduleCards: [["УТРО И ДЕНЬ", "8:00–15:00"], ["ВЕЧЕР", "21:00–24:00"]],
    methodEyebrow: "Операционный метод",
    methodTitle: "Сигналы на основе Ichimoku",
    methodText:
      "Все сигналы Varejo Investidor основаны на Ichimoku: облако, средние, позиция цены, поддержка, сопротивление и контекст актива.",
    ichimokuItems: ["чтение облака", "средние Ichimoku", "направление цены", "цель и стоп", "контекст актива", "управление риском"],
    historyEyebrow: "История",
    historyTitle: "Отчёт Elite с августа 2018",
    historyText: "Следите за каналом Elite по историческим отчётам с августа 2018 года.",
    tableHeadings: ["ДАТА", "ОТЧЁТ ELITE", "СИГНАЛЫ", "РЕЗУЛЬТАТ", "СТАТУС", "СМОТРЕТЬ"],
    reports: [["АВГ/2018", "Отчёт Elite", "124 сигнала", "+18.4%", "Доступно"], ["ЯНВ/2021", "Отчёт Elite", "98 сигналов", "+11.2%", "Доступно"], ["МАР/2024", "Отчёт Elite", "137 сигналов", "+22.7%", "Доступно"]],
    view: "СМОТРЕТЬ",
    docsEyebrow: "Документация",
    docsTitle: "Реальная структура отправки",
    docsText: "Живые сигналы в WhatsApp с 2018 года.",
    levelsEyebrow: "Уровни",
    levelsTitle: "Выберите уровень",
    levelsText: "Начните с бесплатного канала Муравей или войдите в Elite Гарпия для полного операционного доступа.",
    freeTitle: "Канал Муравей",
    freePrice: "Бесплатно",
    freeButton: "Войти в канал Муравей",
    formigaItems: ["бесплатно", "обучающий контент", "базовый анализ", "вводный обзор", "фундамент", "ограниченные сигналы"],
    eliteTitle: "Канал Elite Гарпия",
    eliteStructure: "Структура Elite",
    eliteButton: "Войти в Elite",
    eliteItems: [
      "полные сигналы",
      "2–5 сигналов в день",
      "вход, цель, стоп",
      "анализ рынка",
      "Forex",
      "золото",
      "нефть",
      "индексы",
      "крипто",
      "институциональное чтение",
      "закрытое сообщество",
      "записи уровня Муравей",
      "записи уровня Волк",
      "записи уровня Гарпия",
      "структура Elite",
    ],
    packagesEyebrow: "Пакеты",
    packagesTitle: "Доступ Elite",
    packagesText: "Выберите пакет для 100 % сигналов, закрытой группы, аналитики, записей и контента уровня Гарпия.",
    benefitsTitle: "Что вы получаете в канале Elite",
    benefits: ["100 % сигналов", "Закрытая группа", "Анализ рынка", "Записи занятий", "Контент Гарпия", "Полная структура рынка"],
    best: "Лучшая цена",
    now: "Подписаться",
  },
  bn: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp-এ পাঠানো সিগন্যাল কীভাবে কাজ করে",
    howText:
      "আমাদের দল বৈশ্বিক মার্কেট পর্যবেক্ষণ করে এবং বিশ্লেষণ ও সিগন্যাল সরাসরি WhatsApp-এ পাঠায়। আপনি ট্রেডের তথ্য পান এবং নিজের অ্যাকাউন্টে বাস্তবায়ন করেন।",
    howItems: ["প্রতিদিন ২–৫টি সিগন্যাল", "সরাসরি WhatsApp ডেলিভারি", "এন্ট্রি, টার্গেট ও স্টপ নির্ধারিত", "মার্কেট বিশ্লেষণ ও প্রসঙ্গ"],
    scheduleEyebrow: "পাঠানোর সময়",
    scheduleTitle: "সিগন্যাল পাঠানোর সময়",
    scheduleText:
      "সিগন্যাল সাধারণত ব্রাজিলিয়া সময় ৮:০০–১৫:০০ ও ২১:০০–২৪:০০-এর প্রধান লিকুইডিটি উইন্ডোতে পাঠানো হয়।",
    scheduleNote: "অস্থিরতা, লিকুইডিটি ও প্রকৃত সুযোগ অনুযায়ী সময় পরিবর্তিত হতে পারে।",
    scheduleCards: [["সকাল ও বিকেল", "৮:০০–১৫:০০"], ["রাত", "২১:০০–২৪:০০"]],
    methodEyebrow: "পদ্ধতি",
    methodTitle: "Ichimoku-ভিত্তিক সিগন্যাল",
    methodText:
      "সব Varejo Investidor সিগন্যাল Ichimoku পড়ার ওপর ভিত্তি করে: ক্লাউড, গড়, মূল্যের অবস্থান, সাপোর্ট, রেজিস্ট্যান্স ও অ্যাসেট প্রসঙ্গ।",
    ichimokuItems: ["ক্লাউড পড়া", "Ichimoku গড়", "মূল্যের দিক", "টার্গেট ও স্টপ", "অ্যাসেট প্রসঙ্গ", "ঝুঁকি ব্যবস্থাপনা"],
    historyEyebrow: "ইতিহাস",
    historyTitle: "আগস্ট ২০১৮ থেকে Elite রিপোর্ট",
    historyText: "আগস্ট ২০১৮ থেকে পাঠানো ঐতিহাসিক রিপোর্ট দিয়ে Elite চ্যানেলের যাত্রা দেখুন।",
    tableHeadings: ["তারিখ", "ELITE রিপোর্ট", "সিগন্যাল", "ফলাফল", "স্ট্যাটাস", "দেখুন"],
    reports: [["আগ/২০১৮", "Elite রিপোর্ট", "১২৪ সিগন্যাল", "+১৮.৪%", "উপলব্ধ"], ["জান/২০২১", "Elite রিপোর্ট", "৯৮ সিগন্যাল", "+১১.২%", "উপলব্ধ"], ["মার্চ/২০২৪", "Elite রিপোর্ট", "১৩৭ সিগন্যাল", "+২২.৭%", "উপলব্ধ"]],
    view: "দেখুন",
    docsEyebrow: "ডকুমেন্টেশন",
    docsTitle: "প্রকৃত পাঠানোর কাঠামো",
    docsText: "২০১৮ থেকে WhatsApp-এ সরাসরি লাইভ সিগন্যাল।",
    levelsEyebrow: "স্তর",
    levelsTitle: "আপনার স্তর বেছে নিন",
    levelsText: "বিনামূল্যে পিপীলিকা চ্যানেল দিয়ে শুরু করুন অথবা সম্পূর্ণ অপারেশনাল স্ট্রাকচারের জন্য Elite Harpy-তে যোগ দিন।",
    freeTitle: "পিপীলিকা চ্যানেল",
    freePrice: "বিনামূল্যে",
    freeButton: "পিপীলিকা চ্যানেলে যোগ দিন",
    formigaItems: ["বিনামূল্যে", "শিক্ষামূলক কনটেন্ট", "মৌলিক বিশ্লেষণ", "পরিচয়মূলক দৃষ্টি", "ভিত্তি গড়া", "সীমিত সিগন্যাল"],
    eliteTitle: "Elite Harpy চ্যানেল",
    eliteStructure: "Elite স্ট্রাকচার",
    eliteButton: "Elite-এ যোগ দিন",
    eliteItems: [
      "সম্পূর্ণ সিগন্যাল",
      "প্রতিদিন ২–৫টি",
      "এন্ট্রি, টার্গেট, স্টপ",
      "মার্কেট বিশ্লেষণ",
      "Forex",
      "সোনা",
      "তেল",
      "সূচক",
      "ক্রিপ্টো",
      "প্রাতিষ্ঠানিক পড়া",
      "বন্ধ কমিউনিটি",
      "পিপীলিকা স্তর রেকর্ডেড ক্লাস",
      "নেকড়ে স্তর রেকর্ডেড ক্লাস",
      "Harpy স্তর রেকর্ডেড ক্লাস",
      "Elite স্ট্রাকচার",
    ],
    packagesEyebrow: "প্যাকেজ",
    packagesTitle: "Elite অ্যাক্সেস",
    packagesText: "১০০% সিগন্যাল, এক্সক্লুসিভ গ্রুপ, বিশ্লেষণ, রেকর্ডেড ক্লাস ও Harpy স্তরের কনটেন্টের জন্য প্যাকেজ বেছে নিন।",
    benefitsTitle: "Elite চ্যানেলে আপনি যা পান",
    benefits: ["১০০% সিগন্যাল", "এক্সক্লুসিভ গ্রুপ", "মার্কেট বিশ্লেষণ", "রেকর্ডেড ক্লাস", "Harpy কনটেন্ট", "সম্পূর্ণ মার্কেট স্ট্রাকচার"],
    best: "সেরা মূল্য",
    now: "এখনই সাবস্ক্রাইব করুন",
  },
  th: {
    howEyebrow: "WhatsApp",
    howTitle: "สัญญาณที่ส่งผ่าน WhatsApp ทำงานอย่างไร",
    howText:
      "ทีมของเราติดตามตลาดโลกและส่งบทวิเคราะห์พร้อมสัญญาณไปยัง WhatsApp โดยตรง คุณได้รับข้อมูลการเทรดและดำเนินการในบัญชีของคุณเอง",
    howItems: ["วันละ 2–5 สัญญาณ", "ส่งตรงผ่าน WhatsApp", "จุดเข้า เป้าหมาย และสต็อปชัดเจน", "บทวิเคราะห์และบริบทตลาด"],
    scheduleEyebrow: "ช่วงเวลาส่ง",
    scheduleTitle: "ช่วงเวลาส่งสัญญาณ",
    scheduleText:
      "สัญญาณมักถูกส่งในช่วงสภาพคล่องหลัก 8:00–15:00 และ 21:00–24:00 ตามเวลาบราซิเลีย",
    scheduleNote: "เวลาอาจเปลี่ยนตามความผันผวน สภาพคล่อง และโอกาสจริงของตลาด",
    scheduleCards: [["เช้าและบ่าย", "8:00–15:00"], ["กลางคืน", "21:00–24:00"]],
    methodEyebrow: "วิธีวิเคราะห์",
    methodTitle: "สัญญาณบน Ichimoku",
    methodText:
      "สัญญาณ Varejo Investidor อิงการอ่าน Ichimoku: เมฆ ค่าเฉลี่ย ตำแหน่งราคา แนวรับ แนวต้าน และบริบทสินทรัพย์",
    ichimokuItems: ["การอ่านเมฆ", "ค่าเฉลี่ย Ichimoku", "ทิศทางราคา", "เป้าหมายและสต็อป", "บริบทสินทรัพย์", "การจัดการความเสี่ยง"],
    historyEyebrow: "ประวัติ",
    historyTitle: "รายงาน Elite ตั้งแต่สิงหาคม 2018",
    historyText: "ติดตามช่อง Elite ผ่านรายงานย้อนหลังตั้งแต่สิงหาคม 2018",
    tableHeadings: ["วันที่", "รายงาน ELITE", "สัญญาณ", "ผลลัพธ์", "สถานะ", "ดู"],
    reports: [["ส.ค./2018", "รายงาน Elite", "124 สัญญาณ", "+18.4%", "พร้อมใช้"], ["ม.ค./2021", "รายงาน Elite", "98 สัญญาณ", "+11.2%", "พร้อมใช้"], ["มี.ค./2024", "รายงาน Elite", "137 สัญญาณ", "+22.7%", "พร้อมใช้"]],
    view: "ดู",
    docsEyebrow: "โครงสร้างเอกสาร",
    docsTitle: "โครงสร้างการส่งจริง",
    docsText: "สัญญาณสดบน WhatsApp ตั้งแต่ปี 2018",
    levelsEyebrow: "ระดับ",
    levelsTitle: "เลือกระดับของคุณ",
    levelsText: "เริ่มจากช่องมดฟรี หรือเข้า Elite ฮาร์ปี้เพื่อโครงสร้างปฏิบัติการครบ",
    freeTitle: "ช่องมด",
    freePrice: "ฟรี",
    freeButton: "เข้าร่วมช่องมด",
    formigaItems: ["ฟรี", "คอนเทนต์การศึกษา", "วิเคราะห์พื้นฐาน", "มุมมองเริ่มต้น", "สร้างฐานราก", "สัญญาณจำกัด"],
    eliteTitle: "ช่อง Elite ฮาร์ปี้",
    eliteStructure: "โครงสร้าง Elite",
    eliteButton: "เข้าร่วม Elite",
    eliteItems: [
      "สัญญาณครบ",
      "วันละ 2–5 สัญญาณ",
      "จุดเข้า เป้าหมาย สต็อป",
      "วิเคราะห์ตลาด",
      "Forex",
      "ทองคำ",
      "น้ำมัน",
      "ดัชนี",
      "คริปโต",
      "การอ่านเชิงสถาบัน",
      "ชุมชนปิด",
      "คลาสบันทึกระดับมด",
      "คลาสบันทึกระดับหมาป่า",
      "คลาสบันทึกระดับฮาร์ปี้",
      "โครงสร้าง Elite",
    ],
    packagesEyebrow: "แพ็กเกจ",
    packagesTitle: "การเข้าถึง Elite",
    packagesText: "เลือกแพ็กเกจเพื่อรับสัญญาณ 100% กลุ่มพิเศษ บทวิเคราะห์ คลาสบันทึก และคอนเทนต์ระดับฮาร์ปี้",
    benefitsTitle: "สิ่งที่คุณได้รับในช่อง Elite",
    benefits: ["สัญญาณ 100%", "กลุ่มพิเศษ", "วิเคราะห์ตลาด", "คลาสบันทึก", "คอนเทนต์ฮาร์ปี้", "โครงสร้างตลาดครบ"],
    best: "คุ้มค่าที่สุด",
    now: "สมัครตอนนี้",
  },
  ko: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp으로 전달되는 신호의 작동 방식",
    howText:
      "팀이 글로벌 시장을 추적하고 분석과 신호를 WhatsApp으로 직접 보냅니다. 거래 정보를 받아 본인 계좌에서 실행합니다.",
    howItems: ["하루 2–5개 신호", "WhatsApp 직접 전달", "진입·목표·손절 명시", "시장 분석과 맥락"],
    scheduleEyebrow: "발송 시간",
    scheduleTitle: "신호 발송 시간",
    scheduleText:
      "신호는 보통 브라질리아 시간 기준 8:00–15:00, 21:00–24:00 주요 유동성 시간대에 발송됩니다.",
    scheduleNote: "변동성, 유동성, 실제 시장 기회에 따라 시간은 달라질 수 있습니다.",
    scheduleCards: [["오전·오후", "8:00–15:00"], ["밤", "21:00–24:00"]],
    methodEyebrow: "분석 방법",
    methodTitle: "일목균형표 기반 신호",
    methodText:
      "모든 Varejo Investidor 신호는 일목균형표 읽기에 기반합니다: 구름, 이평, 가격 위치, 지지·저항, 자산 맥락.",
    ichimokuItems: ["구름 해석", "일목 이평", "가격 방향", "목표와 손절", "자산 맥락", "리스크 관리"],
    historyEyebrow: "히스토리",
    historyTitle: "2018년 8월부터 Elite 리포트",
    historyText: "2018년 8월부터 발송된 역사적 리포트로 Elite 채널의 운영 과정을 확인하세요.",
    tableHeadings: ["날짜", "ELITE 리포트", "신호", "결과", "상태", "보기"],
    reports: [["2018.8", "Elite 리포트", "124건", "+18.4%", "이용 가능"], ["2021.1", "Elite 리포트", "98건", "+11.2%", "이용 가능"], ["2024.3", "Elite 리포트", "137건", "+22.7%", "이용 가능"]],
    view: "보기",
    docsEyebrow: "문서 구조",
    docsTitle: "실제 발송 구조",
    docsText: "2018년부터 WhatsApp으로 직접 전송되는 라이브 신호.",
    levelsEyebrow: "레벨",
    levelsTitle: "레벨 선택",
    levelsText: "무료 개미 채널로 시작하거나 전체 운영 구조를 위해 Elite 하피에 참여하세요.",
    freeTitle: "개미 채널",
    freePrice: "무료",
    freeButton: "개미 채널 참여",
    formigaItems: ["무료", "교육 콘텐츠", "기초 분석", "입문 관점", "기반 구축", "제한된 신호"],
    eliteTitle: "Elite 하피 채널",
    eliteStructure: "Elite 구조",
    eliteButton: "Elite 참여",
    eliteItems: [
      "전체 신호",
      "하루 2–5개",
      "진입·목표·손절",
      "시장 분석",
      "Forex",
      "금",
      "원유",
      "지수",
      "암호화폐",
      "기관적 읽기",
      "비공개 커뮤니티",
      "개미 레벨 녹화 강의",
      "늑대 레벨 녹화 강의",
      "하피 레벨 녹화 강의",
      "Elite 구조",
    ],
    packagesEyebrow: "패키지",
    packagesTitle: "Elite 이용",
    packagesText: "100% 신호, 전용 그룹, 분석, 녹화 강의, 하피 레벨 콘텐츠를 위한 패키지를 선택하세요.",
    benefitsTitle: "Elite 채널에서 받는 것",
    benefits: ["신호 100%", "전용 그룹", "시장 분석", "녹화 강의", "하피 콘텐츠", "완전한 시장 구조"],
    best: "최고의 가치",
    now: "지금 구독하기",
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
  he: {
    howEyebrow: "ערוץ Elite",
    howTitle: "איך הסיגנלים ב-WhatsApp עובדים",
    howText: "הצוות שלנו עוקב אחרי השווקים הגלובליים ושולח ניתוח וסיגנלים ישירות ב-WhatsApp. אתם מקבלים את פרטי העסקה ומבצעים בחשבון שלכם.",
    howItems: ["2 עד 5 סיגנלים ביום", "משלוח ישיר ב-WhatsApp", "כניסה, יעד וסטופ מוגדרים", "ניתוח שוק והקשר תפעולי"],
    scheduleEyebrow: "שעות מסחר",
    scheduleTitle: "שעות שליחה",
    scheduleText: "הסיגנלים נשלחים בדרך כלל בחלונות הנזילות המרכזיים בשוק, בין 08:00 ל-15:00 ובין 21:00 ל-00:00 בשעון ברזília.",
    scheduleNote: "השעות עשויות להשתנות לפי תנודתיות, נזילות והזדמנויות אמיתיות בשוק.",
    scheduleCards: [["בוקר ואחר הצהריים", "08:00-15:00"], ["לילה", "21:00-00:00"]],
    methodEyebrow: "שיטה תפעולית",
    methodTitle: "סיגנלים על בסיס Ichimoku",
    methodText: "כל הסיגנלים של Varejo Investidor מבוססים על קריאת Ichimoku, הענן, הממוצעים, מיקום המחיר, תמיכה, התנגדות והקשר הנכס.",
    ichimokuItems: ["קריאת הענן", "ממוצעי Ichimoku", "כיוון מחיר", "יעד וסטופ", "הקשר נכס", "ניהול סיכון"],
    historyEyebrow: "היסטוריה",
    historyTitle: "דוח Elite מאז אוגוסט 2018",
    historyText: "עקבו אחרי ערוץ Elite דרך הדוחות ההיסטוריים ששלחנו מאז אוגוסט 2018.",
    tableHeadings: ["תאריך", "דוח Elite", "סיגנלים", "תוצאה", "סטטוס", "צפייה"],
    reports: [["אוג/2018", "דוח Elite", "124 סיגנלים", "+18.4%", "זמין"], ["ינו/2021", "דוח Elite", "98 סיגנלים", "+11.2%", "זמין"], ["מרץ/2024", "דוח Elite", "137 סיגנלים", "+22.7%", "זמין"]],
    view: "צפייה",
    docsEyebrow: "מבנה תיעודי",
    docsTitle: "מבנה שליחה אמיתי",
    docsText: "סיגנלים חיים ב-WhatsApp מאז 2018.",
    levelsEyebrow: "רמות",
    levelsTitle: "בחרו את הרמה שלכם",
    levelsText: "התחילו בערוץ Formiga החינמי או הצטרפו ל-Elite Harpia למבנה תפעולי מלא.",
    freeTitle: "ערוץ Formiga",
    freePrice: "חינם",
    freeButton: "כניסה לערוץ Formiga",
    formigaItems: ["חינם", "תוכן לימודי", "ניתוח בסיסי", "מבט מבוא", "בניית בסיס", "סיגנלים מוגבלים"],
    eliteTitle: "ערוץ Elite Harpia",
    eliteStructure: "מבנה Elite",
    eliteButton: "הצטרפו ל-Elite",
    eliteItems: ["סיגנלים מלאים", "2-5 סיגנלים ביום", "כניסה, יעד וסטופ", "ניתוח שוק", "Forex", "זהב", "נפט", "מדדים", "קריפטו", "קריאה מוסדית", "קהילה סגורה", "שיעורים מוקלטים Formiga", "שיעורים מוקלטים Lobo", "שיעורים מוקלטים Harpia", "מבנה Elite"],
    packagesEyebrow: "חבילות",
    packagesTitle: "גישה ל-Elite",
    packagesText: "בחרו חבילה לגישה ל-100% מהסיגנלים, קבוצה בלעדית, ניתוחים, שיעורים מוקלטים ותוכן ברמת Harpia.",
    benefitsTitle: "מה מקבלים בערוץ Elite",
    benefits: ["100% מהסיגנלים", "קבוצה בלעדית", "ניתוח שוק", "שיעורים מוקלטים", "תוכן Harpia", "מבנה שוק מלא"],
    best: "התמורה הטובה ביותר",
    now: "הירשמו עכשיו",
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
  ja: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsAppで届くシグナルの仕組み",
    howText:
      "チームが世界市場を追跡し、分析とシグナルをWhatsAppで直接お届けします。取引情報を受け取り、ご自身の口座で実行できます。",
    howItems: ["1日2〜5件のシグナル", "WhatsAppへ直接配信", "エントリー・目標・ストップを明示", "市場分析と背景"],
    scheduleEyebrow: "配信時間",
    scheduleTitle: "配信スケジュール",
    scheduleText:
      "シグナルは通常、ブラジリア時間の8時〜15時、および21時〜0時の主要な流動性時間帯に送信されます。",
    scheduleNote: "ボラティリティ、流動性、実際の市場機会に応じて時間は変わる場合があります。",
    scheduleCards: [
      ["午前・午後", "8:00〜15:00"],
      ["夜", "21:00〜0:00"],
    ],
    methodEyebrow: "分析手法",
    methodTitle: "一目均衡表に基づくシグナル",
    methodText:
      "Varejo Investidorのすべてのシグナルは一目均衡表の読み方に基づき、雲、平均線、価格位置、サポート・レジスタンス、銘柄の文脈を重視しています。",
    ichimokuItems: [
      "雲の読み方",
      "一目平均線",
      "価格の方向",
      "目標とストップ",
      "銘柄の文脈",
      "リスク管理",
    ],
    historyEyebrow: "履歴",
    historyTitle: "2018年8月からのEliteレポート",
    historyText: "2018年8月から送信してきた履歴レポートで、Eliteチャンネルの運用推移を追えます。",
    tableHeadings: ["日付", "Eliteレポート", "シグナル数", "結果", "ステータス", "表示"],
    reports: [
      ["2018年8月", "Eliteレポート", "124件", "+18.4%", "閲覧可"],
      ["2021年1月", "Eliteレポート", "98件", "+11.2%", "閲覧可"],
      ["2024年3月", "Eliteレポート", "137件", "+22.7%", "閲覧可"],
    ],
    view: "表示",
    docsEyebrow: "ドキュメント",
    docsTitle: "実際の配信構造",
    docsText: "2018年からWhatsAppでライブシグナルを直接配信しています。",
    levelsEyebrow: "レベル",
    levelsTitle: "レベルを選ぶ",
    levelsText:
      "無料のアリチャンネルから始めるか、Eliteハーピーで運用構造へフルアクセスしてください。",
    freeTitle: "アリチャンネル",
    freePrice: "無料",
    freeButton: "アリチャンネルに参加",
    formigaItems: [
      "無料",
      "教育コンテンツ",
      "基礎分析",
      "入門の視点",
      "基礎づくり",
      "限定シグナル",
    ],
    eliteTitle: "Eliteハーピーチャンネル",
    eliteStructure: "Elite構造",
    eliteButton: "Eliteに参加",
    eliteItems: [
      "フルシグナル",
      "1日2〜5件",
      "エントリー・目標・ストップ",
      "市場分析",
      "Forex",
      "金",
      "原油",
      "指数",
      "暗号資産",
      "機関投資家視点のリーディング",
      "限定コミュニティ",
      "アリレベル録画講座",
      "オオカミレベル録画講座",
      "ハーピーレベル録画講座",
      "Elite構造",
    ],
    packagesEyebrow: "プラン",
    packagesTitle: "Eliteアクセス",
    packagesText:
      "100%のシグナル、限定グループ、分析、録画講座、ハーピーレベルコンテンツへアクセスするプランを選べます。",
    benefitsTitle: "Eliteチャンネルで受け取れる内容",
    benefits: [
      "100%のシグナル",
      "限定グループ",
      "市場分析",
      "録画講座",
      "ハーピーレベルコンテンツ",
      "市場構造の全体像",
    ],
    best: "最もお得",
    now: "今すぐ申し込む",
  },
  hi: {
    howEyebrow: "WhatsApp",
    howTitle: "WhatsApp पर भेजे गए सिग्नल कैसे काम करते हैं",
    howText:
      "हमारी टीम वैश्विक बाजारों का अनुसरण करती है और विश्लेषण व सिग्नल सीधे WhatsApp पर भेजती है। आप ट्रेड जानकारी पाकर अपने खाते में निष्पादित करते हैं।",
    howItems: ["दिन में 2–5 सिग्नल", "सीधे WhatsApp डिलीवरी", "एंट्री, लक्ष्य और स्टॉप तय", "बाजार विश्लेषण और संदर्भ"],
    scheduleEyebrow: "भेजने का समय",
    scheduleTitle: "सिग्नल भेजने का समय",
    scheduleText:
      "सिग्नल आमतौर पर ब्राज़ीलिया समय के अनुसार 8:00–15:00 और 21:00–00:00 की मुख्य तरलता अवधि में भेजे जाते हैं।",
    scheduleNote: "समय वोलैटिलिटी, तरलता और वास्तविक बाजार अवसरों के अनुसार बदल सकता है।",
    scheduleCards: [
      ["सुबह और दोपहर", "8:00–15:00"],
      ["रात", "21:00–00:00"],
    ],
    methodEyebrow: "विश्लेषण पद्धति",
    methodTitle: "इचिमोकू पर आधारित सिग्नल",
    methodText:
      "Varejo Investidor के सभी सिग्नल इचिमोकू पढ़ने पर आधारित हैं · क्लाउड, औसत रेखाएँ, कीमत की स्थिति, सपोर्ट, रेजिस्टेंस और एसेट संदर्भ।",
    ichimokuItems: [
      "क्लाउड पढ़ना",
      "इचिमोकू औसत",
      "कीमत की दिशा",
      "लक्ष्य और स्टॉप",
      "एसेट संदर्भ",
      "जोखिम प्रबंधन",
    ],
    historyEyebrow: "इतिहास",
    historyTitle: "अगस्त 2018 से एलीट रिपोर्ट",
    historyText: "अगस्त 2018 से भेजी गई ऐतिहासिक रिपोर्टों से एलीट चैनल की परिचालन यात्रा देखें।",
    tableHeadings: ["तारीख", "एलीट रिपोर्ट", "सिग्नल", "परिणाम", "स्थिति", "देखें"],
    reports: [
      ["अग/2018", "एलीट रिपोर्ट", "124 सिग्नल", "+18.4%", "उपलब्ध"],
      ["जन/2021", "एलीट रिपोर्ट", "98 सिग्नल", "+11.2%", "उपलब्ध"],
      ["मार्च/2024", "एलीट रिपोर्ट", "137 सिग्नल", "+22.7%", "उपलब्ध"],
    ],
    view: "देखें",
    docsEyebrow: "दस्तावेज़ी संरचना",
    docsTitle: "वास्तविक भेजने की संरचना",
    docsText: "2018 से WhatsApp पर सीधे लाइव सिग्नल।",
    levelsEyebrow: "स्तर",
    levelsTitle: "अपना स्तर चुनें",
    levelsText: "मुफ्त चींटी चैनल से शुरू करें या पूर्ण परिचालन संरचना के लिए एलीट गरुड़ में प्रवेश करें।",
    freeTitle: "चींटी चैनल",
    freePrice: "मुफ्त",
    freeButton: "मुफ्त चींटी चैनल में प्रवेश करें",
    formigaItems: ["मुफ्त", "शैक्षिक सामग्री", "बुनियादी विश्लेषण", "प्रारंभिक दृष्टि", "आधार निर्माण", "सीमित सिग्नल"],
    eliteTitle: "एलीट गरुड़ चैनल",
    eliteStructure: "एलीट संरचना",
    eliteButton: "एलीट में प्रवेश करें",
    eliteItems: [
      "पूर्ण सिग्नल",
      "दिन में 2–5 सिग्नल",
      "एंट्री, लक्ष्य, स्टॉप तय",
      "बाजार विश्लेषण",
      "Forex",
      "सोना",
      "तेल",
      "सूचकांक",
      "क्रिप्टो",
      "संस्थागत पठन",
      "बंद समुदाय",
      "चींटी स्तर रिकॉर्डेड कक्षाएँ",
      "भेड़िया स्तर रिकॉर्डेड कक्षाएँ",
      "गरुड़ स्तर रिकॉर्डेड कक्षाएँ",
      "एलीट संरचना",
    ],
    packagesEyebrow: "पैकेज",
    packagesTitle: "एलीट एक्सेस",
    packagesText:
      "100% सिग्नल, विशेष समूह, विश्लेषण, रिकॉर्डेड कक्षाएँ और गरुड़ स्तर सामग्री · पैकेज चुनें।",
    benefitsTitle: "एलीट चैनल में आपको क्या मिलता है",
    benefits: [
      "100% सिग्नल",
      "विशेष समूह",
      "बाजार विश्लेषण",
      "रिकॉर्डेड कक्षाएँ",
      "गरुड़ स्तर सामग्री",
      "पूर्ण बाजार संरचना",
    ],
    best: "सबसे अधिक बचत",
    now: "अभी सदस्यता लें",
  },
} as const;

const whatsappPrintsByLocale: Record<string, { label: string; src: string }[]> = {
  hi: [
    { label: "WhatsApp स्क्रीनशॉट 01", src: "/signals/whatsapp-print-01.jpg" },
    { label: "WhatsApp स्क्रीनशॉट 02", src: "/signals/whatsapp-print-02.jpg" },
    { label: "WhatsApp स्क्रीनशॉट 03", src: "/signals/whatsapp-print-03.jpg" },
  ],
};
const whatsappPrintsDefault = [
  { label: "WhatsApp print 01", src: "/signals/whatsapp-print-01.jpg" },
  { label: "WhatsApp print 02", src: "/signals/whatsapp-print-02.jpg" },
  { label: "WhatsApp print 03", src: "/signals/whatsapp-print-03.jpg" },
];

const reportCtaLabels = {
  pt: "VER RELATÓRIOS E RESULTADOS",
  en: "VIEW REPORTS AND RESULTS",
  es: "VER REPORTES Y RESULTADOS",
  fr: "VOIR RAPPORTS ET RÉSULTATS",
  de: "BERICHTE UND ERGEBNISSE",
  it: "VEDI REPORT E RISULTATI",
  hi: "रिपोर्ट और परिणाम देखें",
  ar: "عرض التقارير والنتائج",
  tr: "RAPORLARI VE SONUÇLARI GÖR",
  id: "LIHAT LAPORAN DAN HASIL",
  vi: "XEM BÁO CÁO VÀ KẾT QUẢ",
  pl: "ZOBACZ RAPORTY I WYNIKI",
  fa: "مشاهده گزارش‌ها و نتایج",
  ur: "رپورٹس اور نتائج دیکھیں",
  th: "ดูรายงานและผลลัพธ์",
  ru: "СМОТРЕТЬ ОТЧЕТЫ И РЕЗУЛЬТАТЫ",
  bn: "রিপোর্ট ও ফলাফল দেখুন",
  ja: "レポートと結果を見る",
  ko: "리포트와 결과 보기",
  zh: "查看报告与结果",
  tl: "TINGNAN ANG REPORTS AT RESULTA",
} as const;

export default function SignalsPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const eliteCta = eliteLinkProps(locale, "/sinais");
  const freeSignalsTestUrl = getLoboChannelUrlWithFallback(locale);
  const signalSelectCopy = getSignalSelectCopy(locale);
  const selectPageHref = localizedPath("/select", locale);
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
  const signalPageCopy: any =
    signalCopyByLocale[locale as keyof typeof signalCopyByLocale] ?? signalCopyByLocale.en;
  const whatsappPrints = whatsappPrintsByLocale[locale] ?? whatsappPrintsDefault;
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
      : locale === "fr"
        ? [
            ["MENSUEL", "US$ 30", ""],
            ["3 MOIS", "US$ 80", ""],
            ["6 MOIS", "US$ 145", ""],
            ["ANNUEL", "US$ 240", ""],
          ]
        : locale === "de"
          ? [
              ["MONATLICH", "US$ 30", ""],
              ["3 MONATE", "US$ 80", ""],
              ["6 MONATE", "US$ 145", ""],
              ["JÄHRLICH", "US$ 240", ""],
            ]
          : locale === "it"
            ? [
                ["MENSILE", "US$ 30", ""],
                ["3 MESI", "US$ 80", ""],
                ["6 MESI", "US$ 145", ""],
                ["ANNUALE", "US$ 240", ""],
              ]
            : locale === "id"
              ? [
                  ["BULANAN", "US$ 30", ""],
                  ["3 BULAN", "US$ 80", ""],
                  ["6 BULAN", "US$ 145", ""],
                  ["TAHUNAN", "US$ 240", ""],
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
      : locale === "he"
        ? [
            ["חודשי", "US$ 30", ""],
            ["3 חודשים", "US$ 80", ""],
            ["6 חודשים", "US$ 145", ""],
            ["שנתי", "US$ 240", ""],
          ]
    : locale === "tr"
      ? [
          ["AYLIK", "US$ 30", ""],
          ["3 AY", "US$ 80", ""],
          ["6 AY", "US$ 145", ""],
          ["YILLIK", "US$ 240", ""],
        ]
      : locale === "vi"
        ? [
            ["THÁNG", "US$ 30", ""],
            ["3 THÁNG", "US$ 80", ""],
            ["6 THÁNG", "US$ 145", ""],
            ["NĂM", "US$ 240", ""],
          ]
        : locale === "pl"
          ? [
              ["MIESIĘCZNIE", "US$ 30", ""],
              ["3 MIES.", "US$ 80", ""],
              ["6 MIES.", "US$ 145", ""],
              ["ROCZNIE", "US$ 240", ""],
            ]
          : locale === "fa"
            ? [
                ["ماهانه", "US$ 30", ""],
                ["۳ ماهه", "US$ 80", ""],
                ["۶ ماهه", "US$ 145", ""],
                ["سالانه", "US$ 240", ""],
              ]
            : locale === "ur"
              ? [
                  ["ماہانہ", "US$ 30", ""],
                  ["۳ ماہ", "US$ 80", ""],
                  ["۶ ماہ", "US$ 145", ""],
                  ["سالانہ", "US$ 240", ""],
                ]
              : locale === "zh"
                ? [
                    ["月付", "US$ 30", ""],
                    ["3 个月", "US$ 80", ""],
                    ["6 个月", "US$ 145", ""],
                    ["年付", "US$ 240", ""],
                  ]
                : locale === "tl"
                  ? [
                      ["BUWANAN", "US$ 30", ""],
                      ["3 BUWAN", "US$ 80", ""],
                      ["6 NA BUWAN", "US$ 145", ""],
                      ["TAUNAN", "US$ 240", ""],
                    ]
                  : locale === "ru"
                    ? [
                        ["ЕЖЕМЕС.", "US$ 30", ""],
                        ["3 МЕС.", "US$ 80", ""],
                        ["6 МЕС.", "US$ 145", ""],
                        ["ГОД", "US$ 240", ""],
                      ]
                    : locale === "bn"
                      ? [
                          ["মাসিক", "US$ 30", ""],
                          ["৩ মাস", "US$ 80", ""],
                          ["৬ মাস", "US$ 145", ""],
                          ["বার্ষিক", "US$ 240", ""],
                        ]
                      : locale === "th"
                        ? [
                            ["รายเดือน", "US$ 30", ""],
                            ["3 เดือน", "US$ 80", ""],
                            ["6 เดือน", "US$ 145", ""],
                            ["รายปี", "US$ 240", ""],
                          ]
                        : locale === "ko"
                          ? [
                              ["월간", "US$ 30", ""],
                              ["3개월", "US$ 80", ""],
                              ["6개월", "US$ 145", ""],
                              ["연간", "US$ 240", ""],
                            ]
    : prices;
  return (
    <main lang={localeToHtmlLang(locale)} dir={isRtlLocale(locale) ? "rtl" : "ltr"} className="signals-page min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="signals-hero premium-stage relative px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-44">
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
            <a
              href={freeSignalsTestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {t.signalBlock.cta}
            </a>
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
                <h3 className="relative font-serif text-3xl leading-[1.03] tracking-[-0.04em]">{item}</h3>
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

      <WhatsAppSignalExample t={t} locale={locale} whatsappHref={freeSignalsTestUrl} />

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

      <section className="relative overflow-hidden border-y border-gold/[0.14] bg-ink px-5 py-16 text-paper md:px-8 md:py-20">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        <div className="absolute right-[8%] top-10 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Varejo Investidor Select</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.045em] md:text-6xl">
                {signalSelectCopy.title}
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
                {signalSelectCopy.text}
              </p>
              <a
                href={selectPageHref}
                className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
              >
                {signalSelectCopy.cta}
              </a>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-2">
              {signalSelectCopy.compare.map((block, cardIndex) => (
                <motion.article
                  key={block.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: cardIndex * 0.06 }}
                  variants={fadeUp}
                  className={`signals-compare-card relative overflow-hidden rounded-lg border p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
                    cardIndex === 1
                      ? "border-gold/25 bg-gradient-to-b from-gold/[0.08] to-black/80"
                      : "border-white/[0.08] bg-gradient-to-b from-paper/[0.05] to-black/85"
                  }`}
                >
                  <div className="relative">
                    <h3 className="font-serif text-3xl tracking-[-0.05em] text-paper md:text-4xl">{block.title}</h3>
                    <ol className="signals-compare-flow mt-7 flex flex-col gap-0">
                      {block.steps.map((step, index) => (
                        <li key={step} className="signals-compare-step">
                          <p className="text-xs font-black uppercase tracking-[0.14em] text-paper/[0.82]">{step}</p>
                          {index < block.steps.length - 1 ? (
                            <span className="signals-compare-arrow text-gold/70" aria-hidden="true">
                              ↓
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    {cardIndex === 0 ? (
                      <a
                        {...eliteCta}
                        className="premium-button-gold mt-8 flex w-full items-center justify-center border border-gold bg-gold px-5 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                      >
                        {signalPageCopy?.eliteButton ?? "Entrar no Elite"}
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
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
          {isPt ? (
            <div className="mt-8">
              <ElitePaymentCards isPt />
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
                  href={freeSignalsTestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
                >
                  {t.signalBlock.cta}
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
