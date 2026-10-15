import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import ThemeToggle from "@/components/shared/ThemeToggle";
import MobileNav from "@/components/layout/MobileNav";
import { personalInfo } from "@/data/personal";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/projects", label: "项目" },
  { href: "/products", label: "产品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export default async function Navbar() {
  const user = await getSessionUser();

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
          {/* 登录入口 / 登录态 */}
          {user ? (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href="/admin"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                后台管理
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  title={`已登录：${user.name}`}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  退出
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              title="管理员登录"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-blue-400"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17 17 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.632Z"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* 移动端：主题切换 + 汉堡菜单（含登录入口） */}
        <MobileNav userName={user?.name ?? null} />
      </nav>
    </header>
  );
}
