import settings from "./site-settings.js";

export function pageMetadata({ title, description, path }) {
  const siteName = settings.identity.websiteName;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: path,
      siteName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
