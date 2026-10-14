import settings from "../../data/site-settings.js";
import services from "../../data/services.js";

export default function sitemap() {
  const siteUrl = settings.seo.siteUrl.replace(/\/$/, "");

  const pages = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/approach`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  return [
    ...pages,
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
