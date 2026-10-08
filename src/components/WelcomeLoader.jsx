import { useEffect, useMemo, useState } from 'react'

const loadingMessages = [
  'Mapping events to your interests…',
  'Finding rooms full of good ideas…',
  'Tuning your DevBoard experience…',
  'Almost there — making it feel like yours…',
]

export function WelcomeLoader({ duration = 7000, onComplete }) {
  const [progress, setProgress] = useState(0)
  const message = useMemo(() => loadingMessages[Math.min(loadingMessages.length - 1, Math.floor(progress / 25))], [progress])
  useEffect(() => {
    const started = Date.now()
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round(((Date.now() - started) / duration) * 100))
      setProgress(next)
      if (next === 100) { window.clearInterval(timer); onComplete() }
    }, 70)
    return () => window.clearInterval(timer)
  }, [duration, onComplete])
  return <main className="welcome-loader"><div className="loader-grid" aria-hidden="true" /><div className="loader-content"><a className="brand"><span className="brand-mark">&lt;/&gt;</span>devboard</a><div className="loader-scene" aria-hidden="true"><div className="loader-orbit"><span /><i /><b /></div><span className="loader-comet comet-one" /><span className="loader-comet comet-two" /><span className="loader-star loader-star-one">✦</span><span className="loader-star loader-star-two">✦</span><span className="loader-star loader-star-three">✦</span></div><p className="eyebrow"><span /> PERSONALISING YOUR BOARD</p><h1>Curating ideas<br />worth showing up for.</h1><div className="progress-wrap"><div><span>CONNECTING YOU TO DEVBOARD</span><b>{progress}%</b></div><i><em style={{ width: `${progress}%` }} /></i></div><p className="loader-note" aria-live="polite">{message}</p></div></main>
}
