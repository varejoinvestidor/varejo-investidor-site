import type { ReactNode } from "react";

type TipTapMark = { type: string; attrs?: Record<string, unknown> };
type TipTapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  text?: string;
  marks?: TipTapMark[];
  content?: TipTapNode[];
};

function safeUrl(raw: string | undefined) {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

function renderText(node: TipTapNode, key: string): ReactNode {
  let el: ReactNode = node.text ?? "";
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") el = <strong key={`${key}-b`}>{el}</strong>;
    if (mark.type === "italic") el = <em key={`${key}-i`}>{el}</em>;
    if (mark.type === "link") {
      const href = safeUrl(mark.attrs?.href as string | undefined);
      if (href) {
        el = (
          <a key={`${key}-l`} href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-gold underline-offset-4 hover:underline">
            {el}
          </a>
        );
      }
    }
  }
  return <>{el}</>;
}

function renderNode(node: TipTapNode, index: number): ReactNode {
  const key = `${node.type}-${index}`;

  if (node.type === "text") return <span key={key}>{renderText(node, key)}</span>;

  const children = node.content?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "doc":
      return (
        <div key={key} className="space-y-8">
          {children}
        </div>
      );
    case "paragraph":
      return (
        <p key={key} className="text-lg leading-[1.85] text-paper/[0.76]">
          {children}
        </p>
      );
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      if (level === 1) {
        return (
          <h2 key={key} className="font-serif text-4xl tracking-[-0.04em] text-paper">
            {children}
          </h2>
        );
      }
      if (level === 3) {
        return (
          <h3 key={key} className="font-serif text-2xl tracking-[-0.035em] text-paper/[0.92]">
            {children}
          </h3>
        );
      }
      return (
        <h2 key={key} className="scroll-mt-28 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">
          {children}
        </h2>
      );
    }
    case "bulletList":
      return (
        <ul key={key} className="list-disc space-y-2 pl-6 text-lg text-paper/[0.76]">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={key} className="list-decimal space-y-2 pl-6 text-lg text-paper/[0.76]">
          {children}
        </ol>
      );
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return (
        <blockquote key={key} className="border-l-2 border-gold/50 pl-5 text-lg italic text-paper/[0.65]">
          {children}
        </blockquote>
      );
    case "horizontalRule":
      return <hr key={key} className="border-gold/[0.14]" />;
    case "image": {
      const src = safeUrl(node.attrs?.src as string | undefined);
      if (!src) return null;
      const alt = String(node.attrs?.alt ?? "");
      return (
        <figure key={key} className="overflow-hidden border border-gold/[0.18]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full object-cover" loading="lazy" />
          {node.attrs?.title ? (
            <figcaption className="border-t border-gold/[0.14] px-4 py-2 text-sm text-paper/[0.55]">{String(node.attrs.title)}</figcaption>
          ) : null}
        </figure>
      );
    }
    case "table":
      return (
        <div key={key} className="overflow-x-auto">
          <table className="w-full border-collapse text-sm text-paper/80">
            <tbody>{children}</tbody>
          </table>
        </div>
      );
    case "tableRow":
      return <tr key={key}>{children}</tr>;
    case "tableHeader":
      return (
        <th key={key} className="border border-gold/[0.18] bg-paper/[0.04] px-3 py-2 text-left font-semibold">
          {children}
        </th>
      );
    case "tableCell":
      return (
        <td key={key} className="border border-gold/[0.14] px-3 py-2 align-top">
          {children}
        </td>
      );
    case "youtube": {
      const src = safeUrl(node.attrs?.src as string | undefined);
      if (!src) return null;
      return (
        <div key={key} className="aspect-video overflow-hidden border border-gold/[0.18]">
          <iframe
            title="Vídeo incorporado"
            src={src}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      );
    }
    default:
      return <div key={key}>{children}</div>;
  }
}

export function TipTapArticleBody({ document }: { document: Record<string, unknown> }) {
  const root = document as TipTapNode;
  if (!root.content?.length) return null;
  return <div className="insight-prose">{root.content.map((node, index) => renderNode(node, index))}</div>;
}
