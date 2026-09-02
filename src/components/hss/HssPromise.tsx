import { Trans } from "react-i18next";
import { Reveal } from "@/components/Reveal";

export function HssPromise() {
  return (
    <section className="jr-section">
      <Reveal className="jr-container flex flex-col items-center gap-8 text-center">
        <p className="jr-display-2 max-w-[22ch] text-jr-white">
          <Trans
            i18nKey="hss.promise.quote"
            components={[<span className="text-jr-gold" />]}
          />
        </p>
        <p className="jr-measure text-muted-foreground">
          <Trans i18nKey="hss.promise.line" />
        </p>
      </Reveal>
    </section>
  );
}
