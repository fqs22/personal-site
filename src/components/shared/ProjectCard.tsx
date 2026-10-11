import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
    >
      {/* 封面占位：替换为 /images/projects/*.png 截图 */}
      <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-4xl dark:from-gray-800 dark:to-gray-800/50">
        🛠️
      </div>
      <h3 className="mt-5 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
