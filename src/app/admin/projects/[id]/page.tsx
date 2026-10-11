import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveProjectAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const inputCls =
  "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50";
const labelCls =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200";

export default async function ProjectEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";
  const project = isNew
    ? null
    : await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!isNew && !project) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/projects"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← 返回项目列表
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-50">
        {isNew ? "添加项目" : "编辑项目"}
      </h1>

      <form action={saveProjectAction} className="mt-8 space-y-6">
        {project && <input type="hidden" name="id" value={project.id} />}

        <div>
          <label htmlFor="title" className={labelCls}>
            项目名称 *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={project?.title ?? ""}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="slug" className={labelCls}>
              URL 别名 *
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={project?.slug ?? ""}
              placeholder="my-project"
              className={inputCls}
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="sortOrder" className={labelCls}>
              排序权重（小在前）
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={project?.sortOrder ?? 0}
              className={inputCls}
            />
          </div>
          <div className="flex items-end pb-2.5 sm:col-span-1">
            <label className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured ?? false}
                className="h-4 w-4 rounded border-gray-300"
              />
              首页精选
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelCls}>
            一句话简介（卡片上显示）
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={project?.description ?? ""}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="techStack" className={labelCls}>
            技术栈（逗号分隔）
          </label>
          <input
            id="techStack"
            name="techStack"
            defaultValue={project?.techStack ?? ""}
            placeholder="Next.js,TypeScript,Prisma"
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="demoUrl" className={labelCls}>
              演示链接（可选）
            </label>
            <input
              id="demoUrl"
              name="demoUrl"
              type="url"
              defaultValue={project?.demoUrl ?? ""}
              placeholder="https://…"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="sourceUrl" className={labelCls}>
              源码链接（可选）
            </label>
            <input
              id="sourceUrl"
              name="sourceUrl"
              type="url"
              defaultValue={project?.sourceUrl ?? ""}
              placeholder="https://github.com/…"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className={labelCls}>
            详情长文（Markdown：## 标题、列表等）
          </label>
          <textarea
            id="content"
            name="content"
            rows={14}
            defaultValue={project?.content ?? ""}
            placeholder={"## 项目背景\n\n…"}
            className={`${inputCls} font-mono text-xs leading-relaxed`}
          />
        </div>

        <div className="flex gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            保存
          </button>
          <Link
            href="/admin/projects"
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-300"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
