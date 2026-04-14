import type { Topic } from "@/lib/contracts/content";
import {
  getTopicHref,
  getTopicsForSubcategory,
  type TopicContext,
} from "@/lib/data/learn";

export type ReaderMode = "docs" | "ebook";
export type ReaderCalloutTone = "info" | "focus" | "warning";

export type ReaderSection =
  | {
      type: "paragraphs";
      id: string;
      title: string;
      paragraphs: string[];
    }
  | {
      type: "bullet-list";
      id: string;
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "steps";
      id: string;
      title: string;
      steps: { title: string; body: string }[];
    }
  | {
      type: "callout";
      id: string;
      title: string;
      body: string;
      tone?: ReaderCalloutTone;
    }
  | {
      type: "quote";
      id: string;
      title?: string;
      quote: string;
      caption?: string;
    }
  | {
      type: "code";
      id: string;
      title: string;
      language: string;
      code: string;
      caption?: string;
    };

export type ReaderDocument = {
  focus: string;
  goals: string[];
  sections: ReaderSection[];
};

export type ReaderOutlineItem = {
  id: string;
  label: string;
};

export type ReaderSiblingLink = {
  title: string;
  href: string;
};

type RawReaderSection =
  | {
      type: "paragraphs";
      title: string;
      paragraphs: string[];
    }
  | {
      type: "bullet-list";
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "steps";
      title: string;
      steps: { title: string; body: string }[];
    }
  | {
      type: "callout";
      title: string;
      body: string;
      tone?: ReaderCalloutTone;
    }
  | {
      type: "quote";
      title?: string;
      quote: string;
      caption?: string;
    }
  | {
      type: "code";
      title: string;
      language: string;
      code: string;
      caption?: string;
    };

type ReaderDocumentBlueprint = {
  focus: string;
  goals: string[];
  sections: RawReaderSection[];
};

const specificDocuments: Partial<Record<string, ReaderDocumentBlueprint>> = {
  "http-request-lifecycle": {
    focus: "Follow one request from user intent to rendered response.",
    goals: [
      "Trace the request path across browser, network, and server boundaries.",
      "See where latency, headers, and rendering behavior start to matter.",
      "Build a debugging habit that follows the request instead of guessing.",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Start from intent, not from packets",
        paragraphs: [
          "A request begins before the wire. It starts when the user clicks, submits, reloads, or when your app code decides it needs data. That intent determines method choice, payload shape, cache behavior, and how urgent the response is for the user experience.",
          "Good engineers learn to map the user action to the exact request that followed. That habit makes browser traces, server logs, and incident debugging much easier later.",
        ],
      },
      {
        type: "steps",
        title: "A practical lifecycle walkthrough",
        steps: [
          {
            title: "Resolve and connect",
            body: "The browser resolves the destination, opens or reuses a connection, and negotiates transport details before any meaningful application bytes arrive.",
          },
          {
            title: "Send request metadata",
            body: "Method, path, headers, cookies, and optional body express what the client wants and what context it carries.",
          },
          {
            title: "Run server work",
            body: "Routing, auth checks, cache lookup, database or service calls, and response assembly happen here. This is usually where latency multiplies.",
          },
          {
            title: "Interpret the response",
            body: "The browser processes status code, headers, and body. Then it may render HTML, hydrate JavaScript, cache assets, or trigger follow-up requests.",
          },
        ],
      },
      {
        type: "bullet-list",
        title: "Signals worth inspecting first",
        intro:
          "When something feels slow or broken, these are usually the first signals worth checking:",
        items: [
          "HTTP method, status code, and timing breakdown in browser devtools.",
          "Headers that explain caching, compression, cookies, and content type.",
          "Server logs that correlate one request to downstream database or service work.",
          "Any client-side retries, redirects, or duplicate requests caused by app logic.",
        ],
      },
      {
        type: "code",
        title: "Minimal request inspection",
        language: "bash",
        code: "curl -i https://example.com/api/items \\\n  -H 'Accept: application/json' \\\n  -H 'Cache-Control: no-cache'",
        caption: "Start simple. Inspect status, headers, and response shape before chasing deeper causes.",
      },
      {
        type: "callout",
        title: "Debugging shortcut",
        tone: "focus",
        body: "When you are stuck, narrate the request in plain language: who initiated it, what metadata it carried, what work the server performed, and what the browser did with the reply. Most issues become easier once the request has a clear story.",
      },
      {
        type: "quote",
        quote: "A request is not just a packet. It is a chain of decisions across client, network, server, and renderer.",
        caption: "Use the chain, not a single log line, as your debugging model.",
      },
    ],
  },
  "http-caching-and-versioning": {
    focus: "Use caching rules to make systems fast without serving the wrong thing.",
    goals: [
      "Understand where browser and intermediary caches help or hurt.",
      "Separate immutable assets from dynamic API responses.",
      "Use validation and versioning to avoid stale behavior after deploys.",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Caching is a product decision as much as a protocol feature",
        paragraphs: [
          "Caching affects latency, infrastructure cost, and user trust. A fast but stale page can be worse than a slightly slower correct one, especially around authentication, payments, or operational dashboards.",
          "The goal is not to cache everything. The goal is to classify what can be reused safely and what must be freshly validated.",
        ],
      },
      {
        type: "bullet-list",
        title: "Common pieces of the caching model",
        items: [
          "Cache-Control describes reuse intent and freshness boundaries.",
          "ETag and Last-Modified support validation instead of full re-downloads.",
          "Versioned asset names let you cache aggressively without shipping stale bundles.",
          "Authenticated or user-specific responses need extra care before reuse.",
        ],
      },
      {
        type: "steps",
        title: "A safe rollout pattern",
        steps: [
          {
            title: "Classify content",
            body: "Split responses into static assets, semi-static content, and user-specific or highly dynamic data.",
          },
          {
            title: "Choose reuse rules",
            body: "Apply strong caching to immutable assets, bounded freshness to content pages, and careful validation or no-store rules to sensitive APIs.",
          },
          {
            title: "Version what changes",
            body: "Attach hashes or release versions to assets that should be cacheable for a long time.",
          },
          {
            title: "Observe before optimizing further",
            body: "Use real request traces and cache hit patterns to see whether your rules match reality.",
          },
        ],
      },
      {
        type: "code",
        title: "A familiar response pattern",
        language: "http",
        code: "HTTP/1.1 200 OK\nCache-Control: public, max-age=300, stale-while-revalidate=60\nETag: \"items-v42\"\nContent-Type: application/json",
        caption: "Short freshness plus validation is often safer than pretending dynamic data is permanently cacheable.",
      },
      {
        type: "callout",
        title: "Versioning rule of thumb",
        tone: "warning",
        body: "If you want very long cache lifetimes, make the URL change whenever the underlying asset changes. Long-lived caches without versioned URLs cause the most frustrating deploy bugs.",
      },
    ],
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function withSectionIds(sections: RawReaderSection[]): ReaderSection[] {
  return sections.map((section, index) => {
    const preferredLabel =
      "title" in section && section.title ? section.title : section.type === "quote" ? section.quote : `section-${index + 1}`;

    return {
      ...section,
      id: `${slugify(preferredLabel)}-${index + 1}`,
    } as ReaderSection;
  });
}

function getGenericCodeSample(context: TopicContext) {
  const { domain, topic } = {
    domain: context.domain,
    topic: context.topic,
  };

  if (domain.slug === "ai") {
    return {
      language: "json",
      code: `{
  "topic": "${topic.slug}",
  "goal": "explain tradeoffs clearly",
  "checks": ["quality", "latency", "safety"],
  "notes": "store observations, not only conclusions"
}`,
      caption: "Even AI workflows benefit from explicit structure, checks, and reviewable outputs.",
    };
  }

  if (domain.slug === "cyber-security") {
    return {
      language: "bash",
      code: `printf 'investigate %s\\n' "${topic.slug}"\nprintf 'collect logs, scope impact, preserve timeline\\n'`,
      caption: "Security work gets better when observation, scoping, and evidence capture happen in order.",
    };
  }

  return {
    language: "bash",
    code: `printf 'study topic: %s\\n' "${topic.slug}"\nprintf 'observe request, system boundary, and failure modes\\n'`,
    caption: "The snippet is simple on purpose: the habit is to observe the system before changing it.",
  };
}

function createGenericDocument(context: TopicContext): ReaderDocumentBlueprint {
  const { domain, track, level, category, subcategory, topic } = context;
  const code = getGenericCodeSample(context);

  return {
    focus: `Use ${topic.title.toLowerCase()} to strengthen your ${level.title.toLowerCase()} judgment inside ${domain.title}.`,
    goals: [
      `Connect ${topic.title.toLowerCase()} to the bigger ${category.title.toLowerCase()} system around it.`,
      `Notice the tradeoffs that matter at the ${track.title.toLowerCase()} stage of growth.`,
      "Leave with a repeatable study and debugging lens, not just isolated facts.",
    ],
    sections: [
      {
        type: "paragraphs",
        title: `Why ${topic.title} matters here`,
        paragraphs: [
          `${topic.title} sits inside ${subcategory.title}, which means it should be studied as part of a larger system rather than as a trivia item. The more advanced you become, the more this context matters.`,
          `At ${level.title.toLowerCase()}, the value is not only knowing definitions. It is knowing where this topic changes delivery speed, reliability, cost, risk, or team clarity.`,
        ],
      },
      {
        type: "bullet-list",
        title: "Questions worth carrying while you read",
        intro: "Use these prompts to keep the topic active instead of passive:",
        items: [
          `Where does ${topic.title.toLowerCase()} create or remove operational risk?`,
          `Which boundaries, assumptions, or defaults are easy to miss?`,
          `How would you explain this topic differently to a junior, peer, and leader?`,
          `What signals would tell you the current design is working or failing?`,
        ],
      },
      {
        type: "steps",
        title: "A clean way to study this topic",
        steps: [
          {
            title: "Map the system",
            body: `List the actors, boundaries, and dependencies around ${topic.title.toLowerCase()} before diving into edge cases.`,
          },
          {
            title: "Trace one concrete flow",
            body: "Follow a realistic example end to end so abstractions stay tied to real behavior.",
          },
          {
            title: "Capture failure modes",
            body: "Write down what breaks, what degrades, and what becomes ambiguous when the topic is handled poorly.",
          },
          {
            title: "Translate into judgment",
            body: "Summarize when to optimize, when to simplify, and what signals would justify a different choice later.",
          },
        ],
      },
      {
        type: "code",
        title: "Tiny working note",
        language: code.language,
        code: code.code,
        caption: code.caption,
      },
      {
        type: "callout",
        title: "Reader note",
        tone: "info",
        body: `This is a reader-first placeholder for ${topic.title.toLowerCase()}. Later, admin uploads and richer MDX content can replace or extend it without changing the topic URL contract.`,
      },
    ],
  };
}

export function getTopicReaderDocument(context: TopicContext): ReaderDocument {
  const blueprint = specificDocuments[context.topic.slug] ?? createGenericDocument(context);

  return {
    focus: blueprint.focus,
    goals: blueprint.goals,
    sections: withSectionIds(blueprint.sections),
  };
}

export function getTopicReaderOutline(document: ReaderDocument): ReaderOutlineItem[] {
  return [
    { id: "overview", label: "Overview" },
    ...document.sections.map((section) => ({
      id: section.id,
      label: "title" in section && section.title ? section.title : section.type === "quote" ? "Pull quote" : "Section",
    })),
  ];
}

export function getTopicReaderSiblings(context: TopicContext): {
  previous: ReaderSiblingLink | null;
  next: ReaderSiblingLink | null;
} {
  const shelfTopics = getTopicsForSubcategory(context.subcategory.id);
  const index = shelfTopics.findIndex((item) => item.id === context.topic.id);

  const previous = index > 0 ? shelfTopics[index - 1] : null;
  const next = index >= 0 && index < shelfTopics.length - 1 ? shelfTopics[index + 1] : null;

  return {
    previous: previous ? { title: previous.title, href: getTopicHref(previous) } : null,
    next: next ? { title: next.title, href: getTopicHref(next) } : null,
  };
}

function renderSectionMarkdown(section: ReaderSection) {
  if (section.type === "paragraphs") {
    return [`## ${section.title}`, "", ...section.paragraphs, ""];
  }

  if (section.type === "bullet-list") {
    return [
      `## ${section.title}`,
      "",
      ...(section.intro ? [section.intro, ""] : []),
      ...section.items.map((item) => `- ${item}`),
      "",
    ];
  }

  if (section.type === "steps") {
    return [
      `## ${section.title}`,
      "",
      ...section.steps.flatMap((step, index) => [`### ${index + 1}. ${step.title}`, "", step.body, ""]),
    ];
  }

  if (section.type === "callout") {
    return [`## ${section.title}`, "", `> ${section.body}`, ""];
  }

  if (section.type === "quote") {
    return [
      ...(section.title ? [`## ${section.title}`, ""] : []),
      `> ${section.quote}`,
      ...(section.caption ? [`> ${section.caption}`] : []),
      "",
    ];
  }

  return [
    `## ${section.title}`,
    "",
    "```" + section.language,
    section.code,
    "```",
    ...(section.caption ? ["", section.caption] : []),
    "",
  ];
}

export function buildTopicDownloadSource(context: TopicContext) {
  const document = getTopicReaderDocument(context);
  const lines = [
    `# ${context.topic.title}`,
    "",
    `${context.topic.summary}`,
    "",
    `- Domain: ${context.domain.title}`,
    `- Track: ${context.track.title}`,
    `- Level: ${context.level.title}`,
    `- Category: ${context.category.title}`,
    `- Subcategory: ${context.subcategory.title}`,
    `- Estimated read: ${context.topic.estimatedReadMinutes ?? 10} min`,
    "",
    "## Focus",
    "",
    document.focus,
    "",
    "## Learning goals",
    "",
    ...document.goals.map((goal) => `- ${goal}`),
    "",
    ...document.sections.flatMap((section) => renderSectionMarkdown(section)),
  ];

  return lines.join("\n").trim() + "\n";
}

export function getTopicReaderMeta(topic: Topic) {
  return {
    estimatedReadMinutes: topic.estimatedReadMinutes ?? 10,
    sourceFormat: "MDX",
  } as const;
}
