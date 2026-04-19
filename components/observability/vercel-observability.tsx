"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/config/site";

const blockedPrefixes = ["/admin", "/auth", "/login", "/stories/private", "/api/admin"];

function shouldIgnoreUrl(rawUrl: string) {
  try {
    const pathname = new URL(rawUrl, siteConfig.baseUrl).pathname;
    return blockedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  } catch {
    return blockedPrefixes.some((prefix) => rawUrl.includes(prefix));
  }
}

export function VercelObservability() {
  const { analyticsEnabled, speedInsightsEnabled, speedInsightsSampleRate } = siteConfig.observability;

  if (!analyticsEnabled && !speedInsightsEnabled) {
    return null;
  }

  return (
    <>
      {analyticsEnabled ? (
        <Analytics beforeSend={(event) => (shouldIgnoreUrl(event.url) ? null : event)} />
      ) : null}

      {speedInsightsEnabled ? (
        <SpeedInsights
          sampleRate={speedInsightsSampleRate}
          beforeSend={(event) => (shouldIgnoreUrl(event.url) ? null : event)}
        />
      ) : null}
    </>
  );
}
