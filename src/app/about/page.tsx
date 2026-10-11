import type { Metadata } from "next";
import Avatar from "@/components/shared/Avatar";
import { personalInfo, skillCategories } from "@/data/personal";

export const metadata: Metadata = {
  title: "关于我",
  description: personalInfo.bio.slice(0, 80),
};

function formatDateRange(start: string, end: string) {
  return `${start} ~ ${end}`;
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 个人介绍 */}
      <section className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        {/* 头像：将照片保存为 public/images/avatar.jpg 即可自动显示 */}
        <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-gray-800">
          <Avatar />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            {personalInfo.name}
            {personalInfo.englishName && (
              <span className="ml-3 text-lg font-medium text-gray-400">
                {personalInfo.englishName}
              </span>
            )}
          </h1>
          <p className="mt-2 text-blue-600 dark:text-blue-400">
            {personalInfo.title} · {personalInfo.location}
          </p>
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {personalInfo.bio}
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-6 inline-block rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            📄 下载简历（占位，替换为 PDF 链接）
          </a>
        </div>
      </section>

      {/* 技能进度条 */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">技能详情</h2>
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
          {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map(
            (category) => {
              const skills = personalInfo.skills.filter((s) => s.category === category);
              if (skills.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {skillCategories[category]}
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-200">
                            {skill.name}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      {/* 经历时间线 */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">经历</h2>
        <div className="relative mt-10 space-y-12 before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-gray-200 dark:before:bg-gray-800">
          {personalInfo.experiences.map((exp) => (
            <div key={`${exp.title}-${exp.startDate}`} className="relative pl-10">
              <span
                className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${
                  exp.type === "work"
                    ? "border-blue-600 bg-blue-100 dark:border-blue-400 dark:bg-blue-950"
                    : "border-emerald-600 bg-emerald-100 dark:border-emerald-400 dark:bg-emerald-950"
                }`}
              />
              <p className="text-xs font-medium tracking-wide text-gray-400 dark:text-gray-500">
                {formatDateRange(exp.startDate, exp.endDate)}
              </p>
              <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-50">
                {exp.title}
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  @ {exp.organization}
                </span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {exp.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
