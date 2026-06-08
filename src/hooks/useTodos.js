import { useEffect, useState } from 'react'

/**
 * Hook personnalisé pour gérer une liste de tâches.
 *
 * @param {Array} initialTodos
 * @returns {{ todos: Array, addTodo: function, removeTodo: function, toggleTodo: function }}
 */
export default function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    localStorage.setItem('todos', JSON.stringify(todos))
    return saved ? JSON.parse(saved) : initialTodos
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      done: false,
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  return { todos, addTodo, removeTodo, toggleTodo }
}
