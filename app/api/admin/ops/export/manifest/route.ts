import { ensureAdminApiAccess } from "@/lib/ops/api-auth";
import { buildOpsManifest, createJsonDownloadResponse } from "@/lib/ops/exports";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await ensureAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  return createJsonDownloadResponse("real-journey-ops-manifest.json", buildOpsManifest());
}
