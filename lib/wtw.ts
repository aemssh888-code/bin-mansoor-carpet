import data from './wtw-catalog-data.json';
import type {Locale,LocalizedText} from './products';

export type WTWColourway={code:string;image:string;colourFamily:string};
export type WTWModel={
 code:string;slug:string;category:string;styles:string[];confidence:string;
 representativeImage:string;colourways:WTWColourway[];
 technicalSpecs:Record<string,null>;minimumOrderQuantityM2:null;
};
export const wtwModels=data as WTWModel[];
export const wtwCounts={models:wtwModels.length,previews:wtwModels.reduce((sum,model)=>sum+model.colourways.length,0)};
export const wtwCategories=[...new Set(wtwModels.map(model=>model.category))].sort();
export const wtwStyles=[...new Set(wtwModels.flatMap(model=>model.styles))].sort();
export const wtwColours=[...new Set(wtwModels.flatMap(model=>model.colourways.map(colour=>colour.colourFamily)))].sort();
export const wtwReserved:Record<string,string>={'wtw-005':'wtw-006','wtw-007':'wtw-004'};
export function getWTWModel(slug:string){return wtwModels.find(model=>model.slug===slug);}
export function wtwColourLabel(code:string){return code.split('-').at(-1)??code;}
export function wtwSearch(model:WTWModel,query:string){
 const needle=query.toLocaleLowerCase().trim();
 return [model.code,model.category,...model.styles,...model.colourways.map(colour=>colour.code)].join(' ').toLocaleLowerCase().includes(needle);
}

const categories:Record<string,LocalizedText>={
 Abstract:{ar:'تجريدي',en:'Abstract',tr:'Soyut'},Botanical:{ar:'نباتي',en:'Botanical',tr:'Bitkisel'},
 Geometric:{ar:'هندسي',en:'Geometric',tr:'Geometrik'},Linear:{ar:'خطي',en:'Linear',tr:'Çizgisel'},
 Organic:{ar:'عضوي',en:'Organic',tr:'Organik'},Ornamental:{ar:'زخرفي',en:'Ornamental',tr:'Süslemeli'},
 Textural:{ar:'نسيجي',en:'Textural',tr:'Dokusal'},
};
const colours:Record<string,LocalizedText>={
 Beige:{ar:'بيج',en:'Beige',tr:'Bej'},Blue:{ar:'أزرق',en:'Blue',tr:'Mavi'},
 Brown:{ar:'بني',en:'Brown',tr:'Kahverengi'},Gold:{ar:'ذهبي',en:'Gold',tr:'Altın'},Grey:{ar:'رمادي',en:'Grey',tr:'Gri'},
};
export function wtwCategory(value:string,locale:Locale){return categories[value]?.[locale]??value;}
export function wtwColour(value:string,locale:Locale){return colours[value]?.[locale]??value;}

export const wtwText={
 ar:{nav:'الموكيت',rugNav:'السجاد',hero:'موكيت للمشاريع\nوالمساحات التجارية.',intro:'مجموعة من التصاميم المختارة للمشاريع والمساحات الواسعة.',designs:'تصميم',previews:'معاينة لونية',search:'ابحث بكود التصميم أو المعاينة',all:'الكل',category:'التصنيف',style:'الطابع',colour:'عائلة اللون',clear:'مسح الفلاتر',more:'عرض المزيد',empty:'لا توجد تصاميم مطابقة.',view:'عرض التصميم',selected:'المعاينة المختارة',quantity:'الكمية التقديرية (م²)',quantityError:'أدخل كمية تقديرية أكبر من صفر.',add:'أضف إلى قائمة العرض',added:'أُضيف إلى قائمة العرض',quote:'طلب عرض سعر',full:'معاينة كاملة للتصميم',whatsapp:'استفسار عبر واتساب',back:'كل تصاميم الموكيت',line:'موكيت',colourPreviews:'معاينات لونية',noMoq:'تُناقش تفاصيل الطلب عند طلب العرض.',homeTitle:'موكيت للمشاريع والمساحات الواسعة.',homeBody:'مجموعة مختارة من تصاميم الموكيت للأعمال والمشاريع.',explore:'استكشف الموكيت',code:'كود التصميم (WTW)'},
 en:{nav:'Wall-to-Wall',rugNav:'Rugs',hero:'Wall-to-Wall Carpet\nfor Projects & Commercial Spaces.',intro:'A curated collection of designs for projects and large-scale interiors.',designs:'designs',previews:'colour/design previews',search:'Search design or preview code',all:'All',category:'Category',style:'Style',colour:'Colour family',clear:'Clear filters',more:'Load more',empty:'No matching designs.',view:'View design',selected:'Selected preview',quantity:'Estimated Quantity (m²)',quantityError:'Enter a positive estimated quantity.',add:'Add to Quote List',added:'Added to Quote List',quote:'Request a Quote',full:'Full Pattern Preview',whatsapp:'WhatsApp inquiry',back:'All Wall-to-Wall designs',line:'Wall-to-Wall',colourPreviews:'colour previews',noMoq:'Order details are discussed when quoting.',homeTitle:'Wall-to-Wall Carpet for Projects & Large Interiors.',homeBody:'A selected collection of carpet designs for business and project spaces.',explore:'Explore Wall-to-Wall',code:'Design Code (WTW)'},
 tr:{nav:'Duvardan Duvara',rugNav:'Halılar',hero:'Projeler ve Ticari Alanlar İçin\nDuvardan Duvara Halı.',intro:'Projeler ve geniş iç mekânlar için seçili tasarımlar.',designs:'tasarım',previews:'renk/tasarım ön izlemesi',search:'Tasarım veya ön izleme kodu ara',all:'Tümü',category:'Kategori',style:'Stil',colour:'Renk ailesi',clear:'Filtreleri temizle',more:'Daha fazla göster',empty:'Eşleşen tasarım yok.',view:'Tasarımı incele',selected:'Seçilen ön izleme',quantity:'Tahmini Miktar (m²)',quantityError:'Sıfırdan büyük bir tahmini miktar girin.',add:'Teklif listesine ekle',added:'Teklif listesine eklendi',quote:'Teklif iste',full:'Tam Desen Önizlemesi',whatsapp:'WhatsApp talebi',back:'Tüm duvardan duvara tasarımlar',line:'Duvardan Duvara Halı',colourPreviews:'renk ön izlemesi',noMoq:'Sipariş detayları teklif aşamasında görüşülür.',homeTitle:'Projeler ve Geniş Alanlar İçin Duvardan Duvara Halı.',homeBody:'İş ve proje alanları için seçili halı tasarımları.',explore:'Duvardan Duvara Halıyı Keşfet',code:'Tasarım Kodu (WTW)'},
} satisfies Record<Locale,Record<string,string>>;
