import { useApp, xpToday } from '../context/AppContext'
import { load } from '../utils/storage'
import { getLevel, LEVELS } from '../utils/levels'

const WEEK_STATS = [
  {n:'Sommeil',p:85,c:'#B8A0F8'},{n:'Mindset',p:90,c:'#F472B6'},
  {n:'Focus',p:60,c:'#8BE8C8'},{n:'Lecture',p:75,c:'#F0A050'},
  {n:'Méditation',p:65,c:'#8BE8C8'},{n:'Hydratation',p:80,c:'#5BB8F5'},
  {n:'Finance',p:40,c:'#C8F04A'},{n:'Masse',p:30,c:'#B8A0F8'},
]

const BADGES_DONE = ['🌙 Première nuit parfaite','⚡ Première séance','💧 Hydraté 7 jours','📖 Premier livre']

export default function DashScreen() {
  const { state } = useApp()
  const earned = xpToday(state)
  const totalXp = load('v3_totalxp', 1240) + earned
  const lvl = getLevel(totalXp)
  const avg = Math.round(WEEK_STATS.reduce((a, w) => a + w.p, 0) / WEEK_STATS.length)
  const nailPct = Math.min(Math.round((state.nailStreak.count / 90) * 100), 100)

  const objs = [
    {l:'Prise de masse',t:'59→65kg (+0.3kg/sem)',p:8,c:'#B8A0F8'},
    {l:'Course à pied',t:'5km sans arrêt',p:12,c:'#8BE8C8'},
    {l:'Lecture',t:'6 livres (1/15j)',p:33,c:'#F0A050'},
    {l:'Épargne',t:'30% revenus/mois',p:50,c:'#C8F04A'},
    {l:'Ongles',t:'90j sans ronger',p:nailPct,c:'#F472B6'},
  ]

  const bnext = [
    {ic:'🔥',l:'Streak 7 jours',p:'4/7',pct:57},
    {ic:'🏆',l:'10 séances',p:'2/10',pct:20},
    {ic:'🧠',l:'21j journal',p:'4/21',pct:19},
    {ic:'💪',l:'+2kg masse',p:'0/2',pct:5},
    {ic:'💅',l:'Ongles 30j',p:`${state.nailStreak.count}/30`,pct:Math.min(Math.round((state.nailStreak.count/30)*100),100)},
  ]

  return (
    <>
      <div className="topbar">
        <div><div className="accent-line"></div><div className="app-name" style={{fontSize:'22px'}}>Stats</div></div>
        <div className="topbar-meta">BILAN<br/>SEMAINE</div>
      </div>

      <div className="card" style={{textAlign:'center',marginBottom:'16px'}}>
        <div style={{fontSize:'11px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginBottom:'4px'}}>NIVEAU ACTUEL</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:'28px',fontWeight:'800',color:'var(--accent)'}}>{lvl.num}. {lvl.name}</div>
        <div style={{fontSize:'11px',color:'var(--text3)',fontFamily:"'DM Mono',monospace",marginTop:'4px'}}>
          {totalXp} XP total{lvl.next ? ` · ${lvl.next-totalXp} XP vers NIV.${lvl.num+1}` : ' · MAX 🏆'}
        </div>
      </div>

      <div className="mg2">
        <div className="mc"><div className="mv">{avg}%</div><div className="ml">SCORE SEMAINE</div></div>
        <div className="mc"><div className="mv">4 🔥</div><div className="ml">STREAK</div></div>
        <div className="mc"><div className="mv">NIV.{lvl.num}</div><div className="ml">{lvl.name.toUpperCase()}</div></div>
        <div className="mc"><div className="mv">{totalXp}</div><div className="ml">XP TOTAL</div></div>
      </div>

      <div className="slabel">PILIERS — CETTE SEMAINE</div>
      <div className="card" style={{marginBottom:'16px'}}>
        {WEEK_STATS.map(w => (
          <div key={w.n} className="wbr">
            <span className="wbl">{w.n}</span>
            <div className="wb"><div className="wbf" style={{width:`${w.p}%`,background:w.c}}></div></div>
            <span className="wbv">{w.p}%</span>
          </div>
        ))}
      </div>

      <div className="slabel">OBJECTIFS 90 JOURS</div>
      <div className="card" style={{marginBottom:'16px'}}>
        {objs.map((o, i) => (
          <div key={o.l} style={{marginBottom:i<objs.length-1?'14px':'0'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'3px'}}>
              <span style={{fontSize:'13px',fontWeight:'500'}}>{o.l}</span>
              <span style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{o.p}%</span>
            </div>
            <div style={{fontSize:'11px',color:'var(--text3)',marginBottom:'6px'}}>{o.t}</div>
            <div className="xpbar"><div className="xpfill" style={{width:`${o.p}%`,background:o.c}}></div></div>
          </div>
        ))}
      </div>

      <div className="slabel">BADGES DÉBLOQUÉS</div>
      <div style={{marginBottom:'16px'}}>
        {BADGES_DONE.map(b => <span key={b} className="badge">{b}</span>)}
      </div>

      <div className="slabel">PROCHAINS BADGES</div>
      <div className="card">
        {bnext.map((b, i) => (
          <div key={b.l} className="next-badge" style={i===bnext.length-1?{border:'none',margin:0,padding:0}:{}}>
            <span style={{fontSize:'20px',width:'32px',textAlign:'center'}}>{b.ic}</span>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'5px'}}>
                <span style={{fontSize:'13px',fontWeight:'500'}}>{b.l}</span>
                <span style={{fontSize:'10px',color:'var(--text3)',fontFamily:"'DM Mono',monospace"}}>{b.p}</span>
              </div>
              <div className="xpbar"><div className="xpfill" style={{width:`${b.pct}%`,background:'#B8A0F8'}}></div></div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
