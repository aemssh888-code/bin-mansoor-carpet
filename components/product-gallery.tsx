'use client';

import { useState } from 'react';
import type { Locale, ProductVariant } from '@/lib/products';

export function ProductGallery({ variants, locale, label }: { variants: ProductVariant[]; locale: Locale; label: string }) {
  const [active, setActive] = useState(variants[0]);
  return (
    <div>
      <div className="product-frame relative aspect-[4/5] overflow-hidden bg-[#ece8df]">
        <img src={active.image} alt={active.name[locale]} width="1100" height="1375" className="h-full w-full object-cover" />
        <span className="absolute bottom-4 bg-[#f7f5f0]/94 px-3 py-2 text-xs ltr:left-4 rtl:right-4">{active.name[locale]}</span>
      </div>
      <p className="eyebrow mb-4 mt-7">{label}</p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => setActive(variant)}
            aria-pressed={active.id === variant.id}
            className={`flex items-center gap-2 border px-3 py-2 text-xs transition ${active.id === variant.id ? 'border-black bg-black text-white' : 'border-black/15 bg-white hover:border-black/40'}`}
          >
            <span className="size-3 rounded-full border border-black/10" style={{ backgroundColor: variant.swatch }} />
            {variant.name[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}

