import Link from "next/link";
import ProjectCard from "@/components/shared/ProjectCard";
import { getFeaturedProjects } from "@/lib/content";

export default async function FeaturedProjects() {
  const featured = await getFeaturedProjects(3);

  return (
    <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">
              精选项目
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              一些我引以为豪的作品
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
          >
            查看全部 →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
