import {
  buildPublishPacketResponse,
  type PublishPacketInput,
  type PublishStage,
} from "@/lib/publish/workflow";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PublishPacketInput>;

    const title = normalizeString(body.title);
    const canonicalBody = normalizeString(body.canonicalBody);

    if (!title || !canonicalBody) {
      return Response.json(
        { error: "Title and canonical body are required before generating a publish packet." },
        { status: 400 },
      );
    }

    const payload = buildPublishPacketResponse({
      title,
      slug: normalizeString(body.slug),
      summary: normalizeString(body.summary),
      canonicalBody,
      sourceFileName: normalizeString(body.sourceFileName) || "draft.mdx",
      sourceFormat: normalizeSourceFormat(body.sourceFormat),
      destinationKind: normalizeDestinationKind(body.destinationKind),
      visibility: normalizeVisibility(body.visibility),
      domain: normalizeString(body.domain) || "IT",
      track: normalizeString(body.track) || "job-ready engineer",
      level: normalizeString(body.level) || "Level 1",
      category: normalizeString(body.category) || "Core Computing",
      subcategory: normalizeString(body.subcategory) || "General",
      parserWarnings: normalizeStringArray(body.parserWarnings),
      normalizationNotes: normalizeStringArray(body.normalizationNotes),
      tags: normalizeStringArray(body.tags),
      authorName: normalizeString(body.authorName) || "Gokul Saraswat",
      downloadable: body.downloadable !== false,
      stage: normalizeStage(body.stage),
      publishAt: normalizeString(body.publishAt),
    });

    return Response.json(payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "Unable to generate the publish packet right now." },
      { status: 500 },
    );
  }
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeStage(value: unknown): PublishStage {
  return value === "draft" || value === "review" || value === "scheduled" || value === "published"
    ? value
    : "review";
}

function normalizeDestinationKind(value: unknown): PublishPacketInput["destinationKind"] {
  return value === "blog" || value === "story" || value === "reference" || value === "guide"
    ? value
    : "guide";
}

function normalizeVisibility(value: unknown): PublishPacketInput["visibility"] {
  return value === "public" || value === "private" || value === "mixed" ? value : "public";
}

function normalizeSourceFormat(value: unknown): PublishPacketInput["sourceFormat"] {
  return value === "md" || value === "mdx" || value === "txt" || value === "html" || value === "pdf" || value === "docx"
    ? value
    : "mdx";
}
