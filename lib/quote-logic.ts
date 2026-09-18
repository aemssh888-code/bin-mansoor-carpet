import type {LocalizedText,Locale} from './products';

export type ProductLine='rug'|'wall-to-wall';
export type QuoteItem={productLine:ProductLine;modelCode:string;name:LocalizedText;colorCode:string;colorName:LocalizedText;quantity:string;image?:string;route?:string};
export type WTWQuoteModel={code:string;slug:string;name:LocalizedText;colourways:{code:string;image:string}[]};

export function validQuoteQuantity(value:string|number,minimumPerItemM2:number){
 const text=String(value).trim();if(text==='')return false;
 const quantity=Number(text);
 return Number.isFinite(quantity)&&quantity>=minimumPerItemM2;
}

export function allQuoteItemsValid(items:QuoteItem[],minimumByLine:Record<ProductLine,number>){
 return items.every(item=>validQuoteQuantity(item.quantity,minimumByLine[item.productLine]));
}

export function quoteItemKey(item:Pick<QuoteItem,'productLine'|'modelCode'|'colorCode'>){
 return item.productLine==='wall-to-wall'?`wall-to-wall:${item.modelCode}:${item.colorCode}`:item.modelCode;
}

// These are the approved historical page mappings, not new active products.
const reservedColourways:Record<string,{modelCode:string;colorCode:string}>={
 'WTW-005-C01':{modelCode:'WTW-006',colorCode:'WTW-006-C07'},
 'WTW-007-C01':{modelCode:'WTW-004',colorCode:'WTW-004-C06'},
};

export function normalizeQuoteItems(raw:string,models:WTWQuoteModel[]):QuoteItem[]{
 let parsed:unknown;
 try{parsed=JSON.parse(raw);}catch{return [];}
 if(!Array.isArray(parsed))return [];
 const byCode=new Map(models.map(model=>[model.code,model]));
 const result:QuoteItem[]=[];
 for(const value of parsed){
  if(!value||typeof value!=='object')continue;
  const item=value as Record<string,unknown>;
  if(typeof item.modelCode!=='string'||!item.modelCode)continue;
  const line:ProductLine=item.productLine==='wall-to-wall'?'wall-to-wall':'rug';
  const quantity=typeof item.quantity==='string'?item.quantity:typeof item.quantity==='number'?String(item.quantity):'';
  if(line==='rug'){
   // Old BMC entries had no productLine. Keep their existing identity and values.
   const rug={...item,productLine:line,quantity} as QuoteItem;
   const index=result.findIndex(existing=>quoteItemKey(existing)===quoteItemKey(rug));
   if(index<0)result.push(rug);else result[index]=rug;
   continue;
  }
  let modelCode=item.modelCode.toUpperCase();
  let colorCode=typeof item.colorCode==='string'?item.colorCode.toUpperCase():'';
  const reserved=reservedColourways[colorCode];
  if(reserved&&(modelCode==='WTW-005'||modelCode==='WTW-007'))({modelCode,colorCode}=reserved);
  const model=byCode.get(modelCode);
  if(!model)continue;
  let colour=model.colourways.find(current=>current.code===colorCode);
  if(!colour&&typeof item.image==='string')colour=model.colourways.find(current=>current.image===item.image);
  if(!colour&&model.colourways.length===1)colour=model.colourways[0];
  if(!colour)continue; // Multiple possible colours: never guess from the representative image.
  const label=colour.code.split('-').at(-1)??colour.code;
  const current:QuoteItem={productLine:'wall-to-wall',modelCode:model.code,name:model.name,colorCode:colour.code,colorName:{ar:label,en:label,tr:label},quantity,image:colour.image,route:typeof item.route==='string'&&item.route.startsWith('/')?item.route:`/en/wall-to-wall/${model.slug}`};
  const index=result.findIndex(existing=>quoteItemKey(existing)===quoteItemKey(current));
  if(index<0)result.push(current);else result[index]=current;
 }
 return result;
}

export function upsertQuoteItem(items:QuoteItem[],item:QuoteItem){
 const result=[...items];const index=result.findIndex(current=>quoteItemKey(current)===quoteItemKey(item));
 if(index<0)result.push(item);else result[index]={...result[index],...item};
 return result;
}

export function updateQuoteItem(items:QuoteItem[],key:string,patch:Partial<QuoteItem>){
 const found=items.find(item=>quoteItemKey(item)===key);
 if(!found)return items;
 const edited={...found,...patch};
 return upsertQuoteItem(items.filter(item=>quoteItemKey(item)!==key),edited);
}

const labels={
 ar:{request:'طلب عرض سعر',rug:'السجاد',wtw:'الموكيت',name:'التصميم',model:'كود التصميم',colour:'كود اللون/المعاينة',rugColour:'اللون',quantity:'الكمية التقديرية',rugQuantity:'الكمية',company:'الشركة',contact:'الاسم',country:'الدولة',phone:'الهاتف',email:'البريد الإلكتروني',designs:'التصاميم المطلوبة',total:'إجمالي الكمية التقديرية',message:'الرسالة'},
 en:{request:'REQUEST FOR QUOTATION',rug:'Rugs',wtw:'Wall-to-Wall',name:'Design',model:'Design Code',colour:'Colour Preview Code',rugColour:'Colour',quantity:'Estimated Quantity',rugQuantity:'Quantity',company:'Company',contact:'Name',country:'Country',phone:'Phone',email:'Email',designs:'Requested Designs',total:'Total estimated quantity',message:'Message'},
 tr:{request:'FİYAT TEKLİFİ TALEBİ',rug:'Halılar',wtw:'Duvardan Duvara Halı',name:'Tasarım',model:'Tasarım Kodu',colour:'Renk Önizleme Kodu',rugColour:'Renk',quantity:'Tahmini Miktar',rugQuantity:'Miktar',company:'Firma',contact:'Ad',country:'Ülke',phone:'Telefon',email:'E-posta',designs:'Talep Edilen Tasarımlar',total:'Toplam tahmini miktar',message:'Mesaj'},
} as const;

export function serializeWTWLine(locale:Locale,item:QuoteItem){
 const t=labels[locale];
 return [t.wtw,`${t.name}: ${item.name[locale]}`,`${t.model}: ${item.modelCode}`,`${t.colour}: ${item.colorCode}`,`${t.quantity}: ${item.quantity} m²`].join('\n');
}

export function serializeMixedQuote(locale:Locale,brand:string,items:QuoteItem[],fields:Record<string,string>){
 const t=labels[locale];const rugs=items.filter(item=>item.productLine==='rug');const wtw=items.filter(item=>item.productLine==='wall-to-wall');
 const lines=[brand,t.request,'',`${t.company}: ${fields.company}`,`${t.contact}: ${fields.name}`,`${t.country}: ${fields.country}`,`${t.phone}: ${fields.phone}`];
 if(fields.email)lines.push(`${t.email}: ${fields.email}`);
 lines.push('',`${t.designs}:`);
 if(rugs.length){lines.push('',`${t.rug}:`);for(const [index,item] of rugs.entries())lines.push(`${index+1}. ${item.name[locale]}\n${t.model}: ${item.modelCode}\n${t.rugColour}: ${item.colorName[locale]} — ${item.colorCode}\n${t.rugQuantity}: ${item.quantity} m²`);}
 if(wtw.length){lines.push('',`${t.wtw}:`);for(const [index,item] of wtw.entries())lines.push(`${index+1}. ${item.name[locale]}\n${t.model}: ${item.modelCode}\n${t.colour}: ${item.colorCode}\n${t.quantity}: ${item.quantity} m²`);}
 lines.push('',`${t.total}: ${items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0)} m²`);
 if(fields.message)lines.push(`${t.message}: ${fields.message}`);
 return lines.join('\n');
}
