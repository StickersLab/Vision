export const LEVELS = [
  { min:0,     name:'Rookie',      next:500 },
  { min:500,   name:'Apprenti',    next:1500 },
  { min:1500,  name:'Warrior',     next:3000 },
  { min:3000,  name:'Hustler',     next:5000 },
  { min:5000,  name:'Focused',     next:8000 },
  { min:8000,  name:'Elite',       next:12000 },
  { min:12000, name:'Visionnaire', next:18000 },
  { min:18000, name:'Architect',   next:25000 },
  { min:25000, name:'Legend',      next:35000 },
  { min:35000, name:'Vision.',     next:null },
]

export function getLevel(xp) {
  let lvl = LEVELS[0]
  for (const l of LEVELS) { if (xp >= l.min) lvl = l }
  return { ...lvl, num: LEVELS.indexOf(lvl) + 1 }
}
