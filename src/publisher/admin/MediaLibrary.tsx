"use client";

import { FormEvent, useState } from "react";
import { uploadMedia, type MediaRow } from "../media/actions";
function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

export function MediaLibrary({ items }: { items: MediaRow[] }) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  async function onUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setUploading(true);
    const formData = new FormData(event.currentTarget);
    const result = await uploadMedia(formData);
    setUploading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    event.currentTarget.reset();
    window.location.reload();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onUpload} className="rounded-xl border border-line/12 p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Upload</h3>
        <input type="file" name="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" required />
        <input
          name="alt"
          placeholder="Texto alternativo"
          className="w-full max-w-md rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={uploading}
          className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase text-ink disabled:opacity-50"
        >
          {uploading ? "Enviando…" : "Enviar"}
        </button>
        {error ? <p className="text-sm text-fall">{error}</p> : null}
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const url = `${baseUrl}/storage/v1/object/public/publisher-media/${item.storage_path}`;
          return (
            <div key={item.id} className="overflow-hidden rounded-lg border border-line/12 bg-paper/[0.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={item.alt_text ?? item.file_name} className="aspect-video w-full object-cover" />
              <div className="space-y-1 p-3 text-xs text-paper/60">
                <p className="truncate font-medium text-paper/80">{item.file_name}</p>
                <p>{formatBytes(item.byte_size)}</p>
                <input
                  readOnly
                  value={url}
                  className="w-full rounded border border-line/10 bg-[#0a0a0a] px-2 py-1 text-[10px] text-paper/50"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
