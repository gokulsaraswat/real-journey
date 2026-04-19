import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryCollectionShell } from "@/components/stories/story-collection-shell";
import { StoryReaderShell } from "@/components/stories/story-reader-shell";
import {
  getPrivateStories,
  getStoriesByPrefix,
  getStoryBySegments,
} from "@/lib/data/stories";

type PrivateStoryPageProps = {
  params: Promise<{ slug: string[] }>;
};

function getStaticStoryParams() {
  const params = new Map<string, { slug: string[] }>();

  getPrivateStories().forEach((story) => {
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

export async function generateMetadata({ params }: PrivateStoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySegments(slug, "private");

  if (story) {
    return {
      title: `${story.title} | Private Stories`,
      description: story.summary,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const matches = getStoriesByPrefix(slug, "private");
  if (!matches.length) {
    return {
      title: "Private story not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const firstStory = matches[0];
  return {
    title: `${firstStory.collectionTitle} | Private Stories`,
    description: firstStory.collectionSummary,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PrivateStoryPage({ params }: PrivateStoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySegments(slug, "private");

  if (story) {
    return <StoryReaderShell story={story} />;
  }

  const matches = getStoriesByPrefix(slug, "private");
  if (!matches.length) {
    notFound();
  }

  return <StoryCollectionShell stories={matches} visibility="private" segments={slug} />;
}
