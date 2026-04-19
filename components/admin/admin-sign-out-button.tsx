"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function AdminSignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSignOut() {
    setPending(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        setError(signOutError.message);
        setPending(false);
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out right now.");
      setPending(false);
    }
  }

  return (
    <div className="space-y-3 rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
      <p className="text-sm font-semibold">Admin session</p>
      <p className="text-sm leading-6 text-[var(--foreground-soft)]">
        The admin area is now protected through Supabase auth and an email allowlist.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        disabled={pending}
        className="inline-flex rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Signing out..." : "Sign out"}
      </button>
      {error ? <p className="text-xs leading-5 text-red-300 dark:text-red-200">{error}</p> : null}
    </div>
  );
}
