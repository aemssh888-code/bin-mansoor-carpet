import type {Metadata} from 'next';
import {ArrowUpRight} from 'lucide-react';
import {CatalogImage} from '@/components/catalog-image';
import {jointBrand,partnerCompanies} from '@/lib/business';
import {catalogText} from '@/lib/catalog-i18n';
import {company,getDictionary,isLocale,locales} from '@/lib/i18n';
import {sitePresentation} from '@/lib/presentation';
import {heroVariant,products} from '@/lib/products';
import {pageMetadata} from '@/lib/seo';

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const dictionary=getDictionary(locale);return pageMetadata(locale,'/about',dictionary.about.title,dictionary.about.intro);}

export default async function AboutPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;
 if(!isLocale(locale))return null;
 const dictionary=getDictionary(locale);
 const t=catalogText[locale];
 const visual=products.find(product=>product.binMansoorCode===sitePresentation.editorialProductCode)!;
 const legalCompanies=[partnerCompanies.tayyam,partnerCompanies.binMansoor];

 return <main id="main-content">
  <section className="about-hero site-shell"><p className="eyebrow">{dictionary.about.eyebrow}</p><h1>{dictionary.about.title}</h1><p>{dictionary.about.intro}</p></section>
  <section className="about-logo-stage"><div className="site-shell"><img src={jointBrand.logo} alt={jointBrand.name[locale]} width="1570" height="514"/></div></section>
  <section className="about-brand-statement site-shell"><p className="eyebrow">{dictionary.about.partnersEyebrow}</p><h2 className="editorial-heading">{dictionary.about.partnersTitle}</h2></section>
  <section className="about-editorial"><div className="site-shell grid items-center gap-14 lg:grid-cols-[1.2fr_.8fr]"><div className="about-editorial-art"><CatalogImage asset={heroVariant(visual)} alt={`${visual.name[locale]} — ${t.preview}`} sizes="(max-width:1023px) 100vw, 62vw" className="h-full w-full object-cover"/></div><div><p className="eyebrow mb-6">{dictionary.about.storyTitle}</p><h2>{dictionary.about.storyBody}</h2><ol>{dictionary.about.workflow.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol></div></div></section>
  <section className="about-legal"><div className="site-shell"><p className="eyebrow mb-7">{dictionary.about.factsTitle}</p><div className="legal-name-list">{legalCompanies.map(legal=><p key={legal.brandName}><strong>{legal.brandName}</strong><span>{legal.legalName}</span></p>)}</div></div></section>
  <section className="shared-contact-band"><div className="site-shell grid gap-8 lg:grid-cols-[.65fr_1.35fr]"><p className="eyebrow">{dictionary.about.addressTitle}</p><div><address>{company.address}</address><a href={company.maps} target="_blank" rel="noreferrer" className="btn-text light mt-7">{dictionary.common.directions}<ArrowUpRight className="size-4"/></a></div></div></section>
 </main>;
}
