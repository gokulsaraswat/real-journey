export type TopicStatus = "planned" | "ready" | "draft" | "published";

export type TopicLevel =
  | "foundation"
  | "engineer"
  | "advanced-engineer"
  | "architect"
  | "leader-cto";

export type TopicDomain =
  | "IT"
  | "AI"
  | "Cybersecurity"
  | "Data"
  | "DevOps"
  | "Platform"
  | "Product"
  | "Leadership"
  | "Personal";

export type TopicTrack =
  | "software-engineering-core"
  | "backend-distributed-systems"
  | "cloud-devops-platform"
  | "data-ai-analytics"
  | "security-reliability-quality"
  | "product-business-leadership-cto";

export type TopicCatalogTopic = {
  number: number;
  title: string;
  slug: string;
  sectionCode: string;
  sectionTitle: string;
  rangeLabel?: string;
  domain: TopicDomain;
  track: TopicTrack;
  level: TopicLevel;
  status: TopicStatus;
};

export type TopicCatalogSection = {
  code: string;
  title: string;
  rangeLabel?: string;
  rangeStart?: number;
  rangeEnd?: number;
  topics: TopicCatalogTopic[];
};

export type TopicCatalogSummary = {
  totalSections: number;
  totalTopics: number;
  byDomain: Record<TopicDomain, number>;
  byTrack: Record<TopicTrack, number>;
  byLevel: Record<TopicLevel, number>;
  byStatus: Record<TopicStatus, number>;
};

const emptyDomainCount = (): Record<TopicDomain, number> => ({
  IT: 0,
  AI: 0,
  Cybersecurity: 0,
  Data: 0,
  DevOps: 0,
  Platform: 0,
  Product: 0,
  Leadership: 0,
  Personal: 0,
});

const emptyTrackCount = (): Record<TopicTrack, number> => ({
  "software-engineering-core": 0,
  "backend-distributed-systems": 0,
  "cloud-devops-platform": 0,
  "data-ai-analytics": 0,
  "security-reliability-quality": 0,
  "product-business-leadership-cto": 0,
});

const emptyLevelCount = (): Record<TopicLevel, number> => ({
  foundation: 0,
  engineer: 0,
  "advanced-engineer": 0,
  architect: 0,
  "leader-cto": 0,
});

const emptyStatusCount = (): Record<TopicStatus, number> => ({
  planned: 0,
  ready: 0,
  draft: 0,
  published: 0,
});

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function slugify(value: string) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function normalizeSectionTitle(value: string) {
  return value.replace(/^#+\s*/, "").replace(/^Section\s+[A-Z]+\s+[—-]\s+/i, "").trim();
}

function inferTrack(title: string): TopicTrack {
  const lower = title.toLowerCase();

  if (
    /(ai|ml|genai|llm|data engineering|analytics|lakehouse|feature store|mcp|rag|vector|embedding)/.test(lower)
  ) {
    return "data-ai-analytics";
  }

  if (
    /(security|owasp|oauth|oidc|jwt|tls|pki|compliance|privacy|sbom|slsa|policy|secure|risk)/.test(lower)
  ) {
    return "security-reliability-quality";
  }

  if (
    /(devops|ci\/cd|jenkins|github actions|docker|kubernetes|platform|gitops|helm|terraform|cluster|observability|sre)/.test(
      lower,
    )
  ) {
    return "cloud-devops-platform";
  }

  if (
    /(product|business|pricing|billing|leadership|manager|cto|strategy|roadmap|portfolio|org|stakeholder|board|vendor)/.test(
      lower,
    )
  ) {
    return "product-business-leadership-cto";
  }

  if (
    /(distributed|architecture|backend|api|microservice|grpc|graphql|database|cache|messaging|stream|event|reliability|performance|network|system)/.test(
      lower,
    )
  ) {
    return "backend-distributed-systems";
  }

  return "software-engineering-core";
}

function inferDomain(title: string, track: TopicTrack): TopicDomain {
  const lower = title.toLowerCase();

  if (/(cyber|security|owasp|oauth|jwt|tls|pki|compliance|privacy|vulnerability|threat)/.test(lower)) {
    return "Cybersecurity";
  }

  if (/(ai|ml|genai|llm|embedding|vector|rag|feature|model|neural|prompt|multimodal)/.test(lower)) {
    return "AI";
  }

  if (/(data engineering|etl|elt|warehouse|lakehouse|analytics|dbt|spark|airflow|schema|cdc|data mesh)/.test(lower)) {
    return "Data";
  }

  if (/(devops|ci\/cd|release|docker|kubernetes|helm|github actions|jenkins|iac|terraform)/.test(lower)) {
    return "DevOps";
  }

  if (/(platform|service mesh|cluster|gitops|operator|cloud-native|kubernetes control plane)/.test(lower)) {
    return "Platform";
  }

  if (/(product|pricing|billing|growth|marketplace|customer|revenue|design|ux|portfolio|saas)/.test(lower)) {
    return "Product";
  }

  if (/(leadership|manager|cto|strategy|org|hiring|mentoring|board|executive|budget|vendor)/.test(lower)) {
    return "Leadership";
  }

  if (track === "data-ai-analytics") {
    return "AI";
  }

  if (track === "cloud-devops-platform") {
    return "DevOps";
  }

  if (track === "product-business-leadership-cto") {
    return "Leadership";
  }

  return "IT";
}

function inferLevel(number: number): TopicLevel {
  if (number <= 220) {
    return "foundation";
  }

  if (number <= 450) {
    return "engineer";
  }

  if (number <= 700) {
    return "advanced-engineer";
  }

  if (number <= 875) {
    return "architect";
  }

  return "leader-cto";
}

function inferStatus(number: number): TopicStatus {
  if (number <= 25) {
    return "published";
  }

  if (number <= 75) {
    return "draft";
  }

  if (number <= 125) {
    return "ready";
  }

  return "planned";
}

function parseRangeLabel(rangeLabel?: string) {
  if (!rangeLabel) {
    return {};
  }

  const match = rangeLabel.match(/(\d+)\s*[–-]\s*(\d+)/);

  if (!match) {
    return {};
  }

  return {
    rangeStart: Number(match[1]),
    rangeEnd: Number(match[2]),
  };
}

function parseSectionHeading(line: string) {
  const sectionMatch = line.match(/^#+\s*Section\s+([A-Z]+)\s+[—-]\s+(.+?)(?:\s*\((\d+\s*[–-]\s*\d+)\))?\s*$/i);

  if (!sectionMatch) {
    return null;
  }

  const code = sectionMatch[1].toUpperCase();
  const title = normalizeSectionTitle(sectionMatch[2]);
  const rangeLabel = sectionMatch[3]?.replace(/\s+/g, "");

  return {
    code,
    title,
    rangeLabel,
    ...parseRangeLabel(rangeLabel),
  };
}

function parseLooseSectionHeading(line: string) {
  const sectionMatch = line.match(/^Section\s+([A-Z]+)\s+[—-]\s+(.+?)(?:\s*\((\d+\s*[–-]\s*\d+)\))?\s*$/i);

  if (!sectionMatch) {
    return null;
  }

  const code = sectionMatch[1].toUpperCase();
  const title = normalizeSectionTitle(sectionMatch[2]);
  const rangeLabel = sectionMatch[3]?.replace(/\s+/g, "");

  return {
    code,
    title,
    rangeLabel,
    ...parseRangeLabel(rangeLabel),
  };
}

function createFallbackSection(): TopicCatalogSection {
  return {
    code: "ROOT",
    title: "Imported topics",
    topics: [],
  };
}

export function parseTopicCatalogSource(source: string): TopicCatalogSection[] {
  const lines = source.split(/\r?\n/).map((line) => line.trim());
  const sections: TopicCatalogSection[] = [];
  let currentSection: TopicCatalogSection | null = null;

  for (const line of lines) {
    if (!line) {
      continue;
    }

    const explicitSection = parseSectionHeading(line) ?? parseLooseSectionHeading(line);

    if (explicitSection) {
      currentSection = {
        code: explicitSection.code,
        title: explicitSection.title,
        rangeLabel: explicitSection.rangeLabel,
        rangeStart: explicitSection.rangeStart,
        rangeEnd: explicitSection.rangeEnd,
        topics: [],
      };
      sections.push(currentSection);
      continue;
    }

    const topicMatch = line.match(/^(\d+)\.\s+(.+)$/);

    if (!topicMatch) {
      continue;
    }

    if (!currentSection) {
      currentSection = createFallbackSection();
      sections.push(currentSection);
    }

    const number = Number(topicMatch[1]);
    const title = normalizeWhitespace(topicMatch[2]);
    const track = inferTrack(`${currentSection.title} ${title}`);
    const domain = inferDomain(`${currentSection.title} ${title}`, track);

    currentSection.topics.push({
      number,
      title,
      slug: slugify(title),
      sectionCode: currentSection.code,
      sectionTitle: currentSection.title,
      rangeLabel: currentSection.rangeLabel,
      domain,
      track,
      level: inferLevel(number),
      status: inferStatus(number),
    });
  }

  return sections.filter((section) => section.topics.length > 0);
}

export function buildTopicCatalogSummary(sections: TopicCatalogSection[]): TopicCatalogSummary {
  const summary: TopicCatalogSummary = {
    totalSections: sections.length,
    totalTopics: 0,
    byDomain: emptyDomainCount(),
    byTrack: emptyTrackCount(),
    byLevel: emptyLevelCount(),
    byStatus: emptyStatusCount(),
  };

  for (const section of sections) {
    for (const topic of section.topics) {
      summary.totalTopics += 1;
      summary.byDomain[topic.domain] += 1;
      summary.byTrack[topic.track] += 1;
      summary.byLevel[topic.level] += 1;
      summary.byStatus[topic.status] += 1;
    }
  }

  return summary;
}

export function flattenTopics(sections: TopicCatalogSection[]) {
  return sections.flatMap((section) => section.topics);
}

export function createTopicUploadTemplate(topic: TopicCatalogTopic) {
  return `---\ntitle: ${topic.title}\nslug: ${topic.slug}\ndomain: ${topic.domain}\ntrack: ${topic.track}\nlevel: ${topic.level}\nsection: ${topic.sectionCode} - ${topic.sectionTitle}\nstatus: draft\nvisibility: public\nsummary: Add a 2-3 line summary for ${topic.title}.\ntags:\n  - ${topic.domain.toLowerCase()}\n  - ${topic.sectionCode.toLowerCase()}\nestimated_read_time: 12\nsource_file_type: mdx\n---\n\n## Why this topic matters\n\nDescribe why ${topic.title} matters in the Real Journey path.\n\n## Core concepts\n\n- Concept 1\n- Concept 2\n- Concept 3\n\n## Deep dive\n\nAdd the actual learning content here.\n\n## Checklist\n\n- [ ] Fundamentals covered\n- [ ] Practical example added\n- [ ] References reviewed\n`;
}
