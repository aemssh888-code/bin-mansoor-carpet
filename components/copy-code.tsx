'use client';
import {useState} from 'react';
import type {Locale} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {siteUrl} from '@/lib/site-origin.mjs';
export function CopyCode({code,locale,label,copiedLabel}:{code:string;locale:Locale;label?:string;copiedLabel?:string}){
 const [copied,setCopied]=useState(false);const [manual,setManual]=useState(false);const t=catalogText[locale];
 async function copy(){
  try{await navigator.clipboard.writeText(code);setCopied(true);setManual(false);window.setTimeout(()=>setCopied(false),1800);}
  catch{setManual(true);}
 }
 return <span><button type="button" onClick={copy} className="text-sm underline decoration-black/30 underline-offset-4 hover:decoration-black" aria-live="polite">{copied?(copiedLabel??t.copied):(label??t.copy)}</button>{manual&&<input aria-label={label??t.copy} dir="ltr" readOnly value={code} onFocus={event=>event.currentTarget.select()} className="mt-2 block w-full border border-black/30 p-2 text-sm"/>}</span>;
}

export function CopyDesignLink({designPath,locale}:{designPath:string;locale:Locale}){
 const labels={ar:['نسخ رابط التصميم','تم نسخ الرابط'],en:['Copy Design Link','Link copied'],tr:['Tasarım Bağlantısını Kopyala','Bağlantı kopyalandı']}[locale];
 return <CopyCode code={`${siteUrl}${designPath}`} locale={locale} label={labels[0]} copiedLabel={labels[1]}/>;
}
