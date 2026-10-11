import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: { default: "后台管理", template: "%s | 后台管理" },
  robots: { index: false },
};

const menu = [
  { href: "/admin", label: "仪表盘", icon: "📊" },
  { href: "/admin/posts", label: "文章管理", icon: "📝" },
  { href: "/admin/projects", label: "项目管理", icon: "🛠️" },
  { href: "/admin/products", label: "产品管理", icon: "💰" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6">
      {/* 侧边栏 */}
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="sticky top-24">
          <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              {user.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-gray-400 dark:text-gray-500">
              {user.email}
            </p>
          </div>
          <nav className="space-y-1">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 space-y-1 border-t border-gray-200 pt-4 dark:border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <span>🌐</span> 查看网站
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <span>🚪</span> 退出登录
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* 内容区 */}
      <div className="min-w-0 flex-1">
        {/* 移动端顶部导航 */}
        <div className="mb-6 flex flex-wrap gap-2 md:hidden">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300"
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-red-500 dark:border-gray-800"
            >
              退出
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}
