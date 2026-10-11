import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePostAction } from "@/app/admin/actions";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}

export default async function AdminPostsPage({ searchParams }: Props) {
  const { saved, deleted } = await searchParams;
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            文章管理
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            共 {posts.length} 篇
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + 新文章
        </Link>
      </div>

      {(saved || deleted) && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          {saved ? "文章已保存" : "文章已删除"}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
              <th className="px-5 py-3.5">标题</th>
              <th className="hidden px-5 py-3.5 sm:table-cell">状态</th>
              <th className="hidden px-5 py-3.5 md:table-cell">更新时间</th>
              <th className="px-5 py-3.5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-gray-400">/{post.slug}</p>
                </td>
                <td className="hidden px-5 py-3.5 sm:table-cell">
                  {post.published ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      已发布
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      草稿
                    </span>
                  )}
                </td>
                <td className="hidden px-5 py-3.5 text-gray-400 md:table-cell">
                  {formatDate(post.updatedAt.toISOString().slice(0, 10))}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      预览
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-600"
                      >
                        删除
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-10 text-center text-gray-400"
                >
                  暂无文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
