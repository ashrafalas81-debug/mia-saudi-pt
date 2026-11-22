# MIA Saudi PT — 10-Day Intensive Preparation Program

Premium Arabic (RTL) landing page + real registration system + admin dashboard for the
MIA Saudi PT program by Dr. Ashraf Alaa Mostafa / Medical Intelligence Academy.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth) for registrations, settings, admin auth
- libphonenumber-js for international phone validation (E.164 storage)
- Vercel-ready

## Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=ashrafalas81@gmail.com
```

## Setup
1. Create a Supabase project, run `supabase/schema.sql` in the SQL editor.
2. Create the admin user (Authentication > Add user, email = ADMIN_EMAIL, with a strong password).
3. Set the env vars above in Vercel / `.env.local`.
4. `npm install && npm run dev`

## Routes
- `/` — landing page (hero, free week, 3D method, curriculum, companion app, case demo, registration, FAQ)
- `/admin` — dashboard (stats, filters, CSV export, enrollment pipeline, notes, program settings)
- `/admin/login` — Supabase Auth login restricted to ADMIN_EMAIL

## Honesty notes (by design)
- WhatsApp OTP verification requires WhatsApp Business Platform credentials; until configured,
  numbers are format-validated only and shown as "pending verification". Nothing is faked.
- 3D demo panels are placeholders awaiting Dr. Ashraf's original course footage.
- No price is shown until supplied. No reviews/student counts are displayed.
