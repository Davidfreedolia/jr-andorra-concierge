import { createFileRoute, redirect } from "@tanstack/react-router";

import { DEFAULT_LANGUAGE } from "@/i18n/config";

// No automatic language detection: "/" always lands on the Spanish default.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang/", params: { lang: DEFAULT_LANGUAGE } });
  },
  component: () => null,
});
