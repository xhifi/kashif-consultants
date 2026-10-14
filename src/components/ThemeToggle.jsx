"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      type="button"
    >
      <motion.span
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0.86 : 1 }}
        className="theme-toggle-icon"
        initial={false}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? <Moon size={17} /> : <Sun size={17} />}
      </motion.span>
      <span className="theme-toggle-label">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
