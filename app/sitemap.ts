import type { MetadataRoute } from "next";
import { weeks } from "@/content/weeks";

const BASE_URL = "https://nextjs-bootcamp.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...weeks.map((w) => ({
      url: `${BASE_URL}/curriculum/${w.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
