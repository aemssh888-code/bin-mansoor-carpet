'use client';
import {useState} from 'react';
import {heroVariant,type Locale,type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {CatalogImage} from './catalog-image';
import {isValidQuoteQuantity,useQuoteList} from '@/lib/quote-list';
import {business,MIN_ORDER_M2_PER_ITEM} from '@/lib/business';
export function ProductGallery({product,locale}:{product:Product;locale:Locale}) {
 const [active,setActive]=useState(heroVariant(product));const [quantity,setQuantity]=useState(String(MIN_ORDER_M2_PER_ITEM));const [added,setAdded]=useState(false);const t=catalogText[locale];const {add}=useQuoteList();
 const valid=isValidQuoteQuantity(quantity);const direct=`https://wa.me/${business.phoneHref.replace('+','')}?text=`+encodeURIComponent(`${t.quote}\n${product.name[locale]}\n${product.binMansoorCode}\n${t.selected}: ${active.name[locale]} — ${active.code}\n${t.quantity}: ${quantity} m²`);
 function addCurrent(){if(!valid)return;add({modelCode:product.binMansoorCode,name:product.name,colorCode:active.code,colorName:active.name,quantity});setAdded(true);window.setTimeout(()=>setAdded(false),1800);}
 return <div><div className="product-frame relative h-[65vh] min-h-80 max-h-[850px] bg-[#efeeea] p-5 sm:p-9"><CatalogImage asset={active} alt={`${product.name[locale]} — ${active.name[locale]} — ${t.preview}`} priority sizes="(max-width: 1023px) 94vw, 52vw" className="h-full w-full object-contain"/><span className="preview-label">{t.preview}</span></div>
 <p className="mt-4 text-sm leading-6 text-black/60">{t.previewNote}</p><div className="my-6" aria-live="polite"><p>{t.selected}: {active.name[locale]}</p><p dir="ltr" className="mt-2 font-mono text-sm">{active.code}</p></div><div className="flex flex-wrap gap-3" aria-label={t.colors}>{product.colorways.map(c=><button key={c.code} type="button" aria-pressed={active.code===c.code} aria-label={`${c.name[locale]} ${c.code}`} onClick={()=>setActive(c)} className={`colorway-thumb ${active.code===c.code?'selected':''}`}><CatalogImage asset={c} alt={c.name[locale]} sizes="80px" className="h-24 w-full object-contain"/><span>{c.name[locale]}</span></button>)}</div>
 <label className="mt-6 grid max-w-xs gap-2 text-sm">{t.quantity}<input type="number" min={MIN_ORDER_M2_PER_ITEM} step="any" value={quantity} aria-invalid={!valid} onChange={e=>setQuantity(e.target.value)}/></label>{!valid&&<p role="alert" className="quantity-error">{t.moqValidation}</p>}
 <div className="mt-8 hidden flex-wrap gap-3 sm:flex"><button type="button" className="btn-primary" disabled={!valid} onClick={addCurrent}>{added?t.added:t.add}</button><a href={`/${locale}/quote`} aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault();else addCurrent();}} className="btn-secondary">{t.quote}</a><a href={valid?direct:undefined} aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault();}} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a></div><output className="sr-only">{added?t.added:''}</output>
 <div className="mobile-product-actions"><button type="button" disabled={!valid} onClick={addCurrent}>{added?t.added:t.add}</button><a href={valid?direct:undefined} aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault();}} target="_blank" rel="noreferrer">WhatsApp</a></div></div>;
}
