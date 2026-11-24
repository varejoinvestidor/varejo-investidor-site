"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "../SiteSections";
import { LANGUAGE_CATALOG } from "../../i18n/languageCatalog";
import { localizedPath } from "../../i18n/routing";
import { partnersCopyFor } from "../../partners/copy";
import { commercialCopyFor } from "../../partners/commercial";
import { PartnerForm } from "./PartnerForm";
import { EarningsSimulator } from "./EarningsSimulator";
import { PartnershipEcosystem } from "./PartnershipEcosystem";

function Section({
  id,
  eyebrow,
  title,
  text,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/10 px-5 py-16 md:px-8 md:py-24">
      <motion.div {...fadeBlock} className="mx-auto max-w-6xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] text-paper md:text-5xl">{title}</h2>
        {text ? <p className="mt-5 max-w-3xl text-base leading-8 text-paper/70 md:text-lg">{text}</p> : null}
        {children}
      </motion.div>
    </section>
  );
}

const fadeBlock = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

export default function PartnersPage() {
  const { locale, changeLocale, t } = useSiteLocale();
  const copy = partnersCopyFor(locale);
  const commercial = commercialCopyFor(locale);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />
      <main className="page-content">
        <section className="px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold">{copy.heroEyebrow}</p>
              <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] md:text-7xl">{copy.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/75">{copy.heroSubtitle}</p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-paper/60">{copy.heroText}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#afiliados" className="inline-flex min-h-12 items-center justify-center bg-gold px-6 text-xs font-black uppercase tracking-[0.16em] text-ink">
                  {copy.ctaPartner}
                </a>
                <a href="#ecossistema" className="inline-flex min-h-12 items-center justify-center border border-white/20 px-6 text-xs font-black uppercase tracking-[0.16em]">
                  {copy.ctaEcosystem}
                </a>
              </div>
            </div>
            <div className="border border-white/10 px-6 py-10 md:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">{copy.visionEyebrow}</p>
              <p className="mt-6 font-serif text-5xl tracking-[-0.04em] text-paper md:text-6xl">{copy.visionFigure}</p>
              <p className="mt-4 text-sm leading-7 text-paper/55">{copy.visionNote}</p>
            </div>
          </motion.div>
        </section>

        <Section id="visao" eyebrow={copy.visionEyebrow} title={copy.visionTitle} text={copy.visionText}>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-paper/45">{copy.visionNote}</p>
        </Section>

        <Section id="ecossistema" eyebrow={copy.pathsEyebrow} title={copy.pathsTitle}>
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <article id="afiliados">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">01</p>
              <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{copy.affiliateTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{copy.affiliateText}</p>
              <p className="mt-4 text-sm leading-7 text-paper/55">{copy.affiliateProducts}</p>
              <ul className="mt-5 space-y-2 text-sm text-paper/75">
                {copy.affiliateBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-6 text-paper/45">{copy.affiliateNote}</p>
              <a href="#form-afiliado" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
                {copy.affiliateCta}
              </a>
            </article>
            <article id="lideres">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">02</p>
              <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{copy.leaderTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{copy.leaderText}</p>
              <ul className="mt-5 space-y-2 text-sm text-paper/75">
                {copy.leaderItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-6 text-paper/45">{copy.leaderNote}</p>
              <a href="#form-lider" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
                {copy.leaderCta}
              </a>
            </article>
            <article id="participacao">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">03</p>
              <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em]">{copy.economicTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{copy.economicText}</p>
              <p className="mt-4 text-xs leading-6 text-paper/45">{copy.economicNote}</p>
              <a href="#form-economico" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
                {copy.economicCta}
              </a>
            </article>
          </div>
        </Section>

        <Section id="remuneracao" eyebrow={commercial.earnEyebrow} title={commercial.earnTitle} text={commercial.earnText}>
          <p className="mt-6 max-w-3xl border border-gold/30 px-4 py-3 text-sm leading-7 text-paper/75">{commercial.earnPending}</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <article>
              <h3 className="font-serif text-3xl">{commercial.affiliateTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{commercial.affiliateLead}</p>
              <ul className="mt-4 space-y-2 text-sm text-paper/75">
                {commercial.affiliateItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3 className="font-serif text-3xl">{commercial.leaderTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{commercial.leaderLead}</p>
              <ul className="mt-4 space-y-2 text-sm text-paper/75">
                {commercial.leaderItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3 className="font-serif text-3xl">{commercial.economicTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/70">{commercial.economicLead}</p>
              <ul className="mt-4 space-y-2 text-sm text-paper/75">
                {commercial.economicItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#form-economico" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
                {commercial.economicCta}
              </a>
            </article>
          </div>
        </Section>

        <Section id="simulador" eyebrow={commercial.simEyebrow} title={commercial.simTitle} text={commercial.simText}>
          <EarningsSimulator copy={commercial} />
        </Section>

        <Section id="ecossistema-3d" eyebrow={commercial.ecoEyebrow} title={commercial.ecoTitle} text={commercial.ecoText}>
          <div className="mt-10">
            <PartnershipEcosystem copy={commercial} />
          </div>
        </Section>

        <Section id="jornada" eyebrow={commercial.growthEyebrow} title={commercial.growthTitle} text={commercial.growthText}>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {commercial.growthSteps.map((step, index) => (
              <li key={step} className="border border-white/10 px-4 py-4 text-sm leading-7 text-paper/80">
                <span className="mr-3 text-gold">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-6 text-paper/45">{commercial.growthNote}</p>
        </Section>

        <Section id="fluxo" eyebrow={commercial.flowEyebrow} title={commercial.flowTitle} text={commercial.flowText}>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {commercial.flowSteps.map((step) => (
              <li key={step.title} className="border border-white/10 px-4 py-4">
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/65">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-6 text-paper/45">{commercial.flowNote}</p>
        </Section>

        <Section eyebrow={copy.rewardsEyebrow} title={copy.rewardsTitle} text={copy.rewardsText}>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {copy.rewards.map((group) => (
              <div key={group.title}>
                <h3 className="font-serif text-2xl">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-paper/70">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-6 text-paper/45">{copy.rewardsNote}</p>
        </Section>

        <Section id="escritorios" eyebrow={copy.officesEyebrow} title={copy.officesTitle} text={copy.officesSubtitle}>
          <p className="mt-4 max-w-3xl text-base leading-8 text-paper/70">{copy.officesText}</p>
          <ul className="mt-6 grid gap-2 text-sm text-paper/75 md:grid-cols-2">
            {copy.officesItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-paper/45">{copy.officesNote}</p>
          <a href="#form-escritorio" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
            {copy.officesCta}
          </a>
          <PartnerForm
            id="form-escritorio"
            category="office"
            copy={copy}
            locale={locale}
            extra={["city", "experience", "structure", "investment", "proposal"]}
          />
        </Section>

        <Section id="elite-desk" eyebrow={copy.deskEyebrow} title={copy.deskTitle} text={copy.deskText}>
          <ul className="mt-6 grid gap-2 text-sm text-paper/75 md:grid-cols-2">
            {copy.deskAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-paper/60">{copy.deskMore}</p>
          <p className="mt-3 text-xs leading-6 text-paper/45">{copy.deskNote}</p>
          <a href="#form-analista" className="mt-6 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
            {copy.deskCta}
          </a>
          <PartnerForm
            id="form-analista"
            category="analyst"
            copy={copy}
            locale={locale}
            extra={["specialty", "history", "links", "presentation"]}
          />
        </Section>

        <Section eyebrow={copy.productsEyebrow} title={copy.productsTitle}>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {copy.products.map((product) => (
              <article key={product.title}>
                <h3 className="font-serif text-3xl">{product.title}</h3>
                <p className="mt-3 text-sm leading-7 text-paper/70">{product.text}</p>
                <a href={localizedPath(product.href, locale)} className="mt-5 inline-flex text-xs font-black uppercase tracking-[0.16em] text-gold">
                  {product.cta}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-paper/50">
            <a className="text-gold" href="/formiga">Formiga</a>
            {" · "}
            <a className="text-gold" href="/lobo">Lobo</a>
            {" · "}
            <a className="text-gold" href="/harpia">Harpia</a>
          </p>
        </Section>

        <Section eyebrow={copy.globalEyebrow} title={copy.globalTitle} text={copy.globalText}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {LANGUAGE_CATALOG.map((lang) => (
              <li key={lang.locale} className="border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-paper/70">
                {lang.nativeName}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="formularios" eyebrow={copy.pathsEyebrow} title={copy.pathsTitle}>
          <div className="mt-6 grid gap-12">
            <div>
              <h3 className="font-serif text-2xl">{copy.affiliateCta}</h3>
              <PartnerForm id="form-afiliado" category="affiliate" copy={copy} locale={locale} />
            </div>
            <div>
              <h3 className="font-serif text-2xl">{copy.leaderCta}</h3>
              <PartnerForm id="form-lider" category="leader" copy={copy} locale={locale} extra={["experience"]} />
            </div>
            <div>
              <h3 className="font-serif text-2xl">{copy.economicCta}</h3>
              <p className="mt-2 max-w-3xl text-xs leading-6 text-paper/45">{copy.economicNote}</p>
              <PartnerForm id="form-economico" category="economic" copy={copy} locale={locale} extra={["presentation"]} />
            </div>
          </div>
        </Section>

        <Section id="central" eyebrow={copy.centralEyebrow} title={copy.centralTitle} text={copy.centralText}>
          <a href="#form-afiliado" className="mt-8 inline-flex min-h-12 items-center justify-center border border-gold px-6 text-xs font-black uppercase tracking-[0.16em] text-gold">
            {copy.centralCta}
          </a>
          <p className="mt-4 max-w-2xl text-xs leading-6 text-paper/45">{copy.centralNote}</p>
        </Section>
      </main>
      <SupportFooter locale={locale} t={t} onLocaleChange={changeLocale} />
    </div>
  );
}
