import { personalInfo, skillCategories } from "@/data/personal";

const categoryColor: Record<string, string> = {
  business: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  product: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  management: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  tech: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  content: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300",
};

export default function SkillCloud() {
  const groups = Object.keys(skillCategories) as Array<keyof typeof skillCategories>;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">
        技术栈
      </h2>
      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
        每个类别都是我真正在生产环境用过的技术
      </p>
      <div className="mt-10 space-y-8">
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
    </section>
  );
}
