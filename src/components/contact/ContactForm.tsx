import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { tList } from "@/i18n/list";
import { WHATSAPP_URL } from "@/lib/contact";

function buildSchema(e: (key: string) => string) {
  return z.object({
    name: z.string().trim().min(2, e("name")).max(100, e("long")),
    email: z.string().trim().email(e("email")).max(255, e("long")),
    phone: z
      .string()
      .trim()
      .min(6, e("phone"))
      .max(30, e("long"))
      .regex(/^[+()\d\s.-]+$/, e("phone")),
    service: z.string().min(1, e("required")),
    message: z.string().trim().min(5, e("message")).max(1000, e("long")),
    consent: z.literal(true, { errorMap: () => ({ message: e("consent") }) }),
  });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

export function ContactForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const services = tList<string>(t, "contact.form.services");
  const schema = buildSchema((key) => t(`contact.form.errors.${key}`));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = handleSubmit(() => {
    // Delivery is wired later; the form validates and confirms for now.
    setSent(true);
    reset();
  });

  const fieldClass =
    "min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground";
  const labelClass = "jr-label text-muted-foreground";
  const errorClass = "text-sm text-destructive";

  return (
    <section id="contacto" className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("contact.label")}</p>
          <h1 className="jr-display-1 jr-measure text-jr-gold">{t("contact.title")}</h1>
          <p className="jr-measure text-lg text-muted-foreground">{t("contact.intro")}</p>
          <p className="jr-label">{t("contact.promise")}</p>
        </div>

        <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="ct-name" className={labelClass}>
              {t("contact.form.name")}
            </label>
            <input id="ct-name" autoComplete="name" className={fieldClass} {...register("name")} />
            {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ct-email" className={labelClass}>
              {t("contact.form.email")}
            </label>
            <input
              id="ct-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={fieldClass}
              {...register("email")}
            />
            {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ct-phone" className={labelClass}>
              {t("contact.form.phone")}
            </label>
            <input
              id="ct-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={fieldClass}
              {...register("phone")}
            />
            {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ct-service" className={labelClass}>
              {t("contact.form.service")}
            </label>
            <select id="ct-service" className={fieldClass} defaultValue="" {...register("service")}>
              <option value="" disabled>
                {t("contact.form.servicePlaceholder")}
              </option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service ? <p className={errorClass}>{errors.service.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="ct-message" className={labelClass}>
              {t("contact.form.message")}
            </label>
            <textarea id="ct-message" rows={5} className={fieldClass} {...register("message")} />
            {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="ct-consent" className="flex items-start gap-3 text-muted-foreground">
              <input
                id="ct-consent"
                type="checkbox"
                className="jr-tap mt-1 size-5 shrink-0 accent-[var(--jr-gold)]"
                {...register("consent")}
              />
              <span className="jr-measure text-sm">{t("contact.form.consent")}</span>
            </label>
            {errors.consent ? <p className={errorClass}>{errors.consent.message}</p> : null}
          </div>

          <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
            <button type="submit" className="jr-button" disabled={isSubmitting}>
              {t("contact.form.submit")}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jr-button jr-button-quiet"
            >
              {t("contact.whatsapp")}
            </a>
          </div>

          {sent ? (
            <p role="status" className="jr-measure md:col-span-2 text-jr-bone">
              {t("contact.form.sent")}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
