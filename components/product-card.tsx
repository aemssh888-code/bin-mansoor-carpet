import {heroVariant, type Locale, type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {CatalogImage} from './catalog-image';
export function ProductCard({product,locale,viewLabel}:{product:Product;locale:Locale;viewLabel:string}) {
 const t=catalogText[locale];const n=product.colorways.length;const colorCount=locale==='ar'?(n===1?'معاينة لونية واحدة':n===2?'معاينتان لونيتان':`${n} معاينات لونية`):locale==='en'?`${n} colour preview${n===1?'':'s'}`:`${n} renk ön izlemesi`;
 return <article className="product-card group"><a href={`/${locale}/products/${product.slug}`} aria-label={`${viewLabel}: ${product.name[locale]} ${product.binMansoorCode}`} className="block">
  <div className="product-frame relative aspect-[4/5] bg-[#f0efeb] p-5 sm:p-7"><CatalogImage asset={heroVariant(product)} alt={`${product.name[locale]} — ${t.preview}`} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"/><span className="preview-label">{t.preview}</span></div>
  <div className="border-b border-black/12 py-5"><div className="flex items-start justify-between gap-3"><h3 className="text-xl">{product.name[locale]}</h3><span className="shrink-0 text-sm text-black/60">{colorCount}</span></div><p className="mt-2 font-mono text-sm" dir="ltr">{product.binMansoorCode}</p></div>
 </a></article>;
}
