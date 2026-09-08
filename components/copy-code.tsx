'use client';
import {useState} from 'react';
import type {Locale} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
export function CopyCode({code,locale}:{code:string;locale:Locale}){
 const [copied,setCopied]=useState(false);const t=catalogText[locale];
 async function copy(){await navigator.clipboard.writeText(code);setCopied(true);window.setTimeout(()=>setCopied(false),1800);}
 return <button type="button" onClick={copy} className="text-sm underline decoration-black/30 underline-offset-4 hover:decoration-black" aria-live="polite">{copied?t.copied:t.copy}</button>;
}
