/**
 * Liste des tâches ToDo.
 *
 * @param {{ todos: Array, onToggle: function(string): void, onRemove: function(string): void }} props
 * @param {Array<{ id: string, text: string, done: boolean }>} props.todos - Tableau des tâches.
 * @param {function(string): void} props.onToggle - Fonction pour basculer l’état d’une tâche.
 * @param {function(string): void} props.onRemove - Fonction pour supprimer une tâche.
 */
import ToDoItem from './ToDoItem'

export default function ToDoList({ todos, onToggle, onRemove, emptyText, removeLabel }) {
  if (todos.length === 0) {
    return <p className="empty-list">{emptyText}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} removeLabel={removeLabel} />
      ))}
    </ul>
  )
}
