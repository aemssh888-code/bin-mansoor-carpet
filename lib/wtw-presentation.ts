// Customer-facing merchandising only. Source grouping, codes and preview membership
// remain in wtw-catalog-data.json and the approved analysis files.
const selections = [
  ['WTW-006', 'C01'], ['WTW-015', 'C03'], ['WTW-058', 'C02'],
  ['WTW-002', 'C02'], ['WTW-051', 'C01'], ['WTW-009', 'C02'],
  ['WTW-050', 'C01'], ['WTW-010', 'C05'], ['WTW-057', 'C02'],
  ['WTW-013', 'C05'], ['WTW-045', 'C02'], ['WTW-004', 'C04'],
  ['WTW-067', 'C01'], ['WTW-016', 'C01'], ['WTW-022', 'C01'],
  ['WTW-062', 'C01'], ['WTW-003', 'C03'], ['WTW-047', 'C01'],
  ['WTW-023', 'C01'], ['WTW-001', 'C04'], ['WTW-008', 'C04'],
  ['WTW-012', 'C03'], ['WTW-025', 'C01'], ['WTW-028', 'C01'],
  ['WTW-017', 'C01'], ['WTW-011', 'C01'], ['WTW-020', 'C01'],
  ['WTW-029', 'C01'], ['WTW-054', 'C01'], ['WTW-044', 'C01'],
  ['WTW-024', 'C01'], ['WTW-030', 'C01'], ['WTW-014', 'C02'],
  ['WTW-019', 'C02'], ['WTW-026', 'C01'], ['WTW-031', 'C01'],
  ['WTW-056', 'C02'], ['WTW-065', 'C01'], ['WTW-032', 'C01'],
  ['WTW-033', 'C01'], ['WTW-059', 'C02'], ['WTW-052', 'C01'],
  ['WTW-034', 'C01'], ['WTW-035', 'C01'], ['WTW-042', 'C01'],
  ['WTW-018', 'C04'], ['WTW-036', 'C01'], ['WTW-037', 'C01'],
  ['WTW-061', 'C01'], ['WTW-064', 'C01'], ['WTW-038', 'C01'],
  ['WTW-039', 'C01'], ['WTW-053', 'C01'], ['WTW-046', 'C01'],
  ['WTW-040', 'C01'], ['WTW-041', 'C01'], ['WTW-021', 'C01'],
  ['WTW-063', 'C01'], ['WTW-043', 'C01'], ['WTW-048', 'C01'],
  ['WTW-055', 'C01'], ['WTW-066', 'C01'], ['WTW-049', 'C01'],
  ['WTW-060', 'C01'], ['WTW-027', 'C01'],
] as const;

export const wtwFeaturedOrder = ['WTW-017', 'WTW-016', 'WTW-003', 'WTW-008'] as const;
const featuredCodes = new Set<string>(wtwFeaturedOrder);

export const wtwPresentation = selections.map(([code, colour], index) => ({
  code,
  representativeColourwayCode: `${code}-${colour}`,
  displayOrder: index + 1,
  featured: featuredCodes.has(code),
}));
