import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/ingressos",
    "/contato",
    "/sobre",
    "/como-chegar",
    "/faq",
  ];

  const localized = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}${path}`]),
        ),
      },
    })),
  );

  const attractionRoutes = site.attractions.flatMap((a) =>
    locales.map((locale) => ({
      url: `${base}/${locale}/atracoes/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}/${l}/atracoes/${a.slug}`]),
        ),
      },
    })),
  );

  const legal = ["/politica-de-privacidade", "/termos-de-uso"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...localized, ...attractionRoutes, ...legal];
}
