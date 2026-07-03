import { useRef }              from 'react';
import { Link }                from 'react-router-dom';
import { useGSAP }             from '@gsap/react';
import { gsap }                from '../lib/gsap';
import { FLAVORS }             from '../data/flavors';

const MANIFESTO = [
  { line: 'Snacks should taste like snacks.',     sub: 'Not like a supplement dressed in a wrapper.',                                  align: 'left'  },
  { line: "Real food doesn't need a disclaimer.", sub: "If you need a chemistry degree to read the ingredients, that's a red flag.",   align: 'right' },
  { line: 'Boring is the worst flavor we know.',  sub: "We checked. It's worse than plain rice cake.",                                 align: 'left'  },
];

const TIMELINE = [
  { year: '2023', event: 'First batch made in a home kitchen. Disaster.'                                              },
  { year: '2023', event: "Second batch. Less disaster. Friends said 'actually good'."                                 },
  { year: '2024', event: 'Peanut Butter Whirl goes to a farmers market. Sells out in 40 minutes.'                    },
  { year: '2024', event: 'Strawberry and Fudge added. Still made in batches, not factories.'                          },
  { year: '2025', event: 'Mango joins the lineup. Four flavors. Still zero cardboard.'                                },
  { year: '2026', event: 'You found us. Welcome to the Whirl.'                                                        },
];

export default function About() {
  const pageRef       = useRef(null);
  const headRef       = useRef(null);
  const manifestoRefs = useRef([]);
  const timelineRefs  = useRef([]);

  useGSAP(() => {
    gsap.fromTo(headRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    manifestoRefs.current.forEach((el, i) => {
      if (!el) return;
      const x = MANIFESTO[i].align === 'right' ? 60 : -60;
      gsap.fromTo(el,
        { opacity: 0, x },
        { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } }
      );
    });

    timelineRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: i * 0.07, scrollTrigger: { trigger: el, start: 'top 88%' } }
      );
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>

      <section style={{ maxWidth:960, margin:'0 auto', padding:'80px 40px 64px' }}>
        <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:32, fontFamily:'Nunito, sans-serif' }}>
          Our Story
        </p>
        <div ref={headRef}>
          <h1 style={{ fontFamily:'Chewy, cursive', color:'#2B1B12', fontSize:'clamp(2.5rem,7vw,5.5rem)', lineHeight:1.06, marginBottom:20 }}>
            We were bored of<br />
            <span style={{ color:'#C17F3E', WebkitTextStroke:'2.5px #2B1B12', paintOrder:'stroke fill' }}>boring snacks.</span>
          </h1>
          <p style={{ fontSize:15, color:'#8A7560', maxWidth:480, lineHeight:1.75, fontFamily:'Nunito, sans-serif' }}>
            So we made our own. Started in a kitchen, ended up with four flavors that people actually want to eat.
          </p>
        </div>
      </section>

      <div style={{ display:'flex', height:12 }}>
        {FLAVORS.map(f => <div key={f.id} style={{ flex:1, background:f.color }} />)}
      </div>

      {/* ══ MANIFESTO ══ */}
      <section style={{ padding:'80px 40px', borderBottom:'1px solid #EFE1C7' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:56, fontFamily:'Nunito, sans-serif' }}>
            What we actually believe
          </p>
          {MANIFESTO.map((item, i) => (
            <div key={i} ref={el => (manifestoRefs.current[i] = el)} style={{ marginBottom:48, textAlign:item.align }}>
              <h2 style={{ fontFamily:'Chewy, cursive', color:'#2B1B12', fontSize:'clamp(1.8rem,4.5vw,3.5rem)', lineHeight:1.1, marginBottom:10 }}>
                {item.line}
              </h2>
              <p style={{ fontSize:14, color:'#8A7560', maxWidth:400, lineHeight:1.7, fontFamily:'Nunito, sans-serif', display:'inline-block' }}>
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:'80px 40px', background:'#FFF8EE' }}>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:48, fontFamily:'Nunito, sans-serif' }}>
            How it happened
          </p>
          {TIMELINE.map((item, i) => (
            <div key={i} ref={el => (timelineRefs.current[i] = el)} style={{ display:'flex', gap:24, paddingBottom:36 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                <div style={{ width:12, height:12, borderRadius:'50%', flexShrink:0, marginTop:4, background: i === TIMELINE.length-1 ? '#FF6F91' : 'white', border:`2px solid ${i === TIMELINE.length-1 ? '#FF6F91' : '#2B1B12'}` }} />
                {i < TIMELINE.length - 1 && <div style={{ width:1, flex:1, background:'#EFE1C7', marginTop:6 }} />}
              </div>
              <div style={{ paddingBottom:8 }}>
                <span style={{ fontFamily:'Chewy, cursive', fontSize:20, color:'#8A7560' }}>{item.year}</span>
                <p style={{ fontSize:14, color:'#2B1B12', lineHeight:1.6, marginTop:2, fontFamily:'Nunito, sans-serif' }}>{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background:'#2B1B12', padding:'64px 40px' }}>
        <div style={{ maxWidth:1152, margin:'0 auto' }}>
          <p style={{ textAlign:'center', fontSize:10, fontWeight:800, color:'#FFC93C', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:40, fontFamily:'Nunito, sans-serif' }}>
            The Lineup
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginBottom:40 }}>
            {FLAVORS.map(f => (
              <div key={f.id} style={{ borderRadius:20, overflow:'hidden', background:f.color, position:'relative', border:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ position:'absolute', inset:0, opacity:0.12, backgroundImage:'repeating-linear-gradient(45deg,white 0px,white 7px,transparent 7px,transparent 18px)' }} />
                <div style={{ position:'relative', padding:20, textAlign:'center' }}>
                  <p style={{ fontFamily:'Chewy, cursive', fontSize:20, color:'white', WebkitTextStroke:'1px rgba(0,0,0,0.12)', paintOrder:'stroke fill', marginBottom:4 }}>{f.short}</p>
                  <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.7)', fontFamily:'Nunito, sans-serif' }}>{f.tagline}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link to="/" style={{ display:'inline-block', padding:'14px 32px', borderRadius:99, background:'#FFC93C', color:'#2B1B12', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:14, textDecoration:'none', boxShadow:'0 5px 0 rgba(43,27,18,0.2)' }}>
              Try a Flavor →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
