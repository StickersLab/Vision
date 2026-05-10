import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FCHK } from '../components/Icons'
import { REPAS, SHAKES } from '../data/nutrition'

const DAILY_SCHEDULE = [
  {t:'6h20', l:'Petit-déjeuner',  k:'700',  c:'#F0A050'},
  {t:'10h00',l:'Shake #1',        k:'420',  c:'#5BB8F5'},
  {t:'12h30',l:'Déjeuner',        k:'750',  c:'#8BE8C8'},
  {t:'15h30',l:'Shake #2',        k:'390',  c:'#5BB8F5'},
  {t:'18h30',l:'Pré-workout',     k:'200',  c:'#F06080'},
  {t:'19h25',l:'Recovery shake',  k:'200',  c:'#B8A0F8'},
  {t:'20h00',l:'Dîner',           k:'650',  c:'#C8F04A'},
  {t:'21h30',l:'Casein (si faim)',k:'200',  c:'#444'},
]

export default function AlimScreen() {
  const { state, dispatch } = useApp()
  const [tab, setTab]           = useState('macros')
  const [copied, setCopied]     = useState(false)
  // État local pour ajouter un item par catégorie
  const [addState, setAddState] = useState({}) // { catIdx: { name:'', qty:'' } }

  const coursesData = state.coursesData
  const cdone = Object.values(state.courses).filter(Boolean).length
  const ctotal = coursesData.reduce((a, c) => a + c.items.length, 0)

  function togCourse(key) { dispatch({ type:'TOG_COURSE', key }) }
  function clearAll()     { dispatch({ type:'CLEAR_COURSES' }) }

  function delItem(catIdx, itemIdx) {
    dispatch({ type:'DEL_COURSE_ITEM', catIdx, itemIdx })
  }

  function addItem(catIdx) {
    const { name='', qty='' } = addState[catIdx] || {}
    if (!name.trim()) return
    dispatch({ type:'ADD_COURSE_ITEM', catIdx, name: name.trim(), qty: qty.trim() })
    setAddState(s => ({ ...s, [catIdx]: { name:'', qty:'' } }))
  }

  function setAdd(catIdx, field, value) {
    setAddState(s => ({ ...s, [catIdx]: { ...(s[catIdx]||{}), [field]: value } }))
  }

  // ── Copy to notes (fix) ─────────────────────────────────────────────────────
  function copyCourses() {
    const lines = ['📋 LISTE DE COURSES — Vision.', '']
    coursesData.forEach((cat, ci) => {
      const checked = cat.items.filter((_, ii) => state.courses[`${ci}-${ii}`])
      if (checked.length) {
        lines.push(cat.cat.toUpperCase())
        checked.forEach(it => lines.push(`☐ ${it.n}${it.q ? ' — ' + it.q : ''}`))
        lines.push('')
      }
    })
    lines.push(`Généré le ${new Date().toLocaleDateString('fr-FR')} · Vision.`)
    const txt = lines.join('\n')

    function onSuccess() {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }

    // Méthode moderne (HTTPS / localhost)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(onSuccess).catch(fallback)
    } else {
      fallback()
    }

    function fallback() {
      try {
        const ta = document.createElement('textarea')
        ta.value = txt
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        onSuccess()
      } catch {
        // Afficher le texte dans une alert en dernier recours
        alert(txt)
      }
    }
  }

  return (
    <>
      <div className="topbar">
        <div><div className="accent-line"></div><div className="app-name" style={{fontSize:'22px'}}>Alim</div></div>
        <div className="topbar-meta">PRISE<br/>DE MASSE</div>
      </div>

      <div className="tabs">
        {['macros','repas','collations','courses'].map((id, i) => (
          <button key={id} className={`tab${tab===id?' on':''}`} onClick={() => setTab(id)}>
            {['MACROS','REPAS','COLLATIONS','COURSES'][i]}
          </button>
        ))}
      </div>

      {/* ── MACROS ── */}
      {tab === 'macros' && (
        <>
          <div className="info-box">
            Profil : <strong style={{color:'var(--text)'}}>ectomorphe · course matin + muscu soir</strong>.
            +400 kcal/jour. 5-6 prises dont 3-4 liquides.
          </div>
          <div className="mg2">
            <div className="mc"><div className="mv">2900</div><div className="ml">KCAL / JOUR</div></div>
            <div className="mc"><div className="mv">118g</div><div className="ml">PROTÉINES MIN</div></div>
            <div className="mc"><div className="mv">363g</div><div className="ml">GLUCIDES</div></div>
            <div className="mc"><div className="mv">80g</div><div className="ml">LIPIDES</div></div>
          </div>
          <div className="slabel">RÉPARTITION JOURNÉE</div>
          <div className="card">
            {DAILY_SCHEDULE.map((r, i, a) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0',borderBottom:i<a.length-1?'0.5px solid var(--border)':'none'}}>
                <span style={{fontSize:'9px',color:'var(--text3)',width:'36px',flexShrink:0,fontFamily:"'DM Mono',monospace"}}>{r.t}</span>
                <span style={{fontSize:'13px',color:'var(--text2)',flex:1}}>{r.l}</span>
                <span style={{fontSize:'10px',fontWeight:'700',color:r.c,fontFamily:"'DM Mono',monospace"}}>{r.k} kcal</span>
              </div>
            ))}
            <div style={{textAlign:'right',paddingTop:'10px',fontFamily:"'Syne',sans-serif",fontSize:'14px',fontWeight:'700',color:'var(--accent)'}}>TOTAL : 2910 KCAL</div>
          </div>
        </>
      )}

      {/* ── REPAS ── */}
      {tab === 'repas' && (
        <>
          <div className="info-box">3 repas denses. Meal prep dimanche = zéro friction. ~40-45g protéines par repas.</div>
          {REPAS.map((meal, mi) => (
            <div key={mi} className="card" style={{marginBottom:'10px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <span style={{fontSize:'20px'}}>{meal.ic}</span>
                <span style={{fontSize:'13px',fontWeight:'600',color:meal.bc}}>{meal.n}</span>
              </div>
              {meal.items.map(([n, q, k], j, a) => (
                <div key={j} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:j<a.length-1?'0.5px solid var(--border)':'none'}}>
                  <span style={{fontSize:'13px',color:'var(--text2)'}}>{n}</span>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:'12px',color:'var(--text3)'}}>{q}</div>
                    <div style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{k}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}

      {/* ── COLLATIONS ── */}
      {tab === 'collations' && (
        <>
          <div className="info-box">3-4 collations liquides = +1000 kcal sans saturer l'estomac.</div>
          {SHAKES.map((s, i) => (
            <div key={i} className="smcard" style={{borderLeftColor:s.bc}}>
              <div className="smt">{s.t}</div>
              <div className="smk">{s.h}</div>
              <div className="smi">
                {s.ing.map(([q, n], j) => (
                  <span key={j}><b>{q}</b> {n}{j < s.ing.length-1 ? <br/> : null}</span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── COURSES ── */}
      {tab === 'courses' && (
        <>
          {/* Header avec compteur et bouton clear */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
            <div className="slabel" style={{margin:0}}>LISTE DE COURSES</div>
            <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
              <span style={{fontSize:'10px',fontWeight:'600',color:'var(--text2)',fontFamily:"'DM Mono',monospace"}}>{cdone}/{ctotal}</span>
              {cdone > 0 && (
                <button onClick={clearAll} style={{fontSize:'9px',color:'#F06080',background:'rgba(240,96,128,.1)',border:'0.5px solid rgba(240,96,128,.3)',borderRadius:'6px',padding:'3px 8px',cursor:'pointer',fontFamily:"'DM Mono',monospace"}}>
                  VIDER
                </button>
              )}
            </div>
          </div>

          {/* Catégories */}
          {coursesData.map((cat, ci) => {
            const adding = addState[ci] || { name:'', qty:'' }
            return (
              <div key={ci} style={{marginBottom:'20px'}}>
                {/* En-tête catégorie */}
                <div style={{fontSize:'9px',fontWeight:'700',letterSpacing:'.12em',textTransform:'uppercase',color:cat.bc,marginBottom:'8px',fontFamily:"'DM Mono',monospace"}}>
                  {cat.cat}
                </div>

                {/* Items */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px',marginBottom:'8px'}}>
                  {cat.items.map((item, ii) => {
                    const key = `${ci}-${ii}`
                    const on = state.courses[key]
                    return (
                      <div key={ii} style={{position:'relative'}}>
                        <div className={`fitem${on?' ck':''}`} onClick={() => togCourse(key)} style={{paddingRight:'28px'}}>
                          <div className="fcb">{on ? FCHK : null}</div>
                          <div>
                            <div className="fn">{item.n}</div>
                            {item.q && <div className="fq">{item.q}</div>}
                            {item.w && <div className="fw2">{item.w}</div>}
                          </div>
                        </div>
                        {/* Bouton supprimer */}
                        <button
                          onClick={e => { e.stopPropagation(); delItem(ci, ii) }}
                          style={{position:'absolute',top:'6px',right:'6px',width:'18px',height:'18px',borderRadius:'4px',background:'rgba(240,96,128,.15)',border:'none',cursor:'pointer',color:'#F06080',fontSize:'12px',display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1}}
                        >×</button>
                      </div>
                    )
                  })}
                </div>

                {/* Ajouter un item */}
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  <input
                    value={adding.name}
                    onChange={e => setAdd(ci, 'name', e.target.value)}
                    onKeyDown={e => e.key==='Enter' && addItem(ci)}
                    placeholder="+ Ajouter un aliment"
                    style={{flex:1,background:'var(--bg3)',border:'0.5px dashed rgba(200,240,74,.3)',borderRadius:'var(--r)',padding:'7px 10px',color:'var(--text)',fontSize:'12px',fontFamily:"'DM Sans',sans-serif",outline:'none'}}
                  />
                  <input
                    value={adding.qty}
                    onChange={e => setAdd(ci, 'qty', e.target.value)}
                    onKeyDown={e => e.key==='Enter' && addItem(ci)}
                    placeholder="Qté"
                    style={{width:'52px',background:'var(--bg3)',border:'0.5px dashed rgba(200,240,74,.3)',borderRadius:'var(--r)',padding:'7px 8px',color:'var(--text)',fontSize:'11px',fontFamily:"'DM Mono',monospace",outline:'none',textAlign:'center'}}
                  />
                  <button
                    onClick={() => addItem(ci)}
                    style={{width:'28px',height:'28px',borderRadius:'6px',background:'rgba(200,240,74,.15)',border:'0.5px solid rgba(200,240,74,.3)',cursor:'pointer',color:'var(--accent)',fontSize:'18px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}
                  >+</button>
                </div>
              </div>
            )
          })}

          {/* Copier */}
          {cdone > 0 && (
            <button className={`copy-btn${copied?' copied':''}`} onClick={copyCourses}>
              {copied ? '✓ COPIÉ — COLLE DANS TES NOTES' : `📋 COPIER LA SÉLECTION (${cdone} articles)`}
            </button>
          )}
        </>
      )}
    </>
  )
}
