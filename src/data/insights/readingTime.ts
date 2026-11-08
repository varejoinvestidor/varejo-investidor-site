const WORDS_PER_MINUTE = 210;

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function estimateReadingTimeMinutes(parts: string[], locale: string): string {
  const words = parts.reduce((total, part) => total + countWords(part), 0);
  const minutes = Math.max(4, Math.round(words / WORDS_PER_MINUTE));
  if (locale === "pt") return `${minutes} min de leitura`;
  if (locale === "es") return `${minutes} min de lectura`;
  return `${minutes} min read`;
}

export function collectArticlePlainText(article: {
  introduction: string;
  blocks: { type: string; text?: string; items?: string[] }[];
  content?: string[];
}): string[] {
  const fromBlocks = article.blocks.flatMap((block) => {
    if (block.type === "paragraph" || block.type === "quote" || block.type === "heading") {
      return block.text ? [block.text] : [];
    }
    if (block.type === "list" && block.items) return block.items;
    if (block.type === "persona" && "text" in block) return [(block as { text: string }).text];
    return [];
  });
  return [article.introduction, ...(article.content ?? []), ...fromBlocks];
}
