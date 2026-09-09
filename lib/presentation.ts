import type {Category} from './products';

export const sitePresentation = {
  heroProductCode: 'BMC-MOD-004',
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
