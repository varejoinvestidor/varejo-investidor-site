"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  subtitle?: string;
  href?: string;
  className?: string;
};

export function AdminBrand({ subtitle = "VI Publisher", href = "/admin", className = "" }: Props) {
  const content = (
    <>
      <Image
        src="/characters/hero-official-transparent.png"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 object-contain"
        priority
      />
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">Varejo Investidor</p>
        {subtitle ? <p className="mt-1 font-serif text-xl tracking-tight text-paper">{subtitle}</p> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`flex items-center gap-3 ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`flex items-center gap-3 ${className}`}>{content}</div>;
}
