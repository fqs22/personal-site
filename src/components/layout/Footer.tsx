import Link from "next/link";
import { personalInfo } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold text-gray-900 dark:text-gray-50">
              {personalInfo.name} · {personalInfo.title}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {personalInfo.tagline}
            </p>
          </div>
          <div className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
            <a
              href={`mailto:${personalInfo.email}`}
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              邮箱
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              GitHub
            </a>
            <Link
              href="/contact"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              联系我
            </Link>
            <Link
              href="/login"
              className="text-gray-300 transition-colors hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
            >
              管理
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} {personalInfo.name} · Built with Next.js &
          Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
