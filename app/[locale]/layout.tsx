import { notFound } from 'next/navigation';
import { LocaleDocument } from '@/components/locale-document';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import {business} from '@/lib/business';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <div lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f7f5f0] text-[#1d1c19]">
      <LocaleDocument locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'BIN MANSOOR CARPET',legalName:business.legalName,address:{'@type':'PostalAddress',streetAddress:business.address,addressLocality:'Gaziantep',addressCountry:'TR'},telephone:business.phoneHref,url:'https://bin-mansoor-carpet.vercel.app'})}} />
      <a href="#main-content" className="skip-link">{dictionary.a11y.skip}</a>
      <SiteHeader locale={locale} nav={dictionary.nav} a11y={dictionary.a11y} />
      {children}
      <SiteFooter locale={locale} text={dictionary.footer} nav={dictionary.nav} />
    </div>
  );
}
