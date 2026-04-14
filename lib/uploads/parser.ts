export const supportedUploadFormats = ["md", "mdx", "txt", "html", "pdf", "docx"] as const;
export const textUploadFormats = ["md", "mdx", "txt", "html"] as const;
export const binaryUploadFormats = ["pdf", "docx"] as const;
export const analyzableUploadFormats = [...supportedUploadFormats] as const;

export type UploadSourceFormat = (typeof supportedUploadFormats)[number];
export type TextUploadFormat = (typeof textUploadFormats)[number];
export type BinaryUploadFormat = (typeof binaryUploadFormats)[number];
export type AnalyzableUploadFormat = (typeof analyzableUploadFormats)[number];
export type UploadVisibility = "public" | "private" | "mixed";
export type UploadDestinationKind = "guide" | "blog" | "story" | "reference";

export type UploadHeading = {
  level: number;
  text: string;
  anchor: string;
};

export type UploadDraftInput = {
  destinationKind: UploadDestinationKind;
  visibility: UploadVisibility;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
};

export type UploadAnalysis = {
  fileName: string;
  sourceFormat: UploadSourceFormat;
  mimeType: string;
  fileBytes: number;
  title: string;
  slug: string;
  summary: string;
  bodyPreview: string;
  wordCount: number;
  estimatedReadTime: number;
  headings: UploadHeading[];
  frontmatter: Record<string, string>;
  destinationPath: string;
  destinationKind: UploadDestinationKind;
  visibility: UploadVisibility;
  suggestedCanonicalFormat: "mdx";
  normalizationNotes: string[];
  parserEngine?: string;
  parserWarnings: string[];
};

type BuildUploadAnalysisOptions = {
  fileName: string;
  sourceFormat: UploadSourceFormat;
  mimeType: string;
  fileBytes: number;
  titleCandidate: string;
  summaryCandidate?: string;
  plainText: string;
  headings: UploadHeading[];
  frontmatter: Record<string, string>;
  draft: UploadDraftInput;
  normalizationNotes: string[];
  parserEngine?: string;
  parserWarnings?: string[];
};

const defaultDraft: UploadDraftInput = {
  destinationKind: "guide",
  visibility: "public",
  domain: "IT",
  track: "job-ready engineer",
  level: "Level 1",
  category: "Core Computing",
  subcategory: "HTTP Deep Dive",
};

export function extractFileExtension(fileName: string): UploadSourceFormat | null {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) {
    return null;
  }

  return supportedUploadFormats.find((format) => format === extension) ?? null;
}

export function isAnalyzableFormat(format: UploadSourceFormat): format is AnalyzableUploadFormat {
  return analyzableUploadFormats.includes(format as AnalyzableUploadFormat);
}

export function isTextUploadFormat(format: UploadSourceFormat): format is TextUploadFormat {
  return textUploadFormats.includes(format as TextUploadFormat);
}

export function isBinaryUploadFormat(format: UploadSourceFormat): format is BinaryUploadFormat {
  return binaryUploadFormats.includes(format as BinaryUploadFormat);
}

export function normalizeDraftInput(
  input: Partial<Record<keyof UploadDraftInput, string | undefined>>,
): UploadDraftInput {
  const destinationKind = normalizeDestinationKind(input.destinationKind);
  const visibility = normalizeVisibility(input.visibility);

  return {
    destinationKind,
    visibility,
    domain: normalizeText(input.domain, defaultDraft.domain),
    track: normalizeText(input.track, defaultDraft.track),
    level: normalizeText(input.level, defaultDraft.level),
    category: normalizeText(input.category, defaultDraft.category),
    subcategory: normalizeText(input.subcategory, defaultDraft.subcategory),
  };
}

export function analyzeTextUpload(options: {
  fileName: string;
  sourceFormat: TextUploadFormat;
  mimeType: string;
  fileBytes: number;
  content: string;
  draft: UploadDraftInput;
}): UploadAnalysis {
  const { content, draft, fileName, fileBytes, mimeType, sourceFormat } = options;
  const fileBaseName = fileName.replace(/\.[^.]+$/, "");

  const { frontmatter, body } =
    sourceFormat === "md" || sourceFormat === "mdx"
      ? parseFrontmatter(content)
      : { frontmatter: {} as Record<string, string>, body: content };

  const htmlTitle = sourceFormat === "html" ? extractHtmlTitle(body) : "";
  const htmlDescription = sourceFormat === "html" ? extractHtmlMetaDescription(body) : "";

  const titleCandidate =
    frontmatter.title ??
    (htmlTitle ||
      extractMarkdownTitle(body) ||
      extractFirstMeaningfulLine(body) ||
      prettifyFileBaseName(fileBaseName));

  const plainText = sourceFormat === "html" ? htmlToText(body) : markdownLikeToText(body);

  const headings =
    sourceFormat === "html"
      ? extractHtmlHeadings(body)
      : sourceFormat === "txt"
        ? extractTextHeadings(body)
        : extractMarkdownHeadings(body);

  return buildUploadAnalysis({
    fileName,
    sourceFormat,
    mimeType,
    fileBytes,
    titleCandidate,
    summaryCandidate:
      frontmatter.summary ?? frontmatter.description ?? (htmlDescription || undefined),
    plainText,
    headings,
    frontmatter,
    draft,
    normalizationNotes: buildTextNormalizationNotes({
      frontmatter,
      headings,
      sourceFormat,
      title: titleCandidate,
    }),
    parserWarnings: [],
  });
}

export function analyzeExtractedUpload(options: {
  fileName: string;
  sourceFormat: BinaryUploadFormat;
  mimeType: string;
  fileBytes: number;
  extractedText: string;
  extractedHtml?: string;
  detectedTitle?: string;
  detectedSummary?: string;
  draft: UploadDraftInput;
  parserEngine: string;
  parserWarnings?: string[];
  pageCount?: number;
  extraNormalizationNotes?: string[];
}): UploadAnalysis {
  const {
    detectedSummary,
    detectedTitle,
    draft,
    extractedHtml,
    extractedText,
    extraNormalizationNotes = [],
    fileBytes,
    fileName,
    mimeType,
    pageCount,
    parserEngine,
    parserWarnings = [],
    sourceFormat,
  } = options;

  const fileBaseName = fileName.replace(/\.[^.]+$/, "");
  const titleCandidate =
    detectedTitle || extractFirstMeaningfulLine(extractedText) || prettifyFileBaseName(fileBaseName);
  const headings = extractedHtml ? extractHtmlHeadings(extractedHtml) : extractTextHeadings(extractedText);

  return buildUploadAnalysis({
    fileName,
    sourceFormat,
    mimeType,
    fileBytes,
    titleCandidate,
    summaryCandidate: detectedSummary,
    plainText: extractedText,
    headings,
    frontmatter: {},
    draft,
    normalizationNotes: buildBinaryNormalizationNotes({
      sourceFormat,
      title: titleCandidate,
      headings,
      extractedText,
      pageCount,
      extraNormalizationNotes,
    }),
    parserEngine,
    parserWarnings,
  });
}

function buildUploadAnalysis(options: BuildUploadAnalysisOptions): UploadAnalysis {
  const {
    draft,
    fileBytes,
    fileName,
    frontmatter,
    headings,
    mimeType,
    normalizationNotes,
    parserEngine,
    parserWarnings = [],
    plainText,
    sourceFormat,
    summaryCandidate,
    titleCandidate,
  } = options;

  const fileBaseName = fileName.replace(/\.[^.]+$/, "");
  const cleanedTitle = cleanCandidateText(titleCandidate) || prettifyFileBaseName(fileBaseName);
  const collapsedPlainText = collapseWhitespace(plainText);
  const bodyPreview = collapsedPlainText
    ? truncate(collapsedPlainText, 950)
    : "No readable text extracted yet.";
  const summary =
    cleanCandidateText(summaryCandidate) ||
    (collapsedPlainText ? truncate(collapsedPlainText, 180) : "No readable text extracted yet.");
  const wordCount = countWords(collapsedPlainText);
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 220));
  const slug = slugify(frontmatter.slug ?? cleanedTitle);

  return {
    fileName,
    sourceFormat,
    mimeType,
    fileBytes,
    title: cleanedTitle,
    slug,
    summary,
    bodyPreview,
    wordCount,
    estimatedReadTime,
    headings,
    frontmatter,
    destinationPath: buildDestinationPath(draft),
    destinationKind: draft.destinationKind,
    visibility: draft.visibility,
    suggestedCanonicalFormat: "mdx",
    normalizationNotes: dedupeStrings(normalizationNotes),
    parserEngine,
    parserWarnings: dedupeStrings(parserWarnings),
  };
}

function buildDestinationPath(draft: UploadDraftInput): string {
  return [draft.domain, draft.track, draft.level, draft.category, draft.subcategory]
    .map((segment) => normalizePathSegment(segment))
    .filter(Boolean)
    .join(" / ");
}

function normalizeDestinationKind(input?: string): UploadDestinationKind {
  if (input === "blog" || input === "story" || input === "reference") {
    return input;
  }

  return "guide";
}

function normalizeVisibility(input?: string): UploadVisibility {
  if (input === "private" || input === "mixed") {
    return input;
  }

  return "public";
}

function normalizeText(value: string | undefined, fallback: string): string {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : fallback;
}

function normalizePathSegment(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const block = match[1];
  const frontmatter: Record<string, string> = {};

  for (const line of block.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      frontmatter[key] = value;
    }
  }

  return {
    frontmatter,
    body: content.slice(match[0].length),
  };
}

function extractMarkdownTitle(content: string): string {
  const headingMatch = content.match(/^#\s+(.+)$/m);
  return headingMatch ? collapseWhitespace(stripInlineMarkdown(headingMatch[1])) : "";
}

function extractFirstMeaningfulLine(content: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => cleanCandidateText(stripHtmlTags(line)))
    .filter(Boolean);

  return lines[0] ?? "";
}

function extractMarkdownHeadings(content: string): UploadHeading[] {
  const headings: UploadHeading[] = [];
  const regex = /^(#{1,6})\s+(.+)$/gm;

  for (const match of content.matchAll(regex)) {
    const level = match[1].length;
    const text = cleanCandidateText(match[2]);

    if (!text) {
      continue;
    }

    headings.push({
      level,
      text,
      anchor: slugify(text),
    });
  }

  return dedupeHeadings(headings);
}

function extractTextHeadings(content: string): UploadHeading[] {
  const headings: UploadHeading[] = [];

  for (const line of content.split(/\r?\n/)) {
    const trimmed = cleanCandidateText(line);

    if (!trimmed || trimmed.length > 80) {
      continue;
    }

    if (trimmed.endsWith(":") || /^[A-Z][A-Za-z0-9\s/&()-]{2,}$/.test(trimmed)) {
      const text = trimmed.replace(/:+$/, "");
      headings.push({
        level: 2,
        text,
        anchor: slugify(text),
      });
    }
  }

  return dedupeHeadings(headings).slice(0, 8);
}

function extractHtmlHeadings(content: string): UploadHeading[] {
  const headings: UploadHeading[] = [];
  const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;

  for (const match of content.matchAll(regex)) {
    const level = Number(match[1]);
    const text = cleanCandidateText(decodeHtmlEntities(stripHtmlTags(match[2])));

    if (!text) {
      continue;
    }

    headings.push({
      level,
      text,
      anchor: slugify(text),
    });
  }

  return dedupeHeadings(headings);
}

function extractHtmlTitle(content: string): string {
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const raw = titleMatch?.[1] ?? h1Match?.[1] ?? "";
  return cleanCandidateText(decodeHtmlEntities(stripHtmlTags(raw)));
}

function extractHtmlMetaDescription(content: string): string {
  const metaMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["'][^>]*>/i);
  if (!metaMatch) {
    return "";
  }

  return cleanCandidateText(decodeHtmlEntities(metaMatch[1]));
}

function htmlToText(content: string): string {
  const withoutScripts = content
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  return cleanCandidateText(decodeHtmlEntities(stripHtmlTags(withoutScripts)));
}

function markdownLikeToText(content: string): string {
  return cleanCandidateText(
    stripInlineMarkdown(
      content
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/^>\s?/gm, "")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/<[^>]+>/g, " "),
    ),
  );
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/[*_~]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/`/g, "")
    .replace(/&nbsp;/gi, " ");
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ");
}

function prettifyFileBaseName(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function cleanCandidateText(value: string | undefined): string {
  if (!value) {
    return "";
  }

  return collapseWhitespace(
    stripInlineMarkdown(
      decodeHtmlEntities(value.replace(/\u0000/g, " ")),
    ),
  );
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function countWords(value: string): number {
  const trimmed = collapseWhitespace(value);
  if (!trimmed) {
    return 0;
  }

  return trimmed.split(" ").length;
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function dedupeHeadings(headings: UploadHeading[]): UploadHeading[] {
  const seen = new Set<string>();
  const deduped: UploadHeading[] = [];

  for (const heading of headings) {
    const key = `${heading.level}:${heading.text.toLowerCase()}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(heading);
  }

  return deduped.slice(0, 12);
}

function dedupeStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = collapseWhitespace(value);

    if (!normalized) {
      continue;
    }

    const key = normalized.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(normalized);
  }

  return result;
}

function buildTextNormalizationNotes(options: {
  sourceFormat: TextUploadFormat;
  frontmatter: Record<string, string>;
  headings: UploadHeading[];
  title: string;
}): string[] {
  const { frontmatter, headings, sourceFormat, title } = options;
  const notes: string[] = [];

  if (!frontmatter.title) {
    notes.push(`Add an explicit title in frontmatter so "${title}" stays stable after edits.`);
  }

  if (!frontmatter.summary && !frontmatter.description) {
    notes.push("Add a summary field for stronger cards, SEO, and reader previews.");
  }

  if (headings.length === 0) {
    notes.push("Add section headings so the reader can build a table of contents.");
  }

  if (sourceFormat === "txt") {
    notes.push("TXT is good for raw notes, but publish from canonical MDX after cleanup.");
  }

  if (sourceFormat === "html") {
    notes.push("Review inline styles and embedded scripts before converting HTML into a reader-safe page.");
  }

  if (sourceFormat === "md") {
    notes.push("Markdown can publish directly, but MDX is the recommended canonical format for Real Journey.");
  }

  if (sourceFormat === "mdx") {
    notes.push("Keep MDX light. Put reusable UI in shared components instead of heavy inline JSX.");
  }

  return notes;
}

function buildBinaryNormalizationNotes(options: {
  sourceFormat: BinaryUploadFormat;
  title: string;
  headings: UploadHeading[];
  extractedText: string;
  pageCount?: number;
  extraNormalizationNotes: string[];
}): string[] {
  const { extractedText, extraNormalizationNotes, headings, pageCount, sourceFormat, title } = options;
  const notes: string[] = [];
  const wordCount = countWords(extractedText);

  notes.push(`Lock an explicit title so "${title}" stays stable after future imports or edits.`);
  notes.push("Convert the reviewed output into canonical MDX before publishing to the reader.");

  if (headings.length === 0) {
    notes.push("No strong outline was detected. Add section headings manually before publishing.");
  }

  if (sourceFormat === "pdf") {
    if (pageCount) {
      notes.push(`PDF metadata reported ${pageCount} ${pageCount === 1 ? "page" : "pages"}.`);
    }

    if (wordCount < 40) {
      notes.push("This PDF may be scanned or image-only. Add OCR later if you want searchable reader text.");
    }

    notes.push("Keep the original PDF attached as a download even after the MDX reader page is ready.");
  }

  if (sourceFormat === "docx") {
    notes.push("Review tables, callouts, and image-heavy layouts because DOCX conversion keeps structure better than visual styling.");
  }

  notes.push(...extraNormalizationNotes);
  return notes;
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/["']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "untitled"
  );
}
