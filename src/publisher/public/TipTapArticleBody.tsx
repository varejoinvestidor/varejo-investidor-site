import type { ReactNode } from "react";
import { YouTubeEmbedPlayer } from "../../components/publisher/YouTubeEmbedPlayer";
import { parseYouTubeVideoId } from "../editor/youtubeEmbed";

type TipTapMark = { type: string; attrs?: Record<string, unknown> };
type TipTapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  text?: string;
  marks?: TipTapMark[];
  content?: TipTapNode[];
};

const PARAGRAPH_CLASS = "text-lg leading-[1.85] text-paper/[0.76]";
const PROSE_STACK_CLASS = "insight-prose flex flex-col gap-7 md:gap-8";

/** Artigos colados como texto único ou com \\n\\n ficam com parágrafos separados na leitura. */
function normalizeDocForDisplay(root: TipTapNode): TipTapNode {
  if (!root.content?.length) return root;

  const expanded: TipTapNode[] = [];

  for (const node of root.content) {
    if (node.type !== "paragraph" || !node.content?.length) {
      expanded.push(node);
      continue;
    }

    const onlyText = node.content.every((c) => c.type === "text" && !c.marks?.length);
    if (onlyText && node.content.length === 1) {
      const text = node.content[0].text ?? "";
      if (text.includes("\n\n")) {
        for (const part of text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean)) {
          expanded.push({ type: "paragraph", content: [{ type: "text", text: part }] });
        }
        continue;
      }
    }

    expanded.push(node);
  }

  return { ...root, content: expanded };
}

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
    if (mark.type === "strike") el = <s key={`${key}-s`}>{el}</s>;
    if (mark.type === "code") {
      el = (
        <code key={`${key}-c`} className="rounded bg-paper/[0.06] px-1.5 py-0.5 font-mono text-[0.92em] text-paper/90">
          {el}
        </code>
      );
    }
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
        <p key={key} className={PARAGRAPH_CLASS}>
          {children}
        </p>
      );
    case "hardBreak":
      return <br key={key} />;
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
      return (
        <li key={key} className="leading-[1.85] [&>p]:m-0">
          {children}
        </li>
      );
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
      const raw = String(node.attrs?.src ?? "");
      const videoId = parseYouTubeVideoId(raw) ?? raw;
      if (!videoId) return null;
      return (
        <div key={key} className="aspect-video overflow-hidden border border-gold/[0.18]">
          <YouTubeEmbedPlayer videoId={videoId} unmuteLabel="Ativar som" />
        </div>
      );
    }
    default:
      return <div key={key}>{children}</div>;
  }
}

export function TipTapArticleBody({
  document,
  inlineSlot,
}: {
  document: Record<string, unknown>;
  /** Renderizado no meio do fluxo (metade dos blocos), ex.: banners “inline”. */
  inlineSlot?: ReactNode;
}) {
  const root = normalizeDocForDisplay(document as TipTapNode);
  if (!root.content?.length) return null;

  const nodes = root.content;
  if (!inlineSlot) {
    return (
      <div className={PROSE_STACK_CLASS}>
        {nodes.map((node, index) => renderNode(node, index))}
      </div>
    );
  }

  const splitAt = Math.max(1, Math.ceil(nodes.length / 2));

  return (
    <div className={PROSE_STACK_CLASS}>
      {nodes.slice(0, splitAt).map((node, index) => renderNode(node, index))}
      <div className="my-4">{inlineSlot}</div>
      {nodes.slice(splitAt).map((node, index) => renderNode(node, splitAt + index))}
    </div>
  );
}
