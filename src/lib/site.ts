const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return new URL("http://localhost:3000");
  return new URL(value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`);
}

export const siteUrl = normalizeSiteUrl(configuredSiteUrl);
export const siteName = "PawFriend";
export const siteDescription =
  "Discover adoptable pets by personality, build a private shortlist, and prepare for a thoughtful first meeting with PawFriend.";
export const isIndexable =
  siteUrl.protocol === "https:" && !["localhost", "127.0.0.1"].includes(siteUrl.hostname);
