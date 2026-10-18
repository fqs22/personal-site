import type { Metadata } from "next";
import ProjectCard from "@/components/shared/ProjectCard";
import Reveal from "@/components/shared/Reveal";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "项目",
  description: "我开发过的开源项目与作品集",
};

export const revalidate = 60; // ISR

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">项目</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        共 {projects.length} 个项目，点击卡片查看详情
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
