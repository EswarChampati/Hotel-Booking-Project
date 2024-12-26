import { useState, useEffect } from "react";

interface ThemeHook {
  isDarkMode: boolean;
  themeClickHandler: () => void;
}
const useTheme = (): ThemeHook => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const themeClickHandler = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return { isDarkMode, themeClickHandler };
};
export default useTheme;
