import { PageHero } from "@/components/PageHero";
import heroImage from "@/assets/contact-hero.jpg";

export function ContactHero() {
  return (
    <PageHero
      image={heroImage}
      altKey="contact.hero.alt"
      labelKey="pages.contact.title"
      titleKey="contact.hero.title"
    />
  );
}
