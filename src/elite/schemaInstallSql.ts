/** SQL para colar no Supabase → SQL Editor (requer Publisher já instalado — função `is_publisher_staff`). */
export const ELITE_SCHEMA_SQL = `-- Relatório Elite (VI Research)
-- Cole no SQL Editor do projeto e execute uma vez.

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
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

drop policy if exists "Public read elite operations" on public.elite_operations;
create policy "Public read elite operations"
on public.elite_operations for select
to anon, authenticated
using (show_public);

drop policy if exists "Staff manage elite operations" on public.elite_operations;
create policy "Staff manage elite operations"
on public.elite_operations for all
to authenticated
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

alter table public.elite_operations
add column if not exists signal_number int,
add column if not exists entry_price numeric(18, 6),
add column if not exists take_price numeric(18, 6),
add column if not exists stop_price numeric(18, 6),
add column if not exists close_outcome text check (close_outcome in ('take', 'stop', 'manual'));

create index if not exists elite_operations_signal_number_idx on public.elite_operations (signal_number);

notify pgrst, 'reload schema';
`;
