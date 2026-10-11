import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveProductAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const inputCls =
  "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50";
const labelCls =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200";

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;
  const isNew = id === "new";
  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!isNew && !product) notFound();

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/products"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← 返回产品列表
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-50">
        {isNew ? "添加产品" : "编辑产品"}
      </h1>

      <form action={saveProductAction} className="mt-8 space-y-6">
        {product && <input type="hidden" name="id" value={product.id} />}

        <div>
          <label htmlFor="title" className={labelCls}>
            产品名称 *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={product?.title ?? ""}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div>
            <label htmlFor="slug" className={labelCls}>
              URL 别名 *
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={product?.slug ?? ""}
              placeholder="my-course"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="type" className={labelCls}>
              类型
            </label>
            <select
              id="type"
              name="type"
              defaultValue={product?.type ?? "course"}
              className={inputCls}
            >
              <option value="course">视频课程</option>
              <option value="ebook">电子书</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className={labelCls}>
              定价（元）*
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              required
              defaultValue={product?.price ?? ""}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="originalPrice" className={labelCls}>
              原价（可选）
            </label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              step="0.01"
              defaultValue={product?.originalPrice ?? ""}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div>
            <label htmlFor="coverEmoji" className={labelCls}>
              封面 Emoji
            </label>
            <input
              id="coverEmoji"
              name="coverEmoji"
              defaultValue={product?.coverEmoji ?? "📘"}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="sortOrder" className={labelCls}>
              排序权重
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={product?.sortOrder ?? 0}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelCls}>
            产品介绍
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={product?.description ?? ""}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="features" className={labelCls}>
            卖点清单（每行一条，前台显示为 ✓ 列表）
          </label>
          <textarea
            id="features"
            name="features"
            rows={6}
            defaultValue={product?.features ?? ""}
            placeholder={"第一条卖点\n第二条卖点"}
            className={inputCls}
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
            href="/admin/products"
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-300"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
