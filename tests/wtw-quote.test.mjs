import test from 'node:test';
import assert from 'node:assert/strict';
import businessConstants from '../lib/business-constants.json' with {type:'json'};
import {allQuoteItemsValid,normalizeQuoteItems,quoteItemKey,serializeMixedQuote,serializeWTWLine,updateQuoteItem,upsertQuoteItem,validQuoteQuantity} from '../lib/quote-logic.ts';

const minimum=businessConstants.minimumOrderM2PerItem;
const policy={rug:minimum,'wall-to-wall':minimum};

const name={ar:'مدار',en:'Orbit',tr:'Yörünge'};
const label={ar:'C03',en:'C03',tr:'C03'};
const models=[
 {code:'WTW-015',slug:'wtw-015',name,colourways:[{code:'WTW-015-C01',image:'/c01.webp'},{code:'WTW-015-C03',image:'/c03.webp'}]},
 {code:'WTW-006',slug:'wtw-006',name:{ar:'صدع',en:'Rift',tr:'Yarık'},colourways:[{code:'WTW-006-C07',image:'/c07.webp'}]},
 {code:'WTW-004',slug:'wtw-004',name:{ar:'كتل',en:'Blocks',tr:'Bloklar'},colourways:[{code:'WTW-004-C06',image:'/c06.webp'}]},
];
const wtw=(colorCode='WTW-015-C03',quantity='500')=>({productLine:'wall-to-wall',modelCode:'WTW-015',name,colorCode,colorName:label,quantity,image:colorCode.endsWith('C03')?'/c03.webp':'/c01.webp'});
const rug=(quantity='8000')=>({productLine:'rug',modelCode:'BMC-MOD-001',name:{ar:'سجاد',en:'Rug',tr:'Halı'},colorCode:'BMC-MOD-001-C01',colorName:label,quantity});

test('WTW selected colour is canonical and survives locale/name migration',()=>{
 const saved=normalizeQuoteItems(JSON.stringify([{...wtw(),name:{ar:'WTW-015',en:'WTW-015',tr:'WTW-015'},image:'/c01.webp'}]),models);
 assert.equal(saved[0].colorCode,'WTW-015-C03');assert.equal(saved[0].image,'/c03.webp');
 assert.equal(saved[0].name.ar,'مدار');assert.equal(saved[0].name.en,'Orbit');assert.equal(saved[0].name.tr,'Yörünge');
 assert.equal(quoteItemKey(saved[0]),'wall-to-wall:WTW-015:WTW-015-C03');
});
test('two colours remain distinct; same colour upserts; editing and removal use canonical key',()=>{
 const first=upsertQuoteItem([],wtw('WTW-015-C01'));
 const second=upsertQuoteItem(first,wtw('WTW-015-C03'));
 assert.equal(second.length,2);
 const repeated=upsertQuoteItem(second,wtw('WTW-015-C03','700'));
 assert.equal(repeated.length,2);assert.equal(repeated[1].quantity,'700');
 const edited=updateQuoteItem(repeated,quoteItemKey(repeated[0]),{quantity:'1'});
 assert.equal(edited.find(item=>item.colorCode==='WTW-015-C01').quantity,'1');
 assert.equal(edited.filter(item=>quoteItemKey(item)!==quoteItemKey(repeated[1])).length,1);
});
test('legacy storage preserves BMC values, converts reserved codes, drops only ambiguous WTW',()=>{
 const raw=[{...rug('7999'),productLine:undefined},wtw(),{...wtw(),modelCode:'WTW-005',colorCode:'WTW-005-C01'},
  {...wtw(),modelCode:'WTW-007',colorCode:'WTW-007-C01'}, {...wtw(),colorCode:'',image:undefined}];
 const items=normalizeQuoteItems(JSON.stringify(raw),models);
 assert.equal(items.length,4);assert.equal(items[0].quantity,'7999');assert.equal(items[0].productLine,'rug');
 assert.deepEqual(items.slice(2).map(item=>[item.modelCode,item.colorCode]),[['WTW-006','WTW-006-C07'],['WTW-004','WTW-004-C06']]);
});
test('BMC and WTW each require 8,000 m² per line',()=>{
 assert.equal(minimum,8000);
 for(const value of ['', '0','-1','1','7999'])assert.equal(validQuoteQuantity(value,minimum),false);
 for(const value of ['8000','8001'])assert.equal(validQuoteQuantity(value,minimum),true);
 assert.equal(allQuoteItemsValid([rug(),wtw('WTW-015-C03','8000')],policy),true);
 assert.equal(allQuoteItemsValid([rug(),wtw('WTW-015-C03','7999')],policy),false);
 assert.equal(allQuoteItemsValid([rug('7999'),wtw('WTW-015-C03','8000')],policy),false);
 assert.equal(allQuoteItemsValid([wtw('WTW-015-C01','8000'),wtw('WTW-015-C03','8000')],policy),true);
 assert.equal(allQuoteItemsValid([wtw('WTW-015-C01','8000'),wtw('WTW-015-C03','7999')],policy),false);
 assert.equal(allQuoteItemsValid([wtw('WTW-015-C01','4000'),wtw('WTW-015-C03','4000')],policy),false);
 const otherDesign={...wtw('WTW-015-C01','8000'),modelCode:'WTW-020',colorCode:'WTW-020-C01'};
 assert.equal(allQuoteItemsValid([wtw('WTW-015-C03','8000'),otherDesign],policy),true);
 assert.equal(allQuoteItemsValid([wtw('WTW-015-C03','8000'),{...otherDesign,quantity:'7999'}],policy),false);
});
test('legacy WTW 500 remains visible but invalid until edited',()=>{
 const items=normalizeQuoteItems(JSON.stringify([wtw('WTW-015-C03','500')]),models);
 assert.equal(items.length,1);assert.equal(items[0].quantity,'500');
 assert.equal(allQuoteItemsValid(items,policy),false);
 assert.equal(allQuoteItemsValid(updateQuoteItem(items,quoteItemKey(items[0]),{quantity:'8000'}),policy),true);
});
test('WTW direct WhatsApp contains selected code and localized labels',()=>{
 for(const locale of ['ar','en','tr']){
  const text=serializeWTWLine(locale,wtw());assert.match(text,/WTW-015-C03/);assert.match(text,/500 m²/);assert.ok(text.includes(name[locale]));
 }
});
test('mixed WhatsApp groups BMC and two WTW colours without losing codes',()=>{
 for(const locale of ['ar','en','tr']){
  const text=serializeMixedQuote(locale,'Brand',[rug(),wtw('WTW-015-C01'),wtw('WTW-015-C03')],{company:'Factory',name:'Buyer',country:'Turkey',phone:'123456789',email:'',message:''});
  assert.ok(text.indexOf('BMC-MOD-001')<text.indexOf('WTW-015-C01'));
  assert.ok(text.includes('WTW-015-C01')&&text.includes('WTW-015-C03'));
  assert.ok(text.includes(name[locale]));assert.ok(text.includes('9000 m²'));
 }
});
