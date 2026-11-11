-- Lista prioritária: /eventos
create table if not exists public.event_waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  whatsapp text,
  country text not null,
  country_code text,
  city text not null,
  continent text,
  language text,
  lead_list text,
  origin text default 'eventos',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  raw_meta jsonb
);

create index if not exists event_waitlist_signups_created_at_idx on public.event_waitlist_signups (created_at desc);
create index if not exists event_waitlist_signups_email_idx on public.event_waitlist_signups (lower(email));

alter table public.event_waitlist_signups enable row level security;

comment on table public.event_waitlist_signups is 'Cadastros da lista prioritária de eventos presenciais (varejoinvestidor.com/eventos).';
