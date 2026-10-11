import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProjectAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}

export default async function AdminProjectsPage({ searchParams }: Props) {
  const { saved, deleted } = await searchParams;
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            项目管理
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            共 {projects.length} 个
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + 新项目
        </Link>
      </div>

      {(saved || deleted) && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          {saved ? "项目已保存" : "项目已删除"}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
              <th className="px-5 py-3.5">项目</th>
              <th className="hidden px-5 py-3.5 sm:table-cell">精选</th>
              <th className="hidden px-5 py-3.5 md:table-cell">技术栈</th>
              <th className="px-5 py-3.5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="font-medium text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    {project.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-gray-400">/{project.slug}</p>
                </td>
                <td className="hidden px-5 py-3.5 sm:table-cell">
                  {project.featured ? (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      首页精选
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="hidden max-w-48 truncate px-5 py-3.5 text-xs text-gray-400 md:table-cell">
                  {project.techStack}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      预览
                    </Link>
                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={project.id} />
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
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-gray-400">
                  暂无项目
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
