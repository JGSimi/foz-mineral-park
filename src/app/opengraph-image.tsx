import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#fff",
          fontFamily: "serif",
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(139,82,240,0.5) 0%, transparent 40%), radial-gradient(ellipse at 85% 80%, rgba(255,176,48,0.4) 0%, transparent 45%), linear-gradient(180deg, #1a0c2e 0%, #17140d 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #c6a5ff, #8b52f0 55%, #452073)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 28, color: "#fff" }}>Foz Mineral</span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#ffcc5c",
              }}
            >
              Park
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#ffcc5c",
            }}
          >
            Foz do Iguaçu — Paraná
          </span>
          <span style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 500 }}>
            Onde a Terra guarda seus tesouros mais antigos.
          </span>
          <span
            style={{
              fontSize: 28,
              color: "#dfccff",
              fontFamily: "sans-serif",
              fontWeight: 400,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Gruta de ametista, museu com 1.000+ minerais e loja de peças
            lapidadas à mão.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
