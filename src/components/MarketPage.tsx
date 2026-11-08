"use client";

import { motion } from "framer-motion";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "./SiteSections";
import type { Locale } from "../i18n";
import { isRtlLocale, localeToHtmlLang } from "../i18n/locales";
import { getForexLibraryContent, type ForexLibraryContent } from "../data/forexLibraryContent";
import { absoluteSiteUrl } from "../config/site";
import { getMarketContent, getMarketLabel, publicMarketSlugs, type MarketSlug } from "../data/marketContent";
import { getInstitutionalMarketPage } from "../data/institutionalMarketPages";
import { InstitutionalMarketSections, MarketInstitutionalHero } from "./InstitutionalMarketSections";

const pageLabels: Record<Locale, {
  eyebrow: string;
  levelsTitle: string;
  formigaTitle: string;
  loboTitle: string;
  harpiaTitle: string;
  characteristics: string;
  educationTitle: string;
  educationText: string;
  educationButton: string;
  faq: string;
  internalLinks: string;
}> = {
  pt: {
    eyebrow: "Biblioteca de Mercados",
    levelsTitle: "Como cada nível utiliza este mercado",
    formigaTitle: "Formiga: o que aprende",
    loboTitle: "Lobo: como opera",
    harpiaTitle: "Harpia: como estrutura patrimônio",
    characteristics: "Principais características",
    educationTitle: "Evolua dentro da metodologia Varejo Investidor",
    educationText: "Aprofunde sua visão em Educação e conecte este mercado à jornada Formiga, Lobo e Harpia.",
    educationButton: "Ver Formação",
    faq: "FAQ",
    internalLinks: "Continue estudando",
  },
  en: {
    eyebrow: "Market Library",
    levelsTitle: "How each level uses this market",
    formigaTitle: "Formiga: what it learns",
    loboTitle: "Lobo: how it trades",
    harpiaTitle: "Harpia: how it structures wealth",
    characteristics: "Key characteristics",
    educationTitle: "Evolve inside the Varejo Investidor methodology",
    educationText: "Deepen your view in Education and connect this market to the Formiga, Lobo and Harpia journey.",
    educationButton: "View Formation",
    faq: "FAQ",
    internalLinks: "Keep studying",
  },
  es: {
    eyebrow: "Biblioteca de Mercados",
    levelsTitle: "Cómo cada nivel utiliza este mercado",
    formigaTitle: "Formiga: lo que aprende",
    loboTitle: "Lobo: cómo opera",
    harpiaTitle: "Harpia: cómo estructura patrimonio",
    characteristics: "Principales características",
    educationTitle: "Evoluciona dentro de la metodología Varejo Investidor",
    educationText: "Profundiza tu visión en Educación y conecta este mercado con la jornada Formiga, Lobo y Harpia.",
    educationButton: "Ver Formación",
    faq: "FAQ",
    internalLinks: "Seguir estudiando",
  },
  fr: {
    eyebrow: "Bibliotheque de marches",
    levelsTitle: "Comment chaque niveau utilise ce marche",
    formigaTitle: "Fourmi : ce qu'elle apprend",
    loboTitle: "Loup : comment il opere",
    harpiaTitle: "Harpie : comment elle structure le patrimoine",
    characteristics: "Caracteristiques principales",
    educationTitle: "Evoluez dans la methodologie Varejo Investidor",
    educationText: "Approfondissez votre vision dans l'education et reliez ce marche au parcours Fourmi, Loup et Harpie.",
    educationButton: "Voir la formation",
    faq: "FAQ",
    internalLinks: "Continuer a etudier",
  },
  hi: {
    eyebrow: "मार्केट लाइब्रेरी",
    levelsTitle: "हर स्तर इस बाजार का उपयोग कैसे करता है",
    formigaTitle: "चींटी: क्या सीखती है",
    loboTitle: "भेड़िया: कैसे ट्रेड करता है",
    harpiaTitle: "गरुड़: संपत्ति कैसे संरचित करती है",
    characteristics: "मुख्य विशेषताएँ",
    educationTitle: "Varejo Investidor पद्धति के भीतर आगे बढ़ें",
    educationText: "शिक्षा में अपनी समझ गहरी करें और इस बाजार को चींटी, भेड़िया और गरुड़ की यात्रा से जोड़ें।",
    educationButton: "प्रशिक्षण देखें",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    internalLinks: "अध्ययन जारी रखें",
  },
  ar: {
    eyebrow: "مكتبة الأسواق",
    levelsTitle: "كيف يستخدم كل مستوى هذا السوق",
    formigaTitle: "Formiga: ماذا يتعلم",
    loboTitle: "Lobo: كيف يتداول",
    harpiaTitle: "Harpia: كيف يبني الثروة",
    characteristics: "الخصائص الرئيسية",
    educationTitle: "تطور داخل منهجية Varejo Investidor",
    educationText: "عمق رؤيتك في التعليم واربط هذا السوق برحلة Formiga وLobo وHarpia.",
    educationButton: "عرض التكوين",
    faq: "الأسئلة الشائعة",
    internalLinks: "تابع الدراسة",
  },
  he: {
    eyebrow: "ספריית שווקים",
    levelsTitle: "איך כל רמה משתמשת בשוק זה",
    formigaTitle: "Formiga: מה לומדת",
    loboTitle: "Lobo: איך פועל",
    harpiaTitle: "Harpia: איך בונה הון",
    characteristics: "מאפיינים עיקריים",
    educationTitle: "התפתחו במתודולוגיית Varejo Investidor",
    educationText: "העמיקו את הפרספקטיבה בהכשרה וחברו שוק זה למסע Formiga, Lobo ו-Harpia.",
    educationButton: "צפו בהכשרה",
    faq: "שאלות נפוצות",
    internalLinks: "המשיכו ללמוד",
  },
  tr: {
    eyebrow: "Piyasa Kütüphanesi",
    levelsTitle: "Her seviye bu piyasayı nasıl kullanır",
    formigaTitle: "Formiga: ne öğrenir",
    loboTitle: "Lobo: nasıl işlem yapar",
    harpiaTitle: "Harpia: serveti nasıl yapılandırır",
    characteristics: "Temel özellikler",
    educationTitle: "Varejo Investidor metodolojisi içinde gelişin",
    educationText: "Eğitim bölümünde bakışınızı derinleştirin ve bu piyasayı Formiga, Lobo ve Harpia yolculuğuna bağlayın.",
    educationButton: "Formasyonu Gör",
    faq: "SSS",
    internalLinks: "Çalışmaya devam et",
  },
  id: {
    eyebrow: "Perpustakaan Pasar",
    levelsTitle: "Bagaimana setiap level memakai pasar ini",
    formigaTitle: "Semut: apa yang dipelajari",
    loboTitle: "Serigala: cara mengoperasikan",
    harpiaTitle: "Elang Harpy: cara membangun kekayaan",
    characteristics: "Karakteristik utama",
    educationTitle: "Berkembang dalam metodologi Varejo Investidor",
    educationText: "Perdalam pandangan Anda dalam Edukasi dan hubungkan pasar ini dengan perjalanan Semut, Serigala, dan Elang Harpy.",
    educationButton: "Lihat Formasi",
    faq: "FAQ",
    internalLinks: "Lanjutkan belajar",
  },
  vi: {
    eyebrow: "Thư viện Thị trường",
    levelsTitle: "Mỗi cấp độ sử dụng thị trường này như thế nào",
    formigaTitle: "Kiến: học gì",
    loboTitle: "Sói: vận hành ra sao",
    harpiaTitle: "Đại Bàng Harpy: cấu trúc tài sản thế nào",
    characteristics: "Đặc điểm chính",
    educationTitle: "Phát triển trong phương pháp Varejo Investidor",
    educationText: "Đào sâu góc nhìn trong Giáo dục và kết nối thị trường này với hành trình Kiến, Sói và Đại Bàng Harpy.",
    educationButton: "Xem Đào tạo",
    faq: "FAQ",
    internalLinks: "Tiếp tục học",
  },
  th: {
    eyebrow: "คลังตลาด",
    levelsTitle: "แต่ละระดับใช้ตลาดนี้อย่างไร",
    formigaTitle: "Formiga: สิ่งที่เรียนรู้",
    loboTitle: "Lobo: วิธีดำเนินการ",
    harpiaTitle: "Harpia: วิธีสร้างโครงสร้างความมั่งคั่ง",
    characteristics: "คุณลักษณะสำคัญ",
    educationTitle: "พัฒนาในแนวทาง Varejo Investidor",
    educationText: "เพิ่มมุมมองผ่านการศึกษาและเชื่อมตลาดนี้กับเส้นทาง Formiga, Lobo และ Harpia",
    educationButton: "ดูหลักสูตร",
    faq: "FAQ",
    internalLinks: "ศึกษาต่อ",
  },
};

const forexUiLabels: Record<Locale, {
  baseCurrency: string;
  quoteCurrency: string;
  capital: string;
  lot: string;
  move: string;
  result: string;
}> = {
  pt: { baseCurrency: "Moeda base", quoteCurrency: "Moeda de cotacao", capital: "Capital", lot: "Lote", move: "Movimento", result: "Resultado" },
  en: { baseCurrency: "Base currency", quoteCurrency: "Quote currency", capital: "Capital", lot: "Lot", move: "Move", result: "Result" },
  es: { baseCurrency: "Moneda base", quoteCurrency: "Moneda cotizada", capital: "Capital", lot: "Lote", move: "Movimiento", result: "Resultado" },
  fr: { baseCurrency: "Devise de base", quoteCurrency: "Devise cotee", capital: "Capital", lot: "Lot", move: "Mouvement", result: "Resultat" },
  hi: { baseCurrency: "बेस मुद्रा", quoteCurrency: "कोट मुद्रा", capital: "पूंजी", lot: "लॉट", move: "चाल", result: "परिणाम" },
  ar: { baseCurrency: "Base currency", quoteCurrency: "Quote currency", capital: "Capital", lot: "Lot", move: "Move", result: "Result" },
  tr: { baseCurrency: "Baz para birimi", quoteCurrency: "Karsi para birimi", capital: "Sermaye", lot: "Lot", move: "Hareket", result: "Sonuc" },
  id: { baseCurrency: "Mata uang dasar", quoteCurrency: "Mata uang kutipan", capital: "Modal", lot: "Lot", move: "Pergerakan", result: "Hasil" },
  vi: { baseCurrency: "Dong tien co so", quoteCurrency: "Dong tien dinh gia", capital: "Von", lot: "Lot", move: "Bien dong", result: "Ket qua" },
  th: { baseCurrency: "สกุลเงินฐาน", quoteCurrency: "สกุลเงินอ้างอิง", capital: "เงินทุน", lot: "ล็อต", move: "การเคลื่อนไหว", result: "ผลลัพธ์" },
};

function SchemaScripts({ slug, locale }: { slug: MarketSlug; locale: Locale }) {
  const institutional = getInstitutionalMarketPage(slug, locale);
  const content = getMarketContent(slug, locale);
  const forexContent = slug === "forex" ? getForexLibraryContent(locale) : null;
  const url = absoluteSiteUrl(`/${slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: institutional?.hero.title ?? forexContent?.title ?? content.title,
    description: institutional?.metaDescription ?? forexContent?.metaDescription ?? content.metaDescription,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "Varejo Investidor",
      url: absoluteSiteUrl("/"),
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Varejo Investidor", item: absoluteSiteUrl("/") },
      { "@type": "ListItem", position: 2, name: content.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

function ForexLibrarySections({
  content,
  locale,
  freeChannelLink,
}: {
  content: ForexLibraryContent;
  locale: Locale;
  freeChannelLink: string;
}) {
  const sections = content.sections;
  const isRtl = isRtlLocale(locale);
  const ui = forexUiLabels[locale] ?? forexUiLabels.en;

  return (
    <>
      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-7 shadow-fine md:p-10"
          >
            <div className="absolute inset-0 luxury-grid opacity-35" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{content.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">{sections.whatTitle}</h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-paper/[0.7]">
                {sections.whatText.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2">
            {sections.whatCards.map((card, index) => (
              <motion.div
                key={card}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border border-gold/[0.18] bg-white p-6 shadow-fine"
              >
                <p className="text-xs font-bold text-gold">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-4 font-serif text-2xl tracking-[-0.04em] text-paper">{card}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.pairsTitle}</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">{sections.structureTitle}</h2>
            <p className="mt-6 text-base leading-8 text-paper/[0.68]">{sections.pairsText}</p>
            <div className="mt-8 rounded-sm border border-gold/[0.22] bg-black/40 p-6 shadow-premium">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">EUR/USD = 1.1000</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="border border-paper/[0.1] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.45]">EUR</p>
                  <p className="mt-2 text-lg font-semibold text-paper">{ui.baseCurrency}</p>
                </div>
                <div className="border border-paper/[0.1] bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.45]">USD</p>
                  <p className="mt-2 text-lg font-semibold text-paper">{ui.quoteCurrency}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-paper/[0.62]">{sections.structureText}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sections.pairs.map((pair) => (
              <article key={pair.pair} className="border border-gold/[0.16] bg-white p-5 transition hover:-translate-y-1 hover:border-gold/[0.5]">
                <h3 className="font-serif text-3xl tracking-[-0.04em] text-paper">{pair.pair}</h3>
                <p className="mt-3 text-sm leading-6 text-paper/[0.66]">{pair.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {[
            { title: sections.pipsTitle, text: sections.pipsText, marker: "1.1000 -> 1.1001" },
            { title: sections.lotTitle, text: sections.lotText, marker: "0.01 / 0.10 / 1.00" },
            { title: sections.leverageTitle, text: sections.leverageText, marker: "US$ 1,000 x 1:100" },
          ].map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-7 shadow-fine"
            >
              <div className="absolute inset-0 terminal-grid opacity-30" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{item.marker}</p>
                <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.66]">{item.text}</p>
                {item.title === sections.leverageTitle ? (
                  <p className="mt-5 border-l-2 border-bear pl-4 text-sm font-semibold leading-6 text-bear">{sections.leverageWarning}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.examplesTitle}</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">{sections.lotTitle}</h2>
            <p className="mt-6 text-base leading-8 text-paper/[0.68]">{sections.examplesText}</p>
            <div className="mt-8 grid gap-3">
              {sections.lotRows.map((row) => (
                <div key={row.value} className="flex items-center justify-between border border-paper/[0.1] bg-white px-5 py-4">
                  <span className="font-mono text-lg font-bold text-gold">{row.value}</span>
                  <span className="text-sm font-semibold text-paper/[0.72]">{row.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-sm border border-gold/[0.18] bg-black/40">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-gold/[0.18] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  <th className="px-5 py-4">{ui.capital}</th>
                  <th className="px-5 py-4">{ui.lot}</th>
                  <th className="px-5 py-4">{ui.move}</th>
                  <th className="px-5 py-4">{ui.result}</th>
                </tr>
              </thead>
              <tbody>
                {sections.examples.map((example) => (
                  <tr key={`${example.lot}-${example.result}`} className="border-b border-paper/[0.08] last:border-b-0">
                    <td className="px-5 py-5 text-paper/[0.72]">{example.capital}</td>
                    <td className="px-5 py-5 font-mono font-bold text-gold">{example.lot}</td>
                    <td className="px-5 py-5 text-paper/[0.72]">{example.move}</td>
                    <td className="px-5 py-5 font-bold text-rise">{example.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.pairsMainTitle}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {sections.mainPairs.map((pair) => (
                <div key={pair.pair} className="border border-gold/[0.16] bg-white p-5">
                  <p className="font-mono text-xl font-bold text-paper">{pair.pair}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/[0.62]">{pair.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.sessionsTitle}</p>
            <p className="mt-5 text-base leading-8 text-paper/[0.68]">{sections.sessionsText}</p>
            <div className="mt-7 grid gap-3">
              {sections.sessions.map((session, index) => (
                <div key={session} className="flex items-center gap-4 border border-paper/[0.1] bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/[0.35] text-xs font-bold text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl tracking-[-0.04em]">{session}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.levelsTitle}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {sections.levels.map((level) => (
              <article key={level.title} className="terminal-module relative overflow-hidden border border-gold/[0.2] bg-white p-7 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.55] md:p-8">
                <div className="absolute inset-0 terminal-grid opacity-35" />
                <div className="relative">
                  <h3 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h3>
                  <ul className="mt-6 space-y-3">
                    {level.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-paper/[0.72]">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${level.tone === "rise" ? "bg-rise" : "bg-gold"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{sections.toolsTitle}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {sections.tools.map((tool) => (
              <a key={tool.href} href={tool.href} className="group border border-gold/[0.2] bg-white p-7 transition hover:-translate-y-1 hover:border-gold/[0.55]">
                <h3 className="font-serif text-3xl tracking-[-0.04em]">{tool.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.66]">{tool.text}</p>
                <span className="mt-6 inline-flex border border-gold bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition group-hover:bg-[#d8ad52]">
                  {tool.button}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl border border-gold/[0.22] bg-white p-7 text-center shadow-premium md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{content.eyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">{sections.finalTitle}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.68]">{sections.finalText}</p>
          <div className={`mt-8 flex flex-col justify-center gap-3 sm:flex-row ${isRtl ? "sm:flex-row-reverse" : ""}`}>
            <a href="/educacao" className="premium-button-gold inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
              {sections.educationButton}
            </a>
            <a href={freeChannelLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center border border-rise/[0.45] bg-rise/[0.12] px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-rise transition hover:-translate-y-0.5 hover:bg-rise hover:text-ink">
              {sections.freeButton}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function MarketPage({ slug }: { slug: MarketSlug }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const pageLocale = slug === "fundos-imobiliarios" ? "pt" : locale;
  const institutionalPage = getInstitutionalMarketPage(slug, pageLocale);
  const content = getMarketContent(slug, pageLocale);
  const forexContent = slug === "forex" ? getForexLibraryContent(pageLocale) : null;
  const labels = pageLabels[pageLocale] ?? pageLabels.en;
  const direction = isRtlLocale(pageLocale) ? "rtl" : "ltr";
  const relatedMarkets = content.related.filter((market) => market !== "fundos-imobiliarios" || pageLocale === "pt");

  const levelCards = [
    { title: labels.formigaTitle, items: content.formiga, href: "/formiga", tone: "rise" },
    { title: labels.loboTitle, items: content.lobo, href: "/lobo", tone: "gold" },
    { title: labels.harpiaTitle, items: content.harpia, href: "/harpia", tone: "gold" },
  ];

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts slug={slug} locale={pageLocale} />
      <main lang={localeToHtmlLang(pageLocale)} dir={direction} className="min-h-screen bg-ink text-paper">
        {institutionalPage ? (
          <>
            <MarketInstitutionalHero page={institutionalPage} locale={pageLocale} />
            <InstitutionalMarketSections page={institutionalPage} locale={pageLocale} currentSlug={slug} />
            {forexContent ? (
              <div className="border-t border-gold/[0.16]">
                <ForexLibrarySections content={forexContent} locale={pageLocale} freeChannelLink={t.freeChannel.link} />
              </div>
            ) : null}
          </>
        ) : (
          <>
        <section className="page-hero relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="absolute inset-0 terminal-grid opacity-50" />
          <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55 }}
            className="relative mx-auto max-w-7xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">{labels.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">{content.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/[0.68] md:text-xl">{content.subtitle}</p>
          </motion.div>
        </section>

        {forexContent ? (
          <ForexLibrarySections content={forexContent} locale={pageLocale} freeChannelLink={t.freeChannel.link} />
        ) : (
          <>
        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            {[{ title: content.explanationTitle, text: content.explanation }, { title: content.howItWorksTitle, text: content.howItWorks }].map((block) => (
              <motion.article
                key={block.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-7 shadow-fine md:p-9"
              >
                <div className="absolute inset-0 luxury-grid opacity-35" />
                <div className="relative">
                  <h2 className="font-serif text-3xl tracking-[-0.04em] md:text-4xl">{block.title}</h2>
                  <p className="mt-5 text-base leading-8 text-paper/[0.68]">{block.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.levelsTitle}</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {levelCards.map((level) => (
                <motion.a
                  key={level.title}
                  href={level.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group terminal-module relative overflow-hidden border border-gold/[0.2] bg-white p-7 transition hover:-translate-y-1 hover:border-gold/[0.55] md:p-8"
                >
                  <div className="absolute inset-0 terminal-grid opacity-40" />
                  <div className="relative">
                    <h3 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h3>
                    <ul className="mt-6 space-y-3">
                      {level.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-paper/[0.7]">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${level.tone === "rise" ? "bg-rise" : "bg-gold"}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.characteristics}</p>
              <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">{getMarketLabel(slug, pageLocale)}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.characteristics.map((item, index) => (
                <div key={item} className="border border-gold/[0.18] bg-white p-5">
                  <p className="text-xs font-bold text-gold">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-semibold text-paper">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl border border-gold/[0.22] bg-white p-7 text-center shadow-premium md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.educationTitle}</p>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-paper/[0.68]">{labels.educationText}</p>
            <a
              href="/educacao"
              className="premium-button-gold mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
            >
              {labels.educationButton}
            </a>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <FreeChannelCTA t={t} />
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.faq}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {content.faqs.map((faq) => (
                <article key={faq.question} className="border border-gold/[0.18] bg-white p-6">
                  <h3 className="font-serif text-2xl tracking-[-0.04em]">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-paper/[0.66]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.internalLinks}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedMarkets.map((related) => (
                <a key={related} href={`/${related}`} className="border border-gold/[0.24] bg-white px-4 py-3 text-sm font-semibold text-paper/[0.72] transition hover:border-gold hover:text-gold">
                  {getMarketLabel(related, pageLocale)}
                </a>
              ))}
              {["/educacao", "/sinais", "/sobre", "/formiga", "/lobo", "/harpia"].map((href) => (
                <a key={href} href={href} className="border border-paper/[0.12] bg-ink px-4 py-3 text-sm font-semibold text-paper/[0.62] transition hover:border-gold hover:text-gold">
                  {href.replace("/", "") || "home"}
                </a>
              ))}
            </div>
          </div>
        </section>
          </>
        )}
          </>
        )}

        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
