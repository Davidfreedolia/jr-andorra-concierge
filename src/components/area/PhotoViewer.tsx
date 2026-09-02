import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { formatDate } from "@/lib/area-format";
import type { ReportPhoto } from "@/mocks/area";

export function PhotoViewer({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: ReportPhoto[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const { t, i18n } = useTranslation();
  const photo = photos[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onClose, onIndexChange]);

  if (!photo) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={t("area.report.photosTitle")} className="jr-viewer">
      <div className="jr-viewer-bar">
        <span className="jr-label">
          {t(`area.zones.${photo.zoneKey}`)} — {formatDate(photo.date, i18n.language)}
        </span>
        <button type="button" onClick={onClose} className="jr-button jr-button-quiet">
          {t("area.close")}
        </button>
      </div>

      <img
        src={photo.url}
        alt={`${t(`area.zones.${photo.zoneKey}`)} — ${formatDate(photo.date, i18n.language)}`}
        className="jr-viewer-image"
      />

      <div className="jr-viewer-bar">
        <button
          type="button"
          className="jr-button jr-button-quiet"
          onClick={() => onIndexChange((index - 1 + photos.length) % photos.length)}
        >
          {t("area.previous")}
        </button>
        <span className="jr-label">
          {t("area.report.photoOf", { index: index + 1, total: photos.length })}
        </span>
        <button
          type="button"
          className="jr-button jr-button-quiet"
          onClick={() => onIndexChange((index + 1) % photos.length)}
        >
          {t("area.next")}
        </button>
      </div>
    </div>
  );
}
