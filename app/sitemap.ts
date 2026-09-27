import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { products } from '@/lib/products';
import {wtwModels} from '@/lib/wtw';
import {siteUrl} from '@/lib/site-origin.mjs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  return locales.flatMap((locale) => ['', '/products', '/wall-to-wall', '/about', '/contact', '/quote', ...products.map((product) => `/products/${product.slug}`), ...wtwModels.map((model) => `/wall-to-wall/${model.slug}`)].map((path) => ({ url: `${base}/${locale}${path}`, alternates:{languages:{ar:`${base}/ar${path}`,en:`${base}/en${path}`,tr:`${base}/tr${path}`}}, changeFrequency: 'monthly' as const, priority: path === '' ? 1 : 0.7 })));
}
