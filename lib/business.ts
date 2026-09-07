import type {LocalizedText} from './products';
type OptionalText=LocalizedText|null;
export const business: {
 established:number; machines:number; minimumOrderQuantity:number;
 factoryArea:number|null; employees:number|null; monthlyCapacity:number|null; annualCapacity:number|null;
 machineDetails:OptionalText; materials:OptionalText; certifications:OptionalText; exportMarkets:OptionalText; shipping:OptionalText; leadTime:OptionalText; customManufacturing:OptionalText; customDesign:OptionalText;
 factoryPhotos:{src:string;alt:LocalizedText}[]|null; factoryVideo:string|null;
 projects:LocalizedText[]|null; clients:LocalizedText[]|null; applications:LocalizedText[]|null;
}={established:2023,machines:4,minimumOrderQuantity:8000,factoryArea:null,employees:null,monthlyCapacity:null,annualCapacity:null,machineDetails:null,materials:null,certifications:null,exportMarkets:null,shipping:null,leadTime:null,customManufacturing:null,customDesign:null,factoryPhotos:null,factoryVideo:null,projects:null,clients:null,applications:null};
