import { NextRequest, NextResponse } from "next/server";
import { anonClient, serviceClient, ADMIN_EMAIL, ADMIN_COOKIE, dbConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "missing_credentials" }, { status: 400 });
  }
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }
  const supa = anonClient();
  const { data, error } = await supa.auth.signInWithPassword({ email, password });
  if (error || !data.session) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }
  // confirm against service role that this is really the allowlisted account
  const { data: userData, error: userErr } = await serviceClient().auth.getUser(data.session.access_token);
  if (userErr || userData.user?.email?.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, data.session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
