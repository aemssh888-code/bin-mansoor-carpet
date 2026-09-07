import type { CatalogImage as ImageData } from '@/lib/products';
export function CatalogImage({asset, alt, className='', priority=false, sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'}: {asset: ImageData; alt: string; className?: string; priority?: boolean; sizes?: string}) {
  return <img src={asset.image} srcSet={asset.sources.map(s=>`${s.src} ${s.width}w`).join(', ')} sizes={sizes} width={asset.width} height={asset.height} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" className={className}/>;
}
