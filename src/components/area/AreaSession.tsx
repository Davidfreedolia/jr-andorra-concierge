import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useRole } from "@/components/area/RoleContext";
import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/config";
import { AREA_LANG_KEY } from "@/lib/area-lang";
import { AREA_ROLES, DEMO_USERS, type AreaRole } from "@/mocks/area";

/**
 * Bloc de sessio de l'area: qui ets i en quin idioma ho veus.
 * El selector de rol viu aqui, discret, en comptes d'una barra de demostracio.
 */
export function AreaSession() {
  const { t, i18n } = useTranslation();
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const selectClass = "jr-area-select";

  return (
    <div className="jr-area-session">
      <span className="jr-label">{t("area.roleLabel")}</span>
      <span className="text-sm text-foreground">{t(DEMO_USERS[role].name)}</span>

      <label className="mt-2 flex flex-col gap-1">
        <span className="sr-only">{t("area.roleLabel")}</span>
        <select
          className={selectClass}
          value={role}
          onChange={(event) => {
            const next = event.target.value as AreaRole;
            setRole(next);
            void navigate({ to: next === "guest" ? "/area/invitado" : "/area" });
          }}
        >
          {AREA_ROLES.map((option) => (
            <option key={option} value={option}>
              {t(`area.roles.${option}`)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="sr-only">{t("area.langLabel")}</span>
        <select
          className={selectClass}
          value={i18n.language as Language}
          onChange={(event) => {
            const next = event.target.value;
            window.localStorage.setItem(AREA_LANG_KEY, next);
            void i18n.changeLanguage(next);
          }}
        >
          {LANGUAGES.map((code) => (
            <option key={code} value={code}>
              {LANGUAGE_LABELS[code]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
