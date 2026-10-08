import { Icon } from './Icon'

const month = new Intl.DateTimeFormat('en-US', { month: 'short' })

const matchFor = (event, profile) => {
  if (profile.label === 'Student') return event.category === 'Workshop' || event.category === 'Hackathon' ? 'Great for your portfolio' : 'Build your network'
  if (profile.label === 'Professor') return event.category === 'Conference' || event.category === 'Workshop' ? 'Relevant to your practice' : 'A strong community signal'
  return event.category === 'Conference' || event.category === 'Meetup' ? 'Strong industry signal' : 'See emerging ideas early'
}

export function EventCard({ event, isFavourite, onFavourite, onDetails, profile }) {
  const date = new Date(event.date)
  return (
    <article className={`event-card opportunity-card ${event.color} ${event.visual}`}>
      <div className="card-visual" aria-hidden="true">
        <div className="visual-orb orb-one" /><div className="visual-orb orb-two" />
        <div className="card-category">{event.category}</div>
        <span className="card-deadline">{event.deadline.replace('Applications ', '').replace('Registration ', '').replace('Early access ', '').replace('RSVP ', '')}</span>
        <span className="visual-type">{event.title.split(' ')[0]}</span>
        <span className="visual-shape" />
      </div>
      <div className="opportunity-topline"><span className="match-chip"><i />{matchFor(event, profile)}</span><button onClick={() => onFavourite(event)} className={`favourite-button ${isFavourite ? 'saved' : ''}`} aria-label={isFavourite ? `Remove ${event.title} from favourites` : `Add ${event.title} to favourites`} aria-pressed={isFavourite}><Icon name="heart" size={19} /></button></div>
      <div className="event-content">
        <div className="event-date"><span>{month.format(date)}</span><strong>{date.getDate()}</strong></div>
        <div className="event-main">
          <div className="event-heading"><h3>{event.title}</h3></div>
          <p className="event-location"><Icon name="pin" size={15} />{event.location}</p>
          <div className="opportunity-meta"><span>{event.mode}</span><span>{event.reward}</span></div>
          <div className="event-footer"><span><Icon name="users" size={13} />{event.registrations}</span><button onClick={() => onDetails(event)} className="details-link">Explore <Icon name="arrow" size={15} /></button></div>
        </div>
      </div>
    </article>
  )
}
