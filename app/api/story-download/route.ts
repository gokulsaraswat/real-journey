import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  getStoryBySegments,
  serializeStoryForDownload,
  type StoryVisibility,
} from "@/lib/data/stories";

function getVisibility(value: string | null): StoryVisibility {
  return value === "private" ? "private" : "public";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path");
  const visibility = getVisibility(searchParams.get("visibility"));

  if (!rawPath) {
    return NextResponse.json({ error: "Missing story path." }, { status: 400 });
  }

  const segments = rawPath
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const story = getStoryBySegments(segments, visibility);
  if (!story) {
    return NextResponse.json({ error: "Story not found." }, { status: 404 });
  }

  if (visibility === "private") {
    try {
      const supabase = await createServerSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isAdminUser(user)) {
        return NextResponse.json({ error: "Private story downloads require admin access." }, { status: 403 });
      }
    } catch {
      return NextResponse.json(
        { error: "Private story download requires Supabase auth configuration." },
        { status: 503 },
      );
    }
  }

  const body = serializeStoryForDownload(story);

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${story.downloadFileName}"`,
      "Cache-Control": visibility === "private" ? "private, no-store" : "public, max-age=0, must-revalidate",
    },
  });
}
