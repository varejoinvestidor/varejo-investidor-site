"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { trackVarejoClick } from "../SiteSections";

type Accent = "rise" | "gold";

type Props = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  language: string;
  trackEvent: string;
  accent?: Accent;
  imagePanelClass?: string;
  /** Cena cheia com vinheta — evita “recorte” com fundo transparente. */
  imageStyle?: "contain" | "scene";
  imageObjectPosition?: string;
  imageScale?: number;
  panelMinClass?: string;
  sceneGlow?: string;
  className?: string;
};

export function ChannelSplitBannerA({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  cta,
  href,
  language,
  trackEvent,
  accent = "rise",
  imagePanelClass = "bg-[#0a3d28]",
  imageStyle = "contain",
  imageObjectPosition = "center bottom",
  imageScale = 1.03,
  panelMinClass = "md:min-h-[300px]",
  sceneGlow = "rgba(198,153,74,0.16)",
  className = "",
}: Props) {
  const borderAccent = accent === "rise" ? "border-rise/28" : "border-gold/28";
  const btnClass =
    accent === "rise"
      ? "border-rise bg-rise shadow-[0_16px_40px_rgba(15,143,86,0.28)] hover:border-gold hover:bg-gold"
      : "border-gold bg-gold text-ink shadow-[0_16px_40px_rgba(198,153,74,0.22)] hover:border-rise hover:bg-rise hover:text-paper";
  const panelGradient =
    accent === "rise"
      ? "from-[#0f8f56]/20 via-ink to-ink"
      : "from-gold/[0.12] via-ink to-ink";
  const eyebrowColor = accent === "rise" ? "text-gold" : "text-gold";

  return (
    <article
      className={`grid overflow-hidden border ${borderAccent} bg-ink text-paper shadow-fine ${panelMinClass} md:grid-cols-[minmax(240px,44%)_1fr] ${className}`}
    >
      <div className={`relative min-h-[220px] overflow-hidden md:min-h-full ${imagePanelClass}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#060a12] to-black" aria-hidden="true" />
        {imageStyle === "scene" ? (
          <>
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: `radial-gradient(ellipse at 50% 90%, ${sceneGlow}, transparent 62%)`,
              }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-0 opacity-[0.12]"
              animate={{ opacity: [0.08, 0.16, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="absolute inset-0 terminal-grid opacity-[0.14]" aria-hidden="true" />
        )}
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 440px"
          className={imageStyle === "scene" ? "object-cover" : "object-contain object-bottom"}
          style={
            imageStyle === "scene"
              ? { objectPosition: imageObjectPosition, transform: `scale(${imageScale})`, transformOrigin: "center bottom" }
              : undefined
          }
        />
        {imageStyle === "scene" ? (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ink/55 to-transparent md:from-ink/35" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink to-transparent" aria-hidden="true" />
          </>
        ) : null}
      </div>
      <div className={`flex flex-col justify-center gap-4 bg-gradient-to-br ${panelGradient} px-6 py-8 md:gap-5 md:px-10 md:py-10`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${eyebrowColor}`}>{eyebrow}</p>
        <h3 className="font-serif text-3xl tracking-[-0.04em] md:text-[2.35rem]">{title}</h3>
        <p className="max-w-xl text-sm leading-7 text-paper/70 md:text-base">{subtitle}</p>
        <a
          href={href}
          {...(/^https?:\/\//i.test(href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : { rel: "noopener" })}
          data-vi-track={trackEvent}
          onClick={() => trackVarejoClick(trackEvent, { locale: language })}
          className={`inline-flex min-h-[48px] w-fit items-center justify-center border px-6 py-3.5 text-center text-[11px] font-black uppercase tracking-[0.18em] transition hover:-translate-y-0.5 md:px-8 md:text-xs ${btnClass} ${
            accent === "gold" ? "text-ink hover:text-paper" : "text-paper"
          }`}
        >
          {cta}
        </a>
      </div>
    </article>
  );
}
