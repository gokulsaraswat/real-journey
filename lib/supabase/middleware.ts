import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasConfiguredAdminAllowlist, isAdminEmail } from "@/lib/auth/admin";

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const pathname = request.nextUrl.pathname;
  const isProtectedAdminRoute = pathname.startsWith("/admin");
  const isPrivateStoriesRoute = pathname.startsWith("/stories/private");

  let response = NextResponse.next({ request });
  response.headers.set("Cache-Control", "private, no-store");

  if (!url || !key) {
    if (isProtectedAdminRoute || isPrivateStoriesRoute) {
      return redirectWithState(request, response, {
        reason: "missing-supabase",
      });
    }

    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });
        response.headers.set("Cache-Control", "private, no-store");

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isProtectedAdminRoute && !isPrivateStoriesRoute) {
    return response;
  }

  if (!hasConfiguredAdminAllowlist()) {
    return redirectWithState(request, response, {
      reason: "missing-admin-config",
    });
  }

  if (!user) {
    return redirectWithState(request, response, {
      reason: isPrivateStoriesRoute ? "private-stories" : "auth-required",
    });
  }

  if (!isAdminEmail(user.email)) {
    return redirectWithState(request, response, {
      reason: "not-admin",
    });
  }

  return response;
}

function redirectWithState(
  request: NextRequest,
  response: NextResponse,
  options: { reason: string },
) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("reason", options.reason);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}` || "/admin",
  );

  const redirectResponse = NextResponse.redirect(loginUrl);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "location") {
      redirectResponse.headers.set(key, value);
    }
  });
  redirectResponse.headers.set("Cache-Control", "private, no-store");

  return redirectResponse;
}
