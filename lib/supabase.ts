import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PROGRAM_DEFAULTS, type ProgramSettings } from "./program";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function dbConfigured(): boolean {
  return Boolean(url && serviceKey);
}

let _service: SupabaseClient | null = null;
export function serviceClient(): SupabaseClient {
  if (!url || !serviceKey) throw new Error("Supabase is not configured");
  if (!_service) _service = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _service;
}

export function anonClient(): SupabaseClient {
  if (!url || !anonKey) throw new Error("Supabase anon key is not configured");
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "ashrafalas81@gmail.com").toLowerCase();

export const ADMIN_COOKIE = "mia_admin";

// Validate an admin session token against Supabase Auth and the allowlisted email.
export async function validateAdminToken(token: string | undefined): Promise<{ id: string; email: string } | null> {
  if (!token || !dbConfigured()) return null;
  try {
    const { data, error } = await serviceClient().auth.getUser(token);
    if (error || !data.user?.email) return null;
    if (data.user.email.toLowerCase() !== ADMIN_EMAIL) return null;
    return { id: data.user.id, email: data.user.email };
  } catch {
    return null;
  }
}

// Public program settings: DB overrides merged over code defaults.
export async function getProgramSettings(): Promise<ProgramSettings> {
  const base = { ...PROGRAM_DEFAULTS } as ProgramSettings;
  if (!dbConfigured()) return base;
  try {
    const { data, error } = await serviceClient().from("program_settings").select("key,value");
    if (error || !data) return base;
    for (const row of data as { key: string; value: unknown }[]) {
      if (row.key in base || ["sessionTimes", "freeLectureDates", "descriptionExtra"].includes(row.key)) {
        (base as Record<string, unknown>)[row.key] = row.value;
      }
    }
    return base;
  } catch {
    return base;
  }
}
