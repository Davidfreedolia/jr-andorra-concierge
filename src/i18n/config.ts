import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es/common.json";
import ca from "./locales/ca/common.json";
import fr from "./locales/fr/common.json";
import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

export const LANGUAGES = ["es", "ca", "fr", "en", "de"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "es";

export const LANGUAGE_LABELS: Record<Language, string> = {
  es: "ES",
  ca: "CA",
  fr: "FR",
  en: "EN",
  de: "DE",
};

export function isLanguage(value: string | undefined): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

/** Browser hint only — never used to redirect automatically. */
export function suggestedLanguage(): Language | null {
  if (typeof navigator === "undefined") return null;
  for (const tag of navigator.languages ?? []) {
    const base = tag.split("-")[0]?.toLowerCase();
    if (isLanguage(base)) return base;
  }
  return null;
}

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      es: { common: es },
      ca: { common: ca },
      fr: { common: fr },
      en: { common: en },
      de: { common: de },
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: "common",
    supportedLngs: LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
  });
}

export default i18n;
