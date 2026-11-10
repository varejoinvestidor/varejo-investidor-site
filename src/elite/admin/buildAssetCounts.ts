import type { EliteOperationRow } from "../types";

const COLORS = ["#c6994a", "#16a34a", "#3b82f6", "#ef4444", "#8b5cf6", "#f97316", "#14b8a6", "#94a3b8"];

export function buildAssetCounts(ops: EliteOperationRow[], publicOnly = true) {
  const source = publicOnly ? ops.filter((o) => o.show_public) : ops;
  const map = new Map<string, number>();
  for (const op of source) {
    map.set(op.asset, (map.get(op.asset) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, value], index) => ({
      label,
      value,
      color: COLORS[index % COLORS.length],
    }));
}
