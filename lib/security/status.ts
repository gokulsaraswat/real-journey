import { getAdminEmailAllowlist } from "@/lib/auth/admin";
import { siteConfig } from "@/lib/config/site";
import { getTrustedOrigins, readPositiveIntEnv } from "@/lib/security/request-guards";

export type SecurityStatusItem = {
  label: string;
  value: string;
  tone: "good" | "warn" | "neutral";
  note: string;
};

export const securityChecklist: Array<{ title: string; note: string }> = [
  {
    title: "Lock the site URL",
    note: "Set NEXT_PUBLIC_SITE_URL to the real production domain so same-origin checks stay deterministic.",
  },
  {
    title: "Keep admin emails explicit",
    note: "Use ADMIN_EMAIL_ALLOWLIST for the smallest practical admin surface instead of a broad team alias.",
  },
  {
    title: "Protect private stories",
    note: "Keep /stories/private behind admin auth and never leak private story slugs into public search or sitemap output.",
  },
  {
    title: "Review upload limits",
    note: "Uploads now validate size, extension, and mime type before parsing or storage handoff. Raise limits only when needed.",
  },
  {
    title: "Treat memory rate limits as a starter",
    note: "This patch uses in-memory throttling. Move to a shared store later if you scale beyond one instance.",
  },
  {
    title: "Rotate secrets before production",
    note: "Regenerate Supabase service-role keys if they were ever exposed in logs, screenshots, or shared branches.",
  },
];

export function getSecurityStatus(): SecurityStatusItem[] {
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
  const adminAllowlistCount = getAdminEmailAllowlist().length;
  const trustedOrigins = getTrustedOrigins();
  const feedbackRate = readPositiveIntEnv("REAL_JOURNEY_FEEDBACK_RATE_LIMIT", 8);
  const analyzeRate = readPositiveIntEnv("REAL_JOURNEY_UPLOAD_ANALYZE_RATE_LIMIT", 20);
  const storageRate = readPositiveIntEnv("REAL_JOURNEY_STORAGE_UPLOAD_RATE_LIMIT", 10);

  return [
    {
      label: "Site base URL",
      value: siteConfig.baseUrl,
      tone: siteConfig.baseUrl.startsWith("http://localhost") ? "warn" : "good",
      note: "Same-origin checks trust the configured site URL and the active request host during local development.",
    },
    {
      label: "Trusted origins",
      value: String(trustedOrigins.length),
      tone: trustedOrigins.length > 0 ? "good" : "warn",
      note: trustedOrigins.join(" • "),
    },
    {
      label: "Admin allowlist",
      value: adminAllowlistCount > 0 ? `${adminAllowlistCount} email(s)` : "Not configured",
      tone: adminAllowlistCount > 0 ? "good" : "warn",
      note: "Private stories and admin routes depend on the explicit email allowlist.",
    },
    {
      label: "Supabase auth",
      value: hasSupabase ? "Configured" : "Missing keys",
      tone: hasSupabase ? "good" : "warn",
      note: "Auth-backed admin routes require the publishable Supabase settings in .env.local.",
    },
    {
      label: "Feedback throttle",
      value: `${feedbackRate} requests / 15 min`,
      tone: "neutral",
      note: "Feedback submissions now enforce same-origin POSTs and a basic IP-backed throttle.",
    },
    {
      label: "Upload throttle",
      value: `${analyzeRate} analyze • ${storageRate} store`,
      tone: "neutral",
      note: "Admin upload analysis and storage handoff each use dedicated rate-limit buckets.",
    },
  ];
}
