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
