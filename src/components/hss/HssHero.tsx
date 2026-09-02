import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/hss-hero.jpg.asset.json";

export function HssHero() {
  return (
    <PageHero
      image={heroImage.url}
      altKey="hss.hero.alt"
      labelKey="pages.homeStaySafe.title"
      titleKey="hss.hero.title"
    />
  );
}
