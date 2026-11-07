"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "../i18n";
import { fxproButtonLabels, fxproLinks } from "../data/fxproLinks";
import { fadeUp } from "./SiteSections";

const BINANCE_URL = "https://accounts.binance.com/register?ref=453580362";

type PartnerCopy = {
  eyebrow: string;
  forexName: string;
  forexDescription: string;
  forexFeatures: string[];
  cryptoName: string;
  cryptoDescription: string;
  cryptoFeatures: string[];
  openAccount: string;
  riskForex: string;
  riskCrypto: string;
};

const copyByLocale: Partial<Record<Locale, PartnerCopy>> = {
  pt: {
    eyebrow: "Parceiro operacional",
    forexName: "FxPro",
    forexDescription:
      "Corretora internacional utilizada na estrutura operacional do Varejo Investidor para acesso a pares de moedas, metais, energia e índices globais.",
    forexFeatures: ["Execução em plataforma global", "Acesso a pares principais", "Infraestrutura para Forex e CFDs", "Suporte multilíngue"],
    cryptoName: "Binance",
    cryptoDescription:
      "Exchange internacional referência para negociação de criptoativos com liquidez global, múltiplos pares e infraestrutura de custódia digital.",
    cryptoFeatures: ["Mercado spot e derivativos", "Liquidez internacional", "Carteiras e autocustódia", "Acesso multimoeda"],
    openAccount: "Abrir conta",
    riskForex: "Operações alavancadas em Forex e CFDs envolvem alto risco de perda. Avalie sua tolerância a risco antes de operar.",
    riskCrypto: "Criptoativos são voláteis e sujeitos a risco de custódia, liquidez e regulação. Conteúdo educacional — não é recomendação individual.",
  },
  en: {
    eyebrow: "Operational partner",
    forexName: "FxPro",
    forexDescription:
      "International broker used in Varejo Investidor's operational structure for currencies, metals, energy and global indices.",
    forexFeatures: ["Global platform execution", "Major pair access", "Forex and CFD infrastructure", "Multilingual support"],
    cryptoName: "Binance",
    cryptoDescription:
      "Leading international exchange for crypto trading with global liquidity, multiple pairs and digital custody infrastructure.",
    cryptoFeatures: ["Spot and derivatives markets", "International liquidity", "Wallets and self-custody", "Multi-currency access"],
    openAccount: "Open account",
    riskForex: "Leveraged Forex and CFD trading involves substantial risk of loss. Assess your risk tolerance before trading.",
    riskCrypto: "Crypto assets are volatile and subject to custody, liquidity and regulatory risk. Educational content — not personal advice.",
  },
  es: {
    eyebrow: "Socio operativo",
    forexName: "FxPro",
    forexDescription: "Broker internacional utilizado en la estructura operativa de Varejo Investidor para divisas, metales, energía e índices.",
    forexFeatures: ["Ejecución global", "Pares principales", "Infraestructura Forex y CFD", "Soporte multilingüe"],
    cryptoName: "Binance",
    cryptoDescription: "Exchange internacional para criptoactivos con liquidez global y múltiples pares.",
    cryptoFeatures: ["Spot y derivados", "Liquidez internacional", "Wallets", "Acceso multimoneda"],
    openAccount: "Abrir cuenta",
    riskForex: "El trading apalancado implica alto riesgo de pérdida.",
    riskCrypto: "Los criptoactivos son volátiles. Contenido educativo.",
  },
};

function partnerCopy(locale: Locale): PartnerCopy {
  return copyByLocale[locale] ?? copyByLocale.es ?? copyByLocale.en!;
}

type PartnerKind = "forex" | "crypto";

export function PartnerBrokerMarketCard({ locale, kind }: { locale: Locale; kind: PartnerKind }) {
  const data = partnerCopy(locale);
  const isForex = kind === "forex";
  const href = isForex ? (fxproLinks[locale] ?? fxproLinks.en) : BINANCE_URL;
  const buttonLabel = isForex ? (fxproButtonLabels[locale] ?? `${data.openAccount} ${data.forexName}`) : `${data.openAccount} ${data.cryptoName}`;
  const name = isForex ? data.forexName : data.cryptoName;
  const description = isForex ? data.forexDescription : data.cryptoDescription;
  const features = isForex ? data.forexFeatures : data.cryptoFeatures;
  const risk = isForex ? data.riskForex : data.riskCrypto;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`terminal-module relative mx-auto max-w-3xl overflow-hidden border bg-ink p-6 text-paper shadow-premium md:p-8 ${
        isForex ? "border-[#31547a]" : "border-gold"
      }`}
    >
      <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
      <div className="relative flex flex-col gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{data.eyebrow}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {isForex ? (
              <Image
                src="https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png"
                alt="FxPro"
                width={280}
                height={32}
                className="h-8 w-auto max-w-[220px] object-contain object-left"
                unoptimized
              />
            ) : (
              <span className="grid h-12 min-w-[120px] place-items-center border border-gold/40 bg-paper/[0.04] px-4 font-mono text-lg font-bold tracking-[0.12em] text-gold">
                Binance
              </span>
            )}
            <h3 className="font-serif text-3xl tracking-[-0.05em] md:text-4xl">{name}</h3>
          </div>
          <p className="mt-4 text-base leading-8 text-paper/[0.68]">{description}</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="border border-gold/[0.2] bg-paper/[0.04] px-4 py-3 text-sm font-semibold text-paper/[0.78]">
              {feature}
            </li>
          ))}
        </ul>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-button-gold inline-flex w-full items-center justify-center border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
        >
          {buttonLabel}
        </a>
        <p className="text-xs leading-6 text-paper/[0.48]">{risk}</p>
      </div>
    </motion.article>
  );
}
