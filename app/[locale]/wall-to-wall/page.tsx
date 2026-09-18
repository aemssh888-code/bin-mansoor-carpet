import {notFound} from 'next/navigation';
import {WTWCatalog} from '@/components/wtw-catalog';
import {isLocale,locales} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {wtwCounts,wtwModels,wtwText} from '@/lib/wtw';

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))return {};
 const t=wtwText[locale];return pageMetadata(locale,'/wall-to-wall',t.nav,t.intro,wtwModels[0].representativeImage);
}
export default async function WTWPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 const t=wtwText[locale];
 return <main id="main-content" className="wtw-page">
  <section className="wtw-hero site-shell"><div className="wtw-hero-copy"><p className="eyebrow">{t.line}</p><h1 className="whitespace-pre-line">{t.hero}</h1><p>{t.intro}</p><div className="wtw-stats"><span><strong>{wtwCounts.models}</strong> {t.designs}</span><span><strong>{wtwCounts.previews}</strong> {t.previews}</span></div></div><div className="wtw-hero-art"><img src={wtwModels[0].representativeImage} alt={`${wtwModels[0].code} ${t.view}`} width="1200" height="800" fetchPriority="high"/><span>{wtwModels[0].code}</span></div></section>
  <WTWCatalog locale={locale} models={wtwModels}/>
 </main>;
}
