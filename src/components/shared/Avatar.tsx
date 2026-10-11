"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * 头像组件：
 * - 若 public/images/avatar.jpg 存在则显示真实照片
 * - 否则自动回退到 emoji 占位图，不会出现破图
 */
export default function Avatar({ fallback = "👨‍💻" }: { fallback?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 text-7xl dark:from-gray-800 dark:to-gray-700">
        {fallback}
      </div>
    );
  }

  return (
    <Image
      src="/images/avatar.jpg"
      alt="Frank Fu"
      fill
      sizes="160px"
      priority
      onError={() => setFailed(true)}
      style={{ objectPosition: "50% 12%" }}
      className="object-cover"
    />
  );
}
