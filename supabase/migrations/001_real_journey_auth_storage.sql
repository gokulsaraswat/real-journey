-- Patch 10: Auth + storage foundation
-- Run this after creating your Supabase project.
-- It creates the buckets used by the admin upload flow.

insert into storage.buckets (id, name, public, file_size_limit)
values ('admin-source-files', 'admin-source-files', false, 26214400)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit)
values ('private-story-files', 'private-story-files', false, 26214400)
on conflict (id) do nothing;

comment on table storage.objects is 'Real Journey uses service-role uploads for admin source files in Patch 10. Fine-grained RLS policies can be added in a later branch once role claims are finalized.';
