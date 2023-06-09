import { reactive } from 'vue'
import { Todo } from './types/Todo'

export const TodoStore = reactive<{
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
  toggleDoneTodo: (id: number) => void
}>({
  todos: [],
  addTodo(text: string) {
    this.todos.push({
      id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      text,
      done: false
    })
  },
  deleteTodo(id: number) {
    this.todos.filter((todo) => todo.id !== id)
  },
  updateTodo(id: number, text: string) {
    const selectedTodo = this.todos.find((t) => t.id === id)

    if (selectedTodo) {
      selectedTodo.text = text
    }
  },
  toggleDoneTodo(id: number) {
    const selectedTodo = this.todos.find((t) => t.id === id)

    if (selectedTodo) {
      selectedTodo.done = !selectedTodo.done
    }
  }
})
