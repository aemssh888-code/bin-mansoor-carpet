import {notFound} from 'next/navigation';
import {WTWDetail} from '@/components/wtw-detail';
import {isLocale,locales} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';
import {getWTWModel,wtwModels,wtwText} from '@/lib/wtw';

export function generateStaticParams(){return locales.flatMap(locale=>wtwModels.map(model=>({locale,slug:model.slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;const model=getWTWModel(slug);
 if(!isLocale(locale)||!model)return {};
 const t=wtwText[locale];return pageMetadata(locale,`/wall-to-wall/${slug}`,`${model.code} | ${t.line}`,`${model.code}. ${t.intro}`,model.representativeImage);
}
export default async function WTWProductPage({params}:{params:Promise<{locale:string;slug:string}>}){
 const {locale,slug}=await params;if(!isLocale(locale))notFound();
 const model=getWTWModel(slug);if(!model)notFound();
 const t=wtwText[locale];return <main id="main-content" className="wtw-product-page"><nav className="wtw-breadcrumb site-shell" aria-label="Breadcrumb"><a href={`/${locale}/wall-to-wall`}>{t.back}</a><span aria-hidden="true">/</span><bdi aria-current="page">{model.code}</bdi></nav><WTWDetail locale={locale} model={model}/></main>;
}
