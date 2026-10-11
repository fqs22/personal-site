export interface Skill {
  name: string;
  level: number; // 0-100
  category: "business" | "product" | "management" | "tech" | "content";
}

export interface Experience {
  type: "work" | "education";
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
}

export interface PersonalInfo {
  name: string;
  englishName?: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  wechat: string;
  avatar: string;
  location: string;
  skills: Skill[];
  experiences: Experience[];
}

export const personalInfo: PersonalInfo = {
  name: "Frank Fu",
  title: "产品经理 · 项目经理 · 全栈开发",
  tagline: "金融科技项目经理 / 产品经理，自媒体与跨境电商创业，网课老师",
  bio: `在头部金融机构担任项目经理、产品经理，深耕金融业务系统的设计与交付：熟悉银行核心系统、零售信贷审批、银行卡争议管理与电子现金系统，熟悉海外证券系统（港股、美股、沪深交易）与投资 App 的业务流程和产品设计，也熟悉美国房贷业务的文件处理（processing）、closing 及 funding 全流程。

本职工作之外，我是一名自媒体博主与网课老师，同时在做跨境电商创业。我把金融项目管理的实战经验、AI 工具与自动化工作流沉淀成课程与内容，帮助更多普通人用工具提升效率、用系统跑通业务。

如果你在金融系统建设、投资类产品设计、AI 工作流落地或内容变现方面有想法，欢迎与我交流。`,
  email: "fqs22@qq.com",
  github: "https://github.com/fqs22/",
  wechat: "fqs2318",
  avatar: "/images/avatar.jpg",
  location: "深圳 · 香港",
  skills: [
    // —— 金融业务 ——
    { name: "银行核心系统", level: 92, category: "business" },
    { name: "零售信贷审批系统", level: 90, category: "business" },
    { name: "银行卡争议管理", level: 85, category: "business" },
    { name: "电子现金 / 支付系统", level: 82, category: "business" },
    { name: "海外证券系统（港股 / 美股 / 沪深）", level: 90, category: "business" },
    { name: "清算结算", level: 88, category: "business" },
    { name: "美国房贷 Processing / Closing / Funding", level: 85, category: "business" },
    { name: "投资 App 业务流程与产品设计", level: 88, category: "business" },
    // —— 产品设计 ——
    { name: "需求分析 / PRD 撰写", level: 92, category: "product" },
    { name: "业务流程与方案设计", level: 90, category: "product" },
    { name: "用户体验设计", level: 80, category: "product" },
    { name: "数据埋点与效果分析", level: 78, category: "product" },
    // —— 项目管理 ——
    { name: "项目全生命周期管理", level: 92, category: "management" },
    { name: "跨部门 / 跨地域协作交付", level: 90, category: "management" },
    { name: "敏捷与 Scrum 实践", level: 82, category: "management" },
    // —— 技术与工具 ——
    { name: "AI 工具与工作流落地", level: 85, category: "tech" },
    { name: "自动化测试", level: 80, category: "tech" },
    { name: "全栈开发（Web）", level: 72, category: "tech" },
    { name: "SQL / 数据分析", level: 76, category: "tech" },
    // —— 内容与创业 ——
    { name: "自媒体运营", level: 88, category: "content" },
    { name: "跨境电商创业", level: 82, category: "content" },
    { name: "网课设计与交付", level: 85, category: "content" },
  ],
  experiences: [
    {
      type: "work",
      title: "项目经理 / 产品经理",
      organization: "香港中资银行",
      startDate: "近年",
      endDate: "至今",
      description:
        "负责港股、美股、沪深证券系统及投资 App 的项目管理与产品设计，主导清算结算链路的方案设计与落地，协调业务、开发、测试与运营多方推进系统上线。",
      tags: ["海外证券系统", "投资 App", "清算结算", "项目管理"],
    },
    {
      type: "work",
      title: "项目经理 / 开发 / 自动化测试",
      organization: "中国银行",
      startDate: "早期",
      endDate: "近年",
      description:
        "参与海外银行核心系统、零售信贷审批系统、银行卡争议管理系统、电子现金系统的建设，覆盖需求分析、方案设计、开发与自动化测试，保障核心金融系统稳定交付。",
      tags: ["银行核心系统", "零售信贷", "卡争议管理", "自动化测试"],
    },
    // TODO: 你还没有提供教育经历，补充后按同样格式添加到此处即可
    // {
    //   type: "education",
    //   title: "xxx 专业 · 本科/硕士",
    //   organization: "xxx 大学",
    //   startDate: "20xx-09",
    //   endDate: "20xx-06",
    //   description: "主修课程与在校经历",
    //   tags: [],
    // },
  ],
};

export const skillCategories: Record<Skill["category"], string> = {
  business: "金融业务领域",
  product: "产品设计",
  management: "项目管理",
  tech: "技术与工具",
  content: "内容与创业",
};
