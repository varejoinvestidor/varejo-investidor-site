import type { SupportedLocale } from "../i18n/locales";

export type SignalSelectBlockCopy = {
  title: string;
  text: string;
  cta: string;
  compare: [{ title: string; steps: string[] }, { title: string; steps: string[] }];
};

const signalSelectPt: SignalSelectBlockCopy = {
  title: "Já possui patrimônio acima de R$ 250 mil?",
  text: "Conheça o Varejo Investidor Select e tenha execução automática das operações sem necessidade de copiar sinais manualmente.",
  cta: "Conhecer Select",
  compare: [
    { title: "Canal Elite", steps: ["Recebe sinal", "Executa operação", "Acompanha resultado"] },
    {
      title: "Varejo Investidor Select",
      steps: ["Capital aplicado", "Conta vinculada", "Cópia automática", "Equipe acompanha", "Relatórios periódicos"],
    },
  ],
};

export const signalSelectCopyByLocale: Record<SupportedLocale, SignalSelectBlockCopy> = {
  pt: signalSelectPt,
  en: {
    title: "Already hold wealth above R$ 250,000?",
    text: "Discover Varejo Investidor Select for automated trade execution without copying signals manually every day.",
    cta: "Explore Select",
    compare: [
      { title: "Elite Channel", steps: ["Receive signal", "Execute trade", "Track result"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Capital allocated", "Linked account", "Automatic copy", "Team oversight", "Periodic reports"],
      },
    ],
  },
  es: {
    title: "¿Ya posee patrimonio superior a R$ 250.000?",
    text: "Conozca Varejo Investidor Select para ejecutar operaciones automáticamente sin copiar señales a mano cada día.",
    cta: "Conocer Select",
    compare: [
      { title: "Canal Elite", steps: ["Recibe señal", "Ejecuta operación", "Sigue el resultado"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Capital aplicado", "Cuenta vinculada", "Copia automática", "Equipo supervisa", "Informes periódicos"],
      },
    ],
  },
  fr: {
    title: "Vous détenez déjà un patrimoine supérieur à R$ 250 000 ?",
    text: "Découvrez Varejo Investidor Select pour une exécution automatique sans copier chaque signal manuellement.",
    cta: "Découvrir Select",
    compare: [
      { title: "Canal Elite", steps: ["Reçoit le signal", "Exécute l'opération", "Suit le résultat"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Capital alloué", "Compte lié", "Copie automatique", "Suivi de l'équipe", "Rapports périodiques"],
      },
    ],
  },
  de: {
    title: "Bereits Vermögen über R$ 250.000?",
    text: "Lernen Sie Varejo Investidor Select kennen – automatische Ausführung ohne tägliches manuelles Kopieren von Signalen.",
    cta: "Select entdecken",
    compare: [
      { title: "Elite-Kanal", steps: ["Signal erhalten", "Trade ausführen", "Ergebnis verfolgen"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Kapital eingesetzt", "Verknüpftes Konto", "Automatische Kopie", "Team-Betreuung", "Regelmäßige Berichte"],
      },
    ],
  },
  it: {
    title: "Patrimonio già superiore a R$ 250.000?",
    text: "Scopri Varejo Investidor Select per l'esecuzione automatica senza copiare i segnali manualmente ogni giorno.",
    cta: "Scopri Select",
    compare: [
      { title: "Canale Elite", steps: ["Riceve il segnale", "Esegue l'operazione", "Monitora il risultato"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Capitale allocato", "Conto collegato", "Copia automatica", "Team di monitoraggio", "Report periodici"],
      },
    ],
  },
  ar: {
    title: "هل تمتلك ثروة تتجاوز R$ 250.000؟",
    text: "تعرّف على Varejo Investidor Select لتنفيذ تلقائي دون نسخ الإشارات يدوياً كل يوم.",
    cta: "تعرّف على Select",
    compare: [
      { title: "قناة النخبة", steps: ["استلام الإشارة", "تنفيذ العملية", "متابعة النتيجة"] },
      {
        title: "Varejo Investidor Select",
        steps: ["رأس مال مُخصَّص", "حساب مرتبط", "نسخ تلقائي", "متابعة الفريق", "تقارير دورية"],
      },
    ],
  },
  fa: {
    title: "دارایی بالای R$ 250.000 دارید؟",
    text: "با Select اجرای خودکار معاملات را بدون کپی روزانه سیگنال‌ها تجربه کنید.",
    cta: "آشنایی با Select",
    compare: [
      { title: "کانال Elite", steps: ["دریافت سیگنال", "اجرای معامله", "پیگیری نتیجه"] },
      {
        title: "Varejo Investidor Select",
        steps: ["سرمایه تخصیص‌یافته", "حساب متصل", "کپی خودکار", "پیگیری تیم", "گزارش‌های دوره‌ای"],
      },
    ],
  },
  hi: {
    title: "R$ 250,000 से अधिक संपत्ति है?",
    text: "Varejo Investidor Select से बिना रोज़ाना सिग्नल कॉपी किए स्वचालित निष्पादन पाएं।",
    cta: "SELECT देखें",
    compare: [
      { title: "एलीट चैनल", steps: ["सिग्नल मिलता है", "ऑपरेशन निष्पादित", "परिणाम ट्रैक करें"] },
      {
        title: "Varejo Investidor Select",
        steps: ["पूंजी लगाई गई", "लिंक्ड खाता", "ऑटो कॉपी", "टीम फॉलोअप", "आवधिक रिपोर्ट"],
      },
    ],
  },
  ur: {
    title: "R$ 250,000 سے زائد سرمایہ؟",
    text: "روزانہ سگنل کاپی کیے بغیر خودکار عمل درآمد کے لیے Select دیکھیں۔",
    cta: "SELECT دیکھیں",
    compare: [
      { title: "ایلیٹ چینل", steps: ["سگنل موصول", "آپریشن نافذ", "نتیجہ ٹریک کریں"] },
      {
        title: "Varejo Investidor Select",
        steps: ["سرمایہ لگایا گیا", "منسلک اکاؤنٹ", "خودکار کاپی", "ٹیم نگرانی", "دورانیہ رپورٹس"],
      },
    ],
  },
  bn: {
    title: "R$ 250,000-এর বেশি সম্পদ আছে?",
    text: "প্রতিদিন সিগন্যাল কপি না করে স্বয়ংক্রিয় এক্সিকিউশনের জন্য Select দেখুন।",
    cta: "SELECT দেখুন",
    compare: [
      { title: "এলিট চ্যানেল", steps: ["সিগন্যাল পাওয়া", "অপারেশন এক্সিকিউট", "ফলাফল ট্র্যাক"] },
      {
        title: "Varejo Investidor Select",
        steps: ["মূলধন বিনিয়োগ", "লিঙ্কড অ্যাকাউন্ট", "স্বয়ংক্রিয় কপি", "টিম মনিটরিং", "পর্যায়ক্রমিক রিপোর্ট"],
      },
    ],
  },
  tr: {
    title: "R$ 250.000 üzeri varlığınız var mı?",
    text: "Sinyalleri her gün kopyalamadan otomatik uygulama için Select'i tanıyın.",
    cta: "SELECT'İ TANIMA",
    compare: [
      { title: "Elite Kanalı", steps: ["Sinyal alır", "İşlemi uygular", "Sonucu izler"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Sermaye tahsis edilir", "Bağlı hesap", "Otomatik kopya", "Ekip takibi", "Dönemsel raporlar"],
      },
    ],
  },
  ru: {
    title: "Капитал уже выше R$ 250 000?",
    text: "Узнайте о Select — автоматическое исполнение без ежедневного копирования сигналов.",
    cta: "Узнать Select",
    compare: [
      { title: "Канал Elite", steps: ["Получает сигнал", "Исполняет сделку", "Отслеживает результат"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Выделен капитал", "Связанный счёт", "Автокопирование", "Команда сопровождает", "Периодические отчёты"],
      },
    ],
  },
  id: {
    title: "Sudah memiliki kekayaan di atas R$ 250.000?",
    text: "Kenali Varejo Investidor Select untuk eksekusi otomatis tanpa menyalin sinyal manual setiap hari.",
    cta: "Lihat Select",
    compare: [
      { title: "Kanal Elite", steps: ["Terima sinyal", "Eksekusi transaksi", "Pantau hasil"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Modal dialokasikan", "Akun tertaut", "Salin otomatis", "Tim memantau", "Laporan berkala"],
      },
    ],
  },
  vi: {
    title: "Đã sở hữu tài sản trên R$ 250.000?",
    text: "Tìm hiểu Varejo Investidor Select để tự động hóa giao dịch mà không cần sao chép tín hiệu mỗi ngày.",
    cta: "Tìm hiểu Select",
    compare: [
      { title: "Kênh Elite", steps: ["Nhận tín hiệu", "Thực hiện lệnh", "Theo dõi kết quả"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Vốn triển khai", "Tài khoản liên kết", "Sao chép tự động", "Đội ngũ giám sát", "Báo cáo định kỳ"],
      },
    ],
  },
  th: {
    title: "มีสินทรัพย์เกิน R$ 250,000 แล้วหรือยัง?",
    text: "รู้จัก Varejo Investidor Select เพื่อดำเนินการอัตโนมัติโดยไม่ต้องคัดลอกสัญญาณด้วยตนเองทุกวัน",
    cta: "ดู Select",
    compare: [
      { title: "ช่อง Elite", steps: ["รับสัญญาณ", "ดำเนินการเทรด", "ติดตามผลลัพธ์"] },
      {
        title: "Varejo Investidor Select",
        steps: ["จัดสรรเงินทุน", "บัญชีเชื่อมต่อ", "คัดลอกอัตโนมัติ", "ทีมติดตาม", "รายงานเป็นระยะ"],
      },
    ],
  },
  tl: {
    title: "May yaman ka na bang higit sa R$ 250,000?",
    text: "Kilalanin ang Varejo Investidor Select para sa awtomatikong execution nang hindi kailangang kopyahin ang signals araw-araw.",
    cta: "Tingnan ang Select",
    compare: [
      { title: "Elite Channel", steps: ["Tumatanggap ng signal", "Nag-e-execute", "Sinusubaybayan ang resulta"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Nakalaang kapital", "Naka-link na account", "Awtomatikong kopya", "Superbisyon ng team", "Mga periodic report"],
      },
    ],
  },
  zh: {
    title: "资产是否已超过 R$ 250,000？",
    text: "了解 Varejo Investidor Select，实现自动执行，无需每天手动复制信号。",
    cta: "了解 Select",
    compare: [
      { title: "Elite 频道", steps: ["接收信号", "执行交易", "跟踪结果"] },
      {
        title: "Varejo Investidor Select",
        steps: ["资金配置", "关联账户", "自动跟单", "团队跟进", "定期报告"],
      },
    ],
  },
  ja: {
    title: "R$ 250,000 を超える資産をお持ちですか？",
    text: "毎日シグナルを手動でコピーせず、自動実行する Select をご覧ください。",
    cta: "Selectを見る",
    compare: [
      { title: "Eliteチャンネル", steps: ["シグナル受信", "取引実行", "結果を追跡"] },
      {
        title: "Varejo Investidor Select",
        steps: ["資金配分", "連携口座", "自動コピー", "チーム監視", "定期レポート"],
      },
    ],
  },
  ko: {
    title: "자산이 R$ 250,000을 넘나요?",
    text: "매일 수동으로 신호를 복사하지 않고 자동 실행하는 Select를 알아보세요.",
    cta: "Select 보기",
    compare: [
      { title: "Elite 채널", steps: ["신호 수신", "거래 실행", "결과 추적"] },
      {
        title: "Varejo Investidor Select",
        steps: ["자금 배정", "연동 계좌", "자동 복사", "팀 모니터링", "정기 리포트"],
      },
    ],
  },
  pl: {
    title: "Majątek powyżej R$ 250 000?",
    text: "Poznaj Varejo Investidor Select — automatyczna realizacja bez codziennego kopiowania sygnałów.",
    cta: "Poznaj Select",
    compare: [
      { title: "Kanał Elite", steps: ["Odbiera sygnał", "Wykonuje transakcję", "Śledzi wynik"] },
      {
        title: "Varejo Investidor Select",
        steps: ["Alokacja kapitału", "Połączone konto", "Automatyczna kopia", "Opieka zespołu", "Raporty okresowe"],
      },
    ],
  },
  he: {
    title: "כבר יש לכם הון מעל R$ 250,000?",
    text: "הכירו את Varejo Investidor Select לביצוע אוטומטי בלי להעתיק אותות ידנית בכל יום.",
    cta: "הכירו את Select",
    compare: [
      { title: "ערוץ Elite", steps: ["מקבלים אות", "מבצעים עסקה", "עוקבים אחרי תוצאה"] },
      {
        title: "Varejo Investidor Select",
        steps: ["הון מופקד", "חשבון מקושר", "העתקה אוטומטית", "ליווי צוות", "דוחות תקופתיים"],
      },
    ],
  },
};

export function getSignalSelectCopy(locale: string): SignalSelectBlockCopy {
  if (locale in signalSelectCopyByLocale) {
    return signalSelectCopyByLocale[locale as SupportedLocale];
  }
  return signalSelectCopyByLocale.en;
}
