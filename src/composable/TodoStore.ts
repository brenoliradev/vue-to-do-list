import { reactive } from 'vue'
import { Todo } from './types/Todo'

export const TodoStore = reactive<{
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: number) => void
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
  }
})
