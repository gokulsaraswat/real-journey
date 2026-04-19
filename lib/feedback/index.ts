import { siteConfig } from "@/lib/config/site";
import {
  feedbackCategoryLabels,
  feedbackCategoryOptions,
  feedbackDeliveryLabels,
  isFeedbackCategoryValue,
  isFeedbackDeliveryValue,
  isFeedbackVisibilityValue,
  type FeedbackCategoryValue,
  type FeedbackDeliveryValue,
  type FeedbackVisibilityValue,
} from "@/lib/data/contribute";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export type FeedbackSubmissionInput = {
  name: string;
  email: string;
  subject: string;
  category: FeedbackCategoryValue;
  delivery: FeedbackDeliveryValue;
  visibility: FeedbackVisibilityValue;
  pageUrl?: string;
  message: string;
};

export type FeedbackSubmissionRecord = FeedbackSubmissionInput & {
  id: string;
  createdAt: string;
  status: "new" | "triaged" | "queued";
  githubIssueUrl: string;
  emailHref: string;
  source: "web-form" | "seed";
};

const seedFeedbackSubmissions: FeedbackSubmissionRecord[] = [
  {
    id: "seed-feedback-http-caching-link",
    createdAt: "2026-04-14T08:30:00.000Z",
    status: "new",
    source: "seed",
    name: "Aarav",
    email: "aarav@example.com",
    subject: "Broken related-topic link in HTTP caching page",
    category: "bug-report",
    delivery: "github",
    visibility: "public",
    pageUrl: "/topic/http-caching-and-versioning",
    message:
      "The related topic card in the HTTP caching page points to the wrong slug. The page content is good, but the navigation path breaks the reading flow.",
    githubIssueUrl: "https://github.com/your-username/real-journey/issues/new?template=bug-report.md",
    emailHref: "mailto:hello@realjourney.dev?subject=Real%20Journey%20feedback",
  },
  {
    id: "seed-feedback-ai-topic-request",
    createdAt: "2026-04-13T12:10:00.000Z",
    status: "triaged",
    source: "seed",
    name: "Mira",
    email: "mira@example.com",
    subject: "Add AI systems reliability under senior engineer track",
    category: "topic-request",
    delivery: "both",
    visibility: "public",
    pageUrl: "/learn/ai/senior-engineer",
    message:
      "Please add an AI systems reliability subcategory with topics like eval loops, model rollback, prompt regression checks, and monitoring design.",
    githubIssueUrl: "https://github.com/your-username/real-journey/issues/new?template=topic-request.md",
    emailHref: "mailto:hello@realjourney.dev?subject=Real%20Journey%20feedback",
  },
  {
    id: "seed-feedback-private-story-question",
    createdAt: "2026-04-12T18:45:00.000Z",
    status: "queued",
    source: "seed",
    name: "Nikhil",
    email: "nikhil@example.com",
    subject: "Private story access question",
    category: "general",
    delivery: "email",
    visibility: "private",
    pageUrl: "/stories/private",
    message:
      "A private interview vault item should not surface in public search. I am sending this by email because the note references a private path.",
    githubIssueUrl: "https://github.com/your-username/real-journey/issues/new?template=topic-request.md",
    emailHref: "mailto:hello@realjourney.dev?subject=Real%20Journey%20feedback",
  },
];

function normalizeRepoUrl(repoUrl: string): string {
  return repoUrl.replace(/\.git$/u, "").replace(/\/$/u, "");
}

function getIssueTemplate(category: FeedbackCategoryValue): string {
  return feedbackCategoryOptions.find((option) => option.value === category)?.issueTemplate ?? "topic-request.md";
}

function encodeMailtoParam(value: string): string {
  return encodeURIComponent(value).replace(/%20/gu, "+");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value);
}

function normalizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/gu, " ").slice(0, maxLength);
}

function normalizeMultilineText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\r\n/gu, "\n").slice(0, maxLength);
}

function normalizeOptionalPageUrl(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim().slice(0, 320);
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return undefined;
}

export function normalizeFeedbackInput(raw: unknown):
  | { ok: true; value: FeedbackSubmissionInput }
  | { ok: false; error: string } {
  const objectValue = typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  const name = normalizeText(objectValue.name, 80);
  const email = normalizeText(objectValue.email, 120).toLowerCase();
  const subject = normalizeText(objectValue.subject, 140);
  const category = isFeedbackCategoryValue(objectValue.category) ? objectValue.category : "general";
  const delivery = isFeedbackDeliveryValue(objectValue.delivery) ? objectValue.delivery : "both";
  const visibility = isFeedbackVisibilityValue(objectValue.visibility) ? objectValue.visibility : "public";
  const pageUrl = normalizeOptionalPageUrl(objectValue.pageUrl);
  const message = normalizeMultilineText(objectValue.message, 4000);

  if (!name) {
    return { ok: false, error: "Enter your name before sending feedback." };
  }

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (!subject) {
    return { ok: false, error: "Add a short subject so the feedback stays easy to triage." };
  }

  if (message.length < 20) {
    return { ok: false, error: "Add a little more detail so the feedback can be actioned." };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      subject,
      category,
      delivery,
      visibility,
      pageUrl,
      message,
    },
  };
}

export function buildGitHubIssueUrl(input: FeedbackSubmissionInput): string {
  const repoUrl = normalizeRepoUrl(siteConfig.githubRepoUrl);
  const template = getIssueTemplate(input.category);
  const title = `[${feedbackCategoryLabels[input.category]}] ${input.subject}`;
  const body = [
    "## Summary",
    input.message,
    "",
    "## Submission details",
    `- Name: ${input.name}`,
    `- Email: ${input.email}`,
    `- Category: ${feedbackCategoryLabels[input.category]}`,
    `- Delivery preference: ${feedbackDeliveryLabels[input.delivery]}`,
    `- Visibility request: ${input.visibility}`,
    `- Page URL: ${input.pageUrl ?? "Not provided"}`,
    "",
    "## Notes",
    "- Keep private story material out of public issues.",
    "- Link the final pull request when implementation starts.",
  ].join("\n");

  return `${repoUrl}/issues/new?template=${encodeURIComponent(template)}&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
}

export function buildFeedbackEmailHref(input: FeedbackSubmissionInput): string {
  const subject = `[Real Journey] ${feedbackCategoryLabels[input.category]} - ${input.subject}`;
  const body = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Category: ${feedbackCategoryLabels[input.category]}`,
    `Delivery preference: ${feedbackDeliveryLabels[input.delivery]}`,
    `Visibility: ${input.visibility}`,
    `Page URL: ${input.pageUrl ?? "Not provided"}`,
    "",
    input.message,
  ].join("\n");

  return `mailto:${siteConfig.feedbackEmail}?subject=${encodeMailtoParam(subject)}&body=${encodeMailtoParam(body)}`;
}

export function formatFeedbackDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export async function saveFeedbackSubmission(input: FeedbackSubmissionInput): Promise<{
  saved: boolean;
  id?: string;
  githubIssueUrl: string;
  emailHref: string;
  error?: string;
}> {
  const githubIssueUrl = buildGitHubIssueUrl(input);
  const emailHref = buildFeedbackEmailHref(input);

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("feedback_submissions")
      .insert({
        name: input.name,
        email: input.email,
        subject: input.subject,
        category: input.category,
        delivery: input.delivery,
        visibility: input.visibility,
        page_url: input.pageUrl ?? null,
        message: input.message,
        github_issue_url: githubIssueUrl,
        email_href: emailHref,
        status: "new",
        source: "web-form",
      })
      .select("id")
      .single();

    if (error) {
      return {
        saved: false,
        githubIssueUrl,
        emailHref,
        error: error.message,
      };
    }

    return {
      saved: true,
      id: typeof data?.id === "string" ? data.id : undefined,
      githubIssueUrl,
      emailHref,
    };
  } catch (error) {
    return {
      saved: false,
      githubIssueUrl,
      emailHref,
      error: error instanceof Error ? error.message : "Feedback draft created without database persistence.",
    };
  }
}

function mapFeedbackRow(row: Record<string, unknown>): FeedbackSubmissionRecord {
  const fallback = seedFeedbackSubmissions[0];
  const normalizedInputResult = normalizeFeedbackInput({
    name: row.name,
    email: row.email,
    subject: row.subject,
    category: row.category,
    delivery: row.delivery,
    visibility: row.visibility,
    pageUrl: row.page_url,
    message: row.message,
  });

  const input = normalizedInputResult.ok ? normalizedInputResult.value : fallback;

  return {
    id: typeof row.id === "string" ? row.id : fallback.id,
    createdAt: typeof row.created_at === "string" ? row.created_at : fallback.createdAt,
    status:
      row.status === "triaged" || row.status === "queued" || row.status === "new"
        ? row.status
        : "new",
    source: row.source === "web-form" ? "web-form" : "seed",
    name: input.name,
    email: input.email,
    subject: input.subject,
    category: input.category,
    delivery: input.delivery,
    visibility: input.visibility,
    pageUrl: input.pageUrl,
    message: input.message,
    githubIssueUrl:
      typeof row.github_issue_url === "string" && row.github_issue_url
        ? row.github_issue_url
        : buildGitHubIssueUrl(input),
    emailHref:
      typeof row.email_href === "string" && row.email_href ? row.email_href : buildFeedbackEmailHref(input),
  };
}

export async function listFeedbackSubmissions(limit = 12): Promise<FeedbackSubmissionRecord[]> {
  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("feedback_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !Array.isArray(data) || data.length === 0) {
      return seedFeedbackSubmissions.slice(0, limit);
    }

    return data.map((row) => mapFeedbackRow(row as Record<string, unknown>));
  } catch {
    return seedFeedbackSubmissions.slice(0, limit);
  }
}
