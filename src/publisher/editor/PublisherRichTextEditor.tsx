"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from "@tiptap/extension-youtube";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect } from "react";

type Props = {
  content: Record<string, unknown>;
  onChange: (json: Record<string, unknown>) => void;
  editable?: boolean;
};

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
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
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer nofollow" } }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: "Comece o texto principal do artigo…" }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ modestBranding: true }),
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
      onChange(ed.getJSON() as Record<string, unknown>);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = JSON.stringify(editor.getJSON());
    const incoming = JSON.stringify(content);
    if (incoming !== current) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="h-64 animate-pulse rounded-lg bg-paper/5" />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line/15 bg-[#0a0a0a]">
      {editable ? (
        <div className="flex flex-wrap gap-1 border-b border-line/10 px-2 py-2">
          <ToolbarButton label="B" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} />
          <ToolbarButton label="I" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} />
          <ToolbarButton label="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
          <ToolbarButton label="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
          <ToolbarButton label="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
          <ToolbarButton label="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} />
          <ToolbarButton label="1." active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
          <ToolbarButton label="Citação" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
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
              if (url) editor.chain().focus().setImage({ alt: "", src: url }).run();
            }}
          />
          <ToolbarButton label="Tabela" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
          <ToolbarButton
            label="Vídeo"
            onClick={() => {
              const url = window.prompt("URL do YouTube");
              if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }}
          />
          <ToolbarButton label="—" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
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
