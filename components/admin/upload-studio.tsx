"use client";

import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
  ReactNode,
} from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadPersistencePanel } from "@/components/admin/upload-persistence-panel";
import { publishDraftStorageKey } from "@/lib/publish/constants";
import type { PublishDraftSeed } from "@/lib/publish/workflow";
import type { UploadAnalysis, UploadDestinationKind, UploadVisibility } from "@/lib/uploads/parser";

const acceptedExtensions = ".md,.mdx,.txt,.html,.pdf,.docx";

const destinationOptions: UploadDestinationKind[] = ["guide", "blog", "story", "reference"];
const visibilityOptions: UploadVisibility[] = ["public", "private", "mixed"];

const defaultDraft = {
  destinationKind: "guide" as UploadDestinationKind,
  visibility: "public" as UploadVisibility,
  domain: "IT",
  track: "job-ready engineer",
  level: "Level 1",
  category: "Core Computing",
  subcategory: "HTTP Deep Dive",
};

type UploadFormDraft = typeof defaultDraft;

type UploadStudioResponse = {
  analysis?: UploadAnalysis;
  error?: string;
};

export function UploadStudio() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [draft, setDraft] = useState<UploadFormDraft>(defaultDraft);
  const [analysis, setAnalysis] = useState<UploadAnalysis | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const draftPath = useMemo(
    () => [draft.domain, draft.track, draft.level, draft.category, draft.subcategory]
      .map((value) => value.trim())
      .filter(Boolean)
      .join(" / "),
    [draft.category, draft.domain, draft.level, draft.subcategory, draft.track],
  );

  function updateDraft<Key extends keyof UploadFormDraft>(key: Key, value: UploadFormDraft[Key]) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleFileSelection(nextFile: File | null) {
    setFile(nextFile);
    setAnalysis(null);
    setError(null);
    setCopied(false);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFileSelection(event.target.files?.[0] ?? null);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
    handleFileSelection(event.dataTransfer.files?.[0] ?? null);
  }

  function onDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Choose a file first.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);
    setCopied(false);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("destinationKind", draft.destinationKind);
    formData.set("visibility", draft.visibility);
    formData.set("domain", draft.domain);
    formData.set("track", draft.track);
    formData.set("level", draft.level);
    formData.set("category", draft.category);
    formData.set("subcategory", draft.subcategory);

    try {
      const response = await fetch("/api/upload-analyze", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as UploadStudioResponse;

      if (!response.ok || !payload.analysis) {
        setStatus("error");
        setError(payload.error ?? "Unable to analyze that file right now.");
        setAnalysis(null);
        return;
      }

      setAnalysis(payload.analysis);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error while analyzing the upload.");
      setAnalysis(null);
    }
  }

  async function copySlug() {
    if (!analysis) {
      return;
    }

    try {
      await navigator.clipboard.writeText(analysis.slug);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }


  function sendToPublishWorkflow() {
    if (!analysis || typeof window === "undefined") {
      return;
    }

    const seed: PublishDraftSeed = {
      title: analysis.title,
      slug: analysis.slug,
      summary: analysis.summary,
      canonicalBody: analysis.canonicalBody,
      sourceFileName: analysis.fileName,
      sourceFormat: analysis.sourceFormat,
      destinationKind: analysis.destinationKind,
      visibility: analysis.visibility,
      domain: analysis.domain,
      track: analysis.track,
      level: analysis.level,
      category: analysis.category,
      subcategory: analysis.subcategory,
      parserWarnings: analysis.parserWarnings,
      normalizationNotes: analysis.normalizationNotes,
    };

    window.sessionStorage.setItem(publishDraftStorageKey, JSON.stringify(seed));
    router.push("/admin/publish");
  }

  const recommendedTemplateHref = analysis
    ? analysis.sourceFormat === "html"
      ? "/api/upload-template/html"
      : analysis.sourceFormat === "txt"
        ? "/api/upload-template/txt"
        : analysis.sourceFormat === "md"
          ? "/api/upload-template/md"
          : "/api/upload-template/mdx"
    : "/api/upload-template/mdx";

  return (
    <div className="space-y-6">
      <div className="card-surface p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold">Upload studio</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              This branch parses MD, MDX, TXT, HTML, PDF, and DOCX into one clean metadata draft. PDF and DOCX now run through dedicated binary parsers before you normalize to MDX.
            </p>
          </div>
          <Link
            href="/api/upload-template/mdx"
            className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
          >
            Download MDX template
          </Link>
        </div>

        <form className="mt-6 grid gap-6" onSubmit={onSubmit}>
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed px-6 py-10 text-center transition ${
              dragActive
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[color:var(--card-border)] bg-[var(--card-strong)] hover:-translate-y-0.5"
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
              Drop or browse
            </span>
            <p className="mt-4 text-lg font-semibold">Add one source file</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-soft)]">
              Accepted in this branch: .md, .mdx, .txt, .html, .pdf, .docx. PDF and DOCX stay attached as original downloads while you review the extracted reader draft.
            </p>
            <input type="file" accept={acceptedExtensions} className="hidden" onChange={onInputChange} />
          </label>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          </div>

          <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
            <p className="text-sm font-semibold">Planned destination</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{draftPath}</p>
          </div>

          {file ? (
            <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold">{file.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                    {(file.size / 1024).toFixed(1)} KB • {file.type || "unknown mime type"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleFileSelection(null)}
                  className="rounded-full border border-[color:var(--card-border)] px-4 py-2 text-sm font-medium"
                >
                  Clear file
                </button>
              </div>
            </div>
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
              {status === "submitting" ? "Analyzing upload..." : "Analyze upload"}
            </button>
            <a
              href={recommendedTemplateHref}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Download matching template
            </a>
          </div>
        </form>
      </div>

      {analysis ? (
        <div className="card-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">Normalization preview</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                Review the suggested metadata, then send it straight into the publish workflow for a Git-ready content packet.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copySlug}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
              >
                {copied ? "Slug copied" : "Copy slug"}
              </button>
              <button
                type="button"
                onClick={sendToPublishWorkflow}
                className="inline-flex rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
              >
                Send to publish workflow
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Stat label="Title" value={analysis.title} />
            <Stat label="Slug" value={analysis.slug} />
            <Stat label="Read time" value={`${analysis.estimatedReadTime} min`} />
            <Stat label="Word count" value={String(analysis.wordCount)} />
            <Stat label="Parser" value={analysis.parserEngine ?? "native text"} />
          </div>

          {file ? <UploadPersistencePanel analysis={analysis} file={file} /> : null}

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Publish mapping</p>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--foreground-soft)]">
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">Type:</span> {analysis.destinationKind}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">Visibility:</span> {analysis.visibility}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">Path:</span> {analysis.destinationPath}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">Canonical output:</span> .{analysis.suggestedCanonicalFormat}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Normalization notes</p>
                <div className="mt-4 grid gap-3">
                  {analysis.normalizationNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm leading-6 text-[var(--foreground-soft)]"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Parser output</p>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--foreground-soft)]">
                  <p>
                    <span className="font-semibold text-[var(--foreground)]">Engine:</span> {analysis.parserEngine ?? "native text analyzer"}
                  </p>
                  {analysis.parserWarnings.length ? (
                    analysis.parserWarnings.map((warning) => (
                      <div
                        key={warning}
                        className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-amber-100 dark:text-amber-50"
                      >
                        {warning}
                      </div>
                    ))
                  ) : (
                    <p>No parser warnings detected for this file.</p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Extracted frontmatter</p>
                {Object.keys(analysis.frontmatter).length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(analysis.frontmatter).map(([key, value]) => (
                      <span
                        key={key}
                        className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs font-medium text-[var(--foreground-soft)]"
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                    No frontmatter detected in this file.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Summary</p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{analysis.summary}</p>
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Outline preview</p>
                {analysis.headings.length ? (
                  <div className="mt-4 grid gap-3">
                    {analysis.headings.map((heading) => (
                      <div
                        key={`${heading.level}-${heading.anchor}`}
                        className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm"
                      >
                        <span className="text-[var(--foreground-soft)]">H{heading.level}</span> {heading.text}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                    No headings found yet.
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Body preview</p>
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--foreground-soft)]">
                  {analysis.bodyPreview}
                </pre>
              </div>

              <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold">Canonical MDX draft</p>
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--foreground-soft)]">
                  {analysis.canonicalBody}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({
  children,
  className = "",
  label,
}: {
  children?: ReactNode;
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
      <p className="mt-3 text-base font-semibold">{value}</p>
    </div>
  );
}
