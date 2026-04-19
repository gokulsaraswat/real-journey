"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/config/site";

const accessChecks = [
  "Admin access comes first",
  "Multiple admin roles can be added later",
  "Users can contribute through GitHub and send feedback by email",
] as const;

const futureCapabilities = [
  "Protected admin routes",
  "Private story storage rules",
  "Review queue for uploads and publishing",
] as const;

const loginReasonCopy: Record<string, string> = {
  "auth-required": "Login is required before opening the admin workspace.",
  "not-admin": "That account is signed in, but it is not on the admin allowlist yet.",
  "missing-supabase": "Supabase environment values are missing. Add them to .env.local first.",
  "missing-admin-config": "Add ADMIN_EMAIL_ALLOWLIST in .env.local before testing admin auth.",
  "private-stories": "Private stories require admin access.",
  "signed-out": "You have been signed out.",
};

export function AccessPortal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = useMemo(() => {
    const raw = searchParams.get("redirect") ?? searchParams.get("next");
    return raw && raw.startsWith("/") ? raw : "/admin";
  }, [searchParams]);
  const loginReason = searchParams.get("reason");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "magic" | "password" | "signed-in">("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(loginReason ? loginReasonCopy[loginReason] ?? null : null);

  useEffect(() => {
    try {
      const supabase = createClient();

      supabase.auth.getUser().then(({ data }) => {
        if (data.user?.email) {
          setNotice(`Signed in as ${data.user.email}`);
          setStatus("signed-in");
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user?.email) {
          setNotice(`Signed in as ${session.user.email}`);
          setStatus("signed-in");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      setError("Supabase environment values are missing in this branch.");
      return undefined;
    }
  }, []);

  async function onMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("magic");
    setError(null);
    setNotice(null);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}`;
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: false,
        },
      });

      if (signInError) {
        setError(signInError.message);
        setStatus("idle");
        return;
      }

      setNotice(`Magic link sent to ${email}. Open the email and continue back to Real Journey.`);
      setStatus("idle");
    } catch {
      setError("Unable to start the magic-link flow right now.");
      setStatus("idle");
    }
  }

  async function onPasswordSignIn() {
    setStatus("password");
    setError(null);
    setNotice(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setStatus("idle");
        return;
      }

      router.push(redirectTarget);
      router.refresh();
    } catch {
      setError("Unable to sign in with password right now.");
      setStatus("idle");
    }
  }

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground-soft)]">Access</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Login portal for admins now, contributors later
            </h1>
            <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              This page now uses Supabase auth with an admin email allowlist. Use a magic link or password for the current admin account, while GitHub and email stay open for public contributions.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {accessChecks.map((item) => (
              <div key={item} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-5">
                <p className="text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>

          <form className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={onMagicLink}>
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Admin email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@realjourney.dev"
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
                required
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={status === "magic"}
                className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "magic" ? "Sending..." : "Send magic link"}
              </button>
            </div>
          </form>

          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Optional if your admin user has a password"
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </label>
            <div className="flex items-end gap-3">
              <button
                type="button"
                disabled={!password || status === "password"}
                onClick={onPasswordSignIn}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "password" ? "Signing in..." : "Sign in with password"}
              </button>
              {status === "signed-in" ? (
                <button
                  type="button"
                  onClick={() => {
                    router.push(redirectTarget);
                    router.refresh();
                  }}
                  className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
                >
                  Continue
                </button>
              ) : null}
            </div>
          </div>

          {notice ? (
            <div className="mt-5 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-100 dark:text-emerald-50">
              {notice}
            </div>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200 dark:text-red-100">
              {error}
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">Admin access</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">Protected control surface</p>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                The admin shell now checks Supabase auth on the server and only allows emails from your configured allowlist.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    router.push(redirectTarget);
                    router.refresh();
                  }}
                  className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
                >
                  Open admin area
                </button>
                <a
                  href={siteConfig.feedbackEmailHref}
                  className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
                >
                  Request access by email
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">Contribute</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">Git-based contribution flow</p>
              <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                Use GitHub for pull requests and structured contribution. Use email when the feedback is fast, private, or easier outside Git.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={siteConfig.githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
                >
                  Open GitHub repo
                </a>
                <Link
                  href="/contribute"
                  className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
                >
                  Contribution guide
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">What unlocks next</p>
            <div className="mt-5 grid gap-3">
              {futureCapabilities.map((item) => (
                <div key={item} className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4 text-sm leading-7">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">Quick help</p>
            <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
              If login fails, verify the Supabase URL, publishable key, service-role key, and admin email allowlist in your local environment before trying again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
