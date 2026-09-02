import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/about-andorra.jpg";

export function AboutHero() {
  return (
    <PageHero
      image={heroImage}
      altKey="about.hero.alt"
      labelKey="pages.about.title"
      titleKey="about.hero.title"
    />
  );
}
