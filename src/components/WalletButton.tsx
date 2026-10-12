"use client";

import Link from "next/link";
import { openWalletDialog, useWallet } from "@/lib/wallet";
import { shortAddress } from "@/lib/site";
import { WalletIcon } from "./Icons";

export function WalletButton({ className = "" }: { className?: string }) {
  const wallet = useWallet();

  if (wallet.status === "restoring") {
    return <span aria-hidden="true" className={`skeleton h-10 w-36 ${className}`} />;
  }

  if (wallet.status === "connected" && wallet.address) {
    return (
      <Link href="/den" className={`btn btn-ghost btn-sm tabular ${className}`}>
        <span className="live-dot" aria-hidden="true" />
        <span>{shortAddress(wallet.address)}</span>
        <span className="sr-only">Open the Dope Den</span>
      </Link>
    );
  }

  const busy = wallet.status === "connecting" || wallet.status === "signing";
  return (
    <button
      type="button"
      onClick={openWalletDialog}
      disabled={busy}
      className={`btn btn-ghost btn-sm ${className}`}
    >
      <WalletIcon width={18} height={18} />
      {busy ? "Check your wallet…" : "Connect wallet"}
    </button>
  );
}
