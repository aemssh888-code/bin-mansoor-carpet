'use client';

import {useState} from 'react';
import {CatalogImage} from './catalog-image';
import type {CatalogImage as CatalogImageData} from '@/lib/products';
import {homeHeroMedia} from '@/lib/presentation';

export function HomeHeroMedia({fallback,alt}:{fallback:CatalogImageData;alt:string}) {
  const [useFallback,setUseFallback]=useState(false);

  if(useFallback) {
    return <div className="hero-media-fallback"><CatalogImage asset={fallback} alt={alt} priority sizes="(max-width:767px) 100vw, (max-width:1023px) calc(100vw - 4rem), 65vw" className="h-full w-full object-cover"/></div>;
  }

  return <div className="hero-media-reveal" data-media-type={homeHeroMedia.type}>
    <div className="hero-media-drift">
      <div className="hero-media-hover">
        <picture className="hero-media-picture">
          <source media="(max-width: 767px)" type="image/avif" srcSet={homeHeroMedia.mobile.avif}/>
          <source media="(max-width: 767px)" srcSet={homeHeroMedia.mobile.src}/>
          <source media="(min-width: 768px)" type="image/avif" srcSet={homeHeroMedia.desktop.avif}/>
          <source media="(min-width: 768px)" srcSet={homeHeroMedia.desktop.src}/>
          <img src={homeHeroMedia.desktop.src} width={homeHeroMedia.desktop.width} height={homeHeroMedia.desktop.height} alt={alt} loading="eager" fetchPriority="high" decoding="async" sizes="(max-width:767px) 100vw, (max-width:1023px) calc(100vw - 4rem), 65vw" onError={()=>setUseFallback(true)}/>
        </picture>
      </div>
    </div>
  </div>;
}
