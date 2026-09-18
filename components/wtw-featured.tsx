import type {Locale} from '@/lib/products';
import {wtwCategory,wtwFeatured,wtwText} from '@/lib/wtw';

const titles={
 ar:'مختارات من تصاميم الموكيت',
 en:'Selected Wall-to-Wall Designs',
 tr:'Seçili Duvardan Duvara Tasarımlar',
} satisfies Record<Locale,string>;

export function WTWFeatured({locale}:{locale:Locale}){
 const t=wtwText[locale];
 return <section className="wtw-featured site-shell" aria-label={titles[locale]}>
  <div className="wtw-featured-heading"><p className="eyebrow">{t.line}</p><h2>{titles[locale]}</h2></div>
  <div className="wtw-featured-grid">{wtwFeatured.map(model=><a className="wtw-featured-item" key={model.code} href={`/${locale}/wall-to-wall/${model.slug}`}>
   <div className="wtw-featured-art"><img src={model.representativeImage} alt={`${model.code} — ${wtwCategory(model.category,locale)} — ${t.view}`} loading="lazy" width="1200" height="800"/></div>
   <div className="wtw-featured-caption"><bdi>{model.code}</bdi><span>{wtwCategory(model.category,locale)}</span></div>
  </a>)}</div>
 </section>;
}
