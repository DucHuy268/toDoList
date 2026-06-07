import { useMemo, useState } from 'react'
import './App.css'
import useTodos from './hooks/useTodos'
import ToDoForm from './components/ToDoForm'
import ToDoList from './components/ToDoList'
import { FILTERS, translations } from './translations'

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos()
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('fr')

  const locale = translations[language]

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.done)
    if (filter === 'done') return todos.filter((todo) => todo.done)
    return todos
  }, [todos, filter])

  const completedCount = todos.filter((todo) => todo.done).length
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-card">
        <header className="app-header">
          <div>
            <p className="eyebrow">{locale.eyebrow}</p>
            <h1>{locale.title}</h1>
            <p>{locale.description}</p>
          </div>
          <div className="header-actions">
            <select
              className="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {locale.languageOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
            <button className="mode-toggle" type="button" onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? locale.modeLight : locale.modeDark}
            </button>
          </div>
        </header>

        <section className="progress-card">
          <div className="progress-row">
            <div>
              <p className="progress-label">{locale.progression}</p>
              <strong>{progress}%</strong>
            </div>
            <p className="progress-detail">{locale.tasksDone(completedCount, todos.length || 0)}</p>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="toolbar">
          <ToDoForm onAddTodo={addTodo} placeholder={locale.placeholder} addButtonLabel={locale.addButton} />
          <div className="filters">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`filter-button ${filter === item.key ? 'active' : ''}`}
                onClick={() => setFilter(item.key)}
              >
                {locale.filters[item.key]}
              </button>
            ))}
          </div>
        </section>

        <ToDoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
          emptyText={locale.emptyList}
          removeLabel={locale.removeButton}
        />
      </div>
      <footer className="app-footer">{locale.footer}</footer>
    </div>
  )
}

export default App
