"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import { publishDraftStorageKey } from "@/lib/publish/constants";
import type {
  PublishDraftSeed,
  PublishPacketResponse,
  PublishStage,
} from "@/lib/publish/workflow";
import type {
  UploadDestinationKind,
  UploadSourceFormat,
  UploadVisibility,
} from "@/lib/uploads/parser";

const stageOptions: PublishStage[] = ["draft", "review", "scheduled", "published"];
const destinationOptions: UploadDestinationKind[] = ["guide", "blog", "story", "reference"];
const visibilityOptions: UploadVisibility[] = ["public", "private", "mixed"];
const sourceFormatOptions: UploadSourceFormat[] = ["mdx", "md", "txt", "html", "pdf", "docx"];

type PublishFormState = PublishDraftSeed & {
  authorName: string;
  downloadable: boolean;
  stage: PublishStage;
  publishAt: string;
  tags: string;
};

type PublishPacketApiResponse = PublishPacketResponse & {
  error?: string;
};

const defaultDraft: PublishFormState = {
  title: "HTTP Deep Dive overview",
  slug: "http-deep-dive-overview",
  summary: "A canonical reader draft prepared for Git-based publishing.",
  canonicalBody: [
    "## Overview",
    "",
    "Start from the upload analysis or write the final canonical MDX body here.",
    "",
    "## Working notes",
    "",
    "Use this workspace to package clean content, metadata, and release notes before merge.",
  ].join("\n"),
  sourceFileName: "draft.mdx",
  sourceFormat: "mdx",
  destinationKind: "guide",
  visibility: "public",
  domain: "IT",
  track: "job-ready engineer",
  level: "Level 1",
  category: "Core Computing",
  subcategory: "HTTP Deep Dive",
  parserWarnings: [],
  normalizationNotes: [],
  authorName: siteConfig.owner,
  downloadable: true,
  stage: "review",
  publishAt: "",
  tags: "http, foundations",
};

export function PublishWorkflowStudio() {
  const router = useRouter();
  const [draft, setDraft] = useState<PublishFormState>(defaultDraft);
  const [packet, setPacket] = useState<PublishPacketResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [loadedFromUpload, setLoadedFromUpload] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.sessionStorage.getItem(publishDraftStorageKey);
    if (!raw) {
      return;
    }

    try {
      const seed = JSON.parse(raw) as Partial<PublishDraftSeed>;
      setDraft((current) => ({
        ...current,
        title: readString(seed.title, current.title),
        slug: readString(seed.slug, current.slug),
        summary: readString(seed.summary, current.summary),
        canonicalBody: readString(seed.canonicalBody, current.canonicalBody),
        sourceFileName: readString(seed.sourceFileName, current.sourceFileName),
        sourceFormat: readSourceFormat(seed.sourceFormat, current.sourceFormat),
        destinationKind: readDestinationKind(seed.destinationKind, current.destinationKind),
        visibility: readVisibility(seed.visibility, current.visibility),
        domain: readString(seed.domain, current.domain),
        track: readString(seed.track, current.track),
        level: readString(seed.level, current.level),
        category: readString(seed.category, current.category),
        subcategory: readString(seed.subcategory, current.subcategory),
        parserWarnings: Array.isArray(seed.parserWarnings)
          ? seed.parserWarnings.filter((entry): entry is string => typeof entry === "string")
          : current.parserWarnings,
        normalizationNotes: Array.isArray(seed.normalizationNotes)
          ? seed.normalizationNotes.filter((entry): entry is string => typeof entry === "string")
          : current.normalizationNotes,
      }));
      setLoadedFromUpload(true);
    } catch {
      setLoadedFromUpload(false);
    }
  }, []);

  const publishPath = useMemo(
    () => [draft.domain, draft.track, draft.level, draft.category, draft.subcategory]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(" / "),
    [draft.category, draft.domain, draft.level, draft.subcategory, draft.track],
  );

  function updateDraft<Key extends keyof PublishFormState>(key: Key, value: PublishFormState[Key]) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setCopiedKey(null);

    try {
      const response = await fetch("/api/publish-packet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: draft.title,
          slug: draft.slug,
          summary: draft.summary,
          canonicalBody: draft.canonicalBody,
          sourceFileName: draft.sourceFileName,
          sourceFormat: draft.sourceFormat,
          destinationKind: draft.destinationKind,
          visibility: draft.visibility,
          domain: draft.domain,
          track: draft.track,
          level: draft.level,
          category: draft.category,
          subcategory: draft.subcategory,
          parserWarnings: draft.parserWarnings,
          normalizationNotes: draft.normalizationNotes,
          tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
          authorName: draft.authorName,
          downloadable: draft.downloadable,
          stage: draft.stage,
          publishAt: draft.publishAt,
        }),
      });

      const payload = (await response.json()) as PublishPacketApiResponse;

      if (!response.ok || !payload.packet || !payload.outputs) {
        setPacket(null);
        setStatus("error");
        setError(payload.error ?? "Unable to generate the publish packet right now.");
        return;
      }

      setPacket(payload);
      setStatus("success");
    } catch {
      setPacket(null);
      setStatus("error");
      setError("Network error while generating the publish packet.");
    }
  }

  function clearUploadHandoff() {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.removeItem(publishDraftStorageKey);
    setLoadedFromUpload(false);
  }

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
    } catch {
      setCopiedKey(null);
    }
  }

  function downloadFile(fileName: string, content: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="card-surface p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold">Publish workflow studio</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              Turn upload analysis into a Git-ready packet with canonical MDX, manifest metadata, and release notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/uploads")}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Back to uploads
            </button>
            {loadedFromUpload ? (
              <button
                type="button"
                onClick={clearUploadHandoff}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
              >
                Clear upload handoff
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Stat label="Source" value={`.${draft.sourceFormat}`} />
          <Stat label="Stage" value={draft.stage} />
          <Stat label="Visibility" value={draft.visibility} />
          <Stat label="Destination" value={draft.destinationKind} />
        </div>

        <div className="mt-6 rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
          <p className="text-sm font-semibold">Publish path</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{publishPath}</p>
          {loadedFromUpload ? (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Loaded from upload studio
            </p>
          ) : null}
        </div>

        <form className="mt-6 grid gap-6" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Title" className="md:col-span-2 xl:col-span-2">
              <input
                value={draft.title}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("title", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Slug">
              <input
                value={draft.slug}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("slug", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Author">
              <input
                value={draft.authorName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("authorName", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Summary" className="md:col-span-2 xl:col-span-4">
              <textarea
                value={draft.summary}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateDraft("summary", event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm leading-6 outline-none"
              />
            </Field>

            <Field label="Destination type">
              <select
                value={draft.destinationKind}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateDraft("destinationKind", event.target.value as UploadDestinationKind)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              >
                {destinationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Visibility">
              <select
                value={draft.visibility}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateDraft("visibility", event.target.value as UploadVisibility)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              >
                {visibilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Stage">
              <select
                value={draft.stage}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateDraft("stage", event.target.value as PublishStage)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              >
                {stageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Source format">
              <select
                value={draft.sourceFormat}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => updateDraft("sourceFormat", event.target.value as UploadSourceFormat)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              >
                {sourceFormatOptions.map((option) => (
                  <option key={option} value={option}>
                    .{option}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Source file name" className="md:col-span-2 xl:col-span-2">
              <input
                value={draft.sourceFileName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("sourceFileName", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Publish at" className="md:col-span-2 xl:col-span-2">
              <input
                type="datetime-local"
                value={draft.publishAt}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("publishAt", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Domain">
              <input
                value={draft.domain}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("domain", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Track">
              <input
                value={draft.track}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("track", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Level">
              <input
                value={draft.level}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("level", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Category">
              <input
                value={draft.category}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("category", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Subcategory" className="md:col-span-2 xl:col-span-2">
              <input
                value={draft.subcategory}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("subcategory", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>

            <Field label="Tags" className="md:col-span-2 xl:col-span-2">
              <input
                value={draft.tags}
                onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("tags", event.target.value)}
                className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm outline-none"
              />
            </Field>
          </div>

          <label className="flex items-center gap-3 rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-4 text-sm leading-6 text-[var(--foreground-soft)]">
            <input
              type="checkbox"
              checked={draft.downloadable}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateDraft("downloadable", event.target.checked)}
              className="h-4 w-4"
            />
            Keep the original source attached as a downloadable file.
          </label>

          <Field label="Canonical MDX body">
            <textarea
              value={draft.canonicalBody}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateDraft("canonicalBody", event.target.value)}
              rows={14}
              className="w-full rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm leading-7 outline-none"
            />
          </Field>

          {draft.parserWarnings.length ? (
            <Card title="Parser warnings carried from upload analysis">
              <div className="grid gap-3">
                {draft.parserWarnings.map((warning) => (
                  <div
                    key={warning}
                    className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-100 dark:text-amber-50"
                  >
                    {warning}
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {draft.normalizationNotes.length ? (
            <Card title="Normalization notes carried from upload analysis">
              <div className="grid gap-3">
                {draft.normalizationNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm leading-6 text-[var(--foreground-soft)]"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {error ? (
            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200 dark:text-red-100">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Generating packet..." : "Generate publish packet"}
            </button>
            <button
              type="button"
              onClick={() => copyText(draft.slug, "slug")}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              {copiedKey === "slug" ? "Slug copied" : "Copy slug"}
            </button>
          </div>
        </form>
      </div>

      {packet ? (
        <div className="card-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">Generated publish packet</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                Download the files, create the suggested branch, and commit the content package into Git.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copyText(packet.packet.branchSuggestion, "branch")}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
              >
                {copiedKey === "branch" ? "Branch copied" : "Copy branch"}
              </button>
              <button
                type="button"
                onClick={() => copyText(packet.packet.commitSuggestion, "commit")}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
              >
                {copiedKey === "commit" ? "Commit copied" : "Copy commit"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Stat label="Route" value={packet.packet.routePath} />
            <Stat label="Branch" value={packet.packet.branchSuggestion} />
            <Stat label="Content file" value={packet.packet.contentFilePath} />
            <Stat label="Issue title" value={packet.packet.issueTitle} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => downloadFile(packet.outputs.canonicalMdxFileName, packet.outputs.canonicalMdx, "text/markdown;charset=utf-8")}
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
            >
              Download MDX
            </button>
            <button
              type="button"
              onClick={() => downloadFile(packet.outputs.manifestFileName, packet.outputs.manifestJson, "application/json;charset=utf-8")}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Download manifest
            </button>
            <button
              type="button"
              onClick={() => downloadFile(packet.outputs.releaseNotesFileName, packet.outputs.releaseNotes, "text/markdown;charset=utf-8")}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Download release notes
            </button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-6">
              <Card title="Manifest preview">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-[var(--foreground-soft)]">
                  {packet.outputs.manifestJson}
                </pre>
              </Card>
              <Card title="Release notes preview">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-[var(--foreground-soft)]">
                  {packet.outputs.releaseNotes}
                </pre>
              </Card>
            </div>
            <div>
              <Card title="Canonical MDX preview">
                <pre className="whitespace-pre-wrap text-sm leading-7 text-[var(--foreground-soft)]">
                  {packet.outputs.canonicalMdx}
                </pre>
              </Card>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function readString(value: string | undefined, fallback: string): string {
  const normalized = String(value ?? "").trim();
  return normalized.length > 0 ? normalized : fallback;
}

function readDestinationKind(
  value: UploadDestinationKind | undefined,
  fallback: UploadDestinationKind,
): UploadDestinationKind {
  return value === "guide" || value === "blog" || value === "story" || value === "reference"
    ? value
    : fallback;
}

function readVisibility(value: UploadVisibility | undefined, fallback: UploadVisibility): UploadVisibility {
  return value === "public" || value === "private" || value === "mixed" ? value : fallback;
}

function readSourceFormat(
  value: UploadSourceFormat | undefined,
  fallback: UploadSourceFormat,
): UploadSourceFormat {
  return value === "md" || value === "mdx" || value === "txt" || value === "html" || value === "pdf" || value === "docx"
    ? value
    : fallback;
}

function Field({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <label className={`grid gap-2 ${className}`.trim()}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">{label}</p>
      <p className="mt-3 break-words text-base font-semibold">{value}</p>
    </div>
  );
}

function Card({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
