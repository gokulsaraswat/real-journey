import { buildTopicCatalogSummary, createTopicUploadTemplate, parseTopicCatalogSource } from "@/lib/topics/catalog";

const sample = `
1. Computer science fundamentals
2. Operating systems basics

## Section A — Cybersecurity (301–325)
301. Cybersecurity fundamentals
302. Threat modeling
`;

describe("topic catalog parser", () => {
  it("parses sections and numbered topics", () => {
    const sections = parseTopicCatalogSource(sample);
    expect(sections).toHaveLength(2);
    expect(sections[0]?.topics[0]?.title).toBe("Computer science fundamentals");
    expect(sections[1]?.code).toBe("A");
  });

  it("builds a summary", () => {
    const sections = parseTopicCatalogSource(sample);
    const summary = buildTopicCatalogSummary(sections);
    expect(summary.totalTopics).toBe(4);
    expect(summary.totalSections).toBe(2);
  });

  it("creates an upload template", () => {
    const sections = parseTopicCatalogSource(sample);
    const topic = sections[1]?.topics[0];
    expect(topic).toBeDefined();
    const template = createTopicUploadTemplate(topic!);
    expect(template).toContain("title: Cybersecurity fundamentals");
    expect(template).toContain("## Why this topic matters");
  });
});
