import { createFileRoute } from "@tanstack/react-router";

import { AssessmentForm } from "@/components/hss/AssessmentForm";
import { HomeReport } from "@/components/hss/HomeReport";
import { HssHero } from "@/components/hss/HssHero";
import { HssIncludes } from "@/components/hss/HssIncludes";
import { HssLevels } from "@/components/hss/HssLevels";
import { HssPromise } from "@/components/hss/HssPromise";
import { KeyCustody } from "@/components/hss/KeyCustody";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/home-stay-safe")({
  head: ({ params }) =>
    pageHead("homeStaySafe", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: HomeStaySafePage,
});

function HomeStaySafePage() {
  return (
    <>
      <HssHero />
      <HssPromise />
      <HssIncludes />
      <HomeReport />
      <HssLevels />
      <KeyCustody />
      <AssessmentForm />
    </>
  );
}
