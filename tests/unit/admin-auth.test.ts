import {
  getAdminEmailAllowlist,
  getLoginReasonCopy,
  hasConfiguredAdminAllowlist,
  isAdminEmail,
  isAdminUser,
  toSafeNextPath,
} from "@/lib/auth/admin";

const originalAdminAllowlist = process.env.ADMIN_EMAIL_ALLOWLIST;
const originalSupabaseAdminEmails = process.env.SUPABASE_ADMIN_EMAILS;

describe("admin auth helpers", () => {
  beforeEach(() => {
    delete process.env.ADMIN_EMAIL_ALLOWLIST;
    delete process.env.SUPABASE_ADMIN_EMAILS;
  });

  afterAll(() => {
    if (originalAdminAllowlist == null) {
      delete process.env.ADMIN_EMAIL_ALLOWLIST;
    } else {
      process.env.ADMIN_EMAIL_ALLOWLIST = originalAdminAllowlist;
    }

    if (originalSupabaseAdminEmails == null) {
      delete process.env.SUPABASE_ADMIN_EMAILS;
    } else {
      process.env.SUPABASE_ADMIN_EMAILS = originalSupabaseAdminEmails;
    }
  });

  it("normalizes admin emails from the allowlist", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "Admin@Example.com, second@example.com";

    expect(getAdminEmailAllowlist()).toEqual(["admin@example.com", "second@example.com"]);
    expect(hasConfiguredAdminAllowlist()).toBe(true);
  });

  it("falls back to SUPABASE_ADMIN_EMAILS when needed", () => {
    process.env.SUPABASE_ADMIN_EMAILS = "owner@example.com";

    expect(getAdminEmailAllowlist()).toEqual(["owner@example.com"]);
    expect(hasConfiguredAdminAllowlist()).toBe(true);
  });

  it("matches admins case-insensitively", () => {
    process.env.ADMIN_EMAIL_ALLOWLIST = "admin@example.com";

    expect(isAdminEmail("ADMIN@example.com")).toBe(true);
    expect(isAdminUser({ email: "Admin@example.com" } as never)).toBe(true);
    expect(isAdminEmail("reader@example.com")).toBe(false);
  });

  it("keeps redirect targets safe", () => {
    expect(toSafeNextPath("/admin/uploads")).toBe("/admin/uploads");
    expect(toSafeNextPath("https://evil.example/path")).toBe("/admin");
    expect(toSafeNextPath("//evil.example/path")).toBe("/admin");
    expect(toSafeNextPath(undefined, "/login")).toBe("/login");
  });

  it("maps known login reasons to helpful copy", () => {
    expect(getLoginReasonCopy("private-stories")).toMatch(/Private stories/i);
    expect(getLoginReasonCopy("missing-admin-config")).toMatch(/allowlist/i);
    expect(getLoginReasonCopy("unknown-reason")).toBeNull();
  });
});
