type GoldTextProps = {
  text: string;
  baseClass?: string;
  goldClass?: string;
};

export function GoldText({
  text,
  baseClass = "text-jr-white",
  goldClass = "text-jr-gold",
}: GoldTextProps) {
  const parts = text.split(/(<gold>.*?<\/gold>)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("<gold>") && part.endsWith("</gold>")) {
          const inner = part.slice(6, -7);
          return (
            <span key={index} className={goldClass}>
              {inner}
            </span>
          );
        }
        return (
          <span key={index} className={baseClass}>
            {part}
          </span>
        );
      })}
    </>
  );
}
