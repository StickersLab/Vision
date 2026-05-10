import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { FCHK } from '../components/Icons'
import { COURSES_DATA, REPAS, SHAKES } from '../data/nutrition'

const DAILY_SCHEDULE = [
  {t:'6h20',l:'Petit-déjeuner',k:'700',c:'#F0A050'},
  {t:'10h00',l:'Shake #1',k:'420',c:'#5BB8F5'},
  {t:'12h30',l:'Déjeuner',k:'750',c:'#8BE8C8'},
  {t:'15h30',l:'Shake #2',k:'390',c:'#5BB8F5'},
  {t:'18h30',l:'Pré-workout',k:'200',c:'#F06080'},
  {t:'19h25',l:'Recovery shake',k:'200',c:'#B8A0F8'},
  {t:'20h00',l:'Dîner',k:'650',c:'#C8F04A'},
  {t:'21h30',l:'Casein (si faim)',k:'200',c:'#444'},
]

export default function AlimScreen() {
  const { state, dispatch } = useApp()
  const [tab, setTab] = useState('macros')
  const [copied, setCopied] = useState(false)

  const cdone = Object.values(state.courses).filter(Boolean).length
  const ctotal = COURSES_DATA.reduce((a, c) => a + c.items.length, 0)

  function togCourse(key) { dispatch({ type:'TOG_COURSE', key }) }

  function copyCourses() {
    const lines = ['📋 LISTE DE COURSES — Vision.\n']
    COURSES_DATA.forEach((cat, ci) => {
      const checked = cat.items.filter((_, ii) => state.courses[`${ci}-${ii}`])
      if (checked.length) {
        lines.push(`\n${cat.cat.toUpperCase()}`)
        checked.forEach(it => lines.push(`☐ ${it.n} — ${it.q}`))
      }
    })
    lines.push(`\nGénéré le ${new Date().toLocaleDateString('fr-FR')} · Vision.`)
    const txt = lines.join('\n')
    navigator.clipboard.writeText(txt).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = txt; document.body.appendChild(ta); ta.select()
      document.execCommand('copy'); document.body.removeChild(ta)
    }).finally(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="topbar">
        <div><div className="accent-line"></div><div className="app-name" style={{fontSize:'22px'}}>Alim</div></div>
        <div className="topbar-meta">59KG<br/>ECTOMORPHE</div>
      </div>

      <div className="tabs">
        {['macros','repas','collations','courses'].map((id, i) => (
          <button key={id} className={`tab${tab===id?' on':''}`} onClick={() => setTab(id)}>
            {['MACROS','REPAS','COLLATIONS','COURSES'][i]}
          </button>
        ))}
      </div>

      {tab === 'macros' && (
        <>
          <div className="info-box">Profil : <strong style={{color:'var(--text)'}}>59kg ectomorphe · course matin + muscu soir</strong>. +400 kcal/jour. 5-6 prises dont 3-4 liquides.</div>
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

      {tab === 'collations' && (
        <>
          <div className="info-box">3-4 collations liquides = +1000 kcal sans saturer l'estomac. Stratégie clé ectomorphe 59kg.</div>
          {SHAKES.map((s, i) => (
            <div key={i} className="smcard" style={{borderLeftColor:s.bc}}>
              <div className="smt">{s.t}</div>
              <div className="smk">{s.h}</div>
              <div className="smi">
                {s.ing.map(([q, n], j) => (
                  <span key={j}><b>{q}</b> {n}{j < s.ing.length - 1 ? <br/> : null}</span>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'courses' && (
        <>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
            <div className="slabel" style={{margin:0}}>LISTE DE COURSES</div>
            <span style={{fontSize:'10px',fontWeight:'600',color:'var(--text2)',fontFamily:"'DM Mono',monospace"}}>{cdone}/{ctotal}</span>
          </div>
          {COURSES_DATA.map((cat, ci) => (
            <div key={ci} style={{marginBottom:'18px'}}>
              <div style={{fontSize:'9px',fontWeight:'700',letterSpacing:'.12em',textTransform:'uppercase',color:cat.bc,marginBottom:'8px',fontFamily:"'DM Mono',monospace"}}>{cat.cat}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`
                  const on = state.courses[key]
                  return (
                    <div key={ii} className={`fitem${on?' ck':''}`} onClick={() => togCourse(key)}>
                      <div className="fcb">{on ? FCHK : null}</div>
                      <div>
                        <div className="fn">{item.n}</div>
                        <div className="fq">{item.q}</div>
                        <div className="fw2">{item.w}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {cdone > 0 && (
            <button className={`copy-btn${copied?' copied':''}`} onClick={copyCourses}>
              {copied ? '✓ COPIÉ — COLLE DANS TES NOTES' : `📋 COPIER POUR NOTES (${cdone} articles)`}
            </button>
          )}
        </>
      )}
    </>
  )
}
