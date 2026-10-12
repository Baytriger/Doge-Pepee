import Image from "next/image";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-[70dvh] place-items-center"
    >
      <div className="flex flex-col items-center gap-5">
        <Image
          src="/brand/dope-logo.webp"
          alt=""
          width={72}
          height={72}
          className="float size-[4.5rem] rounded-full"
        />
        <div className="skeleton h-3 w-32" aria-hidden="true" />
        <span className="sr-only">Loading Doge Pepe…</span>
      </div>
    </div>
  );
}
