function unique(values: Array<string | false | null | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => typeof value === "string" && value.length > 0))];
}

function join(values: Array<string | false | null | undefined>): string {
  return unique(values).join(" ");
}

export function buildContentSecurityPolicy(): string {
  const isDevelopment = process.env.NODE_ENV !== "production";

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    `connect-src ${join([
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS ? "https://vitals.vercel-insights.com" : false,
      process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS ? "https://vitals.vercel-insights.com" : false,
      isDevelopment && "http://localhost:3000",
      isDevelopment && "ws://localhost:3000",
      isDevelopment && "http://127.0.0.1:3000",
      isDevelopment && "ws://127.0.0.1:3000",
    ])}`,
    "font-src 'self' data: https:",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "img-src 'self' data: blob: https:",
    "manifest-src 'self'",
    "media-src 'self' blob: data:",
    "object-src 'none'",
    `script-src ${join(["'self'", "'unsafe-inline'", isDevelopment && "'unsafe-eval'"])}`,
    `style-src ${join(["'self'", "'unsafe-inline'"])}`,
    "worker-src 'self' blob:",
    !isDevelopment && "upgrade-insecure-requests",
  ].filter(Boolean);

  return directives.join("; ");
}
