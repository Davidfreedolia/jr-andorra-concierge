import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import { DEFAULT_LANGUAGE, isLanguage, type Language } from "@/i18n/config";
import { TEAM } from "@/mocks/team";

/**
 * L'idioma arriba per propietat, no de l'estat d'i18next. Els textos de les
 * persones son dades, i llegir-les d'un singleton que canvia d'idioma de manera
 * asincrona fa que el servidor i el navegador pintin coses diferents.
 */
export function TeamSection({ lang: langProp }: { lang?: string }) {
  const { t } = useTranslation();
  const base = langProp?.split("-")[0];
  const lang: Language = isLanguage(base) ? base : DEFAULT_LANGUAGE;

  const members = TEAM.filter((member) => member.published).sort(
    (first, second) => first.position - second.position,
  );

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-12">
        <Reveal className="flex flex-col gap-5">
          <p className="jr-label">{t("about.team.label")}</p>
          <h2 className="jr-display-1 jr-measure text-jr-gold">{t("about.team.title")}</h2>
          <p className="jr-measure text-lg text-muted-foreground">{t("about.team.intro")}</p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Reveal
              as="li"
              key={member.id}
              delay={index * 70}
              className="flex min-w-0 flex-col gap-5"
            >
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="jr-team-photo"
                />
              ) : (
                <span className="jr-team-photo jr-team-empty" aria-hidden="true">
                  <span className="jr-team-initials">{member.initials}</span>
                </span>
              )}

              <span className="flex min-w-0 flex-col gap-2">
                <span className="jr-display-2 text-jr-bone">{member.name}</span>
                <span className="jr-label">{member.role[lang]}</span>
                <span className="jr-measure text-muted-foreground">{member.line[lang]}</span>
                {member.photo ? null : (
                  <span className="jr-team-note">{t("about.team.photoPending")}</span>
                )}
              </span>

              <a
                href={`mailto:${member.email}`}
                className="jr-button jr-button-quiet self-start"
                aria-label={t("about.team.contactAria", { name: member.name })}
              >
                {t("about.team.contact")}
              </a>
            </Reveal>
          ))}
        </ul>

        <p className="jr-team-note jr-measure">{t("about.team.provisional")}</p>
      </div>
    </section>
  );
}
