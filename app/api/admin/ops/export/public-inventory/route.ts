import { ensureAdminApiAccess } from "@/lib/ops/api-auth";
import { buildPublicInventoryCsv, createTextDownloadResponse } from "@/lib/ops/exports";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await ensureAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  return createTextDownloadResponse(
    "real-journey-public-inventory.csv",
    buildPublicInventoryCsv(),
    "text/csv; charset=utf-8",
  );
}
