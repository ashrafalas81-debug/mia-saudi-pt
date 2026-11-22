import { NextResponse } from "next/server";
import { getProgramSettings } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getProgramSettings();
  return NextResponse.json({ ok: true, settings });
}
