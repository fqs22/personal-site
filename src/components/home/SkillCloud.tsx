"use client";

import { useState } from "react";
import { personalInfo, skillCategories } from "@/data/personal";

const categoryColor: Record<string, string> = {
  business: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  product: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  management: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  tech: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  content: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
};

export default function SkillCloud() {
  const [open, setOpen] = useState(false);
  const [locked, setLocked] = useState(false);

  const groups = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;
  const total = personalInfo.skills.length;

  // 鼠标移入展开、移出收起；点击可锁定展开状态（触屏与键盘可用）
  const handleEnter = () => setOpen(true);
  const handleLeave = () => {
    if (!locked) setOpen(false);
  };
  const handleClick = () => {
    const next = !locked;
    setLocked(next);
    setOpen(next);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`group rounded-2xl border bg-gray-50/80 transition-colors hover:border-blue-300 dark:bg-gray-900/40 dark:hover:border-blue-700 ${
          open ? "border-blue-300 dark:border-blue-700" : "border-gray-200 dark:border-gray-800"
        }`}
      >
        <button
          type="button"
          onClick={handleClick}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">
              技术栈
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              共 {total} 项技能 · 鼠标移入展开，点击可保持
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {open ? "收起" : "展开"}
            <span className={`chevron text-lg leading-none ${open ? "chevron-open" : ""}`}>
              ▾
            </span>
          </span>
        </button>

        <div
          className={`grid transition-all duration-500 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-8 border-t border-gray-200 px-6 py-6 dark:border-gray-800">
              {groups.map((category) => {
                const skills = personalInfo.skills.filter((s) => s.category === category);
                if (skills.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {skillCategories[category]}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill) => (
                        <span
                          key={skill.name}
                          title={`熟练度 ${skill.level}%`}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-transform hover:scale-110 ${categoryColor[skill.category]}`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
