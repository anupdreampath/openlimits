import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { FacebookPixel } from "@/app/components/FacebookPixel";
import { OpenAIAdsPixel } from "@/app/components/OpenAIAdsPixel";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./studio.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  const siteUrl = host ? `${protocol}://${host}` : "https://openlimits.agency";

  return {
    metadataBase: new URL(siteUrl),
    title: "Open Limits — Web, Software, iOS and Commerce Development",
    description:
      "Open Limits designs and engineers websites, software, iOS apps, commerce systems, automation and conversion infrastructure for ambitious companies.",
    icons: {
      icon: "/open-limits-logo.png",
      shortcut: "/open-limits-logo.png",
    },
    openGraph: {
      title: "Open Limits — Complete digital product and development company.",
      description:
        "Websites, software, iOS apps, commerce systems and automation built with taste, speed and technical depth.",
      type: "website",
      images: [{ url: `${siteUrl}/og.png`, width: 1730, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Open Limits — Web, Software, iOS and Commerce Development",
      description:
        "Websites, software, iOS apps, commerce systems and automation built with taste, speed and technical depth.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      >
        {children}
        <FacebookPixel />
        <OpenAIAdsPixel />
      </body>
    </html>
  );
}
