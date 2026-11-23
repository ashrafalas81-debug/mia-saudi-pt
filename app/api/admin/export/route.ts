import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serviceClient, validateAdminToken, ADMIN_COOKIE } from "@/lib/supabase";

export async function GET() {
  const store = await cookies();
  const admin = await validateAdminToken(store.get(ADMIN_COOKIE)?.value);
  if (!admin) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const { data, error } = await serviceClient()
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });

  const headers = [
    "full_name","university","academic_status","country_iso","phone_e164",
    "whatsapp_verified","attendance_preference","program_interest","registration_type","group_members",
    "enrollment_status","admin_notes","created_at",
  ];
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.join(",")]
    .concat((data || []).map((r: Record<string, unknown>) => headers.map((h) => esc(r[h])).join(",")))
    .join("\n");

  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mia-registrations.csv"',
    },
  });
}
