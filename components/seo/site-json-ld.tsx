import { getSiteJsonLd } from "@/lib/seo/site-schema";

export function SiteJsonLd() {
  const payloads = getSiteJsonLd();

  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={`site-json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(payload).replace(/</g, "\\u003c")
          }}
        />
      ))}
    </>
  );
}
