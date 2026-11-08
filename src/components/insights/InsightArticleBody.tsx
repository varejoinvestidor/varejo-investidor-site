import type { InsightContentBlock } from "../../data/insights/types";

export function InsightArticleBody({ blocks, fallback }: { blocks: InsightContentBlock[]; fallback: string[] }) {
  if (!blocks.length) {
    return (
      <div className="insight-prose space-y-7">
        {fallback.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-lg leading-[1.85] text-paper/[0.76]">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="insight-prose space-y-8">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3";
          return (
            <Tag
              key={`${block.id}-${index}`}
              id={block.id}
              className={
                block.level === 2
                  ? "scroll-mt-28 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl"
                  : "scroll-mt-28 font-serif text-2xl tracking-[-0.035em] text-paper/[0.92]"
              }
            >
              {block.text}
            </Tag>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={`${index}-${block.text.slice(0, 24)}`} className="text-lg leading-[1.85] text-paper/[0.76]">
              {block.text}
            </p>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={`${index}-${block.text.slice(0, 24)}`}
              className="border-l-2 border-gold bg-paper/[0.04] px-6 py-5 font-serif text-xl leading-relaxed text-paper/[0.88]"
            >
              <p>{block.text}</p>
              {block.cite ? <footer className="mt-3 text-sm not-italic text-paper/[0.5]">— {block.cite}</footer> : null}
            </blockquote>
          );
        }
        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={`list-${index}`}
              className={`ml-5 space-y-3 text-lg leading-[1.8] text-paper/[0.74] ${block.ordered ? "list-decimal" : "list-disc"}`}
            >
              {block.items.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ListTag>
          );
        }
        if (block.type === "table") {
          return (
            <figure key={`table-${index}`} className="overflow-x-auto border border-gold/[0.2] bg-paper/[0.03]">
              {block.caption ? (
                <figcaption className="border-b border-gold/[0.14] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-gold">
                  {block.caption}
                </figcaption>
              ) : null}
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gold/[0.14] bg-paper/[0.04]">
                    {block.headers.map((header) => (
                      <th key={header} className="px-4 py-3 font-bold uppercase tracking-[0.12em] text-paper/[0.62]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gold/[0.08] last:border-0">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-4 py-3 leading-7 text-paper/[0.72]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          );
        }
        if (block.type === "figure") {
          return (
            <figure key={`fig-${index}`} className="border border-gold/[0.18] bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.src} alt={block.alt} className="h-auto w-full object-cover" />
              {block.caption ? (
                <figcaption className="border-t border-gold/[0.14] px-4 py-3 text-sm text-paper/[0.58]">{block.caption}</figcaption>
              ) : null}
            </figure>
          );
        }
        if (block.type === "persona") {
          const tone =
            block.persona === "formiga"
              ? "border-sky-300/[0.35] from-sky-950/40"
              : block.persona === "lobo"
                ? "border-gold/[0.45] from-gold/[0.12]"
                : "border-paper/[0.2] from-paper/[0.08]";
          return (
            <aside
              key={`${block.persona}-${index}`}
              className={`border bg-gradient-to-br to-transparent p-6 ${tone}`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">{block.title}</p>
              <p className="mt-4 leading-8 text-paper/[0.72]">{block.text}</p>
            </aside>
          );
        }
        return null;
      })}
    </div>
  );
}
