import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = { title: "登录" };

interface Props {
  searchParams: Promise<{ error?: string; from?: string }>;
}

const errorMessages: Record<string, string> = {
  invalid: "邮箱或密码错误，请重试",
  missing: "请填写邮箱和密码",
};

export default async function LoginPage({ searchParams }: Props) {
  const { error, from } = await searchParams;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 dark:bg-gray-900/50">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-50">
            后台登录
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            内容管理系统 · 仅限管理员
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
              {errorMessages[error] ?? "登录失败，请重试"}
            </div>
          )}

          <form action={loginAction} className="mt-6 space-y-5">
            <input type="hidden" name="from" value={from ?? "/admin"} />
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                邮箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              登录
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            ← 返回网站首页
          </Link>
        </p>
      </div>
    </div>
  );
}
