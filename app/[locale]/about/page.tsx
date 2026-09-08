import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { company, getDictionary, isLocale, locales } from '@/lib/i18n';
import {products,heroVariant} from '@/lib/products';
import {CatalogImage} from '@/components/catalog-image';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {business} from '@/lib/business';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return pageMetadata(locale,'/about',dictionary.about.title,dictionary.about.intro);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  return (
    <main id="main-content">
      <section className="site-shell grid gap-12 py-20 sm:py-28 lg:grid-cols-[.74fr_1.26fr]"><p className="eyebrow"><span>01</span>{dictionary.about.eyebrow}</p><div><h1 className="display-title max-w-[12ch]">{dictionary.about.title}</h1><p className="mt-8 max-w-3xl text-xl leading-9 text-black/58">{dictionary.about.intro}</p></div></section>
      <section className="border-y border-black/10 bg-white py-20 sm:py-28"><div className="site-shell grid gap-14 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden bg-[#1d1c19]"><CatalogImage asset={heroVariant(products[0])} alt={`${products[0].name[locale]} — ${catalogText[locale].preview}`} className="h-full w-full object-contain p-6"/><span className="preview-label">{catalogText[locale].preview}</span></div><div className="flex flex-col justify-center"><p className="eyebrow mb-6">02 • {dictionary.about.storyTitle}</p><h2 className="text-4xl leading-tight tracking-[-.04em] sm:text-5xl">{dictionary.about.storyBody}</h2></div></div></section>
      <section className="site-shell py-20 sm:py-28"><p className="eyebrow mb-10">03 • {dictionary.about.workflowTitle}</p><ol className="grid gap-px bg-black/10 md:grid-cols-4">{dictionary.about.workflow.map((item, index) => <li key={item} className="min-h-48 bg-[#f7f5f0] p-7"><span className="font-mono text-xs text-[#8b724e]">0{index + 1}</span><p className="mt-14 text-xl">{item}</p></li>)}</ol></section>
      <section className="bg-[#1d1c19] py-20 text-white sm:py-28"><div className="site-shell grid gap-14 lg:grid-cols-2"><div><p className="eyebrow mb-6 text-[#c8b088]">04 • {dictionary.about.factsTitle}</p><div className="grid grid-cols-3 gap-px bg-white/12"><div className="bg-[#1d1c19] p-6"><strong className="text-3xl">{business.established}</strong><p className="mt-2 text-xs text-white/45">{dictionary.home.established}</p></div><div className="bg-[#1d1c19] p-6"><strong className="text-3xl">{business.machines}</strong><p className="mt-2 text-xs text-white/45">{dictionary.home.machines}</p></div><div className="bg-[#1d1c19] p-6"><strong className="text-3xl">{business.minimumOrderQuantity.toLocaleString('en-US')}</strong><p className="mt-2 text-xs text-white/45">{dictionary.home.moq} · {dictionary.home.sqm}</p></div></div></div><div><p className="eyebrow mb-6 text-[#c8b088]">{dictionary.about.addressTitle}</p><address className="max-w-lg text-2xl leading-10 not-italic text-white/70">{company.address}</address><a href={company.maps} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-[#c8b088] pb-2 text-sm text-[#d5c29f]">{dictionary.common.directions}<ArrowUpRight className="size-4" /></a></div></div></section>
    </main>
  );
}
