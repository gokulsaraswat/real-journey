import type { Category, Domain, Level, Subcategory, Topic, Track } from "@/lib/contracts/content";

type SeedTopic = {
  slug: string;
  title: string;
  summary: string;
  estimatedReadMinutes: number;
  tags: string[];
};

type SeedSubcategory = {
  slug: string;
  title: string;
  summary: string;
  topics: SeedTopic[];
};

type SeedCategory = {
  slug: string;
  title: string;
  summary: string;
  subcategories: SeedSubcategory[];
};

type SeedLevel = {
  slug: string;
  title: string;
  summary: string;
  categories: SeedCategory[];
};

type SeedTrack = {
  slug: string;
  title: string;
  summary: string;
  levels: SeedLevel[];
};

type SeedDomain = {
  slug: string;
  title: string;
  summary: string;
  tracks: SeedTrack[];
};

export type LearnStats = {
  tracks: number;
  levels: number;
  categories: number;
  subcategories: number;
  topics: number;
};

export type TopicContext = {
  domain: Domain;
  track: Track;
  level: Level;
  category: Category;
  subcategory: Subcategory;
  topic: Topic;
};

const learningSeed: SeedDomain[] = [
  {
    slug: "it",
    title: "IT",
    summary:
      "Core engineering systems, backend depth, platform thinking, and the habits that move a learner from job-ready execution to CTO-level tradeoff making.",
    tracks: [
      {
        slug: "engineering-ladder",
        title: "Engineering Ladder",
        summary:
          "A five-level growth path for engineers who want strong fundamentals first and larger technical scope over time.",
        levels: [
          {
            slug: "job-ready-engineer",
            title: "Level 1 · Job-ready engineer",
            summary:
              "Build reliable fundamentals in protocols, operating systems, and daily execution habits.",
            categories: [
              {
                slug: "core-computing",
                title: "Core Computing",
                summary: "The protocols and system behavior every entry-level engineer should understand deeply.",
                subcategories: [
                  {
                    slug: "http-deep-dive",
                    title: "HTTP Deep Dive",
                    summary: "From browser request flow to caching rules and transport evolution.",
                    topics: [
                      {
                        slug: "http-request-lifecycle",
                        title: "HTTP request lifecycle",
                        summary: "Trace how a request moves from browser intent to server response and rendering outcome.",
                        estimatedReadMinutes: 18,
                        tags: ["HTTP", "Web", "Foundations"],
                      },
                      {
                        slug: "http-caching-and-versioning",
                        title: "HTTP caching and versioning",
                        summary: "Learn cache headers, validation requests, and safe asset versioning for fast user experiences.",
                        estimatedReadMinutes: 22,
                        tags: ["Caching", "Performance", "HTTP"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "developer-workflow",
                title: "Developer Workflow",
                summary: "Execution habits that make a junior engineer productive and dependable.",
                subcategories: [
                  {
                    slug: "linux-shell-essentials",
                    title: "Linux Shell Essentials",
                    summary: "Use the terminal confidently for debugging, navigation, and repeatable tasks.",
                    topics: [
                      {
                        slug: "linux-process-inspection",
                        title: "Linux process inspection",
                        summary: "Read process trees, inspect ports, and spot runaway services before they become production pain.",
                        estimatedReadMinutes: 16,
                        tags: ["Linux", "CLI", "Debugging"],
                      },
                      {
                        slug: "shell-pipelines-that-save-time",
                        title: "Shell pipelines that save time",
                        summary: "Compose small CLI tools into repeatable workflows for logs, files, and daily engineering tasks.",
                        estimatedReadMinutes: 15,
                        tags: ["CLI", "Productivity", "Unix"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "senior-engineer",
            title: "Level 2 · Senior engineer",
            summary:
              "Own reliability, understand system bottlenecks, and build calmer operating habits around software delivery.",
            categories: [
              {
                slug: "backend-systems",
                title: "Backend Systems",
                summary: "Patterns for throughput, concurrency, data access, and safe state transitions.",
                subcategories: [
                  {
                    slug: "caching-and-concurrency",
                    title: "Caching and Concurrency",
                    summary: "The runtime decisions that separate fast systems from unstable ones.",
                    topics: [
                      {
                        slug: "cache-invalidation-rules",
                        title: "Cache invalidation rules",
                        summary: "Pick caching boundaries, invalidation events, and fallback behavior without hiding correctness bugs.",
                        estimatedReadMinutes: 24,
                        tags: ["Caching", "Backend", "Reliability"],
                      },
                      {
                        slug: "async-processing-patterns",
                        title: "Async processing patterns",
                        summary: "Use queues and retry strategies when work should not block the request path.",
                        estimatedReadMinutes: 20,
                        tags: ["Queues", "Async", "Systems"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "observability",
                title: "Observability",
                summary: "Give teams enough visibility to understand latency, failure modes, and operational regressions quickly.",
                subcategories: [
                  {
                    slug: "incident-debugging",
                    title: "Incident Debugging",
                    summary: "Move from symptom chasing to structured diagnosis during production incidents.",
                    topics: [
                      {
                        slug: "structured-logging-that-helps",
                        title: "Structured logging that helps",
                        summary: "Design logs so they answer questions during outages instead of creating more noise.",
                        estimatedReadMinutes: 17,
                        tags: ["Observability", "Logs", "Incidents"],
                      },
                      {
                        slug: "sli-sla-and-error-budget-basics",
                        title: "SLI, SLA, and error budget basics",
                        summary: "Use service targets to guide release quality and operational conversations.",
                        estimatedReadMinutes: 19,
                        tags: ["SRE", "Reliability", "Metrics"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "architect",
            title: "Level 3 · Architect",
            summary:
              "Design service boundaries, platform capabilities, and system evolution with fewer accidental constraints.",
            categories: [
              {
                slug: "distributed-systems",
                title: "Distributed Systems",
                summary: "The tradeoffs that matter when many services, teams, and data flows start to interact.",
                subcategories: [
                  {
                    slug: "service-boundaries",
                    title: "Service Boundaries",
                    summary: "Choose decomposition lines that match ownership, latency, and change frequency.",
                    topics: [
                      {
                        slug: "consistency-tradeoffs-in-systems",
                        title: "Consistency tradeoffs in systems",
                        summary: "Understand where strict coordination matters and where eventual consistency is healthy.",
                        estimatedReadMinutes: 23,
                        tags: ["Architecture", "Data", "Distributed Systems"],
                      },
                      {
                        slug: "event-driven-architecture-basics",
                        title: "Event-driven architecture basics",
                        summary: "Use events to decouple systems without creating hidden complexity or replay chaos.",
                        estimatedReadMinutes: 21,
                        tags: ["Events", "Architecture", "Async"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "platform-design",
                title: "Platform Design",
                summary: "Internal leverage, interface contracts, and shared infrastructure decisions at scale.",
                subcategories: [
                  {
                    slug: "api-gateway-patterns",
                    title: "API Gateway Patterns",
                    summary: "Design gateway responsibilities without turning one edge service into a bottleneck.",
                    topics: [
                      {
                        slug: "gateway-policy-design",
                        title: "Gateway policy design",
                        summary: "Place auth, rate limits, and observability at the edge without blurring service ownership.",
                        estimatedReadMinutes: 18,
                        tags: ["API", "Gateway", "Platform"],
                      },
                      {
                        slug: "backwards-compatible-api-evolution",
                        title: "Backwards-compatible API evolution",
                        summary: "Ship API changes with migration windows and versioning discipline that keeps clients stable.",
                        estimatedReadMinutes: 20,
                        tags: ["API", "Versioning", "Contracts"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "engineering-manager-product-minded-leader",
            title: "Level 4 · Engineering manager / product-minded leader",
            summary:
              "Shape delivery systems, team rituals, and product-aware execution without losing technical judgment.",
            categories: [
              {
                slug: "delivery-systems",
                title: "Delivery Systems",
                summary: "Team mechanisms that improve rollout quality, clarity, and coordination.",
                subcategories: [
                  {
                    slug: "rfc-and-rollout-strategy",
                    title: "RFC and Rollout Strategy",
                    summary: "Create durable decision records and safer launch paths for high-change teams.",
                    topics: [
                      {
                        slug: "release-guardrails-and-checkpoints",
                        title: "Release guardrails and checkpoints",
                        summary: "Reduce launch risk with pre-release signals, staged rollout plans, and clear revert logic.",
                        estimatedReadMinutes: 17,
                        tags: ["Delivery", "Release", "Leadership"],
                      },
                      {
                        slug: "operational-readiness-reviews",
                        title: "Operational readiness reviews",
                        summary: "Review critical changes with enough depth to spot support, reliability, and ownership gaps.",
                        estimatedReadMinutes: 16,
                        tags: ["Ops", "Reviews", "Management"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "people-systems",
                title: "People Systems",
                summary: "Feedback loops, role clarity, and growth systems that scale healthier engineering teams.",
                subcategories: [
                  {
                    slug: "growth-and-feedback-loops",
                    title: "Growth and Feedback Loops",
                    summary: "Design team guidance that improves outcomes without adding bureaucratic overhead.",
                    topics: [
                      {
                        slug: "growth-matrix-design",
                        title: "Growth matrix design",
                        summary: "Create level expectations teams can actually use for coaching and promotion decisions.",
                        estimatedReadMinutes: 19,
                        tags: ["Career Growth", "Leadership", "Org Design"],
                      },
                      {
                        slug: "team-rituals-that-scale",
                        title: "Team rituals that scale",
                        summary: "Pick review, planning, and sync rituals that increase clarity instead of calendar fatigue.",
                        estimatedReadMinutes: 14,
                        tags: ["Management", "Rituals", "Execution"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "cto-founder-level-systems-thinking",
            title: "Level 5 · CTO / founder-level systems thinking",
            summary:
              "Connect architecture, product leverage, capital efficiency, and organizational shape into one operating model.",
            categories: [
              {
                slug: "org-architecture",
                title: "Org Architecture",
                summary: "How teams, platforms, and product bets fit together as the company grows.",
                subcategories: [
                  {
                    slug: "product-and-platform-strategy",
                    title: "Product and Platform Strategy",
                    summary: "Invest in leverage points that strengthen both the product and the engineering system.",
                    topics: [
                      {
                        slug: "platform-investment-map",
                        title: "Platform investment map",
                        summary: "Decide what deserves a platform bet, what should remain local, and how to stage those investments.",
                        estimatedReadMinutes: 21,
                        tags: ["CTO", "Platform", "Strategy"],
                      },
                      {
                        slug: "product-technology-fit",
                        title: "Product-technology fit",
                        summary: "Evaluate whether the technical stack and product direction reinforce each other over the next stage of growth.",
                        estimatedReadMinutes: 18,
                        tags: ["Strategy", "Founder", "Product"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "executive-systems",
                title: "Executive Systems",
                summary: "Cost, risk, portfolio choices, and business-aware engineering constraints.",
                subcategories: [
                  {
                    slug: "capital-aware-engineering",
                    title: "Capital-aware Engineering",
                    summary: "Use engineering investment as a strategic tool instead of a pure cost center.",
                    topics: [
                      {
                        slug: "cost-architecture-for-growth",
                        title: "Cost architecture for growth",
                        summary: "Spot where architecture choices create avoidable cloud spend and slow unit economics.",
                        estimatedReadMinutes: 20,
                        tags: ["Cloud", "CTO", "Finance"],
                      },
                      {
                        slug: "portfolio-risk-balancing",
                        title: "Portfolio risk balancing",
                        summary: "Balance foundational work, product bets, and experimental initiatives with explicit tradeoff framing.",
                        estimatedReadMinutes: 18,
                        tags: ["Risk", "Leadership", "Portfolio"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "project-building-studio",
        title: "Project Building Studio",
        summary:
          "A practical path focused on turning portfolio projects into production-flavored systems with clearer storytelling.",
        levels: [
          {
            slug: "foundation-projects",
            title: "Foundation projects",
            summary: "Build projects that prove fundamentals, not only UI polish.",
            categories: [
              {
                slug: "full-stack-bootstrapping",
                title: "Full-stack Bootstrapping",
                summary: "Set up project structure, data boundaries, and dev workflow with long-term maintainability in mind.",
                subcategories: [
                  {
                    slug: "project-foundation",
                    title: "Project Foundation",
                    summary: "Start with structure, constraints, and contracts instead of random feature coding.",
                    topics: [
                      {
                        slug: "repo-structure-that-scales",
                        title: "Repo structure that scales",
                        summary: "Organize folders, shared modules, and branch boundaries so your project stays teachable and merge-safe.",
                        estimatedReadMinutes: 13,
                        tags: ["Projects", "Git", "Structure"],
                      },
                      {
                        slug: "first-database-boundaries",
                        title: "First database boundaries",
                        summary: "Choose schemas and resource ownership early enough to avoid breaking changes later.",
                        estimatedReadMinutes: 16,
                        tags: ["Database", "Projects", "Planning"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "project-storytelling",
                title: "Project Storytelling",
                summary: "Explain your project choices so your portfolio feels senior instead of unfinished.",
                subcategories: [
                  {
                    slug: "portfolio-narrative",
                    title: "Portfolio Narrative",
                    summary: "Show why the system exists, what tradeoffs were made, and how the product can grow.",
                    topics: [
                      {
                        slug: "write-project-case-studies",
                        title: "Write project case studies",
                        summary: "Turn implementation work into a story about constraints, decisions, and measurable outcomes.",
                        estimatedReadMinutes: 12,
                        tags: ["Portfolio", "Writing", "Projects"],
                      },
                      {
                        slug: "show-tradeoffs-clearly",
                        title: "Show tradeoffs clearly",
                        summary: "Present limitations and future roadmap honestly so the project reads like real engineering work.",
                        estimatedReadMinutes: 11,
                        tags: ["Portfolio", "Architecture", "Communication"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "production-projects",
            title: "Production projects",
            summary: "Give side projects better deployment, logging, and operational structure.",
            categories: [
              {
                slug: "deployment-systems",
                title: "Deployment Systems",
                summary: "Move from local-only builds to release-minded delivery.",
                subcategories: [
                  {
                    slug: "release-pipeline-basics",
                    title: "Release Pipeline Basics",
                    summary: "Keep deploys predictable, observable, and reversible.",
                    topics: [
                      {
                        slug: "preview-environments-that-help",
                        title: "Preview environments that help",
                        summary: "Use isolated deploy previews so feature branches can be reviewed without blocking main development.",
                        estimatedReadMinutes: 12,
                        tags: ["CI/CD", "Preview Deploys", "Projects"],
                      },
                      {
                        slug: "production-rollbacks",
                        title: "Production rollbacks",
                        summary: "Plan fast rollback paths before you need them during a real issue.",
                        estimatedReadMinutes: 10,
                        tags: ["Deployments", "Operations", "Reliability"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "debugging-ops",
                title: "Debugging and Ops",
                summary: "Build enough runtime visibility to make your project feel trustworthy.",
                subcategories: [
                  {
                    slug: "production-debugging-habits",
                    title: "Production Debugging Habits",
                    summary: "Respond to failure with evidence, not guesswork.",
                    topics: [
                      {
                        slug: "capture-the-right-runtime-signals",
                        title: "Capture the right runtime signals",
                        summary: "Know which logs, metrics, and traces are worth adding before users report a problem.",
                        estimatedReadMinutes: 14,
                        tags: ["Observability", "Ops", "Projects"],
                      },
                      {
                        slug: "incident-notes-for-solo-builders",
                        title: "Incident notes for solo builders",
                        summary: "Document outages and fixes so your project keeps improving even when you work alone.",
                        estimatedReadMinutes: 11,
                        tags: ["Incidents", "Writing", "Solo Builder"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "portfolio-system",
            title: "Portfolio system",
            summary: "Turn isolated projects into a connected body of work that teaches your thinking.",
            categories: [
              {
                slug: "productized-learning",
                title: "Productized Learning",
                summary: "Package what you learn into reusable guides, demos, and teaching surfaces.",
                subcategories: [
                  {
                    slug: "knowledge-product-design",
                    title: "Knowledge Product Design",
                    summary: "Structure content so readers can move from overview to depth without getting lost.",
                    topics: [
                      {
                        slug: "taxonomy-that-supports-500-topics",
                        title: "Taxonomy that supports 500+ topics",
                        summary: "Use domain, track, level, category, and topic contracts so content grows without routing chaos.",
                        estimatedReadMinutes: 15,
                        tags: ["Taxonomy", "Information Architecture", "Scaling"],
                      },
                      {
                        slug: "reader-first-content-flow",
                        title: "Reader-first content flow",
                        summary: "Design guide pages so scanning, deep reading, and future downloads all fit the same system.",
                        estimatedReadMinutes: 16,
                        tags: ["Reader UX", "Docs", "Writing"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "distribution-and-growth",
                title: "Distribution and Growth",
                summary: "Make your projects discoverable and easy to share or contribute to.",
                subcategories: [
                  {
                    slug: "contribution-paths",
                    title: "Contribution Paths",
                    summary: "Encourage feedback, Git-based contributions, and public learning momentum.",
                    topics: [
                      {
                        slug: "feedback-loops-for-learning-products",
                        title: "Feedback loops for learning products",
                        summary: "Collect ideas through email and GitHub without making the project feel fragmented.",
                        estimatedReadMinutes: 11,
                        tags: ["Feedback", "Open Source", "Community"],
                      },
                      {
                        slug: "git-based-contribution-setup",
                        title: "Git-based contribution setup",
                        summary: "Define branch rules and review expectations so outside contributions stay safe and usable.",
                        estimatedReadMinutes: 13,
                        tags: ["Git", "Contributions", "Workflow"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ai",
    title: "AI",
    summary:
      "Production-minded AI engineering, evaluation systems, retrieval design, and the organizational decisions needed to ship useful intelligent products.",
    tracks: [
      {
        slug: "engineering-ladder",
        title: "Engineering Ladder",
        summary:
          "Move from AI foundations and prompting into retrieval, platform design, and executive-level AI strategy.",
        levels: [
          {
            slug: "job-ready-engineer",
            title: "Level 1 · Job-ready engineer",
            summary: "Understand the building blocks of modern AI systems and basic prompt application behavior.",
            categories: [
              {
                slug: "data-and-python",
                title: "Data and Python",
                summary: "Use clean data preparation and embeddings-aware thinking as the start of practical AI work.",
                subcategories: [
                  {
                    slug: "representation-foundations",
                    title: "Representation Foundations",
                    summary: "Build the intuition needed to work with text embeddings and chunked corpora.",
                    topics: [
                      {
                        slug: "embeddings-primer-for-builders",
                        title: "Embeddings primer for builders",
                        summary: "Learn what embeddings do well, what they miss, and why they matter in retrieval systems.",
                        estimatedReadMinutes: 17,
                        tags: ["AI", "Embeddings", "Foundations"],
                      },
                      {
                        slug: "chunking-documents-with-purpose",
                        title: "Chunking documents with purpose",
                        summary: "Split content in ways that preserve meaning and improve retrieval quality downstream.",
                        estimatedReadMinutes: 14,
                        tags: ["RAG", "Data", "Chunking"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "prompt-systems",
                title: "Prompt Systems",
                summary: "Treat prompt behavior as a testable interface instead of magic strings.",
                subcategories: [
                  {
                    slug: "prompt-evaluation",
                    title: "Prompt Evaluation",
                    summary: "Measure behavior, constrain outputs, and improve reliability across use cases.",
                    topics: [
                      {
                        slug: "schema-constrained-outputs",
                        title: "Schema-constrained outputs",
                        summary: "Use typed responses so downstream systems can trust generated content more safely.",
                        estimatedReadMinutes: 13,
                        tags: ["LLMs", "Structured Output", "Reliability"],
                      },
                      {
                        slug: "prompt-regression-checks",
                        title: "Prompt regression checks",
                        summary: "Create small evaluation sets so prompt changes do not quietly damage product quality.",
                        estimatedReadMinutes: 12,
                        tags: ["Prompting", "Evaluation", "Testing"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "senior-engineer",
            title: "Level 2 · Senior engineer",
            summary: "Ship retrieval and inference systems with clearer quality controls and runtime budgets.",
            categories: [
              {
                slug: "retrieval-and-evaluation",
                title: "Retrieval and Evaluation",
                summary: "Move from demos to measurable system behavior across search and answer quality.",
                subcategories: [
                  {
                    slug: "rag-quality-systems",
                    title: "RAG Quality Systems",
                    summary: "Tune retrieval quality with data, not hunches.",
                    topics: [
                      {
                        slug: "retrieval-eval-harness",
                        title: "Retrieval evaluation harness",
                        summary: "Build a repeatable test set that shows when document retrieval gets better or worse.",
                        estimatedReadMinutes: 18,
                        tags: ["RAG", "Eval", "Quality"],
                      },
                      {
                        slug: "reranking-when-it-matters",
                        title: "Reranking when it matters",
                        summary: "Add reranking only where it improves answer quality enough to justify cost and latency.",
                        estimatedReadMinutes: 16,
                        tags: ["Search", "Latency", "RAG"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "inference-systems",
                title: "Inference Systems",
                summary: "Understand the runtime behavior that shapes latency, reliability, and spend.",
                subcategories: [
                  {
                    slug: "latency-and-throughput",
                    title: "Latency and Throughput",
                    summary: "Use batching, caching, and workload separation with intention.",
                    topics: [
                      {
                        slug: "latency-budgets-for-ai-products",
                        title: "Latency budgets for AI products",
                        summary: "Define how fast each stage must be so product quality and user patience stay aligned.",
                        estimatedReadMinutes: 15,
                        tags: ["Inference", "Performance", "AI Product"],
                      },
                      {
                        slug: "batching-vs-interactivity",
                        title: "Batching vs interactivity",
                        summary: "Choose when to batch work and when low-latency interaction matters more.",
                        estimatedReadMinutes: 14,
                        tags: ["Performance", "Inference", "Tradeoffs"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "architect",
            title: "Level 3 · Architect",
            summary: "Design AI platforms, boundaries, and multimodal workflows that multiple teams can build on.",
            categories: [
              {
                slug: "ml-platform",
                title: "ML Platform",
                summary: "Connect data pipelines, model interfaces, and deployment boundaries cleanly.",
                subcategories: [
                  {
                    slug: "model-serving-boundaries",
                    title: "Model Serving Boundaries",
                    summary: "Separate data prep, inference, and product orchestration with clear contracts.",
                    topics: [
                      {
                        slug: "feature-pipelines-for-ai-systems",
                        title: "Feature pipelines for AI systems",
                        summary: "Build reusable data preparation flows without hiding data drift risks.",
                        estimatedReadMinutes: 17,
                        tags: ["ML Platform", "Data", "Pipelines"],
                      },
                      {
                        slug: "serving-boundaries-that-scale",
                        title: "Serving boundaries that scale",
                        summary: "Choose model-serving interfaces that match product iteration speed and platform reliability.",
                        estimatedReadMinutes: 19,
                        tags: ["Serving", "Architecture", "ML Platform"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "multimodal-systems",
                title: "Multimodal Systems",
                summary: "Orchestrate vision, text, and tool workflows without losing control over safety and evaluation.",
                subcategories: [
                  {
                    slug: "vision-text-orchestration",
                    title: "Vision and Text Orchestration",
                    summary: "Coordinate multiple model capabilities for grounded product experiences.",
                    topics: [
                      {
                        slug: "multimodal-tool-routing",
                        title: "Multimodal tool routing",
                        summary: "Decide which tasks need model calls, retrieval, tools, or human review.",
                        estimatedReadMinutes: 18,
                        tags: ["Multimodal", "Tooling", "Architecture"],
                      },
                      {
                        slug: "safety-layers-for-multimodal-ai",
                        title: "Safety layers for multimodal AI",
                        summary: "Insert validation and review stages where multimodal systems carry higher trust risk.",
                        estimatedReadMinutes: 16,
                        tags: ["Safety", "Multimodal", "AI Governance"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "engineering-manager-product-minded-leader",
            title: "Level 4 · Engineering manager / product-minded leader",
            summary: "Run experiments, benchmarks, and launch discipline around AI features instead of shipping isolated demos.",
            categories: [
              {
                slug: "team-systems",
                title: "Team Systems",
                summary: "Make evaluation and product learning part of the team operating model.",
                subcategories: [
                  {
                    slug: "benchmark-reviews",
                    title: "Benchmark Reviews",
                    summary: "Turn evaluations into a language product and engineering can both use.",
                    topics: [
                      {
                        slug: "benchmark-reviews-that-inform-roadmaps",
                        title: "Benchmark reviews that inform roadmaps",
                        summary: "Use evaluation outputs to decide what the team should improve next.",
                        estimatedReadMinutes: 14,
                        tags: ["Benchmarks", "Leadership", "Roadmaps"],
                      },
                      {
                        slug: "experiment-operating-model",
                        title: "Experiment operating model",
                        summary: "Structure AI experiments so learnings survive beyond one engineer or one release cycle.",
                        estimatedReadMinutes: 15,
                        tags: ["Experiments", "Team Design", "AI Product"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "ai-product-delivery",
                title: "AI Product Delivery",
                summary: "Prepare AI launches with feedback channels, human review, and rollback planning.",
                subcategories: [
                  {
                    slug: "launch-readiness",
                    title: "Launch Readiness",
                    summary: "Build the checks needed before model behavior reaches real users.",
                    topics: [
                      {
                        slug: "human-in-the-loop-operations",
                        title: "Human-in-the-loop operations",
                        summary: "Place review queues where automation is useful but not fully trustworthy yet.",
                        estimatedReadMinutes: 16,
                        tags: ["Human Review", "Operations", "AI Product"],
                      },
                      {
                        slug: "rollback-plans-for-ai-features",
                        title: "Rollback plans for AI features",
                        summary: "Prepare failure response paths for prompt, model, and retrieval regressions.",
                        estimatedReadMinutes: 13,
                        tags: ["Rollbacks", "AI Product", "Reliability"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "cto-founder-level-systems-thinking",
            title: "Level 5 · CTO / founder-level systems thinking",
            summary: "Choose AI investments, governance models, and adoption strategies that match the business stage.",
            categories: [
              {
                slug: "ai-portfolio",
                title: "AI Portfolio",
                summary: "Balance capability bets, platform spending, and product demand with realism.",
                subcategories: [
                  {
                    slug: "buy-build-governance",
                    title: "Buy, Build, and Governance",
                    summary: "Decide where to own capability and where to assemble it from external systems.",
                    topics: [
                      {
                        slug: "build-vs-buy-for-ai-capabilities",
                        title: "Build vs buy for AI capabilities",
                        summary: "Choose what to own based on differentiation, risk, and long-term cost.",
                        estimatedReadMinutes: 18,
                        tags: ["Strategy", "AI", "CTO"],
                      },
                      {
                        slug: "governance-patterns-for-ai-products",
                        title: "Governance patterns for AI products",
                        summary: "Set review, approval, and monitoring rules without freezing useful experimentation.",
                        estimatedReadMinutes: 17,
                        tags: ["Governance", "AI Policy", "Leadership"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "org-systems",
                title: "Org Systems",
                summary: "Help the whole company adopt AI responsibly instead of relying on scattered experiments.",
                subcategories: [
                  {
                    slug: "adoption-roadmap",
                    title: "Adoption Roadmap",
                    summary: "Plan platform support, training, and governance as one company-wide system.",
                    topics: [
                      {
                        slug: "ai-platform-roadmap",
                        title: "AI platform roadmap",
                        summary: "Sequence enablement, shared tooling, and platform investment over multiple quarters.",
                        estimatedReadMinutes: 16,
                        tags: ["AI Platform", "Roadmap", "CTO"],
                      },
                      {
                        slug: "risk-and-compliance-loops",
                        title: "Risk and compliance loops",
                        summary: "Integrate legal, security, and product review without stalling delivery velocity.",
                        estimatedReadMinutes: 15,
                        tags: ["Compliance", "Risk", "AI Governance"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "shipping-ai-products",
        title: "Shipping AI Products",
        summary:
          "A compact path for builders who want to move from prototype to production behavior faster.",
        levels: [
          {
            slug: "prototype-builder",
            title: "Prototype builder",
            summary: "Test product usefulness quickly without confusing exploration for product readiness.",
            categories: [
              {
                slug: "prompt-apps",
                title: "Prompt Apps",
                summary: "Small systems that prove user value before platform complexity shows up.",
                subcategories: [
                  {
                    slug: "rapid-validation",
                    title: "Rapid Validation",
                    summary: "Find out what the user actually values before optimizing the stack.",
                    topics: [
                      {
                        slug: "prototype-value-hypotheses",
                        title: "Prototype value hypotheses",
                        summary: "Write explicit assumptions so early AI prototypes answer real user questions.",
                        estimatedReadMinutes: 10,
                        tags: ["Prototyping", "AI Product", "Discovery"],
                      },
                      {
                        slug: "collecting-useful-evals-early",
                        title: "Collecting useful evals early",
                        summary: "Capture examples and edge cases while user feedback is still small and high-signal.",
                        estimatedReadMinutes: 12,
                        tags: ["Eval", "Discovery", "Prompt Apps"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "production-builder",
            title: "Production builder",
            summary: "Add quality checks, data loops, and operational guardrails before scale arrives.",
            categories: [
              {
                slug: "data-feedback-loops",
                title: "Data Feedback Loops",
                summary: "Use real usage to improve product quality and avoid repeating failure patterns.",
                subcategories: [
                  {
                    slug: "quality-feedback",
                    title: "Quality Feedback",
                    summary: "Create a path from usage signals back into evals and iteration.",
                    topics: [
                      {
                        slug: "annotation-queues-that-age-well",
                        title: "Annotation queues that age well",
                        summary: "Set up review queues that keep getting more useful as the product matures.",
                        estimatedReadMinutes: 13,
                        tags: ["Feedback", "Data Ops", "AI Product"],
                      },
                      {
                        slug: "failure-taxonomy-for-ai-apps",
                        title: "Failure taxonomy for AI apps",
                        summary: "Categorize product failures so quality work becomes systematic instead of reactive.",
                        estimatedReadMinutes: 14,
                        tags: ["AI Product", "Taxonomy", "Quality"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "org-adoption",
            title: "Org adoption",
            summary: "Bring AI workflows into a team or company with clearer support and training.",
            categories: [
              {
                slug: "workflow-rollout",
                title: "Workflow Rollout",
                summary: "Help teams adopt AI in a way that actually changes work, not only demo excitement.",
                subcategories: [
                  {
                    slug: "internal-enablement",
                    title: "Internal Enablement",
                    summary: "Support repeatable internal use cases with guardrails and clear success signals.",
                    topics: [
                      {
                        slug: "rollout-plans-for-internal-ai-tools",
                        title: "Rollout plans for internal AI tools",
                        summary: "Sequence pilots, enablement, and support for internal AI features that people can actually adopt.",
                        estimatedReadMinutes: 12,
                        tags: ["Enablement", "AI Rollout", "Operations"],
                      },
                      {
                        slug: "measure-adoption-without-vanity-metrics",
                        title: "Measure adoption without vanity metrics",
                        summary: "Track whether AI workflows save time or improve quality instead of only counting clicks.",
                        estimatedReadMinutes: 12,
                        tags: ["Adoption", "Metrics", "AI Product"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    summary:
      "Security engineering paths covering foundations, detection systems, cloud defense, incident response, and executive-level resilience.",
    tracks: [
      {
        slug: "engineering-ladder",
        title: "Engineering Ladder",
        summary:
          "Grow from security fundamentals into platform defense, security leadership, and board-aware decision making.",
        levels: [
          {
            slug: "job-ready-engineer",
            title: "Level 1 · Job-ready engineer",
            summary: "Build strong mental models around web threats, identity, logs, and hands-on defensive work.",
            categories: [
              {
                slug: "security-foundations",
                title: "Security Foundations",
                summary: "The minimum working model needed to reason about modern system risk.",
                subcategories: [
                  {
                    slug: "web-threats-and-identity",
                    title: "Web Threats and Identity",
                    summary: "Understand how common attacks exploit trust, state, and weak boundaries.",
                    topics: [
                      {
                        slug: "web-threat-model-basics",
                        title: "Web threat model basics",
                        summary: "Map attackers, assets, trust boundaries, and simple failure paths in web systems.",
                        estimatedReadMinutes: 15,
                        tags: ["Security", "Threat Modeling", "Web"],
                      },
                      {
                        slug: "identity-basics-for-engineers",
                        title: "Identity basics for engineers",
                        summary: "Learn sessions, tokens, and permission boundaries well enough to avoid common auth mistakes.",
                        estimatedReadMinutes: 17,
                        tags: ["Identity", "Auth", "Security"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "hands-on-defense",
                title: "Hands-on Defense",
                summary: "The first operational routines for understanding real signals and reducing obvious risk.",
                subcategories: [
                  {
                    slug: "log-analysis-and-triage",
                    title: "Log Analysis and Triage",
                    summary: "Read operational signals and triage findings without overreacting to every alert.",
                    topics: [
                      {
                        slug: "log-analysis-for-beginners",
                        title: "Log analysis for beginners",
                        summary: "Start reading auth failures, suspicious patterns, and system behavior with confidence.",
                        estimatedReadMinutes: 14,
                        tags: ["Logs", "Defense", "SOC"],
                      },
                      {
                        slug: "vulnerability-triage-basics",
                        title: "Vulnerability triage basics",
                        summary: "Prioritize issues based on exploitability, exposure, and business impact instead of CVE panic.",
                        estimatedReadMinutes: 16,
                        tags: ["Vulnerability Management", "Risk", "Security"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "senior-engineer",
            title: "Level 2 · Senior engineer",
            summary: "Improve detection quality, cloud controls, and alert systems that teams can sustain.",
            categories: [
              {
                slug: "detection-engineering",
                title: "Detection Engineering",
                summary: "Build higher-signal detections and reduce alert fatigue with evidence.",
                subcategories: [
                  {
                    slug: "detection-quality",
                    title: "Detection Quality",
                    summary: "Design detections that help analysts act faster instead of flooding them.",
                    topics: [
                      {
                        slug: "alert-tuning-that-reduces-noise",
                        title: "Alert tuning that reduces noise",
                        summary: "Use baseline behavior and context so defenders can trust the alerts that remain.",
                        estimatedReadMinutes: 15,
                        tags: ["Detections", "SOC", "Signal Quality"],
                      },
                      {
                        slug: "detection-coverage-mapping",
                        title: "Detection coverage mapping",
                        summary: "Map detections to attacker behaviors so you know what is observed and what is still blind.",
                        estimatedReadMinutes: 18,
                        tags: ["MITRE ATT&CK", "Coverage", "Detection Engineering"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "cloud-security",
                title: "Cloud Security",
                summary: "Protect identity, runtime, and storage in cloud-native systems with clear shared responsibility.",
                subcategories: [
                  {
                    slug: "iam-and-runtime-signals",
                    title: "IAM and Runtime Signals",
                    summary: "Harden access paths and read runtime behavior for suspicious changes.",
                    topics: [
                      {
                        slug: "iam-hardening-principles",
                        title: "IAM hardening principles",
                        summary: "Reduce permission sprawl and privilege escalation paths with better access modeling.",
                        estimatedReadMinutes: 17,
                        tags: ["IAM", "Cloud", "Security"],
                      },
                      {
                        slug: "runtime-signals-for-cloud-defense",
                        title: "Runtime signals for cloud defense",
                        summary: "Watch process, network, and deployment behavior that hints at active misuse in cloud systems.",
                        estimatedReadMinutes: 16,
                        tags: ["Cloud Security", "Runtime", "Defense"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "architect",
            title: "Level 3 · Architect",
            summary: "Design security controls as a platform capability instead of a late-stage checklist.",
            categories: [
              {
                slug: "platform-defense",
                title: "Platform Defense",
                summary: "Use architecture and trust boundaries to lower attack surface before incidents happen.",
                subcategories: [
                  {
                    slug: "zero-trust-and-keys",
                    title: "Zero Trust and Keys",
                    summary: "Rethink network trust, secret handling, and service identity with modern control patterns.",
                    topics: [
                      {
                        slug: "zero-trust-patterns-in-practice",
                        title: "Zero trust patterns in practice",
                        summary: "Apply identity-centered access patterns without overcomplicating every service call.",
                        estimatedReadMinutes: 19,
                        tags: ["Zero Trust", "Architecture", "Security"],
                      },
                      {
                        slug: "key-management-systems-overview",
                        title: "Key management systems overview",
                        summary: "Understand the lifecycle, rotation, and governance of secrets and cryptographic material.",
                        estimatedReadMinutes: 18,
                        tags: ["KMS", "Secrets", "Security Architecture"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "security-architecture",
                title: "Security Architecture",
                summary: "Model risk at the system level and place controls where they change the threat story.",
                subcategories: [
                  {
                    slug: "segmentation-and-threat-models",
                    title: "Segmentation and Threat Models",
                    summary: "Use boundaries deliberately to reduce blast radius and improve recoverability.",
                    topics: [
                      {
                        slug: "network-segmentation-strategy",
                        title: "Network segmentation strategy",
                        summary: "Segment systems by trust and function so a single compromise cannot move everywhere easily.",
                        estimatedReadMinutes: 18,
                        tags: ["Segmentation", "Network Security", "Architecture"],
                      },
                      {
                        slug: "threat-modeling-for-platform-teams",
                        title: "Threat modeling for platform teams",
                        summary: "Make threat modeling useful enough that engineering teams will actually do it.",
                        estimatedReadMinutes: 15,
                        tags: ["Threat Modeling", "Platform", "Security"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "engineering-manager-product-minded-leader",
            title: "Level 4 · Engineering manager / product-minded leader",
            summary: "Run security programs, response readiness, and enablement systems that teams can follow.",
            categories: [
              {
                slug: "operations-leadership",
                title: "Operations Leadership",
                summary: "Coordinate incident programs and operational controls without slowing every team down.",
                subcategories: [
                  {
                    slug: "incident-programs",
                    title: "Incident Programs",
                    summary: "Build repeatable response, review, and learning loops around security events.",
                    topics: [
                      {
                        slug: "incident-program-design",
                        title: "Incident program design",
                        summary: "Structure severity, ownership, and review flow so the response process holds under pressure.",
                        estimatedReadMinutes: 16,
                        tags: ["Incident Response", "Leadership", "Security Ops"],
                      },
                      {
                        slug: "control-mapping-for-teams",
                        title: "Control mapping for teams",
                        summary: "Translate policies and frameworks into practical controls teams can own and maintain.",
                        estimatedReadMinutes: 15,
                        tags: ["Controls", "Compliance", "Security Leadership"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "culture-and-enablement",
                title: "Culture and Enablement",
                summary: "Help security become easier to do, not only harder to violate.",
                subcategories: [
                  {
                    slug: "training-and-reporting",
                    title: "Training and Reporting",
                    summary: "Use education and metrics to change behavior in a measurable way.",
                    topics: [
                      {
                        slug: "security-training-that-works",
                        title: "Security training that works",
                        summary: "Teach security concepts through real workflows instead of generic annual content alone.",
                        estimatedReadMinutes: 13,
                        tags: ["Training", "Enablement", "Culture"],
                      },
                      {
                        slug: "reporting-risk-to-leadership",
                        title: "Reporting risk to leadership",
                        summary: "Summarize risk posture in a form that product and business leaders can act on.",
                        estimatedReadMinutes: 14,
                        tags: ["Risk", "Reporting", "Leadership"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "cto-founder-level-systems-thinking",
            title: "Level 5 · CTO / founder-level systems thinking",
            summary: "Align security posture, resilience, governance, and company risk appetite at the executive layer.",
            categories: [
              {
                slug: "executive-resilience",
                title: "Executive Resilience",
                summary: "Turn security investment into business continuity and trust, not only compliance theater.",
                subcategories: [
                  {
                    slug: "security-investment-thesis",
                    title: "Security Investment Thesis",
                    summary: "Choose where security spending actually changes company risk in a meaningful way.",
                    topics: [
                      {
                        slug: "security-investment-prioritization",
                        title: "Security investment prioritization",
                        summary: "Focus budget on controls and capabilities that shift business exposure, not only audit appearance.",
                        estimatedReadMinutes: 16,
                        tags: ["CTO", "Security", "Strategy"],
                      },
                      {
                        slug: "business-continuity-for-technical-leaders",
                        title: "Business continuity for technical leaders",
                        summary: "Prepare technical systems and operating plans that help the company recover during real disruption.",
                        estimatedReadMinutes: 18,
                        tags: ["Resilience", "Leadership", "Continuity"],
                      },
                    ],
                  },
                ],
              },
              {
                slug: "governance",
                title: "Governance",
                summary: "Board-facing security systems, policy shape, and cross-functional accountability.",
                subcategories: [
                  {
                    slug: "policy-and-board-reporting",
                    title: "Policy and Board Reporting",
                    summary: "Make governance visible enough to direct action without drowning in paperwork.",
                    topics: [
                      {
                        slug: "policy-systems-that-stay-usable",
                        title: "Policy systems that stay usable",
                        summary: "Write and maintain security policy in a way that teams can actually understand and follow.",
                        estimatedReadMinutes: 14,
                        tags: ["Policy", "Governance", "Security"],
                      },
                      {
                        slug: "board-reporting-for-security-posture",
                        title: "Board reporting for security posture",
                        summary: "Frame security posture in terms of resilience, exposure, and investment options.",
                        estimatedReadMinutes: 15,
                        tags: ["Board", "Reporting", "Security Leadership"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "labs-and-response",
        title: "Labs and Response",
        summary:
          "A more hands-on path for blue team drills, incident handling, and audit-ready security operations.",
        levels: [
          {
            slug: "blue-team-foundations",
            title: "Blue team foundations",
            summary: "Practice the first response workflows defenders need repeatedly.",
            categories: [
              {
                slug: "soc-workflow",
                title: "SOC Workflow",
                summary: "Understand how alerts, context, and escalation fit together in day-to-day defense.",
                subcategories: [
                  {
                    slug: "triage-drills",
                    title: "Triage Drills",
                    summary: "Practice fast pattern recognition without skipping evidence collection.",
                    topics: [
                      {
                        slug: "triage-a-suspicious-login",
                        title: "Triage a suspicious login",
                        summary: "Follow the first-response steps for unusual sign-in activity before declaring an incident.",
                        estimatedReadMinutes: 11,
                        tags: ["SOC", "Incident Triage", "Identity"],
                      },
                      {
                        slug: "build-an-incident-timeline",
                        title: "Build an incident timeline",
                        summary: "Reconstruct what happened in order and decide what evidence still needs to be collected.",
                        estimatedReadMinutes: 12,
                        tags: ["Incidents", "Timeline", "Analysis"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "incident-response",
            title: "Incident response",
            summary: "Move from triage into containment, recovery, and post-incident learning.",
            categories: [
              {
                slug: "containment-playbooks",
                title: "Containment Playbooks",
                summary: "Pre-build the response options you want before a crisis forces rushed decisions.",
                subcategories: [
                  {
                    slug: "response-patterns",
                    title: "Response Patterns",
                    summary: "Match containment actions to the system and attacker behavior involved.",
                    topics: [
                      {
                        slug: "containment-with-minimal-blast-radius",
                        title: "Containment with minimal blast radius",
                        summary: "Use account isolation, key rotation, and temporary controls without breaking the whole business.",
                        estimatedReadMinutes: 13,
                        tags: ["Containment", "Response", "Security Ops"],
                      },
                      {
                        slug: "security-postmortems-that-teach",
                        title: "Security postmortems that teach",
                        summary: "Write reviews that change systems, not only record blame or generic lessons.",
                        estimatedReadMinutes: 14,
                        tags: ["Postmortem", "Learning", "Security"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            slug: "assurance-and-audit",
            title: "Assurance and audit",
            summary: "Prepare evidence and operating routines that reduce audit pain over time.",
            categories: [
              {
                slug: "vendor-risk-and-evidence",
                title: "Vendor Risk and Evidence",
                summary: "Collect useful proof of control operation before a formal review asks for it.",
                subcategories: [
                  {
                    slug: "audit-readiness",
                    title: "Audit Readiness",
                    summary: "Turn compliance asks into lighter recurring habits.",
                    topics: [
                      {
                        slug: "audit-evidence-that-stays-organized",
                        title: "Audit evidence that stays organized",
                        summary: "Store evidence in a way that reduces scramble across future audits and customer requests.",
                        estimatedReadMinutes: 12,
                        tags: ["Audit", "Evidence", "Compliance"],
                      },
                      {
                        slug: "vendor-risk-reviews-for-engineers",
                        title: "Vendor risk reviews for engineers",
                        summary: "Evaluate third-party services with enough technical depth to catch material risk early.",
                        estimatedReadMinutes: 14,
                        tags: ["Vendor Risk", "Compliance", "Security"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const domains: Domain[] = [];
const tracks: Track[] = [];
const levels: Level[] = [];
const categories: Category[] = [];
const subcategories: Subcategory[] = [];
const topics: Topic[] = [];

for (const domainSeed of learningSeed) {
  const domainId = domainSeed.slug;
  domains.push({
    id: domainId,
    slug: domainSeed.slug,
    title: domainSeed.title,
    summary: domainSeed.summary,
  });

  for (const trackSeed of domainSeed.tracks) {
    const trackId = `${domainId}__${trackSeed.slug}`;
    tracks.push({
      id: trackId,
      domainId,
      slug: trackSeed.slug,
      title: trackSeed.title,
      summary: trackSeed.summary,
    });

    trackSeed.levels.forEach((levelSeed, levelIndex) => {
      const levelId = `${trackId}__${levelSeed.slug}`;
      levels.push({
        id: levelId,
        trackId,
        slug: levelSeed.slug,
        title: levelSeed.title,
        summary: levelSeed.summary,
        order: levelIndex + 1,
      });

      for (const categorySeed of levelSeed.categories) {
        const categoryId = `${levelId}__${categorySeed.slug}`;
        categories.push({
          id: categoryId,
          levelId,
          slug: categorySeed.slug,
          title: categorySeed.title,
          summary: categorySeed.summary,
        });

        for (const subcategorySeed of categorySeed.subcategories) {
          const subcategoryId = `${categoryId}__${subcategorySeed.slug}`;
          subcategories.push({
            id: subcategoryId,
            categoryId,
            slug: subcategorySeed.slug,
            title: subcategorySeed.title,
            summary: subcategorySeed.summary,
          });

          for (const topicSeed of subcategorySeed.topics) {
            topics.push({
              id: `${subcategoryId}__${topicSeed.slug}`,
              subcategoryId,
              slug: topicSeed.slug,
              title: topicSeed.title,
              summary: topicSeed.summary,
              estimatedReadMinutes: topicSeed.estimatedReadMinutes,
              tags: topicSeed.tags,
            });
          }
        }
      }
    });
  }
}

const domainById = new Map(domains.map((item) => [item.id, item]));
const trackById = new Map(tracks.map((item) => [item.id, item]));
const levelById = new Map(levels.map((item) => [item.id, item]));
const categoryById = new Map(categories.map((item) => [item.id, item]));
const subcategoryById = new Map(subcategories.map((item) => [item.id, item]));
const topicById = new Map(topics.map((item) => [item.id, item]));

function sortByTitle<T extends { title: string }>(items: T[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title));
}

export function getLearnOverviewStats() {
  return {
    domains: domains.length,
    tracks: tracks.length,
    levels: levels.length,
    categories: categories.length,
    subcategories: subcategories.length,
    topics: topics.length,
  };
}

export function getAllDomains() {
  return [...domains];
}

export function getSpotlightTopics(limit = 6) {
  return topics
    .map((topic) => ({
      topic,
      context: getTopicContextById(topic.id),
    }))
    .filter((item): item is { topic: Topic; context: TopicContext } => Boolean(item.context))
    .slice(0, limit);
}

export function getDomainBySlug(slug: string) {
  return domains.find((item) => item.slug === slug) ?? null;
}

export function getTracksForDomain(domainId: string) {
  return sortByTitle(tracks.filter((item) => item.domainId === domainId));
}

export function getTrackBySlugs(domainSlug: string, trackSlug: string) {
  const domain = getDomainBySlug(domainSlug);
  if (!domain) {
    return null;
  }

  return tracks.find((item) => item.domainId === domain.id && item.slug === trackSlug) ?? null;
}

export function getLevelsForTrack(trackId: string) {
  return [...levels]
    .filter((item) => item.trackId === trackId)
    .sort((a, b) => a.order - b.order);
}

export function getLevelBySlugs(domainSlug: string, trackSlug: string, levelSlug: string) {
  const track = getTrackBySlugs(domainSlug, trackSlug);
  if (!track) {
    return null;
  }

  return levels.find((item) => item.trackId === track.id && item.slug === levelSlug) ?? null;
}

export function getCategoriesForLevel(levelId: string) {
  return sortByTitle(categories.filter((item) => item.levelId === levelId));
}

export function getCategoryBySlugs(
  domainSlug: string,
  trackSlug: string,
  levelSlug: string,
  categorySlug: string,
) {
  const level = getLevelBySlugs(domainSlug, trackSlug, levelSlug);
  if (!level) {
    return null;
  }

  return categories.find((item) => item.levelId === level.id && item.slug === categorySlug) ?? null;
}

export function getSubcategoriesForCategory(categoryId: string) {
  return sortByTitle(subcategories.filter((item) => item.categoryId === categoryId));
}

export function getSubcategoryBySlugs(
  domainSlug: string,
  trackSlug: string,
  levelSlug: string,
  categorySlug: string,
  subcategorySlug: string,
) {
  const category = getCategoryBySlugs(domainSlug, trackSlug, levelSlug, categorySlug);
  if (!category) {
    return null;
  }

  return subcategories.find((item) => item.categoryId === category.id && item.slug === subcategorySlug) ?? null;
}

export function getTopicsForSubcategory(subcategoryId: string) {
  return sortByTitle(topics.filter((item) => item.subcategoryId === subcategoryId));
}

export function getTopicBySlug(slug: string) {
  return topics.find((item) => item.slug === slug) ?? null;
}

export function getTopicContextBySlug(slug: string) {
  const topic = getTopicBySlug(slug);
  if (!topic) {
    return null;
  }

  return getTopicContextById(topic.id);
}

function getTopicContextById(topicId: string): TopicContext | null {
  const topic = topicById.get(topicId);
  if (!topic) {
    return null;
  }

  const subcategory = subcategoryById.get(topic.subcategoryId);
  if (!subcategory) {
    return null;
  }

  const category = categoryById.get(subcategory.categoryId);
  if (!category) {
    return null;
  }

  const level = levelById.get(category.levelId);
  if (!level) {
    return null;
  }

  const track = trackById.get(level.trackId);
  if (!track) {
    return null;
  }

  const domain = domainById.get(track.domainId);
  if (!domain) {
    return null;
  }

  return { domain, track, level, category, subcategory, topic };
}

export function getDomainStats(domainId: string): LearnStats {
  const domainTracks = getTracksForDomain(domainId);
  const trackIds = new Set(domainTracks.map((item) => item.id));
  const domainLevels = levels.filter((item) => trackIds.has(item.trackId));
  const levelIds = new Set(domainLevels.map((item) => item.id));
  const domainCategories = categories.filter((item) => levelIds.has(item.levelId));
  const categoryIds = new Set(domainCategories.map((item) => item.id));
  const domainSubcategories = subcategories.filter((item) => categoryIds.has(item.categoryId));
  const subcategoryIds = new Set(domainSubcategories.map((item) => item.id));
  const domainTopics = topics.filter((item) => subcategoryIds.has(item.subcategoryId));

  return {
    tracks: domainTracks.length,
    levels: domainLevels.length,
    categories: domainCategories.length,
    subcategories: domainSubcategories.length,
    topics: domainTopics.length,
  };
}

export function getTrackStats(trackId: string): LearnStats {
  const trackLevels = getLevelsForTrack(trackId);
  const levelIds = new Set(trackLevels.map((item) => item.id));
  const trackCategories = categories.filter((item) => levelIds.has(item.levelId));
  const categoryIds = new Set(trackCategories.map((item) => item.id));
  const trackSubcategories = subcategories.filter((item) => categoryIds.has(item.categoryId));
  const subcategoryIds = new Set(trackSubcategories.map((item) => item.id));
  const trackTopics = topics.filter((item) => subcategoryIds.has(item.subcategoryId));

  return {
    tracks: 1,
    levels: trackLevels.length,
    categories: trackCategories.length,
    subcategories: trackSubcategories.length,
    topics: trackTopics.length,
  };
}

export function getLevelStats(levelId: string): LearnStats {
  const levelCategories = getCategoriesForLevel(levelId);
  const categoryIds = new Set(levelCategories.map((item) => item.id));
  const levelSubcategories = subcategories.filter((item) => categoryIds.has(item.categoryId));
  const subcategoryIds = new Set(levelSubcategories.map((item) => item.id));
  const levelTopics = topics.filter((item) => subcategoryIds.has(item.subcategoryId));

  return {
    tracks: 1,
    levels: 1,
    categories: levelCategories.length,
    subcategories: levelSubcategories.length,
    topics: levelTopics.length,
  };
}

export function getCategoryStats(categoryId: string): LearnStats {
  const categorySubcategories = getSubcategoriesForCategory(categoryId);
  const subcategoryIds = new Set(categorySubcategories.map((item) => item.id));
  const categoryTopics = topics.filter((item) => subcategoryIds.has(item.subcategoryId));

  return {
    tracks: 1,
    levels: 1,
    categories: 1,
    subcategories: categorySubcategories.length,
    topics: categoryTopics.length,
  };
}

export function getSubcategoryStats(subcategoryId: string): LearnStats {
  const subcategoryTopics = getTopicsForSubcategory(subcategoryId);

  return {
    tracks: 1,
    levels: 1,
    categories: 1,
    subcategories: 1,
    topics: subcategoryTopics.length,
  };
}

export function getFeaturedTopicsForDomain(domainId: string, limit = 4) {
  return topics
    .map((topic) => ({ topic, context: getTopicContextById(topic.id) }))
    .filter((item): item is { topic: Topic; context: TopicContext } => Boolean(item.context))
    .filter((item) => item.context.domain.id === domainId)
    .slice(0, limit);
}

export function getFeaturedTopicsForTrack(trackId: string, limit = 4) {
  return topics
    .map((topic) => ({ topic, context: getTopicContextById(topic.id) }))
    .filter((item): item is { topic: Topic; context: TopicContext } => Boolean(item.context))
    .filter((item) => item.context.track.id === trackId)
    .slice(0, limit);
}

export function getTopicParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export function getDomainParams() {
  return domains.map((domain) => ({ domain: domain.slug }));
}

export function getTrackParams() {
  return tracks.map((track) => {
    const domain = domainById.get(track.domainId)!;
    return {
      domain: domain.slug,
      track: track.slug,
    };
  });
}

export function getLevelParams() {
  return levels.map((level) => {
    const track = trackById.get(level.trackId)!;
    const domain = domainById.get(track.domainId)!;
    return {
      domain: domain.slug,
      track: track.slug,
      level: level.slug,
    };
  });
}

export function getCategoryParams() {
  return categories.map((category) => {
    const level = levelById.get(category.levelId)!;
    const track = trackById.get(level.trackId)!;
    const domain = domainById.get(track.domainId)!;
    return {
      domain: domain.slug,
      track: track.slug,
      level: level.slug,
      category: category.slug,
    };
  });
}

export function getSubcategoryParams() {
  return subcategories.map((subcategory) => {
    const category = categoryById.get(subcategory.categoryId)!;
    const level = levelById.get(category.levelId)!;
    const track = trackById.get(level.trackId)!;
    const domain = domainById.get(track.domainId)!;
    return {
      domain: domain.slug,
      track: track.slug,
      level: level.slug,
      category: category.slug,
      subcategory: subcategory.slug,
    };
  });
}

export function getDomainHref(domain: Pick<Domain, "slug"> | string) {
  const slug = typeof domain === "string" ? domain : domain.slug;
  return `/learn/${slug}`;
}

export function getTrackHref(
  domain: Pick<Domain, "slug"> | string,
  track: Pick<Track, "slug"> | string,
) {
  const domainSlug = typeof domain === "string" ? domain : domain.slug;
  const trackSlug = typeof track === "string" ? track : track.slug;
  return `/learn/${domainSlug}/${trackSlug}`;
}

export function getLevelHref(
  domain: Pick<Domain, "slug"> | string,
  track: Pick<Track, "slug"> | string,
  level: Pick<Level, "slug"> | string,
) {
  const domainSlug = typeof domain === "string" ? domain : domain.slug;
  const trackSlug = typeof track === "string" ? track : track.slug;
  const levelSlug = typeof level === "string" ? level : level.slug;
  return `/learn/${domainSlug}/${trackSlug}/${levelSlug}`;
}

export function getCategoryHref(
  domain: Pick<Domain, "slug"> | string,
  track: Pick<Track, "slug"> | string,
  level: Pick<Level, "slug"> | string,
  category: Pick<Category, "slug"> | string,
) {
  const domainSlug = typeof domain === "string" ? domain : domain.slug;
  const trackSlug = typeof track === "string" ? track : track.slug;
  const levelSlug = typeof level === "string" ? level : level.slug;
  const categorySlug = typeof category === "string" ? category : category.slug;
  return `/learn/${domainSlug}/${trackSlug}/${levelSlug}/${categorySlug}`;
}

export function getSubcategoryHref(
  domain: Pick<Domain, "slug"> | string,
  track: Pick<Track, "slug"> | string,
  level: Pick<Level, "slug"> | string,
  category: Pick<Category, "slug"> | string,
  subcategory: Pick<Subcategory, "slug"> | string,
) {
  const domainSlug = typeof domain === "string" ? domain : domain.slug;
  const trackSlug = typeof track === "string" ? track : track.slug;
  const levelSlug = typeof level === "string" ? level : level.slug;
  const categorySlug = typeof category === "string" ? category : category.slug;
  const subcategorySlug = typeof subcategory === "string" ? subcategory : subcategory.slug;
  return `/learn/${domainSlug}/${trackSlug}/${levelSlug}/${categorySlug}/${subcategorySlug}`;
}

export function getTopicHref(topic: Pick<Topic, "slug"> | string) {
  const slug = typeof topic === "string" ? topic : topic.slug;
  return `/topic/${slug}`;
}

export function getTopicDownloadFileName(topic: Topic) {
  return `${topic.slug}.mdx`;
}
