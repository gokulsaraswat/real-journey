export const feedbackCategoryValues = [
  "bug-report",
  "topic-request",
  "content-correction",
  "story-idea",
  "general",
] as const;

export type FeedbackCategoryValue = (typeof feedbackCategoryValues)[number];

export const feedbackDeliveryValues = ["github", "email", "both"] as const;
export type FeedbackDeliveryValue = (typeof feedbackDeliveryValues)[number];

export const feedbackVisibilityValues = ["public", "private"] as const;
export type FeedbackVisibilityValue = (typeof feedbackVisibilityValues)[number];

export type FeedbackCategoryOption = {
  value: FeedbackCategoryValue;
  label: string;
  description: string;
  issueTemplate: string;
};

export type FeedbackDeliveryOption = {
  value: FeedbackDeliveryValue;
  label: string;
  description: string;
};

export type ContactLane = {
  title: string;
  description: string;
  bestFor: string;
};

export type ContributionTrack = {
  title: string;
  summary: string;
  branchExamples: string[];
  steps: string[];
};

export const feedbackCategoryOptions: FeedbackCategoryOption[] = [
  {
    value: "bug-report",
    label: "Bug report",
    description: "Broken UI, routing issues, bad links, parser bugs, or download problems.",
    issueTemplate: "bug-report.md",
  },
  {
    value: "topic-request",
    label: "Topic request",
    description: "Suggest a new guide, taxonomy path, or public learning topic.",
    issueTemplate: "topic-request.md",
  },
  {
    value: "content-correction",
    label: "Content correction",
    description: "Fix an error in an article, story, reader page, or download bundle.",
    issueTemplate: "topic-request.md",
  },
  {
    value: "story-idea",
    label: "Story idea",
    description: "Propose a new public story, build log, or reflection thread.",
    issueTemplate: "topic-request.md",
  },
  {
    value: "general",
    label: "General feedback",
    description: "Use when the note does not fit a tighter category.",
    issueTemplate: "topic-request.md",
  },
];

export const feedbackCategoryLabels: Record<FeedbackCategoryValue, string> = Object.fromEntries(
  feedbackCategoryOptions.map((option) => [option.value, option.label]),
) as Record<FeedbackCategoryValue, string>;

export const feedbackDeliveryOptions: FeedbackDeliveryOption[] = [
  {
    value: "github",
    label: "GitHub only",
    description: "Best for public issues, taxonomy ideas, and reproducible bugs.",
  },
  {
    value: "email",
    label: "Email only",
    description: "Best for direct contact, private notes, or less structured feedback.",
  },
  {
    value: "both",
    label: "GitHub + email",
    description: "Create a public issue draft and an email draft from one submission.",
  },
];

export const feedbackDeliveryLabels: Record<FeedbackDeliveryValue, string> = Object.fromEntries(
  feedbackDeliveryOptions.map((option) => [option.value, option.label]),
) as Record<FeedbackDeliveryValue, string>;

export const contactLanes: ContactLane[] = [
  {
    title: "GitHub issues",
    description: "Structured place for bugs, public feature requests, and reader or taxonomy improvements.",
    bestFor: "Anything that benefits from discussion history and future pull requests.",
  },
  {
    title: "GitHub pull requests",
    description: "Main lane for code, docs, templates, and contribution-ready content changes.",
    bestFor: "Changes that already have an implementation or a clean branch with reviewable commits.",
  },
  {
    title: "Direct email",
    description: "Private path for sensitive notes, access questions, or context you do not want in a public issue.",
    bestFor: "Personal feedback, private story questions, and early drafts of ideas.",
  },
];

export const contributionTracks: ContributionTrack[] = [
  {
    title: "Fix a small issue",
    summary: "Best for one broken card, copy fix, reader polish, or a small docs correction.",
    branchExamples: ["fix/blog-card-spacing", "fix/http-reader-link", "fix/story-download-copy"],
    steps: [
      "Open or reference a GitHub issue first if the change affects public behavior.",
      "Create one focused branch and keep the file surface small.",
      "Verify the changed route or component in dark and light mode before opening the pull request.",
    ],
  },
  {
    title: "Add a new content path",
    summary: "Use when adding a guide, taxonomy branch, or story collection that introduces new content structure.",
    branchExamples: [
      "feature/learn-taxonomy-ai-systems",
      "feature/blog-new-series",
      "feature/stories-certification-path",
    ],
    steps: [
      "Confirm the domain, track, level, category, and subcategory before writing the final page.",
      "Keep content drafts, metadata, and route assumptions inside one feature branch.",
      "Summarize all touched files and the taxonomy path in the pull request description.",
    ],
  },
  {
    title: "Improve platform behavior",
    summary: "Use for search, auth, upload parsing, or admin workflow changes.",
    branchExamples: ["feature/search-discovery", "feature/feedback-contribute", "feature/parser-quality"],
    steps: [
      "Keep shared contracts stable and avoid mixing platform changes with visual redesign work.",
      "Explain backward compatibility or migration notes in the pull request body.",
      "Flag any environment variable or database changes clearly before merge.",
    ],
  },
];

export const pullRequestChecklist = [
  "One branch, one goal, one review surface.",
  "List the route paths or admin surfaces affected.",
  "Mention whether storage, auth, or Supabase migrations changed.",
  "Include screenshots when the UI changed noticeably.",
  "Call out any files that other branches should avoid editing during the review window.",
] as const;

export const contributionRules = [
  "Main branch owns architecture, naming rules, shared contracts, and merge order.",
  "Feature branches own isolated implementation and should avoid unrelated refactors.",
  "Feedback can start in GitHub, email, or both, but code changes should land through Git-based review.",
  "Private story material should never be attached to public issue threads.",
] as const;

export function isFeedbackCategoryValue(value: unknown): value is FeedbackCategoryValue {
  return typeof value === "string" && feedbackCategoryValues.includes(value as FeedbackCategoryValue);
}

export function isFeedbackDeliveryValue(value: unknown): value is FeedbackDeliveryValue {
  return typeof value === "string" && feedbackDeliveryValues.includes(value as FeedbackDeliveryValue);
}

export function isFeedbackVisibilityValue(value: unknown): value is FeedbackVisibilityValue {
  return typeof value === "string" && feedbackVisibilityValues.includes(value as FeedbackVisibilityValue);
}
