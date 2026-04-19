import { isUploadTemplateFormat, uploadTemplates } from "@/lib/uploads/templates";

describe("upload templates", () => {
  it("ships canonical templates for text-first imports", () => {
    expect(Object.keys(uploadTemplates)).toEqual(["mdx", "md", "txt", "html"]);
    expect(uploadTemplates.mdx.filename).toBe("real-journey-template.mdx");
    expect(uploadTemplates.mdx.body).toContain("HTTP Deep Dive");
    expect(uploadTemplates.html.body).toContain("<article>");
  });

  it("accepts supported template formats only", () => {
    expect(isUploadTemplateFormat("mdx")).toBe(true);
    expect(isUploadTemplateFormat("md")).toBe(true);
    expect(isUploadTemplateFormat("txt")).toBe(true);
    expect(isUploadTemplateFormat("html")).toBe(true);
    expect(isUploadTemplateFormat("pdf")).toBe(false);
  });
});
