import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { XIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-14 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/dope-logo.webp"
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full"
              />
              <span className="text-xl font-extrabold tracking-tight">Doge Pepe</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A Shiba with Pepe&apos;s face. Much wow, very feels, live on BNB Chain.
            </p>
          </div>

          <nav aria-label="Footer" className="text-sm">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-3 font-semibold">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/den" className="text-muted transition-colors hover:text-ink">
                  Dope Den
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-sm">
            <p className="eyebrow mb-4">Find $DOPE</p>
            <ul className="space-y-3 font-semibold">
              <li>
                <a
                  href={SITE.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                >
                  <XIcon width={14} height={14} />
                  {SITE.xHandle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  Buy on Brew
                </a>
              </li>
              <li>
                <a
                  href={SITE.bscscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  View on BscScan
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-muted">
          Doge Pepe ($DOPE) is a meme token created for entertainment. It has no intrinsic value
          and no promise of financial return. Nothing on this site is financial advice. Crypto is
          volatile: only spend what you can afford to lose and always verify the contract address.
          © 2026 Doge Pepe.
        </p>
      </div>
    </footer>
  );
}
