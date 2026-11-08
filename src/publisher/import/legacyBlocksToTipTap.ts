import type { InsightContentBlock } from "../../data/insights/types";
import { absoluteSiteUrl } from "../../config/site";

type TipTapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  text?: string;
  content?: TipTapNode[];
};

function textNode(text: string): TipTapNode {
  return { type: "text", text };
}

function paragraph(text: string): TipTapNode {
  return { type: "paragraph", content: [textNode(text)] };
}

export function legacyBlocksToTipTap(blocks: InsightContentBlock[], introduction?: string) {
  const content: TipTapNode[] = [];

  if (introduction?.trim()) {
    content.push(paragraph(introduction.trim()));
  }

  for (const block of blocks) {
    if (block.type === "paragraph") {
      content.push(paragraph(block.text));
    } else if (block.type === "heading") {
      content.push({
        type: "heading",
        attrs: { level: block.level === 3 ? 3 : 2 },
        content: [textNode(block.text)],
      });
    } else if (block.type === "quote") {
      content.push({
        type: "blockquote",
        content: [paragraph(block.text)],
      });
    } else if (block.type === "list") {
      const listType = block.ordered ? "orderedList" : "bulletList";
      content.push({
        type: listType,
        content: block.items.map((item) => ({
          type: "listItem",
          content: [paragraph(item)],
        })),
      });
    } else if (block.type === "figure") {
      const src = block.src.startsWith("/") ? absoluteSiteUrl(block.src) : block.src;
      content.push({
        type: "image",
        attrs: { src, alt: block.alt, title: block.caption ?? null },
      });
      if (block.caption) content.push(paragraph(block.caption));
    } else if (block.type === "persona") {
      content.push({
        type: "blockquote",
        content: [paragraph(`${block.title}: ${block.text}`)],
      });
    } else if (block.type === "table") {
      const rows: TipTapNode[] = [];
      const headerRow: TipTapNode = {
        type: "tableRow",
        content: block.headers.map((h) => ({
          type: "tableHeader",
          content: [paragraph(h)],
        })),
      };
      rows.push(headerRow);
      for (const row of block.rows) {
        rows.push({
          type: "tableRow",
          content: row.map((cell) => ({
            type: "tableCell",
            content: [paragraph(cell)],
          })),
        });
      }
      content.push({ type: "table", content: rows });
    }
  }

  return { type: "doc", content: content.length ? content : [{ type: "paragraph" }] };
}

export const LEGACY_CATEGORY_TO_PUBLISHER_SLUG: Record<string, string> = {
  "global-economy": "economia-global",
  "monetary-policy": "bancos-centrais",
  forex: "mercados-financeiros",
  stocks: "renda-variavel",
  crypto: "criptomoedas",
  "gold-metals": "commodities",
  "oil-energy": "commodities",
  etfs: "mercados-financeiros",
  geopolitics: "geopolitica",
  risk: "estrategias-investimento",
  wealth: "educacao-financeira",
};
