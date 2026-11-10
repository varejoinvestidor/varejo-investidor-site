function resolveAnonKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() && resolveAnonKey());
}

export function requireSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return url;
}

export function requireSupabaseAnonKey() {
  const key = resolveAnonKey();
  if (!key) throw new Error("Supabase anon/publishable key is not set");
  return key;
}

export function getSiteTimezone() {
  return process.env.PUBLISHER_SITE_TIMEZONE ?? "America/Sao_Paulo";
}
