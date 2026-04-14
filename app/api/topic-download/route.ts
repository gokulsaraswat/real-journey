import { getTopicContextBySlug, getTopicDownloadFileName } from "@/lib/data/learn";
import { buildTopicDownloadSource } from "@/lib/data/topic-reader";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing topic slug.", { status: 400 });
  }

  const context = getTopicContextBySlug(slug);
  if (!context) {
    return new Response("Topic not found.", { status: 404 });
  }

  const body = buildTopicDownloadSource(context);
  const fileName = getTopicDownloadFileName(context.topic);

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
