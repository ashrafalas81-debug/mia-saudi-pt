import { NextRequest, NextResponse } from "next/server";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { dbConfigured, serviceClient, getProgramSettings } from "@/lib/supabase";

const STATUSES = ["graduate", "internship", "final_year", "other"];
const PREFS = ["live", "recorded", "both"];
const INTERESTS = ["scfhs", "recruitment", "interviews", "all"];

// naive per-IP rate limit (best-effort on serverless)
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 10 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 8;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many_requests" }, { status: 429 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const fullName = String(body.fullName || "").trim();
  const university = String(body.university || "").trim();
  const academicStatus = String(body.academicStatus || "");
  const countryIso = String(body.countryIso || "").toUpperCase();
  const countryDial = String(body.countryDial || "").replace(/[^\d]/g, "");
  const national = String(body.phoneNational || "").replace(/[^\d]/g, "");
  const attendance = String(body.attendancePreference || "");
  const interest = String(body.programInterest || "");
  const consent = body.consent === true;

  if (!fullName || fullName.length < 3)
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 422 });
  if (!university)
    return NextResponse.json({ ok: false, error: "invalid_university" }, { status: 422 });
  if (!STATUSES.includes(academicStatus))
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 422 });
  if (!PREFS.includes(attendance))
    return NextResponse.json({ ok: false, error: "invalid_attendance" }, { status: 422 });
  if (!INTERESTS.includes(interest))
    return NextResponse.json({ ok: false, error: "invalid_interest" }, { status: 422 });
  if (!consent)
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 422 });

  const phone = parsePhoneNumberFromString(`+${countryDial}${national}`);
  if (!phone || !phone.isValid() || phone.country !== countryIso) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 422 });
  }
  const e164 = phone.number;

  const supa = serviceClient();

  // graceful duplicate handling: same number => update details, keep one row
  const { data: existing } = await supa
    .from("registrations")
    .select("id, enrollment_status")
    .eq("phone_e164", e164)
    .maybeSingle();

  if (existing) {
    const { error } = await supa
      .from("registrations")
      .update({
        full_name: fullName,
        university,
        academic_status: academicStatus,
        attendance_preference: attendance,
        program_interest: interest,
        consent: true,
      })
      .eq("id", existing.id);
    if (error) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
    return NextResponse.json({ ok: true, duplicate: true, verificationStatus: "pending" });
  }

  const { error } = await supa.from("registrations").insert({
    full_name: fullName,
    university,
    academic_status: academicStatus,
    country_iso: countryIso,
    country_dial: countryDial,
    phone_e164: e164,
    whatsapp_verified: false,
    // No WhatsApp OTP provider is configured yet: the number is format-validated
    // only and stays pending verification until the provider is connected.
    verification_status: "pending",
    attendance_preference: attendance,
    program_interest: interest,
    consent: true,
    enrollment_status: "registered",
  });
  if (error) {
    if (error.code === "23505") return NextResponse.json({ ok: true, duplicate: true, verificationStatus: "pending" });
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const settings = await getProgramSettings();
  return NextResponse.json({
    ok: true,
    duplicate: false,
    verificationStatus: "pending",
    confirmationMessage: settings.confirmationMessage,
    startDate: settings.startDate,
  });
}
