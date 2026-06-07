/**
 * Affiche une tâche individuelle.
 *
 * @param {{ todo: { id: string, text: string, done: boolean }, onToggle: function(string): void, onRemove: function(string): void }} props
 * @param {{ id: string, text: string, done: boolean }} props.todo - Données de la tâche.
 * @param {function(string): void} props.onToggle - Fonction pour basculer l’état fait/non fait.
 * @param {function(string): void} props.onRemove - Fonction pour supprimer la tâche.
 */
export default function ToDoItem({ todo, onToggle, onRemove, removeLabel }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.done ? 'todo-text done' : 'todo-text'}>
          {todo.text}
        </span>
      </label>
      <button type="button" className="remove-button" onClick={() => onRemove(todo.id)}>
        {removeLabel}
      </button>
    </li>
  )
}
