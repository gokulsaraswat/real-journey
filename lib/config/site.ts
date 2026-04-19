type NavigationItem = {
  label: string;
  href: string;
  hideInPrimaryNav?: boolean;
};

function parseBoolean(value: string | undefined, fallback = false) {
  if (value == null) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function parseNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseFloat(value ?? "");

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(0, Math.min(1, parsed));
}

const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? "hello@realjourney.dev";

export const siteConfig = {
  name: "Real Journey",
  shortName: "Real Journey",
  owner: "Gokul Saraswat",
  ownerTitle: "Engineer",
  description:
    "A portfolio-first learning platform for engineering growth, stories, blogs, and reader-friendly knowledge paths.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  githubRepoUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ?? "https://github.com/your-username/real-journey",
  feedbackEmail,
  feedbackEmailHref: `mailto:${feedbackEmail}`,
  loaderGifPath: "/loader/real-journey-loader.gif",
  keywords: [
    "real journey",
    "gokul saraswat",
    "engineering portfolio",
    "learning platform",
    "technical blog",
    "reader mode",
    "career progression",
    "cybersecurity",
    "artificial intelligence",
    "information technology"
  ],
  theme: {
    dark: "#0B1120",
    light: "#F8FAFC",
    accent: "#8B5CF6",
    accentSecondary: "#22D3EE"
  },
  observability: {
    analyticsEnabled: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS, false),
    speedInsightsEnabled: parseBoolean(process.env.NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS, false),
    speedInsightsSampleRate: parseNumber(process.env.NEXT_PUBLIC_SPEED_INSIGHTS_SAMPLE_RATE, 1)
  },
  mainNav: [
    { label: "Learn", href: "/learn" },
    { label: "Search", href: "/search" },
    { label: "Blog", href: "/blog" },
    { label: "Stories", href: "/stories" },
    { label: "Contribute", href: "/contribute" },
    { label: "Admin", href: "/admin", hideInPrimaryNav: true }
  ] satisfies NavigationItem[]
};
