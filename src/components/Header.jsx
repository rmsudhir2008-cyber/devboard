import { Icon } from './Icon'

export function Header({ dark, onSetTheme, favouriteCount, onFavourites, onDiscover, onCategorySelect, profile, onProfile }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="DevBoard home"><span className="brand-mark">&lt;/&gt;</span>devboard</a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <button className="active" onClick={onDiscover}>Discover</button>
        <button onClick={() => onCategorySelect('Workshop')}>Workshops</button>
        <button onClick={onFavourites}>Favourites <span className="count-pill">{favouriteCount}</span></button>
      </nav>
      <div className="header-actions">
        <div className="theme-switch" role="group" aria-label="Color theme"><button onClick={() => onSetTheme(false)} className={!dark ? 'selected' : ''} aria-pressed={!dark}><Icon name="sun" size={14} />Light</button><button onClick={() => onSetTheme(true)} className={dark ? 'selected' : ''} aria-pressed={dark}><Icon name="moon" size={14} />Dark</button></div>
        <button className="profile-chip" onClick={onProfile} aria-label="Open your DevBoard profile"><span>{profile.icon}</span><b>My profile</b></button>
        <button className="join-button" onClick={onDiscover}>Browse 2,000 events <Icon name="arrow" size={16} /></button>
      </div>
    </header>
  )
}
