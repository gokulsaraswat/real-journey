import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const alt = `${siteConfig.name} preview image`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: siteConfig.theme.dark,
          color: "white",
          padding: "48px",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            padding: "48px",
            background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(34,211,238,0.12))"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}
            >
              <div
                style={{
                  height: "72px",
                  width: "72px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: "28px",
                  fontWeight: 700
                }}
              >
                RJ
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.72)"
                  }}
                >
                  {siteConfig.name}
                </div>
                <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.72)" }}>
                  {siteConfig.owner} · {siteConfig.ownerTitle}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "68px", fontWeight: 700, lineHeight: 1.06, maxWidth: "900px" }}>
              Premium portfolio, blog, and reader-first learning paths.
            </div>

            <div style={{ fontSize: "28px", lineHeight: 1.4, maxWidth: "860px", color: "rgba(255,255,255,0.82)" }}>
              Explore engineering growth through structured guides, public stories, blog notes, and deep topic pages.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "22px",
              color: "rgba(255,255,255,0.72)"
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <div>IT</div>
              <div>·</div>
              <div>AI</div>
              <div>·</div>
              <div>Cybersecurity</div>
            </div>
            <div>{siteConfig.baseUrl.replace(/^https?:\/\//, "")}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
