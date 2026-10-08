import { useState } from 'react'
import { Icon } from './Icon'
import './loginBoard.css'

export function LoginPage({ onLogin }) {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (loginId === 'frontdev' && password === '12345678') return onLogin()
    setError('Invalid login ID or password. Please try again.')
  }

  return <main className="login-page official-login"><section className="login-card official-login-card" aria-labelledby="login-title"><a className="brand official-login-brand" href="#top" aria-label="DevBoard home"><span className="brand-mark">&lt;/&gt;</span><span>devboard</span></a><div className="login-form-wrap"><p className="eyebrow"><span /> SECURE SIGN IN</p><h1 id="login-title">Welcome back.</h1><p className="login-copy">Sign in to continue to your DevBoard.</p><form onSubmit={submit}><label>Login ID<input value={loginId} onChange={(event) => setLoginId(event.target.value)} autoComplete="username" placeholder="Enter your login ID" required /></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Enter your password" required /></label>{error && <p className="login-error" role="alert">{error}</p>}<button className="login-submit" type="submit">Sign in <Icon name="arrow" size={17} /></button></form></div><p className="login-footer-note">© 2026 DevBoard</p></section><aside className="login-aside official-login-aside" aria-hidden="true"><div className="login-board-visual"><div className="board-top"><span><i>&lt;/&gt;</i> devboard</span><b>YOUR BOARD</b></div><div className="board-cards"><article className="board-event board-violet"><small>HACKATHON</small><b>Build for Tomorrow</b><span>⌁ 1,284 builders</span></article><article className="board-event board-orange"><small>WORKSHOP</small><b>Design Systems, Live</b><span>◎ Starts this week</span></article><article className="board-event board-blue"><small>CONFERENCE</small><b>The AI Shift</b><span>↗ 2,813 attending</span></article></div><div className="board-progress"><span>YOUR MOMENTUM</span><i><b /></i><em>68%</em></div></div><div className="official-brand-echo"><span>&lt;/&gt;</span><i>devboard</i></div></aside></main>
}
