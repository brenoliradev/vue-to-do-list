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
    <form>
      <div class="join">
        <input class="input-bordered input join-item" placeholder="Email" />
        <button class="join-item btn rounded-r-full">Subscribe</button>
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
      class="flex w-full flex-col space-y-4 px-12"
      @before-leave="beforeLeave"
    >
      <ToDoListItem />
    </transition-group>
  </main>
</template>

<script lang="ts">
import { TodoStore } from '../composable/TodoStore'

type ToDoListData = {
  todos: Todo[]
}

export default {
  data(): ToDoListData {
    return {
      todos: TodoStore.todos
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
    }
  }
}
</script>
