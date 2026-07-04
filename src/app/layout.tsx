import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BloomsDoor - Premium Fashion Store",
  description: "Premium Fashion Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
