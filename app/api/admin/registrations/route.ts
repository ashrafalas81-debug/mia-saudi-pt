import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serviceClient, validateAdminToken, ADMIN_COOKIE } from "@/lib/supabase";

async function requireAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return validateAdminToken(token);
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const sp = req.nextUrl.searchParams;
  const search = (sp.get("search") || "").trim();
  const status = sp.get("academicStatus") || "";
  const interest = sp.get("interest") || "";
  const enrollment = sp.get("enrollment") || "";

  const supa = serviceClient();
  let q = supa.from("registrations").select("*").order("created_at", { ascending: false }).limit(1000);
  if (search) q = q.or(`full_name.ilike.%${search}%,phone_e164.ilike.%${search}%,university.ilike.%${search}%`);
  if (status) q = q.eq("academic_status", status);
  if (interest) q = q.eq("program_interest", interest);
  if (enrollment) q = q.eq("enrollment_status", enrollment);

  const { data, error } = await q;
  if (error) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });

  const rows = data || [];
  const stats = {
    total: rows.length,
    verified: rows.filter((r) => r.whatsapp_verified).length,
    pendingVerification: rows.filter((r) => !r.whatsapp_verified).length,
    live: rows.filter((r) => r.attendance_preference === "live").length,
    recorded: rows.filter((r) => r.attendance_preference === "recorded").length,
    both: rows.filter((r) => r.attendance_preference === "both").length,
    byCountry: countBy(rows, "country_iso"),
    byUniversity: countBy(rows, "university"),
  };
  return NextResponse.json({ ok: true, registrations: rows, stats });
}

function countBy(rows: Record<string, unknown>[], key: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const r of rows) {
    const k = String(r[key] || "");
    out[k] = (out[k] || 0) + 1;
  }
  return out;
}

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const patch: Record<string, unknown> = {};
  if (typeof body.enrollmentStatus === "string") {
    if (!["registered", "contacted", "confirmed", "enrolled"].includes(body.enrollmentStatus)) {
      return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 422 });
    }
    patch.enrollment_status = body.enrollmentStatus;
  }
  if (typeof body.adminNotes === "string") patch.admin_notes = body.adminNotes;
  if (typeof body.whatsappVerified === "boolean") {
    patch.whatsapp_verified = body.whatsappVerified;
    patch.verification_status = body.whatsappVerified ? "verified" : "pending";
  }
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: "nothing_to_update" }, { status: 400 });
  }
  const { error } = await serviceClient().from("registrations").update(patch).eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
