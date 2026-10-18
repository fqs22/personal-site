import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { getPostBySlug, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import ReadingProgress from "@/components/shared/ReadingProgress";

export const revalidate = 60; // ISR

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <ReadingProgress />
      <Link
        href="/blog"
        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        ← 返回博客列表
      </Link>

      <header className="mt-6 border-b border-gray-200 pb-8 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl dark:text-gray-50">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime} 分钟阅读</span>
          <span>·</span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose-custom mt-8">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { rehypePlugins: [rehypeHighlight] } }}
        />
      </div>
    </article>
  );
}
