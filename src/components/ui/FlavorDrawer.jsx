import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Check }   from 'lucide-react';
import { useCartStore }            from '../../store/useCartStore';

export function FlavorDrawer({ flavor, onClose }) {
  const [addedId,  setAddedId]  = useState(null);
  const addToCart               = useCartStore(s => s.add);
  const added                   = addedId === flavor?.id;

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!flavor) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [flavor]);

  function handleAdd() {
    addToCart(flavor.id);
    setAddedId(flavor.id);
    setTimeout(() => {
      setAddedId(current => current === flavor.id ? null : current);
    }, 2200);
  }

  return (
    <AnimatePresence>
      {flavor && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(43,27,18,0.55)' }}
          />

          <motion.div
            key="drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type:'spring', damping:28, stiffness:280 }}
            onClick={e => e.stopPropagation()}
            style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:51, background:'#FFFFFF', borderRadius:'24px 24px 0 0', overflow:'hidden', display:'flex', flexDirection:'column', maxHeight:'88vh' }}
          >
            <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 6px' }}>
              <div style={{ width:40, height:4, borderRadius:99, background:'#EFE1C7' }} />
            </div>

            <div style={{ position:'relative', padding:'24px 24px 20px', background:flavor.color, flexShrink:0 }}>
              <div style={{ position:'absolute', inset:0, opacity:0.12, backgroundImage:'repeating-linear-gradient(45deg,white 0px,white 7px,transparent 7px,transparent 18px)' }} />
              <button
                type="button"
                aria-label="Close flavor details"
                onClick={onClose}
                style={{ position:'absolute', top:12, right:12, zIndex:2, width:40, height:40, padding:0, borderRadius:'50%', background:'rgba(0,0,0,0.22)', border:'1px solid rgba(255,255,255,0.24)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'white', lineHeight:0 }}
              >
                <X size={16} style={{ pointerEvents:'none' }} />
              </button>
              <p style={{ position:'relative', fontSize:10, fontWeight:800, color:'rgba(255,255,255,0.65)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'Nunito, sans-serif' }}>
                {flavor.badge || 'Whirl Pick'}
              </p>
              <h2 style={{ position:'relative', fontFamily:'Chewy, cursive', fontSize:30, color:'white', WebkitTextStroke:'1px rgba(0,0,0,0.1)', paintOrder:'stroke fill', marginBottom:4 }}>
                {flavor.name}
              </h2>
              <p style={{ position:'relative', fontSize:14, color:'rgba(255,255,255,0.78)', fontFamily:'Nunito, sans-serif' }}>
                {flavor.tagline}
              </p>
            </div>

            <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
              <p style={{ fontSize:14, color:'#8A7560', lineHeight:1.75, marginBottom:20, fontFamily:'Nunito, sans-serif' }}>
                {flavor.description}
              </p>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
                {[{ label:'Calories', value:flavor.cal },{ label:'Protein', value:flavor.protein }].map(m => (
                  <div key={m.label} style={{ background:'#FFF8EE', border:'1px solid #EFE1C7', borderRadius:16, padding:'14px 16px' }}>
                    <p style={{ fontFamily:'Chewy, cursive', fontSize:28, color:'#2B1B12', lineHeight:1 }}>{m.value}</p>
                    <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:4, fontFamily:'Nunito, sans-serif' }}>{m.label}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize:10, fontWeight:800, color:'#8A7560', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10, fontFamily:'Nunito, sans-serif' }}>
                What's Inside
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {flavor.ingredients.map(ing => (
                  <span key={ing} style={{ padding:'6px 14px', borderRadius:99, background:'#FFF8EE', border:'1px solid #EFE1C7', fontSize:12, fontWeight:700, color:'#2B1B12', fontFamily:'Nunito, sans-serif' }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding:'14px 24px 28px', borderTop:'1px solid #EFE1C7', flexShrink:0 }}>
              <motion.button
                onClick={handleAdd}
                animate={{ background: added ? '#16a34a' : '#2B1B12' }}
                transition={{ duration: 0.25 }}
                style={{ width:'100%', padding:'16px 0', borderRadius:99, border:'none', color:'#FFF8EE', fontFamily:'Nunito, sans-serif', fontWeight:800, fontSize:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 5px 0 rgba(43,27,18,0.18)' }}
              >
                {added
                  ? <><Check size={16} />Added to Bag!</>
                  : <><ShoppingBag size={16} />Add to Bag</>
                }
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
