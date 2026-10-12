import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { CopyButton } from "@/components/CopyButton";
import { ArrowUpRight, LockIcon, PlusIcon, XIcon } from "@/components/Icons";
import { SITE, shortAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.title },
  alternates: { canonical: "/" },
};

const TICKER = ["$DOPE", "Much wow", "Very Pepe", "Such Doge", "BNB Chain", "Very feels", "Zero chill"];

const ABOUT = [
  {
    title: "The Doge",
    body: "The Shiba that started it all. Loyal, loud and legally required to say “wow”.",
  },
  {
    title: "The Pepe",
    body: "The sad frog face that has been every internet mood since before you had a wallet.",
  },
  {
    title: "The $DOPE",
    body: "Both, in one pixelated good boy. A meme with the expression of someone who just checked the chart.",
  },
] as const;

const STEPS = [
  {
    title: "Get a wallet",
    body: "Install MetaMask or Trust Wallet and switch it to BNB Smart Chain.",
  },
  {
    title: "Add some BNB",
    body: "Buy BNB on an exchange and send it to your wallet. You need it for the swap and for gas.",
  },
  {
    title: "Swap for $DOPE",
    body: "Hit Buy, connect your wallet on Brew and confirm the contract below matches before you swap.",
  },
] as const;

const FAQ = [
  {
    q: "What is Doge Pepe?",
    a: "Doge Pepe ($DOPE) is a meme token on BNB Chain. The mascot is a pixelated Shiba wearing Pepe's face. That's the whole concept.",
  },
  {
    q: "Which network is $DOPE on?",
    a: "BNB Smart Chain (BSC). Make sure your wallet is on that network and that you're buying the contract address shown on this page.",
  },
  {
    q: "How do I buy $DOPE?",
    a: "Use the Buy $DOPE button anywhere on this site. It opens the token page on Brew where you can connect your wallet and swap BNB for $DOPE.",
  },
  {
    q: "What is the Dope Den?",
    a: "The members area. Connect a BNB Chain wallet, sign a free message (no gas, no access to funds) and you get the meme kit, ready-made posts for X and your $DOPE balance.",
  },
  {
    q: "Do I need a wallet to browse the site?",
    a: "No. The whole landing page is open. A wallet is only needed for the Dope Den.",
  },
  {
    q: "Is this financial advice?",
    a: "No. $DOPE is a meme token for fun with no promise of returns. Do your own research and never spend more than you can afford to lose.",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="hero-bg relative overflow-hidden">
        <div className="lattice pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 pb-20 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-28 md:pt-20">
          <div>
            <p className="pill enter" style={{ "--d": "0ms" } as React.CSSProperties}>
              <span className="live-dot" aria-hidden="true" />
              Live on BNB Chain
            </p>

            <h1
              className="h1 enter mt-6"
              style={{ "--d": "80ms" } as React.CSSProperties}
            >
              Doge <span className="mark">Pepe</span>
            </h1>

            <p
              className="lead enter mt-6 max-w-xl"
              style={{ "--d": "160ms" } as React.CSSProperties}
            >
              <strong className="font-extrabold text-ink">$DOPE</strong> is a Shiba with
              Pepe&apos;s face. Much wow, very feels, zero chill. Grab some before the frog changes
              his mind.
            </p>

            <div
              className="enter mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              <BuyButton size="xl" pulse className="w-full sm:w-auto">
                Buy $DOPE
              </BuyButton>
              <a
                href={SITE.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !h-16 w-full sm:w-auto"
              >
                <XIcon width={18} height={18} />
                Follow on X
              </a>
            </div>

            <div
              className="enter mt-6 inline-flex max-w-full items-center gap-1 rounded-full border border-line bg-surface/70 py-1 pl-4 pr-1 backdrop-blur"
              style={{ "--d": "320ms" } as React.CSSProperties}
            >
              <span className="eyebrow">CA</span>
              <code className="tabular truncate px-2 text-sm font-semibold">
                {shortAddress(SITE.contract)}
              </code>
              <CopyButton value={SITE.contract} label="Copy contract address" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[26rem] md:max-w-none">
            <div
              className="enter relative aspect-square"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              <div
                className="spin-slow absolute -inset-4 rounded-full border-2 border-dashed border-ink/20"
                aria-hidden="true"
              />
              <div className="float absolute inset-0">
                <Image
                  src="/brand/dope-logo.webp"
                  alt="Doge Pepe mascot: a pixelated Shiba Inu with Pepe the Frog's sad face"
                  width={400}
                  height={400}
                  priority
                  sizes="(max-width: 768px) 80vw, 420px"
                  className="size-full rounded-full shadow-[0_40px_90px_-30px_var(--glow)]"
                />
              </div>
              <span
                className="float-slow card absolute -left-2 top-[12%] rotate-[-8deg] px-4 py-2 text-sm font-extrabold shadow-lg sm:-left-6"
                aria-hidden="true"
              >
                much wow
              </span>
              <span
                className="float card absolute -right-2 bottom-[14%] rotate-[6deg] px-4 py-2 text-sm font-extrabold shadow-lg sm:-right-6"
                aria-hidden="true"
              >
                very feels
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Ticker ───────── */}
      <div
        className="border-y border-line bg-brand py-4 text-brand-ink"
        aria-hidden="true"
      >
        <div className="marquee">
          {[0, 1].map((n) => (
            <div key={n} className="marquee-track items-center text-lg font-extrabold uppercase tracking-tight">
              {TICKER.map((t) => (
                <span key={`${n}-${t}`} className="flex items-center gap-10">
                  {t}
                  <span className="size-2 rotate-45 bg-brand-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── About ───────── */}
      <section id="about" className="section">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">The lore</p>
            <h2 className="h2 mt-3">What happens when Doge meets Pepe?</h2>
            <p className="lead mt-5">
              Two of the internet&apos;s most recognisable faces, one very confused Shiba. It is
              equal parts joke, mascot and community, and it&apos;s all out in the open.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {ABOUT.map((item, i) => (
              <li
                key={item.title}
                className="reveal card card-hover p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="tabular grid size-11 place-items-center rounded-full bg-brand text-sm font-extrabold text-brand-ink">
                  0{i + 1}
                </span>
                <h3 className="h3 mt-6">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── How to buy ───────── */}
      <section id="how-to-buy" className="section border-t border-line bg-surface-2/50">
        <div className="container-x">
          <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">How to buy</p>
              <h2 className="h2 mt-3">Three steps to $DOPE</h2>
            </div>
            <BuyButton size="xl" className="w-full md:w-auto">
              Buy $DOPE now
            </BuyButton>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="reveal card p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="tabular text-6xl font-extrabold tracking-tighter text-brand">
                  {i + 1}
                </span>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Contract ───────── */}
      <section id="contract" className="section">
        <div className="container-x">
          <div className="reveal card relative overflow-hidden p-7 md:p-12">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/30 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="eyebrow">Contract address · BNB Smart Chain</p>
                <h2 className="h2 mt-3">Verify before you swap</h2>
                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-bg p-2 pl-4">
                  <code className="tabular min-w-0 flex-1 break-all text-sm font-semibold sm:text-base">
                    {SITE.contract}
                  </code>
                  <CopyButton value={SITE.contract} label="Copy contract address" />
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  Anyone can launch a lookalike token. Always compare the address in your wallet or
                  on Brew with this one.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:w-60">
                <BuyButton size="xl" className="!h-14 !px-6 !text-lg">
                  Buy $DOPE
                </BuyButton>
                <a
                  href={SITE.bscscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  View on BscScan
                  <ArrowUpRight width={16} height={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Community ───────── */}
      <section id="community" className="section border-t border-line pt-16 md:pt-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Community</p>
            <h2 className="h2 mt-3">Join the pack</h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <a
              href={SITE.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal card card-hover group flex min-h-72 flex-col justify-between bg-ink p-8 text-bg"
            >
              <XIcon width={36} height={36} />
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Follow {SITE.xHandle}
                </h3>
                <p className="mt-2 max-w-sm opacity-70">
                  News, memes and raids happen on X first.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold text-brand">
                  Open X
                  <ArrowUpRight
                    width={18}
                    height={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </a>

            <Link
              href="/den"
              className="reveal card card-hover group flex min-h-72 flex-col justify-between bg-brand p-8 text-brand-ink"
              style={{ animationDelay: "60ms" }}
            >
              <LockIcon width={36} height={36} />
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight">Enter the Dope Den</h3>
                <p className="mt-2 max-w-sm opacity-75">
                  Connect your wallet for the meme kit, ready-to-post raids and your $DOPE balance.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-bold">
                  Connect wallet
                  <ArrowUpRight
                    width={18}
                    height={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="section border-t border-line bg-surface-2/50">
        <div className="container-x grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-3">Questions, answered</h2>
          </div>
          <div className="faq reveal divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 text-lg font-bold tracking-tight">
                  {item.q}
                  <PlusIcon className="plus shrink-0" />
                </summary>
                <p className="faq-body pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="section">
        <div className="container-x">
          <div className="reveal relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center text-brand-ink md:py-20">
            <div className="lattice absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="h2">Much wow awaits.</h2>
              <p className="mx-auto mt-4 max-w-md text-lg font-medium opacity-80">
                One tap to Brew, one swap to $DOPE.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={SITE.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink btn-xl w-full sm:w-auto"
                >
                  Buy $DOPE
                  <ArrowUpRight width={24} height={24} />
                  <span className="sr-only"> (opens Brew in a new tab)</span>
                </a>
                <a
                  href={SITE.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn !h-16 w-full border border-brand-ink/25 sm:w-auto"
                >
                  <XIcon width={18} height={18} />
                  Follow on X
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
