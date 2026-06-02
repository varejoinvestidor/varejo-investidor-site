"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { translations } from "../../src/i18n";

type Currency = "USD" | "BRL" | "EUR" | "GBP";
type RiskLevel = "harpia" | "lobo" | "formiga" | "extreme";

const currencySymbols: Record<Currency, string> = {
  USD: "US$",
  BRL: "R$",
  EUR: "€",
  GBP: "£",
};

const recoveryRows = [
  { loss: 10, remaining: 90 },
  { loss: 20, remaining: 80 },
  { loss: 30, remaining: 70 },
  { loss: 40, remaining: 60 },
  { loss: 50, remaining: 50 },
  { loss: 60, remaining: 40 },
  { loss: 70, remaining: 30 },
  { loss: 80, remaining: 20 },
  { loss: 90, remaining: 10 },
];

const usageCards = [
  {
    title: "Capital da conta",
    text: "É o valor total disponível na sua conta de negociação. Exemplo: se você tem US$ 1.000 na corretora, esse é o capital usado no cálculo.",
  },
  {
    title: "Tamanho do lote",
    text: "É o volume da operação. Quanto maior o lote, maior o ganho ou a perda a cada movimento do mercado. Exemplo: 1.00 é lote padrão, 0.10 é mini lote e 0.01 é micro lote.",
  },
  {
    title: "Stop loss em pips",
    text: "É a distância entre sua entrada e o ponto onde você aceita encerrar a operação com prejuízo. Quanto maior o stop e maior o lote, maior será o risco.",
  },
  {
    title: "Nível de risco",
    text: "A calculadora mostra se o risco está em nível Harpia, Lobo ou Formiga. A ideia é ajudar você a proteger o capital e evitar operar com lote maior do que sua conta suporta.",
  },
];

const riskLevelCards = [
  {
    title: "Harpia",
    tone: "border-rise/[0.32] text-rise",
    text: "Risco conservador entre 0,10% e 0,30% por operação. Prioriza preservação de capital, paciência e longevidade no mercado.",
  },
  {
    title: "Lobo",
    tone: "border-gold/[0.38] text-gold",
    text: "Risco moderado entre 0,31% e 1,00% por operação. Busca crescimento com controle, mantendo espaço para erros sem comprometer rapidamente a conta.",
  },
  {
    title: "Formiga",
    tone: "border-fall/[0.38] text-fall",
    text: "Risco alto acima de 1,00% por operação. A conta fica mais vulnerável, e poucas operações erradas consecutivas podem comprometer grande parte do capital.",
  },
];

function formatMoney(value: number, currency: Currency) {
  return `${currencySymbols[currency]} ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "0,00";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function getRiskLevel(percent: number): RiskLevel {
  if (percent < 0.1) return "extreme";
  if (percent <= 0.3) return "harpia";
  if (percent <= 1) return "lobo";
  return "formiga";
}

const levelContent: Record<
  RiskLevel,
  {
    label: string;
    title: string;
    tone: string;
    recommendation: string;
    sustainability: string;
    survival: string;
  }
> = {
  harpia: {
    label: "Harpia — Risco conservador",
    title: "Preservação de capital",
    tone: "rise",
    recommendation:
      "Você está operando com risco conservador. Esse nível prioriza preservação de capital, longevidade e consistência. É o perfil mais indicado para quem deseja permanecer no mercado por muitos anos.",
    sustainability: "Alta",
    survival: "Alta",
  },
  lobo: {
    label: "Lobo — Risco moderado",
    title: "Crescimento com controle",
    tone: "gold",
    recommendation:
      "Você está operando com risco moderado. Esse nível busca crescimento com controle, mantendo espaço para erros sem comprometer rapidamente a conta.",
    sustainability: "Média",
    survival: "Moderada",
  },
  formiga: {
    label: "Formiga — Alto risco",
    title: "Conta vulnerável",
    tone: "fall",
    recommendation:
      "Você está operando com risco alto. Nesse nível, poucas operações erradas consecutivas podem comprometer grande parte da conta. Reduzir o lote pode aumentar sua sobrevivência no mercado.",
    sustainability: "Baixa",
    survival: "Baixa",
  },
  extreme: {
    label: "Conservador extremo",
    title: "Risco muito baixo",
    tone: "rise",
    recommendation:
      "Seu risco está abaixo de 0,10% por operação. Isso preserva bastante o capital, mas pode limitar o crescimento dependendo da estratégia utilizada.",
    sustainability: "Alta",
    survival: "Alta",
  },
};

function recommendedLot(capital: number, stopPips: number, percent: number) {
  if (capital <= 0 || stopPips <= 0) return 0;
  return (capital * (percent / 100)) / (stopPips * 10);
}

export default function RiskCalculatorPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const footerT = translations.pt;
  const [capital, setCapital] = useState(1000);
  const [lot, setLot] = useState(0.05);
  const [stopPips, setStopPips] = useState(100);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [submitted, setSubmitted] = useState(true);

  const result = useMemo(() => {
    const safeCapital = Math.max(Number(capital) || 0, 0);
    const safeLot = Math.max(Number(lot) || 0, 0);
    const safeStop = Math.max(Number(stopPips) || 0, 0);
    const pipValue = safeLot * 10;
    const riskMoney = pipValue * safeStop;
    const riskPercent = safeCapital > 0 ? (riskMoney / safeCapital) * 100 : 0;
    const operationsToZero = riskMoney > 0 ? safeCapital / riskMoney : 0;
    const operationsTo70 = riskMoney > 0 ? (safeCapital * 0.7) / riskMoney : 0;
    const level = getRiskLevel(riskPercent);
    const content = levelContent[level];
    const formigaLimitLot = recommendedLot(safeCapital, safeStop, 1);

    return {
      safeCapital,
      safeStop,
      pipValue,
      riskMoney,
      riskPercent,
      operationsToZero,
      operationsTo70,
      level,
      content,
      formigaLimitLot,
      harpiaMin: recommendedLot(safeCapital, safeStop, 0.1),
      harpiaMax: recommendedLot(safeCapital, safeStop, 0.3),
      loboMin: recommendedLot(safeCapital, safeStop, 0.31),
      loboMax: recommendedLot(safeCapital, safeStop, 1),
    };
  }, [capital, lot, stopPips]);

  const survivalRows = [20, 50, 70].map((loss) => {
    const operations = result.riskMoney > 0 ? Math.floor((result.safeCapital * (loss / 100)) / result.riskMoney) : 0;
    return {
      loss,
      operations,
      remaining: result.safeCapital * (1 - loss / 100),
      accumulatedPips: operations * result.safeStop,
    };
  });

  const toneClasses = {
    rise: "border-rise/[0.34] text-rise shadow-[0_0_34px_rgba(15,143,86,0.12)]",
    gold: "border-gold/[0.42] text-gold shadow-[0_0_34px_rgba(184,137,45,0.14)]",
    fall: "border-fall/[0.42] text-fall shadow-[0_0_34px_rgba(199,47,47,0.12)]",
  }[result.content.tone];

  function calculateRisk() {
    setSubmitted(true);
  }

  return (
    <main lang="pt-BR" className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-14 pt-36 md:px-8 md:pb-20 md:pt-48">
        <div className="finance-particles" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-rise/[0.06] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Calculadora de Risco</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Calcule o risco antes de entrar na operação.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/[0.72] md:text-xl md:leading-9">
              Entenda quanto cada stop representa na sua conta, qual nível de risco você está assumindo e qual lote combina melhor com Formiga, Lobo e Harpia.
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onSubmit={(event) => {
              event.preventDefault();
              calculateRisk();
            }}
            className="terminal-module border border-gold/[0.22] bg-white p-5 shadow-fine md:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">Capital total da conta</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.72]">Capital total disponível para trading.</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={capital}
                  onChange={(event) => setCapital(Number(event.target.value))}
                  className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">Tamanho do lote</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.72]">1.00 = lote padrão, 0.10 = mini lote, 0.01 = micro lote.</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={lot}
                  onChange={(event) => setLot(Number(event.target.value))}
                  className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">Stop loss em pips</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.72]">Distância do stop loss em pips.</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={stopPips}
                  onChange={(event) => setStopPips(Number(event.target.value))}
                  className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-paper">Moeda da conta</span>
                <span className="mt-2 block text-sm leading-6 text-paper/[0.72]">Escolha a moeda usada para exibir o risco financeiro.</span>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value as Currency)}
                  className="mt-3 w-full border border-paper/[0.18] bg-paper px-4 py-4 font-mono text-lg font-bold text-paper outline-none transition focus:border-gold"
                >
                  <option value="USD">USD</option>
                  <option value="BRL">BRL</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="premium-button-gold mt-6 w-full border border-gold bg-gold px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              Calcular risco
            </button>
          </motion.form>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Como usar</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">
              Como usar a Calculadora de Risco
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/[0.76]">
              Antes de entrar em uma operação, você precisa saber quanto da sua conta está em risco. A calculadora mostra quanto dinheiro você pode perder caso o stop seja atingido e classifica esse risco dentro dos níveis Formiga, Lobo e Harpia.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {usageCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                variants={fadeUp}
                className="terminal-module border border-gold/[0.18] bg-paper p-6 shadow-fine"
              >
                <p className="font-mono text-xs font-black uppercase tracking-[0.22em] text-gold">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-paper">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.72]">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Níveis de risco</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">
              O que significam os níveis de risco?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-paper/[0.76]">
              No Varejo Investidor, os níveis Formiga, Lobo e Harpia ajudam a entender o comportamento do investidor diante do risco. Quanto maior o risco por operação, menor a margem para erro e menor a sobrevivência da conta.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {riskLevelCards.map((card) => (
              <article key={card.title} className={`terminal-module border bg-white p-6 shadow-fine ${card.tone}`}>
                <h3 className="font-serif text-4xl tracking-[-0.05em]">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-paper/[0.72]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {submitted ? (
        <>
          <section className="px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Valor por pip", `${formatMoney(result.pipValue, currency)} por pip`],
                  ["Risco da operação", formatMoney(result.riskMoney, currency)],
                  ["Percentual de risco", `${formatNumber(result.riskPercent)}% da conta`],
                  ["Classificação", result.content.label],
                ].map(([label, value], index) => (
                  <motion.article
                    key={label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    variants={fadeUp}
                    className={`terminal-module border bg-white p-6 shadow-fine ${label === "Classificação" ? toneClasses : "border-ink/[0.12]"}`}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-ink/[0.48]">{label}</p>
                    <p className="mt-4 font-mono text-2xl font-black leading-tight">{value}</p>
                  </motion.article>
                ))}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="terminal-module border border-ink/[0.12] bg-white p-6 shadow-fine">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Sobrevivência da conta</p>
                  <h2 className="mt-4 font-serif text-4xl tracking-[-0.045em]">{result.content.title}</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="border border-ink/[0.1] bg-paper p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/[0.48]">Até zerar</p>
                      <p className="mt-2 font-mono text-2xl font-black">{Math.floor(result.operationsToZero)} operações</p>
                      <p className="mt-2 text-sm leading-6 text-ink/[0.58]">Operações erradas consecutivas poderiam zerar a conta.</p>
                    </div>
                    <div className="border border-fall/[0.22] bg-paper p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-fall">Drawdown de 70%</p>
                      <p className="mt-2 font-mono text-2xl font-black">{Math.floor(result.operationsTo70)} operações</p>
                      <p className="mt-2 text-sm leading-6 text-ink/[0.58]">Operações erradas consecutivas poderiam levar a conta a 70% de perda.</p>
                    </div>
                  </div>
                </article>
                <article className={`terminal-module border bg-white p-6 shadow-fine ${toneClasses}`}>
                  <p className="text-xs font-black uppercase tracking-[0.22em]">Recomendação</p>
                  <p className="mt-4 text-lg leading-8 text-ink/[0.72]">{result.content.recommendation}</p>
                </article>
              </div>
            </div>
          </section>

          <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Lote recomendado por nível</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-6xl">Ajuste o lote para proteger capital.</h2>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  ["Harpia", "0,10% a 0,30%", `${formatNumber(result.harpiaMin, 3)} a ${formatNumber(result.harpiaMax, 3)} lote`, "border-rise/[0.28]"],
                  ["Lobo", "0,31% a 1,00%", `${formatNumber(result.loboMin, 3)} a ${formatNumber(result.loboMax, 3)} lote`, "border-gold/[0.34]"],
                  ["Formiga", "Acima de 1,00%", `Acima de ${formatNumber(result.formigaLimitLot, 3)} lote`, "border-fall/[0.34]"],
                ].map(([level, range, lotRange, border]) => (
                  <article key={level} className={`terminal-module border ${border} bg-paper p-6`}>
                    <p className="font-serif text-3xl tracking-[-0.04em]">{level}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-ink/[0.48]">{range}</p>
                    <p className="mt-5 font-mono text-2xl font-black text-gold">{lotRange}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Simulador</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">Simulador de sobrevivência da conta.</h2>
                <p className="mt-5 max-w-2xl leading-8 text-ink/[0.64]">
                  Veja quantas operações erradas consecutivas seriam necessárias para atingir perdas relevantes, considerando o lote e stop informados.
                </p>
              </div>
              <div className="grid gap-4">
                {survivalRows.map((row) => (
                  <article key={row.loss} className="terminal-module border border-ink/[0.12] bg-white p-5 shadow-fine">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="font-mono text-3xl font-black text-fall">-{row.loss}%</p>
                        <p className="mt-1 text-sm text-ink/[0.55]">Capital restante: {formatMoney(row.remaining, currency)}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="font-mono text-xl font-black">{row.operations} operações erradas</p>
                        <p className="mt-1 text-sm text-ink/[0.55]">{row.accumulatedPips} pips negativos acumulados</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Recuperação</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">Tabela de recuperação de prejuízo.</h2>
              <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-paper shadow-fine">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead className="border-b border-ink/[0.1] text-xs uppercase tracking-[0.18em] text-gold">
                    <tr>
                      <th className="px-5 py-4">Perda</th>
                      <th className="px-5 py-4">Capital restante</th>
                      <th className="px-5 py-4">Ganho necessário para recuperar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recoveryRows.map((row) => {
                      const recovery = (row.loss / row.remaining) * 100;
                      return (
                        <tr key={row.loss} className="border-b border-ink/[0.08]">
                          <td className="px-5 py-4 font-mono font-black text-fall">-{row.loss}%</td>
                          <td className="px-5 py-4 font-mono font-bold">{row.remaining}%</td>
                          <td className="px-5 py-4 font-mono font-black text-gold">+{formatNumber(recovery)}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="px-5 py-14 md:px-8 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="terminal-module relative overflow-hidden border border-gold/[0.24] bg-ink p-6 text-paper shadow-premium md:p-10">
                <div className="absolute inset-0 terminal-grid opacity-25" />
                <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Consciência operacional</p>
                    <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] md:text-6xl">Painel final de risco.</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["Nível atual", result.content.label],
                      ["Risco por operação", `${formatNumber(result.riskPercent)}%`],
                      ["Resistência da conta", `${Math.floor(result.operationsTo70)} operações até 70% de DD`],
                      ["Sustentabilidade", result.content.sustainability],
                      ["Probabilidade de sobrevivência", result.content.survival],
                    ].map(([label, value]) => (
                      <div key={label} className="border border-paper/[0.1] bg-paper/[0.04] p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-paper/[0.46]">{label}</p>
                        <p className="mt-2 font-mono text-lg font-black text-gold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      <section className="px-5 py-14 md:px-8 md:py-18">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative mx-auto max-w-7xl overflow-hidden border border-gold/[0.24] bg-white p-6 shadow-fine md:p-10"
        >
          <div className="absolute inset-0 terminal-grid opacity-20" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Gestão de risco</p>
              <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.03] tracking-[-0.05em] md:text-6xl">
                Aprenda a operar com risco controlado.
              </h2>
              <p className="mt-5 max-w-3xl leading-8 text-ink/[0.66]">
                A gestão de risco é uma das bases para sobreviver no mercado. No Varejo Investidor, você aprende a proteger capital, calcular lote, entender stop e evoluir sua mentalidade operacional através dos níveis Formiga, Lobo e Harpia.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-[320px]">
              <a href={footerT.freeChannel.link} target="_blank" rel="noopener noreferrer" className="premium-button-gold border border-gold bg-gold px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                Entrar no Canal Formiga
              </a>
              <a href="/sinais" className="border border-ink/[0.18] bg-paper px-6 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-paper transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                Receber sinais no WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-10 md:px-8 md:pb-14">
        <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white p-5 text-sm leading-7 text-ink/[0.64] shadow-fine">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Disclaimer</p>
          <p className="mt-3">
            Esta calculadora possui finalidade educacional e utiliza uma regra simplificada de valor por pip. O valor real pode variar conforme ativo, corretora, tipo de conta, moeda da conta e condições de mercado. Operar Forex, criptomoedas, índices e outros ativos envolve risco e pode resultar em perdas. Cada usuário é responsável por suas próprias decisões financeiras.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={footerT} />
        </div>
      </section>
      <SupportFooter t={footerT} locale="pt" onLocaleChange={changeLocale} />
    </main>
  );
}
