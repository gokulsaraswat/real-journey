import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";
import {
  applyRateLimit as consumeRateLimit,
  pruneRateLimitStore,
  type RateLimitResult,
} from "@/lib/security/rate-limit";

function normalizeOrigin(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return null;
  }
}

function parseCsvOrigins(raw?: string | null): string[] {
  return (raw ?? "")
    .split(",")
    .map((value) => normalizeOrigin(value.trim()))
    .filter((value): value is string => Boolean(value));
}

export function getTrustedOrigins(): string[] {
  const requestHost = normalizeOrigin(process.env.REAL_JOURNEY_REQUEST_HOST)
    ? normalizeOrigin(`https://${process.env.REAL_JOURNEY_REQUEST_HOST}`)
    : null;

  const values = [
    normalizeOrigin(siteConfig.baseUrl),
    normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? normalizeOrigin(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
      : null,
    process.env.VERCEL_URL ? normalizeOrigin(`https://${process.env.VERCEL_URL}`) : null,
    requestHost,
    ...parseCsvOrigins(process.env.REAL_JOURNEY_TRUSTED_ORIGINS),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];

  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function getRequestHostOrigin(request: Request): string | null {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) {
    return null;
  }

  const protocol = request.headers.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  return normalizeOrigin(`${protocol}://${host}`);
}

export function getRequestOrigin(request: Request): string | null {
  return normalizeOrigin(request.headers.get("origin")) ?? normalizeOrigin(request.headers.get("referer"));
}

export function rejectJson(message: string, status = 403): NextResponse {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function requireTrustedOrigin(request: Request, message: string): NextResponse | null {
  const requestOrigin = getRequestOrigin(request);
  const allowedOrigins = new Set([...getTrustedOrigins(), getRequestHostOrigin(request)].filter(Boolean) as string[]);

  if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
    return rejectJson(message, 403);
  }

  return null;
}

export function getClientAddress(request: Request): string {
  const forwardedFor = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export function readPositiveIntEnv(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function enforceRequestRateLimit(
  request: Request,
  options: {
    bucket: string;
    limit: number;
    windowMs: number;
    message?: string;
  },
): NextResponse | null {
  pruneRateLimitStore();

  const result = consumeRateLimit(`${options.bucket}:${getClientAddress(request)}`, {
    prefix: "request",
    limit: options.limit,
    windowMs: options.windowMs,
  });

  if (result.ok) {
    return null;
  }

  return buildRateLimitResponse(result, options.message ?? "Too many requests. Try again soon.");
}

function buildRateLimitResponse(result: RateLimitResult, message: string): NextResponse {
  return NextResponse.json(
    { error: message },
    {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(result.retryAfterSeconds),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(result.resetAt),
      },
    },
  );
}
