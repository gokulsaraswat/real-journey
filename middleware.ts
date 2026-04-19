import { NextResponse, type NextRequest } from "next/server";
import { applySecurityHeaders } from "@/lib/security/headers";
import { updateSession } from "@/lib/supabase/middleware";

function needsSessionRefresh(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/stories/private") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/admin")
  );
}

export async function middleware(request: NextRequest) {
  const response = needsSessionRefresh(request.nextUrl.pathname)
    ? await updateSession(request)
    : NextResponse.next({ request });

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest|robots.txt|sitemap.xml|opengraph-image|twitter-image).*)",
  ],
};
