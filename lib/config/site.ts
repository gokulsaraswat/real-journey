type NavigationItem = {
  label: string;
  href: string;
  hideInPrimaryNav?: boolean;
};

const feedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL ?? "hello@realjourney.dev";

export const siteConfig = {
  name: "Real Journey",
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
  mainNav: [
    { label: "Learn", href: "/learn" },
    { label: "Blog", href: "/blog" },
    { label: "Stories", href: "/stories" },
    { label: "Contribute", href: "/contribute" },
    { label: "Admin", href: "/admin", hideInPrimaryNav: true },
  ] satisfies NavigationItem[],
};
