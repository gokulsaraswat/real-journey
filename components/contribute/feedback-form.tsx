"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  feedbackCategoryOptions,
  feedbackDeliveryOptions,
  type FeedbackCategoryValue,
  type FeedbackDeliveryValue,
  type FeedbackVisibilityValue,
} from "@/lib/data/contribute";

type FeedbackResult = {
  saved: boolean;
  issueUrl: string;
  emailHref: string;
  id?: string;
  warning?: string;
};

type FeedbackFormState = {
  name: string;
  email: string;
  subject: string;
  category: FeedbackCategoryValue;
  delivery: FeedbackDeliveryValue;
  visibility: FeedbackVisibilityValue;
  pageUrl: string;
  message: string;
};

const initialFormState: FeedbackFormState = {
  name: "",
  email: "",
  subject: "",
  category: "general",
  delivery: "both",
  visibility: "public",
  pageUrl: "",
  message: "",
};

export function FeedbackForm() {
  const [form, setForm] = useState<FeedbackFormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [result, setResult] = useState<FeedbackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setForm((current) => {
      if (current.pageUrl) {
        return current;
      }

      return {
        ...current,
        pageUrl: `${window.location.pathname}${window.location.search}`,
      };
    });
  }, []);

  const needsGitHubDraft = useMemo(() => form.delivery === "github" || form.delivery === "both", [form.delivery]);
  const needsEmailDraft = useMemo(() => form.delivery === "email" || form.delivery === "both", [form.delivery]);

  function updateField<Key extends keyof FeedbackFormState>(key: Key, value: FeedbackFormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as FeedbackResult & { error?: string };

      if (!response.ok) {
        setStatus("error");
        setError(payload.error ?? "Could not prepare the feedback handoff.");
        return;
      }

      setStatus("success");
      setResult({
        saved: payload.saved,
        issueUrl: payload.issueUrl,
        emailHref: payload.emailHref,
        id: payload.id,
        warning: payload.warning,
      });
      setForm((current) => ({
        ...initialFormState,
        pageUrl: current.pageUrl,
        delivery: current.delivery,
        visibility: current.visibility,
      }));
    } catch {
      setStatus("error");
      setError("Could not send the feedback right now.");
    }
  }

  return (
    <div className="card-surface-strong overflow-hidden p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">Feedback composer</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Send one note, open GitHub and email drafts together
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
          This form prepares a GitHub issue draft, an email draft, and a shared admin inbox record when Supabase is configured.
        </p>
      </div>

      <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Your name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              placeholder="Gokul or contributor name"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              placeholder="name@example.com"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Category</span>
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value as FeedbackCategoryValue)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
            >
              {feedbackCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-xs leading-6 text-[var(--foreground-soft)]">
              {feedbackCategoryOptions.find((option) => option.value === form.category)?.description}
            </span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Delivery lane</span>
            <select
              value={form.delivery}
              onChange={(event) => updateField("delivery", event.target.value as FeedbackDeliveryValue)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
            >
              {feedbackDeliveryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-xs leading-6 text-[var(--foreground-soft)]">
              {feedbackDeliveryOptions.find((option) => option.value === form.delivery)?.description}
            </span>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12rem]">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Subject</span>
            <input
              type="text"
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              placeholder="Short title for the feedback"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Visibility</span>
            <select
              value={form.visibility}
              onChange={(event) => updateField("visibility", event.target.value as FeedbackVisibilityValue)}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
            >
              <option value="public">Public-safe</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Page URL or path</span>
          <input
            type="text"
            value={form.pageUrl}
            onChange={(event) => updateField("pageUrl", event.target.value)}
            className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
            placeholder="/topic/http-request-lifecycle"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Message</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-40 w-full rounded-3xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-4 text-sm leading-7 outline-none"
            placeholder="Explain the bug, idea, correction, or content request. Mention the page path if it matters."
            required
          />
        </label>

        <div className="grid gap-4 rounded-3xl border border-[color:var(--card-border)] bg-[var(--card)] p-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">Draft output</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              {needsGitHubDraft && needsEmailDraft
                ? "This submission will prepare both a GitHub issue draft and an email draft."
                : needsGitHubDraft
                  ? "This submission will prepare a GitHub issue draft."
                  : "This submission will prepare an email draft."}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Privacy note</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              Choose private when the note references personal files, interview material, or anything that should stay out of public issue threads.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "submitting" ? "Preparing drafts..." : "Create feedback handoff"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm((current) => ({ ...initialFormState, pageUrl: current.pageUrl }));
              setStatus("idle");
              setError(null);
              setResult(null);
            }}
            className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
          >
            Reset form
          </button>
        </div>
      </form>

      {error ? (
        <div className="mt-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200 dark:text-red-100">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-100 dark:text-emerald-50">
          <p className="font-semibold">
            {result.saved
              ? `Feedback saved${result.id ? ` with ID ${result.id}` : ""}.`
              : "Feedback draft prepared without database persistence."}
          </p>
          <p className="mt-2 text-sm leading-6 text-emerald-100/90 dark:text-emerald-50/90">
            Open the GitHub or email draft next so the note reaches the review flow.
          </p>
          {result.warning ? <p className="mt-2 text-sm leading-6">{result.warning}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3">
            {needsGitHubDraft ? (
              <a
                href={result.issueUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
              >
                Open GitHub draft
              </a>
            ) : null}
            {needsEmailDraft ? (
              <a
                href={result.emailHref}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              >
                Open email draft
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
