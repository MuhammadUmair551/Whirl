import { useRef }              from 'react';
import { useGSAP }             from '@gsap/react';
import { gsap }                from '../../lib/gsap';

const PROOF = [
  { value: '04',   label: 'Bold Flavors',        color: '#FF6F91' },
  { value: '100%', label: 'Real Ingredients',    color: '#FFC93C' },
  { value: '0g',   label: 'Artificial Anything', color: '#FFA63D' },
  { value: '01',   label: 'Batch at a Time',     color: '#C17F3E' },
];

export function ProofNumbers() {
  const sectionRef = useRef(null);
  const itemRefs   = useRef([]);

  useGSAP(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 44 },
        {
          opacity:  1,
          y:        0,
          duration: 0.65,
          delay:    i * 0.1,
          ease:     'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 78%',
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ background: '#2B1B12' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {PROOF.map((item, i) => (
            <div
              key={item.label}
              ref={el => (itemRefs.current[i] = el)}
              style={{
                textAlign:   'center',
                padding:     '56px 24px',
                borderRight: i < PROOF.length - 1
                  ? '1px solid rgba(255,255,255,0.08)'
                  : 'none',
              }}
            >
              <p style={{
                fontFamily:      'Chewy, cursive',
                fontSize:        'clamp(3rem,7vw,5rem)',
                lineHeight:      1,
                color:           item.color,
                marginBottom:    8,
                WebkitTextStroke:'1.5px rgba(0,0,0,0.08)',
                paintOrder:      'stroke fill',
              }}>
                {item.value}
              </p>
              <p style={{
                fontSize:       10,
                fontWeight:     800,
                color:          'rgba(255,255,255,0.35)',
                textTransform:  'uppercase',
                letterSpacing:  '0.1em',
                fontFamily:     'Nunito, sans-serif',
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
