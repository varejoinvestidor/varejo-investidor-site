import type { EliteSignalTier } from "../../elite/signalTier";
import { publicPriceVisible } from "../../elite/signalTier";

function eliteSealClassName(extra?: string) {
  return `inline-flex min-w-[88px] items-center justify-center rounded-md border border-gold/50 bg-gradient-to-b from-gold/22 to-gold/[0.06] px-3 py-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gold shadow-[0_8px_32px_rgba(198,153,74,0.18),inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:border-gold hover:from-gold/30 hover:to-gold/10 hover:shadow-[0_12px_40px_rgba(198,153,74,0.28)] active:scale-[0.98] ${extra ?? ""}`;
}

function EliteSeal({ checkoutHref }: { checkoutHref?: string }) {
  if (checkoutHref) {
    return (
      <a
        href={checkoutHref}
        target="_blank"
        rel="noopener noreferrer"
        className={eliteSealClassName("min-h-[var(--vi-touch-min,2.75rem)]")}
        aria-label="Assinar Canal Elite"
      >
        Elite
      </a>
    );
  }
  return <span className={eliteSealClassName()}>Elite</span>;
}

function TierBadge({ tier, checkoutHref }: { tier: EliteSignalTier; checkoutHref?: string }) {
  if (tier === "free") {
    return (
      <span className="inline-flex items-center justify-center rounded-sm border border-rise/35 bg-rise/10 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-rise">
        Free
      </span>
    );
  }
  const eliteBadgeClass =
    "inline-flex items-center justify-center rounded-md border border-gold/45 bg-gold/[0.12] px-2.5 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gold shadow-[0_0_20px_rgba(198,153,74,0.15)] transition hover:border-gold hover:bg-gold/[0.18]";
  if (checkoutHref) {
    return (
      <a href={checkoutHref} target="_blank" rel="noopener noreferrer" className={eliteBadgeClass} aria-label="Assinar Canal Elite">
        Elite
      </a>
    );
  }
  return <span className={eliteBadgeClass}>Elite</span>;
}

export function signalCardShellClass(tier: EliteSignalTier): string {
  if (tier === "free") {
    return "border border-rise/22 bg-gradient-to-b from-rise/[0.06] to-black/50 shadow-[0_12px_48px_rgba(15,143,86,0.08)]";
  }
  return "border border-gold/38 bg-gradient-to-b from-gold/[0.12] via-black/55 to-black/80 shadow-[0_0_72px_rgba(198,153,74,0.14),inset_0_1px_0_rgba(198,153,74,0.12)]";
}

export function SignalLevelRows({
  tier,
  labels,
  entryPrice,
  takePrice,
  stopPrice,
  formatLevel,
  checkoutHref,
}: {
  tier: EliteSignalTier;
  labels: { sectionTitle: string; sectionTitleFree: string; entry: string; target: string; stop: string };
  entryPrice: number | null | undefined;
  takePrice: number | null | undefined;
  stopPrice: number | null | undefined;
  formatLevel: (value: number | null | undefined) => string | null;
  checkoutHref?: string;
}) {
  const isElite = tier === "elite";
  const rows = [
    { label: labels.entry, field: "entry" as const, price: entryPrice },
    { label: labels.target, field: "take" as const, price: takePrice },
    { label: labels.stop, field: "stop" as const, price: stopPrice },
  ];

  return (
    <div
      className={`mt-1 rounded-md pt-4 ${
        isElite ? "border border-gold/14 bg-gradient-to-b from-gold/[0.05] to-black/30" : "border border-white/[0.06] bg-black/20"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <p className={`text-[10px] font-black uppercase tracking-[0.22em] ${isElite ? "text-gold" : "text-rise/90"}`}>
          {tier === "free" ? labels.sectionTitleFree : labels.sectionTitle}
        </p>
        <TierBadge tier={tier} checkoutHref={isElite ? checkoutHref : undefined} />
      </div>
      <div className="px-1 pb-1">
        {rows.map(({ label, field, price }, index) => {
          const visible = publicPriceVisible(tier, field);
          const formatted = visible ? formatLevel(price) : null;
          const rowBorder = index === 0 ? "" : "border-t border-white/[0.04]";
          return (
            <div key={label} className={`flex items-center justify-between gap-4 py-3 ${rowBorder}`}>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/42">{label}</span>
              {formatted ? (
                <span className={`font-mono text-sm font-bold tabular-nums ${isElite && field === "entry" ? "text-gold" : "text-paper"}`}>
                  {formatted}
                </span>
              ) : visible ? (
                <span className="font-mono text-sm text-paper/35">—</span>
              ) : (
                <EliteSeal checkoutHref={checkoutHref} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
