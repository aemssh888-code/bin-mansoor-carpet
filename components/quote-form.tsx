'use client';

import {useMemo,useState,type SyntheticEvent} from 'react';
import {catalogText} from '@/lib/catalog-i18n';
import {business,jointBrand,productOrderRules,MIN_ORDER_M2_PER_ITEM} from '@/lib/business';
import {type Locale,type Product} from '@/lib/products';
import {isValidQuoteQuantity,quoteItemKey,useQuoteList} from '@/lib/quote-list';
import {serializeMixedQuote} from '@/lib/quote-logic';
import {wtwColourLabel,wtwModels,wtwText} from '@/lib/wtw';

export function QuoteForm({locale,products}:{locale:Locale;products:Product[]}) {
 const t=catalogText[locale];
 const {items,add,remove,update}=useQuoteList();
 const [productId,setProductId]=useState('');
 const [colorCode,setColorCode]=useState('');
 const [quantity,setQuantity]=useState(String(MIN_ORDER_M2_PER_ITEM));
 const [ready,setReady]=useState('');
 const [error,setError]=useState('');
 const product=products.find(item=>item.id===productId);
 const wtwProduct=wtwModels.find(item=>`wtw:${item.code}`===productId);
 const selectedColor=product?.colorways.find(color=>color.code===colorCode)??product?.colorways.find(color=>color.code===product.heroColorwayCode);
 const wtwSelected=wtwProduct?.colourways.find(color=>color.code===colorCode)??wtwProduct?.colourways.find(color=>color.image===wtwProduct.representativeImage);
 const draftLine=wtwProduct?'wall-to-wall':'rug';
 const draftValid=isValidQuoteQuantity(quantity,draftLine);
 const invalidItem=items.find(item=>!isValidQuoteQuantity(item.quantity,item.productLine));
 const total=useMemo(()=>items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0),[items]);

 function clearFeedback(){setReady('');setError('');}
 function addDraft(){
  clearFeedback();
  if((!product||!selectedColor)&&(!wtwProduct||!wtwSelected))return;
  if(!draftValid){setError(`${t.invalidDesign} ${wtwProduct?.code??product?.binMansoorCode}. ${t.moqValidation}`);return;}
  if(wtwProduct&&wtwSelected){const label=wtwColourLabel(wtwSelected.code);add({productLine:'wall-to-wall',modelCode:wtwProduct.code,name:wtwProduct.name,colorCode:wtwSelected.code,colorName:{ar:label,en:label,tr:label},quantity,image:wtwSelected.image,route:`/${locale}/wall-to-wall/${wtwProduct.slug}`});}
  else if(product&&selectedColor)add({productLine:'rug',modelCode:product.binMansoorCode,name:product.name,colorCode:selectedColor.code,colorName:selectedColor.name,quantity,image:selectedColor.image,route:`/${locale}/products/${product.slug}`});
  setProductId('');setColorCode('');setQuantity(String(MIN_ORDER_M2_PER_ITEM));
 }

 function submit(event:SyntheticEvent<HTMLFormElement,SubmitEvent>){
  event.preventDefault();
  const form=event.currentTarget;
  if(invalidItem){setReady('');setError(`${t.invalidDesign} ${invalidItem.modelCode}. ${t.moqValidation}`);return;}
  const fields=new FormData(form);
  const value=(key:string)=>{const current=fields.get(key);return typeof current==='string'?current.trim():'';};
  if(items.length===0||!form.checkValidity()||['name','company','country'].some(key=>value(key).length<2)||value('phone').replace(/\D/g,'').length<7){setError(t.required);form.reportValidity();return;}
  const designs=items.flatMap((item,index)=>['',`${index+1}.`,`Product Line: ${item.productLine==='rug'?'Rug':'Wall-to-Wall'}`,`Model: ${item.name[locale]}`,`${item.productLine==='rug'?'BMC':'WTW'} Code: ${item.modelCode}`,`Colour Preview: ${item.colorName[locale]} — ${item.colorCode}`,`Quantity: ${item.quantity} m²`]);
  const message=items.some(item=>item.productLine==='wall-to-wall')?serializeMixedQuote(locale,jointBrand.name.en,items,{company:value('company'),name:value('name'),country:value('country'),phone:value('phone'),email:value('email'),message:value('message')}):[jointBrand.name.en,'REQUEST FOR QUOTATION','',`Company: ${value('company')}`,`Name: ${value('name')}`,`Country: ${value('country')}`,`Phone: ${value('phone')}`,value('email')?`Email: ${value('email')}`:'','', 'Requested Designs:',...designs,'',`Total estimated quantity: ${total} m²`,value('message')?`Message: ${value('message')}`:''].filter(current=>current!=='').join('\n');
  const url=`https://wa.me/${business.phoneHref.replace('+','')}?text=${encodeURIComponent(message)}`;
  setReady(url);setError('');window.open(url,'_blank','noopener,noreferrer');
 }

 const contactInput=(name:string,label:string,type='text',optional=false)=><label>{label}<input name={name} type={type} required={!optional} minLength={type==='text'?2:undefined} maxLength={200} autoComplete={name==='name'?'name':name==='company'?'organization':name==='country'?'country-name':name==='phone'?'tel':name==='email'?'email':'off'} dir={type==='tel'||type==='email'?'ltr':undefined}/></label>;

 return <form className="quote-form" onSubmit={submit} noValidate>
  <p className="text-sm text-black/65 sm:col-span-2">{wtwText[locale].rugNav} / {wtwText[locale].nav}: {t.moq}</p>
  <section className="quote-list sm:col-span-2" aria-labelledby="quote-list-title">
   <h2 id="quote-list-title" className="text-2xl">{t.quoteList} <span className="text-base text-black/50">({items.length})</span></h2>
   {items.length===0&&<p className="mt-4 text-black/60">{t.emptyList}</p>}
   <div className="mt-5 grid gap-4">{items.map(item=>{
   const itemProduct=products.find(current=>current.binMansoorCode===item.modelCode);
    const itemWTW=wtwModels.find(current=>current.code===item.modelCode);
    if(!itemProduct&&!itemWTW)return null;
    const itemValid=isValidQuoteQuantity(item.quantity,item.productLine);
    const key=quoteItemKey(item);
    const errorId=`quantity-error-${key}`;
    return <fieldset key={key} className="quote-item">
     <legend className="font-semibold"><small className="me-3 uppercase tracking-wide text-black/50">{item.productLine==='rug'?wtwText[locale].rugNav:wtwText[locale].line}</small>{item.name[locale]} <span className="ms-2 text-sm font-normal text-black/60">{item.productLine==='wall-to-wall'?wtwText[locale].code:null}</span> <bdi className="font-mono text-sm">{item.modelCode}</bdi></legend>
     <label>{t.selected}<select value={item.colorCode} onChange={event=>{clearFeedback();if(itemWTW){const color=itemWTW.colourways.find(current=>current.code===event.target.value)!;const label=wtwColourLabel(color.code);update(key,{colorCode:color.code,colorName:{ar:label,en:label,tr:label},image:color.image});}else if(itemProduct){const color=itemProduct.colorways.find(current=>current.code===event.target.value)!;update(key,{colorCode:color.code,colorName:color.name,image:color.image});}}}>{itemWTW?itemWTW.colourways.map(color=><option key={color.code} value={color.code}>{wtwColourLabel(color.code)} — {color.code}</option>):itemProduct?.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label>
     <label>{item.productLine==='wall-to-wall'?wtwText[locale].quantity:t.quantity}<input data-quote-quantity={key} type="number" min={productOrderRules[item.productLine].minOrderM2PerItem} step="any" value={item.quantity} aria-invalid={!itemValid} aria-describedby={!itemValid?errorId:undefined} onChange={event=>{clearFeedback();update(key,{quantity:event.target.value});}}/>{!itemValid&&<span id={errorId} role="alert" className="quantity-error">{t.moqValidation}</span>}{item.productLine==='wall-to-wall'&&itemValid&&<span className="text-xs text-black/50">{t.moq}</span>}</label>
     <button type="button" className="underline" onClick={()=>remove(key)}>{t.remove}</button>
    </fieldset>;
   })}</div>
   {items.length>0&&<div className="mt-5" aria-live="polite"><p>{t.total}: <strong>{total.toLocaleString(locale==='ar'?'ar-SA':locale==='tr'?'tr-TR':'en-GB')} m²</strong></p>{invalidItem&&<p className="mt-2 border-s-2 border-[#a4875a] ps-4 text-sm text-black/65">{t.invalidDesign} <bdi>{invalidItem.modelCode}</bdi>. {t.moqValidation}</p>}</div>}
  </section>

  <fieldset className="quote-add sm:col-span-2">
   <legend className="mb-4 font-semibold">{t.add}</legend>
   <div className="grid gap-4 sm:grid-cols-2">
    <label>{t.product}<select value={productId} onChange={event=>{clearFeedback();setProductId(event.target.value);setColorCode('');setQuantity(String(MIN_ORDER_M2_PER_ITEM));}}><option value="">{t.select}</option><optgroup label={wtwText[locale].rugNav}>{products.map(current=><option key={current.id} value={current.id}>{current.name[locale]} — {current.binMansoorCode}</option>)}</optgroup><optgroup label={wtwText[locale].line}>{wtwModels.map(current=><option key={current.code} value={`wtw:${current.code}`}>{current.name[locale]} — {current.code}</option>)}</optgroup></select></label>
    <label>{wtwProduct?wtwText[locale].code:product?t.code:t.code.replace(' (BMC)','')}<input readOnly value={wtwProduct?.code??product?.binMansoorCode??''} dir="ltr"/></label>
    <label>{t.selected}<select disabled={!product&&!wtwProduct} value={wtwSelected?.code??selectedColor?.code??''} onChange={event=>{clearFeedback();setColorCode(event.target.value);}}><option value="">{t.select}</option>{wtwProduct?wtwProduct.colourways.map(color=><option key={color.code} value={color.code}>{wtwColourLabel(color.code)} — {color.code}</option>):product?.colorways.map(color=><option key={color.code} value={color.code}>{color.name[locale]} — {color.code}</option>)}</select></label>
    <label>{t.quantity}<input data-draft-quantity type="number" min={productOrderRules[draftLine].minOrderM2PerItem} step="any" value={quantity} aria-invalid={!draftValid} onChange={event=>{clearFeedback();setQuantity(event.target.value);}}/>{!draftValid&&<span role="alert" className="quantity-error">{t.moqValidation}</span>}</label>
   </div>
   <button data-add-draft type="button" className="btn-secondary mt-4" disabled={(!product||!selectedColor)&&(!wtwProduct||!wtwSelected)||!draftValid} onClick={addDraft}>{t.add}</button>
  </fieldset>

  {contactInput('name',t.name)}{contactInput('company',t.company)}{contactInput('country',t.country)}{contactInput('phone',t.phone,'tel')}{contactInput('email',t.email,'email',true)}
  <label className="sm:col-span-2">{t.message}<textarea name="message" rows={4} maxLength={2500}/></label>
  <p className="sm:col-span-2 text-sm leading-6 text-black/60">{t.handoff}</p>
  {error&&<p role="alert" className="sm:col-span-2 text-red-800">{error}</p>}
  <button data-whatsapp-submit className="btn-primary sm:col-span-2" type="submit">{t.send}</button>
  {ready&&<output className="sm:col-span-2"><p>{t.sent}</p><a href={ready} target="_blank" rel="noreferrer" className="underline">{t.open}</a></output>}
 </form>;
}
