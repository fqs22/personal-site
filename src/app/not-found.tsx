import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
      <p className="text-7xl font-extrabold text-blue-600 dark:text-blue-400">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
        页面不存在
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        你访问的页面可能已被移动或删除
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        返回首页
      </Link>
    </div>
  );
}
