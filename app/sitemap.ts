import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bin-mansoor-carpet.vercel.app';
  return locales.flatMap((locale) => ['', '/products', '/about', '/contact', '/quote', ...products.map((product) => `/products/${product.slug}`)].map((path) => ({ url: `${base}/${locale}${path}`, alternates:{languages:{ar:`${base}/ar${path}`,en:`${base}/en${path}`,tr:`${base}/tr${path}`}}, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })));
}
