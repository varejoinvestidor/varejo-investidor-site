-- VI Publisher 1.0 — fundação (PostgreSQL + RLS)
-- Aplicar via Supabase SQL Editor ou CLI: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.publisher_role as enum ('admin', 'editor', 'author', 'reviewer');

create type public.article_status as enum (
  'draft',
  'review',
  'scheduled',
  'published',
  'archived'
);

create type public.article_source as enum ('publisher', 'legacy_import', 'legacy_generated');

-- ---------------------------------------------------------------------------
-- Perfis (1:1 com auth.users)
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role public.publisher_role not null default 'author',
  avatar_url text,
  invited_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data ->> 'role')::public.publisher_role, 'author')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user ();

create or replace function public.set_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at ();

-- ---------------------------------------------------------------------------
-- Configurações
-- ---------------------------------------------------------------------------

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values
  ('timezone', '"America/Sao_Paulo"'::jsonb),
  ('default_language', '"pt"'::jsonb),
  ('publisher_mvp_languages', '["pt","en"]'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Categorias editoriais (seed spec)
-- ---------------------------------------------------------------------------

create table public.categories (
  id uuid primary key default gen_random_uuid (),
  slug text not null unique,
  name_pt text not null,
  name_en text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.categories (slug, name_pt, name_en, sort_order)
values
  ('economia-global', 'Economia Global', 'Global Economy', 1),
  ('geopolitica', 'Geopolítica', 'Geopolitics', 2),
  ('mercados-financeiros', 'Mercados Financeiros', 'Financial Markets', 3),
  ('renda-variavel', 'Renda Variável', 'Equities', 4),
  ('criptomoedas', 'Criptomoedas', 'Cryptocurrencies', 5),
  ('commodities', 'Commodities', 'Commodities', 6),
  ('bancos-centrais', 'Bancos Centrais', 'Central Banks', 7),
  ('estrategias-investimento', 'Estratégias de Investimento', 'Investment Strategies', 8),
  ('educacao-financeira', 'Educação Financeira', 'Financial Education', 9),
  ('empresas-setores', 'Empresas e Setores', 'Companies and Sectors', 10);

create trigger categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at ();

-- ---------------------------------------------------------------------------
-- Tags
-- ---------------------------------------------------------------------------

create table public.tags (
  id uuid primary key default gen_random_uuid (),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Artigos
-- ---------------------------------------------------------------------------

create table public.articles (
  id uuid primary key default gen_random_uuid (),
  translation_group_id uuid not null default gen_random_uuid (),
  title text not null default '',
  slug text not null,
  subtitle text not null default '',
  excerpt text not null default '',
  content jsonb not null default '{"type":"doc","content":[]}'::jsonb,
  cover_image text,
  author_id uuid references public.profiles (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  language text not null default 'pt',
  status public.article_status not null default 'draft',
  source public.article_source not null default 'publisher',
  seo_title text,
  seo_description text,
  sources jsonb not null default '[]'::jsonb,
  references_text text,
  featured boolean not null default false,
  view_count bigint not null default 0,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_slug_language_unique unique (language, slug)
);

create index articles_status_idx on public.articles (status);
create index articles_language_idx on public.articles (language);
create index articles_published_at_idx on public.articles (published_at desc nulls last);
create index articles_translation_group_idx on public.articles (translation_group_id);
create index articles_author_idx on public.articles (author_id);

create trigger articles_updated_at
before update on public.articles
for each row
execute function public.set_updated_at ();

create table public.article_tags (
  article_id uuid not null references public.articles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.article_translations (
  translation_group_id uuid not null,
  article_id uuid not null references public.articles (id) on delete cascade,
  language text not null,
  primary key (article_id),
  unique (translation_group_id, language)
);

create table public.article_revisions (
  id uuid primary key default gen_random_uuid (),
  article_id uuid not null references public.articles (id) on delete cascade,
  revision_number int not null,
  title text not null,
  content jsonb not null,
  excerpt text not null default '',
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (article_id, revision_number)
);

-- ---------------------------------------------------------------------------
-- Mídia
-- ---------------------------------------------------------------------------

create table public.media (
  id uuid primary key default gen_random_uuid (),
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  byte_size bigint not null,
  width int,
  height int,
  alt_text text,
  folder text not null default 'uploads',
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index media_folder_idx on public.media (folder);
create index media_created_at_idx on public.media (created_at desc);

-- ---------------------------------------------------------------------------
-- Auditoria
-- ---------------------------------------------------------------------------

create table public.activity_logs (
  id uuid primary key default gen_random_uuid (),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index activity_logs_created_at_idx on public.activity_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- Helpers RLS
-- ---------------------------------------------------------------------------

create or replace function public.current_user_role ()
returns public.publisher_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid ();
$$;

create or replace function public.is_publisher_staff ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid ()
      and role in ('admin', 'editor', 'author', 'reviewer')
  );
$$;

create or replace function public.is_publisher_admin ()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid () and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;
alter table public.article_translations enable row level security;
alter table public.article_revisions enable row level security;
alter table public.media enable row level security;
alter table public.activity_logs enable row level security;

-- profiles
create policy "Staff can read all profiles"
on public.profiles for select
to authenticated
using (public.is_publisher_staff ());

create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid () = id);

create policy "Admins manage profiles"
on public.profiles for all
to authenticated
using (public.is_publisher_admin ())
with check (public.is_publisher_admin ());

create policy "Users update own profile (not role)"
on public.profiles for update
to authenticated
using (auth.uid () = id)
with check (auth.uid () = id);

-- site_settings: staff read, admin write
create policy "Staff read settings"
on public.site_settings for select
to authenticated
using (public.is_publisher_staff ());

create policy "Admin write settings"
on public.site_settings for all
to authenticated
using (public.is_publisher_admin ())
with check (public.is_publisher_admin ());

-- categories / tags: public read published context via join; staff CRUD
create policy "Anyone read categories"
on public.categories for select
to anon, authenticated
using (true);

create policy "Editors manage categories"
on public.categories for all
to authenticated
using (
  public.current_user_role () in ('admin', 'editor')
)
with check (
  public.current_user_role () in ('admin', 'editor')
);

create policy "Anyone read tags"
on public.tags for select
to anon, authenticated
using (true);

create policy "Editors manage tags"
on public.tags for all
to authenticated
using (public.current_user_role () in ('admin', 'editor'))
with check (public.current_user_role () in ('admin', 'editor'));

-- articles: public só published
create policy "Public read published articles"
on public.articles for select
to anon, authenticated
using (
  status = 'published'
  and published_at is not null
  and published_at <= now()
);

create policy "Staff read articles"
on public.articles for select
to authenticated
using (public.is_publisher_staff ());

create policy "Authors insert own drafts"
on public.articles for insert
to authenticated
with check (
  public.is_publisher_staff ()
  and (
    public.current_user_role () in ('admin', 'editor')
    or (
      public.current_user_role () = 'author'
      and author_id = auth.uid ()
      and status in ('draft', 'review')
    )
  )
);

create policy "Staff update articles"
on public.articles for update
to authenticated
using (
  public.current_user_role () in ('admin', 'editor', 'reviewer')
  or (public.current_user_role () = 'author' and author_id = auth.uid ())
)
with check (
  public.current_user_role () in ('admin', 'editor')
  or (
    public.current_user_role () = 'author'
    and author_id = auth.uid ()
    and status in ('draft', 'review')
  )
  or (
    public.current_user_role () = 'reviewer'
    and status in ('review', 'draft')
  )
);

create policy "Admins delete articles"
on public.articles for delete
to authenticated
using (public.current_user_role () = 'admin');

-- article_tags / translations / revisions: staff
create policy "Staff manage article_tags"
on public.article_tags for all
to authenticated
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

create policy "Staff manage article_translations"
on public.article_translations for all
to authenticated
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

create policy "Staff manage revisions"
on public.article_revisions for all
to authenticated
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

create policy "Staff read revisions"
on public.article_revisions for select
to authenticated
using (public.is_publisher_staff ());

-- media
create policy "Staff manage media"
on public.media for all
to authenticated
using (public.is_publisher_staff ())
with check (public.is_publisher_staff ());

-- activity_logs
create policy "Staff read activity"
on public.activity_logs for select
to authenticated
using (public.is_publisher_staff ());

create policy "Staff insert activity"
on public.activity_logs for insert
to authenticated
with check (public.is_publisher_staff () and actor_id = auth.uid ());

-- ---------------------------------------------------------------------------
-- Storage bucket (executar no Dashboard se a policy SQL falhar)
-- ---------------------------------------------------------------------------
-- insert into storage.buckets (id, name, public) values ('publisher-media', 'publisher-media', true);
-- Bucket de mídia do VI Publisher

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'publisher-media',
  'publisher-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

create policy "Public read publisher media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'publisher-media');

create policy "Staff upload publisher media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'publisher-media'
  and public.is_publisher_staff ()
);

create policy "Staff update publisher media"
on storage.objects for update
to authenticated
using (bucket_id = 'publisher-media' and public.is_publisher_staff ())
with check (bucket_id = 'publisher-media' and public.is_publisher_staff ());

create policy "Admins delete publisher media"
on storage.objects for delete
to authenticated
using (bucket_id = 'publisher-media' and public.is_publisher_admin ());
-- Incremento de visualizações (público, somente artigos publicados)

create or replace function public.increment_article_views (article_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.articles
  set view_count = view_count + 1
  where id = article_id
    and status = 'published'
    and published_at is not null
    and published_at <= now();
end;
$$;

grant execute on function public.increment_article_views (uuid) to anon, authenticated;

-- Depois de RUN_ALL: execute supabase/migrations/RUN_SUPABASE_INCREMENTAL.sql
-- (banners + Relatório Elite). Ver docs/supabase-elite.md e Admin → Relatório Elite → Copiar SQL.
