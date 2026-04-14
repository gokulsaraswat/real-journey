import { createRequire } from "node:module";
import {
  analyzeExtractedUpload,
  type BinaryUploadFormat,
  type UploadAnalysis,
  type UploadDraftInput,
} from "@/lib/uploads/parser";

const require = createRequire(import.meta.url);

type PdfInfoData = {
  Title?: string;
  Author?: string;
  Creator?: string;
  Producer?: string;
  CreationDate?: string;
  ModDate?: string;
};

type PdfInfoResult = {
  total?: number;
  infoData?: PdfInfoData;
};

type PdfTextResult = {
  text?: string;
};

type PdfParserInstance = {
  getText: () => Promise<PdfTextResult>;
  getInfo: (options?: { parsePageInfo?: boolean }) => Promise<PdfInfoResult>;
  destroy?: () => Promise<void> | void;
};

type PdfModule = {
  PDFParse: new (options: { data: ArrayBuffer | Uint8Array | Buffer }) => PdfParserInstance;
};

type MammothMessage = {
  type?: string;
  message?: string;
};

type MammothTextResult = {
  value: string;
  messages?: MammothMessage[];
};

type MammothHtmlResult = {
  value: string;
  messages?: MammothMessage[];
};

type MammothModule = {
  extractRawText: (input: { buffer: Buffer }) => Promise<MammothTextResult>;
  convertToHtml: (input: { buffer: Buffer }) => Promise<MammothHtmlResult>;
};

export async function analyzeBinaryUploadFile(options: {
  fileName: string;
  sourceFormat: BinaryUploadFormat;
  mimeType: string;
  fileBytes: number;
  arrayBuffer: ArrayBuffer;
  draft: UploadDraftInput;
}): Promise<UploadAnalysis> {
  const { arrayBuffer, draft, fileBytes, fileName, mimeType, sourceFormat } = options;
  const buffer = Buffer.from(arrayBuffer);

  if (sourceFormat === "pdf") {
    return analyzePdfUpload({
      fileName,
      mimeType,
      fileBytes,
      buffer,
      draft,
    });
  }

  return analyzeDocxUpload({
    fileName,
    mimeType,
    fileBytes,
    buffer,
    draft,
  });
}

async function analyzePdfUpload(options: {
  fileName: string;
  mimeType: string;
  fileBytes: number;
  buffer: Buffer;
  draft: UploadDraftInput;
}): Promise<UploadAnalysis> {
  const { buffer, draft, fileBytes, fileName, mimeType } = options;
  const warnings: string[] = [];
  let parser: PdfParserInstance | null = null;

  try {
    const packageName = "pdf-parse";
    const pdfModule = require(packageName) as PdfModule;
    parser = new pdfModule.PDFParse({ data: buffer });

    let textResult: PdfTextResult | null = null;
    let infoResult: PdfInfoResult | null = null;

    try {
      textResult = await parser.getText();
    } catch {
      warnings.push("PDF text extraction failed on at least part of the document. Review the original file before publishing.");
    }

    try {
      infoResult = await parser.getInfo({ parsePageInfo: true });
    } catch {
      warnings.push("PDF metadata could not be read, so title and page count may be incomplete.");
    }

    const extractedText = normalizeBinaryText(textResult?.text ?? "");

    if (!extractedText) {
      warnings.push("This PDF may be scanned or image-only. OCR can be added later if you need searchable text.");
    }

    return analyzeExtractedUpload({
      fileName,
      sourceFormat: "pdf",
      mimeType,
      fileBytes,
      extractedText,
      detectedTitle: pickFirstNonEmpty(
        sanitizeMetadataTitle(infoResult?.infoData?.Title),
        extractLikelyTitleFromText(extractedText),
      ),
      draft,
      parserEngine: "pdf-parse",
      parserWarnings: warnings,
      pageCount: infoResult?.total,
    });
  } catch (error) {
    throw new Error(buildPackageAwareMessage(error, "pdf-parse", "PDF"));
  } finally {
    try {
      await parser?.destroy?.();
    } catch {
      // Ignore cleanup errors during local parsing.
    }
  }
}

async function analyzeDocxUpload(options: {
  fileName: string;
  mimeType: string;
  fileBytes: number;
  buffer: Buffer;
  draft: UploadDraftInput;
}): Promise<UploadAnalysis> {
  const { buffer, draft, fileBytes, fileName, mimeType } = options;

  try {
    const packageName = "mammoth";
    const mammoth = require(packageName) as MammothModule;
    const [rawTextResult, htmlResult] = await Promise.all([
      mammoth.extractRawText({ buffer }),
      mammoth.convertToHtml({ buffer }),
    ]);

    const warnings = dedupeStrings([
      ...collectMammothMessages(rawTextResult.messages),
      ...collectMammothMessages(htmlResult.messages),
    ]);

    const extractedText = normalizeBinaryText(rawTextResult.value);

    if (!extractedText) {
      warnings.push("No readable DOCX text was extracted. Review the source file before publishing.");
    }

    return analyzeExtractedUpload({
      fileName,
      sourceFormat: "docx",
      mimeType,
      fileBytes,
      extractedText,
      extractedHtml: htmlResult.value,
      detectedTitle: pickFirstNonEmpty(
        extractTitleFromHtml(htmlResult.value),
        extractLikelyTitleFromText(extractedText),
      ),
      draft,
      parserEngine: "mammoth",
      parserWarnings: warnings,
      extraNormalizationNotes: [
        "Mammoth focuses on semantic structure and ignores most presentational styling, so review complex tables and visual callouts before publish.",
      ],
    });
  } catch (error) {
    throw new Error(buildPackageAwareMessage(error, "mammoth", "DOCX"));
  }
}

function buildPackageAwareMessage(error: unknown, packageName: string, formatLabel: string): string {
  if (isMissingPackageError(error)) {
    return `Install ${packageName} with npm install before using ${formatLabel} parsing in this branch.`;
  }

  return `Unable to parse this ${formatLabel} file right now. Keep the original file attached as a download and retry after reviewing the source.`;
}

function isMissingPackageError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /cannot find module|cannot find package|module not found|failed to resolve/i.test(message);
}

function sanitizeMetadataTitle(value: string | undefined): string {
  const cleaned = collapseWhitespace(String(value ?? "").replace(/^Untitled$/i, "").trim());
  return cleaned;
}

function extractLikelyTitleFromText(text: string): string {
  const lines = text
    .split(/\r?\n/)
    .map((line) => collapseWhitespace(line.replace(/^[-*#\d.\s]+/, "")))
    .filter(Boolean)
    .filter((line) => !/^page\s+\d+$/i.test(line));

  return lines.find((line) => line.length <= 120) ?? "";
}

function extractTitleFromHtml(value: string): string {
  const h1Match = value.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Match = value.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  return collapseWhitespace(stripHtmlTags(h1Match?.[1] ?? h2Match?.[1] ?? ""));
}

function collectMammothMessages(messages: MammothMessage[] | undefined): string[] {
  if (!messages?.length) {
    return [];
  }

  return messages
    .map((message) => {
      const body = collapseWhitespace(message.message ?? "");
      const type = collapseWhitespace(message.type ?? "");

      if (body) {
        return body;
      }

      if (type) {
        return `${capitalize(type)} reported while converting DOCX.`;
      }

      return "";
    })
    .filter(Boolean);
}

function normalizeBinaryText(value: string): string {
  return value.replace(/\u0000/g, " ").replace(/\r\n?/g, "\n").trim();
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

function pickFirstNonEmpty(...values: string[]): string {
  return values.find((value) => collapseWhitespace(value)) ?? "";
}

function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function capitalize(value: string): string {
  return value.length ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}
