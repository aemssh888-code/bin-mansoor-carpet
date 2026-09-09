import {ArrowUpRight} from 'lucide-react';
import {ProductCard} from '@/components/product-card';
import {getDictionary,isLocale,locales} from '@/lib/i18n';
import {categories,products,heroVariant} from '@/lib/products';
import {CatalogImage} from '@/components/catalog-image';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {jointBrand,partnerCompanies,verifiedFacts} from '@/lib/business';
import {sitePresentation} from '@/lib/presentation';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) return {};
  const dictionary=getDictionary(locale);
  return pageMetadata(locale,'',dictionary.hero.title.replace('\n',' '),dictionary.hero.body);
}

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export default async function HomePage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) return null;
  const dictionary=getDictionary(locale);
  const t=catalogText[locale];
  const byCode=(code:string)=>products.find(product=>product.binMansoorCode===code)!;
  const hero=byCode(sitePresentation.heroProductCode);
  const editorial=byCode(sitePresentation.editorialProductCode);
  const selected=sitePresentation.homepageProductCodes.map(byCode);
  const collectionProducts=categories.map(category=>({category,product:byCode(sitePresentation.collectionProductCodes[category])}));
  const factLabels={established:dictionary.home.established,machines:dictionary.home.machines,minimumOrderQuantity:dictionary.home.moq};

  return <main id="main-content">
    <section className="home-hero site-shell">
      <div className="hero-copy">
        <p className="eyebrow hero-kicker">{dictionary.hero.eyebrow}</p>
        <h1 className="hero-title whitespace-pre-line">{dictionary.hero.title}</h1>
        <p className="hero-support">{locale === 'ar' ? <>شراكة <bdi dir="ltr">TAYYAM CARPET</bdi> و <bdi dir="ltr">BIN MANSOOR CARPET</bdi> من غازي عنتاب.</> : dictionary.hero.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`/${locale}/products`} className="btn-primary">{dictionary.common.explore}<ArrowUpRight className="size-4"/></a>
          <a href={`/${locale}/quote`} className="btn-text">{dictionary.common.enquire}<ArrowUpRight className="size-4"/></a>
        </div>
      </div>
      <a href={`/${locale}/products/${hero.slug}`} className="hero-art group" aria-label={`${dictionary.common.view}: ${hero.name[locale]}`}>
        <CatalogImage asset={heroVariant(hero)} alt={`${hero.name[locale]} — ${t.preview}`} priority sizes="(max-width:1023px) 100vw, 60vw" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.015]"/>
        <div className="hero-art-caption"><span>{hero.name[locale]}</span><bdi>{hero.binMansoorCode}</bdi></div>
      </a>
    </section>

    <section className="partnership-intro">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div><p className="eyebrow mb-6">{dictionary.home.partnerEyebrow}</p><h2 className="editorial-heading">{dictionary.home.partnerTitle}</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-black/58">{dictionary.home.partnerBody}</p><a href={`/${locale}/about`} className="btn-text mt-8">{dictionary.common.learnMore}<ArrowUpRight className="size-4"/></a></div>
        <img src={jointBrand.logo} alt={jointBrand.name[locale]} width="1570" height="514" className="joint-logo-display"/>
      </div>
    </section>

    <section className="collection-worlds site-shell">
      <header className="editorial-section-header"><p className="eyebrow">{dictionary.home.collectionsEyebrow}</p><h2 className="editorial-heading">{dictionary.home.collectionsTitle}</h2></header>
      <div className="collection-world-list">
        {collectionProducts.map(({category,product},index)=><article key={category} className="collection-world">
          <a href={`/${locale}/products?category=${category}`} className="collection-world-art group"><CatalogImage asset={heroVariant(product)} alt={`${dictionary.categories[category]} — ${t.preview}`} sizes="(max-width:1023px) 100vw, 58vw" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.02]"/></a>
          <div className="collection-world-copy"><p className="eyebrow">0{index+1}</p><h3>{dictionary.categories[category]}</h3><p>{dictionary.categoryDescriptions[category]}</p><a href={`/${locale}/products?category=${category}`} className="btn-text">{dictionary.common.explore}<ArrowUpRight className="size-4"/></a></div>
        </article>)}
      </div>
    </section>

    <section className="editorial-feature">
      <div className="site-shell editorial-feature-grid">
        <a href={`/${locale}/products/${editorial.slug}`} className="editorial-feature-art group"><CatalogImage asset={heroVariant(editorial)} alt={`${editorial.name[locale]} — ${t.preview}`} sizes="(max-width:1023px) 100vw, 68vw" className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.015]"/></a>
        <div className="editorial-feature-copy"><p className="eyebrow">{dictionary.home.editorialEyebrow}</p><h2>{editorial.name[locale]}</h2><p className="mt-5 text-lg text-white/60">{dictionary.home.editorialTitle}</p><dl className="mt-10 border-t border-white/20 pt-6 text-sm"><div><dt>{t.collection}</dt><dd>{editorial.collection[locale]}</dd></div><div><dt>{t.style}</dt><dd>{editorial.styles.map(style=>style[locale]).join(' · ')}</dd></div></dl><a href={`/${locale}/products/${editorial.slug}`} className="btn-text light mt-10">{dictionary.common.exploreDesign}<ArrowUpRight className="size-4"/></a><bdi className="mt-auto block pt-12 font-mono text-sm text-[#c8b088]">{editorial.binMansoorCode}</bdi></div>
      </div>
    </section>

    <section className="selected-designs site-shell">
      <header className="editorial-section-header"><p className="eyebrow">{dictionary.home.featuredEyebrow}</p><h2 className="editorial-heading">{dictionary.home.featuredTitle}</h2></header>
      <div className="selected-design-grid">{selected.map(product=><ProductCard key={product.id} product={product} locale={locale} viewLabel={dictionary.common.view}/>)}</div>
      <a href={`/${locale}/products`} className="btn-text mt-14">{dictionary.common.explore}<ArrowUpRight className="size-4"/></a>
    </section>

    <section className="partnership-story">
      <div className="site-shell grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div><p className="eyebrow mb-7">{dictionary.home.factoryEyebrow}</p><h2 className="editorial-heading">{dictionary.home.factoryTitle}</h2></div>
        <div><p className="text-xl leading-9 text-black/60">{dictionary.home.factoryBody}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><p className="brand-wordmark">{partnerCompanies.tayyam.brandName}</p><p className="brand-wordmark">{partnerCompanies.binMansoor.brandName}</p></div></div>
      </div>
    </section>

    <section className="verified-facts">
      <div className="site-shell"><header className="max-w-3xl"><p className="eyebrow mb-6 text-[#c8b088]">{dictionary.home.factsEyebrow}</p><h2 className="text-4xl leading-tight tracking-[-.04em] sm:text-6xl">{dictionary.home.factsTitle}</h2></header><div className="fact-lineup">{verifiedFacts.map(fact=><div key={fact.key} className="fact-line"><p className="fact-value">{fact.value.toLocaleString('en-US')} {fact.unit}</p><p className="fact-label">{factLabels[fact.key]}<span>BIN MANSOOR CARPET</span></p></div>)}</div></div>
    </section>

    <section className="project-cta"><div className="site-shell flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><div><p className="eyebrow mb-6">B2B · PROJECT ENQUIRY</p><h2>{dictionary.home.ctaTitle}</h2><p>{dictionary.home.ctaBody}</p></div><a href={`/${locale}/quote`} className="btn-primary shrink-0">{t.quote}<ArrowUpRight className="size-4"/></a></div></section>
  </main>;
}
