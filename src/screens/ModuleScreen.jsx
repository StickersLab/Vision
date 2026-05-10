import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CHK } from '../components/Icons'
import { ModuleIcon } from '../components/Icons'

export default function ModuleScreen({ modId, onBack }) {
  const { state, dispatch } = useApp()
  const [editMode, setEditMode] = useState(false)

  if (!modId) return null
  const m = state.mods.find(x => x.id === modId)
  if (!m) return null

  const done = m.checks.filter((_, i) => state.checks[`${m.id}_${i}`]).length
  const earned = m.checks.reduce((a, _, i) => a + (state.checks[`${m.id}_${i}`] ? m.xps[i] || 10 : 0), 0)
  const totalXp = m.xps.reduce((a, x) => a + x, 0)
  const pct = m.checks.length > 0 ? Math.round(done / m.checks.length * 100) : 0

  function togChk(idx) { dispatch({ type:'TOG_CHK', modId: m.id, idx }) }
  function updChk(idx, val) { dispatch({ type:'UPD_MOD_CHK', modId: m.id, idx, val }) }
  function delChk(idx) { dispatch({ type:'DEL_MOD_CHK', modId: m.id, idx }) }
  function addChk() { dispatch({ type:'ADD_MOD_CHK', modId: m.id }) }

  const isWater = m.id === 'water'

  return (
    <>
      <div className="topbar" style={{paddingTop:'50px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <button className="back-btn" onClick={onBack}>←</button>
          <div>
            <div className="accent-line"></div>
            <div className="app-name" style={{fontSize:'22px',color:m.color}}>{m.name}</div>
          </div>
        </div>
        <button className={`edit-btn${editMode?' on':''}`} onClick={() => setEditMode(e => !e)}>
          {editMode ? '✓ SAUVEGARDER' : '✏ MODIFIER'}
        </button>
      </div>

      <div className="card" style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'16px'}}>
        <span style={{color:m.color}}><ModuleIcon ic={m.ic} color={m.color} /></span>
        <div style={{flex:1}}>
          <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'6px'}}>{m.name} — <span style={{color:m.color}}>{pct}%</span></div>
          <div className="xpbar"><div className="xpfill" style={{width:`${pct}%`,background:m.color}}></div></div>
          <div style={{fontSize:'10px',color:'var(--text3)',marginTop:'4px',fontFamily:"'DM Mono',monospace"}}>{earned} / {totalXp} XP</div>
        </div>
      </div>

      {isWater && (
        <>
          <div className="slabel">TRACKER EAU — {state.waters.filter(Boolean).length}/10 ({(state.waters.filter(Boolean).length * .25).toFixed(1)}L)</div>
          <div className="glass-row">
            {state.waters.map((w, i) => (
              <div key={i} className={`gl${w?' on':''}`} onClick={() => dispatch({type:'TOG_WATER',i})}>💧</div>
            ))}
          </div>
        </>
      )}

      {editMode ? (
        <>
          <div className="slabel">MODIFIER LES TÂCHES</div>
          {m.checks.map((c, i) => (
            <div key={i} className="edit-item">
              <input className="edit-input" defaultValue={c} onBlur={e => updChk(i, e.target.value)}/>
              <span style={{fontSize:'9px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>+{m.xps[i]}XP</span>
              <button className="del-btn" onClick={() => delChk(i)}>×</button>
            </div>
          ))}
          <button className="add-btn" onClick={addChk}>+ AJOUTER UNE TÂCHE</button>
        </>
      ) : (
        <>
          <div className="slabel">{done}/{m.checks.length} TÂCHES</div>
          {m.checks.map((c, i) => {
            const checked = !!state.checks[`${m.id}_${i}`]
            return (
              <div key={i} className={`ci${checked?' ck':''}`} onClick={() => togChk(i)}>
                <div className="cb">{checked ? CHK : null}</div>
                <div className="ct">{c}</div>
                <div className="cx">+{m.xps[i] || 10} XP</div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}
