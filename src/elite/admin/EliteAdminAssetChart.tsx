"use client";

type Slice = { label: string; value: number; color: string };

export function EliteAdminAssetChart({ data }: { data: Slice[] }) {
  const total = data.reduce((s, x) => s + x.value, 0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (!total) {
    return <p className="text-sm text-paper/45">Sem operações para distribuição por ativo.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(150px,200px)_1fr] md:items-center">
      <svg viewBox="0 0 160 160" className="mx-auto h-44 w-44">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="16" />
        {data.map((slice) => {
          const length = (slice.value / total) * circumference;
          const node = (
            <circle
              key={slice.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth="16"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
              strokeLinecap="round"
            />
          );
          offset += length;
          return node;
        })}
        <text x="80" y="76" textAnchor="middle" fill="#c6994a" fontSize="20" fontWeight="700">
          {total}
        </text>
        <text x="80" y="94" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9">
          sinais
        </text>
      </svg>
      <ul className="grid gap-2">
        {data.map((item) => {
          const pct = Math.round((item.value / total) * 100);
          return (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 border-b border-white/6 pb-2 last:border-0"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-paper/85">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.label}
              </span>
              <span className="font-mono text-sm font-black tabular-nums">
                <span className="text-paper">{item.value}</span>
                <span className="mx-1.5 text-paper/35">·</span>
                <span className="text-paper/55">{pct}%</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
