import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = sanitizeNextPath(requestUrl.searchParams.get("next"));

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    return NextResponse.redirect(
      new URL(`/auth/error?reason=callback&message=${encodeURIComponent(error.message)}`, requestUrl.origin),
    );
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    return NextResponse.redirect(
      new URL(`/auth/error?reason=otp&message=${encodeURIComponent(error.message)}`, requestUrl.origin),
    );
  }

  return NextResponse.redirect(new URL("/auth/error?reason=missing-token", requestUrl.origin));
}

function sanitizeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/")) {
    return "/admin";
  }

  return value;
}
