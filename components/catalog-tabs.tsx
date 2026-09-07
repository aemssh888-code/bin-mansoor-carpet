'use client';
import {useEffect,useState} from 'react';
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetDescription,SheetTrigger} from '@/components/ui/sheet';
import {ProductCard} from './product-card';
import {categories,matchesSearch,type Category,type Locale,type Product} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
export function CatalogTabs({products,locale,labels,viewLabel}:{products:Product[];locale:Locale;labels:Record<Category|'all',string>;viewLabel:string}) {
 const t=catalogText[locale]; const [query,setQuery]=useState('');const [category,setCategory]=useState('all');const [style,setStyle]=useState('all');const [color,setColor]=useState('all');const [limit,setLimit]=useState(12);const [open,setOpen]=useState(false);
 useEffect(()=>{const c=new URLSearchParams(window.location.search).get('category');if(c&&categories.includes(c as Category))setCategory(c);},[]);
 const styles=Array.from(new Map(products.flatMap(p=>p.styles).map(s=>[s.en,s])).values());
 const colors=Array.from(new Map(products.flatMap(p=>p.colorways.map(c=>c.name)).map(n=>[n.en,n])).values());
 const result=products.filter(p=>matchesSearch(p,query)&&(category==='all'||p.categoryKey===category)&&(style==='all'||p.styles.some(s=>s.en===style))&&(color==='all'||p.colorways.some(c=>c.name.en===color)));
 const reset=()=>{setQuery('');setCategory('all');setStyle('all');setColor('all');setLimit(12);};
 const select=(label:string,value:string,set:(v:string)=>void,options:{value:string;label:string}[],id:string)=><label className="filter-label" htmlFor={id}>{label}<select id={id} value={value} onChange={e=>{set(e.target.value);setLimit(12);}}><option value="all">{labels.all}</option>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;
 const controls=(prefix:string)=><>{select(labels.all==='الكل'?'التصنيف':locale==='tr'?'Kategori':'Category',category,setCategory,categories.map(c=>({value:c,label:labels[c]})),prefix+'category')}{select(t.style,style,setStyle,styles.map(s=>({value:s.en,label:s[locale]})),prefix+'style')}{select(t.color,color,setColor,colors.map(c=>({value:c.en,label:c[locale]})),prefix+'color')}<button type="button" className="btn-secondary" onClick={reset}>{t.reset}</button></>;
 return <div><div className="catalog-controls"><label className="search-label" htmlFor="catalog-search">{t.search}<input id="catalog-search" type="search" value={query} onChange={e=>{setQuery(e.target.value);setLimit(12);}} placeholder="BMC-MOD-003"/></label><div className="desktop-filters">{controls('desktop-')}</div><div className="mobile-filters"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger className="btn-secondary">{t.filters}{category!=='all'||style!=='all'||color!=='all'?' •':''}</SheetTrigger><SheetContent side={locale==='ar'?'left':'right'} closeLabel={t.close} dir={locale==='ar'?'rtl':'ltr'} className="p-6"><SheetHeader><SheetTitle>{t.filters}</SheetTitle><SheetDescription>{result.length} {t.results}</SheetDescription></SheetHeader><div className="mt-8 flex flex-col gap-5">{controls('mobile-')}<button onClick={()=>setOpen(false)} className="btn-primary">{t.apply}</button></div></SheetContent></Sheet></div></div>
 <p role="status" className="my-7 text-sm text-black/60">{result.length} {t.results}</p><div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{result.slice(0,limit).map(p=><ProductCard key={p.id} product={p} locale={locale} viewLabel={viewLabel}/>)}</div>
 {result.length===0&&<div className="py-16 text-center"><p>{locale==='ar'?'لا توجد نتائج مطابقة.':locale==='tr'?'Eşleşen sonuç bulunamadı.':'No matching designs.'}</p><button className="btn-secondary mt-6" onClick={reset}>{t.reset}</button></div>}
 {limit<result.length&&<div className="mt-12 text-center"><button className="btn-secondary" onClick={()=>setLimit(n=>n+12)}>{t.more} ({Math.min(limit,result.length)} / {result.length})</button></div>}</div>;
}
