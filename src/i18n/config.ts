import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es/common.json";
import ca from "./locales/ca/common.json";
import fr from "./locales/fr/common.json";
import en from "./locales/en/common.json";
import de from "./locales/de/common.json";

// Ordre del selector: el catala primer, per ser la llengua oficial d'Andorra.
export const LANGUAGES = ["ca", "es", "fr", "de", "en"] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = "ca";

export const LANGUAGE_LABELS: Record<Language, string> = {
  ca: "CA",
  es: "ES",
  fr: "FR",
  de: "DE",
  en: "EN",
};

export function isLanguage(value: string | undefined): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

/**
 * Llegeix la capçalera Accept-Language del navegador i retorna el primer idioma
 * que tenim, respectant l'ordre de preferencia (q=) que envia el navegador.
 * Si el visitant no en te cap dels nostres, retorna null i decideix qui crida.
 */
export function languageFromAcceptLanguage(header: string | undefined | null): Language | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return {
        base: tag?.trim().toLowerCase().split("-")[0] ?? "",
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.base.length > 0 && entry.quality > 0)
    .sort((first, second) => second.quality - first.quality);

  for (const entry of ranked) {
    if (isLanguage(entry.base)) return entry.base;
  }
  return null;
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
    returnObjects: true,
    interpolation: { escapeValue: false },
  });
}

export default i18n;
