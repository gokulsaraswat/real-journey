import { slugify, type UploadDestinationKind, type UploadVisibility } from "@/lib/uploads/parser";

export const defaultAdminUploadBucket = process.env.SUPABASE_ADMIN_UPLOAD_BUCKET ?? "admin-source-files";
export const defaultPrivateStoryBucket = process.env.SUPABASE_PRIVATE_STORY_BUCKET ?? "private-story-files";
export const maxAdminUploadBytes = 25 * 1024 * 1024;

type NormalizedUploadRequest = {
  fileName: string;
  mimeType: string;
  slug: string;
  title: string;
  summary: string;
  visibility: UploadVisibility;
  destinationKind: UploadDestinationKind;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
};

type StoredUploadInput = {
  originalFileName: string;
  mimeType: string;
  bytes: number;
  slug: string;
  visibility: UploadVisibility;
  destinationKind: UploadDestinationKind;
  domain: string;
  track: string;
  level: string;
  category: string;
  subcategory: string;
};

export function normalizeUploadRequest(input: NormalizedUploadRequest): NormalizedUploadRequest {
  return {
    ...input,
    fileName: normalizeText(input.fileName, "upload.bin"),
    mimeType: normalizeText(input.mimeType, "application/octet-stream"),
    slug: slugify(input.slug || input.title || input.fileName || "uploaded-source"),
    title: normalizeText(input.title, "Untitled source"),
    summary: normalizeText(input.summary, ""),
    visibility: normalizeVisibility(input.visibility),
    destinationKind: normalizeDestinationKind(input.destinationKind),
    domain: normalizeText(input.domain, "IT"),
    track: normalizeText(input.track, "job-ready engineer"),
    level: normalizeText(input.level, "Level 1"),
    category: normalizeText(input.category, "Core Computing"),
    subcategory: normalizeText(input.subcategory, "General"),
  };
}

export function buildAdminStoredUpload(input: StoredUploadInput) {
  const savedAt = new Date().toISOString();
  const bucket = input.visibility === "private" ? defaultPrivateStoryBucket : defaultAdminUploadBucket;
  const extension = extractExtension(input.originalFileName);
  const fileName = `${input.slug}-${savedAt.replace(/[:.]/g, "-")}${extension}`;
  const path = [
    savedAt.slice(0, 4),
    savedAt.slice(5, 7),
    savedAt.slice(8, 10),
    slugify(input.destinationKind),
    slugify(input.visibility),
    slugify(input.domain),
    slugify(input.track),
    slugify(input.level),
    slugify(input.category),
    slugify(input.subcategory),
    fileName,
  ].join("/");

  return {
    bucket,
    path,
    fileName,
    mimeType: normalizeText(input.mimeType, "application/octet-stream"),
    bytes: input.bytes,
    savedAt,
  };
}

function normalizeDestinationKind(value: UploadDestinationKind): UploadDestinationKind {
  return value === "blog" || value === "story" || value === "reference" || value === "guide"
    ? value
    : "guide";
}

function normalizeVisibility(value: UploadVisibility): UploadVisibility {
  return value === "public" || value === "private" || value === "mixed" ? value : "public";
}

function normalizeText(value: string | undefined, fallback: string): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || fallback;
}

function extractExtension(fileName: string): string {
  const match = fileName.toLowerCase().match(/(\.[a-z0-9]+)$/i);
  return match ? match[1] : "";
}
