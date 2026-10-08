import { categories } from '../data/events'
import { Icon } from './Icon'

export function Filters({ query, onQueryChange, category, onCategoryChange, sort, onSortChange, eventCount }) {
  return (
    <section className="filters" aria-label="Search and filter events">
      <label className="search-field">
        <Icon name="search" size={19} />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search events, topics, or places" />
      </label>
      <div className="filter-row">
        <div className="category-tabs" role="tablist" aria-label="Event category">
          {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'selected' : ''} onClick={() => onCategoryChange(item)}>{item}</button>)}
        </div>
        <label className="sort-select">Sort <select value={sort} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort events"><option value="date">Soonest</option><option value="category">Category</option></select></label>
      </div>
      <p className="results-label"><span>{eventCount}</span> events waiting for you</p>
    </section>
  )
}
