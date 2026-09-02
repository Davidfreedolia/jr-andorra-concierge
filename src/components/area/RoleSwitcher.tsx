import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useRole } from "@/components/area/RoleContext";
import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/config";
import { AREA_ROLES, type AreaRole } from "@/mocks/area";

/** Demo-only control: lets anyone preview each role and language. */
export function RoleSwitcher() {
  const { t, i18n } = useTranslation();
  const { role, setRole } = useRole();
  const navigate = useNavigate();

  const selectClass =
    "min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground sm:w-auto";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="jr-label">{t("area.demo")}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <span className="jr-label text-muted-foreground">{t("area.roleLabel")}</span>
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

        <label className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <span className="jr-label text-muted-foreground">{t("area.langLabel")}</span>
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
    </div>
  );
}
