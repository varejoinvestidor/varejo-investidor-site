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
