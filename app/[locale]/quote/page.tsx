import {notFound} from 'next/navigation';
import {isLocale,locales} from '@/lib/i18n';
import {products} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {QuoteForm} from '@/components/quote-form';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;return isLocale(locale)?pageMetadata(locale,'/quote',catalogText[locale].quote,catalogText[locale].handoff):{};}
export default async function QuotePage({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;if(!isLocale(locale))notFound();const t=catalogText[locale];return <main id="main-content" className="site-shell py-16 sm:py-24"><div className="mx-auto max-w-4xl"><p className="eyebrow mb-6">BIN MANSOOR / B2B</p><h1 className="mb-12 text-4xl sm:text-6xl">{t.quote}</h1><QuoteForm locale={locale} products={products}/></div></main>;}
