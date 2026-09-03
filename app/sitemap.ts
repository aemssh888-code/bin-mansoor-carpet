import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bin-mansoor-carpet.deep-bee-1082.chatgpt.site';
  return locales.flatMap((locale) => ['', '/products', '/about', '/contact', ...products.map((product) => `/products/${product.slug}`)].map((path) => ({ url: `${base}/${locale}${path}`, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })));
}
