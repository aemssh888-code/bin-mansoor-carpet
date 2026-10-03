import type {Locale} from './products';

const styleNames:Record<string,Record<Locale,string>>={
 Distressed:{ar:'متقادم',en:'Distressed',tr:'Eskitme'},
 Graphic:{ar:'غرافيكي',en:'Graphic',tr:'Grafik'},
 'High Contrast':{ar:'عالي التباين',en:'High Contrast',tr:'Yüksek Kontrast'},
 Linear:{ar:'خطي',en:'Linear',tr:'Çizgisel'},
 Minimal:{ar:'بسيط',en:'Minimal',tr:'Minimal'},
 Modern:{ar:'عصري',en:'Modern',tr:'Modern'},
 'Modern Classic':{ar:'كلاسيكي معاصر',en:'Modern Classic',tr:'Modern Klasik'},
 'Repeating Pattern':{ar:'نمط متكرر',en:'Repeating Pattern',tr:'Tekrarlanan Desen'},
 Soft:{ar:'ناعم',en:'Soft',tr:'Yumuşak'},
 Textural:{ar:'ملمسي',en:'Textural',tr:'Dokusal'},
};

export function wtwStyle(value:string,locale:Locale){return styleNames[value]?.[locale]??value;}

export function wtwColourCount(count:number,locale:Locale){
 if(locale==='ar')return count===1?'معاينة لونية واحدة':count===2?'معاينتان لونيتان':`${count} معاينات لونية`;
 if(locale==='tr')return `${count} renk/desen ön izlemesi`;
 return `${count} colour/design ${count===1?'preview':'previews'}`;
}
