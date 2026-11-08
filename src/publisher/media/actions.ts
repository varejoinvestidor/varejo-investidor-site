"use server";

import { revalidatePath } from "next/cache";
import { getPublisherSession } from "../supabase/server";

export type MediaRow = {
  id: string;
  storage_path: string;
  file_name: string;
  mime_type: string;
  byte_size: number;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  folder: string;
  created_at: string;
};

export async function listMedia(q?: string) {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };

  let query = supabase.from("media").select("*").order("created_at", { ascending: false }).limit(60);
  if (q?.trim()) {
    query = query.ilike("file_name", `%${q.trim()}%`);
  }

  const { data, error } = await query;
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, data: (data ?? []) as MediaRow[] };
}

export async function uploadMedia(formData: FormData) {
  const { supabase, user, profile } = await getPublisherSession();
  if (!supabase || !user || !profile) return { ok: false as const, error: "Sessão inválida." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false as const, error: "Arquivo inválido." };

  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) return { ok: false as const, error: "Arquivo acima de 10 MB." };

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowed.includes(file.type)) return { ok: false as const, error: "Formato não permitido." };

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `uploads/${Date.now()}-${safeName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from("publisher-media").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) return { ok: false as const, error: uploadError.message };

  const { data: publicData } = supabase.storage.from("publisher-media").getPublicUrl(path);

  const { data: row, error: dbError } = await supabase
    .from("media")
    .insert({
      storage_path: path,
      file_name: file.name,
      mime_type: file.type,
      byte_size: file.size,
      alt_text: formData.get("alt")?.toString() ?? null,
      uploaded_by: user.id,
    })
    .select("id, storage_path")
    .single();

  if (dbError) return { ok: false as const, error: dbError.message };

  revalidatePath("/admin/midia");
  return { ok: true as const, data: { ...row, publicUrl: publicData.publicUrl } };
}
