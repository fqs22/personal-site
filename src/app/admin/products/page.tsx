import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProductAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}

const typeLabel: Record<string, string> = {
  ebook: "电子书",
  course: "视频课程",
};

export default async function AdminProductsPage({ searchParams }: Props) {
  const { saved, deleted } = await searchParams;
  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            产品管理
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            共 {products.length} 个
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          + 新产品
        </Link>
      </div>

      {(saved || deleted) && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          {saved ? "产品已保存" : "产品已删除"}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
              <th className="px-5 py-3.5">产品</th>
              <th className="hidden px-5 py-3.5 sm:table-cell">类型</th>
              <th className="px-5 py-3.5">定价</th>
              <th className="px-5 py-3.5 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="font-medium text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                  >
                    {product.coverEmoji} {product.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-gray-400">/{product.slug}</p>
                </td>
                <td className="hidden px-5 py-3.5 sm:table-cell">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {typeLabel[product.type] ?? product.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-semibold text-blue-600 dark:text-blue-400">
                  ¥{product.price}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-3 text-xs">
                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-blue-600"
                    >
                      预览
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
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
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-gray-400">
                  暂无产品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
