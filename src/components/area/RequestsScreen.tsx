import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate } from "@/lib/area-format";
import { DEMO_REQUESTS } from "@/mocks/area";

const TYPES = ["restaurant", "wellness", "ski", "chauffeur", "shopping", "other"] as const;

function buildSchema(e: (key: string) => string) {
  return z.object({
    type: z.string().min(1, e("required")),
    date: z.string().min(1, e("date")),
    people: z.preprocess(
      (value) => (value === "" || value === undefined ? Number.NaN : Number(value)),
      z.number({ invalid_type_error: e("people") }).int().min(1, e("people")).max(30, e("people")),
    ),
    details: z.string().trim().min(5, e("details")).max(1000, e("long")),
  });
}

type FormValues = z.input<ReturnType<typeof buildSchema>>;

export function RequestsScreen() {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const schema = buildSchema((key) => t(`area.requests.errors.${key}`));

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

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="jr-area-title">{t("area.requests.title")}</h1>
        <p className="jr-measure text-muted-foreground">{t("area.requests.intro")}</p>
      </header>

      <AreaCard>
        <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="rq-type" className={labelClass}>
              {t("area.requests.type")}
            </label>
            <select id="rq-type" defaultValue="" className={fieldClass} {...register("type")}>
              <option value="" disabled>
                {t("area.requests.typePlaceholder")}
              </option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`area.requests.types.${type}`)}
                </option>
              ))}
            </select>
            {errors.type ? <p className={errorClass}>{errors.type.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rq-date" className={labelClass}>
              {t("area.requests.date")}
            </label>
            <input id="rq-date" type="date" className={fieldClass} {...register("date")} />
            {errors.date ? <p className={errorClass}>{errors.date.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rq-people" className={labelClass}>
              {t("area.requests.people")}
            </label>
            <input
              id="rq-people"
              type="number"
              inputMode="numeric"
              min={1}
              className={fieldClass}
              {...register("people")}
            />
            {errors.people ? <p className={errorClass}>{errors.people.message}</p> : null}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="rq-details" className={labelClass}>
              {t("area.requests.details")}
            </label>
            <textarea id="rq-details" rows={4} className={fieldClass} {...register("details")} />
            {errors.details ? <p className={errorClass}>{errors.details.message}</p> : null}
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="jr-button" disabled={isSubmitting}>
              {t("area.requests.submit")}
            </button>
          </div>

          {sent ? (
            <p role="status" className="jr-measure text-foreground md:col-span-2">
              {t("area.requests.sent")}
            </p>
          ) : null}
        </form>
      </AreaCard>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.requests.listTitle")}</h2>
        {DEMO_REQUESTS.length === 0 ? (
          <AreaEmpty text={t("area.requests.empty")} />
        ) : (
          <ul className="flex flex-col gap-3">
            {DEMO_REQUESTS.map((request) => (
              <AreaCard
                as="li"
                key={request.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="jr-area-figure">{t(`area.requests.types.${request.typeKey}`)}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(request.date, i18n.language)} · {request.people}{" "}
                    {t("area.requests.people").toLowerCase()}
                  </span>
                </span>
                <StatusPill
                  tone={request.status === "confirmed" ? "good" : "neutral"}
                  label={t(`area.requests.status.${request.status}`)}
                />
              </AreaCard>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
