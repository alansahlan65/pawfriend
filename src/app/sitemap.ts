import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-22T00:00:00.000Z");

  return [
    { url: siteUrl.toString(), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: new URL("/privacy", siteUrl).toString(), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: new URL("/accessibility", siteUrl).toString(), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
