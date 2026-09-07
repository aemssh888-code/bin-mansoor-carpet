import { company } from '@/lib/i18n';
import type { Locale } from '@/lib/products';

export function SiteFooter({
  locale, text, nav,
}: {
  locale: Locale; text: { line: string; rights: string };
  nav: { products: string; contact: string };
}) {
  return (
    <footer className="border-t border-white/12 bg-[#191815] text-white">
      <div className="site-shell grid gap-12 py-14 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <img src="/media/brand/bin-mansoor-logo.webp" alt="BIN MANSOOR CARPET" width="200" height="115" className="mb-7 h-14 w-auto bg-white object-contain" />
          <p className="max-w-md text-lg text-white/65">{text.line}</p>
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 text-[#c8b088]">Gaziantep</p>
            <address className="not-italic leading-7 text-white/65">{company.address}</address>
          </div>
          <div className="flex flex-col items-start gap-3">
            <a href={`tel:${company.phoneHref}`} dir="ltr" className="text-lg hover:text-[#c8b088]">{company.phoneDisplay}</a>
            <a href={`/${locale}/products`} className="text-white/60 hover:text-white">{nav.products}</a>
            <a href={`/${locale}/contact`} className="text-white/60 hover:text-white">{nav.contact}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-white/45">
          <span>© {new Date().getFullYear()} {text.rights}</span>
          <span>Gaziantep, Türkiye</span>
        </div>
      </div>
    </footer>
  );
}
