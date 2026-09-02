import { createFileRoute } from "@tanstack/react-router";

import { CmClosing } from "@/components/cm/CmClosing";
import { CmHero } from "@/components/cm/CmHero";
import { ConciergerieAreas } from "@/components/cm/ConciergerieAreas";
import { MobilityBlocks } from "@/components/cm/MobilityBlocks";
import { TransferBooking } from "@/components/cm/TransferBooking";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/conciergerie-mobility")({
  head: ({ params }) =>
    pageHead("conciergerieMobility", isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE),
  component: ConciergerieMobilityPage,
});

function ConciergerieMobilityPage() {
  const { lang } = Route.useParams();
  const language = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  return (
    <>
      <CmHero />
      <MobilityBlocks />
      <TransferBooking />
      <ConciergerieAreas />
      <CmClosing lang={language} />
    </>
  );
}
