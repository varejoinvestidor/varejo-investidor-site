"use client";

import { FormEvent, useState } from "react";
import { createTag, type TagRow } from "../taxonomy/actions";

export function TagsManager({ initial }: { initial: TagRow[] }) {
  const [tags, setTags] = useState(initial);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const result = await createTag(name);
    if (!result.ok) {
      setError(result.error ?? "Erro ao criar tag.");
      return;
    }
    setName("");
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onCreate} className="flex flex-wrap gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nova tag"
          className="rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm"
          required
        />
        <button type="submit" className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase text-ink">
          Adicionar
        </button>
      </form>
      {error ? <p className="text-sm text-fall">{error}</p> : null}
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.id} className="rounded-full border border-line/20 px-3 py-1 text-sm text-paper/70">
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
