import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { FLAVORS } from '../../data/flavors';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [bagAnim, setBagAnim] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const items = useCartStore(s => s.items);
  const total = useCartStore(s => s.total);
  const clear = useCartStore(s => s.clear);
  const prevTotalRef = useRef(0);
  const bagRef = useRef<HTMLDivElement | null>(null);
  const bagItems = FLAVORS
    .map(flavor => ({ ...flavor, qty: items[flavor.id] || 0 }))
    .filter(item => item.qty > 0);

  useEffect(() => {
    if (total > 0 && total !== prevTotalRef.current) {
      prevTotalRef.current = total;
      setBagAnim(true);
      const t = setTimeout(() => setBagAnim(false), 450);
      return () => clearTimeout(t);
    }
  }, [total]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent): void {
      if (bagRef.current && event.target instanceof Node && !bagRef.current.contains(event.target)) setBagOpen(false);
    }

    function onKey(event: KeyboardEvent): void {
      if (event.key === 'Escape') setBagOpen(false);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,248,238,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #EFE1C7' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: 80 }}>

        <Link to="/" aria-label="Whirl home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            style={{ width: 38, height: 38, display: 'block', filter: 'drop-shadow(0 3px 0 rgba(43,27,18,0.14))' }}
          />
          <span style={{ fontFamily: 'Chewy, cursive', fontSize: 30, color: '#2B1B12', WebkitTextStroke: '2px white', paintOrder: 'stroke fill' }}>
            Whirl
          </span>
        </Link>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
          <a href="/#flavors" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: '#2B1B12', textDecoration: 'none' }}>
            Flavors
          </a>
          <NavLink to="/story" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: '#2B1B12', textDecoration: 'none' }}>
            Our Story
          </NavLink>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div ref={bagRef} style={{ position: 'relative' }}>
            <button
              type="button"
              aria-label="Open shopping bag"
              aria-expanded={bagOpen}
              onClick={() => setBagOpen(p => !p)}
              style={{
                position: 'relative', width: 40, height: 40,
                borderRadius: '50%', border: bagOpen ? '1px solid #EFE1C7' : '1px solid transparent', background: bagOpen ? '#FFFFFF' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2B1B12',
                transform: bagAnim ? 'scale(1.28)' : 'scale(1)',
                transition: 'transform 0.22s ease, background 0.2s ease, border-color 0.2s ease',
                boxShadow: bagOpen ? '0 8px 18px rgba(43,27,18,0.08)' : 'none',
              }}
            >
              <ShoppingBag size={18} />
              {total > 0 && (
                <span style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, background: '#FF6F91', color: 'white', fontSize: 9, fontWeight: 800, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito, sans-serif' }}>
                  {total > 9 ? '9+' : total}
                </span>
              )}
            </button>

            {bagOpen && (
              <div style={{ position: 'absolute', top: 50, right: 0, width: 280, maxWidth: 'calc(100vw - 32px)', background: '#FFFFFF', border: '1px solid #EFE1C7', borderRadius: 8, boxShadow: '0 18px 45px rgba(43,27,18,0.16)', padding: 16, fontFamily: 'Nunito, sans-serif' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                  <div>
                    <p style={{ margin: 0, fontFamily: 'Chewy, cursive', fontSize: 22, color: '#2B1B12', lineHeight: 1 }}>Your Bag</p>
                    <p style={{ margin: '3px 0 0', fontSize: 11, fontWeight: 800, color: '#8A7560', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {total ? `${total} ${total === 1 ? 'treat' : 'treats'} tucked in` : 'Ready for a whirl'}
                    </p>
                  </div>

                  {total > 0 && (
                    <button
                      type="button"
                      aria-label="Clear shopping bag"
                      onClick={clear}
                      style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #EFE1C7', background: '#FFF8EE', color: '#8A7560', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                {total > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                    {bagItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 32, height: 32, borderRadius: '50%', background: item.color, color: 'white', fontFamily: 'Chewy, cursive', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {item.short[0]}
                        </span>
                        <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 800, color: '#2B1B12', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 900, color: '#FF6F91' }}>x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.55, color: '#8A7560' }}>
                    Pick a flavor and it will show up here with a tiny pop.
                  </p>
                )}

                <a
                  href="/#flavors"
                  onClick={() => setBagOpen(false)}
                  style={{ display: 'block', width: '100%', padding: '11px 14px', borderRadius: 99, background: '#2B1B12', color: '#FFF8EE', fontWeight: 900, fontSize: 13, textAlign: 'center', textDecoration: 'none', boxShadow: '0 5px 0 rgba(43,27,18,0.18)' }}
                >
                  {total > 0 ? 'Choose More Flavors' : 'Start Filling Bag'}
                </a>
              </div>
            )}
          </div>

          <a href="/#flavors" className="hidden md:block" style={{ padding: '10px 24px', borderRadius: 99, background: '#2B1B12', color: '#FFF8EE', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, textDecoration: 'none', boxShadow: '0 5px 0 rgba(43,27,18,0.18)' }}>
            Find a Whirl
          </a>

          <button onClick={() => setOpen(p => !p)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2B1B12', padding: 8 }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ padding: '16px 24px 20px', borderTop: '1px solid #EFE1C7', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <a href="/#flavors" onClick={() => setOpen(false)} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: '#2B1B12', textDecoration: 'none' }}>Flavors</a>
          <Link to="/story" onClick={() => setOpen(false)} style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 14, color: '#2B1B12', textDecoration: 'none' }}>Our Story</Link>
          <a href="/#flavors" onClick={() => setOpen(false)} style={{ padding: '10px 0', borderRadius: 99, background: '#2B1B12', color: '#FFF8EE', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 13, textDecoration: 'none', textAlign: 'center' }}>
            Find a Whirl
          </a>
        </div>
      )}
    </nav>
  );
}
