import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/hss-hero.jpg";

export function HssHero() {
  return (
    <PageHero
      image={heroImage}
      altKey="hss.hero.alt"
      labelKey="pages.homeStaySafe.title"
      titleKey="hss.hero.title"
    />
  );
}
