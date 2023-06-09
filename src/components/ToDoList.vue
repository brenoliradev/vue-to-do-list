<script setup lang="ts">
import { Todo } from '../composable/types/Todo'
import ToDoListItem from './ToDoListItem.vue'
</script>

<template>
  <main class="flex w-full flex-col items-center justify-center gap-4">
    <section
      class="flex max-w-[1980px] items-center justify-center px-4 py-6 text-white"
    >
      <h2 class="text-4xl font-semibold">Vue to-do-list</h2>
    </section>
    <form @submit="submitForm">
      <div class="join">
        <input
          type="text"
          v-model="text"
          class="input-bordered input join-item"
          placeholder="Insert a todo"
        />
        <button :disabled="!text" class="join-item btn rounded-r-full disabled:cursor-not-allowed" type="submit">Add</button>
      </div>
    </form>
    <transition-group
      tag="ul"
      enter-active-class="transform-gpu"
      enter-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="absolute transform-gpu"
      leave-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
      class="flex w-full flex-col gap-4 px-12"
      @before-leave="beforeLeave"
    >
      <ToDoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </transition-group>
  </main>
</template>

<script lang="ts">
import { TodoStore } from '../composable/TodoStore'

type ToDoListData = {
  todos: Todo[]
  text: string
}

export default {
  data(): ToDoListData {
    return {
      todos: TodoStore.todos,
      text: ''
    }
  },
  methods: {
    beforeLeave(el: Element) {
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el)
      if (el instanceof HTMLElement) {
        el.style.left = `${el.offsetLeft - parseFloat(marginLeft ?? 10)}px`
        el.style.top = `${el.offsetTop - parseFloat(marginTop ?? 10)}px`
        el.style.width = width
        el.style.height = height
      }
    },
    submitForm(event: Event) {
      event.preventDefault() // Prevent the default form submission

      if (this.text === '') return
      TodoStore.addTodo(this.text)

      // Reset the form fields
      this.text = ''
    }
  }
}
</script>
