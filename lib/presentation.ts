import type {Category,Locale} from './products';

const heroProductCode='BMC-MOD-004';

export const sitePresentation = {
  heroProductCode,
  editorialProductCode: 'BMC-MOD-005',
  collectionProductCodes: {
    modern: 'BMC-MOD-002',
    'modern-classic': 'BMC-MCL-009',
    'classic-heritage': 'BMC-CLS-019',
  } satisfies Record<Category, string>,
  homepageProductCodes: [
    'BMC-MOD-004',
    'BMC-MOD-005',
    'BMC-MOD-002',
    'BMC-MOD-001',
    'BMC-MCL-007',
    'BMC-MCL-008',
    'BMC-MCL-009',
    'BMC-CLS-019',
  ],
} as const;

export const homeHeroMedia = {
  productCode: heroProductCode,
  type: 'design-visualization',
  desktop: {
    avif: '/media/hero/bmc-mod-004/bmc-mod-004-3d-desktop.avif',
    src: '/media/hero/bmc-mod-004/bmc-mod-004-3d-desktop.webp',
    width: 2400,
    height: 1500,
  },
  mobile: {
    avif: '/media/hero/bmc-mod-004/bmc-mod-004-3d-mobile.avif',
    src: '/media/hero/bmc-mod-004/bmc-mod-004-3d-mobile.webp',
    width: 1200,
    height: 1500,
  },
} as const;

export const homeHeroAlt:Record<Locale,string> = {
  ar: 'سجادة ضفاف في مساحة معمارية مضاءة طبيعيًا',
  en: 'Riverbank rug in a naturally lit architectural space',
  tr: 'Doğal ışıklı mimari bir mekânda Nehir Kıyısı halısı',
};

export const heroCandidateCodes = [
  'BMC-MOD-004',
  'BMC-MOD-005',
  'BMC-MOD-003',
  'BMC-MOD-002',
  'BMC-MOD-001',
  'BMC-MCL-008',
  'BMC-MCL-009',
  'BMC-CLS-019',
] as const;
