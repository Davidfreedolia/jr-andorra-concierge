import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ChatWidget } from "@/components/ChatWidget";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { SiteHeader } from "@/components/SiteHeader";
import i18n, { DEFAULT_LANGUAGE, isLanguage, type Language } from "@/i18n/config";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLanguage(params.lang)) {
      throw redirect({ to: "/$lang", params: { lang: DEFAULT_LANGUAGE } });
    }
    if (i18n.language !== params.lang) {
      void i18n.changeLanguage(params.lang);
    }
  },
  component: LanguageLayout,
});

function LanguageLayout() {
  const { lang } = Route.useParams();
  const language = (isLanguage(lang) ? lang : DEFAULT_LANGUAGE) as Language;
  const { t } = useTranslation();

  if (i18n.language !== language) {
    void i18n.changeLanguage(language);
  }

  return (
    <div lang={language} className="flex min-h-screen flex-col">
      <a href="#main" className="jr-button sr-only focus:not-sr-only">
        {t("nav.skipToContent")}
      </a>
      <SiteHeader lang={language} />
      <main id="main" className="flex-1">
        {/* Child routes render here. */}
        <Outlet />
      </main>
      <SiteFooter lang={language} />
      <MobileActionBar lang={language} />
    </div>
  );
}
