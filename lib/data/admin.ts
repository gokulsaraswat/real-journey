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
    badge: "Parser",
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
    label: "Topic catalog",
    href: "/admin/topic-catalog",
    description: "Bulk-map topic names, slugs, and status before files are uploaded.",
    badge: "Scale",
  },
  {
    label: "Stories",
    href: "/admin/stories",
    description: "Mixed-visibility vault for personal files and story collections.",
  },
];

export const adminStats: AdminStat[] = [
  {
    label: "Topic scale mode",
    value: "1000-ready",
    detail: "The information architecture is prepared for large topic catalogs without hardcoding individual pages.",
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
    description: "Convert source content into a reader-ready canonical body and metadata draft.",
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
    status: "review",
    visibility: "private",
  },
  {
    title: "Google interview debrief",
    fileType: "docx",
    destination: "Personal / interview / Google",
    status: "queued",
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
  "Topic catalog mapping can now happen before content uploads begin.",
] as const;

export const contributionLanes = [
  {
    title: "Feedback inbox",
    description: "User feedback can route to GitHub plus email until a fuller contribution dashboard lands.",
  },
  {
    title: "Git-based contributions",
    description: "PR-friendly workflow keeps large feature work isolated from the main branch.",
  },
] as const;
