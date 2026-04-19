import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

const friendlyReasons: Record<string, string> = {
  "missing-token": "The login callback did not include a valid verification token.",
  otp: "The passwordless sign-in link could not be verified.",
  callback: "The Supabase auth callback could not complete the session exchange.",
  "not-admin": "Your account is valid, but it is not in the current admin allowlist.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reasonValue = typeof params.reason === "string" ? params.reason : "callback";
  const messageValue = typeof params.message === "string" ? params.message : "";
  const reason = friendlyReasons[reasonValue] ?? friendlyReasons.callback;
  const message = messageValue.trim();

  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="mx-auto max-w-3xl card-surface-strong p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
          Auth error
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Sign-in could not be completed
        </h1>
        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {reason}
        </p>

        {message ? (
          <div className="mt-6 rounded-3xl border border-amber-500/25 bg-amber-500/10 p-5 text-sm leading-6 text-amber-100 dark:text-amber-50">
            {message}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
          >
            Back to login
          </Link>
          <a
            href={siteConfig.feedbackEmailHref}
            className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
          >
            Request access by email
          </a>
        </div>
      </div>
    </section>
  );
}
