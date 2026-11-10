import type { EliteSignalTier } from "../../elite/signalTier";
import { publicPriceVisible } from "../../elite/signalTier";

function EliteBadge() {
  return (
    <span className="inline-flex min-w-[82px] items-center justify-center border border-gold/[0.45] bg-gold/[0.12] px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-gold shadow-[0_0_24px_rgba(201,155,62,0.12)]">
      ELITE
    </span>
  );
}

function TierBadge({ tier }: { tier: EliteSignalTier }) {
  if (tier === "free") {
    return (
      <span className="inline-flex items-center justify-center border border-rise/40 bg-rise/15 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-rise">
        Free
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center border border-gold/40 bg-gold/10 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-gold">
      Elite
    </span>
  );
}

export function SignalLevelRows({
  tier,
  labels,
  entryPrice,
  takePrice,
  stopPrice,
  formatLevel,
}: {
  tier: EliteSignalTier;
  labels: { sectionTitle: string; sectionTitleFree: string; entry: string; target: string; stop: string };
  entryPrice: number | null | undefined;
  takePrice: number | null | undefined;
  stopPrice: number | null | undefined;
  formatLevel: (value: number | null | undefined) => string | null;
}) {
  const rows = [
    { label: labels.entry, field: "entry" as const, price: entryPrice },
    { label: labels.target, field: "take" as const, price: takePrice },
    { label: labels.stop, field: "stop" as const, price: stopPrice },
  ];

  return (
    <div className="mt-2 border-t border-gold/16 pt-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">
          {tier === "free" ? labels.sectionTitleFree : labels.sectionTitle}
        </p>
        <TierBadge tier={tier} />
      </div>
      {rows.map(({ label, field, price }) => {
        const visible = publicPriceVisible(tier, field);
        const formatted = visible ? formatLevel(price) : null;
        return (
          <div key={label} className="flex items-center justify-between gap-4 border-t border-white/8 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/48">{label}</span>
            {formatted ? (
              <span className="font-mono text-sm font-bold text-paper">{formatted}</span>
            ) : visible ? (
              <span className="font-mono text-sm text-paper/35">—</span>
            ) : (
              <EliteBadge />
            )}
          </div>
        );
      })}
    </div>
  );
}
