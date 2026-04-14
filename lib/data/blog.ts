export type BlogSection =
  | {
      type: "paragraphs";
      title?: string;
      paragraphs: string[];
    }
  | {
      type: "bullet-list";
      title: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "quote";
      quote: string;
      caption?: string;
    }
  | {
      type: "callout";
      title: string;
      body: string;
    };

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
  category: string;
  audience: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  tags: string[];
  takeaways: string[];
  relatedSlugs?: string[];
  sections: BlogSection[];
};

const posts: BlogPost[] = [
  {
    slug: "designing-a-learning-platform-after-500-topics",
    title: "Designing a learning platform that stays clean after 500 topics",
    summary:
      "A calm, taxonomy-first way to scale deep technical content without turning the product into a maze of hardcoded pages.",
    excerpt:
      "The moment you know a product may hold hundreds of topics, you should stop thinking page-first and start thinking in contracts.",
    category: "Architecture",
    audience: "Platform builders",
    readTime: "8 min read",
    publishedAt: "2026-04-11",
    featured: true,
    tags: ["taxonomy", "architecture", "content systems", "scale"],
    takeaways: [
      "Model the hierarchy before shipping dozens of screens.",
      "Keep route contracts stable so feature branches stay mergeable.",
      "Let category data drive navigation instead of hardcoded cards.",
    ],
    relatedSlugs: [
      "career-level-taxonomy-without-hardcoded-pages",
      "reader-first-content-models-for-technical-guides",
      "using-chatgpt-branches-like-feature-branches",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "The real scaling problem",
        paragraphs: [
          "A learning platform does not become hard when you add the first ten pages. It becomes hard when the hundredth page makes the original navigation feel wrong.",
          "That is why the foundation should be a content map: domain, track, level, category, subcategory, and topic. Once that map is stable, the UI can grow without rewriting the rules every month.",
        ],
      },
      {
        type: "bullet-list",
        title: "Contracts that matter early",
        intro: "For a project like Real Journey, the earliest high-value contracts are simple:",
        items: [
          "A stable route hierarchy that can represent every topic page later.",
          "A normalized content model that treats markdown, PDF, DOCX, HTML, and text as inputs rather than separate publishing systems.",
          "A taxonomy layer that can serve both public learning pages and mixed-visibility personal stories.",
        ],
      },
      {
        type: "quote",
        quote:
          "If the structure only works while the topic count is small, the structure was never really working.",
        caption: "A practical rule for content-heavy products.",
      },
      {
        type: "callout",
        title: "Design note",
        body:
          "Do not hardcode navigation assumptions into the homepage. Let the homepage market the system, but let taxonomy power the system.",
      },
      {
        type: "paragraphs",
        title: "What this means in practice",
        paragraphs: [
          "Your homepage can feel premium and personal while the deeper platform remains data-driven. That split matters. One area is brand expression; the other is information architecture.",
          "When you later add new sectors like medical or business, the taxonomy and rendering rules should already know how to absorb them.",
        ],
      },
    ],
  },
  {
    slug: "using-chatgpt-branches-like-feature-branches",
    title: "Using ChatGPT branches like feature branches in a real product build",
    summary:
      "A branch-safe workflow for using one chat as architecture authority and separate chats as fast implementation lanes.",
    excerpt:
      "One long chat becomes heavy fast. A contract-first workflow keeps the main thread small and feature chats useful.",
    category: "Workflow",
    audience: "Solo builders",
    readTime: "6 min read",
    publishedAt: "2026-04-09",
    tags: ["workflow", "ai coding", "git", "productivity"],
    takeaways: [
      "Main chat should own decisions, not code dumps.",
      "Each feature chat should have a narrow folder contract.",
      "Merging by summary reduces prompt bloat and decision drift.",
    ],
    relatedSlugs: [
      "designing-a-learning-platform-after-500-topics",
      "portfolio-homepage-that-still-feels-like-an-engineering-system",
      "career-level-taxonomy-without-hardcoded-pages",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why one giant chat slows down",
        paragraphs: [
          "As the conversation grows, the main problem is not only speed. It is loss of clarity. Design decisions, route changes, half-finished code, and experiments all begin to compete for attention.",
          "That is why the main branch chat should behave like a calm maintainer: it owns architecture, naming, data shape, merge rules, and patch order.",
        ],
      },
      {
        type: "bullet-list",
        title: "A good split of responsibilities",
        items: [
          "Main chat: stack choices, route contracts, schema, design rules, and final merge decisions.",
          "Feature chat: one goal, one branch, isolated files, minimal surface area.",
          "Merge summary: branch name, files changed, what is done, and what still needs a decision.",
        ],
      },
      {
        type: "callout",
        title: "Small rule, big benefit",
        body:
          "Never paste hundreds of lines of code back into the main chat unless the architecture itself changed. Bring back the summary instead.",
      },
      {
        type: "paragraphs",
        title: "How this helps Real Journey",
        paragraphs: [
          "A project with homepage design, blog systems, reader modes, uploads, admin workflows, and taxonomy navigation is exactly the kind of app that benefits from branch discipline.",
          "You keep the product moving fast without letting the core decisions become muddy.",
        ],
      },
    ],
  },
  {
    slug: "reader-first-content-models-for-technical-guides",
    title: "Reader-first content models for technical guides",
    summary:
      "Why the publishing model should be designed around reading experience first, then around upload convenience.",
    excerpt:
      "People remember a guide by how readable it felt, not by the file type it originally came from.",
    category: "Reader Design",
    audience: "Writers and educators",
    readTime: "7 min read",
    publishedAt: "2026-04-05",
    tags: ["reader", "mdx", "publishing", "long-form"],
    takeaways: [
      "Canonical content should be optimized for rendering, not for upload origin.",
      "One source should support both docs mode and ebook mode later.",
      "Metadata matters as much as body text for navigation quality.",
    ],
    relatedSlugs: [
      "designing-a-learning-platform-after-500-topics",
      "http-deep-dive-pages-need-better-structure",
      "portfolio-homepage-that-still-feels-like-an-engineering-system",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Uploads are inputs, not the final product",
        paragraphs: [
          "PDF, DOCX, HTML, markdown, and text files are useful because they reduce friction for the admin. But they should not dictate how the final page behaves.",
          "The final reading surface needs structure: summary, tags, headings, callouts, estimated read time, related topics, and consistent typography.",
        ],
      },
      {
        type: "bullet-list",
        title: "Metadata that should exist on day one",
        items: [
          "Title, slug, summary, and tags.",
          "Domain, track, level, category, and subcategory.",
          "Visibility, source file info, published date, and reading time.",
        ],
      },
      {
        type: "quote",
        quote:
          "A file is what the admin uploads. A page is what the learner experiences.",
      },
      {
        type: "paragraphs",
        title: "Why this sets up two reader modes later",
        paragraphs: [
          "If the content model is rich enough, the same topic can later render as a focused ebook-style reader or a more utility-heavy docs page with side navigation and references.",
          "That flexibility is difficult if the original file format leaks directly into the front end.",
        ],
      },
    ],
  },
  {
    slug: "career-level-taxonomy-without-hardcoded-pages",
    title: "Career-level taxonomy without hardcoded pages everywhere",
    summary:
      "A practical way to represent student, job-ready, senior, architect, manager, and founder thinking inside one product.",
    excerpt:
      "Levels are not decoration. They are part of how learners orient themselves inside a large knowledge graph.",
    category: "Learning Maps",
    audience: "Curriculum designers",
    readTime: "7 min read",
    publishedAt: "2026-03-29",
    tags: ["levels", "career progression", "taxonomy", "navigation"],
    takeaways: [
      "Levels should clarify learning intent, not just difficulty.",
      "Tracks and levels work best when categories can be reused beneath them.",
      "The UI should reflect progression without turning into a maze.",
    ],
    relatedSlugs: [
      "designing-a-learning-platform-after-500-topics",
      "using-chatgpt-branches-like-feature-branches",
      "http-deep-dive-pages-need-better-structure",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why levels matter",
        paragraphs: [
          "A learner often knows the kind of growth they want before they know the exact topic. They may want to become job-ready, move toward architecture, or think more like a product-minded leader.",
          "That means the platform should support multiple entry points into the same knowledge base.",
        ],
      },
      {
        type: "bullet-list",
        title: "A reusable hierarchy",
        items: [
          "Domain: IT, AI, Cyber Security, and more later.",
          "Track or audience: student, engineer, senior, architect, manager, founder.",
          "Category and subcategory: the reusable knowledge structure under each audience lens.",
        ],
      },
      {
        type: "callout",
        title: "Avoid this mistake",
        body:
          "Do not create a separate routing philosophy for every audience. Reuse the same structural rules and let the data express the differences.",
      },
      {
        type: "paragraphs",
        title: "What the learner feels",
        paragraphs: [
          "When levels are modeled well, the platform feels guided instead of overwhelming. People can zoom in on a topic while still understanding where they are on the larger path.",
        ],
      },
    ],
  },
  {
    slug: "http-deep-dive-pages-need-better-structure",
    title: "HTTP deep dive pages need better structure than most guides give them",
    summary:
      "Why protocol-heavy topics deserve layered writing, not one dense wall of explanation.",
    excerpt:
      "A topic like HTTP is too important to be trapped inside a giant block of undifferentiated notes.",
    category: "Systems",
    audience: "Working engineers",
    readTime: "5 min read",
    publishedAt: "2026-03-22",
    tags: ["http", "networking", "teaching", "systems"],
    takeaways: [
      "Start with a mental model before protocol detail.",
      "Layer the guide so readers can go from request flow to caching to real production tradeoffs.",
      "Topic pages should support skim, study, and later re-reference modes.",
    ],
    relatedSlugs: [
      "reader-first-content-models-for-technical-guides",
      "career-level-taxonomy-without-hardcoded-pages",
      "designing-a-learning-platform-after-500-topics",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Why these pages fail so often",
        paragraphs: [
          "Many technical guides are written as if readers arrive with perfect patience and full context. In reality, most people need orientation first, then detail.",
          "For a topic like HTTP, structure matters almost as much as accuracy. A good page should show the big picture, the mechanics, and the practical tradeoffs.",
        ],
      },
      {
        type: "bullet-list",
        title: "A better layering pattern",
        items: [
          "Start with the request-response story.",
          "Move into methods, headers, status codes, caching, and connection behavior.",
          "End with production lessons: observability, performance, reverse proxies, and debugging patterns.",
        ],
      },
      {
        type: "quote",
        quote: "A deep topic should feel navigable, not endless.",
      },
      {
        type: "paragraphs",
        title: "How this connects to the platform",
        paragraphs: [
          "Real Journey is being shaped so topic pages can later become serious reading surfaces. That matters most on dense, important subjects where people return many times.",
        ],
      },
    ],
  },
  {
    slug: "portfolio-homepage-that-still-feels-like-an-engineering-system",
    title: "Building a portfolio homepage that still feels like an engineering system",
    summary:
      "How to make the front page personal and attractive without disconnecting it from the deeper product architecture.",
    excerpt:
      "A strong homepage should sell identity and hint at system depth at the same time.",
    category: "Brand Systems",
    audience: "Developer creators",
    readTime: "6 min read",
    publishedAt: "2026-03-16",
    tags: ["portfolio", "homepage", "branding", "systems design"],
    takeaways: [
      "The homepage is a promise, not the whole product.",
      "Use the homepage to express taste while the deeper routes stay model-driven.",
      "A premium visual shell works best when it sits on top of stable contracts.",
    ],
    relatedSlugs: [
      "using-chatgpt-branches-like-feature-branches",
      "reader-first-content-models-for-technical-guides",
      "designing-a-learning-platform-after-500-topics",
    ],
    sections: [
      {
        type: "paragraphs",
        title: "Portfolio first, but not portfolio only",
        paragraphs: [
          "For Real Journey, the homepage is your face, your positioning, and your taste. It should feel composed, premium, and deliberate.",
          "But it should also quietly communicate that there is a serious learning system underneath it, not just a collection of floating sections.",
        ],
      },
      {
        type: "bullet-list",
        title: "What the homepage should do well",
        items: [
          "Establish trust in who you are.",
          "Point clearly toward blog, learning routes, stories, and contribution paths.",
          "Preview the depth of the system without making the homepage itself too heavy.",
        ],
      },
      {
        type: "callout",
        title: "Design rule",
        body:
          "A premium look should not hide the information architecture. It should make the architecture feel worth exploring.",
      },
      {
        type: "paragraphs",
        title: "Why the split is useful",
        paragraphs: [
          "The homepage can stay emotionally strong while inner routes optimize for clarity, reading comfort, taxonomy, and long-form study.",
        ],
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...posts].sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

export function getFeaturedBlogPost(): BlogPost {
  return getAllBlogPosts().find((post) => post.featured) ?? getAllBlogPosts()[0];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(getAllBlogPosts().map((post) => post.category))];
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  const ordered = getAllBlogPosts().filter((candidate) => candidate.slug !== post.slug);

  const manuallyRelated = (post.relatedSlugs ?? [])
    .map((slug) => ordered.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is BlogPost => Boolean(candidate));

  const seen = new Set(manuallyRelated.map((candidate) => candidate.slug));

  const inferred = ordered.filter((candidate) => {
    if (seen.has(candidate.slug)) {
      return false;
    }

    return candidate.category === post.category || candidate.tags.some((tag) => post.tags.includes(tag));
  });

  return [...manuallyRelated, ...inferred].slice(0, limit);
}

export function getAdjacentBlogPosts(slug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const ordered = getAllBlogPosts();
  const index = ordered.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

export function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
