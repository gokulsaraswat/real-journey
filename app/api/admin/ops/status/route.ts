import { NextResponse } from "next/server";
import { ensureAdminApiAccess } from "@/lib/ops/api-auth";
import { getOpsStatusSnapshot } from "@/lib/ops/status";

export const dynamic = "force-dynamic";

export async function GET() {
  const access = await ensureAdminApiAccess();
  if (!access.ok) {
    return access.response;
  }

  return NextResponse.json(getOpsStatusSnapshot(), {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}
