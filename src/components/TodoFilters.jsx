const FILTERS = ['all', 'active', 'completed']

export default function TodoFilters({ value, onChange }) {
  return (
    <div className="filters">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={filter === value ? 'active' : ''}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
