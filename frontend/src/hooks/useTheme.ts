import { useState, useEffect } from "react";

interface ThemeHook {
  isDarkMode: boolean;
  themeClickHandler: () => void;
}

const useTheme = (): ThemeHook => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      const isDark = savedTheme === "dark";
      document.documentElement.classList.toggle("dark", isDark);
      setIsDarkMode(isDark);
    };

    applyTheme();

    // Sync theme changes from localStorage (when changed from another tab)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "theme") applyTheme();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const themeClickHandler = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return { isDarkMode, themeClickHandler };
};

export default useTheme;
