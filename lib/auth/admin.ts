import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function getAdminEmailAllowlist(): string[] {
  const raw = process.env.ADMIN_EMAIL_ALLOWLIST ?? process.env.SUPABASE_ADMIN_EMAILS ?? "";

  return raw
    .split(",")
    .map((entry) => normalizeEmail(entry))
    .filter(Boolean);
}

export function hasConfiguredAdminAllowlist(): boolean {
  return getAdminEmailAllowlist().length > 0;
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) {
    return false;
  }

  const allowlist = getAdminEmailAllowlist();
  if (allowlist.length === 0) {
    return false;
  }

  return allowlist.includes(normalizeEmail(email));
}

export function isAdminUser(user?: Pick<User, "email"> | null): boolean {
  return isAdminEmail(user?.email ?? null);
}

export function toSafeNextPath(value?: string | null, fallback = "/admin"): string {
  if (!value) {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function getLoginReasonCopy(reason?: string | null): string | null {
  switch (reason) {
    case "auth-required":
      return "Login is required before opening the admin workspace.";
    case "not-admin":
      return "That account is signed in, but it is not on the admin allowlist yet.";
    case "missing-supabase":
      return "Supabase environment values are missing. Add them to .env.local first.";
    case "missing-admin-config":
      return "ADMIN_EMAIL_ALLOWLIST is empty. Add at least one admin email before testing auth.";
    case "private-stories":
      return "Private stories are separated from public content and require admin access.";
    case "callback-failed":
      return "The auth callback could not complete. Request a fresh magic link and try again.";
    case "auth-error":
      return "Supabase returned an auth error. Check your redirect URL settings and try again.";
    case "signed-out":
      return "You have been signed out.";
    default:
      return null;
  }
}

export async function getAuthenticatedUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user ?? null;
}

export type AdminAccessState = {
  user: User | null;
  isAdmin: boolean;
  reason?: "missing-admin-config" | "missing-supabase" | "auth-required" | "not-admin";
};

export async function getAdminAccessState(): Promise<AdminAccessState> {
  if (!hasConfiguredAdminAllowlist()) {
    return {
      user: null,
      isAdmin: false,
      reason: "missing-admin-config",
    };
  }

  let user: User | null = null;

  try {
    user = await getAuthenticatedUser();
  } catch {
    return {
      user: null,
      isAdmin: false,
      reason: "missing-supabase",
    };
  }

  if (!user?.email) {
    return {
      user: null,
      isAdmin: false,
      reason: "auth-required",
    };
  }

  if (!isAdminUser(user)) {
    return {
      user,
      isAdmin: false,
      reason: "not-admin",
    };
  }

  return {
    user,
    isAdmin: true,
  };
}

export async function requireAdminUser(nextPath = "/admin"): Promise<User> {
  const safeNextPath = toSafeNextPath(nextPath, "/admin");

  if (!hasConfiguredAdminAllowlist()) {
    redirect(`/login?redirect=${encodeURIComponent(safeNextPath)}&reason=missing-admin-config`);
  }

  let user: User | null = null;

  try {
    user = await getAuthenticatedUser();
  } catch {
    redirect(`/login?redirect=${encodeURIComponent(safeNextPath)}&reason=missing-supabase`);
  }

  if (!user?.email) {
    redirect(`/login?redirect=${encodeURIComponent(safeNextPath)}&reason=auth-required`);
  }

  if (!isAdminUser(user)) {
    redirect(`/auth/error?reason=not-admin`);
  }

  return user;
}
