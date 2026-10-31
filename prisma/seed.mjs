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
    {
      slug: "loci-notes-system",
      title: "个人笔记知识库系统",
      description:
        "把 Obsidian、本地 AI 大脑与飞书日历连成一条链路：想法随手记、内容找得到、待办到点自动提醒，全程数据留在本机。",
      content: `## 项目背景

笔记工具从来不缺，缺的是"记完之后还能想起来"。长期用下来，痛点集中在三处：

- 想法冒出来时，手边没有顺手的入口，等回到电脑已经忘了
- 整理过的内容下次想用找不到，或者要在多个工具里来回翻
- 记下的待办没有时间锚点，到点没人提醒，最后变成僵尸清单

于是干脆把三件各自好用的东西接成一条链路：**Obsidian 负责写，本地 AI 大脑负责记住，飞书日历负责喊我**。

## 它解决什么

- **随手记**：手机 Obsidian + Git 自动同步，灵感不丢
- **找得到**：本地大脑维护跨工具的统一索引，笔记正文永远留在原处，不重复搬运
- **到点做**：带时间的待办自动进入飞书日历，手机按时提醒，电脑关机也照样响
- **跨 AI 可用**：任何接入的 AI 读到的是同一份上下文，不用每次重新交代背景

## 核心设计

- **本地优先**：所有内容存在自己的文件系统里，不托管给第三方云服务
- **正文留原处**：笔记索引只存指针（标题 · 路径 · 一句话 · 标签），避免双份维护带来的不一致
- **松耦合**：任一环节挂掉，其余部分照常工作——Obsidian 挂了还能写待办，飞书挂了笔记照样同步
- **幂等同步**：重复执行不会产生重复日程，靠本地状态文件记录已同步项

## 技术要点

- **笔记层**：Obsidian + Git 钩子，定时自动 push/pull，实现多端笔记同步
- **同步层**：Node.js 常驻脚本扫描本地待办，调用飞书日历 OpenAPI 创建日程并附带提前提醒
- **授权层**：飞书 OAuth 用户授权 + refresh_token 自动续期，权限最小化——只申请日历读写
- **移动端**：本地 Dashboard 绑定到局域网，手机浏览器直接访问；页面本身带响应式布局（≤640px 单手适配），可添加到主屏幕当 App 用
- **自动化**：开机自启 + 定时轮询，录入后十几分钟内自动上云

## 实际效果

- **想法到落地**：手机上敲完，回到电脑已在库里，无需手动誊写
- **提醒不再漏**：日程托管在飞书云端推送，不依赖本机是否开机
- **AI 有记忆**：对话时 AI 能直接引用笔记索引与待办状态，不用重复解释背景`,
      techStack: "Obsidian,Git / GitHub,Node.js,飞书开放平台 API,Markdown",
      featured: true,
      sortOrder: 3,
    },
    {
      slug: "desktop-organizer",
      title: "桌面整理工具",
      description:
        "按客户 / 项目自动归档桌面文件的 Windows 工具：文件名里没有客户名时，会读 PDF 正文的借款人字段判定归属，全程只移动、可预览、可撤销。",
      content: `## 项目背景

桌面对很多人是"杂物堆放处"，但对做业务的人来说，它是**工作台**：
散落的文件是当前正在办的客户材料，文件夹是客户项目夹。

市面上的桌面整理工具（Hazel、File Juggler、Belvedere、Deskora）几乎都按扩展名分组——
PDF 归文档、Excel 归表格。这套规则对下载文件夹有效，**对工作台有害**：
它会把同一个客户的文件拆到不同目录，客户资料一旦拆散，越整越难用。

## 核心思路

反过来做：**先认归属，再谈类型**。

- 文件名含客户名 → 进对应客户文件夹
- 文件名没有客户名 → 读 PDF 正文的 Borrower / Applicant 判定归属
- 扫描件读不出内容 → 进「其他」等人工判断
- 安装包 / 截图 → 软件与安装包、临时文件

## 安全设计

- **只移动**：不改名、不删除、不修改内容
- **默认预览**：不加参数只列计划，不动任何文件
- **一键撤销**：每次执行留 JSON 日志，可完整还原
- **活跃保护**：最近 2 天改过的文件默认不动，正要用的不会突然消失
- **保守兜底**：类型拿不准的文件一律留在桌面

四个双击入口：预览 / 执行 / 强制归档 / 撤销。

## 内容识别踩过的坑

1. **短名误命中**：Tran 会命中 Transaction、Transfer —— 用词边界匹配解决
2. **文本粘连**：PDF 常把标签与值连写成 BorrowerAlice Sun，要求前置词边界会漏掉真客户，改为只保留后置词边界
3. **扫描件读不出**：图片型 PDF 无文本层，内容识别对它们无效
4. **被占用的文件**：文件被 Excel 打开时无法移动，这是保护而非失败

## 技术要点

- PowerShell 5.1 主脚本 + Node.js 负责 PDF 解析，两者通过 JSON 衔接
- 依赖 66MB 与脚本分离部署：脚本可放桌面，依赖留在别的目录，靠配置里的路径回退查找
- 全部规则外置到 config.json，改规则不改代码
- PDF 解析需绕开 pdf-parse 的 debug 模式，否则所有 PDF 都返回同一段自带测试文本

## 实测效果

在一个 44 项的桌面上：9 个客户的资料各自归位，
7 个文件名里没有客户名的房贷文件中有 4 个通过内容识别找回了归属，
桌面从 44 项降到 11 项，全程零删除、零改名。`,
      techStack: "PowerShell,Node.js,pdf-parse,JSON 配置驱动",
      sourceUrl: "https://github.com/fqs22/desktop-organizer",
      featured: true,
      sortOrder: 4,
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
