import type { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { hasConfiguredAdminAllowlist, isAdminUser } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type AdminApiAccessResult =
  | { ok: true; user: User }
  | { ok: false; response: NextResponse };

function jsonError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}

export async function ensureAdminApiAccess(): Promise<AdminApiAccessResult> {
  if (!hasConfiguredAdminAllowlist()) {
    return {
      ok: false,
      response: jsonError("ADMIN_EMAIL_ALLOWLIST is not configured yet.", 503),
    };
  }

  let supabase;
  try {
    supabase = await createServerSupabaseClient();
  } catch {
    return {
      ok: false,
      response: jsonError("Supabase environment values are missing for admin API access.", 503),
    };
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return {
        ok: false,
        response: jsonError("Unable to verify the current admin session.", 503),
      };
    }

    if (!user?.email) {
      return {
        ok: false,
        response: jsonError("Admin login is required for this operation.", 401),
      };
    }

    if (!isAdminUser(user)) {
      return {
        ok: false,
        response: jsonError("That signed-in account is not on the admin allowlist.", 403),
      };
    }

    return { ok: true, user };
  } catch {
    return {
      ok: false,
      response: jsonError("Supabase auth could not be checked for this request.", 503),
    };
  }
}
