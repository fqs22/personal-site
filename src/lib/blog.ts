import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  readingTime: number; // 分钟
}

export interface Post extends PostMeta {
  content: string; // MDX 原文（已去掉 frontmatter）
}

function calcReadingTime(text: string): number {
  // 中文按字数、英文按词数混合估算，每分钟约 400 字 / 200 词
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const words = text.replace(/[\u4e00-\u9fa5]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: (data.title as string) ?? filename,
        date: (data.date as string) ?? "",
        tags: (data.tags as string[]) ?? [],
        description: (data.description as string) ?? "",
        readingTime: calcReadingTime(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // 新的在前
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    description: (data.description as string) ?? "",
    readingTime: calcReadingTime(content),
    content,
  };
}
