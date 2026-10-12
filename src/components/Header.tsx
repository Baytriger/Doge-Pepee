import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { BuyButton } from "./BuyButton";
import { XIcon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { WalletButton } from "./WalletButton";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50">
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Doge Pepe home">
          <Image
            src="/brand/dope-logo.webp"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full"
            priority
          />
          <span className="hidden text-lg font-extrabold tracking-tight min-[420px]:inline">
            Doge Pepe
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.name} on X`}
            className="btn btn-ghost !size-10 !p-0 max-md:hidden"
          >
            <XIcon width={16} height={16} />
          </a>
          <ThemeToggle />
          <WalletButton className="max-md:hidden" />
          <BuyButton size="sm" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
