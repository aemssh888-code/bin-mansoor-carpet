'use client';
import {useCallback,useMemo,useSyncExternalStore} from 'react';
import type {LocalizedText} from './products';

export type QuoteItem={modelCode:string;name:LocalizedText;colorCode:string;colorName:LocalizedText;quantity:string};
const KEY='bin-mansoor-quote-list';
const EVENT='bin-mansoor-quote-list-change';
let memory='[]';
function stored(){
 try{return globalThis.localStorage?.getItem(KEY)??memory;}catch{return memory;}
}
function read():QuoteItem[]{
 try {const value=JSON.parse(stored());return Array.isArray(value)?value.filter(x=>x&&typeof x.modelCode==='string'):[];} catch{return [];}
}
function write(items:QuoteItem[]){memory=JSON.stringify(items);try{globalThis.localStorage?.setItem(KEY,memory);}catch{}window.dispatchEvent(new Event(EVENT));}
function subscribe(callback:()=>void){window.addEventListener(EVENT,callback);window.addEventListener('storage',callback);return()=>{window.removeEventListener(EVENT,callback);window.removeEventListener('storage',callback);};}
function snapshot(){return stored();}
export function useQuoteList(){
 const raw=useSyncExternalStore(subscribe,snapshot,()=>'[]');
 const items=useMemo(()=>{try{return JSON.parse(raw) as QuoteItem[];}catch{return [];}},[raw]);
 const add=useCallback((item:QuoteItem)=>{const current=read();const existing=current.findIndex(x=>x.modelCode===item.modelCode);if(existing>=0)current[existing]={...current[existing],...item};else current.push(item);write(current);},[]);
 const remove=useCallback((modelCode:string)=>write(read().filter(x=>x.modelCode!==modelCode)),[]);
 const update=useCallback((modelCode:string,patch:Partial<QuoteItem>)=>write(read().map(x=>x.modelCode===modelCode?{...x,...patch}:x)),[]);
 return {items,add,remove,update};
}
