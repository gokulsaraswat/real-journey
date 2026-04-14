const mdxTemplate = `---
title: HTTP Deep Dive
summary: Understand how an HTTP request moves through the browser, network, edge, and application layers.
domain: IT
track: job-ready engineer
level: Level 1
category: Core Computing
subcategory: HTTP Deep Dive
visibility: public
tags: http, networking, backend
---

# HTTP Deep Dive

## Why this matters

HTTP is the foundation for browser-to-server communication. Understanding it helps you debug latency, caching, APIs, and security behavior.

## Request lifecycle

1. The browser resolves the domain.
2. A connection is established.
3. The request is sent with headers and optional body.
4. The server returns status, headers, and body.

## Example

\`\`\`ts
await fetch("/api/health", {
  headers: {
    "x-real-journey": "reader",
  },
});
\`\`\`

## Key takeaways

- Know the request and response shape.
- Learn common status codes.
- Understand caching and security headers.
`;

const mdTemplate = `---
title: Java Memory Model Notes
summary: Core notes on heap, stack, references, and garbage collection.
domain: IT
track: job-ready engineer
level: Level 1
category: Core Computing
subcategory: Java Runtime Basics
visibility: public
---

# Java Memory Model Notes

## Heap and stack

Write your explanation here.

## Common interview traps

- Mutable shared state
- Escape analysis confusion
- Misreading reference behavior
`;

const txtTemplate = `Title: Linux Process Notes
Summary: Fast raw notes before converting to canonical MDX.
Domain: IT
Track: job-ready engineer
Level: Level 1
Category: Core Computing
Subcategory: Operating Systems
Visibility: public

Linux Process Notes

Lifecycle:
- create
- schedule
- block
- resume
- exit

Questions:
- What changes between process and thread isolation?
- Which metrics show CPU pressure?
`;

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>System Design Primer</title>
    <meta
      name="description"
      content="Starter HTML content that can be normalized into a clean reader page."
    />
  </head>
  <body>
    <article>
      <h1>System Design Primer</h1>
      <h2>Why this matters</h2>
      <p>Use semantic headings and clean text if you plan to import HTML into Real Journey.</p>
      <h2>Checklist</h2>
      <ul>
        <li>Use one clear H1.</li>
        <li>Keep sections readable.</li>
        <li>Avoid inline scripts unless truly required.</li>
      </ul>
    </article>
  </body>
</html>
`;

export const uploadTemplates = {
  mdx: {
    body: mdxTemplate,
    filename: "real-journey-template.mdx",
    contentType: "text/plain; charset=utf-8",
  },
  md: {
    body: mdTemplate,
    filename: "real-journey-template.md",
    contentType: "text/plain; charset=utf-8",
  },
  txt: {
    body: txtTemplate,
    filename: "real-journey-template.txt",
    contentType: "text/plain; charset=utf-8",
  },
  html: {
    body: htmlTemplate,
    filename: "real-journey-template.html",
    contentType: "text/html; charset=utf-8",
  },
} as const;

export type UploadTemplateFormat = keyof typeof uploadTemplates;

export function isUploadTemplateFormat(value: string): value is UploadTemplateFormat {
  return value === "mdx" || value === "md" || value === "txt" || value === "html";
}
