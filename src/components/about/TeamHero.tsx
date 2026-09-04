import { PageHero } from "@/components/PageHero";

/**
 * Capçalera de la pagina d'equip. Sense fotografia de fons a proposit: la
 * pagina ja son sis retrats i un paisatge al davant nomes hi competiria.
 */
export function TeamHero() {
  return (
    <PageHero
      labelKey="pages.team.title"
      titleKey="about.team.title"
      introKey="about.team.intro"
    />
  );
}
