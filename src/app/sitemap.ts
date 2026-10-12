import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteOrigin()}/`,
      lastModified: new Date("2026-10-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
