import {heroVariant, type Locale, type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {CatalogImage} from './catalog-image';
export function ProductCard({product,locale,viewLabel}:{product:Product;locale:Locale;viewLabel:string}) {
 const t=catalogText[locale];const n=product.colorways.length;const colorCount=locale==='ar'?(n===1?'معاينة لونية واحدة':n===2?'معاينتان لونيتان':`${n} معاينات لونية`):locale==='en'?`${n} colour preview${n===1?'':'s'}`:`${n} renk ön izlemesi`;
 return <article className="product-card group"><a href={`/${locale}/products/${product.slug}`} aria-label={`${viewLabel}: ${product.name[locale]} ${product.binMansoorCode}`} className="block">
  <div className="product-card-art"><CatalogImage asset={heroVariant(product)} alt={`${product.name[locale]} — ${t.preview}`} className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.018]"/></div>
  <div className="product-card-copy"><div className="product-card-title-row"><h3>{product.name[locale]}</h3><span>{colorCount}</span></div><div className="product-card-code"><p dir="ltr">{product.binMansoorCode}</p><span aria-hidden="true">↗</span></div></div>
 </a></article>;
}
