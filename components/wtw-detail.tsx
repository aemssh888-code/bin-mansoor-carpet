'use client';

import {useState,useSyncExternalStore} from 'react';
import type {Locale} from '@/lib/products';
import {business} from '@/lib/business';
import {isValidQuoteQuantity,useQuoteList} from '@/lib/quote-list';
import {wtwCategory,wtwColourLabel,wtwPublicText,wtwRelatedModels,wtwText,type WTWModel} from '@/lib/wtw';

export function WTWDetail({locale,model}:{locale:Locale;model:WTWModel}){
 const t=wtwText[locale];
 const copy=wtwPublicText[locale];
 const related=wtwRelatedModels(model);
 const initial=model.colourways.find(c=>c.image===model.representativeImage)??model.colourways[0];
 const queryCode=useSyncExternalStore(()=>()=>{},()=>new URLSearchParams(window.location.search).get('colour'),()=>null);
 const [selectedCode,setSelectedCode]=useState<string|null>(null);
 const selected=model.colourways.find(c=>c.code===selectedCode)??model.colourways.find(c=>c.code.toLowerCase()===queryCode?.toLowerCase())??initial;
 const [quantity,setQuantity]=useState('');
 const [added,setAdded]=useState(false);
 const {add}=useQuoteList();
 const valid=isValidQuoteQuantity(quantity,'wall-to-wall');
 const message=`${t.line}\n${model.code}\n${selected.code}\n${t.quantity}: ${quantity} m²`;
 const whatsapp=`https://wa.me/${business.phoneHref.replace('+','')}?text=${encodeURIComponent(message)}`;
 function addCurrent(){if(!valid)return;add({productLine:'wall-to-wall',modelCode:model.code,name:model.name,colorCode:selected.code,colorName:{ar:wtwColourLabel(selected.code),en:wtwColourLabel(selected.code),tr:wtwColourLabel(selected.code)},quantity,image:selected.image,route:`/${locale}/wall-to-wall/${model.slug}`});setAdded(true);window.setTimeout(()=>setAdded(false),2000);}
 return <>
  <div className="wtw-detail site-shell">
   <div className="wtw-main-art"><img src={selected.image} alt={`${model.code} ${t.selected} ${selected.code}`} width="1200" height="800" fetchPriority="high"/></div>
   <aside className="wtw-detail-info">
    <p className="eyebrow">{t.line} / {wtwCategory(model.category,locale)}</p>
    <h1>{model.name[locale]}</h1><p className="wtw-detail-code"><bdi>{model.code}</bdi></p>
    <dl className="wtw-facts"><div><dt>{t.category}</dt><dd>{wtwCategory(model.category,locale)}</dd></div>{model.styles.length>0&&<div><dt>{t.style}</dt><dd>{model.styles.join(' · ')}</dd></div>}<div><dt>{t.colourPreviews}</dt><dd>{model.colourways.length}</dd></div></dl>
    <section className="wtw-colour-section"><h2>{t.selected}: <bdi aria-live="polite">{selected.code}</bdi></h2><div className="wtw-swatches">{model.colourways.map(colour=><button type="button" key={colour.code} aria-pressed={selected.code===colour.code} aria-label={`${model.code} ${wtwColourLabel(colour.code)}`} onClick={()=>setSelectedCode(colour.code)}><img src={colour.image} alt="" width="1200" height="800" loading="lazy"/><span>{wtwColourLabel(colour.code)}</span></button>)}</div></section>
    <label className="wtw-quantity">{t.quantity}<input type="number" min="0" step="any" inputMode="decimal" value={quantity} onChange={e=>setQuantity(e.target.value)} aria-invalid={quantity!==''&&!valid}/></label>
    {quantity!==''&&!valid&&<p role="alert" className="quantity-error">{t.quantityError}</p>}
    <p className="wtw-no-moq">{t.noMoq}</p>
    <div className="wtw-actions"><button type="button" className="btn-primary" disabled={!valid} onClick={addCurrent}>{added?t.added:t.add}</button><a className="btn-secondary" href={`/${locale}/quote`} aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault();else addCurrent();}}>{t.quote}</a><a className="btn-text" href={valid?whatsapp:undefined} aria-disabled={!valid} onClick={e=>{if(!valid)e.preventDefault();}} target="_blank" rel="noreferrer">{t.whatsapp}</a></div>
   </aside>
  </div>
  <section className="wtw-full-preview"><div className="site-shell"><h2>{t.full}</h2><div className="wtw-full-art"><img src={selected.image} alt={`${t.full} — ${model.code} — ${selected.code}`} width="1200" height="800" loading="lazy"/></div><p><bdi>{selected.code}</bdi></p></div></section>
  <section className="wtw-related site-shell"><h2>{copy.related}</h2><div className="wtw-related-grid">{related.map(item=><a key={item.code} href={`/${locale}/wall-to-wall/${item.slug}`}><div className="wtw-card-art"><img src={item.representativeImage} alt={`${item.name[locale]} — ${item.code}`} width="1200" height="800" loading="lazy"/></div><h3>{item.name[locale]}</h3><p><bdi>{item.code}</bdi></p></a>)}</div></section>
 </>;
}
