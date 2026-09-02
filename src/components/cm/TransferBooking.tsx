import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Step = "closed" | "form" | "login" | "payment";

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // monday first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= days; d += 1) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const HOURS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export function TransferBooking() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState<Step>("closed");

  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [time, setTime] = useState("");

  const places = tList<string>(t, "cm.booking.places");
  const cells = useMemo(() => monthMatrix(cursor.getFullYear(), cursor.getMonth()), [cursor]);
  const monthLabel = cursor.toLocaleDateString(i18n.language, { month: "long", year: "numeric" });
  const weekdays = useMemo(() => {
    const base = new Date(2024, 0, 1); // monday
    return Array.from({ length: 7 }, (_, i) =>
      new Date(base.getFullYear(), base.getMonth(), base.getDate() + i).toLocaleDateString(
        i18n.language,
        { weekday: "short" },
      ),
    );
  }, [i18n.language]);

  const ready = Boolean(selected && origin && destination && time && origin !== destination);
  const selectClass = "jr-field appearance-none";
  const labelClass = "jr-label text-jr-bone/70";

  const isPast = (day: number) => {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), day);
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < start;
  };

  return (
    <section id="transfer" className="jr-section jr-surface-deep">
      <div className="jr-container flex flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("cm.transfer.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-white">{t("cm.transfer.title")}</h2>
          <p className="jr-measure border-l-2 border-jr-gold py-2 pl-4 font-display text-2xl text-jr-white lg:text-3xl">
            {t("cm.transfer.promise")}
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <button
            type="button"
            aria-expanded={step !== "closed"}
            onClick={() => setStep(step === "closed" ? "form" : "closed")}
            className="jr-button self-start"
          >
            {step === "closed" ? t("cm.booking.open") : t("cm.booking.close")}
          </button>

          <div
            className={[
              "grid transition-all duration-700 ease-out",
              step === "closed"
                ? "pointer-events-none grid-rows-[0fr] opacity-0 blur-[4px]"
                : "grid-rows-[1fr] opacity-100 blur-0",
            ].join(" ")}
          >
            <div className="overflow-hidden">
              <div className="jr-panel flex flex-col gap-8 p-6 md:p-8">
                {step === "form" ? (
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          className="jr-button jr-button-quiet"
                          aria-label={t("cm.booking.prevMonth")}
                          onClick={() =>
                            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
                          }
                        >
                          ‹
                        </button>
                        <span className="font-display text-xl capitalize text-jr-gold">
                          {monthLabel}
                        </span>
                        <button
                          type="button"
                          className="jr-button jr-button-quiet"
                          aria-label={t("cm.booking.nextMonth")}
                          onClick={() =>
                            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
                          }
                        >
                          ›
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center">
                        {weekdays.map((day) => (
                          <span key={day} className="jr-label py-2 text-jr-bone/50">
                            {day}
                          </span>
                        ))}
                        {cells.map((day, index) => {
                          if (day === null)
                            return <span key={`empty-${index}`} className="min-h-[var(--jr-tap)]" />;
                          const isSelected =
                            selected &&
                            selected.getDate() === day &&
                            selected.getMonth() === cursor.getMonth() &&
                            selected.getFullYear() === cursor.getFullYear();
                          const disabled = isPast(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={disabled}
                              onClick={() =>
                                setSelected(new Date(cursor.getFullYear(), cursor.getMonth(), day))
                              }
                              className={[
                                "min-h-[var(--jr-tap)] border text-base transition-colors",
                                disabled
                                  ? "cursor-not-allowed border-transparent text-jr-bone/25"
                                  : "border-[color-mix(in_srgb,var(--jr-gold)_18%,transparent)] text-jr-bone",
                              ].join(" ")}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-origin" className={labelClass}>
                          {t("cm.transfer.origin")}
                        </label>
                        <select
                          id="bk-origin"
                          className={selectClass}
                          value={origin}
                          onChange={(event) => setOrigin(event.target.value)}
                        >
                          <option value="">{t("cm.booking.choose")}</option>
                          {places.map((place) => (
                            <option key={place} value={place}>
                              {place}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-destination" className={labelClass}>
                          {t("cm.transfer.destination")}
                        </label>
                        <select
                          id="bk-destination"
                          className={selectClass}
                          value={destination}
                          onChange={(event) => setDestination(event.target.value)}
                        >
                          <option value="">{t("cm.booking.choose")}</option>
                          {places.map((place) => (
                            <option key={place} value={place}>
                              {place}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-time" className={labelClass}>
                          {t("cm.transfer.time")}
                        </label>
                        <select
                          id="bk-time"
                          className={selectClass}
                          value={time}
                          onChange={(event) => setTime(event.target.value)}
                        >
                          <option value="">{t("cm.booking.choose")}</option>
                          {HOURS.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!ready}
                      onClick={() => setStep("login")}
                      className="jr-button self-start disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {t("cm.booking.reserve")}
                    </button>
                  </div>
                ) : null}

                {step === "login" ? (
                  <form
                    noValidate
                    onSubmit={(event) => {
                      event.preventDefault();
                      setStep("payment");
                    }}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="font-display text-2xl text-jr-gold">{t("cm.booking.loginTitle")}</h3>
                    <p className="jr-measure text-jr-bone/70">{t("cm.booking.loginText")}</p>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-email" className={labelClass}>
                          {t("cm.transfer.email")}
                        </label>
                        <input id="bk-email" type="email" required className="jr-field" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-pass" className={labelClass}>
                          {t("cm.booking.password")}
                        </label>
                        <input id="bk-pass" type="password" required className="jr-field" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button type="submit" className="jr-button">
                        {t("cm.booking.continue")}
                      </button>
                      <button
                        type="button"
                        className="jr-button jr-button-quiet"
                        onClick={() => setStep("form")}
                      >
                        {t("cm.booking.back")}
                      </button>
                    </div>
                  </form>
                ) : null}

                {step === "payment" ? (
                  <div className="flex flex-col gap-6">
                    <h3 className="font-display text-2xl text-jr-gold">
                      {t("cm.booking.paymentTitle")}
                    </h3>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {[
                        { label: t("cm.transfer.date"), value: selected?.toLocaleDateString(i18n.language) ?? "—" },
                        { label: t("cm.transfer.origin"), value: `${origin} → ${destination}` },
                        { label: t("cm.transfer.time"), value: time },
                      ].map((row) => (
                        <div key={row.label} className="flex min-w-0 flex-col gap-1">
                          <dt className="jr-label text-jr-bone/60">{row.label}</dt>
                          <dd className="text-jr-white">{row.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="jr-measure border-l-2 border-jr-gold py-2 pl-4 text-jr-white">
                      {t("cm.booking.notIncluded")}
                    </p>

                    <div className="flex flex-col gap-5 md:max-w-md">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="bk-card" className={labelClass}>
                          {t("cm.booking.card")}
                        </label>
                        <input
                          id="bk-card"
                          inputMode="numeric"
                          placeholder="•••• •••• •••• ••••"
                          className="jr-field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="bk-exp" className={labelClass}>
                            {t("cm.booking.expiry")}
                          </label>
                          <input id="bk-exp" placeholder="MM/AA" className="jr-field" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="bk-cvc" className={labelClass}>
                            CVC
                          </label>
                          <input id="bk-cvc" inputMode="numeric" placeholder="•••" className="jr-field" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button type="button" className="jr-button">
                        {t("cm.booking.pay")}
                      </button>
                      <button
                        type="button"
                        className="jr-button jr-button-quiet"
                        onClick={() => setStep("login")}
                      >
                        {t("cm.booking.back")}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
