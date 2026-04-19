import { getSearchDiscovery, normalizeSearchType, searchDocuments } from "@/lib/search/index";

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim();
  const type = normalizeSearchType(searchParams.get("type"));
  const limit = Math.min(parsePositiveInteger(searchParams.get("limit"), 10), 24);

  if (!query) {
    const discovery = getSearchDiscovery();
    return Response.json({
      query: "",
      type,
      total: 0,
      results: [],
      counts: discovery.totals,
      quickQueries: discovery.quickQueries,
      popularTags: discovery.popularTags,
    });
  }

  const bundle = searchDocuments({
    query,
    type,
    page: 1,
    pageSize: limit,
  });

  return Response.json(bundle);
}
