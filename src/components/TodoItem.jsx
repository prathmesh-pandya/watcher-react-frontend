export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.done ? 'todo-item done' : 'todo-item'}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        className="delete"
        aria-label={`Delete ${todo.text}`}
        onClick={() => onDelete(todo.id)}
      >
        &times;
      </button>
    </li>
  )
}
