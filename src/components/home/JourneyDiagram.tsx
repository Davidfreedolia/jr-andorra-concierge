import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

export function JourneyDiagram() {
  const { t } = useTranslation();
  const states = tList<string>(t, "home.journey.states");
  const services = tList<string>(t, "home.journey.services");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("home.journey.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-bone">{t("home.journey.title")}</h2>
        </div>

        <ol className="jr-journey">
          {states.map((state, index) => (
            <li key={state} className="jr-journey-step">
              <span className="jr-journey-dot" aria-hidden="true" />
              <span className="font-display text-2xl uppercase text-jr-bone lg:text-3xl">
                {state}
              </span>
              <span className="jr-label mt-2 block text-muted-foreground">{services[index]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
