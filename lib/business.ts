import type {LocalizedText} from './products';
import businessConstants from './business-constants.json';
type OptionalText=LocalizedText|null;
export const MIN_ORDER_M2_PER_ITEM=businessConstants.minimumOrderM2PerItem;
export type PartnerCompany={
 brandName:string;legalName:string;
 phone:string|null;whatsapp:string|null;email:string|null;address:string|null;mapsUrl:string|null;socialLinks:Record<string,string>|null;
};
export const jointBrand={
 name:{ar:'تايام كاربت و بن منصور كاربت',en:'TAYYAM CARPET & BIN MANSOOR CARPET',tr:'TAYYAM CARPET & BIN MANSOOR CARPET'} satisfies LocalizedText,
 logo:'/media/brand/tayyam-bin-mansoor-joint-logo.webp',
 panelLogos:{tayyam:'/media/brand/tayyam-logo-panel.webp',binMansoor:'/media/brand/bin-mansoor-logo-panel.webp'},
};
export const partnerCompanies:{tayyam:PartnerCompany;binMansoor:PartnerCompany}={
 tayyam:{brandName:'TAYYAM CARPET',legalName:'TAYYAM HALI TEKSTİL İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ',phone:null,whatsapp:null,email:null,address:null,mapsUrl:null,socialLinks:null},
 binMansoor:{brandName:'BIN MANSOOR CARPET',legalName:'BINMANSOOR HALI TEKSTİL İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ',phone:null,whatsapp:null,email:null,address:null,mapsUrl:null,socialLinks:null},
};
export type FactScope='joint'|'tayyam'|'binMansoor';
export const verifiedFacts=[
 {key:'established',value:2023,unit:null,scope:'binMansoor' as FactScope},
 {key:'machines',value:4,unit:null,scope:'binMansoor' as FactScope},
 {key:'minimumOrderQuantity',value:MIN_ORDER_M2_PER_ITEM,unit:'m²',scope:'binMansoor' as FactScope},
] as const;
export const business: {
 address:string; phoneDisplay:string; phoneHref:string; maps:string;
 established:number; machines:number; minimumOrderQuantity:number;
 officialEmail:string|null; socialLinks:Record<string,string>|null;
 factoryArea:number|null; employeeCount:number|null; dailyCapacity:number|null; monthlyCapacity:number|null; annualCapacity:number|null;
 machineDetails:OptionalText; materials:OptionalText; certifications:OptionalText; exportMarkets:OptionalText; shippingMethods:OptionalText; leadTime:OptionalText; customManufacturing:OptionalText; customDesign:OptionalText; customColors:OptionalText;
 factoryPhotos:{src:string;alt:LocalizedText}[]|null; factoryVideo:{src:string;captions:string;poster?:string}|null;
 projects:LocalizedText[]|null; clients:LocalizedText[]|null; applications:LocalizedText[]|null; catalogPdf:string|null;
}={
 address:'OSB 5. Bölge, 83523 Nolu Cd. No:19, 27620 Şehitkamil, Gaziantep, Türkiye',
 phoneDisplay:'+90 530 351 30 37',phoneHref:'+905303513037',
 maps:'https://www.google.com/maps/search/OSB+5.+Bolge+83523+Nolu+Cd.+19,+27620+%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9+%D8%BA%D8%A7%D8%B2%D9%8A+%D8%B9%D9%8A%D9%86%D8%AA%D8%A7%D8%A8,+Sehitkamil+%D8%AA%D8%B1%D9%83%D9%8A%D8%A7%E2%80%AD/@37.1993,37.3054,17z?hl=ar&entry=ttu',
 established:2023,machines:4,minimumOrderQuantity:MIN_ORDER_M2_PER_ITEM,
 officialEmail:null,socialLinks:null,factoryArea:null,employeeCount:null,dailyCapacity:null,monthlyCapacity:null,annualCapacity:null,
 machineDetails:null,materials:null,certifications:null,exportMarkets:null,shippingMethods:null,leadTime:null,customManufacturing:null,customDesign:null,customColors:null,
 factoryPhotos:null,factoryVideo:null,projects:null,clients:null,applications:null,catalogPdf:null,
};
