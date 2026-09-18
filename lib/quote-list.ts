'use client';

import {useCallback,useMemo,useSyncExternalStore} from 'react';
import {MIN_ORDER_M2_PER_ITEM} from './business';
import {wtwModels} from './wtw';
import {normalizeQuoteItems,quoteItemKey,updateQuoteItem,upsertQuoteItem,validQuoteQuantity,type ProductLine,type QuoteItem} from './quote-logic';

export type {ProductLine,QuoteItem} from './quote-logic';
export {quoteItemKey} from './quote-logic';
const KEY='bin-mansoor-quote-list';
const EVENT='bin-mansoor-quote-list-change';
let memory='[]';
let migratedLegacyStorage=false;

export function isValidQuoteQuantity(value:string|number,productLine:ProductLine='rug'){
 return validQuoteQuantity(value,productLine,MIN_ORDER_M2_PER_ITEM);
}

export function normalizeQuoteQuantity(value:unknown,productLine:ProductLine='rug'){
 return isValidQuoteQuantity(typeof value==='string'||typeof value==='number'?value:'',productLine)?String(value).trim():productLine==='rug'?String(MIN_ORDER_M2_PER_ITEM):'';
}

function stored(){
 try{return globalThis.localStorage?.getItem(KEY)??memory;}catch{return memory;}
}

function parse(raw:string):QuoteItem[]{
 return normalizeQuoteItems(raw,wtwModels);
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
  const safeItem={...item,quantity:normalizeQuoteQuantity(item.quantity,item.productLine)};
  write(upsertQuoteItem(read(),safeItem));
 },[]);
 const remove=useCallback((key:string)=>write(read().filter(item=>quoteItemKey(item)!==key)),[]);
 const update=useCallback((key:string,patch:Partial<QuoteItem>)=>write(updateQuoteItem(read(),key,patch)),[]);
 return {items,add,remove,update};
}
