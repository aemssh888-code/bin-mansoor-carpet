'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { languageNames, locales } from '@/lib/i18n';
import type { Locale } from '@/lib/products';
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
  const resolvedPath = currentPath ?? pathname.replace(new RegExp(`^/${locale}`), '');
  const items = [
    { label: nav.home, href: `/${locale}`, path: '' },
    { label: nav.products, href: `/${locale}/products`, path: '/products' },
    { label: nav.about, href: `/${locale}/about`, path: '/about' },
    { label: nav.contact, href: `/${locale}/contact`, path: '/contact' },
  ];
  const isActive = (path: string) => path === '' ? resolvedPath === '' || resolvedPath === '/' : resolvedPath.startsWith(path);

  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-[#f7f5f0]/90 backdrop-blur-xl">
      <div className="site-shell flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} aria-label="BIN MANSOOR CARPET" className="shrink-0">
          <img
            src="/media/brand/bin-mansoor-logo.webp"
            alt="BIN MANSOOR CARPET"
            width="180"
            height="105"
            className="h-12 w-auto mix-blend-multiply"
          />
        </Link>

        <nav aria-label={a11y.primaryNav} className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 md:flex" aria-label={a11y.language}>
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}${resolvedPath}`}
              aria-current={item === locale ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide transition ${item === locale ? 'bg-[#1d1c19] text-white' : 'text-black/55 hover:text-black'}`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="grid size-11 place-items-center border border-black/10 bg-white" aria-label={a11y.openMenu}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side={locale === 'ar' ? 'left' : 'right'} closeLabel={a11y.closeMenu} className="bg-[#f7f5f0] p-0">
              <SheetHeader className="border-b border-black/10 p-6">
                <SheetTitle>BIN MANSOOR CARPET</SheetTitle>
                <SheetDescription>{languageNames[locale]}</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-6 py-8" aria-label={a11y.mobileNav}>
                {items.map((item, index) => (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between border-b border-black/10 py-5 text-xl">
                    <span>{item.label}</span><span className="text-xs text-[#9b8059]">0{index + 1}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex gap-2 border-t border-black/10 p-6">
                {locales.map((item) => (
                  <Link key={item} href={`/${item}${resolvedPath}`} className={`border px-3 py-2 text-xs ${item === locale ? 'border-black bg-black text-white' : 'border-black/15'}`}>
                    {languageNames[item]}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
