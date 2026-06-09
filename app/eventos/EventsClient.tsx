"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { type Locale } from "../../src/i18n";

type EventCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  primary: string;
  secondary: string;
  sideTitle: string;
  sideItems: string[];
  whyTitle: string;
  whyText: string[];
  findEyebrow: string;
  findTitle: string;
  cards: { title: string; text: string }[];
  methodTitle: string;
  methodText: string;
  tracks: { title: string; text: string; pillars: string[] }[];
  stepsTitle: string;
  steps: { step: string; title: string; text: string }[];
  formEyebrow: string;
  formTitle: string;
  formText: string;
  fields: { name: string; email: string; whatsapp: string; country: string; city: string };
  formButton: string;
  success: string;
  audienceTitle: string;
  audiences: string[];
  finalTitle: string;
  finalText: string;
};

type CountryLocation = {
  code?: string;
  name?: string;
  country: string;
  continent: string;
  cities: string[];
};

const baseCards: EventCopy["cards"] = [
  { title: "Mercado global", text: "Entenda como economia, juros, moedas e geopolítica afetam patrimônio, renda e oportunidades internacionais." },
  { title: "Forex", text: "Aprenda como moedas se movimentam e quais fatores influenciam o mercado cambial global." },
  { title: "Criptomoedas", text: "Tecnologia, ciclos de mercado, adoção global e construção de posição com visão de risco." },
  { title: "Construção de patrimônio", text: "Estratégias para longo prazo, organização financeira, proteção de capital e visão patrimonial." },
  { title: "Networking", text: "Conexão com investidores, empresários e pessoas interessadas em evolução financeira." },
  { title: "Perguntas e respostas", text: "Um momento direto para tirar dúvidas com a equipe e aprofundar os temas do encontro." },
];

const tracks: EventCopy["tracks"] = [
  { title: "Formiga", text: "Organização financeira, orçamento, dívidas, investimentos básicos e primeiros passos.", pillars: ["base", "disciplina", "educação", "controle", "constância"] },
  { title: "Lobo", text: "Estruturação patrimonial, gestão de risco, mercados financeiros e planejamento.", pillars: ["estratégia", "risco", "mercados", "processo", "expansão"] },
  { title: "Harpia", text: "Macroeconomia, geopolítica, posicionamento global e visão estratégica de longo prazo.", pillars: ["patrimônio", "proteção", "visão global", "moedas fortes", "longo prazo"] },
];

const steps: EventCopy["steps"] = [
  { step: "Passo 1", title: "Recepção e networking", text: "Abertura do encontro, conexão entre participantes e alinhamento da proposta do dia." },
  { step: "Passo 2", title: "Mercado global", text: "Leitura de juros, inflação, moedas, bancos centrais e ciclos econômicos." },
  { step: "Passo 3", title: "Forex e ativos globais", text: "Como moedas, ouro, petróleo, índices e ativos internacionais se conectam." },
  { step: "Passo 4", title: "Criptomoedas", text: "Ciclos, adoção, riscos, oportunidades e papel dos criptoativos em uma carteira global." },
  { step: "Passo 5", title: "Formiga, Lobo e Harpia", text: "Como cada nível interpreta dinheiro, risco, patrimônio e tomada de decisão." },
  { step: "Passo 6", title: "Perguntas e networking final", text: "Espaço para dúvidas, troca de experiências e conexões entre participantes." },
];

const ptCopy: EventCopy = {
  eyebrow: "Eventos presenciais",
  title: "Eventos Presenciais Varejo Investidor",
  subtitle: "Mercado global, patrimônio, Forex, criptomoedas e posicionamento financeiro em um mundo cada vez mais dolarizado.",
  intro: [
    "Os eventos presenciais foram criados para reunir investidores, empreendedores e profissionais interessados em ampliar sua visão sobre dinheiro, patrimônio e mercados globais.",
    "Ao longo do dia, discutimos desde fundamentos financeiros até temas avançados envolvendo macroeconomia, Forex, criptomoedas e posicionamento global.",
  ],
  primary: "Quero ser avisado dos próximos eventos",
  secondary: "Entrar no Canal Formiga",
  sideTitle: "O que você vai encontrar",
  sideItems: ["Mercado global", "Forex", "Criptomoedas", "Construção de patrimônio", "Networking", "Perguntas e respostas"],
  whyTitle: "Por que participar?",
  whyText: [
    "Grande parte das pessoas trabalha por anos sem entender como o sistema financeiro global afeta sua moeda, renda e patrimônio.",
    "O encontro ajuda você a conectar educação financeira, mercados internacionais, risco, geopolítica e visão de longo prazo.",
  ],
  findEyebrow: "Experiência",
  findTitle: "O que você encontrará",
  cards: baseCards,
  methodTitle: "Trilha Formiga, Lobo e Harpia",
  methodText: "A metodologia organiza a evolução financeira em camadas, do investidor que está construindo base até quem busca visão patrimonial global.",
  tracks,
  stepsTitle: "Como funcionam os eventos",
  steps,
  formEyebrow: "Lista prioritária",
  formTitle: "Receba os próximos convites",
  formText: "Selecione seu país e cidade de interesse para receber prioridade quando novos encontros forem anunciados.",
  fields: { name: "Nome", email: "E-mail", whatsapp: "WhatsApp", country: "País", city: "Cidade" },
  formButton: "Quero receber os próximos eventos",
  success: "Cadastro recebido. Você entrou na lista prioritária dos eventos presenciais Varejo Investidor.",
  audienceTitle: "Para quem é este evento",
  audiences: ["Investidores iniciantes", "Traders", "Empresários", "Profissionais liberais", "Interessados em patrimônio", "Pessoas que desejam compreender o mercado global"],
  finalTitle: "O próximo evento pode acontecer na sua cidade.",
  finalText: "Cadastre-se para receber convites, conteúdos exclusivos e prioridade quando novos encontros forem anunciados.",
};

const copyByLocale: Record<Locale, EventCopy> = {
  pt: ptCopy,
  en: {
    ...ptCopy,
    eyebrow: "In-person events",
    title: "Varejo Investidor In-Person Events",
    subtitle: "Global markets, wealth, Forex, crypto assets and financial positioning in an increasingly dollarized world.",
    intro: [
      "These in-person events bring together investors, entrepreneurs and professionals who want a broader view of money, wealth and global markets.",
      "During the day, we discuss financial foundations and advanced topics such as macroeconomics, Forex, crypto assets and global positioning.",
    ],
    primary: "Notify me about upcoming events",
    secondary: "Join the Ant Channel",
    sideTitle: "What you will find",
    whyTitle: "Why attend?",
    findEyebrow: "Experience",
    findTitle: "What you will find",
    methodTitle: "Ant, Wolf and Harpy Track",
    stepsTitle: "How the events work",
    formTitle: "Receive upcoming invitations",
    formText: "Select your country and city of interest to receive priority when new meetings are announced.",
    fields: { name: "Name", email: "E-mail", whatsapp: "WhatsApp", country: "Country", city: "City" },
    formButton: "I want to receive event updates",
    success: "Registration received. You are now on the priority list for Varejo Investidor in-person events.",
    audienceTitle: "Who this event is for",
    finalTitle: "The next event may happen in your city.",
  },
  es: {
    ...ptCopy,
    eyebrow: "Eventos presenciales",
    title: "Eventos Presenciales Varejo Investidor",
    subtitle: "Mercados globales, patrimonio, Forex, criptoactivos y posicionamiento financiero en un mundo cada vez más dolarizado.",
    primary: "Quiero recibir avisos de próximos eventos",
    secondary: "Entrar al Canal Formiga",
    sideTitle: "Lo que encontrarás",
    whyTitle: "¿Por qué participar?",
    findEyebrow: "Experiencia",
    findTitle: "Lo que encontrarás",
    methodTitle: "Ruta Formiga, Lobo y Harpia",
    stepsTitle: "Cómo funcionan los eventos",
    formTitle: "Recibe las próximas invitaciones",
    formText: "Selecciona tu país y ciudad de interés para recibir prioridad cuando se anuncien nuevos encuentros.",
    fields: { name: "Nombre", email: "E-mail", whatsapp: "WhatsApp", country: "País", city: "Ciudad" },
    formButton: "Quiero recibir los próximos eventos",
    success: "Registro recibido. Ya estás en la lista prioritaria de eventos presenciales de Varejo Investidor.",
    audienceTitle: "Para quién es este evento",
    finalTitle: "El próximo evento puede suceder en tu ciudad.",
  },
  fr: {
    ...ptCopy,
    eyebrow: "Événements présentiels",
    title: "Événements Présentiels Varejo Investidor",
    subtitle: "Marchés mondiaux, patrimoine, Forex, cryptoactifs et positionnement financier dans un monde de plus en plus dollarisé.",
    primary: "Être informé des prochains événements",
    secondary: "Rejoindre le Canal Formiga",
    sideTitle: "Ce que vous trouverez",
    whyTitle: "Pourquoi participer ?",
    findEyebrow: "Expérience",
    findTitle: "Ce que vous trouverez",
    methodTitle: "Parcours Formiga, Lobo et Harpia",
    stepsTitle: "Comment fonctionnent les événements",
    formTitle: "Recevez les prochaines invitations",
    formText: "Sélectionnez votre pays et votre ville d'intérêt pour recevoir une priorité lors de l'annonce de nouvelles rencontres.",
    fields: { name: "Nom", email: "E-mail", whatsapp: "WhatsApp", country: "Pays", city: "Ville" },
    formButton: "Je veux recevoir les prochains événements",
    success: "Inscription reçue. Vous êtes sur la liste prioritaire des événements présentiels Varejo Investidor.",
    audienceTitle: "À qui s'adresse cet événement",
    finalTitle: "Le prochain événement peut avoir lieu dans votre ville.",
  },
  hi: {
    ...ptCopy,
    eyebrow: "प्रत्यक्ष कार्यक्रम",
    title: "Varejo Investidor प्रत्यक्ष कार्यक्रम",
    subtitle: "ग्लोबल मार्केट, संपत्ति, Forex, क्रिप्टो और वित्तीय स्थिति की समझ।",
    primary: "अगले कार्यक्रमों की सूचना पाएं",
    secondary: "Formiga चैनल में शामिल हों",
    sideTitle: "आप क्या सीखेंगे",
    formTitle: "अगले निमंत्रण प्राप्त करें",
    formText: "नए कार्यक्रम घोषित होने पर प्राथमिकता पाने के लिए अपना देश और शहर चुनें।",
    fields: { name: "नाम", email: "ईमेल", whatsapp: "WhatsApp", country: "देश", city: "शहर" },
    formButton: "मुझे आगामी कार्यक्रम भेजें",
    success: "पंजीकरण प्राप्त हुआ। आप प्राथमिकता सूची में हैं।",
  },
  ar: {
    ...ptCopy,
    eyebrow: "فعاليات حضورية",
    title: "فعاليات Varejo Investidor الحضورية",
    subtitle: "الأسواق العالمية، الثروة، الفوركس، الأصول الرقمية والتموضع المالي العالمي.",
    primary: "أرغب في إشعاري بالفعاليات القادمة",
    secondary: "الانضمام إلى قناة Formiga",
    sideTitle: "ما الذي ستجده",
    formTitle: "استلم الدعوات القادمة",
    formText: "اختر بلدك ومدينتك للحصول على أولوية عند الإعلان عن لقاءات جديدة.",
    fields: { name: "الاسم", email: "البريد الإلكتروني", whatsapp: "WhatsApp", country: "الدولة", city: "المدينة" },
    formButton: "أرغب في استلام الدعوات القادمة",
    success: "تم استلام التسجيل. أنت الآن في قائمة الأولوية.",
  },
  tr: {
    ...ptCopy,
    eyebrow: "Yüz yüze etkinlikler",
    title: "Varejo Investidor Yüz Yüze Etkinlikleri",
    subtitle: "Küresel piyasalar, servet, Forex, kripto varlıklar ve finansal konumlanma.",
    primary: "Yaklaşan etkinliklerden haberdar olmak istiyorum",
    secondary: "Formiga Kanalına katıl",
    fields: { name: "Ad", email: "E-posta", whatsapp: "WhatsApp", country: "Ülke", city: "Şehir" },
    formButton: "Yaklaşan etkinlikleri almak istiyorum",
    success: "Kayıt alındı. Öncelikli listeye eklendiniz.",
  },
  id: {
    ...ptCopy,
    eyebrow: "Acara tatap muka",
    title: "Acara Tatap Muka Varejo Investidor",
    subtitle: "Pasar global, kekayaan, Forex, kripto, dan posisi finansial internasional.",
    primary: "Beri tahu saya tentang acara berikutnya",
    secondary: "Masuk Kanal Formiga",
    fields: { name: "Nama", email: "Email", whatsapp: "WhatsApp", country: "Negara", city: "Kota" },
    formButton: "Saya ingin menerima info acara",
    success: "Pendaftaran diterima. Anda masuk daftar prioritas.",
  },
  vi: {
    ...ptCopy,
    eyebrow: "Sự kiện trực tiếp",
    title: "Sự Kiện Trực Tiếp Varejo Investidor",
    subtitle: "Thị trường toàn cầu, tài sản, Forex, tiền điện tử và định vị tài chính quốc tế.",
    primary: "Thông báo cho tôi về sự kiện sắp tới",
    secondary: "Tham gia Kênh Formiga",
    fields: { name: "Tên", email: "Email", whatsapp: "WhatsApp", country: "Quốc gia", city: "Thành phố" },
    formButton: "Tôi muốn nhận thông tin sự kiện",
    success: "Đã nhận đăng ký. Bạn đã vào danh sách ưu tiên.",
  },
  th: {
    ...ptCopy,
    eyebrow: "อีเวนต์แบบพบกัน",
    title: "อีเวนต์ Varejo Investidor",
    subtitle: "ตลาดโลก ความมั่งคั่ง Forex คริปโต และการวางตำแหน่งทางการเงินระดับสากล",
    primary: "แจ้งฉันเกี่ยวกับอีเวนต์ถัดไป",
    secondary: "เข้าร่วมช่อง Formiga",
    fields: { name: "ชื่อ", email: "อีเมล", whatsapp: "WhatsApp", country: "ประเทศ", city: "เมือง" },
    formButton: "ฉันต้องการรับข่าวอีเวนต์",
    success: "ได้รับการลงทะเบียนแล้ว คุณอยู่ในรายชื่อสำคัญ",
  },
  ru: {
    ...ptCopy,
    eyebrow: "Очные события",
    title: "Очные события Varejo Investidor",
    subtitle: "Глобальные рынки, капитал, Forex, криптоактивы и международное финансовое мышление.",
    primary: "Сообщить мне о следующих событиях",
    secondary: "Войти в канал Formiga",
    fields: { name: "Имя", email: "E-mail", whatsapp: "WhatsApp", country: "Страна", city: "Город" },
    formButton: "Получать приглашения на события",
    success: "Регистрация получена. Вы добавлены в приоритетный список.",
  },
  ur: {
    ...ptCopy,
    eyebrow: "حضوری ایونٹس",
    title: "Varejo Investidor حضوری ایونٹس",
    subtitle: "عالمی مارکیٹس، دولت، Forex، کرپٹو اور بین الاقوامی مالی سوچ۔",
    primary: "آئندہ ایونٹس کی اطلاع دیں",
    secondary: "Formiga چینل میں شامل ہوں",
    fields: { name: "نام", email: "ای میل", whatsapp: "WhatsApp", country: "ملک", city: "شہر" },
    formButton: "مجھے آئندہ ایونٹس بھیجیں",
    success: "رجسٹریشن موصول ہو گئی۔ آپ ترجیحی فہرست میں شامل ہیں۔",
  },
  bn: {
    ...ptCopy,
    eyebrow: "সশরীরে ইভেন্ট",
    title: "Varejo Investidor সশরীরে ইভেন্ট",
    subtitle: "গ্লোবাল মার্কেট, সম্পদ, Forex, ক্রিপ্টো এবং আন্তর্জাতিক আর্থিক অবস্থান।",
    primary: "পরবর্তী ইভেন্ট সম্পর্কে জানাতে চাই",
    secondary: "Formiga চ্যানেলে যোগ দিন",
    fields: { name: "নাম", email: "ইমেইল", whatsapp: "WhatsApp", country: "দেশ", city: "শহর" },
    formButton: "আমি ইভেন্ট আপডেট পেতে চাই",
    success: "নিবন্ধন গ্রহণ করা হয়েছে। আপনি অগ্রাধিকার তালিকায় আছেন।",
  },
  ja: {
    ...ptCopy,
    eyebrow: "対面イベント",
    title: "Varejo Investidor 対面イベント",
    subtitle: "グローバル市場、資産形成、Forex、暗号資産、国際的な金融視点を学ぶ場です。",
    primary: "次回イベントの通知を受け取る",
    secondary: "Formigaチャンネルに参加",
    fields: { name: "名前", email: "メール", whatsapp: "WhatsApp", country: "国", city: "都市" },
    formButton: "イベント情報を受け取る",
    success: "登録を受け付けました。優先リストに追加されました。",
  },
  ko: {
    ...ptCopy,
    eyebrow: "오프라인 이벤트",
    title: "Varejo Investidor 오프라인 이벤트",
    subtitle: "글로벌 시장, 자산 형성, Forex, 암호화폐와 국제 금융 관점을 배우는 자리입니다.",
    primary: "다음 이벤트 알림 받기",
    secondary: "Formiga 채널 참여",
    fields: { name: "이름", email: "이메일", whatsapp: "WhatsApp", country: "국가", city: "도시" },
    formButton: "이벤트 소식 받기",
    success: "등록이 접수되었습니다. 우선 명단에 추가되었습니다.",
  },
};

const eventLocationsByLocale: Record<Locale, CountryLocation[]> = {
  pt: [
    { country: "Brasil", continent: "América do Sul", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Curitiba", "Porto Alegre", "Florianópolis", "Campinas", "Santos", "Ribeirão Preto", "Goiânia", "Salvador", "Fortaleza", "Recife", "Natal", "Vitória", "Manaus", "Belém", "Cuiabá", "Joinville"] },
    { country: "Portugal", continent: "Europa", cities: ["Lisboa", "Porto", "Braga", "Coimbra", "Faro", "Aveiro", "Leiria", "Setúbal", "Évora", "Funchal"] },
  ],
  en: [
    { country: "United States", continent: "North America", cities: ["New York", "Miami", "Orlando", "Tampa", "Dallas", "Houston", "Austin", "Los Angeles", "San Diego", "San Francisco", "Las Vegas", "Phoenix", "Chicago", "Boston", "Seattle", "Atlanta", "Denver", "Charlotte", "Nashville", "Washington DC"] },
    { country: "Canada", continent: "North America", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Halifax", "Quebec City", "Victoria"] },
    { country: "United Kingdom", continent: "Europe", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Edinburgh", "Glasgow", "Nottingham", "Newcastle"] },
    { country: "Australia", continent: "Oceania", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Hobart", "Darwin", "Newcastle"] },
    { country: "New Zealand", continent: "Oceania", cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Dunedin"] },
    { country: "Singapore", continent: "Asia", cities: ["Singapore"] },
  ],
  es: [
    { country: "México", continent: "América do Norte", cities: ["Ciudad de México", "Monterrey", "Guadalajara", "Puebla", "Querétaro", "Tijuana", "Mérida", "Cancún", "León", "San Luis Potosí"] },
    { country: "Argentina", continent: "América do Sul", cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata", "Salta", "Tucumán", "Neuquén", "Bariloche"] },
    { country: "Chile", continent: "América do Sul", cities: ["Santiago", "Valparaíso", "Viña del Mar", "Concepción", "Antofagasta", "La Serena", "Temuco", "Puerto Montt", "Iquique", "Talca"] },
    { country: "Colômbia", continent: "América do Sul", cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Cúcuta", "Santa Marta"] },
    { country: "Peru", continent: "América do Sul", cities: ["Lima", "Arequipa", "Cusco", "Trujillo", "Chiclayo", "Piura", "Iquitos"] },
    { country: "España", continent: "Europa", cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao", "Zaragoza", "Alicante", "Murcia", "Palma"] },
  ],
  fr: [
    { country: "France", continent: "Europe", cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Bordeaux", "Lille", "Strasbourg", "Montpellier"] },
    { country: "Belgique", continent: "Europe", cities: ["Bruxelles", "Anvers", "Gand", "Liège", "Bruges"] },
    { country: "Suisse", continent: "Europe", cities: ["Genève", "Lausanne", "Zurich", "Berne", "Bâle"] },
    { country: "Canada francophone", continent: "North America", cities: ["Montréal", "Québec", "Gatineau"] },
  ],
  hi: [{ country: "India", continent: "Asia", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Ahmedabad", "Kolkata", "Jaipur", "Surat", "Lucknow", "Chandigarh", "Indore", "Kochi", "Goa", "Nagpur", "Bhopal", "Patna", "Noida", "Gurugram"] }],
  ar: [
    { country: "United Arab Emirates", continent: "Middle East", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah"] },
    { country: "Saudi Arabia", continent: "Middle East", cities: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Khobar"] },
    { country: "Qatar", continent: "Middle East", cities: ["Doha", "Al Wakrah", "Lusail"] },
    { country: "Kuwait", continent: "Middle East", cities: ["Kuwait City", "Hawalli", "Salmiya"] },
    { country: "Bahrain", continent: "Middle East", cities: ["Manama", "Riffa"] },
  ],
  tr: [{ country: "Türkiye", continent: "Europe/Asia", cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri"] }],
  id: [{ country: "Indonesia", continent: "Asia", cities: ["Jakarta", "Surabaya", "Bandung", "Bali", "Medan", "Semarang", "Makassar", "Yogyakarta", "Tangerang", "Batam"] }],
  vi: [{ country: "Vietnam", continent: "Asia", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Vung Tau"] }],
  th: [{ country: "Thailand", continent: "Asia", cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Khon Kaen", "Hat Yai", "Udon Thani", "Rayong"] }],
  ru: [{ country: "Russia", continent: "Europe/Asia", cities: ["Moscow", "Saint Petersburg", "Kazan", "Sochi", "Yekaterinburg", "Novosibirsk", "Krasnodar", "Rostov-on-Don"] }],
  ur: [{ country: "Pakistan", continent: "Asia", cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Sialkot"] }],
  bn: [{ country: "Bangladesh", continent: "Asia", cities: ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Cox's Bazar"] }],
  ja: [{ country: "Japan", continent: "Asia", cities: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Fukuoka", "Kyoto", "Kobe", "Sapporo"] }],
  ko: [{ country: "South Korea", continent: "Asia", cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan"] }],
};

const globalEventLocations = {
  brazil: { country: "🇧🇷 Brasil", continent: "América do Sul", cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Curitiba", "Porto Alegre", "Florianópolis", "Campinas", "Santos", "Ribeirão Preto", "Goiânia", "Salvador", "Fortaleza", "Recife", "Natal", "Vitória", "Manaus", "Belém", "Cuiabá", "Joinville"] },
  portugal: { country: "🇵🇹 Portugal", continent: "Europa", cities: ["Lisboa", "Porto", "Braga", "Coimbra", "Faro", "Aveiro", "Leiria", "Setúbal", "Évora", "Funchal"] },
  unitedStates: { country: "🇺🇸 Estados Unidos", continent: "América do Norte", cities: ["New York", "Miami", "Orlando", "Tampa", "Dallas", "Houston", "Austin", "Los Angeles", "San Diego", "San Francisco", "Las Vegas", "Phoenix", "Chicago", "Boston", "Seattle", "Atlanta", "Denver", "Charlotte", "Nashville", "Washington DC"] },
  unitedKingdom: { country: "🇬🇧 Reino Unido", continent: "Europa", cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds", "Bristol", "Edinburgh", "Glasgow", "Nottingham", "Newcastle"] },
  canada: { country: "🇨🇦 Canadá", continent: "América do Norte", cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Halifax", "Quebec City", "Victoria"] },
  australia: { country: "🇦🇺 Austrália", continent: "Oceania", cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Hobart", "Darwin", "Newcastle"] },
  newZealand: { country: "🇳🇿 Nova Zelândia", continent: "Oceania", cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Dunedin"] },
  spain: { country: "🇪🇸 Espanha", continent: "Europa", cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga", "Bilbao", "Zaragoza", "Alicante", "Murcia", "Palma"] },
  mexico: { country: "🇲🇽 México", continent: "América do Norte", cities: ["Ciudad de México", "Monterrey", "Guadalajara", "Puebla", "Querétaro", "Tijuana", "Mérida", "Cancún", "León", "San Luis Potosí"] },
  argentina: { country: "🇦🇷 Argentina", continent: "América do Sul", cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata", "Salta", "Tucumán", "Neuquén", "Bariloche"] },
  chile: { country: "🇨🇱 Chile", continent: "América do Sul", cities: ["Santiago", "Valparaíso", "Viña del Mar", "Concepción", "Antofagasta", "La Serena", "Temuco", "Puerto Montt", "Iquique", "Talca"] },
  colombia: { country: "🇨🇴 Colômbia", continent: "América do Sul", cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Cúcuta", "Santa Marta"] },
  peru: { country: "🇵🇪 Peru", continent: "América do Sul", cities: ["Lima", "Arequipa", "Cusco", "Trujillo", "Chiclayo", "Piura", "Iquitos"] },
  france: { country: "🇫🇷 França", continent: "Europa", cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Bordeaux", "Lille", "Strasbourg", "Montpellier"] },
  belgium: { country: "🇧🇪 Bélgica", continent: "Europa", cities: ["Bruxelles", "Anvers", "Gand", "Liège", "Bruges"] },
  switzerland: { country: "🇨🇭 Suíça", continent: "Europa", cities: ["Genève", "Lausanne", "Zurich", "Berne", "Bâle"] },
  uae: { country: "🇦🇪 Emirados Árabes Unidos", continent: "Oriente Médio", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah"] },
  saudiArabia: { country: "🇸🇦 Arábia Saudita", continent: "Oriente Médio", cities: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Khobar"] },
  qatar: { country: "🇶🇦 Qatar", continent: "Oriente Médio", cities: ["Doha", "Al Wakrah", "Lusail"] },
  kuwait: { country: "🇰🇼 Kuwait", continent: "Oriente Médio", cities: ["Kuwait City", "Hawalli", "Salmiya"] },
  bahrain: { country: "🇧🇭 Bahrein", continent: "Oriente Médio", cities: ["Manama", "Riffa"] },
  india: { country: "🇮🇳 Índia", continent: "Ásia", cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Ahmedabad", "Kolkata", "Jaipur", "Surat", "Lucknow", "Chandigarh", "Indore", "Kochi", "Goa", "Nagpur", "Bhopal", "Patna", "Noida", "Gurugram"] },
  turkey: { country: "🇹🇷 Turquia", continent: "Europa/Ásia", cities: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", "Gaziantep", "Mersin", "Kayseri"] },
  japan: { country: "🇯🇵 Japão", continent: "Ásia", cities: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Fukuoka", "Kyoto", "Kobe", "Sapporo"] },
  southKorea: { country: "🇰🇷 Coreia do Sul", continent: "Ásia", cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan"] },
  singapore: { country: "🇸🇬 Singapura", continent: "Ásia", cities: ["Singapore"] },
  thailand: { country: "🇹🇭 Tailândia", continent: "Ásia", cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Khon Kaen", "Hat Yai", "Udon Thani", "Rayong"] },
  indonesia: { country: "🇮🇩 Indonésia", continent: "Ásia", cities: ["Jakarta", "Surabaya", "Bandung", "Bali", "Medan", "Semarang", "Makassar", "Yogyakarta", "Tangerang", "Batam"] },
  vietnam: { country: "🇻🇳 Vietnã", continent: "Ásia", cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang", "Hue", "Vung Tau"] },
  germany: { country: "🇩🇪 Alemanha", continent: "Europa", cities: ["Berlin", "Frankfurt", "Munich", "Hamburg", "Düsseldorf", "Cologne", "Stuttgart"] },
  malaysia: { country: "🇲🇾 Malásia", continent: "Ásia", cities: ["Kuala Lumpur", "Penang", "Johor Bahru", "Kota Kinabalu", "Melaka", "Kuching"] },
  russia: { country: "🇷🇺 Rússia", continent: "Europa/Ásia", cities: ["Moscow", "Saint Petersburg", "Kazan", "Sochi", "Yekaterinburg", "Novosibirsk", "Krasnodar", "Rostov-on-Don"] },
  pakistan: { country: "🇵🇰 Paquistão", continent: "Ásia", cities: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Sialkot"] },
  bangladesh: { country: "🇧🇩 Bangladesh", continent: "Ásia", cities: ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Cox's Bazar"] },
} satisfies Record<string, CountryLocation>;

type CountryKey = keyof typeof globalEventLocations;

const countryCodeByKey: Record<CountryKey, string> = {
  brazil: "BR",
  portugal: "PT",
  unitedStates: "US",
  unitedKingdom: "GB",
  canada: "CA",
  australia: "AU",
  newZealand: "NZ",
  spain: "ES",
  mexico: "MX",
  argentina: "AR",
  chile: "CL",
  colombia: "CO",
  peru: "PE",
  france: "FR",
  belgium: "BE",
  switzerland: "CH",
  uae: "AE",
  saudiArabia: "SA",
  qatar: "QA",
  kuwait: "KW",
  bahrain: "BH",
  india: "IN",
  turkey: "TR",
  japan: "JP",
  southKorea: "KR",
  singapore: "SG",
  thailand: "TH",
  indonesia: "ID",
  vietnam: "VN",
  germany: "DE",
  malaysia: "MY",
  russia: "RU",
  pakistan: "PK",
  bangladesh: "BD",
};

const countryNameByKey: Record<CountryKey, string> = {
  brazil: "Brasil",
  portugal: "Portugal",
  unitedStates: "Estados Unidos",
  unitedKingdom: "Reino Unido",
  canada: "Canadá",
  australia: "Austrália",
  newZealand: "Nova Zelândia",
  spain: "Espanha",
  mexico: "México",
  argentina: "Argentina",
  chile: "Chile",
  colombia: "Colômbia",
  peru: "Peru",
  france: "França",
  belgium: "Bélgica",
  switzerland: "Suíça",
  uae: "Emirados Árabes Unidos",
  saudiArabia: "Arábia Saudita",
  qatar: "Qatar",
  kuwait: "Kuwait",
  bahrain: "Bahrein",
  india: "Índia",
  turkey: "Turquia",
  japan: "Japão",
  southKorea: "Coreia do Sul",
  singapore: "Singapura",
  thailand: "Tailândia",
  indonesia: "Indonésia",
  vietnam: "Vietnã",
  germany: "Alemanha",
  malaysia: "Malásia",
  russia: "Rússia",
  pakistan: "Paquistão",
  bangladesh: "Bangladesh",
};

const countryGroupLabelsByLocale: Record<Locale, { primary: string; other: string }> = {
  pt: { primary: "Países principais", other: "Outros países" },
  en: { primary: "Main countries", other: "Other countries" },
  es: { primary: "Países principales", other: "Otros países" },
  fr: { primary: "Pays principaux", other: "Autres pays" },
  hi: { primary: "मुख्य देश", other: "अन्य देश" },
  ar: { primary: "الدول الرئيسية", other: "دول أخرى" },
  tr: { primary: "Ana ülkeler", other: "Diğer ülkeler" },
  id: { primary: "Negara utama", other: "Negara lainnya" },
  vi: { primary: "Quốc gia chính", other: "Quốc gia khác" },
  th: { primary: "ประเทศหลัก", other: "ประเทศอื่น ๆ" },
  ru: { primary: "Основные страны", other: "Другие страны" },
  ur: { primary: "اہم ممالک", other: "دیگر ممالک" },
  bn: { primary: "প্রধান দেশ", other: "অন্যান্য দেশ" },
  ja: { primary: "主要な国", other: "その他の国" },
  ko: { primary: "주요 국가", other: "기타 국가" },
};

const primaryCountryKeysByLocale: Record<Locale, CountryKey[]> = {
  pt: ["brazil", "portugal"],
  en: ["unitedStates", "unitedKingdom", "canada", "australia", "newZealand", "singapore"],
  es: ["mexico", "argentina", "chile", "colombia", "peru", "spain"],
  fr: ["france", "belgium", "switzerland", "canada"],
  hi: ["india"],
  ar: ["uae", "saudiArabia", "qatar", "kuwait", "bahrain"],
  tr: ["turkey"],
  id: ["indonesia"],
  vi: ["vietnam"],
  th: ["thailand"],
  ru: ["russia"],
  ur: ["pakistan"],
  bn: ["bangladesh"],
  ja: ["japan"],
  ko: ["southKorea"],
};

const preferredOtherCountryKeysByLocale: Record<Locale, CountryKey[]> = {
  pt: ["unitedStates", "unitedKingdom", "canada", "australia", "spain", "mexico", "argentina", "chile", "colombia", "uae", "india", "turkey", "japan", "southKorea", "singapore", "thailand", "indonesia", "vietnam", "france", "switzerland"],
  en: ["brazil", "portugal", "spain", "france", "uae", "india", "japan", "southKorea", "thailand", "indonesia", "vietnam", "mexico", "argentina", "chile", "colombia", "turkey"],
  es: ["brazil", "unitedStates", "portugal", "unitedKingdom", "canada", "australia", "uae", "india", "japan", "southKorea", "turkey", "singapore"],
  fr: ["unitedStates", "unitedKingdom", "brazil", "spain", "uae", "india", "japan", "southKorea", "singapore"],
  hi: ["uae", "unitedStates", "unitedKingdom", "canada", "australia", "singapore", "brazil"],
  ar: ["unitedStates", "unitedKingdom", "brazil", "portugal", "spain", "india", "turkey", "japan", "southKorea"],
  tr: ["uae", "unitedStates", "unitedKingdom", "germany", "brazil", "spain"],
  id: ["singapore", "malaysia", "thailand", "australia", "uae", "brazil"],
  vi: ["singapore", "thailand", "japan", "southKorea", "australia", "brazil"],
  th: ["singapore", "japan", "southKorea", "australia", "uae", "brazil"],
  ru: ["uae", "unitedStates", "unitedKingdom", "turkey", "germany", "brazil"],
  ur: ["uae", "unitedStates", "unitedKingdom", "canada", "australia", "singapore"],
  bn: ["india", "uae", "unitedStates", "unitedKingdom", "singapore", "brazil"],
  ja: ["unitedStates", "singapore", "australia", "uae", "brazil"],
  ko: ["japan", "unitedStates", "singapore", "australia", "brazil"],
};

const allCountryKeys = Object.keys(globalEventLocations) as CountryKey[];

function uniqueCountryKeys(keys: CountryKey[]) {
  return Array.from(new Set(keys));
}

export function getCountryFlag(code: string) {
  if (!code) return "";

  const normalizedCode = code.toUpperCase();
  const fallbackFlags: Record<string, string> = {
    BR: "🇧🇷",
    PT: "🇵🇹",
    US: "🇺🇸",
    GB: "🇬🇧",
    CA: "🇨🇦",
    AU: "🇦🇺",
    NZ: "🇳🇿",
    ES: "🇪🇸",
    MX: "🇲🇽",
    AR: "🇦🇷",
    CL: "🇨🇱",
    CO: "🇨🇴",
    PE: "🇵🇪",
    FR: "🇫🇷",
    BE: "🇧🇪",
    CH: "🇨🇭",
    AE: "🇦🇪",
    SA: "🇸🇦",
    QA: "🇶🇦",
    KW: "🇰🇼",
    BH: "🇧🇭",
    IN: "🇮🇳",
    TR: "🇹🇷",
    JP: "🇯🇵",
    KR: "🇰🇷",
    SG: "🇸🇬",
    TH: "🇹🇭",
    ID: "🇮🇩",
    VN: "🇻🇳",
    DE: "🇩🇪",
    MY: "🇲🇾",
    RU: "🇷🇺",
    PK: "🇵🇰",
    BD: "🇧🇩",
  };

  try {
    return normalizedCode.replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
  } catch {
    return fallbackFlags[normalizedCode] ?? "";
  }
}

function getCountryName(country: string) {
  if (country.startsWith("ðŸ")) {
    return country.split(" ").slice(1).join(" ");
  }

  return country;
}

function getCountryLabel(location: CountryLocation) {
  const countryName = location.name ?? location.country;

  if (!location.code) {
    return countryName;
  }

  return `${getCountryFlag(location.code)} ${countryName}`;
}

function getCountryGroups(locale: Locale) {
  const primaryKeys = uniqueCountryKeys(primaryCountryKeysByLocale[locale] ?? primaryCountryKeysByLocale.en);
  const preferredOtherKeys = uniqueCountryKeys(preferredOtherCountryKeysByLocale[locale] ?? preferredOtherCountryKeysByLocale.en);
  const otherKeys = uniqueCountryKeys([...preferredOtherKeys, ...allCountryKeys]).filter((key) => !primaryKeys.includes(key));

  return {
    primary: primaryKeys.map((key) => ({
      ...globalEventLocations[key],
      code: countryCodeByKey[key],
      name: countryNameByKey[key],
      country: countryNameByKey[key],
    })),
    other: otherKeys.map((key) => ({
      ...globalEventLocations[key],
      code: countryCodeByKey[key],
      name: countryNameByKey[key],
      country: countryNameByKey[key],
    })),
  };
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-3xl font-black uppercase leading-[0.98] tracking-tight text-paper md:text-5xl">{title}</h2>
    </div>
  );
}

function FormField({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/82">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className="mt-2 w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition placeholder:text-paper/35 focus:border-gold" />
    </label>
  );
}

export default function EventsClient() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [utmParams, setUtmParams] = useState({ source: "", campaign: "", medium: "" });
  const signupDate = useMemo(() => new Date().toISOString(), []);
  const countryGroups = getCountryGroups(locale);
  const countryLabels = countryGroupLabelsByLocale[locale] ?? countryGroupLabelsByLocale.en;
  const locations = [...countryGroups.primary, ...countryGroups.other];
  const activeCountry = locations.find((item) => (item.name ?? item.country) === selectedCountry) ?? locations[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      source: params.get("utm_source") ?? "",
      campaign: params.get("utm_campaign") ?? "",
      medium: params.get("utm_medium") ?? "",
    });
  }, []);

  return (
    <>
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />
      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(201,155,62,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(21,129,84,0.12),transparent_34%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.78fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-tight text-paper md:text-7xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/72">{copy.subtitle}</p>
            <div className="mt-7 space-y-4 text-sm leading-7 text-paper/64">
              {copy.intro.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#convites" className="border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858]">{copy.primary}</a>
              <a href="https://whatsapp.com/channel/0029Vb7ZJmPDeONG2GlkRb2Z" target="_blank" rel="noopener noreferrer" className="border border-rise/45 bg-rise/10 px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-rise transition hover:-translate-y-0.5 hover:bg-rise/16">{copy.secondary}</a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7, delay: 0.12 }} className="border border-gold/18 bg-paper/[0.035] p-6 shadow-premium">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-gold">{copy.sideTitle}</p>
            <div className="mt-5 grid gap-3">
              {copy.sideItems.map((item, index) => (
                <div key={item} className="flex items-center gap-3 border border-gold/10 bg-ink/70 px-4 py-3">
                  <span className="text-xs font-black text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-bold text-paper/78">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <SectionTitle eyebrow={copy.findEyebrow} title={copy.findTitle} />
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.cards.map((card) => (
              <div key={card.title} className="border border-gold/14 bg-paper/[0.035] p-5 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-paper/[0.055]">
                <h3 className="text-lg font-black uppercase text-paper">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/62">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/14 bg-paper/[0.025] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Formiga • Lobo • Harpia" title={copy.methodTitle} />
          <p className="mt-5 max-w-3xl text-sm leading-7 text-paper/64">{copy.methodText}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {copy.tracks.map((track, index) => (
              <div key={track.title} className={`border p-6 shadow-premium ${index === 0 ? "border-red-500/30 bg-red-500/[0.04]" : index === 1 ? "border-gold/30 bg-gold/[0.04]" : "border-rise/30 bg-rise/[0.04]"}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">Nível</p>
                <h3 className="mt-3 text-2xl font-black uppercase text-paper">{track.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/68">{track.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {track.pillars.map((pillar) => <span key={pillar} className="border border-gold/14 bg-ink/70 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-paper/62">{pillar}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Agenda" title={copy.stepsTitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {copy.steps.map((step) => (
              <div key={step.step} className="border border-gold/14 bg-paper/[0.03] p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{step.step}</p>
                <h3 className="mt-3 text-lg font-black uppercase text-paper">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/62">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="convites" className="border-y border-gold/14 bg-paper/[0.025] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-start">
          <div>
            <SectionTitle eyebrow={copy.formEyebrow} title={copy.formTitle} />
            <p className="mt-5 max-w-2xl text-sm leading-7 text-paper/64">{copy.formText}</p>
            {submitted ? <div className="mt-6 border border-rise/35 bg-rise/[0.08] p-4 text-sm font-bold leading-6 text-paper">{copy.success}</div> : null}
          </div>

          <form className="border border-gold/18 bg-ink/70 p-5 shadow-premium md:p-6" data-lead-list="EVENTOS PRESENCIAIS VAREJO INVESTIDOR" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <input type="hidden" name="language" value={locale} />
            <input type="hidden" name="leadList" value="EVENTOS PRESENCIAIS VAREJO INVESTIDOR" />
            <input type="hidden" name="signupDate" value={signupDate} />
            <input type="hidden" name="date" value={signupDate} />
            <input type="hidden" name="origin" value="Pagina Eventos" />
            <input type="hidden" name="continent" value={activeCountry.continent} />
            <input type="hidden" name="countryCode" value={activeCountry.code ?? ""} />
            <input type="hidden" name="utm_source" value={utmParams.source} />
            <input type="hidden" name="utm_campaign" value={utmParams.campaign} />
            <input type="hidden" name="utm_medium" value={utmParams.medium} />
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label={copy.fields.name} name="name" placeholder={copy.fields.name} />
              <FormField label={copy.fields.email} name="email" type="email" placeholder="email@email.com" />
              <FormField label={copy.fields.whatsapp} name="whatsapp" placeholder="+55 11 90000-0000" />
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/82">{copy.fields.country}</span>
                <select name="country" className="mt-2 w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition focus:border-gold" value={activeCountry.name ?? activeCountry.country} onChange={(event) => setSelectedCountry(event.target.value)}>
                  <optgroup label={countryLabels.primary}>
                    {countryGroups.primary.map((location) => <option key={location.code ?? location.country} value={location.name ?? location.country} className="bg-ink text-paper">{getCountryLabel(location)}</option>)}
                  </optgroup>
                  <optgroup label={countryLabels.other}>
                    {countryGroups.other.map((location) => <option key={location.code ?? location.country} value={location.name ?? location.country} className="bg-ink text-paper">{getCountryLabel(location)}</option>)}
                  </optgroup>
                </select>
              </label>
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-paper/82">{copy.fields.city}</span>
                <select name="city" className="mt-2 w-full border border-gold/20 bg-ink px-4 py-3 text-sm font-bold text-paper outline-none transition focus:border-gold">
                  {activeCountry.cities.map((city) => <option key={city} value={city} className="bg-ink text-paper">{city}</option>)}
                </select>
              </label>
            </div>
            <button type="submit" className="mt-5 w-full border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858]">{copy.formButton}</button>
          </form>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow={copy.findEyebrow} title={copy.audienceTitle} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {copy.audiences.map((audience) => <div key={audience} className="border border-gold/14 bg-paper/[0.035] px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper/74">{audience}</div>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-6 md:px-8 md:pb-24">
        <div className="mx-auto max-w-7xl border border-gold/18 bg-gold/[0.06] p-6 shadow-premium md:p-8">
          <h2 className="text-3xl font-black uppercase text-paper md:text-5xl">{copy.finalTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-paper/70">{copy.finalText}</p>
          <a href="#convites" className="mt-6 inline-flex border border-gold bg-gold px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d4a858]">{copy.primary}</a>
        </div>
      </section>
      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </>
  );
}
