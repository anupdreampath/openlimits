import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { FULLSTACK_ORIGIN, isFullstackHost } from "@/tenant-routing";
import "./globals.css";
import "lenis/dist/lenis.css";
import "./studio.css";
import "@/tenants/fullstack/brand.css";

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
  if (isFullstackHost(requestHeaders.get("host"), process.env.NODE_ENV === "development")) {
    const path = requestHeaders.get("x-site-path") || "/";
    const canonicalPath = path.startsWith("/") && !path.startsWith("//") ? path : "/";
    return {
      metadataBase: new URL(FULLSTACK_ORIGIN),
      title: "TheFullStack Guys | MORGAN RETAILERS",
      description: "Websites, commerce, apps and software by MORGAN RETAILERS. TheFullStack Guys is our website. Based in New Delhi, India.",
      alternates: { canonical: new URL(canonicalPath, FULLSTACK_ORIGIN).href },
      robots: canonicalPath.startsWith("/admin") ? { index: false, follow: false } : { index: true, follow: true },
      icons: { icon: "/tenant-assets/fullstack/fullstack-icon.svg", shortcut: "/tenant-assets/fullstack/fullstack-icon.svg" },
      openGraph: {
        title: "TheFullStack Guys | MORGAN RETAILERS", siteName: "TheFullStack Guys", type: "website",
        url: new URL(canonicalPath, FULLSTACK_ORIGIN).href,
        description: "Digital design and development by Morgan Retailers, New Delhi.",
        images: [{ url: "/tenant-assets/fullstack/fullstack-social.svg", width: 1730, height: 909 }],
      },
      twitter: { card: "summary_large_image", title: "TheFullStack Guys | MORGAN RETAILERS", images: ["/tenant-assets/fullstack/fullstack-social.svg"] },
    };
  }

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const fullstack = isFullstackHost(requestHeaders.get("host"), process.env.NODE_ENV === "development");
  return (
    <html lang="en" data-tenant={fullstack ? "fullstack" : "default"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
