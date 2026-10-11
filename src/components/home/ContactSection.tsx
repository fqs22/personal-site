import { personalInfo } from "@/data/personal";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-14 text-center text-white shadow-xl shadow-blue-600/20 sm:px-14">
        <h2 className="text-2xl font-bold sm:text-3xl">有想法？聊聊看</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base">
          无论是全栈外包、技术咨询，还是单纯交流技术，都欢迎联系我。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-transform hover:-translate-y-0.5"
          >
            发邮件
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
