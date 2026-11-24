import { canAccessPartnership, canAccessPartnershipRestricted } from "../publisher/permissions";
import { createPublisherServiceClient } from "../publisher/supabase/service";
import { getPublisherSession } from "../publisher/supabase/server";

export async function partnershipDb(restricted = false) {
  const { user, profile } = await getPublisherSession();
  if (!user || !profile || !canAccessPartnership(profile.role)) {
    return { error: "Sem permissão para o Partnership.", profile: null, db: null };
  }
  if (restricted && !canAccessPartnershipRestricted(profile.role)) {
    return { error: "Acesso restrito à direção.", profile, db: null };
  }
  const db = createPublisherServiceClient();
  if (!db) return { error: "Supabase não configurado.", profile, db: null };
  return { error: null as string | null, profile, db };
}

export async function countRows(table: string, column = "id") {
  const { db, error } = await partnershipDb();
  if (!db) return { error, count: null as number | null };
  const { count, error: queryError } = await db.from(table).select(column, { count: "exact", head: true });
  if (queryError) return { error: queryError.message, count: null };
  return { error: null, count: count ?? 0 };
}

export async function listRows(table: string, limit = 80) {
  const { db, error } = await partnershipDb();
  if (!db) return { error, rows: [] as Record<string, unknown>[] };
  const { data, error: queryError } = await db.from(table).select("*").order("created_at", { ascending: false }).limit(limit);
  if (queryError) return { error: queryError.message, rows: [] as Record<string, unknown>[] };
  return { error: null, rows: (data ?? []) as Record<string, unknown>[] };
}

export function pending(label: string) {
  return { label, value: "Pendente de conexão", pending: true };
}
