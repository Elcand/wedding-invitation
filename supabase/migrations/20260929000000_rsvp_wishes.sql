create extension if not exists pgcrypto;

create table if not exists public.rsvp (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  name text not null,
  address text,
  attendance text not null,
  guest_count integer default 1,
  constraint rsvp_pkey primary key (id)
);

create table if not exists public.wishes (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  name text not null,
  message text not null,
  constraint wishes_pkey primary key (id)
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.rsvp enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "public can submit rsvp" on public.rsvp;
create policy "public can submit rsvp"
on public.rsvp
for insert
to anon, authenticated
with check (
  char_length(btrim(name)) between 2 and 120
  and attendance in ('Attending', 'Not Attending')
  and (guest_count is null or guest_count between 1 and 5)
);

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
with check (
  char_length(btrim(name)) between 2 and 120
  and char_length(btrim(message)) between 1 and 1000
);

grant select, insert on table public.wishes to anon, authenticated;

alter table public.wishes replica identity full;

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
