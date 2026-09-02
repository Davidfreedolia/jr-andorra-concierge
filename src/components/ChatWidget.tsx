import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";
import { WHATSAPP_URL } from "@/lib/contact";

type Message = { id: number; from: "bot" | "user"; text: string };
type Topic = { q: string; a: string };

/** Discreet concierge assistant. Scripted answers, WhatsApp handoff. UI only. */
export function ChatWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const topics = tList<Topic>(t, "chat.topics");
  const [messages, setMessages] = useState<Message[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 0, from: "bot", text: t("chat.greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    const node = bodyRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, open]);

  function ask(topic: Topic) {
    const base = nextId.current;
    nextId.current += 2;
    setMessages((prev) => [...prev, { id: base, from: "user", text: topic.q }]);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: base + 1, from: "bot", text: topic.a }]);
    }, 420);
  }

  return (
    <div className="jr-chat">
      {open ? (
        <section className="jr-chat-panel" aria-label={t("chat.title")}>
          <header className="jr-chat-head">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="jr-label text-jr-gold">{t("chat.title")}</p>
              <p className="text-xs opacity-70">{t("chat.subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("chat.close")}
              className="jr-chat-x"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="jr-chat-body" ref={bodyRef}>
            {messages.map((message) => (
              <p
                key={message.id}
                className={message.from === "bot" ? "jr-chat-bot" : "jr-chat-user"}
              >
                {message.text}
              </p>
            ))}
          </div>

          <div className="jr-chat-topics">
            {topics.map((topic) => (
              <button key={topic.q} type="button" className="jr-chat-chip" onClick={() => ask(topic)}>
                {topic.q}
              </button>
            ))}
          </div>

          <footer className="jr-chat-foot">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jr-button w-full"
            >
              {t("chat.whatsapp")}
            </a>
            <p className="mt-2 text-center text-xs opacity-60">{t("chat.note")}</p>
          </footer>
        </section>
      ) : null}

      <button
        type="button"
        className="jr-chat-launcher"
        aria-expanded={open}
        aria-label={open ? t("chat.close") : t("chat.open")}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M4 5.5h16v11H9l-5 4v-15z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
