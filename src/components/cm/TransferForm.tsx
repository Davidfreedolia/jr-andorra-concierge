import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";

function buildSchema(e: (key: string) => string) {
  const count = (min: number, max: number, key: string) =>
    z.preprocess(
      (value) => (value === "" || value === undefined ? Number.NaN : Number(value)),
      z.number({ invalid_type_error: e(key) }).int().min(min, e(key)).max(max, e(key)),
    );

  return z.object({
    origin: z.string().trim().min(2, e("required")).max(120, e("long")),
    destination: z.string().trim().min(2, e("required")).max(120, e("long")),
    date: z.string().min(1, e("required")).max(20, e("long")),
    time: z.string().min(1, e("required")).max(10, e("long")),
    passengers: count(1, 20, "passengers"),
    luggage: count(0, 30, "luggage"),
    flight: z.string().trim().max(20, e("long")).optional().or(z.literal("")),
    name: z.string().trim().min(2, e("name")).max(100, e("long")),
    email: z.string().trim().email(e("email")).max(255, e("long")),
    phone: z
      .string()
      .trim()
      .min(6, e("phone"))
      .max(30, e("long"))
      .regex(/^[+()\d\s.-]+$/, e("phone")),
    consent: z.literal(true, { errorMap: () => ({ message: e("consent") }) }),
  });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

export function TransferForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const schema = buildSchema((key) => t(`cm.transfer.errors.${key}`));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = handleSubmit(() => {
    // Delivery is wired later; the form only validates and confirms for now.
    setSent(true);
    reset();
  });

  const fieldClass = "min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground";
  const labelClass = "jr-label text-muted-foreground";
  const errorClass = "text-sm text-destructive";

  return (
    <section id="transfer" className="jr-section jr-surface-deep">
      <div className="jr-container flex flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("cm.transfer.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("cm.transfer.title")}</h2>
          <p className="jr-measure border-l-2 border-jr-gold py-2 pl-4 font-display text-2xl lg:text-3xl">
            {t("cm.transfer.promise")}
          </p>
        </Reveal>

        <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="tr-origin" className={labelClass}>
              {t("cm.transfer.origin")}
            </label>
            <input id="tr-origin" className={fieldClass} {...register("origin")} />
            {errors.origin ? <p className={errorClass}>{errors.origin.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-destination" className={labelClass}>
              {t("cm.transfer.destination")}
            </label>
            <input id="tr-destination" className={fieldClass} {...register("destination")} />
            {errors.destination ? <p className={errorClass}>{errors.destination.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-date" className={labelClass}>
              {t("cm.transfer.date")}
            </label>
            <input id="tr-date" type="date" className={fieldClass} {...register("date")} />
            {errors.date ? <p className={errorClass}>{errors.date.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-time" className={labelClass}>
              {t("cm.transfer.time")}
            </label>
            <input id="tr-time" type="time" className={fieldClass} {...register("time")} />
            {errors.time ? <p className={errorClass}>{errors.time.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-passengers" className={labelClass}>
              {t("cm.transfer.passengers")}
            </label>
            <input
              id="tr-passengers"
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              className={fieldClass}
              {...register("passengers")}
            />
            {errors.passengers ? <p className={errorClass}>{errors.passengers.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-luggage" className={labelClass}>
              {t("cm.transfer.luggage")}
            </label>
            <input
              id="tr-luggage"
              type="number"
              inputMode="numeric"
              min={0}
              max={30}
              className={fieldClass}
              {...register("luggage")}
            />
            {errors.luggage ? <p className={errorClass}>{errors.luggage.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-flight" className={labelClass}>
              {t("cm.transfer.flight")}
            </label>
            <input
              id="tr-flight"
              autoCapitalize="characters"
              className={fieldClass}
              {...register("flight")}
            />
            {errors.flight ? <p className={errorClass}>{errors.flight.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-name" className={labelClass}>
              {t("cm.transfer.name")}
            </label>
            <input id="tr-name" autoComplete="name" className={fieldClass} {...register("name")} />
            {errors.name ? <p className={errorClass}>{errors.name.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-email" className={labelClass}>
              {t("cm.transfer.email")}
            </label>
            <input
              id="tr-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={fieldClass}
              {...register("email")}
            />
            {errors.email ? <p className={errorClass}>{errors.email.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tr-phone" className={labelClass}>
              {t("cm.transfer.phone")}
            </label>
            <input
              id="tr-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={fieldClass}
              {...register("phone")}
            />
            {errors.phone ? <p className={errorClass}>{errors.phone.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <div className="flex items-start gap-3">
              <input
                id="tr-consent"
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0"
                {...register("consent")}
              />
              <label htmlFor="tr-consent" className="opacity-80">
                {t("cm.transfer.consent")}
              </label>
            </div>
            {errors.consent ? <p className={errorClass}>{errors.consent.message}</p> : null}
          </div>

          <div className="flex flex-col gap-4 md:col-span-2">
            <button type="submit" className="jr-button self-start" disabled={isSubmitting}>
              {isSubmitting ? t("cm.transfer.sending") : t("cm.transfer.submit")}
            </button>
            <p aria-live="polite" className="jr-label text-jr-gold-deep">
              {sent ? t("cm.transfer.success") : ""}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
