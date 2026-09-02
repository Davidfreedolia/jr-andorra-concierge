/** Date helpers for the private area. Input is always an ISO yyyy-mm-dd string. */
export function formatDate(iso: string, lang: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(lang, { day: "numeric", month: "long", year: "numeric" }).format(
    date,
  );
}

export function formatShortDate(iso: string, lang: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(lang, { day: "2-digit", month: "short", year: "numeric" }).format(
    date,
  );
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(`${checkIn}T00:00:00`).getTime();
  const b = new Date(`${checkOut}T00:00:00`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.round((b - a) / 86400000));
}
