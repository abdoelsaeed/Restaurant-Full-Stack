"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative flex h-10 w-10 items-center justify-center
        rounded-full
        bg-gray-200/80 dark:bg-gray-800/80
        hover:bg-gray-300 dark:hover:bg-gray-700
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-primary
      "
    >
      {/* Sun */}
      <Sun
        className={`
          absolute h-5 w-5 text-yellow-500
          transition-all duration-300
          ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}
        `}
      />

      {/* Moon */}
      <Moon
        className={`
          absolute h-5 w-5 text-blue-500
          transition-all duration-300
          ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}
        `}
      />
    </button>
  );
}
