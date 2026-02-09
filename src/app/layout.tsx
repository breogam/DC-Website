import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PageCraft - Build Landing Pages That Actually Convert",
  description:
    "Stop wasting weeks on landing pages that don't perform. PageCraft gives you conversion-optimized templates, a visual builder, and AI-powered copy suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
