import type { Metadata } from 'next';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company, getDictionary, isLocale, locales, whatsappUrl } from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return pageMetadata(locale,'/contact',dictionary.contact.title,dictionary.contact.body);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const dictionary = getDictionary(locale);
  return (
    <main id="main-content">
      <section className="site-shell grid gap-14 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow mb-7"><span>01</span>{dictionary.contact.eyebrow}</p><h1 className="display-title max-w-[10ch]">{dictionary.contact.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-black/58">{dictionary.contact.body}</p></div><div className="grid gap-px bg-black/10"><a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="contact-row group"><span className="contact-icon"><MessageCircle /></span><span><small>{dictionary.common.whatsapp}</small><strong>{company.phoneDisplay}</strong></span><ArrowUpRight className="ms-auto size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a><a href={`tel:${company.phoneHref}`} className="contact-row group"><span className="contact-icon"><Phone /></span><span><small>{dictionary.contact.phone}</small><strong>{company.phoneDisplay}</strong></span><ArrowUpRight className="ms-auto size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a><a href={company.maps} target="_blank" rel="noreferrer" className="contact-row group"><span className="contact-icon"><MapPin /></span><span><small>{dictionary.contact.address}</small><strong className="max-w-xl leading-7">{company.address}</strong></span><ArrowUpRight className="ms-auto size-5 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></a></div></section>
      <section className="border-t border-black/10 bg-white py-16"><div className="site-shell"><p className="eyebrow mb-5">{dictionary.contact.legal}</p><p className="max-w-4xl text-sm leading-7 text-black/55">{company.legalName}</p></div></section>
      <section className="site-shell pb-16"><a href={`/${locale}/quote`} className="btn-primary">{dictionary.common.enquire}</a></section>
    </main>
  );
}
