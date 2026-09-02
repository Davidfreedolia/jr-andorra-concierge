import { useTranslation } from "react-i18next";

/** Title-only scaffold. Page content arrives in later steps. */
export function PagePlaceholder({ titleKey }: { titleKey: string }) {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container">
        <h1 className="jr-display-1 jr-measure">{t(titleKey)}</h1>
        <hr className="jr-rule mt-10" />
      </div>
    </section>
  );
}
