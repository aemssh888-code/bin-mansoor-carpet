'use client';

import {ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {useCallback,useEffect,useRef,useState} from 'react';

const SLIDE_DURATION=6500;
type MediaAsset={avif:string;src:string;width:number;height:number};

export type HomeHeroSlide={
  productCode:string;
  name:string;
  href:string;
  alt:string;
  direction:string;
  desktop:MediaAsset;
  mobile:MediaAsset;
};

type Labels={region:string;previous:string;next:string;explore:string};

export function HomeHeroCampaign({slides,labels}:{slides:HomeHeroSlide[];labels:Labels}) {
  const [active,setActive]=useState(0);
  const [cycle,setCycle]=useState(0);
  const [paused,setPaused]=useState(false);
  const [pageVisible,setPageVisible]=useState(true);
  const [loaded,setLoaded]=useState<Set<number>>(()=>new Set([0]));
  const pointerStart=useRef<{x:number;y:number}|null>(null);
  const didSwipe=useRef(false);

  const select=useCallback((next:number)=>{
    const normalized=(next+slides.length)%slides.length;
    setLoaded(current=>new Set(current).add(normalized).add((normalized+1)%slides.length));
    setActive(normalized);
    setCycle(value=>value+1);
  },[slides.length]);

  useEffect(()=>{
    const timers=[700,2400,4100].map((delay,index)=>window.setTimeout(()=>{
      setLoaded(current=>new Set(current).add((index+1)%slides.length));
    },delay));
    return ()=>timers.forEach(timer=>window.clearTimeout(timer));
  },[slides.length]);

  useEffect(()=>{
    const onVisibility=()=>setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange',onVisibility);
    return ()=>document.removeEventListener('visibilitychange',onVisibility);
  },[]);

  useEffect(()=>{
    if(paused||!pageVisible||slides.length<2) return;
    const timer=window.setTimeout(()=>select(active+1),SLIDE_DURATION);
    return ()=>window.clearTimeout(timer);
  },[active,cycle,pageVisible,paused,select,slides.length]);

  const onKeyDown=(event:React.KeyboardEvent<HTMLElement>)=>{
    if(event.key==='ArrowLeft') {event.preventDefault();select(active-1);}
    if(event.key==='ArrowRight') {event.preventDefault();select(active+1);}
  };

  const onPointerDown=(event:React.PointerEvent<HTMLElement>)=>{
    if(event.pointerType==='mouse') return;
    pointerStart.current={x:event.clientX,y:event.clientY};
  };

  const onPointerUp=(event:React.PointerEvent<HTMLElement>)=>{
    const start=pointerStart.current;
    pointerStart.current=null;
    if(!start) return false;
    const dx=event.clientX-start.x;
    const dy=event.clientY-start.y;
    if(Math.abs(dx)>44&&Math.abs(dx)>Math.abs(dy)) {
      select(dx<0?active+1:active-1);
      return true;
    }
    return false;
  };

  const current=slides[active];
  const progressPaused=paused||!pageVisible;

  return <section
    className="hero-art hero-campaign"
    aria-label={labels.region}
    data-active-slide={active+1}
  >
    <button
      type="button"
      className="hero-campaign-reveal"
      aria-label={labels.next}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={event=>{didSwipe.current=onPointerUp(event);}}
      onPointerCancel={()=>{pointerStart.current=null;}}
      onClick={()=>{
        if(didSwipe.current) {didSwipe.current=false;return;}
        select(active+1);
      }}
    >
      <div className="hero-campaign-stage" aria-live="off">
        {slides.map((slide,index)=><div
          key={slide.productCode}
          className={`hero-campaign-slide ${index===active?'is-active':''}`}
          aria-hidden={index!==active}
          data-slide-index={index+1}
          data-loaded={loaded.has(index)}
        >
          {loaded.has(index)&&<div className={`hero-campaign-drift hero-campaign-drift-${slide.direction}`}>
            <picture className="hero-campaign-picture">
              <source media="(max-width: 767px)" type="image/avif" srcSet={slide.mobile.avif}/>
              <source media="(max-width: 767px)" srcSet={slide.mobile.src}/>
              <source media="(min-width: 768px)" type="image/avif" srcSet={slide.desktop.avif}/>
              <source media="(min-width: 768px)" srcSet={slide.desktop.src}/>
              <img src={slide.desktop.src} width={slide.desktop.width} height={slide.desktop.height} alt={slide.alt} loading={index<2?'eager':'lazy'} fetchPriority={index===0?'high':'auto'} decoding="async" sizes="(max-width:767px) 100vw, (max-width:1023px) calc(100vw - 4rem), 65vw"/>
            </picture>
            <span className="hero-campaign-light" aria-hidden="true"/>
          </div>}
        </div>)}
      </div>
    </button>

    <div className="hero-campaign-ui" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="hero-campaign-progress" aria-hidden="true"><span key={`${active}-${cycle}`} className={progressPaused?'is-paused':''}/></div>
      <div className="hero-campaign-meta">
        <span className="hero-art-index" aria-hidden="true"><bdi dir="ltr">{String(active+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</bdi></span>
        <div className="hero-art-caption"><span>{current.name}</span><bdi>{current.productCode}</bdi></div>
        <a href={current.href} className="hero-campaign-explore">{labels.explore}<ArrowUpRight className="size-4"/></a>
        <div className="hero-campaign-controls">
          <button type="button" onClick={()=>select(active-1)} aria-label={labels.previous}><ArrowLeft/></button>
          <button type="button" onClick={()=>select(active+1)} aria-label={labels.next}><ArrowRight/></button>
        </div>
      </div>
    </div>
  </section>;
}
