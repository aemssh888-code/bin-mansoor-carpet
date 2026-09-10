import { company } from '@/lib/i18n';
import type { Locale } from '@/lib/products';
import {LanguageSwitcher} from './language-switcher';
import {catalogText} from '@/lib/catalog-i18n';
import {partnerCompanies} from '@/lib/business';

export function SiteFooter({
  locale, text, nav,
}: {
  locale: Locale; text: { line: string };
  nav: { products: string; about: string; contact: string };
}) {
  return (
    <footer className="border-t border-white/12 bg-[#191815] text-white">
      <div className="site-shell grid gap-16 py-16 lg:grid-cols-[1.2fr_.8fr] lg:py-24">
        <div>
          <p className="max-w-xl text-2xl leading-10 text-white/72">{text.line}</p>
        </div>
        <div className="grid gap-10 text-sm sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-5 text-[#c8b088]">Gaziantep</p>
            <address className="not-italic leading-7 text-white/65">{company.address}</address>
          </div>
          <nav className="flex flex-col items-start gap-4" aria-label={nav.about}>
            <a href={`tel:${company.phoneHref}`} dir="ltr" className="text-lg hover:text-[#c8b088]">{company.phoneDisplay}</a>
            <a href={`/${locale}/products`} className="text-white/60 hover:text-white">{nav.products}</a>
            <a href={`/${locale}/about`} className="text-white/60 hover:text-white">{nav.about}</a>
            <a href={`/${locale}/quote`} className="text-white/60 hover:text-white">{catalogText[locale].quote}</a>
            <a href={`/${locale}/contact`} className="text-white/60 hover:text-white">{nav.contact}</a>
            <a href={`https://wa.me/${company.phoneHref.replace('+','')}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white">WhatsApp</a>
            <LanguageSwitcher locale={locale}/>
          </nav>
        </div>
      </div>
      <div className="site-shell grid gap-7 border-t border-white/10 py-8 text-xs leading-6 text-white/38 md:grid-cols-2">
        <p>{partnerCompanies.tayyam.legalName}</p>
        <p>{partnerCompanies.binMansoor.legalName}</p>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/45">
          <span>© {new Date().getFullYear()}</span>
          <span>Gaziantep, Türkiye</span>
        </div>
      </div>
    </footer>
  );
}
