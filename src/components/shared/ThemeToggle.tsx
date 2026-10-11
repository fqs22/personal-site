"use client";

import { useEffect, useState } from "react";

/**
 * 明暗主题切换：
 * - 在 <html> 上切换 class="dark"（配合 Tailwind 4 的 @custom-variant dark）
 * - localStorage 记住选择，默认跟随系统
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {mounted ? (isDark ? "🌙" : "☀️") : "☀️"}
    </button>
  );
}
