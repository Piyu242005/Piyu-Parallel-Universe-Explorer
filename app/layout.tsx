import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallel Universe Explorer",
  description: "An immersive 3D journey through space and fictional parallel universes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
