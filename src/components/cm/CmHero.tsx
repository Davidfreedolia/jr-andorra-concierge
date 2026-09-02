import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/cm-hero.jpg";
import heroVideo from "@/assets/cm-hero.mp4.asset.json";

export function CmHero() {
  return (
    <PageHero
      image={heroImage}
      video={heroVideo.url}
      altKey="cm.hero.alt"
      labelKey="pages.conciergerieMobility.title"
      titleKey="cm.hero.title"
    />
  );
}
