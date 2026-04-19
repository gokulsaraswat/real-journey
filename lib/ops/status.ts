import { getAdminEmailAllowlist, hasConfiguredAdminAllowlist } from "@/lib/auth/admin";
import { getAllBlogPosts } from "@/lib/data/blog";
import { getAllDomains, getLearnOverviewStats } from "@/lib/data/learn";
import { getAllStories, getPrivateStories, getPublicStories } from "@/lib/data/stories";
import { siteConfig } from "@/lib/config/site";
import { getSearchDiscovery } from "@/lib/search/index";
import { defaultAdminUploadBucket, defaultPrivateStoryBucket } from "@/lib/storage/admin-uploads";
import { hasSupabaseServiceRoleEnv } from "@/lib/supabase/admin";

export type OpsStatusSnapshot = {
  generatedAt: string;
  deployment: {
    environment: string;
    baseUrl: string;
    analyticsEnabled: boolean;
    speedInsightsEnabled: boolean;
  };
  auth: {
    supabaseConfigured: boolean;
    serviceRoleConfigured: boolean;
    adminAllowlistConfigured: boolean;
    adminEmailsConfigured: number;
  };
  storage: {
    adminUploadBucket: string;
    privateStoryBucket: string;
    privateStoriesSeparated: boolean;
  };
  content: {
    domains: number;
    tracks: number;
    levels: number;
    categories: number;
    subcategories: number;
    topics: number;
    blogPosts: number;
    publicStories: number;
    privateStories: number;
    allStories: number;
    searchDocuments: number;
  };
  integrations: {
    githubRepoConfigured: boolean;
    feedbackEmailConfigured: boolean;
    feedbackReady: boolean;
    loaderGifPath: string;
  };
};

export function getOpsStatusSnapshot(): OpsStatusSnapshot {
  const learnStats = getLearnOverviewStats();
  const searchDiscovery = getSearchDiscovery();
  const adminEmails = getAdminEmailAllowlist();

  return {
    generatedAt: new Date().toISOString(),
    deployment: {
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
      baseUrl: siteConfig.baseUrl,
      analyticsEnabled: Boolean(siteConfig.observability.analyticsEnabled),
      speedInsightsEnabled: Boolean(siteConfig.observability.speedInsightsEnabled),
    },
    auth: {
      supabaseConfigured: Boolean(
        process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      ),
      serviceRoleConfigured: hasSupabaseServiceRoleEnv(),
      adminAllowlistConfigured: hasConfiguredAdminAllowlist(),
      adminEmailsConfigured: adminEmails.length,
    },
    storage: {
      adminUploadBucket: defaultAdminUploadBucket,
      privateStoryBucket: defaultPrivateStoryBucket,
      privateStoriesSeparated: defaultAdminUploadBucket !== defaultPrivateStoryBucket,
    },
    content: {
      domains: getAllDomains().length,
      tracks: learnStats.tracks,
      levels: learnStats.levels,
      categories: learnStats.categories,
      subcategories: learnStats.subcategories,
      topics: learnStats.topics,
      blogPosts: getAllBlogPosts().length,
      publicStories: getPublicStories().length,
      privateStories: getPrivateStories().length,
      allStories: getAllStories().length,
      searchDocuments: searchDiscovery.totals.all,
    },
    integrations: {
      githubRepoConfigured: Boolean(siteConfig.githubRepoUrl),
      feedbackEmailConfigured: Boolean(siteConfig.feedbackEmail),
      feedbackReady: Boolean(siteConfig.githubRepoUrl && siteConfig.feedbackEmail),
      loaderGifPath: siteConfig.loaderGifPath,
    },
  };
}
