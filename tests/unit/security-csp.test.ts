import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "@/lib/security/csp";

describe("buildContentSecurityPolicy", () => {
  it("includes baseline hardening directives", () => {
    const csp = buildContentSecurityPolicy();

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("form-action 'self'");
  });
});
