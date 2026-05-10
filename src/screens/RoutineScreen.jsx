import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CHK } from '../components/Icons'

export default function RoutineScreen() {
  const { state, dispatch } = useApp()
  const [tab, setTab] = useState('m')
  const [editMode, setEditMode] = useState(false)

  const isM = tab === 'm'
  const key = isM ? 'morning' : 'evening'
  const items = state.routine[key]
  const color = isM ? '#F0A050' : '#B8A0F8'

  const done = items.filter((_, i) => state.rchecks[`${tab}_${i}`]).length
  const earned = items.reduce((a, ri, i) => a + (state.rchecks[`${tab}_${i}`] ? ri.xp : 0), 0)
  const totalXp = items.reduce((a, ri) => a + ri.xp, 0)
  const pct = totalXp > 0 ? Math.round(earned / totalXp * 100) : 0

  function togRC(i) { dispatch({ type:'TOG_RC', tab, i }) }
  function updRout(idx, field, val) { dispatch({ type:'UPD_ROUT', key, idx, field, val }) }
  function delRout(idx) { dispatch({ type:'DEL_ROUT', key, idx }) }
  function addRout() { dispatch({ type:'ADD_ROUT', key }) }

  return (
    <>
      <div className="topbar">
        <div>
          <div className="accent-line"></div>
          <div className="app-name" style={{fontSize:'22px'}}>{isM ? 'Matin' : 'Soir'}</div>
        </div>
        <button className={`edit-btn${editMode?' on':''}`} onClick={() => setEditMode(e => !e)}>
          {editMode ? '✓ SAUVEGARDER' : '✏ MODIFIER'}
        </button>
      </div>

      <div className="tabs">
        <button className={`tab${isM?' on':''}`} onClick={() => { setTab('m'); setEditMode(false) }}>☀️ MATIN</button>
        <button className={`tab${!isM?' on':''}`} onClick={() => { setTab('e'); setEditMode(false) }}>🌆 SOIR</button>
      </div>

      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
        <div style={{flex:1}}>
          <div className="xpbar"><div className="xpfill" style={{width:`${pct}%`,background:color}}></div></div>
        </div>
        <span style={{fontSize:'10px',fontWeight:'600',color:'var(--text2)',flexShrink:0,fontFamily:"'DM Mono',monospace"}}>{done}/{items.length} · {earned} XP</span>
      </div>

      {editMode ? (
        <>
          <div className="slabel">MODIFIER LES ÉTAPES</div>
          {items.map((ri, i) => (
            <div key={i} style={{background:'var(--bg3)',border:'0.5px solid var(--border2)',borderRadius:'var(--r)',padding:'10px',marginBottom:'6px'}}>
              <div className="tl-edit-row" style={{marginBottom:'6px'}}>
                <input className="tl-time-in" defaultValue={ri.time} onBlur={e => updRout(i, 'time', e.target.value)}/>
                <input className="tl-label-in" defaultValue={ri.label} onBlur={e => updRout(i, 'label', e.target.value)}/>
                <button className="del-btn" onClick={() => delRout(i)}>×</button>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                <input className="tl-label-in" defaultValue={ri.note} onBlur={e => updRout(i, 'note', e.target.value)} placeholder="Note" style={{fontSize:'11px'}}/>
                <input className="tl-time-in" type="number" defaultValue={ri.xp} onBlur={e => updRout(i, 'xp', e.target.value)} placeholder="XP" style={{width:'50px'}}/>
              </div>
            </div>
          ))}
          <button className="add-btn" onClick={addRout}>+ AJOUTER UNE ÉTAPE</button>
        </>
      ) : (
        items.map((ri, i) => {
          const checked = !!state.rchecks[`${tab}_${i}`]
          return (
            <div key={i} className="tli">
              <div className="tlt">{ri.time}</div>
              <div className={`tlc${checked?' ck':''}`} onClick={() => togRC(i)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'8px'}}>
                  <div>
                    <div className="tln">{ri.label}</div>
                    {ri.note && <div className="tls">{ri.note}</div>}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:'6px',flexShrink:0}}>
                    <span style={{fontSize:'9px',color:checked?'rgba(200,240,74,.6)':'var(--text3)',fontFamily:"'DM Mono',monospace",fontWeight:'600'}}>+{ri.xp}</span>
                    <div className="cb">{checked ? CHK : null}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </>
  )
}
