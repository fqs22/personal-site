import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { savePostAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const inputCls =
  "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50";
const labelCls =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200";

export default async function PostEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew
    ? null
    : await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!isNew && !post) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/posts"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← 返回文章列表
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-50">
        {isNew ? "写新文章" : "编辑文章"}
      </h1>

      <form action={savePostAction} className="mt-8 space-y-6">
        {post && <input type="hidden" name="id" value={post.id} />}

        <div>
          <label htmlFor="title" className={labelCls}>
            标题 *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={post?.title ?? ""}
            placeholder="文章标题"
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className={labelCls}>
              URL 别名 *（英文短横线，如 my-first-post）
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={post?.slug ?? ""}
              placeholder="my-first-post"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="tags" className={labelCls}>
              标签（逗号分隔）
            </label>
            <input
              id="tags"
              name="tags"
              defaultValue={post?.tags ?? ""}
              placeholder="项目管理,AI 工具"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelCls}>
            摘要（列表页与 SEO 显示）
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={post?.description ?? ""}
            placeholder="一两句话概括这篇文章"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="content" className={labelCls}>
            正文（支持 Markdown：## 标题、代码块、列表、表格）
          </label>
          <textarea
            id="content"
            name="content"
            rows={18}
            defaultValue={post?.content ?? ""}
            placeholder={"## 小标题\n\n正文内容…"}
            className={`${inputCls} font-mono text-xs leading-relaxed`}
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-gray-300"
          />
          立即发布（取消勾选则存为草稿）
        </label>

        <div className="flex gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            保存
          </button>
          <Link
            href="/admin/posts"
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-300"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
