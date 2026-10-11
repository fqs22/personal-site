/**
 * 统一内容层：数据库优先，静态文件兜底
 * - 正常情况：内容来自 Prisma 数据库（后台可在线编辑）
 * - 数据库为空/不可用：回退到 V1 的静态数据（src/data/*、MDX 文件）
 * 好处：即使还没跑种子脚本，前台也不会白屏
 */
import { prisma } from "./prisma";
import type { PostMeta, Post } from "./blog";
import { getAllPosts as getStaticPosts, getPostBySlug as getStaticPost } from "./blog";
import type { Project } from "@/data/projects";
import { projects as staticProjects } from "@/data/projects";
import type { Product } from "@/data/products";
import { products as staticProducts } from "@/data/products";

function calcReadingTime(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const words = text.replace(/[\u4e00-\u9fa5]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

/* ============ 文章 ============ */

export async function getPosts(): Promise<PostMeta[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        date: r.createdAt.toISOString().slice(0, 10),
        tags: r.tags ? r.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        description: r.description,
        readingTime: calcReadingTime(r.content),
      }));
    }
  } catch {
    // 数据库不可用（如未初始化），走静态兜底
  }
  return getStaticPosts();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const row = await prisma.post.findUnique({ where: { slug } });
    if (row && row.published) {
      return {
        slug: row.slug,
        title: row.title,
        date: row.createdAt.toISOString().slice(0, 10),
        tags: row.tags ? row.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        description: row.description,
        readingTime: calcReadingTime(row.content),
        content: row.content,
      };
    }
  } catch {
    // 忽略，走静态兜底
  }
  return getStaticPost(slug);
}

/* ============ 项目 ============ */

export async function getProjects(): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.description,
        content: r.content,
        techStack: r.techStack
          ? r.techStack.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        demoUrl: r.demoUrl ?? undefined,
        sourceUrl: r.sourceUrl ?? undefined,
        featured: r.featured,
      }));
    }
  } catch {
    // 静态兜底
  }
  return staticProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(count = 3): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured).slice(0, count);
}

/* ============ 产品 ============ */

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    });
    if (rows.length > 0) {
      return rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        type: (r.type === "ebook" ? "ebook" : "course") as Product["type"],
        price: r.price,
        originalPrice: r.originalPrice ?? undefined,
        description: r.description,
        features: r.features
          ? r.features.split("\n").map((f) => f.trim()).filter(Boolean)
          : [],
        coverEmoji: r.coverEmoji,
      }));
    }
  } catch {
    // 静态兜底
  }
  return staticProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}
