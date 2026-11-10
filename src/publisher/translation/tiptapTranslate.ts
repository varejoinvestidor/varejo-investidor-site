import { translateText, langPairForTarget } from "./mymemory";

type TipTapNode = {
  type: string;
  text?: string;
  content?: TipTapNode[];
};

export async function translateTipTapDocument(
  doc: Record<string, unknown>,
  sourceLang: string,
  targetLang: string,
): Promise<Record<string, unknown>> {
  if (sourceLang === targetLang) return doc;
  const langpair = langPairForTarget(targetLang, sourceLang);
  const clone = JSON.parse(JSON.stringify(doc)) as TipTapNode;

  async function walk(node: TipTapNode) {
    if (node.type === "text" && node.text?.trim()) {
      node.text = await translateText(node.text, langpair);
    }
    for (const child of node.content ?? []) {
      await walk(child);
    }
  }

  await walk(clone);
  return clone as Record<string, unknown>;
}
