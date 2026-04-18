import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #cc8fc8, #733b71 55%, #170e1a)",
          color: "#f5efe4",
          fontFamily: "serif",
          fontWeight: 400,
          fontSize: 86,
          borderRadius: 40,
          border: "2px solid rgba(200,147,71,0.65)",
        }}
      >
        Fm
      </div>
    ),
    size,
  );
}
