"use client";

import { useEffect, useRef } from "react";
import {
  closeWalletDialog,
  connectWallet,
  initWallet,
  useWallet,
  walletDeepLink,
} from "@/lib/wallet";
import { CloseIcon, LockIcon } from "./Icons";

export function WalletDialog() {
  const wallet = useWallet();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    initWallet();
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (wallet.dialogOpen && !dialog.open) dialog.showModal();
    if (!wallet.dialogOpen && dialog.open) dialog.close();
  }, [wallet.dialogOpen]);

  const busy = wallet.status === "connecting" || wallet.status === "signing";
  const status =
    wallet.status === "connecting"
      ? "Approve the connection in your wallet…"
      : wallet.status === "signing"
        ? "Sign the free message in your wallet to finish."
        : null;

  return (
    <dialog
      ref={ref}
      className="wallet-dialog"
      aria-labelledby="wallet-title"
      onClose={closeWalletDialog}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) closeWalletDialog();
      }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="wallet-title" className="text-2xl font-extrabold tracking-tight">
              Connect your wallet
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Use a BNB Chain wallet to enter the Dope Den. Signing is free and never moves funds.
            </p>
          </div>
          <button
            type="button"
            onClick={closeWalletDialog}
            aria-label="Close"
            className="btn btn-ghost !size-9 shrink-0 !p-0"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div className="mt-6 space-y-2.5">
          {wallet.wallets.map((w) => (
            <button
              key={w.id}
              type="button"
              disabled={busy}
              onClick={() => connectWallet(w)}
              className="flex h-14 w-full items-center gap-3 rounded-2xl border border-line bg-bg px-4 text-left font-bold transition-colors hover:border-ink"
            >
              {w.icon ? (
                // Wallet-supplied data URI; cannot go through the image optimiser.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.icon} alt="" width={28} height={28} className="size-7 rounded-md" />
              ) : (
                <span className="grid size-7 place-items-center rounded-md bg-brand text-brand-ink">
                  <LockIcon width={14} height={14} />
                </span>
              )}
              {w.name}
            </button>
          ))}

          {wallet.discovered && wallet.wallets.length === 0 && (
            <div className="space-y-2.5">
              <p className="rounded-2xl border border-line bg-bg p-4 text-sm leading-relaxed text-muted">
                No wallet found in this browser. On mobile, open this page inside your wallet app:
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = walletDeepLink("metamask");
                }}
                className="btn btn-ghost w-full"
              >
                Open in MetaMask
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = walletDeepLink("trust");
                }}
                className="btn btn-ghost w-full"
              >
                Open in Trust Wallet
              </button>
            </div>
          )}

          {!wallet.discovered && <div className="skeleton h-14 w-full" aria-hidden="true" />}
        </div>

        <div aria-live="polite" className="mt-4 min-h-5 text-sm">
          {status && <p className="font-semibold">{status}</p>}
          {wallet.error && (
            <p role="alert" className="font-semibold text-red-600 dark:text-red-400">
              {wallet.error}
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
