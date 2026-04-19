import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: siteConfig.name,
    owner: siteConfig.owner,
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
    timestamp: new Date().toISOString(),
    checks: {
      siteUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
      feedbackEmailConfigured: Boolean(process.env.NEXT_PUBLIC_FEEDBACK_EMAIL),
      githubRepoConfigured: Boolean(process.env.NEXT_PUBLIC_GITHUB_REPO_URL)
    }
  });
}

export function HEAD() {
  return new Response(null, { status: 200 });
}
