"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEffect, useRef, useState } from "react";
import { parseYouTubeVideoId, sanitizeTipTapForSave, youtubeEmbedSrc } from "./youtubeEmbed";
import { PublisherImage } from "./publisherImageExtension";
import { ARTICLE_INTERNAL_PAGES } from "./articleInternalPages";

type Props = {
  content: Record<string, unknown>;
  onChange: (json: Record<string, unknown>) => void;
  editable?: boolean;
};

function ToolbarButton({
  onClick,
  active,
  label,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide transition ${
        active ? "bg-gold/20 text-gold" : "text-paper/60 hover:bg-paper/5 hover:text-paper"
      }`}
    >
      {label}
    </button>
  );
}

export function PublisherRichTextEditor({ content, onChange, editable = true }: Props) {
  const syncingRef = useRef(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer nofollow" } }),
      PublisherImage,
      Placeholder.configure({ placeholder: "Comece o texto principal do artigo…" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        modestBranding: true,
        width: 640,
        height: 360,
        inline: false,
        allowFullscreen: true,
        controls: true,
        HTMLAttributes: { class: "w-full rounded-sm" },
      }),
      CharacterCount,
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          "publisher-editor prose-invert min-h-[320px] max-w-none px-4 py-4 focus:outline-none text-paper/85 leading-relaxed",
      },
    },
    onUpdate: ({ editor: ed }) => {
      if (!editable || syncingRef.current) return;
      const json = sanitizeTipTapForSave(ed.getJSON() as Record<string, unknown>);
      onChange(json);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const incoming = sanitizeTipTapForSave(content);
    const current = sanitizeTipTapForSave(editor.getJSON() as Record<string, unknown>);
    if (JSON.stringify(incoming) === JSON.stringify(current)) return;
    syncingRef.current = true;
    editor.commands.setContent(incoming, false);
    syncingRef.current = false;
  }, [content, editor]);

  if (!editor) {
    return <div className="h-64 animate-pulse rounded-lg bg-paper/5" />;
  }

  const imageActive = editor.isActive("image");

  return (
    <div className="overflow-hidden rounded-lg border border-line/15 bg-[#0a0a0a]">
      {editable ? (
        <div className="space-y-2 border-b border-line/10 px-2 py-2">
          <div className="flex flex-wrap gap-1">
            <ToolbarButton label="B" title="Negrito" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
            <ToolbarButton label="I" title="Itálico" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
            <ToolbarButton label="U" title="Sublinhado" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} />
            <ToolbarButton label="S" title="Riscado" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} />
            <ToolbarButton label="Code" title="Código inline" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} />
            <ToolbarButton label="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
            <ToolbarButton label="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
            <ToolbarButton label="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
            <ToolbarButton label="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
            <ToolbarButton label="1." active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
            <ToolbarButton label="Citação" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
            <ToolbarButton
              label="Esq"
              title="Alinhar à esquerda"
              active={editor.isActive({ textAlign: "left" })}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            />
            <ToolbarButton
              label="Centro"
              title="Centralizar"
              active={editor.isActive({ textAlign: "center" })}
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
            />
            <ToolbarButton
              label="Dir"
              title="Alinhar à direita"
              active={editor.isActive({ textAlign: "right" })}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            />
            <ToolbarButton
              label="Link"
              active={editor.isActive("link")}
              onClick={() => {
                const previous = editor.getAttributes("link").href as string | undefined;
                const url = window.prompt("URL", previous ?? "https://");
                if (url === null) return;
                if (!url) {
                  editor.chain().focus().extendMarkRange("link").unsetLink().run();
                  return;
                }
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
              }}
            />
            <ToolbarButton
              label="Imagem"
              onClick={() => {
                const url = window.prompt("URL da imagem (Storage ou CDN)");
                const alt = window.prompt("Texto alternativo (opcional)") ?? "";
                if (url) {
                  editor
                    .chain()
                    .focus()
                    .setImage({ alt, src: url })
                    .updateAttributes("image", { width: "100%", align: "center" })
                    .run();
                }
              }}
            />
            <ToolbarButton label="Tabela" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
            <ToolbarButton
              label="Vídeo"
              onClick={() => {
                const url = window.prompt(
                  "URL ou ID do YouTube\nFormato sugerido: https://www.youtube.com/watch?v=…",
                );
                if (!url?.trim()) return;
                const id = parseYouTubeVideoId(url);
                if (!id) {
                  window.alert("URL do YouTube inválida. Cole o link completo ou só o ID de 11 caracteres.");
                  return;
                }
                editor.chain().focus().setYoutubeVideo({ src: youtubeEmbedSrc(id) }).run();
              }}
            />
            <ToolbarButton label="—" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
            <ToolbarButton label="Limpar" title="Remover formatação" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} />
            <div className="relative">
              <ToolbarButton label="Página" title="Inserir link para página do site" onClick={() => setPagesOpen((o) => !o)} />
              {pagesOpen ? (
                <PagesListPicker
                  onPick={(href, label) => {
                    setPagesOpen(false);
                    const text = window.prompt(`Texto do link para ${label}`, label) ?? label;
                    editor
                      .chain()
                      .focus()
                      .insertContent({
                        type: "text",
                        text: `${text} `,
                        marks: [{ type: "link", attrs: { href } }],
                      })
                      .run();
                  }}
                  onClose={() => setPagesOpen(false)}
                />
              ) : null}
            </div>
          </div>
          {imageActive ? (
            <div className="flex flex-wrap items-center gap-2 rounded border border-gold/25 bg-gold/5 px-2 py-1.5">
              <span className="text-[10px] font-bold uppercase text-gold/80">Imagem selecionada</span>
              {(["40%", "60%", "80%", "100%"] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  className="rounded border border-line/20 px-2 py-0.5 text-[10px] text-paper/70 hover:border-gold/40"
                  onClick={() => editor.chain().focus().updateAttributes("image", { width: w }).run()}
                >
                  {w}
                </button>
              ))}
              <button
                type="button"
                className="rounded border border-line/20 px-2 py-0.5 text-[10px] text-paper/70 hover:border-gold/40"
                onClick={() => editor.chain().focus().updateAttributes("image", { align: "left" }).run()}
              >
                Esq
              </button>
              <button
                type="button"
                className="rounded border border-line/20 px-2 py-0.5 text-[10px] text-paper/70 hover:border-gold/40"
                onClick={() => editor.chain().focus().updateAttributes("image", { align: "center" }).run()}
              >
                Centro
              </button>
              <button
                type="button"
                className="rounded border border-line/20 px-2 py-0.5 text-[10px] text-paper/70 hover:border-gold/40"
                onClick={() => editor.chain().focus().updateAttributes("image", { align: "right" }).run()}
              >
                Dir
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <EditorContent editor={editor} />
      {editable ? (
        <p className="border-t border-line/10 px-4 py-2 text-xs text-paper/40">
          {editor.storage.characterCount.characters()} caracteres
        </p>
      ) : null}
    </div>
  );
}

function PagesListPicker({
  onPick,
  onClose,
}: {
  onPick: (href: string, label: string) => void;
  onClose: () => void;
}) {
  return (
  <div className="absolute left-0 top-full z-30 mt-1 max-h-56 w-56 overflow-y-auto rounded border border-line/20 bg-ink shadow-lg">
    {ARTICLE_INTERNAL_PAGES.map((page) => (
      <button
        key={page.href}
        type="button"
        className="block w-full border-b border-line/10 px-3 py-2 text-left text-[11px] text-paper/75 hover:bg-gold/10 hover:text-gold"
        onClick={() => onPick(page.href, page.label)}
      >
        {page.label}
        <span className="mt-0.5 block font-mono text-[9px] text-paper/35">{page.href}</span>
      </button>
    ))}
    <button type="button" className="w-full px-3 py-2 text-[10px] text-paper/45 hover:text-paper" onClick={onClose}>
      Fechar
    </button>
  </div>
  );
}
