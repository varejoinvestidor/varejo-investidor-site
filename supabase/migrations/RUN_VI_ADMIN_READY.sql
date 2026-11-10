-- RUN_VI_ADMIN_READY — cole no Supabase SQL Editor e execute (idempotente parcial)

-- === 20260318150000_article_youtube_videos.sql ===
alter table public.articles
  add column if not exists youtube_horizontal text,
  add column if not exists youtube_vertical text,
  add column if not exists video_primary text not null default 'horizontal'
    check (video_primary in ('horizontal', 'vertical'));

comment on column public.articles.youtube_horizontal is 'YouTube ID ou URL — player 16:9 no topo do artigo';
comment on column public.articles.youtube_vertical is 'YouTube ID ou URL — Shorts / 9:16 no topo do artigo';
comment on column public.articles.video_primary is 'Formato exibido primeiro no site';

-- === 20260318120000_vi_analytics.sql ===
-- VI Administrador — telemetria do site (page views, cliques)

create type public.analytics_event_kind as enum ('page_view', 'click');

create table public.site_analytics_events (
  id uuid primary key default gen_random_uuid (),
  kind public.analytics_event_kind not null,
  path text not null,
  page_title text,
  element_key text,
  element_label text,
  locale text,
  referrer text,
  session_id text,
  occurred_at timestamptz not null default now()
);

create index site_analytics_events_occurred_at_idx on public.site_analytics_events (occurred_at desc);
create index site_analytics_events_kind_occurred_idx on public.site_analytics_events (kind, occurred_at desc);
create index site_analytics_events_path_idx on public.site_analytics_events (path) where kind = 'page_view';
create index site_analytics_events_element_idx on public.site_analytics_events (element_key) where kind = 'click';

alter table public.site_analytics_events enable row level security;

create policy site_analytics_select_admin on public.site_analytics_events
for select
using (public.is_publisher_admin ());

create or replace function public.record_site_analytics_event (
  p_kind public.analytics_event_kind,
  p_path text,
  p_page_title text default null,
  p_element_key text default null,
  p_element_label text default null,
  p_locale text default null,
  p_referrer text default null,
  p_session_id text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_path is null or length(trim(p_path)) = 0 then
    return;
  end if;
  if p_kind = 'click' and coalesce(nullif(trim(p_element_key), ''), nullif(trim(p_element_label), '')) is null then
    return;
  end if;

  insert into public.site_analytics_events (
    kind,
    path,
    page_title,
    element_key,
    element_label,
    locale,
    referrer,
    session_id
  )
  values (
    p_kind,
    left(trim(p_path), 500),
    left(nullif(trim(p_page_title), ''), 300),
    left(nullif(trim(p_element_key), ''), 200),
    left(nullif(trim(p_element_label), ''), 200),
    left(nullif(trim(p_locale), ''), 12),
    left(nullif(trim(p_referrer), ''), 500),
    left(nullif(trim(p_session_id), ''), 64)
  );
end;
$$;

grant execute on function public.record_site_analytics_event (
  public.analytics_event_kind,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to anon, authenticated;

create or replace function public.analytics_summary (
  p_from timestamptz,
  p_to timestamptz
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'page_views',
    (
      select count(*)::bigint
      from public.site_analytics_events e
      where e.kind = 'page_view'
        and e.occurred_at >= p_from
        and e.occurred_at < p_to
    ),
    'clicks',
    (
      select count(*)::bigint
      from public.site_analytics_events e
      where e.kind = 'click'
        and e.occurred_at >= p_from
        and e.occurred_at < p_to
    ),
    'unique_sessions',
    (
      select count(distinct e.session_id)::bigint
      from public.site_analytics_events e
      where e.occurred_at >= p_from
        and e.occurred_at < p_to
        and e.session_id is not null
        and length(trim(e.session_id)) > 0
    )
  );
$$;

grant execute on function public.analytics_summary (timestamptz, timestamptz) to authenticated;

create or replace function public.analytics_top_paths (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 25
)
returns table (
  path text,
  views bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select e.path, count(*)::bigint as views
  from public.site_analytics_events e
  where e.kind = 'page_view'
    and e.occurred_at >= p_from
    and e.occurred_at < p_to
  group by e.path
  order by views desc, e.path asc
  limit greatest(1, least(coalesce(p_limit, 25), 100));
$$;

grant execute on function public.analytics_top_paths (timestamptz, timestamptz, int) to authenticated;

create or replace function public.analytics_top_clicks (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 25
)
returns table (
  element_key text,
  element_label text,
  clicks bigint,
  sample_path text
)
language sql
stable
security definer
set search_path = public
as $$
  with grouped as (
    select
      coalesce(nullif(e.element_key, ''), e.element_label) as element_key,
      max(e.element_label) as element_label,
      count(*)::bigint as clicks
    from public.site_analytics_events e
    where e.kind = 'click'
      and e.occurred_at >= p_from
      and e.occurred_at < p_to
    group by coalesce(nullif(e.element_key, ''), e.element_label)
  )
  select
    g.element_key,
    g.element_label,
    g.clicks,
    (
      select e2.path
      from public.site_analytics_events e2
      where e2.kind = 'click'
        and coalesce(nullif(e2.element_key, ''), e2.element_label) = g.element_key
        and e2.occurred_at >= p_from
        and e2.occurred_at < p_to
      group by e2.path
      order by count(*) desc
      limit 1
    ) as sample_path
  from grouped g
  order by g.clicks desc
  limit greatest(1, least(coalesce(p_limit, 25), 100));
$$;

grant execute on function public.analytics_top_clicks (timestamptz, timestamptz, int) to authenticated;

create or replace function public.analytics_timeseries (
  p_from timestamptz,
  p_to timestamptz,
  p_grain text default 'day'
)
returns table (
  bucket date,
  page_views bigint,
  clicks bigint,
  unique_sessions bigint
)
language sql
stable
security definer
set search_path = public
as $$
  with bounds as (
    select
      case
        when lower(p_grain) = 'week' then date_trunc('week', e.occurred_at)::date
        when lower(p_grain) = 'month' then date_trunc('month', e.occurred_at)::date
        else date_trunc('day', e.occurred_at)::date
      end as bucket,
      e.kind,
      e.session_id
    from public.site_analytics_events e
    where e.occurred_at >= p_from
      and e.occurred_at < p_to
  )
  select
    b.bucket,
    count(*) filter (where b.kind = 'page_view')::bigint as page_views,
    count(*) filter (where b.kind = 'click')::bigint as clicks,
    count(distinct b.session_id) filter (where b.session_id is not null and length(trim(b.session_id)) > 0)::bigint as unique_sessions
  from bounds b
  group by b.bucket
  order by b.bucket asc;
$$;

grant execute on function public.analytics_timeseries (timestamptz, timestamptz, text) to authenticated;

-- === 20260319120000_vi_analytics_regions.sql ===
-- VI Analytics — geo (país, macro-região, fuso) e agregações

alter table public.site_analytics_events
  add column if not exists country_code char(2),
  add column if not exists region_id text,
  add column if not exists region_label text,
  add column if not exists timezone text;

create index if not exists site_analytics_events_region_idx
  on public.site_analytics_events (region_id, occurred_at desc)
  where kind = 'page_view';

create index if not exists site_analytics_events_country_idx
  on public.site_analytics_events (country_code, occurred_at desc)
  where kind = 'page_view';

create index if not exists site_analytics_events_locale_idx
  on public.site_analytics_events (locale, occurred_at desc)
  where kind = 'page_view';

drop function if exists public.record_site_analytics_event (
  public.analytics_event_kind,
  text,
  text,
  text,
  text,
  text,
  text,
  text
);

create or replace function public.record_site_analytics_event (
  p_kind public.analytics_event_kind,
  p_path text,
  p_page_title text default null,
  p_element_key text default null,
  p_element_label text default null,
  p_locale text default null,
  p_referrer text default null,
  p_session_id text default null,
  p_timezone text default null,
  p_country_code text default null,
  p_region_id text default null,
  p_region_label text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_country char(2);
begin
  if p_path is null or length(trim(p_path)) = 0 then
    return;
  end if;
  if p_kind = 'click' and coalesce(nullif(trim(p_element_key), ''), nullif(trim(p_element_label), '')) is null then
    return;
  end if;

  v_country := upper(left(nullif(trim(p_country_code), ''), 2))::char(2);
  if v_country = ''::char(2) then
    v_country := null;
  end if;

  insert into public.site_analytics_events (
    kind,
    path,
    page_title,
    element_key,
    element_label,
    locale,
    referrer,
    session_id,
    timezone,
    country_code,
    region_id,
    region_label
  )
  values (
    p_kind,
    left(trim(p_path), 500),
    left(nullif(trim(p_page_title), ''), 300),
    left(nullif(trim(p_element_key), ''), 200),
    left(nullif(trim(p_element_label), ''), 200),
    left(nullif(trim(p_locale), ''), 12),
    left(nullif(trim(p_referrer), ''), 500),
    left(nullif(trim(p_session_id), ''), 64),
    left(nullif(trim(p_timezone), ''), 64),
    v_country,
    left(nullif(trim(p_region_id), ''), 32),
    left(nullif(trim(p_region_label), ''), 80)
  );
end;
$$;

grant execute on function public.record_site_analytics_event (
  public.analytics_event_kind,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) to anon, authenticated;

create or replace function public.analytics_by_region (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 20
)
returns table (
  region_id text,
  region_label text,
  page_views bigint,
  clicks bigint,
  unique_sessions bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(nullif(e.region_id, ''), 'other') as region_id,
    coalesce(nullif(max(e.region_label), ''), 'Indefinido') as region_label,
    count(*) filter (where e.kind = 'page_view')::bigint as page_views,
    count(*) filter (where e.kind = 'click')::bigint as clicks,
    count(distinct e.session_id) filter (
      where e.session_id is not null and length(trim(e.session_id)) > 0
    )::bigint as unique_sessions
  from public.site_analytics_events e
  where e.occurred_at >= p_from
    and e.occurred_at < p_to
  group by coalesce(nullif(e.region_id, ''), 'other')
  order by page_views desc, region_id asc
  limit greatest(1, least(coalesce(p_limit, 20), 50));
$$;

grant execute on function public.analytics_by_region (timestamptz, timestamptz, int) to authenticated;

create or replace function public.analytics_by_country (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 30
)
returns table (
  country_code char(2),
  region_id text,
  page_views bigint,
  clicks bigint,
  unique_sessions bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    e.country_code,
    coalesce(nullif(max(e.region_id), ''), 'other') as region_id,
    count(*) filter (where e.kind = 'page_view')::bigint as page_views,
    count(*) filter (where e.kind = 'click')::bigint as clicks,
    count(distinct e.session_id) filter (
      where e.session_id is not null and length(trim(e.session_id)) > 0
    )::bigint as unique_sessions
  from public.site_analytics_events e
  where e.occurred_at >= p_from
    and e.occurred_at < p_to
    and e.country_code is not null
  group by e.country_code
  order by page_views desc, e.country_code asc
  limit greatest(1, least(coalesce(p_limit, 30), 100));
$$;

grant execute on function public.analytics_by_country (timestamptz, timestamptz, int) to authenticated;

create or replace function public.analytics_by_locale (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 25
)
returns table (
  locale text,
  page_views bigint,
  clicks bigint,
  unique_sessions bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(nullif(e.locale, ''), '—') as locale,
    count(*) filter (where e.kind = 'page_view')::bigint as page_views,
    count(*) filter (where e.kind = 'click')::bigint as clicks,
    count(distinct e.session_id) filter (
      where e.session_id is not null and length(trim(e.session_id)) > 0
    )::bigint as unique_sessions
  from public.site_analytics_events e
  where e.occurred_at >= p_from
    and e.occurred_at < p_to
  group by coalesce(nullif(e.locale, ''), '—')
  order by page_views desc, locale asc
  limit greatest(1, least(coalesce(p_limit, 25), 50));
$$;

grant execute on function public.analytics_by_locale (timestamptz, timestamptz, int) to authenticated;

-- === 20260320120000_vi_analytics_top_clicks_fix.sql ===
-- Corrige analytics_top_clicks (subquery com coluna não agrupada do SELECT externo).

create or replace function public.analytics_top_clicks (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 25
)
returns table (
  element_key text,
  element_label text,
  clicks bigint,
  sample_path text
)
language sql
stable
security definer
set search_path = public
as $$
  with grouped as (
    select
      coalesce(nullif(e.element_key, ''), e.element_label) as element_key,
      max(e.element_label) as element_label,
      count(*)::bigint as clicks
    from public.site_analytics_events e
    where e.kind = 'click'
      and e.occurred_at >= p_from
      and e.occurred_at < p_to
    group by coalesce(nullif(e.element_key, ''), e.element_label)
  )
  select
    g.element_key,
    g.element_label,
    g.clicks,
    (
      select e2.path
      from public.site_analytics_events e2
      where e2.kind = 'click'
        and coalesce(nullif(e2.element_key, ''), e2.element_label) = g.element_key
        and e2.occurred_at >= p_from
        and e2.occurred_at < p_to
      group by e2.path
      order by count(*) desc
      limit 1
    ) as sample_path
  from grouped g
  order by g.clicks desc
  limit greatest(1, least(coalesce(p_limit, 25), 100));
$$;

grant execute on function public.analytics_top_clicks (timestamptz, timestamptz, int) to authenticated;

notify pgrst, 'reload schema';

-- === 20260320140000_vi_analytics_backfill_geo.sql ===
-- Backfill país / macro-região em eventos antigos (antes da migration de regiões)

update public.site_analytics_events e
set country_code = coalesce(
  e.country_code,
  (
    case lower(split_part(coalesce(nullif(trim(e.locale), ''), 'pt'), '-', 1))
      when 'pt' then 'BR'
      when 'en' then 'US'
      when 'es' then 'ES'
      when 'fr' then 'FR'
      when 'de' then 'DE'
      when 'it' then 'IT'
      when 'ar' then 'SA'
      when 'fa' then 'IR'
      when 'hi' then 'IN'
      when 'ur' then 'PK'
      when 'bn' then 'BD'
      when 'tr' then 'TR'
      when 'ru' then 'RU'
      when 'id' then 'ID'
      when 'vi' then 'VN'
      when 'th' then 'TH'
      when 'tl' then 'PH'
      when 'fil' then 'PH'
      when 'zh' then 'CN'
      when 'ja' then 'JP'
      when 'ko' then 'KR'
      when 'pl' then 'PL'
      when 'he' then 'IL'
      else null
    end
  )::char(2)
)
where e.country_code is null;

update public.site_analytics_events e
set
  region_id = coalesce(e.region_id, case
    when e.country_code = 'BR' then 'brazil'
    when e.country_code in ('US', 'CA') then 'northAmerica'
    when e.country_code in ('MX','AR','CL','CO','PE','UY','PY','BO','EC','VE','CR','PA','GT') then 'latinAmerica'
    when e.country_code in (
      'PT','ES','FR','DE','IT','GB','IE','CH','NL','BE','AT','PL','SE','NO','DK','FI','GR','CZ','HU','RO','UA','RU'
    ) then 'europe'
    when e.country_code in ('AE','SA','IL','TR','QA','KW','OM','BH','JO','IR','IQ') then 'middleEast'
    when e.country_code in ('IN','CN','JP','KR','SG','ID','TH','VN','PH','MY','TW','HK','PK','BD') then 'asia'
    when e.country_code in ('AU','NZ') then 'oceania'
    when e.country_code in ('ZA','NG','EG','MA','KE','GH') then 'africa'
    else 'other'
  end),
  region_label = coalesce(e.region_label, case
    when e.country_code = 'BR' then 'Brasil'
    when e.country_code in ('US', 'CA') then 'América do Norte'
    when e.country_code in ('MX','AR','CL','CO','PE','UY','PY','BO','EC','VE','CR','PA','GT') then 'América Latina'
    when e.country_code in (
      'PT','ES','FR','DE','IT','GB','IE','CH','NL','BE','AT','PL','SE','NO','DK','FI','GR','CZ','HU','RO','UA','RU'
    ) then 'Europa'
    when e.country_code in ('AE','SA','IL','TR','QA','KW','OM','BH','JO','IR','IQ') then 'Oriente Médio'
    when e.country_code in ('IN','CN','JP','KR','SG','ID','TH','VN','PH','MY','TW','HK','PK','BD') then 'Ásia'
    when e.country_code in ('AU','NZ') then 'Oceania'
    when e.country_code in ('ZA','NG','EG','MA','KE','GH') then 'África'
    else 'Indefinido'
  end)
where e.region_id is null or e.region_id = '';

notify pgrst, 'reload schema';

notify pgrst, 'reload schema';
