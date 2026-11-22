import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serviceClient, validateAdminToken, getProgramSettings, ADMIN_COOKIE } from "@/lib/supabase";

const EDITABLE = new Set([
  "startDate",
  "sessionTimes",
  "freeLectureDates",
  "registrationOpen",
  "descriptionExtra",
  "price",
  "whatsappSupport",
  "confirmationMessage",
  "seatsNote",
  "demoVideo1",
  "demoVideo2",
  "doctorPhoto",
]);

export async function GET() {
  const store = await cookies();
  const admin = await validateAdminToken(store.get(ADMIN_COOKIE)?.value);
  if (!admin) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const settings = await getProgramSettings();
  return NextResponse.json({
    ok: true,
    settings,
    integrations: {
      whatsappOtp: {
        configured: false,
        note: "WhatsApp Business API credentials are not configured. Registrations are saved with format-validated numbers and stay pending verification until a provider is connected.",
      },
    },
  });
}

export async function PATCH(req: NextRequest) {
  const store = await cookies();
  const admin = await validateAdminToken(store.get(ADMIN_COOKIE)?.value);
  if (!admin) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const supa = serviceClient();
  const writes: { key: string; value: unknown }[] = [];
  for (const [k, v] of Object.entries(body)) {
    if (!EDITABLE.has(k)) continue;
    if (k === "whatsappSupport") {
      const digits = String(v).replace(/[^\d]/g, "");
      if (digits.length < 8) return NextResponse.json({ ok: false, error: "invalid_whatsapp" }, { status: 422 });
      writes.push({ key: k, value: digits });
    } else if (k === "registrationOpen") {
      writes.push({ key: k, value: v === true });
    } else {
      writes.push({ key: k, value: v === null ? null : String(v) });
    }
  }
  for (const w of writes) {
    const { error } = await supa.from("program_settings").upsert({ key: w.key, value: w.value });
    if (error) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
  const settings = await getProgramSettings();
  return NextResponse.json({ ok: true, settings });
}
