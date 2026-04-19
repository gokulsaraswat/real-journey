export type StoryVisibility = "public" | "private";

export type StoryFormat = "mdx" | "pdf" | "docx" | "txt" | "code";

export type StorySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: string;
};

export type StoryEntry = {
  id: string;
  title: string;
  summary: string;
  visibility: StoryVisibility;
  slugSegments: string[];
  categoryLabel: string;
  collectionId: string;
  collectionTitle: string;
  collectionSummary: string;
  collectionStatus: string;
  readTime: string;
  updatedAt: string;
  format: StoryFormat;
  audience: string;
  tags: string[];
  lead: string;
  assetCount: number;
  downloadFileName: string;
  sections: StorySection[];
};

export type StoryCollectionSummary = {
  id: string;
  title: string;
  summary: string;
  status: string;
  visibility: StoryVisibility;
  count: number;
  href: string;
  categories: string[];
};

const storyEntries: StoryEntry[] = [
  {
    id: "story-real-journey-architecture-foundations",
    title: "Real Journey architecture foundations",
    summary:
      "A public build log that explains how the platform is being structured for stable main-branch decisions and fast feature branches.",
    visibility: "public",
    slugSegments: ["personal", "build-logs", "real-journey", "architecture-foundations"],
    categoryLabel: "Build logs",
    collectionId: "collection-real-journey-build-logs",
    collectionTitle: "Real Journey build logs",
    collectionSummary:
      "Public architecture notes, launch decisions, and build retrospectives tied to the platform itself.",
    collectionStatus: "Public showcase",
    readTime: "11 min",
    updatedAt: "2026-04-14",
    format: "mdx",
    audience: "Learners and contributors",
    tags: ["architecture", "branching", "nextjs", "platform-design"],
    lead:
      "This story explains the contract-first thinking behind Real Journey so future branches can ship faster without breaking the core structure.",
    assetCount: 4,
    downloadFileName: "real-journey-architecture-foundations.md",
    sections: [
      {
        title: "Why this story exists",
        paragraphs: [
          "Real Journey is designed to grow through many focused branches. The main branch should only store stable decisions, route contracts, schema rules, and merge-safe notes.",
          "That keeps the main conversation light while allowing feature work such as blog pages, reader mode, uploads, and admin tools to evolve independently."
        ],
        bullets: [
          "Main branch owns contracts and merge rules.",
          "Feature branches own isolated implementation details.",
          "Patch delivery should stay merge-safe and low-conflict."
        ]
      },
      {
        title: "What stays in the main branch",
        paragraphs: [
          "Route structure, naming rules, shared UI conventions, data models, and release sequencing all belong in the main branch. Those decisions are expensive to duplicate.",
          "Feature-specific experiments should stay out of the main branch until they are ready to merge."
        ],
        callout:
          "Treat the main branch as the platform contract, not the place for long code dumps or speculative iterations."
      },
      {
        title: "How this helps contributors",
        paragraphs: [
          "Contributors can open a focused branch, work inside a limited file boundary, and merge back with far less confusion.",
          "That same workflow works whether the contributor is a human developer or an AI coding branch."
        ],
        bullets: [
          "Smaller review surfaces.",
          "Cleaner merge summaries.",
          "Safer scaling to many feature branches."
        ]
      }
    ]
  },
  {
    id: "story-java17-exam-roadmap",
    title: "Java 17 exam roadmap",
    summary:
      "A public certification-prep story with milestones, study slices, and a reader-friendly structure that can later map to uploaded PDF or DOCX assets.",
    visibility: "public",
    slugSegments: ["personal", "certification-prep", "java-17", "exam-roadmap"],
    categoryLabel: "Certification prep",
    collectionId: "collection-certification-prep-public",
    collectionTitle: "Certification prep public path",
    collectionSummary:
      "Study plans and exam pathways that are safe to publish as learning artifacts and downloadable notes.",
    collectionStatus: "Reader + downloadable",
    readTime: "9 min",
    updatedAt: "2026-04-10",
    format: "pdf",
    audience: "Student to job-ready engineer",
    tags: ["java", "certification", "study-plan", "revision"],
    lead:
      "This roadmap is shaped like a public study trail: it gives enough detail to help learners while keeping the structure reusable for future exam packs.",
    assetCount: 3,
    downloadFileName: "java-17-exam-roadmap.md",
    sections: [
      {
        title: "Study rhythm",
        paragraphs: [
          "Split the preparation into short weekly cycles with one core language topic, one problem-solving drill, and one timed recap.",
          "The goal is to build rhythm first, then intensity."
        ],
        bullets: [
          "Language fundamentals.",
          "Collections and streams.",
          "Modern Java features.",
          "Timed revision sets."
        ]
      },
      {
        title: "Resource mix",
        paragraphs: [
          "Pair a structured reader page with a downloadable handout. The reader page helps with flow, while the attached file helps with offline revision.",
          "That mixed mode is exactly how Real Journey should handle certification paths."
        ]
      },
      {
        title: "Review checkpoints",
        paragraphs: [
          "At the end of each cycle, convert mistakes into a smaller revision sheet rather than rereading everything.",
          "This turns the study pack into a progressively more valuable personal artifact."
        ],
        callout:
          "Good certification content is not only about coverage. It is about recoverable revision under time pressure."
      }
    ]
  },
  {
    id: "story-learning-systems-branch-discipline",
    title: "Branch discipline for long learning projects",
    summary:
      "A public reflection on how to keep big learning systems maintainable by separating architecture decisions from implementation noise.",
    visibility: "public",
    slugSegments: ["personal", "reflection", "learning-systems", "branch-discipline"],
    categoryLabel: "Reflection",
    collectionId: "collection-learning-reflections",
    collectionTitle: "Learning systems reflections",
    collectionSummary:
      "Public thinking notes about how to build durable learning platforms, workflows, and engineering habits.",
    collectionStatus: "Public essays",
    readTime: "8 min",
    updatedAt: "2026-04-08",
    format: "mdx",
    audience: "Senior engineer and architect",
    tags: ["workflow", "learning-system", "engineering-habits", "discipline"],
    lead:
      "Large learning platforms often fail because every idea lands in the same stream. Branch discipline is a way to preserve clarity without slowing momentum.",
    assetCount: 2,
    downloadFileName: "branch-discipline-learning-projects.md",
    sections: [
      {
        title: "The hidden cost of one giant stream",
        paragraphs: [
          "When content ideas, architecture notes, styling experiments, and publishing tasks all compete in one place, it becomes hard to see what is actually stable.",
          "That confusion slows learning teams and individual builders alike."
        ]
      },
      {
        title: "A more durable pattern",
        paragraphs: [
          "Keep the architecture stream narrow and stable. Use separate feature branches for exploratory work, then summarize the merge back into one small note.",
          "This creates a lightweight operating system for both product work and self-learning."
        ],
        bullets: [
          "Stable contracts.",
          "Focused experiments.",
          "Small merge notes.",
          "Repeatable release order."
        ]
      },
      {
        title: "What to teach through the platform",
        paragraphs: [
          "Real Journey can model this workflow directly: learners do not only read engineering topics, they see how a disciplined engineering system is built.",
          "That makes the platform itself part of the curriculum."
        ]
      }
    ]
  },
  {
    id: "story-google-debrief-kit",
    title: "Google interview debrief kit",
    summary:
      "A private story pack for interview reflections, calibration notes, and post-round action items that should never leak into the public learning surface.",
    visibility: "private",
    slugSegments: ["personal", "interview", "google", "debrief-kit"],
    categoryLabel: "Interview",
    collectionId: "collection-private-interviews",
    collectionTitle: "Private interview vault",
    collectionSummary:
      "Sensitive interview preparation and debrief materials kept behind admin access.",
    collectionStatus: "Admin-only",
    readTime: "7 min",
    updatedAt: "2026-04-13",
    format: "docx",
    audience: "Private vault",
    tags: ["interview", "google", "reflection", "private-notes"],
    lead:
      "This debrief kit is intentionally private. It represents the type of artifact that belongs in a separated story vault with clear access control.",
    assetCount: 5,
    downloadFileName: "google-interview-debrief-kit.md",
    sections: [
      {
        title: "Why this stays private",
        paragraphs: [
          "Company-specific interview notes often include sensitive reflections, weak areas, and preparation strategies that should not be public.",
          "Real Journey needs a clean way to keep these assets separate while still providing a reader-first experience for the owner."
        ],
        callout:
          "Private stories should feel first-class, not like second-class hidden files."
      },
      {
        title: "Debrief structure",
        paragraphs: [
          "A good debrief captures signals, gaps, follow-up tasks, and emotional state while the experience is still fresh.",
          "The point is to create reusable learning, not just raw memory."
        ],
        bullets: [
          "Round summary.",
          "Topics that felt strong.",
          "Topics that need repair.",
          "Follow-up reading and coding plan."
        ]
      }
    ]
  },
  {
    id: "story-aws-saa-revision-stack",
    title: "AWS SAA revision stack",
    summary:
      "A private certification pack that mixes condensed notes, checklists, and quick-download artifacts for last-mile revision.",
    visibility: "private",
    slugSegments: ["personal", "certification-prep", "aws-saa", "revision-stack"],
    categoryLabel: "Certification prep",
    collectionId: "collection-private-certification-stack",
    collectionTitle: "Private certification stack",
    collectionSummary:
      "High-density revision materials that are useful privately before deciding what should become public.",
    collectionStatus: "Private working set",
    readTime: "10 min",
    updatedAt: "2026-04-11",
    format: "pdf",
    audience: "Private vault",
    tags: ["aws", "saa", "revision", "cloud"],
    lead:
      "This pack shows how private certification material can exist as an editable working set before selected pieces graduate into the public library.",
    assetCount: 6,
    downloadFileName: "aws-saa-revision-stack.md",
    sections: [
      {
        title: "Working-set design",
        paragraphs: [
          "Private study packs can be messy, dense, and personal. That is useful while you are actively preparing.",
          "Later, the most polished slices can be promoted into public reader pages if they are broadly valuable."
        ]
      },
      {
        title: "What belongs here",
        paragraphs: [
          "Condensed service maps, trick-question traps, and exam-day reminders are all good candidates for the private vault.",
          "These notes are optimized for speed rather than polished pedagogy."
        ],
        bullets: [
          "Rapid review sheets.",
          "Service comparison grids.",
          "Common distractor notes.",
          "Exam-day packing checklist."
        ]
      }
    ]
  },
  {
    id: "story-http-labs-notes-pack",
    title: "HTTP labs notes pack",
    summary:
      "A private code-heavy notes pack for experiments, snippets, and half-finished drills related to HTTP behavior and debugging.",
    visibility: "private",
    slugSegments: ["personal", "code", "http-labs", "notes-pack"],
    categoryLabel: "Code",
    collectionId: "collection-private-code-labs",
    collectionTitle: "Private code labs",
    collectionSummary:
      "Scratchpads, snippets, and debugging notes that support deeper public guides later.",
    collectionStatus: "Private experiments",
    readTime: "12 min",
    updatedAt: "2026-04-09",
    format: "code",
    audience: "Private vault",
    tags: ["http", "labs", "code", "debugging"],
    lead:
      "Not every useful asset is publish-ready prose. Some of the most valuable notes are code-first experiments that should remain private until cleaned up.",
    assetCount: 9,
    downloadFileName: "http-labs-notes-pack.md",
    sections: [
      {
        title: "What this pack contains",
        paragraphs: [
          "The pack groups small experiments about headers, caching, retries, proxy behavior, and request tracing.",
          "Some entries are only useful to the author, which is exactly why the private story vault matters."
        ],
        bullets: [
          "Curl scripts.",
          "Header snapshots.",
          "Retry experiments.",
          "Server behavior notes."
        ]
      },
      {
        title: "Promotion path",
        paragraphs: [
          "Once an experiment becomes stable, it can be promoted into the public Learn surface as a cleaner topic page.",
          "That promotion path helps the private vault feed the public curriculum over time."
        ]
      }
    ]
  }
];

function normalizeSegments(segments: string[]): string[] {
  return segments.map((segment) => decodeURIComponent(segment).trim().toLowerCase());
}

export function formatStoryDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function getAllStories(): StoryEntry[] {
  return storyEntries;
}

export function getPublicStories(): StoryEntry[] {
  return storyEntries.filter((story) => story.visibility === "public");
}

export function getPrivateStories(): StoryEntry[] {
  return storyEntries.filter((story) => story.visibility === "private");
}

export function getStoryBySegments(
  segments: string[],
  visibility?: StoryVisibility,
): StoryEntry | undefined {
  const normalized = normalizeSegments(segments);

  return storyEntries.find((story) => {
    if (visibility && story.visibility !== visibility) {
      return false;
    }

    const storySegments = normalizeSegments(story.slugSegments);
    return (
      storySegments.length === normalized.length &&
      storySegments.every((segment, index) => segment === normalized[index])
    );
  });
}


export function getStoriesByPrefix(
  segments: string[],
  visibility?: StoryVisibility,
): StoryEntry[] {
  const normalized = normalizeSegments(segments);

  return storyEntries.filter((story) => {
    if (visibility && story.visibility !== visibility) {
      return false;
    }

    const storySegments = normalizeSegments(story.slugSegments);
    if (normalized.length > storySegments.length) {
      return false;
    }

    return normalized.every((segment, index) => storySegments[index] === segment);
  });
}

export function buildStoryHref(story: Pick<StoryEntry, "visibility" | "slugSegments">): string {
  const pathname = story.slugSegments.map((segment) => encodeURIComponent(segment)).join("/");
  return story.visibility === "private" ? `/stories/private/${pathname}` : `/stories/${pathname}`;
}

export function buildStoryDownloadHref(story: Pick<StoryEntry, "visibility" | "slugSegments">): string {
  const pathname = encodeURIComponent(story.slugSegments.join("/"));
  return `/api/story-download?path=${pathname}&visibility=${story.visibility}`;
}

export function getRelatedStories(currentStory: StoryEntry, limit = 3): StoryEntry[] {
  return storyEntries
    .filter((story) => story.id !== currentStory.id && story.visibility === currentStory.visibility)
    .map((story) => {
      const sharedTags = story.tags.filter((tag) => currentStory.tags.includes(tag)).length;
      const sameCollection = story.collectionId === currentStory.collectionId ? 10 : 0;
      return { story, score: sharedTags + sameCollection };
    })
    .sort((left, right) => right.score - left.score || right.story.updatedAt.localeCompare(left.story.updatedAt))
    .slice(0, limit)
    .map((item) => item.story);
}

export function getStoryCollectionSummaries(
  visibility: StoryVisibility,
): StoryCollectionSummary[] {
  const source = visibility === "private" ? getPrivateStories() : getPublicStories();
  const groups = new Map<string, StoryCollectionSummary>();

  source.forEach((story) => {
    const existing = groups.get(story.collectionId);
    if (existing) {
      existing.count += 1;
      if (!existing.categories.includes(story.categoryLabel)) {
        existing.categories.push(story.categoryLabel);
      }
      return;
    }

    const href =
      visibility === "private"
        ? `/stories/private/${story.slugSegments.slice(0, 3).map((segment) => encodeURIComponent(segment)).join("/")}`
        : `/stories/${story.slugSegments.slice(0, 3).map((segment) => encodeURIComponent(segment)).join("/")}`;

    groups.set(story.collectionId, {
      id: story.collectionId,
      title: story.collectionTitle,
      summary: story.collectionSummary,
      status: story.collectionStatus,
      visibility,
      count: 1,
      href,
      categories: [story.categoryLabel],
    });
  });

  return Array.from(groups.values()).sort((left, right) => right.count - left.count || left.title.localeCompare(right.title));
}

export function serializeStoryForDownload(story: StoryEntry): string {
  const header = [
    `# ${story.title}`,
    "",
    `Visibility: ${story.visibility}`,
    `Category: ${story.categoryLabel}`,
    `Collection: ${story.collectionTitle}`,
    `Format: ${story.format}`,
    `Read time: ${story.readTime}`,
    `Updated: ${story.updatedAt}`,
    `Tags: ${story.tags.join(", ")}`,
    "",
    story.summary,
    "",
  ];

  const sectionBody = story.sections.flatMap((section) => {
    const lines: string[] = [
      `## ${section.title}`,
      "",
      ...section.paragraphs,
    ];

    if (section.bullets?.length) {
      lines.push("", ...section.bullets.map((bullet) => `- ${bullet}`));
    }

    if (section.callout) {
      lines.push("", `> ${section.callout}`);
    }

    lines.push("");
    return lines;
  });

  return [...header, ...sectionBody].join("\n");
}
