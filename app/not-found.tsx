import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="card-surface max-w-2xl p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
          Missing route
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          This path is not part of the journey yet.
        </h1>
        <p className="mt-4 text-base text-[var(--foreground-soft)] sm:text-lg">
          The route may belong to a future feature branch or has not been generated yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
