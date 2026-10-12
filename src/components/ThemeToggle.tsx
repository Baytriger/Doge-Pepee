"use client";

import { MoonIcon, SunIcon } from "./Icons";

function applyTheme(next: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
  try {
    window.localStorage.setItem("dope-theme", next);
  } catch {
    /* storage unavailable; the choice just won't persist */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof document.startViewTransition !== "function") {
      applyTheme(next);
      return;
    }
    document.startViewTransition(() => applyTheme(next));
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Switch between light and dark theme"
      className={`theme-toggle btn btn-ghost !size-10 !p-0 ${className}`}
    >
      <SunIcon className="sun" />
      <MoonIcon className="moon" />
    </button>
  );
}
