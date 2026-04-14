export const heroStats = [
  {
    value: "500+",
    label: "topic-ready architecture",
    note: "Built around taxonomy instead of hardcoded pages.",
  },
  {
    value: "2",
    label: "reader modes planned",
    note: "Docs mode and ebook mode will live behind the same content model.",
  },
  {
    value: "Mixed",
    label: "story visibility",
    note: "Public stories and private materials can stay separated later.",
  },
] as const;

export const featuredDomains = [
  {
    title: "IT",
    badge: "Foundations to architecture",
    summary:
      "Core computing, HTTP, systems, backend design, cloud basics, and long-form technical depth.",
  },
  {
    title: "AI",
    badge: "Build and ship",
    summary:
      "Applied AI, LLM workflows, evaluation, tooling, serving, and platform thinking.",
  },
  {
    title: "Cyber Security",
    badge: "Hands-on to strategic",
    summary:
      "Security foundations, application security, cloud defense, detection, response, and leadership views.",
  },
] as const;

export const platformPrinciples = [
  {
    title: "Portfolio first",
    summary:
      "The home page starts as your resume-like identity layer before the deeper learning system grows behind it.",
  },
  {
    title: "Content at scale",
    summary:
      "The information architecture is designed for 500+ topics and future expansion into new sectors.",
  },
  {
    title: "Upload ready",
    summary:
      "Admin workflows will later accept markdown, PDF, DOCX, TXT, and HTML before normalizing them.",
  },
] as const;

export const careerLevels = [
  { level: "Level 1", title: "job-ready engineer" },
  { level: "Level 2", title: "senior engineer" },
  { level: "Level 3", title: "architect" },
  { level: "Level 4", title: "engineering manager / product-minded leader" },
  { level: "Level 5", title: "CTO / founder-level systems thinking" },
] as const;

export const taxonomyNodes = [
  { title: "Domain", summary: "IT" },
  { title: "Track", summary: "job-ready engineer" },
  { title: "Category", summary: "core computing" },
  { title: "Topic", summary: "HTTP deep dive" },
] as const;

export const readerModeCards = [
  {
    eyebrow: "Reader mode",
    title: "Dual reading experience",
    summary:
      "The same content should later render as an ebook-style focused reader and as a docs-style study page.",
  },
  {
    eyebrow: "File access",
    title: "Download + read",
    summary:
      "Published content can coexist with downloadable source files so learners can read online or keep originals.",
  },
  {
    eyebrow: "Stories",
    title: "Personal and technical",
    summary:
      "Personal stories can hold certifications, interview prep, code snippets, and curated documents under separate visibility rules.",
  },
] as const;

export const workflowSteps = [
  {
    stage: "Main chat",
    title: "Own the contracts",
    summary:
      "Keep architecture, route rules, and shared types in one calm place so every future branch has a stable target.",
  },
  {
    stage: "Feature branch",
    title: "Ship one thing at a time",
    summary:
      "Homepage, blog, reader, uploads, and admin work should live in separate branches or chats to avoid chat bloat.",
  },
  {
    stage: "Merge",
    title: "Bring back only summaries",
    summary:
      "Report branch name, files changed, what is done, and any blocker instead of pasting the full implementation here.",
  },
  {
    stage: "Scale",
    title: "Add sectors later",
    summary:
      "The same structure can later expand into medical, business, or other domain families without rewriting the shell.",
  },
] as const;
