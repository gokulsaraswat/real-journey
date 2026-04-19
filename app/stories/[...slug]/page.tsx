import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryCollectionShell } from "@/components/stories/story-collection-shell";
import { StoryReaderShell } from "@/components/stories/story-reader-shell";
import {
  getPublicStories,
  getStoriesByPrefix,
  getStoryBySegments,
} from "@/lib/data/stories";

type StoryPageProps = {
  params: Promise<{ slug: string[] }>;
};

function getStaticStoryParams() {
  const params = new Map<string, { slug: string[] }>();

  getPublicStories().forEach((story) => {
    for (let index = 1; index <= story.slugSegments.length; index += 1) {
      const slug = story.slugSegments.slice(0, index);
      params.set(slug.join("/"), { slug });
    }
  });

  return Array.from(params.values());
}

export function generateStaticParams() {
  return getStaticStoryParams();
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySegments(slug, "public");

  if (story) {
    return {
      title: story.title,
      description: story.summary,
      openGraph: {
        title: story.title,
        description: story.summary,
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: story.title,
        description: story.summary,
      },
    };
  }

  const matches = getStoriesByPrefix(slug, "public");
  if (!matches.length) {
    return {
      title: "Story not found",
    };
  }

  const firstStory = matches[0];
  return {
    title: `${firstStory.collectionTitle} | Stories`,
    description: firstStory.collectionSummary,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySegments(slug, "public");

  if (story) {
    return <StoryReaderShell story={story} />;
  }

  const matches = getStoriesByPrefix(slug, "public");
  if (!matches.length) {
    notFound();
  }

  return <StoryCollectionShell stories={matches} visibility="public" segments={slug} />;
}
