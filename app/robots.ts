import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://bin-mansoor-carpet.deep-bee-1082.chatgpt.site/sitemap.xml' };
}
