import { useState } from 'react';
import { Link }     from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done,  setDone]  = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
  }

  return (
    <footer style={{ borderTop:'1px solid #EFE1C7', background:'#FFF8EE' }}>
      <div style={{ maxWidth:1152, margin:'0 auto', padding:'40px 40px 32px' }}>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24, paddingBottom:32, marginBottom:32, borderBottom:'1px solid #EFE1C7' }}>
          <div>
            <p style={{ fontFamily:'Chewy, cursive', fontSize:24, color:'#2B1B12', marginBottom:4 }}>Stay in the Whirl.</p>
            <p style={{ fontSize:13, color:'#8A7560', fontFamily:'Nunito, sans-serif' }}>New drops, real talk, zero spam.</p>
          </div>

          {done ? (
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 24px', borderRadius:99, background:'#2B1B12', color:'#FFF8EE', fontFamily:'Nunito, sans-serif', fontWeight:800 }}>
              <span style={{ color:'#FFC93C' }}>✓</span>
              You're in the Whirl!
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display:'flex', gap:8, maxWidth:360, flex:1 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ flex:1, padding:'12px 20px', borderRadius:99, border:'2px solid #EFE1C7', background:'#FFFFFF', fontFamily:'Nunito, sans-serif', fontSize:13, color:'#2B1B12', outline:'none' }}
              />
              <button type="submit" style={{ display:'flex', alignItems:'center', gap:6, padding:'12px 20px', borderRadius:99, background:'#2B1B12', color:'#FFF8EE', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:13, border:'none', cursor:'pointer', flexShrink:0, boxShadow:'0 4px 0 rgba(43,27,18,0.18)' }}>
                Join <ArrowRight size={13} />
              </button>
            </form>
          )}
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <Link to="/" aria-label="Whirl home" style={{ display:'flex', alignItems:'center', gap:9, textDecoration:'none' }}>
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden="true"
              style={{ width:32, height:32, display:'block', filter:'drop-shadow(0 3px 0 rgba(43,27,18,0.12))' }}
            />
            <span style={{ fontFamily:'Chewy, cursive', fontSize:22, color:'#2B1B12', WebkitTextStroke:'2px white', paintOrder:'stroke fill' }}>Whirl</span>
          </Link>
          <div style={{ display:'flex', gap:28 }}>
            <a href="/#flavors" style={{ fontSize:12, fontWeight:700, color:'#8A7560', textDecoration:'none', fontFamily:'Nunito, sans-serif' }}>Flavors</a>
            <Link to="/story"   style={{ fontSize:12, fontWeight:700, color:'#8A7560', textDecoration:'none', fontFamily:'Nunito, sans-serif' }}>Our Story</Link>
          </div>
          <p style={{ fontSize:12, color:'#C2B29C', fontFamily:'Nunito, sans-serif' }}>© 2026 Whirl Snacks.</p>
        </div>
      </div>
    </footer>
  );
}
