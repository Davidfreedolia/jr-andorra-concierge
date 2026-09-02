import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/cm-hero.jpg";

export function CmHero() {
  return (
    <PageHero
      image={heroImage}
      altKey="cm.hero.alt"
      labelKey="pages.conciergerieMobility.title"
      titleKey="cm.hero.title"
    />
  );
}
