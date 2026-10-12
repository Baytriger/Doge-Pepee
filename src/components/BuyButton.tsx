import { SITE } from "@/lib/site";
import { ArrowUpRight } from "./Icons";

type Props = {
  size?: "sm" | "md" | "xl";
  pulse?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function BuyButton({ size = "md", pulse = false, className = "", children }: Props) {
  const sizeClass = size === "xl" ? "btn-xl" : size === "sm" ? "btn-sm" : "";
  return (
    <a
      href={SITE.buyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-buy ${sizeClass} ${pulse ? "btn-buy-pulse" : ""} ${className}`}
    >
      <span>{children ?? "Buy $DOPE"}</span>
      <ArrowUpRight width={size === "xl" ? 24 : 18} height={size === "xl" ? 24 : 18} />
      <span className="sr-only"> (opens Brew in a new tab)</span>
    </a>
  );
}
