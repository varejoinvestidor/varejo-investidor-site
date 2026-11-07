"use client";

import {
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
} from "./SiteSections";
import { ELITE_LASTLINK_HERO_MONTHLY_PT, ELITE_LASTLINK_PLANS_PT } from "../data/eliteLastlinkPricingPt";

const INTERNATIONAL_ELITE_PRICES = [
  ["Monthly", "US$ 30"],
  ["3 Months", "US$ 80"],
  ["6 Months", "US$ 145"],
  ["Annual", "US$ 240"],
] as const;

type ElitePaymentCardsProps = {
  isPt: boolean;
  internationalSubscribeLabel?: string;
};

export function ElitePaymentCards({ isPt, internationalSubscribeLabel }: ElitePaymentCardsProps) {
  const subscribeLabel = internationalSubscribeLabel ?? (isPt ? "Assinar" : "Subscribe");

  return (
    <div className={`grid gap-5 ${isPt ? "lg:grid-cols-[0.92fr_1.08fr]" : "mx-auto max-w-3xl"}`}>
      {isPt ? (
        <article className="terminal-module relative overflow-hidden border border-gold bg-ink p-6 text-paper shadow-premium md:p-8">
          <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
          <div className="relative flex h-full flex-col">
            <span className="inline-block w-fit border border-gold bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-ink">
              Brasil
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-gold">Lastlink</p>
            <h3 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-paper">Pagamento Brasil</h3>
            <p className="mt-4 leading-8 text-paper/[0.68]">
              Assine o Canal Elite em reais, com checkout nacional seguro pela Lastlink.
            </p>
            <p className="mt-6 font-serif text-3xl tracking-[-0.04em] text-gold">A partir de {ELITE_LASTLINK_HERO_MONTHLY_PT}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper/[0.48]">no plano anual</p>
            <div className="mt-6 grid flex-1 gap-3 sm:grid-cols-2">
              {ELITE_LASTLINK_PLANS_PT.map((plan) => (
                <div
                  key={plan.period}
                  className={`border p-4 ${
                    plan.featured
                      ? "border-gold/[0.55] bg-gradient-to-br from-gold/[0.16] to-paper/[0.04] shadow-[0_0_0_1px_rgba(201,155,62,0.14)]"
                      : "border-gold/[0.22] bg-paper/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.62]">{plan.period}</p>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-paper/[0.44]">{plan.validity}</p>
                    </div>
                    {plan.badge ? (
                      <span className="shrink-0 border border-gold/[0.42] bg-gold/[0.1] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-gold">
                        {plan.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 font-mono text-xl font-bold text-paper">{plan.total}</p>
                  <p className="mt-1 text-xs font-semibold tracking-[0.05em] text-paper/[0.55]">{plan.monthlyEquivalent}</p>
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
      ) : null}

      <article className="terminal-module relative overflow-hidden border border-[#31547a] bg-ink p-6 text-paper shadow-premium md:p-8">
        <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
        <div className="relative flex h-full flex-col">
          <span className="inline-block w-fit border border-[#31547a] bg-[#132437] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gold">
            Internacional
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-gold">Stripe</p>
          <h3 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-paper">
            {isPt ? "Pagamento Internacional" : "International Payment"}
          </h3>
          <p className="mt-4 leading-8 text-paper/[0.68]">
            {isPt
              ? "Assine o Canal Elite em dólar via Stripe, ideal para clientes fora do Brasil."
              : "Subscribe to the Elite Channel in dollars through Stripe for international clients."}
          </p>
          <div className="mt-6 grid flex-1 gap-3">
            {INTERNATIONAL_ELITE_PRICES.map(([period, price], index) => (
              <div key={period} className="grid gap-3 border border-[#31547a]/70 bg-paper/[0.035] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.62]">{period}</p>
                  {index === 3 ? (
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">{isPt ? "Maior economia" : "Best value"}</p>
                  ) : null}
                </div>
                <p className="font-mono text-xl font-bold text-paper">{price}</p>
                <a
                  href={ELITE_STRIPE_LINKS[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold bg-gold px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-paper"
                >
                  {subscribeLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
