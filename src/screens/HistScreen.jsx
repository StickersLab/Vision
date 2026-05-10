import { useApp } from '../context/AppContext'
import { maxXpDay } from '../context/AppContext'
import { tdKey } from '../utils/storage'

export default function HistScreen() {
  const { state, dispatch } = useApp()

  const max = maxXpDay(state) || 1
  const cells = []
  for (let d = 29; d >= 0; d--) {
    const dt = new Date(); dt.setDate(dt.getDate() - d)
    const k = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`
    const score = state.scores[k] || 0
    const pct = Math.min(score / max, 1)
    const isToday = d === 0
    let bg
    if (score === 0) bg = 'var(--bg4)'
    else if (pct < 0.3) bg = 'rgba(200,240,74,0.2)'
    else if (pct < 0.6) bg = 'rgba(200,240,74,0.5)'
    else if (pct < 0.9) bg = 'rgba(200,240,74,0.8)'
    else bg = 'var(--accent)'
    cells.push({ bg, score, label: dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}), isToday })
  }

  function requestNotifs() {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }

  function togNotif(key) { dispatch({ type:'TOG_NOTIF', key }) }
  function updNotif(key, field, val) { dispatch({ type:'UPD_NOTIF', key, field, val }) }

  return (
    <>
      <div className="topbar">
        <div><div className="accent-line"></div><div className="app-name" style={{fontSize:'22px'}}>Historique</div></div>
        <div className="topbar-meta">30 JOURS<br/>DE DONNÉES</div>
      </div>

      <div className="slabel">HEATMAP — 30 DERNIERS JOURS</div>
      <div className="heatmap">
        {cells.map((c, i) => (
          <div key={i} className="hm-cell" style={{background:c.bg,border:c.isToday?'1.5px solid var(--accent)':'none'}} title={`${c.label}: ${c.score} XP`}></div>
        ))}
      </div>
      <div style={{display:'flex',gap:'6px',alignItems:'center',marginBottom:'16px',fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>
        {[['var(--bg4)','0'],['rgba(200,240,74,0.3)','<30%'],['rgba(200,240,74,0.6)','<60%'],['rgba(200,240,74,0.9)','<90%'],['var(--accent)','100%']].map(([bg,label]) => (
          <><div key={label} style={{width:'10px',height:'10px',borderRadius:'2px',background:bg}}></div><span>{label}</span></>
        ))}
      </div>

      {/* Weight chart */}
      {state.weights.length > 1 ? (
        <>
          <div className="slabel">COURBE DE POIDS</div>
          <div className="card" style={{marginBottom:'16px'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:'4px',height:'80px',marginBottom:'8px'}}>
              {(() => {
                const ws = state.weights.slice(-14)
                const wmin = Math.min(...ws.map(w => w.v)) - 1
                const wmax = Math.max(...ws.map(w => w.v)) + 1
                const range = wmax - wmin || 1
                return ws.map((w, i) => (
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'3px'}}>
                    <div style={{width:'100%',background:i===ws.length-1?'var(--accent)':'rgba(200,240,74,0.4)',borderRadius:'2px 2px 0 0',height:`${Math.round(((w.v-wmin)/range)*70)+5}px`}}></div>
                    <div style={{fontSize:'7px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{w.date}</div>
                  </div>
                ))
              })()}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>
              <span>Départ: {state.weights[0]?.v}kg</span>
              <span>Actuel: {state.weights[state.weights.length-1]?.v}kg</span>
              <span>Objectif: 65kg</span>
            </div>
          </div>
        </>
      ) : (
        <div className="info-box">Commence à peser pour voir ta courbe de progression.</div>
      )}

      {/* Notifications */}
      <div className="slabel">RAPPELS & NOTIFICATIONS</div>
      <div className="notif-card">
        {[
          { key:'wake',  label:'☀️ Réveil matin' },
          { key:'sport', label:'⚡ Rappel sport soir' },
          { key:'water', label:'💧 Rappel hydratation' },
        ].map(({ key, label }) => (
          <div key={key} className="notif-row">
            <span className="notif-label">{label}</span>
            <input
              className="notif-time"
              type="time"
              value={state.notifs[key].time}
              onChange={e => updNotif(key, 'time', e.target.value)}
            />
            <button
              className={`notif-toggle${state.notifs[key].on?' on':''}`}
              onClick={() => togNotif(key)}
            ></button>
          </div>
        ))}
      </div>
      <button onClick={requestNotifs} style={{width:'100%',padding:'12px',background:'var(--bg3)',border:'0.5px solid var(--border2)',borderRadius:'var(--r)',color:'var(--accent)',fontSize:'11px',fontWeight:'500',cursor:'pointer',fontFamily:"'DM Mono',monospace",letterSpacing:'.05em',marginTop:'4px'}}>
        🔔 ACTIVER LES NOTIFICATIONS
      </button>
    </>
  )
}
