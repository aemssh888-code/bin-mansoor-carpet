import {notFound} from 'next/navigation';
import {WTWCatalog} from '@/components/wtw-catalog';
import {HomeHeroCampaign} from '@/components/home-hero-campaign';
import {isLocale,locales} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {wtwCounts,wtwModels,wtwPublicText,wtwText} from '@/lib/wtw';
import {wallToWallHeroCampaign} from '@/lib/wtw-hero';

export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))return {};
 const t=wtwText[locale];return pageMetadata(locale,'/wall-to-wall',t.nav,t.intro,wallToWallHeroCampaign[0].desktop.src);
}
export default async function WTWPage({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 const t=wtwText[locale];
 const copy=wtwPublicText[locale];
 const heroSlides=wallToWallHeroCampaign.map(slide=>{
  const model=wtwModels.find(item=>item.code===slide.productCode);
  if(!model||!model.colourways.some(colour=>colour.code===slide.colourwayCode))throw new Error(`Invalid WTW hero selection: ${slide.productCode}`);
  return {...slide,name:model.name[locale],href:`/${locale}/wall-to-wall/${model.slug}`,alt:slide.alt[locale]};
 });
 return <main id="main-content" className="wtw-page">
  <section className="wtw-hero site-shell"><div className="wtw-hero-copy"><p className="eyebrow">{t.line}</p><h1 className="whitespace-pre-line">{t.hero}</h1><p>{t.intro}</p><div className="wtw-stats"><span><strong>{wtwCounts.models}</strong> {t.designs}</span><span><strong>{wtwCounts.previews}</strong> {t.previews}</span></div></div><HomeHeroCampaign slides={heroSlides} preloadMode="next" labels={{
   region:locale==='ar'?'حملة تصاميم الموكيت المختارة':locale==='tr'?'Seçili duvardan duvara halı tasarımları':'Selected wall-to-wall designs',
   previous:locale==='ar'?'التصميم السابق':locale==='tr'?'Önceki tasarım':'Previous design',
   next:locale==='ar'?'التصميم التالي':locale==='tr'?'Sonraki tasarım':'Next design',
   explore:t.view,
  }}/></section>
  <WTWCatalog locale={locale} models={wtwModels}/>
  <section className="wtw-quote-cta"><div className="site-shell"><h2>{copy.quoteHeading}</h2><a className="btn-primary" href={`/${locale}/quote`}>{copy.quoteAction}</a></div></section>
 </main>;
}
