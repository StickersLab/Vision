export function todayDays() {
  const labels = ['D','L','M','M','J','V','S']
  const today = new Date().getDay()
  return labels.map((l, i) => ({ l, done: i < today, today: i === today }))
}

export function recentMuscles(sportHist) {
  const res = []
  for (let d = 1; d <= 2; d++) {
    const dt = new Date(); dt.setDate(dt.getDate() - d)
    const k = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`
    if (sportHist[k]) res.push(...sportHist[k])
  }
  return [...new Set(res)]
}
