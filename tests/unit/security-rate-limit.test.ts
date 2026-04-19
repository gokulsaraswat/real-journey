import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyRateLimit } from "@/lib/security/rate-limit";

describe("applyRateLimit", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("allows calls until the configured limit is exhausted", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000);

    const first = applyRateLimit("feedback:127.0.0.1", {
      prefix: "test",
      limit: 2,
      windowMs: 1_000,
    });
    const second = applyRateLimit("feedback:127.0.0.1", {
      prefix: "test",
      limit: 2,
      windowMs: 1_000,
    });
    const third = applyRateLimit("feedback:127.0.0.1", {
      prefix: "test",
      limit: 2,
      windowMs: 1_000,
    });

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
    expect(third.ok).toBe(false);
    expect(third.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("resets after the time window passes", () => {
    vi.spyOn(Date, "now").mockReturnValue(5_000);
    applyRateLimit("upload:127.0.0.1", {
      prefix: "test-reset",
      limit: 1,
      windowMs: 1_000,
    });

    vi.spyOn(Date, "now").mockReturnValue(6_500);
    const reset = applyRateLimit("upload:127.0.0.1", {
      prefix: "test-reset",
      limit: 1,
      windowMs: 1_000,
    });

    expect(reset.ok).toBe(true);
    expect(reset.remaining).toBe(0);
  });
});
