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
          color: "#f5efe4",
          fontFamily: "serif",
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(146,77,142,0.55) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(200,147,71,0.45) 0%, transparent 55%), linear-gradient(180deg, #050508 0%, #0a0910 40%, #170e1a 100%)",
          position: "relative",
        }}
      >
        {/* Filete dourado no topo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 80,
            right: 80,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(200,147,71,0.9), transparent)",
          }}
        />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #cc8fc8, #733b71 55%, #170e1a)",
              border: "1px solid rgba(200,147,71,0.55)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: 28, color: "#f5efe4" }}>Foz Mineral</span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 10,
                textTransform: "uppercase",
                color: "#dbb46e",
              }}
            >
              Park · Foz do Iguaçu
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              fontSize: 14,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#dbb46e",
            }}
          >
            Paraná · Brasil
          </span>
          <span
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 400,
              maxWidth: 1050,
              letterSpacing: "-0.02em",
            }}
          >
            Onde a Terra guarda seus
            <span
              style={{
                fontStyle: "italic",
                color: "#dbb46e",
                marginLeft: 12,
              }}
            >
              tesouros mais antigos.
            </span>
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#e8d2a2",
              fontFamily: "sans-serif",
              fontWeight: 400,
              maxWidth: 900,
              lineHeight: 1.45,
              letterSpacing: 0.2,
            }}
          >
            Gruta de ametista · Museu com 1.000+ minerais · Loja com peças
            lapidadas à mão.
          </span>
        </div>
        {/* Filete dourado no rodapé */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 80,
            right: 80,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(200,147,71,0.7), transparent)",
          }}
        />
      </div>
    ),
    size,
  );
}
