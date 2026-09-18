'use client';

import {useMemo,useState} from 'react';
import type {Locale} from '@/lib/products';
import {wtwCategory,wtwColourCount,wtwCurated,wtwPublicText,wtwSearch,wtwText,type WTWModel} from '@/lib/wtw';

export function WTWCatalog({locale,models}:{locale:Locale;models:WTWModel[]}){
 const t=wtwText[locale],copy=wtwPublicText[locale];
 const [search,setSearch]=useState('');
 const [category,setCategory]=useState('');
 const [showAll,setShowAll]=useState(false);
 const [limit,setLimit]=useState(12);
 const categories=[...new Set(models.map(model=>model.category))].sort();
 const querying=search.trim().length>0;
 const filtered=useMemo(()=>{
  const base=querying?models:showAll?models:wtwCurated;
  const matches=base.filter(model=>(!category||model.category===category)&&wtwSearch(model,search));
  if(!querying)return matches;
  const needle=search.trim().toLowerCase();
  const relevance=(model:WTWModel)=>{
   if(model.code.toLowerCase()===needle)return 0;
   if(model.colourways.some(colour=>colour.code.toLowerCase()===needle))return 1;
   if(Object.values(model.name).some(name=>name.toLowerCase()===needle))return 2;
   if(model.code.toLowerCase().startsWith(needle))return 3;
   return 4;
  };
  return [...matches].sort((a,b)=>relevance(a)-relevance(b)||a.displayOrder-b.displayOrder);
 },[models,search,category,showAll,querying]);
 const chooseColour=(model:WTWModel)=>model.colourways.find(colour=>colour.code.toLowerCase()===search.trim().toLowerCase());
 const switchCollection=(all:boolean)=>{
  setShowAll(all);setCategory('');setSearch('');setLimit(12);
  requestAnimationFrame(()=>document.getElementById('wtw-catalog')?.scrollIntoView({behavior:'smooth',block:'start'}));
 };
 return <section id="wtw-catalog" className="wtw-catalog site-shell" aria-label={querying?copy.searchResults:showAll?copy.fullCollection:copy.selectedCollection}>
  <div className="wtw-catalog-heading"><h2>{querying?copy.searchResults:showAll?copy.fullCollection:copy.selectedCollection}</h2>{showAll&&!querying&&<button type="button" className="btn-text" onClick={()=>switchCollection(false)}>{copy.viewSelected}</button>}</div>
  <div className="wtw-toolbar">
   <label><span className="sr-only">{t.category}</span><select aria-label={t.category} value={category} onChange={event=>{setCategory(event.target.value);setLimit(12);}}><option value="">{t.all}</option>{categories.map(value=><option key={value} value={value}>{wtwCategory(value,locale)}</option>)}</select></label>
   <label className="wtw-search"><span className="sr-only">{copy.searchPlaceholder}</span><input type="search" placeholder={copy.searchPlaceholder} value={search} onChange={event=>{setSearch(event.target.value);setLimit(12);}}/></label>
  </div>
  <div className="wtw-result-line"><span aria-live="polite">{filtered.length} {t.designs}</span>{(search||category)&&<button type="button" onClick={()=>{setSearch('');setCategory('');setLimit(12);}}>{t.clear}</button>}</div>
  {filtered.length===0?<p className="wtw-empty">{t.empty}</p>:<div className="wtw-grid">{filtered.slice(0,limit).map(model=>{
   const selected=chooseColour(model);
   return <a className="wtw-card" key={model.code} href={`/${locale}/wall-to-wall/${model.slug}${selected?`?colour=${selected.code}`:''}`}>
    <div className="wtw-card-art"><img src={selected?.image??model.representativeImage} alt={`${model.name[locale]} — ${selected?.code??model.code}`} loading="lazy" width="1200" height="800"/></div>
    <div className="wtw-card-copy"><h3>{model.name[locale]}</h3><p><bdi>{model.code}</bdi><span aria-hidden="true"> · </span>{wtwColourCount(model.colourways.length,locale)}</p></div>
   </a>;
  })}</div>}
  {limit<filtered.length&&<button type="button" className="btn-secondary wtw-load" onClick={()=>setLimit(number=>number+12)}>{t.more}</button>}
  {!showAll&&!querying&&limit>=filtered.length&&<div className="wtw-full-access"><button type="button" className="btn-text" onClick={()=>switchCollection(true)}>{copy.viewAll}</button></div>}
 </section>;
}
