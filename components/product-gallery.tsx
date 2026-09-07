'use client';
import {useState} from 'react';
import {heroVariant,type Locale,type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {CatalogImage} from './catalog-image';
import {QuoteForm} from './quote-form';
import {Dialog,DialogClose,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogTrigger} from './ui/dialog';
export function ProductGallery({product,locale}:{product:Product;locale:Locale}) {
 const [active,setActive]=useState(heroVariant(product));const t=catalogText[locale];
 const direct='https://wa.me/905303513037?text='+encodeURIComponent(`${t.quote}\n${product.name[locale]}\n${product.binMansoorCode}\n${t.selected}: ${active.name[locale]} — ${active.code}`);
 return <div><div className="product-frame relative h-[65vh] min-h-80 max-h-[850px] bg-[#efeeea] p-5 sm:p-9"><CatalogImage asset={active} alt={`${product.name[locale]} — ${active.name[locale]} — ${t.preview}`} priority sizes="(max-width: 1023px) 94vw, 52vw" className="h-full w-full object-contain"/><span className="preview-label">{t.preview}</span></div>
 <p className="mt-4 text-sm leading-6 text-black/60">{t.previewNote}</p><div className="my-6" aria-live="polite"><p>{t.selected}: {active.name[locale]}</p><p dir="ltr" className="mt-2 font-mono text-sm">{active.code}</p></div><div className="flex flex-wrap gap-3" aria-label={t.colors}>{product.colorways.map(c=><button key={c.code} type="button" aria-pressed={active.code===c.code} aria-label={`${c.name[locale]} ${c.code}`} onClick={()=>setActive(c)} className={`colorway-thumb ${active.code===c.code?'selected':''}`}><CatalogImage asset={c} alt={c.name[locale]} sizes="80px" className="h-24 w-full object-contain"/><span>{c.name[locale]}</span></button>)}</div>
 <div className="mt-8 flex flex-wrap gap-3"><Dialog><DialogTrigger className="btn-primary">{t.quote}</DialogTrigger><DialogContent showCloseButton={false} dir={locale==='ar'?'rtl':'ltr'} className="quote-dialog"><DialogClose className="justify-self-end underline">{t.close}</DialogClose><DialogHeader><DialogTitle>{t.quote}</DialogTitle><DialogDescription>{product.name[locale]} — {product.binMansoorCode}</DialogDescription></DialogHeader><QuoteForm key={active.code} locale={locale} products={[product]} selectedProduct={product} selectedColorway={active.code}/></DialogContent></Dialog><a href={direct} target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a></div></div>;
}
