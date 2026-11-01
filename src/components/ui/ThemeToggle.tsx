"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("helia-theme", nextTheme);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="relative flex items-center w-[66px] h-8 rounded-full border border-hairline bg-surface p-1 cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      style={{
        boxShadow: isDark
          ? "inset 0 2px 4px rgba(0, 0, 0, 0.45)"
          : "inset 0 2px 4px rgba(7, 11, 8, 0.08)",
      }}
    >
      {/* Sun Icon (Left Side) */}
      <div
        className={`absolute left-[7px] w-5 h-5 flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDark
            ? "opacity-0 scale-75 -rotate-45"
            : "opacity-100 scale-100 rotate-0 text-brand-text"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          {/* Sun center */}
          <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
          {/* Sun rays */}
          <line x1="12" y1="2" x2="12" y2="4.8" />
          <line x1="12" y1="19.2" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.8" y2="12" />
          <line x1="19.2" y1="12" x2="22" y2="12" />
          <line x1="4.9" y1="4.9" x2="6.9" y2="6.9" />
          <line x1="17.1" y1="17.1" x2="19.1" y2="19.1" />
          <line x1="4.9" y1="19.1" x2="6.9" y2="17.1" />
          <line x1="17.1" y1="6.9" x2="19.1" y2="4.9" />
        </svg>
      </div>

      {/* Moon & Star Icon (Right Side) */}
      <div
        className={`absolute right-[7px] w-5 h-5 flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isDark
            ? "opacity-100 scale-100 rotate-0 text-brand"
            : "opacity-0 scale-75 rotate-45 text-brand"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px]"
          fill="currentColor"
        >
          {/* Crescent Moon */}
          <path d="M12.3 20.2c-4.7 0-8.5-3.8-8.5-8.5 0-3.3 1.9-6.2 4.7-7.6-.4 1.1-.6 2.3-.6 3.6 0 5.4 4.4 9.8 9.8 9.8 1.1 0 2.2-.2 3.2-.6-1.5 2-4.9 3.3-8.6 3.3z" />
          {/* Star in crescent opening */}
          <polygon points="17.5,3.2 18.4,5.4 20.8,5.5 19,7 19.6,9.3 17.5,8 15.4,9.3 16,7 14.2,5.5 16.6,5.4" />
        </svg>
      </div>

      {/* Sliding Knob */}
      <span
        className={`relative z-10 block w-6 h-6 rounded-full transition-all duration-300 ease-out ${
          isDark
            ? "translate-x-0 bg-ink shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            : "translate-x-[34px] bg-white shadow-[0_2px_5px_rgba(7,11,8,0.18)] border border-hairline"
        }`}
      />
    </button>
  );
}
