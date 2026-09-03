import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { getDictionary, isLocale, whatsappUrl } from '@/lib/i18n';
import { categories, products } from '@/lib/products';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const categoryImages = {
    modern: products.find((product) => product.slug === 'flow-14')!.variants[0].image,
    'modern-classic': products.find((product) => product.slug === 'frame-0105a')!.variants[3].image,
    classic: products.find((product) => product.slug === 'burgundy-palace-672')!.variants[0].image,
  };

  return (
    <main id="main-content">
      <section className="site-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[.86fr_1.14fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mb-7"><span>01</span>{dictionary.hero.eyebrow}</p>
          <h1 className="display-title max-w-[12ch]">{dictionary.hero.title}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/60">{dictionary.hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${locale}/products`} className="btn-primary">{dictionary.common.explore}<ArrowUpRight className="size-4" /></Link>
            <a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="btn-secondary">{dictionary.common.enquire}</a>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[.2em] text-black/40">{dictionary.hero.note}</p>
        </div>
        <div className="hero-gallery relative min-h-[560px] lg:min-h-[690px]">
          <div className="absolute inset-y-0 end-0 w-[78%] overflow-hidden bg-[#181a19]">
            <img src="/media/products/flow-14/petrol.webp" alt={`${products[2].name[locale]} 14`} width="900" height="1500" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-[8%] start-0 w-[38%] border-[10px] border-[#f7f5f0] bg-white shadow-[0_28px_80px_rgba(24,22,18,.18)]">
            <img src="/media/products/frame-0105a/light-beige.webp" alt={`${products[5].name[locale]} 0105A`} width="700" height="1100" className="aspect-[3/4] h-full w-full object-cover" />
          </div>
          <div className="absolute end-3 top-5 border-s border-white/45 py-4 ps-4 text-white">
            <p className="font-mono text-[10px] tracking-[.18em]">{dictionary.common.code} 14</p><p className="mt-2 text-sm text-white/65">{products[2].name[locale]} / {products[2].variants[0].name[locale]}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-24 sm:py-32">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow"><span>02</span>{dictionary.home.collectionsEyebrow}</p><h2>{dictionary.home.collectionsTitle}</h2></div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link key={category} href={`/${locale}/products`} className="collection-card group">
                <div className="aspect-[5/6] overflow-hidden"><img src={categoryImages[category]} alt={dictionary.categories[category]} width="760" height="900" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24 text-white"><span className="font-mono text-[10px] tracking-[.2em] text-white/55">0{index + 1}</span><h3 className="mt-2 text-2xl">{dictionary.categories[category]}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/65">{dictionary.categoryDescriptions[category]}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow"><span>03</span>{dictionary.home.featuredEyebrow}</p><h2>{dictionary.home.featuredTitle}</h2></div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{featured.map((product) => <ProductCard key={product.slug} product={product} locale={locale} viewLabel={dictionary.common.view} />)}</div>
        </div>
      </section>

      <section className="bg-[#1d1c19] py-24 text-white sm:py-32">
        <div className="site-shell grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow mb-7 text-[#c8b088]"><span>04</span>{dictionary.home.factoryEyebrow}</p><h2 className="max-w-[12ch] text-4xl leading-tight tracking-[-.04em] sm:text-6xl">{dictionary.home.factoryTitle}</h2><p className="mt-7 max-w-lg leading-8 text-white/55">{dictionary.home.factoryBody}</p><Link href={`/${locale}/about`} className="mt-9 inline-flex items-center gap-2 border-b border-[#c8b088] pb-2 text-sm text-[#d5c29f]">{dictionary.common.learnMore}<ArrowUpRight className="size-4" /></Link></div>
          <div className="grid content-end gap-px bg-white/12 sm:grid-cols-3">
            {[
              ['04', dictionary.home.machines], ['8,000', `${dictionary.home.moq} · ${dictionary.home.sqm}`], ['2023', dictionary.home.established],
            ].map(([value, label]) => <div key={label} className="bg-[#1d1c19] p-7 sm:min-h-52 sm:p-9"><p className="text-4xl tracking-[-.05em] sm:text-5xl">{value}</p><p className="mt-4 text-xs uppercase tracking-[.14em] text-white/45">{label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#c8b088] py-20 text-[#1d1c19]">
        <div className="site-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow mb-5">05 • B2B</p><h2 className="max-w-3xl text-4xl tracking-[-.04em] sm:text-5xl">{dictionary.home.ctaTitle}</h2><p className="mt-4 text-black/60">{dictionary.home.ctaBody}</p></div><a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="btn-primary shrink-0">{dictionary.common.whatsapp}<ArrowUpRight className="size-4" /></a></div>
      </section>
    </main>
  );
}
