import logoAsset from "@/assets/jr-logo.png.asset.json";

type LogoJRProps = {
  title: string;
  className?: string;
};

/** Final brand mark — used as supplied, never redrawn. */
export function LogoJR({ title, className }: LogoJRProps) {
  return <img src={logoAsset.url} alt={title} className={className} />;
}
