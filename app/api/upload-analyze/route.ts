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
  const formData = await request.formData();
  const fileEntry = formData.get("file");

  if (!(fileEntry instanceof File)) {
    return Response.json({ error: "Choose a file before analyzing." }, { status: 400 });
  }

  if (fileEntry.size > MAX_UPLOAD_BYTES) {
    return Response.json(
      {
        error:
          "Keep uploads under 12 MB in this branch so local parsing stays fast and stable.",
      },
      { status: 413 },
    );
  }

  const sourceFormat = extractFileExtension(fileEntry.name);

  if (!sourceFormat) {
    return Response.json(
      { error: "Unsupported format. Use MD, MDX, TXT, HTML, PDF, or DOCX." },
      { status: 415 },
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

      return Response.json({ analysis });
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

      return Response.json({ analysis });
    }

    return Response.json(
      { error: "That file type is not enabled in this branch yet." },
      { status: 415 },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to analyze that file right now." },
      { status: 500 },
    );
  }
}

function readTextField(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}
