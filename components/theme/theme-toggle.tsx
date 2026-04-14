"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeToggleProps = {
  compact?: boolean;
};

const STORAGE_KEY = "real-journey-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const resolved: Theme = stored === "light" ? "light" : "dark";
    applyTheme(resolved);
    setTheme(resolved);
    setMounted(true);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        const updated = theme === "dark" ? "light" : "dark";
        applyTheme(updated);
        setTheme(updated);
      }}
      className={`inline-flex items-center justify-center rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] text-sm font-medium transition hover:-translate-y-0.5 ${
        compact ? "px-3 py-2" : "px-4 py-2"
      }`}
      aria-label={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
    >
      {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
    </button>
  );
}
