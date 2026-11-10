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
