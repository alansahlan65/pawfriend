import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { isIndexable, siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const display = localFont({
  src: "./fonts/anton-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "./fonts/archivo-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

const handwritten = localFont({
  src: "./fonts/caveat-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Pet adoption by personality | PawFriend",
    template: "%s | PawFriend",
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "pet adoption",
    "adoptable pets",
    "animal shelter",
    "adopt a dog",
    "adopt a cat",
    "pet personality match",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  category: "pet adoption",
  formatDetection: { telephone: false },
  openGraph: {
    title: "Find your new best friend | PawFriend",
    description: siteDescription,
    type: "website",
    siteName,
    url: "/",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "PawFriend pet adoption by personality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find your new best friend | PawFriend",
    description: siteDescription,
    images: ["/opengraph-image.jpg"],
  },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121314",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${handwritten.variable}`}>
      <body>{children}</body>
    </html>
  );
}
