# Personal Site 个人品牌知识付费平台 - PRD 产品需求文档

> **版本**: v2.0 | **日期**: 2026-07-05
> **定位**: 个人开发者品牌展示 + 知识付费平台（电子书/课程售卖 + 会员体系）
> **目标**: 三个版本迭代，逐步覆盖 Next.js 全栈核心技术，最终建成可运营的知识付费站
> **前置基础**: Java / Python 编程经验

---

## 目录

1. [产品定位与目标](#1-产品定位与目标)
2. [目标用户分析](#2-目标用户分析)
3. [三版本迭代总览](#3-三版本迭代总览)
4. [V1 静态展示站（Day 1-2）](#4-v1-静态展示站day-1-2)
5. [V2 后台管理系统（Day 3-5）](#5-v2-后台管理系统day-3-5)
6. [V3 知识付费平台（Day 6-7）](#6-v3-知识付费平台day-6-7)
7. [数据模型设计](#7-数据模型设计)
8. [非功能性需求](#8-非功能性需求)

---

## 1. 产品定位与目标

### 1.1 一句话定位

**一个展示技术能力 + 售卖知识产品的个人品牌平台，从静态站逐步演进为完整的知识付费系统。**

### 1.2 最终形态

```
访问者来到网站：
  → 首页：看到你是谁、做什么、有什么内容
  → 免费内容：博客文章、开源项目（无需登录）
  → 付费内容：电子书、视频课程（需注册 + 购买/会员）
  → 会员体系：月付/年付，畅享所有内容
  → 后台管理：你自己在线管理内容，无需改代码
```

### 1.3 学习目标

通过三版迭代，完整覆盖 Next.js 全栈技术栈：

```
V1 掌握：TypeScript, React, JSX, Tailwind, App Router, 
        Server Component, 静态数据, MDX, Vercel部署

V2 掌握：Prisma ORM, 数据库设计, Server Actions, 
        Route Handlers, NextAuth.js, Middleware, 
        Zod校验, Shadcn/ui, React Hook Form

V3 掌握：文件上传, 支付集成, RBAC权限, TanStack Query,
        会员系统, 下载管控, 性能优化, Docker部署
```

---

## 2. 目标用户分析

### 2.1 用户角色

| 角色 | 需求 | 对应功能 |
|------|------|----------|
| **访问者（未登录）** | 了解你是谁、看免费内容 | 首页、博客、项目展示 |
| **注册用户** | 购买内容、管理订单 | 注册登录、购买、个人中心 |
| **付费会员** | 畅享所有付费内容 | 会员专区、专属内容、下载 |
| **管理员（你）** | 管理内容、查看数据 | 后台管理面板 |

### 2.2 用户访问路径

```
新访客：
  首页 → 看博客/项目（建立信任）→ 看到付费产品 
    → 注册 → 购买/订阅 → 访问付费内容 → 复购

管理员（你）：
  登录 → 后台仪表盘 → 发布文章/产品/课程 
    → 管理用户/订单 → 查看数据统计
```

---

## 3. 三版本迭代总览

```
V1 (Day 1-2)          V2 (Day 3-5)            V3 (Day 6-7)
静态展示站      →     后台管理系统       →     知识付费平台
   │                      │                       │
纯前端静态页            加入数据库              加入支付+会员
无需登录              在线管理内容             完整商业闭环
数据写死在文件        内容从数据库读           用户体系+权限
SSG全静态              SSR+ISR混合             API+文件上传
```

### 3.1 技术栈演进路线

| 技术 | V1 | V2 | V3 |
|------|:--:|:--:|:--:|
| TypeScript | ✅ | ✅ | ✅ |
| React + JSX | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ |
| App Router | ✅ | ✅ | ✅ |
| Server Component | ✅ | ✅ | ✅ |
| Client Component | ✅ | ✅ | ✅ |
| MDX 博客 | ✅ | ✅ | ✅ |
| Vercel 部署 | ✅ | ✅ | ✅ |
| Prisma ORM | — | ✅ | ✅ |
| SQLite/PostgreSQL | — | ✅ | ✅ |
| Server Actions | — | ✅ | ✅ |
| Route Handlers | — | ✅ | ✅ |
| Shadcn/ui | — | ✅ | ✅ |
| NextAuth.js | — | ✅ | ✅ |
| Middleware | — | ✅ | ✅ |
| Zod 校验 | — | ✅ | ✅ |
| React Hook Form | — | ✅ | ✅ |
| TanStack Query | — | — | ✅ |
| 文件上传 | — | — | ✅ |
| 支付集成 | — | — | ✅ |
| RBAC 权限 | — | — | ✅ |
| Framer Motion | — | — | ✅ |
| Docker | — | — | ✅ |

### 3.2 功能演进总览

| 功能模块 | V1 | V2 | V3 |
|---------|:--:|:--:|:--:|
| 首页展示 | ✅ 静态 | ✅ 动态 | ✅ 优化 |
| 关于我 | ✅ | ✅ | ✅ |
| 项目展示 | ✅ 静态 | ✅ 后台管理 | ✅ |
| 产品展示 | ✅ 静态 | ✅ 后台管理 | ✅ 购买流程 |
| MDX 博客 | ✅ | ✅ | ✅ 后台管理 |
| 导航/页脚 | ✅ | ✅ | ✅ |
| 响应式 | ✅ 基础 | ✅ 完善 | ✅ |
| 主题切换 | — | ✅ | ✅ |
| 用户注册登录 | — | ✅ | ✅ |
| 后台仪表盘 | — | ✅ | ✅ |
| 内容 CRUD 管理 | — | ✅ | ✅ |
| 媒体上传 | — | — | ✅ |
| 会员订阅 | — | — | ✅ |
| 支付集成 | — | — | ✅ |
| 下载管控 | — | — | ✅ |
| 订单管理 | — | — | ✅ |
| SEO 优化 | ✅ 基础 | ✅ 完善 | ✅ |
| 性能优化 | — | — | ✅ |

---

## 4. V1 静态展示站（Day 1-2）

### 4.1 版本目标

> 纯前端静态站，数据写死在 TypeScript 文件中，构建时生成全静态 HTML。无需数据库、无需登录、无需后端。能打开、能看、能发链接。

### 4.2 技术栈（V1 用到的）

```
TypeScript + React 19 + Next.js 16 + Tailwind CSS 4 + MDX
```

### 4.3 页面结构

```
/
├── /                    首页
│   ├── Hero 区（姓名、职位、一句话）
│   ├── 技能标签云
│   ├── 精选项目（3个）
│   └── 联系方式
├── /about               关于我（个人介绍 + 经历时间线 + 技能详情）
├── /projects            项目列表
│   └── /projects/[slug]  项目详情
├── /products            产品列表（电子书/课程展示）
│   └── /products/[slug]  产品详情（购买按钮占位，V3 实现）
├── /blog                博客列表
│   └── /blog/[slug]      文章详情（MDX 渲染）
└── /contact             联系页面
```

### 4.4 数据方案

```
src/data/
├── personal.ts       ← 个人信息（名字、技能、经历）
├── projects.ts       ← 项目数据（标题、描述、技术栈、截图路径）
├── products.ts       ← 产品数据（电子书/课程信息、定价）
└── blog/             ← 博客 MDX 文件
    └── first-post.mdx
```

### 4.5 核心文件

| 文件 | 作用 | 涉及技术 |
|------|------|----------|
| `src/app/layout.tsx` | 根布局，导航+页脚 | App Router, Layout |
| `src/app/page.tsx` | 首页 | Server Component |
| `src/app/about/page.tsx` | 关于我 | Server Component, 数据读取 |
| `src/app/projects/page.tsx` | 项目列表 | 动态路由, generateStaticParams |
| `src/app/projects/[slug]/page.tsx` | 项目详情 | 动态路由参数 |
| `src/app/products/page.tsx` | 产品列表 | 静态数据渲染 |
| `src/app/blog/page.tsx` | 博客列表 | MDX 解析 |
| `src/app/blog/[slug]/page.tsx` | 文章详情 | MDX 渲染, 代码高亮 |
| `src/components/layout/Navbar.tsx` | 导航栏 | Client Component (汉堡菜单) |
| `src/components/layout/Footer.tsx` | 页脚 | Server Component |

### 4.6 验收标准

- [ ] `npm run dev` 正常启动
- [ ] 所有页面可访问，内容正确
- [ ] 导航正常跳转
- [ ] 移动端基本可用（不炸裂）
- [ ] `npm run build` 构建成功（全静态导出）
- [ ] 博客 MDX 文章正常渲染，代码块有语法高亮

---

## 5. V2 后台管理系统（Day 3-5）

### 5.1 版本目标

> 加入数据库和后台管理。前台页面从数据库读取内容（不再从静态文件读），管理员登录后可以在线管理所有内容（增删改查）。引入认证系统。

### 5.2 V2 新增技术栈

```
Prisma ORM + SQLite    ← 数据库（开发用 SQLite，生产换 PostgreSQL）
NextAuth.js v5         ← 认证登录（邮箱密码 + GitHub OAuth）
Server Actions         ← 表单提交和数据变更
Route Handlers         ← RESTful API 端点
Zod                    ← 前后端数据校验
React Hook Form        ← 表单状态管理
Shadcn/ui              ← 生产级 UI 组件库
Middleware             ← 路由保护
```

### 5.3 V2 新增功能

#### 5.3.1 用户系统

| 功能 | 说明 |
|------|------|
| 注册 | 邮箱 + 密码注册 |
| 登录 | 邮箱 + 密码登录（可选 GitHub OAuth） |
| 会话管理 | JWT Session，7天过期 |
| 角色 | admin（管理员）、user（普通用户） |

#### 5.3.2 后台管理面板

```
/admin                    仪表盘（统计概览）
/admin/posts              博客文章管理（列表 + 新建 + 编辑 + 删除）
/admin/projects           项目管理（列表 + 新建 + 编辑 + 删除）
/admin/products            产品管理（列表 + 新建 + 编辑 + 删除）
/admin/profile             个人信息编辑
```

#### 5.3.3 前台页面升级

| 页面 | V1 | V2 变化 |
|------|:--:|--------|
| 首页 | 静态数据 | 从数据库读取，支持 ISR |
| 博客列表 | 静态 MDX | 从数据库读取文章元数据 |
| 博客详情 | 静态 MDX | MDX 内容存数据库，动态渲染 |
| 项目列表 | 静态数据 | 从数据库读取 |
| 产品列表 | 静态数据 | 从数据库读取 |

### 5.4 数据方案（V2 变化）

```
数据库表（Prisma Schema）:
├── User          ← 用户表（name, email, password, role）
├── Account       ← NextAuth 账号关联表
├── Session       ← NextAuth 会话表
├── Post          ← 博客文章（title, content, slug, published）
├── Project       ← 项目（title, description, techStack, image）
├── Product       ← 产品（title, description, price, type）
├── Tag           ← 标签
└── Profile       ← 个人信息（bio, avatar, skills, experiences）

src/app/admin/    ← 后台管理路由（全部受 Middleware 保护）
src/lib/
├── db.ts         ← Prisma 客户端单例
├── auth.ts       ← NextAuth 配置
├── actions.ts    ← Server Actions（公共）
└── validations.ts ← Zod Schema 定义
```

### 5.5 核心文件（V2 新增/修改）

| 文件 | 作用 | 涉及技术 |
|------|------|----------|
| `prisma/schema.prisma` | 数据库表定义 | Prisma ORM |
| `src/lib/db.ts` | Prisma 客户端 | 单例模式 |
| `src/lib/auth.ts` | 认证配置 | NextAuth.js |
| `src/lib/validations.ts` | 数据校验 | Zod |
| `src/app/api/auth/[...nextauth]/route.ts` | 认证 API | NextAuth 路由 |
| `src/middleware.ts` | 路由保护 | Middleware |
| `src/app/admin/layout.tsx` | 后台布局 | 嵌套 Layout |
| `src/app/admin/posts/page.tsx` | 文章列表管理 | Server Component |
| `src/app/admin/posts/new/page.tsx` | 新建文章 | Server Actions + React Hook Form |
| `src/app/admin/posts/[id]/edit/page.tsx` | 编辑文章 | Server Actions + 表单回填 |
| `src/app/admin/projects/page.tsx` | 项目管理 | CRUD |
| `src/app/admin/products/page.tsx` | 产品管理 | CRUD |
| `src/components/admin/Sidebar.tsx` | 后台侧边栏 | Shadcn/ui |
| `src/components/admin/DataTable.tsx` | 数据表格 | Shadcn/ui Table |
| `src/components/ui/*` | UI 组件 | Shadcn/ui 组件 |
| `src/components/shared/ThemeToggle.tsx` | 主题切换 | Client Component |

### 5.6 V2 验收标准

- [ ] 注册登录功能正常
- [ ] 未登录用户无法访问 /admin/*
- [ ] 后台可正常增删改查文章
- [ ] 后台可正常增删改查项目
- [ ] 后台可正常增删改查产品
- [ ] 前台页面数据来自数据库
- [ ] 表单有输入校验（Zod）
- [ ] 主题切换正常，刷新保持
- [ ] 响应式完善（手机/平板/桌面）
- [ ] Shadcn/ui 组件正常使用

---

## 6. V3 知识付费平台（Day 6-7）

### 6.1 版本目标

> 完整商业闭环：用户注册 → 浏览产品 → 购买/订阅 → 访问付费内容 → 下载资料。加入会员体系、支付集成、文件上传、权限控制。

### 6.2 V3 新增技术栈

```
文件上传       ← 电子书/课程资料上传与存储
支付集成       ← 微信支付 / 支付宝（开发环境用模拟支付）
RBAC 权限      ← 角色权限控制（免费用户/付费会员/管理员）
TanStack Query ← 客户端数据获取与缓存
Framer Motion  ← 页面动效与过渡动画
Docker         ← 容器化部署
```

### 6.3 V3 新增功能

#### 6.3.1 支付与会员

| 功能 | 说明 |
|------|------|
| 产品购买 | 单次购买电子书/课程 |
| 会员订阅 | 月付/年付会员，畅享全部内容 |
| 支付流程 | 选择产品 → 下单 → 支付 → 开通权限 |
| 订单管理 | 查看订单历史、支付状态 |
| 模拟支付 | V3 开发阶段用模拟支付，不接真实支付 |

#### 6.3.2 内容交付

| 功能 | 说明 |
|------|------|
| 文件上传 | 管理员上传电子书 PDF/EPUB、课程视频 |
| 在线预览 | 购买后在线查看电子书（部分章节免费预览） |
| 下载管控 | 付费用户可下载，带水印/限制次数 |
| 免费预览 | 每个产品展示前 10% 内容吸引购买 |

#### 6.3.3 会员中心

```
/account                   个人中心
/account/orders            我的订单
/account/library           我的内容库（已购电子书/课程）
/account/subscription      会员订阅管理
/account/settings          账号设置
```

#### 6.3.4 权限体系

| 角色 | 权限 |
|------|------|
| visitor（未登录） | 浏览公开内容、看免费博客 |
| user（注册用户） | 以上 + 购买、查看已购内容、评论 |
| member（付费会员） | 以上 + 访问全部付费内容、下载资料 |
| admin（管理员） | 以上 + 后台管理、用户管理、数据统计 |

### 6.4 数据方案（V3 新增）

```
新增数据库表：
├── Order          ← 订单表（userId, productId, amount, status）
├── Subscription   ← 订阅表（userId, plan, startDate, endDate）
├── UserProduct    ← 用户已购产品关联表
├── Download       ← 下载记录（userId, productId, count, lastAt）
├── File           ← 文件表（productId, filename, url, size, type）
└── Comment        ← 评论表（userId, targetId, content）
```

### 6.5 核心文件（V3 新增/修改）

| 文件 | 作用 | 涉及技术 |
|------|------|----------|
| `src/app/api/upload/route.ts` | 文件上传 API | Route Handler, 文件处理 |
| `src/app/api/payment/route.ts` | 支付 API | 模拟支付 |
| `src/app/account/*` | 会员中心页面 | 权限控制, TanStack Query |
| `src/app/products/[slug]/preview/page.tsx` | 内容预览 | 权限校验 |
| `src/app/products/[slug]/read/page.tsx` | 在线阅读 | 权限校验 |
| `src/components/payment/PaymentButton.tsx` | 支付按钮 | Client Component |
| `src/components/payment/CheckoutModal.tsx` | 支付弹窗 | Shadcn/ui Dialog |
| `src/components/member/ContentLibrary.tsx` | 内容库 | TanStack Query |
| `src/components/member/SubscriptionCard.tsx` | 会员卡片 | 订阅信息展示 |
| `src/lib/payment.ts` | 支付工具函数 | 订单创建、状态管理 |
| `src/lib/upload.ts` | 文件上传工具 | 文件存储逻辑 |
| `Dockerfile` | 容器配置 | Docker |
| `docker-compose.yml` | 容器编排 | Docker Compose |

### 6.6 V3 验收标准

- [ ] 用户可注册、登录、管理个人资料
- [ ] 产品购买流程完整（选品→下单→支付→开通权限）
- [ ] 会员订阅功能正常（月付/年付切换）
- [ ] 已购用户可查看/下载已购内容
- [ ] 未购买用户只能看到预览内容
- [ ] 管理员可上传电子书/课程文件
- [ ] RBAC 权限正确（visitor/user/member/admin）
- [ ] 后台可查看订单和用户数据
- [ ] Lighthouse 评分 > 90
- [ ] Docker 部署成功
- [ ] 全站 SEO 完善（每页独立 title/description/og）

---

## 7. 数据模型设计

### 7.1 完整数据库 ER 图

```
User ──1:N──→ Post          （用户写文章）
User ──1:N──→ Project       （用户创建项目）
User ──1:N──→ Product       （用户创建产品）
User ──1:N──→ Order         （用户下订单）
User ──1:N──→ Comment       （用户评论）
User ──1:1──→ Subscription  （用户订阅）
User ──M:N──→ Product       （通过 UserProduct 关联已购）

Product ──1:N──→ File       （产品包含文件）
Product ──1:N──→ Comment    （产品被评论）
Post ──1:N──→ Comment       （文章被评论）
Post ──M:N──→ Tag           （文章标签）
Project ──M:N──→ Tag        （项目标签）

Order ──1:1──→ Product      （订单关联产品）
Order ──1:1──→ User         （订单关联用户）
```

### 7.2 核心表结构（最终版 Prisma Schema）

```prisma
model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role           @default(USER)
  bio           String?
  posts         Post[]
  projects      Project[]
  products      Product[]
  orders        Order[]
  comments      Comment[]
  subscription  Subscription?
  userProducts  UserProduct[]
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}

model Product {
  id            String        @id @default(cuid())
  title         String
  slug          String        @unique
  description   String
  longDescription String?
  price         Float
  originalPrice Float?
  type          ProductType
  coverImage    String?
  status        ContentStatus @default(DRAFT)
  previewContent String?      // 免费预览内容（Markdown）
  authorId      String
  author        User          @relation(fields: [authorId], references: [id])
  files         File[]
  orders        Order[]
  comments      Comment[]
  userProducts  UserProduct[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model File {
  id         String   @id @default(cuid())
  filename   String
  originalName String
  url        String
  size       Int
  type       FileType
  productId  String
  product    Product  @relation(fields: [productId], references: [id])
  downloads  Download[]
  createdAt  DateTime @default(now())
}

model Order {
  id          String       @id @default(cuid())
  orderNo     String       @unique
  amount      Float
  status      OrderStatus  @default(PENDING)
  paymentMethod String?
  userId      String
  user        User         @relation(fields: [userId], references: [id])
  productId   String
  product     Product      @relation(fields: [productId], references: [id])
  createdAt   DateTime     @default(now())
  paidAt      DateTime?
}

model Subscription {
  id        String   @id @default(cuid())
  plan      PlanType
  status    SubscriptionStatus @default(ACTIVE)
  startDate DateTime @default(now())
  endDate   DateTime
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model UserProduct {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}

model Download {
  id        String   @id @default(cuid())
  userId    String
  fileId    String
  file      File     @relation(fields: [fileId], references: [id])
  count     Int      @default(1)
  lastAt    DateTime @default(now())
  createdAt DateTime @default(now())
}

model Post {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  content     String        // MDX 内容
  description String?
  published   Boolean       @default(false)
  featured    Boolean       @default(false)
  readingTime Int           @default(0)
  authorId    String
  author      User          @relation(fields: [authorId], references: [id])
  tags        Tag[]
  comments    Comment[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Project {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String
  content     String?       // Markdown 详情
  techStack   String[]      // 技术栈标签
  image       String?
  demoUrl     String?
  sourceUrl   String?
  featured    Boolean       @default(false)
  status      ContentStatus @default(DRAFT)
  authorId    String
  author      User          @relation(fields: [authorId], references: [id])
  tags        Tag[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  posts    Post[]
  projects Project[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  postId    String?
  post      Post?    @relation(fields: [postId], references: [id])
  productId String?
  product   Product? @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}

// NextAuth 表
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// 枚举
enum Role              { ADMIN USER }
enum ProductType       { EBOOK COURSE }
enum ContentStatus     { DRAFT PUBLISHED ARCHIVED }
enum OrderStatus       { PENDING PAID CANCELLED REFUNDED }
enum PlanType          { MONTHLY YEARLY }
enum SubscriptionStatus { ACTIVE EXPIRED CANCELLED }
enum FileType          { PDF EPUB MP4 ZIP OTHER }
```

---

## 8. 非功能性需求

### 8.1 性能指标

| 指标 | V1 目标 | V3 目标 |
|------|---------|---------|
| 首页加载 (3G) | < 1.5s | < 2s |
| Lighthouse Performance | > 95 | > 90 |
| Lighthouse SEO | 100 | 100 |
| 构建时间 | < 30s | < 60s |

### 8.2 安全要求（V3）

- 密码 bcrypt 加密存储
- JWT Session 安全配置
- API 接口权限校验
- 文件上传类型/大小限制
- 下载链接签名 + 过期时间
- XSS/CSRF 防护
- SQL 注入防护（Prisma 自动处理）

### 8.3 浏览器兼容

Chrome / Safari / Firefox / Edge 最新 2 个版本

### 8.4 响应式断点

| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | 640px | 大屏手机 |
| md | 768px | 平板 |
| lg | 1024px | 笔记本 |
| xl | 1280px | 桌面 |

---

## 附录 A：内容准备清单

在开始写代码前，准备好以下内容：

- [ ] 中文名 + 英文名/昵称
- [ ] 一句话自我介绍（20字）
- [ ] 详细自我介绍（200字）
- [ ] 技能列表（8-15个）
- [ ] 3-5 个项目（名称+描述+技术栈+截图）
- [ ] 1-3 个知识产品（电子书/课程名称+定价+卖点）
- [ ] 联系方式（邮箱、GitHub、微信）
- [ ] 头像照片
- [ ] 第1篇博客文章主题

## 附录 B：学习路线图

```
Day 1 (V1): TypeScript 基础语法 → React JSX → Tailwind 常用类 → 第一个页面
Day 2 (V1): App Router 路由 → MDX 博客 → 静态数据 → 全站搭建完成
Day 3 (V2): Prisma 入门 → 数据库设计 → 数据库迁移 → 连接 Next.js
Day 4 (V2): NextAuth 配置 → 注册登录 → Middleware → Server Actions 入门
Day 5 (V2): 后台 CRUD → Zod 校验 → React Hook Form → Shadcn/ui 集成
Day 6 (V3): 文件上传 → 模拟支付 → 订单系统 → 会员体系
Day 7 (V3): 权限完善 → SEO 优化 → Docker 部署 → 性能调优
```
