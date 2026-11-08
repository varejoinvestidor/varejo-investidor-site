type TipTapNode = {
  type?: string;
  text?: string;
  content?: TipTapNode[];
};

export function collectTipTapPlainText(doc: Record<string, unknown>): string[] {
  const root = doc as TipTapNode;
  const chunks: string[] = [];

  function walk(node: TipTapNode) {
    if (node.text) chunks.push(node.text);
    node.content?.forEach(walk);
  }

  walk(root);
  return chunks;
}

export function estimateReadingTimeMinutes(doc: Record<string, unknown>) {
  const words = collectTipTapPlainText(doc).join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
