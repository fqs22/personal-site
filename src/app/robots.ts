import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://your-domain.com/sitemap.xml", // TODO: 部署后替换为真实域名
  };
}
