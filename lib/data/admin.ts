export type AdminNavItem = {
  label: string;
  href: string;
  description: string;
  badge?: string;
};

export type AdminStat = {
  label: string;
  value: string;
  detail: string;
};

export type UploadQueueItem = {
  title: string;
  fileType: "md" | "mdx" | "txt" | "html" | "pdf" | "docx";
  destination: string;
  status: "queued" | "parsing" | "review" | "ready";
  visibility: "public" | "private" | "mixed";
};

export type ContentLane = {
  label: string;
  count: number;
  note: string;
  items: string[];
};

export type StoryCollection = {
  label: string;
  visibility: "public" | "private" | "mixed";
  count: number;
  note: string;
};

export type TaxonomySummary = {
  domain: string;
  tracks: number;
  categories: number;
  topics: string;
  note: string;
};

export type UploadFormatGuide = {
  format: "mdx" | "md" | "txt" | "html" | "pdf" | "docx";
  status: "ready" | "next";
  bestFor: string;
  note: string;
  templateHref?: string;
};

export type UploadMetadataField = {
  name: string;
  required: boolean;
  note: string;
};

export type AdminNavigationItem = AdminNavItem;

export type AdminQuickAction = {
  label: string;
  href: string;
  tone: "primary" | "secondary";
  external?: boolean;
};

export type AdminQueueEntry = {
  id: string;
  kind: string;
  status: string;
  title: string;
  nextStep: string;
  owner: string;
  updatedAt: string;
};

export type AdminContentRow = {
  id: string;
  title: string;
  kind: string;
  status: string;
  visibility: string;
  sourceType: string;
  route: string;
  updatedAt: string;
};

export type AdminStoryCollection = {
  title: string;
  visibility: "public" | "private" | "mixed";
  items: number;
  summary: string;
  path: string;
};

export const adminNav: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    description: "Publishing overview, queue health, and contribution channels.",
  },
  {
    label: "Uploads",
    href: "/admin/uploads",
    description: "Landing zone for markdown, pdf, docx, html, and txt files.",
    badge: "All formats",
  },
  {
    label: "Content",
    href: "/admin/content",
    description: "Draft, review, scheduled, and published content lanes.",
  },
  {
    label: "Taxonomy",
    href: "/admin/taxonomy",
    description: "Domains, tracks, levels, categories, subcategories, and topics.",
  },
  {
    label: "Stories",
    href: "/admin/stories",
    description: "Mixed-visibility vault for personal files and story collections.",
  },
];

export const adminStats: AdminStat[] = [
  {
    label: "Seed topics mapped",
    value: "540+",
    detail: "The information architecture is ready to scale without hardcoding individual pages.",
  },
  {
    label: "Supported upload types",
    value: "6",
    detail: "md, mdx, txt, html, pdf, and docx all funnel into one reader-first workflow.",
  },
  {
    label: "Visibility modes",
    value: "3",
    detail: "Public, private, and mixed content stay separable for stories and learning assets.",
  },
  {
    label: "Contribution channels",
    value: "Git + email",
    detail: "Feedback goes to GitHub and email while pull requests stay Git-based.",
  },
];

export const uploadPipeline = [
  {
    title: "Drop file",
    description: "Accept markdown, pdf, docx, txt, html, or mdx into a single intake lane.",
  },
  {
    title: "Normalize",
    description: "All six formats now flow into a metadata draft, with PDF and DOCX using dedicated binary parsers.",
  },
  {
    title: "Map taxonomy",
    description: "Assign domain, track, level, category, subcategory, topic, and visibility.",
  },
  {
    title: "Review and publish",
    description: "Preview the final reading page, attach downloads, and publish when approved.",
  },
] as const;

export const uploadFormatGuides: UploadFormatGuide[] = [
  {
    format: "mdx",
    status: "ready",
    bestFor: "Canonical guides, blogs, and long-form reader pages.",
    note: "Best default for Real Journey because it stays clean, structured, and reader-first.",
    templateHref: "/api/upload-template/mdx",
  },
  {
    format: "md",
    status: "ready",
    bestFor: "Simple notes, checklists, and prose-first drafts.",
    note: "Good import format. Convert to canonical MDX before final publish when possible.",
    templateHref: "/api/upload-template/md",
  },
  {
    format: "txt",
    status: "ready",
    bestFor: "Raw notes, interview prep, and quick capture.",
    note: "Works for intake. Add structure and metadata before publishing.",
    templateHref: "/api/upload-template/txt",
  },
  {
    format: "html",
    status: "ready",
    bestFor: "Imported documentation pages and legacy exports.",
    note: "Semantic HTML works best. Avoid embedded scripts and styling noise.",
    templateHref: "/api/upload-template/html",
  },
  {
    format: "pdf",
    status: "ready",
    bestFor: "Handouts, certificates, and static downloadable references.",
    note: "PDF parsing is now live for metadata drafts. Keep the original file attached and review scanned files carefully.",
  },
  {
    format: "docx",
    status: "ready",
    bestFor: "Drafts, private notes, and collaborative documents.",
    note: "DOCX parsing is now live through a structure-first converter. Review rich formatting before publish.",
  },
];

export const uploadMetadataFields: UploadMetadataField[] = [
  {
    name: "title",
    required: true,
    note: "Used in the reader header, cards, and share previews.",
  },
  {
    name: "summary",
    required: true,
    note: "Short teaser for cards, SEO, and blog-style previews.",
  },
  {
    name: "domain",
    required: true,
    note: "Examples: IT, AI, Cybersecurity, Personal.",
  },
  {
    name: "track",
    required: true,
    note: "Examples: job-ready engineer, senior engineer, architect.",
  },
  {
    name: "level",
    required: true,
    note: "Examples: Level 1 to Level 5.",
  },
  {
    name: "category",
    required: true,
    note: "Examples: Core Computing, Backend, Systems Design.",
  },
  {
    name: "subcategory",
    required: false,
    note: "Examples: HTTP Deep Dive, Caching, Incident Response.",
  },
  {
    name: "visibility",
    required: true,
    note: "Public, private, or mixed depending on destination.",
  },
  {
    name: "tags",
    required: false,
    note: "Comma-separated labels for search and filtering later.",
  },
];

export const adminUploadQueue: UploadQueueItem[] = [
  {
    title: "HTTP Deep Dive notes",
    fileType: "mdx",
    destination: "IT / job-ready engineer / core computing / HTTP deep dive",
    status: "ready",
    visibility: "public",
  },
  {
    title: "Java 17 certification prep",
    fileType: "pdf",
    destination: "Personal / certification prep / Java 17",
    status: "ready",
    visibility: "private",
  },
  {
    title: "Google interview debrief",
    fileType: "docx",
    destination: "Personal / interview / Google",
    status: "review",
    visibility: "private",
  },
  {
    title: "AI systems design glossary",
    fileType: "html",
    destination: "AI / senior engineer / systems design / glossary",
    status: "parsing",
    visibility: "public",
  },
];

export const contentLanes: ContentLane[] = [
  {
    label: "Draft",
    count: 26,
    note: "Raw uploads waiting for cleanup, metadata, or category mapping.",
    items: ["OS memory primer", "Python packaging notes", "SOC analyst checklist"],
  },
  {
    label: "In review",
    count: 9,
    note: "Reader preview is ready but links, summaries, or taxonomy still need a final pass.",
    items: ["System design interview bank", "LLM ops fundamentals"],
  },
  {
    label: "Scheduled",
    count: 5,
    note: "Pages with metadata complete and release timing set.",
    items: ["HTTP caching and versioning", "Threat modeling playbook"],
  },
  {
    label: "Published",
    count: 82,
    note: "Public guides, blogs, and downloadable assets already visible in the reader surface.",
    items: ["Request lifecycle", "Git branching workflow", "Reader mode basics"],
  },
];

export const taxonomySummary: TaxonomySummary[] = [
  {
    domain: "IT",
    tracks: 5,
    categories: 18,
    topics: "220+",
    note: "Covers core computing, backend, networking, DevOps, and architecture depth.",
  },
  {
    domain: "AI",
    tracks: 4,
    categories: 14,
    topics: "160+",
    note: "Designed for ML fundamentals, LLM systems, data pipelines, and product strategy.",
  },
  {
    domain: "Cybersecurity",
    tracks: 4,
    categories: 12,
    topics: "120+",
    note: "Prepared for analyst to architect paths across defense, cloud security, and response.",
  },
  {
    domain: "Personal",
    tracks: 3,
    categories: 9,
    topics: "Mixed vault",
    note: "Keeps certifications, interviews, and personal files separate from public learning content.",
  },
];

export const storyCollections: StoryCollection[] = [
  {
    label: "Certification prep",
    visibility: "mixed",
    count: 14,
    note: "Exam notes, revision sheets, and downloadable references.",
  },
  {
    label: "Interview journeys",
    visibility: "private",
    count: 11,
    note: "Company-specific prep, debriefs, and reflection notes.",
  },
  {
    label: "Build logs",
    visibility: "public",
    count: 8,
    note: "Selected story-driven posts, code snippets, and learning retrospectives.",
  },
];

export const releaseChecklist = [
  "Check summary, title, slug, and canonical download link.",
  "Confirm taxonomy path and level placement before publish.",
  "Mark story assets public, private, or mixed intentionally.",
  "Verify the reader page in dark mode and light mode.",
  "Attach GitHub issue or email note when a page needs follow-up.",
] as const;

export const recentActivity = [
  "Feedback from email and GitHub should land in a shared review inbox later.",
  "Private story assets need a separate storage bucket and access rules.",
  "Text upload parsing is live here. PDF and DOCX stay intentionally queued for the next parser branch.",
] as const;

export const contributionLanes = [
  {
    title: "GitHub pull requests",
    description: "Best for code, docs, and structural contribution once the repository guidelines are published.",
  },
  {
    title: "Email feedback",
    description: "Best for quick suggestions, broken links, or private notes you do not want in a public issue.",
  },
  {
    title: "Content review queue",
    description: "Best for admin-only notes tied to uploads, taxonomy mapping, and release readiness.",
  },
] as const;

export function getAdminNavigation(): AdminNavigationItem[] {
  return adminNav;
}

export function getAdminQuickActions(): AdminQuickAction[] {
  return [
    { label: "Open dashboard", href: "/admin", tone: "secondary" },
    { label: "Open uploads", href: "/admin/uploads", tone: "primary" },
    { label: "GitHub repo", href: "https://github.com/gokulsaraswat/real-journey", tone: "secondary", external: true },
  ];
}

export function getAdminOverviewStats() {
  return adminStats.map((item) => ({
    label: item.label,
    value: item.value,
    description: item.detail,
  }));
}

export function getAdminPublishingHealth() {
  return [
    { label: "Draft", value: String(contentLanes[0]?.count ?? 0), detail: contentLanes[0]?.note ?? "" },
    { label: "In review", value: String(contentLanes[1]?.count ?? 0), detail: contentLanes[1]?.note ?? "" },
    { label: "Scheduled", value: String(contentLanes[2]?.count ?? 0), detail: contentLanes[2]?.note ?? "" },
  ];
}

export function getAdminQueue(): AdminQueueEntry[] {
  return adminUploadQueue.map((item, index) => ({
    id: `queue-${index + 1}`,
    kind: item.fileType,
    status: item.status,
    title: item.title,
    nextStep: `Destination: ${item.destination}`,
    owner: "Admin",
    updatedAt: "2026-04-14",
  }));
}

export function getAdminContentRows(): AdminContentRow[] {
  return adminUploadQueue.map((item, index) => ({
    id: `content-${index + 1}`,
    title: item.title,
    kind: item.fileType,
    status: item.status,
    visibility: item.visibility,
    sourceType: item.fileType,
    route: "/topic/sample",
    updatedAt: "2026-04-14",
  }));
}

export function getAdminStoryCollections(): AdminStoryCollection[] {
  return storyCollections.map((item) => ({
    title: item.label,
    visibility: item.visibility,
    items: item.count,
    summary: item.note,
    path: `/stories/${item.label.toLowerCase().replace(/\s+/g, "-")}`,
  }));
}

export function getAdminTaxonomySummary() {
  return {
    domains: taxonomySummary.length,
    tracks: taxonomySummary.reduce((sum, item) => sum + item.tracks, 0),
    levels: 5,
    categories: taxonomySummary.reduce((sum, item) => sum + item.categories, 0),
    subcategories: 24,
    topics: "540+",
  };
}

export function getAdminTaxonomyPrinciples() {
  return [
    { title: "Data-first hierarchy", body: "Add and evolve domains through structured data, not hardcoded routes." },
    { title: "Stable URL contracts", body: "Keep route contracts predictable so future branches can ship independently." },
    { title: "Visibility by metadata", body: "Use metadata fields to keep personal and public material safely separated." },
  ];
}

export function getAdminLevelLabels() {
  return [
    "Job-ready engineer",
    "Mid-level engineer",
    "Senior engineer",
    "Staff engineer",
    "Architect",
  ];
}
