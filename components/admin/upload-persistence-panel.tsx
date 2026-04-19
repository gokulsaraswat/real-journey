"use client";

import { useState } from "react";
import type { UploadAnalysis } from "@/lib/uploads/parser";

type StoredUpload = {
  bucket: string;
  path: string;
  fileName: string;
  mimeType: string;
  bytes: number;
  savedAt: string;
};

type StorageUploadResponse = {
  stored?: StoredUpload;
  error?: string;
};

export function UploadPersistencePanel({
  analysis,
  file,
}: {
  analysis: UploadAnalysis;
  file: File;
}) {
  const [stored, setStored] = useState<StoredUpload | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function saveToStorage() {
    setStatus("saving");
    setError(null);
    setCopied(false);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("slug", analysis.slug);
    formData.set("title", analysis.title);
    formData.set("summary", analysis.summary);
    formData.set("visibility", analysis.visibility);
    formData.set("destinationKind", analysis.destinationKind);
    formData.set("domain", analysis.domain);
    formData.set("track", analysis.track);
    formData.set("level", analysis.level);
    formData.set("category", analysis.category);
    formData.set("subcategory", analysis.subcategory);

    try {
      const response = await fetch("/api/admin/storage-upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as StorageUploadResponse;

      if (!response.ok || !payload.stored) {
        setStatus("error");
        setError(payload.error ?? "Unable to save the source file to storage.");
        setStored(null);
        return;
      }

      setStored(payload.stored);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error while saving the source file.");
      setStored(null);
    }
  }

  async function copyPath() {
    if (!stored) {
      return;
    }

    try {
      await navigator.clipboard.writeText(`${stored.bucket}/${stored.path}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Source file persistence</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            Save the original upload to Supabase Storage before you move into the Git-ready publish packet.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveToStorage}
            disabled={status === "saving"}
            className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "saving" ? "Saving..." : stored ? "Save again" : "Save source file"}
          </button>
          {stored ? (
            <button
              type="button"
              onClick={copyPath}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
            >
              {copied ? "Path copied" : "Copy storage path"}
            </button>
          ) : null}
        </div>
      </div>

      {stored ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm leading-6 text-[var(--foreground-soft)]">
            <span className="font-semibold text-[var(--foreground)]">Bucket:</span> {stored.bucket}
          </div>
          <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm leading-6 text-[var(--foreground-soft)]">
            <span className="font-semibold text-[var(--foreground)]">Saved:</span> {new Date(stored.savedAt).toLocaleString()}
          </div>
          <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm leading-6 text-[var(--foreground-soft)] md:col-span-2">
            <span className="font-semibold text-[var(--foreground)]">Path:</span> {stored.path}
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200 dark:text-red-100">
          {error}
        </div>
      ) : null}
    </div>
  );
}
