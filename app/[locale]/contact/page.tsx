import type {Metadata} from 'next';
import {ArrowUpRight,MapPin,Phone} from 'lucide-react';
import {InstagramIcon,TikTokIcon,WhatsAppIcon} from '@/components/contact-brand-icons';
import {company,getDictionary,isLocale,locales,whatsappUrl} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {partnerCompanies,tayyamSocialAccounts} from '@/lib/business';
import type {Locale} from '@/lib/products';

const socialText={
  ar:{instagram:'إنستغرام',tiktok:'تيك توك',instagramAria:'فتح حساب TAYYAM CARPET على إنستغرام',tiktokAria:'فتح حساب TAYYAM CARPET على تيك توك'},
  en:{instagram:'Instagram',tiktok:'TikTok',instagramAria:'Open TAYYAM CARPET on Instagram',tiktokAria:'Open TAYYAM CARPET on TikTok'},
  tr:{instagram:'Instagram',tiktok:'TikTok',instagramAria:'TAYYAM CARPET Instagram hesabını aç',tiktokAria:'TAYYAM CARPET TikTok hesabını aç'},
} satisfies Record<Locale,{instagram:string;tiktok:string;instagramAria:string;tiktokAria:string}>;

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return {};const dictionary=getDictionary(locale);return pageMetadata(locale,'/contact',dictionary.contact.title,dictionary.contact.body);}

export default async function ContactPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) return null;
  const dictionary=getDictionary(locale);
  const social=socialText[locale];
  const partners=[partnerCompanies.tayyam,partnerCompanies.binMansoor];
  const contactItems=[
    {href:whatsappUrl(locale),label:dictionary.common.whatsapp,value:company.phoneDisplay,Icon:WhatsAppIcon,external:true,ariaLabel:undefined},
    {href:`tel:${company.phoneHref}`,label:dictionary.common.call,value:company.phoneDisplay,Icon:Phone,external:false,ariaLabel:undefined},
    {href:company.maps,label:dictionary.contact.address,value:company.address,Icon:MapPin,external:true,ariaLabel:undefined},
    {href:tayyamSocialAccounts.instagram.url,label:social.instagram,value:tayyamSocialAccounts.instagram.handle,Icon:InstagramIcon,external:true,ariaLabel:social.instagramAria},
    {href:tayyamSocialAccounts.tiktok.url,label:social.tiktok,value:tayyamSocialAccounts.tiktok.handle,Icon:TikTokIcon,external:true,ariaLabel:social.tiktokAria},
  ];
  return <main id="main-content">
    <section className="contact-hero site-shell"><div><p className="eyebrow">{dictionary.contact.eyebrow}</p><h1>{dictionary.contact.title}</h1></div><div className="contact-intro"><p>{dictionary.contact.body}</p><small>{dictionary.contact.shared}</small></div></section>
    <section className="contact-links site-shell">{contactItems.map(({href,label,value,Icon,external,ariaLabel})=><a key={label} href={href} aria-label={ariaLabel} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}><Icon aria-hidden="true"/><span><small>{label}</small><strong>{value}</strong></span><ArrowUpRight aria-hidden="true"/></a>)}</section>
    <section className="contact-legal"><div className="site-shell"><p className="eyebrow mb-8">{dictionary.contact.legal}</p><div>{partners.map(partner=><article key={partner.brandName}><p>{partner.legalName}</p></article>)}</div><a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="btn-primary mt-12">{dictionary.contact.cta}<ArrowUpRight className="size-4"/></a></div></section>
  </main>;
}
