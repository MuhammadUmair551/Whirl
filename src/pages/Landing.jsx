import { useState, useRef }        from 'react';
import { Link }                    from 'react-router-dom';
import { useGSAP }                 from '@gsap/react';
import { gsap }                    from '../lib/gsap';
import { Sparkles, Leaf, Smile, Zap } from 'lucide-react';
import { CandyBars }               from '../components/ui/CandyBars';
import { ProofNumbers }            from '../components/ui/ProofNumbers';
import { FlavorCard }              from '../components/ui/FlavorCard';
import { FlavorDrawer }            from '../components/ui/FlavorDrawer';
import { FLAVORS }                 from '../data/flavors';

const STATEMENTS = [
  { num: '01', text: 'Real ingredients.',        color: '#FF6F91' },
  { num: '02', text: 'Actual flavor.',           color: '#FFA63D' },
  { num: '03', text: 'Not another protein bar.', color: '#C17F3E' },
];

const PERKS = [
  { icon: Leaf,     label: 'Pronounceable Ingredients' },
  { icon: Smile,    label: 'Actually Tastes Good'      },
  { icon: Zap,      label: '4 Bold Flavors'            },
  { icon: Sparkles, label: 'Swirled, Not Processed'    },
];

export default function Landing() {
  const pageRef     = useRef(null);
  const backdropRef = useRef(null);
  const badgeRef    = useRef(null);
  const taglineRef  = useRef(null);
  const ctaRef      = useRef(null);
  const barsRef     = useRef(null);
  const stmtRefs    = useRef([]);

  const [activeFlavor, setActiveFlavor] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(backdropRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.2 })
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.55, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.75')
      .fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.3')
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.25')
      .fromTo(barsRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5');

    stmtRefs.current.forEach(el => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, x: -64 },
        { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } }
      );
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>

      <section style={{ position:'relative', minHeight:'92vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'64px 24px', textAlign:'center', overflow:'hidden' }}>

        <div ref={backdropRef} aria-hidden style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', userSelect:'none' }}>
          <span style={{ fontFamily:'Chewy, cursive', fontSize:'clamp(130px,28vw,280px)', lineHeight:1, color:'rgba(43,27,18,0.030)' }}>
            WHIRL
          </span>
        </div>

        <div ref={barsRef} className="hidden lg:block" style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', paddingRight:48 }}>
          <CandyBars />
        </div>

        <div style={{ position:'relative', zIndex:10, maxWidth:640, display:'flex', flexDirection:'column', alignItems:'center' }}>

          <div ref={badgeRef} style={{ marginBottom:40 }}>
            <div style={{ position:'relative', display:'inline-block' }}>
              <div className="" style={{ position:'absolute', inset:0, borderRadius:99, border:'2px solid #FFC93C', opacity:0.5}} />
              <div style={{ position:'relative', display:'flex', alignItems:'center', gap:12, padding:'14px 32px', borderRadius:99, background:'#FFC93C', border:'2px solid #2B1B12', boxShadow:'4px 5px 0 #2B1B12' }}>
                <Sparkles size={18} color="#2B1B12" />
                <span style={{ fontFamily:'Chewy, cursive', fontSize:26, color:'#2B1B12' }}>4 Bold New Flavors</span>
                <Sparkles size={18} color="#2B1B12" />
              </div>
            </div>
            <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:12, fontFamily:'Nunito, sans-serif' }}>
              Just dropped · Try all four
            </p>
          </div>

          <h1 ref={taglineRef} style={{ fontFamily:'Chewy, cursive', color:'#2B1B12', lineHeight:1.06, fontSize:'clamp(2rem,5.5vw,3.8rem)', marginBottom:16 }}>
            Snacks that don't take<br />themselves too seriously.
          </h1>

          <p style={{ fontSize:14, color:'#8A7560', marginBottom:40, maxWidth:320, lineHeight:1.7, fontFamily:'Nunito, sans-serif' }}>
            Real ingredients, swirled into bars that actually taste like a treat. No cardboard. No apologies.
          </p>

          <div ref={ctaRef} style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
            <a href="#flavors" style={{ padding:'14px 32px', borderRadius:99, background:'#2B1B12', color:'#FFF8EE', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:14, textDecoration:'none', boxShadow:'0 6px 0 rgba(43,27,18,0.22)' }}>
              See Flavors
            </a>
            <Link to="/story" style={{ padding:'12px 28px', borderRadius:99, border:'2px solid #2B1B12', color:'#2B1B12', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:14, textDecoration:'none' }}>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <ProofNumbers />

      <section id="flavors" style={{ maxWidth:1152, margin:'0 auto', padding:'80px 40px' }}>
        <div style={{ marginBottom:56 }}>
          <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, fontFamily:'Nunito, sans-serif' }}>
            Pick Your Whirl
          </p>
          <h2 style={{ fontFamily:'Chewy, cursive', color:'#2B1B12', fontSize:'clamp(2.2rem,5vw,4rem)', lineHeight:1.05 }}>
            Four flavors.<br />
            <span style={{ color:'#FF6F91', WebkitTextStroke:'2px #2B1B12', paintOrder:'stroke fill' }}>Zero boring.</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
          {FLAVORS.map((f, i) => (
            <FlavorCard key={f.id} flavor={f} index={i} onTryFlavor={setActiveFlavor} />
          ))}
        </div>
      </section>

      <section style={{ maxWidth:960, margin:'0 auto', padding:'0 40px 80px' }}>
        <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:40, fontFamily:'Nunito, sans-serif' }}>
          The Whirl Promise
        </p>
        {STATEMENTS.map((s, i) => (
          <div key={s.num} ref={el => (stmtRefs.current[i] = el)} style={{ display:'flex', alignItems:'center', gap:'clamp(24px,5vw,48px)', padding:'32px 0', borderBottom:'1px solid #EFE1C7' }}>
            <span style={{ fontFamily:'Chewy, cursive', fontSize:'clamp(2.5rem,6vw,4.5rem)', lineHeight:1, color:s.color, WebkitTextStroke:'2px #2B1B12', paintOrder:'stroke fill', flexShrink:0 }}>
              {s.num}
            </span>
            <h3 style={{ fontFamily:'Chewy, cursive', fontSize:'clamp(1.6rem,4vw,3rem)', color:'#2B1B12', lineHeight:1.1 }}>
              {s.text}
            </h3>
          </div>
        ))}
      </section>

      <section style={{ background:'#2B1B12', padding:'64px 40px' }}>
        <div style={{ maxWidth:1152, margin:'0 auto' }}>
          <p style={{ textAlign:'center', fontSize:10, fontWeight:800, color:'#FFC93C', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:48, fontFamily:'Nunito, sans-serif' }}>
            Why Whirl
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:32 }}>
            {PERKS.map(p => (
              <div key={p.label} style={{ textAlign:'center' }}>
                <div style={{ width:44, height:44, borderRadius:14, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                  <p.icon size={18} color="#FFC93C" />
                </div>
                <p style={{ fontFamily:'Chewy, cursive', color:'#FFF8EE', fontSize:18 }}>{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'80px 24px', textAlign:'center', background:'#FFF8EE' }}>
        <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:20, fontFamily:'Nunito, sans-serif' }}>
          The story behind the swirl
        </p>
        <h2 style={{ fontFamily:'Chewy, cursive', color:'#2B1B12', fontSize:'clamp(2rem,5vw,3.5rem)', lineHeight:1.08, maxWidth:640, margin:'0 auto 16px' }}>
          "We started in a kitchen.<br />Not a lab."
        </h2>
        <p style={{ fontSize:14, color:'#8A7560', maxWidth:380, margin:'0 auto 40px', lineHeight:1.7, fontFamily:'Nunito, sans-serif' }}>
          Whirl began because every snack bar tasted like cardboard with a marketing budget.
          We thought: what if it actually tasted good?
        </p>
        <Link to="/story" style={{ display:'inline-block', padding:'14px 32px', borderRadius:99, background:'#FFC93C', color:'#2B1B12', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:14, textDecoration:'none', boxShadow:'0 6px 0 rgba(43,27,18,0.18)' }}>
          Read Our Story
        </Link>
      </section>

      <FlavorDrawer
        flavor={activeFlavor}
        onClose={() => setActiveFlavor(null)}
      />
    </div>
  );
}
