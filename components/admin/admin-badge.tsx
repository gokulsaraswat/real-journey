import type { ReactNode } from "react";

type AdminBadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

type AdminBadgeProps = {
  children: ReactNode;
  tone?: AdminBadgeTone;
};

const toneClassName: Record<AdminBadgeTone, string> = {
  neutral: "border-[color:var(--card-border)] bg-[var(--card-strong)] text-[var(--foreground-soft)]",
  accent: "border-[color:var(--card-border)] bg-[var(--accent-soft)] text-[var(--foreground)]",
  success: "border-emerald-500/20 bg-emerald-500/10 text-[var(--foreground)]",
  warning: "border-amber-500/20 bg-amber-500/10 text-[var(--foreground)]",
  danger: "border-rose-500/20 bg-rose-500/10 text-[var(--foreground)]",
};

export function AdminBadge({ children, tone = "neutral" }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClassName[tone]}`}
    >
      {children}
    </span>
  );
}

export function getStatusTone(status: string): AdminBadgeTone {
  switch (status) {
    case "published":
      return "success";
    case "review":
    case "scheduled":
      return "warning";
    case "draft":
      return "accent";
    default:
      return "neutral";
  }
}

export function getVisibilityTone(visibility: string): AdminBadgeTone {
  switch (visibility) {
    case "public":
      return "success";
    case "mixed":
      return "warning";
    case "private":
      return "danger";
    default:
      return "neutral";
  }
}

export function getKindTone(kind: string): AdminBadgeTone {
  switch (kind) {
    case "topic":
      return "accent";
    case "blog":
      return "neutral";
    case "story":
      return "warning";
    case "resource":
      return "danger";
    default:
      return "neutral";
  }
}
