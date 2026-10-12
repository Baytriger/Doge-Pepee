import { useSyncExternalStore } from "react";
import { SITE } from "./site";

/* A tiny BNB Chain wallet layer (EIP-1193 + EIP-6963). No heavy SDKs, so the
   client bundle stays small. State lives in a module store consumed through
   useSyncExternalStore. */

type Handler = (...args: unknown[]) => void;

export type Eip1193 = {
  request: (args: { method: string; params?: unknown }) => Promise<unknown>;
  on?: (event: string, handler: Handler) => void;
  removeListener?: (event: string, handler: Handler) => void;
};

export type WalletInfo = {
  id: string;
  name: string;
  icon?: string;
  provider: Eip1193;
};

export type WalletStatus =
  | "restoring"
  | "idle"
  | "connecting"
  | "signing"
  | "connected";

export type WalletState = {
  status: WalletStatus;
  address: string | null;
  wallets: WalletInfo[];
  discovered: boolean;
  balance: string | null;
  onBsc: boolean;
  error: string | null;
  dialogOpen: boolean;
};

const BSC_CHAIN_ID = "0x38";
const SESSION_KEY = "dope:session";
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;

const INITIAL: WalletState = {
  status: "restoring",
  address: null,
  wallets: [],
  discovered: false,
  balance: null,
  onBsc: false,
  error: null,
  dialogOpen: false,
};

let state: WalletState = INITIAL;
const listeners = new Set<() => void>();
let activeProvider: Eip1193 | null = null;
let booted = false;

function set(patch: Partial<WalletState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useWallet(): WalletState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => INITIAL,
  );
}

/* ---------- session persistence ---------- */

type Session = { address: string; walletId: string; at: number };

function readSession(): Session | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed.address || Date.now() - parsed.at > SESSION_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  try {
    if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage can be unavailable (private mode); the session just won't persist */
  }
}

/* ---------- wallet discovery ---------- */

function addWallet(wallet: WalletInfo) {
  if (state.wallets.some((w) => w.id === wallet.id)) return;
  set({ wallets: [...state.wallets, wallet] });
}

function discover() {
  window.addEventListener("eip6963:announceProvider", (event) => {
    const detail = (event as CustomEvent).detail as {
      info?: { uuid: string; name: string; icon?: string };
      provider?: Eip1193;
    };
    if (!detail?.info || !detail.provider) return;
    addWallet({
      id: detail.info.uuid,
      name: detail.info.name,
      icon: detail.info.icon,
      provider: detail.provider,
    });
  });
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

function legacyProvider(): Eip1193 | null {
  const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
  return eth && typeof eth.request === "function" ? eth : null;
}

/* ---------- helpers ---------- */

function errorCode(err: unknown): number | undefined {
  return typeof err === "object" && err !== null && "code" in err
    ? Number((err as { code: unknown }).code)
    : undefined;
}

function friendlyError(err: unknown): string {
  const code = errorCode(err);
  if (code === 4001) return "Request cancelled in your wallet. Try again when you're ready.";
  if (code === -32002) return "Your wallet already has a pending request. Open it and finish or cancel.";
  return "Couldn't connect. Check your wallet and try again.";
}

function toHex(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return (
    "0x" + Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  );
}

function randomNonce(): string {
  const bytes = new Uint8Array(12);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function switchToBsc(provider: Eip1193 | null = activeProvider) {
  if (!provider) return;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BSC_CHAIN_ID }],
    });
  } catch (err) {
    // 4902 = chain unknown to the wallet
    if (errorCode(err) !== 4902) throw err;
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: BSC_CHAIN_ID,
          chainName: "BNB Smart Chain",
          nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
          rpcUrls: ["https://bsc-dataseed.binance.org"],
          blockExplorerUrls: ["https://bscscan.com"],
        },
      ],
    });
  }
  void loadBalance();
}

async function loadBalance() {
  const provider = activeProvider;
  const address = state.address;
  if (!provider || !address) return;
  try {
    const chainId = (await provider.request({ method: "eth_chainId" })) as string;
    const onBsc = chainId?.toLowerCase() === BSC_CHAIN_ID;
    if (!onBsc) {
      set({ onBsc: false, balance: null });
      return;
    }
    const pad = address.slice(2).toLowerCase().padStart(64, "0");
    const call = (data: string) =>
      provider.request({
        method: "eth_call",
        params: [{ to: SITE.contract, data }, "latest"],
      }) as Promise<string>;
    const [rawBalance, rawDecimals] = await Promise.all([
      call("0x70a08231" + pad),
      call("0x313ce567"),
    ]);
    if (!rawBalance || rawBalance === "0x") {
      set({ onBsc: true, balance: null });
      return;
    }
    const decimals = rawDecimals && rawDecimals !== "0x" ? Number(BigInt(rawDecimals)) : 18;
    const value = BigInt(rawBalance);
    const base = BigInt(10) ** BigInt(decimals);
    const whole = value / base;
    const fraction = Number(((value % base) * BigInt(100)) / base) / 100;
    const text =
      whole.toLocaleString("en-US") +
      (fraction > 0 ? fraction.toFixed(2).slice(1) : "");
    set({ onBsc: true, balance: text });
  } catch {
    set({ balance: null });
  }
}

/* ---------- provider events ---------- */

const onAccountsChanged: Handler = (accounts) => {
  const next = Array.isArray(accounts) ? (accounts[0] as string | undefined) : undefined;
  if (!next || next.toLowerCase() !== state.address?.toLowerCase()) disconnect();
};

const onChainChanged: Handler = () => {
  void loadBalance();
};

function attach(provider: Eip1193) {
  activeProvider = provider;
  provider.on?.("accountsChanged", onAccountsChanged);
  provider.on?.("chainChanged", onChainChanged);
}

function detach() {
  activeProvider?.removeListener?.("accountsChanged", onAccountsChanged);
  activeProvider?.removeListener?.("chainChanged", onChainChanged);
  activeProvider = null;
}

/* ---------- public actions ---------- */

export function initWallet() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  discover();

  const session = readSession();
  window.setTimeout(() => {
    if (!state.wallets.length) {
      const legacy = legacyProvider();
      if (legacy) addWallet({ id: "injected", name: "Browser wallet", provider: legacy });
    }
    set({ discovered: true });
    if (!session) {
      set({ status: "idle" });
      return;
    }
    const wallet =
      state.wallets.find((w) => w.id === session.walletId) ?? state.wallets[0];
    if (!wallet) {
      writeSession(null);
      set({ status: "idle" });
      return;
    }
    wallet.provider
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        const match = (accounts as string[]).find(
          (a) => a.toLowerCase() === session.address.toLowerCase(),
        );
        if (!match) throw new Error("session expired");
        attach(wallet.provider);
        set({ status: "connected", address: match });
        void loadBalance();
      })
      .catch(() => {
        writeSession(null);
        set({ status: "idle" });
      });
  }, 350);
}

export function openWalletDialog() {
  set({ dialogOpen: true, error: null });
}

export function closeWalletDialog() {
  set({ dialogOpen: false });
}

export async function connectWallet(wallet: WalletInfo) {
  set({ status: "connecting", error: null });
  try {
    const accounts = (await wallet.provider.request({
      method: "eth_requestAccounts",
    })) as string[];
    const address = accounts?.[0];
    if (!address) throw new Error("no account");

    try {
      await switchToBsc(wallet.provider);
    } catch (err) {
      if (errorCode(err) === 4001) throw err;
      // Staying on another network is fine for signing in; balance just stays hidden.
    }

    set({ status: "signing" });
    const message = [
      "Welcome to Doge Pepe ($DOPE)",
      "",
      "Sign this message to enter the Dope Den. It is free, costs no gas and never gives anyone access to your funds.",
      "",
      `Wallet: ${address}`,
      `Nonce: ${randomNonce()}`,
      `Issued: ${new Date().toISOString()}`,
    ].join("\n");
    await wallet.provider.request({
      method: "personal_sign",
      params: [toHex(message), address],
    });

    detach();
    attach(wallet.provider);
    writeSession({ address, walletId: wallet.id, at: Date.now() });
    set({ status: "connected", address, dialogOpen: false, error: null });
    void loadBalance();
  } catch (err) {
    set({ status: "idle", error: friendlyError(err) });
  }
}

export function disconnect() {
  detach();
  writeSession(null);
  set({ status: "idle", address: null, balance: null, onBsc: false });
}

/** Deep links so mobile visitors without an injected wallet can open the site in a wallet's browser. */
export function walletDeepLink(kind: "metamask" | "trust"): string {
  const { host, pathname, search } = window.location;
  const url = window.location.href;
  if (kind === "metamask") return `https://metamask.app.link/dapp/${host}${pathname}${search}`;
  return `https://link.trustwallet.com/open_url?coin_id=20000714&url=${encodeURIComponent(url)}`;
}
