import { useState } from 'react'
import { useApp, modPct, xpToday, maxXpDay } from '../context/AppContext'
import { load, sv } from '../utils/storage'
import { getLevel, LEVELS } from '../utils/levels'
import { todayDays } from '../utils/helpers'
import { Logo, ModuleIcon, HandIcon } from '../components/Icons'

export default function HomeScreen({ onOpenModule }) {
  const { state, dispatch } = useApp()
  const [weightInput, setWeightInput] = useState('')

  const earned = xpToday(state)
  const maxXp = maxXpDay(state)
  const totalXp = load('v3_totalxp', 1240) + earned
  const lvl = getLevel(totalXp)
  const lvlPct = lvl.next ? Math.round(((totalXp - lvl.min) / (lvl.next - lvl.min)) * 100) : 100
  const dayPct = maxXp > 0 ? Math.round(earned / maxXp * 100) : 0
  const days = todayDays()
  const cw = state.weights.length ? state.weights[state.weights.length - 1] : null
  const delta = state.weights.length >= 2 ? state.weights[state.weights.length - 1].v - state.weights[state.weights.length - 2].v : null
  const ob65pct = cw ? Math.min(Math.round(((cw.v - 59) / (65 - 59)) * 100), 100) : 0

  function saveWeight() {
    const v = parseFloat(weightInput)
    if (isNaN(v) || v < 30 || v > 300) return
    dispatch({ type:'SAVE_WEIGHT', v })
    setWeightInput('')
  }

  function toggleNail(i) {
    dispatch({ type:'TOG_NAIL', i })
  }

  function toggleTheme() {
    dispatch({ type:'TOGGLE_THEME' })
  }

  const nailDays = todayDays()
  const greeting = state.name || ''

  return (
    <>
      <div className="topbar">
        <div className="logo">
          <Logo />
          <div className="app-name">Vision.</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <button className="theme-btn" onClick={toggleTheme}>{state.isDark ? '☀️' : '🌙'}</button>
          <div className="topbar-meta">
            {greeting}<br/>
            {new Date().toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}
          </div>
        </div>
      </div>

      {/* Day progress */}
      <div className="day-progress">
        <div className="dp-row">
          <div>
            <div style={{fontSize:'11px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginBottom:'2px'}}>SCORE DU JOUR</div>
            <div className="dp-score">{earned}<span style={{fontSize:'14px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}> XP</span></div>
          </div>
          <span className="dp-max">/ {maxXp} XP max</span>
        </div>
        <div className="dp-bar"><div className="dp-fill" style={{width:`${dayPct}%`}}></div></div>
        <div className="dp-remaining">{dayPct}% accompli · {maxXp - earned} XP restants</div>
      </div>

      {/* Level card */}
      <div className="card" style={{marginBottom:'16px'}}>
        <div className="lvl-pill">NIV.{lvl.num} — {lvl.name.toUpperCase()}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'8px'}}>
          <span style={{fontSize:'11px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>XP GLOBAL</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:'13px',fontWeight:'700'}}>{totalXp}{lvl.next ? ` / ${lvl.next}` : ' MAX'}</span>
        </div>
        <div className="xpbar"><div className="xpfill" style={{width:`${lvlPct}%`,background:'var(--accent)'}}></div></div>
        {lvl.next
          ? <div style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginTop:'4px'}}>Prochain : NIV.{lvl.num+1} {LEVELS[lvl.num].name} — {lvl.next-totalXp} XP restants</div>
          : <div style={{fontSize:'10px',color:'var(--accent)',fontFamily:"'DM Mono',monospace",marginTop:'4px'}}>NIVEAU MAXIMUM ATTEINT 🏆</div>
        }
      </div>

      {/* Metrics */}
      <div className="mg2">
        <div className="mc"><div className="mv">4 🔥</div><div className="ml">STREAK JOURS</div></div>
        <div className="mc"><div className="mv">{Math.round(dayPct)}%</div><div className="ml">SCORE JOUR</div></div>
        <div className="mc"><div className="mv">{state.mods.filter(m => modPct(state.mods, state.checks, m.id) === 100).length}/{state.mods.length}</div><div className="ml">MODULES OK</div></div>
        <div className="mc"><div className="mv">{state.nailStreak.count}💅</div><div className="ml">STREAK ONGLES</div></div>
      </div>

      {/* Week streak */}
      <div className="slabel">SEMAINE</div>
      <div className="streak-row">
        {days.map((d, i) => (
          <div key={i} className={`sday${d.done?' done':d.today?' today':''}`}>
            <span className="sdl">{d.l}</span>
            <span className="sdi">{d.done?'✓':d.today?'·':'–'}</span>
          </div>
        ))}
      </div>

      {/* Weight card */}
      <div className="weight-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
          <div className="slabel" style={{margin:0}}>POIDS</div>
          <span style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>OBJECTIF 65KG</span>
        </div>
        <div style={{display:'flex',alignItems:'baseline',gap:'8px',marginBottom:'8px'}}>
          <span className="weight-num">{cw ? cw.v : '—'}</span>
          <span style={{fontSize:'16px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>kg</span>
          {delta !== null && (
            <span className="weight-delta" style={{background:delta>=0?'rgba(200,240,74,.15)':'rgba(240,96,128,.15)',color:delta>=0?'var(--accent)':'#F06080'}}>
              {delta >= 0 ? '+' : ''}{delta.toFixed(1)}kg
            </span>
          )}
        </div>
        {cw && (
          <>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
              <span style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>59 → 65kg</span>
              <span style={{fontSize:'10px',color:'var(--accent)',fontFamily:"'DM Mono',monospace"}}>{ob65pct}%</span>
            </div>
            <div className="xpbar" style={{height:'5px',marginBottom:'10px'}}><div className="xpfill" style={{width:`${ob65pct}%`,background:'var(--accent)'}}></div></div>
          </>
        )}
        <div className="weight-input-row">
          <input className="weight-in" type="number" step="0.1" placeholder={cw ? String(cw.v) : '59.0'} value={weightInput} onChange={e => setWeightInput(e.target.value)}/>
          <button className="weight-save" onClick={saveWeight}>SAUVER</button>
        </div>
        {state.weights.length > 1 && (
          <div style={{display:'flex',gap:'6px',marginTop:'10px',overflowX:'auto'}}>
            {state.weights.slice(-8).map((w, i, a) => (
              <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',minWidth:'36px'}}>
                <div style={{width:i===a.length-1?'10px':'8px',height:i===a.length-1?'10px':'8px',borderRadius:'50%',background:'var(--accent)',opacity:i===a.length-1?1:0.4}}></div>
                <div style={{fontSize:'9px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{w.v}</div>
                <div style={{fontSize:'8px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{w.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nail streak */}
      <div className="streak-habit">
        <div className="sh-header">
          <div><HandIcon /></div>
          <div style={{flex:1}}>
            <div style={{fontSize:'13px',fontWeight:'500'}}>Ne pas se ronger les ongles</div>
            <div style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginTop:'2px'}}>Streak actuel</div>
          </div>
          <div className="sh-streak">{state.nailStreak.count} 🔥</div>
        </div>
        <div className="sh-days">
          {nailDays.map((d, i) => {
            const done = state.nailStreak.days?.[i]
            return (
              <div key={i} className={`sh-day${done?' done':''}${d.today?' today':''}`} onClick={() => toggleNail(i)}>
                <span>{d.l}</span>
                <div className="sh-di">{done ? '✓' : '–'}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Module grid */}
      <div className="slabel">MES PILIERS</div>
      <div className="mod-grid">
        {state.mods.map(m => {
          const p = modPct(state.mods, state.checks, m.id)
          return (
            <div key={m.id} className={`mod-card${p===100?' done':''}`} onClick={() => onOpenModule(m.id)}>
              <div className="mod-top">
                <span style={{color:m.color}}><ModuleIcon ic={m.ic} color={m.color} /></span>
                <span className="mod-pct">{p}%</span>
              </div>
              <div className="mod-name" style={{color:m.color}}>{m.name}</div>
              <div className="mod-bar"><div className="mod-fill" style={{width:`${p}%`,background:m.color}}></div></div>
            </div>
          )
        })}
      </div>
    </>
  )
}
