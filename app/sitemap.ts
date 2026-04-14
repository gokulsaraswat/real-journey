import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

const routes = ["", "/blog", "/learn", "/stories", "/contribute", "/login"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
