import type { Metadata } from "next";
import Link from "next/link";
import { FormigaChannelBanner } from "../../../src/components/banners/FormigaChannelBanner";
export const metadata: Metadata = {
  title: "Banner Canal Formiga (aprovado) | Varejo Investidor",
  robots: { index: false, follow: false },
};

export default function CanalFormigaBannerPreviewPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-4 py-12 text-paper md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="border-b border-white/10 pb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-rise">Aprovado · Modelo A</p>
          <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Canal Formiga · split editorial</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/60">
            Ativo na home, artigos (preset Canal Formiga) e prévia do publisher. B e C mantidos apenas como referência de
            design anterior.
          </p>
          <Link href="/" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-gold hover:underline">
            Ver na home
          </Link>
        </header>

        <FormigaChannelBanner language="pt" />
      </div>
    </main>
  );
}
