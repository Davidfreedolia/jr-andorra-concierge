import { createFileRoute } from "@tanstack/react-router";

import { AndorraSection } from "@/components/about/AndorraSection";
import { FounderLetter } from "@/components/about/FounderLetter";
import { Milestones } from "@/components/about/Milestones";
import { Principles } from "@/components/about/Principles";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/about")({
  head: ({ params }) =>
    pageHead("about", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <FounderLetter />
      <Milestones />
      <Principles />
      <AndorraSection />
    </>
  );
}
