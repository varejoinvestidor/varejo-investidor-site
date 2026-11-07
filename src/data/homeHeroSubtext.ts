import type { Locale } from "../i18n";
import type { SupportedLocale } from "../i18n/locales";

/** Hero subtext (below H1) on the home page — all supported locales */
export const homeHeroSubtext = {
  pt: "Conectamos conhecimento, oportunidades e mercados globais para ampliar sua visão financeira e construir caminhos para a evolução do seu patrimônio.",
  en: "We connect knowledge, opportunities, and global markets to broaden your financial perspective and build pathways for the evolution of your wealth.",
  es: "Conectamos conocimiento, oportunidades y mercados globales para ampliar tu visión financiera y construir caminos hacia la evolución de tu patrimonio.",
  fr: "Nous relions savoir, opportunités et marchés mondiaux pour élargir votre vision financière et ouvrir des voies vers l'évolution de votre patrimoine.",
  de: "Wir verbinden Wissen, Chancen und globale Märkte, um Ihre Finanzperspektive zu erweitern und Wege zur Weiterentwicklung Ihres Vermögens zu schaffen.",
  it: "Colleghiamo conoscenza, opportunità e mercati globali per ampliare la tua visione finanziaria e costruire percorsi verso l'evoluzione del tuo patrimonio.",
  ar: "نربط المعرفة والفرص والأسواق العالمية لتوسيع رؤيتك المالية وبناء مسارات لتطوير ثروتك.",
  fa: "ما دانش، فرصت‌ها و بازارهای جهانی را به هم پیوند می‌دهیم تا افق مالی شما را گسترش دهیم و مسیرهایی برای تحول سرمایه‌تان بسازیم.",
  hi: "हम ज्ञान, अवसर और वैश्विक बाजारों को जोड़ते हैं ताकि आपकी वित्तीय दृष्टि विस्तार पाए और आपकी संपत्ति के विकास के लिए मार्ग बनें।",
  ur: "ہم علم، مواقع اور عالمی منڈیوں کو جوڑتے ہیں تاکہ آپ کی مالی نظر وسعت پائے اور آپ کی دولت کی ترقی کے راستے بنیں۔",
  bn: "আমরা জ্ঞান, সুযোগ ও বৈশ্বিক বাজারকে সংযুক্ত করি যাতে আপনার আর্থিক দৃষ্টিভঙ্গি প্রসারিত হয় এবং আপনার সম্পদের বিকাশের পথ তৈরি হয়।",
  tr: "Bilgi, fırsatlar ve küresel piyasaları bir araya getirerek finansal vizyonunuzu genişletiyor ve servetinizin gelişimi için yollar inşa ediyoruz.",
  ru: "Мы соединяем знания, возможности и мировые рынки, чтобы расширить вашу финансовую перспективу и выстроить пути развития вашего капитала.",
  id: "Kami menghubungkan pengetahuan, peluang, dan pasar global untuk memperluas wawasan finansial Anda dan membangun jalur evolusi kekayaan Anda.",
  vi: "Chúng tôi kết nối tri thức, cơ hội và thị trường toàn cầu để mở rộng tầm nhìn tài chính và xây dựng con đường phát triển tài sản của bạn.",
  th: "เราเชื่อมโยงความรู้ โอกาส และตลาดโลก เพื่อขยายมุมมองทางการเงินของคุณและสร้างเส้นทางสู่การพัฒนาความมั่งคั่งของคุณ",
  tl: "Ikinokonekta namin ang kaalaman, mga oportunidad, at global markets para palawakin ang iyong pananaw sa pananalapi at bumuo ng mga daan patungo sa pag-unlad ng iyong kayamanan.",
  zh: "我们将知识、机遇与全球市场相连接，拓展您的金融视野，并为财富增长构建路径。",
  ja: "知識、機会、そして世界の市場を結びつけ、金融的な視野を広げ、資産の進化に向けた道筋を築きます。",
  ko: "지식, 기회, 글로벌 시장을 연결해 금융적 시야를 넓히고 자산 성장을 위한 길을 만들어 갑니다.",
  pl: "Łączymy wiedzę, możliwości i globalne rynki, aby poszerzyć Twoją perspektywę finansową i budować ścieżki rozwoju Twojego majątku.",
  he: "אנו מחברים ידע, הזדמנויות ושווקים גלובליים כדי להרחיב את הפרספקטיבה הפיננסית שלכם ולבנות נתיבים להתפתחות ההון.",
} satisfies Record<SupportedLocale, string>;

export function getHomeHeroSubtext(locale: Locale): string {
  const key = locale as SupportedLocale;
  return homeHeroSubtext[key] ?? homeHeroSubtext.en;
}
