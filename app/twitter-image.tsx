import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const alt = `${siteConfig.name} social preview image`;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0B1120, #111827)",
          color: "white",
          padding: "42px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "32px",
            padding: "42px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "20px",
                color: "rgba(255,255,255,0.72)"
              }}
            >
              <div
                style={{
                  height: "56px",
                  width: "56px",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.08)",
                  fontWeight: 700
                }}
              >
                RJ
              </div>
              <div>{siteConfig.owner} · {siteConfig.ownerTitle}</div>
            </div>

            <div style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1.05, maxWidth: "920px" }}>
              Real Journey
            </div>

            <div style={{ fontSize: "30px", lineHeight: 1.35, maxWidth: "900px", color: "rgba(255,255,255,0.82)" }}>
              Portfolio-first learning paths, technical writing, and premium reader experiences in one engineering platform.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.72)",
              fontSize: "22px"
            }}
          >
            <div>Learn · Blog · Stories · Search</div>
            <div>{siteConfig.baseUrl.replace(/^https?:\/\//, "")}</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
