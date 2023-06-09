<script setup lang="ts">
import { Todo } from '../types/Todo'
import ToDoListItem from './ToDoListItem.vue'
</script>

<template>
  <section
    class="flex max-w-[1980px] items-center justify-center px-4 py-6 text-white"
  >
    <h2 class="text-4xl font-semibold">Vue to-do-list</h2>
  </section>
  <form>
    <input/>
    <button class="text-white">Submit</button>
  </form>
  <transition-group
    tag="ul"
    enter-active-class="transform-gpu"
    enter-class="opacity-0 -translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="absolute transform-gpu"
    leave-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-full"
    class="flex flex-col space-y-4 px-12"
    @before-leave="beforeLeave"
  >
    <ToDoListItem />
  </transition-group>
</template>

<script lang="ts">
type ToDoListData = {
  todos: Todo[]
}

export default {
  // TODO STATE
  data(): ToDoListData {
    return {
      todos: []
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
  }
}
</script>
