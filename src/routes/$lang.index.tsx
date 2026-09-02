import { createFileRoute } from "@tanstack/react-router";

import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ConciergerieGrid } from "@/components/home/ConciergerieGrid";
import { ConsultingNote } from "@/components/home/ConsultingNote";
import { ContactBlock } from "@/components/home/ContactBlock";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HomeStaySafeSummary } from "@/components/home/HomeStaySafeSummary";
import { JourneyDiagram } from "@/components/home/JourneyDiagram";
import { MobilityCards } from "@/components/home/MobilityCards";
import { SingleVoice } from "@/components/home/SingleVoice";
import { TwoDoors } from "@/components/home/TwoDoors";
import { DEFAULT_LANGUAGE, isLanguage, type Language } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) => {
    const lang = isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE;
    const head = pageHead("home", lang);
    return {
      ...head,
      links: [
        ...head.links,
        { rel: "preload", as: "image", href: "/hero.jpg", fetchPriority: "high" },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { lang } = Route.useParams();
  const language = (isLanguage(lang) ? lang : DEFAULT_LANGUAGE) as Language;

  return (
    <>
      <HeroVideo lang={language} />
      <SingleVoice />
      <TwoDoors lang={language} />
      <HomeStaySafeSummary lang={language} />
      <MobilityCards lang={language} />
      <ConciergerieGrid />
      <JourneyDiagram />
      <AboutTeaser lang={language} />
      <ConsultingNote lang={language} />
      <ContactBlock />
    </>
  );
}
