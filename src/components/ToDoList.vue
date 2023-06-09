<script setup lang="ts">
import { ref } from 'vue'
import ToDoListItem from './ToDoListItem.vue'
import { TodoStore } from '../composable/TodoStore'

const text = ref('')

function submitForm(event: Event) {
  event.preventDefault()

  if (!text.value) return
  TodoStore.addTodo(text.value)

  text.value = ''
}
</script>

<template>
  <main
    class="mx-auto flex w-full flex-col items-center justify-center gap-4 px-3 lg:w-11/12"
  >
    <section
      class="flex max-w-[1980px] flex-col items-center justify-center px-4 py-6 text-white"
    >
      <h2 class="text-4xl font-semibold">Vue to-do-list</h2>
    </section>
    <form
      class="flex flex-col items-center justify-center"
      @submit="submitForm"
    >
      <div class="join">
        <input
          name="create-todo"
          type="text"
          v-model="text"
          :aria-invalid="text.length > 50"
          :data-invalid="text.length > 50"
          class="input-bordered input-secondary input join-item data-[invalid='true']:input-error"
          placeholder="Insert a todo"
          autofocus
          required
        />
        <button
          :disabled="!text || text.length > 50"
          class="btn-secondary join-item btn rounded-r-full disabled:cursor-not-allowed"
          type="submit"
        >
          Add
        </button>
      </div>
      <label
        :data-invalid="text.length > 50"
        for="create-todo"
        class="data-[invalid='true']:label data-[invalid='true']:label-text data-[invalid='false']:hidden data-[invalid='true']:text-error"
        >The maximum size of an todo name is 50 chars.</label
      >
    </form>
    <transition-group
      tag="ul"
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
      class="flex w-full flex-col items-center justify-center space-y-4"
    >
      <ToDoListItem
        v-for="todo in TodoStore.todos"
        :key="todo.id"
        :todo="todo"
      />
    </transition-group>
  </main>
</template>
