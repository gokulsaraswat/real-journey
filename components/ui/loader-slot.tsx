type LoaderSlotProps = {
  title?: string;
  description?: string;
};

export function LoaderSlot({
  title = "Loader slot ready",
  description = "Replace the fallback animation with your own GIF later.",
}: LoaderSlotProps) {
  return (
    <div className="card-surface w-full max-w-xl p-6 sm:p-8">
      <div className="flex items-start gap-5">
        <div className="relative h-16 w-16 shrink-0 rounded-full border border-[color:var(--card-border)] bg-[var(--accent-soft)]">
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span
            className="absolute inset-[12px] animate-spin rounded-full border-2 border-transparent"
            style={{ borderTopColor: "var(--accent)", borderRightColor: "var(--accent-2)" }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
            Loading UI
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">{description}</p>
          <div className="mt-5 rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
            Future GIF path: <span className="font-mono text-[var(--foreground)]">/public/loader/real-journey-loader.gif</span>
          </div>
        </div>
      </div>
    </div>
  );
}
