import { NextResponse } from "next/server";
import { getAdminAccessState } from "@/lib/auth/admin";
import {
  enforceRequestRateLimit,
  readPositiveIntEnv,
  requireTrustedOrigin,
} from "@/lib/security/request-guards";
import { validateUploadEnvelope } from "@/lib/security/upload-policy";
import {
  analyzeTextUpload,
  extractFileExtension,
  isBinaryUploadFormat,
  isTextUploadFormat,
  normalizeDraftInput,
} from "@/lib/uploads/parser";
import { analyzeBinaryUploadFile } from "@/lib/uploads/file-parsers";

export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  const originError = requireTrustedOrigin(
    request,
    "Upload analysis only accepts same-origin admin requests.",
  );
  if (originError) {
    return originError;
  }

  const rateLimitError = enforceRequestRateLimit(request, {
    bucket: "upload-analyze",
    limit: readPositiveIntEnv("REAL_JOURNEY_UPLOAD_ANALYZE_RATE_LIMIT", 20),
    windowMs: readPositiveIntEnv("REAL_JOURNEY_UPLOAD_ANALYZE_RATE_LIMIT_WINDOW_MS", 10 * 60 * 1000),
    message: "Upload analysis is being called too quickly from this address.",
  });
  if (rateLimitError) {
    return rateLimitError;
  }

  const access = await getAdminAccessState();
  if (!access.user) {
    return NextResponse.json(
      { error: "Sign in before analyzing uploads." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!access.isAdmin) {
    return NextResponse.json(
      { error: "Only admins can analyze uploads in this workspace." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const formData = await request.formData();
  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File)) {
    return NextResponse.json(
      { error: "Choose a file before analyzing." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const validation = validateUploadEnvelope(fileEntry, MAX_UPLOAD_BYTES);
  if (!validation.ok) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status, headers: { "Cache-Control": "no-store" } },
    );
  }

  const sourceFormat = extractFileExtension(fileEntry.name);
  if (!sourceFormat) {
    return NextResponse.json(
      { error: "Unsupported format. Use MD, MDX, TXT, HTML, PDF, or DOCX." },
      { status: 415, headers: { "Cache-Control": "no-store" } },
    );
  }

  const draft = normalizeDraftInput({
    destinationKind: readTextField(formData, "destinationKind"),
    visibility: readTextField(formData, "visibility"),
    domain: readTextField(formData, "domain"),
    track: readTextField(formData, "track"),
    level: readTextField(formData, "level"),
    category: readTextField(formData, "category"),
    subcategory: readTextField(formData, "subcategory"),
  });

  try {
    if (isTextUploadFormat(sourceFormat)) {
      const content = await fileEntry.text();
      const analysis = analyzeTextUpload({
        fileName: fileEntry.name,
        sourceFormat,
        mimeType: fileEntry.type,
        fileBytes: fileEntry.size,
        content,
        draft,
      });

      return NextResponse.json({ analysis }, { headers: { "Cache-Control": "no-store" } });
    }

    if (isBinaryUploadFormat(sourceFormat)) {
      const arrayBuffer = await fileEntry.arrayBuffer();
      const analysis = await analyzeBinaryUploadFile({
        fileName: fileEntry.name,
        sourceFormat,
        mimeType: fileEntry.type,
        fileBytes: fileEntry.size,
        arrayBuffer,
        draft,
      });

      return NextResponse.json({ analysis }, { headers: { "Cache-Control": "no-store" } });
    }

    return NextResponse.json(
      { error: "That file type is not enabled in this branch yet." },
      { status: 415, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to analyze that file right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function readTextField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}
