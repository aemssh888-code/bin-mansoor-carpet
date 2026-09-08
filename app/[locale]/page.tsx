import { ArrowUpRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { getDictionary, isLocale, locales, whatsappUrl } from '@/lib/i18n';
import { categories, products, heroVariant } from '@/lib/products';
import {CatalogImage} from '@/components/catalog-image';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {FutureSections} from '@/components/future-sections';
import {business} from '@/lib/business';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;if(!isLocale(locale))return {};const d=getDictionary(locale);return pageMetadata(locale,'',d.hero.title,d.hero.body);}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  const featured = products.filter((product) => product.featured);
  const t=catalogText[locale];
  const hero=products[0];
  const accent=products.find(p=>p.binMansoorCode==='BMC-MCL-006')!;
  const categoryImages = {
    modern: heroVariant(products.find(p=>p.binMansoorCode==='BMC-MOD-004')!),
    'modern-classic': heroVariant(accent),
    'classic-heritage': heroVariant(products.find(p=>p.binMansoorCode==='BMC-CLS-024')!),
  };
  const whyItems=[`${products.length} ${t.whyItems[0]}`,...t.whyItems.slice(1)];

  return (
    <main id="main-content">
      <section className="site-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-12 lg:grid-cols-[.86fr_1.14fr] lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mb-7"><span>01</span>{dictionary.hero.eyebrow}</p>
          <h1 className="display-title max-w-[12ch]">{dictionary.hero.title}</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/60">{dictionary.hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`/${locale}/products`} className="btn-primary">{dictionary.common.explore}<ArrowUpRight className="size-4" /></a>
            <a href={`/${locale}/quote`} className="btn-secondary">{dictionary.common.enquire}</a>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[.2em] text-black/40">{dictionary.hero.note}</p>
        </div>
        <div className="hero-gallery relative min-h-[560px] lg:min-h-[690px]">
          <div className="absolute inset-y-0 end-0 w-[78%] overflow-hidden bg-[#181a19]">
            <CatalogImage asset={heroVariant(hero)} alt={`${hero.name[locale]} — ${t.preview}`} priority sizes="(max-width:1023px) 78vw, 44vw" className="h-full w-full object-contain p-8" />
          </div>
          <div className="absolute bottom-[8%] start-0 w-[38%] border-[10px] border-[#f7f5f0] bg-white shadow-[0_28px_80px_rgba(24,22,18,.18)]">
            <CatalogImage asset={heroVariant(accent)} alt={`${accent.name[locale]} — ${t.preview}`} sizes="25vw" className="aspect-[3/4] h-full w-full object-contain p-3" />
          </div>
          <div className="absolute end-3 top-5 border-s border-white/45 py-4 ps-4 text-white">
            <p dir="ltr" className="font-mono text-sm">{hero.binMansoorCode}</p><p className="mt-2 text-sm text-white/80">{hero.name[locale]} / {t.preview}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-24 sm:py-32">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow"><span>02</span>{dictionary.home.collectionsEyebrow}</p><h2>{dictionary.home.collectionsTitle}</h2></div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {categories.map((category, index) => (
              <a key={category} href={`/${locale}/products?category=${category}`} className="collection-card group">
                <div className="aspect-[5/6] overflow-hidden"><CatalogImage asset={categoryImages[category]} alt={`${dictionary.categories[category]} — ${t.preview}`} className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-[1.03]" /></div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24 text-white"><span className="font-mono text-[10px] tracking-[.2em] text-white/55">0{index + 1}</span><h3 className="mt-2 text-2xl">{dictionary.categories[category]}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-white/65">{dictionary.categoryDescriptions[category]}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-shell">
          <div className="section-heading"><p className="eyebrow"><span>03</span>{dictionary.home.featuredEyebrow}</p><h2>{dictionary.home.featuredTitle}</h2></div>
          <div className="featured-grid mt-14">{featured.map((product) => <ProductCard key={product.slug} product={product} locale={locale} viewLabel={dictionary.common.view} />)}</div>
        </div>
      </section>

      <section className="site-shell py-16"><h2 className="text-3xl">{t.why}</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{whyItems.map((item,i)=><p key={item} className="border-t border-black/15 pt-6 text-lg"><span className="mb-4 block font-mono text-sm text-[#8b724e]">0{i+1}</span>{item}</p>)}</div></section>
      <FutureSections locale={locale}/>
      <section className="site-shell py-16"><h2 className="text-3xl">{t.workflow}</h2><ol className="mt-8 grid gap-8 md:grid-cols-4">{dictionary.about.workflow.map((item,i)=><li key={item} className="border-t border-black/15 pt-6"><span className="block mb-4 font-mono text-sm">0{i+1}</span>{item}</li>)}</ol></section>
      <section className="bg-[#1d1c19] py-24 text-white sm:py-32">
        <div className="site-shell grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow mb-7 text-[#c8b088]"><span>04</span>{dictionary.home.factoryEyebrow}</p><h2 className="max-w-[12ch] text-4xl leading-tight tracking-[-.04em] sm:text-6xl">{dictionary.home.factoryTitle}</h2><p className="mt-7 max-w-lg leading-8 text-white/55">{dictionary.home.factoryBody}</p><a href={`/${locale}/about`} className="mt-9 inline-flex items-center gap-2 border-b border-[#c8b088] pb-2 text-sm text-[#d5c29f]">{dictionary.common.learnMore}<ArrowUpRight className="size-4" /></a></div>
          <div className="grid self-end gap-px bg-white/12 sm:grid-cols-3">
            {[
              [String(business.machines), dictionary.home.machines], [business.minimumOrderQuantity.toLocaleString('en-US'), `${dictionary.home.moq} · ${dictionary.home.sqm}`], [String(business.established), dictionary.home.established],
            ].map(([value, label]) => <div key={label} className="bg-[#1d1c19] p-7 sm:min-h-52 sm:p-9"><p className="text-4xl tracking-[-.05em] sm:text-5xl">{value}</p><p className="mt-4 text-xs uppercase tracking-[.14em] text-white/45">{label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#c8b088] py-20 text-[#1d1c19]">
        <div className="site-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow mb-5">B2B</p><h2 className="max-w-3xl text-4xl tracking-[-.04em] sm:text-5xl">{dictionary.home.ctaTitle}</h2><p className="mt-4 text-black/60">{dictionary.home.ctaBody}</p></div><a href={`/${locale}/quote`} className="btn-primary shrink-0">{t.quote}<ArrowUpRight className="size-4" /></a></div>
      </section>
      <section className="site-shell py-16 flex flex-wrap items-center justify-between gap-6"><h2 className="text-3xl">{t.contact}</h2><a className="btn-secondary" href={`/${locale}/contact`}>{dictionary.nav.contact}</a><a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="underline" dir="ltr">+90 530 351 30 37</a></section>
    </main>
  );
}
