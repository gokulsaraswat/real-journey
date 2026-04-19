import { ensureAdminApiAccess } from "@/lib/ops/api-auth";
import { buildContentBundle, createJsonDownloadResponse } from "@/lib/ops/exports";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await ensureAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  return createJsonDownloadResponse("real-journey-content-bundle.json", buildContentBundle());
}
