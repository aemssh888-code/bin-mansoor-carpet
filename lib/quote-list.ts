'use client';

import {useCallback,useMemo,useSyncExternalStore} from 'react';
import {MIN_ORDER_M2_PER_ITEM} from './business';
import type {LocalizedText} from './products';

export type ProductLine='rug'|'wall-to-wall';
export type QuoteItem={productLine:ProductLine;modelCode:string;name:LocalizedText;colorCode:string;colorName:LocalizedText;quantity:string;image?:string;route?:string};
const KEY='bin-mansoor-quote-list';
const EVENT='bin-mansoor-quote-list-change';
let memory='[]';
let migratedLegacyStorage=false;

export function isValidQuoteQuantity(value:string|number,productLine:ProductLine='rug'){
 const text=String(value).trim();
 if(text==='')return false;
 const quantity=Number(text);
 return Number.isFinite(quantity)&&(productLine==='rug'?quantity>=MIN_ORDER_M2_PER_ITEM:quantity>0);
}

export function normalizeQuoteQuantity(value:unknown,productLine:ProductLine='rug'){
 return isValidQuoteQuantity(typeof value==='string'||typeof value==='number'?value:'',productLine)?String(value).trim():productLine==='rug'?String(MIN_ORDER_M2_PER_ITEM):'';
}

function stored(){
 try{return globalThis.localStorage?.getItem(KEY)??memory;}catch{return memory;}
}

function parse(raw:string):QuoteItem[]{
 try{
  const value=JSON.parse(raw);
  return Array.isArray(value)?value.filter(item=>item&&typeof item.modelCode==='string').map(item=>({...item,productLine:item.productLine==='wall-to-wall'?'wall-to-wall':'rug',quantity:typeof item.quantity==='string'?item.quantity:String(item.quantity??'')})):[];
 }catch{return [];}
}

function read(){return parse(stored());}
function write(items:QuoteItem[]){memory=JSON.stringify(items);try{globalThis.localStorage?.setItem(KEY,memory);}catch{}window.dispatchEvent(new Event(EVENT));}
function subscribe(callback:()=>void){window.addEventListener(EVENT,callback);window.addEventListener('storage',callback);return()=>{window.removeEventListener(EVENT,callback);window.removeEventListener('storage',callback);};}
function snapshot(){
 const raw=stored();
 if(migratedLegacyStorage||typeof window==='undefined')return raw;
 migratedLegacyStorage=true;
 // Legacy migration adds productLine without rewriting a user's entered quantity.
 // An invalid saved BMC amount must remain visibly invalid, never become 8000 silently.
 const normalized=JSON.stringify(parse(raw));
 if(normalized!==raw){memory=normalized;try{globalThis.localStorage?.setItem(KEY,normalized);}catch{}}
 return normalized;
}

export function useQuoteList(){
 const raw=useSyncExternalStore(subscribe,snapshot,()=>'[]');
 const items=useMemo(()=>parse(raw),[raw]);

 const add=useCallback((item:QuoteItem)=>{
  const current=read();
  const safeItem={...item,quantity:normalizeQuoteQuantity(item.quantity,item.productLine)};
  const existing=current.findIndex(value=>value.modelCode===safeItem.modelCode);
  if(existing>=0)current[existing]={...current[existing],...safeItem};else current.push(safeItem);
  write(current);
 },[]);
 const remove=useCallback((modelCode:string)=>write(read().filter(item=>item.modelCode!==modelCode)),[]);
 const update=useCallback((modelCode:string,patch:Partial<QuoteItem>)=>write(read().map(item=>item.modelCode===modelCode?{...item,...patch}:item)),[]);
 return {items,add,remove,update};
}
