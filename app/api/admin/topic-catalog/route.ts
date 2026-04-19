import { NextResponse } from "next/server";
import { topicCatalogSections, topicCatalogSummary, topicCatalogTopics } from "@/lib/data/topic-catalog-sample";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase();

  const sections =
    query && query.length > 1
      ? topicCatalogSections
          .map((section) => ({
            ...section,
            topics: section.topics.filter(
              (topic) =>
                topic.title.toLowerCase().includes(query) ||
                topic.slug.includes(query) ||
                topic.domain.toLowerCase().includes(query),
            ),
          }))
          .filter((section) => section.topics.length > 0)
      : topicCatalogSections;

  return NextResponse.json({
    query: query ?? null,
    summary: topicCatalogSummary,
    totalMatchedTopics: query ? sections.flatMap((section) => section.topics).length : topicCatalogTopics.length,
    sections,
  });
}
