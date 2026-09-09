'use client';
import {useMemo,useState,type SyntheticEvent} from 'react';
import {catalogText} from '@/lib/catalog-i18n';
import {business,jointBrand} from '@/lib/business';
import {type Locale,type Product} from '@/lib/products';
import {useQuoteList} from '@/lib/quote-list';

export function QuoteForm({locale,products}:{locale:Locale;products:Product[]}) {
 const t=catalogText[locale];const {items,add,remove,update}=useQuoteList();
 const [productId,setProductId]=useState('');const [colorCode,setColorCode]=useState('');const [quantity,setQuantity]=useState('');const [ready,setReady]=useState('');const [error,setError]=useState('');
 const p=products.find(product=>product.id===productId);const selectedColor=p?.colorways.find(c=>c.code===colorCode)??p?.colorways.find(c=>c.code===p.heroColorwayCode);
 const total=useMemo(()=>items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0),[items]);
 function addDraft(){if(!p||!selectedColor)return;add({modelCode:p.binMansoorCode,name:p.name,colorCode:selectedColor.code,colorName:selectedColor.name,quantity});setProductId('');setColorCode('');setQuantity('');}
 function submit(e:SyntheticEvent<HTMLFormElement,SubmitEvent>) {e.preventDefault();const form=e.currentTarget;const f=new FormData(form);const v=(key:string)=>{const value=f.get(key);return typeof value==='string'?value.trim():'';};
  if(items.length===0||!form.checkValidity()||['name','company','country'].some(k=>v(k).length<2)||v('phone').replace(/\D/g,'').length<7){setError(t.required);form.reportValidity();return;}
  const designs=items.flatMap((item,index)=>['',`${index+1}.`,`Model: ${item.name[locale]}`,`BMC Code: ${item.modelCode}`,`Colour Preview: ${item.colorName[locale]} — ${item.colorCode}`,`Quantity: ${item.quantity||'—'}${item.quantity?' m²':''}`]);
  const message=[jointBrand.name.en,'REQUEST FOR QUOTATION','',`Company: ${v('company')}`,`Name: ${v('name')}`,`Country: ${v('country')}`,`Phone: ${v('phone')}`,v('email')?`Email: ${v('email')}`:'','', 'Requested Designs:',...designs,'',`Total estimated quantity: ${total||'—'}${total?' m²':''}`,v('message')?`Message: ${v('message')}`:''].filter(value=>value!=='').join('\n');
  const url=`https://wa.me/${business.phoneHref.replace('+','')}?text=${encodeURIComponent(message)}`;setReady(url);setError('');window.open(url,'_blank','noopener,noreferrer');
 }
 const input=(name:string,label:string,type='text',optional=false)=><label>{label}<input name={name} type={type} required={!optional} minLength={type==='text'?2:undefined} maxLength={200} autoComplete={name==='name'?'name':name==='company'?'organization':name==='country'?'country-name':name==='phone'?'tel':name==='email'?'email':'off'} dir={type==='tel'||type==='email'?'ltr':undefined}/></label>;
 return <form className="quote-form" onSubmit={submit} onChange={()=>{setReady('');setError('');}}>
  <p className="text-sm text-black/65 sm:col-span-2">{t.moq}</p>
  <section className="quote-list sm:col-span-2" aria-labelledby="quote-list-title"><h2 id="quote-list-title" className="text-2xl">{t.quoteList} <span className="text-base text-black/50">({items.length})</span></h2>
   {items.length===0&&<p className="mt-4 text-black/60">{t.emptyList}</p>}
   <div className="mt-5 grid gap-4">{items.map(item=>{const product=products.find(p=>p.binMansoorCode===item.modelCode)!;return <fieldset key={item.modelCode} className="quote-item"><legend className="font-semibold">{item.name[locale]} <bdi className="ms-2 font-mono text-sm">{item.modelCode}</bdi></legend><label>{t.selected}<select value={item.colorCode} onChange={e=>{const color=product.colorways.find(c=>c.code===e.target.value)!;update(item.modelCode,{colorCode:color.code,colorName:color.name});}}>{product.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label><label>{t.quantity}<input type="number" min="0" step="any" value={item.quantity} onChange={e=>update(item.modelCode,{quantity:e.target.value})}/></label><button type="button" className="underline" onClick={()=>remove(item.modelCode)}>{t.remove}</button></fieldset>;})}</div>
   {items.length>0&&<div className="mt-5" aria-live="polite"><p>{t.total}: <strong>{total.toLocaleString(locale==='ar'?'ar-SA':locale==='tr'?'tr-TR':'en-GB')} m²</strong></p>{total<business.minimumOrderQuantity&&<p className="mt-2 border-s-2 border-[#a4875a] ps-4 text-sm text-black/65">{t.belowMoq}</p>}</div>}
  </section>
  <fieldset className="quote-add sm:col-span-2"><legend className="mb-4 font-semibold">{t.add}</legend><div className="grid gap-4 sm:grid-cols-2"><label>{t.product}<select value={productId} onChange={e=>{setProductId(e.target.value);setColorCode('');}}><option value="">{t.select}</option>{products.map(product=><option key={product.id} value={product.id}>{product.name[locale]} — {product.binMansoorCode}</option>)}</select></label><label>{t.code}<input readOnly value={p?.binMansoorCode??''} dir="ltr"/></label><label>{t.selected}<select disabled={!p} value={selectedColor?.code??''} onChange={e=>setColorCode(e.target.value)}><option value="">{t.select}</option>{p?.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label><label>{t.quantity}<input type="number" min="0" step="any" value={quantity} onChange={e=>setQuantity(e.target.value)}/></label></div><button type="button" className="btn-secondary mt-4" disabled={!p||!selectedColor} onClick={addDraft}>{t.add}</button></fieldset>
  {input('name',t.name)}{input('company',t.company)}{input('country',t.country)}{input('phone',t.phone,'tel')}{input('email',t.email,'email',true)}
  <label className="sm:col-span-2">{t.message}<textarea name="message" rows={4} maxLength={2500}/></label><p className="sm:col-span-2 text-sm leading-6 text-black/60">{t.handoff}</p>{error&&<p role="alert" className="sm:col-span-2 text-red-800">{error}</p>}<button className="btn-primary sm:col-span-2" type="submit">{t.send}</button>{ready&&<output className="sm:col-span-2"><p>{t.sent}</p><a href={ready} target="_blank" rel="noreferrer" className="underline">{t.open}</a></output>}
 </form>;
}
