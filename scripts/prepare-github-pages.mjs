import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL??'https://bin-mansoor-carpet.vercel.app').replace(/\/$/,'');
const locales=['ar','en','tr'];

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(entryPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

for (const source of await collectHtmlFiles(outputDirectory)) {
  const relative = path.relative(outputDirectory, source);
  const locale=relative.split(/[\\/]/)[0].replace(/\.html$/,'');
  if(['ar','en','tr'].includes(locale)){
    const html=await readFile(source,'utf8');
    await writeFile(source,html.replace(/<html\b[^>]*>/,`<html lang="${locale}" dir="${locale==='ar'?'rtl':'ltr'}">`));
  }
  if (relative === 'index.html' || relative === '404.html' || path.basename(source) === 'index.html') {
    continue;
  }

  const destinationDirectory = source.slice(0, -'.html'.length);
  await mkdir(destinationDirectory, { recursive: true });
  await copyFile(source, path.join(destinationDirectory, 'index.html'));
}

const products=JSON.parse(await readFile('lib/catalog-data.json','utf8'));
const routes=['','/products','/about','/contact','/quote',...products.map(product=>`/products/${product.slug}`)];
const escapeXml=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
const sitemapEntries=locales.flatMap(locale=>routes.map(route=>{
  const url=`${siteUrl}/${locale}${route}`;
  const alternates=[...locales.map(language=>`    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(`${siteUrl}/${language}${route}`)}" />`),`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}/ar${route}`)}" />`].join('\n');
  return `  <url>\n    <loc>${escapeXml(url)}</loc>\n${alternates}\n    <changefreq>monthly</changefreq>\n    <priority>${route===''?'1.0':'0.7'}</priority>\n  </url>`;
}));
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
await writeFile(path.join(outputDirectory,'sitemap.xml'),sitemap);
await writeFile(path.join(outputDirectory,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
