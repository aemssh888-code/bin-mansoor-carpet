'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { languageNames, locales } from '@/lib/i18n';
import type { Locale } from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {useQuoteList} from '@/lib/quote-list';
import {saveLanguagePreference} from '@/lib/language-preference';
import {jointBrand} from '@/lib/business';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';

type NavDictionary = {
  home: string; products: string; about: string; contact: string;
};

export function SiteHeader({
  locale, nav, a11y, currentPath,
}: {
  locale: Locale; nav: NavDictionary; currentPath?: string;
  a11y: { primaryNav: string; language: string; openMenu: string; mobileNav: string; closeMenu: string };
}) {
  const pathname = usePathname();
  const {items:quoteItems}=useQuoteList();
  const resolvedPath = currentPath ?? pathname.replace(new RegExp(`^/${locale}`), '');
  const items = [
    { label: nav.home, href: `/${locale}`, path: '' },
    { label: nav.products, href: `/${locale}/products`, path: '/products' },
    { label: nav.about, href: `/${locale}/about`, path: '/about' },
    { label: nav.contact, href: `/${locale}/contact`, path: '/contact' },
    { label: catalogText[locale].quote, href: `/${locale}/quote`, path: '/quote' },
  ];
  const isActive = (path: string) => path === '' ? resolvedPath === '' || resolvedPath === '/' : resolvedPath.startsWith(path);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-black/8 bg-[#f7f5f0]/94 backdrop-blur-xl">
      <div className="site-header-inner site-shell flex items-center justify-between gap-4">
        <a href={`/${locale}`} aria-label={jointBrand.name[locale]} className="joint-brand-lockup shrink-0" dir="ltr"><img src={jointBrand.logo} alt={jointBrand.name[locale]} width="1570" height="514"/></a>

        <nav aria-label={a11y.primaryNav} className="hidden items-center gap-6 xl:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className="nav-link"
            >
              {item.label}{item.path==='/quote'&&quoteItems.length>0?<span className="ms-1 font-mono text-[10px]">({quoteItems.length})</span>:null}
            </a>
          ))}
        </nav>

        <div className="header-language hidden items-center gap-1 border-s border-black/12 ps-4 md:flex" aria-label={a11y.language}>
          {locales.map((item) => (
            <a
              key={item}
              href={`/${item}${resolvedPath}`}
              onClick={()=>saveLanguagePreference(item)}
              aria-current={item === locale ? 'true' : undefined}
              className={`px-2 py-1.5 text-xs font-semibold tracking-wide transition ${item === locale ? 'text-[#8b724e] underline decoration-1 underline-offset-8' : 'text-black/45 hover:text-black'}`}
            >
              {item.toUpperCase()}
            </a>
          ))}
        </div>

        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger className="menu-trigger grid size-11 place-items-center border border-black/10 bg-white" aria-label={a11y.openMenu}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side={locale === 'ar' ? 'left' : 'right'} closeLabel={a11y.closeMenu} className="bg-[#f7f5f0] p-0">
              <SheetHeader className="border-b border-black/10 p-6">
                <SheetTitle>{jointBrand.name[locale]}</SheetTitle>
                <SheetDescription>{languageNames[locale]}</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-8" aria-label={a11y.mobileNav}>
                {items.map((item, index) => (
                  <a key={item.href} href={item.href} className="flex items-center justify-between border-b border-black/10 py-5 text-xl">
                    <span>{item.label}{item.path==='/quote'&&quoteItems.length>0?` (${quoteItems.length})`:''}</span><span className="text-xs text-[#9b8059]">0{index + 1}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex gap-2 border-t border-black/10 p-6">
                {locales.map((item) => (
                  <a key={item} href={`/${item}${resolvedPath}`} onClick={()=>saveLanguagePreference(item)} className={`border px-3 py-2 text-xs ${item === locale ? 'border-black bg-black text-white' : 'border-black/15'}`}>
                    {languageNames[item]}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
