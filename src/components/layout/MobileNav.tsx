"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import ThemeToggle from "@/components/shared/ThemeToggle";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/projects", label: "项目" },
  { href: "/products", label: "产品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export default function MobileNav({ userName }: { userName: string | null }) {
  const [open, setOpen] = useState(false);

  return (
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

      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-gray-200/60 bg-white px-4 py-3 shadow-lg dark:border-gray-800/60 dark:bg-gray-950 md:hidden">
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
          <div className="mt-2 border-t border-gray-200/60 pt-2 dark:border-gray-800/60">
            {userName ? (
              <>
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-blue-600 hover:bg-gray-100 dark:text-blue-400 dark:hover:bg-gray-800"
                >
                  后台管理
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    退出登录
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                管理员登录
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
