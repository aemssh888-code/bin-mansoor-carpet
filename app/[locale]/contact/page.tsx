import type {Metadata} from 'next';
import {ArrowUpRight,MapPin,MessageCircle,Phone} from 'lucide-react';
import {company,getDictionary,isLocale,locales,whatsappUrl} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {jointBrand,partnerCompanies} from '@/lib/business';

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const dictionary=getDictionary(locale);return pageMetadata(locale,'/contact',dictionary.contact.title,dictionary.contact.body);}

export default async function ContactPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) return null;
  const dictionary=getDictionary(locale);
  const partners=[partnerCompanies.tayyam,partnerCompanies.binMansoor];
  const contactItems=[
    {href:whatsappUrl(locale),label:dictionary.common.whatsapp,value:company.phoneDisplay,Icon:MessageCircle,external:true},
    {href:`tel:${company.phoneHref}`,label:dictionary.common.call,value:company.phoneDisplay,Icon:Phone,external:false},
    {href:company.maps,label:dictionary.contact.address,value:company.address,Icon:MapPin,external:true},
  ];
  return <main id="main-content">
    <section className="contact-hero site-shell"><div><div className="contact-brand-pair" dir="ltr"><img src={jointBrand.panelLogos.tayyam} alt="TAYYAM CARPET" width="785" height="514"/><span/><img src={jointBrand.panelLogos.binMansoor} alt="BIN MANSOOR CARPET" width="785" height="514"/></div><p className="eyebrow mt-10">{dictionary.contact.eyebrow}</p><h1>{dictionary.contact.title}</h1></div><div className="contact-intro"><p>{dictionary.contact.body}</p><small>{dictionary.contact.shared}</small></div></section>
    <section className="contact-links site-shell">{contactItems.map(({href,label,value,Icon,external})=><a key={label} href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}><Icon/><span><small>{label}</small><strong>{value}</strong></span><ArrowUpRight/></a>)}</section>
    <section className="contact-legal"><div className="site-shell"><p className="eyebrow mb-8">{dictionary.contact.partners} · {dictionary.contact.legal}</p><div>{partners.map(partner=><article key={partner.brandName}><h2>{partner.brandName}</h2><p>{partner.legalName}</p></article>)}</div><a href={`/${locale}/quote`} className="btn-primary mt-12">{dictionary.common.enquire}<ArrowUpRight className="size-4"/></a></div></section>
  </main>;
}
