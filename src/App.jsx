import { useEffect, useMemo, useState } from 'react'
import { events } from './data/events'
import { Header } from './components/Header'
import { Filters } from './components/Filters'
import { EventGrid } from './components/EventGrid'
import { LoginPage } from './components/LoginPage'
import { WelcomeLoader } from './components/WelcomeLoader'
import { RolePicker } from './components/RolePicker'
import { profiles } from './data/profiles'
import { OpportunityDashboard } from './components/OpportunityDashboard'
import { Toast } from './components/Toast'
import { ProfilePage } from './components/ProfilePage'
import { OpportunityPage } from './components/OpportunityPage'

const PAGE_SIZE = 12
const stored = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
const defaultUser = { name: 'frontdev', headline: 'Frontend builder · curious by default', location: 'Bangalore, India', skills: 'React, UI design, JavaScript', bio: 'I am building better interfaces, meeting curious people, and looking for opportunities where I can learn by making.' }

export default function App() {
  const [screen, setScreen] = useState('login')
  const [view, setView] = useState('board')
  const [role, setRole] = useState('Student')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('date')
  const [favourites, setFavourites] = useState(() => stored('devboard:favourites', []))
  const [applications, setApplications] = useState(() => stored('devboard:applications', []).map((application) => typeof application === 'string' ? { eventId: application, registeredAt: new Date().toISOString() } : application))
  const [user, setUser] = useState(() => stored('devboard:user', defaultUser))
  const [dark, setDark] = useState(() => stored('devboard:dark', false))
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showFavourites, setShowFavourites] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const profile = profiles[role]

  useEffect(() => { const id = window.setTimeout(() => setLoading(false), 500); return () => window.clearTimeout(id) }, [])
  useEffect(() => { localStorage.setItem('devboard:favourites', JSON.stringify(favourites)) }, [favourites])
  useEffect(() => { localStorage.setItem('devboard:applications', JSON.stringify(applications)) }, [applications])
  useEffect(() => { localStorage.setItem('devboard:user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('devboard:dark', JSON.stringify(dark)); document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { setVisibleCount(PAGE_SIZE) }, [category, query, showFavourites, sort])
  useEffect(() => { if (!toast) return undefined; const id = window.setTimeout(() => setToast(''), 3600); return () => window.clearTimeout(id) }, [toast])

  const visibleEvents = useMemo(() => events
    .filter((event) => !showFavourites || favourites.includes(event.id))
    .filter((event) => category === 'All' || event.category === category)
    .filter((event) => `${event.title} ${event.description} ${event.location} ${event.tags.join(' ')} ${event.organizer}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === 'category') return a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
      if (category === 'All') {
        const preference = profile.priorities.indexOf(a.category) - profile.priorities.indexOf(b.category)
        if (preference) return preference
      }
      return new Date(a.date) - new Date(b.date)
    }), [category, favourites, profile.priorities, query, showFavourites, sort])

  const toggleFavourite = (event) => setFavourites((current) => {
    const alreadySaved = current.includes(event.id)
    setToast(alreadySaved ? `Removed “${event.title}” from your saved list.` : `Saved “${event.title}” to your opportunity list.`)
    return alreadySaved ? current.filter((saved) => saved !== event.id) : [...current, event.id]
  })
  const registerForEvent = (event, details) => setApplications((current) => {
    if (current.some((application) => application.eventId === event.id)) return current
    setToast(`Registration confirmed for “${event.title}”. It is now on your profile.`)
    return [...current, { eventId: event.id, registeredAt: new Date().toISOString(), ...details }]
  })
  const goToDiscover = () => document.querySelector('#discover')?.scrollIntoView({ behavior: 'smooth' })
  const clearFilters = () => { setQuery(''); setCategory('All'); setShowFavourites(false) }
  const openFavourites = () => { setShowFavourites((open) => !open); setQuery(''); setCategory('All'); goToDiscover() }
  const selectCategory = (nextCategory) => { setCategory(nextCategory); setShowFavourites(false); goToDiscover() }
  const openEvent = (event) => { setSelectedEvent(event); setView('opportunity'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openRelatedEvent = (event) => { setSelectedEvent(event); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const profileEvents = (ids) => events.filter((event) => ids.includes(event.id))
  const registeredEvents = profileEvents(applications.map((application) => application.eventId))

  if (screen === 'login') return <LoginPage onLogin={() => setScreen('loading')} />
  if (screen === 'loading') return <WelcomeLoader onComplete={() => setScreen('role')} />
  if (screen === 'role') return <RolePicker initialRole={role} onContinue={(nextRole) => { setRole(nextRole); setScreen('app'); setView('board') }} />

  const returnToBoard = (action) => { setView('board'); window.setTimeout(action, 0) }
  const sharedHeader = <Header dark={dark} onSetTheme={setDark} favouriteCount={favourites.length} onFavourites={() => returnToBoard(openFavourites)} onDiscover={() => returnToBoard(goToDiscover)} onCategorySelect={(nextCategory) => returnToBoard(() => selectCategory(nextCategory))} profile={profile} onProfile={() => setView('profile')} />
  if (view === 'profile') return <div className="app-shell" id="top">{sharedHeader}<ProfilePage profile={profile} user={user} savedEvents={profileEvents(favourites)} appliedEvents={registeredEvents} onBack={() => setView('board')} onEditExperience={() => setScreen('role')} onOpenEvent={openEvent} onUpdateUser={setUser} /><Toast message={toast} onClose={() => setToast('')} /></div>
  if (view === 'opportunity' && selectedEvent) return <div className="app-shell" id="top">{sharedHeader}<OpportunityPage event={selectedEvent} user={user} isFavourite={favourites.includes(selectedEvent.id)} isRegistered={applications.some((application) => application.eventId === selectedEvent.id)} onFavourite={toggleFavourite} onRegister={registerForEvent} onBack={() => setView('board')} onProfile={() => setView('profile')} relatedEvents={events.filter((event) => event.category === selectedEvent.category && event.id !== selectedEvent.id).slice(0, 3)} onOpenEvent={openRelatedEvent} /><Toast message={toast} onClose={() => setToast('')} /></div>

  return (
    <div className="app-shell" id="top">
      {sharedHeader}
      <main>
        <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow"><span /> {profile.eyebrow}</p><h1 id="hero-title" className="hero-wordmark"><span className="hero-mark">&lt;/&gt;</span><span>devboard</span></h1><p className="hero-subtitle">{profile.subtitle}</p><button className="explore-link" onClick={goToDiscover}>Explore your board <span>↓</span></button></div><div className="hero-art" aria-hidden="true"><div className="hero-grid" /><div className="hero-planet"><span className="planet-ring" /><span className="planet-dot one" /><span className="planet-dot two" /><span className="planet-dot three" /></div><span className="floating-star star-one">✦</span><span className="floating-star star-two">✦</span></div></section>
        <section className="quick-links" aria-label="Browse event collections">{profile.quickLinks.map((link) => <button key={link.category} onClick={() => selectCategory(link.category)}><b>{link.number}</b><span>{link.title}<br /><em>{link.label}</em></span>→</button>)}</section>
        <OpportunityDashboard profile={profile} savedCount={favourites.length} appliedCount={applications.length} onBrowse={goToDiscover} onSaved={openFavourites} />
        <section className="discover-section" id="discover"><div className="section-title"><div><p className="eyebrow">YOUR {profile.label.toUpperCase()} BOARD</p><h2>{showFavourites ? 'Your saved opportunities.' : profile.discoverTitle}</h2></div>{showFavourites && <button className="show-all" onClick={() => setShowFavourites(false)}>Show all opportunities</button>}</div>{!showFavourites && <p className="personal-note"><span>{profile.icon}</span>{profile.discoveryNote}<button onClick={() => setScreen('role')}>Change profile</button></p>}<Filters query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} sort={sort} onSortChange={setSort} eventCount={visibleEvents.length} /><EventGrid events={visibleEvents.slice(0, visibleCount)} totalEvents={visibleEvents.length} favourites={favourites} onFavourite={toggleFavourite} onDetails={openEvent} loading={loading} onClearFilters={clearFilters} onLoadMore={() => setVisibleCount((count) => count + PAGE_SIZE)} profile={profile} /></section>
        <section className="community-section" id="community"><div><p className="eyebrow"><span /> DEVBOARD COMMUNITY</p><h2>Less scrolling.<br /><em>More showing up.</em></h2></div><div><p>Build a personal board around the ideas you care about. Save events now, then come back whenever you need a little momentum.</p><button onClick={openFavourites} className="community-link">See your saved board →</button></div></section>
      </main>
      <footer><a className="brand" href="#top"><span className="brand-mark">&lt;/&gt;</span>devboard</a><nav aria-label="Footer navigation"><button onClick={goToDiscover}>Explore</button><button onClick={() => selectCategory('Hackathon')}>Hackathons</button><button onClick={() => selectCategory('Workshop')}>Workshops</button><a href="#community">About DevBoard</a></nav><p>© 2026 DevBoard</p></footer>
      <Toast message={toast} onClose={() => setToast('')} />
    </div>
  )
}
