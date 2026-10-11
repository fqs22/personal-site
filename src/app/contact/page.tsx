import type { Metadata } from "next";
import { personalInfo } from "@/data/personal";

export const metadata: Metadata = {
  title: "联系我",
  description: "邮箱、GitHub、微信——欢迎与我交流技术或洽谈合作",
};

const contactItems = [
  {
    label: "邮箱",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    emoji: "📧",
  },
  {
    label: "GitHub",
    value: personalInfo.github.replace("https://", ""),
    href: personalInfo.github,
    emoji: "🐙",
  },
  {
    label: "微信",
    value: personalInfo.wechat,
    emoji: "💬",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">联系我</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        以下方式都能找到我，通常 24 小时内回复
      </p>

      <div className="mt-10 space-y-4">
        {contactItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
          >
            <span className="text-3xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-50 dark:hover:text-blue-400"
                >
                  {item.value}
                </a>
              ) : (
                <p className="font-semibold text-gray-900 dark:text-gray-50">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
