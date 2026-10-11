import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/content";
import { productTypeLabel } from "@/data/products";

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/products"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← 返回产品列表
      </Link>

      <div className="mt-6 flex h-52 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-7xl dark:from-gray-800 dark:to-gray-800/50">
        {product.coverEmoji}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
          {product.title}
        </h1>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-300">
          {productTypeLabel[product.type]}
        </span>
      </div>

      <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
        {product.description}
      </p>

      {/* 你将获得 */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">你将获得</h2>
        <ul className="mt-4 space-y-3">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
              <span className="mt-0.5 text-emerald-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* 购买卡片 */}
      <section className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            ¥{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ¥{product.originalPrice}
            </span>
          )}
        </div>
        {/* TODO: V3 接入支付流程后替换为真实的购买逻辑 */}
        <button
          type="button"
          disabled
          className="mt-6 cursor-not-allowed rounded-xl bg-gray-300 px-8 py-3 text-sm font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400"
        >
          购买（V3 上线）
        </button>
        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          当前为静态展示版，支付功能将在 V3 版本（会员体系 + 订单系统）中开放
        </p>
      </section>
    </div>
  );
}
