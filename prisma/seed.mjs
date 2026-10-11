/**
 * 数据库种子脚本：node prisma/seed.mjs
 * - 创建管理员账号（邮箱 fqs22@qq.com，密码默认 admin123456，登录后可改）
 * - 导入 V1 静态数据：3 篇博客（读取 MDX）、2 个项目、2 个产品
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const matter = require("gray-matter");
const prisma = new PrismaClient();

const BLOG_DIR = path.join(process.cwd(), "src/data/blog");

async function seedUser() {
  const email = "fqs22@qq.com";
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`✓ 管理员已存在：${email}（跳过）`);
    return;
  }
  await prisma.user.create({
    data: {
      email,
      name: "Frank Fu",
      passwordHash: await bcrypt.hash("admin123456", 10),
      role: "admin",
    },
  });
  console.log(`✓ 管理员已创建：${email} / admin123456（请尽快在数据库中修改）`);
}

async function seedPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    const result = await prisma.post.upsert({
      where: { slug },
      update: {}, // 已存在则不覆盖（避免抹掉后台编辑的内容）
      create: {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        content,
        tags: (data.tags ?? []).join(","),
        published: true,
      },
    });
    console.log(`✓ 文章：${result.title}`);
  }
}

async function seedProjects() {
  const projects = [
    {
      slug: "personal-site",
      title: "个人网站（本站）",
      description:
        "集个人品牌、项目作品、网课与产品展示于一体的全栈个人网站，Next.js App Router 构建，静态部署、极速访问。",
      content: `## 项目背景\n\n需要一个能同时承载"个人品牌 + 项目作品 + 课程产品"的对外门面，而不是散落在各个平台的碎片化主页。\n\n## 核心功能\n\n- 首页品牌介绍 + 技能矩阵 + 精选项目\n- 项目作品集：卡片列表 + 详情页\n- 课程 / 电子书产品展示页\n- MDX 技术博客（自动收录、代码高亮、阅读时长）\n- 联系方式聚合（邮箱 / GitHub / 微信）\n- 明暗主题切换、全站响应式\n\n## 技术要点\n\n- Next.js 16 App Router + React 19 Server Components\n- 全站静态生成（SSG），首屏几乎瞬时加载\n- Tailwind CSS 4 实现设计系统与暗色模式\n- Metadata API + sitemap.xml / robots.txt 自动生成，做好 SEO\n- V2 起：Prisma + SQLite 数据库、/admin 后台在线管理内容`,
      techStack: "Next.js 16,React 19,TypeScript,Tailwind CSS 4,Prisma",
      sourceUrl: "https://github.com/fqs22/",
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "funnel-ai",
      title: "营销漏斗 AI",
      description:
        "用 AI 自动化把「引流 → 内容 → 转化 → 成交」整条营销漏斗跑起来的工具化方案，让一个人也能拥有完整的增长系统。",
      content: `## 项目背景\n\n做自媒体与跨境电商时，最痛的不是没流量，而是流量进来后承接不住：内容产出跟不上、转化路径靠手工、客户跟进全靠记忆。\n\n于是把这套流程产品化：用 AI 承担重复劳动，把漏斗每一层都做成可复用、可度量的环节。\n\n## 核心能力\n\n- **引流层**：多平台内容分发与选题策划，AI 辅助批量生成与改写\n- **承接层**：落地页 + 私域承接话术库，自动打标签分层\n- **转化层**：AI 客服与跟进提醒，按用户阶段推送不同内容\n- **成交流水线**：订单、交付、复购提醒全流程数据看板\n\n## 设计要点\n\n- 不追求"全自动"，而是"人机协作"：AI 做初稿与筛选，人做判断与信任\n- 每个环节都有可量化指标（曝光、加粉率、转化率、客单价），避免只看热闹\n- 整套工作流可迁移：换行业只需替换内容库与话术库\n\n## 适用人群\n\n个人创业者、自媒体博主、小团队运营——预算有限但想要系统化增长的人。`,
      techStack: "AI 工作流,自动化运营,私域运营,数据看板",
      featured: true,
      sortOrder: 2,
    },
  ];
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    console.log(`✓ 项目：${p.title}`);
  }
}

async function seedProducts() {
  const products = [
    {
      slug: "workbuddy",
      title: "WorkBuddy 工作台实战",
      type: "course",
      price: 199,
      description:
        "手把手搭建属于你自己的金融项目经理工作台与自媒体工作台：把项目、任务、文档、内容选题全部收进一个系统，告别碎片化协作。",
      features:
        "一套可直接复制的工作台模板（项目管理 + 内容运营双场景）\n金融项目经理实战视角：需求、排期、风险、交付全流程落地\n自媒体工作台：选题库、发布排期、数据复盘一体化\n现场操作演示，跟着做就能搭起来\n长期答疑，模板持续更新",
      coverEmoji: "🧰",
      sortOrder: 1,
    },
    {
      slug: "ai-quant",
      title: "AI 实盘量化",
      type: "course",
      price: 599,
      description:
        "不是玩具项目，也不是复杂到做不出来的投资策略。面向普通人，用 AI 辅助搭建可落地、可长期执行的量化投资方案，例如美股指数量化投资。",
      features:
        "真实实盘视角：从策略设计到落地的完整链路\n以美股指数为例，做普通人能稳定执行的量化方案\nAI 辅助选股、回测与信号监控，降低人工盯盘成本\n强调风控与仓位管理，拒绝高波动赌徒式交易\n配套策略模板与执行清单，学完即可上手",
      coverEmoji: "📈",
      sortOrder: 2,
    },
  ];
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
    console.log(`✓ 产品：${p.title}`);
  }
}

async function main() {
  await seedUser();
  await seedPosts();
  await seedProjects();
  await seedProducts();
  console.log("\n种子数据导入完成。");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
