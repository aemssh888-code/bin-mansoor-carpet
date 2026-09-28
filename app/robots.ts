import type { MetadataRoute } from 'next';
import {siteUrl} from '@/lib/site-origin.mjs';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
