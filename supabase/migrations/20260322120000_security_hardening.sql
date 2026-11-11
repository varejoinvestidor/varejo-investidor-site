-- Segurança: analytics RPC só admin, ingestão só service_role, anti-escalação de role em profiles.

create or replace function public.require_publisher_admin ()
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_publisher_admin () then
    raise exception 'insufficient_privilege' using errcode = '42501';
  end if;
end;
$$;

-- Ingestão: apenas service role (API Next.js). Revoga chamada direta com anon key.
revoke execute on function public.record_site_analytics_event (
  public.analytics_event_kind,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) from public, anon, authenticated;

revoke execute on function public.record_site_analytics_event (
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
) from public, anon, authenticated;

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
) to service_role;

create or replace function public.analytics_summary (
  p_from timestamptz,
  p_to timestamptz
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return (
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
    )
  );
end;
$$;

create or replace function public.analytics_top_paths (
  p_from timestamptz,
  p_to timestamptz,
  p_limit int default 25
)
returns table (
  path text,
  views bigint
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
  select e.path, count(*)::bigint as views
  from public.site_analytics_events e
  where e.kind = 'page_view'
    and e.occurred_at >= p_from
    and e.occurred_at < p_to
  group by e.path
  order by views desc, e.path asc
  limit greatest(1, least(coalesce(p_limit, 25), 100));
end;
$$;

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
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
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
end;
$$;

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
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
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
end;
$$;

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
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
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
end;
$$;

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
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
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
end;
$$;

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
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public.require_publisher_admin ();
  return query
  select
    coalesce(nullif(e.locale, ''), 'n/d') as locale,
    count(*) filter (where e.kind = 'page_view')::bigint as page_views,
    count(*) filter (where e.kind = 'click')::bigint as clicks,
    count(distinct e.session_id) filter (
      where e.session_id is not null and length(trim(e.session_id)) > 0
    )::bigint as unique_sessions
  from public.site_analytics_events e
  where e.occurred_at >= p_from
    and e.occurred_at < p_to
  group by coalesce(nullif(e.locale, ''), 'n/d')
  order by page_views desc, locale asc
  limit greatest(1, least(coalesce(p_limit, 25), 50));
end;
$$;

create or replace function public.profiles_guard_role_escalation ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and new.role is distinct from old.role then
    if coalesce(auth.uid (), '00000000-0000-0000-0000-000000000000'::uuid) = old.id then
      if not public.is_publisher_admin () then
        raise exception 'cannot change own role' using errcode = '42501';
      end if;
    elsif not public.is_publisher_admin () then
      raise exception 'only admin may change roles' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_guard_role_escalation on public.profiles;

create trigger profiles_guard_role_escalation
before update on public.profiles
for each row
execute function public.profiles_guard_role_escalation ();

notify pgrst, 'reload schema';
