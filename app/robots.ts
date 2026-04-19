import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/learn/", "/stories/", "/topic/", "/contribute/"],
        disallow: ["/admin/", "/api/", "/auth/", "/login", "/search", "/stories/private/"]
      }
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl
  };
}
