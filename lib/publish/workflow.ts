import { siteConfig } from "@/lib/config/site";
import {
  slugify,
  type UploadDestinationKind,
  type UploadSourceFormat,
  type UploadVisibility,
} from "@/lib/uploads/parser";

export type PublishStage = "draft" | "review" | "scheduled" | "published";
export type PublishContentKind = "topic" | "blog" | "story" | "resource";

export type PublishDraftSeed = {
  title: string;
  slug: string;
  summary: string;
  canonicalBody: string;
  sourceFileName: string;
  sourceFormat: UploadSourceFormat;
  destinationKind: UploadDestinationKind;
  visibility: UploadVisibility;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
  parserWarnings: string[];
  normalizationNotes: string[];
};

export type PublishPacketInput = PublishDraftSeed & {
  tags: string[];
  authorName: string;
  downloadable: boolean;
  stage: PublishStage;
  publishAt?: string;
};

export type PublishPacket = {
  kind: PublishContentKind;
  stage: PublishStage;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  authorName: string;
  visibility: UploadVisibility;
  destinationKind: UploadDestinationKind;
  sourceFormat: UploadSourceFormat;
  sourceFileName: string;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
  downloadable: boolean;
  publishAt?: string;
  canonicalBody: string;
  routePath: string;
  previewUrl: string;
  contentFilePath: string;
  downloadFilePath?: string;
  branchSuggestion: string;
  commitSuggestion: string;
  issueTitle: string;
  parserWarnings: string[];
  normalizationNotes: string[];
};

export type PublishPacketResponse = {
  packet: PublishPacket;
  outputs: {
    canonicalMdxFileName: string;
    canonicalMdx: string;
    manifestFileName: string;
    manifestJson: string;
    releaseNotesFileName: string;
    releaseNotes: string;
  };
};

export function buildPublishPacket(input: PublishPacketInput): PublishPacket {
  const kind = mapDestinationKind(input.destinationKind);
  const title = normalizeText(input.title, "Untitled draft");
  const slug = slugify(input.slug || title);
  const canonicalBody = normalizeCanonicalBody(input.canonicalBody);
  const summary = normalizeSummary(input.summary, canonicalBody);
  const tags = dedupeStrings(input.tags.flatMap((tag) => tag.split(",")));
  const authorName = normalizeText(input.authorName, siteConfig.owner);
  const domain = normalizeText(input.domain, "IT");
  const track = normalizeText(input.track, "job-ready engineer");
  const level = normalizeText(input.level, "Level 1");
  const category = normalizeText(input.category, "Core Computing");
  const subcategory = normalizeText(input.subcategory, "General");
  const publishAt = normalizePublishAt(input.publishAt, input.stage);
  const routePath = buildRoutePath(kind, slug);
  const contentFilePath = buildContentFilePath({
    kind,
    slug,
    domain,
    track,
    level,
    category,
    subcategory,
  });
  const downloadFilePath = input.downloadable
    ? buildDownloadFilePath(kind, slug, input.sourceFormat)
    : undefined;

  return {
    kind,
    stage: input.stage,
    title,
    slug,
    summary,
    tags,
    authorName,
    visibility: input.visibility,
    destinationKind: input.destinationKind,
    sourceFormat: input.sourceFormat,
    sourceFileName: normalizeText(input.sourceFileName, `source.${input.sourceFormat}`),
    domain,
    track,
    level,
    category,
    subcategory,
    downloadable: input.downloadable,
    publishAt,
    canonicalBody,
    routePath,
    previewUrl: buildPreviewUrl(routePath),
    contentFilePath,
    downloadFilePath,
    branchSuggestion: `content/${kind}-${slug}`,
    commitSuggestion: `${input.stage === "published" ? "feat" : "chore"}(content): add ${slug}`,
    issueTitle: `[content] Review ${title}`,
    parserWarnings: dedupeStrings(input.parserWarnings),
    normalizationNotes: dedupeStrings(input.normalizationNotes),
  };
}

export function buildPublishPacketResponse(input: PublishPacketInput): PublishPacketResponse {
  const packet = buildPublishPacket(input);

  return {
    packet,
    outputs: {
      canonicalMdxFileName: `${packet.slug}.mdx`,
      canonicalMdx: buildCanonicalMdx(packet),
      manifestFileName: `${packet.slug}.manifest.json`,
      manifestJson: buildManifestJson(packet),
      releaseNotesFileName: `${packet.slug}.release-notes.md`,
      releaseNotes: buildReleaseNotes(packet),
    },
  };
}

export function buildCanonicalMdx(packet: PublishPacket): string {
  return `---\n${buildFrontmatter(packet)}\n---\n\n${packet.canonicalBody.trim()}\n`;
}

export function buildManifestJson(packet: PublishPacket): string {
  return JSON.stringify(
    {
      title: packet.title,
      slug: packet.slug,
      kind: packet.kind,
      stage: packet.stage,
      visibility: packet.visibility,
      routePath: packet.routePath,
      previewUrl: packet.previewUrl,
      contentFilePath: packet.contentFilePath,
      downloadFilePath: packet.downloadFilePath ?? null,
      sourceFileName: packet.sourceFileName,
      sourceFormat: packet.sourceFormat,
      authorName: packet.authorName,
      domain: packet.domain,
      track: packet.track,
      level: packet.level,
      category: packet.category,
      subcategory: packet.subcategory,
      tags: packet.tags,
      downloadable: packet.downloadable,
      publishAt: packet.publishAt ?? null,
      parserWarnings: packet.parserWarnings,
      normalizationNotes: packet.normalizationNotes,
      branchSuggestion: packet.branchSuggestion,
      commitSuggestion: packet.commitSuggestion,
    },
    null,
    2,
  );
}

export function buildReleaseNotes(packet: PublishPacket): string {
  const parserSection = packet.parserWarnings.length
    ? packet.parserWarnings.map((warning) => `- ${warning}`).join("\n")
    : "- No parser warnings were carried into this publish packet.";

  const notesSection = packet.normalizationNotes.length
    ? packet.normalizationNotes.map((note) => `- ${note}`).join("\n")
    : "- No extra normalization notes were carried into this packet.";

  return [
    `# Publish notes — ${packet.title}`,
    "",
    `- Stage: **${packet.stage}**`,
    `- Kind: **${packet.kind}**`,
    `- Visibility: **${packet.visibility}**`,
    `- Route: **${packet.routePath}**`,
    packet.publishAt ? `- Publish at: **${packet.publishAt}**` : "- Publish at: **not set**",
    "",
    "## Git plan",
    "",
    `- Branch: \`${packet.branchSuggestion}\``,
    `- Commit: \`${packet.commitSuggestion}\``,
    `- Issue title: \`${packet.issueTitle}\``,
    "",
    "## Files",
    "",
    `- Canonical MDX: \`${packet.contentFilePath}\``,
    packet.downloadFilePath
      ? `- Download asset: \`${packet.downloadFilePath}\``
      : "- Download asset: not attached in this packet.",
    "",
    "## Parser warnings",
    "",
    parserSection,
    "",
    "## Normalization notes",
    "",
    notesSection,
    "",
    "## Merge checklist",
    "",
    `- [ ] Review summary, title, and slug for \`${packet.slug}\``,
    `- [ ] Verify route path \`${packet.routePath}\` in dark mode and light mode`,
    "- [ ] Link the GitHub issue or email thread before merge.",
    packet.downloadFilePath
      ? `- [ ] Attach the original file at \`${packet.downloadFilePath}\``
      : "- [ ] No download asset is expected for this packet.",
  ].join("\n");
}

function buildFrontmatter(packet: PublishPacket): string {
  const rows: string[] = [
    `title: ${quoteYaml(packet.title)}`,
    `slug: ${quoteYaml(packet.slug)}`,
    `summary: ${quoteYaml(packet.summary)}`,
    `kind: ${quoteYaml(packet.kind)}`,
    `visibility: ${quoteYaml(packet.visibility)}`,
    `sourceType: ${quoteYaml(packet.sourceFormat)}`,
    `authorName: ${quoteYaml(packet.authorName)}`,
    `downloadable: ${packet.downloadable ? "true" : "false"}`,
    `domain: ${quoteYaml(packet.domain)}`,
    `track: ${quoteYaml(packet.track)}`,
    `level: ${quoteYaml(packet.level)}`,
    `category: ${quoteYaml(packet.category)}`,
    `subcategory: ${quoteYaml(packet.subcategory)}`,
    `stage: ${quoteYaml(packet.stage)}`,
    `sourceFileName: ${quoteYaml(packet.sourceFileName)}`,
    `routePath: ${quoteYaml(packet.routePath)}`,
  ];

  if (packet.publishAt) {
    rows.push(`publishedAt: ${quoteYaml(packet.publishAt)}`);
  }

  if (packet.tags.length > 0) {
    rows.push("tags:");
    packet.tags.forEach((tag) => rows.push(`  - ${quoteYaml(tag)}`));
  }

  return rows.join("\n");
}

function mapDestinationKind(value: UploadDestinationKind): PublishContentKind {
  if (value === "blog") {
    return "blog";
  }

  if (value === "story") {
    return "story";
  }

  if (value === "reference") {
    return "resource";
  }

  return "topic";
}

function buildRoutePath(kind: PublishContentKind, slug: string): string {
  if (kind === "blog") {
    return `/blog/${slug}`;
  }

  if (kind === "story") {
    return `/stories/${slug}`;
  }

  return `/topic/${slug}`;
}

function buildContentFilePath(input: {
  kind: PublishContentKind;
  slug: string;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
}): string {
  const { category, domain, kind, level, slug, subcategory, track } = input;

  if (kind === "blog") {
    return `content/blog/${slug}.mdx`;
  }

  if (kind === "story") {
    return `content/stories/${slugify(domain)}/${slug}.mdx`;
  }

  if (kind === "resource") {
    return `content/resources/${slugify(domain)}/${slugify(category)}/${slug}.mdx`;
  }

  return `content/learn/${slugify(domain)}/${slugify(track)}/${slugify(level)}/${slugify(category)}/${slugify(subcategory)}/${slug}.mdx`;
}

function buildDownloadFilePath(kind: PublishContentKind, slug: string, sourceFormat: UploadSourceFormat): string {
  const bucket = kind === "topic" ? "learn" : kind === "blog" ? "blog" : kind === "story" ? "stories" : "resources";
  return `public/downloads/${bucket}/${slug}.${sourceFormat}`;
}

function buildPreviewUrl(routePath: string): string {
  try {
    return new URL(routePath, siteConfig.baseUrl).toString();
  } catch {
    return routePath;
  }
}

function normalizeText(value: string | undefined, fallback: string): string {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : fallback;
}

function normalizeCanonicalBody(value: string | undefined): string {
  const normalized = String(value ?? "").trim();
  if (normalized.length > 0) {
    return normalized;
  }

  return ["## Overview", "", "Add the final canonical MDX body here before publish."].join("\n");
}

function normalizeSummary(value: string | undefined, body: string): string {
  const normalized = String(value ?? "").trim();
  if (normalized.length > 0) {
    return normalized;
  }

  const collapsed = body
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!collapsed) {
    return "Draft summary pending editorial review.";
  }

  return collapsed.length > 180 ? `${collapsed.slice(0, 179).trimEnd()}…` : collapsed;
}

function normalizePublishAt(value: string | undefined, stage: PublishStage): string | undefined {
  const normalized = String(value ?? "").trim();
  if (normalized.length > 0) {
    return normalized;
  }

  if (stage === "published") {
    return new Date().toISOString().slice(0, 10);
  }

  return undefined;
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  values.forEach((value) => {
    const normalized = String(value).trim();
    if (!normalized) {
      return;
    }

    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    result.push(normalized);
  });

  return result;
}

function quoteYaml(value: string): string {
  return JSON.stringify(value);
}
