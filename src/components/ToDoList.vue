<script setup lang="ts">
import ToDoListItem from './ToDoListItem.vue'
import { TodoStore } from '../composable/TodoStore'
</script>

<template>
  <main class="flex flex-col items-center justify-center gap-4 w-11/12 mx-auto">
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
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
      class="flex w-full flex-col space-y-4"
    >
      <ToDoListItem v-for="todo in TodoStore.todos" :key="todo.id" :todo="todo" />
    </transition-group>
  </main>
</template>

<script lang="ts">
type ToDoListData = {
  text: string
}

export default {
  data(): ToDoListData {
    return {
      text: ''
    }
  },
  methods: {
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
