"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { CloseIcon, MenuIcon, XIcon } from "./Icons";
import { WalletButton } from "./WalletButton";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="btn btn-ghost !size-10 !p-0"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="enter fixed inset-x-0 top-[4.25rem] z-40 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-line bg-bg/95 px-5 pb-8 pt-4 backdrop-blur-xl"
        >
          <ul className="flex flex-col">
            {[...NAV, { label: "Dope Den", href: "/den" }].map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center text-xl font-bold tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <WalletButton className="!h-12 w-full justify-center" />
            <a
              href={SITE.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
            >
              <XIcon width={16} height={16} />
              Follow {SITE.xHandle}
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
