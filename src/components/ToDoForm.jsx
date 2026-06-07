/**
 * Formulaire d’ajout de tâche.
 *
 * @param {{ onAddTodo: function(string): void }} props
 * @param {function(string): void} props.onAddTodo - Fonction appelée lors de l’envoi du formulaire.
 */
import { useState } from 'react'

export default function ToDoForm({ onAddTodo, placeholder, addButtonLabel }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      return
    }
    onAddTodo(trimmed)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        id="new-todo-input"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">{addButtonLabel}</button>
    </form>
  )
}
