import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { FacebookPixel } from "@/app/components/FacebookPixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const siteUrl = host ? `${protocol}://${host}` : "https://openlimits.agency";

  return {
    metadataBase: new URL(siteUrl),
    title: "Open Limits — Award-Winning Shopify Agency",
    description:
      "Open Limits creates culture-shifting Shopify websites for ambitious brands. Strategy, design, development and conversion under one roof.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Open Limits — Websites that refuse to blend in.",
      description:
        "Award-winning Shopify design and development for ambitious global brands.",
      type: "website",
      images: [{ url: `${siteUrl}/og.png`, width: 1730, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Open Limits — Websites that refuse to blend in.",
      description:
        "Award-winning Shopify design and development for ambitious global brands.",
      images: [`${siteUrl}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <FacebookPixel />
      </body>
    </html>
  );
}
