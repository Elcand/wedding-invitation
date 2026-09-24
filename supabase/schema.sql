create extension if not exists pgcrypto;

create table if not exists public.rsvp (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  address text,
  attendance text not null check (attendance in ('Attending', 'Not Attending')),
  guest_count integer not null default 1 check (guest_count between 1 and 5),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  message text not null check (char_length(trim(message)) between 1 and 1000),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.rsvp enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "public can submit rsvp" on public.rsvp;
create policy "public can submit rsvp"
on public.rsvp
for insert
to anon, authenticated
with check (true);

grant insert on table public.rsvp to anon, authenticated;

drop policy if exists "public can read wishes" on public.wishes;
create policy "public can read wishes"
on public.wishes
for select
to anon, authenticated
using (true);

drop policy if exists "public can submit wishes" on public.wishes;
create policy "public can submit wishes"
on public.wishes
for insert
to anon, authenticated
with check (true);

grant select, insert on table public.wishes to anon, authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'wishes'
  ) then
    execute 'alter publication supabase_realtime add table public.wishes';
  end if;
end;
$$;
