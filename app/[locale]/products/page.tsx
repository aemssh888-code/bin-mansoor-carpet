import type { Metadata } from 'next';
import { CatalogTabs } from '@/components/catalog-tabs';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { products } from '@/lib/products';
import {pageMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return pageMetadata(locale,'/products',dictionary.products.title,dictionary.products.body);
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  return (
    <main id="main-content">
      <section className="catalog-hero"><div className="site-shell grid gap-10 lg:grid-cols-[.45fr_1.55fr] lg:items-end"><p className="eyebrow">{dictionary.products.eyebrow}</p><div><h1 className="catalog-title">{dictionary.products.title}</h1><div className="mt-8 flex flex-col gap-5 border-t border-black/12 pt-6 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-2xl text-lg leading-8 text-black/55">{dictionary.products.body}</p><p className="shrink-0 font-mono text-sm tracking-[.1em] text-[#8b724e]">{products.length} {dictionary.products.count}</p></div></div></div></section>
      <section className="site-shell py-12 sm:py-20"><CatalogTabs products={products} locale={locale} labels={{ all: dictionary.common.all, ...dictionary.categories }} viewLabel={dictionary.common.view} /></section>
    </main>
  );
}
