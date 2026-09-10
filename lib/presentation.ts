import type {Category} from './products';

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

export const homeHeroCampaign = [
  {
    productCode: 'BMC-MOD-004', direction: 'up-left',
    desktop: {avif: '/media/hero/campaign/slide-01-bmc-mod-004-desktop.avif', src: '/media/hero/campaign/slide-01-bmc-mod-004-desktop.webp', width: 2400, height: 1500},
    mobile: {avif: '/media/hero/campaign/slide-01-bmc-mod-004-mobile.avif', src: '/media/hero/campaign/slide-01-bmc-mod-004-mobile.webp', width: 1200, height: 1500},
    alt: {ar: 'سجادة ضفاف في مساحة معمارية مضاءة طبيعيًا', en: 'Riverbank rug in a naturally lit architectural space', tr: 'Doğal ışıklı mimari bir mekânda Nehir Kıyısı halısı'},
  },
  {
    productCode: 'BMC-MCL-001', direction: 'left',
    desktop: {avif: '/media/hero/campaign/slide-02-bmc-mcl-001-desktop.avif', src: '/media/hero/campaign/slide-02-bmc-mcl-001-desktop.webp', width: 2400, height: 1500},
    mobile: {avif: '/media/hero/campaign/slide-02-bmc-mcl-001-mobile.avif', src: '/media/hero/campaign/slide-02-bmc-mcl-001-mobile.webp', width: 1200, height: 1500},
    alt: {ar: 'سجادة شبكة في مساحة هندسية هادئة', en: 'Lattice rug in a calm geometric interior', tr: 'Sakin geometrik bir iç mekânda Kafes halısı'},
  },
  {
    productCode: 'BMC-MCL-008', direction: 'right',
    desktop: {avif: '/media/hero/campaign/slide-03-bmc-mcl-008-desktop.avif', src: '/media/hero/campaign/slide-03-bmc-mcl-008-desktop.webp', width: 2400, height: 1500},
    mobile: {avif: '/media/hero/campaign/slide-03-bmc-mcl-008-mobile.avif', src: '/media/hero/campaign/slide-03-bmc-mcl-008-mobile.webp', width: 1200, height: 1500},
    alt: {ar: 'سجادة رقع في منزل معاصر بطابع فني', en: 'Patchwork rug in an artful contemporary residence', tr: 'Sanatsal çağdaş bir konutta Kırkyama halısı'},
  },
  {
    productCode: 'BMC-CLS-019', direction: 'forward',
    desktop: {avif: '/media/hero/campaign/slide-04-bmc-cls-019-desktop.avif', src: '/media/hero/campaign/slide-04-bmc-cls-019-desktop.webp', width: 2400, height: 1500},
    mobile: {avif: '/media/hero/campaign/slide-04-bmc-cls-019-mobile.avif', src: '/media/hero/campaign/slide-04-bmc-cls-019-mobile.webp', width: 1200, height: 1500},
    alt: {ar: 'سجادة كرمة في مساحة كلاسيكية معاصرة', en: 'Vine rug in a contemporary classic interior', tr: 'Çağdaş klasik bir iç mekânda Asma halısı'},
  },
] as const;

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
