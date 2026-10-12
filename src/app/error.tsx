"use client";

import Link from "next/link";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col items-center justify-center py-16 text-center">
      <h1 className="h2">Something broke.</h1>
      <p className="lead mt-4 max-w-md">
        The Shiba tripped over a cable. Give it another go, or head back home.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => retry()} className="btn btn-buy btn-xl">
          Try again
        </button>
        <Link href="/" className="btn btn-ghost btn-xl">
          Back home
        </Link>
      </div>
    </section>
  );
}
