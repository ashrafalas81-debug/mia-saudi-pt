# MIA Saudi PT — 10-Day Intensive Preparation Program

Premium Arabic (RTL) landing page + real registration system + admin dashboard for the
MIA Saudi PT program by Dr. Ashraf Alaa Mostafa / Medical Intelligence Academy.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth) for registrations, site settings, and admin authentication
- libphonenumber-js for international phone validation (E.164 storage)
- Vercel-ready (auto-deploys on push to main when connected to a GitHub repo)

## Install & run locally
1. `npm install`
2. Create a `.env.local` file in the project root with the variables listed below.
3. `npm run dev` then open http://localhost:3000
4. Production build: `npm run build && npm start`

## Required environment variables (names only — get values from the project owner)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=
```
- `NEXT_PUBLIC_*` values come from Supabase → Project Settings → API (URL + anon public key).
- `SUPABASE_SERVICE_ROLE_KEY` is the Supabase service-role secret (server-only; never expose to the browser).
- `ADMIN_EMAIL` is the single email allowed to sign in to `/admin` (Supabase Auth user with that email must exist).

## Supabase setup
1. Create a Supabase project.
2. In the SQL editor, run `supabase/schema.sql` (creates the `registrations` and `settings` tables,
   RLS policies, and service-role grants).
3. In Authentication → Users, add the admin user (email must match `ADMIN_EMAIL`) with a strong password.

## Routes
- `/` — landing page (hero, curriculum, what-you-get benefits + 3D demo videos, companion app, free-week offer, registration form, footer, WhatsApp float)
- `/admin/login` — Supabase Auth login, restricted to `ADMIN_EMAIL`
- `/admin` — dashboard (registration stats, filters, CSV export, notes, editable site settings incl. seat-cap note and doctor photo slot)

## Content model
- `lib/program.ts` — curriculum data, program defaults (seat-cap note, doctor photo slot), shared types.
- Live-editable strings are served from the `settings` table via `/api/settings` and editable in `/admin`.

## Media
- `public/videos/` — the two 3D lecture demo videos (mp4) plus their poster stills (jpg), embedded in the
  "what you get" benefits section. Included in this zip.
- The hero uses `public/videos/poster-acl-short.jpg` as a designed static poster card.

## Honesty notes (by design)
- WhatsApp OTP verification requires WhatsApp Business Platform credentials; until configured, numbers are
  format-validated only and stored as "pending verification". Nothing is faked.
- No leaked/official exam-question claims and no guaranteed-results claims anywhere in the copy.
- The certificate is described as a MIA completion certificate, not official SCFHS accreditation.
