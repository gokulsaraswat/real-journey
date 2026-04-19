import { NextResponse } from "next/server";
import { getAdminAccessState } from "@/lib/auth/admin";
import {
  buildAdminStoredUpload,
  maxAdminUploadBytes,
  normalizeUploadRequest,
} from "@/lib/storage/admin-uploads";
import {
  enforceRequestRateLimit,
  readPositiveIntEnv,
  requireTrustedOrigin,
} from "@/lib/security/request-guards";
import { validateUploadEnvelope } from "@/lib/security/upload-policy";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import type { UploadDestinationKind, UploadVisibility } from "@/lib/uploads/parser";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const originError = requireTrustedOrigin(
    request,
    "Storage uploads only accept same-origin admin requests.",
  );
  if (originError) {
    return originError;
  }

  const rateLimitError = enforceRequestRateLimit(request, {
    bucket: "admin-storage-upload",
    limit: readPositiveIntEnv("REAL_JOURNEY_STORAGE_UPLOAD_RATE_LIMIT", 10),
    windowMs: readPositiveIntEnv("REAL_JOURNEY_STORAGE_UPLOAD_RATE_LIMIT_WINDOW_MS", 10 * 60 * 1000),
    message: "Storage uploads are happening too quickly from this address.",
  });
  if (rateLimitError) {
    return rateLimitError;
  }

  try {
    const access = await getAdminAccessState();

    if (!access.user) {
      return NextResponse.json(
        { error: "You must be signed in before saving uploads to storage." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!access.isAdmin) {
      return NextResponse.json(
        { error: "This account is not in the current admin allowlist." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Choose a file before saving to storage." },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    const validation = validateUploadEnvelope(file, maxAdminUploadBytes);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status, headers: { "Cache-Control": "no-store" } },
      );
    }

    const normalized = normalizeUploadRequest({
      fileName: file.name,
      mimeType: file.type,
      slug: readTextField(formData, "slug") ?? "",
      title: readTextField(formData, "title") ?? "",
      summary: readTextField(formData, "summary") ?? "",
      visibility: readVisibilityField(formData, "visibility"),
      destinationKind: readDestinationKindField(formData, "destinationKind"),
      domain: readTextField(formData, "domain") ?? "IT",
      track: readTextField(formData, "track") ?? "job-ready engineer",
      level: readTextField(formData, "level") ?? "Level 1",
      category: readTextField(formData, "category") ?? "Core Computing",
      subcategory: readTextField(formData, "subcategory") ?? "General",
    });

    const stored = buildAdminStoredUpload({
      originalFileName: file.name,
      mimeType: file.type,
      bytes: file.size,
      slug: normalized.slug,
      visibility: normalized.visibility,
      destinationKind: normalized.destinationKind,
      domain: normalized.domain,
      track: normalized.track,
      level: normalized.level,
      category: normalized.category,
      subcategory: normalized.subcategory,
    });

    const supabase = createServiceRoleClient();
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from(stored.bucket).upload(stored.path, fileBuffer, {
      contentType: file.type || stored.mimeType,
      upsert: false,
      metadata: {
        originalFileName: file.name,
        destinationKind: normalized.destinationKind,
        visibility: normalized.visibility,
        domain: normalized.domain,
        track: normalized.track,
        level: normalized.level,
        category: normalized.category,
        subcategory: normalized.subcategory,
        slug: normalized.slug,
        title: normalized.title,
        summary: normalized.summary,
        uploadedBy: access.user.id,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { stored },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save the upload to storage right now.";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function readTextField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

function readVisibilityField(formData: FormData, key: string): UploadVisibility {
  const value = readTextField(formData, key);
  return value === "private" || value === "mixed" || value === "public" ? value : "public";
}

function readDestinationKindField(formData: FormData, key: string): UploadDestinationKind {
  const value = readTextField(formData, key);
  return value === "blog" || value === "story" || value === "reference" || value === "guide"
    ? value
    : "guide";
}
