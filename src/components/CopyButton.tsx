"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./Icons";

type Props = {
  value: string;
  label?: string;
  variant?: "icon" | "pill";
  className?: string;
};

async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Older in-app browsers: fall back to a hidden textarea.
    try {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({ value, label = "Copy", variant = "icon", className = "" }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  async function onClick() {
    const ok = await copyText(value);
    setState(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1900);
  }

  const text = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`btn btn-ghost btn-sm ${className}`}
      >
        {state === "copied" ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
        <span aria-live="polite">{text}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${text}`}
      title={text}
      className={`grid size-9 place-items-center rounded-full transition-colors hover:bg-ink/10 ${className}`}
    >
      {state === "copied" ? <CheckIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
    </button>
  );
}
