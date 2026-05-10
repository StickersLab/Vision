import { HomeNavIcon, RoutineNavIcon, SportNavIcon, AlimNavIcon, HistNavIcon, DashNavIcon } from './Icons'

const TABS = [
  { id:'home',    label:'Home',       Icon: HomeNavIcon },
  { id:'routine', label:'Routine',    Icon: RoutineNavIcon },
  { id:'sport',   label:'Sport',      Icon: SportNavIcon },
  { id:'alim',    label:'Alim',       Icon: AlimNavIcon },
  { id:'hist',    label:'Historique', Icon: HistNavIcon },
  { id:'dash',    label:'Stats',      Icon: DashNavIcon },
]

export default function BottomNav({ screen, onNavigate }) {
  const activeTab = screen === 'module' ? 'home' : screen

  return (
    <nav className="bnav">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`nb${activeTab === id ? ' on' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <Icon />
          <span className="nb-label">{label}</span>
        </button>
      ))}
    </nav>
  )
}
