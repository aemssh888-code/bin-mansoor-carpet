import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');

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
