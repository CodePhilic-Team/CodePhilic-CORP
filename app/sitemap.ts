import { MetadataRoute } from "next";

export const revalidate = 86400; // 24 hours

/**
 * Sitemap generator for CodePhilic Limited
 * Follows Google and Schema.org strict standards:
 * Only canonical, existing, 200 OK public pages are included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://codephilic.com";
  const currentDate = new Date().toISOString().split("T")[0];

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
