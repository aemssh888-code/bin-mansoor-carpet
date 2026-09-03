import type { Metadata } from 'next';
import { CatalogTabs } from '@/components/catalog-tabs';
import { getDictionary, isLocale } from '@/lib/i18n';
import { products } from '@/lib/products';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return { title: dictionary.products.title, description: dictionary.products.body };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  return (
    <main id="main-content">
      <section className="border-b border-black/10 py-20 sm:py-28"><div className="site-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><p className="eyebrow"><span>01</span>{dictionary.products.eyebrow}</p><div><h1 className="display-title max-w-[10ch]">{dictionary.products.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-black/55">{dictionary.products.body}</p><p className="mt-8 font-mono text-xs tracking-[.15em] text-[#8b724e]">{products.length} {dictionary.products.count}</p></div></div></section>
      <section className="site-shell py-16 sm:py-24"><CatalogTabs products={products} locale={locale} labels={{ all: dictionary.common.all, ...dictionary.categories }} viewLabel={dictionary.common.view} /></section>
    </main>
  );
}
