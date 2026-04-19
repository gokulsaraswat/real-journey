import { NextResponse } from "next/server";
import { buildTopicCatalogSummary, parseTopicCatalogSource } from "@/lib/topics/catalog";

const MAX_PAYLOAD_BYTES = 500_000;

export async function POST(request: Request) {
  const text = await request.text();

  if (!text.trim()) {
    return NextResponse.json({ error: "Empty topic source." }, { status: 400 });
  }

  if (text.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { error: "Topic source is too large for one request." },
      { status: 413 },
    );
  }

  const sections = parseTopicCatalogSource(text);

  if (!sections.length) {
    return NextResponse.json(
      { error: "No numbered topics or section headings were detected." },
      { status: 422 },
    );
  }

  return NextResponse.json({
    summary: buildTopicCatalogSummary(sections),
    sections,
  });
}
