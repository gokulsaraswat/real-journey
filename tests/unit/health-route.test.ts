import { GET, HEAD } from "@/app/api/health/route";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const originalFeedbackEmail = process.env.NEXT_PUBLIC_FEEDBACK_EMAIL;
const originalGithubRepoUrl = process.env.NEXT_PUBLIC_GITHUB_REPO_URL;

describe("health route", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_FEEDBACK_EMAIL;
    delete process.env.NEXT_PUBLIC_GITHUB_REPO_URL;
  });

  afterAll(() => {
    if (originalSiteUrl == null) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }

    if (originalFeedbackEmail == null) {
      delete process.env.NEXT_PUBLIC_FEEDBACK_EMAIL;
    } else {
      process.env.NEXT_PUBLIC_FEEDBACK_EMAIL = originalFeedbackEmail;
    }

    if (originalGithubRepoUrl == null) {
      delete process.env.NEXT_PUBLIC_GITHUB_REPO_URL;
    } else {
      process.env.NEXT_PUBLIC_GITHUB_REPO_URL = originalGithubRepoUrl;
    }
  });

  it("returns a healthy JSON payload with dynamic checks", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";

    const response = GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.status).toBe("ok");
    expect(payload.service).toBe("Real Journey");
    expect(payload.owner).toBe("Gokul Saraswat");
    expect(payload.checks.siteUrlConfigured).toBe(true);
    expect(payload.checks.feedbackEmailConfigured).toBe(false);
    expect(payload.checks.githubRepoConfigured).toBe(false);
    expect(typeof payload.timestamp).toBe("string");
  });

  it("supports HEAD requests", () => {
    const response = HEAD();
    expect(response.status).toBe(200);
  });
});
