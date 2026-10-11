import Link from "next/link";
import Avatar from "@/components/shared/Avatar";
import { personalInfo } from "@/data/personal";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-transparent to-transparent dark:from-blue-950/40"
      />
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="relative mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-gray-800">
          <Avatar />
        </div>
        <p className="animate-fade-in mb-4 text-sm font-medium tracking-widest text-blue-600 dark:text-blue-400">
          {personalInfo.location}
        </p>
        <h1 className="animate-fade-in text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-50">
          {personalInfo.name}
        </h1>
        <p className="animate-fade-in mt-4 text-xl font-medium text-gray-700 sm:text-2xl dark:text-gray-300">
          {personalInfo.title}
        </p>
        <p className="animate-fade-in mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg dark:text-gray-400">
          {personalInfo.tagline}
        </p>
        <div className="animate-fade-in mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
          >
            查看项目
          </Link>
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            联系我
          </a>
        </div>
      </div>
    </section>
  );
}
