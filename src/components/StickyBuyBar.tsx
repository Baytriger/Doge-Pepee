import { BuyButton } from "./BuyButton";

/** Thumb-reach Buy button on phones, so buying is never more than a tap away. */
export function StickyBuyBar() {
  return (
    <div className="sticky-buy fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      <BuyButton size="xl" className="!h-14 w-full text-lg">
        Buy $DOPE
      </BuyButton>
    </div>
  );
}
