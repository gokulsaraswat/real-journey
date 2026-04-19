import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/data/blog";
import {
  getCategoryHref,
  getCategoryParams,
  getDomainHref,
  getDomainParams,
  getLevelHref,
  getLevelParams,
  getSubcategoryHref,
  getSubcategoryParams,
  getTopicHref,
  getTopicParams,
  getTrackHref,
  getTrackParams
} from "@/lib/data/learn";
import { buildStoryHref, getPublicStories, getStoryCollectionSummaries } from "@/lib/data/stories";
import { siteConfig } from "@/lib/config/site";

function buildUrl(pathname: string) {
  return `${siteConfig.baseUrl}${pathname}`;
}

function staticEntry(pathname: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  return {
    url: buildUrl(pathname),
    lastModified: new Date(),
    changeFrequency,
    priority
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    staticEntry("/", 1, "weekly"),
    staticEntry("/blog", 0.8, "weekly"),
    staticEntry("/learn", 0.9, "weekly"),
    staticEntry("/stories", 0.8, "weekly"),
    staticEntry("/contribute", 0.6, "monthly"),
    staticEntry("/accessibility", 0.5, "monthly")
  ];

  const domainRoutes = getDomainParams().map(({ domain }) => ({
    url: buildUrl(getDomainHref(domain)),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  const trackRoutes = getTrackParams().map(({ domain, track }) => ({
    url: buildUrl(getTrackHref(domain, track)),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.82
  }));

  const levelRoutes = getLevelParams().map(({ domain, track, level }) => ({
    url: buildUrl(getLevelHref(domain, track, level)),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const categoryRoutes = getCategoryParams().map(({ domain, track, level, category }) => ({
    url: buildUrl(getCategoryHref(domain, track, level, category)),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.76
  }));

  const subcategoryRoutes = getSubcategoryParams().map(
    ({ domain, track, level, category, subcategory }) => ({
      url: buildUrl(getSubcategoryHref(domain, track, level, category, subcategory)),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.72
    })
  );

  const topicRoutes = getTopicParams().map(({ slug }) => ({
    url: buildUrl(getTopicHref(slug)),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.74
  }));

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: buildUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.78 : 0.72
  }));

  const publicStoryCollectionRoutes = getStoryCollectionSummaries("public").map((collection) => ({
    url: buildUrl(collection.href),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.66
  }));

  const publicStoryRoutes = getPublicStories().map((story) => ({
    url: buildUrl(buildStoryHref(story)),
    lastModified: new Date(story.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...domainRoutes,
    ...trackRoutes,
    ...levelRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...topicRoutes,
    ...blogRoutes,
    ...publicStoryCollectionRoutes,
    ...publicStoryRoutes
  ];
}
