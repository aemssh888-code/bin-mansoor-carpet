import type {Metadata} from 'next';
import {ArrowUpRight} from 'lucide-react';
import {company,getDictionary,isLocale,locales} from '@/lib/i18n';
import {products,heroVariant} from '@/lib/products';
import {CatalogImage} from '@/components/catalog-image';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {jointBrand,partnerCompanies,verifiedFacts} from '@/lib/business';
import {sitePresentation} from '@/lib/presentation';

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const dictionary=getDictionary(locale);return pageMetadata(locale,'/about',dictionary.about.title,dictionary.about.intro);}

export default async function AboutPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) return null;
  const dictionary=getDictionary(locale);
  const t=catalogText[locale];
  const visual=products.find(product=>product.binMansoorCode===sitePresentation.editorialProductCode)!;
  const factLabels={established:dictionary.home.established,machines:dictionary.home.machines,minimumOrderQuantity:dictionary.home.moq};
  const companies=[{key:'tayyam' as const,data:partnerCompanies.tayyam},{key:'binMansoor' as const,data:partnerCompanies.binMansoor}];

  return <main id="main-content">
    <section className="about-hero site-shell"><p className="eyebrow">{dictionary.about.eyebrow}</p><h1>{dictionary.about.title}</h1><p>{dictionary.about.intro}</p></section>
    <section className="about-logo-stage"><div className="site-shell"><img src={jointBrand.logo} alt={jointBrand.name[locale]} width="1570" height="514"/></div></section>
    <section className="company-profiles site-shell"><header className="editorial-section-header"><p className="eyebrow">{dictionary.about.partnersEyebrow}</p><h2 className="editorial-heading">{dictionary.about.partnersTitle}</h2></header><div className="company-profile-list">{companies.map(companyItem=><article key={companyItem.key} className="company-profile"><img src={jointBrand.panelLogos[companyItem.key]} alt={companyItem.data.brandName} width="785" height="514"/><div><p className="eyebrow">{companyItem.data.brandName}</p><h3>{companyItem.data.legalName}</h3>{companyItem.key==='binMansoor'&&<div className="company-facts">{verifiedFacts.filter(fact=>fact.scope==='binMansoor').map(fact=><div key={fact.key}><strong>{fact.value.toLocaleString('en-US')} {fact.unit}</strong><span>{factLabels[fact.key]}</span></div>)}</div>}</div></article>)}</div></section>
    <section className="about-editorial"><div className="site-shell grid items-center gap-14 lg:grid-cols-[1.2fr_.8fr]"><div className="about-editorial-art"><CatalogImage asset={heroVariant(visual)} alt={`${visual.name[locale]} — ${t.preview}`} sizes="(max-width:1023px) 100vw, 62vw" className="h-full w-full object-cover"/></div><div><p className="eyebrow mb-6">{dictionary.about.storyTitle}</p><h2>{dictionary.about.storyBody}</h2><ol>{dictionary.about.workflow.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol></div></div></section>
    <section className="shared-contact-band"><div className="site-shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow">{dictionary.about.addressTitle}</p><div><address>{company.address}</address><a href={company.maps} target="_blank" rel="noreferrer" className="btn-text light mt-7">{dictionary.common.directions}<ArrowUpRight className="size-4"/></a></div></div></section>
  </main>;
}
