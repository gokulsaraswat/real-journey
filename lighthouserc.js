module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run dev -- --hostname 127.0.0.1 --port 3000",
      startServerReadyPattern: "Local:",
      startServerReadyTimeout: 120000,
      numberOfRuns: 1,
      url: [
        "http://127.0.0.1:3000/",
        "http://127.0.0.1:3000/blog",
        "http://127.0.0.1:3000/search?q=http",
        "http://127.0.0.1:3000/topic/http-request-lifecycle",
      ],
      settings: {
        chromeFlags: "--no-sandbox",
      },
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.85 }],
        "categories:performance": ["warn", { minScore: 0.75 }],
        "categories:seo": ["warn", { minScore: 0.85 }],
        "color-contrast": "error",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
