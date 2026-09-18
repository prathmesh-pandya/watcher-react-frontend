import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="What needs doing?"
        aria-label="New todo"
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}
