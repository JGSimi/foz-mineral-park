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
          background: "linear-gradient(135deg, #c6a5ff, #8b52f0 55%, #452073)",
          color: "#fff",
          fontFamily: "serif",
          fontWeight: 500,
          fontSize: 86,
          borderRadius: 40,
        }}
      >
        Fm
      </div>
    ),
    size,
  );
}
