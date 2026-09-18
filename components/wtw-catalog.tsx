'use client';

import {useMemo,useState} from 'react';
import type {Locale} from '@/lib/products';
import {wtwCategory,wtwColour,wtwSearch,wtwText,type WTWModel} from '@/lib/wtw';

export function WTWCatalog({locale,models}:{locale:Locale;models:WTWModel[]}){
 const t=wtwText[locale];
 const [search,setSearch]=useState('');
 const [category,setCategory]=useState('');
 const [style,setStyle]=useState('');
 const [colour,setColour]=useState('');
 const [limit,setLimit]=useState(12);
 const categories=[...new Set(models.map(m=>m.category))].sort();
 const styles=[...new Set(models.flatMap(m=>m.styles))].sort();
 const colours=[...new Set(models.flatMap(m=>m.colourways.map(c=>c.colourFamily)))].sort();
 const filtered=useMemo(()=>{
  const matches=models.filter(model=>(!category||model.category===category)&&(!style||model.styles.includes(style))&&(!colour||model.colourways.some(c=>c.colourFamily===colour))&&wtwSearch(model,search));
  const needle=search.trim().toLowerCase();
  if(!needle)return matches;
  const relevance=(model:WTWModel)=>{
   if(model.code.toLowerCase()===needle)return 0;
   if(model.colourways.some(preview=>preview.code.toLowerCase()===needle))return 1;
   if(model.code.toLowerCase().startsWith(needle))return 2;
   if(model.colourways.some(preview=>preview.code.toLowerCase().startsWith(needle)))return 3;
   return 4;
  };
  return [...matches].sort((a,b)=>relevance(a)-relevance(b)||a.displayOrder-b.displayOrder);
 },[models,search,category,style,colour]);
 const chooseColour=(model:WTWModel)=>model.colourways.find(c=>c.code.toLowerCase()===search.trim().toLowerCase());
 const resetLimit=()=>setLimit(12);
 return <div className="wtw-catalog site-shell">
  <div className="wtw-toolbar">
   <label className="wtw-search"><span className="sr-only">{t.search}</span><input type="search" placeholder={t.search} value={search} onChange={e=>{setSearch(e.target.value);resetLimit();}}/></label>
   <label><span>{t.category}</span><select value={category} onChange={e=>{setCategory(e.target.value);resetLimit();}}><option value="">{t.all}</option>{categories.map(value=><option key={value} value={value}>{wtwCategory(value,locale)}</option>)}</select></label>
   {styles.length>1&&<label><span>{t.style}</span><select value={style} onChange={e=>{setStyle(e.target.value);resetLimit();}}><option value="">{t.all}</option>{styles.map(value=><option key={value} value={value}>{value}</option>)}</select></label>}
   {colours.length>1&&<label><span>{t.colour}</span><select value={colour} onChange={e=>{setColour(e.target.value);resetLimit();}}><option value="">{t.all}</option>{colours.map(value=><option key={value} value={value}>{wtwColour(value,locale)}</option>)}</select></label>}
  </div>
  <div className="wtw-result-line"><span aria-live="polite">{filtered.length} {t.designs}</span>{(search||category||style||colour)&&<button type="button" onClick={()=>{setSearch('');setCategory('');setStyle('');setColour('');resetLimit();}}>{t.clear}</button>}</div>
  {filtered.length===0?<p className="wtw-empty">{t.empty}</p>:<div className="wtw-grid">{filtered.slice(0,limit).map(model=>{
   const selected=chooseColour(model);
   return <a className="wtw-card" key={model.code} href={`/${locale}/wall-to-wall/${model.slug}${selected?`?colour=${selected.code}`:''}`}>
    <div className="wtw-card-art"><img src={selected?.image??model.representativeImage} alt={`${selected?.code??model.code} — ${wtwCategory(model.category,locale)} — ${t.view}`} loading="lazy" width="1200" height="800"/></div>
    <div className="wtw-card-copy"><div><bdi>{model.code}</bdi><h2>{wtwCategory(model.category,locale)}</h2></div><p>{model.colourways.length} {t.colourPreviews}</p></div>
   </a>;
  })}</div>}
  {limit<filtered.length&&<button type="button" className="btn-secondary wtw-load" onClick={()=>setLimit(n=>n+12)}>{t.more}</button>}
 </div>;
}
