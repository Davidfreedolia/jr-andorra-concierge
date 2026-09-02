import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { LogoJR } from "@/components/LogoJR";

export function AccessScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      setError(t("area.access.error"));
      return;
    }
    // Provisional: no magic link is sent, this is interface only.
    setError(null);
    setSent(true);
  };

  return (
    <main className="jr-access">
      <img
        src="/hero.jpg"
        alt={t("area.access.backdropAlt")}
        className="jr-access-backdrop"
        decoding="async"
      />

      <div className="jr-access-panel">
        <LogoJR title={t("common.logoAlt")} className="jr-logo mx-auto" />
        <h1 className="jr-display-2 text-center text-jr-gold">{t("area.access.title")}</h1>
        <p className="text-center text-muted-foreground">{t("area.access.intro")}</p>

        <form noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          <label htmlFor="access-email" className="jr-label text-muted-foreground">
            {t("area.access.email")}
          </label>
          <input
            id="access-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground"
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button type="submit" className="jr-button w-full">
            {t("area.access.submit")}
          </button>
          {sent ? (
            <p role="status" className="text-center text-sm text-muted-foreground">
              {t("area.access.sent")}
            </p>
          ) : null}
        </form>

        <Link to="/area" className="jr-area-inline-link">
          {t("area.access.preview")}
        </Link>
      </div>
    </main>
  );
}
