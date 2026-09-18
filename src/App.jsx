import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import TodoFilters from './components/TodoFilters.jsx'

const STORAGE_KEY = 'watcher-react.todos'

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // storage unavailable (private mode, blocked cookies) - keep working in memory
    }
  }, [todos])

  function addTodo(text) {
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, done: false },
      ...prev,
    ])
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    )
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.done))
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'completed') return todo.done
    return true
  })

  const remaining = todos.filter((todo) => !todo.done).length

  return (
    <main className="app">
      <h1>Watcher Todo</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      {todos.length > 0 && (
        <footer className="footer">
          <span>{remaining} left</span>
          <TodoFilters value={filter} onChange={setFilter} />
          <button
            className="link"
            onClick={clearCompleted}
            disabled={remaining === todos.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </main>
  )
}
