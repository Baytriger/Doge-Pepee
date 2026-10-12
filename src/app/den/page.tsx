import type { Metadata } from "next";
import { DenClient } from "./DenClient";

export const metadata: Metadata = {
  title: "The Dope Den",
  description:
    "Members area for Doge Pepe ($DOPE) holders and fans: meme kit, ready-to-post raids and your $DOPE balance.",
  alternates: { canonical: "/den" },
  robots: { index: false, follow: false },
};

export default function DenPage() {
  return <DenClient />;
}
