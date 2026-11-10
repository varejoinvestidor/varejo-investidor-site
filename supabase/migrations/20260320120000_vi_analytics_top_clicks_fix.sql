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
