import { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import { load, sv, tdKey } from '../utils/storage'
import { DEF_MODS } from '../data/modules'
import { DEF_ROUTINE } from '../data/routine'
import { DEF_COURSES } from '../data/nutrition'

// Clé du jour — change automatiquement à minuit → reset daily
const tk = tdKey()

// ── XP helpers (dupliqués ici pour le reducer) ────────────────────────────────
function computeXp(state) {
  let x = 0
  state.mods.forEach(m => m.checks.forEach((_, i) => {
    if (state.checks[`${m.id}_${i}`]) x += m.xps[i] || 10
  }))
  state.routine.morning.forEach((ri, i) => { if (state.rchecks[`m_${i}`]) x += ri.xp })
  state.routine.evening.forEach((ri, i) => { if (state.rchecks[`e_${i}`]) x += ri.xp })
  x += state.sportDone.length * 15
  return x
}

// ── État initial — prefix v4_ pour repartir de zéro ──────────────────────────
const INIT = {
  name:         load('v4_name', ''),
  mods:         load('v4_mods', DEF_MODS),
  checks:       load(`v4_chk_${tk}`, {}),       // reset chaque jour
  routine:      load('v4_rout', DEF_ROUTINE),
  rchecks:      load(`v4_rc_${tk}`, {}),         // reset chaque jour
  waters:       load(`v4_wat_${tk}`, Array(10).fill(false)), // reset chaque jour
  sportDone:    load(`v4_sport_${tk}`, []),      // reset chaque jour
  sportHist:    load('v4_sporthist', {}),
  sportStarted: load(`v4_ss_${tk}`, false),      // reset chaque jour
  courses:      load('v4_courses_chk', {}),      // persistant (liste de courses)
  coursesData:  load('v4_courses_data', DEF_COURSES), // persistant
  weights:      load('v4_weights', []),
  weightGoal:   load('v4_weight_goal', 65),
  nailStreak:   load('v4_nail', { days:{}, count:0 }),
  notifs:       load('v4_notifs', { wake:{on:false,time:'05:30'}, sport:{on:false,time:'18:30'}, water:{on:false,time:'10:00'} }),
  scores:       load('v4_scores', {}),
  isDark:       load('v4_dark', true),
}

function persist(state) {
  sv('v4_name',         state.name)
  sv('v4_mods',         state.mods)
  sv(`v4_chk_${tk}`,    state.checks)
  sv('v4_rout',         state.routine)
  sv(`v4_rc_${tk}`,     state.rchecks)
  sv(`v4_wat_${tk}`,    state.waters)
  sv(`v4_sport_${tk}`,  state.sportDone)
  sv('v4_sporthist',    state.sportHist)
  sv(`v4_ss_${tk}`,     state.sportStarted)
  sv('v4_courses_chk',  state.courses)
  sv('v4_courses_data', state.coursesData)
  sv('v4_weights',      state.weights)
  sv('v4_weight_goal',  state.weightGoal)
  sv('v4_nail',         state.nailStreak)
  sv('v4_notifs',       state.notifs)
  sv('v4_scores',       state.scores)
  sv('v4_dark',         state.isDark)
}

function reducer(state, action) {
  let next

  switch (action.type) {

    case 'FINISH_ONBOARD': {
      const { name, weight, goal } = action
      const weights = weight > 30
        ? [{ v: weight, date: new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) }]
        : []
      next = { ...state, name, weights, weightGoal: goal > 30 ? goal : 65 }
      break
    }

    case 'TOG_CHK': {
      const key = `${action.modId}_${action.idx}`
      next = { ...state, checks: { ...state.checks, [key]: !state.checks[key] } }
      break
    }

    case 'TOG_WATER': {
      const w = [...state.waters]; w[action.i] = !w[action.i]
      next = { ...state, waters: w }
      break
    }

    case 'TOG_RC': {
      const key = `${action.tab}_${action.i}`
      next = { ...state, rchecks: { ...state.rchecks, [key]: !state.rchecks[key] } }
      break
    }

    case 'TOG_COURSE':
      next = { ...state, courses: { ...state.courses, [action.key]: !state.courses[action.key] } }
      break

    case 'CLEAR_COURSES':
      next = { ...state, courses: {} }
      break

    case 'ADD_COURSE_ITEM': {
      const coursesData = state.coursesData.map((cat, ci) => {
        if (ci !== action.catIdx) return cat
        return { ...cat, items: [...cat.items, { n: action.name, q: action.qty || '', w: '' }] }
      })
      next = { ...state, coursesData }
      break
    }

    case 'DEL_COURSE_ITEM': {
      const coursesData = state.coursesData.map((cat, ci) => {
        if (ci !== action.catIdx) return cat
        return { ...cat, items: cat.items.filter((_, ii) => ii !== action.itemIdx) }
      })
      next = { ...state, coursesData }
      break
    }

    case 'TOG_NAIL': {
      const days = { ...(state.nailStreak.days || {}), [action.i]: !state.nailStreak.days?.[action.i] }
      const count = Object.values(days).filter(Boolean).length
      next = { ...state, nailStreak: { days, count } }
      break
    }

    case 'SAVE_WEIGHT': {
      const date = new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})
      const weights = [...state.weights, { v: action.v, date }]
      if (weights.length > 60) weights.shift()
      next = { ...state, weights }
      break
    }

    case 'SET_WEIGHT_GOAL':
      next = { ...state, weightGoal: action.goal }
      break

    case 'UPD_MOD_CHK': {
      const mods = state.mods.map(m => {
        if (m.id !== action.modId) return m
        const checks = [...m.checks]; checks[action.idx] = action.val
        return { ...m, checks }
      })
      next = { ...state, mods }
      break
    }

    case 'DEL_MOD_CHK': {
      const mods = state.mods.map(m => {
        if (m.id !== action.modId) return m
        return { ...m, checks: m.checks.filter((_, i) => i !== action.idx), xps: m.xps.filter((_, i) => i !== action.idx) }
      })
      next = { ...state, mods }
      break
    }

    case 'ADD_MOD_CHK': {
      const mods = state.mods.map(m => {
        if (m.id !== action.modId) return m
        return { ...m, checks: [...m.checks, 'Nouvelle tâche'], xps: [...m.xps, 10] }
      })
      next = { ...state, mods }
      break
    }

    case 'UPD_ROUT': {
      const arr = [...state.routine[action.key]]
      arr[action.idx] = { ...arr[action.idx], [action.field]: action.field === 'xp' ? parseInt(action.val)||0 : action.val }
      next = { ...state, routine: { ...state.routine, [action.key]: arr } }
      break
    }

    case 'DEL_ROUT':
      next = { ...state, routine: { ...state.routine, [action.key]: state.routine[action.key].filter((_, i) => i !== action.idx) } }
      break

    case 'ADD_ROUT':
      next = { ...state, routine: { ...state.routine, [action.key]: [...state.routine[action.key], { time:'00h00', label:'Nouvelle étape', note:'', xp:10 }] } }
      break

    case 'TOG_EXO': {
      const idx = state.sportDone.findIndex(e => e.n === action.name)
      let sportDone
      if (idx >= 0) sportDone = state.sportDone.filter(e => e.n !== action.name)
      else if (state.sportDone.length < 8) sportDone = [...state.sportDone, { n:action.name, s:action.s, r:action.rep, tip:action.tip, gid:action.gid }]
      else sportDone = state.sportDone
      next = { ...state, sportDone }
      break
    }

    case 'RM_EXO':
      next = { ...state, sportDone: state.sportDone.filter(e => e.n !== action.name) }
      break

    case 'SET_SPORT_DONE':
      next = { ...state, sportDone: action.exercises }
      break

    case 'LAUNCH_SPORT': {
      const hist = { ...state.sportHist, [tk]: [...new Set(state.sportDone.map(e => e.gid))] }
      next = { ...state, sportHist: hist, sportStarted: true }
      break
    }

    case 'TOG_NOTIF':
      next = { ...state, notifs: { ...state.notifs, [action.key]: { ...state.notifs[action.key], on: !state.notifs[action.key].on } } }
      break

    case 'UPD_NOTIF':
      next = { ...state, notifs: { ...state.notifs, [action.key]: { ...state.notifs[action.key], [action.field]: action.val } } }
      break

    case 'TOGGLE_THEME':
      next = { ...state, isDark: !state.isDark }
      break

    default:
      return state
  }

  // ── Auto-sauvegarde du score du jour à chaque action ─────────────────────
  const todayScore = computeXp(next)
  next = { ...next, scores: { ...next.scores, [tk]: todayScore } }

  persist(next)
  return next
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT)

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('light', !state.isDark)
  }, [state.isDark])

  // Notifications
  const notifRef = useRef(null)
  useEffect(() => {
    if (notifRef.current) clearInterval(notifRef.current)
    notifRef.current = setInterval(() => {
      const now = new Date()
      const hm = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
      if (state.notifs.wake.on  && state.notifs.wake.time  === hm) new Notification('Vision. ☀️', { body: `Réveil ${state.name} !` })
      if (state.notifs.sport.on && state.notifs.sport.time === hm) new Notification('Vision. ⚡', { body: "Heure de la muscu !" })
      if (state.notifs.water.on && state.notifs.water.time === hm) new Notification('Vision. 💧', { body: "Rappel hydratation !" })
    }, 60000)
    return () => clearInterval(notifRef.current)
  }, [state.notifs, state.name])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() { return useContext(AppContext) }

// ── Sélecteurs exportés ───────────────────────────────────────────────────────
export function modPct(mods, checks, id) {
  const m = mods.find(x => x.id === id)
  if (!m || !m.checks.length) return 0
  const done = m.checks.filter((_, i) => checks[`${id}_${i}`]).length
  return Math.round(done / m.checks.length * 100)
}

export function xpToday(state) { return computeXp(state) }

export function maxXpDay(state) {
  let x = 0
  state.mods.forEach(m => m.xps.forEach(xp => x += xp))
  state.routine.morning.forEach(ri => x += ri.xp)
  state.routine.evening.forEach(ri => x += ri.xp)
  return x
}
