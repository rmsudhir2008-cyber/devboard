import { EventCard } from './EventCard'
import { EmptyState } from './EmptyState'

export function EventGrid({ events, totalEvents, favourites, onFavourite, onDetails, loading, onClearFilters, onLoadMore, profile }) {
  if (loading) return <div className="event-grid loading-grid" aria-label="Loading events">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item}><div /><span /><span /></div>)}</div>
  if (!events.length) return <EmptyState onClear={onClearFilters} />
  return <><div className="event-grid">{events.map((event) => <EventCard key={event.id} event={event} isFavourite={favourites.includes(event.id)} onFavourite={onFavourite} onDetails={onDetails} profile={profile} />)}</div>{events.length < totalEvents && <div className="load-more-wrap"><p>Showing {events.length.toLocaleString()} of {totalEvents.toLocaleString()} opportunities</p><button onClick={onLoadMore}>Load 12 more opportunities</button></div>}</>
}
