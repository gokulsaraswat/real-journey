import Link from "next/link";
import type { StoryCollectionSummary, StoryEntry } from "@/lib/data/stories";
import { buildStoryHref, formatStoryDate } from "@/lib/data/stories";

type StoriesVaultManagerProps = {
  publicCollections: StoryCollectionSummary[];
  privateCollections: StoryCollectionSummary[];
  publicStories: StoryEntry[];
  privateStories: StoryEntry[];
};

function CollectionPanel({
  title,
  collections,
}: {
  title: string;
  collections: StoryCollectionSummary[];
}) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="section-eyebrow">{title}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{collections.length} active collections</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {collections.map((collection) => (
          <div key={collection.id} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip-subtle">{collection.visibility}</span>
              <span className="chip-subtle">{collection.count} entries</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{collection.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{collection.summary}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              {collection.status}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {collection.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--foreground-soft)]"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryTable({ title, stories }: { title: string; stories: StoryEntry[] }) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <p className="section-eyebrow">{title}</p>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
          <thead>
            <tr className="text-[var(--foreground-soft)]">
              <th className="pb-1 font-medium">Story</th>
              <th className="pb-1 font-medium">Collection</th>
              <th className="pb-1 font-medium">Assets</th>
              <th className="pb-1 font-medium">Updated</th>
              <th className="pb-1 font-medium">Open</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="rounded-3xl bg-[var(--card-strong)]">
                <td className="rounded-l-3xl border-y border-l border-[color:var(--card-border)] px-4 py-4 align-top">
                  <p className="font-semibold">{story.title}</p>
                  <p className="mt-2 max-w-md text-xs leading-6 text-[var(--foreground-soft)]">{story.summary}</p>
                </td>
                <td className="border-y border-[color:var(--card-border)] px-4 py-4 align-top text-[var(--foreground-soft)]">
                  {story.collectionTitle}
                </td>
                <td className="border-y border-[color:var(--card-border)] px-4 py-4 align-top text-[var(--foreground-soft)]">
                  {story.assetCount}
                </td>
                <td className="border-y border-[color:var(--card-border)] px-4 py-4 align-top text-[var(--foreground-soft)]">
                  {formatStoryDate(story.updatedAt)}
                </td>
                <td className="rounded-r-3xl border-y border-r border-[color:var(--card-border)] px-4 py-4 align-top">
                  <Link href={buildStoryHref(story)} className="btn-secondary">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StoriesVaultManager({
  publicCollections,
  privateCollections,
  publicStories,
  privateStories,
}: StoriesVaultManagerProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-surface p-6">
          <p className="section-eyebrow">Public stories</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{publicStories.length}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
            Portfolio-ready story pages and downloadable study assets visible on the public site.
          </p>
        </div>
        <div className="card-surface p-6">
          <p className="section-eyebrow">Private stories</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{privateStories.length}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
            Admin-only notes, interview files, code packs, and personal study materials.
          </p>
        </div>
        <div className="card-surface p-6">
          <p className="section-eyebrow">Separation rule</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">2 lanes</p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
            Public stories build trust and proof. Private stories stay protected and can later feed the public curriculum when cleaned up.
          </p>
        </div>
      </div>

      <CollectionPanel title="Public collection map" collections={publicCollections} />
      <CollectionPanel title="Private collection map" collections={privateCollections} />
      <StoryTable title="Public story inventory" stories={publicStories} />
      <StoryTable title="Private story inventory" stories={privateStories} />
    </div>
  );
}
