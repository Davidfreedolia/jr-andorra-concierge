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
    ],
    links: [
      { rel: "canonical", href: canonical },
      ...LANGUAGES.map((code) => ({
        rel: "alternate",
        hreflang: code,
        href: `${SITE_URL}/${code}${path}`,
      })),
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${SITE_URL}/${DEFAULT_LANGUAGE}${path}`,
      },
    ],
  };
}
