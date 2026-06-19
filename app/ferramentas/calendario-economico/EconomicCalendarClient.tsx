"use client";

import {
  SiteChrome,
  SupportFooter,
  useSiteLocale,
} from "../../../src/components/SiteSections";

const INVESTING_CALENDAR_URL = "https://br.investing.com/economic-calendar/";

type CalendarCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  panelTitle: string;
  panelText: string;
  button: string;
  source: string;
  focus: string[];
};

const calendarCopy: Record<string, CalendarCopy> = {
  pt: { eyebrow: "Macroeconomia global", title: "Calendário Econômico", subtitle: "Acompanhe eventos macroeconômicos, decisões de juros, inflação, emprego e indicadores que movimentam os mercados globais.", panelTitle: "Agenda econômica em tempo real", panelText: "Consulte horários, previsões, resultados anteriores e dados divulgados diretamente na agenda do Investing. O calendário abre em uma nova aba para preservar estabilidade, velocidade e segurança.", button: "Abrir calendário no Investing", source: "Fonte externa: Investing.com", focus: ["Decisões de juros", "Inflação", "Emprego", "Atividade econômica"] },
  en: { eyebrow: "Global macroeconomics", title: "Economic Calendar", subtitle: "Track macroeconomic events, interest-rate decisions, inflation, employment and indicators that move global markets.", panelTitle: "Real-time economic agenda", panelText: "Review schedules, forecasts, previous results and released data directly on Investing's calendar. It opens in a new tab for stability, speed and security.", button: "Open calendar on Investing", source: "External source: Investing.com", focus: ["Interest rates", "Inflation", "Employment", "Economic activity"] },
  es: { eyebrow: "Macroeconomía global", title: "Calendario económico", subtitle: "Sigue eventos macroeconómicos, decisiones de tipos de interés, inflación, empleo e indicadores que mueven los mercados globales.", panelTitle: "Agenda económica en tiempo real", panelText: "Consulta horarios, previsiones, resultados anteriores y datos publicados directamente en el calendario de Investing.", button: "Abrir calendario en Investing", source: "Fuente externa: Investing.com", focus: ["Tipos de interés", "Inflación", "Empleo", "Actividad económica"] },
  fr: { eyebrow: "Macroéconomie mondiale", title: "Calendrier économique", subtitle: "Suivez les événements macroéconomiques, les décisions de taux, l’inflation, l’emploi et les indicateurs qui influencent les marchés mondiaux.", panelTitle: "Agenda économique en temps réel", panelText: "Consultez les horaires, prévisions, résultats précédents et données publiées directement dans le calendrier Investing.", button: "Ouvrir le calendrier Investing", source: "Source externe : Investing.com", focus: ["Taux d’intérêt", "Inflation", "Emploi", "Activité économique"] },
  de: { eyebrow: "Globale Makroökonomie", title: "Wirtschaftskalender", subtitle: "Verfolgen Sie Konjunkturtermine, Zinsentscheidungen, Inflation, Beschäftigung und marktbewegende Indikatoren.", panelTitle: "Wirtschaftstermine in Echtzeit", panelText: "Prüfen Sie Uhrzeiten, Prognosen, vorherige Werte und Veröffentlichungen direkt im Investing-Kalender.", button: "Kalender bei Investing öffnen", source: "Externe Quelle: Investing.com", focus: ["Zinsentscheidungen", "Inflation", "Beschäftigung", "Konjunktur"] },
  it: { eyebrow: "Macroeconomia globale", title: "Calendario economico", subtitle: "Segui eventi macroeconomici, decisioni sui tassi, inflazione, occupazione e indicatori che muovono i mercati globali.", panelTitle: "Agenda economica in tempo reale", panelText: "Consulta orari, previsioni, dati precedenti e pubblicazioni direttamente nel calendario di Investing.", button: "Apri il calendario su Investing", source: "Fonte esterna: Investing.com", focus: ["Tassi di interesse", "Inflazione", "Occupazione", "Attività economica"] },
  ar: { eyebrow: "الاقتصاد الكلي العالمي", title: "التقويم الاقتصادي", subtitle: "تابع الأحداث الاقتصادية وقرارات الفائدة والتضخم والتوظيف والمؤشرات المؤثرة في الأسواق العالمية.", panelTitle: "الأجندة الاقتصادية مباشرة", panelText: "راجع المواعيد والتوقعات والنتائج السابقة والبيانات المعلنة مباشرة عبر تقويم Investing.", button: "فتح التقويم على Investing", source: "مصدر خارجي: Investing.com", focus: ["قرارات الفائدة", "التضخم", "التوظيف", "النشاط الاقتصادي"] },
  fa: { eyebrow: "اقتصاد کلان جهانی", title: "تقویم اقتصادی", subtitle: "رویدادهای اقتصادی، تصمیمات نرخ بهره، تورم، اشتغال و شاخص‌های اثرگذار بر بازارهای جهانی را دنبال کنید.", panelTitle: "برنامه اقتصادی لحظه‌ای", panelText: "زمان‌بندی، پیش‌بینی‌ها، نتایج قبلی و داده‌های منتشرشده را مستقیماً در تقویم Investing ببینید.", button: "باز کردن تقویم در Investing", source: "منبع خارجی: Investing.com", focus: ["نرخ بهره", "تورم", "اشتغال", "فعالیت اقتصادی"] },
  hi: { eyebrow: "वैश्विक मैक्रोइकॉनॉमिक्स", title: "आर्थिक कैलेंडर", subtitle: "वैश्विक बाज़ारों को प्रभावित करने वाली आर्थिक घटनाओं, ब्याज दर निर्णयों, महंगाई, रोजगार और संकेतकों पर नज़र रखें।", panelTitle: "रियल-टाइम आर्थिक एजेंडा", panelText: "Investing कैलेंडर पर समय, पूर्वानुमान, पिछले नतीजे और जारी आंकड़े सीधे देखें।", button: "Investing पर कैलेंडर खोलें", source: "बाहरी स्रोत: Investing.com", focus: ["ब्याज दर", "महंगाई", "रोजगार", "आर्थिक गतिविधि"] },
  ur: { eyebrow: "عالمی میکرو اکنامکس", title: "اقتصادی کیلنڈر", subtitle: "عالمی مارکیٹس کو متاثر کرنے والے معاشی واقعات، شرح سود، مہنگائی، روزگار اور اشاریوں پر نظر رکھیں۔", panelTitle: "براہ راست اقتصادی ایجنڈا", panelText: "Investing کیلنڈر میں اوقات، پیش گوئیاں، سابقہ نتائج اور جاری اعداد و شمار دیکھیں۔", button: "Investing پر کیلنڈر کھولیں", source: "بیرونی ماخذ: Investing.com", focus: ["شرح سود", "مہنگائی", "روزگار", "اقتصادی سرگرمی"] },
  bn: { eyebrow: "বৈশ্বিক সামষ্টিক অর্থনীতি", title: "অর্থনৈতিক ক্যালেন্ডার", subtitle: "বিশ্ববাজারে প্রভাব ফেলা অর্থনৈতিক ঘটনা, সুদের সিদ্ধান্ত, মূল্যস্ফীতি, কর্মসংস্থান ও সূচক অনুসরণ করুন।", panelTitle: "রিয়েল-টাইম অর্থনৈতিক সূচি", panelText: "Investing ক্যালেন্ডারে সময়, পূর্বাভাস, আগের ফলাফল ও প্রকাশিত তথ্য দেখুন।", button: "Investing-এ ক্যালেন্ডার খুলুন", source: "বাহ্যিক উৎস: Investing.com", focus: ["সুদের হার", "মূল্যস্ফীতি", "কর্মসংস্থান", "অর্থনৈতিক কার্যক্রম"] },
  tr: { eyebrow: "Küresel makroekonomi", title: "Ekonomik Takvim", subtitle: "Küresel piyasaları etkileyen ekonomik gelişmeleri, faiz kararlarını, enflasyonu, istihdamı ve göstergeleri takip edin.", panelTitle: "Gerçek zamanlı ekonomi gündemi", panelText: "Saatleri, beklentileri, önceki sonuçları ve açıklanan verileri Investing takviminde inceleyin.", button: "Investing takvimini aç", source: "Harici kaynak: Investing.com", focus: ["Faiz kararları", "Enflasyon", "İstihdam", "Ekonomik aktivite"] },
  ru: { eyebrow: "Глобальная макроэкономика", title: "Экономический календарь", subtitle: "Следите за макроэкономическими событиями, решениями по ставкам, инфляцией, занятостью и индикаторами мировых рынков.", panelTitle: "Экономическая повестка в реальном времени", panelText: "Смотрите время, прогнозы, предыдущие значения и опубликованные данные в календаре Investing.", button: "Открыть календарь Investing", source: "Внешний источник: Investing.com", focus: ["Процентные ставки", "Инфляция", "Занятость", "Экономическая активность"] },
  id: { eyebrow: "Makroekonomi global", title: "Kalender Ekonomi", subtitle: "Pantau peristiwa makroekonomi, keputusan suku bunga, inflasi, ketenagakerjaan, dan indikator penggerak pasar global.", panelTitle: "Agenda ekonomi real-time", panelText: "Lihat jadwal, proyeksi, hasil sebelumnya, dan data terbaru langsung di kalender Investing.", button: "Buka kalender di Investing", source: "Sumber eksternal: Investing.com", focus: ["Suku bunga", "Inflasi", "Ketenagakerjaan", "Aktivitas ekonomi"] },
  vi: { eyebrow: "Kinh tế vĩ mô toàn cầu", title: "Lịch kinh tế", subtitle: "Theo dõi các sự kiện kinh tế, quyết định lãi suất, lạm phát, việc làm và chỉ báo tác động đến thị trường toàn cầu.", panelTitle: "Lịch sự kiện kinh tế theo thời gian thực", panelText: "Xem thời gian, dự báo, số liệu trước đó và kết quả công bố trực tiếp trên lịch Investing.", button: "Mở lịch trên Investing", source: "Nguồn bên ngoài: Investing.com", focus: ["Lãi suất", "Lạm phát", "Việc làm", "Hoạt động kinh tế"] },
  th: { eyebrow: "เศรษฐกิจมหภาคโลก", title: "ปฏิทินเศรษฐกิจ", subtitle: "ติดตามเหตุการณ์เศรษฐกิจ การตัดสินใจดอกเบี้ย เงินเฟ้อ การจ้างงาน และตัวชี้วัดที่ขับเคลื่อนตลาดโลก", panelTitle: "กำหนดการเศรษฐกิจแบบเรียลไทม์", panelText: "ดูเวลา คาดการณ์ ตัวเลขก่อนหน้า และข้อมูลประกาศล่าสุดผ่านปฏิทิน Investing", button: "เปิดปฏิทินบน Investing", source: "แหล่งข้อมูลภายนอก: Investing.com", focus: ["อัตราดอกเบี้ย", "เงินเฟ้อ", "การจ้างงาน", "กิจกรรมเศรษฐกิจ"] },
  tl: { eyebrow: "Pandaigdigang macroeconomics", title: "Kalendaryong Pang-ekonomiya", subtitle: "Subaybayan ang economic events, interest-rate decisions, inflation, employment, at mga indicator na gumagalaw sa global markets.", panelTitle: "Real-time na economic agenda", panelText: "Tingnan ang iskedyul, forecast, nakaraang resulta, at inilabas na data sa Investing calendar.", button: "Buksan sa Investing", source: "Panlabas na source: Investing.com", focus: ["Interest rates", "Inflation", "Employment", "Economic activity"] },
  zh: { eyebrow: "全球宏观经济", title: "经济日历", subtitle: "关注宏观经济事件、利率决议、通胀、就业以及影响全球市场的重要指标。", panelTitle: "实时经济日程", panelText: "在 Investing 日历中查看时间、预测、前值和最新公布数据。", button: "在 Investing 打开日历", source: "外部来源：Investing.com", focus: ["利率决议", "通胀", "就业", "经济活动"] },
  ja: { eyebrow: "グローバルマクロ経済", title: "経済カレンダー", subtitle: "世界市場を動かす経済イベント、政策金利、インフレ、雇用、主要指標を確認できます。", panelTitle: "リアルタイム経済日程", panelText: "Investingのカレンダーで発表時刻、予想、前回値、最新結果を確認できます。", button: "Investingでカレンダーを開く", source: "外部情報源：Investing.com", focus: ["政策金利", "インフレ", "雇用", "経済活動"] },
  ko: { eyebrow: "글로벌 거시경제", title: "경제 캘린더", subtitle: "글로벌 시장에 영향을 주는 경제 일정, 금리 결정, 물가, 고용 및 주요 지표를 확인하세요.", panelTitle: "실시간 경제 일정", panelText: "Investing 캘린더에서 발표 시간, 전망치, 이전 수치와 최신 결과를 확인할 수 있습니다.", button: "Investing에서 캘린더 열기", source: "외부 출처: Investing.com", focus: ["금리 결정", "물가", "고용", "경제 활동"] },
  pl: { eyebrow: "Globalna makroekonomia", title: "Kalendarz ekonomiczny", subtitle: "Śledź wydarzenia makroekonomiczne, decyzje o stopach, inflację, zatrudnienie i wskaźniki wpływające na światowe rynki.", panelTitle: "Agenda gospodarcza w czasie rzeczywistym", panelText: "Sprawdzaj terminy, prognozy, poprzednie odczyty i publikowane dane w kalendarzu Investing.", button: "Otwórz kalendarz Investing", source: "Źródło zewnętrzne: Investing.com", focus: ["Stopy procentowe", "Inflacja", "Zatrudnienie", "Aktywność gospodarcza"] },
};

export default function EconomicCalendarClient() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = calendarCopy[locale] ?? calendarCopy.en;
  const isRtl = locale === "ar" || locale === "fa" || locale === "ur";

  return (
    <>
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />
      <main lang={locale === "pt" ? "pt-BR" : locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-ink text-paper">
        <section className="page-hero relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[.98] tracking-[-.05em] md:text-7xl">{copy.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-paper/[.7] md:text-xl">{copy.subtitle}</p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <article className="terminal-module relative overflow-hidden border border-gold/[.24] bg-white p-6 shadow-premium md:p-10">
              <div className="absolute inset-0 terminal-grid opacity-20" />
              <div className="relative grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.28em] text-gold">{copy.source}</p>
                  <h2 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-.045em] md:text-6xl">{copy.panelTitle}</h2>
                  <p className="mt-6 text-base leading-8 text-paper/[.68] md:text-lg">{copy.panelText}</p>
                  <a href={INVESTING_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="premium-button-gold mt-8 inline-flex min-h-14 items-center justify-center border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[.16em] text-ink transition hover:-translate-y-0.5">
                    {copy.button}
                  </a>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {copy.focus.map((item) => (
                    <div key={item} className="border-l-2 border-gold bg-ink/[.44] px-5 py-6">
                      <p className="font-serif text-2xl leading-tight text-paper">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
