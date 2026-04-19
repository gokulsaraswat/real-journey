import { siteConfig } from "@/lib/config/site";

describe("siteConfig", () => {
  it("keeps branding stable", () => {
    expect(siteConfig.name).toBe("Real Journey");
    expect(siteConfig.owner).toBe("Gokul Saraswat");
    expect(siteConfig.ownerTitle).toBe("Engineer");
  });

  it("defines loader path and public navigation", () => {
    expect(siteConfig.loaderGifPath).toBe("/loader/real-journey-loader.gif");

    const labels = siteConfig.mainNav.map((item) => item.label);
    expect(labels).toEqual(
      expect.arrayContaining(["Learn", "Search", "Blog", "Stories", "Contribute"]),
    );
  });

  it("exposes theme colors for dark and light surfaces", () => {
    expect(siteConfig.theme.dark).toMatch(/^#/);
    expect(siteConfig.theme.light).toMatch(/^#/);
    expect(siteConfig.theme.accent).toMatch(/^#/);
    expect(siteConfig.theme.accentSecondary).toMatch(/^#/);
  });
});
