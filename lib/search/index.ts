import { formatBlogDate, getAllBlogPosts } from "@/lib/data/blog";
import {
  getTopicContextBySlug,
  getTopicHref,
  getTopicParams,
} from "@/lib/data/learn";
import { buildStoryHref, formatStoryDate, getPublicStories } from "@/lib/data/stories";

export type SearchResultType = "all" | "topic" | "blog" | "story";
export type SearchDocumentType = Exclude<SearchResultType, "all">;

export type SearchDocument = {
  id: string;
  kind: SearchDocumentType;
  title: string;
  summary: string;
  href: string;
  tags: string[];
  badges: string[];
  trail: string;
  meta: string[];
  displayDate: string | null;
  sortDate: number;
  featured: boolean;
};

type IndexedSearchDocument = SearchDocument & {
  normalizedTitle: string;
  normalizedSummary: string;
  normalizedTrail: string;
  normalizedMeta: string[];
  normalizedTags: string[];
  searchBlob: string;
};

export type SearchCounts = Record<SearchResultType, number>;

export type SearchResultBundle = {
  query: string;
  type: SearchResultType;
  counts: SearchCounts;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: SearchDocument[];
  suggestions: string[];
};

export type SearchDiscoveryState = {
  totals: SearchCounts;
  quickQueries: string[];
  featuredTopics: SearchDocument[];
  recentBlogPosts: SearchDocument[];
  storyTrails: SearchDocument[];
  popularTags: string[];
};

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(value: string) {
  return Array.from(new Set(normalizeText(value).split(" ").filter(Boolean)));
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function buildSearchIndex(): IndexedSearchDocument[] {
  const blogDocuments: IndexedSearchDocument[] = getAllBlogPosts().map((post) => {
    const meta = [post.category, post.audience, post.readTime, formatBlogDate(post.publishedAt)];
    const trail = `${post.category} · ${post.audience}`;

    return createIndexedDocument({
      id: `blog:${post.slug}`,
      kind: "blog",
      title: post.title,
      summary: post.summary,
      href: `/blog/${post.slug}`,
      tags: post.tags,
      badges: [post.category, post.readTime],
      trail,
      meta,
      displayDate: formatBlogDate(post.publishedAt),
      sortDate: new Date(post.publishedAt).getTime(),
      featured: Boolean(post.featured),
    });
  });

  const topicDocuments: IndexedSearchDocument[] = getTopicParams()
    .map((entry) => getTopicContextBySlug(entry.slug))
    .filter((context): context is NonNullable<typeof context> => Boolean(context))
    .map((context) => {
      const { domain, track, level, category, subcategory, topic } = context;
      const trail = [domain.title, track.title, level.title, category.title, subcategory.title].join(" · ");
      const meta = [
        domain.title,
        track.title,
        level.title,
        category.title,
        subcategory.title,
        `${topic.estimatedReadMinutes} min read`,
      ];

      return createIndexedDocument({
        id: `topic:${topic.slug}`,
        kind: "topic",
        title: topic.title,
        summary: topic.summary,
        href: getTopicHref(topic),
        tags: topic.tags,
        badges: [domain.title, `${topic.estimatedReadMinutes} min`],
        trail,
        meta,
        displayDate: null,
        sortDate: 0,
        featured: false,
      });
    });

  const storyDocuments: IndexedSearchDocument[] = getPublicStories().map((story) => {
    const meta = [story.collectionTitle, story.categoryLabel, story.readTime, story.format.toUpperCase()];
    const trail = `${story.collectionTitle} · ${story.categoryLabel}`;

    return createIndexedDocument({
      id: `story:${story.id}`,
      kind: "story",
      title: story.title,
      summary: story.summary,
      href: buildStoryHref(story),
      tags: story.tags,
      badges: [story.categoryLabel, story.format.toUpperCase()],
      trail,
      meta,
      displayDate: formatStoryDate(story.updatedAt),
      sortDate: new Date(story.updatedAt).getTime(),
      featured: story.visibility === "public",
    });
  });

  return [...topicDocuments, ...blogDocuments, ...storyDocuments];
}

function createIndexedDocument(document: SearchDocument): IndexedSearchDocument {
  const normalizedTitle = normalizeText(document.title);
  const normalizedSummary = normalizeText(document.summary);
  const normalizedTrail = normalizeText(document.trail);
  const normalizedMeta = document.meta.map((item) => normalizeText(item));
  const normalizedTags = document.tags.map((tag) => normalizeText(tag));

  return {
    ...document,
    normalizedTitle,
    normalizedSummary,
    normalizedTrail,
    normalizedMeta,
    normalizedTags,
    searchBlob: [
      normalizedTitle,
      normalizedSummary,
      normalizedTrail,
      ...normalizedMeta,
      ...normalizedTags,
    ].join(" "),
  };
}

const searchIndex = buildSearchIndex();

function scoreDocument(document: IndexedSearchDocument, query: string, tokens: string[]) {
  if (!query) {
    return 0;
  }

  let score = 0;

  if (document.normalizedTitle === query) {
    score += 220;
  }

  if (document.normalizedTitle.startsWith(query)) {
    score += 140;
  }

  if (document.normalizedTitle.includes(query)) {
    score += 90;
  }

  if (document.normalizedSummary.includes(query)) {
    score += 42;
  }

  if (document.normalizedTrail.includes(query)) {
    score += 28;
  }

  if (document.normalizedTags.some((tag) => tag.includes(query))) {
    score += 36;
  }

  for (const token of tokens) {
    if (!token) {
      continue;
    }

    if (document.normalizedTitle.includes(token)) {
      score += 32;
    }

    if (document.normalizedSummary.includes(token)) {
      score += 12;
    }

    if (document.normalizedTrail.includes(token)) {
      score += 10;
    }

    if (document.normalizedTags.some((tag) => tag.includes(token))) {
      score += 18;
    }

    if (document.normalizedMeta.some((item) => item.includes(token))) {
      score += 10;
    }
  }

  if (!score && tokens.some((token) => document.searchBlob.includes(token))) {
    score += 8;
  }

  if (score > 0 && document.featured) {
    score += 10;
  }

  if (score > 0 && document.sortDate > 0) {
    score += clampNumber(Math.floor(document.sortDate / 1_000_000_000_000), 0, 25);
  }

  return score;
}

function stripIndexedFields(document: IndexedSearchDocument): SearchDocument {
  return {
    id: document.id,
    kind: document.kind,
    title: document.title,
    summary: document.summary,
    href: document.href,
    tags: document.tags,
    badges: document.badges,
    trail: document.trail,
    meta: document.meta,
    displayDate: document.displayDate,
    sortDate: document.sortDate,
    featured: document.featured,
  };
}

function emptyCounts(): SearchCounts {
  return {
    all: 0,
    topic: 0,
    blog: 0,
    story: 0,
  };
}

export function normalizeSearchType(value: string | null | undefined): SearchResultType {
  return value === "topic" || value === "blog" || value === "story" ? value : "all";
}

export function searchDocuments(input: {
  query: string;
  type?: SearchResultType;
  page?: number;
  pageSize?: number;
}): SearchResultBundle {
  const normalizedQuery = normalizeText(input.query);
  const tokens = tokenize(normalizedQuery);
  const type = input.type ?? "all";
  const pageSize = clampNumber(input.pageSize ?? 12, 1, 24);
  const counts = emptyCounts();

  if (!normalizedQuery) {
    return {
      query: input.query.trim(),
      type,
      counts,
      total: 0,
      page: 1,
      pageSize,
      totalPages: 0,
      results: [],
      suggestions: getSearchDiscovery().quickQueries.slice(0, 6),
    };
  }

  const scored = searchIndex
    .map((document) => ({ document, score: scoreDocument(document, normalizedQuery, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.document.sortDate !== left.document.sortDate) {
        return right.document.sortDate - left.document.sortDate;
      }

      return left.document.title.localeCompare(right.document.title);
    });

  counts.all = scored.length;
  counts.topic = scored.filter((entry) => entry.document.kind === "topic").length;
  counts.blog = scored.filter((entry) => entry.document.kind === "blog").length;
  counts.story = scored.filter((entry) => entry.document.kind === "story").length;

  const filtered = type === "all" ? scored : scored.filter((entry) => entry.document.kind === type);
  const total = filtered.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize);
  const page = totalPages === 0 ? 1 : clampNumber(input.page ?? 1, 1, totalPages);
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize).map((entry) => stripIndexedFields(entry.document));

  return {
    query: input.query.trim(),
    type,
    counts,
    total,
    page,
    pageSize,
    totalPages,
    results: paged,
    suggestions: buildSuggestions(filtered.map((entry) => entry.document), tokens),
  };
}

function buildSuggestions(documents: IndexedSearchDocument[], queryTokens: string[]) {
  const tokenSet = new Set(queryTokens);
  const ranked = new Map<string, { label: string; score: number }>();

  for (const document of documents.slice(0, 18)) {
    for (const tag of document.tags) {
      const normalizedTag = normalizeText(tag);
      if (!normalizedTag || tokenSet.has(normalizedTag) || normalizedTag.length < 2) {
        continue;
      }

      const current = ranked.get(normalizedTag) ?? { label: tag, score: 0 };
      current.score += 1;
      ranked.set(normalizedTag, current);
    }
  }

  return Array.from(ranked.values())
    .sort((left, right) => right.score - left.score || left.label.localeCompare(right.label))
    .slice(0, 8)
    .map((entry) => entry.label);
}

export function getSearchDiscovery(): SearchDiscoveryState {
  const totals = emptyCounts();
  totals.all = searchIndex.length;
  totals.topic = searchIndex.filter((document) => document.kind === "topic").length;
  totals.blog = searchIndex.filter((document) => document.kind === "blog").length;
  totals.story = searchIndex.filter((document) => document.kind === "story").length;

  const popularTags = Array.from(
    searchIndex.reduce((map, document) => {
      document.tags.forEach((tag) => {
        const key = normalizeText(tag);
        if (!key) {
          return;
        }

        map.set(key, (map.get(key) ?? 0) + 1);
      });
      return map;
    }, new Map<string, number>()),
  )
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 12)
    .map(([normalizedTag]) => {
      const example = searchIndex.find((document) => document.normalizedTags.includes(normalizedTag));
      return example?.tags.find((tag) => normalizeText(tag) === normalizedTag) ?? normalizedTag;
    });

  return {
    totals,
    quickQueries: [
      "http",
      "systems design",
      "architecture",
      "certification",
      "workflow",
      "java",
      "incident response",
      "observability",
    ],
    featuredTopics: searchIndex
      .filter((document) => document.kind === "topic")
      .slice(0, 6)
      .map(stripIndexedFields),
    recentBlogPosts: searchIndex
      .filter((document) => document.kind === "blog")
      .sort((left, right) => right.sortDate - left.sortDate)
      .slice(0, 4)
      .map(stripIndexedFields),
    storyTrails: searchIndex
      .filter((document) => document.kind === "story")
      .sort((left, right) => right.sortDate - left.sortDate)
      .slice(0, 4)
      .map(stripIndexedFields),
    popularTags,
  };
}
