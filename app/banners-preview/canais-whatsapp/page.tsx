"use client";

import Link from "next/link";
import { useState } from "react";
import { EliteChannelBanner } from "../../../src/components/banners/EliteChannelBanner";
import { FormigaChannelBanner } from "../../../src/components/banners/FormigaChannelBanner";
import { LoboChannelBanner } from "../../../src/components/banners/LoboChannelBanner";
import { whatsappLandingLocales } from "../../../src/data/whatsappChannels";

export default function CanaisWhatsappBannersPreviewPage() {
  const [language, setLanguage] = useState("pt");

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-paper md:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="border-b border-white/10 pb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-rise">Modelo A</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Formiga, Lobo e Elite</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/60">
            Prévia por idioma com cópia e links oficiais do WhatsApp.
          </p>
          <label className="mt-6 flex flex-col gap-2 text-xs font-bold uppercase tracking-wider text-paper/50">
            Idioma
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="max-w-xs border border-white/15 bg-ink px-3 py-2 text-sm normal-case tracking-normal text-paper"
            >
              {whatsappLandingLocales.map((item) => (
                <option key={item.locale} value={item.locale}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <Link href="/" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-gold hover:underline">
            Voltar à home
          </Link>
        </header>

        <FormigaChannelBanner language={language} className="w-full" />
        <LoboChannelBanner language={language} className="w-full" />
        <EliteChannelBanner language={language} className="w-full" />
      </div>
    </main>
  );
}
