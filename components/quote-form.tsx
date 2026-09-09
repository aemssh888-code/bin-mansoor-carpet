'use client';

import {useMemo,useState,type SyntheticEvent} from 'react';
import {catalogText} from '@/lib/catalog-i18n';
import {business,jointBrand,MIN_ORDER_M2_PER_ITEM} from '@/lib/business';
import {type Locale,type Product} from '@/lib/products';
import {isValidQuoteQuantity,useQuoteList} from '@/lib/quote-list';

export function QuoteForm({locale,products}:{locale:Locale;products:Product[]}) {
 const t=catalogText[locale];
 const {items,add,remove,update}=useQuoteList();
 const [productId,setProductId]=useState('');
 const [colorCode,setColorCode]=useState('');
 const [quantity,setQuantity]=useState(String(MIN_ORDER_M2_PER_ITEM));
 const [ready,setReady]=useState('');
 const [error,setError]=useState('');
 const product=products.find(item=>item.id===productId);
 const selectedColor=product?.colorways.find(color=>color.code===colorCode)??product?.colorways.find(color=>color.code===product.heroColorwayCode);
 const draftValid=isValidQuoteQuantity(quantity);
 const invalidItem=items.find(item=>!isValidQuoteQuantity(item.quantity));
 const total=useMemo(()=>items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0),[items]);

 function clearFeedback(){setReady('');setError('');}
 function addDraft(){
  clearFeedback();
  if(!product||!selectedColor)return;
  if(!draftValid){setError(`${t.invalidDesign} ${product.binMansoorCode}. ${t.moqValidation}`);return;}
  add({modelCode:product.binMansoorCode,name:product.name,colorCode:selectedColor.code,colorName:selectedColor.name,quantity});
  setProductId('');setColorCode('');setQuantity(String(MIN_ORDER_M2_PER_ITEM));
 }

 function submit(event:SyntheticEvent<HTMLFormElement,SubmitEvent>){
  event.preventDefault();
  const form=event.currentTarget;
  if(invalidItem){setReady('');setError(`${t.invalidDesign} ${invalidItem.modelCode}. ${t.moqValidation}`);return;}
  const fields=new FormData(form);
  const value=(key:string)=>{const current=fields.get(key);return typeof current==='string'?current.trim():'';};
  if(items.length===0||!form.checkValidity()||['name','company','country'].some(key=>value(key).length<2)||value('phone').replace(/\D/g,'').length<7){setError(t.required);form.reportValidity();return;}
  const designs=items.flatMap((item,index)=>['',`${index+1}.`,`Model: ${item.name[locale]}`,`BMC Code: ${item.modelCode}`,`Colour Preview: ${item.colorName[locale]} — ${item.colorCode}`,`Quantity: ${item.quantity} m²`]);
  const message=[jointBrand.name.en,'REQUEST FOR QUOTATION','',`Company: ${value('company')}`,`Name: ${value('name')}`,`Country: ${value('country')}`,`Phone: ${value('phone')}`,value('email')?`Email: ${value('email')}`:'','', 'Requested Designs:',...designs,'',`Total estimated quantity: ${total} m²`,value('message')?`Message: ${value('message')}`:''].filter(current=>current!=='').join('\n');
  const url=`https://wa.me/${business.phoneHref.replace('+','')}?text=${encodeURIComponent(message)}`;
  setReady(url);setError('');window.open(url,'_blank','noopener,noreferrer');
 }

 const contactInput=(name:string,label:string,type='text',optional=false)=><label>{label}<input name={name} type={type} required={!optional} minLength={type==='text'?2:undefined} maxLength={200} autoComplete={name==='name'?'name':name==='company'?'organization':name==='country'?'country-name':name==='phone'?'tel':name==='email'?'email':'off'} dir={type==='tel'||type==='email'?'ltr':undefined}/></label>;

 return <form className="quote-form" onSubmit={submit}>
  <p className="text-sm text-black/65 sm:col-span-2">{t.moq}</p>
  <section className="quote-list sm:col-span-2" aria-labelledby="quote-list-title">
   <h2 id="quote-list-title" className="text-2xl">{t.quoteList} <span className="text-base text-black/50">({items.length})</span></h2>
   {items.length===0&&<p className="mt-4 text-black/60">{t.emptyList}</p>}
   <div className="mt-5 grid gap-4">{items.map(item=>{
    const itemProduct=products.find(current=>current.binMansoorCode===item.modelCode);
    if(!itemProduct)return null;
    const itemValid=isValidQuoteQuantity(item.quantity);
    const errorId=`quantity-error-${item.modelCode}`;
    return <fieldset key={item.modelCode} className="quote-item">
     <legend className="font-semibold">{item.name[locale]} <bdi className="ms-2 font-mono text-sm">{item.modelCode}</bdi></legend>
     <label>{t.selected}<select value={item.colorCode} onChange={event=>{clearFeedback();const color=itemProduct.colorways.find(current=>current.code===event.target.value)!;update(item.modelCode,{colorCode:color.code,colorName:color.name});}}>{itemProduct.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label>
     <label>{t.quantity}<input data-quote-quantity={item.modelCode} type="number" min={MIN_ORDER_M2_PER_ITEM} step="any" value={item.quantity} aria-invalid={!itemValid} aria-describedby={!itemValid?errorId:undefined} onChange={event=>{clearFeedback();update(item.modelCode,{quantity:event.target.value});}}/>{!itemValid&&<span id={errorId} role="alert" className="quantity-error">{t.moqValidation}</span>}</label>
     <button type="button" className="underline" onClick={()=>remove(item.modelCode)}>{t.remove}</button>
    </fieldset>;
   })}</div>
   {items.length>0&&<div className="mt-5" aria-live="polite"><p>{t.total}: <strong>{total.toLocaleString(locale==='ar'?'ar-SA':locale==='tr'?'tr-TR':'en-GB')} m²</strong></p>{invalidItem&&<p className="mt-2 border-s-2 border-[#a4875a] ps-4 text-sm text-black/65">{t.invalidDesign} <bdi>{invalidItem.modelCode}</bdi>. {t.moqValidation}</p>}</div>}
  </section>

  <fieldset className="quote-add sm:col-span-2">
   <legend className="mb-4 font-semibold">{t.add}</legend>
   <div className="grid gap-4 sm:grid-cols-2">
    <label>{t.product}<select value={productId} onChange={event=>{clearFeedback();setProductId(event.target.value);setColorCode('');setQuantity(String(MIN_ORDER_M2_PER_ITEM));}}><option value="">{t.select}</option>{products.map(current=><option key={current.id} value={current.id}>{current.name[locale]} — {current.binMansoorCode}</option>)}</select></label>
    <label>{t.code}<input readOnly value={product?.binMansoorCode??''} dir="ltr"/></label>
    <label>{t.selected}<select disabled={!product} value={selectedColor?.code??''} onChange={event=>{clearFeedback();setColorCode(event.target.value);}}><option value="">{t.select}</option>{product?.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label>
    <label>{t.quantity}<input data-draft-quantity type="number" min={MIN_ORDER_M2_PER_ITEM} step="any" value={quantity} aria-invalid={!draftValid} onChange={event=>{clearFeedback();setQuantity(event.target.value);}}/>{!draftValid&&<span role="alert" className="quantity-error">{t.moqValidation}</span>}</label>
   </div>
   <button data-add-draft type="button" className="btn-secondary mt-4" disabled={!product||!selectedColor||!draftValid} onClick={addDraft}>{t.add}</button>
  </fieldset>

  {contactInput('name',t.name)}{contactInput('company',t.company)}{contactInput('country',t.country)}{contactInput('phone',t.phone,'tel')}{contactInput('email',t.email,'email',true)}
  <label className="sm:col-span-2">{t.message}<textarea name="message" rows={4} maxLength={2500}/></label>
  <p className="sm:col-span-2 text-sm leading-6 text-black/60">{t.handoff}</p>
  {error&&<p role="alert" className="sm:col-span-2 text-red-800">{error}</p>}
  <button data-whatsapp-submit className="btn-primary sm:col-span-2" type="submit">{t.send}</button>
  {ready&&<output className="sm:col-span-2"><p>{t.sent}</p><a href={ready} target="_blank" rel="noreferrer" className="underline">{t.open}</a></output>}
 </form>;
}
