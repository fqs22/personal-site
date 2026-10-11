export interface Product {
  slug: string;
  title: string;
  type: "ebook" | "course";
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  coverEmoji: string;
}

export const products: Product[] = [
  {
    slug: "workbuddy",
    title: "WorkBuddy 工作台实战",
    type: "course",
    price: 199,
    description:
      "手把手搭建属于你自己的金融项目经理工作台与自媒体工作台：把项目、任务、文档、内容选题全部收进一个系统，告别碎片化协作。",
    features: [
      "一套可直接复制的工作台模板（项目管理 + 内容运营双场景）",
      "金融项目经理实战视角：需求、排期、风险、交付全流程落地",
      "自媒体工作台：选题库、发布排期、数据复盘一体化",
      "现场操作演示，跟着做就能搭起来",
      "长期答疑，模板持续更新",
    ],
    coverEmoji: "🧰",
  },
  {
    slug: "ai-quant",
    title: "AI 实盘量化",
    type: "course",
    price: 599,
    description:
      "不是玩具项目，也不是复杂到做不出来的投资策略。面向普通人，用 AI 辅助搭建可落地、可长期执行的量化投资方案，例如美股指数量化投资。",
    features: [
      "真实实盘视角：从策略设计到落地的完整链路",
      "以美股指数为例，做普通人能稳定执行的量化方案",
      "AI 辅助选股、回测与信号监控，降低人工盯盘成本",
      "强调风控与仓位管理，拒绝高波动赌徒式交易",
      "配套策略模板与执行清单，学完即可上手",
    ],
    coverEmoji: "📈",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const productTypeLabel: Record<Product["type"], string> = {
  ebook: "电子书",
  course: "视频课程",
};
