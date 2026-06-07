import Link from "next/link";

const copy = {
  title: "金融ツール",
  text: "リスク計算と正しいロット選択のためのVarejo Investidorツール。",
  risk: "リスク計算機",
  lot: "正しいForexロット選択",
};

export default function ToolsPage() {
  return (
    <main className="page-content min-h-screen bg-black px-5 py-28 text-ink md:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Tools</p>
        <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.05em] md:text-7xl">{copy.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">{copy.text}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link href="/calculadora-de-risco" className="border border-gold/20 bg-ink/[0.03] p-6 text-lg font-black text-gold transition hover:border-gold/60">{copy.risk}</Link>
          <Link href="/ferramentas/lote-correto-forex" className="border border-gold/20 bg-ink/[0.03] p-6 text-lg font-black text-gold transition hover:border-gold/60">{copy.lot}</Link>
        </div>
      </section>
    </main>
  );
}
