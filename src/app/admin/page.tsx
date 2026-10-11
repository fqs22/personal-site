import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [postCount, projectCount, productCount, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.product.count(),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, published: true, updatedAt: true },
    }),
  ]);

  const stats = [
    { label: "文章", value: postCount, href: "/admin/posts", icon: "📝" },
    { label: "项目", value: projectCount, href: "/admin/projects", icon: "🛠️" },
    { label: "产品", value: productCount, href: "/admin/products", icon: "💰" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        仪表盘
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        欢迎回来，这里是你网站内容的全局概览
      </p>

      {/* 统计卡片 */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                {s.value}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              {s.label}总数
            </p>
          </Link>
        ))}
      </div>

      {/* 最近文章 */}
      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
            最近文章
          </h2>
          <Link
            href="/admin/posts/new"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            + 写新文章
          </Link>
        </div>
        <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
          {recentPosts.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-400">
              还没有文章，点击上方按钮开始创作
            </p>
          )}
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}`}
              className="flex items-center justify-between py-3.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                {post.title}
                {!post.published && (
                  <span className="ml-2 rounded-md bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    草稿
                  </span>
                )}
              </span>
              <span className="ml-4 shrink-0 text-xs text-gray-400 dark:text-gray-500">
                {formatDate(post.updatedAt.toISOString().slice(0, 10))}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
