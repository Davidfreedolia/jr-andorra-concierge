import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

/**
 * Subtle CSS-only appearance on entering the viewport.
 * No animation library; prefers-reduced-motion is honoured in CSS.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  /** Stagger in ms for lists of cards. */
  delay?: number;
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={["jr-reveal", visible ? "jr-reveal-in" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
