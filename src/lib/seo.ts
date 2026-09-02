import i18n, { DEFAULT_LANGUAGE, LANGUAGES, type Language } from "@/i18n/config";

export const SITE_URL = "https://jr-hospitality.lovable.app";

type PageKey = "home" | "homeStaySafe" | "conciergerieMobility" | "about" | "contact";

/** Path suffix after the language prefix, "" for the home page. */
export const PAGE_PATHS: Record<PageKey, string> = {
  home: "",
  homeStaySafe: "/home-stay-safe",
  conciergerieMobility: "/conciergerie-mobility",
  about: "/about",
  contact: "/contact",
};

export function pageHead(page: PageKey, lang: Language) {
  const t = i18n.getFixedT(lang, "common");
  const title = `${t(`pages.${page}.title`)} — ${t("brand.name")}`;
  const description = t(`pages.${page}.description`) as string;
  const path = PAGE_PATHS[page];
  const canonical = `${SITE_URL}/${lang}${path}`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: lang },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: t("brand.name") as string },
      { property: "og:image", content: `${SITE_URL}/hero.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/hero.jpg` },
    ],
    links: [
      { rel: "canonical", href: canonical },
      ...LANGUAGES.map((code) => ({
        rel: "alternate",
        hrefLang: code,
        href: `${SITE_URL}/${code}${path}`,
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: `${SITE_URL}/${DEFAULT_LANGUAGE}${path}`,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd(lang)),
      },
    ],
  };
}

/** LocalBusiness data for Andorra. Contact details stay out until confirmed. */
function localBusinessJsonLd(lang: Language) {
  const t = i18n.getFixedT(lang, "common");
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: t("brand.name"),
    description: t("pages.home.description"),
    url: `${SITE_URL}/${lang}`,
    image: `${SITE_URL}/hero.jpg`,
    inLanguage: lang,
    areaServed: { "@type": "Country", name: "Andorra" },
    address: { "@type": "PostalAddress", addressCountry: "AD" },
  };
}
