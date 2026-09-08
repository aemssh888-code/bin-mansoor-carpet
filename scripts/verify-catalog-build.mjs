import assert from 'node:assert/strict';
import { readFile, access, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

// This is the approved release contract, not a second product dataset.
const raw = await readFile('lib/catalog-data.json', 'utf8');
const products = JSON.parse(raw);
const locales = ['ar', 'en', 'tr'];
const output = path.resolve('dist/client');
assert.equal(products.length, 43, 'Approved release must contain 43 models');
assert.equal(new Set(products.map(p => p.binMansoorCode)).size, 43, 'Duplicate model codes');
assert.equal(new Set(products.map(p => p.slug)).size, 43, 'Duplicate slugs');
const colors = products.flatMap(p => p.colorways);
assert.equal(colors.length, 81, 'Approved release must contain 81 colorways');
assert.equal(new Set(colors.map(c => c.code)).size, 81, 'Duplicate colorway codes');
const forbidden = /نموذج تجريبي|Version 1 prototype|ثلاث لغات تصميم|قدرة إنتاجية|prototip/i;
let productUrls = 0;
for (const p of products) {
  assert.equal(p.classificationStatus, 'approved');
  assert.equal(p.slug, p.binMansoorCode.toLowerCase());
  assert.ok(p.originalCode);
  for (const locale of locales) {
    for (const field of ['name', 'category', 'collection', 'style']) assert.ok(p[field][locale], `${p.id}: ${field}/${locale}`);
    const html = await readFile(path.join(output, locale, 'products', `${p.slug}.html`), 'utf8');
    assert.ok(html.includes(p.binMansoorCode) && html.includes(p.name[locale]), `Wrong product: ${locale}/${p.slug}`);
    assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`));
    assert.ok(!forbidden.test(html), `Prototype copy: ${locale}/${p.slug}`);
    await access(path.join(output, locale, 'products', p.slug, 'index.html'));
    productUrls++;
  }
  for (const c of p.colorways) {
    assert.ok(c.code.startsWith(`${p.binMansoorCode}-C`));
    for (const image of c.sources) await access(path.join(output, image.src));
  }
}
for (const locale of locales) {
  for (const route of ['', '/products', '/about', '/contact', '/quote']) {
    const html = await readFile(path.join(output, `${locale}${route}.html`), 'utf8');
    assert.ok(!forbidden.test(html), `Prototype copy: ${locale}${route}`);
    if (route === '/products') {
      for (const p of products) assert.ok(html.includes(p.binMansoorCode), `Catalog missing ${p.id}`);
    }
  }
}
const robots=await readFile(path.join(output,'robots.txt'),'utf8');
assert.match(robots,/User-agent: \*/);
assert.match(robots,/Allow: \//);
assert.match(robots,/https:\/\/bin-mansoor-carpet\.vercel\.app\/sitemap\.xml/);
const sitemap=await readFile(path.join(output,'sitemap.xml'),'utf8');
const sitemapLocations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
const productLocations=sitemapLocations.filter(url=>/\/(ar|en|tr)\/products\/bmc-(mod|mcl|cls)-\d+$/.test(url));
assert.equal(productLocations.length,129,'Sitemap must contain 129 localized product routes');
assert.equal(sitemapLocations.length,locales.length*(5+products.length),'Sitemap route count mismatch');
for(const p of products)for(const locale of locales)assert.ok(productLocations.includes(`https://bin-mansoor-carpet.vercel.app/${locale}/products/${p.slug}`),`Sitemap missing ${locale}/${p.slug}`);
const commit = process.env.VERCEL_GIT_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
const identity = {
  repository: 'aemssh888-code/bin-mansoor-carpet',
  branch: process.env.VERCEL_GIT_COMMIT_REF || execFileSync('git', ['branch', '--show-current'], {encoding: 'utf8'}).trim(),
  commit,
  environment: process.env.VERCEL_ENV || 'local',
  models: products.length,
  colorways: colors.length,
  productUrls,
  catalogSha256: createHash('sha256').update(raw).digest('hex'),
};
// Public deployment identity contains no original filesystem paths or private data.
await writeFile(path.join(output, 'deployment-info.json'), JSON.stringify(identity, null, 2));
console.log('Catalog build verified:', JSON.stringify(identity));
