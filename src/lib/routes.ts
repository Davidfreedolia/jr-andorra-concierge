export const NAV_ITEMS = [
  { key: "home", to: "/$lang", suffix: "" },
  { key: "homeStaySafe", to: "/$lang/home-stay-safe", suffix: "/home-stay-safe" },
  {
    key: "conciergerieMobility",
    to: "/$lang/conciergerie-mobility",
    suffix: "/conciergerie-mobility",
  },
  { key: "about", to: "/$lang/about", suffix: "/about" },
  { key: "contact", to: "/$lang/contact", suffix: "/contact" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export function routeForPathname(pathname: string): NavItem["to"] {
  const suffix = pathname.replace(/^\/[a-z]{2}/, "").replace(/\/$/, "");
  return NAV_ITEMS.find((item) => item.suffix === suffix)?.to ?? "/$lang";
}
