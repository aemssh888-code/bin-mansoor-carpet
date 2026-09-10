import {notFound} from 'next/navigation';
import {isLocale,locales} from '@/lib/i18n';
import {products} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata} from '@/lib/seo';
import {QuoteForm} from '@/components/quote-form';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;return isLocale(locale)?pageMetadata(locale,'/quote',catalogText[locale].quote,catalogText[locale].handoff):{};}
export default async function QuotePage({params}:{params:Promise<{locale:string}>}) {const {locale}=await params;if(!isLocale(locale))notFound();const copy={ar:{kicker:'استفسار مشروع',title:'التصاميم المختارة.\nطلب عرض واضح.',body:'أضف الموديلات والكميات التقريبية، ثم راجع الرسالة قبل إرسالها عبر واتساب.'},en:{kicker:'Project enquiry',title:'Selected designs.\nA considered quotation.',body:'Add your preferred models and estimated quantities, then review the message before sending it through WhatsApp.'},tr:{kicker:'Proje talebi',title:'Seçili tasarımlar.\nNet bir teklif talebi.',body:'Modelleri ve tahmini miktarları ekleyin, ardından WhatsApp üzerinden göndermeden önce mesajı inceleyin.'}}[locale];return <main id="main-content" className="quote-page"><section className="quote-hero site-shell"><div><p className="eyebrow">{copy.kicker}</p><h1 className="whitespace-pre-line">{copy.title}</h1></div><p>{copy.body}</p></section><section className="quote-workspace site-shell"><QuoteForm locale={locale} products={products}/></section></main>;}
