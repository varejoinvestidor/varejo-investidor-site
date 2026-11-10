"use client";

import Image from "next/image";
import { useState } from "react";
import type { InstitutionBrand } from "../../data/institutionBrands";
import { institutionLogoUrl } from "../../data/institutionBrands";

export function InstitutionLogoCard({ brand }: { brand: InstitutionBrand }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div
      role="img"
      aria-label={brand.name}
      className="group flex min-h-[76px] flex-col items-center justify-center gap-2 border border-gold/[0.12] bg-paper/[0.025] px-3 py-4 text-center shadow-fine transition duration-300 hover:-translate-y-0.5 hover:border-gold/[0.45] hover:bg-gold/[0.06]"
    >
      {!logoFailed ? (
        <Image
          src={institutionLogoUrl(brand.domain)}
          alt=""
          width={120}
          height={32}
          className="h-7 w-auto max-w-[7.5rem] object-contain opacity-90 brightness-110 contrast-110 transition group-hover:opacity-100"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-gold/[0.12] font-mono text-[10px] font-bold tracking-wider text-gold"
          aria-hidden
        >
          {brand.monogram}
        </span>
      )}
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-paper/[0.52] transition group-hover:text-gold/90">
        {brand.name}
      </span>
    </div>
  );
}
