type Props = {
  title: string;
  phase: string;
  description: string;
};

export function AdminPlaceholder({ title, phase, description }: Props) {
  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-line/15 bg-paper/[0.02] p-8 shadow-premium">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{phase}</p>
      <h2 className="mt-3 font-serif text-3xl tracking-tight text-paper">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-paper/65">{description}</p>
    </div>
  );
}
