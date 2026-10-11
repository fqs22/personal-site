export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  techStack: string[];
  image?: string;
  demoUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "personal-site",
    title: "个人网站（本站）",
    description:
      "集个人品牌、项目作品、网课与产品展示于一体的全栈个人网站，Next.js App Router 构建，静态部署、极速访问。",
    content: `## 项目背景

需要一个能同时承载"个人品牌 + 项目作品 + 课程产品"的对外门面，而不是散落在各个平台的碎片化主页。

## 核心功能

- 首页品牌介绍 + 技能矩阵 + 精选项目
- 项目作品集：卡片列表 + 详情页
- 课程 / 电子书产品展示页
- MDX 技术博客（自动收录、代码高亮、阅读时长）
- 联系方式聚合（邮箱 / GitHub / 微信）
- 明暗主题切换、全站响应式

## 技术要点

- Next.js 16 App Router + React 19 Server Components
- 全站静态生成（SSG），首屏几乎瞬时加载
- Tailwind CSS 4 实现设计系统与暗色模式
- Metadata API + sitemap.xml / robots.txt 自动生成，做好 SEO
- 内容与代码分离：项目、产品、文章数据独立维护，改内容不改逻辑`,
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "MDX"],
    sourceUrl: "https://github.com/fqs22/",
    featured: true,
  },
  {
    slug: "funnel-ai",
    title: "营销漏斗 AI",
    description:
      "用 AI 自动化把「引流 → 内容 → 转化 → 成交」整条营销漏斗跑起来的工具化方案，让一个人也能拥有完整的增长系统。",
    content: `## 项目背景

做自媒体与跨境电商时，最痛的不是没流量，而是流量进来后承接不住：内容产出跟不上、转化路径靠手工、客户跟进全靠记忆。

于是把这套流程产品化：用 AI 承担重复劳动，把漏斗每一层都做成可复用、可度量的环节。

## 核心能力

- **引流层**：多平台内容分发与选题策划，AI 辅助批量生成与改写
- **承接层**：落地页 + 私域承接话术库，自动打标签分层
- **转化层**：AI 客服与跟进提醒，按用户阶段推送不同内容
- **成交流水线**：订单、交付、复购提醒全流程数据看板

## 设计要点

- 不追求"全自动"，而是"人机协作"：AI 做初稿与筛选，人做判断与信任
- 每个环节都有可量化指标（曝光、加粉率、转化率、客单价），避免只看热闹
- 整套工作流可迁移：换行业只需替换内容库与话术库

## 适用人群

个人创业者、自媒体博主、小团队运营——预算有限但想要系统化增长的人。`,
    techStack: ["AI 工作流", "自动化运营", "私域运营", "数据看板"],
    featured: true,
  },
];

export function getFeaturedProjects(count = 3): Project[] {
  return projects.filter((p) => p.featured).slice(0, count);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
