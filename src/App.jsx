import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Onboarding from './components/Onboarding'
import HomeScreen from './screens/HomeScreen'
import ModuleScreen from './screens/ModuleScreen'
import RoutineScreen from './screens/RoutineScreen'
import SportScreen from './screens/SportScreen'
import AlimScreen from './screens/AlimScreen'
import HistScreen from './screens/HistScreen'
import DashScreen from './screens/DashScreen'

function Inner() {
  const { state } = useApp()
  const [screen, setScreen] = useState('home')
  const [modId, setModId] = useState(null)

  function navigate(id) {
    setScreen(id)
    if (id !== 'module') setModId(null)
  }

  function openModule(id) {
    setModId(id)
    setScreen('module')
  }

  function goBack() {
    setModId(null)
    setScreen('home')
  }

  const screens = {
    home:    <HomeScreen onOpenModule={openModule} />,
    module:  <ModuleScreen modId={modId} onBack={goBack} />,
    routine: <RoutineScreen />,
    sport:   <SportScreen />,
    alim:    <AlimScreen />,
    hist:    <HistScreen />,
    dash:    <DashScreen />,
  }

  return (
    <div className="app">
      {!state.name && <Onboarding />}
      <div className="screen active">
        {screens[screen]}
      </div>
      <BottomNav screen={screen} onNavigate={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  )
}
