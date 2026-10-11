"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/projects", label: "项目" },
  { href: "/products", label: "产品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / 姓名 */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50"
        >
          <span className="text-blue-600 dark:text-blue-400">
            {personalInfo.name}
          </span>
        </Link>

        {/* 桌面端导航 */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* 移动端：主题切换 + 汉堡菜单 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="打开菜单"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span
              className={`h-0.5 w-4 bg-gray-700 transition-transform dark:bg-gray-300 ${
                open ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-4 bg-gray-700 transition-transform dark:bg-gray-300 ${
                open ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <div className="border-t border-gray-200/60 bg-white px-4 py-3 dark:border-gray-800/60 dark:bg-gray-950 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
