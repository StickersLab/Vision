import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { CHK } from '../components/Icons'
import { recentMuscles } from '../utils/helpers'
import { MUSCLES } from '../data/exercises'
import { beepStart, beepEnd, beepTick } from '../utils/audio'

export default function SportScreen() {
  const { state, dispatch } = useApp()
  const [openMuscle, setOpenMuscle] = useState(null)
  const [timerExo, setTimerExo] = useState(45)
  const [timerPause, setTimerPause] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerPhase, setTimerPhase] = useState('exo')
  const [timerLeft, setTimerLeft] = useState(45)
  const intervalRef = useRef(null)

  const sel = state.sportDone
  const recent = recentMuscles(state.sportHist)
  const canStart = sel.length >= 3

  function startTimer() {
    if (timerRunning) return
    beepStart()
    setTimerRunning(true)
    setTimerPhase('exo')
    setTimerLeft(timerExo)
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
    dispatch({ type:'LAUNCH_SPORT' })
    startTimer()
  }

  function togExo(gid, name, s, rep, tip) {
    dispatch({ type:'TOG_EXO', gid, name, s, rep, tip })
  }
  function rmExo(name) { dispatch({ type:'RM_EXO', name }) }

  const timerTotal = timerPhase === 'exo' ? timerExo : timerPause
  const timerPct = Math.round((1 - timerLeft / timerTotal) * 100)
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

      {/* GO NOW */}
      <div className="gonow">
        <div className="gonow-title">GO NOW 🔥</div>
        {sel.length === 0 && (
          <div style={{fontSize:'12px',color:'var(--text3)',textAlign:'center',padding:'8px 0',fontFamily:"'DM Mono',monospace"}}>Sélectionne 3 à 8 exercices ci-dessous</div>
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
            <div className={`timer-phase ${timerPhase}`}>{timerPhase==='exo'?'EXERCICE ⚡':'PAUSE 😮‍💨'}</div>
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
                : <button className="timer-btn primary" onClick={startTimer}>▶ REPRENDRE</button>
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
        const sc = sel.filter(e => e.gid === g.id).length
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
