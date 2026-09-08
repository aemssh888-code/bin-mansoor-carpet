'use client';
import {useState} from 'react';
import {heroVariant,type Locale,type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {CatalogImage} from './catalog-image';
import {useQuoteList} from '@/lib/quote-list';
export function ProductGallery({product,locale}:{product:Product;locale:Locale}) {
 const [active,setActive]=useState(heroVariant(product));const [quantity,setQuantity]=useState('');const [added,setAdded]=useState(false);const t=catalogText[locale];const {add}=useQuoteList();
 const direct='https://wa.me/905303513037?text='+encodeURIComponent(`${t.quote}\n${product.name[locale]}\n${product.binMansoorCode}\n${t.selected}: ${active.name[locale]} — ${active.code}`);
 function addCurrent(){add({modelCode:product.binMansoorCode,name:product.name,colorCode:active.code,colorName:active.name,quantity});setAdded(true);window.setTimeout(()=>setAdded(false),1800);}
 return <div><div className="product-frame relative h-[65vh] min-h-80 max-h-[850px] bg-[#efeeea] p-5 sm:p-9"><CatalogImage asset={active} alt={`${product.name[locale]} — ${active.name[locale]} — ${t.preview}`} priority sizes="(max-width: 1023px) 94vw, 52vw" className="h-full w-full object-contain"/><span className="preview-label">{t.preview}</span></div>
 <p className="mt-4 text-sm leading-6 text-black/60">{t.previewNote}</p><div className="my-6" aria-live="polite"><p>{t.selected}: {active.name[locale]}</p><p dir="ltr" className="mt-2 font-mono text-sm">{active.code}</p></div><div className="flex flex-wrap gap-3" aria-label={t.colors}>{product.colorways.map(c=><button key={c.code} type="button" aria-pressed={active.code===c.code} aria-label={`${c.name[locale]} ${c.code}`} onClick={()=>setActive(c)} className={`colorway-thumb ${active.code===c.code?'selected':''}`}><CatalogImage asset={c} alt={c.name[locale]} sizes="80px" className="h-24 w-full object-contain"/><span>{c.name[locale]}</span></button>)}</div>
 <label className="mt-6 grid max-w-xs gap-2 text-sm">{t.quantity}<input type="number" min="0" step="any" value={quantity} onChange={e=>setQuantity(e.target.value)}/></label>
 <div className="mt-8 hidden flex-wrap gap-3 sm:flex"><button type="button" className="btn-primary" onClick={addCurrent}>{added?t.added:t.add}</button><a href={`/${locale}/quote`} onClick={addCurrent} className="btn-secondary">{t.quote}</a><a href={direct} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a></div><output className="sr-only">{added?t.added:''}</output>
 <div className="mobile-product-actions"><button type="button" onClick={addCurrent}>{added?t.added:t.add}</button><a href={direct} target="_blank" rel="noreferrer">WhatsApp</a></div></div>;
}
