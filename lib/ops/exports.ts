import { NextResponse } from "next/server";
import { formatBlogDate, getAllBlogPosts } from "@/lib/data/blog";
import {
  getTopicContextBySlug,
  getTopicHref,
  getTopicParams,
} from "@/lib/data/learn";
import {
  buildStoryHref,
  formatStoryDate,
  getAllStories,
  getPrivateStories,
  getPublicStories,
} from "@/lib/data/stories";
import { siteConfig } from "@/lib/config/site";
import { getSearchDiscovery, searchDocuments } from "@/lib/search/index";
import { getOpsStatusSnapshot } from "@/lib/ops/status";

function buildTopicRecords() {
  return getTopicParams()
    .map((entry) => getTopicContextBySlug(entry.slug))
    .filter((context): context is NonNullable<typeof context> => Boolean(context))
    .map((context) => ({
      slug: context.topic.slug,
      title: context.topic.title,
      summary: context.topic.summary,
      href: getTopicHref(context.topic),
      domain: context.domain.title,
      track: context.track.title,
      level: context.level.title,
      category: context.category.title,
      subcategory: context.subcategory.title,
      trail: [
        context.domain.title,
        context.track.title,
        context.level.title,
        context.category.title,
        context.subcategory.title,
      ].join(" -> "),
      estimatedReadMinutes: context.topic.estimatedReadMinutes,
      tags: context.topic.tags,
      visibility: "public",
    }));
}

function buildBlogRecords() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    href: `/blog/${post.slug}`,
    category: post.category,
    audience: post.audience,
    readTime: post.readTime,
    publishedAt: post.publishedAt,
    publishedDateLabel: formatBlogDate(post.publishedAt),
    tags: post.tags,
    featured: Boolean(post.featured),
    visibility: "public",
  }));
}

function buildStoryRecords() {
  return getAllStories().map((story) => ({
    id: story.id,
    title: story.title,
    summary: story.summary,
    href: buildStoryHref(story),
    visibility: story.visibility,
    format: story.format,
    category: story.categoryLabel,
    collectionTitle: story.collectionTitle,
    audience: story.audience,
    updatedAt: story.updatedAt,
    updatedDateLabel: formatStoryDate(story.updatedAt),
    assetCount: story.assetCount,
    trail: `${story.collectionTitle} -> ${story.categoryLabel}`,
    tags: story.tags,
  }));
}

function buildQuickQuerySamples() {
  const discovery = getSearchDiscovery();

  return discovery.quickQueries.map((query) => {
    const result = searchDocuments({ query, pageSize: 5 });
    return {
      query,
      total: result.total,
      topResults: result.results.map((entry) => ({
        kind: entry.kind,
        title: entry.title,
        href: entry.href,
        badges: entry.badges,
        trail: entry.trail,
      })),
    };
  });
}

export function buildOpsManifest() {
  const status = getOpsStatusSnapshot();

  return {
    generatedAt: status.generatedAt,
    patch: 17,
    scope: "backup-export-ops",
    site: {
      name: siteConfig.name,
      owner: siteConfig.owner,
      ownerTitle: siteConfig.ownerTitle,
      baseUrl: siteConfig.baseUrl,
      githubRepoUrl: siteConfig.githubRepoUrl,
      feedbackEmail: siteConfig.feedbackEmail,
      loaderGifPath: siteConfig.loaderGifPath,
    },
    navigation: siteConfig.mainNav.map((item) => ({
      label: item.label,
      href: item.href,
      hidden: Boolean(item.hideInPrimaryNav),
    })),
    status,
    exportEndpoints: [
      "/api/admin/ops/status",
      "/api/admin/ops/export/manifest",
      "/api/admin/ops/export/content-bundle",
      "/api/admin/ops/export/public-inventory",
      "/api/admin/ops/export/search-snapshot",
    ],
    recoveryChecklist: [
      "Export the manifest before environment or storage changes.",
      "Export the content bundle before large publishing or taxonomy migrations.",
      "Keep the public inventory CSV with release notes for human review.",
      "Snapshot search before changing scoring or ingestion behavior.",
    ],
  };
}

export function buildContentBundle() {
  const topics = buildTopicRecords();
  const blogs = buildBlogRecords();
  const stories = buildStoryRecords();

  return {
    generatedAt: new Date().toISOString(),
    site: {
      name: siteConfig.name,
      owner: siteConfig.owner,
      ownerTitle: siteConfig.ownerTitle,
      description: siteConfig.description,
      baseUrl: siteConfig.baseUrl,
    },
    stats: {
      topics: topics.length,
      blogPosts: blogs.length,
      publicStories: getPublicStories().length,
      privateStories: getPrivateStories().length,
      allStories: getAllStories().length,
    },
    topics,
    blogPosts: blogs,
    stories,
  };
}

function escapeCsv(value: string | number | boolean | null | undefined) {
  const text = value == null ? "" : String(value);
  const escaped = text.replace(/"/g, '""');
  return /[",\n]/.test(text) ? `"${escaped}"` : escaped;
}

export function buildPublicInventoryCsv() {
  const header = [
    "kind",
    "slug_or_id",
    "title",
    "summary",
    "href",
    "trail",
    "tags",
    "date_or_updated",
    "extra",
  ];

  const topicRows = buildTopicRecords().map((topic) => [
    "topic",
    topic.slug,
    topic.title,
    topic.summary,
    topic.href,
    topic.trail,
    topic.tags.join(" | "),
    "",
    `${topic.estimatedReadMinutes} min`,
  ]);

  const blogRows = buildBlogRecords().map((post) => [
    "blog",
    post.slug,
    post.title,
    post.summary,
    post.href,
    `${post.category} -> ${post.audience}`,
    post.tags.join(" | "),
    post.publishedAt,
    post.readTime,
  ]);

  const publicStoryRows = getPublicStories().map((story) => [
    "story",
    story.id,
    story.title,
    story.summary,
    buildStoryHref(story),
    `${story.collectionTitle} -> ${story.categoryLabel}`,
    story.tags.join(" | "),
    story.updatedAt,
    story.format.toUpperCase(),
  ]);

  return [header, ...topicRows, ...blogRows, ...publicStoryRows]
    .map((row) => row.map((cell) => escapeCsv(cell)).join(","))
    .join("\n");
}

export function buildSearchSnapshot() {
  const discovery = getSearchDiscovery();

  return {
    generatedAt: new Date().toISOString(),
    totals: discovery.totals,
    popularTags: discovery.popularTags,
    featuredTopics: discovery.featuredTopics,
    recentBlogPosts: discovery.recentBlogPosts,
    storyTrails: discovery.storyTrails,
    quickQuerySamples: buildQuickQuerySamples(),
  };
}

export function createJsonDownloadResponse(fileName: string, data: unknown) {
  return new NextResponse(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

export function createTextDownloadResponse(fileName: string, body: string, contentType: string) {
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
