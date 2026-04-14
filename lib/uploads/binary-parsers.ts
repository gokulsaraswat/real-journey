import mammoth from "mammoth";
import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import type { BinaryUploadFormat } from "@/lib/uploads/parser";

type BinaryParserResult = {
  sourceFormat: BinaryUploadFormat;
  extractedText: string;
  extractedHtml?: string;
  parserMessages: string[];
};

export async function extractBinaryUpload(options: {
  buffer: Buffer;
  sourceFormat: BinaryUploadFormat;
}): Promise<BinaryParserResult> {
  const { buffer, sourceFormat } = options;

  if (sourceFormat === "docx") {
    return extractDocxUpload(buffer);
  }

  return extractPdfUpload(buffer);
}

async function extractDocxUpload(buffer: Buffer): Promise<BinaryParserResult> {
  const [htmlResult, rawTextResult] = await Promise.all([
    mammoth.convertToHtml({ buffer }),
    mammoth.extractRawText({ buffer }),
  ]);

  return {
    sourceFormat: "docx",
    extractedHtml: htmlResult.value ?? "",
    extractedText: normalizeExtractedText(rawTextResult.value ?? ""),
    parserMessages: [
      ...formatMammothMessages(htmlResult.messages),
      ...formatMammothMessages(rawTextResult.messages),
    ],
  };
}

async function extractPdfUpload(buffer: Buffer): Promise<BinaryParserResult> {
  let parser: PDFParse | null = null;

  try {
    parser = new PDFParse({
      data: buffer,
      CanvasFactory,
    });

    const result = await parser.getText();
    const pageCount = Array.isArray(result.pages) ? result.pages.length : 0;

    return {
      sourceFormat: "pdf",
      extractedText: normalizeExtractedText(result.text ?? ""),
      parserMessages: pageCount > 0 ? [`PDF extraction read ${pageCount} page${pageCount === 1 ? "" : "s"}.`] : [],
    };
  } finally {
    if (parser) {
      await Promise.resolve(parser.destroy()).catch(() => undefined);
    }
  }
}

function formatMammothMessages(messages: unknown[]): string[] {
  return messages
    .map((message) => {
      if (typeof message === "string") {
        return message.trim();
      }

      if (
        typeof message === "object" &&
        message !== null &&
        "message" in message &&
        typeof (message as { message: unknown }).message === "string"
      ) {
        const typedMessage = message as { message: string; type?: string };
        return typedMessage.type ? `${capitalize(typedMessage.type)}: ${typedMessage.message}` : typedMessage.message;
      }

      return "";
    })
    .filter(Boolean);
}

function normalizeExtractedText(value: string): string {
  return value
    .replace(/\u0000/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
