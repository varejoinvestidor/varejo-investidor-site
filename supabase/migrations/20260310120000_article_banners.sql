alter table public.articles
add column if not exists banners jsonb not null default '[]'::jsonb;
