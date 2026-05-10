import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { LogoSmall } from './Icons'

export default function Onboarding() {
  const { dispatch } = useApp()
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')

  function finish() {
    if (!name.trim()) return
    dispatch({ type:'FINISH_ONBOARD', name: name.trim(), weight: parseFloat(weight) })
  }

  return (
    <div className="onboard">
      <LogoSmall />
      <h1>Vision.</h1>
      <p>Ton lifestyle OS personnel.<br/>Commence par te présenter.</p>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ton prénom"
        maxLength={20}
      />
      <input
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        placeholder="Ton poids actuel (kg)"
        step="0.1"
      />
      <button onClick={finish}>COMMENCER →</button>
    </div>
  )
}
