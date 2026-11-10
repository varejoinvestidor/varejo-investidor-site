-- Relatório Elite + incrementos VI Publisher
-- Supabase SQL Editor: selecione tudo → Run (idempotente).
alter table public.articles
add column if not exists banners jsonb not null default '[]'::jsonb;

alter table public.articles
  add column if not exists youtube_horizontal text,
  add column if not exists youtube_vertical text,
  add column if not exists video_primary text not null default 'horizontal'
    check (video_primary in ('horizontal', 'vertical'));


-- Relatório Elite: operações e consolidados mensais (admin VI Publisher)

create table if not exists public.elite_monthly_reports (
  id uuid primary key default gen_random_uuid (),
  year int not null,
  month_index int not null check (month_index between 0 and 11),
  month_label text not null,
  signals int not null default 0,
  pips int not null default 0,
  result_label text not null default '',
  status_label text not null default 'Disponível',
  assets text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (year, month_index)
);

create table if not exists public.elite_operations (
  id uuid primary key default gen_random_uuid (),
  asset text not null,
  direction text not null check (direction in ('Compra', 'Venda')),
  status text not null check (status in ('active', 'closed')),
  result_pips int not null default 0,
  result_label text not null default '',
  report_month text not null,
  traded_on date,
  updated_label text not null default '',
  sort_order int not null default 0,
  show_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists elite_operations_status_idx on public.elite_operations (status);
create index if not exists elite_operations_report_month_idx on public.elite_operations (report_month);

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

alter table public.elite_monthly_reports enable row level security;
alter table public.elite_operations enable row level security;

drop policy if exists "Public read elite monthly reports" on public.elite_monthly_reports;
create policy "Public read elite monthly reports"
on public.elite_monthly_reports for select
to anon, authenticated
using (true);

drop policy if exists "Staff manage elite monthly reports" on public.elite_monthly_reports;
create policy "Staff manage elite monthly reports"
on public.elite_monthly_reports for all
to authenticated
using (public.is_elite_editor ())
with check (public.is_elite_editor ());

drop policy if exists "Public read elite operations" on public.elite_operations;
create policy "Public read elite operations"
on public.elite_operations for select
to anon, authenticated
using (show_public);

drop policy if exists "Staff manage elite operations" on public.elite_operations;
create policy "Staff manage elite operations"
on public.elite_operations for all
to authenticated
using (public.is_elite_editor ())
with check (public.is_elite_editor ());

grant select on public.elite_monthly_reports to anon, authenticated;
grant select on public.elite_operations to anon, authenticated;
grant insert, update, delete on table public.elite_monthly_reports to authenticated;
grant insert, update, delete on table public.elite_operations to authenticated;


-- Níveis de preço, número do sinal e resultado do fechamento

alter table public.elite_operations
add column if not exists signal_number int,
add column if not exists entry_price numeric(18, 6),
add column if not exists take_price numeric(18, 6),
add column if not exists stop_price numeric(18, 6),
add column if not exists close_outcome text check (close_outcome in ('take', 'stop', 'manual'));

create index if not exists elite_operations_signal_number_idx on public.elite_operations (signal_number);


-- Recarrega cache PostgREST após criar tabelas Elite / coluna banners.

grant usage on schema public to anon, authenticated;

-- VI Analytics: rode no SQL Editor (ou botão Instalar VI Analytics no admin):
-- 1) supabase/migrations/20260318120000_vi_analytics.sql
-- 2) supabase/migrations/20260319120000_vi_analytics_regions.sql (inteiro — RPCs + regiões)
-- O incremental do Publisher (installFullSupabaseSchemaFromAdmin) já inclui ambos via runSqlMigrations.ts.

notify pgrst, 'reload schema';

