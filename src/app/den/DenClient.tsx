"use client";

import Image from "next/image";
import { CopyButton } from "@/components/CopyButton";
import { BuyButton } from "@/components/BuyButton";
import { ArrowUpRight, DownloadIcon, LockIcon, WalletIcon, XIcon } from "@/components/Icons";
import { SITE, shortAddress } from "@/lib/site";
import { disconnect, openWalletDialog, switchToBsc, useWallet } from "@/lib/wallet";

const POSTS = [
  "Much wow. Very feels. $DOPE is a Shiba with Pepe's face and I'm not sorry. 🐕🐸 @dopeonbsc",
  "Other coins have roadmaps. $DOPE has a Shiba that looks like it just checked the chart. 🐸 @dopeonbsc",
  "If you can read this, you're early to the Dope Den. $DOPE on BNB Chain. @dopeonbsc",
] as const;

const KIT = [
  { name: "Logo (PNG)", file: "/brand/icon-512.png", download: "doge-pepe-logo.png" },
  { name: "Logo (WebP)", file: "/brand/dope-logo.webp", download: "doge-pepe-logo.webp" },
  { name: "X banner", file: "/brand/dope-banner.png", download: "doge-pepe-banner.png" },
] as const;

function postUrl(text: string) {
  return `https://x.com/intent/post?text=${encodeURIComponent(text)}`;
}

function DenSkeleton() {
  return (
    <section className="section" aria-busy="true" aria-label="Loading the Dope Den">
      <div className="container-x space-y-6">
        <div className="skeleton h-14 w-3/4 max-w-lg" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="skeleton h-40" />
          <div className="skeleton h-40" />
        </div>
        <div className="skeleton h-72" />
      </div>
    </section>
  );
}

function Gate() {
  const wallet = useWallet();
  const busy = wallet.status === "connecting" || wallet.status === "signing";
  return (
    <section className="hero-bg relative overflow-hidden">
      <div className="lattice pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative flex min-h-[calc(100dvh-4.25rem)] items-center justify-center py-16">
        <div className="card enter w-full max-w-lg p-8 text-center sm:p-12">
          <div className="relative mx-auto size-28">
            <Image
              src="/brand/dope-logo.webp"
              alt="Doge Pepe mascot"
              width={112}
              height={112}
              className="float size-full rounded-full"
            />
            <span className="absolute -bottom-1 -right-1 grid size-9 place-items-center rounded-full bg-ink text-bg">
              <LockIcon width={16} height={16} />
            </span>
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">
            The Dope Den
          </h1>
          <p className="lead mt-4">
            Connect a BNB Chain wallet to unlock the meme kit, ready-made raids and your $DOPE
            balance.
          </p>
          <button
            type="button"
            onClick={openWalletDialog}
            disabled={busy}
            className="btn btn-buy btn-xl mt-8 w-full"
          >
            <WalletIcon width={22} height={22} />
            {busy ? "Check your wallet…" : "Connect wallet"}
          </button>
          {wallet.error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-red-600 dark:text-red-400">
              {wallet.error}
            </p>
          )}
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Signing is free and never gives anyone access to your funds.
          </p>
          <p className="mt-6 text-sm">
            <a
              href={SITE.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline decoration-brand decoration-2 underline-offset-4"
            >
              Don&apos;t hold $DOPE yet? Buy it first
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Members({ address }: { address: string }) {
  const wallet = useWallet();
  return (
    <section className="section pt-10 md:pt-16">
      <div className="container-x">
        <div className="enter flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="pill">
              <span className="live-dot" aria-hidden="true" />
              <span className="tabular">{shortAddress(address)}</span>
            </p>
            <h1 className="h2 mt-4">Welcome to the Den</h1>
            <p className="lead mt-3 max-w-xl">Everything for holders and fans, in one place.</p>
          </div>
          <button type="button" onClick={disconnect} className="btn btn-ghost btn-sm self-start sm:self-auto">
            Disconnect
          </button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="card p-7">
            <p className="eyebrow">Your $DOPE</p>
            <p className="tabular mt-3 text-5xl font-extrabold tracking-tighter">
              {wallet.balance ?? "—"}
            </p>
            {!wallet.onBsc ? (
              <button
                type="button"
                onClick={() => {
                  void switchToBsc().catch(() => undefined);
                }}
                className="btn btn-ghost btn-sm mt-5"
              >
                Switch to BNB Chain to see your balance
              </button>
            ) : wallet.balance === null ? (
              <p className="mt-4 text-sm text-muted">Couldn&apos;t read your balance right now.</p>
            ) : null}
          </div>

          <div className="card flex flex-col justify-between gap-6 bg-brand p-7 text-brand-ink">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70">Stack up</p>
              <p className="mt-3 text-3xl font-extrabold tracking-tight">Want more $DOPE?</p>
            </div>
            <BuyButton size="md" className="btn-ink !bg-ink !text-bg self-start !shadow-none">
              Buy on Brew
            </BuyButton>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="h3 text-2xl">Meme kit</h2>
          <p className="mt-2 text-muted">Free to use. Post them everywhere.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {KIT.map((item) => (
              <li key={item.file} className="card card-hover overflow-hidden">
                <div className="grid aspect-[4/3] place-items-center bg-surface-2">
                  <Image
                    src={item.file}
                    alt={`${item.name} preview`}
                    width={240}
                    height={item.name === "X banner" ? 80 : 240}
                    className={item.name === "X banner" ? "w-4/5 rounded-lg" : "size-28 rounded-full"}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <span className="font-bold">{item.name}</span>
                  <a
                    href={item.file}
                    download={item.download}
                    className="btn btn-ghost !size-10 !p-0"
                    aria-label={`Download ${item.name}`}
                  >
                    <DownloadIcon width={18} height={18} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="h3 text-2xl">Raid the timeline</h2>
          <p className="mt-2 text-muted">Pick a post, tweak it, send it.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {POSTS.map((text) => (
              <li key={text} className="card flex flex-col justify-between gap-6 p-6">
                <p className="leading-relaxed">{text}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={postUrl(text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ink btn-sm flex-1"
                  >
                    <XIcon width={14} height={14} />
                    Post on X
                  </a>
                  <CopyButton value={text} label="Copy post" variant="pill" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <a href={SITE.xUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <XIcon width={16} height={16} />
            {SITE.xHandle}
          </a>
          <a href={SITE.bscscanUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            BscScan
            <ArrowUpRight width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function DenClient() {
  const wallet = useWallet();
  if (wallet.status === "restoring") return <DenSkeleton />;
  if (wallet.status === "connected" && wallet.address) {
    return <Members address={wallet.address} />;
  }
  return <Gate />;
}
