import { useEffect, useState } from 'react'
import { Icon } from './Icon'

const formatDate = (value) => new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value))

export function EventModal({ event, isFavourite, isRegistered, onFavourite, onRegister, onClose, relatedEvents, onOpenRelated }) {
  const [activeTab, setActiveTab] = useState('overview')
  useEffect(() => {
    const handleKey = (keyEvent) => keyEvent.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])
  useEffect(() => { setActiveTab('overview') }, [event?.id])
  if (!event) return null
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className={`event-modal ${event.color}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(mouseEvent) => mouseEvent.stopPropagation()}>
        <div className="modal-visual"><div className="visual-orb orb-one" /><div className="visual-orb orb-two" /><span className="modal-type">{event.category}</span><button className="modal-close" onClick={onClose} aria-label="Close details"><Icon name="close" size={20} /></button></div>
        <div className="modal-content">
          <div className="modal-title-row"><div><p className="eyebrow">UPCOMING {event.category}</p><h2 id="modal-title">{event.title}</h2></div><button onClick={() => onFavourite(event)} className={`save-event ${isFavourite ? 'saved' : ''}`}><Icon name="heart" size={18} />{isFavourite ? 'Saved' : 'Save opportunity'}</button></div>
          <div className="opportunity-signal-row"><span className="signal-deadline">● {event.deadline}</span><span>{event.registrations}</span></div>
          <div className="detail-tabs" role="tablist" aria-label="Event details"><button role="tab" aria-selected={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</button><button role="tab" aria-selected={activeTab === 'rounds'} onClick={() => setActiveTab('rounds')}>Rounds</button><button role="tab" aria-selected={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')}>Agenda</button><button role="tab" aria-selected={activeTab === 'people'} onClick={() => setActiveTab('people')}>People</button></div>
          {activeTab === 'overview' && <><p className="modal-description">{event.description}</p><div className="detail-list"><p><Icon name="calendar" size={18} /><span><b>When</b>{formatDate(event.date)}</span></p><p><Icon name="pin" size={18} /><span><b>Where</b>{event.location}</span></p><p><Icon name="users" size={18} /><span><b>Who’s coming</b>{event.attendees}</span></p></div><div className="event-facts"><span><b>Duration</b>{event.duration}</span><span><b>Entry</b>{event.price}</span><span><b>Level</b>{event.level}</span><span><b>Hosted by</b><button onClick={() => setActiveTab('people')}>{event.organizer}</button></span></div><div className="eligibility-box"><span>◎</span><p><b>{event.reward}</b>{event.eligibility}</p></div></>}
          {activeTab === 'rounds' && <div className="rounds-list">{event.rounds.map((round, index) => <div key={round.title}><span>{index + 1}</span><p><b>{round.title}</b>{round.note}</p></div>)}</div>}
          {activeTab === 'agenda' && <div className="agenda-list">{event.agenda.map((item) => <div key={item.time}><b>{item.time}</b><span><strong>{item.title}</strong>{item.note}</span></div>)}</div>}
          {activeTab === 'people' && <div className="people-panel"><p><b>Hosted by</b><button>{event.organizer}</button></p><h3>People you’ll hear from</h3>{event.speakers.map((speaker) => <button className="speaker" key={speaker}><span>{speaker.split(' ')[0].slice(0, 1)}</span>{speaker} <Icon name="arrow" size={14} /></button>)}</div>}
          <div className="modal-bottom"><div className="tags">{event.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className={`register-button ${isRegistered ? 'registered' : ''}`} onClick={() => onRegister(event)}>{isRegistered ? 'Application started' : `Register ${event.price.toLowerCase()}`} <Icon name={isRegistered ? 'check' : 'arrow'} size={16} /></button></div>
          <section className="related-events"><p className="eyebrow">MORE TO EXPLORE</p><h3>Similar events you may like</h3><div>{relatedEvents.map((related) => <button key={related.id} onClick={() => onOpenRelated(related)}><span className={`related-dot ${related.color}`} />{related.title}<Icon name="arrow" size={14} /></button>)}</div></section>
        </div>
      </section>
    </div>
  )
}
