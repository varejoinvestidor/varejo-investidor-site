function isUsablePostgresUrl(url?: string | null): url is string {
  const value = url?.trim();
  if (!value) return false;
  if (value.includes("[SENSITIVE]") || /placeholder|changeme/i.test(value)) return false;
  try {
    const normalized = value.replace(/^postgresql:/, "postgres:");
    const parsed = new URL(normalized);
    const host = parsed.hostname?.toLowerCase() ?? "";
    if (!host || host === "base") return false;
    return true;
  } catch {
    return false;
  }
}

/** Monta URI a partir das variáveis que a integração Supabase/Vercel costuma expor. */
export function resolvePostgresConnectionString(): string | null {
  const ordered = [
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.SUPABASE_DB_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_PRISMA_URL,
  ];
  for (const candidate of ordered) {
    if (isUsablePostgresUrl(candidate)) return candidate.trim();
  }

  const host = process.env.POSTGRES_HOST?.trim();
  const user = process.env.POSTGRES_USER?.trim();
  const password = process.env.POSTGRES_PASSWORD?.trim();
  const database = process.env.POSTGRES_DATABASE?.trim();
  if (!host || !user || !password || !database) return null;
  if (host === "base" || password.includes("[SENSITIVE]")) return null;

  const port = process.env.POSTGRES_PORT?.trim() || "5432";
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}?sslmode=require`;
}

export function postgresConnectionHint(): string {
  return "Defina POSTGRES_URL_NON_POOLING (Supabase → Settings → Database → Connection string, modo Direct) na Vercel, ou cole o SQL em Supabase → SQL Editor.";
}
