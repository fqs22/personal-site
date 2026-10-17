"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, signToken, getSessionUser } from "@/lib/auth";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/* ============ 认证 ============ */

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/login?error=missing");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    redirect("/login?error=invalid");
  }

  const token = signToken({ uid: user.id, exp: Date.now() + SESSION_TTL_MS });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  });

  const from = String(formData.get("from") ?? "/admin");
  redirect(from.startsWith("/") ? from : "/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}

/** 修改当前登录账号的密码 */
export async function changePasswordAction(formData: FormData) {
  const user = await assertAdmin();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!currentPassword || !newPassword) redirect("/admin/settings?error=missing");
  if (newPassword !== confirmPassword) redirect("/admin/settings?error=mismatch");
  if (newPassword.length < 8) redirect("/admin/settings?error=weak");
  if (newPassword === currentPassword) redirect("/admin/settings?error=same");

  const record = await prisma.user.findUnique({ where: { id: user.id } });
  if (!record || !(await bcrypt.compare(currentPassword, record.passwordHash))) {
    redirect("/admin/settings?error=wrong");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(newPassword, 10) },
  });
  redirect("/admin/settings?saved=1");
}

/* ============ 工具 ============ */

async function assertAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

function refreshSite() {
  revalidatePath("/", "layout");
}

/* ============ 文章 CRUD ============ */

export async function savePostAction(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id");
  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? ""),
    content: String(formData.get("content") ?? ""),
    tags: String(formData.get("tags") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (!data.slug || !data.title) redirect("/admin/posts?error=required");

  if (id) {
    await prisma.post.update({ where: { id: Number(id) }, data });
  } else {
    await prisma.post.create({ data });
  }
  refreshSite();
  redirect("/admin/posts?saved=1");
}

export async function deletePostAction(formData: FormData) {
  await assertAdmin();
  const id = Number(formData.get("id"));
  if (id) await prisma.post.delete({ where: { id } });
  refreshSite();
  redirect("/admin/posts?deleted=1");
}

/* ============ 项目 CRUD ============ */

export async function saveProjectAction(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id");
  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? ""),
    content: String(formData.get("content") ?? ""),
    techStack: String(formData.get("techStack") ?? "").trim(),
    demoUrl: String(formData.get("demoUrl") ?? "").trim() || null,
    sourceUrl: String(formData.get("sourceUrl") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
  if (!data.slug || !data.title) redirect("/admin/projects?error=required");

  if (id) {
    await prisma.project.update({ where: { id: Number(id) }, data });
  } else {
    await prisma.project.create({ data });
  }
  refreshSite();
  redirect("/admin/projects?saved=1");
}

export async function deleteProjectAction(formData: FormData) {
  await assertAdmin();
  const id = Number(formData.get("id"));
  if (id) await prisma.project.delete({ where: { id } });
  refreshSite();
  redirect("/admin/projects?deleted=1");
}

/* ============ 产品 CRUD ============ */

export async function saveProductAction(formData: FormData) {
  await assertAdmin();
  const id = formData.get("id");
  const originalPriceRaw = String(formData.get("originalPrice") ?? "").trim();
  const data = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    type: String(formData.get("type") ?? "course"),
    price: Number(formData.get("price") ?? 0) || 0,
    originalPrice: originalPriceRaw ? Number(originalPriceRaw) : null,
    description: String(formData.get("description") ?? ""),
    features: String(formData.get("features") ?? ""),
    coverEmoji: String(formData.get("coverEmoji") ?? "📘"),
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
  if (!data.slug || !data.title) redirect("/admin/products?error=required");

  if (id) {
    await prisma.product.update({ where: { id: Number(id) }, data });
  } else {
    await prisma.product.create({ data });
  }
  refreshSite();
  redirect("/admin/products?saved=1");
}

export async function deleteProductAction(formData: FormData) {
  await assertAdmin();
  const id = Number(formData.get("id"));
  if (id) await prisma.product.delete({ where: { id } });
  refreshSite();
  redirect("/admin/products?deleted=1");
}
