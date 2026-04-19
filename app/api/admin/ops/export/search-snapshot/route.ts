import { ensureAdminApiAccess } from "@/lib/ops/api-auth";
import { buildSearchSnapshot, createJsonDownloadResponse } from "@/lib/ops/exports";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await ensureAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  return createJsonDownloadResponse("real-journey-search-snapshot.json", buildSearchSnapshot());
}
