import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyu.OS Universe — Parallel Universe Explorer",
  description:
    "Explore deep space, solar systems, wormholes and parallel worlds in Piyu.OS Universe, an immersive interactive 3D portfolio experience.",
  applicationName: "Piyu.OS Universe",
  themeColor: "#030712",
  colorScheme: "dark",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030712",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
