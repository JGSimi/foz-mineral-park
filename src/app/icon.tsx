import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontWeight: 500,
          fontSize: 18,
          fontFamily: "serif",
          borderRadius: 7,
          border: "1px solid rgba(200,147,71,0.6)",
        }}
      >
        Fm
      </div>
    ),
    size,
  );
}
