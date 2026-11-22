import { NextRequest, NextResponse } from "next/server";

// Light gate: the cookie presence check here keeps casual visitors out of /admin;
// every admin API route re-validates the token against Supabase Auth + allowlist.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("mia_admin")?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/admin"] };
