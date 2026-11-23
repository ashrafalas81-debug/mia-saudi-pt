-- MIA Saudi PT - database schema
-- Run in the Supabase SQL editor of the project.

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  university text not null,
  academic_status text not null check (academic_status in ('graduate','internship','final_year','other')),
  country_iso text not null,
  country_dial text not null,
  phone_e164 text not null,
  whatsapp_verified boolean not null default false,
  verification_status text not null default 'pending', -- pending | verified | unavailable
  attendance_preference text not null check (attendance_preference in ('live','recorded','both')),
  program_interest text not null check (program_interest in ('scfhs','recruitment','interviews','all')),
  consent boolean not null default false,
  enrollment_status text not null default 'registered', -- registered | contacted | confirmed | enrolled
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- one active registration per WhatsApp number
create unique index if not exists registrations_phone_e164_key on public.registrations (phone_e164);
create index if not exists registrations_created_at_idx on public.registrations (created_at desc);

create table if not exists public.program_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.registrations enable row level security;
alter table public.program_settings enable row level security;

-- No public access: all reads/writes go through server routes with the service role.
-- (RLS with no policies denies anon/authenticated access by default.)

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists registrations_touch on public.registrations;
create trigger registrations_touch before update on public.registrations
  for each row execute function public.touch_updated_at();

-- 2026-11-23: group registration (individual / group of 4)
alter table public.registrations add column if not exists registration_type text not null default 'individual';
alter table public.registrations add column if not exists group_members text;
