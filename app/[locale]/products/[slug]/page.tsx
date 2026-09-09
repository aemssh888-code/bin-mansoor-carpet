import {notFound} from 'next/navigation';
import {getDictionary,isLocale,locales} from '@/lib/i18n';
import {getProduct,products,productAliases} from '@/lib/products';
import {catalogText} from '@/lib/catalog-i18n';
import {pageMetadata,siteUrl} from '@/lib/seo';
import {ProductCard} from '@/components/product-card';
import {ProductDetailExperience} from '@/components/product-detail-experience';

export function generateStaticParams(){return locales.flatMap(locale=>[...products.map(product=>product.slug),...Object.keys(productAliases)].map(slug=>({locale,slug})));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;const product=getProduct(slug);return product&&isLocale(locale)?pageMetadata(locale,`/products/${product.slug}`,`${product.name[locale]} ${product.binMansoorCode}`,product.description[locale],product.heroImage):{};}

export default async function ProductPage({params}:{params:Promise<{locale:string;slug:string}>}) {
  const {locale,slug}=await params;
  if(!isLocale(locale)) notFound();
  const product=getProduct(slug);
  if(!product) notFound();
  const t=catalogText[locale];
  const dictionary=getDictionary(locale);
  const related=products.filter(item=>item.id!==product.id).map(item=>({item,score:(item.collection.en===product.collection.en?100:0)+(item.styles.some(style=>product.styles.some(current=>current.en===style.en))?10:0)+(item.categoryKey===product.categoryKey?1:0)})).sort((a,b)=>b.score-a.score||a.item.sortOrder-b.item.sortOrder).slice(0,4).map(value=>value.item);
  const breadcrumbItems=[{name:dictionary.nav.products,url:`${siteUrl}/${locale}/products`},{name:product.category[locale],url:`${siteUrl}/${locale}/products?category=${product.categoryKey}`},{name:product.collection[locale],url:`${siteUrl}/${locale}/products?collection=${encodeURIComponent(product.collection.en)}`},{name:product.name[locale],url:`${siteUrl}/${locale}/products/${product.slug}`}];

  return <main id="main-content" className="product-detail">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumbItems.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:item.url}))})}}/>
    <div className="site-shell pt-7 sm:pt-10"><nav aria-label={locale==='ar'?'مسار الصفحة':locale==='tr'?'Sayfa yolu':'Breadcrumb'} className="product-breadcrumbs"><ol dir={locale==='ar'?'rtl':'ltr'}><li><a href={`/${locale}/products`}>{dictionary.nav.products}</a></li><li aria-hidden="true">/</li><li><a href={`/${locale}/products?category=${product.categoryKey}`}>{product.category[locale]}</a></li><li aria-hidden="true">/</li><li><a href={`/${locale}/products?collection=${encodeURIComponent(product.collection.en)}`}>{product.collection[locale]}</a></li><li aria-hidden="true">/</li><li aria-current="page">{product.name[locale]}</li></ol></nav></div>
    <ProductDetailExperience product={product} locale={locale}/>
    <section className="related-designs site-shell"><header><p className="eyebrow">{product.collection[locale]}</p><h2>{t.related}</h2></header><div>{related.map(item=><ProductCard key={item.id} product={item} locale={locale} viewLabel={dictionary.common.view}/>)}</div></section>
  </main>;
}
