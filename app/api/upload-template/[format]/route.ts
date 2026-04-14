import { isUploadTemplateFormat, uploadTemplates } from "@/lib/uploads/templates";

type RouteContext = {
  params: Promise<{
    format: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { format } = await params;

  if (!isUploadTemplateFormat(format)) {
    return Response.json({ error: "Template not found." }, { status: 404 });
  }

  const template = uploadTemplates[format];

  return new Response(template.body, {
    headers: {
      "Content-Type": template.contentType,
      "Content-Disposition": `attachment; filename="${template.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
