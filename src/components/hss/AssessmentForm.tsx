import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { LANGUAGES } from "@/i18n/config";
import { tList } from "@/i18n/list";

const LANGUAGE_NAMES: Record<string, string> = {
  es: "Español",
  ca: "Català",
  fr: "Français",
  en: "English",
  de: "Deutsch",
};

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
    preferredLanguage: z.string().min(1, e("required")),
    propertyType: z.string().min(1, e("required")),
    parish: z.string().min(1, e("required")),
    area: z.preprocess(
      (value) => (value === "" || value === undefined ? Number.NaN : Number(value)),
      z.number({ invalid_type_error: e("area") }).int().min(10, e("area")).max(5000, e("area")),
    ),
    bedrooms: z.preprocess(
      (value) => (value === "" || value === undefined ? Number.NaN : Number(value)),
      z.number({ invalid_type_error: e("bedrooms") }).int().min(0, e("bedrooms")).max(30, e("bedrooms")),
    ),
    frequency: z.string().min(1, e("required")),
    arrival: z.string().max(20, e("long")).optional().or(z.literal("")),
    message: z.string().trim().max(1000, e("long")).optional().or(z.literal("")),
    consent: z.literal(true, { errorMap: () => ({ message: e("consent") }) }),
  });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

function Step({
  index,
  open,
  children,
}: {
  index: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={!open}
      className={[
        "grid transition-all duration-700 ease-out",
        open
          ? "grid-rows-[1fr] opacity-100 translate-y-0 blur-0"
          : "pointer-events-none grid-rows-[0fr] opacity-0 translate-y-4 blur-[4px]",
      ].join(" ")}
    >
      <div className="overflow-hidden">
        <div className="flex items-start gap-4 border-t border-[color-mix(in_srgb,var(--jr-gold)_22%,transparent)] pt-8">
          <span className="jr-label shrink-0 text-jr-gold">{index}</span>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AssessmentForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const propertyTypes = tList<string>(t, "hss.form.propertyTypes");
  const parishes = tList<string>(t, "hss.form.parishes");
  const frequencies = tList<string>(t, "hss.form.frequencies");

  const schema = buildSchema((key) => t(`hss.form.errors.${key}`));

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const values = watch();
  const stepTwoOpen =
    String(values.name ?? "").trim().length >= 2 &&
    /.+@.+\..+/.test(String(values.email ?? "")) &&
    String(values.phone ?? "").trim().length >= 6;
  const stepThreeOpen =
    stepTwoOpen && Boolean(values.propertyType) && Boolean(values.parish);

  const onSubmit = handleSubmit(() => {
    // Delivery is wired later; the form only validates and confirms for now.
    setSent(true);
    reset();
  });

  const fieldClass = "jr-field";
  const labelClass = "jr-label text-jr-bone/70";
  const errorClass = "text-sm text-destructive";

  return (
    <section id="valoracion" className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("hss.form.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-gold">{t("hss.form.title")}</h2>
          <p className="text-muted-foreground">{t("hss.form.promise")}</p>
        </div>

        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <span className="jr-label shrink-0 text-jr-gold">01</span>
            <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="hss-name" className={labelClass}>
                  {t("hss.form.name")}
                </label>
                <input id="hss-name" autoComplete="name" className={fieldClass} {...register("name")} />
                {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="hss-email" className={labelClass}>
                  {t("hss.form.email")}
                </label>
                <input
                  id="hss-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={fieldClass}
                  {...register("email")}
                />
                {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="hss-phone" className={labelClass}>
                  {t("hss.form.phone")}
                </label>
                <input
                  id="hss-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={fieldClass}
                  {...register("phone")}
                />
                {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="hss-language" className={labelClass}>
                  {t("hss.form.lang")}
                </label>
                <select
                  id="hss-language"
                  defaultValue=""
                  className={fieldClass}
                  {...register("preferredLanguage")}
                >
                  <option value="" disabled>
                    {t("hss.form.select")}
                  </option>
                  {LANGUAGES.map((code) => (
                    <option key={code} value={code}>
                      {LANGUAGE_NAMES[code]}
                    </option>
                  ))}
                </select>
                {errors.preferredLanguage ? (
                  <p className={errorClass}>{errors.preferredLanguage.message}</p>
                ) : null}
              </div>
            </div>
          </div>

          <Step index="02" open={stepTwoOpen}>
            <div className="flex flex-col gap-2">
              <label htmlFor="hss-type" className={labelClass}>
                {t("hss.form.propertyType")}
              </label>
              <select id="hss-type" defaultValue="" className={fieldClass} {...register("propertyType")}>
                <option value="" disabled>
                  {t("hss.form.select")}
                </option>
                {propertyTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.propertyType ? <p className={errorClass}>{errors.propertyType.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hss-parish" className={labelClass}>
                {t("hss.form.parish")}
              </label>
              <select id="hss-parish" defaultValue="" className={fieldClass} {...register("parish")}>
                <option value="" disabled>
                  {t("hss.form.select")}
                </option>
                {parishes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.parish ? <p className={errorClass}>{errors.parish.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hss-area" className={labelClass}>
                {t("hss.form.area")}
              </label>
              <input
                id="hss-area"
                type="number"
                inputMode="numeric"
                min={10}
                max={5000}
                className={fieldClass}
                {...register("area")}
              />
              {errors.area ? <p className={errorClass}>{errors.area.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hss-bedrooms" className={labelClass}>
                {t("hss.form.bedrooms")}
              </label>
              <input
                id="hss-bedrooms"
                type="number"
                inputMode="numeric"
                min={0}
                max={30}
                className={fieldClass}
                {...register("bedrooms")}
              />
              {errors.bedrooms ? <p className={errorClass}>{errors.bedrooms.message}</p> : null}
            </div>
          </Step>

          <Step index="03" open={stepThreeOpen}>
            <div className="flex flex-col gap-2">
              <label htmlFor="hss-frequency" className={labelClass}>
                {t("hss.form.frequency")}
              </label>
              <select id="hss-frequency" defaultValue="" className={fieldClass} {...register("frequency")}>
                <option value="" disabled>
                  {t("hss.form.select")}
                </option>
                {frequencies.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.frequency ? <p className={errorClass}>{errors.frequency.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hss-arrival" className={labelClass}>
                {t("hss.form.arrival")}
              </label>
              <input id="hss-arrival" type="date" className={fieldClass} {...register("arrival")} />
              {errors.arrival ? <p className={errorClass}>{errors.arrival.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="hss-message" className={labelClass}>
                {t("hss.form.message")}
              </label>
              <textarea id="hss-message" rows={5} className={fieldClass} {...register("message")} />
              {errors.message ? <p className={errorClass}>{errors.message.message}</p> : null}
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex items-start gap-3">
                <input
                  id="hss-consent"
                  type="checkbox"
                  className="jr-check mt-1 h-5 w-5 shrink-0"
                  {...register("consent")}
                />
                <label htmlFor="hss-consent" className="text-jr-bone/80">
                  {t("hss.form.consent")}
                </label>
              </div>
              {errors.consent ? <p className={errorClass}>{errors.consent.message}</p> : null}
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <button type="submit" className="jr-button self-start" disabled={isSubmitting}>
                {isSubmitting ? t("hss.form.sending") : t("hss.form.submit")}
              </button>
              <p aria-live="polite" className="jr-label">
                {sent ? t("hss.form.success") : ""}
              </p>
            </div>
          </Step>
        </form>
      </div>
    </section>
  );
}

