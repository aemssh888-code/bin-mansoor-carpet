import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product-gallery';
import { getDictionary, isLocale, locales, whatsappUrl } from '@/lib/i18n';
import { getProduct, products } from '@/lib/products';

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product || !isLocale(locale)) return {};
  return { title: `${product.name[locale]} ${product.code}`, description: product.description[locale] };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const product = getProduct(slug);
  if (!product) notFound();
  const dictionary = getDictionary(locale);
  const BackArrow = locale === 'ar' ? ArrowRight : ArrowLeft;
  return (
    <main id="main-content">
      <section className="site-shell py-10 sm:py-16">
        <a href={`/${locale}/products`} className="mb-10 inline-flex items-center gap-2 text-sm text-black/55 hover:text-black"><BackArrow className="size-4" />{dictionary.common.back}</a>
        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <ProductGallery variants={product.variants} locale={locale} label={dictionary.common.variants} />
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-8"><span>{product.code}</span>{dictionary.categories[product.category]}</p>
            <h1 className="display-title">{product.name[locale]}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/58">{product.description[locale]}</p>
            <dl className="mt-10 grid grid-cols-2 border-y border-black/12 py-6 text-sm"><div><dt className="text-xs text-black/45">{dictionary.common.code}</dt><dd className="mt-2 font-mono tracking-[.12em]">{product.code}</dd></div><div><dt className="text-xs text-black/45">{dictionary.common.category}</dt><dd className="mt-2">{dictionary.categories[product.category]}</dd></div></dl>
            <div className="mt-10 bg-white p-7 sm:p-9"><p className="eyebrow mb-5">B2B</p><h2 className="text-3xl tracking-[-.04em]">{dictionary.detail.enquiryTitle}</h2><p className="mt-4 leading-7 text-black/55">{dictionary.detail.enquiryBody}</p><a href={whatsappUrl(locale, product.code)} target="_blank" rel="noreferrer" className="btn-primary mt-7 w-full sm:w-auto">{dictionary.common.whatsapp}<ArrowUpRight className="size-4" /></a></div>
            <div className="mt-10"><p className="eyebrow mb-5">{dictionary.detail.specs}</p><ul className="space-y-4 text-sm text-black/65">{[dictionary.detail.spec1, dictionary.detail.spec2, dictionary.detail.spec3].map((item) => <li key={item} className="flex items-center gap-3"><span className="grid size-5 place-items-center rounded-full bg-[#c8b088]/35"><Check className="size-3" /></span>{item}</li>)}</ul></div>
          </div>
        </div>
      </section>
    </main>
  );
}
