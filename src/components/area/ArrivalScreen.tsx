import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate, nightsBetween } from "@/lib/area-format";
import { DEMO_ARRIVALS } from "@/mocks/area";

function buildSchema(e: (key: string) => string) {
  return z
    .object({
      checkIn: z.string().min(1, e("date")),
      checkOut: z.string().min(1, e("date")),
      guests: z.preprocess(
        (value) => (value === "" || value === undefined ? Number.NaN : Number(value)),
        z.number({ invalid_type_error: e("guests") }).int().min(1, e("guests")).max(30, e("guests")),
      ),
      pet: z.boolean().optional(),
      transfer: z.boolean().optional(),
      fridge: z.boolean().optional(),
      notes: z.string().trim().max(1000, e("long")).optional().or(z.literal("")),
    })
    .refine((data) => !data.checkIn || !data.checkOut || data.checkOut > data.checkIn, {
      path: ["checkOut"],
      message: e("order"),
    });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

export function ArrivalScreen() {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const schema = buildSchema((key) => t(`area.arrival.errors.${key}`));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = handleSubmit(() => {
    // Provisional: nothing is stored, the screen only confirms.
    setSent(true);
    reset();
  });

  const fieldClass = "min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground";
  const labelClass = "jr-label text-muted-foreground";
  const errorClass = "text-sm text-destructive";
  const toggles = ["pet", "transfer", "fridge"] as const;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="jr-area-title">{t("area.arrival.title")}</h1>
        <p className="jr-measure text-muted-foreground">{t("area.arrival.intro")}</p>
      </header>

      <AreaCard>
        <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="ar-in" className={labelClass}>
              {t("area.arrival.checkIn")}
            </label>
            <input id="ar-in" type="date" className={fieldClass} {...register("checkIn")} />
            {errors.checkIn ? <p className={errorClass}>{errors.checkIn.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ar-out" className={labelClass}>
              {t("area.arrival.checkOut")}
            </label>
            <input id="ar-out" type="date" className={fieldClass} {...register("checkOut")} />
            {errors.checkOut ? <p className={errorClass}>{errors.checkOut.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ar-guests" className={labelClass}>
              {t("area.arrival.guests")}
            </label>
            <input
              id="ar-guests"
              type="number"
              inputMode="numeric"
              min={1}
              className={fieldClass}
              {...register("guests")}
            />
            {errors.guests ? <p className={errorClass}>{errors.guests.message}</p> : null}
          </div>

          <fieldset className="flex flex-col gap-3 md:col-span-2">
            {toggles.map((key) => (
              <label key={key} className="flex items-center gap-3 text-foreground">
                <input
                  type="checkbox"
                  className="size-5 shrink-0 accent-[var(--jr-gold)]"
                  {...register(key)}
                />
                <span>{t(`area.arrival.${key}`)}</span>
              </label>
            ))}
          </fieldset>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="ar-notes" className={labelClass}>
              {t("area.arrival.notes")}
            </label>
            <textarea id="ar-notes" rows={4} className={fieldClass} {...register("notes")} />
            {errors.notes ? <p className={errorClass}>{errors.notes.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="jr-button" disabled={isSubmitting}>
              {t("area.arrival.submit")}
            </button>
          </div>

          {sent ? (
            <p role="status" className="jr-measure text-foreground md:col-span-2">
              {t("area.arrival.sent")}
            </p>
          ) : null}
        </form>
      </AreaCard>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.arrival.listTitle")}</h2>
        {DEMO_ARRIVALS.length === 0 ? (
          <AreaEmpty text={t("area.arrival.empty")} />
        ) : (
          <ul className="flex flex-col gap-3">
            {DEMO_ARRIVALS.map((arrival) => (
              <AreaCard
                as="li"
                key={arrival.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="jr-area-figure">
                    {formatDate(arrival.checkIn, i18n.language)} — {formatDate(arrival.checkOut, i18n.language)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t("area.arrival.nights", { count: nightsBetween(arrival.checkIn, arrival.checkOut) })} ·{" "}
                    {arrival.guests} {t("area.arrival.guests").toLowerCase()}
                  </span>
                </span>
                <StatusPill
                  tone={arrival.prep === "ready" ? "good" : "neutral"}
                  label={t(`area.arrival.prep.${arrival.prep}`)}
                />
              </AreaCard>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
