"use client";

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMonitor, FiChevronDown } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // Define a mapping of theme to icon
  const themeIcons = {
    light: <FiSun className="text-neutral-400 text-2xl" />,
    dark: <FiMoon className="text-neutral-400 text-2xl" />,
    system: <FiMonitor className="text-neutral-400 text-2xl" />,
  };

  return (
    <div className="relative px-3 pb-10">
      {/* Dropdown Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 justify-center w-full bg-neutral-800 py-3 rounded-lg"
      >
        {themeIcons[theme] || <FiMonitor className="text-gray-500" />}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute w-11/12 bottom-24 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-white/10 overflow-hidden rounded-md shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 scale-100  opacity-100 visible"
            : "translate-y-full scale-0 opacity-0 invisible"
        }`}
      >
        <button
          onClick={() => handleThemeChange("light")}
          className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-all duration-200 ease-in-out ${
            theme === "light" ? "bg-neutral-100 dark:bg-neutral-900" : ""
          }`}
        >
          Light Mode
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-all duration-200 ease-in-out ${
            theme === "dark" ? "bg-neutral-100 dark:bg-neutral-900" : ""
          }`}
        >
          Dark Mode
        </button>
        <button
          onClick={() => handleThemeChange("system")}
          className={`flex items-center gap-2 px-4 py-2 w-full text-left transition-all duration-200 ease-in-out ${
            theme === "system" ? "bg-neutral-100 dark:bg-neutral-900" : ""
          }`}
        >
          System Mode
        </button>
      </div>
    </div>
  );
}
