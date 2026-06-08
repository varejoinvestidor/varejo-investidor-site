import Link from "next/link";

const copy = {
  title: "금융 도구",
  text: "리스크 계산과 올바른 Forex 로트 선택을 위한 Varejo Investidor 도구입니다.",
  risk: "리스크 계산기",
  lot: "올바른 Forex 로트 선택",
};

export default function ToolsPage() {
  return (
    <main className="page-content min-h-screen bg-black px-5 py-28 text-ink md:px-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Tools</p>
        <h1 className="mt-5 font-serif text-5xl leading-none tracking-[-0.05em] md:text-7xl">{copy.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">{copy.text}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link href="/ferramentas/calculadora-forex" className="border border-gold/20 bg-ink/[0.03] p-6 text-lg font-black text-gold transition hover:border-gold/60">Forex Calculator</Link>
        </div>
      </section>
    </main>
  );
}
