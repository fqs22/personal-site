import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "博客",
  description: "技术文章与开发心得",
};

export const revalidate = 60; // ISR：后台发布/修改文章后 1 分钟内前台自动更新

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">博客</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        共 {posts.length} 篇文章
      </p>

      <div className="mt-10 space-y-6">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
            >
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime} 分钟阅读</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {post.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
