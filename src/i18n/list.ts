import type { TFunction } from "i18next";

/** Reads an array from the translation bundle, tolerating a missing key. */
export function tList<T>(t: TFunction, key: string): T[] {
  const value = t(key, { returnObjects: true }) as unknown;
  return Array.isArray(value) ? (value as T[]) : [];
}
