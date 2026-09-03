import Link from 'next/link';
import type { Locale, Product } from '@/lib/products';

export function ProductCard({ product, locale, viewLabel }: { product: Product; locale: Locale; viewLabel: string }) {
  const image = product.variants[0];
  return (
    <article className="group">
      <Link href={`/${locale}/products/${product.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9b8059]">
        <div className="product-frame relative aspect-[4/5] overflow-hidden bg-[#ebe7de]">
          <img
            src={image.image}
            alt={`${product.name[locale]} — ${image.name[locale]}`}
            width="900"
            height="1125"
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
          />
          <span className="absolute top-4 bg-[#f7f5f0]/92 px-3 py-2 font-mono text-[10px] tracking-[.18em] ltr:right-4 rtl:left-4">
            {product.code}
          </span>
        </div>
        <div className="flex items-start justify-between gap-5 border-b border-black/12 py-4">
          <div>
            <h3 className="text-xl tracking-[-.025em]">{product.name[locale]}</h3>
            <p className="mt-1 font-mono text-[10px] tracking-[.14em] text-black/45">{product.code}</p>
          </div>
          <span className="mt-1 text-xs font-semibold text-[#8b724e] transition group-hover:translate-x-[-3px] rtl:group-hover:translate-x-[3px]">{viewLabel} ↗</span>
        </div>
      </Link>
    </article>
  );
}
