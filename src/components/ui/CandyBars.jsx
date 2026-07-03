import { useRef }    from 'react';
import { useGSAP }   from '@gsap/react';
import { gsap }      from '../../lib/gsap';

const BARS = [
  { name: 'Peanut Butter', color: '#C17F3E', rotate: -14, left: 10, top: 0   },
  { name: 'Strawberry',    color: '#FF6F91', rotate:  6,  left: 55, top: 65  },
  { name: 'Choco Fudge',   color: '#6B4226', rotate: -5,  left: 5,  top: 128 },
  { name: 'Mango',         color: '#FFA63D', rotate: 12,  left: 60, top: 188 },
];

export function CandyBars() {
  const barsRef = useRef([]);

  useGSAP(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.to(bar, {
        y:        -14,
        duration: 1.8 + i * 0.3,
        repeat:   -1,
        yoyo:     true,
        ease:     'sine.inOut',
        delay:    i * 0.4,
      });
      gsap.to(bar, {
        rotation: `+=${2 + i}`,
        duration: 2.4 + i * 0.3,
        repeat:   -1,
        yoyo:     true,
        ease:     'sine.inOut',
        delay:    i * 0.2,
      });
    });
  });

  return (
    <div style={{ position: 'relative', width: 280, height: 270, userSelect: 'none' }}>
      {BARS.map((bar, i) => (
        <div
          key={bar.name}
          ref={el => (barsRef.current[i] = el)}
          style={{
            position:     'absolute',
            width:        210,
            height:       64,
            background:   bar.color,
            borderRadius: 16,
            transform:    `rotate(${bar.rotate}deg)`,
            left:         bar.left,
            top:          bar.top,
            zIndex:       i + 1,
            boxShadow:    '0 10px 28px rgba(43,27,18,0.22)',
            overflow:     'hidden',
          }}
        >
          <div style={{
            position:            'absolute',
            inset:               0,
            opacity:             0.14,
            backgroundImage:     'repeating-linear-gradient(45deg,white 0px,white 6px,transparent 6px,transparent 16px)',
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 16px' }}>
            <span style={{ fontFamily: 'Chewy, cursive', fontSize: 17, color: 'white', WebkitTextStroke: '1px rgba(0,0,0,0.15)', paintOrder: 'stroke fill' }}>
              {bar.name}
            </span>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Chewy, cursive', color: 'white', fontSize: 12 }}>W</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}