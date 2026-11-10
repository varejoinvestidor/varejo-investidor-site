/** Link direto ao SQL Editor do projeto (NEXT_PUBLIC_SUPABASE_URL). */
export function supabaseSqlEditorUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!base) return null;
  const ref = base.match(/https:\/\/([a-z0-9-]+)\.supabase\.co/i)?.[1];
  if (!ref) return null;
  return `https://supabase.com/dashboard/project/${ref}/sql/new`;
}
