import { Icon } from './Icon'

export function EmptyState({ onClear }) {
  return <section className="empty-state">
    <div className="empty-icon"><Icon name="sparkles" size={28} /></div>
    <h2>Nothing quite matches that</h2>
    <p>Try a different keyword or explore all of the events on DevBoard.</p>
    <button className="clear-button" onClick={onClear}>Clear filters</button>
  </section>
}
