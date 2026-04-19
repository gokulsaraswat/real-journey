import { siteConfig } from "@/lib/config/site";

type JsonLdPayload = Record<string, unknown>;

export function getSiteJsonLd(): JsonLdPayload[] {
  const person = {
    "@type": "Person",
    name: siteConfig.owner,
    jobTitle: siteConfig.ownerTitle,
    url: siteConfig.baseUrl
  } satisfies JsonLdPayload;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    description: siteConfig.description,
    publisher: person,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  } satisfies JsonLdPayload;

  const profile = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner,
    jobTitle: siteConfig.ownerTitle,
    url: siteConfig.baseUrl,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.baseUrl
    },
    knowsAbout: siteConfig.keywords
  } satisfies JsonLdPayload;

  return [website, profile];
}
