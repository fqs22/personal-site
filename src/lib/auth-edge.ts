/**
 * Edge Runtime（Middleware）用的令牌验证：
 * 与 src/lib/auth.ts 的 signToken 格式保持一致，用 Web Crypto 实现
 */
const encoder = new TextEncoder();

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "dev-only-secret";
}

function base64urlToBytes(s: string): Uint8Array<ArrayBuffer> {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  const buffer = new ArrayBuffer(bin.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export async function verifyTokenEdge(token: string): Promise<boolean> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(getSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    // 注意：signToken 是对 base64url 字符串本身做 HMAC，
    // 所以这里验证的数据也必须是该字符串的 UTF-8 字节（而非解码后的内容）
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlToBytes(sig),
      encoder.encode(body),
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64urlToBytes(body)));
    return typeof payload.uid === "number" && Date.now() <= payload.exp;
  } catch {
    return false;
  }
}
