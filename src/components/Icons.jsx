export const CHK = (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="var(--bg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const FCHK = (
  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
    <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function Logo() {
  return (
    <svg width="38" height="38" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="6" y="2" width="4" height="1" fill="#E63946"/>
      <rect x="5" y="3" width="6" height="1" fill="#E63946"/>
      <rect x="5" y="4" width="6" height="5" fill="#C8102E"/>
      <rect x="6" y="9" width="4" height="2" fill="#C8102E"/>
      <rect x="7" y="11" width="2" height="3" fill="#C8102E"/>
      <rect x="5" y="3" width="1" height="1" fill="#C8F04A"/>
      <rect x="10" y="3" width="1" height="1" fill="#C8F04A"/>
      <rect x="5" y="7" width="1" height="1" fill="#C8F04A"/>
      <rect x="10" y="7" width="1" height="1" fill="#C8F04A"/>
    </svg>
  )
}

export function LogoSmall() {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="6" y="2" width="4" height="1" fill="#E63946"/>
      <rect x="5" y="3" width="6" height="1" fill="#E63946"/>
      <rect x="5" y="4" width="6" height="4" fill="#C8102E"/>
      <rect x="6" y="8" width="4" height="2" fill="#C8102E"/>
      <rect x="7" y="10" width="2" height="2" fill="#C8102E"/>
      <rect x="6" y="2" width="1" height="1" fill="#C8F04A"/>
      <rect x="9" y="2" width="1" height="1" fill="#C8F04A"/>
    </svg>
  )
}

export function HandIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="6" y="1" width="2" height="5" fill="#C8F04A"/>
      <rect x="9" y="2" width="2" height="4" fill="#C8F04A"/>
      <rect x="12" y="3" width="2" height="4" fill="#C8F04A"/>
      <rect x="3" y="5" width="2" height="4" fill="#C8F04A"/>
      <rect x="5" y="6" width="11" height="4" fill="#C8F04A"/>
      <rect x="4" y="9" width="1" height="2" fill="#C8F04A"/>
      <rect x="5" y="10" width="8" height="2" fill="#C8F04A"/>
      <rect x="5" y="12" width="6" height="1" fill="#C8F04A"/>
      <rect x="6" y="13" width="4" height="1" fill="#C8F04A"/>
    </svg>
  )
}

const iconPaths = {
  sleep: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="3" y="3" width="8" height="1" fill={c}/><rect x="9" y="4" width="2" height="1" fill={c}/>
      <rect x="7" y="5" width="2" height="1" fill={c}/><rect x="5" y="6" width="2" height="1" fill={c}/>
      <rect x="3" y="7" width="8" height="1" fill={c}/><rect x="7" y="9" width="6" height="1" fill={c}/>
      <rect x="11" y="10" width="2" height="1" fill={c}/><rect x="9" y="11" width="2" height="1" fill={c}/>
      <rect x="7" y="12" width="6" height="1" fill={c}/>
    </svg>
  ),
  mind: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="5" y="2" width="4" height="1" fill={c}/><rect x="3" y="3" width="6" height="1" fill={c}/>
      <rect x="7" y="3" width="4" height="1" fill={c}/><rect x="2" y="4" width="3" height="1" fill={c}/>
      <rect x="10" y="4" width="3" height="1" fill={c}/><rect x="1" y="5" width="3" height="3" fill={c}/>
      <rect x="4" y="4" width="4" height="2" fill={c}/><rect x="6" y="6" width="4" height="2" fill={c}/>
      <rect x="10" y="5" width="3" height="3" fill={c}/><rect x="12" y="8" width="2" height="2" fill={c}/>
      <rect x="2" y="8" width="2" height="2" fill={c}/><rect x="4" y="6" width="2" height="4" fill={c}/>
      <rect x="10" y="6" width="2" height="4" fill={c}/><rect x="5" y="8" width="6" height="3" fill={c}/>
      <rect x="4" y="10" width="8" height="2" fill={c}/><rect x="5" y="12" width="6" height="1" fill={c}/>
    </svg>
  ),
  focus: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="7" y="0" width="2" height="2" fill={c}/><rect x="6" y="2" width="4" height="1" fill={c}/>
      <rect x="5" y="3" width="6" height="2" fill={c}/><rect x="4" y="5" width="8" height="2" fill={c}/>
      <rect x="5" y="7" width="6" height="3" fill={c}/><rect x="6" y="10" width="4" height="2" fill={c}/>
      <rect x="7" y="12" width="2" height="2" fill={c}/><rect x="3" y="7" width="2" height="3" fill={c}/>
      <rect x="11" y="7" width="2" height="3" fill={c}/><rect x="2" y="10" width="2" height="2" fill={c}/>
      <rect x="12" y="10" width="2" height="2" fill={c}/><rect x="6" y="13" width="1" height="2" fill="#F06080"/>
      <rect x="9" y="13" width="1" height="2" fill="#F06080"/><rect x="7" y="14" width="2" height="1" fill="#F0A050"/>
    </svg>
  ),
  read: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="2" y="2" width="6" height="1" fill={c}/><rect x="8" y="2" width="6" height="1" fill={c}/>
      <rect x="2" y="3" width="1" height="9" fill={c}/><rect x="13" y="3" width="1" height="9" fill={c}/>
      <rect x="7" y="3" width="2" height="9" fill={c}/><rect x="3" y="5" width="4" height="1" fill={c}/>
      <rect x="9" y="5" width="4" height="1" fill={c}/><rect x="3" y="7" width="4" height="1" fill={c}/>
      <rect x="9" y="7" width="4" height="1" fill={c}/><rect x="3" y="9" width="3" height="1" fill={c}/>
      <rect x="9" y="9" width="3" height="1" fill={c}/><rect x="2" y="12" width="12" height="1" fill={c}/>
      <rect x="3" y="13" width="10" height="1" fill={c}/>
    </svg>
  ),
  medite: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="6" y="1" width="4" height="1" fill={c}/><rect x="5" y="2" width="6" height="2" fill={c}/>
      <rect x="6" y="4" width="4" height="1" fill={c}/><rect x="7" y="5" width="2" height="2" fill={c}/>
      <rect x="5" y="7" width="6" height="1" fill={c}/><rect x="4" y="8" width="8" height="2" fill={c}/>
      <rect x="2" y="10" width="12" height="1" fill={c}/><rect x="0" y="11" width="16" height="2" fill={c}/>
    </svg>
  ),
  water: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="7" y="1" width="2" height="1" fill={c}/><rect x="6" y="2" width="4" height="1" fill={c}/>
      <rect x="5" y="3" width="6" height="1" fill={c}/><rect x="4" y="4" width="8" height="1" fill={c}/>
      <rect x="3" y="5" width="10" height="5" fill={c}/><rect x="2" y="7" width="1" height="3" fill={c}/>
      <rect x="13" y="7" width="1" height="3" fill={c}/><rect x="3" y="10" width="10" height="1" fill={c}/>
      <rect x="4" y="11" width="8" height="1" fill={c}/><rect x="5" y="12" width="6" height="1" fill={c}/>
      <rect x="6" y="13" width="4" height="1" fill={c}/><rect x="5" y="6" width="2" height="2" fill="rgba(255,255,255,0.3)"/>
    </svg>
  ),
  finance: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="1" y="4" width="14" height="1" fill={c}/><rect x="1" y="5" width="1" height="6" fill={c}/>
      <rect x="14" y="5" width="1" height="6" fill={c}/><rect x="1" y="10" width="14" height="1" fill={c}/>
      <rect x="2" y="5" width="2" height="5" fill={c}/><rect x="12" y="5" width="2" height="5" fill={c}/>
      <rect x="6" y="6" width="4" height="1" fill={c}/><rect x="5" y="7" width="6" height="2" fill={c}/>
      <rect x="6" y="9" width="4" height="1" fill={c}/><rect x="7" y="6" width="2" height="4" fill={c}/>
    </svg>
  ),
  mass: (c) => (
    <svg width="22" height="22" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="0" y="6" width="2" height="4" fill={c}/><rect x="2" y="5" width="2" height="6" fill={c}/>
      <rect x="4" y="7" width="8" height="2" fill={c}/><rect x="12" y="5" width="2" height="6" fill={c}/>
      <rect x="14" y="6" width="2" height="4" fill={c}/>
    </svg>
  ),
}

export function ModuleIcon({ ic, color }) {
  const fn = iconPaths[ic]
  if (!fn) return null
  return fn(color)
}

// Nav icons
export function HomeNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="7" y="1" width="2" height="1" fill="currentColor"/><rect x="5" y="2" width="6" height="1" fill="currentColor"/>
      <rect x="3" y="3" width="10" height="1" fill="currentColor"/><rect x="2" y="4" width="12" height="2" fill="currentColor"/>
      <rect x="2" y="6" width="5" height="8" fill="currentColor"/><rect x="9" y="6" width="5" height="8" fill="currentColor"/>
      <rect x="6" y="9" width="4" height="5" fill="currentColor"/>
    </svg>
  )
}
export function RoutineNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="2" y="1" width="12" height="1" fill="currentColor"/><rect x="2" y="2" width="1" height="12" fill="currentColor"/>
      <rect x="13" y="2" width="1" height="12" fill="currentColor"/><rect x="2" y="13" width="12" height="1" fill="currentColor"/>
      <rect x="4" y="5" width="1" height="1" fill="currentColor"/><rect x="6" y="5" width="6" height="1" fill="currentColor"/>
      <rect x="4" y="8" width="1" height="1" fill="currentColor"/><rect x="6" y="8" width="6" height="1" fill="currentColor"/>
      <rect x="4" y="11" width="1" height="1" fill="currentColor"/><rect x="6" y="11" width="4" height="1" fill="currentColor"/>
    </svg>
  )
}
export function SportNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="0" y="6" width="2" height="4" fill="currentColor"/><rect x="2" y="5" width="2" height="6" fill="currentColor"/>
      <rect x="4" y="7" width="8" height="2" fill="currentColor"/><rect x="12" y="5" width="2" height="6" fill="currentColor"/>
      <rect x="14" y="6" width="2" height="4" fill="currentColor"/>
    </svg>
  )
}
export function AlimNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="3" y="1" width="2" height="5" fill="currentColor"/><rect x="2" y="2" width="1" height="3" fill="currentColor"/>
      <rect x="5" y="2" width="1" height="3" fill="currentColor"/><rect x="2" y="6" width="4" height="1" fill="currentColor"/>
      <rect x="3" y="7" width="2" height="7" fill="currentColor"/><rect x="9" y="1" width="2" height="1" fill="currentColor"/>
      <rect x="8" y="2" width="4" height="5" fill="currentColor"/><rect x="9" y="7" width="2" height="7" fill="currentColor"/>
    </svg>
  )
}
export function HistNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="1" y="1" width="2" height="2" fill="currentColor" opacity=".3"/><rect x="4" y="1" width="2" height="2" fill="currentColor" opacity=".5"/>
      <rect x="7" y="1" width="2" height="2" fill="currentColor"/><rect x="10" y="1" width="2" height="2" fill="currentColor" opacity=".7"/>
      <rect x="13" y="1" width="2" height="2" fill="currentColor" opacity=".4"/><rect x="1" y="4" width="2" height="2" fill="currentColor" opacity=".6"/>
      <rect x="4" y="4" width="2" height="2" fill="currentColor"/><rect x="7" y="4" width="2" height="2" fill="currentColor" opacity=".8"/>
      <rect x="10" y="4" width="2" height="2" fill="currentColor" opacity=".3"/><rect x="13" y="4" width="2" height="2" fill="currentColor"/>
      <rect x="1" y="7" width="2" height="2" fill="currentColor"/><rect x="4" y="7" width="2" height="2" fill="currentColor" opacity=".4"/>
      <rect x="7" y="7" width="2" height="2" fill="currentColor" opacity=".7"/><rect x="10" y="7" width="2" height="2" fill="currentColor"/>
      <rect x="13" y="7" width="2" height="2" fill="currentColor" opacity=".5"/><rect x="1" y="10" width="14" height="1" fill="currentColor" opacity=".3"/>
      <rect x="1" y="12" width="14" height="2" fill="currentColor" opacity=".2"/>
    </svg>
  )
}
export function DashNavIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" style={{imageRendering:'pixelated'}} fill="none">
      <rect x="1" y="9" width="3" height="5" fill="currentColor"/><rect x="5" y="6" width="3" height="8" fill="currentColor"/>
      <rect x="9" y="3" width="3" height="11" fill="currentColor"/><rect x="13" y="1" width="2" height="13" fill="currentColor" opacity=".5"/>
      <rect x="1" y="14" width="15" height="1" fill="currentColor" opacity=".4"/>
    </svg>
  )
}
