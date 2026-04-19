import { NextResponse } from "next/server";
import { normalizeFeedbackInput, saveFeedbackSubmission } from "@/lib/feedback/index";
import {
  enforceRequestRateLimit,
  readPositiveIntEnv,
  requireTrustedOrigin,
} from "@/lib/security/request-guards";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireTrustedOrigin(
    request,
    "Feedback submissions only accept same-origin requests.",
  );
  if (originError) {
    return originError;
  }

  const rateLimitError = enforceRequestRateLimit(request, {
    bucket: "feedback",
    limit: readPositiveIntEnv("REAL_JOURNEY_FEEDBACK_RATE_LIMIT", 8),
    windowMs: readPositiveIntEnv("REAL_JOURNEY_FEEDBACK_RATE_LIMIT_WINDOW_MS", 15 * 60 * 1000),
    message: "Feedback is arriving too quickly from this address. Try again shortly.",
  });
  if (rateLimitError) {
    return rateLimitError;
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json(
        { saved: false, warning: "Feedback request ignored." },
        { status: 202, headers: { "Cache-Control": "no-store" } },
      );
    }

    const normalized = normalizeFeedbackInput(body);
    if (!normalized.ok) {
      return NextResponse.json(
        { error: normalized.error },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const result = await saveFeedbackSubmission(normalized.value);

    return NextResponse.json(
      {
        saved: result.saved,
        id: result.id,
        issueUrl: result.githubIssueUrl,
        emailHref: result.emailHref,
        warning: result.saved ? undefined : result.error ?? "Feedback draft created without database persistence.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not prepare the feedback handoff right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
