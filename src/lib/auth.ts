import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const SESSION_COOKIE = "ff_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "dev-only-secret";
}

/** 生成 HMAC 签名的会话令牌：base64url(payload).base64url(sig) */
export function signToken(payload: { uid: number; exp: number }): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

/** 验证令牌签名与有效期（Node 运行时） */
export function verifyToken(token: string): { uid: number } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof payload.uid !== "number" || Date.now() > payload.exp) return null;
    return { uid: payload.uid };
  } catch {
    return null;
  }
}

/** 获取当前登录用户（供服务端组件 / Server Actions 使用） */
export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({
    where: { id: payload.uid },
    select: { id: true, email: true, name: true, role: true },
  });
}

/** 要求已登录，否则跳转登录页（后台页面统一入口校验） */
export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}
