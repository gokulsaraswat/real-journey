export type ContentSourceType = "md" | "mdx" | "txt" | "html" | "pdf" | "docx";
export type ContentKind = "topic" | "blog" | "story" | "resource";
export type ContentVisibility = "public" | "private" | "mixed";

export interface Domain {
  id: string;
  slug: string;
  title: string;
  summary: string;
}

export interface Track {
  id: string;
  domainId: string;
  slug: string;
  title: string;
  summary: string;
}

export interface Level {
  id: string;
  trackId: string;
  slug: string;
  title: string;
  summary: string;
  order: number;
}

export interface Category {
  id: string;
  levelId: string;
  slug: string;
  title: string;
  summary: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  summary: string;
}

export interface Topic {
  id: string;
  subcategoryId: string;
  slug: string;
  title: string;
  summary: string;
  estimatedReadMinutes?: number;
  tags: string[];
}

export interface ContentAsset {
  id: string;
  kind: ContentKind;
  visibility: ContentVisibility;
  sourceType: ContentSourceType;
  title: string;
  slug: string;
  summary: string;
  bodyMdx?: string;
  originalFileUrl?: string;
  downloadable: boolean;
  authorName?: string;
  domainId?: string;
  trackId?: string;
  levelId?: string;
  categoryId?: string;
  subcategoryId?: string;
  topicId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export const defaultEngineeringLevels = [
  "job-ready engineer",
  "senior engineer",
  "architect",
  "engineering manager / product-minded leader",
  "CTO / founder-level systems thinking",
] as const;
