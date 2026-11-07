"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  FORMATION_CHARACTER_PACKAGES,
  FORMATION_COMPLETE_OFFER,
  FORMATION_TRACK_UI,
  type FormationLevelProduct,
  type FormationTrackId,
  formatFormationBRL,
  formationDiscountPercent,
  formationSavingsCents,
  productsByTrack,
} from "../data/formationPricing";
import { fadeUp } from "./SiteSections";

const trackOrder: FormationTrackId[] = ["formiga", "lobo", "harpia"];

function BuyAction({
  checkoutUrl,
  label,
  emphasis = false,
}: {
  checkoutUrl: string | null;
  label: string;
  emphasis?: boolean;
}) {
  if (checkoutUrl) {
    return (
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex w-full items-center justify-center border px-5 py-4 text-xs font-black uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
          emphasis
            ? "border-gold bg-gold text-ink hover:bg-[#d8ad52] shadow-[0_0_24px_rgba(201,155,62,0.2)]"
            : "border-gold bg-gold text-ink hover:bg-[#d8ad52]"
        }`}
      >
        {label}
      </a>
    );
  }

  return (
    <span className="inline-flex w-full cursor-not-allowed items-center justify-center border border-gold/[0.35] bg-gold/[0.12] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-gold/80">
      Checkout em breve
    </span>
  );
}

function LevelCard({ product }: { product: FormationLevelProduct }) {
  return (
    <div className="border border-gold/[0.12] bg-ink/[0.42] p-4 transition duration-300 hover:border-gold/[0.32]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-paper">{product.label}</p>
          <p className="mt-2 font-serif text-3xl tracking-[-0.04em] text-gold">{formatFormationBRL(product.priceCents)}</p>
        </div>
        <div className="w-full sm:w-[148px]">
          <BuyAction checkoutUrl={product.checkoutUrl} label="Comprar nível" />
        </div>
      </div>
    </div>
  );
}

export function FormationPricingSection() {
  const reduceMotion = useReducedMotion();
  const complete = FORMATION_COMPLETE_OFFER;
  const completeSavings = formationSavingsCents(complete.referencePriceCents, complete.promoPriceCents);
  const completeDiscount = formationDiscountPercent(complete.referencePriceCents, complete.promoPriceCents);

  return (
    <div id="expansao" className="mx-auto mt-10 max-w-7xl">
      <section className="formation-pricing relative overflow-hidden border border-gold/[0.45] bg-ink/[0.88] px-5 py-8 shadow-premium md:px-8 md:py-10">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">Formação Varejo Investidor</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.05em] text-gold md:text-6xl">INVESTIMENTO NA SUA JORNADA</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
            Escolha um nível, um personagem completo ou a formação integral com Formiga, Lobo e Harpia.
          </p>
        </div>

        <div className="relative mt-10 border-t border-gold/[0.16] pt-10">
          <p className="text-center text-xs font-black uppercase tracking-[0.28em] text-gold">Área 1 · Cursos individuais</p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-paper/[0.6]">
            Compre apenas o nível que você precisa agora e evolua no seu ritmo.
          </p>
          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            {trackOrder.map((trackId) => {
              const ui = FORMATION_TRACK_UI[trackId];
              const products = productsByTrack(trackId);

              return (
                <motion.article
                  key={trackId}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex min-h-full flex-col border border-gold/[0.18] bg-paper/[0.035] p-5 shadow-fine"
                >
                  <div className="mb-4 overflow-hidden border border-gold/[0.14] bg-ink/[0.35]">
                    <Image
                      src={ui.image}
                      alt={`Personagem ${ui.title} — Formação Varejo Investidor`}
                      width={640}
                      height={360}
                      className="h-36 w-full object-cover object-top opacity-90"
                      sizes="(max-width: 1280px) 100vw, 360px"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-gold/[0.14] pb-4">
                    <h3 className="font-serif text-3xl tracking-[-0.035em] text-paper">{ui.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">5 níveis</span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {products.map((product) => (
                      <LevelCard key={product.id} product={product} />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 border-t border-gold/[0.16] pt-10">
          <p className="text-center text-xs font-black uppercase tracking-[0.28em] text-gold">Área 2 · Pacotes completos</p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-7 text-paper/[0.6]">
            Adquira os cinco níveis de cada personagem com economia em relação à compra individual.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {FORMATION_CHARACTER_PACKAGES.map((pack) => {
              const savings = formationSavingsCents(pack.individualTotalCents, pack.priceCents);
              const discount = formationDiscountPercent(pack.individualTotalCents, pack.priceCents);

              return (
                <motion.article
                  key={pack.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex h-full flex-col border border-gold/[0.2] bg-paper/[0.04] p-5 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.5]"
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{pack.levelCount} níveis</p>
                  <h3 className="mt-3 font-serif text-3xl tracking-[-0.035em] text-paper">{pack.name}</h3>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-paper/[0.5]">
                    Individual: <span className="line-through">{formatFormationBRL(pack.individualTotalCents)}</span>
                  </p>
                  <p className="mt-2 font-serif text-4xl tracking-[-0.05em] text-gold">{formatFormationBRL(pack.priceCents)}</p>
                  <p className="mt-3 text-sm text-paper/[0.62]">
                    Economia de <span className="font-semibold text-gold">{formatFormationBRL(savings)}</span> (
                    {discount.toFixed(1).replace(".", ",")}%)
                  </p>
                  <div className="mt-auto pt-6">
                    <BuyAction checkoutUrl={pack.checkoutUrl} label="Adquirir pacote" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className="relative mt-12 overflow-hidden border-2 border-gold bg-gradient-to-br from-gold/[0.22] via-paper/[0.06] to-ink p-6 shadow-[0_0_48px_rgba(201,155,62,0.18)] md:p-8"
        >
          <div className="absolute -right-24 -top-24 h-72 w-72 bg-gold/[0.14] blur-3xl" />
          <p className="text-center text-[10px] font-black uppercase tracking-[0.34em] text-gold">Área 3 · Formação completa</p>
          <div className="relative mt-6 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <h3 className="font-serif text-4xl leading-[0.95] tracking-[-0.055em] text-paper md:text-6xl">{complete.name}</h3>
              <p className="mt-4 text-lg font-semibold text-paper/[0.78]">{complete.detail}</p>
              <ul className="mt-6 grid gap-2 text-sm text-paper/[0.68]">
                <li>✦ 5 níveis Formiga</li>
                <li>✦ 5 níveis Lobo</li>
                <li>✦ 5 níveis Harpia</li>
                <li>✦ 15 níveis de formação contínua</li>
              </ul>
              <p className="mt-6 text-sm text-paper/[0.55]">
                Economia de{" "}
                <span className="font-semibold text-gold">{formatFormationBRL(completeSavings)}</span> em relação à compra
                dos 15 níveis separados ({formatFormationBRL(complete.referencePriceCents)}).
              </p>
            </div>
            <div className="border border-gold/[0.28] bg-ink/[0.62] p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-paper/[0.52]">
                Preço de referência: <span className="line-through">{formatFormationBRL(complete.referencePriceCents)}</span>
              </p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-gold">Preço promocional</p>
              <p className="mt-2 font-serif text-5xl tracking-[-0.06em] text-paper md:text-6xl">
                {formatFormationBRL(complete.promoPriceCents)}
              </p>
              <div className="mt-4 grid gap-1 text-sm text-paper/[0.65]">
                <p>
                  Economia: <span className="font-semibold text-gold">{formatFormationBRL(completeSavings)}</span>
                </p>
                <p>
                  Desconto aproximado:{" "}
                  <span className="font-semibold text-gold">{completeDiscount.toFixed(1).replace(".", ",")}%</span>
                </p>
              </div>
              <div className="mt-6">
                <BuyAction checkoutUrl={complete.checkoutUrl} label="Adquirir formação completa" emphasis />
              </div>
            </div>
          </div>
        </motion.article>
      </section>
    </div>
  );
}
