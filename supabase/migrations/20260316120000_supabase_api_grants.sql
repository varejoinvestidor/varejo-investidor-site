-- Recarrega cache PostgREST após criar tabelas Elite / coluna banners.

grant usage on schema public to anon, authenticated;

notify pgrst, 'reload schema';
