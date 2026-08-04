import { useRef }              from 'react';
import { useGSAP }             from '@gsap/react';
import { gsap }                from '../../lib/gsap';
import type { Flavor }         from '../../data/flavors';

type FlavorCardProps = {
  flavor: Flavor;
  index: number;
  onTryFlavor: (flavor: Flavor) => void;
};

export function FlavorCard({ flavor, index, onTryFlavor }: FlavorCardProps) {
  const cardRef  = useRef<HTMLDivElement | null>(null);
  const fillRef  = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef  = useRef<HTMLParagraphElement | null>(null);
  const btnRef   = useRef<HTMLButtonElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 64 },
      {
        opacity:  1,
        y:        0,
        duration: 0.75,
        delay:    index * 0.1,
        ease:     'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
      }
    );
  });

  function killHoverTweens() {
    gsap.killTweensOf([fillRef.current, titleRef.current, descRef.current, btnRef.current]);
  }

  function onEnter() {
    killHoverTweens();
    gsap.to(fillRef.current, { scaleY: 1, duration: 0.48, ease: 'power3.out' });
    gsap.to([titleRef.current, descRef.current], { color: '#FFF8EE', duration: 0.2, delay: 0.1 });
    gsap.to(btnRef.current, {
      color:           '#FFF8EE',
      borderColor:     'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(255,255,255,0.1)',
      duration:        0.2,
      delay:           0.1,
    });
  }

  function onLeave() {
    killHoverTweens();
    gsap.to(fillRef.current, { scaleY: 0, duration: 0.4, ease: 'power3.in' });
    gsap.to([titleRef.current, descRef.current], { color: '#2B1B12', duration: 0.18 });
    gsap.to(btnRef.current, {
      color:           '#2B1B12',
      borderColor:     '#2B1B12',
      backgroundColor: 'transparent',
      duration:        0.18,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ background:'#FFFFFF', borderRadius:24, overflow:'hidden', border:'1px solid #EFE1C7', cursor:'pointer', position:'relative' }}
    >
      <div
        ref={fillRef}
        style={{
          position:        'absolute',
          inset:           0,
          background:      flavor.color,
          transform:       'scaleY(0)',
          transformOrigin: 'bottom',
          zIndex:          1,
          pointerEvents:   'none',
        }}
      />

      <div style={{ position:'relative', height:160, background:flavor.color, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', zIndex:2 }}>
        <div style={{ position:'absolute', inset:0, opacity:0.14, backgroundImage:'repeating-linear-gradient(45deg,white 0px,white 7px,transparent 7px,transparent 18px)' }} />
        <span aria-hidden style={{ position:'absolute', fontFamily:'Chewy, cursive', fontSize:130, color:'white', opacity:0.18, lineHeight:1, bottom:-16, right:8, userSelect:'none', pointerEvents:'none' }}>
          {flavor.short[0]}
        </span>
        <span style={{ position:'relative', zIndex:3, fontFamily:'Chewy, cursive', fontSize:22, color:'white', padding:'8px 20px', borderRadius:99, background:'rgba(0,0,0,0.18)', backdropFilter:'blur(4px)', WebkitTextStroke:'1px rgba(0,0,0,0.12)', paintOrder:'stroke fill' }}>
          {flavor.short}
        </span>
        {flavor.badge && (
          <span style={{ position:'absolute', top:12, right:12, zIndex:3, fontSize:9, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em', padding:'3px 9px', borderRadius:99, background:'rgba(255,255,255,0.92)', color:'#2B1B12', fontFamily:'Nunito, sans-serif' }}>
            {flavor.badge}
          </span>
        )}
      </div>

      <div style={{ padding:20, position:'relative', zIndex:2 }}>
        <h3 ref={titleRef} style={{ fontFamily:'Chewy, cursive', fontSize:20, color:'#2B1B12', marginBottom:4 }}>
          {flavor.name}
        </h3>
        <p ref={descRef} style={{ fontSize:12, color:'#8A7560', lineHeight:1.6, marginBottom:14, fontFamily:'Nunito, sans-serif' }}>
          {flavor.tagline}
        </p>
        <button
          ref={btnRef}
          onClick={() => onTryFlavor(flavor)}
          style={{ width:'100%', padding:'10px 0', borderRadius:99, border:'2px solid #2B1B12', background:'transparent', color:'#2B1B12', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:12, cursor:'pointer', boxShadow:'0 3px 0 rgba(43,27,18,0.12)' }}
        >
          Try This Flavor
        </button>
      </div>
    </div>
  );
}
