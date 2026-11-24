-- Manifestações da página pública /partners.
-- Aplicar no Supabase antes de os formulários gravarem com sucesso.

create table if not exists public.partner_interest (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('affiliate', 'leader', 'economic', 'office', 'analyst')),
  name text not null,
  email text not null,
  country text,
  city text,
  language text,
  consent boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.partner_interest enable row level security;

create index if not exists partner_interest_category_created_idx
  on public.partner_interest (category, created_at desc);
