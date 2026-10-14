import settings from "../../data/site-settings.js";

export default function robots() {
  const siteUrl = settings.seo.siteUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    host: siteUrl,
  };
}
