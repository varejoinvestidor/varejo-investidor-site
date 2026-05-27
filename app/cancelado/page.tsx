export default function CanceledPage() {
  return (
    <main className="min-h-screen bg-paper px-5 py-24 text-ink md:px-8">
      <section className="mx-auto max-w-3xl border border-ink/[0.12] bg-white p-8 shadow-premium md:p-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-gold">Checkout cancelado</p>
        <h1 className="mt-5 font-serif text-5xl tracking-[-0.05em] md:text-6xl">Sua assinatura não foi concluída.</h1>
        <p className="mt-6 text-lg leading-8 text-ink/[0.68]">
          O checkout foi interrompido antes da confirmação. Você pode voltar aos pacotes do Canal Elite e escolher o plano
          ideal.
        </p>
        <a
          href="/sinais#elite-packages"
          className="mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
        >
          Ver pacotes Elite
        </a>
      </section>
    </main>
  );
}
