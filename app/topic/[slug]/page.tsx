import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicReaderShell } from "@/components/reader/topic-reader-shell";
import {
  getSubcategoryHref,
  getTopicBySlug,
  getTopicContextBySlug,
  getTopicDownloadFileName,
  getTopicParams,
} from "@/lib/data/learn";
import {
  getTopicReaderDocument,
  getTopicReaderOutline,
  getTopicReaderSiblings,
} from "@/lib/data/topic-reader";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTopicParams();
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  return {
    title: `${topic.title} Reader`,
    description: topic.summary,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topicContext = getTopicContextBySlug(slug);

  if (!topicContext) {
    notFound();
    return null;
  }

  const context = topicContext;
  const { domain, track, level, category, subcategory, topic } = context;
  const routeBackToShelf = getSubcategoryHref(domain, track, level, category, subcategory);
  const document = getTopicReaderDocument(context);
  const outline = getTopicReaderOutline(document);
  const siblings = getTopicReaderSiblings(context);

  return (
    <TopicReaderShell
      breadcrumbs={[
        { label: "Learn", href: "/learn" },
        { label: domain.title, href: `/learn/${domain.slug}` },
        { label: track.title, href: `/learn/${domain.slug}/${track.slug}` },
        { label: level.title, href: `/learn/${domain.slug}/${track.slug}/${level.slug}` },
        { label: category.title, href: `/learn/${domain.slug}/${track.slug}/${level.slug}/${category.slug}` },
        { label: subcategory.title, href: routeBackToShelf },
        { label: topic.title },
      ]}
      context={context}
      readerDocument={document}
      outline={outline}
      routeBackToShelf={routeBackToShelf}
      downloadHref={`/api/topic-download?slug=${topic.slug}`}
      sourceFileName={getTopicDownloadFileName(topic)}
      previousTopic={siblings.previous}
      nextTopic={siblings.next}
    />
  );
}
