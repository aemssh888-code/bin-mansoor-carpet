import publication from './wtw-publication.json';

// Public editorial layer only. Approved source models and their colourways live in
// wtw-catalog-data.json; the existing full-catalog order lives in wtw-presentation.ts.
export const wtwCuratedOrder = [
 'WTW-006','WTW-015','WTW-058','WTW-002','WTW-051','WTW-009',
 'WTW-050','WTW-010','WTW-057','WTW-013','WTW-045','WTW-052',
 'WTW-016','WTW-054','WTW-003','WTW-044','WTW-055','WTW-017',
 'WTW-019','WTW-061','WTW-014','WTW-059','WTW-011','WTW-053',
] as const;

export const wtwPublication = publication;
