const allowedMimeTypesByExtension: Record<string, string[]> = {
  md: ["text/markdown", "text/plain", "application/octet-stream", ""],
  mdx: ["text/markdown", "text/plain", "application/octet-stream", ""],
  txt: ["text/plain", "application/octet-stream", ""],
  html: ["text/html", "application/xhtml+xml", "text/plain", "application/octet-stream", ""],
  pdf: ["application/pdf", "application/octet-stream", ""],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
    "application/octet-stream",
    "",
  ],
};

function extractExtension(fileName: string): string | null {
  const pieces = fileName.trim().split(".");
  const extension = pieces.length > 1 ? pieces.pop() : null;
  return extension ? extension.toLowerCase() : null;
}

export type UploadValidationResult =
  | { ok: true; extension: string }
  | { ok: false; status: number; error: string };

export function validateUploadEnvelope(file: File, maxBytes: number): UploadValidationResult {
  if (!file.name.trim()) {
    return { ok: false, status: 400, error: "The selected file is missing a usable file name." };
  }

  if (file.size <= 0) {
    return { ok: false, status: 400, error: "The selected file is empty." };
  }

  if (file.size > maxBytes) {
    return {
      ok: false,
      status: 413,
      error: `Keep uploads under ${Math.round(maxBytes / (1024 * 1024))} MB in this branch.`,
    };
  }

  const extension = extractExtension(file.name);
  if (!extension || !(extension in allowedMimeTypesByExtension)) {
    return {
      ok: false,
      status: 415,
      error: "Unsupported format. Use MD, MDX, TXT, HTML, PDF, or DOCX.",
    };
  }

  const mimeType = file.type.trim().toLowerCase();
  const allowedMimeTypes = allowedMimeTypesByExtension[extension];
  if (mimeType && !allowedMimeTypes.includes(mimeType)) {
    return {
      ok: false,
      status: 415,
      error: `The uploaded file type (${mimeType}) does not match the .${extension} extension.`,
    };
  }

  return { ok: true, extension };
}
