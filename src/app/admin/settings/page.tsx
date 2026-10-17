import { changePasswordAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

const inputCls =
  "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50";
const labelCls =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200";

const errorText: Record<string, string> = {
  missing: "请填写当前密码和新密码",
  mismatch: "两次输入的新密码不一致",
  weak: "新密码至少需要 8 位",
  same: "新密码不能与当前密码相同",
  wrong: "当前密码不正确，请重新输入",
};

export default async function AdminSettingsPage({ searchParams }: Props) {
  const { saved, error } = await searchParams;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        账号设置
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        修改后台登录密码
      </p>

      {saved && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
          密码已更新，下次登录请使用新密码
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {errorText[error] ?? "修改失败，请重试"}
        </div>
      )}

      <form action={changePasswordAction} className="mt-8 space-y-6">
        <div>
          <label htmlFor="currentPassword" className={labelCls}>
            当前密码 *
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            placeholder="请输入当前正在使用的密码"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="newPassword" className={labelCls}>
            新密码 *（至少 8 位）
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="建议字母 + 数字组合"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelCls}>
            确认新密码 *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="再次输入新密码"
            className={inputCls}
          />
        </div>

        <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            更新密码
          </button>
        </div>
      </form>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
        提示：修改成功后当前登录状态依然有效，无需重新登录。
      </p>
    </div>
  );
}
