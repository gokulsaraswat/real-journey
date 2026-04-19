import { getSearchDiscovery, normalizeSearchType, searchDocuments } from "@/lib/search/index";

describe("search index", () => {
  it("normalizes unsupported result types", () => {
    expect(normalizeSearchType(undefined)).toBe("all");
    expect(normalizeSearchType(null)).toBe("all");
    expect(normalizeSearchType("topic")).toBe("topic");
    expect(normalizeSearchType("unknown")).toBe("all");
  });

  it("returns seeded topic results for HTTP", () => {
    const bundle = searchDocuments({ query: "http" });

    expect(bundle.total).toBeGreaterThan(0);
    expect(bundle.counts.topic).toBeGreaterThan(0);
    expect(bundle.results.some((result) => result.href.includes("/topic/http-request-lifecycle"))).toBe(true);
  });

  it("filters to blog results when blog type is requested", () => {
    const bundle = searchDocuments({ query: "workflow", type: "blog" });

    expect(bundle.type).toBe("blog");
    expect(bundle.total).toBeGreaterThan(0);
    expect(bundle.results.every((result) => result.kind === "blog")).toBe(true);
  });

  it("returns discovery suggestions when the query is empty", () => {
    const bundle = searchDocuments({ query: "   " });

    expect(bundle.total).toBe(0);
    expect(bundle.suggestions.length).toBeGreaterThan(0);
    expect(bundle.suggestions).toContain("http");
  });

  it("exposes consistent discovery totals", () => {
    const discovery = getSearchDiscovery();

    expect(discovery.totals.all).toBe(
      discovery.totals.topic + discovery.totals.blog + discovery.totals.story,
    );
    expect(discovery.quickQueries).toContain("architecture");
    expect(discovery.popularTags.length).toBeGreaterThan(0);
  });
});
