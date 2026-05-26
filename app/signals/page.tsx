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
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

const howItWorks = [
  "2 a 5 sinais por dia",
  "Envio direto no WhatsApp",
  "Entrada, alvo e stop definidos",
  "Contexto operacional e leitura de mercado",
];

const ichimokuPoints = [
  "leitura da nuvem",
  "médias do Ichimoku",
  "direção do preço",
  "alvo e stop",
  "contexto do ativo",
  "gerenciamento de risco",
];

const reports = [
  ["AGO/2018", "Relatório Elite", "124 sinais", "+18.4%", "Disponível"],
  ["JAN/2021", "Relatório Elite", "98 sinais", "+11.2%", "Disponível"],
  ["MAR/2024", "Relatório Elite", "137 sinais", "+22.7%", "Disponível"],
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
  "operações estruturadas",
  "contexto operacional",
  "Forex",
  "ouro",
  "petróleo",
  "índices",
  "cripto",
  "leitura institucional",
  "comunidade fechada",
  "aulas gravadas nível Formiga",
  "aulas gravadas nível Lobo",
  "aulas gravadas nível Harpia",
  "estrutura Elite",
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
  "Estrutura completa de mercado",
];

const whatsappPrints = [
  { label: "WhatsApp print 01", src: "/signals/whatsapp-print-01.jpg" },
  { label: "WhatsApp print 02", src: "/signals/whatsapp-print-02.jpg" },
  { label: "WhatsApp print 03", src: "/signals/whatsapp-print-03.jpg" },
];

export default function SignalsPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const eliteCta = eliteLinkProps(locale, "/sinais");
  const isHi = locale === "hi";
  const signalPageCopy = isHi
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
        now: "अभी प्रवेश करें",
      }
    : null;
  const howItems = signalPageCopy?.howItems ?? howItWorks;
  const ichimokuItems = signalPageCopy?.ichimokuItems ?? ichimokuPoints;
  const reportRows = signalPageCopy?.reports ?? reports;
  const freeItems = signalPageCopy?.formigaItems ?? formigaBullets;
  const eliteItems = signalPageCopy?.eliteItems ?? eliteBullets;
  const reportYears = ["2018", "2021", "2024"];
  const displayPrices = isHi
    ? [
        ["मासिक", "US$ 30", ""],
        ["3 महीने", "US$ 80", ""],
        ["6 महीने", "US$ 145", ""],
        ["वार्षिक", "US$ 240", ""],
      ]
    : prices;

  return (
    <main lang={locale === "hi" ?"hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="signals-hero premium-stage relative px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.12] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t.signalBlock.eyebrow} title={t.signalBlock.title} text={t.signalBlock.text} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.signalBlock.stats.map((item) => (
                <div key={item} className="operational-chip border-l-2 border-rise bg-white p-4 shadow-fine">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              {...eliteCta}
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
            title={signalPageCopy?.howTitle ?? "Como funciona o Canal Elite"}
            text={signalPageCopy?.howText ?? "O canal Elite entrega operações estruturadas ao vivo diretamente no WhatsApp com contexto operacional e gestão de risco."}
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
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{signalPageCopy?.scheduleEyebrow ?? "Horários operacionais"}</p>
                <h3 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{signalPageCopy?.scheduleTitle ?? "Horários operacionais"}</h3>
                <p className="mt-4 max-w-2xl leading-8 text-ink/[0.66]">
                  {signalPageCopy?.scheduleText ?? "Os sinais são enviados geralmente nos principais períodos de liquidez do mercado, entre 8h e 15h, e também entre 21h e 00h, no horário de Brasília."}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink/[0.48]">
                  {signalPageCopy?.scheduleNote ?? "Os horários podem variar conforme volatilidade, liquidez e oportunidades reais do mercado."}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {(signalPageCopy?.scheduleCards ?? [
                  ["MANHÃ E TARDE", "8h às 15h"],
                  ["NOITE", "21h às 00h"],
                ]).map(([label, time]) => (
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
            eyebrow={signalPageCopy?.methodEyebrow ?? "Método operacional"}
            title={signalPageCopy?.methodTitle ?? "Sinais baseados no Ichimoku"}
            text={signalPageCopy?.methodText ?? "Todos os sinais do Varejo Investidor são enviados com base na leitura do indicador Ichimoku, observando principalmente a nuvem, as médias, o posicionamento do preço, zonas de suporte, resistência e contexto do ativo."}
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

      <WhatsAppSignalExample t={t} locale={locale} />

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.historyEyebrow ?? "Histórico"}
            title={signalPageCopy?.historyTitle ?? "Relatório Elite desde agosto de 2018"}
            text={signalPageCopy?.historyText ?? "Acompanhe a evolução operacional do Canal Elite através dos relatórios históricos enviados desde agosto de 2018."}
          />
          <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.22em] text-gold">
                <tr>
                  {(signalPageCopy?.tableHeadings ?? ["DATA", "RELATÓRIO ELITE", "SINAIS", "RESULTADO", "STATUS", "VER"]).map((heading) => (
                    <th key={heading} className="px-5 py-4 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportRows.map((row, rowIndex) => (
                  <tr key={row[0]} className="border-b border-ink/[0.08] transition hover:bg-rise/[0.05]">
                    {row.map((cell, index) => (
                      <td
                        key={cell}
                        className={`px-5 py-5 text-sm ${index === 3 ?"font-mono font-bold text-rise" : "text-ink/[0.72]"}`}
                      >
                        {cell}
                      </td>
                    ))}
                    <td className="px-5 py-5">
                      <a
                        href={`/historico/${reportYears[rowIndex] ?? "2018"}`}
                        className="inline-block border border-ink/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
                      >
                        {signalPageCopy?.view ?? "VER"}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            text={signalPageCopy?.levelsText ?? "Comece gratuitamente no Canal Formiga ou entre no Elite Harpia para acesso completo à estrutura operacional."}
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
                {signalPageCopy?.freeButton ?? "Entrar gratuitamente"}
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
                <a
                  {...eliteCta}
                  className="premium-button-gold mt-8 block border border-gold bg-gold px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink"
                >
                  {signalPageCopy?.eliteButton ?? "Entrar no Elite"}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={signalPageCopy?.packagesEyebrow ?? "Pacotes"}
            title={signalPageCopy?.packagesTitle ?? "Acesso ao Elite"}
            text={
              signalPageCopy?.packagesText ??
              "Escolha seu pacote para acessar 100% dos sinais, grupo exclusivo, análises, aulas gravadas e conteúdo nível Harpia dentro do Varejo Investidor."
            }
          />
          {!isHi ? (
            <div className="mt-8 border border-gold/[0.22] bg-ink p-5 shadow-premium md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Canal Elite Harpia</p>
                  <h3 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">
                    O que você recebe no Canal Elite
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {eliteBenefits.map((benefit, index) => (
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
                  {...eliteCta}
                  className={`mt-8 block border px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] ${index === 3 ?"border-gold bg-gold text-ink" : "border-ink bg-ink text-paper"}`}
                >
                  {signalPageCopy?.now ?? "Entrar agora"}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

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
