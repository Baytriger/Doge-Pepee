export const SITE = {
  name: "Doge Pepe",
  ticker: "$DOPE",
  title: "Doge Pepe ($DOPE) | The Shiba with the Pepe face on BNB Chain",
  description:
    "Doge Pepe ($DOPE) is a meme token on BNB Chain: a Shiba with Pepe's face. Buy $DOPE, follow @dopeonbsc on X and connect your wallet to enter the Dope Den.",
  contract: "0x19f456bcc812060805ed6b5ba74c71d64ed86666",
  buyUrl:
    "https://brew.family/token/?address=0x19f456bcc812060805ed6b5ba74c71d64ed86666",
  xUrl: "https://x.com/dopeonbsc",
  xHandle: "@dopeonbsc",
  bscscanUrl:
    "https://bscscan.com/token/0x19f456bcc812060805ed6b5ba74c71d64ed86666",
} as const;

/** Absolute origin used for canonical URLs, the sitemap and social cards. */
export function siteOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export const NAV = [
  { label: "About", href: "/#about" },
  { label: "How to buy", href: "/#how-to-buy" },
  { label: "Contract", href: "/#contract" },
  { label: "Community", href: "/#community" },
  { label: "FAQ", href: "/#faq" },
] as const;
