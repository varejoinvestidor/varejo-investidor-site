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
