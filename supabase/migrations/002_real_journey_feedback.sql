-- Patch 12: Feedback + contribution inbox
-- Run this after Patch 10 auth/storage.

create extension if not exists pgcrypto;

create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  name text not null,
  email text not null,
  subject text not null,
  category text not null check (category in ('bug-report', 'topic-request', 'content-correction', 'story-idea', 'general')),
  delivery text not null check (delivery in ('github', 'email', 'both')),
  visibility text not null check (visibility in ('public', 'private')),
  page_url text,
  message text not null,
  github_issue_url text,
  email_href text,
  status text not null default 'new' check (status in ('new', 'triaged', 'queued')),
  source text not null default 'web-form' check (source in ('web-form', 'seed'))
);

create index if not exists feedback_submissions_created_at_idx on public.feedback_submissions (created_at desc);
create index if not exists feedback_submissions_status_idx on public.feedback_submissions (status);
create index if not exists feedback_submissions_visibility_idx on public.feedback_submissions (visibility);

create or replace function public.set_feedback_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists feedback_submissions_set_updated_at on public.feedback_submissions;
create trigger feedback_submissions_set_updated_at
before update on public.feedback_submissions
for each row
execute procedure public.set_feedback_updated_at();

alter table public.feedback_submissions enable row level security;

comment on table public.feedback_submissions is 'Patch 12 stores public feedback handoffs prepared for GitHub issues, email drafts, and the admin contribution inbox. Use service-role access from trusted server routes for inserts and reads.';
