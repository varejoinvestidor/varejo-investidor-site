alter table public.articles
  add column if not exists youtube_horizontal text,
  add column if not exists youtube_vertical text,
  add column if not exists video_primary text not null default 'horizontal'
    check (video_primary in ('horizontal', 'vertical'));

comment on column public.articles.youtube_horizontal is 'YouTube ID ou URL — player 16:9 no topo do artigo';
comment on column public.articles.youtube_vertical is 'YouTube ID ou URL — Shorts / 9:16 no topo do artigo';
comment on column public.articles.video_primary is 'Formato exibido primeiro no site';
