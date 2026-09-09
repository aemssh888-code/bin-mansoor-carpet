'use client';

import {useState,type MouseEvent} from 'react';
import {CatalogImage} from './catalog-image';
import {CopyCode} from './copy-code';
import {catalogText} from '@/lib/catalog-i18n';
import {heroVariant,type Locale,type Product,type TechnicalSpecs} from '@/lib/products';
import {isValidQuoteQuantity,useQuoteList} from '@/lib/quote-list';
import {business,MIN_ORDER_M2_PER_ITEM} from '@/lib/business';

const specLabels:Record<keyof TechnicalSpecs,Record<Locale,string>>={material:{ar:'الخامة',tr:'Malzeme',en:'Material'},construction:{ar:'طريقة التصنيع',tr:'Üretim tekniği',en:'Construction'},pileHeight:{ar:'ارتفاع الوبر',tr:'Hav yüksekliği',en:'Pile height'},pileWeight:{ar:'وزن الوبر',tr:'Hav ağırlığı',en:'Pile weight'},totalWeight:{ar:'الوزن الكلي',tr:'Toplam ağırlık',en:'Total weight'},density:{ar:'الكثافة',tr:'Yoğunluk',en:'Density'},backing:{ar:'الظهر',tr:'Taban',en:'Backing'},availableSizes:{ar:'المقاسات',tr:'Ölçüler',en:'Sizes'},sizes:{ar:'المقاسات',tr:'Ölçüler',en:'Sizes'},width:{ar:'العرض',tr:'En',en:'Width'},customColors:{ar:'ألوان حسب الطلب',tr:'Özel renkler',en:'Custom colours'},customDesign:{ar:'تصميم حسب الطلب',tr:'Özel tasarım',en:'Custom design'},application:{ar:'الاستخدام',tr:'Kullanım alanı',en:'Application'},leadTime:{ar:'مدة التجهيز',tr:'Teslim süresi',en:'Lead time'}};

export function ProductDetailExperience({product,locale}:{product:Product;locale:Locale}) {
  const [active,setActive]=useState(heroVariant(product));
  const [quantity,setQuantity]=useState(String(MIN_ORDER_M2_PER_ITEM));
  const [added,setAdded]=useState(false);
  const t=catalogText[locale];
  const {add}=useQuoteList();
  const inspection={ar:'معاينة واسعة للتصميم',en:'Full design inspection',tr:'Geniş tasarım incelemesi'}[locale];
  const quantityValid=isValidQuoteQuantity(quantity);
  const direct=`https://wa.me/${business.phoneHref.replace('+','')}?text=`+encodeURIComponent(`${t.quote}\n${product.name[locale]}\n${product.binMansoorCode}\n${t.selected}: ${active.name[locale]} — ${active.code}\n${t.quantity}: ${quantity} m²`);
  const specs=Object.entries(product.technicalSpecs).filter(([,value])=>value!==null&&value!==''&&(!Array.isArray(value)||value.length>0));
  const formatSpec=(value:unknown)=>{
    if(Array.isArray(value)) return value.join(', ');
    if(typeof value==='object'&&value!==null){const localized=(value as Record<string,unknown>)[locale];return typeof localized==='string'?localized:'';}
    return typeof value==='boolean'?(value?t.yes:t.no):String(value);
  };
  function addCurrent(){if(!quantityValid)return false;add({modelCode:product.binMansoorCode,name:product.name,colorCode:active.code,colorName:active.name,quantity});setAdded(true);window.setTimeout(()=>setAdded(false),1800);return true;}
  function quoteClick(event:MouseEvent<HTMLAnchorElement>){if(!addCurrent())event.preventDefault();}
  function whatsappClick(event:MouseEvent<HTMLAnchorElement>){if(!quantityValid)event.preventDefault();}

  return <>
    <div className="product-experience">
      <div className="product-main-art"><div className="product-art-canvas"><CatalogImage asset={active} alt={`${product.name[locale]} — ${active.name[locale]} — ${t.preview}`} priority sizes="(max-width:1023px) 100vw, 66vw" className="h-full w-full object-contain"/></div><span className="product-art-index" aria-hidden="true">01 / {String(product.colorways.length).padStart(2,'0')}</span><span className="design-preview-note">{t.preview}</span></div>
      <aside className="product-information">
        <p className="eyebrow">{product.category[locale]}</p>
        <h1>{product.name[locale]}</h1>
        <div className="product-code-line"><bdi>{product.binMansoorCode}</bdi><CopyCode code={product.binMansoorCode} locale={locale}/></div>
        <p className="product-description">{product.description[locale]}</p>
        <section className="swatch-section" aria-labelledby="colour-preview-title"><div className="swatch-heading"><h2 id="colour-preview-title">{t.colors}</h2><p>{active.name[locale]} · <bdi>{active.code}</bdi></p></div><div className="material-swatches">{product.colorways.map(color=><button key={color.code} type="button" aria-pressed={active.code===color.code} aria-label={`${color.name[locale]} ${color.code}`} onClick={()=>setActive(color)} className={active.code===color.code?'selected':''}><span><CatalogImage asset={color} alt={color.name[locale]} sizes="120px" className="h-full w-full object-cover"/></span><small>{color.name[locale]}</small></button>)}</div></section>
        <label className="quantity-field">{t.quantity}<input data-quantity-input type="number" min={MIN_ORDER_M2_PER_ITEM} step="any" value={quantity} aria-invalid={!quantityValid} aria-describedby="product-quantity-error" onChange={event=>setQuantity(event.target.value)}/></label>
        {!quantityValid&&<p id="product-quantity-error" role="alert" className="quantity-error">{t.moqValidation}</p>}
        <div className="product-actions"><button data-add-to-quote type="button" className="btn-primary" disabled={!quantityValid} onClick={addCurrent}>{added?t.added:t.add}</button><a href={`/${locale}/quote`} aria-disabled={!quantityValid} onClick={quoteClick} className="btn-secondary">{t.quote}</a><a data-whatsapp-quote href={quantityValid?direct:undefined} aria-disabled={!quantityValid} onClick={whatsappClick} target="_blank" rel="noreferrer" className="btn-text">WhatsApp</a></div>
        <output className="sr-only">{added?t.added:''}</output>
        <dl className="subdued-specs"><div><dt>{t.factoryRef}</dt><dd><bdi>{product.originalCode}</bdi></dd></div><div><dt>{t.collection}</dt><dd>{product.collection[locale]}</dd></div><div><dt>{t.style}</dt><dd>{product.styles.map(style=>style[locale]).join(' · ')}</dd></div><div><dt>MOQ</dt><dd>{t.moq}</dd></div></dl>
        {specs.length>0&&<details className="technical-details"><summary>{t.specs}</summary><dl>{specs.map(([key,value])=><div key={key}><dt>{specLabels[key as keyof TechnicalSpecs][locale]}</dt><dd>{formatSpec(value)}</dd></div>)}</dl></details>}
      </aside>
    </div>
    <section className="design-inspection"><div className="site-shell"><p className="eyebrow mb-6">{inspection}</p><div><CatalogImage asset={active} alt={`${product.name[locale]} — ${active.name[locale]} — ${inspection}`} sizes="100vw" className="h-full w-full object-cover"/></div><p className="mt-4 text-sm leading-7 text-black/52">{t.previewNote}</p></div></section>
    <div className="mobile-product-actions"><button type="button" disabled={!quantityValid} onClick={addCurrent}>{added?t.added:t.add}</button><a href={quantityValid?direct:undefined} aria-disabled={!quantityValid} onClick={whatsappClick} target="_blank" rel="noreferrer">WhatsApp</a></div>
  </>;
}
