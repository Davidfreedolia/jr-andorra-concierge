import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/PagePlaceholder";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/conciergerie-mobility")({
  head: ({ params }) =>
    pageHead("conciergerieMobility", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: () => <PagePlaceholder titleKey="pages.conciergerieMobility.title" />,
});
