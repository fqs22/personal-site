"use client";

import { useEffect, useState } from "react";

interface Props {
  phrases: string[];
  className?: string;
}

const TYPE_MS = 110; // 打字速度
const DELETE_MS = 55; // 删除速度
const HOLD_MS = 1800; // 整句停留时间

/**
 * 打字机：在多个短语之间循环输入 / 删除。
 * 服务端渲染首句，保证首屏与 SEO 有内容。
 */
export default function Typewriter({ phrases, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    // 尊重系统「减少动效」偏好：只显示首句，不做动画
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0]);
      return;
    }

    const current = phrases[index % phrases.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timer = setTimeout(
      () => {
        if (done) {
          setDeleting(true);
        } else if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        } else {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          );
        }
      },
      done ? HOLD_MS : deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="animate-blink ml-0.5 inline-block w-[2px] translate-y-[2px] self-stretch bg-current align-middle text-transparent">
        |
      </span>
    </span>
  );
}
