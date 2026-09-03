import { useTranslation } from "react-i18next";

import { DEFAULT_LANGUAGE, isLanguage, type Language } from "@/i18n/config";

/** Demo-only: keeps the previewed language of the private area between screens. */
export const AREA_LANG_KEY = "jr-area-demo-lang";

/** Language to use when linking from the private area back to the public site. */
export function useAreaLang(): Language {
  const { i18n } = useTranslation();
  const base = i18n.language?.split("-")[0];
  return isLanguage(base) ? base : DEFAULT_LANGUAGE;
}
