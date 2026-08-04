import { useRef }   from 'react';
import { useGSAP }  from '@gsap/react';
import gsap         from 'gsap';

type MarqueeStripProps = {
  items?: string[];
  speed?: number;
  dark?: boolean;
};

export function MarqueeStrip({ items = [], speed = 22, dark = true }: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const track  = trackRef.current;
    if (!track) return;

    const halfW  = track.scrollWidth / 2;

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x:        -halfW,
        duration: speed,
        repeat:   -1,
        ease:     'none',
      }
    );
  });

  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden py-4 ${dark ? 'bg-ink' : 'bg-accent'}`}
      aria-hidden
    >
      <div ref={trackRef} className="flex items-center whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span
              className={`font-display text-2xl px-7
                ${dark ? 'text-cream' : 'text-ink'}`}
            >
              {item}
            </span>
            <span
              className={`text-xl ${dark ? 'text-accent' : 'text-ink/30'}`}
            >
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
