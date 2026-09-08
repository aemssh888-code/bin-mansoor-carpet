'use client';
import {languageNames,locales} from '@/lib/i18n';
import type {Locale} from '@/lib/products';
import {usePathname} from 'next/navigation';
import {saveLanguagePreference} from '@/lib/language-preference';
export function LanguageSwitcher({locale,path,compact=false}:{locale:Locale;path?:string;compact?:boolean}){
 const pathname=usePathname();const resolvedPath=path??pathname.replace(/^\/(ar|en|tr)/,'');
 return <div className="flex flex-wrap gap-2" aria-label={languageNames[locale]}>{locales.map(item=><a key={item} href={`/${item}${resolvedPath}`} hrefLang={item} onClick={()=>saveLanguagePreference(item)} className={`${compact?'px-2 py-1 text-xs':'border border-white/20 px-3 py-2 text-xs'} ${item===locale?'bg-white text-black':'text-white/65 hover:text-white'}`}>{item.toUpperCase()}</a>)}</div>;
}
