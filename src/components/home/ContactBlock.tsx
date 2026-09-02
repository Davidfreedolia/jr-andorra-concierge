import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

import { WHATSAPP_URL } from "@/lib/contact";

export function ContactBlock() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const services = tList<string>(t, "home.contact.services");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const fieldClass =
    "min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground";

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="jr-label">{t("home.contact.label")}</p>
            <h2 className="jr-display-2 text-jr-bone">{t("home.contact.title")}</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="jr-label text-muted-foreground">
                {t("home.contact.name")}
              </label>
              <input id="contact-name" name="name" required autoComplete="name" className={fieldClass} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="jr-label text-muted-foreground">
                {t("home.contact.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-phone" className="jr-label text-muted-foreground">
                {t("home.contact.phone")}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-service" className="jr-label text-muted-foreground">
                {t("home.contact.service")}
              </label>
              <select id="contact-service" name="service" defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  {t("home.contact.servicePlaceholder")}
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="jr-label text-muted-foreground">
                {t("home.contact.message")}
              </label>
              <textarea id="contact-message" name="message" rows={5} className={fieldClass} />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="contact-consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-5 w-5 shrink-0"
              />
              <label htmlFor="contact-consent" className="text-muted-foreground">
                {t("home.contact.consent")}
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="jr-button">
                {t("home.contact.submit")}
              </button>
            </div>

            <p aria-live="polite" className="jr-label text-primary">
              {sent ? t("home.contact.sent") : ""}
            </p>
          </form>
        </div>

        <div className="flex flex-col gap-4 border p-6 lg:self-start">
          <p className="jr-label">WhatsApp</p>
          <p className="text-muted-foreground">{t("home.voice.line2")}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="jr-button">
            {t("home.contact.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
