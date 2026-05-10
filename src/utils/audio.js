// AudioContext created lazily after first user gesture to avoid browser warnings
let _ac = null

function getAC() {
  if (!_ac) {
    try {
      _ac = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      return null
    }
  }
  return _ac
}

function beep(freq = 880, dur = 0.15, type = 'sine') {
  try {
    const ac = getAC()
    if (!ac) return
    if (ac.state === 'suspended') ac.resume()
    const o = ac.createOscillator()
    const g = ac.createGain()
    o.connect(g); g.connect(ac.destination)
    o.frequency.value = freq; o.type = type
    g.gain.setValueAtTime(0.3, ac.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur)
    o.start(); o.stop(ac.currentTime + dur)
  } catch {}
}

export function beepStart() { beep(660, .1); setTimeout(() => beep(880, .15), 120) }
export function beepEnd()   { beep(440, .1); setTimeout(() => beep(330, .2), 120) }
export function beepTick()  { beep(1200, .05) }
