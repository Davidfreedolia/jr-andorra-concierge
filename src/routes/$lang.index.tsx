import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/PagePlaceholder";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) =>
    pageHead("home", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: () => <PagePlaceholder titleKey="pages.home.title" />,
});
