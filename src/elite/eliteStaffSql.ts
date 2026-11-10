/** Função + políticas RLS do Elite (não depende de `is_publisher_staff`). */
export const ELITE_STAFF_FUNCTION_SQL = `
create or replace function public.is_elite_editor ()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid ()
      and role in ('admin', 'editor')
  );
$$;

grant execute on function public.is_elite_editor () to authenticated;
`;

export const ELITE_TABLE_GRANTS_SQL = `
grant select on public.elite_monthly_reports to anon, authenticated;
grant select on public.elite_operations to anon, authenticated;
grant insert, update, delete on table public.elite_monthly_reports to authenticated;
grant insert, update, delete on table public.elite_operations to authenticated;
`;
