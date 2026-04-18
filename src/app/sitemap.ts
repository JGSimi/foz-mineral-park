import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/ingressos",
    "/contato",
    "/sobre",
    "/como-chegar",
    "/faq",
    "/politica-de-privacidade",
    "/termos-de-uso",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const attractionRoutes = site.attractions.map((a) => ({
    url: `${base}/atracoes/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...attractionRoutes];
}
