import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import "./globals.css";
import { SkipLink } from "@/components/accessibility/skip-link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { VercelObservability } from "@/components/observability/vercel-observability";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { siteConfig } from "@/lib/config/site";

const themeScript = `(() => {
  try {
    const key = "real-journey-theme";
    const stored = window.localStorage.getItem(key);
    const theme = stored === "light" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  publisher: siteConfig.owner,
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"]
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.baseUrl,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.theme.light },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.theme.dark }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <Script id="real-journey-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <SiteJsonLd />
        <SkipLink />
        <div className="relative flex min-h-screen flex-col">
          <div className="pointer-events-none fixed inset-0 -z-10 grid-fade opacity-70" />
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <VercelObservability />
      </body>
    </html>
  );
}
