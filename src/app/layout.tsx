import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { paper } from "@/content/paper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to your deployed URL for correct OG/Twitter image links.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: paper.title,
  description: paper.abstract.slice(0, 160),
  openGraph: {
    title: paper.title,
    description: paper.abstract.slice(0, 200),
    type: "website",
    images: paper.teaserImage ? [paper.teaserImage] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
