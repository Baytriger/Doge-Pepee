import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page wandered off. Head back to Doge Pepe ($DOPE).",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="lattice pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative flex min-h-[calc(100dvh-4.25rem)] flex-col items-center justify-center py-16 text-center">
        <Image
          src="/brand/dope-logo.webp"
          alt="Doge Pepe mascot looking unimpressed"
          width={160}
          height={160}
          className="float size-36 rounded-full"
        />
        <p className="tabular mt-8 text-8xl font-extrabold tracking-tighter sm:text-9xl">404</p>
        <h1 className="h2 mt-2">Much lost. Very sad.</h1>
        <p className="lead mt-4 max-w-md">
          That page doesn&apos;t exist, or the Shiba buried it. Let&apos;s get you back.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-ink btn-xl">
            Back home
          </Link>
          <BuyButton size="xl">Buy $DOPE</BuyButton>
        </div>
      </div>
    </section>
  );
}
