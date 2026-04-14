export const heroStats = [
  {
    value: "500+",
    label: "topic-ready architecture",
    note: "Built around taxonomy instead of hardcoded pages so new sectors can grow without redesigning the shell.",
  },
  {
    value: "2",
    label: "reader modes planned",
    note: "Docs mode and ebook mode will sit on top of the same normalized content model later.",
  },
  {
    value: "Mixed",
    label: "story visibility",
    note: "Public stories and private resources stay separate while still sharing one strong reading experience.",
  },
] as const;

export const heroPills = [
  "IT",
  "AI",
  "Cyber Security",
  "Portfolio",
  "Reader-first",
  "Download + read",
] as const;

export const heroLabels = [
  {
    label: "Primary mode",
    value: "Portfolio-led homepage with a deeper learning platform underneath.",
  },
  {
    label: "Contribution model",
    value: "Feedback via GitHub and email, with Git-based pull requests later.",
  },
  {
    label: "Content ingestion",
    value: "Markdown-first publishing with uploads from PDF, DOCX, TXT, HTML, and more.",
  },
  {
    label: "Scaling rule",
    value: "Main chat keeps contracts stable. Feature chats stay isolated and merge back by summary.",
  },
] as const;

export const resumeSnapshot = [
  {
    title: "Identity",
    summary: "Gokul Saraswat — Engineer, building a serious long-form learning system around clear engineering progression.",
  },
  {
    title: "Focus",
    summary: "Systems thinking, structured technical learning, writing, and practical knowledge architecture for engineers.",
  },
  {
    title: "Platform intent",
    summary: "A place where someone can arrive at any stage — student, senior, architect, manager, or founder — and keep moving forward.",
  },
] as const;

export const portfolioPillars = [
  {
    title: "Systems-first thinking",
    badge: "Architecture",
    summary:
      "The platform is not page-first. It is model-first, route-safe, and designed so the information hierarchy remains stable as the project scales.",
  },
  {
    title: "Learning through depth",
    badge: "Reader experience",
    summary:
      "Topics are meant to feel worth studying, not just skimming. The app is being shaped for long-form reading, downloadable resources, and layered paths.",
  },
  {
    title: "Portfolio with proof",
    badge: "Personal brand",
    summary:
      "The homepage acts as an identity surface for your work while still directing people into technical writing, curated resources, and structured growth paths.",
  },
] as const;

export const featuredDomains = [
  {
    title: "IT",
    badge: "Foundations to architecture",
    summary:
      "Core computing, HTTP, operating systems, backend depth, networking, cloud basics, and production engineering fundamentals.",
    topics: ["Core computing", "HTTP deep dive", "System design"],
  },
  {
    title: "AI",
    badge: "Build and ship",
    summary:
      "Applied AI, model evaluation, prompt systems, agent workflows, tooling, deployment, and platform-level thinking for real products.",
    topics: ["LLM workflows", "Evaluation", "Serving"],
  },
  {
    title: "Cyber Security",
    badge: "Hands-on to strategic",
    summary:
      "Security foundations, application security, cloud defense, detection and response, and decision-making at scale.",
    topics: ["AppSec", "Cloud defense", "Incident response"],
  },
] as const;

export const platformPrinciples = [
  {
    kicker: "Architecture",
    title: "Stable shell first",
    summary:
      "The project begins with contracts, routing, and theme discipline so later branches can move faster with less merge chaos.",
  },
  {
    kicker: "Content",
    title: "One model, many formats",
    summary:
      "Published pages should remain clean even when the original source comes from markdown, PDF, DOCX, HTML, or raw text uploads.",
  },
  {
    kicker: "Growth",
    title: "Expand beyond engineering later",
    summary:
      "The taxonomy should be reusable when you eventually add medical, business, or other structured learning domains.",
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
  { title: "Level", summary: "Level 1" },
  { title: "Category", summary: "core computing" },
  { title: "Subcategory", summary: "networking fundamentals" },
  { title: "Topic", summary: "HTTP deep dive" },
] as const;

export const trackExamples = [
  {
    kicker: "Student to job",
    title: "Foundation tracks",
    summary: "Paths that help learners move from basics into employable engineering depth without losing the bigger map.",
  },
  {
    kicker: "Senior growth",
    title: "Deeper specialization",
    summary: "Routes for engineers who want to go from doing the work to understanding systems, tradeoffs, and architecture.",
  },
  {
    kicker: "Leadership",
    title: "Manager to founder thinking",
    summary: "Long-form pathways that open up product, execution, hiring, organizational design, and technical leadership views.",
  },
] as const;

export const readerModeCards = [
  {
    eyebrow: "Reader mode",
    title: "Dual reading experience",
    summary:
      "The same content should later render as an ebook-style focused reader and as a docs-style study page with structure and utility.",
    supportingNote: "Both modes should share one content source so admin workflows stay clean and future updates remain manageable.",
  },
  {
    eyebrow: "File access",
    title: "Download plus read",
    summary:
      "Published content can coexist with downloadable source files so learners can read online while still keeping the original reference material.",
    supportingNote: "This works especially well for notes, guides, certifications, interview prep, and long curated technical resources.",
  },
  {
    eyebrow: "Stories",
    title: "Personal and technical",
    summary:
      "Personal stories can hold certifications, interview preparation, code snippets, and curated documents under separate visibility rules.",
    supportingNote: "Public collections and private archives should feel related in UX but remain clearly separated in access control.",
  },
] as const;

export const previewBlogs = [
  {
    category: "Architecture",
    title: "How to design a learning platform that stays clean after 500 topics",
    summary: "A future blog slot for the thinking behind taxonomy, navigation, and keeping content systems readable at scale.",
    readTime: "8 min",
    status: "Preview card only — full blog branch comes next.",
  },
  {
    category: "Workflow",
    title: "Using ChatGPT branches like feature branches in a real product build",
    summary: "A future writing lane for your multi-chat workflow: main chat for contracts, side chats for isolated implementation.",
    readTime: "6 min",
    status: "Preview card only — no blog route coupling in this patch.",
  },
  {
    category: "Systems",
    title: "Why reader-first product design changes how technical content should be stored",
    summary: "A future article about structuring content once and rendering it across docs, ebook, blog, and downloadable assets.",
    readTime: "7 min",
    status: "Preview card only — branch-safe homepage teaser.",
  },
] as const;

export const storyCollections = [
  {
    title: "Certification prep",
    visibility: "Mixed visibility",
    summary: "Curated resources for exam preparation, structured notes, and study packs that may be public or private depending on the folder.",
    examples: ["Java 17", "Cloud certs", "Study notes"],
  },
  {
    title: "Interview archives",
    visibility: "Private-friendly",
    summary: "Company-specific prep collections, reflections, private notes, and downloadable supporting files kept separate from public learning pages.",
    examples: ["Google", "System design", "Behavioral prep"],
  },
  {
    title: "Code and experiments",
    visibility: "Public or private",
    summary: "A place for snippets, working notes, and practical code artifacts that support your stories and technical learning journey.",
    examples: ["Snippets", "Walkthroughs", "Practice repos"],
  },
] as const;

export const workflowSteps = [
  {
    stage: "Main chat",
    title: "Own the contracts",
    summary:
      "Keep architecture, route rules, content models, design language, and merge policy in one calm place so every future branch has a stable target.",
  },
  {
    stage: "Feature chat",
    title: "Ship one thing only",
    summary:
      "Homepage, blog, reader, uploads, and admin work should live in separate chats or branches to avoid bloated prompts and unstable changes.",
  },
  {
    stage: "Return to main",
    title: "Merge by summary",
    summary:
      "Bring back branch name, files changed, what is done, and blockers instead of pasting the full code into the main conversation.",
  },
  {
    stage: "Scale later",
    title: "Add new sectors safely",
    summary:
      "Because the taxonomy and shell are shared, new sectors can arrive later without rewriting the homepage or content hierarchy from scratch.",
  },
] as const;
