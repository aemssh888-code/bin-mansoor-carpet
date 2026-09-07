import data from './catalog-data.json';
export type Locale = 'ar' | 'en' | 'tr';
export type LocalizedText = Record<Locale, string>;
export type Category = 'modern' | 'modern-classic' | 'classic-heritage';
export type CatalogImage = { image: string; width: number; height: number; sources: {src: string; width: number; height: number}[]; imageKind: 'design-preview' | 'photograph' | 'render' };
export type ProductVariant = CatalogImage & {code: string; originalCode: string; name: LocalizedText; productionConfirmed: boolean};
export type TechnicalSpecs = Record<'material' | 'construction' | 'pileHeight' | 'pileWeight' | 'totalWeight' | 'density' | 'backing' | 'availableSizes' | 'width' | 'customColors' | 'customDesign' | 'application' | 'leadTime', LocalizedText | string | number | boolean | string[] | null>;
export type Product = {
  id: string; binMansoorCode: string; originalCode: string; slug: string;
  name: LocalizedText; description: LocalizedText; categoryKey: Category; category: LocalizedText;
  collection: LocalizedText; style: LocalizedText; styles: LocalizedText[];
  heroImage: string; heroColorwayCode: string; galleryImages: string[]; colorways: ProductVariant[];
  featured: boolean; sortOrder: number; technicalSpecs: TechnicalSpecs;
  documents: {catalogPdf: string | null; technicalSheetPdf: string | null};
  availability: {minimumOrderQuantity: number | null; minimumOrderScope: string};
  classificationStatus: 'approved'; imageKind: CatalogImage['imageKind'];
};
// Internal paths remain in the owner's master and never enter browser bundles.
export type InternalProduct = Product & {sourceReference: {originalFilename: string; originalPath: string}; sourceReferences: {colorwayCode: string; originalFilename: string; originalPath: string}[]};
export const products = data as Product[];
export const categories: Category[] = ['modern', 'modern-classic', 'classic-heritage'];
export const productAliases: Record<string,string> = {'coast-1007a':'bmc-mod-002','contour-1007d':'bmc-mod-003','frame-0105a':'bmc-mcl-006','heritage-0534a':'bmc-cls-002','medallion-648':'bmc-cls-023','burgundy-palace-672':'bmc-cls-024','ivory-700':'bmc-cls-025','vine-844':'bmc-cls-026','royal-1003':'bmc-cls-011'};
export function getProduct(slug: string) { return products.find(p => p.slug === (productAliases[slug]??slug)); }
export function heroVariant(product: Product) { return product.colorways.find(c => c.code === product.heroColorwayCode)!; }
export function normalizeSearch(value: string) { return value.normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g,'ي').replace(/ı/g,'i').toLowerCase().trim(); }
export function matchesSearch(p: Product, query: string) { return normalizeSearch([p.binMansoorCode,p.originalCode,...Object.values(p.name),...p.colorways.map(c=>c.originalCode)].join(' ')).includes(normalizeSearch(query)); }
