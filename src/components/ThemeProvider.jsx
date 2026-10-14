"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const ThemeContext = createContext(null);

function subscribeToTheme(callback) {
  window.addEventListener("themechange", callback);
  return () => window.removeEventListener("themechange", callback);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot() {
  return "light";
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch (error) {
      console.error("Unable to save the selected color theme.", error);
    }
    window.dispatchEvent(new Event("themechange"));
  }, []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  return context;
}
