export function tdKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function load(k, fb) {
  try {
    const v = localStorage.getItem(k)
    return v ? JSON.parse(v) : fb
  } catch {
    return fb
  }
}

export function sv(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v))
  } catch {}
}
