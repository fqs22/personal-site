import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/content";
import { productTypeLabel } from "@/data/products";

export const metadata: Metadata = {
  title: "产品",
  description: "电子书与视频课程——我沉淀的知识产品",
};

export const revalidate = 60; // ISR

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">产品</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        电子书与视频课程（购买功能将在 V3 版本上线）
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-6xl dark:from-gray-800 dark:to-gray-800/50">
              {product.coverEmoji}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                  {product.title}
                </h2>
                <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                  {productTypeLabel[product.type]}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
