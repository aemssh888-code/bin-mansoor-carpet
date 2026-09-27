import type {Metadata} from 'next';
import type {Locale} from './products';
import {siteUrl} from './site-origin.mjs';
export {siteUrl};
export function pageMetadata(locale:Locale,path:string,title:string,description:string,image?:string):Metadata {
 const url=`${siteUrl}/${locale}${path}`;
 return {title,description,alternates:{canonical:url,languages:{ar:`${siteUrl}/ar${path}`,en:`${siteUrl}/en${path}`,tr:`${siteUrl}/tr${path}`,'x-default':`${siteUrl}/ar${path}`}},openGraph:{title:`${title} — TAYYAM CARPET & BIN MANSOOR CARPET`,description,url,siteName:'TAYYAM CARPET & BIN MANSOOR CARPET',locale:locale==='ar'?'ar_SA':locale==='tr'?'tr_TR':'en_GB',type:'website',...(image?{images:[{url:siteUrl+image}]}:{})}};
}
