import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { CHK } from '../components/Icons'
import { recentMuscles } from '../utils/helpers'
import { MUSCLES } from '../data/exercises'
import { beepStart, beepEnd, beepTick } from '../utils/audio'

// ── Programmes prédéfinis ─────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: 'fullbody',
    name: 'Full Body',
    emoji: '💪',
    desc: 'Tout le corps · 5 exos',
    color: '#C8F04A',
    exos: [
      { gid:'chest',     n:'Pompes classiques',           s:3, r:'10-12',       tip:'Dos droit, coudes à 45°' },
      { gid:'back',      n:'Superman',                    s:3, r:'12-15',       tip:'Au sol, bras+jambes simultanément' },
      { gid:'legs',      n:'Squats poids de corps',       s:4, r:'15-20',       tip:'Genoux dans axe des pieds' },
      { gid:'core',      n:'Planche avant',               s:3, r:'45-60 sec',   tip:'Corps droit' },
      { gid:'cardio',    n:'Burpees',                     s:3, r:'8-10',        tip:'Explosif et fluide' },
    ],
  },
  {
    id: 'push',
    name: 'Push',
    emoji: '🔺',
    desc: 'Poitrine + Épaules + Triceps · 5 exos',
    color: '#F06080',
    exos: [
      { gid:'chest',     n:'Pompes classiques',           s:3, r:'10-12',       tip:'Dos droit, coudes à 45°' },
      { gid:'chest',     n:'Pompes inclinées (pieds sur chaise)', s:3, r:'8-10', tip:'Haut de poitrine' },
      { gid:'shoulders', n:'Pike push-ups',               s:3, r:'8-10',        tip:"Fessiers en l'air" },
      { gid:'arms',      n:'Pompes diamant (triceps)',     s:3, r:'10-12',       tip:'Extension complète' },
      { gid:'arms',      n:'Dips sur chaise',             s:3, r:'10-15',       tip:'Descente lente' },
    ],
  },
  {
    id: 'pull',
    name: 'Pull',
    emoji: '🔻',
    desc: 'Dos + Biceps · 5 exos',
    color: '#8BE8C8',
    exos: [
      { gid:'back',      n:'Rowing inversé sous table',   s:3, r:'10-12',       tip:'Corps gainé, poitrine vers la table' },
      { gid:'back',      n:'Superman',                    s:3, r:'12-15',       tip:'Au sol, bras+jambes simultanément' },
      { gid:'back',      n:'Bird dog',                    s:3, r:'10 de chaque', tip:'4 pattes, bras+jambe opposés' },
      { gid:'arms',      n:'Curl inversé sous table',     s:3, r:'10-12',       tip:'Prise supination biceps' },
      { gid:'arms',      n:'Flexions isométriques biceps',s:3, r:'30 sec',      tip:"Pousser une main contre l'autre" },
    ],
  },
  {
    id: 'legs',
    name: 'Jambes',
    emoji: '🦵',
    desc: 'Bas du corps complet · 5 exos',
    color: '#F0A050',
    exos: [
      { gid:'legs',      n:'Squats poids de corps',       s:4, r:'15-20',       tip:'Genoux dans axe des pieds' },
      { gid:'legs',      n:'Fentes avant alternées',      s:3, r:'12 de chaque', tip:'Genou arrière proche du sol' },
      { gid:'legs',      n:'Jump squats',                 s:3, r:'10-12',       tip:'Explosif, atterrissage contrôlé' },
      { gid:'legs',      n:'Pont fessier',                s:4, r:'15-20',       tip:'Hanches vers le haut' },
      { gid:'legs',      n:'Mollets debout',              s:4, r:'20-25',       tip:'Sur marche si possible' },
    ],
  },
  {
    id: 'core',
    name: 'Core & Cardio',
    emoji: '🔥',
    desc: 'Abdos + Cardio · 6 exos',
    color: '#5BB8F5',
    exos: [
      { gid:'core',      n:'Planche avant',               s:3, r:'45-60 sec',   tip:'Corps droit' },
      { gid:'core',      n:'Crunchs',                     s:3, r:'20-25',       tip:'Expirez en montant' },
      { gid:'core',      n:'Mountain climbers',           s:3, r:'20 de chaque', tip:'Gainage constant' },
      { gid:'core',      n:'Russian twists',              s:3, r:'15 de chaque', tip:'Pieds levés' },
      { gid:'cardio',    n:'High knees',                  s:3, r:'30 sec',      tip:'Genoux à hauteur de hanche' },
      { gid:'cardio',    n:'Burpees',                     s:3, r:'8-10',        tip:'Explosif et fluide' },
    ],
  },
  {
    id: 'upper',
    name: 'Haut du corps',
    emoji: '🏋️',
    desc: 'Push + Pull combinés · 6 exos',
    color: '#B8A0F8',
    exos: [
      { gid:'chest',     n:'Pompes classiques',           s:3, r:'10-12',       tip:'Dos droit, coudes à 45°' },
      { gid:'chest',     n:'Pompes diamant',              s:3, r:'8-10',        tip:'Triceps + poitrine' },
      { gid:'back',      n:'Rowing inversé sous table',   s:3, r:'10-12',       tip:'Corps gainé, poitrine vers la table' },
      { gid:'shoulders', n:'Pike push-ups',               s:3, r:'8-10',        tip:"Fessiers en l'air" },
      { gid:'arms',      n:'Dips sur chaise',             s:3, r:'10-15',       tip:'Descente lente' },
      { gid:'arms',      n:'Curl inversé sous table',     s:3, r:'10-12',       tip:'Prise supination biceps' },
    ],
  },
]

export default function SportScreen() {
  const { state, dispatch } = useApp()
  const [openMuscle, setOpenMuscle] = useState(null)
  const [showPrograms, setShowPrograms]   = useState(false)
  const [timerExo, setTimerExo]   = useState(45)
  const [timerPause, setTimerPause] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerPhase, setTimerPhase] = useState('exo')
  const [timerLeft, setTimerLeft]   = useState(45)
  const intervalRef = useRef(null)

  const sel    = state.sportDone
  const recent = recentMuscles(state.sportHist)
  const canStart = sel.length >= 3

  // ── Timer : démarre une toute nouvelle séance ─────────────────────────────
  function startFreshTimer() {
    beepStart()
    setTimerPhase('exo')
    setTimerLeft(timerExo)
    setTimerRunning(true)
  }

  // ── Timer : reprend là où il s'est arrêté (pas de reset de timerLeft) ─────
  function resumeTimer() {
    setTimerRunning(true)
  }

  function pauseTimer() {
    setTimerRunning(false)
  }

  function stopTimer() {
    setTimerRunning(false)
    setTimerPhase('exo')
    setTimerLeft(timerExo)
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  useEffect(() => {
    if (!timerRunning) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      return
    }
    intervalRef.current = setInterval(() => {
      setTimerLeft(prev => {
        const next = prev - 1
        if (next <= 3 && next > 0) beepTick()
        if (next <= 0) {
          setTimerPhase(phase => {
            if (phase === 'exo') { beepEnd(); setTimerLeft(timerPause); return 'pause' }
            else { beepStart(); setTimerLeft(timerExo); return 'exo' }
          })
          return prev
        }
        return next
      })
    }, 1000)
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null } }
  }, [timerRunning, timerExo, timerPause])

  function launchSport() {
    dispatch({ type: 'LAUNCH_SPORT' })
    startFreshTimer()
  }

  function applyProgram(prog) {
    dispatch({ type: 'SET_SPORT_DONE', exercises: prog.exos })
    setShowPrograms(false)
  }

  function togExo(gid, name, s, rep, tip) {
    dispatch({ type: 'TOG_EXO', gid, name, s, rep, tip })
  }
  function rmExo(name) { dispatch({ type: 'RM_EXO', name }) }

  const timerTotal = timerPhase === 'exo' ? timerExo : timerPause
  const timerPct   = Math.round((1 - timerLeft / timerTotal) * 100)
  const tm = Math.floor(timerLeft / 60)
  const ts = timerLeft % 60

  const sorted = [...MUSCLES].sort((a, b) => {
    const ar = recent.includes(a.id), br = recent.includes(b.id)
    if (ar && !br) return 1
    if (!ar && br) return -1
    return 0
  })

  return (
    <>
      <div className="topbar">
        <div><div className="accent-line"></div><div className="app-name" style={{fontSize:'22px'}}>Sport</div></div>
        <div className="topbar-meta">{sel.length}/8 EXOS<br/>MIN 3 · MAX 8</div>
      </div>

      {/* ── PROGRAMMES ── */}
      <div style={{marginBottom:'12px'}}>
        <button
          onClick={() => setShowPrograms(v => !v)}
          style={{width:'100%',background:'rgba(200,240,74,.1)',border:'1px solid rgba(200,240,74,.3)',borderRadius:'var(--r)',padding:'10px 16px',color:'var(--accent)',fontSize:'12px',fontWeight:'700',fontFamily:"'DM Mono',monospace",cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}
        >
          <span>⚡ PROGRAMMES CONSEILLÉS</span>
          <span style={{fontSize:'10px',opacity:0.7}}>{showPrograms ? '▲ MASQUER' : '▼ VOIR'}</span>
        </button>

        {showPrograms && (
          <div style={{marginTop:'8px',display:'flex',flexDirection:'column',gap:'8px'}}>
            {PROGRAMS.map(prog => (
              <button
                key={prog.id}
                onClick={() => applyProgram(prog)}
                style={{background:'var(--bg2)',border:`1px solid ${prog.color}40`,borderRadius:'var(--r)',padding:'12px 14px',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:'12px'}}
              >
                <span style={{fontSize:'22px'}}>{prog.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:'13px',fontWeight:'700',color:prog.color,fontFamily:"'Syne',sans-serif"}}>{prog.name}</div>
                  <div style={{fontSize:'11px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginTop:'2px'}}>{prog.desc}</div>
                </div>
                <span style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>APPLIQUER →</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── GO NOW ── */}
      <div className="gonow">
        <div className="gonow-title">GO NOW 🔥</div>
        {sel.length === 0 && (
          <div style={{fontSize:'12px',color:'var(--text3)',textAlign:'center',padding:'8px 0',fontFamily:"'DM Mono',monospace"}}>
            Sélectionne un programme ci-dessus ou choisis manuellement
          </div>
        )}
        {sel.map((e, i) => (
          <div key={e.n} className="gonow-item">
            <div className="gonow-num">{i+1}</div>
            <div style={{flex:1}}>
              <div className="gonow-name">{e.n}</div>
              <div className="gonow-sets">{e.s} séries × {e.r} — {e.tip}</div>
            </div>
            <button onClick={() => rmExo(e.n)} style={{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:'18px',padding:'4px'}}>×</button>
          </div>
        ))}
        {!canStart && sel.length > 0 && (
          <div className="need-more">Encore {3-sel.length} exo{3-sel.length>1?'s':''} minimum (3 min)</div>
        )}

        {/* Timer */}
        {state.sportStarted ? (
          <div className="timer-box">
            <div className={`timer-phase ${timerPhase}`}>{timerPhase==='exo' ? 'EXERCICE ⚡' : 'PAUSE 😮‍💨'}</div>
            <div className="timer-display">{String(tm).padStart(2,'0')}:{String(ts).padStart(2,'0')}</div>
            <div className="timer-progress">
              <div className="timer-progress-fill" style={{width:`${timerPct}%`,background:timerPhase==='exo'?'var(--accent)':'#F0A050'}}></div>
            </div>
            <div className="timer-settings">
              <div className="timer-setting"><label>EXERCICE (sec)</label><input type="number" value={timerExo} onChange={e => setTimerExo(parseInt(e.target.value)||45)}/></div>
              <div className="timer-setting"><label>PAUSE (sec)</label><input type="number" value={timerPause} onChange={e => setTimerPause(parseInt(e.target.value)||60)}/></div>
            </div>
            <div className="timer-controls">
              {timerRunning
                ? <button className="timer-btn secondary" onClick={pauseTimer}>⏸ PAUSE</button>
                : <button className="timer-btn primary" onClick={resumeTimer}>▶ REPRENDRE</button>
              }
              <button className="timer-btn secondary" onClick={stopTimer}>⏹ STOP</button>
            </div>
          </div>
        ) : (
          <>
            <div className="timer-settings" style={{marginBottom:'12px'}}>
              <div className="timer-setting"><label>EXERCICE (sec)</label><input type="number" value={timerExo} onChange={e => setTimerExo(parseInt(e.target.value)||45)}/></div>
              <div className="timer-setting"><label>PAUSE (sec)</label><input type="number" value={timerPause} onChange={e => setTimerPause(parseInt(e.target.value)||60)}/></div>
            </div>
            <button className="start-btn" disabled={!canStart} onClick={launchSport}>
              {canStart ? `🚀 LANCER LA SÉANCE (${sel.length} exos)` : `MINIMUM 3 EXERCICES (${sel.length}/3)`}
            </button>
          </>
        )}
      </div>

      {sel.length > 8 && (
        <div style={{background:'rgba(240,96,128,.1)',borderRadius:'var(--r)',padding:'10px',fontSize:'12px',color:'#F06080',marginBottom:'12px',fontFamily:"'DM Mono',monospace"}}>
          ⚠ Plus de 8 exos — risque de surmenage. Max recommandé : 8.
        </div>
      )}

      {recent.length > 0 && (
        <div className="info-box">
          💡 Groupes récents : <strong style={{color:'var(--text)'}}>{recent.map(id => MUSCLES.find(g => g.id === id)?.name).filter(Boolean).join(', ')}</strong> — laisse-les récupérer.
        </div>
      )}

      <div className="slabel">CHOISIR LES EXERCICES</div>
      {sorted.map(g => {
        const isR = recent.includes(g.id)
        const sc  = sel.filter(e => e.gid === g.id).length
        const isO = openMuscle === g.id
        return (
          <div key={g.id} className="muscle-group">
            <div className="mgh" onClick={() => setOpenMuscle(isO ? null : g.id)}>
              <div className="mgh-dot" style={{background:g.color}}></div>
              <div className="mgh-title" style={{color:g.color}}>{g.name}</div>
              {isR && <span className="mgh-recent">⚠ REPOS</span>}
              {sc > 0 && <span className="mgh-count">{sc} ✓</span>}
              <span className={`mgh-chev${isO?' open':''}`}>▼</span>
            </div>
            {isO && (
              <div className="mgb open">
                {g.exos.map(e => {
                  const isSel = sel.some(s => s.n === e.n)
                  return (
                    <div key={e.n} className={`exo-item${isSel?' sel':''}`} onClick={() => togExo(g.id, e.n, e.s, e.r, e.tip)}>
                      <div className="exo-cb">{isSel ? CHK : null}</div>
                      <div>
                        <div className="exo-name">{e.n}</div>
                        <div className="exo-meta">{e.s} séries × {e.r}</div>
                        <div className="exo-tip">{e.tip}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
