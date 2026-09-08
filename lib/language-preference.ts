import type {Locale} from './products';

const KEY='bmc-language';

export function readLanguagePreference():Locale|null{
 try{
  const value=globalThis.localStorage?.getItem(KEY);
  return value==='ar'||value==='en'||value==='tr'?value:null;
 }catch{return null;}
}

export function saveLanguagePreference(locale:Locale){
 try{globalThis.localStorage?.setItem(KEY,locale);}catch{}
}
